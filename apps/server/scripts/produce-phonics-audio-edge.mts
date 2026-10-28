/** Edge 神经语音音频生产器（免费、原生英美音）：整词/慢速拼读/特慢分开读。
 * 产物：{out}/phonics/{versionId}/{sha256}.mp3 + audio-candidates-edge.json（apply 脚本可直接消费）。
 * 用法：npx tsx scripts/produce-phonics-audio-edge.mts --out ../output/phonics-edge-20261028 [--accents GB,US] [--concurrency 3]
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'
import { loadCourse, candidateDirectory } from '../src/modules/phonics/v2/courseRegistry'
import { parseMp3 } from '../src/modules/tts/mp3duration'

const { values } = parseArgs({ options: { out: { type: 'string' }, accents: { type: 'string', default: 'GB,US' }, concurrency: { type: 'string', default: '3' }, kinds: { type: 'string', default: 'word,blend,segment' } } })
if (!values.out) throw Error('Explicit --out is required')
const out = path.resolve(values.out)
const accents = values.accents.split(',') as Array<'GB' | 'US'>
const kinds = new Set(values.kinds.split(','))
const VOICE = { GB: 'en-GB-SoniaNeural', US: 'en-US-JennyNeural' }
const RATE = { word: 0, blend: -20, segment: -50 }

const course = await loadCourse(candidateDirectory)
const dest = path.join(out, 'phonics', course.manifest.versionId)
await mkdir(dest, { recursive: true })
const sha256 = (b: Buffer) => createHash('sha256').update(b).digest('hex')

type Job = { id: string; accent: 'GB' | 'US'; kind: 'word' | 'blend' | 'segment'; text: string }
// 断点续传：台账已有同 id 且成功的跳过（幂等重跑不重复花钱/时间）
const prior = (() => { try { return JSON.parse(readFileSync(path.join(out, 'audio-candidates-edge.json'), 'utf8')) as { assets: Array<{ id: string }> } } catch { return { assets: [] as Array<{ id: string }> } } })()
const done_ = new Set(prior.assets.map(a => a.id))
const jobs: Job[] = []
for (const w of course.words) {
  for (const accent of accents) {
    if (kinds.has('word') && !done_.has(`edge-${accent.toLowerCase()}-${w.id}`)) jobs.push({ id: `edge-${accent.toLowerCase()}-${w.id}`, accent, kind: 'word', text: w.text })
    if (accent === 'GB' && kinds.has('blend') && !done_.has(`edge-gb-${w.id}-blend`)) jobs.push({ id: `edge-gb-${w.id}-blend`, accent, kind: 'blend', text: w.text })
    if (accent === 'GB' && kinds.has('segment') && !done_.has(`edge-gb-${w.id}-segment`)) jobs.push({ id: `edge-gb-${w.id}-segment`, accent, kind: 'segment', text: w.text })
  }
}

const concurrency = Math.max(1, Math.min(6, Number(values.concurrency)))
const results: Array<Record<string, unknown>> = []
let done = 0, failed = 0
const lock = new Map<string, MsEdgeTTS>()
const client = async (accent: 'GB' | 'US', rate: number) => {
  const key = `${accent}:${rate}`
  if (!lock.has(key)) {
    const t = new MsEdgeTTS()
    await t.setMetadata(VOICE[accent], OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3, rate === 0 ? undefined : { rate })
    lock.set(key, t)
  }
  return lock.get(key)!
}

async function worker() {
  for (;;) {
    const job = jobs.shift()
    if (!job) return
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const tts = await client(job.accent, RATE[job.kind])
        const { audioStream } = await tts.toStream(job.text)
        const chunks: Buffer[] = []
        for await (const c of audioStream) chunks.push(c as Buffer)
        const mp3 = Buffer.concat(chunks)
        if (mp3.length < 512) throw new Error('audio too short')
        const durationMs = parseMp3(mp3).durationMs
        if (!durationMs || durationMs < 150) throw new Error(`bad duration ${durationMs}`)
        const hash = sha256(mp3)
        await writeFile(path.join(dest, `${hash}.mp3`), mp3)
        results.push({ id: job.id, kind: job.kind, accent: job.accent, text: job.text, sha256: hash, durationMs, bytes: mp3.length, voice: VOICE[job.accent], status: 'generated_pending_review' })
        done++
        if (done % 20 === 0) console.log(JSON.stringify({ done, of: done + jobs.length, fail: failed }))
        break
      } catch (error) {
        if (attempt >= 4) { failed++; console.error(JSON.stringify({ id: job.id, failed: true, error: error instanceof Error ? error.message.slice(0, 120) : 'e' })) }
        else await new Promise(r => setTimeout(r, attempt * 3000))
      }
    }
  }
}
await Promise.all(Array.from({ length: concurrency }, () => worker()))
const ledger = {
  schemaVersion: 1, courseVersionId: course.manifest.versionId, generatedAt: new Date().toISOString(),
  provider: 'microsoft-edge-neural', voices: VOICE, publicationApproved: false, humanReviewed: false, rightsReviewed: false,
  counts: { requested: done + failed, generated: done, failed },
  assets: results,
}
await writeFile(path.join(out, 'audio-candidates-edge.json'), JSON.stringify(ledger, null, 1) + '\n')
console.log(JSON.stringify({ complete: true, generated: done, failed, ledger: path.join(out, 'audio-candidates-edge.json') }))
