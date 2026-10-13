import { PrismaClient } from '@prisma/client'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, isAbsolute } from 'node:path'
import { statSync } from 'node:fs'
const database = process.argv.find(x => x.startsWith('--database='))?.slice(11)
const output = process.argv.find(x => x.startsWith('--output='))?.slice(9)
if (!database?.startsWith('file:') || !output) throw Error('Explicit --database=file:... and --output directory required')
const dbPath = database.slice(5)
if (!isAbsolute(dbPath) || !statSync(dbPath).isFile() || statSync(dbPath).size === 0) throw Error('An existing nonempty absolute database file is required; this command never creates a database')
const db = new PrismaClient({ datasources: { db: { url: database } } })
try {
  const books = await db.book.findMany({ select: { id: true, title: true, lang: true, source: true, reviewStatus: true, publicationStatus: true, contentVersion: true, chapters: { orderBy: { order: 'asc' }, select: { order: true, title: true, blocks: { orderBy: { order: 'asc' }, select: { order: true, kind: true, text: true, pinyin: true, translation: true } } } } } })
  const rights = new Map((await db.rightsLedger.findMany()).map(r => [r.bookId, r]))
  const rows = books.flatMap(book => book.chapters.flatMap(ch => ch.blocks.filter(b => b.kind === 'poem').map(b => ({ bookId: book.id, title: book.title, lang: book.lang, chapter: ch.order, chapterTitle: ch.title, block: b.order, version: book.contentVersion, publication: book.publicationStatus, review: book.reviewStatus, missingPinyin: book.lang === 'zh' && !b.pinyin?.trim(), missingTranslation: !b.translation?.trim(), source: book.source, sourceUrl: rights.get(book.id)?.sourceUrl ?? '', text: b.text, pinyin: b.pinyin ?? '', translation: b.translation ?? '', reviewer: '', reviewedOn: '', reviewedScope: '', corrections: '', decision: '' }))))
  const headers = Object.keys(rows[0] ?? {})
  const csv = [headers.join(','), ...rows.map(row => headers.map(key => '"' + String(row[key as keyof typeof row]).replace(/"/g, '""') + '"').join(','))].join('\r\n')
  const target = resolve(output); await mkdir(target, { recursive: true })
  await writeFile(resolve(target, 'poem-review-queue.csv'), '\ufeff' + csv)
  await writeFile(resolve(target, 'book-review-queue.json'), JSON.stringify(books.map(b => ({ bookId: b.id, title: b.title, version: b.contentVersion, publication: b.publicationStatus, review: b.reviewStatus, source: b.source, rights: rights.get(b.id), chapters: b.chapters.length, requiresHumanReview: b.reviewStatus !== 'reviewed' })), null, 2))
  console.log(JSON.stringify({ books: books.length, pendingBooks: books.filter(b => b.reviewStatus !== 'reviewed').length, poems: rows.length, missingPinyin: rows.filter(r => r.missingPinyin).length, missingTranslation: rows.filter(r => r.missingTranslation).length, humanApprovalPerformed: false, output: target }))
} finally { await db.$disconnect() }
