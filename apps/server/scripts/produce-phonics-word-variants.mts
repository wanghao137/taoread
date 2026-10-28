/** Generate MiMo word-audio candidates only; no installed course or release metadata is modified. */
import { createHash, randomUUID } from 'node:crypto'
import { mkdir, open, readFile, realpath, rename, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import dotenv from 'dotenv'
import { z } from 'zod'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { parseWav, synthesizeSegmentMimo } from '../src/modules/tts/mimo'
import { TtsError } from '../src/modules/tts/client'
import { wordVoiceJobs } from './lib/phonicsWordVoice'

const { values } = parseArgs({ options: { out: { type: 'string' }, 'env-file': { type: 'string' }, accent: { type: 'string', default: 'US' }, ids: { type: 'string' }, concurrency: { type: 'string', default: '2' } } })
if (!values.out || !values['env-file'] || !['GB', 'US'].includes(values.accent!)) throw new Error('Provide --out, --env-file and an accent of GB or US')
const concurrency = Number(values.concurrency)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 3) throw new Error('Concurrency must be 1-3')
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const outputRoot = await realpath(path.join(repo, 'output'))
const out = path.resolve(values.out)
const parent = await realpath(path.dirname(out))
const relative = path.relative(outputRoot, parent)
if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Candidate output must be under the workspace output directory')
await mkdir(out, { recursive: false }).catch(error => { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error })
const actualOut = await realpath(out)
const actualRelative = path.relative(outputRoot, actualOut)
if (actualRelative.startsWith('..') || path.isAbsolute(actualRelative)) throw new Error('Candidate output resolves outside the workspace output directory')
const env = dotenv.parse(await readFile(path.resolve(values['env-file'])))
if (!env.MIMO_BASE || !env.MIMO_API_KEY) throw new Error('MiMo provider configuration is incomplete')
const accent = values.accent as 'GB' | 'US'
const model = env.MIMO_MODEL || 'mimo-v2.5-tts'
const voice = accent === 'US' ? env.MIMO_VOICE_US || 'Chloe' : env.MIMO_VOICE_GB || env.MIMO_VOICE_EN || 'Mia'
const course = await loadCourse(candidateDirectory)
const contentHash = courseHash(course)
const selected = values.ids ? new Set(values.ids.split(',').map(id => id.trim()).filter(Boolean)) : undefined
if (selected?.size === 0) throw new Error('No word ids selected')
const jobs = wordVoiceJobs(course.words, { accent, model, voice, courseHash: contentHash }, selected)
const receiptSchema = z.object({ id: z.string(), word: z.string(), inputHash: z.string().regex(/^[a-f0-9]{64}$/), status: z.enum(['generated_pending_review', 'generation_failed']), sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(), durationMs: z.number().int().positive().optional(), bytes: z.number().int().positive().optional(), flags: z.array(z.string()), errorCode: z.string().nullable().optional() }).strict()
const ledgerSchema = z.object({ schemaVersion: z.literal(1), courseVersionId: z.string(), courseHash: z.string(), requestedAccent: z.enum(['GB', 'US']), actualAccent: z.null(), model: z.string(), voice: z.string(), provider: z.literal('xiaomi-mimo'), humanReviewed: z.literal(false), rightsReviewed: z.literal(false), publicationApproved: z.literal(false), assets: z.record(receiptSchema) }).strict()
type Receipt = z.infer<typeof receiptSchema>
const ledgerPath = path.join(out, 'word-audio-candidates.json')
let receipts: Record<string, Receipt> = {}
const lockPath = path.join(out, '.generation.lock')
const lock = await open(lockPath, 'wx')
let saveQueue = Promise.resolve(), cursor = 0, halted = false
async function save() {
  saveQueue = saveQueue.then(async () => {
    const temp = path.join(out, `.ledger-${randomUUID()}.tmp`)
    const ledger = { schemaVersion: 1, courseVersionId: course.manifest.versionId, courseHash: contentHash, requestedAccent: accent, actualAccent: null, model, voice, provider: 'xiaomi-mimo', humanReviewed: false, rightsReviewed: false, publicationApproved: false, assets: receipts }
    await writeFile(temp, JSON.stringify(ledger, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
    await rename(temp, ledgerPath)
  })
  return saveQueue
}
async function validReceipt(receipt: Receipt | undefined, inputHash: string) {
  if (!receipt?.sha256 || receipt.inputHash !== inputHash || receipt.status !== 'generated_pending_review') return false
  const bytes = await readFile(path.join(out, `${receipt.sha256}.wav`)).catch(() => null)
  const info = bytes && parseWav(bytes)
  return Boolean(bytes && info && bytes.length === receipt.bytes && info.durationMs === receipt.durationMs && createHash('sha256').update(bytes).digest('hex') === receipt.sha256)
}
async function worker() {
  while (!halted && cursor < jobs.length) {
    const job = jobs[cursor++]!
    if (await validReceipt(receipts[job.id], job.inputHash)) continue
    let failure: string | null = null
    let audio: Buffer | null = null
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await synthesizeSegmentMimo({ base: env.MIMO_BASE!, apiKey: env.MIMO_API_KEY!, model }, { text: job.word, instruction: job.instruction, voice })
        audio = result.audio; failure = null
        break
      } catch (error) {
        failure = error instanceof TtsError ? error.message.match(/\b\d{3}\b/)?.[0] ?? 'provider_error' : 'generation_error'
        if (failure === '401' || failure === '403') { halted = true; break }
        if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 2000))
      }
    }
    if (audio) {
      try {
        const info = parseWav(audio)
        if (!info) throw new Error('Invalid WAV')
        const sha256 = createHash('sha256').update(audio).digest('hex')
        const target = path.join(out, `${sha256}.wav`)
        try { await writeFile(target, audio, { flag: 'wx' }) }
        catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'EEXIST' || createHash('sha256').update(await readFile(target)).digest('hex') !== sha256) throw error
        }
        receipts[job.id] = { id: job.id, word: job.word, inputHash: job.inputHash, status: 'generated_pending_review', sha256, durationMs: info.durationMs, bytes: audio.length, flags: info.durationMs < 120 || info.durationMs > 6000 ? ['DURATION_REQUIRES_REVIEW'] : [] }
        console.log(JSON.stringify({ id: job.id, generated: true, durationMs: info.durationMs }))
      } catch { failure = 'invalid_audio_or_write'; halted = true }
    }
    if (failure) { receipts[job.id] = { id: job.id, word: job.word, inputHash: job.inputHash, status: 'generation_failed', flags: [], errorCode: failure }; console.error(JSON.stringify({ id: job.id, generated: false, errorCode: failure })) }
    await save()
  }
}
try {
  try {
    const old = ledgerSchema.parse(JSON.parse(await readFile(ledgerPath, 'utf8')))
    if (old.courseVersionId !== course.manifest.versionId || old.courseHash !== contentHash || old.requestedAccent !== accent || old.model !== model || old.voice !== voice) throw new Error('Existing candidate ledger uses different inputs')
    receipts = old.assets
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
  await Promise.all(Array.from({ length: concurrency }, worker))
  await save()
  const generated = jobs.filter(job => receipts[job.id]?.status === 'generated_pending_review').length
  console.log(JSON.stringify({ requested: jobs.length, generated, failed: jobs.length - generated, halted, humanReviewed: false, publicationApproved: false }))
  if (generated !== jobs.length) process.exitCode = 1
} finally { await lock.close(); await unlink(lockPath) }
