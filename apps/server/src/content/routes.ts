/**
 * 内容域路由（v2）：
 *   GET  /api/content/books?lang=&stage=   书库列表（带当前孩子进度）
 *   GET  /api/content/books/:id            书籍概览（章节数等）
 *   GET  /api/content/books/:id/chapters   章节目录
 *   GET  /api/content/books/:id/chapters/:order  章节正文（块数组）
 *   POST /api/content/books/:id/progress   阅读进度上报（childId + chapterOrder/blockOrder）
 *   GET  /api/content/books/:id/progress?childId=  进度读取
 * 书库为全家庭共享公版库，读正文需登录；进度按孩子归属。
 */
import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../modules/family/routes'
import { AppError, UnauthorizedError, ValidationError } from '../lib/errors'
import { generateReadingCard } from '../modules/cosession/readingCard'
import * as svc from './service'
import { registerImportRoutes } from './importRoutes'

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const detail = result.error.issues.map((issue) => issue.message).join('；')
    throw new ValidationError(detail || '请求参数不正确')
  }
  return result.data
}

export interface ContentRoutesDeps {
  db: PrismaClient
  tokenSecret: Buffer
}

export function registerContentRoutes(app: FastifyInstance, deps: ContentRoutesDeps): void {
  const { db, tokenSecret } = deps
  const auth = requireAuth(tokenSecret)
  registerImportRoutes(app, deps)

  /** 孩子端请求里携带的 childId 必须属于令牌家庭（防跨家庭越权） */
  async function assertOwnChild(request: FastifyRequest, childId: string): Promise<void> {
    if (!request.auth) throw new UnauthorizedError()
    const row = await db.childProfile.findUnique({
      where: { id: childId },
      select: { familyId: true },
    })
    if (!row || row.familyId !== request.auth.fid) {
      throw new AppError('小读者档案不存在', 'CHILD_NOT_FOUND', 404)
    }
  }

  app.get('/api/content/books', { preHandler: auth }, async (request, reply) => {
    const query = parse(
      z.object({
        lang: z.enum(['zh', 'en']).optional(),
        stage: z.enum(['3-5', '6-8', '9-12']).optional(),
        childId: z.string().min(1).max(64).optional(),
        q: z.string().trim().min(1).max(64).optional(),
      }),
      request.query,
    )
    if (query.childId) await assertOwnChild(request, query.childId)
    if (!request.auth) throw new UnauthorizedError()
    const books = await svc.listBooks(db, {
      familyId: request.auth.fid,
      ...(query.childId ? { childId: query.childId } : {}),
      ...(query.stage ? { stage: query.stage } : {}),
      ...(query.lang ? { lang: query.lang } : {}),
      ...(query.q ? { q: query.q } : {}),
    })
    return reply.send({ total: books.length, books })
  })

  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id',
    { preHandler: auth },
    async (request, reply) => {
      // T03/F02：屏蔽书对孩拒读；家长保留管理预览（确认屏蔽对象）
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, {
        role: request.auth!.role,
        allowParentPreview: true,
      })
      const book = await svc.getBook(db, request.params.id)
      if (!book) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      return reply.send({ book })
    },
  )

  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id/chapters',
    { preHandler: auth },
    async (request, reply) => {
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, {
        role: request.auth!.role,
        allowParentPreview: true,
      })
      const exists = await db.book.findUnique({ where: { id: request.params.id }, select: { id: true } })
      if (!exists) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      const chapters = await svc.listChapterTitles(db, request.params.id)
      return reply.send({ total: chapters.length, chapters })
    },
  )

  app.get<{ Params: { id: string; order: string } }>(
    '/api/content/books/:id/chapters/:order',
    { preHandler: auth },
    async (request, reply) => {
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, {
        role: request.auth!.role,
        allowParentPreview: true,
      })
      const order = parse(z.coerce.number().int().min(1).max(999), request.params.order)
      const chapter = await svc.getChapter(db, request.params.id, order)
      if (!chapter) throw new AppError('这一章还藏在云朵后面', 'CHAPTER_NOT_FOUND', 404)
      return reply.send({ chapter })
    },
  )

  app.post<{ Params: { id: string } }>(
    '/api/content/books/:id/progress',
    { preHandler: auth },
    async (request, reply) => {
      const body = parse(
        z.object({
          childId: z.string().min(1).max(64),
          chapterOrder: z.coerce.number().int().min(1).max(999),
          blockOrder: z.coerce.number().int().min(0).max(9999).default(0),
          // P0（V8 审计 A3.4）：显式完成动作；打开末章不再自动 finished。
          // 审计 T04/F12（DATA-01）：严格 boolean——字符串 "false" 直接 400，不再被 coerce 成 true
          completed: z.boolean().optional().default(false),
        }),
        request.body,
      )
      await assertOwnChild(request, body.childId)
      // T03/F02：屏蔽书的进度上报一并拒绝（不给已屏蔽内容累计任何阅读数据）
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, { role: request.auth!.role })
      const exists = await db.book.findUnique({ where: { id: request.params.id }, select: { id: true } })
      if (!exists) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      const result = await svc.reportProgress(
        db,
        body.childId,
        request.params.id,
        body.chapterOrder,
        body.blockOrder ?? 0,
        body.completed,
      )
      return reply.send(result)
    },
  )

  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id/progress',
    { preHandler: auth },
    async (request, reply) => {
      const query = parse(
        z.object({ childId: z.string().min(1).max(64) }),
        request.query,
      )
      await assertOwnChild(request, query.childId)
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, { role: request.auth!.role })
      const progress = await svc.getProgress(db, query.childId, request.params.id)
      return reply.send({ progress: progress ?? { chapterOrder: 1, blockOrder: 0, finished: false } })
    },
  )

  // ── 家长端内容域视图（docs/09 C4）：桃书库进度汇总 + 屏蔽（家长角色） ──
  app.get('/api/content/family', { preHandler: requireAuth(tokenSecret, { roles: ['parent'] }) }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const children = await db.childProfile.findMany({
      where: { familyId: request.auth.fid },
      select: { id: true, nickname: true, stage: true },
    })
    const books = await svc.listBooksForParent(db, request.auth.fid, children.map((c) => c.id))
    return reply.send({ children, books })
  })

  app.put<{ Params: { id: string } }>(
    '/api/content/books/:id/blocked',
    { preHandler: requireAuth(tokenSecret, { roles: ['parent'] }) },
    async (request, reply) => {
      if (!request.auth) throw new UnauthorizedError()
      const body = parse(z.object({ blocked: z.boolean() }), request.body ?? {})
      const exists = await db.book.findUnique({ where: { id: request.params.id }, select: { title: true } })
      if (!exists) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      await db.shelfSnapshot.upsert({
        where: { familyId_bookId_kind: { familyId: request.auth.fid, bookId: request.params.id, kind: 'cbf' } },
        create: {
          familyId: request.auth.fid,
          bookId: request.params.id,
          kind: 'cbf',
          title: exists.title,
          blocked: body.blocked,
        },
        update: { blocked: body.blocked },
      })
      return reply.send({ ok: true, bookId: request.params.id, blocked: body.blocked })
    },
  )

  /**
   * 阅读中共读脚手架（docs/09 B1）：把「讲什么、问什么」从收尾后的一次性卡片
   * 前移到阅读过程中。家长在孩子阅读时打开即可看到本章可聊的话题。
   * 内容域书按章节正文摘要生成，无网络依赖。
   */
  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id/scaffold',
    { preHandler: requireAuth(tokenSecret, { roles: ['parent'] }) },
    async (request, reply) => {
      if (!request.auth) throw new UnauthorizedError()
      const query = parse(
        z.object({ chapterOrder: z.coerce.number().int().min(1).max(999).optional() }),
        request.query,
      )
      const book = await db.book.findUnique({
        where: { id: request.params.id },
        select: { id: true, title: true, intro: true, ageStage: true },
      })
      if (!book) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      const children = await db.childProfile.findMany({
        where: { familyId: request.auth.fid },
        select: { id: true, stage: true },
      })
      // 脚手架按家庭里最年幼孩子的阶段出题（共读通常围着最小的孩子）
      const stageRank: Record<string, number> = { '3-5': 1, '6-8': 2, '9-12': 3 }
      const stage =
        children.length > 0
          ? children.reduce(
              (a, c) => ((stageRank[c.stage] ?? 3) < (stageRank[a.stage] ?? 3) ? c : a),
              children[0]!,
            ).stage
          : '6-8'
      // 本章正文摘要（前 60 字）作为 intro，让问题贴合正在读的内容
      let chapterIntro: string | null = null
      if (query.chapterOrder) {
        const chapter = await db.chapter.findFirst({
          where: { bookId: book.id, order: query.chapterOrder },
          include: { blocks: { orderBy: { order: 'asc' }, take: 3 } },
        })
        if (chapter) {
          const text = chapter.blocks
            .filter((b) => b.kind === 'text' || b.kind === 'poem')
            .map((b) => b.text)
            .join(' ')
            .replace(/\s+/g, ' ')
          chapterIntro = text.length > 0 ? text.slice(0, 60) : null
        }
      }
      const card = generateReadingCard({
        bookTitle: book.title,
        childStage: stage,
        childId: children[0]?.id ?? 'family',
        intro: chapterIntro ?? book.intro,
        topBookmarks: [],
      })
      return reply.send({ card, chapterOrder: query.chapterOrder ?? null })
    },
  )

  // ── 收藏（docs/15 P1-A）：孩子主动表达偏好，书架置顶 ──

  app.put<{ Params: { id: string } }>(
    '/api/content/books/:id/favorite',
    { preHandler: auth },
    async (request, reply) => {
      const body = parse(z.object({ childId: z.string().min(1).max(64), favorite: z.boolean() }), request.body ?? {})
      await assertOwnChild(request, body.childId)
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, { role: request.auth!.role })
      const exists = await db.book.findUnique({ where: { id: request.params.id }, select: { id: true } })
      if (!exists) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      const result = await svc.setFavorite(db, body.childId, request.params.id, body.favorite)
      return reply.send({ ok: true, ...result })
    },
  )

  // ── 生词本（docs/15 P1-B）──

  app.post(
    '/api/content/words',
    { preHandler: auth },
    async (request, reply) => {
      const body = parse(
        z.object({
          childId: z.string().min(1).max(64),
          word: z.string().trim().min(1).max(64),
          lang: z.enum(['zh', 'en']),
          bookId: z.string().trim().min(1).max(64).optional(),
          context: z.string().trim().min(1).max(200).optional(),
        }),
        request.body ?? {},
      )
      await assertOwnChild(request, body.childId)
      if (body.bookId) {
        // T03/F02：屏蔽书的生词收集一并拒绝
        await svc.assertContentReadable(db, request.auth!.fid, body.bookId, { role: request.auth!.role })
        const book = await db.book.findUnique({ where: { id: body.bookId }, select: { id: true } })
        if (!book) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      }
      const card = await svc.addWord(db, body.childId, {
        word: body.word,
        lang: body.lang,
        bookId: body.bookId ?? null,
        context: body.context ?? null,
      })
      return reply.send({ card })
    },
  )

  app.get(
    '/api/content/words',
    { preHandler: auth },
    async (request, reply) => {
      const query = parse(z.object({ childId: z.string().min(1).max(64) }), request.query)
      await assertOwnChild(request, query.childId)
      const cards = await svc.listWords(db, query.childId)
      return reply.send({ total: cards.length, cards })
    },
  )

  app.delete<{ Params: { wordId: string } }>(
    '/api/content/words/:wordId',
    { preHandler: auth },
    async (request, reply) => {
      const query = parse(z.object({ childId: z.string().min(1).max(64) }), request.query)
      await assertOwnChild(request, query.childId)
      await svc.removeWord(db, query.childId, request.params.wordId)
      return reply.send({ ok: true })
    },
  )
}
