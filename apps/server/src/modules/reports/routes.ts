import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../family/routes'
import { NotFoundError, ValidationError } from '../../lib/errors'
import { weekStartDate } from '../../lib/week'
import {
  generateWeeklyReport,
  isSundayEveningRun,
  parseWeekStart,
  renderBookCardSvg,
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
    // 参数错误是客户端问题：400，而非 404（404 留给跨家庭越权等资源不存在语义）
    throw new ValidationError('周报参数不正确')
  }
  return result.data
}

export function registerReportsRoutes(app: FastifyInstance, deps: ReportsRoutesDeps): void {
  const { db, tokenSecret } = deps
  const auth = requireAuth(tokenSecret)
  // 分享卡只有家长会下载（孩子端零外链红线 + 最小数据面）：收家长角色
  const parentAuth = requireAuth(tokenSecret, { roles: ['parent'] })
  const reportDb = db as ReportDb

  // 周报按角色裁剪（docs/34 P0-10）：孩子端只需聚合数与金句（「本周共读 N 次」侧卡 +
  // 阅读记忆金句流），书目清单/下周寄语是家长面向字段——孩子角色不回传。
  app.get('/api/reports/weekly', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new NotFoundError('请先登录')
    const { familyId, start, childId } = parse(
      z.object({
        familyId: z.string().min(1),
        start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        childId: z.string().min(1).max(64).optional(),
      }),
      request.query ?? {},
    )
    if (request.auth.fid !== familyId) throw new NotFoundError('没有找到这个家庭')
    const weekStart = parseWeekStart(start, new Date())
    const report = await generateWeeklyReport(reportDb, familyId, weekStart, childId)
    if (request.auth.role === 'child') {
      return {
        report: {
          weekStart: report.weekStart,
          nights: report.nights,
          totalMinutes: report.totalMinutes,
          booksCompleted: report.booksCompleted,
          highlightsTotal: report.highlightsTotal,
          achievementsUnlocked: report.achievementsUnlocked,
          highlights: report.highlights,
        },
      }
    }
    return { report }
  })

  app.get('/api/reports/weekly/share-card', { preHandler: parentAuth }, async (request, reply) => {
    if (!request.auth) throw new NotFoundError('请先登录')
    const { familyId, start, childId } = parse(
      z.object({
        familyId: z.string().min(1),
        start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        childId: z.string().min(1).max(64).optional(),
      }),
      request.query ?? {},
    )
    if (request.auth.fid !== familyId) throw new NotFoundError('没有找到这个家庭')
    const weekStart = parseWeekStart(start, new Date())
    const report = await generateWeeklyReport(reportDb, familyId, weekStart, childId)
    reply.type('image/svg+xml')
    return renderShareCardSvg(report)
  })

  // ── 读完分享卡（docs/34 P2-6，仅家长）：单次共读的纪念卡，视觉与隐私红线同周报卡 ──
  app.get('/api/reports/reading-card', { preHandler: parentAuth }, async (request, reply) => {
    if (!request.auth) throw new NotFoundError('请先登录')
    const { familyId, cosessionId } = parse(
      z.object({ familyId: z.string().min(1), cosessionId: z.string().min(1) }),
      request.query ?? {},
    )
    if (request.auth.fid !== familyId) throw new NotFoundError('没有找到这个家庭')
    const session = await db.cosession.findFirst({
      where: { id: cosessionId, familyId },
      select: { bookId: true, paperTitle: true, startedAt: true, endedAt: true, durationSec: true, progressMark: true, completionVerified: true, mood: true },
    })
    if (!session) throw new NotFoundError('没有找到这次共读')
    if (!session.endedAt) throw new ValidationError('请先收尾再生成纪念卡')
    const title = await resolveCosessionTitle(db, familyId, session.bookId, session.paperTitle)
    const moodLabel = MOOD_LABELS[session.mood ?? ''] ?? null
    const minutes = Math.round((session.durationSec ?? 0) / 60)
    const started = session.startedAt
    const data = {
      headline: `《${title}》${session.completionVerified === true ? '读完啦' : '共读时光'}`,
      dateLine: `${started.getFullYear()}-${String(started.getMonth() + 1).padStart(2, '0')}-${String(started.getDate()).padStart(2, '0')} 的晚上`,
      bigNumber: String(minutes),
      bigLabel: '分钟的共读时光',
      lines: moodLabel ? [moodLabel] : ['今晚的故事，讲完了'],
    }
    reply.type('image/svg+xml')
    return renderBookCardSvg(data)
  })
}

const MOOD_LABELS: Record<string, string> = {
  happy: '孩子说：今晚很开心',
  excited: '孩子说：太惊喜啦',
  calm: '孩子说：很安静很舒服',
  curious: '孩子说：还有好多好奇',
  thinking: '孩子说：我在想一想',
  sleepy: '孩子说：有点困了，晚安',
}

/** 共读会话书名解析（与周报/历史同口径）：cbf→内容域；weread→缓存；纸书用原名 */
async function resolveCosessionTitle(
  db: ReportsRoutesDeps['db'],
  familyId: string,
  bookId: string | null,
  paperTitle: string | null,
): Promise<string> {
  if (paperTitle) return paperTitle
  if (bookId?.startsWith('imp:')) {
    const book = await db.importedBook.findFirst({ where: { id: bookId, familyId }, select: { title: true } })
    return book?.title ?? '家庭书架的书'
  }
  if (bookId?.startsWith('cbf:')) {
    const book = await db.book.findUnique({ where: { id: bookId.slice(4) }, select: { title: true } })
    return book?.title ?? '桃书架的故事'
  }
  if (bookId) {
    const cached = await db.bookCache.findUnique({ where: { bookId }, select: { title: true } })
    return cached?.title ?? bookId
  }
  return '今晚的故事'
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
