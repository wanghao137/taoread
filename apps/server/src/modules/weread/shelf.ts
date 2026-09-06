/**
 * 书架聚合与孩子视图过滤。
 * 口径唯一依据：weread skill shelf.md——
 *   书架总数 = books.length + albums.length + (mp 非空 ? 1 : 0)；
 *   禁止使用 bookCount 等服务端内部计数回答书架数量。
 * 对回包字段只做「存在性防御」，不做臆测解释；所有条目原样直通给调用方。
 */
import type { PrismaClient } from '@prisma/client'

/** 童书类目白名单（docs/02 §5.4：category 前缀 1300000=童书）。
 * 白名单语义：仅命中前缀的 books 进入孩子视图/推荐流，宁缺勿滥。
 * 初版仅含计划书点名前缀，待真实书架数据校准后扩充（见夜间日志）。 */
export const CHILD_CATEGORY_PREFIXES = ['1300000'] as const

export function asRecord(v: unknown): Record<string, unknown> | null {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : null
}

function asRecords(v: unknown): Record<string, unknown>[] {
  if (!Array.isArray(v)) return []
  return v.map(asRecord).filter((r): r is Record<string, unknown> => r !== null)
}

export function asString(v: unknown): string | null {
  return typeof v === 'string' ? v : null
}

/** 孩子视图的类目闸：category 非字符串或未命中白名单 → 不进入孩子视图 */
export function isChildCategory(category: unknown): boolean {
  if (typeof category !== 'string' || category.length === 0) return false
  return CHILD_CATEGORY_PREFIXES.some((prefix) => category.startsWith(prefix))
}

export interface ShelfItems {
  books: Record<string, unknown>[]
  albums: Record<string, unknown>[]
  mp: Record<string, unknown> | null
}

export function toShelfItems(payload: unknown): ShelfItems {
  const root = asRecord(payload) ?? {}
  return {
    books: asRecords(root.books),
    albums: asRecords(root.albums),
    mp: asRecord(root.mp),
  }
}

/** 书架总数口径（shelf.md 强制规则）：三区和；mp 非空计 1 */
export function shelfTotal(items: ShelfItems): number {
  return items.books.length + items.albums.length + (items.mp !== null ? 1 : 0)
}

export function getBookId(item: Record<string, unknown>): string | null {
  const id = asString(item.bookId)
  return id !== null && id.length > 0 ? id : null
}

/** 专辑条目的唯一标识在 albumInfo.albumId（shelf.md；与 books[].bookId 完全独立的 id 空间） */
export function getAlbumId(album: Record<string, unknown>): string | null {
  const info = asRecord(album.albumInfo)
  const id = info ? asString(info.albumId) : null
  return id !== null && id.length > 0 ? id : null
}

/**
 * 孩子视图过滤：
 * - books：童书白名单（category 命中）且未被家长屏蔽；
 * - albums：回包无 category 字段（shelf.md 未定义），无法类目判定——
 *   只按家长屏蔽过滤（有声书是出发卡三通道之一，全部隐藏会砍掉听书场景）；
 * - mp：文章收藏入口（无 id 可屏蔽），原样保留。
 * 该偏离已记录夜间日志，待真实数据/家长反馈校准。
 */
export function filterChildShelf(
  items: ShelfItems,
  blockedBookIds: ReadonlySet<string>,
): ShelfItems {
  const books = items.books.filter((b) => {
    const id = getBookId(b)
    return id !== null && !blockedBookIds.has(id) && isChildCategory(b.category)
  })
  const albums = items.albums.filter((a) => {
    const id = getAlbumId(a)
    return id !== null && !blockedBookIds.has(id)
  })
  return { books, albums, mp: items.mp }
}

/** 推荐流孩子过滤：童书白名单 + 未被屏蔽（discover.md：books[].category 存在） */
export function filterChildRecommend(
  books: Record<string, unknown>[],
  blockedBookIds: ReadonlySet<string>,
): Record<string, unknown>[] {
  return books.filter((b) => {
    const id = getBookId(b)
    return id !== null && !blockedBookIds.has(id) && isChildCategory(b.category)
  })
}

// ── 快照落库 ──────────────────────────────────────────────────────────────

interface ShelfSnapshotDb {
  shelfSnapshot: PrismaClient['shelfSnapshot']
  $transaction: PrismaClient['$transaction']
}

function unixToDate(v: unknown): Date | null {
  // 微信读书回包时间戳为 Unix 秒（skill 文档）；毫秒级值（>1e12）防御性按毫秒处理
  if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) return null
  return new Date(v > 1e12 ? v : v * 1000)
}

/**
 * 书架快照全量同步：保留家长 blocked 标记，其余以网关回包为准。
 * mp 入口无文档化 id，不入快照（数量口径在响应层计算）。
 */
export async function syncShelfSnapshot(
  db: ShelfSnapshotDb,
  familyId: string,
  payload: unknown,
): Promise<void> {
  const items = toShelfItems(payload)
  const existing = await db.shelfSnapshot.findMany({
    where: { familyId },
    select: { bookId: true, kind: true, blocked: true },
  })
  const blockedKeys = new Set(
    existing.filter((row) => row.blocked).map((row) => `${row.kind}:${row.bookId}`),
  )

  type SnapshotRow = {
    familyId: string
    bookId: string
    kind: string
    title: string
    author: string | null
    cover: string | null
    category: string | null
    finished: boolean
    readUpdateTime: Date | null
    blocked: boolean
  }
  const rows: SnapshotRow[] = []

  for (const book of items.books) {
    const bookId = getBookId(book)
    if (bookId === null) continue
    rows.push({
      familyId,
      bookId,
      kind: 'book',
      title: asString(book.title) ?? bookId,
      author: asString(book.author),
      cover: asString(book.cover),
      category: asString(book.category),
      finished: book.finishReading === 1,
      readUpdateTime: unixToDate(book.readUpdateTime),
      blocked: blockedKeys.has(`book:${bookId}`),
    })
  }
  for (const album of items.albums) {
    const albumId = getAlbumId(album)
    if (albumId === null) continue
    const info = asRecord(album.albumInfo)
    rows.push({
      familyId,
      bookId: albumId,
      kind: 'album',
      title: (info ? asString(info.name) : null) ?? albumId,
      author: info ? asString(info.authorName) : null,
      cover: info ? asString(info.cover) : null,
      category: null,
      finished: info !== null && info.finish === 1,
      readUpdateTime: info ? unixToDate(info.updateTime) : null,
      blocked: blockedKeys.has(`album:${albumId}`),
    })
  }

  if (rows.length === 0) {
    await db.shelfSnapshot.deleteMany({ where: { familyId } })
    return
  }
  await db.$transaction([
    db.shelfSnapshot.deleteMany({ where: { familyId } }),
    db.shelfSnapshot.createMany({ data: rows }),
  ])
}
