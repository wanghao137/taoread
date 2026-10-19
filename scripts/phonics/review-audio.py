"""Strictly decode candidate audio and report text anomalies. Does not approve pronunciation or publication."""
import argparse
import concurrent.futures
import difflib
import hashlib
import io
import json
import re
import subprocess
import threading
from pathlib import Path
import imageio_ffmpeg
import numpy as np
import sherpa_onnx
import soundfile

parser = argparse.ArgumentParser()
parser.add_argument('--root', required=True)
parser.add_argument('--model-dir', required=True)
parser.add_argument('--workers', type=int, default=2, choices=[1, 2, 3, 4])
parser.add_argument('--receipt', default='audio-candidates.json')
parser.add_argument('--report', default='audio-technical-review.json')
args = parser.parse_args()
root = Path(args.root).resolve()
model = Path(args.model_dir).resolve()
for entry in json.loads((model / 'expected-files.json').read_text('utf-8')):
    source = (model / entry['path']).resolve()
    if not source.is_relative_to(model):
        raise ValueError('Unsafe model path')
    data = source.read_bytes()
    actual = hashlib.sha256(data).hexdigest() if 'lfs' in entry else hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest()
    if actual != entry.get('lfs', {}).get('oid', entry['oid']):
        raise ValueError('ASR model checksum mismatch')
receipt = (root / args.receipt).resolve()
report_path = (root / args.report).resolve()
if not receipt.is_relative_to(root) or not report_path.is_relative_to(root) or receipt == report_path:
    raise ValueError('Receipt and report must be distinct files inside the media root')
state = json.loads(receipt.read_text('utf-8'))
version = state['versionId']
if not re.fullmatch(r'[a-z0-9-]+', version):
    raise ValueError('Invalid course version')
local = threading.local()

def normalized(text):
    return ''.join(re.findall(r'[\u3400-\u9fffA-Za-z0-9]', text)).lower().replace('\u4ed6', '\u5b83')

def check(item):
    flags = list(item.get('flags', []))
    result = {'id': item['id'], 'purpose': item['purpose'], 'sha256': item.get('sha256'), 'flags': flags,
              'decodePassed': False, 'phoneticListeningApproved': False, 'requestedAccent': item['requestedAccent'], 'accentVerified': False}
    if not item.get('sha256'):
        flags.append('GENERATION_FAILED')
        return result
    if not re.fullmatch(r'[a-f0-9]{64}', item['sha256']):
        raise ValueError('Invalid audio hash')
    source = root / 'phonics' / version / (item['sha256'] + '.mp3')
    if hashlib.sha256(source.read_bytes()).hexdigest() != item['sha256']:
        flags.append('HASH_MISMATCH')
        return result
    decoded = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error', '-xerror', '-err_detect', 'explode', '-i', str(source), '-ar', '16000', '-ac', '1', '-f', 'wav', '-'], capture_output=True)
    if decoded.returncode:
        flags.append('DECODE_FAILED')
        return result
    audio, rate = soundfile.read(io.BytesIO(decoded.stdout), dtype='float32')
    result['decodePassed'] = True
    result['durationMs'] = round(len(audio) * 1000 / rate)
    result['clippedSamples'] = int(np.count_nonzero(np.abs(audio) >= .999))
    if abs(result['durationMs'] - item['durationMs']) > 75:
        flags.append('DURATION_METADATA_MISMATCH')
    if result['clippedSamples'] > rate * .002:
        flags.append('CLIPPING')
    rms = float(np.sqrt(np.mean(audio * audio))) if len(audio) else 0
    result['rms'] = round(rms, 5)
    if rms < .003:
        flags.append('QUIET_OR_EMPTY')
    if not hasattr(local, 'recognizer'):
        local.recognizer = sherpa_onnx.OfflineRecognizer.from_sense_voice(model=str(model / 'model.int8.onnx'), tokens=str(model / 'tokens.txt'), num_threads=1, use_itn=True, language='auto')
    stream = local.recognizer.create_stream()
    stream.accept_waveform(rate, audio)
    local.recognizer.decode_stream(stream)
    actual = stream.result.text
    result['recognized'] = actual
    result['expected'] = item['text']
    if item['purpose'] in ['instruction_zh', 'word', 'passage']:
        expected_n, actual_n = normalized(item['text']), normalized(actual)
        result['textSimilarity'] = difflib.SequenceMatcher(None, expected_n, actual_n, autojunk=False).ratio()
        if item['purpose'] in ['word', 'passage']:
            if expected_n != actual_n:
                flags.append('TEXT_MISMATCH')
        elif result['textSimilarity'] < .94:
            flags.append('TEXT_MISMATCH')
    else:
        # A decoder or ASR cannot certify pure phones, absence of schwa, or continuous blending.
        flags.append('PHONETIC_LISTENING_REQUIRED')
    return result

results = []
with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
    for result in pool.map(check, state['assets'].values()):
        results.append(result)
        print(json.dumps({'id': result['id'], 'decodePassed': result['decodePassed'], 'flags': result['flags']}, ensure_ascii=True), flush=True)
report = {'complete': True, 'versionId': version, 'method': 'Strict FFmpeg decoding, SHA-256, PCM diagnostics and independent SenseVoice ASR; not speech listening approval',
          'count': len(results), 'decoded': sum(r['decodePassed'] for r in results), 'flagged': sum(bool(r['flags']) for r in results),
          'publicationApproved': False, 'results': results}
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', 'utf-8')
print(json.dumps({k: report[k] for k in ['complete', 'count', 'decoded', 'flagged', 'publicationApproved']}), flush=True)
