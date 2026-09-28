/**
 * 共读域路由（第 4 夜）：
 *   POST /api/cosession                    开始共读（weread 书或纸质书）
 *   GET  /api/cosession/active?childId=    未收尾会话（断线续传）
 *   GET  /api/cosession/:id                详情（会话 + 金句）
 *   POST /api/cosession/:id/finish         收尾（幂等；进度三档/心情/成就解锁）
 *   POST /api/cosession/:id/highlights     金句录入（口述/热门划线点选两来源）
 *   POST /api/cosession/:id/reading-card   模板共读卡（讲什么/问什么/聊什么）
 * 全部需登录；资源按 familyId 归属校验（404 不泄露存在性）。
 */
import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../family/routes'
import { UnauthorizedError, ValidationError } from '../../lib/errors'
import { MOODS, PROGRESS_MARKS } from '@taoread/shared'
import { assertContentReadable, isContentBookId, toContentId } from '../../content/service'
import type { WereadServiceRegistry } from '../../services/weread/registry'
import * as svc from './service'

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const detail = result.error.issues.map((issue) => issue.message).join('；')
    throw new ValidationError(detail || '请求参数不正确')
  }
  return result.data
}

export interface CosessionRoutesDeps {
  db: PrismaClient
  registry: WereadServiceRegistry
  tokenSecret: Buffer
  /** 时钟注入（测试冻结时间；默认真实 Unix 秒） */
  nowSec?: () => number
  /** 2026-09-25 产品决策：阅读时间限制已取消（bedtimeMin/nowMinutesOfDay 仅保留入参兼容，不再参与任何判定） */
  bedTimeMin?: number | null
  nowMinutesOfDay?: () => number
}

export function registerCosessionRoutes(
  app: FastifyInstance,
  deps: CosessionRoutesDeps,
): void {
  const { db, registry, tokenSecret } = deps
  const nowSec =
    deps.nowSec ?? (() => Math.floor(Date.now() / 1000))
  const auth = requireAuth(tokenSecret)

  app.post('/api/cosession', { preHandler: auth }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    // 2026-09-25 产品决策：阅读时间限制取消——全天候可开书，就寝闸不再拒绝任何请求
    const body = parse(
      z.object({
        childId: z.string().min(1),
        bookId: z.string().max(128).nullish(),
        paperTitle: z.string().max(120).nullish(),
      }),
      request.body ?? {},
    )
    // 审计 T03/F02：屏蔽的 cbf 书不能开共读会话（不给屏蔽内容新的阅读入口）
    if (body.bookId && isContentBookId(body.bookId)) {
      await assertContentReadable(db, request.auth.fid, toContentId(body.bookId), { role: request.auth.role })
    }
    const session = await svc.startSession(
      db,
      request.auth.fid,
      request.auth.role,
      body,
      nowSec,
    )
    reply.code(201)
    return session
  })

  app.get('/api/cosession/active', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const { childId } = parse(
      z.object({ childId: z.string().min(1) }),
      request.query ?? {},
    )
    const session = await svc.getActiveSession(db, request.auth.fid, childId)
    return { session }
  })

  app.get('/api/cosession/:id', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const { id } = parse(z.object({ id: z.string().min(1) }), request.params)
    return svc.getSessionDetail(db, request.auth.fid, id)
  })

  // ── 共读历史时间线（docs/34 P2-5，仅家长）：逐次共读记录（周报只有周聚合）──
  app.get('/api/cosession/history', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const query = parse(
      z.object({ take: z.coerce.number().int().min(1).max(100).default(30) }),
      request.query ?? {},
    )
    const rows = await db.cosession.findMany({
      where: { familyId: request.auth.fid },
      orderBy: { startedAt: 'desc' },
      take: query.take,
      select: {
        id: true,
        childId: true,
        bookId: true,
        paperTitle: true,
        startedAt: true,
        durationSec: true,
        progressMark: true,
        mood: true,
        child: { select: { nickname: true } },
      },
    })
    // 书名解析与周报同口径：cbf 书查内容域，weread 书查缓存，纸书用原名
    const cbfIds = rows
      .map((r) => (r.bookId && r.bookId.startsWith('cbf:') ? r.bookId.slice(4) : null))
      .filter((x): x is string => x !== null)
    const wereadIds = rows
      .map((r) => (r.bookId && !r.bookId.startsWith('cbf:') ? r.bookId : null))
      .filter((x): x is string => x !== null)
    const [cbfBooks, cachedBooks] = await Promise.all([
      cbfIds.length > 0 ? db.book.findMany({ where: { id: { in: cbfIds } }, select: { id: true, title: true } }) : Promise.resolve([]),
      wereadIds.length > 0 ? db.bookCache.findMany({ where: { bookId: { in: wereadIds } }, select: { bookId: true, title: true } }) : Promise.resolve([]),
    ])
    const titleByContentId = new Map(cbfBooks.map((b) => [b.id, b.title]))
    const titleByBookId = new Map(cachedBooks.map((b) => [b.bookId, b.title]))
    return {
      sessions: rows.map((r) => ({
        id: r.id,
        childName: r.child.nickname,
        title:
          r.paperTitle ??
          (r.bookId && r.bookId.startsWith('cbf:')
            ? titleByContentId.get(r.bookId.slice(4)) ?? '桃书架的故事'
            : r.bookId
              ? titleByBookId.get(r.bookId) ?? r.bookId
              : '今晚的故事'),
        startedAt: r.startedAt,
        durationSec: r.durationSec,
        progressMark: r.progressMark,
        mood: r.mood,
      })),
    }
  })

  app.post('/api/cosession/:id/finish', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const { id } = parse(z.object({ id: z.string().min(1) }), request.params)
    const body = parse(
      z.object({
        progressMark: z.enum(PROGRESS_MARKS).optional(),
        // 审计 F11：心情枚举以 @taoread/shared 为唯一事实源（含好奇，全部可提交）
        mood: z.enum(MOODS).optional(),
      }),
      request.body ?? {},
    )
    return svc.finishSession(db, request.auth.fid, request.auth.role, id, body, nowSec)
  })

  app.post('/api/cosession/:id/highlights', { preHandler: auth }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const { id } = parse(z.object({ id: z.string().min(1) }), request.params)
    const body = parse(
      z.object({
        source: z.enum(['weread', 'voice', 'manual']),
        text: z.string(),
        markCount: z.number().int().min(0).nullish(),
      }),
      request.body ?? {},
    )
    const highlight = await svc.addHighlight(
      db,
      request.auth.fid,
      request.auth.role,
      id,
      body,
    )
    reply.code(201)
    return highlight
  })

  app.post('/api/cosession/:id/reading-card', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const { id } = parse(z.object({ id: z.string().min(1) }), request.params)
    const { card, promptId } = await svc.generateCardForSession(
      db,
      registry,
      request.auth.fid,
      id,
      nowSec,
    )
    return { promptId, card }
  })
}
