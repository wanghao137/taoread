/** docs/110: fixed-scope publication for the two classics poetry books. Never seeds the whole library. */
import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { isAbsolute } from 'node:path'
import { PrismaClient, type Prisma } from '@prisma/client'
import { poetrySushiPack } from '../src/content/packs/poetry-sushi'
import { poetryFestivalPack } from '../src/content/packs/poetry-festival'
import { packContentVersion, seedPackTransaction } from '../src/content/seed'

const arg = (name: string) => process.argv.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const database = arg('database'), output = arg('out')
const publish = process.argv.includes('--publish')
if (!database?.startsWith('file:') || !isAbsolute(database.slice(5)) || !output || (publish && !process.argv.includes('--quiescent'))) throw Error('Explicit --database=file:absolute-path, --out and --quiescent for publication are required')
const packs = [poetrySushiPack, poetryFestivalPack]
const ids = ['poetry-sushi', 'poetry-festival']
if (packs.length !== 2 || packs.some((p, i) => p.id !== ids[i]) || packs.reduce((n, p) => n + p.chapters.length, 0) !== 16) throw Error('Unexpected release scope')
const evidencePath = arg('evidence')
if (publish) {
  if (!evidencePath) throw Error('Verified media evidence required for publication')
  const evidence = JSON.parse(await readFile(evidencePath, 'utf8')) as {
    books: Array<{ id: string; chapters: number; illustrations: number; audioSegments: number }>
    failures: unknown[]
  }
  if (evidence.failures.length > 0 || !ids.every((id) => evidence.books.some((b) => b.id === id))) throw Error('Incomplete or failing media verification evidence')
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
function digest(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value, (_, v) => typeof v === 'bigint' ? String(v) : v)).digest('hex')
}

const db = new PrismaClient({ datasources: { db: { url: database } } })
try {
  await db.$transaction(async tx => {
    if (await tx.book.count({ where: { id: { in: ids } } })) throw Error('New book IDs already exist; refusing replacement')
    const before = await protectedState(tx)
    for (const pack of packs) {
      await seedPackTransaction(tx, pack)
      await tx.book.update({ where: { id: pack.id }, data: {
        publicationStatus: publish ? 'published' : 'draft', reviewStatus: 'pending',
        reviewEvidence: JSON.stringify({ reviewerType: 'agent', humanReviewClaimed: false, contentVersion: packContentVersion(pack), evidence: 'docs/110', verified: ['edition', 'dynasty', 'pinyin', 'original-translation', 'age-stage', 'rights'], mediaVerified: publish }),
      } })
    }
    if (digest(before) !== digest(await protectedState(tx))) throw Error('Unrelated data changed; transaction rolled back')
  }, { timeout: 300_000 })
  const integrity = await db.$queryRawUnsafe<Array<{ integrity_check: string }>>('PRAGMA integrity_check')
  if (integrity[0]?.integrity_check !== 'ok') throw Error('Database integrity failed')
  const receipt = { database, publish, ids, at: new Date().toISOString(), integrity: 'ok' }
  await writeFile(output, JSON.stringify(receipt, null, 2))
  console.log(JSON.stringify(receipt))
} finally {
  await db.$disconnect()
}
