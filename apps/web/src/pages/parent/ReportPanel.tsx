import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ChildDto, type CosessionHistoryDto, type WeeklyReportDataDto } from '../../lib/api'
import { Loading, ErrorState } from '../../components/ui'
import { PageHead } from '../child/V8App'

export interface ReportPanelProps {
  familyId: string
  token: string
}

const MOOD_LABEL: Record<string, string> = {
  happy: '开心',
  excited: '惊喜',
  calm: '安静',
  curious: '好奇',
  thinking: '想一想',
  sleepy: '想睡了',
}

/** 本周一的 YYYY-MM-DD（本地日历） */
function thisMonday(): string {
  const d = new Date()
  const back = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - back)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function lastMonday(): string {
  const d = new Date()
  const back = (d.getDay() + 6) % 7 + 7
  d.setDate(d.getDate() - back)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 足迹页（原周报）：本周/上周切换 + 分享卡 PNG 下载（SVG 客户端栅格化，1080×1440）。v8 贴纸绘本语言 */
export function ReportPanel({ familyId, token }: ReportPanelProps) {
  const [week, setWeek] = useState<string>(thisMonday())
  const [children, setChildren] = useState<ChildDto[]>([])
  const [childId, setChildId] = useState('')
  const [historyError, setHistoryError] = useState(false)
  const [report, setReport] = useState<WeeklyReportDataDto | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  // docs/34 P2-5：共读历史时间线（周报只有周聚合，逐次记录此前没有页面）
  const [history, setHistory] = useState<CosessionHistoryDto['sessions']>([])
  // docs/34 P2-6：读完分享卡按会话下载
  const [cardBusyId, setCardBusyId] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    api.familyView(familyId, token).then((r) => { if (alive) setChildren(r.children) }).catch(() => undefined)
    api
      .cosessionHistory(token, 20, childId || undefined)
      .then((r) => { if (alive) { setHistory(r.sessions); setHistoryError(false) } })
      .catch(() => { if (alive) setHistoryError(true) })
    return () => { alive = false }
  }, [token, familyId, childId])

  const load = useCallback(() => {
    let alive = true
    setLoading(true)
    setError(null)
    api
      .weeklyReport(familyId, token, week, childId || undefined)
      .then(({ report: r }) => {
        if (alive) setReport(r)
      })
      .catch((err: unknown) => {
        if (alive) setError(err instanceof ApiError ? err.message : '足迹报告生成失败，请稍后再试')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [familyId, token, week, childId])

  useEffect(() => load(), [load])

  /** SVG → PNG：服务端出 SVG（系统字体零版权风险），客户端栅格化 1080×1440 PNG */
  async function downloadPng() {
    if (exporting) return
    setExporting(true)
    setExportError(null)
    try {
      const svg = await api.shareCardSvg(familyId, token, week, childId || undefined)
      const img = new Image()
      const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('svg load failed'))
        img.src = src
      })
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1440
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('no canvas')
      ctx.drawImage(img, 0, 0, 1080, 1440)
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) throw new Error('toBlob failed')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `taoread-week-${week}.png`
      a.click()
      // 延迟回收：同步 revoke 会中断 Firefox 的异步取件（N10-007）
      setTimeout(() => URL.revokeObjectURL(url), 10_000)
    } catch {
      // 导出失败不清周报内容：独立局部提示（N10-008）
      setExportError('分享卡导出没有成功，请稍后再试')
    } finally {
      setExporting(false)
    }
  }

  /** docs/34 P2-6：单次共读的「读完卡」PNG 下载（与周报分享卡同一渲染链路） */
  async function downloadBookCard(cosessionId: string) {
    if (cardBusyId) return
    setCardBusyId(cosessionId)
    try {
      const svg = await api.readingCardSvg(familyId, cosessionId, token)
      const img = new Image()
      const src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('svg load failed'))
        img.src = src
      })
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1440
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('no canvas')
      ctx.drawImage(img, 0, 0, 1080, 1440)
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!blob) throw new Error('toBlob failed')
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `taoread-reading-${cosessionId.slice(-6)}.png`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 10_000)
    } catch {
      setExportError('读完卡导出没有成功，请稍后再试')
    } finally {
      setCardBusyId(null)
    }
  }

  return (
    <div>
      <PageHead index="03" title="足迹" sub="这一周家里的阅读足迹，可以保存成卡片分享给家人" />

      <div className="filter-row" style={{ marginTop: 0 }}>
        <label>查看孩子 <select className="field" value={childId} onChange={(e) => setChildId(e.target.value)}><option value="">全家</option>{children.map((c) => <option key={c.id} value={c.id}>{c.nickname}</option>)}</select></label>
        <label>历史周（选择任意日期） <input type="date" className="field" value={week} onChange={(e) => {
          if (!e.target.value) return
          const d = new Date(`${e.target.value}T12:00:00`)
          d.setDate(d.getDate() - (d.getDay() + 6) % 7)
          setWeek(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
        }} /></label>
        <button type="button" className={`filter ${week === thisMonday() ? 'on' : ''}`} aria-pressed={week === thisMonday()} onClick={() => setWeek(thisMonday())}>
          本周
        </button>
        <button type="button" className={`filter ${week === lastMonday() ? 'on' : ''}`} aria-pressed={week === lastMonday()} onClick={() => setWeek(lastMonday())}>
          上周
        </button>
      </div>

      {loading ? (
        <Loading label="这一周正在被收好…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !report ? null : (
        <div className="report-grid">
          <div className="hero">
            <span className="mono-label">WEEKLY REPORT · 桃阅读</span>
            <div className="hero-title">
              <span className="marker">{report.nights}</span> 天共读
            </div>
            <p className="hero-copy">
              累计 {report.totalMinutes} 分钟 · 读过 {report.books.length} 本
              {report.booksCompleted > 0 && ` · 确认读完 ${report.booksCompleted} 本`}
              {' · '}收金句 {report.highlightsTotal} 句
              {report.achievementsUnlocked > 0 && ` · 解锁成就 ${report.achievementsUnlocked} 枚`}
            </p>
            <p className="mono-label">{report.basis}</p>
            {!!report.legacyUnverifiedCompletions && <p>有 {report.legacyUnverifiedCompletions} 条旧公共书完成记录缺少当时依据，保留原记录，未计入本页读完数。</p>}
            <p className="hero-copy" style={{ marginTop: 6 }}>
              {report.nextWeekHint}
            </p>
          </div>

          {report.books.length > 0 && (
            <div className="panel">
              <h3>这一周读过的书</h3>
              <div className="chapter-list" style={{ marginTop: 12 }}>
                {report.books.map((b, i) => (
                  <div key={b.key} className="chapter" style={{ cursor: 'default' }}>
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <b>《{b.title}》</b>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.highlights.length > 0 && (
            <div className="panel">
              <h3>收进来的金句</h3>
              <div className="speech-list" style={{ marginTop: 12 }}>
                {report.highlights.map((h, i) => (
                  <div key={i} className="speech-row">
                    <span aria-hidden className="avatar">
                      {i + 1}
                    </span>
                    <div className="speech">
                      <p>「{h.text}」</p>
                      {h.source && <time style={{ marginTop: 8 }}>{h.source}</time>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exportError && (
            <p role="alert" className="msg">
              {exportError}
            </p>
          )}
          <button type="button" className="sticker-btn primary full" disabled={exporting} onClick={() => void downloadPng()}>
            {exporting ? '正在生成…' : '保存分享卡（1080×1440）'}
          </button>
        </div>
      )}

      {/* docs/34 P2-5：共读时间线（最近 20 次）+ P2-6 读完卡 */}
      {history.length > 0 || historyError ? (
        <div className="panel" style={{ marginTop: 16 }}>
          <h3>共读时间线</h3>
          <p className="mono-line" style={{ fontSize: 12 }}>
            每一次一起读过的晚上都在这里；点「存张卡」可以把这次共读保存成图片
          </p>
          <div className="chapter-list" style={{ marginTop: 10 }}>
            {historyError && <p role="alert">逐次记录未加载，请刷新页面重试。</p>}
            {history.filter((s) => !childId || s.childId === childId).map((s) => {
              const d = new Date(s.startedAt)
              const minutes = s.durationSec !== null ? Math.round(s.durationSec / 60) : null
              return (
                <div key={s.id} className="chapter" style={{ cursor: 'default' }}>
                  <span className="num">{`${d.getMonth() + 1}/${d.getDate()}`}</span>
                  <b>
                    {s.childName} · 《{s.title}》
                    {s.completionVerified === true ? ' · 读完' : s.progressMark === 'done' ? ' · 完成依据未核实' : ''}
                    {s.mood && MOOD_LABEL[s.mood] ? ` · ${MOOD_LABEL[s.mood]}` : ''}
                  </b>
                  <em style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    {minutes !== null ? `${minutes} 分钟` : ''}
                    <button
                      type="button"
                      className="sticker-btn sm"
                      disabled={cardBusyId === s.id}
                      onClick={() => void downloadBookCard(s.id)}
                    >
                      {cardBusyId === s.id ? '生成中…' : '存张卡'}
                    </button>
                  </em>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
