/**
 * 微信读书业务 API（第 3 夜四件套）：
 *   GET /api/shelf                          书架聚合（三区和口径 + 快照落库 + ?view=child 孩子视图）
 *   GET /api/book/:bookId/info|chapters     书籍信息/章节目录（回包直通，24h 缓存）
 *   GET /api/book/:bookId/progress          阅读进度（实时，不缓存）
 *   GET /api/book/recommend                 个性化推荐（童书白名单 + 家长屏蔽过滤）
 *   GET /api/book/:bookId/bestbookmarks     全书热门划线
 *   PUT /api/family/:familyId/shelf/:bookId/blocked  家长单书屏蔽（N9 家长端用）
 * 全部业务流量经 WereadService（缓存 + 家庭隔离 + 令牌桶限流）。
 */
import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth, assertSameFamily } from '../family/routes'
import type { WereadServiceRegistry } from '../../services/weread/registry'
import { NotFoundError, UnauthorizedError, ValidationError } from '../../lib/errors'
import {
  asRecord,
  asString,
  filterChildRecommend,
  filterChildShelf,
  invalidateSyncFingerprint,
  isChildCategory,
  shelfTotal,
  syncShelfSnapshot,
  toShelfItems,
} from './shelf'

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const detail = result.error.issues.map((issue) => issue.message).join('；')
    throw new ValidationError(detail || '请求参数不正确')
  }
  return result.data
}

const bookIdParamSchema = z.object({ bookId: z.string().min(1).max(128) })
const familyBookParamSchema = z.object({
  familyId: z.string().min(1),
  bookId: z.string().min(1).max(128),
})

function authFid(request: FastifyRequest): string {
  if (!request.auth) throw new UnauthorizedError()
  return request.auth.fid
}

/** 该家庭被屏蔽的条目键集合（kind 前缀隔离 book/album id 空间，N3-004） */
async function loadBlockedKeys(db: PrismaClient, familyId: string): Promise<Set<string>> {
  const rows = await db.shelfSnapshot.findMany({
    where: { familyId, blocked: true },
    select: { bookId: true, kind: true },
  })
  return new Set(rows.map((row) => `${row.kind}:${row.bookId}`))
}

/**
 * 孩子角色书籍详情适龄闸（N3-R4，第 9 夜落实）：
 * 被屏蔽 → 404；未屏蔽但类目不在童书白名单（bookId 可枚举构造的旁路）→ 404。
 * 类目来源 bookInfo（service 层 24h 缓存，重复校验零额外出网）。
 * 子页接口（chapters/progress/bestbookmarks）回包无 category，统一借 bookInfo 判定。
 */
async function assertChildBookAllowed(
  db: PrismaClient,
  registry: WereadServiceRegistry,
  request: FastifyRequest,
  bookId: string,
): Promise<void> {
  if (request.auth?.role !== 'child') return
  const blocked = await db.shelfSnapshot.findFirst({
    // kind 固定 book：详情接口均为 book 语义，album 屏蔽不得误伤同值 bookId（N3-R1）
    where: { familyId: request.auth.fid, bookId, kind: 'book', blocked: true },
    select: { id: true },
  })
  if (blocked) throw new NotFoundError('没有找到这本书')
  const service = await registry.get(authFid(request))
  const info = asRecord(await service.endpoints.bookInfo(bookId))
  const category = asString(info?.category)
  if (!isChildCategory(category)) {
    throw new NotFoundError('没有找到这本书')
  }
}

export interface WereadRoutesDeps {
  db: PrismaClient
  registry: WereadServiceRegistry
  tokenSecret: Buffer
}

