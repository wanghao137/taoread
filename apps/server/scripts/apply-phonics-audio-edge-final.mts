/** Legacy Edge candidates may be bound as whole words only. */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: { candidates: { type: 'string' } } })
if (!values.candidates) throw Error('Explicit --candidates is required')
const ledger = JSON.parse(await readFile(path.resolve(values.candidates), 'utf8')) as {
  assets: Array<{ id: string; sha256: string; durationMs: number; voice: string }>
}
const byEdgeId = new Map(ledger.assets.map(a => [a.id, a]))
const dir = candidateDirectory
const assetsPath = path.join(dir, 'assets.json')
const assets = JSON.parse(await readFile(assetsPath, 'utf8')) as Array<{ id: string; purpose: string; sha256: string | null; extension: string; durationMs: number | null; speakerId: string | null; revision: number; sourceLicense: string | null; reviewStatus: string }>
let updated = 0, missing = 0
for (const asset of assets) {
  if (asset.purpose !== 'word') continue
  const m = /^w-(.+)-word$/.exec(asset.id)
  if (!m) continue
  const wordId = `w-${m[1]}`
  const edge = byEdgeId.get(`edge-gb-${wordId}`)
  if (!edge) { missing++; continue }
  asset.sha256 = edge.sha256
  asset.extension = 'mp3'
  asset.durationMs = edge.durationMs
  asset.speakerId = edge.voice
  asset.revision += 1
  asset.sourceLicense = `Microsoft Edge neural TTS (${edge.voice}) generated for taoread phonics; listening review pending`
  asset.reviewStatus = 'pending'
  updated++
}
await writeFile(assetsPath, JSON.stringify(assets, null, 2) + '\n', 'utf8')
const course = await loadCourse(dir)
const hash = courseHash(course)
const manifest = JSON.parse(await readFile(path.join(dir, 'manifest.json'), 'utf8')) as Record<string, unknown>
manifest.contentHash = hash
await writeFile(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({ updated, missing, contentHash: hash }))
