/** Bind technically checked MiMo examples as pending self-use candidates, never as reviewed media. */
import { createHash, randomUUID } from 'node:crypto'
import { constants } from 'node:fs'
import { copyFile, mkdir, open, readFile, realpath, rename, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDeepStrictEqual, parseArgs } from 'node:util'
import { z } from 'zod'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { lexiconSchema, loadSidecars } from '../src/modules/phonics/v2/sidecars'
import { exampleEvidenceMatches, exampleWavMatches, sameExampleInput } from './lib/phonicsExampleEvidence'
import { missingExampleVoiceJobs } from './lib/phonicsWordVoice'

const { values } = parseArgs({ options: {
  candidate: { type: 'string', multiple: true }, evidence: { type: 'string', multiple: true }, staging: { type: 'string' }, 'course-dir': { type: 'string' }, 'source-course-dir': { type: 'string' },
} })
if (!values.staging || !values.candidate?.length || values.candidate.length !== values.evidence?.length) throw new Error('Provide --staging and matching --candidate / --evidence pairs')
const root = await realpath(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../output'))
const withinRoot = async (target: string) => {
  const resolved = await realpath(path.resolve(target))
  const relative = path.relative(root, resolved)
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Inputs and staging must remain inside output')
  return resolved
}
await withinRoot(path.dirname(path.resolve(values.staging)))
await mkdir(path.resolve(values.staging), { recursive: false }).catch(error => { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error })
const staging = await withinRoot(values.staging)
const lockPath = path.join(staging, '.apply.lock')
const lock = await open(lockPath, 'wx')
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')
const hashSchema = z.string().regex(/^[a-f0-9]{64}$/)
const receipt = z.object({ id: z.string(), text: z.string(), inputHash: hashSchema, status: z.string(), sha256: hashSchema.optional(), durationMs: z.number().int().positive().optional(), bytes: z.number().int().positive().optional() })
const ledgerSchema = z.object({ courseVersionId: z.string(), courseHash: hashSchema, model: z.string().min(1), voice: z.string().min(1), provider: z.literal('xiaomi-mimo'), humanReviewed: z.literal(false), rightsReviewed: z.literal(false), publicationApproved: z.literal(false), assets: z.record(receipt) })
const evidenceSchema = z.object({ method: z.string().min(1), humanReviewed: z.literal(false), results: z.array(z.object({ id: z.string(), audioSha256: hashSchema, textSha256: hashSchema, transcript: z.string(), textMatches: z.boolean(), peak: z.number(), durationMs: z.number(), humanReviewed: z.literal(false) })) })
try {
  const directory = values['course-dir'] ? await withinRoot(values['course-dir']) : candidateDirectory
  const course = await loadCourse(directory), contentHash = courseHash(course)
  const sidecars = await loadSidecars(directory, course.manifest.versionId, contentHash)
  if (!sidecars.lexicon || sidecars.problems.length) throw new Error('Current course sidecars are missing or invalid')
  let sourceHash: string | undefined
  let sourceEntries = new Map<string, (typeof sidecars.lexicon.entries)[number]>()
  if (values['source-course-dir']) {
    const sourceDirectory = await withinRoot(values['source-course-dir'])
    const source = await loadCourse(sourceDirectory)
    sourceHash = courseHash(source)
    const sourceSidecars = await loadSidecars(sourceDirectory, source.manifest.versionId, sourceHash)
    if (source.manifest.versionId !== course.manifest.versionId || !sourceSidecars.lexicon || sourceSidecars.problems.length) throw new Error('Source course sidecars are missing, invalid, or use a different version')
    if (sourceSidecars.lexicon.entries.some(entry => !source.words.some(word => word.id === entry.wordId && word.text === entry.word))) throw new Error('Source lexicon does not match its course')
    sourceEntries = new Map(sourceSidecars.lexicon.entries.map(entry => [entry.wordId, entry]))
    if (sourceEntries.size !== sourceSidecars.lexicon.entries.length) throw new Error('Source lexicon contains duplicate words')
  }
  const lexiconPath = path.join(directory, 'lexicon.json')
  const before = await readFile(lexiconPath)
  if (!isDeepStrictEqual(JSON.parse(before.toString('utf8')), sidecars.lexicon)) throw new Error('Lexicon changed during loading')
  const pairs = await Promise.all(values.candidate.map(async (dir, i) => {
    const source = await withinRoot(dir), evidencePath = await withinRoot(values.evidence![i]!)
    const ledger = ledgerSchema.parse(JSON.parse(await readFile(path.join(source, 'example-audio-candidates.json'), 'utf8')))
    const evidence = evidenceSchema.parse(JSON.parse(await readFile(evidencePath, 'utf8')))
    if (ledger.courseVersionId !== course.manifest.versionId || (ledger.courseHash !== contentHash && ledger.courseHash !== sourceHash)) throw new Error('Candidate belongs to a different course')
    return { source, ledger, evidence }
  }))
  const missing = sidecars.lexicon.entries.filter(entry => !entry.example.audio)
  if (!missing.length) throw new Error('No missing examples to bind')
  const chosen = []
  for (const entry of missing) {
    let selected: { bytes: Buffer; sha256: string; durationMs: number; voice: string; model: string; method: string; sourceCourseHash: string } | undefined
    for (const pair of pairs) {
      if (pair.ledger.courseHash !== contentHash && !sameExampleInput(entry, sourceEntries.get(entry.wordId))) continue
      const job = missingExampleVoiceJobs([entry], { model: pair.ledger.model, voice: pair.ledger.voice, courseHash: pair.ledger.courseHash })[0]!
      const item = pair.ledger.assets[entry.wordId]
      if (!item?.sha256 || !item.durationMs || !item.bytes || item.status !== 'generated_pending_review' || item.id !== job.id || item.text !== job.text || item.inputHash !== job.inputHash) continue
      const proof = pair.evidence.results.find(result => result.id === job.id && result.audioSha256 === item.sha256)
      if (!proof || proof.durationMs !== item.durationMs || !exampleEvidenceMatches(job.text, item.sha256, proof)) continue
      const bytes = await readFile(path.join(pair.source, `${item.sha256}.wav`))
      if (!exampleWavMatches(bytes, item.sha256, item.durationMs, item.bytes)) throw new Error(`Invalid candidate WAV: ${job.id}`)
      selected = { bytes, sha256: item.sha256, durationMs: item.durationMs, voice: pair.ledger.voice, model: pair.ledger.model, method: pair.evidence.method, sourceCourseHash: pair.ledger.courseHash }
    }
    if (!selected) throw new Error(`No matching candidate and evidence: ${entry.wordId}`)
    chosen.push({ entry, ...selected })
  }
  for (const item of chosen) {
    const target = path.join(staging, `${item.sha256}.wav`)
    try { await copyFile(path.join(pairs.find(pair => pair.ledger.assets[item.entry.wordId]?.sha256 === item.sha256)!.source, `${item.sha256}.wav`), target, constants.COPYFILE_EXCL) }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== 'EEXIST' || hash(await readFile(target)) !== item.sha256) throw error }
    if (hash(await readFile(target)) !== item.sha256) throw new Error(`Staged audio hash mismatch: ${item.entry.wordId}`)
    item.entry.example.audio = { sha256: item.sha256, extension: 'wav', durationMs: item.durationMs, bytes: item.bytes.length, voice: `MiMo ${item.voice} (${item.model}); pending review` }
  }
  sidecars.lexicon.counts.exampleAudio = sidecars.lexicon.entries.filter(entry => entry.example.audio).length
  sidecars.lexicon.sources['mimo-example-audio'] = { provider: 'xiaomi-mimo', humanReviewed: false, rightsReviewed: false, publicationApproved: false, evidence: [...new Set(chosen.map(item => item.method))], sourceCourseHashes: [...new Set(chosen.map(item => item.sourceCourseHash))] }
  lexiconSchema.parse(sidecars.lexicon)
  if (hash(await readFile(lexiconPath)) !== hash(before)) throw new Error('Lexicon changed during candidate validation')
  const temp = path.join(directory, `.lexicon-${randomUUID()}.tmp`)
  try {
    await writeFile(temp, JSON.stringify(sidecars.lexicon, null, 1) + '\n', { encoding: 'utf8', flag: 'wx' })
    await rename(temp, lexiconPath)
  } finally { await unlink(temp).catch(() => undefined) }
  console.log(JSON.stringify({ bound: chosen.length, exampleAudio: sidecars.lexicon.counts.exampleAudio, humanReviewed: false, publicationApproved: false }))
} finally { await lock.close(); await unlink(lockPath) }
