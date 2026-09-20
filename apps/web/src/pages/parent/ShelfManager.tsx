import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ShelfDto } from '../../lib/api'
import { Loading, ErrorState, EmptyState, TaButton } from '../../components/ui'

export interface ShelfManagerProps {
  familyId: string
  token: string
}

type ShelfState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; dto: ShelfDto }

type Partition = 'books' | 'albums'

const PARTITION_META: Record<Partition, { title: string; empty: string }> = {
  books: { title: '图书', empty: '书架上还没有图书' },
  albums: { title: '听书', empty: '还没有听书专辑' },
}

/** 书架管理（第 9 夜）：三分区 + 家长逐条屏蔽（孩子端即刻不可见） */
export function ShelfManager({ familyId, token }: ShelfManagerProps) {
  const [state, setState] = useState<ShelfState>({ kind: 'loading' })
  const [partition, setPartition] = useState<Partition>('books')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(() => {
    let alive = true
    setState({ kind: 'loading' })
    api
      .shelf(familyId, token)
      .then((dto) => alive && setState({ kind: 'ready', dto }))
      .catch((err: unknown) => {
        if (!alive) return
        setState({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    return () => {
      alive = false
    }
  }, [familyId, token])

  useEffect(() => load(), [load])

  // 屏蔽状态本地受控集（N9-101 真修：渲染与翻转共用同一来源，
  // 服务端 blockedBookIds 只作初始值；e2e 抓到乐观翻转被重渲染丢弃）
  const [blockedOverride, setBlockedOverride] = useState<Record<string, boolean>>({})

  async function toggleBlock(bookId: string, blocked: boolean, title?: string) {
    if (busyId) return
    setBusyId(bookId)
    try {
      await api.setBlocked(familyId, bookId, token, {
        kind: kindOf[partition],
        blocked,
        title,
      })
      setBlockedOverride((prev) => ({ ...prev, [`${kindOf[partition]}:${bookId}`]: blocked }))
    } catch (err) {
      // 失败要有可见反馈（N9-202）：局部提示而非静默
      window.alert('操作没有成功，请稍后再试')
      setState((prev) =>
        prev.kind === 'ready'
          ? prev
          : { kind: 'error', message: err instanceof ApiError ? err.message : undefined },
      )
    } finally {
      setBusyId(null)
    }
  }

  if (state.kind === 'loading') return <Loading label="书架正在赶来…" />
  if (state.kind === 'error') return <ErrorState message={state.message} onRetry={load} />

  const dto = state.dto
  const isBlocked = (kind: string, bookId: string) =>
    blockedOverride[`${kind}:${bookId}`] ?? (dto.blockedBookIds ?? []).includes(`${kind}:${bookId}`)
  const partitions: Record<Partition, Array<{ bookId: string; title?: string; blocked: boolean }>> = {
    books: (dto.books ?? []).map((b) => ({ bookId: b.bookId, title: b.title, blocked: isBlocked('book', b.bookId) })),
    albums: (dto.albums ?? []).map((b) => ({ bookId: b.bookId, title: b.title, blocked: isBlocked('album', b.bookId) })),
  }
  const items = partitions[partition] ?? []
  const kindOf: Record<Partition, string> = { books: 'book', albums: 'album' }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base text-ink-700">
        屏蔽的书会立刻从孩子的世界里消失（推荐流也不会再出现）
      </p>

      <div className="flex gap-2">
        {(Object.keys(PARTITION_META) as Partition[]).map((p) => (
          <TaButton
            key={p}
            size="md"
            variant={partition === p ? 'primary' : 'secondary'}
            onClick={() => setPartition(p)}
          >
            {PARTITION_META[p].title}
          </TaButton>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState art="bookshelf" mood="hint" title={PARTITION_META[partition].empty} />
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((b) => (
            <div
              key={b.bookId}
              className="flex min-h-touch items-center gap-3 rounded-2xl border border-paper-border bg-paper-200/70 px-4"
            >
              <span className="min-w-0 flex-1 truncate text-base">
                {b.title}
                {b.blocked && <span className="ml-2 text-terra-600">已屏蔽</span>}
              </span>
              <TaButton
                size="md"
                variant={b.blocked ? 'secondary' : 'ghost'}
                disabled={busyId === b.bookId}
                onClick={() => void toggleBlock(b.bookId, !b.blocked, b.title)}
              >
                {b.blocked ? '取消屏蔽' : '屏蔽'}
              </TaButton>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
