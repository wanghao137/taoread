import { useEffect, useState } from 'react'
import { api, type WeeklyReportDataDto } from '../../lib/api'

/**
 * 本周阅读足迹摘要条（今天 Tab 顶部）：轻量复用周报聚合。
 * UI 复盘：原为单行文字的空壳卡，改为四格统计卡，一屏读全本周数据。
 */
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
  const stats = [
    { label: '共读天数', value: `${report.nights} 天` },
    { label: '累计时长', value: `${report.totalMinutes} 分钟` },
    { label: '读过的书', value: `${report.books.length} 本` },
    { label: '收下的金句', value: `${report.highlightsTotal} 句` },
  ]
  return (
    <div
      data-testid="footprint-bar"
      className="mb-4 rounded-2xl border-ink border-2 bg-paper-200 px-4 py-3 shadow-xs"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-block -rotate-2 rounded-lg border-ink border-[1.5px] bg-sun px-1.5 py-0.5 text-xs font-bold text-ink-900">
          本周足迹
        </span>
        <span className="text-xs text-ink-700">{report.nextWeekHint}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-paper-100 px-3 py-2 ring-1 ring-paper-border">
            <p className="text-[11px] text-ink-700">{s.label}</p>
            <p className="text-base font-bold text-terra-600">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
