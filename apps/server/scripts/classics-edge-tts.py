"""Optional isolated narration fallback; never writes DB, runtime index or CDN.

Dependency: edge-tts==7.2.8. All generated audio still needs strict decoding
and the same content verification as the primary provider before import.
"""
import argparse
import asyncio
import hashlib
import importlib.metadata
import json
import re
from pathlib import Path
import edge_tts

parser = argparse.ArgumentParser()
parser.add_argument('--input-json', required=True)
parser.add_argument('--output-dir', required=True)
args = parser.parse_args()
output = Path(args.output_dir).resolve()
output.mkdir(parents=True, exist_ok=True)
jobs = json.loads(Path(args.input_json).read_text('utf8'))

async def main():
    for job in jobs:
        key, text = job['key'], job['text']
        if not re.fullmatch(r'[a-f0-9]{64}', key) or not isinstance(text, str) or not text.strip() or job['speed'] != .92:
            raise ValueError('Invalid narration input')
        # Literal 哞 is consistently rendered/transcribed as mao by this engine.
        # Preserve the mou syllable using a common pronunciation aid; acoustic
        # first-tone correctness is not claimed by this preparation script.
        synthesis = text.replace('哞', '谋')
        path = output / (key + '.mp3')
        await edge_tts.Communicate(synthesis, 'zh-CN-XiaoxiaoNeural', rate='-8%').save(str(path))
        receipt = {'key': key, 'textSha256': hashlib.sha256(text.encode()).hexdigest(),
                   'synthesisTextSha256': hashlib.sha256(synthesis.encode()).hexdigest(),
                   'pronunciationAid': '哞 -> 谋 (mou syllable); acoustic tone unverified',
                   'provider': 'edge-neural', 'model': 'zh-CN-XiaoxiaoNeural',
                   'libraryVersion': importlib.metadata.version('edge-tts'),
                   'speed': .92, 'bytes': path.stat().st_size}
        (output / (key + '.json')).write_text(json.dumps(receipt, ensure_ascii=False, indent=2), 'utf8')
        print(json.dumps({'key': key, 'bytes': path.stat().st_size}), flush=True)

try:
    asyncio.run(main())
except Exception as exc:
    # Provider exceptions can contain signed URLs; keep diagnostics redacted.
    raise SystemExit('Narration failed: ' + type(exc).__name__) from None
