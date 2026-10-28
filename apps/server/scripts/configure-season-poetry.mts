/** Fixed content/media scope. No deployment, whole-library seed or user-data rewrite.
 * Default: validate evidence only. --apply explicitly configures the four catalog books.
 */
import { readFile, writeFile, mkdir, copyFile, rename } from 'node:fs/promises'
import { resolve, isAbsolute, join } from 'node:path'
import { createHash } from 'node:crypto'
import { PrismaClient, type Prisma } from '@prisma/client'
import { songSpringPacks } from '../src/content/packs/poetry-song-spring'
import { songSeasonsPacks } from '../src/content/packs/poetry-song-seasons'
import { packContentVersion, seedPackTransaction } from '../src/content/seed'
import { chunkText } from '../src/modules/tts/client'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { cacheKey } from '../src/modules/tts/cache'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'
import { buildPrompt } from '../src/modules/media/imagegen'

const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const evidenceFile = arg('evidence'), database = arg('database'), media = arg('media'), backup = arg('backup'), output = arg('out')
const apply = process.argv.includes('--apply')
if (!evidenceFile || !output) throw Error('Explicit --evidence and --out required')
const packs = [...songSpringPacks, ...songSeasonsPacks], ids = packs.map(p => p.id)
const digest = (v: unknown) => createHash('sha256').update(typeof v === 'string' || Buffer.isBuffer(v) ? v : JSON.stringify(v, (_, x) => typeof x === 'bigint' ? String(x) : x)).digest('hex')
type VerifiedFile = { path: string; bytes: number; localSha256: string; remoteSha256: string }
type Evidence = {
  complete: boolean; model: string; contentVersions: Record<string, string>;
  arts: Array<{ scene: string; kind: string; urlPath: string; width: number; height: number; bytes: number; prompt: string; model: string; visualReview: string; files: VerifiedFile[] }>;
  audio: Array<{ key: string; durationMs: number; bytes: number; localSha256: string; remoteSha256: string; fullDecode: boolean; range: boolean }>;
  sourceMedia: string;
}
const e: Evidence = JSON.parse(await readFile(evidenceFile, 'utf8'))
const scenes = new Set(packs.flatMap(p => [`cover:${p.id}`, ...p.chapters.map(c => c.art!)]))
const prompts = new Map(packs.flatMap(p => [
  [`cover:${p.id}`, buildPrompt({ scene: `cover:${p.id}`, kind: 'cover', label: p.title, lang: 'zh', description: p.coverArtPrompt!, literalScene: true })],
  ...p.chapters.map(c => [c.art!, buildPrompt({ scene: c.art!, kind: 'chapter', label: c.title, lang: 'zh', description: c.artPrompt!, literalScene: true })]),
] as Array<[string, string]>))
const keys = new Set(packs.flatMap(p => p.chapters.flatMap(c => chunkText(chapterSpeakText(c.blocks)).map(t => cacheKey(t, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', e.model)))))
const validFile = (f: VerifiedFile) => f.bytes > 0 && /^[a-f0-9]{64}$/.test(f.localSha256) && f.localSha256 === f.remoteSha256 && /^art\/(covers|chapters)\/[a-zA-Z0-9.-]+\.webp$/.test(f.path)
if (!e.complete || !e.model || scenes.size !== 40 || keys.size !== 36 ||
    packs.some(p => e.contentVersions[p.id] !== packContentVersion(p)) ||
    e.arts.length !== scenes.size || new Set(e.arts.map(a => a.scene)).size !== scenes.size ||
    e.arts.some(a => !scenes.has(a.scene) || a.prompt !== prompts.get(a.scene) || a.visualReview !== 'passed' || a.width <= 0 || a.height <= 0 || a.files.length !== 3 || a.files.some(f => !validFile(f)) ||
      new Set(a.files.map(f => f.path)).size !== 3 || !a.files.some(f => '/api/media/' + f.path === a.urlPath) ||
      !a.files.some(f => f.path === a.urlPath.slice('/api/media/'.length).replace(/\.webp$/, '.thumb.webp')) ||
      !a.files.some(f => f.path === a.urlPath.slice('/api/media/'.length).replace(/\.webp$/, '.reader.webp'))) ||
    e.audio.length !== keys.size || new Set(e.audio.map(a => a.key)).size !== keys.size ||
    e.audio.some(a => !keys.has(a.key) || !a.fullDecode || !a.range || a.bytes <= 0 || a.durationMs <= 0 || !/^[a-f0-9]{64}$/.test(a.localSha256) || a.localSha256 !== a.remoteSha256)) throw Error('Incomplete, duplicate or stale content/media evidence')
const files = e.arts.flatMap(a => a.files)
for (const f of files) if (digest(await readFile(join(e.sourceMedia, f.path))) !== f.localSha256) throw Error('Local artwork changed after verification')
for (const a of e.audio) if (digest(await readFile(join(e.sourceMedia, 'tts-public', a.key + '.mp3'))) !== a.localSha256) throw Error('Local narration changed after verification')
if (!apply) {
  await writeFile(output, JSON.stringify({ validated: true, applied: false, books: ids, arts: scenes.size, audio: keys.size }, null, 2))
  console.log('Validated 4 books, 40 independent images and 36 complete narration segments; no live changes')
  process.exit(0)
}
if (!database?.startsWith('file:') || !isAbsolute(database.slice(5)) || !media || !isAbsolute(media) || !backup || !isAbsolute(backup)) throw Error('Apply requires explicit absolute --database=file:path --media --backup')
if (resolve(backup).startsWith(resolve(media))) throw Error('Backup must be outside served media')
const db = new PrismaClient({ datasources: { db: { url: database } } })
const quoted = ids.map(id => `'${id}'`).join(',')
async function protectedState(tx: Prisma.TransactionClient) {
  const tables = await tx.$queryRawUnsafe<Array<{ name: string }>>("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
  const filters: Record<string, string> = {
    Book: `id NOT IN (${quoted})`, Chapter: `bookId NOT IN (${quoted})`,
    Block: `chapterId NOT IN (SELECT id FROM Chapter WHERE bookId IN (${quoted}))`, RightsLedger: `bookId NOT IN (${quoted})`,
    ArtAsset: `scene NOT IN (${[...scenes].map(s => `'${s}'`).join(',')})`,
  }
  const result: Record<string, string> = {}
  for (const { name } of tables) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw Error('Unexpected table')
    result[name] = digest(await tx.$queryRawUnsafe(`SELECT * FROM "${name}"${filters[name] ? ` WHERE ${filters[name]}` : ''} ORDER BY rowid`))
  }
  return result
}
try {
  if (await db.book.count({ where: { id: { in: songSeasonsPacks.map(p => p.id) } } })) throw Error('New IDs already exist; refusing replacement')
  if (await db.artAsset.count({ where: { scene: { in: [...scenes] } } })) throw Error('Artwork already registered; refusing replacement')
  await mkdir(backup, { recursive: false })
  // SQLite creates a consistent online recovery snapshot; no service stop/restart.
  const snapshot = join(backup, 'before.db').replaceAll('\\', '/')
  await db.$executeRawUnsafe(`VACUUM INTO '${snapshot.replaceAll("'", "''")}'`)
  const manifestFile = join(media, '.tts-public-state.json')
  const priorManifest = await readFile(manifestFile, 'utf8')
  await writeFile(join(backup, 'tts-public-state-before.json'), priorManifest)
  const scopedBefore = await db.book.findMany({ where: { id: { in: ids } }, include: { chapters: { include: { blocks: true } } } })
  await writeFile(join(backup, 'scoped-before.json'), JSON.stringify(scopedBefore, null, 2))
  for (const f of files) {
    const target = join(media, f.path)
    await mkdir(join(target, '..'), { recursive: true })
    try { if (digest(await readFile(target)) !== f.localSha256) throw Error('Existing local artwork differs') }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; await copyFile(join(e.sourceMedia, f.path), target) }
  }
  const newKeys = new Set(songSeasonsPacks.flatMap(p => p.chapters.flatMap(c => chunkText(chapterSpeakText(c.blocks)).map(t => cacheKey(t, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', e.model)))))
  await mkdir(join(media, 'tts-public'), { recursive: true })
  for (const key of newKeys) await copyFile(join(e.sourceMedia, 'tts-public', key + '.mp3'), join(media, 'tts-public', key + '.mp3'))
  const latest = JSON.parse(await readFile(manifestFile, 'utf8'))
  for (const a of e.audio) {
    if (!newKeys.has(a.key)) { if (!latest[a.key]) throw Error('Previously verified narration disappeared'); continue }
    if (latest[a.key]) throw Error('Concurrent writer added a new narration key; stop and recheck')
    latest[a.key] = { durationMs: a.durationMs, bytes: a.bytes, uploaded: true, store: 'r2-worker', model: e.model }
  }
  const tmp = manifestFile + '.season-poetry.tmp'
  await writeFile(tmp, JSON.stringify(latest)); await rename(tmp, manifestFile)
  await db.$transaction(async tx => {
    const before = await protectedState(tx)
    for (const p of songSpringPacks) {
      const current = await tx.book.findUniqueOrThrow({ where: { id: p.id } })
      const chapters = await tx.chapter.findMany({ where: { bookId: p.id }, orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } })
      if (chapters.length !== p.chapters.length || chapters.some((c, i) => c.title !== p.chapters[i]!.title || JSON.stringify(c.blocks.map(b => [b.kind, b.text, b.pinyin, b.translation])) !== JSON.stringify(p.chapters[i]!.blocks.map(b => [b.kind, b.text, b.pinyin ?? null, b.translation ?? null])))) throw Error('Spring content was edited; media-only update refused')
      for (const [i, c] of chapters.entries()) await tx.chapter.update({ where: { id: c.id }, data: { art: p.chapters[i]!.art } })
      const version = packContentVersion(p)
      let guidance = current.readingGuidance
      if (guidance) { const value = JSON.parse(guidance); if (value.version === current.contentVersion) guidance = JSON.stringify({ ...value, version }) }
      const review = current.reviewEvidence ? JSON.parse(current.reviewEvidence) : {}
      await tx.book.update({ where: { id: p.id }, data: { contentVersion: version, readingGuidance: guidance, reviewEvidence: JSON.stringify({ ...review, contentVersion: version, mediaUpgrade: { date: '2026-10-15', images: p.chapters.length + 1, textUnchanged: true, evidence: 'docs/60' } }) } })
    }
    for (const p of songSeasonsPacks) {
      await seedPackTransaction(tx, p)
      await tx.book.update({ where: { id: p.id }, data: { publicationStatus: 'published', reviewStatus: 'pending', reviewEvidence: JSON.stringify({ reviewerType: 'agent', humanReviewClaimed: false, contentVersion: packContentVersion(p), mediaVerified: true, evidence: 'docs/60', narrationHumanReview: 'pending' }), readingGuidance: JSON.stringify({ version: packContentVersion(p), modes: ['together', 'listen'], topics: ['古诗', '田园', p.id.endsWith('autumn') ? '秋天' : '冬天', '劳动'], advice: '建议亲子共读。先看拼音读原诗，再对照白话理解；古代习俗和生活方式请结合提示讨论。', reviewer: '桃阅读 agent 校核', evidence: 'docs/60；古诗底本与逐字拼音核对，非人工审听', reviewedOn: '2026-10-15' }) } })
    }
    for (const a of e.arts) await tx.artAsset.create({ data: { scene: a.scene, kind: a.kind, urlPath: a.urlPath, width: a.width, height: a.height, bytes: a.bytes, prompt: a.prompt, model: a.model } })
    if (digest(before) !== digest(await protectedState(tx))) throw Error('Unrelated data changed; rolled back')
  }, { timeout: 300_000 })
  const integrity = await db.$queryRawUnsafe<Array<{ integrity_check: string }>>('PRAGMA integrity_check')
  if (integrity[0]?.integrity_check !== 'ok') throw Error('Database integrity failed')
  const books = await db.book.findMany({ where: { id: { in: ids } }, select: { id: true, title: true, publicationStatus: true, contentVersion: true, _count: { select: { chapters: true } } } })
  await writeFile(output, JSON.stringify({ complete: true, books, independentImages: scenes.size, narrationSegments: keys.size, protectedTablesUnchanged: true, integrity: 'ok', backup, checkedAt: new Date().toISOString() }, null, 2))
  console.log(JSON.stringify({ configured: true, books: books.length, images: scenes.size, narration: keys.size, protectedTablesUnchanged: true }))
} finally { await db.$disconnect() }
