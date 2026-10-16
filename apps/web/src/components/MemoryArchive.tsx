import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, type BookHighlightDto } from '../lib/api'
export function MemoryArchive({ token, childId }: { token: string; childId: string }) {
  const navigate = useNavigate()
  const [quotes, setQuotes] = useState<BookHighlightDto[]>([])
  const [memories, setMemories] = useState<Array<{ id: string; text: string; source: string; createdAt: string }>>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [memoryCursor, setMemoryCursor] = useState<string | null>(null)
  const [month, setMonth] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const [retry, setRetry] = useState(0)
  const generation = useRef(0)
  useEffect(() => {
    generation.current++
    let live = true; setQuotes([]); setMemories([]); setCursor(null); setMemoryCursor(null); setMonth(''); setBusy(true)
    void Promise.all([api.listBookHighlights(childId, token), api.readingArchive(childId, token)]).then(([a, b]) => { if (live) { setQuotes(a.highlights); setCursor(a.nextCursor); setMemories(b.highlights); setMemoryCursor(b.next); setStatus('') } }).catch(() => { if (live) setStatus('阅读记忆未加载成功，请重试') }).finally(() => { if (live) setBusy(false) })
    const scope = generation
    return () => { live = false; scope.current++ }
  }, [token, childId, retry])
  async function more() {
    const epoch = generation.current
    setBusy(true)
    try {
      if (cursor) { const a = await api.listBookHighlights(childId, token, undefined, cursor); if (epoch !== generation.current) return; setQuotes(old => [...new Map([...old, ...a.highlights].map(x => [x.id, x])).values()]); setCursor(a.nextCursor) }
      if (memoryCursor) { const b = await api.readingArchive(childId, token, memoryCursor); if (epoch !== generation.current) return; setMemories(old => [...new Map([...old, ...b.highlights].map(x => [x.id, x])).values()]); setMemoryCursor(b.next) }
      setStatus('')
    } catch { if (epoch === generation.current) setStatus('更早的记忆未加载，请重试') }
    finally { if (epoch === generation.current) setBusy(false) }
  }
  const matches = (date: string) => !month || date.slice(0, 7) === month
  return <section className="panel memory-archive"><h3>我的阅读记忆档案</h3><label className="archive-month">按月份筛选<input className="field" type="month" value={month} onChange={e => setMonth(e.target.value)} /></label><p>只展示当前小读者的记录。月份筛选适用于已加载内容，可继续加载更早记录。</p>{memories.filter(x => matches(x.createdAt)).map(x => <blockquote key={x.id}>{x.text}<small>{new Date(x.createdAt).toLocaleDateString('zh-CN')} · 共读金句</small></blockquote>)}{quotes.filter(x => matches(x.createdAt)).map(x => <blockquote key={x.id}>{x.text}<small>《{x.bookTitle}》 · 第 {x.chapterOrder} 章</small><button className="sticker-btn" onClick={() => navigate(`/child/book/${encodeURIComponent(x.bookId)}/chapter/${x.chapterOrder}?block=${x.blockOrder}`)}>回到原文</button></blockquote>)}{status && <p role="alert">{status}<button className="sticker-btn" onClick={() => setRetry(x => x + 1)}>重新加载</button></p>}{(cursor || memoryCursor) && <button className="sticker-btn" disabled={busy} onClick={() => void more()}>{busy ? '正在加载…' : '加载更早的阅读记忆'}</button>}{!busy && !status && !quotes.length && !memories.length && <p>在阅读中收藏句子，或留下共读金句，就会保存在这里。</p>}</section>
}
