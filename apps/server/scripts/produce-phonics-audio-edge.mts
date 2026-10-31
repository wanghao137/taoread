/** Legacy Edge whole-word candidates. Slowed words are not phoneme or blending recordings.
 * 产物：{out}/phonics/{versionId}/{sha256}.mp3 + audio-candidates-edge.json（apply 脚本可直接消费）。
 * 用法：npx tsx scripts/produce-phonics-audio-edge.mts --out ../output/phonics-edge-20261028 [--accents GB,US] [--concurrency 3]
 */
import { readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'
import { loadCourse, candidateDirectory } from '../src/modules/phonics/v2/courseRegistry'
import { parseMp3 } from '../src/modules/tts/mp3duration'
import { letterNameText } from './lib/phonicsLetterVoice'

const { values } = parseArgs({ options: { out: { type: 'string' }, 'course-dir': { type: 'string' }, accents: { type: 'string', default: 'GB,US' }, concurrency: { type: 'string', default: '3' }, kinds: { type: 'string', default: 'word' } } })
if (!values.out) throw Error('Explicit --out is required')
const out = path.resolve(values.out)
const accents = values.accents.split(',') as Array<'GB' | 'US'>
const kinds = new Set(values.kinds.split(','))
// 诚实守卫：Edge 慢速整词不能冒充分音/拼读录音（真实音素切分需另制素材+人工听审）
if (kinds.size !== 1 || !kinds.has('word')) throw Error('Edge candidates can only be used for whole words, not phoneme segmentation or blending')
const VOICE = { GB: 'en-GB-SoniaNeural', US: 'en-US-JennyNeural' }

const course = await loadCourse(values['course-dir'] ? path.resolve(values['course-dir']) : candidateDirectory)
const dest = path.join(out, 'phonics', course.manifest.versionId)
await mkdir(dest, { recursive: true })
const sha256 = (b: Buffer) => createHash('sha256').update(b).digest('hex')

type Job = { id: string; accent: 'GB' | 'US'; kind: 'word' | 'letter'; text: string; assetId: string }
// 断点续传：台账已有同 id 且成功的跳过（幂等重跑不重复花钱/时间）
const prior = (() => { try { return JSON.parse(readFileSync(path.join(out, 'audio-candidates-edge.json'), 'utf8')) as { assets: Array<{ id: string }> } } catch { return { assets: [] as Array<{ id: string }> } } })()
const done_ = new Set(prior.assets.map(a => a.id))
// 课程里已绑定的槽位不重做（多课程/多轮复用同一输出目录时避免无谓重生成）
const bound = new Set(course.assets.filter(a => a.sha256).map(a => a.id))
const jobs: Job[] = []
for (const w of course.words) {
  for (const accent of accents) {
    // Edge 只做整词：分音/拼读需要真实音素切分，慢速整词冒充分音已被音频安全层拦截
    if (bound.has(`${w.id}-word`)) continue
    if (!done_.has(`edge-${accent.toLowerCase()}-${w.id}`)) jobs.push({ id: `edge-${accent.toLowerCase()}-${w.id}`, accent, kind: 'word', text: w.text, assetId: `${w.id}-word` })
  }
}
for (const a of course.assets) {
  // 字母名是可发音的英文词（ay/bee/sea/double u…），Edge 神经音即标准字母名朗读
  if (a.purpose !== 'letter_name' || a.sha256) continue
  const letter = /^letter-name-([a-z])$/.exec(a.id)?.[1]
  if (!letter) continue
  const id = `edge-${a.accent.toLowerCase()}-letter-${letter}`
  if (done_.has(id)) continue
  jobs.push({ id, accent: a.accent as 'GB' | 'US', kind: 'letter', text: letterNameText(letter.toUpperCase()), assetId: a.id })
}

const concurrency = Math.max(1, Math.min(6, Number(values.concurrency)))
const results: Array<Record<string, unknown>> = []
let done = 0, failed = 0
const lock = new Map<string, MsEdgeTTS>()
const client = async (accent: 'GB' | 'US') => {
  const key = accent
  if (!lock.has(key)) {
    const t = new MsEdgeTTS()
    await t.setMetadata(VOICE[accent], OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
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
        const tts = await client(job.accent)
        const { audioStream } = await tts.toStream(job.text)
        const chunks: Buffer[] = []
        for await (const c of audioStream) chunks.push(c as Buffer)
        const mp3 = Buffer.concat(chunks)
        if (mp3.length < 512) throw new Error('audio too short')
        const durationMs = parseMp3(mp3)?.durationMs
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
