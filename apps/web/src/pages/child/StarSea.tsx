import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, ApiError } from '../../lib/api'
import { Loading, ErrorState, EmptyState, TaCard, TaButton } from '../../components/ui'

export interface StarSeaProps {
  bookId: string | null
  title: string | null
  token: string
  onBack: () => void
}

type SeaState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'empty' }
  | { kind: 'ready'; items: Array<{ text: string; count?: number }> }

/** 金句星球（第 11 夜 M-C）：这本书全世界的小读者都在划哪句——「N 人划过这句」 */
export function StarSea({ bookId, title, token, onBack }: StarSeaProps) {
  const [state, setState] = useState<SeaState>({ kind: 'loading' })

  const load = useCallback(() => {
    if (!bookId) {
      setState({ kind: 'empty' })
      return () => undefined
    }
    let alive = true
    setState({ kind: 'loading' })
    api
      .bestBookmarks(bookId, token)
      .then((dto) => {
        if (!alive) return
        const items = (dto.items ?? [])
          .map((i) => ({ text: i.markText ?? '', count: i.totalCount }))
          .filter((i) => i.text.length > 0)
          .slice(0, 20)
        setState(items.length === 0 ? { kind: 'empty' } : { kind: 'ready', items })
      })
      .catch((err: unknown) => {
        if (!alive) return
        setState({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    return () => {
      alive = false
    }
  }, [bookId, token])

  useEffect(() => load(), [load])

  function body() {
    if (state.kind === 'loading') return <Loading label="星星一颗颗亮起来…" />
    if (state.kind === 'error') return <ErrorState message={state.message} onRetry={load} />
    if (state.kind === 'empty')
      return (
        <EmptyState
          art="star-sea"
          mood="hint"
          title={bookId ? '这颗星球的第一颗星星等着被点亮' : '选一本书，来看看大家在划哪句'}
        />
      )
    return (
      <ul className="flex flex-col gap-3">
        {state.items.map((item, i) => (
          <motion.li
            key={item.text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <TaCard>
              <p className="text-base leading-relaxed">「{item.text}」</p>
              <p className="mt-2 text-base text-moon-400">
                ⭐ {item.count?.toLocaleString() ?? '很多'} 位小读者划过这句
              </p>
            </TaCard>
          </motion.li>
        ))}
      </ul>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">金句星球</h2>
        <TaButton size="md" variant="ghost" onClick={onBack}>
          ← 回到月亮
        </TaButton>
      </div>
      {title && <p className="mb-3 text-base text-ink-secondary">《{title}》的星星海</p>}
      {body()}
    </div>
  )
}
