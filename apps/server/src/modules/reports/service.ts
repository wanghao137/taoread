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
import { isContentBookId, toContentId } from '../../content/service'

export interface ReportDb {
  family: PrismaClient['family']
  cosession: PrismaClient['cosession']
  highlightStar: PrismaClient['highlightStar']
  achievement: PrismaClient['achievement']
  weeklyReport: PrismaClient['weeklyReport']
  childProfile: PrismaClient['childProfile']
  bookCache: PrismaClient['bookCache']
  /** v2 内容域公版书表（cbf: 前缀会话的书名解析来源） */
  book: PrismaClient['book']
  /** 「真正读完」口径需要核对内容域书的阅读进度（A3.3/A3.6） */
  readingProgress: PrismaClient['readingProgress']
}

export interface WeeklyReportData {
  weekStart: string // YYYY-MM-DD（周一）
  nights: number // 共读晚数（去重夜键）
  totalMinutes: number // 累计分钟（已收尾会话）
  books: Array<{ key: string; title: string }> // 本周读过的书（去重）——注意：读过 ≠ 读完
  booksCompleted: number // 本周以 done 收尾（真实读完）的去重书数
  highlights: Array<{ text: string; source: string }> // 展示用至多 12 条
  highlightsTotal: number // 本周金句总数（计数与展示分离，N10-005）
  achievementsUnlocked: number // 本周解锁成就数
  nextWeekHint: string // 下周建议（正向模板）
}

/**
 * 周聚合窗口（N10-004）：从规范化 weekStart 的 UTC 分量（= 本地日历的周一）
 * 构造【本地午夜】时刻作为窗口，使窗口与 nights.ts 的本地夜桶在任意 TZ 下对齐。
 * 直接用规范化值当物理时刻会在 TZ≠UTC 时漂移出 ±8h 的错周带（复审 N10-004）。
 */
/**
 * 会话书名解析（docs/09 C1）。
 * 优先级：weread BookCache → cbf: 内容域公版书表 → 纸书标题 → 兜底文案。
 * 内容域书绝不能把 `cbf:xxx` 原始 id 暴露给家长；微信读书书在缓存未命中时
 * （同步前的旧会话）保留原始 bookId 兜底——比显示「今晚的故事」更接近事实。
 */
function resolveSessionTitle(
  session: { bookId: string | null; paperTitle: string | null },
  titleByBookId: Map<string, string>,
  titleByContentId: Map<string, string>,
): string | null {
  if (session.bookId && isContentBookId(session.bookId)) {
    return titleByContentId.get(toContentId(session.bookId)) ?? '桃书架的故事'
  }
  if (session.bookId) {
    return titleByBookId.get(session.bookId) ?? session.bookId
  }
  return session.paperTitle ?? null
}

/** 金句按文本去重（不同晚划同一句只展示一次，计数同步） */
function dedupeByText(items: Array<{ text: string; source: string }>): Array<{ text: string; source: string }> {
  const seen = new Set<string>()
  return items.filter((h) => (seen.has(h.text) ? false : (seen.add(h.text), true)))
}

function weekRangeSec(weekStart: Date): { fromSec: number; toSec: number } {
  const y = weekStart.getUTCFullYear()
  const m = weekStart.getUTCMonth()
  const d = weekStart.getUTCDate()
  const fromLocal = new Date(y, m, d) // 本地周一 00:00
  const toLocal = new Date(y, m, d + 7) // 次周一 00:00（本地）
  return {
    fromSec: Math.floor(fromLocal.getTime() / 1000),
    toSec: Math.floor(toLocal.getTime() / 1000),
  }
}

