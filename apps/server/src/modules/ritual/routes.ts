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

/** 每日时长提醒判定（docs/34 P1-2）：纯函数，limitMin=null/≤0 恒 open。
 * 语义是「温柔收尾」而非锁定：到点后孩子端展示收尾卡片，服务端不阻断任何请求。 */
export function dailyLimitMode(
  limitMin: number | null,
  usedSec: number,
): 'open' | 'daily_limit' {
  if (limitMin === null || limitMin <= 0) return 'open'
  return usedSec >= limitMin * 60 ? 'daily_limit' : 'open'
}

/** 本地日历日的零点（与 nights.ts 本地夜桶同口径；TZ 由部署钉 Asia/Shanghai） */
export function startOfLocalDay(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
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

  // ── 仪式时段窗口：就寝闸已取消恒放行；docs/34 P1-2 在此叠加「家长可选的
  // 每日时长提醒」——今日已用时长（已收尾会话 durationSec 求和 + 活跃会话已进行
  // 时间）达到家庭上限时返回 daily_limit，孩子端展示温柔收尾卡（非强制）──
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
    const nowSec = deps.nowSec ?? (() => Math.floor(Date.now() / 1000))
    const family = await db.family.findUnique({
      where: { id: request.auth.fid },
      select: { dailyReadingLimitMin: true },
    })
    const limitMin = family?.dailyReadingLimitMin ?? null
    let usedSec = 0
    if (limitMin !== null && limitMin > 0) {
      const finished = await db.cosession.aggregate({
        where: { familyId: request.auth.fid, childId, startedAt: { gte: startOfLocalDay() } },
        _sum: { durationSec: true },
      })
      usedSec = finished._sum.durationSec ?? 0
      if (active) {
        usedSec += Math.max(0, nowSec() - Math.floor(active.startedAt.getTime() / 1000))
      }
    }
    return {
      mode: dailyLimitMode(limitMin, usedSec),
      hasActive: active !== null,
      usedMin: Math.floor(usedSec / 60),
      limitMin: limitMin ?? null,
    }
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
