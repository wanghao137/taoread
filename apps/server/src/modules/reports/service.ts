/**
 * 周报域（第 10 夜，M-B 收官）：
 * - 聚合口径（notes.md 对齐）：「晚」= nights.ts 本地夜键；时长 = 已收尾会话 durationSec 之和（秒）；
 * - 周边界 = week.ts 规范化的本地周一 00:00（@@unique([familyId, weekStart]) 前提）；
 * - 任意历史周可重生成（upsert 周报行）；空周优雅返回零值结构；
 * - 分享卡 SVG：系统字体（零版权风险）、不含 key/家庭码/孩子昵称（隐私红线）。
 */
import type { PrismaClient } from '@prisma/client'
import { NotFoundError } from '../../lib/errors'
import { weekStartDate, weekStartFromParts } from '../../lib/week'
import { nightKeyOf } from '../cosession/nights'

export interface ReportDb {
  family: PrismaClient['family']
  cosession: PrismaClient['cosession']
  highlightStar: PrismaClient['highlightStar']
  achievement: PrismaClient['achievement']
  weeklyReport: PrismaClient['weeklyReport']
  childProfile: PrismaClient['childProfile']
  bookCache: PrismaClient['bookCache']
}

export interface WeeklyReportData {
  weekStart: string // YYYY-MM-DD（周一）
  nights: number // 共读晚数（去重夜键）
  totalMinutes: number // 累计分钟（已收尾会话）
  books: Array<{ key: string; title: string }> // 本周读过的书（去重）
  highlights: Array<{ text: string; source: string }> // 本周金句（全部，至多 12 条截取）
  achievementsUnlocked: number // 本周解锁成就数
  nextWeekHint: string // 下周建议（正向模板）
}

/** 周一 00:00 的 Unix 秒起点与终点（ exclusive ） */
function weekRangeSec(weekStart: Date): { fromSec: number; toSec: number } {
  const fromSec = Math.floor(weekStart.getTime() / 1000)
  return { fromSec, toSec: fromSec + 7 * 24 * 3600 }
}

/** 解析 YYYY-MM-DD 为规范化周一；非法抛 NotFoundError（调用方转 404） */
export function parseWeekStart(s: string | undefined, now: Date): Date {
  if (!s) return weekStartDate(now)
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (!m) throw new NotFoundError('周起始日期格式应为 YYYY-MM-DD')
  const [, y, mo, d] = m
  const parsed = weekStartFromParts(Number(y), Number(mo), Number(d))
  if (Number.isNaN(parsed.getTime())) throw new NotFoundError('周起始日期不合法')
  return parsed
}

export async function generateWeeklyReport(
  db: ReportDb,
  familyId: string,
  weekStart: Date,
): Promise<WeeklyReportData> {
  const family = await db.family.findUnique({ where: { id: familyId }, select: { id: true } })
  if (!family) throw new NotFoundError('没有找到这个家庭')

  const { fromSec, toSec } = weekRangeSec(weekStart)
  const from = new Date(fromSec * 1000)
  const to = new Date(toSec * 1000)

  const [sessions, highlights, achievements] = await Promise.all([
    db.cosession.findMany({
      where: { familyId, startedAt: { gte: from, lt: to } },
      select: {
        startedAt: true,
        durationSec: true,
        bookId: true,
        paperTitle: true,
      },
    }),
    db.highlightStar.findMany({
      where: { familyId, createdAt: { gte: from, lt: to } },
      select: { text: true, source: true },
      orderBy: { createdAt: 'asc' },
    }),
    db.achievement.count({
      where: { familyId, unlockedAt: { gte: from, lt: to } },
    }),
  ])

  // 书名解析：weread 书走 BookCache（绑定同步/详情时落库），纸书用 paperTitle，兜底 bookId
  const wereadBookIds = [
    ...new Set(sessions.map((s) => s.bookId).filter((b): b is string => b !== null)),
  ]
  const cachedBooks = await db.bookCache.findMany({
    where: { bookId: { in: wereadBookIds } },
    select: { bookId: true, title: true },
  })
  const titleByBookId = new Map(cachedBooks.map((b) => [b.bookId, b.title]))

  const nightKeys = new Set<string>()
  const bookMap = new Map<string, string>()
  let totalSec = 0
  for (const s of sessions) {
    nightKeys.add(nightKeyOf(Math.floor(s.startedAt.getTime() / 1000)))
    if (s.durationSec && s.durationSec > 0) totalSec += s.durationSec
    const key = s.bookId ?? `paper:${s.paperTitle ?? ''}`
    const title =
      (s.bookId ? titleByBookId.get(s.bookId) : null) ?? s.paperTitle ?? s.bookId ?? '今晚的故事'
    if (title) bookMap.set(key, title)
  }

  const data: WeeklyReportData = {
    weekStart: weekStart.toISOString().slice(0, 10),
    nights: nightKeys.size,
    totalMinutes: Math.round(totalSec / 60),
    books: [...bookMap.entries()].map(([key, title]) => ({ key, title })),
    highlights: highlights.slice(0, 12).map((h) => ({ text: h.text, source: h.source })),
    achievementsUnlocked: achievements,
    nextWeekHint:
      nightKeys.size === 0
        ? '新的一周，第一页故事在等你'
        : `本周共读了 ${nightKeys.size} 晚，下周继续点亮夜灯`,
  }

  // upsert 周报行（任意历史周可重生成；重复生成不产生重复行）
  const existing = await db.weeklyReport.findUnique({
    where: { familyId_weekStart: { familyId, weekStart } },
    select: { id: true },
  })
  const statsJson = JSON.stringify(data)
  if (existing) {
    await db.weeklyReport.update({ where: { id: existing.id }, data: { stats: statsJson } })
  } else {
    await db.weeklyReport.create({
      data: { familyId, weekStart, stats: statsJson },
    })
  }
  return data
}

