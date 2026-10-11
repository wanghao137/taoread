/** Incremental publication of exactly nine new classics, with unrelated data
 * compared inside the transaction. Requires a stopped API or offline clone. */
import { readFile, stat } from 'node:fs/promises'
import { join, resolve, relative, isAbsolute } from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { PrismaClient, type Prisma } from '@prisma/client'
import { seedPackTransaction, packContentVersion } from '../src/content/seed'
import type { PackBook } from '../src/content/types'
import { chunkText } from '../src/modules/tts/client'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { cacheKey } from '../src/modules/tts/cache'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'

const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const database = arg('database'), stagingUrl = arg('staging'), media = arg('media'), out = arg('out')
if (!process.argv.includes('--quiescent') || !database?.startsWith('file:') || !stagingUrl?.startsWith('file:') || !media || !out) throw Error('Requires --quiescent and explicit --database, --staging, --media, --out')
if (resolve(database.slice(5)) === resolve(stagingUrl.slice(5))) throw Error('Publication target must differ from staging')
const expected = ['andersen', 'grimm', 'aesop', 'willows', 'oz', 'alice', 'garden', 'nils', 'prince'].map(s => `zh-classic-${s}`)
const packPath = fileURLToPath(new URL('../src/content/packs/chinese-classics.ts', import.meta.url))
const { chineseClassics: packs } = await import(pathToFileURL(packPath).href) as { chineseClassics: PackBook[] }
if (packs.length !== 9 || new Set(packs.map(p => p.id)).size !== 9 || packs.some(p => !expected.includes(p.id))) throw Error('Unexpected publication scope')
const readiness = JSON.parse(await readFile(join(out, 'staging-readiness.json'), 'utf8')) as { books: Array<{ id: string; contentVersion: string }>; integrity: string }
if (readiness.integrity !== 'ok' || readiness.books.length !== 9 || packs.some(p => readiness.books.find(b => b.id === p.id)?.contentVersion !== packContentVersion(p))) throw Error('Missing/stale staging evidence')
const sceneIds = [...new Set(packs.flatMap(p => [p.coverArt, ...p.chapters.map(c => c.art!)]))]
const manifestBuffer = await readFile(join(out, 'release-media-manifest.json'))
const manifest = JSON.parse(manifestBuffer.toString('utf8')) as {
  books: string[]; contentVersions: Array<{ id: string; contentVersion: string }>; ttsModel: string;
  illustrations: number; audioSegments: number; files: Array<{ path: string; bytes: number; sha256: string }>;
}
const sha256 = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex')
if (!Array.isArray(manifest.books) || manifest.books.length !== 9 || new Set(manifest.books).size !== 9 || manifest.books.some(id => !expected.includes(id)) || !manifest.ttsModel || !Array.isArray(manifest.contentVersions) || manifest.contentVersions.length !== 9 || packs.some(p => manifest.contentVersions.find(b => b.id === p.id)?.contentVersion !== packContentVersion(p))) throw Error('Missing/stale media release manifest')
const audioKeys = new Set(packs.flatMap(p => p.chapters.flatMap(ch => chunkText(chapterSpeakText(ch.blocks)).map(text => cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', manifest.ttsModel)))))
const requiredFiles = new Set([...audioKeys].map(key => `tts-public/${key}.mp3`))
const artLedger = JSON.parse(await readFile(join(media, '.classics-art.json'), 'utf8')) as Record<string, { urlPath: string }>
for (const scene of sceneIds) {
  const path = artLedger[scene]?.urlPath
  if (!path?.startsWith('/api/media/art/') || path.includes('..') || !path.endsWith('.webp')) throw Error('Missing/invalid release art ledger')
  const rel = path.slice('/api/media/'.length)
  requiredFiles.add(rel)
  for (const suffix of ['thumb', 'reader']) requiredFiles.add(rel.replace(/\.webp$/, `.${suffix}.webp`))
}
if (!Array.isArray(manifest.files) || manifest.files.length !== requiredFiles.size || new Set(manifest.files.map(f => f.path)).size !== requiredFiles.size || manifest.illustrations !== sceneIds.length || manifest.audioSegments !== audioKeys.size) throw Error('Release media scope differs from current books')
for (const file of manifest.files) {
  if (!requiredFiles.has(file.path) || !Number.isInteger(file.bytes) || file.bytes <= 0 || !/^[a-f0-9]{64}$/.test(file.sha256)) throw Error('Unexpected release media entry')
  const buffer = await readFile(join(media, file.path))
  if (buffer.length !== file.bytes || sha256(buffer) !== file.sha256) throw Error(`Release media changed: ${file.path}`)
}
if (process.argv.includes('--offline-rehearsal')) {
  const child = relative(resolve(out), resolve(database.slice(5)))
  if (!child || child.startsWith('..') || isAbsolute(child)) throw Error('Offline rehearsal is restricted to a database inside task output')
} else {
  const evidence = arg('remote-evidence')
  if (!evidence) throw Error('Production publication requires explicit --remote-evidence')
  const remote = JSON.parse(await readFile(evidence, 'utf8')) as { manifestSha256: string; bucket: string; verified: Array<{ path: string; bytes: number; sha256: string }> }
  const a = [...manifest.files].sort((x, y) => x.path.localeCompare(y.path))
  const b = Array.isArray(remote.verified) ? [...remote.verified].sort((x, y) => x.path.localeCompare(y.path)) : []
  if (remote.manifestSha256 !== sha256(manifestBuffer) || remote.bucket !== 'taoread-media' || JSON.stringify(a) !== JSON.stringify(b)) throw Error('Incomplete/stale remote media evidence')
}
const stage = new PrismaClient({ datasources: { db: { url: stagingUrl } } })
const db = new PrismaClient({ datasources: { db: { url: database } } })
const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v)).digest('hex')

async function protectedState(tx: Prisma.TransactionClient) {
  const hashes: Record<string, string> = {}
  // Query all application tables, then scope only the five content tables whose
  // new rows are authorized. Family/auth/progress/bookmark tables stay exact.
  const tables = await tx.$queryRawUnsafe<Array<{ name: string }>>("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
  const quotedIds = expected.map(id => `'${id}'`).join(',')
  const quotedScenes = sceneIds.map(id => `'${id.replaceAll("'", "''")}'`).join(',')
  for (const { name } of tables) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw Error('Unexpected table name')
    const clauses: Record<string, string> = {
      Book: `id NOT IN (${quotedIds})`,
      Chapter: `bookId NOT IN (${quotedIds})`,
      Block: `chapterId NOT IN (SELECT id FROM Chapter WHERE bookId IN (${quotedIds}))`,
      RightsLedger: `bookId NOT IN (${quotedIds})`,
      ArtAsset: `scene NOT IN (${quotedScenes})`,
    }
    const rows = await tx.$queryRawUnsafe(`SELECT * FROM "${name}"${clauses[name] ? ` WHERE ${clauses[name]}` : ''} ORDER BY rowid`)
    hashes[name] = digest(rows)
  }
  return hashes
}

try {
  if (await stage.book.count() !== 9 || await stage.family.count() || await stage.childProfile.count()) throw Error('Invalid isolated staging database')
  for (const pack of packs) {
    const b = await stage.book.findUniqueOrThrow({ where: { id: pack.id }, include: { chapters: { orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } } } })
    if (b.contentVersion !== packContentVersion(pack) || b.chapters.length !== pack.chapters.length || b.reviewStatus !== 'pending') throw Error(`Stale staged book: ${pack.id}`)
    for (const [i, ch] of b.chapters.entries()) {
      const src = pack.chapters[i]!
      if (ch.title !== src.title || ch.art !== (src.art ?? null) || digest(ch.blocks.map(x => ({ kind: x.kind, text: x.text, art: x.art }))) !== digest(src.blocks.map(x => ({ kind: x.kind, text: x.text, art: x.art ?? null })))) throw Error(`Staged text differs: ${pack.id}:${i + 1}`)
    }
  }
  const assets = await stage.artAsset.findMany({ where: { scene: { in: sceneIds } } })
  if (assets.length !== sceneIds.length) throw Error('Incomplete illustration ledger')
  for (const asset of assets) {
    if (!asset.urlPath.startsWith('/api/media/art/') || asset.urlPath.includes('..')) throw Error('Invalid illustration path')
    const file = join(media, asset.urlPath.slice('/api/media/'.length))
    if ((await stat(file)).size !== asset.bytes) throw Error(`Missing/changed illustration: ${asset.scene}`)
    for (const suffix of ['thumb', 'reader']) if (!(await stat(file.replace(/\.webp$/, `.${suffix}.webp`))).size) throw Error(`Missing illustration variant: ${asset.scene}`)
  }
  await db.$transaction(async tx => {
    if (await tx.book.count({ where: { id: { in: expected } } }) || await tx.artAsset.count({ where: { scene: { in: sceneIds } } })) throw Error('New classics/scene IDs already exist; refuse replacement')
    const before = await protectedState(tx)
    for (const pack of packs) await seedPackTransaction(tx, pack)
    for (const asset of assets) {
      const { id, createdAt, ...data } = asset
      void [id, createdAt]
      await tx.artAsset.create({ data })
    }
    if (digest(before) !== digest(await protectedState(tx))) throw Error('Unrelated data changed; rolling back publication')
  }, { timeout: 300_000 })
  const integrity = await db.$queryRawUnsafe<Array<{ integrity_check: string }>>('PRAGMA integrity_check')
  if (integrity[0]?.integrity_check !== 'ok') throw Error('SQLite integrity check failed')
  console.log(JSON.stringify({ added: 9, illustrations: assets.length, chapters: packs.reduce((n, p) => n + p.chapters.length, 0), preservedUnrelatedData: true, integrity: 'ok', reviewStatus: 'pending' }))
} finally { await db.$disconnect(); await stage.$disconnect() }
