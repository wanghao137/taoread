/** Prepare one reviewed book with the configured providers; no database or public-storage writes. */
import dotenv from 'dotenv'
import assert from 'node:assert/strict'
import { readFile, writeFile, mkdir, rename } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { loadConfig } from '../src/config'
import { baiJiaXing as book } from '../src/content/packs/primer-baijiaxing'
import { packContentVersion } from '../src/content/seed'
import { ImageGenerator, buildPrompt, fsSafe, type GenerateArtInput, type GeneratedArt } from '../src/modules/media/imagegen'
import { compressPngToWebP } from '../src/modules/media/compress'
import { labelWebpImage } from '../src/modules/media/label'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { chunkText, synthesizeSegment } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'
import { findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices'
import { surnameInstruction } from '../src/modules/tts/surnamePronunciation'
import { parseMp3 } from '../src/modules/tts/mp3duration'

dotenv.config({ quiet: true })
const destination = process.argv.find(a => a.startsWith('--out='))?.slice(6)
if (!destination) throw Error('Explicit --out required')
const out = resolve(destination), media = join(out, 'media'), config = loadConfig()
const version = packContentVersion(book)
const sha = (bytes: string | Buffer) => createHash('sha256').update(bytes).digest('hex')
await mkdir(media, { recursive: true })
async function save(file: string, value: unknown) {
  const target = join(out, file)
  await writeFile(target + '.tmp', JSON.stringify(value, null, 2) + '\n')
  await rename(target + '.tmp', target)
}
async function previous<T>(file: string): Promise<T[]> {
  try { return JSON.parse(await readFile(join(out, file), 'utf8')).assets ?? [] }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; return [] }
}
const providerFetch: typeof fetch = async (url, init) => {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url, { ...init, signal: AbortSignal.timeout(180_000) })
    if (response.ok || attempt === 3 || !(response.status === 429 || response.status >= 500)) {
      if (!response.ok) console.error(`Provider HTTP ${response.status}`)
      return response
    }
    await response.body?.cancel()
    await new Promise(r => setTimeout(r, 10_000 * attempt))
  }
}
const scenes: GenerateArtInput[] = [
  { kind: 'cover', scene: `cover:${book.id}`, description: book.coverArtPrompt!, label: book.title, lang: 'zh', literalScene: true },
  ...book.chapters.map(ch => ({ kind: 'chapter' as const, scene: ch.art!, description: ch.artPrompt!, label: ch.title, lang: 'zh' as const, literalScene: true })),
]
assert.equal(new Set(scenes.map(s => s.scene)).size, 10)
assert.equal(book.chapters.length, 9)
assert.equal(book.chapters.flatMap(c => c.blocks.filter(b => b.kind === 'poem')).map(b => b.text).join('').replace(/[^\p{Script=Han}]/gu, '').length, 568)

