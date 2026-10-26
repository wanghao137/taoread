import { uid } from '../../../lib/uid'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { PhonicsAttemptDto, PhonicsEventRequest, PhonicsLearningInput, PhonicsNextDto } from '@taoread/shared'
import { useSession } from '../../../stores/session'
import { ApiError, API_BASE } from '../../../lib/api'
import { audioPlayer } from '../../../lib/audioPlayer'
import { tts } from '../../../lib/tts'
import { phonicsApi } from './api'
import { PhonicsAudio } from './phonicsAudio'
import { phonicsSfx } from './phonicsSfx'
import { WordCards } from './WordCards'
import './phonics.css'

type StartBody = Parameters<typeof phonicsApi.start>[2]
type Pending = { type: 'start'; body: StartBody } | { type: 'event'; id: string; body: PhonicsEventRequest } | { type: 'control'; id: string; action: 'pause' | 'resume' | 'finish'; body: { clientEventId: string; expectedRevision: number } }
const message = (error: unknown) => error instanceof Error ? error.message : '没能保存，请再试一次'
function readPending(key: string): Pending | null {
  try { const value = sessionStorage.getItem(key); return value ? JSON.parse(value) as Pending : null } catch { return null }
}

export function PhonicsPage() {
  const { token, childId, familyId } = useSession()
  return token && childId ? <PhonicsHome key={`${familyId}:${childId}:${token}`} token={token} childId={childId} /> : <main className="phonics-page"><p>请先选择孩子档案。</p><Link to="/child/today">回到今天</Link></main>
}