export function registerWereadRoutes(
  app: FastifyInstance,
  deps: WereadRoutesDeps,
): void {
  const { db, registry, tokenSecret } = deps

  // ── 书架聚合 ──
  app.get('/api/shelf', { preHandler: requireAuth(tokenSecret) }, async (request) => {
    const familyId = authFid(request)
    const service = await registry.get(familyId)
    const payload = await service.endpoints.shelfSync()
    await syncShelfSnapshot(db, familyId, payload)

    const items = toShelfItems(payload)
    const blockedKeys = await loadBlockedKeys(db, familyId)
    // N3-002：孩子角色服务端强制孩子视图（忽略 query）；家长/全量视图仅家长角色可达
    const queryView = parse(
      z.object({ view: z.enum(['full', 'child']).optional() }),
      request.query ?? {},
    ).view
    const isChild = request.auth?.role === 'child'
    if (queryView === 'child' || isChild) {
      const childItems = filterChildShelf(items, blockedKeys)
      return {
        view: 'child' as const,
        total: shelfTotal(childItems),
        bookCount: childItems.books.length,
        albumCount: childItems.albums.length,
        books: childItems.books,
        albums: childItems.albums,
        mp: childItems.mp,
      }
    }
    return {
      view: 'full' as const,
      total: shelfTotal(items),
      bookCount: items.books.length,
      albumCount: items.albums.length,
      books: items.books,
      albums: items.albums,
      mp: items.mp,
      blockedBookIds: [...blockedKeys],
    }
  })

  // ── 书籍信息（回包直通：字段口径以 skill 文档为准，不做增删） ──
  app.get('/api/book/:bookId/info', {
    preHandler: requireAuth(tokenSecret),
  }, async (request) => {
    const { bookId } = parse(bookIdParamSchema, request.params)
    await assertChildBookAllowed(db, registry, request, bookId)
    const service = await registry.get(authFid(request))
    return service.endpoints.bookInfo(bookId)
  })

  // ── 章节目录（直通） ──
  app.get('/api/book/:bookId/chapters', {
    preHandler: requireAuth(tokenSecret),
  }, async (request) => {
    const { bookId } = parse(bookIdParamSchema, request.params)
    await assertChildBookAllowed(db, registry, request, bookId)
    const service = await registry.get(authFid(request))
    return service.endpoints.chapterInfo(bookId)
  })

  // ── 阅读进度（实时数据，WereadService 层不缓存） ──
  app.get('/api/book/:bookId/progress', {
    preHandler: requireAuth(tokenSecret),
  }, async (request) => {
    const { bookId } = parse(bookIdParamSchema, request.params)
    await assertChildBookAllowed(db, registry, request, bookId)
    const service = await registry.get(authFid(request))
    return service.endpoints.getProgress(bookId)
  })

  // ── 个性化推荐（童书白名单 + 家长屏蔽过滤） ──
  app.get('/api/book/recommend', {
    preHandler: requireAuth(tokenSecret),
  }, async (request) => {
    const familyId = authFid(request)
    const { count } = parse(
      z.object({ count: z.coerce.number().int().min(1).max(50).default(12) }),
      request.query ?? {},
    )
    const service = await registry.get(familyId)
    const payload = await service.endpoints.bookRecommend(count)
    const root = asRecord(payload) ?? {}
    const rawBooks = Array.isArray(root.books) ? root.books : []
    const books = rawBooks
      .map(asRecord)
      .filter((b): b is Record<string, unknown> => b !== null)
    const blockedKeys = await loadBlockedKeys(db, familyId)
    return { books: filterChildRecommend(books, blockedKeys), rawCount: books.length }
  })

  // ── 全书热门划线（直通；chapterUid=0 表示全部章节） ──
  app.get('/api/book/:bookId/bestbookmarks', {
    preHandler: requireAuth(tokenSecret),
  }, async (request) => {
    const { bookId } = parse(bookIdParamSchema, request.params)
    await assertChildBookAllowed(db, registry, request, bookId)
    const { chapterUid } = parse(
      z.object({ chapterUid: z.coerce.number().int().min(0).default(0) }),
      request.query ?? {},
    )
    const service = await registry.get(authFid(request))
    return service.endpoints.bestBookmarks(bookId, chapterUid)
  })

  // ── 家长单书屏蔽（仅家长；夜 9 家长端屏蔽管理用） ──
  app.put('/api/family/:familyId/shelf/:bookId/blocked', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request) => {
    const { familyId, bookId } = parse(familyBookParamSchema, request.params)
    assertSameFamily(request, familyId)
    const body = parse(
      z.object({
        kind: z.enum(['book', 'album']),
        blocked: z.boolean(),
        title: z.string().max(200).optional(),
        author: z.string().max(200).nullish(),
        cover: z.string().max(1024).nullish(),
        category: z.string().max(64).nullish(),
      }),
      request.body ?? {},
    )
    await db.shelfSnapshot.upsert({
      where: { familyId_bookId_kind: { familyId, bookId, kind: body.kind } },
      create: {
        familyId,
        bookId,
        kind: body.kind,
        title: body.title ?? bookId,
        author: body.author ?? null,
        cover: body.cover ?? null,
        category: body.category ?? null,
        blocked: body.blocked,
      },
      update: { blocked: body.blocked },
    })
    // 屏蔽状态变更 → 快照指纹失效（N3-007）：下次同步不再跳过，
    // 解除屏蔽后「不在书架的行被清除」语义得以保持
    invalidateSyncFingerprint(familyId)
    return { ok: true, bookId, kind: body.kind, blocked: body.blocked }
  })
}
