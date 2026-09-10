/**
 * 书架聚合与孩子视图过滤。
 * 口径唯一依据：weread skill shelf.md——
 *   书架总数 = books.length + albums.length + (mp 非空 ? 1 : 0)；
 *   禁止使用 bookCount 等服务端内部计数回答书架数量。
 * 对回包字段只做「存在性防御」，不做臆测解释；所有条目原样直通给调用方。
 */
import type { PrismaClient } from '@prisma/client'

/** 童书类目白名单（双口径，2026-09-07 真实书架校准）：
 *  - 中文前缀：网关回包 category 实测为中文串（如「童书-幼儿启蒙」「童书-儿童文学」）；
 *  - 数字前缀：兼容可能返回数字类目 ID 的回包（docs/02 §5.4 点名 1300000=童书）。
 * 白名单语义：仅命中前缀的 books 进入孩子视图/推荐流，宁缺勿滥。
 * 教训记录（N6-001）：白天会话 mock 用臆测数字串导致测试绿但真实数据全灭——
 * 白名单口径必须以真实回包为准（见 nightly-log 第 6 夜）。 */
export const CHILD_CATEGORY_PREFIXES = ['童书', '1300000'] as const

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

/** 屏蔽键：kind 前缀隔离 book/album 两个独立 id 空间，防同值碰撞误伤（N3-004） */
export function blockedKey(kind: string, bookId: string): string {
  return `${kind}:${bookId}`
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
 * 孩子视图过滤（N3-003 决策：宁缺勿滥）：
 * - books：仅童书白名单（category 命中 1300000 前缀）且未被家长屏蔽；
 * - albums：回包无 category 字段（shelf.md 未定义），服务端无法判定适龄——
 *   默认全部不进入孩子视图（成人有声书不可漏给孩子是红线；听书放行留给夜 9 家长端逐个授权）；
 * - mp：文章收藏入口（无 id 可屏蔽），原样保留。
 * 该产品决策已登记 nightly-log 第 3 夜与 bug-register N3-003。
 */
export function filterChildShelf(
  items: ShelfItems,
  blocked: ReadonlySet<string>,
): ShelfItems {
  const books = items.books.filter((b) => {
    const id = getBookId(b)
    return (
      id !== null && !blocked.has(blockedKey('book', id)) && isChildCategory(b.category)
    )
  })
  return { books, albums: [], mp: items.mp }
}

/** 推荐流孩子过滤：童书白名单 + 未被屏蔽（discover.md：books[].category 存在） */
export function filterChildRecommend(
  books: Record<string, unknown>[],
  blocked: ReadonlySet<string>,
): Record<string, unknown>[] {
  return books.filter((b) => {
    const id = getBookId(b)
    return (
      id !== null && !blocked.has(blockedKey('book', id)) && isChildCategory(b.category)
    )
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
 * 书架快照同步（N3-001 语义：blocked 行是家长管控数据，绝不因同步丢失；
 * N3-007 第 9 夜重构：回包指纹跳过无变化同步（消除写放大）+ 行级 upsert
 * （元数据更新不动 blocked，消除全删全建与 PUT 屏蔽的并发唯一键窗口）。
 */
const syncFingerprints = new Map<string, string>()

/** 屏蔽状态变更后由 PUT blocked 调用：使指纹失效，下次同步不再跳过（N3-007 语义保全） */
export function invalidateSyncFingerprint(familyId: string): void {
  syncFingerprints.delete(familyId)
}

export async function syncShelfSnapshot(
  db: ShelfSnapshotDb,
  familyId: string,
  payload: unknown,
): Promise<void> {
  const fingerprint = JSON.stringify(payload)
  if (syncFingerprints.get(familyId) === fingerprint) return // 无变化：零写库

  const items = toShelfItems(payload)
  const existing = await db.shelfSnapshot.findMany({
    where: { familyId },
    select: { id: true, bookId: true, kind: true, blocked: true },
  })
  const existingByKey = new Map(existing.map((row) => [blockedKey(row.kind, row.bookId), row]))

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
    })
  }

  const desiredKeys = new Set<string>()
  for (const row of rows) {
    const key = blockedKey(row.kind, row.bookId)
    desiredKeys.add(key)
    const prev = existingByKey.get(key)
    if (!prev) {
      await db.shelfSnapshot.create({ data: row })
      continue
    }
    if (prev.blocked) continue // 屏蔽行保留原状（家长管控数据，元数据也不刷新）
    await db.shelfSnapshot.update({
      where: { id: prev.id },
      data: {
        title: row.title,
        author: row.author,
        cover: row.cover,
        category: row.category,
        finished: row.finished,
        readUpdateTime: row.readUpdateTime,
        syncedAt: new Date(),
      },
    })
  }
  // 移除已不在书架且未屏蔽的行
  for (const [key, row] of existingByKey) {
    if (!desiredKeys.has(key) && !row.blocked) {
      await db.shelfSnapshot.deleteMany({ where: { id: row.id } })
    }
  }
  // N9-204：全部写成功后才提交指纹，中途失败下次仍会重放（半写可自愈）
  syncFingerprints.set(familyId, fingerprint)
}