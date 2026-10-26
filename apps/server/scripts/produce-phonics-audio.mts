/** Produce review candidates only. Never writes course approval, a database, or a publication gate. */
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { parseArgs } from 'node:util'
import dotenv from 'dotenv'
import { loadCourse, candidateDirectory, digest } from '../src/modules/phonics/v2/courseRegistry'
import { synthesizeSegment, TtsError } from '../src/modules/tts/client'
import { parseWav, synthesizeSegmentMimo } from '../src/modules/tts/mimo'
import { parseMp3 } from '../src/modules/tts/mp3duration'

const { values } = parseArgs({ options: { out: { type: 'string' }, 'env-file': { type: 'string' }, concurrency: { type: 'string', default: '2' }, ids: { type: 'string' }, provider: { type: 'string', default: 'stepaudio' } } })
if (!values.out || !values['env-file']) throw Error('Explicit --out and --env-file are required')
const provider = values.provider === 'mimo' ? 'mimo' : 'stepaudio'
if (!['stepaudio', 'mimo'].includes(values.provider ?? '')) throw Error('Provider must be stepaudio or mimo')
const concurrency = Number(values.concurrency)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 4) throw Error('Concurrency must be 1-4')
const env = dotenv.parse(await readFile(path.resolve(values['env-file'])))
if (provider === 'mimo') {
  if (!env.MIMO_BASE || !env.MIMO_API_KEY) throw Error('MiMo provider is missing MIMO_BASE/MIMO_API_KEY')
} else if (!env.TTS_BASE || !env.TTS_API_KEY) throw Error('Configured TTS provider is missing')
const model = provider === 'mimo' ? env.MIMO_MODEL || 'mimo-v2.5-tts' : env.TTS_MODEL || 'stepaudio-3-gen-preview'
// MiMo 只出 WAV；音色用预置名（中文课堂老师=茉莉，GB 候选=Mia，正式口音归属待听审）。
const mimoVoice = (accent: 'GB' | 'zh') => (accent === 'zh' ? env.MIMO_VOICE_ZH || '茉莉' : env.MIMO_VOICE_EN || 'Mia')
const out = path.resolve(values.out)
const course = await loadCourse(candidateDirectory)
const dest = path.join(out, 'phonics', course.manifest.versionId)
await mkdir(dest, { recursive: true })
const selected = values.ids ? new Set(values.ids.split(',')) : null
if (selected && [...selected].some(id => !course.assets.some(a => a.id === id && a.purpose !== 'image'))) throw Error('Unknown audio asset id')
const words = new Map(course.words.map(w => [w.id, w]))
const mappings = new Map(course.mappings.map(m => [m.id, m]))
type Job = { id: string; purpose: string; requestedAccent: 'GB' | 'zh'; text: string; instruction: string }
const jobs: Job[] = course.assets.filter(a => a.purpose !== 'image' && (!selected || selected.has(a.id))).map(asset => {
  let text = '', instruction = ''
  if (asset.purpose === 'instruction_zh') {
    const candidates = [...new Set(course.tasks.filter(t => t.instructionAssetId === asset.id).map(t => t.instructionZh))]
    if (candidates.length > 1) throw Error(`Conflicting instruction text: ${asset.id}`)
    text = candidates[0] ?? (asset.id === 'shared-help-zh' ? '别着急，我们再听一遍，一起试一试。' : '')
    instruction = '只准确朗读原文，不增加或删减内容，不读出引号，不加音乐或音效。标准普通话，温和清晰，适合五到七岁儿童。原文中的英语按标准英式发音读出。'
  } else if (asset.purpose === 'phoneme') {
    const mapping = mappings.get(`g-${asset.id.replace(/^sound-/, '')}`)
    if (!mapping) throw Error(`No mapping for ${asset.id}`)
    const ipa = mapping.phonemes.map(p => p.ipa).join('')
    text = ipa
    instruction = `Output ONLY the isolated British English phoneme /${ipa}/. This is a pure phonics sound, not a letter name or a word. No added schwa or other vowel. Sustain continuant sounds for about 0.7 seconds; a stop consonant has one brief clean release. No explanation, music or sound effect. Stop after the one sound.`
  } else if (asset.purpose === 'passage') {
    const texts = [...new Set(course.readers.flatMap(r => r.pages.filter(p => p.audioAssetId === asset.id).map(p => p.text)))]
    if (texts.length !== 1) throw Error(`Missing or conflicting passage: ${asset.id}`)
    text = texts[0]!
    instruction = 'Read only the provided sentence once, accurately, in standard southern British English. Warm, clear, unhurried, natural phrasing for a young child. No extra words or music.'
  } else {
    const word = [...words.values()].find(w => Object.values(w.audioIds).includes(asset.id))
    if (!word) throw Error(`Missing word for ${asset.id}`)
    const phonemes = word.spans.flatMap(s => s.mappingId ? mappings.get(s.mappingId)?.phonemes.map(p => p.ipa) ?? [] : [])
    text = asset.purpose === 'segment' ? phonemes.join(' , ') : word.text
    instruction = asset.purpose === 'segment'
      ? `Produce ONLY the separate pure British English speech sounds of ${word.text}, in this order: ${phonemes.map(p => `/${p}/`).join(', ')}. About 0.4 seconds silence between sounds. Do not say letter names, slashes, commas or the complete word. No added schwa, explanation or music.`
      : asset.purpose === 'blend'
        ? `Say ONLY ${word.text} once as a slow continuous phonics blend in standard British English: ${phonemes.map(p => `/${p}/`).join(' into ')}. Sustain continuants naturally, join the sounds smoothly into the word without pauses or extra vowels. One continuous utterance about 1.5 seconds; not separate letter names. No explanation or music.`
        : 'Say ONLY the provided word once in natural standard southern British English, with a clear British short vowel where appropriate. No spelling, extra words, explanation or music.'
  }
  if (!text) throw Error(`No production text for ${asset.id}`)
  return { id: asset.id, purpose: asset.purpose, requestedAccent: asset.purpose === 'instruction_zh' ? 'zh' : 'GB', text, instruction }
})
type Receipt = Job & { status: string; inputHash: string; sha256?: string; extension?: 'mp3' | 'wav'; durationMs?: number; bytes?: number; flags?: string[]; model: string; provider: string; voice?: string | null; reviewedByHuman: false; httpStatus?: string | null }
const stateFile = path.join(out, 'audio-candidates.json')
let receipts: Record<string, Receipt> = {}
try { receipts = JSON.parse(await readFile(stateFile, 'utf8')).assets } catch (e) { if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e }
let saveQueue = Promise.resolve(), cursor = 0, halted = false
function save() {
  saveQueue = saveQueue.then(async () => {
    await writeFile(stateFile + '.tmp', JSON.stringify({ complete: !halted && cursor >= jobs.length, versionId: course.manifest.versionId, generatedAt: new Date().toISOString(), assets: receipts, publicationApproved: false }, null, 2) + '\n')
    await rename(stateFile + '.tmp', stateFile)
  })
  return saveQueue
}
async function worker() {
  while (!halted && cursor < jobs.length) {
    const job = jobs[cursor++]!
    const mimoVoiceName = provider === 'mimo' ? mimoVoice(job.requestedAccent) : null
    const inputHash = digest({ ...job, model, provider, mimoVoice: mimoVoiceName })
    const old = receipts[job.id]
    if (old?.inputHash === inputHash && old.sha256) {
      const ext = old.extension ?? 'mp3'
      const bytes = await readFile(path.join(dest, `${old.sha256}.${ext}`)).catch(() => null)
      const valid = bytes && createHash('sha256').update(bytes).digest('hex') === old.sha256 && (ext === 'wav' ? parseWav(bytes) : parseMp3(bytes))
      if (valid) continue
    }
    try {
      let audio: Buffer, extension: 'mp3' | 'wav', durationMs: number, voiceName: string | null
      if (provider === 'mimo') {
        const result = await synthesizeSegmentMimo({ base: env.MIMO_BASE!, apiKey: env.MIMO_API_KEY!, model }, { text: job.text, instruction: job.instruction, voice: mimoVoiceName! })
        const info = parseWav(result.audio)
        if (!info) throw Error('Invalid WAV')
        audio = result.audio; extension = 'wav'; durationMs = info.durationMs; voiceName = mimoVoiceName
      } else {
        const voice = { id: job.requestedAccent === 'zh' ? 'phonics-zh-candidate-v1' : 'phonics-gb-candidate-v1', label: 'Unreviewed phonics candidate', lang: job.requestedAccent === 'zh' ? 'zh' as const : 'en' as const,
          description: job.requestedAccent === 'zh' ? '成年女性，标准普通话，温和清晰的儿童课堂老师' : 'Adult native British English female phonics teacher, standard southern British accent, warm clear unhurried voice', instruction: job.instruction }
        const result = await synthesizeSegment({ base: env.TTS_BASE!, apiKey: env.TTS_API_KEY!, model }, { text: job.text, voice, speed: 1, lang: voice.lang, format: 'mp3' })
        const info = parseMp3(result.audio)
        if (!info?.durationMs) throw Error('Invalid MP3')
        audio = result.audio; extension = 'mp3'; durationMs = info.durationMs; voiceName = voice.id
      }
      const sha256 = createHash('sha256').update(audio).digest('hex')
      await writeFile(path.join(dest, `${sha256}.${extension}`), audio)
      const maximum = job.purpose === 'phoneme' ? 2500 : ['word', 'segment', 'blend'].includes(job.purpose) ? 6000 : 20000
      const flags = durationMs > maximum ? ['EXCESS_DURATION_REQUIRES_REVIEW'] : []
      receipts[job.id] = { ...job, inputHash, status: 'generated_pending_listening_and_rights', sha256, extension, durationMs, bytes: audio.length, flags, model, provider: provider === 'mimo' ? 'xiaomi-mimo' : 'configured-stepaudio', voice: voiceName, reviewedByHuman: false }
      console.log(JSON.stringify({ id: job.id, generated: true, durationMs, flags }))
    } catch (error) {
      const httpStatus = error instanceof TtsError ? error.message.match(/\d{3}/)?.[0] ?? null : null
      receipts[job.id] = { ...job, inputHash, status: 'generation_failed', httpStatus, model, provider: provider === 'mimo' ? 'xiaomi-mimo' : 'configured-stepaudio', voice: mimoVoiceName, reviewedByHuman: false }
      console.error(JSON.stringify({ id: job.id, generated: false, httpStatus }))
      if (httpStatus === '401' || httpStatus === '403') halted = true
    }
    await save()
  }
}
await Promise.all(Array.from({ length: concurrency }, worker))
await save()
const requested = jobs.map(j => receipts[j.id])
const ready = requested.filter(r => r?.sha256).length
console.log(JSON.stringify({ complete: !halted, requested: jobs.length, generated: ready, failures: jobs.length - ready, publicationApproved: false }))
if (ready !== jobs.length) process.exitCode = 1
