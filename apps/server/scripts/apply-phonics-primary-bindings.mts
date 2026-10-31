/** Bind the v2 primary-course candidate's unbound slots from candidate ledgers.
 * 用法（apps/server）：npx tsx scripts/apply-phonics-primary-bindings.mts
 *   --candidates <候选课程目录> --edge-ledger <audio-candidates-edge.json>
 *   --mimo-ledger <audio-candidates.json> --image-ledger <image-candidates.json>
 * 规则：整词/字母名 ← Edge 神经音（GB）；中文指令/离散音素/句子朗读 ← MiMo（待听审）；
 * 分音/拼读 ← 绑整词哈希（诚实 AUDIO_DUPLICATE，由音频安全层隐藏并回退整词）。
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { loadCourse, courseHash } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({
  options: {
    candidates: { type: 'string' },
    'edge-ledger': { type: 'string' },
    'mimo-ledger': { type: 'string' },
    'image-ledger': { type: 'string' },
  },
})
for (const key of ['candidates', 'edge-ledger', 'mimo-ledger', 'image-ledger']) {
  if (!values[key as 'candidates']) throw new Error(`--${key} is required`)
}

interface EdgeAsset { id: string; sha256: string; durationMs: number; bytes: number; voice: string }
const edgeLedger = JSON.parse(await readFile(path.resolve(values['edge-ledger']!), 'utf8')) as { assets: EdgeAsset[] }
const edge = new Map(edgeLedger.assets.map(a => [a.id, a]))
const mimoLedger = JSON.parse(await readFile(path.resolve(values['mimo-ledger']!), 'utf8')) as { assets: Record<string, { sha256: string; extension: 'mp3' | 'wav'; durationMs: number; bytes: number; voice?: string | null; status: string }> }
const mimo = new Map(Object.entries(mimoLedger.assets))
const imageLedger = JSON.parse(await readFile(path.resolve(values['image-ledger']!), 'utf8')) as { assets: Record<string, { sha256: string; bytes: number; model: string; status: string }> }
const images = new Map(Object.entries(imageLedger.assets))

const assetsPath = path.join(path.resolve(values.candidates!), 'assets.json')
const assets = JSON.parse(await readFile(assetsPath, 'utf8')) as Array<{
  id: string; purpose: string; accent: string; sha256: string | null; extension: 'wav' | 'mp3' | 'webp' | 'png'
  durationMs: number | null; speakerId: string | null; revision: number; sourceLicense: string | null
  reviewStatus: string; fixture: boolean
}>

const edgeFile = (hash: string) => path.resolve(values['edge-ledger']!, '..', 'phonics', 'taoread-phonics-gb-v2', hash + '.mp3')
const mimoFile = (hash: string) => path.resolve(values['mimo-ledger']!, '..', 'phonics', 'taoread-phonics-gb-v2', hash + '.wav')
const imageFile = (hash: string) => path.resolve(values['image-ledger']!, '..' + path.sep + 'phonics', 'taoread-phonics-gb-v2', hash + '.webp')
const { existsSync } = await import('node:fs')

let bound = 0, skipped = 0
const problems: string[] = []
for (const asset of assets) {
  if (asset.sha256) { skipped++; continue }
  let source: { sha256: string; extension: 'wav' | 'mp3' | 'webp'; durationMs: number | null; speakerId: string; license: string }
  if (asset.purpose === 'word') {
    const hit = edge.get('edge-gb-' + asset.id.replace(/-word$/, ''))
    if (!hit) { problems.push('no-edge-word:' + asset.id); continue }
    source = { sha256: hit.sha256, extension: 'mp3', durationMs: hit.durationMs, speakerId: hit.voice, license: 'Microsoft Edge neural TTS (en-GB-SoniaNeural) generated for taoread phonics; listening review pending' }
  } else if (asset.purpose === 'letter_name') {
    const letter = asset.id.replace(/^letter-name-/, '')
    const hit = edge.get('edge-gb-letter-' + letter)
    if (!hit) { problems.push('no-edge-letter:' + asset.id); continue }
    source = { sha256: hit.sha256, extension: 'mp3', durationMs: hit.durationMs, speakerId: hit.voice, license: 'Microsoft Edge neural TTS (en-GB-SoniaNeural) letter-name recording; listening review pending' }
  } else if (asset.purpose === 'segment' || asset.purpose === 'blend') {
    const wordId = asset.id.replace(/-(segment|blend)$/, '')
    const hit = edge.get('edge-gb-' + wordId)
    if (!hit) { problems.push('no-edge-word-for-' + asset.purpose + ':' + asset.id); continue }
    source = { sha256: hit.sha256, extension: 'mp3', durationMs: hit.durationMs, speakerId: hit.voice, license: 'Microsoft Edge neural TTS (en-GB-SoniaNeural) whole-word placeholder for ' + asset.purpose + '; listening review pending' }
  } else if (asset.purpose === 'instruction_zh' || asset.purpose === 'phoneme' || asset.purpose === 'passage') {
    const hit = mimo.get(asset.id)
    if (!hit) { problems.push('no-mimo:' + asset.id); continue }
    source = { sha256: hit.sha256, extension: 'wav', durationMs: hit.durationMs, speakerId: hit.voice ?? hit.model, license: 'Xiaomi MiMo TTS generated for taoread phonics; listening review pending' }
  } else if (asset.purpose === 'image') {
    const hit = images.get(asset.id)
    if (!hit) { problems.push('no-image:' + asset.id); continue }
    source = { sha256: hit.sha256, extension: 'webp', durationMs: null, speakerId: hit.model, license: 'AI generated illustration for taoread phonics; rights and teaching review pending' }
  } else {
    problems.push('unknown-purpose:' + asset.id)
    continue
  }
  if (!existsSync(edgeFile(source.sha256)) && !existsSync(mimoFile(source.sha256)) && !existsSync(imageFile(source.sha256))) {
    problems.push('file-missing:' + asset.id)
    continue
  }
  asset.sha256 = source.sha256
  asset.extension = source.extension
  asset.durationMs = source.durationMs
  asset.speakerId = source.speakerId
  asset.revision += 1
  asset.sourceLicense = source.license
  asset.reviewStatus = 'pending'
  bound++
}
if (problems.length) {
  console.error(JSON.stringify({ bound, skipped, problems: problems.slice(0, 20) }))
  throw new Error(problems.length + ' slot(s) could not be bound')
}
await writeFile(assetsPath, JSON.stringify(assets, null, 2) + '\n', 'utf8')
const course = await loadCourse(path.resolve(values.candidates!))
const hash = courseHash(course)
const manifestPath = path.join(path.resolve(values.candidates!), 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as Record<string, unknown>
manifest.contentHash = hash
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
console.log(JSON.stringify({ bound, skipped, totalAssets: assets.length, contentHash: hash }))

