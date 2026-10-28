/** 只绑定 MiMo 台账中的纯音素（sound-*）与小书朗读（r-lXX-page-*）条目——
 * 词级槽位由 Edge 神经音频负责，不在此覆盖。 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: { candidates: { type: 'string' } } })
if (!values.candidates) throw Error('Explicit --candidates is required')
const ledger = JSON.parse(await readFile(path.resolve(values.candidates), 'utf8')) as {
  assets: Record<string, { sha256: string; durationMs: number; bytes: number }>
}
const dir = candidateDirectory
const assetsPath = path.join(dir, 'assets.json')
const assets = JSON.parse(await readFile(assetsPath, 'utf8')) as Array<{ id: string; sha256: string | null; extension: string; durationMs: number | null; speakerId: string | null; revision: number; sourceLicense: string | null; reviewStatus: string }>
const byId = new Map(assets.map(a => [a.id, a]))
let updated = 0
for (const [id, item] of Object.entries(ledger.assets)) {
  const isPhoneme = id.startsWith('sound-')
  const isPassage = /^r-l\d+-page-\d+$/.test(id)
  if (!isPhoneme && !isPassage) continue
  const asset = byId.get(id)
  if (!asset) continue
  asset.sha256 = item.sha256
  asset.extension = 'wav'
  asset.durationMs = item.durationMs
  asset.speakerId = 'MiMo TTS (茉莉) pending review'
  asset.revision += 1
  asset.sourceLicense = 'MiMo TTS generated for taoread phonics; listening review pending'
  asset.reviewStatus = 'pending'
  updated++
}
await writeFile(assetsPath, JSON.stringify(assets, null, 2) + '\n', 'utf8')
const course = await loadCourse(dir)
const hash = courseHash(course)
const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8')) as Record<string, unknown>
manifest.contentHash = hash
await writeFile(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({ updated, contentHash: hash }))