/** 分享卡 SVG（1080×1440）：系统字体、仅计数与书名/金句，绝不含 key/家庭码/昵称 */
export function renderShareCardSvg(data: WeeklyReportData): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const bookLines = data.books.slice(0, 5).map((b) => `《${esc(b.title)}》`)
  const highlightLines = data.highlights.slice(0, 3).map((h) => `「${esc(h.text)}」`)
  const bookY = bookLines.length > 0 ? 560 : 520
  const hlY = bookY + bookLines.length * 64 + (bookLines.length > 0 ? 40 : 0)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0E1A38"/>
      <stop offset="1" stop-color="#16244C"/>
    </linearGradient>
    <linearGradient id="peach" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFB3A0"/>
      <stop offset="1" stop-color="#FF8E75"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1440" fill="url(#bg)"/>
  <text x="540" y="150" text-anchor="middle" font-family="system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="56" font-weight="bold" fill="#F4F1FF">桃阅读 · 本周足迹</text>
  <text x="540" y="220" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" fill="#B8C1E2">${esc(data.weekStart)} 那一周</text>
  <text x="540" y="360" text-anchor="middle" font-family="system-ui, sans-serif" font-size="140" font-weight="bold" fill="#FFD97A">${data.nights}</text>
  <text x="540" y="430" text-anchor="middle" font-family="system-ui, sans-serif" font-size="36" fill="#B8C1E2">个共读的夜晚</text>
  <text x="540" y="500" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" fill="#B8C1E2">累计 ${data.totalMinutes} 分钟 · 读完 ${data.books.length} 本 · 金句 ${data.highlights.length} 句</text>
  ${bookLines.map((line, i) => `<text x="540" y="${bookY + i * 64}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="36" fill="#F4F1FF">${line}</text>`).join('\n  ')}
  ${highlightLines.map((line, i) => `<text x="540" y="${hlY + i * 56}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="28" fill="#FFD3C4">${line}</text>`).join('\n  ')}
  <text x="540" y="${hlY + highlightLines.length * 56 + 60}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="30" fill="#B8C1E2">${esc(data.nextWeekHint)}</text>
  <rect x="390" y="1250" width="300" height="72" rx="36" fill="url(#peach)"/>
  <text x="540" y="1298" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" font-weight="bold" fill="#0E1A38">桃阅读 · 亲子共读</text>
</svg>`
}

/** 周日 19:00 检查（调度器逐分钟调用）：是否到了本周报生成时刻 */
export function isSundayEveningRun(now: Date): boolean {
  return now.getDay() === 0 && now.getHours() === 19 && now.getMinutes() === 0
}
