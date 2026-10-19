/** Bind real candidate files, with hashes checked, without creating review approvals. */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { parseArgs } from 'node:util'

const { values } = parseArgs({ options: { course: { type: 'string' }, media: { type: 'string' } } })
if (!values.course || !values.media) throw Error('Explicit --course and --media paths are required')
const course = path.resolve(values.course), media = path.resolve(values.media)
const load = async (root, name) => JSON.parse(await readFile(path.join(root, name), 'utf8'))
const manifest = await load(course, 'manifest.json')
const assets = await load(course, 'assets.json')
if (manifest.status !== 'draft' || assets.some(a => a.reviewStatus === 'approved')) throw Error('Candidate binding cannot modify reviewed content')
const images = await load(media, 'illustrations.json')
const speech = await load(media, 'audio-candidates.json')
const controlled = await load(media, 'controlled-audio.json')
if ([images, speech, controlled].some(r => r.complete !== true || r.versionId !== manifest.versionId)) throw Error('Incomplete or mismatched receipts')
if (!/^[a-z0-9-]+$/.test(manifest.versionId)) throw Error('Unsafe course version')
const candidates = { ...speech.assets, ...controlled.assets, ...Object.fromEntries(images.assets.map(a => [a.id, a])) }
const bound = []
for (const asset of assets) {
  const candidate = candidates[asset.id]
  if (!candidate || !/^[a-f0-9]{64}$/.test(candidate.sha256) || !['webp', 'mp3'].includes(candidate.extension)) throw Error(`Missing candidate: ${asset.id}`)
  if (candidate.purpose !== asset.purpose) throw Error(`Purpose mismatch: ${asset.id}`)
  const bytes = await readFile(path.join(media, 'phonics', manifest.versionId, candidate.sha256 + '.' + candidate.extension))
  if (createHash('sha256').update(bytes).digest('hex') !== candidate.sha256) throw Error(`File hash mismatch: ${asset.id}`)
  bound.push({ ...asset, sha256: candidate.sha256, extension: candidate.extension,
    durationMs: asset.purpose === 'image' ? null : candidate.durationMs,
    speakerId: asset.purpose === 'image' ? null : candidate.speakerId ?? (candidate.provider === 'configured-stepaudio' && candidate.requestedAccent === 'zh' ? 'phonics-zh-candidate-v1' : null),
    sourceLicense: candidate.sourceLicense ?? 'Existing configured TaoRead TTS provider; rights review pending',
    reviewStatus: (candidate.flags ?? []).includes('EXCESS_DURATION_REQUIRES_REVIEW') ? 'rejected' : 'pending',
  })
}
const merged = { complete: true, versionId: manifest.versionId, publicationApproved: false,
  method: '27 configured-provider Chinese instructions and 58 explicit-phoneme GB neural candidates; all require speech and rights review',
  assets: Object.fromEntries(bound.filter(a => a.purpose !== 'image').map(a => [a.id, candidates[a.id]])),
}
await writeFile(path.join(media, 'combined-audio-candidates.json'), JSON.stringify(merged, null, 2) + '\n')
await writeFile(path.join(course, 'assets.json'), JSON.stringify(bound, null, 2) + '\n')
console.log(JSON.stringify({ complete: true, bound: bound.length, approvalsCreated: 0, rejected: bound.filter(a => a.reviewStatus === 'rejected').map(a => a.id) }))
