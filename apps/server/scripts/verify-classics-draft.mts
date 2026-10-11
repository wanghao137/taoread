/** Inspect actual isolated preparation. Success requires all nine complete books
 * and every runtime narration segment and decoded illustration variant. */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import dotenv from 'dotenv'
import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { loadConfig } from '../src/config'
import { chunkText } from '../src/modules/tts/client'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { cacheKey } from '../src/modules/tts/cache'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'
import { parseMp3 } from '../src/modules/tts/mp3duration'
import type { PackChapter } from '../src/content/types'
import { classicArtInput } from './classics-art-input.mjs'
import type { GenerateArtInput } from '../src/modules/media/imagegen'

dotenv.config({ quiet: true })
const out = resolve(process.argv[2] || '../../output/classics-20261010')
const media = join(out, 'media')
const config = loadConfig()
const snapshot: { draft: boolean; books: Array<{ id: string; title: string; complete: boolean; coverArtPrompt?: string; chapters: PackChapter[] }> } = JSON.parse(await readFile(join(out, 'prepared-chapters.json'), 'utf8'))
if (snapshot.draft !== true) throw Error('Expected isolated draft')
const arts: Record<string, { urlPath: string; inputSha256: string }> = JSON.parse(await readFile(join(media, '.classics-art.json'), 'utf8'))
const visualReview: { method: string; assets: Record<string, { imageSha256: string; inputSha256: string; status: string }> } = JSON.parse(await readFile(join(out, 'art-visual-review.json'), 'utf8'))
const audio: Record<string, { bytes: number; durationMs: number; provider?: string }> = JSON.parse(await readFile(join(media, '.tts-public-state.json'), 'utf8'))
const report = { completeBooks: 0, chapters: 0, imagesReady: 0, imagesExpected: 0, audioReady: 0, audioExpected: 0, narrationVerified: 0, localNarration: 0, alternateCloudNarration: 0, failures: [] as string[] }
const keys = new Map<string, string>()
for (const book of snapshot.books) {
  report.completeBooks += Number(book.complete)
  report.chapters += book.chapters.length
  const scenes = new Set([`cover:${book.id}`, ...book.chapters.flatMap(c => [c.art!, ...c.blocks.filter(b => b.kind === 'image' && b.art).map(b => b.art!)])])
  const expectedArtInputs = new Map(book.chapters.map(ch => [ch.art!, { kind: 'chapter', scene: ch.art!, description: ch.artPrompt!, label: ch.title, lang: 'zh' }]))
  if (book.chapters.length) expectedArtInputs.set(`cover:${book.id}`, { kind: 'cover', scene: `cover:${book.id}`, description: book.coverArtPrompt || `${book.title}：${book.chapters[0]!.artPrompt}`, label: book.title, lang: 'zh' })
  for (const scene of scenes) {
    report.imagesExpected++
    const asset = arts[scene]
    if (!asset?.urlPath.startsWith('/api/media/art/') || asset.urlPath.includes('..')) { report.failures.push(`Missing art: ${scene}`); continue }
    const proposed = expectedArtInputs.get(scene)
    const input = proposed && classicArtInput(proposed as GenerateArtInput)
    if (!input || asset.inputSha256 !== createHash('sha256').update(JSON.stringify(input)).digest('hex')) { report.failures.push(`Stale art: ${scene}`); continue }
    const path = join(media, asset.urlPath.slice('/api/media/'.length))
    try {
      const buffer = await readFile(path)
      const reviewed = visualReview.assets[scene]
      if (visualReview.method !== 'ai-assisted-contact-sheet-review-v1' || reviewed?.status !== 'accepted' || reviewed.inputSha256 !== asset.inputSha256 || reviewed.imageSha256 !== createHash('sha256').update(buffer).digest('hex')) throw Error('Missing or stale illustration review')
      await sharp(buffer).raw().toBuffer()
      for (const [suffix, width] of [['thumb', 320], ['reader', 800]] as const) {
        const image = sharp(await readFile(path.replace(/\.webp$/, `.${suffix}.webp`)))
        const metadata = await image.metadata()
        if (!metadata.width || !metadata.height || metadata.width > width) throw Error('Invalid variant')
        await image.raw().toBuffer()
      }
      report.imagesReady++
    } catch { report.failures.push(`Art decode failed: ${scene}`) }
  }
  for (const chapter of book.chapters) for (const text of chunkText(chapterSpeakText(chapter.blocks))) {
    keys.set(cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', config.TTS_MODEL), text)
  }
}
report.audioExpected = keys.size
for (const [key, text] of keys) {
  const record = audio[key]
  try {
    const buffer = await readFile(join(media, 'tts-public', `${key}.mp3`))
    const info = parseMp3(buffer)
    if (!record || record.bytes !== buffer.length || info?.durationMs !== record.durationMs || !info?.durationMs) throw Error('Invalid audio')
    report.audioReady++
    if (record.provider === 'local-melotts' || record.provider === 'windows-sapi') report.localNarration++
    if (record.provider === 'edge-neural') report.alternateCloudNarration++
    const receipt = JSON.parse(await readFile(join(out, 'narration-checks', `${key}.json`), 'utf8'))
    const audioSha256 = createHash('sha256').update(buffer).digest('hex')
    const textSha256 = createHash('sha256').update(text).digest('hex')
    if (receipt.audioSha256 !== audioSha256 || receipt.textSha256 !== textSha256 || !['sensevoice-int8-18s-windows-v1', 'sensevoice-int8-silence-v2'].includes(receipt.method) || receipt.decodeValidated !== true) throw Error('Missing or stale narration content check')
    if ((receipt.needsReview !== false || !(receipt.similarity >= 0.90 && receipt.tailSimilarity >= 0.70 && receipt.maxMissingChars < 7 && receipt.maxExtraChars < 7)) && !(receipt.manualReview?.audioSha256 === audioSha256 && typeof receipt.manualReview.reason === 'string' && receipt.manualReview.reason.length >= 20)) throw Error('Unresolved narration content check')
    report.narrationVerified++
  } catch { report.failures.push(`Missing/invalid narration: ${key}`) }
}
if (snapshot.books.length !== 9 || report.completeBooks !== 9) report.failures.push('Nine complete originals are required')
await writeFile(join(out, 'draft-media-readiness.json'), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify({ ...report, failures: report.failures.slice(0, 5), failureCount: report.failures.length }))
if (report.failures.length) process.exitCode = 1
