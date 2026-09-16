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
import * as svc from './service'

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
      }),
      request.query,
    )
    if (query.childId) await assertOwnChild(request, query.childId)
    const books = await svc.listBooks(db, {
      ...(query.childId ? { childId: query.childId } : {}),
      ...(query.stage ? { stage: query.stage } : {}),
      ...(query.lang ? { lang: query.lang } : {}),
    })
    return reply.send({ total: books.length, books })
  })

  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id',
    { preHandler: auth },
    async (request, reply) => {
      const book = await svc.getBook(db, request.params.id)
      if (!book) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      return reply.send({ book })
    },
  )

  app.get<{ Params: { id: string } }>(
    '/api/content/books/:id/chapters',
    { preHandler: auth },
    async (request, reply) => {
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
        }),
        request.body,
      )
      await assertOwnChild(request, body.childId)
      const exists = await db.book.findUnique({ where: { id: request.params.id }, select: { id: true } })
      if (!exists) throw new AppError('这本书还在桃树上长着呢', 'BOOK_NOT_FOUND', 404)
      const result = await svc.reportProgress(
        db,
        body.childId,
        request.params.id,
        body.chapterOrder,
        body.blockOrder ?? 0,
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
      const progress = await svc.getProgress(db, query.childId, request.params.id)
      return reply.send({ progress: progress ?? { chapterOrder: 1, blockOrder: 0, finished: false } })
    },
  )
}
