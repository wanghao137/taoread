import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type WeeklyReportDataDto } from '../../lib/api'
import { Loading, ErrorState } from '../../components/ui'
import { PageHead } from '../child/V8App'

export interface ReportPanelProps {
  familyId: string
  token: string
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
  const [report, setReport] = useState<WeeklyReportDataDto | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const load = useCallback(() => {
    let alive = true
    setLoading(true)
    setError(null)
    api
      .weeklyReport(familyId, token, week)
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
  }, [familyId, token, week])

  useEffect(() => load(), [load])

  /** SVG → PNG：服务端出 SVG（系统字体零版权风险），客户端栅格化 1080×1440 PNG */
  async function downloadPng() {
    if (exporting) return
    setExporting(true)
    setExportError(null)
    try {
      const svg = await api.shareCardSvg(familyId, token, week)
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

  return (
    <div>
      <PageHead index="03" title="足迹" sub="这一周家里的阅读足迹，可以保存成卡片分享给家人" />

      <div className="filter-row" style={{ marginTop: 0 }}>
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
              {report.booksCompleted > 0 && ` · 真正读完 ${report.booksCompleted} 本`}
              {' · '}收金句 {report.highlightsTotal} 句
              {report.achievementsUnlocked > 0 && ` · 解锁成就 ${report.achievementsUnlocked} 枚`}
            </p>
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
    </div>
  )
}
