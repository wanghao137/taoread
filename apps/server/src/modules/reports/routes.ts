import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../family/routes'
import { NotFoundError } from '../../lib/errors'
import { weekStartDate } from '../../lib/week'
import {
  generateWeeklyReport,
  isSundayEveningRun,
  parseWeekStart,
  renderShareCardSvg,
  type ReportDb,
} from './service'

export interface ReportsRoutesDeps {
  db: PrismaClient
  tokenSecret: Buffer
}

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new NotFoundError('周报参数不正确')
  }
  return result.data
}

export function registerReportsRoutes(app: FastifyInstance, deps: ReportsRoutesDeps): void {
  const { db, tokenSecret } = deps
  const auth = requireAuth(tokenSecret)
  const reportDb = db as ReportDb

  app.get('/api/reports/weekly', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new NotFoundError('请先登录')
    const { familyId, start } = parse(
      z.object({
        familyId: z.string().min(1),
        start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }),
      request.query ?? {},
    )
    if (request.auth.fid !== familyId) throw new NotFoundError('没有找到这个家庭')
    const weekStart = parseWeekStart(start, new Date())
    const report = await generateWeeklyReport(reportDb, familyId, weekStart)
    return { report }
  })

  app.get('/api/reports/weekly/share-card', { preHandler: auth }, async (request, reply) => {
    if (!request.auth) throw new NotFoundError('请先登录')
    const { familyId, start } = parse(
      z.object({
        familyId: z.string().min(1),
        start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }),
      request.query ?? {},
    )
    if (request.auth.fid !== familyId) throw new NotFoundError('没有找到这个家庭')
    const weekStart = parseWeekStart(start, new Date())
    const report = await generateWeeklyReport(reportDb, familyId, weekStart)
    reply.type('image/svg+xml')
    return renderShareCardSvg(report)
  })
}

/**
 * 周日 19:00 周报调度器（逐分钟轮询，零依赖；重入防护：running 标志 + 当日已跑标记）。
 * 部署注意：按服务器本地时间判定（TZ 环境，见 N3-005/N4-004 部署前置）。
 */
export function startWeeklyReportScheduler(
  db: PrismaClient,
  options: { intervalMs?: number; now?: () => Date; families?: () => Promise<string[]> } = {},
): { stop: () => void } {
  const now = options.now ?? (() => new Date())
  const reportDb = db as ReportDb
  let running = false
  let lastRunDay = ''

  async function tick(): Promise<void> {
    if (running) return
    const t = now()
    if (!isSundayEveningRun(t)) return
    const dayKey = t.toISOString().slice(0, 10)
    if (lastRunDay === dayKey) return
    running = true
    try {
      const familyIds =
        options.families ??
        (async () => {
          const rows = await db.family.findMany({ select: { id: true } })
          return rows.map((r) => r.id)
        })
      for (const familyId of await familyIds()) {
        try {
          await generateWeeklyReport(reportDb, familyId, weekStartDate(t))
        } catch {
          // 单家庭失败不影响其余家庭（下轮周日重生成兜底）
        }
      }
      lastRunDay = dayKey
    } catch (err) {
      // N10-001：调度异常绝不逃逸成 unhandled rejection（自部署环境无常驻拉起）
      console.error('[weekly-scheduler] 生成失败：', err instanceof Error ? err.message : err)
    } finally {
      running = false
    }
  }

  const timer = setInterval(() => {
    void tick().catch((err) => {
      console.error('[weekly-scheduler] tick 异常：', err instanceof Error ? err.message : err)
    })
  }, options.intervalMs ?? 60_000)
  timer.unref?.()
  return { stop: () => clearInterval(timer) }
}
