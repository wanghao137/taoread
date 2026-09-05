/**
 * 周起点规范化（bug-register N1-N04 约定的唯一构造方式）。
 *
 * 规则：weekStart = 孩子所在时区的"本周一 00:00"，但用 UTC 分量确定性存储——
 * 由本地日历分量 (y, m, d) 推导，禁止调用方自行 new Date 构造，保证同一周的
 * 任意时刻生成完全相同的 Date 值（@@unique([familyId, weekStart]) 的前提）。
 */

/**
 * 纯函数：由本地日历分量计算本周一的 UTC 规范化值。
 * @param year 本地年（如 2026）
 * @param month 本地月（1-12）
 * @param day 本地日（1-31）
 * @param weekday 本地星期（0=周日…6=周六），缺省时按 UTC 分量推导（测试便利）
 */
export function weekStartFromParts(
  year: number,
  month: number,
  day: number,
  weekday?: number,
): Date {
  const wd =
    weekday ??
    new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  const backDays = (wd + 6) % 7 // 周一为一周起点：周日(0)回退 6 天，周一(1)回退 0 天
  return new Date(Date.UTC(year, month - 1, day - backDays, 0, 0, 0, 0))
}

/** 由 Date 实例（任意时刻）取其"本地日历周"的规范化 weekStart */
export function weekStartDate(now: Date): Date {
  return weekStartFromParts(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getDay(),
  )
}
