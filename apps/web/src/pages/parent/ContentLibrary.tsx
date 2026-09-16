/**
 * 家长端 · 桃书库（docs/09 C4 + C9）。
 * 家长看得见孩子在公版书库里的阅读进度，并能逐本屏蔽。
 * 这是 v2 内容域上线后家长端唯一的空白：原先家长对孩子在桃书架读了什么一无所知。
 */
import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ContentFamilyBookDto } from '../../lib/api'
import { Loading, ErrorState, EmptyState } from '../../components/ui'
import { SceneArt } from '../../components/art/SceneArt'

export interface ContentLibraryProps {
  familyId: string
  token: string
}

type State =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; books: ContentFamilyBookDto[]; nicknames: Map<string, string> }

const CATEGORY_LABEL: Record<string, string> = {
  poetry: '古诗',
  primer: '蒙学',
  story: '故事',
  tale: '童话',
}

export function ContentLibrary({ token }: ContentLibraryProps) {
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [busyId, setBusyId] = useState<string | null>(null)
  const [showBlocked, setShowBlocked] = useState(false)

  const load = useCallback(() => {
    let alive = true
    setState({ kind: 'loading' })
    api
      .contentFamily(token)
      .then((res) => {
        if (!alive) return
        setState({
          kind: 'ready',
          books: res.books,
          nicknames: new Map(res.children.map((c) => [c.id, c.nickname])),
        })
      })
      .catch((err: unknown) => {
        if (!alive) return
        setState({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
      .finally(() => {
        if (alive) setState((s) => (s.kind === 'loading' ? { kind: 'error' } : s))
      })
    return () => {
      alive = false
    }
  }, [token])

  useEffect(() => load(), [load])

  async function toggleBlocked(bookId: string, blocked: boolean) {
    setBusyId(bookId)
    try {
      await api.setContentBlocked(bookId, blocked, token)
      setState((s) => {
        if (s.kind !== 'ready') return s
        return {
          ...s,
          books: s.books.map((b) => (b.id === bookId ? { ...b, blocked } : b)),
        }
      })
    } catch (err) {
      setState({ kind: 'error', message: err instanceof ApiError ? err.message : '屏蔽设置没保存成功' })
    } finally {
      setBusyId(null)
    }
  }

  if (state.kind === 'loading') return <Loading label="桃书库正在搬书…" />
  if (state.kind === 'error') {
    return (
      <ErrorState
        message={state.message ?? '桃书库暂时打不开'}
        onRetry={load}
      />
    )
  }

  const { books, nicknames } = state
  const visible = showBlocked ? books : books.filter((b) => !b.blocked)
  const blockedCount = books.filter((b) => b.blocked).length

  if (books.length === 0) {
    return (
      <EmptyState
        art="empty-sprout"
        mood="happy"
        title="桃书库还没有书"
        hint="公版书库由应用统一维护，孩子端书架会自动出现。"
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-ink-primary">桃书库 · 孩子的阅读进度</h3>
          <p className="mt-0.5 text-xs text-ink-secondary">
            共 {books.length} 本公版书 · {blockedCount > 0 ? `${blockedCount} 本已被屏蔽` : '未屏蔽任何书'}
          </p>
        </div>
        {blockedCount > 0 ? (
          <button
            type="button"
            onClick={() => setShowBlocked((v) => !v)}
            className="min-h-touch rounded-full border border-night-border px-4 text-xs text-ink-secondary"
          >
            {showBlocked ? '只看在读' : `看被屏蔽的 ${blockedCount} 本`}
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((book) => {
          const readers = book.readers.map((r) => ({
            name: nicknames.get(r.childId) ?? '孩子',
            ...r,
          }))
          return (
            <div
              key={book.id}
              className="flex gap-3 rounded-2xl border border-night-border bg-panel/60 p-3"
            >
              {/* 小封面 */}
              <div className="aspect-[3 / 4] h-20 flex-shrink-0 overflow-hidden rounded-lg shadow-md ring-1 ring-white/10">
                <SceneArt scene={book.coverArt} from={book.coverFrom} to={book.coverTo} lang={book.lang} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-ink-primary">{book.title}</p>
                  {book.blocked ? (
                    <span className="flex-shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-300">
                      已屏蔽
                    </span>
                  ) : null}
                </div>
                <p className="text-[10px] text-ink-secondary opacity-80">
                  {CATEGORY_LABEL[book.category] ?? book.category} · {book.lang === 'en' ? '英文' : '中文'} · {book.ageStage} · {book.chapterCount} 章
                </p>
                {readers.length > 0 ? (
                  <div className="mt-1 flex flex-col gap-1">
                    {readers.map((r) => (
                      <div key={r.name} className="flex items-center gap-2">
                        <span className="w-10 flex-shrink-0 text-[10px] text-ink-secondary">{r.name}</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-night-border/50">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${r.progress}%`,
                              background: r.finished ? '#A5D6A7' : 'linear-gradient(90deg, #FF8E75, #FF6D54)',
                            }}
                          />
                        </div>
                        <span className="w-14 flex-shrink-0 text-right text-[10px] text-ink-secondary">
                          {r.finished ? '读完' : `${r.progress}%`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-[10px] text-ink-secondary opacity-60">还没开始读</p>
                )}
                <div className="mt-auto pt-1">
                  <button
                    type="button"
                    disabled={busyId === book.id}
                    onClick={() => void toggleBlocked(book.id, !book.blocked)}
                    className="min-h-touch rounded-full px-3 text-[11px] font-medium disabled:opacity-40"
                    style={{
                      color: book.blocked ? '#A5D6A7' : '#E57373',
                      border: `1px solid ${book.blocked ? '#A5D6A755' : '#E5737355'}`,
                    }}
                  >
                    {book.blocked ? '恢复显示' : '屏蔽这本书'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-[10px] leading-relaxed text-ink-secondary opacity-60">
        屏蔽后，孩子端的桃书架会立刻隐藏这本书，且不会有任何提示——孩子不会感到被否定。
      </p>
    </div>
  )
}
