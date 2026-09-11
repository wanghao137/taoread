import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type WeeklyReportDataDto } from '../../lib/api'
import { Loading, ErrorState, TaCard, TaButton } from '../../components/ui'

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

/** 周报页（第 10 夜）：本周/上周切换 + 分享卡 PNG 下载（SVG 客户端栅格化，1080×1440） */
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
        if (alive) setError(err instanceof ApiError ? err.message : '周报生成失败，请稍后再试')
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

  function body() {
    if (loading) return <Loading label="这一周正在被收好…" />
    if (error) return <ErrorState message={error} onRetry={load} />
    if (!report) return null
    return (
      <div className="flex flex-col gap-4">
        <TaCard className="text-center">
          <p className="text-5xl font-bold text-moon-400">{report.nights}</p>
          <p className="mt-1 text-base text-ink-secondary">个共读的夜晚</p>
          <p className="mt-3 text-base text-ink-secondary">
            累计 {report.totalMinutes} 分钟 · 读完 {report.books.length} 本 · 收金句 {report.highlightsTotal} 句
            {report.achievementsUnlocked > 0 && ` · 解锁成就 ${report.achievementsUnlocked} 枚`}
          </p>
          <p className="mt-2 text-base text-ink-secondary">{report.nextWeekHint}</p>
        </TaCard>

        {report.books.length > 0 && (
          <TaCard>
            <h3 className="mb-2 text-base font-bold text-ink-secondary">这一周读过的书</h3>
            <ul className="list-disc pl-5 text-base leading-relaxed">
              {report.books.map((b) => (
                <li key={b.key}>《{b.title}》</li>
              ))}
            </ul>
          </TaCard>
        )}

        {report.highlights.length > 0 && (
          <TaCard>
            <h3 className="mb-2 text-base font-bold text-ink-secondary">收进来的金句</h3>
            <ul className="flex flex-col gap-2 text-base leading-relaxed">
              {report.highlights.map((h, i) => (
                <li key={i} className="text-ink-primary">
                  「{h.text}」
                </li>
              ))}
            </ul>
          </TaCard>
        )}

        {exportError && (
          <p role="alert" className="text-center text-base text-peach-300">
            {exportError}
          </p>
        )}
        <TaButton className="w-full" onClick={() => void downloadPng()} loading={exporting}>
          保存分享卡（1080×1440）
        </TaButton>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <TaButton size="md" variant={week === thisMonday() ? 'primary' : 'secondary'} onClick={() => setWeek(thisMonday())}>
          本周
        </TaButton>
        <TaButton size="md" variant={week === lastMonday() ? 'primary' : 'secondary'} onClick={() => setWeek(lastMonday())}>
          上周
        </TaButton>
      </div>
      {body()}
    </div>
  )
}
