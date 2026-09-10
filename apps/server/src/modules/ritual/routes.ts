import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { NotFoundError, UnauthorizedError, ValidationError } from '../../lib/errors'

import { requireAuth } from '../family/routes'
import type { PrismaClient } from '@prisma/client'
import { isBedtime, isOvertime, type RitualMode, type RitualWindowDeps } from './window'

/** 仪式域：时段窗口（就寝/超时引导）与成就墙数据。 */

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
  // 归一化时钟（可选注入落地为具体实现，避免 ritualWindowOf 内 undefined 调用）
  const windowDeps: RitualWindowDeps = {
    bedTimeMin: deps.bedTimeMin,
    overtimeCapSec: deps.overtimeCapSec,
    nowMinutesOfDay:
      deps.nowMinutesOfDay ??
      (() => {
        const d = new Date()
        return d.getHours() * 60 + d.getMinutes()
      }),
    nowSec: deps.nowSec ?? (() => Math.floor(Date.now() / 1000)),
  }

  async function assertOwnedChild(familyId: string, childId: string) {
    const child = await db.childProfile.findUnique({ where: { id: childId } })
    // 与家庭域/共读域同口径：不存在与越权统一 404，不泄露存在性（N8-004）
    if (!child || child.familyId !== familyId) {
      throw new NotFoundError('没有找到这个孩子档案')
    }
    return child
  }

  // ── 仪式时段窗口：孩子端门屏据此切换 月亮睡了/超时收尾引导/正常 ──
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
    // 家庭级护眼设置覆盖（第 9 夜）：Family.bedtimeMin/overtimeCapSec 优先，null 回落默认
    const family = await db.family.findUnique({
      where: { id: request.auth.fid },
      select: { bedtimeMin: true, overtimeCapSec: true },
    })
    const mode = ritualWindowOf(
      {
        ...windowDeps,
        ...(family?.bedtimeMin != null ? { bedTimeMin: family.bedtimeMin } : {}),
        ...(family?.overtimeCapSec != null ? { overtimeCapSec: family.overtimeCapSec } : {}),
      },
      active ? Math.floor(active.startedAt.getTime() / 1000) : null,
    )
    return { mode, hasActive: active !== null }
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
