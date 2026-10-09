/** Release gate: complete Chinese source blocks, decoded images/variants and runtime-keyed narration. */
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import dotenv from 'dotenv'
import sharp from 'sharp'
import { PrismaClient } from '@prisma/client'
import { ALL_PACKS } from '../src/content/packs/index.ts'
import { loadConfig } from '../src/config.ts'
import { chunkText } from '../src/modules/tts/client.ts'
import { cacheKey } from '../src/modules/tts/cache.ts'
import { DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText.ts'
import { parseMp3 } from '../src/modules/tts/mp3duration.ts'

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const selectedBooks = arg('book')?.split(',')
const remoteOnly = process.argv.includes('--remote-only')
if (remoteOnly && !process.argv.includes('--check-remote')) throw new Error('--remote-only requires --check-remote; use only after full local validation')
dotenv.config()
const config = loadConfig()
const db = new PrismaClient({ datasources: { db: { url: arg('database') || config.TAO_DATABASE_URL } } })
const media = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const state = JSON.parse(readFileSync(join(media, '.tts-public-state.json'), 'utf8'))
const report = { mode: remoteOnly ? 'remote-reconciliation' : 'full', books: [], uniqueImages: 0, audioSegments: 0, uploadedSegments: 0, systemVoiceSegments: 0, imageLedgerByteDifferences: 0, failures: [], remoteObjectsChecked: 0 }
const expectedRemote = new Map()
const seenImages = new Set()
const seenAudio = new Set()
const error = (message) => report.failures.push(message)
try {
  const assets = new Map((await db.artAsset.findMany()).map((a) => [a.scene, a]))
  for (const pack of ALL_PACKS.filter((p) => p.lang === 'zh' && (!selectedBooks || selectedBooks.includes(p.id)))) {
    const book = await db.book.findUnique({ where: { id: pack.id } })
    if (!book) { error(`${pack.id}: book missing`); continue }
    const chapters = await db.chapter.findMany({ where: { bookId: pack.id }, orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } })
    if (chapters.length !== pack.chapters.length) error(`${pack.id}: chapter count mismatch`)
    const scenes = new Set([`cover:${pack.id}`, ...pack.chapters.flatMap((ch, i) => [ch.art || `chapter:${pack.id}:${i + 1}`, ...ch.blocks.filter((b) => b.kind === 'image' && b.art).map((b) => b.art)])])
    for (const scene of scenes) {
      if (seenImages.has(scene)) continue
      seenImages.add(scene)
      const asset = assets.get(scene)
      if (!asset || !asset.urlPath.startsWith('/api/media/art/')) { error(`${scene}: image ledger missing/invalid`); continue }
      const rel = asset.urlPath.slice('/api/media/'.length)
      const path = join(media, rel)
      if (!existsSync(path) || statSync(path).size === 0) { error(`${scene}: original file missing`); continue }
      const bytes = statSync(path).size
      if (bytes !== asset.bytes) report.imageLedgerByteDifferences++
      expectedRemote.set(rel, bytes)
      try {
        const meta = await sharp(path).metadata()
        if (!remoteOnly) await sharp(path).raw().toBuffer()
        if (!meta.width || !meta.height) error(`${scene}: image has no dimensions`)
        for (const suffix of ['thumb', 'reader']) {
          const variant = path.replace(/\.(webp|png)$/, `.${suffix}.webp`)
          if (!existsSync(variant) || !statSync(variant).size) { error(`${scene}: ${suffix} missing`); continue }
          if (statSync(variant).mtimeMs < statSync(path).mtimeMs) error(`${scene}: ${suffix} is older than the original`)
          const info = await sharp(variant).metadata()
          if (!remoteOnly) await sharp(variant).raw().toBuffer()
          if (!info.width || !info.height || info.width > (suffix === 'thumb' ? 320 : 800)) error(`${scene}: invalid ${suffix}`)
          expectedRemote.set(rel.replace(/\.(webp|png)$/, `.${suffix}.webp`), statSync(variant).size)
        }
      } catch { error(`${scene}: image decode failed`) }
    }
    let audio = 0
    for (const [i, ch] of chapters.entries()) {
      const expected = pack.chapters[i]
      if (!expected) continue
      const body = ch.blocks.map((b) => ({ kind: b.kind, text: b.text, art: b.art ?? null }))
      const source = expected.blocks.map((b) => ({ kind: b.kind, text: b.text, art: b.art ?? null }))
      if (ch.title !== expected.title || ch.art !== (expected.art ?? null) || JSON.stringify(body) !== JSON.stringify(source)) error(`${pack.id}:${ch.order}: published blocks differ from source`)
      for (const text of chunkText(chapterSpeakText(ch.blocks))) {
        audio++
        const key = cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', config.TTS_MODEL || 'stepaudio-3-gen-preview')
        if (seenAudio.has(key)) continue
        seenAudio.add(key)
        const record = state[key]
        const path = join(media, 'tts-public', `${key}.mp3`)
        if (!record?.durationMs || !existsSync(path)) { error(`${pack.id}:${ch.order}: audio missing ${key}`); continue }
        const buffer = readFileSync(path)
        if (buffer.length !== record.bytes || !parseMp3(buffer)?.durationMs) error(`${pack.id}:${ch.order}: invalid audio ${key}`)
        if (record.uploaded) report.uploadedSegments++
        else if (process.argv.includes('--require-upload')) error(`${pack.id}:${ch.order}: audio not uploaded ${key}`)
        if (record.provider === 'windows-system-speech') report.systemVoiceSegments++
        expectedRemote.set(`tts-public/${key}.mp3`, buffer.length)
      }
    }
    report.books.push({ id: pack.id, title: pack.title, chapters: chapters.length, illustrations: scenes.size, audioSegments: audio })
    if (report.books.length % 10 === 0) console.log(`Verified ${report.books.length} Chinese books, ${seenImages.size} images, ${seenAudio.size} narration segments`)
  }
  report.uniqueImages = seenImages.size
  report.audioSegments = seenAudio.size
  if (process.argv.includes('--check-remote')) {
    dotenv.config({ path: '.env.r2' })
    const { S3Client, ListObjectsV2Command } = await import('@aws-sdk/client-s3')
    const { R2_ACCOUNT_ID: account, R2_ACCESS_KEY_ID: accessKeyId, R2_SECRET_ACCESS_KEY: secretAccessKey } = process.env
    if (!account || !accessKeyId || !secretAccessKey) throw new Error('R2 credentials missing for remote gate')
    const s3 = new S3Client({ region: 'auto', endpoint: `https://${account}.r2.cloudflarestorage.com`, credentials: { accessKeyId, secretAccessKey } })
    const remote = new Map()
    for (const prefix of ['art/', 'tts-public/']) {
      let token
      do {
        const page = await s3.send(new ListObjectsV2Command({ Bucket: process.env.TAO_R2_MEDIA_BUCKET || 'taoread-media', Prefix: prefix, ContinuationToken: token }))
        for (const object of page.Contents || []) remote.set(object.Key, object.Size)
        token = page.IsTruncated ? page.NextContinuationToken : undefined
      } while (token)
    }
    for (const [key, bytes] of expectedRemote) {
      report.remoteObjectsChecked++
      if (remote.get(key) !== bytes) error(`R2 object missing/size differs: ${key}`)
    }
  }
} finally { await db.$disconnect() }
if (arg('out')) writeFileSync(arg('out'), JSON.stringify(report, null, 2))
console.log(JSON.stringify({ ...report, books: report.books.length, failures: report.failures.slice(0, 20), failureCount: report.failures.length }, null, 2))
if (report.failures.length) process.exitCode = 1
