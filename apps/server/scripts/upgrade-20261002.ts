/** Targeted release migration: no demo families, no destructive full seed, stable ids. */
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { createHash } from 'node:crypto'
import { ALL_PACKS } from '../src/content/packs'
import { seedPack } from '../src/content/seed'

if (!process.argv.includes('--apply')) throw new Error('Use --apply only after a verified production snapshot')
const db = new PrismaClient()
try {
  const books = await db.book.findMany({ where: { contentVersion: 'legacy' }, include: { chapters: { orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } } } })
  for (const book of books) {
    const rights = await db.rightsLedger.findUnique({ where: { bookId: book.id } })
    const canonical = { title: book.title, source: book.source, intro: book.intro, rights, chapters: book.chapters.map((chapter) => ({ title: chapter.title, art: chapter.art, blocks: chapter.blocks.map((block) => ({ kind: block.kind, text: block.text, pinyin: block.pinyin, translation: block.translation, art: block.art })) })) }
    const version = createHash('sha256').update(JSON.stringify(canonical)).digest('hex').slice(0, 16)
    await db.book.updateMany({ where: { id: book.id, contentVersion: 'legacy' }, data: { contentVersion: version } })
  }
  const targeted = ALL_PACKS.filter((book) => ['essay-luxun', 'tangshi-300'].includes(book.id))
  if (targeted.length !== 2) throw new Error('Expected exactly two release content updates')
  for (const book of targeted) await seedPack(db, book)
  console.log(JSON.stringify({ versionsBackfilled: books.length, contentUpdated: targeted.map((book) => book.id), demoFamiliesCreated: 0 }))
} finally { await db.$disconnect() }
