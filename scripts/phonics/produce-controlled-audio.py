"""Generate GB audio from explicit course phonemes with a pinned neural voice. Never approves a release."""
import argparse
import hashlib
import io
import json
import subprocess
from pathlib import Path
import imageio_ffmpeg
import numpy as np
import onnxruntime as ort
import soundfile

parser = argparse.ArgumentParser()
parser.add_argument('--course', required=True)
parser.add_argument('--voice', required=True)
parser.add_argument('--out', required=True)
args = parser.parse_args()
course = Path(args.course).resolve()
voice = Path(args.voice).resolve()
out = Path(args.out).resolve()
load = lambda name: json.loads((course / (name + '.json')).read_text('utf-8'))
manifest, assets, mappings, words, readers = (load(n) for n in ['manifest', 'assets', 'mappings', 'words', 'readers'])
version = manifest['versionId']
if not version or any(c not in 'abcdefghijklmnopqrstuvwxyz0123456789-' for c in version):
    raise ValueError('Invalid version path')
dest = out / 'phonics' / version
dest.mkdir(parents=True, exist_ok=True)
originals = out / 'controlled-sources'
originals.mkdir(exist_ok=True)
tree = json.loads((voice / 'tree.json').read_text('utf-8'))
entry = next(e for e in tree if e['path'].endswith('.onnx'))
model = voice / 'en_GB-cori-high.onnx'
model_sha = hashlib.sha256(model.read_bytes()).hexdigest()
if model_sha != entry['lfs']['oid']:
    raise ValueError('Voice SHA-256 mismatch')
config = json.loads((voice / 'en_GB-cori-high.onnx.json').read_text('utf-8'))
rate = config['audio']['sample_rate']
ids = config['phoneme_id_map']
options = ort.SessionOptions()
options.intra_op_num_threads = 2
options.inter_op_num_threads = 1
session = ort.InferenceSession(str(model), sess_options=options, providers=['CPUExecutionProvider'])
input_names = {entry.name for entry in session.get_inputs()}
mapping_index = {m['id']: m for m in mappings}
word_index = {w['id']: w for w in words}
phoneme_cache = {}

def synth(phonemes, scale=1):
    sequence = ids['^'] + ids['_']
    for phoneme in phonemes:
        if phoneme not in ids:
            raise ValueError('Unsupported explicit phoneme')
        sequence += ids[phoneme] + ids['_']
    sequence += ids['$']
    inputs = {'input': np.array([sequence], dtype=np.int64), 'input_lengths': np.array([len(sequence)], dtype=np.int64),
              'scales': np.array([.45, scale, .55], dtype=np.float32)}
    if 'sid' in input_names:
        inputs['sid'] = np.array([0], dtype=np.int64)
    result = session.run(None, inputs)[0].reshape(-1).astype(np.float32)
    if not len(result) or not np.isfinite(result).all():
        raise ValueError('Invalid neural waveform')
    active = np.flatnonzero(np.abs(result) > .005)
    if len(active):
        # Trim only leading/trailing quiet, retaining 40ms context. No time stretching or phone looping.
        margin = round(rate * .04)
        result = result[max(0, active[0] - margin):min(len(result), active[-1] + margin + 1)]
    if np.max(np.abs(result)) > .98:
        result = result * (.98 / np.max(np.abs(result)))
    return result

def pure(ipa):
    if ipa in phoneme_cache:
        return phoneme_cache[ipa]
    continuing = ipa in ['m', 'n', 's']
    scale = 3.0 if continuing else 1.6 if ipa in ['\u00e6', '\u026a'] else 1.0
    phonemes = ('\u02c8' if ipa in ['\u00e6', '\u026a'] else '') + ipa
    audio = synth(phonemes, scale)
    if continuing and len(audio) / rate < .35:
        scale = min(9.0, scale * .65 / max(.08, len(audio) / rate))
        audio = synth(phonemes, scale)
    phoneme_cache[ipa] = (audio, scale)
    return audio, scale

def word_phones(word, stress=True):
    result, stressed = '', False
    for span in word['spans']:
        if not span.get('mappingId'):
            raise ValueError('Exception word needs separate production script')
        for phone in mapping_index[span['mappingId']]['phonemes']:
            if stress and not stressed and phone['kind'] == 'vowel':
                result += '\u02c8'
                stressed = True
            result += phone['ipa']
    return result

