import { useEffect, useState } from 'react'
import { api, type DailyPoemDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { useNavigate } from 'react-router-dom'

export function DailyPoemCard({ readPoem }: { readPoem: (bookId: string, chapterOrder: number) => void }) {
  const token = useSession(s => s.token)
  const childId = useSession(s => s.childId)
  const [result, setResult] = useState<{ childId: string; data: DailyPoemDto } | null>(null)
  const [errorChild, setErrorChild] = useState<string | null>(null)
  const [retry, setRetry] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    let active = true
    let requestId = 0
    let timer: ReturnType<typeof setTimeout>
    let retryTimer: ReturnType<typeof setTimeout>
    setErrorChild(null)
    const load = async (attempt = 0) => {
      const id = ++requestId
      if (!token || !childId) return
      try {
        const data = await api.dailyPoem(childId, token)
        if (active && id === requestId) { setResult({ childId, data }); setErrorChild(null) }
      } catch {
        if (active && id === requestId) {
          if (attempt === 0) retryTimer = setTimeout(() => { if (active && id === requestId) void load(1) }, 1200)
          else { setResult(null); setErrorChild(childId) }
        }
      }
    }
    const schedule = () => {
      clearTimeout(timer)
      const now = Date.now()
      const shanghai = now + 8 * 3600_000
      timer = setTimeout(() => { void load(); schedule() }, 86400_000 - shanghai % 86400_000 + 1000)
    }
    const visible = () => { if (document.visibilityState === 'visible') void load() }
    void load(); schedule()
    document.addEventListener('visibilitychange', visible)
    return () => { active = false; clearTimeout(timer); clearTimeout(retryTimer); document.removeEventListener('visibilitychange', visible) }
  }, [token, childId, retry])
  const poem = result?.childId === childId ? result.data.poem : null
  if (errorChild && errorChild === childId) return <section className="section"><div className="side-card"><h2>今日小诗</h2><p role="status">暂时没有取到小诗，其他书仍然可以读。</p><div className="setting-row"><button className="sticker-btn" onClick={() => setRetry(n => n + 1)}>再取一次</button><button className="sticker-btn" onClick={() => navigate('/child/discover?collection=bedtime-poems')}>去诗歌书单</button></div></div></section>
  if (!poem) return null
  return <section className="section" aria-labelledby="daily-poem-heading">
    <div className="side-card daily-poem-card">
      <span className="mono-label">每日一诗 · {result!.data.date}</span>
      <h2 id="daily-poem-heading">{poem.title}</h2>
      <p className="daily-poem-author">{poem.author}</p>
      <p className="daily-poem-preview">{(poem.preview.match(/[^，。！？；\r\n]+[，。！？；]?/gu) ?? [poem.preview]).map((line, index) => <span className="daily-poem-line" key={index}>{line.trim()}</span>)}</p>
      <button className="sticker-btn primary" onClick={() => readPoem(poem.bookId, poem.chapterOrder)} aria-label={`读这首诗：${poem.title}`}>读这首诗</button>
    </div>
  </section>
}
