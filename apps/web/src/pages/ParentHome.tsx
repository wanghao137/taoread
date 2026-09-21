import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ChildDto, type FamilyViewDto } from '../lib/api'
import { useSession } from '../stores/session'
import { Loading, ErrorState } from '../components/ui'
import { TonightPanel } from './parent/TonightPanel'
import { ContentHub } from './parent/ContentHub'
import { SettingsPanel } from './parent/SettingsPanel'
import { ReportPanel } from './parent/ReportPanel'
import { FootprintBar } from './parent/FootprintBar'

// V8 Phase 6：一级导航收敛为四项；书架/桃书库合并进「内容」
const TABS = ['今天', '内容', '足迹', '设置'] as const

type FamilyState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; view: FamilyViewDto }

/** 家长端：今天共读卡 / 内容中心 / 阅读足迹 / 设置 */
export function ParentHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const familyCode = useSession((s) => s.familyCode)
  const signOut = useSession((s) => s.signOut)
  const [tab, setTab] = useState<(typeof TABS)[number]>('今天')
  const [state, setState] = useState<FamilyState>({ kind: 'loading' })
  // 变更计数：子面板改动后触发「今天」重拉（家庭视图 → 孩子列表）
  const [revision, setRevision] = useState(0)
  // 家庭码复制反馈（1.5s 自动复位）
  const [copied, setCopied] = useState(false)
  // 「今天」实时同步（V8）：15s 静默轮询计数，传给 TonightPanel 原地刷新
  const [refreshKey, setRefreshKey] = useState(0)
  const bumpRefresh = useCallback(() => setRefreshKey((n) => n + 1), [])

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

  // 今天 tab 时每 15 秒静默轮询；document.hidden 时不轮询，恢复可见立即刷一次
  useEffect(() => {
    if (tab !== '今天') return
    const POLL_MS = 15_000
    let timer: number | null = null
    const stopPolling = () => {
      if (timer !== null) {
        window.clearInterval(timer)
        timer = null
      }
    }
    const startPolling = () => {
      if (timer === null) timer = window.setInterval(bumpRefresh, POLL_MS)
    }
    const onVisibility = () => {
      if (document.hidden) {
        stopPolling()
      } else {
        bumpRefresh()
        startPolling()
      }
    }
    if (!document.hidden) startPolling()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stopPolling()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [tab, bumpRefresh])

  const childrenList: ChildDto[] = state.kind === 'ready' ? state.view.children : []

  function body() {
    if (state.kind === 'loading') return <Loading label="家庭信息赶来中…" />
    if (state.kind === 'error')
      return <ErrorState message={state.message} onRetry={() => setRevision((n) => n + 1)} />
    if (tab === '今天')
      return <TonightPanel token={token ?? ''} childrenList={childrenList} refreshKey={refreshKey} />
    if (tab === '内容') return <ContentHub familyId={familyId ?? ''} token={token ?? ''} />
    if (tab === '足迹') return <ReportPanel familyId={familyId ?? ''} token={token ?? ''} />
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
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-32 pt-8 lg:max-w-5xl lg:px-10 lg:pb-36">
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
        <p className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border-ink border-2 bg-sun/30 px-4 py-3 text-base text-ink-700 shadow-xs">
          <span>
            家庭码{' '}
            <span data-testid="family-code" className="font-bold tracking-widest text-terra-600">
              {familyCode ?? '········'}
            </span>
            ，在小读者的设备上输入即可加入
          </span>
          {familyCode ? (
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(familyCode).catch(() => undefined)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              className="ml-auto min-h-[2.25rem] cursor-pointer rounded-full border-ink border-[1.5px] bg-paper-200 px-3 text-xs font-bold text-ink-700 shadow-xs"
            >
              {copied ? '✓ 已复制' : '复制'}
            </button>
          ) : null}
        </p>
      )}

      {body()}

      <nav
        aria-label="家长端导航"
        className="sticky bottom-0 z-40 -mx-5 mt-auto flex justify-around border-t-2 border-t-ink bg-paper-100/95 py-2 backdrop-blur lg:mx-auto lg:mb-6 lg:w-fit lg:rounded-3xl lg:border-2 lg:border-ink lg:px-6 lg:py-1.5 lg:shadow-card"
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