receipts = {}
for asset in assets:
    if asset['purpose'] in ['image', 'instruction_zh']:
        continue
    purpose = asset['purpose']
    timeline, scale = [], 1.0
    if purpose == 'phoneme':
        mapping = mapping_index['g-' + asset['id'].removeprefix('sound-')]
        phones = ''.join(p['ipa'] for p in mapping['phonemes'])
        audio, scale = pure(phones)
        text = mapping['spelling']
    elif purpose == 'passage':
        page = next(page for reader in readers for page in reader['pages'] if page['audioAssetId'] == asset['id'])
        text = page['text']
        phones = ' '.join(word_phones(word_index[w], stress=w not in ['w-in', 'w-it']) for w in page['wordIds']) + '.'
        audio = synth(phones, 1.1)
        scale = 1.1
    else:
        word = next(w for w in words if asset['id'] in w['audioIds'].values())
        text = word['text']
        phones = word_phones(word)
        if purpose == 'segment':
            parts, cursor = [], 0
            for span in word['spans']:
                mapping = mapping_index[span['mappingId']]
                ipa = ''.join(p['ipa'] for p in mapping['phonemes'])
                piece, _ = pure(ipa)
                parts.append(piece)
                start = cursor
                cursor += len(piece)
                timeline.append({'text': mapping['spelling'], 'atMs': round(start * 1000 / rate), 'endMs': round(cursor * 1000 / rate)})
                gap = np.zeros(round(rate * .36), dtype=np.float32)
                parts.append(gap)
                cursor += len(gap)
            audio = np.concatenate(parts[:-1])
        else:
            scale = 1.65 if purpose == 'blend' else 1.0
            audio = synth(phones, scale)
    source = originals / (asset['id'] + '.wav')
    soundfile.write(source, audio, rate, subtype='PCM_16')
    encoded = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error', '-xerror', '-i', str(source), '-codec:a', 'libmp3lame', '-b:a', '128k', '-f', 'mp3', '-'], capture_output=True, check=True).stdout
    sha = hashlib.sha256(encoded).hexdigest()
    (dest / (sha + '.mp3')).write_bytes(encoded)
    # Decode the actual MP3 used by the product to determine its playback duration.
    decoded = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error', '-xerror', '-f', 'mp3', '-i', '-', '-f', 'wav', '-'], input=encoded, capture_output=True, check=True).stdout
    samples, decoded_rate = soundfile.read(io.BytesIO(decoded), dtype='float32')
    duration = round(len(samples) * 1000 / decoded_rate)
    flags = ['PHONETIC_LISTENING_REQUIRED'] if purpose in ['phoneme', 'segment', 'blend'] else []
    if purpose == 'phoneme' and duration > 2500:
        flags.append('EXCESS_DURATION_REQUIRES_REVIEW')
    receipts[asset['id']] = {'id': asset['id'], 'purpose': purpose, 'text': text, 'phonemes': phones, 'requestedAccent': 'GB',
        'sha256': sha, 'extension': 'mp3', 'durationMs': duration, 'bytes': len(encoded), 'timeline': timeline, 'flags': flags,
        'provider': 'local-piper-onnx', 'model': 'en_GB-cori-high', 'modelSha256': model_sha, 'onnxruntimeVersion': ort.__version__,
        'speakerId': 'cori-gb-single-speaker', 'lengthScale': scale, 'sourceLicense': 'Piper cori model card reports a public-domain LibriVox dataset; listening and rights review pending',
        'reviewedByHuman': False, 'status': 'generated_pending_listening_and_rights'}
    print(json.dumps({'id': asset['id'], 'durationMs': duration, 'provider': 'local-piper-onnx'}), flush=True)
(out / 'controlled-audio.json').write_text(json.dumps({'complete': True, 'versionId': version, 'assets': receipts, 'publicationApproved': False}, ensure_ascii=False, indent=2) + '\n', 'utf-8')
print(json.dumps({'complete': True, 'generated': len(receipts), 'publicationApproved': False}), flush=True)
