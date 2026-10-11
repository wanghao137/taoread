/** Prepare actual art/TTS for reviewed complete chapters in an isolated directory.
 * No database writes, registration, CDN uploads, or public publication. */
import dotenv from 'dotenv'
import { readFile, writeFile, mkdir, rename, copyFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { loadConfig } from '../src/config'
import { ImageGenerator, type GenerateArtInput, type GeneratedArt } from '../src/modules/media/imagegen'
import { compressPngToWebP } from '../src/modules/media/compress'
import { labelWebpImage } from '../src/modules/media/label'
import { chunkText, synthesizeSegment, TtsError, narrationInput as classicNarrationInput } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices'
import { parseMp3 } from '../src/modules/tts/mp3duration'
import type { PackChapter } from '../src/content/types'
import { classicArtInput } from './classics-art-input.mjs'

dotenv.config({ quiet: true })
const out = resolve(process.argv.slice(2).find(a => !a.startsWith('--')) || '../../output/classics-20261010')
const config = loadConfig()
const media = join(out, 'media')
const selected = process.argv.find(a => a.startsWith('--book='))?.slice(7).split(',')
const localReceipts = process.argv.find(a => a.startsWith('--local-receipts='))?.slice(17)
const replaceKeys = new Set(process.argv.find(a => a.startsWith('--replace-keys='))?.slice(15).split(',') ?? [])
if ([...replaceKeys].some(key => !/^[a-f0-9]{64}$/.test(key)) || (replaceKeys.size && !localReceipts)) throw Error('Replacing narration requires valid keys and local provenance receipts')
const ttsConcurrency=Number(process.argv.find(a=>a.startsWith('--tts-concurrency='))?.slice(18)||2)
if(!Number.isInteger(ttsConcurrency)||ttsConcurrency<1||ttsConcurrency>4)throw Error('TTS concurrency must be between one and four')
const artConcurrency = Number(process.argv.find(a => a.startsWith('--art-concurrency='))?.split('=')[1] || 1)
if (!Number.isInteger(artConcurrency) || artConcurrency < 1 || artConcurrency > 2) throw Error('Art concurrency must be one or two')
const snapshot: { draft: boolean; books: Array<{ id: string; title: string; lang: 'zh'; coverArtPrompt?: string; chapters: PackChapter[] }> } = JSON.parse(await readFile(join(out, 'prepared-chapters.json'), 'utf8'))
if (snapshot.draft !== true) throw Error('Expected an isolated draft snapshot')
const books = snapshot.books.filter(b => !selected || selected.includes(b.id))
await mkdir(media, { recursive: true })
const sha = (s: string | Buffer) => createHash('sha256').update(s).digest('hex')
const pause = (ms: number) => new Promise(r => setTimeout(r, ms))
async function jsonFile<T>(name: string, fallback: T): Promise<T> {
  try { return JSON.parse(await readFile(join(media, name), 'utf8')) } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return fallback
    throw e
  }
}
async function save(name: string, data: unknown) {
  const path = join(media, name)
  await writeFile(`${path}.tmp`, JSON.stringify(data, null, 2) + '\n')
  await rename(`${path}.tmp`, path)
}
type ArtRecord = GeneratedArt & { inputSha256: string }
const arts = await jsonFile<Record<string, ArtRecord>>('.classics-art.json', {})
const gen = new ImageGenerator({ base: config.TAO_IMAGE_BASE!, apiKey: config.TAO_IMAGE_KEY!, model: config.TAO_IMAGE_MODEL,
  fetch: async (url, init) => {
    for (let retry = 0; ; retry++) {
      let res: Response
      try { res = await fetch(url, { ...init, signal: AbortSignal.timeout(180_000) }) } catch {
        if (retry === 3) throw Error('Image provider network/timeout failure after retries')
        console.warn('Image provider network/timeout failure; retrying unchanged request')
        await pause(10_000 * 2 ** retry); continue
      }
      if (!res.ok && res.status !== 429 && res.status < 500) console.warn(`Image provider HTTP ${res.status}`)
      if (res.ok || retry === 3 || !(res.status === 429 || res.status >= 500)) return res
      const delay = Math.max(10, Number(res.headers.get('retry-after')) || 10 * 2 ** retry) * 1000
      await res.body?.cancel()
      for (let remaining = delay; remaining > 0; remaining -= 30_000) await pause(Math.min(30_000, remaining))
    }
  } }, media, compressPngToWebP, (buf, scene, kind) => labelWebpImage(buf, { provider: 'taoread', model: config.TAO_IMAGE_MODEL, scene, kind }))
