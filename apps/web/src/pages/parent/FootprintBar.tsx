import { useEffect, useState } from 'react'
import { api, type WeeklyReportDataDto } from '../../lib/api'

/**
 * 本周阅读足迹摘要（今天 Tab 顶部）：轻量复用周报聚合。
 * v8 语言：标签胶囊 + 四色 metric 贴纸卡，一屏读全本周数据。
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
    <section data-testid="footprint-bar" style={{ paddingTop: 6 }}>
      <div className="section-head" style={{ marginBottom: 4 }}>
        <span className="tag">本周足迹</span>
        <p>{report.nextWeekHint}</p>
      </div>
      <div className="metrics tight four">
        {stats.map((s) => (
          <div key={s.label} className="metric">
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}