function PhonicsHome({ token, childId }: { token: string; childId: string }) {
  const navigate = useNavigate()
  const calmMode = useSession(s => s.calmMode)
  const [next, setNext] = useState<PhonicsNextDto | null>(null)
  const [readers, setReaders] = useState<Array<{ id: string; titleZh: string; versionId: string }>>([])
  const [attempt, setAttempt] = useState<PhonicsAttemptDto | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const pendingKey = `taoread-phonics-pending:${childId}`
  const pending = useRef<Pending | null>(readPending(pendingKey))
  const [failed, setFailed] = useState(Boolean(pending.current))
  const live = useRef(true)
  const lock = useRef(false)
  const engine = useRef<PhonicsAudio | null>(null)
  useEffect(() => {
    phonicsSfx.init()
    return () => undefined
  }, [])
  useEffect(() => { phonicsSfx.setCalmMode(calmMode) }, [calmMode])
  const refresh = useCallback(async () => {
    const [n, r] = await Promise.allSettled([phonicsApi.next(token, childId), phonicsApi.readers(token, childId)])
    if (n.status === 'rejected') throw n.reason
    if (live.current) {
      setNext(n.value.next); setReaders(r.status === 'fulfilled' ? r.value.readers : [])
      if (r.status === 'rejected' && !['disabled', 'unavailable'].includes(n.value.next.reason)) setError('阅读材料暂时没有取到，可以重新加载')
    }
  }, [token, childId])
  useEffect(() => {
    live.current = true
    audioPlayer.stop(); tts.stop()
    void refresh().catch(e => { if (live.current) setError(message(e)) })
    const stop = () => engine.current?.stop()
    const dispose = () => engine.current?.dispose()
    const hidden = () => { if (document.hidden) stop() }
    document.addEventListener('visibilitychange', hidden)
    return () => { live.current = false; dispose(); document.removeEventListener('visibilitychange', hidden) }
  }, [refresh])

  function savePending(value: Pending | null) {
    pending.current = value
    try { if (value) sessionStorage.setItem(pendingKey, JSON.stringify(value)); else sessionStorage.removeItem(pendingKey) } catch { /* memory still preserves retries in this page */ }
  }
  async function execute(command: Pending) {
    if (lock.current) return
    lock.current = true; setBusy(true); setError(''); setFailed(false)
    engine.current?.stop()
    savePending(command)
    try {
      const response = command.type === 'start' ? await phonicsApi.start(token, childId, command.body)
        : command.type === 'event' ? await phonicsApi.event(token, command.id, command.body)
        : await phonicsApi.control(token, command.id, command.action, command.body)
      if (!live.current) return
      savePending(null); setAttempt(response.attempt)
      if (response.attempt.status === 'completed' || response.attempt.status === 'paused') await refresh()
    } catch (e) {
      if (!live.current) return
      if (e instanceof ApiError && e.status >= 400 && e.status < 500) {
        savePending(null)
        // A rejected/stale request did not save. Recover the authoritative task instead.
        if (command.type !== 'start') {
          try { const latest = await phonicsApi.attempt(token, command.id); if (live.current) setAttempt(latest.attempt) } catch { /* keep original error */ }
        }
        await refresh().catch(() => undefined)
      } else setFailed(true)
      setError(message(e))
    } finally { lock.current = false; if (live.current) setBusy(false) }
  }
  async function openNext() {
    if (!next || busy || failed) return
    if (next.attemptId) {
      setBusy(true); setError('')
      try { const result = await phonicsApi.attempt(token, next.attemptId); if (live.current) setAttempt(result.attempt) }
      catch (e) { if (live.current) setError(message(e)) } finally { if (live.current) setBusy(false) }
    } else if (next.versionId && next.planKind) void execute({ type: 'start', body: { clientAttemptId: uid(), versionId: next.versionId, planKind: next.planKind, ...(next.resourceKey ? { resourceKey: next.resourceKey } : {}) } })
  }
  function event(input: PhonicsLearningInput) {
    if (!attempt || pending.current) return
    void execute({ type: 'event', id: attempt.id, body: { ...input, clientEventId: uid(), expectedRevision: attempt.revision, taskInstanceId: attempt.state.taskInstanceId } })
  }
  function control(action: 'pause' | 'resume' | 'finish') {
    if (!attempt || pending.current) return
    void execute({ type: 'control', id: attempt.id, action, body: { clientEventId: uid(), expectedRevision: attempt.revision } })
  }
  const active = attempt && ['started', 'paused'].includes(attempt.status)
  return <section className="phonics-page" aria-label="英语声音小课堂" lang="zh-CN">
    <div className="phonics-top"><h1>英语声音小课堂</h1><button className="sticker-btn" onClick={() => { engine.current?.stop(); navigate('/child/today') }}>回到今天</button></div>
    {error && <div role="alert" className="phonics-notice">{error}</div>}
    {failed && <div className="phonics-notice"><p>刚才的记录还没有确认。先重新保存，再接着玩。</p><button className="sticker-btn hot" disabled={busy} onClick={() => { if (pending.current) void execute(pending.current) }}>重新保存</button></div>}
    {active ? !attempt.available ? <section className="phonics-sheet"><h2>先休息一下</h2><p>这份英语内容暂时不能使用，请家长帮忙看看。</p><button className="sticker-btn" disabled={busy || failed} onClick={() => control('pause')}>保存并暂停</button></section>
      : attempt.status === 'paused' ? <section className="phonics-sheet"><p className="phonics-kicker">上次的进度还在</p><h2 className="phonics-heading">准备好了，再接着玩</h2><button className="sticker-btn hot" disabled={busy || failed} onClick={() => control('resume')}>接着玩</button></section>
      : <Classroom key={`${attempt.id}:${attempt.state.taskInstanceId}`} attempt={attempt} blocked={busy || failed} engine={engine} onEvent={event} onPause={() => control('pause')} onFinish={() => control('finish')} />
      : <>
        <section className="phonics-sheet">
          <p className="phonics-kicker">听一听 · 拼一拼 · 试着读</p>
          <h2 className="phonics-heading">{attempt?.status === 'completed' ? '今天试过了，也练过了' : next?.label ?? '正在找上次的进度…'}</h2>
          <p className="phonics-hint">{attempt?.status === 'completed' ? '可以到这里，也可以再读一张喜欢的词卡。' : '先点喇叭听，再跟着做。想休息时，随时停下来。'}</p>
          <div className="phonics-actions">
            {next?.versionId && <button className="sticker-btn hot" disabled={busy || failed} onClick={() => void openNext()}>{busy ? '正在准备…' : next.label}</button>}
            {error && !failed && <button className="sticker-btn" disabled={busy} onClick={() => { setError(''); void refresh().catch(e => setError(message(e))) }}>重新加载</button>}
          </div>
        </section>
        {readers.length > 0 && <section className="phonics-readers"><h2>还想再读</h2>{readers.map(reader => <div className="phonics-reader-row" key={reader.id}><b>{reader.titleZh}</b><button className="sticker-btn" disabled={busy || failed || next?.reason === 'continue'} onClick={() => void execute({ type: 'start', body: { clientAttemptId: uid(), versionId: reader.versionId, planKind: 'reread', resourceKey: reader.id } })}>再读一次</button></div>)}</section>}
        <WordCards token={token} childId={childId} blocked={busy || failed} />
        <details className="phonics-readers"><summary>原来的练习记录</summary><p>以前的字形练习保留在草稿入口，由家长决定是否查看。</p><Link to="/child/phonics/draft">查看旧草稿</Link></details>
      </>}
  </section>
}

