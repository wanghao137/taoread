/** Produce missing MiMo example-audio candidates; never update the course or release status. */
import { createHash, randomUUID } from 'node:crypto'
import { mkdir, open, readFile, realpath, rename, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import dotenv from 'dotenv'
import { z } from 'zod'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { loadSidecars } from '../src/modules/phonics/v2/sidecars'
import { TtsError } from '../src/modules/tts/client'
import { parseWav, synthesizeSegmentMimo } from '../src/modules/tts/mimo'
import { missingExampleVoiceJobs } from './lib/phonicsWordVoice'

const { values } = parseArgs({ options: { out: { type: 'string' }, 'course-dir': { type: 'string' }, 'env-file': { type: 'string' }, concurrency: { type: 'string', default: '2' }, ids: { type: 'string' } } })
if (!values.out || !values['env-file']) throw new Error('Provide --out and --env-file')
const concurrency = Number(values.concurrency)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 3) throw new Error('Concurrency must be 1-3')
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const outputRoot = await realpath(path.join(repo, 'output'))
const out = path.resolve(values.out)
const parent = await realpath(path.dirname(out))
const within = (base: string, target: string) => { const relative = path.relative(base, target); return !relative.startsWith('..') && !path.isAbsolute(relative) }
if (!within(outputRoot, parent)) throw new Error('Candidate output must be under the workspace output directory')
await mkdir(out, { recursive: false }).catch(error => { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error })
if (!within(outputRoot, await realpath(out))) throw new Error('Candidate output resolves outside the workspace output directory')
const env = dotenv.parse(await readFile(path.resolve(values['env-file'])))
if (!env.MIMO_BASE || !env.MIMO_API_KEY) throw new Error('MiMo provider configuration is incomplete')
const model = env.MIMO_MODEL || 'mimo-v2.5-tts', voice = env.MIMO_VOICE_EN || 'Mia'
const directory = values['course-dir'] ? path.resolve(values['course-dir']) : candidateDirectory
const course = await loadCourse(directory), contentHash = courseHash(course)
const sidecars = await loadSidecars(directory, course.manifest.versionId, contentHash)
if (!sidecars.lexicon || sidecars.problems.length) throw new Error('Course sidecars are missing or invalid')
const missing = missingExampleVoiceJobs(sidecars.lexicon.entries, { model, voice, courseHash: contentHash })
const selected = values.ids ? new Set(values.ids.split(',').map(id => id.trim()).filter(Boolean)) : null
if (selected && (!selected.size || [...selected].some(id => !missing.some(job => job.id === id)))) throw new Error('Unknown or already voiced example id')
const jobs = missing.filter(job => !selected || selected.has(job.id))
const receiptSchema = z.object({ id: z.string(), text: z.string(), inputHash: z.string().regex(/^[a-f0-9]{64}$/), status: z.enum(['generated_pending_review', 'generation_failed']), sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(), durationMs: z.number().int().positive().optional(), bytes: z.number().int().positive().optional(), errorCode: z.string().optional() }).strict()
const ledgerSchema = z.object({ schemaVersion: z.literal(1), courseVersionId: z.string(), courseHash: z.string(), model: z.string(), voice: z.string(), provider: z.literal('xiaomi-mimo'), humanReviewed: z.literal(false), rightsReviewed: z.literal(false), publicationApproved: z.literal(false), assets: z.record(receiptSchema) }).strict()
type Receipt = z.infer<typeof receiptSchema>
const ledgerPath = path.join(out, 'example-audio-candidates.json'), lockPath = path.join(out, '.generation.lock')
const lock = await open(lockPath, 'wx')
let receipts: Record<string, Receipt> = {}, cursor = 0, halted = false, saveQueue = Promise.resolve()
const save = () => {
  saveQueue = saveQueue.then(async () => {
    const temp = path.join(out, `.ledger-${randomUUID()}.tmp`)
    await writeFile(temp, JSON.stringify({ schemaVersion: 1, courseVersionId: course.manifest.versionId, courseHash: contentHash, model, voice, provider: 'xiaomi-mimo', humanReviewed: false, rightsReviewed: false, publicationApproved: false, assets: receipts }, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
    await rename(temp, ledgerPath)
  })
  return saveQueue
}
async function valid(receipt: Receipt | undefined, inputHash: string) {
  if (!receipt?.sha256 || receipt.status !== 'generated_pending_review' || receipt.inputHash !== inputHash) return false
  const bytes = await readFile(path.join(out, `${receipt.sha256}.wav`)).catch(() => null)
  const info = bytes && parseWav(bytes)
  return Boolean(bytes && info && bytes.length === receipt.bytes && info.durationMs === receipt.durationMs && createHash('sha256').update(bytes).digest('hex') === receipt.sha256)
}
async function worker() {
  while (!halted && cursor < jobs.length) {
    const job = jobs[cursor++]!
    if (await valid(receipts[job.id], job.inputHash)) continue
    let failure = 'generation_error'
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await synthesizeSegmentMimo({ base: env.MIMO_BASE!, apiKey: env.MIMO_API_KEY!, model }, { text: job.text, instruction: job.instruction, voice })
        const info = parseWav(result.audio)
        if (!info || info.durationMs < 300 || info.durationMs > 20000) throw new Error('invalid_audio')
        const sha256 = createHash('sha256').update(result.audio).digest('hex')
        const target = path.join(out, `${sha256}.wav`)
        try { await writeFile(target, result.audio, { flag: 'wx' }) }
        catch (error) { if ((error as NodeJS.ErrnoException).code !== 'EEXIST' || createHash('sha256').update(await readFile(target)).digest('hex') !== sha256) throw error }
        receipts[job.id] = { id: job.id, text: job.text, inputHash: job.inputHash, status: 'generated_pending_review', sha256, durationMs: info.durationMs, bytes: result.audio.length }
        failure = ''
        console.log(JSON.stringify({ id: job.id, generated: true, durationMs: info.durationMs }))
        break
      } catch (error) {
        failure = error instanceof TtsError ? error.message.match(/\b\d{3}\b/)?.[0] ?? 'provider_error' : 'invalid_audio_or_write'
        if (['401', '402', '403', 'invalid_audio_or_write'].includes(failure)) { halted = true; break }
        if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 2000))
      }
    }
    if (failure) { receipts[job.id] = { id: job.id, text: job.text, inputHash: job.inputHash, status: 'generation_failed', errorCode: failure }; console.error(JSON.stringify({ id: job.id, generated: false, errorCode: failure })) }
    await save()
  }
}
try {
  try {
    const old = ledgerSchema.parse(JSON.parse(await readFile(ledgerPath, 'utf8')))
    if (old.courseVersionId !== course.manifest.versionId || old.courseHash !== contentHash || old.model !== model || old.voice !== voice) throw new Error('Existing candidate ledger uses different inputs')
    receipts = old.assets
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
  await Promise.all(Array.from({ length: concurrency }, worker))
  await save()
  const generated = jobs.filter(job => receipts[job.id]?.status === 'generated_pending_review').length
  console.log(JSON.stringify({ requested: jobs.length, generated, failed: jobs.length - generated, halted, humanReviewed: false, publicationApproved: false }))
  if (generated !== jobs.length) process.exitCode = 1
} finally { await lock.close(); await unlink(lockPath) }
