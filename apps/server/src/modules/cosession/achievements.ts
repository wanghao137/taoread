/**
 * 成就解锁计划（纯函数）：夜灯（第 N 晚）/ 最长连续（跨best瞬间）/ 读完第 N 本。
 * 防重复解锁的最后防线是数据库唯一约束 @@unique([childId, kind, value])——
 * 并发竞态下第二个插入撞 P2002 被捕获跳过；本层的判断是快路径。
 * 纪念式成就，无兑换（docs/02 负向清单）。
 */
import { countDistinctNights, currentStreak, nightKeyOf } from './nights'

export type AchievementKind = 'night_lamp' | 'streak_best' | 'book_done'

export interface UnlockPlanItem {
  kind: AchievementKind
  value: number
}

export interface FinishedSessionInput {
  endedAtSec: number
  bookId: string | null
  progressMark: string | null
}

export interface PlanUnlocksInput {
  /** 本次收尾之前该孩子全部已收尾会话（不含当前） */
  past: readonly FinishedSessionInput[]
  /** 本次收尾的会话 */
  current: FinishedSessionInput
  /** 已有成就（kind+value），用于 streak_best 的 best 判断 */
  existing: ReadonlyArray<{ kind: string; value: number }>
}

export function planUnlocks(input: PlanUnlocksInput): UnlockPlanItem[] {
  const { past, current, existing } = input
  const all = [...past, current]
  const plan: UnlockPlanItem[] = []

  // 夜灯：第 N 晚。同一晚第二次收尾时 N 与已解锁值相同 → 唯一约束兜底，不重复点亮
  const nightCount = countDistinctNights(all.map((s) => s.endedAtSec))
  if (nightCount >= 1) {
    plan.push({ kind: 'night_lamp', value: nightCount })
  }

  // 最长连续：只有当本次连读跨过历史 best 才解锁（value=本次连读数）
  const tonightKey = nightKeyOf(current.endedAtSec)
  const streak = currentStreak(all.map((s) => s.endedAtSec), tonightKey)
  const bestBefore = existing
    .filter((a) => a.kind === 'streak_best')
    .reduce((max, a) => Math.max(max, a.value), 0)
  if (streak > bestBefore && streak >= 2) {
    plan.push({ kind: 'streak_best', value: streak })
  }

  // 读完第 N 本：value = 去重后的已读书数；同一本书重复读完不重复解锁
  if (current.progressMark === 'done' && current.bookId !== null) {
    const doneBooks = new Set(
      past
        .filter((s) => s.progressMark === 'done' && s.bookId !== null)
        .map((s) => s.bookId),
    )
    if (!doneBooks.has(current.bookId)) {
      doneBooks.add(current.bookId)
      plan.push({ kind: 'book_done', value: doneBooks.size })
    }
  }

  return plan
}