/** 解析 YYYY-MM-DD 为规范化周一；非法抛 NotFoundError（调用方转 404） */
export function parseWeekStart(s: string | undefined, now: Date): Date {
  if (!s) return weekStartDate(now)
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  if (!m) throw new NotFoundError('周起始日期格式应为 YYYY-MM-DD')
  const [, y, mo, d] = m
  const [yy, mm, dd] = [Number(y), Number(mo), Number(d)]
  // 滚动校验（N10-003）：2026-02-30 这类入参会被 Date 静默进位，必须拒绝
  const probe = new Date(Date.UTC(yy, mm - 1, dd))
  if (probe.getUTCFullYear() !== yy || probe.getUTCMonth() !== mm - 1 || probe.getUTCDate() !== dd) {
    throw new NotFoundError('周起始日期不合法')
  }
  const parsed = weekStartFromParts(yy, mm, dd)
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
        progressMark: true,
        childId: true,
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

  // 书名解析：weread 书走 BookCache（绑定同步/详情时落库）；cbf: 内容域书走本地公版书表
  // （docs/09 C1：原来 cbf: 会话在 BookCache 必然 miss，回退把原始 id 当书名展示给家长）
  const bookIds = [
    ...new Set(sessions.map((s) => s.bookId).filter((b): b is string => b !== null)),
  ]
  const wereadBookIds = bookIds.filter((b) => !isContentBookId(b))
  const contentBookIds = bookIds.filter(isContentBookId).map(toContentId)
  const [cachedBooks, contentBooks] = await Promise.all([
    db.bookCache.findMany({
      where: { bookId: { in: wereadBookIds } },
      select: { bookId: true, title: true },
    }),
    db.book.findMany({
      where: { id: { in: contentBookIds } },
      select: { id: true, title: true },
    }),
  ])
  const titleByBookId = new Map(cachedBooks.map((b) => [b.bookId, b.title]))
  const titleByContentId = new Map(contentBooks.map((b) => [b.id, b.title]))

  const nightKeys = new Set<string>()
  const bookMap = new Map<string, string>()
  let totalSec = 0
  /** done 收尾的（孩子|书）对：内容域书还需 ReadingProgress.finished 才算「真正读完」（A3.3/A3.6 统一口径） */
  const donePairs: Array<{ childId: string; contentBookId: string | null; key: string; done: boolean }> = []
  for (const s of sessions) {
    nightKeys.add(nightKeyOf(Math.floor(s.startedAt.getTime() / 1000)))
    if (s.durationSec && s.durationSec > 0) totalSec += s.durationSec
    const key = s.bookId ?? `paper:${s.paperTitle ?? ''}`
    const title = resolveSessionTitle(s, titleByBookId, titleByContentId)
    if (title) bookMap.set(key, title)
    if (s.progressMark === 'done' && s.bookId) {
      if (isContentBookId(s.bookId)) {
        donePairs.push({ childId: s.childId, contentBookId: toContentId(s.bookId), key: s.bookId, done: false })
      } else {
        donePairs.push({ childId: s.childId, contentBookId: null, key, done: true })
      }
    }
  }
  if (donePairs.some((p) => p.contentBookId !== null)) {
    const childIds = [...new Set(donePairs.filter((p) => p.contentBookId).map((p) => p.childId))]
    const contentIds = [...new Set(donePairs.filter((p) => p.contentBookId).map((p) => p.contentBookId!))]
    const finishedRows = await db.readingProgress.findMany({
      where: { childId: { in: childIds }, bookId: { in: contentIds }, finished: true },
      select: { childId: true, bookId: true },
    })
    const finishedSet = new Set(finishedRows.map((r) => `${r.childId}|${r.bookId}`))
    for (const p of donePairs) if (p.contentBookId) p.done = finishedSet.has(`${p.childId}|${p.contentBookId}`)
  }
  const booksCompleted = new Set(donePairs.filter((p) => p.done).map((p) => p.key)).size

  const data: WeeklyReportData = {
    weekStart: weekStart.toISOString().slice(0, 10),
    nights: nightKeys.size,
    totalMinutes: Math.round(totalSec / 60),
    books: [...bookMap.entries()].map(([key, title]) => ({ key, title })),
    booksCompleted,
    highlights: dedupeByText(highlights).slice(0, 12).map((h) => ({ text: h.text, source: h.source })),
    highlightsTotal: dedupeByText(highlights).length,
    achievementsUnlocked: achievements,
    nextWeekHint:
      nightKeys.size === 0
        ? '新的一周，第一页故事在等你'
        : `本周共读了 ${nightKeys.size} 天，下周继续`,
  }

  // upsert 周报行（任意历史周可重生成；并发/重复生成以唯一约束兜底不产生重复行）
  const statsJson = JSON.stringify(data)
  await db.weeklyReport.upsert({
    where: { familyId_weekStart: { familyId, weekStart } },
    create: { familyId, weekStart, stats: statsJson },
    update: { stats: statsJson },
  })
  return data
}

/** 分享卡 SVG（1080×1440）：系统字体、仅计数与书名/金句，绝不含 key/家庭码/昵称 */
export function renderShareCardSvg(data: WeeklyReportData): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)
  const bookLines = data.books.slice(0, 5).map((b) => `《${esc(truncate(b.title, 18))}》`)
  const highlightLines = data.highlights.slice(0, 3).map((h) => `「${esc(truncate(h.text, 26))}」`)
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
  <text x="540" y="500" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" fill="#B8C1E2">累计 ${data.totalMinutes} 分钟 · 读过 ${data.books.length} 本 · 读完 ${data.booksCompleted} 本 · 金句 ${data.highlightsTotal} 句</text>
  ${bookLines.map((line, i) => `<text x="540" y="${bookY + i * 64}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="36" fill="#F4F1FF">${line}</text>`).join('\n  ')}
  ${highlightLines.map((line, i) => `<text x="540" y="${hlY + i * 56}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="28" fill="#FFD3C4">${line}</text>`).join('\n  ')}
  <text x="540" y="${hlY + highlightLines.length * 56 + 60}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="30" fill="#B8C1E2">${esc(data.nextWeekHint)}</text>
  <rect x="390" y="1250" width="300" height="72" rx="36" fill="url(#peach)"/>
  <text x="540" y="1298" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" font-weight="bold" fill="#0E1A38">桃阅读 · 亲子共读</text>
</svg>`
}

/** 周日 19:00–20:00 窗口检查（N10-R10 第 11 夜放宽：单分钟窗口错过即缺）。
 * 幂等由调度器 lastRunDay + 周报 upsert 承担，窗口内重复生成无害。 */
export function isSundayEveningRun(now: Date): boolean {
  return now.getDay() === 0 && now.getHours() === 19
}
