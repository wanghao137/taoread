import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, ApiError, type AchievementsDto } from '../../lib/api'
import { Loading, ErrorState, EmptyState, TaCard } from '../../components/ui'

export interface AchievementWallProps {
  childId: string
  token: string
  onBack: () => void
}

type WallState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; data: AchievementsDto }

/** 夜灯成就墙（第 8 夜）：纪念式展示，无锁定的阴影机制——每一格都是已发生的骄傲 */
export function AchievementWall({ childId, token, onBack }: AchievementWallProps) {
  const [state, setState] = useState<WallState>({ kind: 'loading' })

  const load = useCallback(() => {
    let alive = true
    setState({ kind: 'loading' })
    api
      .achievements(childId, token)
      .then((data) => alive && setState({ kind: 'ready', data }))
      .catch(
        (err: unknown) =>
          alive &&
          setState({
            kind: 'error',
            message: err instanceof ApiError ? err.message : undefined,
          }),
      )
    return () => {
      alive = false
    }
  }, [childId, token])

  useEffect(() => load(), [childId, token, load])

  function body() {
    if (state.kind === 'loading') return <Loading label="夜灯一盏盏亮起来…" />
    if (state.kind === 'error') return <ErrorState message={state.message} onRetry={load} />

    const { nightLamps, streakBest, booksDone } = state.data
    const lampCount = nightLamps.length
    const bestStreak = streakBest.reduce((max, s) => Math.max(max, s.value), 0)
    const booksCount = booksDone.length

    if (lampCount === 0 && booksCount === 0) {
      return (
        <EmptyState
          art="lamp-first"
          mood="hint"
          title="第一盏夜灯等着今晚点亮"
          hint="完成一次共读，墙上就有第一格光"
        />
      )
    }

    return (
      <div className="flex flex-col gap-4">
        <TaCard>
          <h3 className="mb-3 text-base font-bold text-ink-secondary">夜灯</h3>
          <p className="text-3xl font-bold text-moon-400">{lampCount} 晚</p>
          <div className="mt-3 flex flex-wrap gap-1.5" aria-hidden>
            {Array.from({ length: Math.min(lampCount, 24) }).map((_, i) => (
              <motion.span
                key={i}
                className="text-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                🕯️
              </motion.span>
            ))}
          </div>
          <p className="mt-3 text-base text-ink-secondary">
            第 {lampCount + 1} 盏夜灯，等着今晚的故事
          </p>
        </TaCard>

        <div className="grid grid-cols-2 gap-4">
          <TaCard className="text-center">
            <p className="text-3xl font-bold text-moon-400">{bestStreak}</p>
            <p className="mt-1 text-base text-ink-secondary">最长连续（晚）</p>
          </TaCard>
          <TaCard className="text-center">
            <p className="text-3xl font-bold text-moon-400">{booksCount}</p>
            <p className="mt-1 text-base text-ink-secondary">读完（本）</p>
          </TaCard>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">我的夜灯</h2>
        <button
          type="button"
          onClick={onBack}
          className="min-h-touch cursor-pointer rounded-xl px-4 text-base text-ink-secondary"
        >
          ← 回到月亮
        </button>
      </div>
      {body()}
    </div>
  )
}
