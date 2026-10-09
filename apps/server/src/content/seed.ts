/**
 * 内容包幂等入库（docs/07 §3）。
 * 以 (bookId) 为锚 upsert 整本书：章序与块序按数组顺序写定。
 * 重复执行结果稳定，适合演示种子与未来的内容包同步复用同一入口。
 */
import type { PrismaClient, Prisma } from '@prisma/client'
import type { PackBook } from './types'
import { invalidateBookCatalog } from './service'
import { createHash } from 'node:crypto'

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
  await db.$transaction(async (tx) => {
    await seedPackTransaction(tx, pack)
  }, { timeout: 60_000 })
  invalidateBookCatalog()
}

export function packContentVersion(pack: PackBook): string {
  return createHash('sha256').update(JSON.stringify({ title: pack.title, source: pack.source, intro: pack.intro, rights: pack.rights, chapters: pack.chapters })).digest('hex').slice(0, 16)
}

export async function seedPackTransaction(db: Prisma.TransactionClient, pack: PackBook): Promise<void> {
  const words = countWords(pack)
  const contentVersion = packContentVersion(pack)
  const prior = await db.book.findUnique({ where: { id: pack.id }, select: { contentVersion: true } })
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
      contentVersion,
    },
    update: {
      ...(prior && prior.contentVersion !== contentVersion ? { reviewStatus: 'pending', reviewEvidence: null } : {}),
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
      contentVersion,
    },
  })

  // Existing positions retain ids. New books use batched inserts in the same transaction.
  const existing = await db.chapter.findMany({ where: { bookId: pack.id }, include: { blocks: true } })
  if (existing.length > 0) {
    // Update in place: retain stable chapter/block ids, bookmarks and media references.
    const tx = db
      for (const [ci, ch] of pack.chapters.entries()) {
        const old = existing.find((c) => c.order === ci + 1)
        const row = old
          ? (old.title === ch.title && old.art === (ch.art ?? null) ? old : await tx.chapter.update({ where: { id: old.id }, data: { title: ch.title, art: ch.art ?? null } }))
          : await tx.chapter.create({ data: { bookId: pack.id, order: ci + 1, title: ch.title, art: ch.art ?? null } })
        for (const [bi, b] of ch.blocks.entries()) {
          const previous = old?.blocks.find((item) => item.order === bi + 1)
          const data = { kind: b.kind, text: b.text, pinyin: b.pinyin ?? null, translation: b.translation ?? null, art: b.art ?? null }
          if (previous && Object.entries(data).every(([k, value]) => previous[k as keyof typeof previous] === value)) continue
          await tx.block.upsert({ where: { chapterId_order: { chapterId: row.id, order: bi + 1 } }, create: { chapterId: row.id, order: bi + 1, ...data }, update: data })
        }
        await tx.block.deleteMany({ where: { chapterId: row.id, order: { gt: ch.blocks.length } } })
      }
      await tx.chapter.deleteMany({ where: { bookId: pack.id, order: { gt: pack.chapters.length } } })
  } else {
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

  // docs/35 B3：每包入库后即失效目录缓存（seedPack 单包增量 seed 同样生效，
  // seedAllPacks 循环调用本函数故一并覆盖）
}

export async function seedAllPacks(db: PrismaClient, packs: PackBook[]): Promise<void> {
  for (const pack of packs) {
    await seedPack(db, pack)
  }
}
