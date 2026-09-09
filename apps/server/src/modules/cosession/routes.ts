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
import { AppError, UnauthorizedError, ValidationError } from '../../lib/errors'
import { isBedtime } from '../ritual/window'
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
  /** 就寝时刻（本地日内分钟数，默认 21:30）；null=关闭。开新书闸：就寝窗口拒绝新建（收尾不受限） */
  bedTimeMin?: number | null
  /** 本地日内分钟注入（就寝闸可测性，N8-001；默认真实本地时钟） */
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

  /** 就寝判定（第 8 夜护眼限制，服务端权威）：单一来源 isBedtime + 可注入时钟 */
  const nowMinutesOfDay =
    deps.nowMinutesOfDay ??
    (() => {
      const d = new Date()
      return d.getHours() * 60 + d.getMinutes()
    })
  const isBedtimeNow = () => isBedtime(nowMinutesOfDay(), deps.bedTimeMin ?? null)

  app.post('/api/cosession', { preHandler: auth }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    if (isBedtimeNow()) {
      throw new AppError('月亮睡觉啦，明晚再一起读书吧', 'RITUAL_CLOSED', 403)
    }
    const body = parse(
      z.object({
        childId: z.string().min(1),
        bookId: z.string().max(128).nullish(),
        paperTitle: z.string().max(120).nullish(),
      }),
      request.body ?? {},
    )
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

  app.post('/api/cosession/:id/finish', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const { id } = parse(z.object({ id: z.string().min(1) }), request.params)
    const body = parse(
      z.object({
        progressMark: z.enum(['little', 'lot', 'done']).optional(),
        mood: z.enum(['happy', 'excited', 'calm', 'sleepy', 'thinking']).optional(),
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
    )
    return { promptId, card }
  })
}
