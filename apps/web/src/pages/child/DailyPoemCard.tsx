import { useEffect, useState } from 'react'
import { api, type DailyPoemDto } from '../../lib/api'
import { useSession } from '../../stores/session'

export function DailyPoemCard({ readPoem }: { readPoem: (bookId: string, chapterOrder: number) => void }) {
  const token = useSession(s => s.token)
  const childId = useSession(s => s.childId)
  const [result, setResult] = useState<{ childId: string; data: DailyPoemDto } | null>(null)
  useEffect(() => {
    let active = true
    let requestId = 0
    let timer: ReturnType<typeof setTimeout>
    const load = async () => {
      const id = ++requestId
      if (!token || !childId) return
      try {
        const data = await api.dailyPoem(childId, token)
        if (active && id === requestId) setResult({ childId, data })
      } catch { if (active && id === requestId) setResult(null) }
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
    return () => { active = false; clearTimeout(timer); document.removeEventListener('visibilitychange', visible) }
  }, [token, childId])
  const poem = result?.childId === childId ? result.data.poem : null
  if (!poem) return null
  return <section className="section" aria-labelledby="daily-poem-heading">
    <div className="side-card daily-poem-card">
      <span className="mono-label">每日一诗 · {result!.data.date}</span>
      <h2 id="daily-poem-heading">{poem.title}</h2>
      <p className="daily-poem-author">{poem.author}</p>
      <p className="daily-poem-preview">{poem.preview}</p>
      <button className="sticker-btn primary" onClick={() => readPoem(poem.bookId, poem.chapterOrder)} aria-label={`读这首诗：${poem.title}`}>读这首诗</button>
    </div>
  </section>
}
