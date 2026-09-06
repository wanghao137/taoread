import { useEffect, useState } from 'react'
import { api, ApiError, type FamilyViewDto } from '../lib/api'
import { useSession } from '../stores/session'
import { TaCard, TaButton, TaSticker, Loading, ErrorState, EmptyState } from '../components/ui'

/** 家长端首页（第 5 夜角色壳：家庭概览 + Tab 占位；第 9-10 夜填充） */
export function ParentHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const familyCode = useSession((s) => s.familyCode)
  const signOut = useSession((s) => s.signOut)
  const [state, setState] = useState<FamilyState>({ kind: 'loading' })
  const [tab, setTab] = useState<(typeof TABS)[number]>('今晚')

  useEffect(() => {
    if (!token || !familyId) return
    let alive = true
    setState({ kind: 'loading' })
    api
      .familyView(familyId, token)
      .then((view) => alive && setState({ kind: 'ready', view }))
      .catch((err: unknown) => {
        if (!alive) return
        setState({ kind: 'error', message: err instanceof ApiError ? err.message : undefined })
      })
    return () => {
      alive = false
    }
  }, [token, familyId])

  function reload() {
    setState({ kind: 'loading' })
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-24 pt-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">桃阅读 · 家长端</h1>
          <p className="text-sm text-ink-secondary">每晚半小时，一起把故事讲完</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="cursor-pointer rounded-full border border-night-border px-4 py-2 text-sm text-ink-secondary"
        >
          退出
        </button>
      </header>

      {tab !== '今晚' ? (
        <EmptyState
          emoji="🚧"
          title={`「${tab}」正在路上`}
          hint="这一页会在接下来的版本里亮起来"
        />
      ) : state.kind === 'loading' ? (
        <Loading label="家庭信息赶来中…" />
      ) : state.kind === 'error' ? (
        <ErrorState message={state.message} onRetry={reload} />
      ) : (
        <div className="flex flex-col gap-4">
          <TaCard>
            <h2 className="mb-3 text-lg font-bold">家庭码</h2>
            <p
              data-testid="family-code"
              className="text-center text-3xl font-bold tracking-[0.3em] text-moon-400"
            >
              {familyCode ?? '········'}
            </p>
            <p className="mt-2 text-center text-sm text-ink-secondary">
              在另一台设备上输入这个码即可加入
            </p>
          </TaCard>

          <TaCard>
            <h2 className="mb-3 text-lg font-bold">微信读书绑定</h2>
            {state.view.binding ? (
              <p className="text-ink-secondary">
                已绑定（{state.view.binding.maskedTail}）
                {state.view.binding.status === 'unverified' && ' · 待验证'}
              </p>
            ) : (
              <p className="text-ink-secondary">
                还没有绑定，绑定后书架与阅读统计会自动同步（设置里操作）
              </p>
            )}
          </TaCard>

          <TaCard>
            <h2 className="mb-3 text-lg font-bold">小朋友</h2>
            {state.view.children.length === 0 ? (
              <div className="flex flex-col items-start gap-3">
                <p className="text-ink-secondary">
                  还没有档案，为家里的小读者建一份吧
                </p>
                <TaButton size="md" variant="secondary">
                  添加小读者（下一版本开放）
                </TaButton>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {state.view.children.map((c) => (
                  <TaSticker key={c.id} emoji="🧒" label={`${c.nickname}（${c.stage}）`} />
                ))}
              </div>
            )}
          </TaCard>
        </div>
      )}

      <nav
        aria-label="家长端导航"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-2xl justify-around border-t border-night-border bg-night-900/95 py-2 backdrop-blur"
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-current={tab === t}
            className={`min-h-[3rem] cursor-pointer rounded-xl px-5 text-base ${
              tab === t ? 'font-bold text-peach-400' : 'text-ink-secondary'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>
    </main>
  )
}

const TABS = ['今晚', '书架', '周报', '设置'] as const

type FamilyState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; view: FamilyViewDto }
