/** Bind expansion-3 candidate slots from four ledgers and refresh hash locks.
 * 用法（apps/server）：npx tsx scripts/apply-phonics-expansion3-bindings.mts
 *   --candidates <候选目录> --edge-ledger <...> --mimo-ledger <...> --image-ledger <...> --example-ledger <...>
 * 规则：整词 ← Edge（GB）；分音/拼读 ← 整词哈希（诚实占位，安全层隐藏+回退）；
 * 新映射音素 ← MiMo（待听审）；词义图 ← AI 生图台账；词典例句 ← MiMo 例句台账。
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { loadCourse, courseHash } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({
  options: {
    candidates: { type: 'string' },
    'edge-ledger': { type: 'string' },
    'mimo-ledger': { type: 'string'},
    'image-ledger': { type: 'string' },
    'example-ledger': { type: 'string' },
  },
})
for (const key of ['candidates', 'edge-ledger', 'mimo-ledger', 'image-ledger', 'example-ledger']) {
  if (!values[key as 'candidates']) throw new Error(`--${key} is required`)
}

const edgeLedger = JSON.parse(await readFile(path.resolve(values['edge-ledger']!), 'utf8')) as { assets: Array<{ id: string; sha256: string; durationMs: number; voice: string }> }
const edge = new Map(edgeLedger.assets.map(a => [a.id, a]))
const mimoLedger = JSON.parse(await readFile(path.resolve(values['mimo-ledger']!), 'utf8')) as { assets: Record<string, { sha256: string; extension: 'mp3' | 'wav'; durationMs: number; bytes: number; voice?: string | null; model?: string; status: string }> }
const mimo = new Map(Object.entries(mimoLedger.assets))

const imageLedger = JSON.parse(await readFile(path.resolve(values['image-ledger']!), 'utf8')) as { assets: Record<string, { sha256: string; bytes: number; model: string; status: string }> }
const images = new Map(Object.entries(imageLedger.assets))
const exampleLedger = JSON.parse(await readFile(path.resolve(values['example-ledger']!), 'utf8')) as { assets: Record<string, { sha256: string; durationMs: number; bytes: number; status: string; voice: string }> }
const examples = new Map(Object.entries(exampleLedger.assets))

const assetsPath = path.join(path.resolve(values.candidates!), 'assets.json')
const assets = JSON.parse(await readFile(assetsPath, 'utf8')) as Array<{
  id: string; purpose: string; accent: string; sha256: string | null; extension: 'wav' | 'mp3' | 'webp' | 'png'
  durationMs: number | null; speakerId: string | null; revision: number; sourceLicense: string | null
  reviewStatus: string; fixture: boolean
}>

let bound = 0, skipped = 0
const problems: string[] = []
for (const asset of assets) {
  if (asset.sha256) { skipped++; continue }
  let source: { sha256: string; extension: 'wav' | 'mp3' | 'webp'; durationMs: number | null; speakerId: string; license: string } | null = null
  if (asset.purpose === 'word') {
    const hit = edge.get('edge-gb-' + asset.id.replace(/-word$/, ''))
    if (hit) source = { sha256: hit.sha256, extension: 'mp3', durationMs: hit.durationMs, speakerId: hit.voice, license: 'Microsoft Edge neural TTS (en-GB-SoniaNeural) generated for taoread phonics; listening review pending' }
    else problems.push('no-edge-word:' + asset.id)
  } else if (asset.purpose === 'segment' || asset.purpose === 'blend') {
    const hit = edge.get('edge-gb-' + asset.id.replace(/-(segment|blend)$/, ''))
    if (hit) source = { sha256: hit.sha256, extension: 'mp3', durationMs: hit.durationMs, speakerId: hit.voice, license: 'Microsoft Edge neural TTS (en-GB-SoniaNeural) whole-word placeholder for ' + asset.purpose + '; listening review pending' }
    else problems.push('no-edge-word-for-' + asset.purpose + ':' + asset.id)
  } else if (asset.purpose === 'phoneme') {
    const hit = mimo.get(asset.id)
    if (hit) source = { sha256: hit.sha256, extension: 'wav', durationMs: hit.durationMs, speakerId: hit.voice ?? hit.model ?? 'mimo', license: 'Xiaomi MiMo TTS generated for taoread phonics; listening review pending' }
    else problems.push('no-mimo:' + asset.id)
  } else if (asset.purpose === 'image') {
    const hit = images.get(asset.id)
    if (hit) source = { sha256: hit.sha256, extension: 'webp', durationMs: null, speakerId: hit.model, license: 'AI generated illustration for taoread phonics; rights and teaching review pending' }
    else problems.push('no-image:' + asset.id)
  } else {
    problems.push('unknown-purpose:' + asset.id)
  }
  if (!source) continue
  asset.sha256 = source.sha256
  asset.extension = source.extension
  asset.durationMs = source.durationMs
  asset.speakerId = source.speakerId
  asset.revision += 1
  asset.sourceLicense = source.license
  asset.reviewStatus = 'pending'
  bound++
}
await writeFile(assetsPath, JSON.stringify(assets, null, 2) + '\n', 'utf8')

// 词典例句绑定（29 个新词条的 MiMo 例句）
const lexPath = path.join(path.resolve(values.candidates!), 'lexicon.json')
const lexicon = JSON.parse(await readFile(lexPath, 'utf8')) as {
  counts: { exampleAudio: number; [key: string]: number | undefined }
  courseContentHash: string
  entries: Array<{ wordId: string; word: string; example: { audio: { sha256: string; extension: 'wav'; durationMs: number; bytes: number; voice: string } | null } }>
}
let lexBound = 0
for (const entry of lexicon.entries) {
  if (entry.example.audio) continue
  const hit = examples.get(entry.wordId)
  if (!hit || hit.status !== 'generated_pending_review') { problems.push('no-example:' + entry.wordId); continue }
  entry.example.audio = { sha256: hit.sha256, extension: 'wav', durationMs: hit.durationMs, bytes: hit.bytes, voice: hit.voice + '; pending review' }
  lexBound++
}
lexicon.counts = { ...lexicon.counts, exampleAudio: lexicon.entries.filter(entry => entry.example.audio).length }
await writeFile(lexPath, JSON.stringify(lexicon, null, 1) + '\n', 'utf8')

// 重算课程哈希并把三份哈希锁对齐
const course = await loadCourse(path.resolve(values.candidates!))
const hash = courseHash(course)
lexicon.courseContentHash = hash
await writeFile(lexPath, JSON.stringify(lexicon, null, 1) + '\n', 'utf8')
const manifestPath = path.join(path.resolve(values.candidates!), 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, unknown>
manifest.contentHash = hash
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
const usPath = path.join(path.resolve(values.candidates!), 'usAudio.json')
const us = JSON.parse(await readFile(usPath, 'utf8')) as { courseHash: string }
us.courseHash = hash
await writeFile(usPath, JSON.stringify(us, null, 1) + '\n', 'utf8')
console.log(JSON.stringify({ bound, lexBound, skipped, contentHash: hash, problems: problems.slice(0, 12) }))