function Classroom({ attempt, blocked, engine, onEvent, onPause, onFinish }: {
  attempt: PhonicsAttemptDto; blocked: boolean; engine: React.MutableRefObject<PhonicsAudio | null>
  onEvent: (input: PhonicsLearningInput) => void; onPause: () => void; onFinish: () => void
}) {
  const { task, state } = attempt
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [heard, setHeard] = useState(false)
  const [audioError, setAudioError] = useState('')
  const [reload, setReload] = useState(0)
  const [answer, setAnswer] = useState<string[]>([])
  const [time, setTime] = useState(-1)
  const assetKey = attempt.assets.map(a => `${a.id}:${a.url}`).join('|')
  const current = useRef(attempt)
  current.current = attempt
  useEffect(() => { setHeard(false); setAnswer([]); setTime(-1) }, [state.taskInstanceId])
  useEffect(() => {
    const player = new PhonicsAudio()
    engine.current = player
    let live = true
    setReady(false); setPlaying(false); setAudioError('')
    const images = current.current.assets.filter(a => a.purpose === 'image').map(async asset => {
      if (!asset.url) throw new Error('图片还没有准备好，请重试')
      const image = new Image()
      image.src = asset.url.startsWith('/') ? `${API_BASE}${asset.url}` : asset.url
      await image.decode()
    })
    void Promise.all([player.prepare(current.current.assets), ...images]).then(() => { if (live) setReady(true) }).catch(e => { if (live) setAudioError(message(e)) })
    return () => { live = false; player.dispose(); if (engine.current === player) engine.current = null }
  }, [attempt.id, state.taskInstanceId, assetKey, reload, engine])
  async function play(help = false) {
    if (!task || !engine.current || blocked) return
    const player = engine.current
    const ids = help ? [attempt.helpAssetId ?? task.stimulusAssetId ?? task.instructionAssetId]
      : [task.instructionAssetId, ...(task.stimulusAssetId ? [task.stimulusAssetId] : [])]
    setPlaying(true); setAudioError(''); setTime(-1)
    try {
      const finished = await player.play(ids, (id, ms) => { if (engine.current === player && id === task.stimulusAssetId) setTime(ms) })
      if (engine.current === player && finished) {
        setHeard(true); setTime(-1)
        if (heard && !help && !state.resolved) onEvent({ kind: 'stimulus_replayed', payload: {} })
      }
    } catch (e) { if (engine.current === player) setAudioError(message(e)) }
    finally { if (engine.current === player) setPlaying(false) }
  }
  const disabled = blocked || !ready || playing
  const sfxOn = useSyncExternalStore(phonicsSfx.subscribe, () => phonicsSfx.enabled, () => phonicsSfx.enabled)
  useEffect(() => {
    // 反馈音只在结果定格时响一次；undefined（未观察/听取 ack）保持安静
    if (!state.resolved) return
    if (state.correct === true) phonicsSfx.play('correct')
    else if (state.correct === false) phonicsSfx.play('try')
  }, [state.resolved, state.correct])
  const page = attempt.reader?.pages[state.pageIndex]
  const imageId = page?.imageAssetId ?? task?.imageAssetId
  const image = attempt.assets.find(a => a.id === imageId)?.url
  const empty = (kind: 'step_ack' | 'step_advanced' | 'hint_requested' | 'retry_requested' | 'task_skipped_with_help' | 'reader_page_advanced') => {
    if (kind === 'step_advanced' || kind === 'reader_page_advanced') phonicsSfx.play('tap')
    onEvent({ kind, payload: {} })
  }
  if (!task) return <section className="phonics-sheet"><h2 className="phonics-heading">这一段练完了</h2><p>练习已经保存。点一下，给今天收个尾。</p><button className="sticker-btn hot" disabled={blocked} onClick={() => { phonicsSfx.play('finish'); onFinish() }}>完成这一段</button></section>
  return <section className="phonics-sheet" aria-busy={blocked}>
    <div className="phonics-top"><span>第 {state.stepIndex + 1} / {attempt.stepCount} 个小活动</span><span className="phonics-top-actions"><button className="sticker-btn" aria-pressed={sfxOn} aria-label={sfxOn ? '关掉按键声音' : '打开按键声音'} onClick={() => phonicsSfx.setPreference(!sfxOn)}>{sfxOn ? '🔊' : '🔇'}</button><button className="sticker-btn" disabled={blocked} onClick={onPause}>先休息</button></span></div>
    <div className="phonics-progress" aria-label={`进度 ${state.stepIndex + 1}/${attempt.stepCount}`}><span style={{ width: `${state.stepIndex / attempt.stepCount * 100}%` }} /></div>
    <p className="phonics-hint">{task.instructionZh}</p>
    {image && <img key={`${image}:${reload}`} className="phonics-image" src={image.startsWith('/') ? `${API_BASE}${image}` : image} alt="本次活动的情境图" onError={() => { setReady(false); setAudioError('图片没有取到，可以重新加载') }} />}
    {(page?.text || task.displayText) && <div className={`phonics-display${page ? ' read' : ''}`} lang="en-GB">
      {task.timeline.length && !page ? task.timeline.map((part, i) => <span key={i} className={`phonics-sound${time >= part.atMs && time < part.endMs ? ' active' : ''}`}>{part.text}</span>) : page?.text ?? task.displayText}
    </div>}
    {page && <p>第 {state.pageIndex + 1} / {attempt.reader!.pages.length} 页</p>}
    <div className="phonics-actions"><button className="sticker-btn" disabled={disabled} onClick={() => void play()}>{playing ? '正在听…' : heard ? '再听一次' : '🔊 点这里，开始听'}</button></div>
    {audioError && <div className="phonics-notice" role="alert">{audioError}<button className="sticker-btn" disabled={blocked} onClick={() => { setHeard(false); setReload(v => v + 1) }}>重新准备声音和图片</button></div>}
    {!ready && !audioError && <p role="status">正在准备声音…</p>}
    {!state.resolved && ['choice', 'build'].includes(task.kind) && <>
      {task.kind === 'build' && <div className="phonics-choices phonics-built" aria-label="已摆的字母">{answer.length ? answer.map((id, i) => <button key={i} className="phonics-tile min-h-[64px] min-w-[64px]" disabled={disabled || !heard || state.correct === false} aria-label={`移走第 ${i + 1} 个 ${task.choices.find(c => c.id === id)?.label}`} onClick={() => setAnswer(a => a.filter((_, n) => n !== i))}>{task.choices.find(c => c.id === id)?.label}</button>) : <span className="phonics-hint">听一听，按顺序点字母</span>}</div>}
      <div className="phonics-choices" role="group" aria-label={task.kind === 'build' ? '可以摆的字母' : '选择字母'}>{task.choices.map(choice => <button className="phonics-tile min-h-[64px] min-w-[64px]" lang="en-GB" key={choice.id} aria-pressed={task.kind === 'choice' && answer[0] === choice.id} disabled={disabled || !heard || state.correct === false} onClick={() => setAnswer(a => task.kind === 'build' ? [...a, choice.id].slice(0, 20) : [choice.id])}>{choice.label}</button>)}</div>
      {state.correct !== false && <div className="phonics-actions"><button className="sticker-btn hot" disabled={disabled || !heard || !answer.length} onClick={() => onEvent({ kind: 'response_submitted', payload: { answerIds: answer } })}>摆好了</button></div>}
    </>}
    {!state.resolved && task.kind === 'listen' && <div className="phonics-actions"><button className="sticker-btn hot" disabled={disabled || !heard} onClick={() => empty('step_ack')}>我试过了，继续</button></div>}
    {!state.resolved && ['oral', 'read'].includes(task.kind) && <div className="phonics-actions">
      <button className="sticker-btn hot" disabled={disabled || !heard} onClick={() => onEvent({ kind: 'self_read_reported', payload: { report: 'tried' } })}>我试着读过了</button>
      <button className="sticker-btn" disabled={disabled || !heard} onClick={() => onEvent({ kind: 'self_read_reported', payload: { report: 'needs_help' } })}>想一起读</button>
    </div>}
    {state.correct === false && !state.resolved && <div className="phonics-notice" role="status"><p>再听一遍，换个摆法试试。</p><button className="sticker-btn" disabled={disabled} onClick={() => { setAnswer([]); empty('retry_requested') }}>再试一次</button></div>}
    {state.hintLevel > 0 && <div className="phonics-actions"><button className="sticker-btn" disabled={disabled} onClick={() => void play(true)}>🔊 听示范，一起练</button></div>}
    {state.resolved ? <div className="phonics-notice" role="status"><p>{state.correct === true ? '这个字母顺序摆好了。' : '这次尝试记下来了。'}</p><button className="sticker-btn hot" disabled={disabled} onClick={() => empty(page && state.pageIndex < attempt.reader!.pages.length - 1 ? 'reader_page_advanced' : 'step_advanced')}>{page && state.pageIndex < attempt.reader!.pages.length - 1 ? '下一页' : '继续'}</button></div>
      : task.kind !== 'listen' && <div className="phonics-actions"><button className="sticker-btn" disabled={disabled || !heard} onClick={() => empty('hint_requested')}>帮我一下</button>{state.hintLevel > 0 && task.canSkipWithHelp && <button className="sticker-btn" disabled={disabled} onClick={() => empty('task_skipped_with_help')}>一起练过，继续</button>}</div>}
  </section>
}
