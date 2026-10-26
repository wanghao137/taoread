/**
 * 生成自然拼读课堂音效（docs/90：「整个应用都有声音」）。
 *
 * 纯 Node 合成 16bit/22050Hz 单声道 WAV：正弦+指数衰减的木琴质感，
 * 零依赖、可复现、产物入库（apps/web/public/phonics/sfx/）。
 * 音效是界面反馈不是教学音频，不进课程发布门槛；音量峰值 0.4，尊重安静模式由前端控制。
 *
 * 用法：npx tsx scripts/gen-phonics-sfx.mts
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SAMPLE_RATE = 22050
type Note = { freq: number; start: number; dur: number; gain?: number }

function render(notes: Note[]): Buffer {
  const total = Math.max(...notes.map(n => n.start + n.dur))
  const samples = Math.ceil(total * SAMPLE_RATE)
  const pcm = new Float64Array(samples)
  for (const note of notes) {
    const gain = note.gain ?? 1
    const from = Math.floor(note.start * SAMPLE_RATE)
    const length = Math.floor(note.dur * SAMPLE_RATE)
    for (let i = 0; i < length; i++) {
      const t = i / SAMPLE_RATE
      const envelope = Math.exp(-t * 9) * Math.min(1, t * 400) // 快起音、指数衰减
      pcm[from + i]! += Math.sin(2 * Math.PI * note.freq * t) * envelope * gain
      // 一点点二次谐波让声音暖一点，不像纯提示音
      pcm[from + i]! += Math.sin(4 * Math.PI * note.freq * t) * envelope * gain * 0.18
    }
  }
  const bytes = Buffer.alloc(44 + samples * 2)
  bytes.write('RIFF', 0, 'ascii')
  bytes.writeUInt32LE(bytes.length - 8, 4)
  bytes.write('WAVE', 8, 'ascii')
  bytes.write('fmt ', 12, 'ascii')
  bytes.writeUInt32LE(16, 16)
  bytes.writeUInt16LE(1, 20)
  bytes.writeUInt16LE(1, 22)
  bytes.writeUInt32LE(SAMPLE_RATE, 24)
  bytes.writeUInt32LE(SAMPLE_RATE * 2, 28)
  bytes.writeUInt16LE(2, 32)
  bytes.writeUInt16LE(16, 34)
  bytes.write('data', 36, 'ascii')
  bytes.writeUInt32LE(samples * 2, 40)
  for (let i = 0; i < samples; i++) {
    const v = Math.max(-1, Math.min(1, pcm[i]! * 0.4))
    bytes.writeInt16LE(Math.round(v * 32767), 44 + i * 2)
  }
  return bytes
}

const N = (freq: number, start: number, dur: number, gain?: number): Note => ({ freq, start, dur, gain })
const sounds: Record<string, Note[]> = {
  // 轻点：一个短音，用于翻步/翻页
  tap: [N(660, 0, 0.1, 0.5)],
  // 答对：上行三连音
  correct: [N(659, 0, 0.16), N(784, 0.09, 0.16), N(1047, 0.18, 0.3)],
  // 再试：温柔的两音下行，不惩罚
  try: [N(494, 0, 0.2, 0.8), N(392, 0.14, 0.35, 0.8)],
  // 完成一段：上行四音+长尾
  finish: [N(523, 0, 0.18), N(659, 0.12, 0.18), N(784, 0.24, 0.18), N(1047, 0.36, 0.55)],
}

const outDir = path.resolve('..', 'web', 'public', 'phonics', 'sfx')
await mkdir(outDir, { recursive: true })
for (const [name, notes] of Object.entries(sounds)) {
  const wav = render(notes)
  await writeFile(path.join(outDir, `${name}.wav`), wav)
  console.log(name, wav.length, 'bytes')
}
