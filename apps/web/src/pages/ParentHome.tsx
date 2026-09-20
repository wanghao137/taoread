import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ChildDto, type FamilyViewDto } from '../lib/api'
import { useSession } from '../stores/session'
import { Loading, ErrorState } from '../components/ui'
import { TonightPanel } from './parent/TonightPanel'
import { ShelfManager } from './parent/ShelfManager'
import { SettingsPanel } from './parent/SettingsPanel'
import { ReportPanel } from './parent/ReportPanel'
import { FootprintBar } from './parent/FootprintBar'
import { ContentLibrary } from './parent/ContentLibrary'

const TABS = ['今天', '书架', '桃书库', '周报', '设置'] as const

type FamilyState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; view: FamilyViewDto }

/** 家长端：今天共读卡 / 书架管理 / 设置 / 周报 */
export function ParentHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const familyCode = useSession((s) => s.familyCode)
  const signOut = useSession((s) => s.signOut)
  const [tab, setTab] = useState<(typeof TABS)[number]>('今天')
  const [state, setState] = useState<FamilyState>({ kind: 'loading' })
  // 变更计数：子面板改动后触发「今天」重拉（家庭视图 → 孩子列表）
  const [revision, setRevision] = useState(0)

  const load = useCallback(() => {
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

  useEffect(() => load(), [load, revision])

  const childrenList: ChildDto[] = state.kind === 'ready' ? state.view.children : []

  function body() {
    if (state.kind === 'loading') return <Loading label="家庭信息赶来中…" />
    if (state.kind === 'error')
      return <ErrorState message={state.message} onRetry={() => setRevision((n) => n + 1)} />
    if (tab === '周报')
      return <ReportPanel familyId={familyId ?? ''} token={token ?? ''} />
    if (tab === '今天')
      return (
        <TonightPanel token={token ?? ''} childrenList={childrenList} />
      )
    if (tab === '书架')
      return <ShelfManager familyId={familyId ?? ''} token={token ?? ''} />
    if (tab === '桃书库')
      return <ContentLibrary familyId={familyId ?? ''} token={token ?? ''} />
    return (
      <SettingsPanel
        familyId={familyId ?? ''}
        token={token ?? ''}
        onDeleted={() => undefined}
        onChanged={() => setRevision((n) => n + 1)}
        revision={revision}
      />
    )
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-24 pt-8">
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/brand/logo-256.png" alt="" className="h-9 w-9" />
          <div>
            <h1 className="text-2xl font-bold">桃阅读 · 家长端</h1>
            <p className="text-base text-ink-700">每天半小时，一起把故事讲完</p>
          </div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="min-h-[3rem] cursor-pointer rounded-full border-ink border-2 bg-paper-200 px-4 text-base text-ink-700 shadow-xs"
        >
          退出
        </button>
      </header>

      {tab === '今天' && (
        <FootprintBar familyId={familyId ?? ''} token={token ?? ''} />
      )}

      {tab === '今天' && (
        <p className="mb-4 rounded-2xl border-ink border-2 bg-sun/30 px-4 py-3 text-base text-ink-700 shadow-xs">
          家庭码{' '}
          <span data-testid="family-code" className="font-bold tracking-widest text-terra-600">
            {familyCode ?? '········'}
          </span>
          ，在小读者的设备上输入即可加入
        </p>
      )}

      {body()}

      <nav
        aria-label="家长端导航"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-2xl justify-around border-t-2 border-t-ink bg-paper-100/95 py-2 backdrop-blur"
      >
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-current={tab === t}
            className={`min-h-[3rem] cursor-pointer rounded-xl px-5 text-base ${
              tab === t ? 'font-bold text-terra-600' : 'text-ink-700'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>
    </main>
  )
}