if (!process.argv.includes('--tts-only')) {
  assert(config.TAO_IMAGE_KEY && config.TAO_IMAGE_BASE, 'Image provider missing')
  type Art = GeneratedArt & { files: Array<{ path: string; bytes: number; sha256: string }>; sourcePath: string; sourceSha256: string }
  const assets = await previous<Art>('art-evidence.json')
  for (const input of scenes) {
    const old = assets.find(a => a.scene === input.scene)
    if (old?.prompt === buildPrompt(input) && old.model === config.TAO_IMAGE_MODEL) {
      let valid = true
      for (const file of [...old.files, { path: old.sourcePath, sha256: old.sourceSha256 }]) {
        try { const bytes = await readFile(join(out, file.path)); assert.equal(sha(bytes), file.sha256); await sharp(bytes).raw().toBuffer() } catch { valid = false }
      }
      if (valid) { console.log(`Art cached: ${input.scene}`); continue }
    }
    const sourcePath = `image-source/${fsSafe(input.scene)}.png`
    await mkdir(join(out, 'image-source'), { recursive: true })
    const generator = new ImageGenerator({ base: config.TAO_IMAGE_BASE, apiKey: config.TAO_IMAGE_KEY, model: config.TAO_IMAGE_MODEL,
      fetch: async (url, init) => {
        const response = await providerFetch(url, init)
        if (response.ok) {
          const data = await response.clone().json() as { data?: Array<{ b64_json?: string }> }
          if (data.data?.[0]?.b64_json) await writeFile(join(out, sourcePath), Buffer.from(data.data[0].b64_json, 'base64'))
        }
        return response
      },
    }, media, compressPngToWebP, (bytes, scene, kind) => labelWebpImage(bytes, { provider: 'taoread', model: config.TAO_IMAGE_MODEL, scene, kind }))
    const art = await generator.generate(input)
    if (!art || !art.urlPath.endsWith('.webp')) throw Error(`Image generation failed: ${input.scene}`)
    const imagePath = join(media, art.urlPath.replace('/api/media/', ''))
    const original = await readFile(imagePath)
    await sharp(original).raw().toBuffer()
    for (const [suffix, width] of [['thumb', 320], ['reader', 1280]] as const) {
      await writeFile(imagePath.replace(/\.webp$/, `.${suffix}.webp`), await sharp(original).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer())
    }
    const files: Art['files'] = []
    for (const suffix of ['', '.thumb', '.reader']) {
      const file = 'media/' + art.urlPath.replace('/api/media/', '').replace(/\.webp$/, suffix + '.webp')
      const bytes = await readFile(join(out, file))
      await sharp(bytes).raw().toBuffer()
      files.push({ path: file, bytes: bytes.length, sha256: sha(bytes) })
    }
    const record = { ...art, files, sourcePath, sourceSha256: sha(await readFile(join(out, sourcePath))) }
    const index = assets.findIndex(a => a.scene === input.scene)
    if (index < 0) assets.push(record); else assets[index] = record
    await save('art-evidence.json', { complete: assets.length === scenes.length, route: 'configured-api', contentVersion: version, model: config.TAO_IMAGE_MODEL, assets })
    console.log(`Art ready: ${input.scene} (${art.width}x${art.height})`)
  }
  await save('art-evidence.json', { complete: assets.length === scenes.length, route: 'configured-api', contentVersion: version, model: config.TAO_IMAGE_MODEL, assets })
}
if (!process.argv.includes('--art-only')) {
  assert(config.TTS_BASE && config.TTS_API_KEY, 'TTS provider missing')
  type Audio = { order: number; key: string; path: string; text: string; instruction: string; durationMs: number; bytes: number; sha256: string }
  const voice = findVoice(speakVoiceId('zh'))
  const expectedKeys = new Set(book.chapters.flatMap(ch => chunkText(chapterSpeakText(ch.blocks)).map(text => cacheKey(text, voice.id, DEFAULT_SPEED, 'mp3', 'zh', '__public__', config.TTS_MODEL))))
  const assets = (await previous<Audio>('audio-evidence.json')).filter(a => expectedKeys.has(a.key))
  await mkdir(join(media, 'tts-public'), { recursive: true })
  for (const [ci, ch] of book.chapters.entries()) for (const text of chunkText(chapterSpeakText(ch.blocks))) {
    const instruction = surnameInstruction(text)
    assert(instruction && (voice.instruction + ' ' + instruction).length <= 500, 'Pronunciation instruction missing or too long')
    const key = cacheKey(text, voice.id, DEFAULT_SPEED, 'mp3', 'zh', '__public__', config.TTS_MODEL)
    const file = `media/tts-public/${key}.mp3`, old = assets.find(a => a.key === key)
    if (old) {
      const bytes = await readFile(join(out, file))
      assert.equal(sha(bytes), old.sha256)
      assert.equal(parseMp3(bytes)?.durationMs, old.durationMs)
      console.log(`TTS cached: chapter ${ci + 1}`); continue
    }
    const result = await synthesizeSegment({ base: config.TTS_BASE, apiKey: config.TTS_API_KEY, model: config.TTS_MODEL, fetch: providerFetch }, { text, voice, speed: DEFAULT_SPEED, lang: 'zh', format: 'mp3' })
    const info = parseMp3(result.audio)
    assert(info && info.durationMs > 10_000, `Invalid or truncated narration: chapter ${ci + 1}`)
    await writeFile(join(out, file), result.audio)
    assets.push({ order: ci + 1, key, path: file, text, instruction, durationMs: info.durationMs, bytes: result.audio.length, sha256: sha(result.audio) })
    await save('audio-evidence.json', { complete: assets.length === 9, route: 'configured-api', contentVersion: version, model: config.TTS_MODEL, voice: voice.id, speed: DEFAULT_SPEED, humanListeningReview: 'pending', assets })
    console.log(`TTS ready: chapter ${ci + 1} (${info.durationMs}ms)`)
  }
  await save('audio-evidence.json', { complete: assets.length === 9, route: 'configured-api', contentVersion: version, model: config.TTS_MODEL, voice: voice.id, speed: DEFAULT_SPEED, humanListeningReview: 'pending', assets })
  const state = Object.fromEntries(assets.map(a => [a.key, { durationMs: a.durationMs, bytes: a.bytes, uploaded: false, model: config.TTS_MODEL }]))
  await writeFile(join(media, '.tts-public-state.json'), JSON.stringify(state, null, 2))
}
