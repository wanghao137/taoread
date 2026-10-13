import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../lib/api'
import { audioPlayer } from '../../lib/audioPlayer'
import { useSession } from '../../stores/session'
export function ListeningPage() {
  const { id, source } = useParams()
  const token = useSession(s => s.token)
  const childId = useSession(s => s.childId)
  const familyId = useSession(s => s.familyId)
  const resumeKey = `taoread-listening:${familyId}:${childId}:${source}:${id}`
  const navigate = useNavigate()
  const [book, setBook] = useState<{ title: string; version: string; lang: 'zh' | 'en'; chapters: Array<{ order: number; title: string }> } | null>(null)
  const [order, setOrder] = useState(1)
  const [state, setState] = useState<'idle' | 'preparing' | 'playing' | 'paused'>('idle')
  const [error, setError] = useState('')
  const [continuous, setContinuous] = useState(false)
  const [sleep, setSleep] = useState(0)
  const [spoken, setSpoken] = useState('')
  const [resumeNotice, setResumeNotice] = useState('')
  const segment = useRef(0)
  const lastSavedSegment = useRef(-1)
  const current = useRef(1)
  const autoNext = useRef(false)
  const controller = useRef<AbortController | null>(null)
  const epoch = useRef(0)
  const deadline = useRef(0)
  const sleepMinutes = useRef(0)
  const startRef = useRef<(n: number) => Promise<void>>(async () => {})
  useEffect(() => { autoNext.current = continuous }, [continuous])
  useEffect(() => { sleepMinutes.current = sleep }, [sleep])
  useEffect(() => {
    let live = true; setBook(null); setError(''); setSpoken(''); setOrder(1); current.current = 1; segment.current = 0; lastSavedSegment.current = -1; setResumeNotice('')
    if (!token || !id || !childId) return
    void (source === 'import' ? api.importedBook(token, id, childId).then(x => ({ title: x.book.title, version: String(x.book.contentVersion ?? 1), lang: x.book.lang, chapters: x.book.chapters })) : Promise.all([api.contentBook(id, token), api.contentChapterList(id, token)]).then(([b, c]) => ({ title: b.title, version: b.contentVersion ?? 'legacy', lang: b.lang, chapters: c.chapters }))).then(b => {
      if (!live) return
      setBook({ ...b, lang: b.lang === 'en' ? 'en' : 'zh' })
      try { const saved = JSON.parse(localStorage.getItem(resumeKey) ?? 'null') as { version: string; chapter: number; segment: number } | null
        if (saved && saved.version === b.version && b.chapters.some(ch => ch.order === saved.chapter) && Number.isInteger(saved.segment) && saved.segment >= 0) { setOrder(saved.chapter); current.current = saved.chapter; segment.current = saved.segment; setResumeNotice(`本机上次听到第 ${saved.chapter} 章第 ${saved.segment + 1} 段；开始后从这一段重新听。`) }
        else if (saved) setResumeNotice('正文版本已更新，旧听读位置未自动套用；请重新选择章节。')
      } catch { /* invalid local resume is ignored */ }
    }).catch(err => { if (live) setError(err instanceof Error ? err.message : '书目没有加载成功') })
    return () => { live = false }
  }, [token, childId, id, source, resumeKey])
  const stop = useCallback(() => { epoch.current++; controller.current?.abort(); audioPlayer.stop(); setState('idle'); deadline.current = 0 }, [])
  const start = useCallback(async (next: number, fromSegment = 0) => {
    if (!book || !id || next < 1 || next > book.chapters.length) return
    epoch.current++; const request = epoch.current
    controller.current?.abort(); audioPlayer.stop(); audioPlayer.prime()
    controller.current = new AbortController(); setError(''); setSpoken(''); setState('preparing'); setOrder(next); current.current = next
    if (!deadline.current && sleepMinutes.current) deadline.current = Date.now() + sleepMinutes.current * 60000
    segment.current = fromSegment; lastSavedSegment.current = -1
    try {
      const started = await audioPlayer.speakChapter(id, next, { title: book.chapters[next - 1]!.title, bookTitle: book.title }, { lang: book.lang, startSegment: fromSegment, signal: controller.current.signal })
      if (request !== epoch.current) return
      setState(started ? 'playing' : 'paused')
      if (!started) setError(fromSegment ? '续播段暂未准备好，可以继续重试，或选择章节后从头听。' : '音频未能自动开始，请点继续；这不会跳过当前章节。')
    } catch (err) { if (request === epoch.current) { setState('idle'); setError(err instanceof Error ? err.message : '朗读准备失败，请重试') } }
  }, [book, id])
  startRef.current = start
  useEffect(() => {
    const offEnd = audioPlayer.onEnd(() => {
      if (autoNext.current && book && current.current < book.chapters.length && (!deadline.current || Date.now() < deadline.current)) void startRef.current(current.current + 1)
      else {
        setState('idle'); deadline.current = 0; segment.current = 0
        try { localStorage.setItem(resumeKey, JSON.stringify({ version: book?.version, chapter: current.current, segment: 0, updatedAt: Date.now() })) } catch { /* no local persistence */ }
        setResumeNotice('本章听读已结束；再次开始将从章首听，不计作读完或理解能力。')
      }
    })
    const offError = audioPlayer.onError(message => { setError(message); setState('paused') })
    const offProgress = audioPlayer.onProgress(p => {
      if (!book) return
      setSpoken(p.text)
      segment.current = p.segmentIndex ?? p.index
      if (lastSavedSegment.current === segment.current) return
      lastSavedSegment.current = segment.current
      try { localStorage.setItem(resumeKey, JSON.stringify({ version: book.version, chapter: current.current, segment: segment.current, updatedAt: Date.now() })) }
      catch { setResumeNotice('本机存储不可用，离开页面后无法续播；当前听读仍可继续。') }
    })
    const offState = audioPlayer.onState(value => setState(value))
    const offNotice = audioPlayer.onNotice(message => setError(message))
    const timer = window.setInterval(() => { if (deadline.current && Date.now() >= deadline.current) { stop(); setError('定时结束，可以安心休息了') } }, 1000)
    if ('mediaSession' in navigator) { try { navigator.mediaSession.setActionHandler('nexttrack', () => { void startRef.current(current.current + 1) }); navigator.mediaSession.setActionHandler('previoustrack', () => { void startRef.current(current.current - 1) }) } catch { /* Some browsers do not support track actions. */ } }
    return () => { offEnd(); offError(); offProgress(); offNotice(); offState(); window.clearInterval(timer); stop(); if ('mediaSession' in navigator) { try { navigator.mediaSession.setActionHandler('nexttrack', null); navigator.mediaSession.setActionHandler('previoustrack', null) } catch { /* unavailable */ } } }
  }, [book, stop, resumeKey])
  async function resume() {
    const request = epoch.current
    audioPlayer.prime()
    const ok = await audioPlayer.resumeQueue()
    if (request !== epoch.current) return
    if (ok) setState('playing')
    else void start(order, segment.current)
  }
  return <section className="panel listening-page"><button className="sticker-btn" onClick={() => navigate(source === 'import' ? `/child/family-book/${encodeURIComponent(id ?? '')}` : `/child/book/${encodeURIComponent(id ?? '')}`)}>返回这本书</button><h1>{book?.title ?? '正在准备听读…'}</h1><h2>第 {order} 章 · {book?.chapters[order - 1]?.title}</h2><p>合成朗读。连续听读默认关闭；锁屏和后台播放由设备浏览器支持情况决定，中断后可点继续。</p><p role="status">{resumeNotice} 听读位置只保留在这台设备，不计作读完或理解能力。</p><div className="hero-actions"><button className="sticker-btn primary" disabled={!book || state === 'preparing'} onClick={() => { if (state === 'playing') { audioPlayer.pause(); setState('paused') } else if (state === 'paused') { void resume() } else { deadline.current = sleep ? Date.now() + sleep * 60000 : 0; void start(order, segment.current) } }}>{state === 'preparing' ? '正在准备…' : state === 'playing' ? '暂停' : state === 'paused' ? '继续' : '开始听读'}</button><button className="sticker-btn" onClick={stop}>停止</button><button className="sticker-btn" disabled={order <= 1} onClick={() => void start(order - 1)}>上一章</button><button className="sticker-btn" disabled={!book || order >= book.chapters.length} onClick={() => void start(order + 1)}>下一章</button></div><fieldset className="reading-options"><legend>听读安排</legend><label><input type="checkbox" checked={continuous} onChange={e => setContinuous(e.target.checked)} />本章结束后继续下一章</label><label>定时停止<select value={sleep} onChange={e => { const minutes = Number(e.target.value); setSleep(minutes); deadline.current = state === 'playing' || state === 'paused' ? (minutes ? Date.now() + minutes * 60000 : 0) : 0 }}><option value={0}>不限时</option><option value={5}>5 分钟</option><option value={15}>15 分钟</option><option value={30}>30 分钟</option></select></label></fieldset>{error && <p role="alert">{error}</p>}<p aria-live="off">{spoken}</p><label>选择开始章节<select value={order} onChange={e => { stop(); setOrder(Number(e.target.value)); current.current = Number(e.target.value); segment.current = 0; setResumeNotice('已选择新章节，将从章首开始听。') }}>{book?.chapters.map(ch => <option key={ch.order} value={ch.order}>{ch.order}. {ch.title}</option>)}</select></label></section>
}
