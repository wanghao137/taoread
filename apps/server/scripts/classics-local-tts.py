"""Generate faithful offline narration for reviewed classic text.

Optional isolated dependencies: sherpa-onnx==1.13.8, soundfile==0.13.1,
imageio-ffmpeg==0.6.0. Model: csukuangfj/vits-melo-tts-zh_en (MIT).
This tool writes audio and provenance receipts only. The caller validates MP3
and merges receipts after cloud generation has stopped; no DB or CDN writes.
"""
import argparse
import hashlib
import json
import re
import subprocess
import time
from pathlib import Path

import imageio_ffmpeg
import sherpa_onnx
import soundfile
import numpy as np


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model-dir", required=True)
    parser.add_argument("--input-json", required=True)
    parser.add_argument("--output-dir", required=True)
    args = parser.parse_args()
    model_dir = Path(args.model_dir).resolve()
    output = Path(args.output_dir).resolve()
    output.mkdir(parents=True, exist_ok=True)
    source = json.loads((model_dir / "verified-source.json").read_text("utf-8"))
    for item in source["files"]:
        path = (model_dir / item["path"]).resolve()
        if not path.is_relative_to(model_dir):
            raise ValueError("Invalid model path")
        data = path.read_bytes()
        digest = (hashlib.sha256(data).hexdigest() if "lfs" in item else
                  hashlib.sha1(f"blob {len(data)}\0".encode() + data).hexdigest())
        if len(data) != item["size"] or digest != item.get("lfs", {}).get("oid", item["oid"]):
            raise ValueError("Model integrity failed")
    if "Permission is hereby granted" not in (model_dir / "LICENSE").read_text("utf-8"):
        raise ValueError("Missing model license")
    config = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=str(model_dir / "model.int8.onnx"),
                tokens=str(model_dir / "tokens.txt"),
                lexicon=str(model_dir / "lexicon.txt"),
                dict_dir=str(model_dir / "dict"),
            ), num_threads=2, provider="cpu", debug=False),
        rule_fsts=",".join(str(model_dir / f) for f in ["date.fst", "number.fst", "phone.fst", "new_heteronym.fst"]),
        max_num_sentences=1,
    )
    if not config.validate():
        raise ValueError("Invalid local narration model configuration")
    tts = sherpa_onnx.OfflineTts(config)
    jobs = json.loads(Path(args.input_json).read_text("utf-8"))
    for job in jobs:
        key, text = job["key"], job["text"]
        if not re.fullmatch(r"[a-f0-9]{64}", key) or not isinstance(text, str) or not text.strip():
            raise ValueError("Invalid narration job")
        started = time.monotonic()
        speed = float(job["speed"])
        if not 0.5 <= speed <= 2:
            raise ValueError("Invalid narration speed")
        # Bound inference size while preserving every character and its order.
        # Long paragraphs are expensive on the release host's mobile CPU.
        pieces = []
        for start in range(0, len(text), 60):
            audio = tts.generate(text[start:start + 60], sid=0, speed=speed)
            if len(audio.samples) == 0:
                raise ValueError("Local narration returned an empty piece")
            pieces.append(audio.samples)
        samples = np.concatenate(pieces)
        if len(samples) == 0:
            raise ValueError("Local narration returned empty audio")
        wav, mp3 = output / f"{key}.wav", output / f"{key}.mp3"
        soundfile.write(wav, samples, audio.sample_rate, subtype="PCM_16")
        subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y",
                        "-i", str(wav), "-codec:a", "libmp3lame", "-b:a", "128k", str(mp3)], check=True)
        receipt = {
            "key": key, "textSha256": hashlib.sha256(text.encode()).hexdigest(),
            "provider": "local-melotts", "model": source["repository"],
            "modelCommit": source["commit"], "license": "MIT", "speaker": 0, "speed": speed,
            "sampleRate": audio.sample_rate, "generatedDurationMs": round(len(samples) / audio.sample_rate * 1000),
            "bytes": mp3.stat().st_size, "elapsedSeconds": round(time.monotonic() - started, 2),
        }
        (output / f"{key}.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2), "utf-8")
        print(json.dumps({"key": key, "durationMs": receipt["generatedDurationMs"], "elapsedSeconds": receipt["elapsedSeconds"]}), flush=True)


if __name__ == "__main__":
    main()
