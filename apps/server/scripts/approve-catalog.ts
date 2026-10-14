import { PrismaClient } from '@prisma/client'
import { readFile, writeFile } from 'node:fs/promises'
import { z } from 'zod'
import { changeReview, reviewInput } from '../src/content/review'

// Explicit operator approval of a frozen catalogue, never approval of future imports.
const argument = (name: string) => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3)
const database = argument('database')
const manifestPath = argument('manifest')
const reportPath = argument('report')
if (!database || !manifestPath || !reportPath) throw Error('Required: --database=file:ABSOLUTE_PATH --manifest=FILE --report=FILE [--apply]')
const manifestSchema = z.object({
  version: z.literal(1),
  reviewer: z.string(),
  evidence: reviewInput.shape.evidence,
  books: z.array(z.object({ id: z.string().min(1), contentVersion: z.string().min(1) })).min(1),
})
const manifest = manifestSchema.parse(JSON.parse(await readFile(manifestPath, 'utf8')))
if (!manifest.evidence.approved || new Set(manifest.books.map(book => book.id)).size !== manifest.books.length) throw Error('Explicit approval and unique book IDs required')
const db = new PrismaClient({ datasources: { db: { url: database } } })
const report: { startedAt: string; applied: boolean; expected: number; completed: string[]; error?: string; finishedAt?: string } = {
  startedAt: new Date().toISOString(), applied: process.argv.includes('--apply'), expected: manifest.books.length, completed: [],
}
try {
  const current = await db.book.findMany({ where: { publicationStatus: 'published' }, select: { id: true, contentVersion: true }, orderBy: { id: 'asc' } })
  const expected = [...manifest.books].sort((a, b) => a.id.localeCompare(b.id, 'en'))
  const actual = [...current].sort((a, b) => a.id.localeCompare(b.id, 'en'))
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw Error('Published catalogue differs from approved IDs or versions; stop and review a new manifest')
  for (const book of manifest.books) {
    const input = reviewInput.parse({ version: book.contentVersion, publicationStatus: 'published', reviewer: manifest.reviewer, evidence: manifest.evidence })
    if (report.applied) {
      const existing = await db.book.findUniqueOrThrow({ where: { id: book.id }, select: { reviewStatus: true, reviewEvidence: true } })
      const desired = JSON.stringify({ ...input.evidence, reviewer: input.reviewer, contentVersion: input.version })
      if (existing.reviewStatus !== 'reviewed' || existing.reviewEvidence !== desired) await changeReview(db, book.id, input)
    }
    report.completed.push(book.id)
  }
  console.log(JSON.stringify({ applied: report.applied, expected: report.expected, completed: report.completed.length }))
} catch (error) {
  report.error = error instanceof Error ? error.message : 'Review registration failed'
  throw error
} finally {
  report.finishedAt = new Date().toISOString()
  await writeFile(reportPath, JSON.stringify(report, null, 2))
  await db.$disconnect()
}
