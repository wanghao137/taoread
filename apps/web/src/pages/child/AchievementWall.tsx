import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, ApiError, type AchievementsDto } from '../../lib/api'
import { IconPeach } from '../../components/ui/icons'
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

/** 一颗小桃子：品牌吉祥物贴纸（不用裸 emoji——各平台渲染不一致） */
function PeachDot({ delay }: { delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 20 }}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sun text-ink-900"
      aria-hidden
    >
      <IconPeach size={18} />
    </motion.span>
  )
}

/** 桃子成就墙（原夜灯墙）：纪念式展示，无锁定的阴影机制——每一格都是已发生的骄傲 */
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
    if (state.kind === 'loading') return <Loading label="桃子一颗颗收进来…" />
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
          title="第一颗桃子挂在树上等你"
          hint="完成一次共读，墙上就收下第一颗桃子"
        />
      )
    }

    return (
      <div className="flex flex-col gap-4">
        <TaCard>
          <h3 className="mb-3 text-base font-bold text-ink-700">桃子</h3>
          <p className="font-display text-3xl font-bold text-terra-600">{lampCount} 颗</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Array.from({ length: Math.min(lampCount, 24) }).map((_, i) => (
              <PeachDot key={i} delay={i * 0.05} />
            ))}
          </div>
          <p className="mt-3 text-base text-ink-700">
            第 {lampCount + 1} 颗桃子，等你下次共读来收
          </p>
        </TaCard>

        <div className="grid grid-cols-2 gap-4">
          <TaCard className="text-center">
            <p className="font-display text-3xl font-bold text-terra-600">{bestStreak}</p>
            <p className="mt-1 text-base text-ink-700">最长连续（天）</p>
          </TaCard>
          <TaCard className="text-center">
            <p className="font-display text-3xl font-bold text-terra-600">{booksCount}</p>
            <p className="mt-1 text-base text-ink-700">读完（本）</p>
          </TaCard>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <img src="/brand/logo-256.png" alt="" className="h-10 w-10 rounded-2xl border-ink border-2 shadow-xs" />
          我的桃子
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="min-h-touch cursor-pointer rounded-xl px-4 text-base text-ink-700"
        >
          ← 回到首页
        </button>
      </div>
      {body()}
    </div>
  )
}
