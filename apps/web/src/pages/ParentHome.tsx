import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api, ApiError, type ChildDto, type FamilyViewDto } from '../lib/api'
import { useSession } from '../stores/session'
import { Loading, ErrorState } from '../components/ui'
import { TonightPanel } from './parent/TonightPanel'
import { ContentHub } from './parent/ContentHub'
import { ParentPhonics } from './parent/FamilyImports'
import { SettingsPanel } from './parent/SettingsPanel'
import { ReportPanel } from './parent/ReportPanel'
import { FootprintBar } from './parent/FootprintBar'
import { IconSun, IconShelf, IconChart, IconGear, IconBookOpen, IconArrowLeft } from '../components/ui/icons'
import { BrandLogo } from '../components/ui'

// V8 Phase 6：一级导航收敛为四项；书架/桃书库合并进「内容」
const TABS = ['今天', '内容', '足迹', '设置'] as const

/** 本周一的 YYYY-MM-DD（本地日历，与 ReportPanel 同口径） */
function thisMondayKey(): string {
  const d = new Date()
  const back = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - back)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

type FamilyState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; view: FamilyViewDto }

/** 家长端（v8 贴纸绘本壳）：mast + 侧栏导航（移动端底部胶囊）+ 今天/内容/足迹/设置 */
export function ParentHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const familyCode = useSession((s) => s.familyCode)
  const signOut = useSession((s) => s.signOut)
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedTab = searchParams.get('tab')
  const tab = TABS.find(value => value === requestedTab) ?? '今天'
  const setTab = useCallback((value: (typeof TABS)[number]) => { const next = new URLSearchParams(searchParams); next.set('tab', value); setSearchParams(next) }, [searchParams, setSearchParams])
  const [state, setState] = useState<FamilyState>({ kind: 'loading' })
  // 变更计数：子面板改动后触发「今天」重拉（家庭视图 → 孩子列表）
  const [revision, setRevision] = useState(0)
  // 家庭码复制反馈（1.5s 自动复位）
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // 卸载时清掉复制反馈定时器，避免卸载后 setState
  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current)
    },
    [],
  )
  // 「今天」实时同步（V8）：15s 静默轮询计数，传给 TonightPanel 原地刷新
  const [refreshKey, setRefreshKey] = useState(0)
  const bumpRefresh = useCallback(() => setRefreshKey((n) => n + 1), [])

  // docs/34 P1-14：周报生成后的红点提醒——本周报告已生成且未看过时，「足迹」标签亮点
  const [reportDot, setReportDot] = useState(false)
  useEffect(() => {
    if (!token || !familyId) return
    let alive = true
    void api
      .weeklyReport(familyId, token, thisMondayKey())
      .then(() => {
        if (!alive) return
        try {
          setReportDot(localStorage.getItem(`taoread-report-seen:${familyId}`) !== thisMondayKey())
        } catch {
          setReportDot(false)
        }
      })
      .catch(() => undefined)
    return () => {
      alive = false
    }
  }, [token, familyId, refreshKey])

  const openFootprint = useCallback(() => {
    setTab('足迹')
    setReportDot(false)
    try {
      localStorage.setItem(`taoread-report-seen:${familyId}`, thisMondayKey())
    } catch {
      /* 隐私模式写不进就算了 */
    }
  }, [familyId, setTab])

  const load = useCallback(() => {
    if (!token || !familyId) return
    let alive = true
    // 同一家庭刷新凭据或设置时保留已加载面板，让保存结果和焦点继续可见。
    setState(previous => previous.kind === 'ready' && previous.view.familyId === familyId ? previous : { kind: 'loading' })
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
      return (
        <>
          {childrenList.length === 0 && <section className="panel"><h2>从第一本书开始</h2><p>先在设置里添加一个小读者昵称和年龄段，无需真实姓名或生日。再选择桃书库里的书，切换孩子端就能打开正文；也可以先试读。</p><button className="sticker-btn primary" onClick={() => setTab('设置')}>添加小读者</button></section>}
          <TonightPanel token={token ?? ''} childrenList={childrenList} refreshKey={refreshKey} />
          <FootprintBar familyId={familyId ?? ''} token={token ?? ''} />

          {/* 家庭码贴纸卡：小读者的设备输入即可加入 */}
          <details className="panel"><summary style={{ minHeight: 44, cursor: 'pointer' }}>邀请设备加入家庭</summary><div className="family-code">
            <div>
              <span className="mono-label">家庭码 · FAMILY CODE</span>
              <p data-testid="family-code" className="code-display">
                {familyCode ?? '········'}
              </p>
              <p className="mono-line">在小读者的设备上输入即可加入</p>
            </div>
            {familyCode ? (
              <button
                type="button"
                className="sticker-btn sm"
                onClick={() => {
                  void navigator.clipboard?.writeText(familyCode).catch(() => undefined)
                  setCopied(true)
                  if (copiedTimer.current) clearTimeout(copiedTimer.current)
                  copiedTimer.current = setTimeout(() => setCopied(false), 1500)
                }}
              >
                {copied ? '✓ 已复制' : '复制'}
              </button>
            ) : null}
          </div></details>
        </>
      )
    if (tab === '内容') return <><ContentHub familyId={familyId ?? ''} token={token ?? ''} /><ParentPhonics token={token ?? ''} children={childrenList} /></>
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

  function navButtons() {
    return TABS.map((t) => (
      <button
        key={t}
        type="button"
        onClick={() => (t === '足迹' ? openFootprint() : setTab(t))}
        aria-current={tab === t ? 'page' : undefined}
        className={tab === t ? 'on' : ''}
      >
        <span className="nav-icon">{t === '今天' ? <IconSun /> : t === '内容' ? <IconShelf /> : t === '足迹' ? <IconChart /> : <IconGear />}</span>
        <span>
        {t}
        {t === '足迹' && reportDot ? (
          <span
            aria-hidden
            style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: '#ff6b4a', marginLeft: 6, verticalAlign: 'middle' }}
          />
        ) : null}
        </span>
      </button>
    ))
  }

  return (
    <div className="app parent-app">
      <div className="wrap">
        <header className="mast">
          <div className="logo">
            <BrandLogo alt="桃阅读" />
          </div>
          <div className="brand">
            <h1>桃阅读 · 家长端</h1>
            <p>每天半小时 · 一起把故事讲完</p>
          </div>
          <div className="mast-actions">
            <button type="button" className="sticker-btn keep parent-signout" onClick={signOut}>
              <IconArrowLeft size={20} />退出
            </button>
          </div>
        </header>

        <div className="layout">
          <aside className="side">
            <p className="side-label">家庭阅读空间</p>
            <nav className="nav" aria-label="家长端导航">
              {navButtons()}
            </nav>
            <div className="side-card">
              <IconBookOpen size={36} />
              <b>一起读</b>
              <p>小读者的设备输入家庭码即可加入</p>
            </div>
          </aside>
          <main className="main" id="main-content">{body()}</main>
        </div>
      </div>

      <nav className="mobile-nav four" aria-label="家长端导航">
        {navButtons()}
      </nav>
    </div>
  )
}
