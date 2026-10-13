/** Run against the CURRENT database immediately before recovery, never an old restored copy. */
import { PrismaClient } from '@prisma/client'
import { writeFile, stat } from 'node:fs/promises'
import { isAbsolute } from 'node:path'
const source = process.argv.find(x => x.startsWith('--database='))?.slice(11)
const target = process.argv.find(x => x.startsWith('--target='))?.slice(9)
if (!source || !target || !isAbsolute(source) || !isAbsolute(target) || !(await stat(source)).size) throw new Error('Existing absolute --database and new absolute --target are required')
const db = new PrismaClient({ datasources: { db: { url: `file:${source.replace(/\\/g, '/')}` } } })
try {
  const rows = await db.familyDeletion.findMany({ orderBy: { deletedAt: 'asc' } })
  await writeFile(target, JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), deleted: rows.map(r => ({ familyHash: r.familyHash, deletedAt: r.deletedAt.toISOString() })) }, null, 2), { flag: 'wx' })
  console.log(JSON.stringify({ ledgerExported: true, deletedFamilies: rows.length }))
} finally { await db.$disconnect() }
