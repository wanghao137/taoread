/**
 * 运营摘要（docs/34 P2-10）：自部署体检页，家长角色、不在任何导航里——
 * 直接访问 /ops 才能到达。只读 DB 聚合，不做任何写操作。
 */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, type OpsSummaryDto } from '../lib/api'
import { useSession } from '../stores/session'
import { Loading, ErrorState } from '../components/ui'
import { PageHead } from './child/V8App'

export function OpsPage() {
  const token = useSession((s) => s.token)
  const navigate = useNavigate()
  const [summary, setSummary] = useState<OpsSummaryDto | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    if (!token) return
    setLoading(true)
    setError(null)
    api
      .opsSummary(token)
      .then(setSummary)
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : '摘要生成失败'))
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => load(), [load])

  return (
    <div className="app">
      <div className="wrap">
        <header className="mast">
          <div className="logo">
            <img src="/brand/logo-256.png" alt="桃阅读" />
          </div>
          <div className="brand">
            <h1>桃阅读 · 家庭使用摘要</h1>
            <p>只读摘要 · 家长角色可见 · 不进导航</p>
          </div>
          <div className="mast-actions">
            <button type="button" className="sticker-btn keep" onClick={() => navigate('/parent')}>
              回家长端
            </button>
          </div>
        </header>
        <main className="main">
          <PageHead index="OPS" title="服务体检" sub="书库规模、共读总量与今日成本护栏" />
          {loading ? (
            <Loading label="正在盘点…" />
          ) : error ? (
            <ErrorState message={error} onRetry={load} />
          ) : summary ? (
            <div className="set-grid">
              <div className="panel">
                <h3>书库</h3>
                <p className="mono-line">公版书 {summary.library.booksTotal} 本（中文 {summary.library.booksZh} / 英文 {summary.library.booksEn}）· {summary.library.chapters} 章</p>
                <p className="mono-line">家庭上传书 {summary.library.importedBooks} 本</p>
              </div>
              <div className="panel">
                <h3>家庭</h3>
                <p className="mono-line">当前家庭 {summary.household.families} · 孩子档案 {summary.household.children}</p>
              </div>
              <div className="panel">
                <h3>本家庭阅读</h3>
                <p className="mono-line">本家庭共读会话 {summary.reading.cosessionsMine}（今日 {summary.reading.cosessionsToday}）</p>
                <p className="mono-line">生词 {summary.reading.words} · 共读金句 {summary.reading.highlights} · 划线 {summary.reading.bookHighlights} · 成就 {summary.reading.achievements}</p>
              </div>
              <div className="panel">
                <h3>今日成本护栏</h3>
                <p className="mono-line">TTS 段（本家庭今日）：{summary.costGuards.ttsSegmentsToday}（配额随生成额 ×10，默认 600）</p>
                <p className="mono-line">AI 插画累计 {summary.costGuards.artAssetsTotal} 幅 · 视频累计 {summary.costGuards.videosTotal} 个（每日出网上限默认 60 次）</p>
              </div>
              <div className="panel">
                <h3>近 7 天事件</h3>
                {summary.eventsLast7d.length === 0 ? (
                  <p className="mono-line">（暂无事件）</p>
                ) : (
                  summary.eventsLast7d.map((e) => (
                    <p key={e.event} className="mono-line">
                      {e.event} · {e.count}
                    </p>
                  ))
                )}
              </div>
              <div className="panel">
                <h3>健康</h3>
                <p className="mono-line">摘要生成于 {new Date(summary.generatedAt).toLocaleString()}</p>
                <button type="button" className="sticker-btn sm" onClick={load}>
                  刷新
                </button>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
