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
import { createHash } from 'node:crypto'
import { z } from 'zod'
import { requireAuth } from '../modules/family/routes'
import { AppError, UnauthorizedError, ValidationError } from '../lib/errors'
import { generateReadingCard } from '../modules/cosession/readingCard'
import * as svc from './service'
import { registerImportRoutes } from './importRoutes'
import { buildWordQuiz } from './quiz'
import { buildLiteracyTest, literacySuggestion } from './literacy'
import { COLLECTIONS, findCollection, collectionWhere } from './collections'
import { weekStartDate } from '../lib/week'

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
  mediaDir: string
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

  /** 孩子角色的年龄段只能来自孩子档案（与 importRoutes.childStage 同口径）：
   * query.stage 可被任意改写，采信它等于孩子可以自选「9-12」绕过适龄过滤 */
  async function deriveChildStage(request: FastifyRequest, childId: string | undefined): Promise<string> {
    if (!request.auth) throw new UnauthorizedError()
    if (!childId) throw new ValidationError('请选择孩子档案')
    const profile = await db.childProfile.findFirst({
      where: { id: childId, familyId: request.auth.fid },
      select: { stage: true },
    })
    if (!profile) throw new AppError('没有找到孩子档案', 'CHILD_NOT_FOUND', 404)
    return profile.stage
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
    // 孩子角色忽略 query.stage，从孩子档案推导（防绕过适龄过滤）；家长角色仍可显式传 stage
    let stage: string | undefined = query.stage
    if (request.auth.role === 'child') {
      stage = await deriveChildStage(request, query.childId)
    }
    const books = await svc.listBooks(db, {
      familyId: request.auth.fid,
      ...(query.childId ? { childId: query.childId } : {}),
      ...(stage ? { stage } : {}),
      ...(query.lang ? { lang: query.lang } : {}),
      ...(query.q ? { q: query.q } : {}),
    })
    // docs/35 B4：ETag + 30s 浏览器缓存——内容指纹（总数+收藏数+最近读时间原文）做真哈希，
    // 变化则 304 失效；切 tab / 短时间重进的重复全量拉取免传输（CF 不缓存带 Authorization
    // 的响应，此头只作用于浏览器）。对抗审查 P0-1：ISO 时间戳定长，早期版本取「指纹字节长度」
    // 恒定不变 → 永久 304 陈旧；必须哈希原文。
    const etag = `W/"shelf-${createHash('sha256').update(JSON.stringify(books)).digest('hex').slice(0, 24)}"`
    reply.header('ETag', etag)
    reply.header('Cache-Control', 'private, max-age=30')
    if (request.headers['if-none-match'] === etag) {
      reply.code(304)
      return reply.send()
    }
    return reply.send({ total: books.length, books })
  })

  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id',
    { preHandler: auth },
    async (request, reply) => {
      const query = parse(
        z.object({ childId: z.string().min(1).max(64).optional() }),
        request.query,
      )
      if (query.childId) await assertOwnChild(request, query.childId)
      // T03/F02：屏蔽书对孩拒读；家长保留管理预览（确认屏蔽对象）——
      // 预览响应带真实 blocked 状态，家长才能确认屏蔽对象选对了
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, {
        role: request.auth!.role,
        allowParentPreview: true,
      })
      const book = await svc.getBook(db, request.params.id, {
        familyId: request.auth!.fid,
        ...(query.childId ? { childId: query.childId } : {}),
      })
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
          // R-04：客户端持有的行版本（getProgress/上次上报返回的 updatedAt）；旧客户端缺省
          baseUpdatedAt: z.string().max(40).optional(),
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
        body.baseUpdatedAt,
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
   * 阅读中共读脚手架（docs/09 B1 / docs/34 P0-3）：把「讲什么、问什么」从收尾后的一次性卡片
   * 前移到阅读过程中。共读发生在同一块屏幕前（睡前家庭场景），孩子端阅读器「给爸妈」按钮
   * 直接触发，故对全部登录角色开放（内容仅模板话题 + 本章前 60 字摘要，无敏感数据）。
   * 内容域书按章节正文摘要生成，无网络依赖。
   */
  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id/scaffold',
    { preHandler: auth },
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
      // 出处字段最终落库值：导入书场景下由下方分支重写（外键约束决定 bookId 存不下导入书 id）
      let bookRef: string | null = null
      let context = body.context ?? null
      if (body.bookId) {
        // T03/F02：屏蔽书的生词收集一并拒绝（imp: 分支校验家庭归属，与正文读取同源）
        await svc.assertContentReadable(db, request.auth!.fid, body.bookId, { role: request.auth!.role })
        if (body.bookId.startsWith('imp:')) {
          const imported = await db.importedBook.findFirst({
            where: { id: body.bookId, familyId: request.auth!.fid },
            select: { title: true },
          })
          if (!imported) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
          // WordCard.bookId 外键只指向公版 Book 表（SQLite 外键强制，不做迁移），
          // 导入书出处以《书名》前缀保留在 context，列表页照常展示来源
          bookRef = null
          context = `《${imported.title}》${body.context ? `·${body.context}` : ''}`
        } else {
          const book = await db.book.findUnique({ where: { id: body.bookId }, select: { id: true } })
          if (!book) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
          bookRef = body.bookId
        }
      }
      const card = await svc.addWord(db, body.childId, {
        word: body.word,
        lang: body.lang,
        bookId: bookRef,
        context,
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

  // ── 读后小测（docs/34 P1-5）：机械理解检查，正确答案可从原文验证 ──

  app.get<{ Params: { id: string; order: string } }>(
    '/api/content/books/:id/chapters/:order/quiz',
    { preHandler: auth },
    async (request, reply) => {
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, { role: request.auth!.role })
      const order = parse(z.coerce.number().int().min(1).max(999), request.params.order)
      const book = await db.book.findUnique({
        where: { id: request.params.id },
        select: { id: true, title: true, lang: true },
      })
      if (!book) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      const chapter = await db.chapter.findFirst({
        where: { bookId: book.id, order },
        include: { blocks: { orderBy: { order: 'asc' } } },
      })
      if (!chapter) throw new AppError('这一章还藏在云朵后面', 'CHAPTER_NOT_FOUND', 404)
      const chapterTexts = chapter.blocks
        .filter((b) => b.kind === 'text' || b.kind === 'poem')
        .map((b) => b.text)
      // 干扰项取同书其他章的正文，保证「可证伪」
      const otherBlocks = await db.block.findMany({
        where: { chapter: { bookId: book.id, order: { not: order } }, kind: { in: ['text', 'poem'] } },
        select: { text: true },
        take: 40,
      })
      const seed = `${book.id}:${order}:${new Date().toISOString().slice(0, 10)}`
      const quiz = buildWordQuiz({
        bookTitle: book.title,
        chapterOrder: order,
        lang: book.lang === 'en' ? 'en' : 'zh',
        chapterTexts,
        distractorTexts: otherBlocks.map((b) => b.text),
        seed,
      })
      return reply.send({ quiz })
    },
  )

  app.post<{ Params: { id: string } }>(
    '/api/content/books/:id/quiz-result',
    { preHandler: auth },
    async (request, reply) => {
      if (!request.auth) throw new UnauthorizedError()
      const body = parse(
        z.object({
          childId: z.string().min(1).max(64),
          chapterOrder: z.coerce.number().int().min(1).max(999),
          correct: z.boolean(),
          // 难度自报：1 有点难 | 2 刚刚好 | 3 太简单（docs/34 P1-5/P1-7 信号）
          difficulty: z.number().int().min(1).max(3),
        }),
        request.body ?? {},
      )
      await assertOwnChild(request, body.childId)
      await svc.assertContentReadable(db, request.auth!.fid, request.params.id, { role: request.auth!.role })
      await db.eventLog.createMany({
        data: [
          {
            familyId: request.auth.fid,
            role: request.auth.role,
            event: 'quiz_answered',
            props: JSON.stringify({ childId: body.childId, bookId: request.params.id, chapterOrder: body.chapterOrder, correct: body.correct }),
          },
          {
            familyId: request.auth.fid,
            role: request.auth.role,
            event: 'difficulty_reported',
            props: JSON.stringify({ childId: body.childId, bookId: request.params.id, chapterOrder: body.chapterOrder, difficulty: body.difficulty }),
          },
        ],
      })
      return reply.send({ ok: true })
    },
  )

  // ── 识字量速测（docs/34 P1-8）：只给阅读建议，不做能力评估 ──

  app.get('/api/content/literacy-test', { preHandler: auth }, async (request, reply) => {
    const query = parse(z.object({ childId: z.string().min(1).max(64) }), request.query)
    await assertOwnChild(request, query.childId)
    if (!request.auth) throw new UnauthorizedError()
    const child = await db.childProfile.findFirst({
      where: { id: query.childId, familyId: request.auth.fid },
      select: { stage: true },
    })
    if (!child) throw new AppError('没有找到孩子档案', 'CHILD_NOT_FOUND', 404)
    const stages = cumulativeStages(child.stage)
    const sampleBlocks = await db.block.findMany({
      where: { chapter: { book: { lang: 'zh', ageStage: { in: stages } } }, kind: 'text' },
      select: { text: true },
      take: 400,
    })
    // 每周换一份题（防背题；确定性 seed 便于复现与测试）
    const weekKey = weekStartDate(new Date()).toISOString().slice(0, 10)
    const test = buildLiteracyTest({
      seed: `${query.childId}:${weekKey}`,
      sampleTexts: sampleBlocks.map((b) => b.text),
    })
    return reply.send({ test, suggestion: null })
  })

  app.post('/api/content/literacy-test', { preHandler: auth }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const body = parse(
      z.object({
        childId: z.string().min(1).max(64),
        correctCount: z.coerce.number().int().min(0).max(20),
        total: z.coerce.number().int().min(5).max(20),
      }),
      request.body ?? {},
    )
    await assertOwnChild(request, body.childId)
    const suggestion = literacySuggestion(body.correctCount, body.total)
    await db.eventLog.create({
      data: {
        familyId: request.auth.fid,
        role: request.auth.role,
        event: 'literacy_test_taken',
        props: JSON.stringify({ childId: body.childId, correctCount: body.correctCount, total: body.total, level: suggestion.level }),
      },
    })
    return reply.send({ suggestion })
  })

  // ── 划线收藏（docs/34 P1-11）：长按段落收下，进阅读记忆金句流 ──

  app.post(
    '/api/content/highlights',
    { preHandler: auth },
    async (request, reply) => {
      const body = parse(
        z.object({
          childId: z.string().min(1).max(64),
          bookId: z.string().trim().min(1).max(64),
          chapterOrder: z.coerce.number().int().min(1).max(999),
          blockOrder: z.coerce.number().int().min(0).max(9999),
          text: z.string().trim().min(1).max(200),
        }),
        request.body ?? {},
      )
      await assertOwnChild(request, body.childId)
      if (body.bookId.startsWith('imp:')) {
        // 划线外键指向公版 Book 表；家庭书长按收藏走生词本路径
        throw new ValidationError('家庭书暂时不支持划线')
      }
      await svc.assertContentReadable(db, request.auth!.fid, body.bookId, { role: request.auth!.role })
      const book = await db.book.findUnique({ where: { id: body.bookId }, select: { id: true } })
      if (!book) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      const highlight = await db.bookHighlight.upsert({
        where: {
          childId_bookId_chapterOrder_blockOrder: {
            childId: body.childId,
            bookId: body.bookId,
            chapterOrder: body.chapterOrder,
            blockOrder: body.blockOrder,
          },
        },
        create: {
          childId: body.childId,
          bookId: body.bookId,
          chapterOrder: body.chapterOrder,
          blockOrder: body.blockOrder,
          text: body.text,
        },
        update: { text: body.text },
      })
      reply.code(201)
      return reply.send({ highlight: { id: highlight.id } })
    },
  )

  app.get(
    '/api/content/highlights',
    { preHandler: auth },
    async (request, reply) => {
      const query = parse(z.object({ childId: z.string().min(1).max(64) }), request.query)
      await assertOwnChild(request, query.childId)
      const rows = await db.bookHighlight.findMany({
        where: { childId: query.childId },
        include: { book: { select: { title: true } } },
        orderBy: { createdAt: 'desc' },
        take: 100,
      })
      return reply.send({
        total: rows.length,
        highlights: rows.map((h) => ({
          id: h.id,
          bookId: h.bookId,
          bookTitle: h.book.title,
          chapterOrder: h.chapterOrder,
          text: h.text,
          createdAt: h.createdAt,
        })),
      })
    },
  )

  app.delete<{ Params: { highlightId: string } }>(
    '/api/content/highlights/:highlightId',
    { preHandler: auth },
    async (request, reply) => {
      const query = parse(z.object({ childId: z.string().min(1).max(64) }), request.query)
      await assertOwnChild(request, query.childId)
      const row = await db.bookHighlight.findUnique({ where: { id: request.params.highlightId } })
      if (!row || row.childId !== query.childId) {
        throw new AppError('没有找到这条划线', 'HIGHLIGHT_NOT_FOUND', 404)
      }
      await db.bookHighlight.delete({ where: { id: request.params.highlightId } })
      return reply.send({ ok: true })
    },
  )

  app.get<{ Params: { id: string } }>('/api/content/books/:id/provenance', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    await svc.assertContentReadable(db, request.auth.fid, request.params.id, { role: request.auth.role, allowParentPreview: true })
    const book = await db.book.findUniqueOrThrow({ where: { id: request.params.id }, select: { source: true, contentVersion: true, reviewStatus: true } })
    const rights = await db.rightsLedger.findUnique({ where: { bookId: request.params.id }, select: { workTitle: true, author: true, translator: true, basis: true, jurisdiction: true, sourceUrl: true, note: true } })
    return { ...book, rights }
  })
  // ── 主题书单（docs/34 P1-12）：策展式合集，孩子端仍走适龄过滤 ──

  app.get('/api/content/collections', { preHandler: auth }, async (_request, reply) => {
    const defs = await Promise.all(
      COLLECTIONS.map(async (def) => {
        const total = await db.book.count({ where: { AND: [collectionWhere(def), { publicationStatus: 'published' }] } })
        return { id: def.id, title: def.title, subtitle: def.subtitle, total }
      }),
    )
    return reply.send({ collections: defs.filter((c) => c.total > 0) })
  })

  app.get<{ Params: { id: string } }>(
    '/api/content/collections/:id',
    { preHandler: auth },
    async (request, reply) => {
      const def = findCollection(request.params.id)
      if (!def) throw new AppError('没有找到这份书单', 'COLLECTION_NOT_FOUND', 404)
      const query = parse(
        z.object({ childId: z.string().min(1).max(64).optional() }),
        request.query,
      )
      if (query.childId) await assertOwnChild(request, query.childId)
      if (!request.auth) throw new UnauthorizedError()
      let stage: string | undefined
      if (request.auth.role === 'child') {
        stage = await deriveChildStage(request, query.childId)
      }
      // docs/34 P1-12（对抗审查 P2-5）：孩子角色先按累进适龄过滤再截 take——
      // 否则 take 名额被不适龄书占用，孩子看到的书单会短于预期
      const matched = await db.book.findMany({
        where:
          stage && request.auth.role === 'child'
            ? { AND: [collectionWhere(def), { ageStage: { in: cumulativeStages(stage) } }, { publicationStatus: 'published' }] }
            : { AND: [collectionWhere(def), { publicationStatus: 'published' }] },
        select: { id: true },
        orderBy: { title: 'asc' },
        take: def.take,
      })
      if (matched.length === 0) return reply.send({ collection: def, total: 0, books: [] })
      const books = await svc.listBooks(db, {
        familyId: request.auth.fid,
        ...(query.childId ? { childId: query.childId } : {}),
        ...(stage ? { stage } : {}),
        ids: matched.map((b) => b.id),
      })
      return reply.send({ collection: { id: def.id, title: def.title, subtitle: def.subtitle }, total: books.length, books })
    },
  )
}

/** 累进年龄段（与 listBooks 同口径）：3-5→[3-5]；6-8→[3-5,6-8]；9-12→全部 */
function cumulativeStages(stage: string): string[] {
  if (stage === '3-5') return ['3-5']
  if (stage === '6-8') return ['3-5', '6-8']
  return ['3-5', '6-8', '9-12']
}
