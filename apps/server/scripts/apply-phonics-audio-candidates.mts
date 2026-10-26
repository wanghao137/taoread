/**
 * 把 MiMo 生成的音频候选写回课程资产绑定（docs/90）。
 *
 * 只更新 audio 资产的 sha256/extension/durationMs/speakerId/revision/sourceLicense；
 * reviewStatus 置回 pending、不动 reviews——旧签认随旧哈希自然失效，新音频必须重新听审。
 * 图片资产完全不动。manifest.contentHash 重算回写（候选包 draft 未发布，生产尝试为 0）。
 *
 * 用法：npx tsx scripts/apply-phonics-audio-candidates.mts --candidates <audio-candidates.json>
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: { candidates: { type: 'string' } } })
if (!values.candidates) throw Error('Explicit --candidates is required')
const receiptPath = path.resolve(values.candidates)
const receipts = JSON.parse(await readFile(receiptPath, 'utf8')) as {
  versionId: string
  assets: Record<string, { id: string; purpose: string; sha256?: string; extension?: 'mp3' | 'wav'; durationMs?: number; voice?: string | null; reviewedByHuman: boolean }>
}
if (receipts.versionId !== 'taoread-phonics-gb-v1') throw Error(`Unexpected versionId ${receipts.versionId}`)

const dir = candidateDirectory
const assetsPath = path.join(dir, 'assets.json')
const assets = JSON.parse(await readFile(assetsPath, 'utf8')) as Array<{ id: string; purpose: string; sha256: string | null; extension: string; durationMs: number | null; speakerId: string | null; revision: number; sourceLicense: string | null; reviewStatus: string }>
const byId = new Map(assets.map(a => [a.id, a]))

const updated = { n: 0 }
const missing: string[] = []
for (const receipt of Object.values(receipts.assets)) {
  const asset = byId.get(receipt.id)
  if (!asset) { missing.push(receipt.id); continue }
  if (asset.purpose === 'image') throw Error(`Refusing to touch image asset ${asset.id}`)
  if (!receipt.sha256 || receipt.reviewedByHuman) throw Error(`Receipt ${receipt.id} is not an unreviewed generated candidate`)
  asset.sha256 = receipt.sha256
  asset.extension = receipt.extension ?? 'wav'
  asset.durationMs = receipt.durationMs ?? null
  asset.speakerId = receipt.voice ? `xiaomi-mimo:${receipt.voice}` : 'xiaomi-mimo'
  asset.revision += 1
  asset.sourceLicense = 'Generated with Xiaomi MiMo TTS (mimo-v2.5-tts); generated-content terms and listening review pending'
  asset.reviewStatus = 'pending'
  updated.n++
}
if (missing.length) throw Error(`Receipts without matching assets: ${missing.join(', ')}`)

await writeFile(assetsPath, JSON.stringify(assets, null, 2) + '\n', 'utf8')

const manifestPath = path.join(dir, 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, unknown>
// 课程包通过 zod 校验后再取内容哈希（courseHash 不含 contentHash/status/reviews/reviewStatus）
const course = await loadCourse(candidateDirectory)
manifest.contentHash = courseHash(course)
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({ updated: updated.n, audioAssets: assets.filter(a => a.purpose !== 'image').length, contentHash: manifest.contentHash }))
