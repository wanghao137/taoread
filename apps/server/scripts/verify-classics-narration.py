"""Decode and transcribe actual draft MP3s. Receipts are bound to byte and text hashes."""
import concurrent.futures
import difflib
import hashlib
import json
import re
import subprocess
import sys
import threading
from pathlib import Path
import imageio_ffmpeg
import sherpa_onnx
import soundfile
import numpy as np
import cn2an  # Isolated verifier dependency: cn2an==0.5.24 (MIT).

input_file = Path(sys.argv[1]).resolve()
workers = int(next((arg.split('=', 1)[1] for arg in sys.argv[2:] if arg.startswith('--workers=')), '2'))
if workers < 1 or workers > 4:
    raise ValueError('Verifier workers must be between one and four')
base = input_file.parent.parent
model_dir = base / 'sensevoice'
for file in json.loads((model_dir / 'expected-files.json').read_text('utf-8')):
    data = (model_dir / file['path']).read_bytes()
    digest = (hashlib.sha256(data).hexdigest() if 'lfs' in file else
              hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest())
    if digest != file.get('lfs', {}).get('oid', file['oid']):
        raise ValueError('ASR model hash mismatch')
items = json.loads(input_file.read_text('utf-8'))
receipts = base / 'narration-checks'
receipts.mkdir(exist_ok=True)
local = threading.local()
method = 'sensevoice-int8-silence-v2'

