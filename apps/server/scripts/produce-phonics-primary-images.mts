import { createHash, randomUUID } from 'node:crypto'
import { mkdir, open, readFile, realpath, rename, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import dotenv from 'dotenv'
import sharp from 'sharp'
import { buildPrompt, ImageGenerator, type GenerateArtInput } from '../src/modules/media/imagegen'
import { compressPngToWebP } from '../src/modules/media/compress'
import { courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { primaryScenes } from './lib/phonicsPrimaryScenes'

const { values } = parseArgs({ options: { out: { type: 'string' }, 'course-dir': { type: 'string' }, 'env-file': { type: 'string' }, ids: { type: 'string' }, concurrency: { type: 'string', default: '2' } } })
if (!values.out || !values['course-dir'] || !values['env-file']) throw new Error('Provide --out, --course-dir and --env-file')
const concurrency = Number(values.concurrency)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 3) throw new Error('Concurrency must be 1-3')
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const outputRoot = await realpath(path.join(repo, 'output'))
const out = path.resolve(values.out), parent = await realpath(path.dirname(out))
const relative = path.relative(outputRoot, parent)
if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Candidate output must be inside output')
await mkdir(out, { recursive: false }).catch(error => { if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error })
const actual = await realpath(out), actualRelative = path.relative(outputRoot, actual)
if (actualRelative.startsWith('..') || path.isAbsolute(actualRelative)) throw new Error('Candidate output resolves outside output')
const course = await loadCourse(path.resolve(values['course-dir']))
const contentHash = courseHash(course)
const allWords = course.words.filter(word => word.decodingIntroducedAt >= 'L62')
if (allWords.some(word => !primaryScenes[word.text]) || Object.keys(primaryScenes).some(text => !allWords.some(word => word.text === text))) throw new Error('Scene list does not match the candidate words')
const selected = values.ids ? new Set(values.ids.split(',').filter(Boolean)) : null
if (selected && [...selected].some(id => !allWords.some(word => word.id === id))) throw new Error('Unknown word id')
const words = allWords.filter(word => !selected || selected.has(word.id))
const env = dotenv.parse(await readFile(path.resolve(values['env-file'])))
if (!env.TAO_IMAGE_BASE || !env.TAO_IMAGE_KEY || !env.TAO_IMAGE_MODEL) throw new Error('Image provider configuration is incomplete')
const generator = new ImageGenerator({ base: env.TAO_IMAGE_BASE, apiKey: env.TAO_IMAGE_KEY, model: env.TAO_IMAGE_MODEL, fetch: (url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(180_000) }) }, actual, compressPngToWebP)
const dest = path.join(actual, 'phonics', course.manifest.versionId)
await mkdir(dest, { recursive: true })
const ledgerPath = path.join(actual, 'image-candidates.json'), lockPath = path.join(actual, '.generation.lock')
const lock = await open(lockPath, 'wx')
type Receipt = { id: string; word: string; sha256: string; bytes: number; scene: string; prompt: string; model: string; status: 'generated_pending_review' }
let receipts: Record<string, Receipt> = {}, saveQueue = Promise.resolve(), cursor = 0
async function save() {
  saveQueue = saveQueue.then(async () => {
    const temporary = path.join(actual, `.ledger-${randomUUID()}.tmp`)
    await writeFile(temporary, JSON.stringify({ versionId: course.manifest.versionId, courseHash: contentHash, humanReviewed: false, rightsReviewed: false, publicationApproved: false, assets: receipts }, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
    await rename(temporary, ledgerPath)
  })
  await saveQueue
}
try {
  try {
    const prior = JSON.parse(await readFile(ledgerPath, 'utf8')) as { versionId: string; courseHash: string; assets: Record<string, Receipt> }
    if (prior.versionId !== course.manifest.versionId || prior.courseHash !== contentHash) throw new Error('Existing ledger belongs to another course')
    receipts = prior.assets
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
  async function worker() {
    while (cursor < words.length) {
      const word = words[cursor++]!, id = `${word.id}-meaning-image`, previous = receipts[id]
      const scene = `primary-v2-${word.text}`
      const input: GenerateArtInput = { kind: 'mascot', scene, description: primaryScenes[word.text]!, label: word.text, lang: 'zh', literalScene: true }
      if (previous) {
        if (!/^[a-f0-9]{64}$/.test(previous.sha256) || previous.id !== id || previous.word !== word.text || previous.scene !== scene || previous.model !== env.TAO_IMAGE_MODEL || previous.prompt !== buildPrompt(input)) throw new Error(`Candidate inputs changed: ${id}`)
        const bytes = await readFile(path.join(dest, `${previous.sha256}.webp`)).catch(() => null)
        if (bytes && bytes.length === previous.bytes && createHash('sha256').update(bytes).digest('hex') === previous.sha256) continue
        throw new Error(`Candidate file missing or changed: ${id}`)
      }
      let art: Awaited<ReturnType<ImageGenerator['generate']>> = null
      for (let attempt = 1; attempt <= 3 && !art; attempt++) {
        art = await generator.generate(input)
        if (!art && attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 5000))
      }
      if (!art) throw new Error(`Image generation failed: ${word.text}`)
      const raw = await readFile(path.join(actual, 'art', 'mascots', `${scene}.webp`))
      const image = await sharp(raw).resize(768, 768, { fit: 'cover' }).webp({ quality: 82 }).toBuffer()
      const sha256 = createHash('sha256').update(image).digest('hex')
      await writeFile(path.join(dest, `${sha256}.webp`), image, { flag: 'wx' }).catch(async error => {
        if ((error as NodeJS.ErrnoException).code !== 'EEXIST' || createHash('sha256').update(await readFile(path.join(dest, `${sha256}.webp`))).digest('hex') !== sha256) throw error
      })
      receipts[id] = { id, word: word.text, sha256, bytes: image.length, scene, prompt: art.prompt, model: art.model, status: 'generated_pending_review' }
      await save()
      console.log(JSON.stringify({ id, generated: true }))
    }
  }
  const workers = await Promise.allSettled(Array.from({ length: concurrency }, worker))
  const failed = workers.find(result => result.status === 'rejected')
  if (failed?.status === 'rejected') throw failed.reason
  console.log(JSON.stringify({ requested: words.length, generated: Object.keys(receipts).length, humanReviewed: false, publicationApproved: false }))
} finally { await lock.close(); await unlink(lockPath) }
