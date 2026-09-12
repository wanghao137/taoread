/**
 * 仪式时段窗口（第 8 夜护眼限制，服务端权威——客户端时钟不可信）。
 * 口径（与 nights.ts 本地日期桶一致）：「今晚」按服务器本地时间判定；
 * 家庭自部署单时区，容器化部署必须设 TZ（夜 15 部署前置，见 N3-005）。
 *
 * 就寝窗口：bedtimeMin（默认 21:30=1290）至次日 06:00——月亮睡觉，不开新书。
 * 超时引导：活跃会话超过软封顶（默认 5 分钟）→ 温和引导收尾，不惩罚。
 * 红线（docs/02 §7.2）：一切文案正向，锁定≠惩罚。
 */

export interface RitualWindowDeps {
  /** 就寝时刻（本地日内分钟数）；null=关闭（测试/走查覆写） */
  bedTimeMin: number | null
  /** 软封顶秒数，默认 300（5 分钟） */
  overtimeCapSec: number
  /** 本地日内分钟数（可注入） */
  nowMinutesOfDay: () => number
  /** Unix 秒（可注入） */
  nowSec: () => number
}

export type RitualMode = 'open' | 'bedtime' | 'overtime'

const MORNING_END_MIN = 6 * 60 // 06:00 后月亮醒来

/** 就寝判定：bedtimeMin 起至次日 06:00 */
export function isBedtime(nowMin: number, bedTimeMin: number | null): boolean {
  if (bedTimeMin === null) return false
  // bedTimeMin=0（午夜就寝）的窗口仅为 00:00-06:00（B1-02：>=0 恒真会导致全天锁定）
  if (bedTimeMin === 0) return nowMin < MORNING_END_MIN
  return nowMin >= bedTimeMin || nowMin < MORNING_END_MIN
}

/** 活跃会话超时判定 */
export function isOvertime(startedAtSec: number, deps: RitualWindowDeps): boolean {
  return deps.nowSec() - startedAtSec >= deps.overtimeCapSec
}
