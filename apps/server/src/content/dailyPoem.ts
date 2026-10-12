import type { PrismaClient } from '@prisma/client'
import { createHash } from 'node:crypto'
import { DAILY_POEM_POOL } from './daily-poem-pool'

const stageRank = (stage: string) => ['3-5', '6-8', '9-12'].indexOf(stage)
const clean = (text: string) => text.replace(/\\n/g, '\n')
export function shanghaiDay(now = new Date()): string {
  return new Date(now.getTime() + 8 * 3600_000).toISOString().slice(0, 10)
}

/** Only published, unblocked, curated existing editions. No upstream API or media generation. */
export async function dailyPoem(db: PrismaClient, familyId: string, stage: string, now = new Date()) {
  const date = shanghaiDay(now)
  const entries = DAILY_POEM_POOL.filter(e => stageRank(e.minStage) <= stageRank(stage))
  const blocked = await db.shelfSnapshot.findMany({ where: { familyId, kind: 'cbf', blocked: true }, select: { bookId: true } })
  const blockedIds = new Set(blocked.map(b => b.bookId))
  const books = await db.book.findMany({
    where: { id: { in: [...new Set(entries.map(e => e.bookId))].filter(id => !blockedIds.has(id)) }, publicationStatus: 'published', lang: 'zh', category: 'poetry' },
    select: { id: true, title: true, chapters: { orderBy: { order: 'asc' }, select: { order: true, title: true, blocks: { where: { kind: 'poem' }, orderBy: { order: 'asc' }, select: { text: true, pinyin: true, translation: true } } } } },
  })
  const pool = entries.flatMap(entry => {
    const book = books.find(b => b.id === entry.bookId)
    const chapter = book?.chapters.find(c => c.order === entry.order && c.title === entry.title)
    if (!book || !chapter || !chapter.blocks.length) return []
    const poems = chapter.blocks.map(b => ({ text: clean(b.text), pinyin: clean(b.pinyin || ''), translation: clean(b.translation || '') }))
    const signature = createHash('sha256').update(JSON.stringify(poems)).digest('hex')
    if (signature !== entry.signature) return []
    const [title, author] = chapter.title.split(' · ')
    return [{ bookId: book.id, bookTitle: book.title, chapterOrder: chapter.order, title: title || chapter.title, author: author || '', preview: poems[0]!.text }]
  })
  // Sequential daily rotation has no adjacent repeats while the eligible pool stays unchanged.
  const dayNumber = Math.floor(Date.parse(date + 'T00:00:00Z') / 86400_000)
  return { date, poem: pool.length ? pool[dayNumber % pool.length]! : null }
}
