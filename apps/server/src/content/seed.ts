/**
 * 内容包幂等入库（docs/07 §3）。
 * 以 (bookId) 为锚 upsert 整本书：章序与块序按数组顺序写定。
 * 重复执行结果稳定，适合演示种子与未来的内容包同步复用同一入口。
 */
import type { PrismaClient } from '@prisma/client'
import type { PackBook } from './types'

/** 统计正文字数（中文按字、英文按词；note/image 图注不计入） */
export function countWords(book: PackBook): number {
  let n = 0
  for (const ch of book.chapters) {
    for (const b of ch.blocks) {
      if (b.kind === 'note' || b.kind === 'image') continue
      if (book.lang === 'en') {
        n += b.text.trim().split(/\s+/).filter(Boolean).length
      } else {
        // 去标点空格后按字计
        n += b.text.replace(/[^\p{L}\p{N}]/gu, '').length
      }
    }
  }
  return n
}

export async function seedPack(db: PrismaClient, pack: PackBook): Promise<void> {
  const words = countWords(pack)
  await db.book.upsert({
    where: { id: pack.id },
    create: {
      id: pack.id,
      title: pack.title,
      ...(pack.author ? { author: pack.author } : {}),
      lang: pack.lang,
      category: pack.category,
      ageStage: pack.ageStage,
      ...(pack.intro ? { intro: pack.intro } : {}),
      coverArt: pack.coverArt,
      ...(pack.coverFrom ? { coverFrom: pack.coverFrom } : {}),
      ...(pack.coverTo ? { coverTo: pack.coverTo } : {}),
      words,
      source: pack.source,
    },
    update: {
      title: pack.title,
      ...(pack.author ? { author: pack.author } : {}),
      lang: pack.lang,
      category: pack.category,
      ageStage: pack.ageStage,
      ...(pack.intro ? { intro: pack.intro } : {}),
      coverArt: pack.coverArt,
      ...(pack.coverFrom ? { coverFrom: pack.coverFrom } : {}),
      ...(pack.coverTo ? { coverTo: pack.coverTo } : {}),
      words,
      source: pack.source,
    },
  })

  // 章节是「写定即不可变」的结构：先按 bookId 清空再重排，保证 order 严格连续。
  // 全库扩到 200+ 书 / 4000+ 章后逐条 create 会把 seed 拖过分钟级，改批量 createMany：
  // 章节一批写入，再按 order 取回 id，全部块一批评入（单书 3 次往返）。
  await db.chapter.deleteMany({ where: { bookId: pack.id } })
  const chapterRows = pack.chapters.map((ch, ci) => ({
    bookId: pack.id,
    order: ci + 1,
    title: ch.title,
    ...(ch.art ? { art: ch.art } : {}),
  }))
  await db.chapter.createMany({ data: chapterRows })
  const stored = await db.chapter.findMany({
    where: { bookId: pack.id },
    select: { id: true, order: true },
  })
  const idByOrder = new Map(stored.map((row) => [row.order, row.id]))
  const blockRows = pack.chapters.flatMap((ch, ci) => {
    const chapterId = idByOrder.get(ci + 1)
    if (!chapterId) return []
    return ch.blocks.map((b, bi) => ({
      chapterId,
      order: bi + 1,
      kind: b.kind,
      text: b.text,
      ...(b.pinyin ? { pinyin: b.pinyin } : {}),
      ...(b.translation ? { translation: b.translation } : {}),
      ...(b.art ? { art: b.art } : {}),
    }))
  })
  if (blockRows.length > 0) {
    await db.block.createMany({ data: blockRows })
  }

  // 权利台账：一书一行，留痕可审计
  const r = pack.rights
  await db.rightsLedger.upsert({
    where: { bookId: pack.id },
    create: {
      bookId: pack.id,
      workTitle: r.workTitle,
      ...(r.author ? { author: r.author } : {}),
      ...(r.authorDeathYear ? { authorDeathYear: r.authorDeathYear } : {}),
      ...(r.translator ? { translator: r.translator } : {}),
      jurisdiction: r.jurisdiction,
      basis: r.basis,
      ...(r.sourceUrl ? { sourceUrl: r.sourceUrl } : {}),
      ...(r.note ? { note: r.note } : {}),
    },
    update: {
      workTitle: r.workTitle,
      ...(r.author ? { author: r.author } : {}),
      ...(r.authorDeathYear ? { authorDeathYear: r.authorDeathYear } : {}),
      ...(r.translator ? { translator: r.translator } : {}),
      jurisdiction: r.jurisdiction,
      basis: r.basis,
      ...(r.sourceUrl ? { sourceUrl: r.sourceUrl } : {}),
      ...(r.note ? { note: r.note } : {}),
    },
  })
}

export async function seedAllPacks(db: PrismaClient, packs: PackBook[]): Promise<void> {
  for (const pack of packs) {
    await seedPack(db, pack)
  }
}
