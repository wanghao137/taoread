import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { NotFoundError, UnauthorizedError, ValidationError } from '../../lib/errors'

import { requireAuth } from '../family/routes'
import type { PrismaClient } from '@prisma/client'
import { isBedtime, isOvertime, type RitualMode, type RitualWindowDeps } from './window'

/** 仪式域：成就墙数据 + 时段窗口端点。
 * 2026-09-25 产品决策：阅读时间限制取消——window 恒返回 open；
 * bedTimeMin/overtimeCapSec 入参保留兼容，但不再参与判定。ritualWindowOf 仅供测试。 */

export interface RitualRoutesDeps {
  db: PrismaClient
  tokenSecret: Buffer
  /** 就寝时刻（本地日内分钟数）；null=关闭 */
  bedTimeMin: number | null
  /** 软封顶秒数，默认 300（5 分钟） */
  overtimeCapSec: number
  nowMinutesOfDay?: () => number
  nowSec?: () => number
}

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new ValidationError(result.error.issues.map((i) => i.message).join('；'))
  }
  return result.data
}

export function ritualWindowOf(
  deps: RitualWindowDeps,
  activeStartedAtSec: number | null,
): RitualMode {
  const nowMin =
    deps.nowMinutesOfDay?.() ??
    (() => {
      const d = new Date()
      return d.getHours() * 60 + d.getMinutes()
    })()
  if (isBedtime(nowMin, deps.bedTimeMin)) return 'bedtime'
  if (activeStartedAtSec !== null && isOvertime(activeStartedAtSec, deps)) return 'overtime'
  return 'open'
}

export function registerRitualRoutes(app: FastifyInstance, deps: RitualRoutesDeps): void {
  const { db, tokenSecret } = deps
  const auth = requireAuth(tokenSecret)

  async function assertOwnedChild(familyId: string, childId: string) {
    const child = await db.childProfile.findUnique({ where: { id: childId } })
    // 与家庭域/共读域同口径：不存在与越权统一 404，不泄露存在性（N8-004）
    if (!child || child.familyId !== familyId) {
      throw new NotFoundError('没有找到这个孩子档案')
    }
    return child
  }

  // ── 仪式时段窗口：阅读时间限制已取消，恒 open（保留 hasActive 供断线续传）──
  app.get('/api/ritual/window', { preHandler: auth }, async (request) => {
    const { childId } = parse(
      z.object({ childId: z.string().min(1) }),
      request.query ?? {},
    )
    if (!request.auth) throw new UnauthorizedError()
    await assertOwnedChild(request.auth.fid, childId)
    const active = await db.cosession.findFirst({
      where: { familyId: request.auth.fid, childId, endedAt: null },
      orderBy: { startedAt: 'desc' },
    })
    return { mode: 'open' as const, hasActive: active !== null }
  })

  // ── 成就墙数据（纪念式展示；防重复解锁由表唯一约束保证，此处只读） ──
  app.get('/api/achievements', { preHandler: auth }, async (request) => {
    const { childId } = parse(
      z.object({ childId: z.string().min(1) }),
      request.query ?? {},
    )
    if (!request.auth) throw new UnauthorizedError()
    await assertOwnedChild(request.auth.fid, childId)
    const rows = await db.achievement.findMany({
      where: { familyId: request.auth.fid, childId },
      orderBy: { value: 'asc' },
    })
    const byKind = (kind: string) =>
      rows.filter((r) => r.kind === kind).map((r) => ({ kind: r.kind, value: r.value, unlockedAt: r.unlockedAt }))
    return {
      nightLamps: byKind('night_lamp'),
      streakBest: byKind('streak_best'),
      booksDone: byKind('book_done'),
    }
  })
}