def windows(audio, rate):
    # Cut at the middle of an actual pause. Fixed 18-second cuts can split a
    # syllable and make both adjacent windows recognize it, inventing repeats.
    # Every sample is retained exactly once; omission thresholds stay unchanged.
    hop = max(1, rate // 50)
    quiet = []
    for start in range(0, len(audio), hop):
        frame = audio[start:start + hop]
        quiet.append(bool(len(frame) and np.sqrt(np.mean(frame * frame)) < .008))
    pauses = []
    start = 0
    while start < len(quiet):
        if not quiet[start]:
            start += 1
            continue
        end = start + 1
        while end < len(quiet) and quiet[end]:
            end += 1
        if end - start >= 5:
            pauses.append((start + end) * hop // 2)
        start = end
    start = 0
    while len(audio) - start > rate * 18:
        candidates = [p for p in pauses if start + rate * 12 <= p <= start + rate * 18]
        end = candidates[-1] if candidates else start + rate * 18
        yield audio[start:end]
        start = end
    if start < len(audio):
        yield audio[start:]

def normalized(text):
    # ASR ITN turns e.g. 三亿一千一百万 into 3亿1100万. Compare the
    # exact numeric value; never discard numbers or lower omission thresholds.
    def number(match):
        try:
            value = cn2an.cn2an(match.group(0), 'smart')
            return str(int(value)) if int(value) == value else str(value)
        except (ValueError, KeyError, IndexError):
            return match.group(0)
    text = re.sub(r'[0-9零〇一二两三四五六七八九十百千万亿]+', number, text)
    return ''.join(re.findall(r'[\u3400-\u9fffA-Za-z0-9]', text)).lower()

def omissions(expected, actual):
    matcher = difflib.SequenceMatcher(None, normalized(expected), normalized(actual), autojunk=False)
    operations = matcher.get_opcodes()
    return (max((end-start for tag, start, end, _, _ in operations if tag in ('delete', 'replace')), default=0),
            max((end-start for tag, _, _, start, end in operations if tag in ('insert', 'replace')), default=0))

def check(item):
    source = (base / item['file']).resolve()
    if not source.is_relative_to(base):
        raise ValueError('Unsafe audio source')
    audio_sha = hashlib.sha256(source.read_bytes()).hexdigest()
    text_sha = hashlib.sha256(item['text'].encode()).hexdigest()
    target = receipts / (item['key'] + '.json')
    old = None
    if target.exists():
        try:
            old = json.loads(target.read_text('utf-8'))
        except json.JSONDecodeError:
            pass  # An interrupted cached receipt must be verified again.
    # Frame scanning tolerates damaged bytes. Decode the entire file strictly,
    # including cached ASR receipts, before accepting any narration.
    cached_decode = old and old.get('audioSha256') == audio_sha and old.get('decodeValidated') is True
    decoded = None if cached_decode else subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error',
                              '-xerror', '-err_detect', 'explode', '-i', str(source),
                              '-f', 'null', '-'], capture_output=True)
    if decoded is not None and decoded.returncode:
        result = {**item, 'audioSha256': audio_sha, 'textSha256': text_sha,
                  'recognized': '', 'similarity': 0, 'tailSimilarity': 0,
                  'maxMissingChars': len(normalized(item['text'])), 'maxExtraChars': 0,
                  'needsReview': True, 'decodeValidated': False,
                  'method': method}
        target.write_text(json.dumps(result, ensure_ascii=False, indent=2), 'utf-8')
        return result
    if old:
        if old.get('audioSha256') == audio_sha and old.get('textSha256') == text_sha and old.get('method') == method:
            missing, extra = omissions(item['text'], old['recognized'])
            expected_n, actual_n = normalized(item['text']), normalized(old['recognized'])
            tail = expected_n[-min(20, len(expected_n)):]
            old['similarity'] = difflib.SequenceMatcher(None, expected_n, actual_n, autojunk=False).ratio()
            old['tailSimilarity'] = difflib.SequenceMatcher(None, tail, actual_n[-len(tail)-5:], autojunk=False).ratio()
            old['maxMissingChars'], old['maxExtraChars'] = missing, extra
            old['needsReview'] = old['similarity'] < .90 or old['tailSimilarity'] < .70 or missing >= 7 or extra >= 7
            old['decodeValidated'] = True
            target.write_text(json.dumps(old, ensure_ascii=False, indent=2), 'utf-8')
            return old
    if not hasattr(local, 'recognizer'):
        local.recognizer = sherpa_onnx.OfflineRecognizer.from_sense_voice(
            model=str(model_dir / 'model.int8.onnx'), tokens=str(model_dir / 'tokens.txt'),
            num_threads=1 if workers > 2 else 2, use_itn=True, language='zh', provider='cpu')
    wav = receipts / (item['key'] + '.wav')
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error', '-y',
                    '-xerror', '-err_detect', 'explode', '-i', str(source), '-ar', '16000', '-ac', '1', str(wav)], check=True)
    audio, rate = soundfile.read(wav, dtype='float32')
    recognized = []
    # Short windows prevent a long utterance from exceeding the ASR model context.
    for window in windows(audio, rate):
        stream = local.recognizer.create_stream()
        stream.accept_waveform(rate, window)
        local.recognizer.decode_stream(stream)
        recognized.append(stream.result.text)
    wav.unlink()
    actual = ''.join(recognized)
    expected_n, actual_n = normalized(item['text']), normalized(actual)
    ratio = difflib.SequenceMatcher(None, expected_n, actual_n, autojunk=False).ratio()
    tail = expected_n[-min(20, len(expected_n)):]
    tail_ratio = difflib.SequenceMatcher(None, tail, actual_n[-len(tail)-5:], autojunk=False).ratio()
    missing, extra = omissions(item['text'], actual)
    result = {**item, 'audioSha256': audio_sha, 'textSha256': text_sha,
              'recognized': actual, 'similarity': ratio, 'tailSimilarity': tail_ratio,
              'maxMissingChars': missing, 'maxExtraChars': extra,
              'needsReview': ratio < .90 or tail_ratio < .70 or missing >= 7 or extra >= 7,
              'decodeValidated': True, 'method': method}
    temp = target.with_suffix('.tmp')
    temp.write_text(json.dumps(result, ensure_ascii=False, indent=2), 'utf-8')
    temp.replace(target)
    return result

results = []
with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
    for result in executor.map(check, items):
        results.append(result)
        print(json.dumps({'checked': len(results), 'total': len(items), 'key': result['key'],
                          'needsReview': result['needsReview'], 'similarity': round(result['similarity'], 3)}), flush=True)
(base / 'narration-quality-report.json').write_text(json.dumps({
    'checked': len(results), 'needsReview': sum(r['needsReview'] for r in results),
    'results': results}, ensure_ascii=False, indent=2), 'utf-8')
