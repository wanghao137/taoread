/** 将 Edge 神经音频候选绑定进课程资产槽（整词/拼读/分开读 GB 三槽）。
 * 用法：npx tsx scripts/apply-phonics-audio-edge.mts --candidates <audio-candidates-edge.json>
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { candidateDirectory } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: { candidates: { type: 'string' } } })
if (!values.candidates) throw Error('Explicit --candidates is required')
const ledger = JSON.parse(await readFile(path.resolve(values.candidates), 'utf8')) as {
  assets: Array<{ id: string; kind: string; accent: string; sha256: string; durationMs: number; bytes: number; voice: string }>
}
const dir = candidateDirectory
const assetsPath = path.join(dir, 'assets.json')
const assets = JSON.parse(await readFile(assetsPath, 'utf8')) as Array<{ id: string; sha256: string | null; extension: string; durationMs: number | null; speakerId: string | null; revision: number; sourceLicense: string | null; reviewStatus: string }>
const byId = new Map(assets.map(a => [a.id, a]))

let updated = 0, audioSlots = 0
for (const item of ledger.assets) {
  // edge-gb-<wordId> → w-<word>-word；edge-gb-<wordId>-blend → -blend；edge-gb-<wordId>-segment → -segment
  const m = /^edge-gb-(w-[a-z0-9-]+?)(-blend|-segment)?$/.exec(item.id)
  if (!m) continue
  const suffix = m[2] ?? ''
  const asset = byId.get(`${m[1]}${suffix}`)
  if (!asset || !['word', 'blend', 'segment'].includes(asset.purpose)) continue
  asset.sha256 = item.sha256
  asset.extension = 'mp3'
  asset.durationMs = item.durationMs
  asset.speakerId = item.voice
  asset.revision += 1
  asset.sourceLicense = `Microsoft Edge neural TTS (${item.voice}) generated for taoread phonics; listening review pending`
  asset.reviewStatus = 'pending'
  updated++
}
for (const a of assets) if (['word', 'blend', 'segment', 'passage', 'phoneme', 'instruction_zh'].includes(a.purpose)) audioSlots++
await writeFile(assetsPath, JSON.stringify(assets, null, 2) + '\n', 'utf8')
const course = await loadCourseSafe()
console.log(JSON.stringify({ updated, audioSlots, contentHash: course }))

async function loadCourseSafe() {
  const { loadCourse, courseHash } = await import('../src/modules/phonics/v2/courseRegistry')
  const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8')) as Record<string, unknown>
  const course = await loadCourse(dir)
  const hash = courseHash(course)
  manifest.contentHash = hash
  await writeFile(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
  return hash
}
