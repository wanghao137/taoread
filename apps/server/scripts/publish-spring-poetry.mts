/** Fixed-scope incremental publication. Never seed or rewrite the whole library. */
import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { isAbsolute } from 'node:path'
import { PrismaClient, type Prisma } from '@prisma/client'
import { songSpringPacks } from '../src/content/packs/poetry-song-spring'
import { packContentVersion, seedPackTransaction } from '../src/content/seed'
import { chunkText } from '../src/modules/tts/client'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { cacheKey } from '../src/modules/tts/cache'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'

const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const database = arg('database'), output = arg('out')
const publish = process.argv.includes('--publish')
if (!database?.startsWith('file:') || !isAbsolute(database.slice(5)) || !output || (publish && !process.argv.includes('--quiescent'))) throw Error('Explicit --database=file:absolute-path, --out and --quiescent for publication are required')
const ids = ['poetry-song-spring', 'poetry-song-spring-deep']
if (songSpringPacks.length !== 2 || songSpringPacks.some(p => !ids.includes(p.id)) || songSpringPacks.reduce((n, p) => n + p.chapters.length, 0) !== 20) throw Error('Unexpected release scope')
const digest = (value: unknown) => createHash('sha256').update(JSON.stringify(value, (_, v) => typeof v === 'bigint' ? String(v) : v)).digest('hex')
if (publish) {
  const evidencePath = arg('media-evidence')
  if (!evidencePath) throw Error('Verified remote media evidence required')
  const evidence = JSON.parse(await readFile(evidencePath, 'utf8')) as {
    complete: boolean; model: string; contentVersions: Record<string, string>;
    verified: Array<{ key: string; bytes: number; localSha256: string; remoteSha256: string; durationMs: number }>;
  }
  const keys = new Set(songSpringPacks.flatMap(p => p.chapters.flatMap(c => chunkText(chapterSpeakText(c.blocks)).map(text => cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', evidence.model)))))
  if (!evidence.complete || !evidence.model || songSpringPacks.some(p => evidence.contentVersions[p.id] !== packContentVersion(p)) || keys.size !== evidence.verified.length || new Set(evidence.verified.map(v => v.key)).size !== keys.size || evidence.verified.some(v => !keys.has(v.key) || v.bytes <= 0 || v.durationMs <= 0 || !/^[a-f0-9]{64}$/.test(v.localSha256) || v.localSha256 !== v.remoteSha256)) throw Error('Incomplete/stale text or audio verification')
}

async function protectedState(tx: Prisma.TransactionClient) {
  const result: Record<string, string> = {}
  const tables = await tx.$queryRawUnsafe<Array<{ name: string }>>("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")
  const quoted = ids.map(id => `'${id}'`).join(',')
  const filters: Record<string, string> = {
    Book: `id NOT IN (${quoted})`, Chapter: `bookId NOT IN (${quoted})`,
    Block: `chapterId NOT IN (SELECT id FROM Chapter WHERE bookId IN (${quoted}))`, RightsLedger: `bookId NOT IN (${quoted})`,
  }
  for (const { name } of tables) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw Error('Unexpected database table')
    result[name] = digest(await tx.$queryRawUnsafe(`SELECT * FROM "${name}"${filters[name] ? ` WHERE ${filters[name]}` : ''} ORDER BY rowid`))
  }
  return result
}
const db = new PrismaClient({ datasources: { db: { url: database } } })
try {
  await db.$transaction(async tx => {
    if (await tx.book.count({ where: { id: { in: ids } } })) throw Error('New book IDs already exist; refusing replacement')
    const before = await protectedState(tx)
    for (const pack of songSpringPacks) {
      await seedPackTransaction(tx, pack)
      await tx.book.update({ where: { id: pack.id }, data: {
        publicationStatus: publish ? 'published' : 'draft', reviewStatus: 'pending',
        reviewEvidence: JSON.stringify({ reviewerType: 'agent', humanReviewClaimed: false, contentVersion: packContentVersion(pack), evidence: 'docs/55-新增二十首宋诗上线验收-2026-10-12.md', verified: ['edition', 'dynasty', 'pinyin', 'original-translation', 'age-stage', 'rights'], mediaVerified: publish }),
      } })
    }
    if (digest(before) !== digest(await protectedState(tx))) throw Error('Unrelated data changed; transaction rolled back')
  }, { timeout: 300_000 })
  const integrity = await db.$queryRawUnsafe<Array<{ integrity_check: string }>>('PRAGMA integrity_check')
  if (integrity[0]?.integrity_check !== 'ok') throw Error('Database integrity failed')
  const books = await db.book.findMany({ where: { id: { in: ids } }, select: { id: true, publicationStatus: true, reviewStatus: true, contentVersion: true, _count: { select: { chapters: true } } } })
  const receipt = { complete: true, addedPoems: 20, integrity: 'ok', protectedTablesUnchanged: true, books, checkedAt: new Date().toISOString() }
  await writeFile(output, JSON.stringify(receipt, null, 2))
  console.log(JSON.stringify(receipt))
} finally { await db.$disconnect() }
