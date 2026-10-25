/**
 * 盘点生产/本地公共书的完整性：章节数、块数、字数、每章均值、生图与 TTS 配置状态。
 * 用法：npx tsx scripts/audit-story-completeness.mts [--db D:/taoread-prod/apps/server/prod.db]
 */
import { PrismaClient } from '@prisma/client'

const args = process.argv.slice(2)
const dbArgIdx = args.indexOf('--db')
const dbUrl = dbArgIdx >= 0 ? `file:${args[dbArgIdx + 1]}` : 'file:./dev.db'
const db = new PrismaClient({ datasources: { db: { url: dbUrl } } })

const books = (
  await db.book.findMany({
    select: { id: true, title: true, lang: true, category: true, publicationStatus: true },
  })
).filter(b => !/^(fam|fb|cbf|famimport)[:_-]/.test(b.id))

interface Row {
  category: string
  id: string
  title: string
  lang: string
  status: string
  chapters: number
  blocks: number
  chars: number
  minChapterChars: number
  maxChapterChars: number
  images: number
  imageBlocks: number
}

const rows: Row[] = []
for (const b of books) {
  const chapters = await db.chapter.findMany({
    where: { bookId: b.id },
    select: { blocks: { select: { kind: true, text: true } } },
    orderBy: { order: 'asc' },
  })
  const blocks = chapters.reduce((n, c) => n + c.blocks.length, 0)
  let chars = 0
  const perChapter: number[] = []
  for (const c of chapters) {
    let cc = 0
    for (const blk of c.blocks) cc += blk.text?.length ?? 0
    chars += cc
    perChapter.push(cc)
  }
  const artAssets = await db.artAsset.count({
    where: { OR: [{ scene: `cover:${b.id}` }, { scene: { startsWith: `chapter:${b.id}:` } }] },
  })
  rows.push({
    category: b.category,
    id: b.id,
    title: b.title,
    lang: b.lang,
    status: b.publicationStatus,
    chapters: chapters.length,
    blocks,
    chars,
    minChapterChars: perChapter.length ? Math.min(...perChapter) : 0,
    maxChapterChars: perChapter.length ? Math.max(...perChapter) : 0,
    images: artAssets,
    imageBlocks: chapters.reduce((n, c) => n + c.blocks.filter(x => x.kind === 'image').length, 0),
  })
}
rows.sort((a, b) => (a.category + a.id).localeCompare(b.category + b.id))
console.log(`公共书总数: ${books.length}`)
console.log('category | id | title | lang | status | 章节 | 块 | 字数 | 最短章 | 最长章 | 图章 | ArtAsset')
for (const r of rows) {
  console.log([r.category, r.id, r.title, r.lang, r.status, r.chapters, r.blocks, r.chars, r.minChapterChars, r.maxChapterChars, r.imageBlocks, r.images].join(' | '))
}
await db.$disconnect()
