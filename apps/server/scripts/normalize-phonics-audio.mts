/**
 * 音频峰值归一（docs/91：修复「英文发音声音很小」）。
 *
 * 词光的音频由 ElevenLabs 出厂响度直接可用；MiMo 输出电平偏低且不齐，
 * 逐条把峰值缩放到 -1 dBFS（≈89% 满幅），听感统一且不削波。
 * 只处理 receipts 中 sha256 存在的 WAV；缩放后重算 sha256、更新 receipt、
 * 删除旧文件。已达标（峰值 ≥ 目标）的跳过。
 *
 * 用法：npx tsx scripts/normalize-phonics-audio.mts --candidates <audio-candidates.json>
 */
import { readFile, writeFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { parseArgs } from 'node:util'

const { values } = parseArgs({ options: { candidates: { type: 'string' } } })
if (!values.candidates) throw Error('Explicit --candidates is required')
const receiptPath = path.resolve(values.candidates)
const outDir = path.dirname(receiptPath)
const receipts = JSON.parse(await readFile(receiptPath, 'utf8')) as {
  versionId: string
  assets: Record<string, { id: string; sha256?: string; extension?: string; bytes?: number; durationMs?: number }>
}

/** 定位 data 块（与 parseWav 同规则），返回 {offset, size} */
function dataChunk(buf: Buffer): { offset: number; size: number } | null {
  if (buf.length <= 44 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') return null
  let offset = 12
  while (offset + 8 <= buf.length) {
    const id = buf.toString('ascii', offset, offset + 4)
    const size = buf.readUInt32LE(offset + 4)
    if (id === 'data') return { offset: offset + 8, size: Math.min(size, buf.length - offset - 8) }
    offset += 8 + size + (size % 2)
  }
  return null
}

const TARGET_PEAK = Math.round(32767 * 0.89)
let normalized = 0, skipped = 0
const failed: string[] = []
for (const receipt of Object.values(receipts.assets)) {
  if (!receipt.sha256 || receipt.extension !== 'wav') continue
  const file = path.join(outDir, 'phonics', receipts.versionId, `${receipt.sha256}.wav`)
  let buf: Buffer
  try { buf = await readFile(file) } catch { failed.push(`${receipt.id}:file`); continue }
  const chunk = dataChunk(buf)
  if (!chunk) { failed.push(`${receipt.id}:wav`); continue }
  let peak = 0
  for (let i = 0; i < chunk.size; i += 2) {
    const sample = Math.abs(buf.readInt16LE(chunk.offset + i))
    if (sample > peak) peak = sample
  }
  if (peak === 0 || peak >= TARGET_PEAK) { skipped++; continue }
  const gain = TARGET_PEAK / peak
  for (let i = 0; i < chunk.size; i += 2) {
    const scaled = Math.max(-32768, Math.min(32767, Math.round(buf.readInt16LE(chunk.offset + i) * gain)))
    buf.writeInt16LE(scaled, chunk.offset + i)
  }
  const sha256 = createHash('sha256').update(buf).digest('hex')
  await writeFile(path.join(outDir, 'phonics', receipts.versionId, `${sha256}.wav`), buf)
  await unlink(file).catch(() => undefined)
  receipt.sha256 = sha256
  receipt.bytes = buf.length
  normalized++
}
await writeFile(receiptPath, JSON.stringify(receipts, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({ total: Object.keys(receipts.assets).length, normalized, skipped, failed: failed.length, failedIds: failed.slice(0, 5) }))