let failures = 0
if (!process.argv.includes('--tts-only')) {
  if (!config.TAO_IMAGE_BASE || !config.TAO_IMAGE_KEY) throw Error('Image provider missing')
  let artSaves = Promise.resolve()
  for (const book of books) {
    const scenes: GenerateArtInput[] = book.chapters.map(ch => ({ kind: 'chapter', scene: ch.art!, description: ch.artPrompt!, label: ch.title, lang: 'zh' }))
    // Covers can be prepared once the first complete chapter provides a scene.
    if (book.chapters.length) scenes.unshift({ kind: 'cover', scene: `cover:${book.id}`, description: book.coverArtPrompt || `${book.title}：${book.chapters[0]!.artPrompt}`, label: book.title, lang: 'zh' })
    let sceneCursor = 0
    async function artWorker() {
    while (sceneCursor < scenes.length && !failures) {
      const proposed = scenes[sceneCursor++]!
      const scene = classicArtInput(proposed)
      const inputSha256 = sha(JSON.stringify(scene))
      const old = arts[scene.scene]
      if (old?.inputSha256 === inputSha256) {
        try {
          const path = join(media, old.urlPath.replace(/^\/api\/media\//, ''))
          await sharp(await readFile(path)).raw().toBuffer()
          for (const label of ['thumb', 'reader']) await sharp(await readFile(path.replace(/\.webp$/, `.${label}.webp`))).raw().toBuffer()
          continue
        } catch { /* repair corrupt/missing file or variants */ }
      }
      let art: GeneratedArt | null = null
      for (let attempt = 0; attempt < 3; attempt++) {
        art = await gen.generate(scene)
        if (art?.urlPath.endsWith('.webp')) break
        if (attempt < 2) {
          console.warn(`Art response missing/invalid: ${scene.scene}; retrying unchanged scene`)
          await pause(10_000 * (attempt + 1))
        }
      }
      if (!art || !art.urlPath.endsWith('.webp')) { failures++; console.error(`Art failed: ${scene.scene}`); break }
      const path = join(media, art.urlPath.replace(/^\/api\/media\//, ''))
      const buf = await readFile(path)
      await sharp(buf).raw().toBuffer()
      for (const [label, width] of [['thumb', 320], ['reader', 800]] as const) {
        const variant = path.replace(/\.webp$/, `.${label}.webp`)
        const bytes = await sharp(buf).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer()
        await writeFile(`${variant}.tmp`, bytes)
        await rename(`${variant}.tmp`, variant)
      }
      arts[scene.scene] = { ...art, kind: scene.kind, inputSha256 }
      artSaves = artSaves.then(() => save('.classics-art.json', arts))
      await artSaves
      console.log(`Art ready: ${scene.scene}`)
    }
    }
    await Promise.all(Array.from({ length: artConcurrency }, () => artWorker()))
    await artSaves
    if (failures) break
  }
}
if (!process.argv.includes('--art-only')) {
  if (!config.TTS_BASE || !config.TTS_API_KEY) throw Error('TTS provider missing')
  const state = await jsonFile<Record<string, { durationMs: number; bytes: number; uploaded: boolean; provider?: string; model?: string; modelCommit?: string; license?: string; textSha256?: string; synthesisSpeed?: number }>>('.tts-public-state.json', {})
  const rejected = await jsonFile<Record<string, { text: string; status: string | null; code: string | null; model: string }>>('.tts-failures.json', {})
  const voice = findVoice(speakVoiceId('zh'))
  const segments = new Map<string, string>()
  for (const book of books) for (const ch of book.chapters) for (const text of chunkText(chapterSpeakText(ch.blocks))) {
    const key = cacheKey(text, voice.id, DEFAULT_SPEED, 'mp3', 'zh', '__public__', config.TTS_MODEL)
    segments.set(key, text)
  }
  await mkdir(join(media, 'tts-public'), { recursive: true })
  let saves = Promise.resolve(), count = 0, cursor = 0, halted = false
  const jobs = [...segments]
  const ttsFetch: typeof fetch = async (url, init) => {
    for (let retry = 0; ; retry++) {
      let response: Response
      try { response = await fetch(url, { ...init, signal: AbortSignal.timeout(180_000) }) } catch {
        if (retry >= 2) throw Error('Audio provider timeout/network failure after retries')
        await pause(10_000 * (retry + 1)); continue
      }
      // A real batch returned a transient 401 although the same current key
      // still listed models and immediately synthesized the same passage.
      // Retry it once; a persistent authentication failure still halts the batch.
      if (response.status === 401 && retry === 0) {
        await response.body?.cancel()
        console.warn('TTS provider HTTP 401; retrying once before authentication halt')
        await pause(10_000); continue
      }
      if (response.ok || retry >= 2 || !(response.status === 429 || response.status >= 500)) return response
      const delay = Math.max(10, Number(response.headers.get('retry-after')) || 10 * 2 ** retry) * 1000
      console.warn(`TTS provider HTTP ${response.status}; retrying after ${Math.ceil(delay / 1000)}s`)
      await response.body?.cancel()
      for (let remaining = delay; remaining > 0; remaining -= 30_000) await pause(Math.min(30_000, remaining))
    }
  }
  async function worker() {
    while (cursor < jobs.length && !halted) {
      const [key, text] = jobs[cursor++]!
      const path = join(media, 'tts-public', `${key}.mp3`)
      try {
        const buf = await readFile(path)
        if (!replaceKeys.has(key) && state[key]?.bytes === buf.length && parseMp3(buf)?.durationMs === state[key].durationMs && (!['local-melotts', 'windows-sapi', 'edge-neural'].includes(state[key].provider ?? '') || (state[key].synthesisSpeed === DEFAULT_SPEED && state[key].textSha256 === sha(text)))) { count++; continue }
      } catch { /* regenerate missing audio */ }
      if (localReceipts) {
        let receipt: { key: string; textSha256: string; provider: string; model: string; modelCommit?: string; license?: string; platformVersion?: string; libraryVersion?: string; synthesisTextSha256?: string; bytes: number; speed: number } | null = null
        try { receipt = JSON.parse((await readFile(join(resolve(localReceipts), `${key}.json`), 'utf8')).replace(/^\uFEFF/, '')) } catch (err) {
          if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
        }
        if (receipt) {
          const melo = receipt.provider === 'local-melotts' && receipt.model === 'csukuangfj/vits-melo-tts-zh_en' && receipt.license === 'MIT' && /^[a-f0-9]{40}$/.test(receipt.modelCommit ?? '')
          const sapi = receipt.provider === 'windows-sapi' && receipt.model === 'Microsoft Huihui Desktop' && /^\d+\.\d+\.\d+\.\d+$/.test(receipt.platformVersion ?? '')
          const edge = receipt.provider === 'edge-neural' && receipt.model === 'zh-CN-XiaoxiaoNeural' && receipt.libraryVersion === '7.2.8' && receipt.synthesisTextSha256 === sha(text.replace(/哞/g, '谋'))
          if (receipt.key !== key || receipt.textSha256 !== sha(text) || receipt.speed !== DEFAULT_SPEED || !(melo || sapi || edge)) throw Error('Invalid alternate narration provenance')
          const input = join(resolve(localReceipts), `${key}.mp3`)
          const buf = await readFile(input)
          const info = parseMp3(buf)
          if (!info?.durationMs || buf.length !== receipt.bytes) throw Error('Invalid local narration audio')
          await copyFile(input, path)
          state[key] = { durationMs: info.durationMs, bytes: buf.length, uploaded: false, provider: receipt.provider, model: receipt.model, modelCommit: receipt.modelCommit, license: receipt.license, textSha256: receipt.textSha256, synthesisSpeed: receipt.speed }
          delete rejected[key]
          saves = saves.then(() => save('.tts-public-state.json', state))
          await saves
          count++; console.log(`TTS ready (${receipt.provider}): ${count}/${jobs.length}`)
          continue
        }
      }
      try {
        // StepAudio occasionally stops at a paragraph break even with a valid
        // MP3 response. Retain every word while making a continuous utterance;
        // narration receipts still bind the result to the original runtime text.
        const synthesisText = classicNarrationInput(text)
        const narrationVoice = { ...voice, instruction: voice.instruction + ' 完整、准确地朗读scripts中的全部文字，读完最后一句。只朗读，不改写、不跳过句子、不重复，不加音乐或音效。' }
        const result = await (async () => {
          for (let attempt = 0; ; attempt++) {
            try {
              const candidate = await synthesizeSegment({ base: config.TTS_BASE!, apiKey: config.TTS_API_KEY!, model: config.TTS_MODEL, fetch: ttsFetch }, { text: synthesisText, voice: narrationVoice, speed: DEFAULT_SPEED, lang: 'zh', format: 'mp3' })
              if (!parseMp3(candidate.audio)?.durationMs) throw Error('Invalid MP3')
              return candidate
            } catch (err) {
              // HTTP rejection has already gone through ttsFetch's bounded
              // retry policy. Retry only empty/corrupt successful responses or
              // transport failures, preserving the original text and key.
              const status = err instanceof TtsError ? err.message.match(/返回 (\d{3})/)?.[1] : undefined
              if (status || attempt >= 2) throw err
              console.warn(`TTS empty/invalid audio or transport failure: ${key}; retrying unchanged passage`)
              await pause(10_000 * (attempt + 1))
            }
          }
        })()
        const info = parseMp3(result.audio)
        if (!info?.durationMs) throw Error('Invalid MP3')
        await writeFile(`${path}.tmp`, result.audio)
        await rename(`${path}.tmp`, path)
        state[key] = { durationMs: info.durationMs, bytes: result.audio.length, uploaded: false }
        delete rejected[key]
        saves = saves.then(() => save('.tts-public-state.json', state))
        await saves
        count++; console.log(`TTS ready: ${count}/${jobs.length}`)
      } catch (err) {
        const status = err instanceof TtsError ? err.message.match(/返回 (\d{3})/)?.[1] : null
        let code: string | null = null
        if (err instanceof TtsError) {
          try {
            const detail = JSON.parse(err.detail)
            const value = detail.error?.code ?? detail.code
            if (typeof value === 'string' && /^[a-zA-Z0-9_.-]{1,80}$/.test(value)) code = value
          } catch { /* Never log raw provider diagnostics. */ }
        }
        rejected[key] = { text, status: status ?? null, code, model: config.TTS_MODEL }
        saves = saves.then(() => save('.tts-failures.json', rejected))
        await saves
        failures++
        // A rejected passage must remain intact. Prepare the other passages so
        // a later approved provider can fill only the missing audio.
        halted = status !== '451'
        console.error(`TTS failed: ${key} (${status ? `HTTP ${status}` : 'network/invalid audio'}${code ? `, ${code}` : ''}); ${halted ? 'batch halted' : 'passage retained for resolution'}`)
      }
    }
  }
  await Promise.all(Array.from({length:ttsConcurrency},()=>worker()))
  await saves
  await save('.tts-failures.json', rejected)
  console.log(JSON.stringify({ chapters: books.reduce((n, b) => n + b.chapters.length, 0), segments: jobs.length, ready: count, failures }))
}
if (failures) process.exitCode = 1
