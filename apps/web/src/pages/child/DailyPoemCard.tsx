import { useEffect, useState } from 'react'
import { api, type DailyPoemDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { useNavigate } from 'react-router-dom'
import { IconArrowRight } from '../../components/ui/icons'

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
  const failed = errorChild === childId && Boolean(errorChild)
  return <section className={`daily-poem-card${poem && poem.title.length > 6 ? ' has-long-title' : ''}`} aria-labelledby="daily-poem-heading" aria-busy={!poem && !failed}>
    <img className="poem-scenery" src="/art/reading-desk/poem-scenery-reference.webp" width="210" height="227" alt="" aria-hidden="true" />
    <span className="poem-label">每日一诗</span>
    {poem ? <>
      <h3 id="daily-poem-heading"><span className="poem-title-text" title={poem.title}>{poem.title}</span><span className="poem-author"><span className="poem-author-separator" aria-hidden="true"> · </span>{poem.author}</span></h3>
      <p className="daily-poem-preview">{(poem.preview.match(/[^，。！？；\r\n]+[，。！？；]?/gu) ?? [poem.preview]).slice(0, 2).map((line, index) => <span className="daily-poem-line" key={index}>{line.trim()}</span>)}</p>
      <button className="sticker-btn poem-action" onClick={() => readPoem(poem.bookId, poem.chapterOrder)} aria-label={`读这首诗：${poem.title}`}>读一首<IconArrowRight size={26} /></button>
    </> : <>
      <h3 id="daily-poem-heading">{failed ? '小诗还在路上' : '找一首今日小诗…'}</h3>
      <p className="poem-status" role="status">{failed ? '再试一次，或去诗歌书单挑一首。' : '一首小诗，装下一个小世界。'}</p>
      {failed && <div className="poem-retry"><button className="sticker-btn" onClick={() => setRetry(n => n + 1)}>再取一次</button><button className="text-action min-h-[44px]" onClick={() => navigate('/child/discover?collection=bedtime-poems')}>去诗歌书单<IconArrowRight size={18} /></button></div>}
    </>}
  </section>
}
