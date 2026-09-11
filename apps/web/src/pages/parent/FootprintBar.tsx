import { useEffect, useState } from 'react'
import { api, type WeeklyReportDataDto } from '../../lib/api'

/** 本周足迹摘要条（今晚 Tab 顶部）：轻量复用周报聚合 */
export function FootprintBar({ familyId, token }: { familyId: string; token: string }) {
  const [report, setReport] = useState<WeeklyReportDataDto | null>(null)

  useEffect(() => {
    let alive = true
    api
      .weeklyReport(familyId, token)
      .then(({ report: r }) => alive && setReport(r))
      .catch(() => undefined) // 摘要条失败静默（不抢主内容错误态）
    return () => {
      alive = false
    }
  }, [familyId, token])

  if (!report) return null
  return (
    <div
      data-testid="footprint-bar"
      className="mb-4 rounded-2xl border border-night-border bg-night-800/60 px-4 py-3 text-base text-ink-secondary"
    >
      本周足迹：共读 <span className="font-bold text-moon-400">{report.nights}</span> 晚 ·{' '}
      <span className="font-bold text-moon-400">{report.totalMinutes}</span> 分钟
    </div>
  )
}
