/**
 * 夜界工具：把 Unix 秒分桶为「一晚」的键（YYYY-MM-DD）。
 * 约定（docs/02 §4.4）：存储一律 Unix 秒；「晚」的分桶取服务器本地日期
 * （家庭自部署单时区场景，与家长感知一致）。跨时区部署需引入显式时区配置——
 * 已在夜间日志登记，供审查追踪。
 */

export function nightKeyOf(
  unixSec: number,
  tzOffsetMinutes = -new Date(unixSec * 1000).getTimezoneOffset(),
): string {
  const local = new Date((unixSec + tzOffsetMinutes * 60) * 1000)
  const y = local.getUTCFullYear()
  const m = String(local.getUTCMonth() + 1).padStart(2, '0')
  const d = String(local.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function keyToDate(key: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key)
  if (!m) return null
  const [, y, mo, d] = m
  const date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)))
  return Number.isNaN(date.getTime()) ? null : date
}

function dateToKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function prevNightKey(key: string): string | null {
  const date = keyToDate(key)
  if (!date) return null
  return dateToKey(new Date(date.getTime() - 86_400_000))
}

/** 不同的「晚」数（夜灯第 N 晚的口径） */
export function countDistinctNights(unixSecs: readonly number[]): number {
  return new Set(unixSecs.map((t) => nightKeyOf(t))).size
}

/** 以 endKey 为终点向前数连续的晚数（endKey 当晚没读则为 0） */
export function currentStreak(
  unixSecs: readonly number[],
  endKey: string,
  tzOffsetMinutes?: number,
): number {
  const keys = new Set(unixSecs.map((t) => nightKeyOf(t, tzOffsetMinutes)))
  let streak = 0
  let cursor: string | null = endKey
  while (cursor !== null && keys.has(cursor)) {
    streak += 1
    cursor = prevNightKey(cursor)
  }
  return streak
}

/** 历史最长连续晚数 */
export function longestStreak(
  unixSecs: readonly number[],
  tzOffsetMinutes?: number,
): number {
  const keys = [...new Set(unixSecs.map((t) => nightKeyOf(t, tzOffsetMinutes)))]
    .map((k) => keyToDate(k))
    .filter((d): d is Date => d !== null)
    .sort((a, b) => a.getTime() - b.getTime())
  let best = 0
  let run = 0
  let prev: Date | null = null
  for (const date of keys) {
    run = prev !== null && date.getTime() - prev.getTime() === 86_400_000 ? run + 1 : 1
    best = Math.max(best, run)
    prev = date
  }
  return best
}
