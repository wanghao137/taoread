import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { DisclosureSummary } from './ui/DisclosureSummary'
import { IconClock } from './ui/icons'

export function FeedbackForm({ token, bookId, version, chapter, position }: { token: string; bookId?: string; version?: string; chapter?: number; position?: number }) {
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('text')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  return <details className="panel feedback-form"><summary>帮助与反馈{bookId ? ' · 反馈当前内容' : ''}</summary><p>只发送你填写的文字{bookId ? '和当前书、章、版本位置' : ''}。请勿填写真实姓名、家庭码或联系方式；不会上传录音。</p><form onSubmit={event => { event.preventDefault(); setBusy(true); void api.submitFeedback(token, { bookId, version, chapter, position, category, message }).then(() => { setStatus('已收到，家长可以在设置里查看处理状态。'); setMessage('') }).catch(err => setStatus(err instanceof Error ? err.message : '提交失败，请重试')).finally(() => setBusy(false)) }}><label>问题类型<select value={category} onChange={event => setCategory(event.target.value)}><option value="text">原文或排版</option><option value="pronunciation">读音</option><option value="translation">译文</option><option value="technical">功能故障</option><option value="other">其他建议</option></select></label><label>描述问题<textarea required minLength={3} maxLength={1000} value={message} onChange={event => setMessage(event.target.value)} /></label><button className="sticker-btn" disabled={busy || message.trim().length < 3}>提交反馈</button></form>{status && <p role="status">{status}</p>}</details>
}
const feedbackLabels: Record<string, string> = { open: '待处理', triaged: '正在核查', resolved: '已处理', duplicate: '已合并处理' }
export function FeedbackHistory({ token }: { token: string }) {
  const [items, setItems] = useState<Array<{ id: string; message: string; status: string; resolution: string | null }>>([])
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  useEffect(() => { let live = true; setItems([]); setError(''); void api.feedback(token).then(x => { if (live) { setItems(x.feedback); setError('') } }).catch(() => { if (live) setError('反馈记录未加载成功') }); return () => { live = false } }, [token, retry])
  return <details className="panel"><summary>我的反馈处理记录</summary>{error && <p role="alert">{error}<button className="sticker-btn" onClick={() => setRetry(x => x + 1)}>重试</button></p>}{items.map(x => <p key={x.id}><strong>{feedbackLabels[x.status] ?? '待核查'}</strong> · {x.message}{x.resolution && <span> · {x.resolution}</span>}</p>)}{!error && !items.length && <p>提交的反馈会出现在这里。</p>}</details>
}
export function WeeklyPlan({ token, childId }: { token: string; childId: string }) {
  const [days, setDays] = useState<number[]>([])
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('')
  const [ready, setReady] = useState(false)
  useEffect(() => { let live = true; setReady(false); void api.readingPlan(childId, token).then(x => { if (!live) return; setDays(x.plan ? JSON.parse(x.plan.days) as number[] : []); setNote(x.plan?.note ?? ''); setReady(true) }).catch(() => { if (live) setStatus('安排未加载，请刷新后再试') }); return () => { live = false } }, [childId, token])
  return <details className="panel"><summary>可选的每周共读安排</summary><p>约定哪天一起读，随时调整或取消。孩子可以自由阅读，没有补签、积分或必须完成的任务。</p><div className="setting-row">{['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map((day, i) => <button className="filter" key={day} disabled={!ready} aria-pressed={days.includes(i)} onClick={() => setDays(old => old.includes(i) ? old.filter(x => x !== i) : [...old, i])}>{day}</button>)}</div><label>一起读什么<input value={note} maxLength={200} onChange={e => setNote(e.target.value)} placeholder="例如：周三一起读一首小诗" /></label><button className="sticker-btn" disabled={!ready} onClick={() => void api.saveReadingPlan(childId, token, days, note).then(() => setStatus(days.length ? '已保存，可随时取消' : '已取消安排，阅读记录仍然保留')).catch(err => setStatus(err instanceof Error ? err.message : '保存失败'))}>保存安排</button><button className="sticker-btn" disabled={!ready} onClick={() => void api.saveReadingPlan(childId, token, [], '').then(() => { setDays([]); setNote(''); setStatus('已取消，阅读记录仍然保留') }).catch(() => setStatus('取消失败，请重试'))}>取消安排</button>{status && <p role="status">{status}</p>}</details>
}
export function RecentReading({ token, childId }: { token: string; childId: string }) {
  const navigate = useNavigate()
  const [items, setItems] = useState<Awaited<ReturnType<typeof api.recentReading>>['items']>([])
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)
  useEffect(() => { let live = true; setItems([]); setError(false); void api.recentReading(childId, token).then(x => { if (live) setItems(x.items) }).catch(() => { if (live) setError(true) }); return () => { live = false } }, [token, childId, retry])
  return <details className="quiet-disclosure recent-reading"><DisclosureSummary icon={<IconClock />} title="最近读过" hint="找到上次那一本，接着读下去" />{error ? <p role="alert">最近阅读未加载。<button className="sticker-btn" onClick={() => setRetry(x => x + 1)}>重试</button></p> : items.length ? items.map(x => <div key={`${x.source}:${x.bookId ?? x.title}`} className="recent-row"><span><b>{x.title}</b> · {x.source === 'public' ? '桃书库' : x.source === 'import' ? '家庭书' : x.source === 'paper' ? '纸书记录' : '微信读书记录'}</span>{x.available && x.bookId ? <button className="sticker-btn" onClick={() => navigate(x.source === 'public' ? `/child/book/${encodeURIComponent(x.bookId!)}/chapter/${x.chapter ?? 1}` : `/child/family-book/${encodeURIComponent(x.bookId!)}/chapter/${x.chapter ?? 1}`)}>继续读</button> : <span>阅读记录保留；{x.source === 'import' ? '请从家庭书目录重新选章' : '请在纸书或微信读书中阅读正文'}</span>}</div>) : <p>开始读一本书，续读入口就会留在这里。</p>}</details>
}
