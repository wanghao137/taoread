import { useEffect, useState } from 'react'
import { api, type WeeklyReportDataDto } from '../../lib/api'

/** 本周阅读足迹摘要条（今天 Tab 顶部）：轻量复用周报聚合 */
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
      className="mb-4 rounded-2xl border-ink border-2 bg-paper-200 px-4 py-3 text-base text-ink-700 shadow-xs"
    >
      <span className="mr-1 inline-block -rotate-2 rounded-lg border-ink border-[1.5px] bg-sun px-1.5 py-0.5 text-xs font-bold text-ink-900">
        本周足迹
      </span>
      共读 <span className="font-bold text-terra-600">{report.nights}</span> 天 ·{' '}
      <span className="font-bold text-terra-600">{report.totalMinutes}</span> 分钟
    </div>
  )
}
