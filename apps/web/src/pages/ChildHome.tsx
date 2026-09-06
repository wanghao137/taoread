import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, ApiError, type ShelfDto } from '../lib/api'
import { useSession } from '../stores/session'
import { TaCard, Loading, ErrorState, EmptyState } from '../components/ui'

type ShelfState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'empty' }
  | { kind: 'ready'; count: number; sample?: string }

/** 孩子端首页（第 5 夜为角色壳 + 书架问候；仪式流第 6 夜上线） */
export function ChildHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const signOut = useSession((s) => s.signOut)
  const [shelf, setShelf] = useState<ShelfState>({ kind: 'loading' })

  useEffect(() => {
    if (!token || !familyId) return
    let alive = true
    setShelf({ kind: 'loading' })
    api
      .shelf(familyId, token, 'child')
      .then((dto: ShelfDto) => {
        if (!alive) return
        const items = dto.childrenView ?? []
        if (items.length === 0) setShelf({ kind: 'empty' })
        else setShelf({ kind: 'ready', count: items.length, sample: items[0]?.title })
      })
      .catch((err: unknown) => {
        if (!alive) return
        setShelf({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    return () => {
      alive = false
    }
  }, [token, familyId])

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">桃阅读</h1>
        <button
          type="button"
          onClick={signOut}
          className="cursor-pointer rounded-full border border-night-border px-4 py-2 text-sm text-ink-secondary"
        >
          换一个家庭
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-6">
        <motion.div
          aria-hidden
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-moon-300 text-6xl shadow-[0_0_70px_rgba(255,217,122,0.4)]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌙
        </motion.div>

        <h2 className="text-center text-2xl font-bold leading-relaxed">
          今晚的故事时间
          <br />
          <span className="text-moon-400">马上开始</span>
        </h2>

        {shelf.kind === 'loading' && <Loading label="书架正在醒来…" />}
        {shelf.kind === 'error' && (
          <ErrorState
            message={shelf.message}
            onRetry={() => setShelf({ kind: 'loading' })}
          />
        )}
        {shelf.kind === 'empty' && (
          <EmptyState
            emoji="📚"
            title="书架还空着"
            hint="请爸爸妈妈把书放进来，第一本故事正在路上"
          />
        )}
        {shelf.kind === 'ready' && (
          <TaCard className="text-center">
            <p className="text-4xl font-bold text-moon-400">{shelf.count}</p>
            <p className="mt-1 text-ink-secondary">本书在书架上等你</p>
            {shelf.sample && (
              <p className="mt-3 text-sm text-ink-secondary">最近的一本：《{shelf.sample}》</p>
            )}
          </TaCard>
        )}

        <p className="text-center text-sm text-ink-secondary">
          「今晚读什么」选书仪式将在下一版本点亮 ✨
        </p>
      </div>
    </main>
  )
}
