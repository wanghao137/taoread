import { useEffect, useRef, useState } from 'react'
import type { PhonicsAtlasDto } from '@taoread/shared'
import { IconBookOpen, IconClose, IconPlay, IconSun, IconType, IconVolume } from '../../../components/ui/icons'
import { ApiError } from '../../../lib/api'
import { uid } from '../../../lib/uid'
import { phonicsApi, type PracticeAnswer, type PracticeMode, type PracticeSummary, type StudySchedule, type WordSession, type WordSettings } from './api'
import { PhonicsAudio } from './phonicsAudio'
import { distinctChoices, similarWords } from './phonicsChoices'
import { buildStudySteps, gapSentence, makeStudyRetry } from './phonicsStudy'
import { TypingPractice } from './PhonicsTyping'
import { useWordSession } from './useWordSession'
import { API_BASE } from '../../../lib/api'

type Session = WordSession
const MODES = [
  { id: 'picture', title: '看图选词', description: '看图片，选出对应的单词', icon: IconBookOpen },
  { id: 'meaning', title: '选择词义', description: '看单词，选出它的意思', icon: IconPlay },
  { id: 'listen', title: '听音辨词', description: '听发音，找出对应的单词', icon: IconVolume },
  { id: 'spelling', title: '拼写单词', description: '看图和词义，试着写出来', icon: IconType },
  { id: 'contrast', title: '分清相似词', description: '看图辨认容易混淆的单词', icon: IconBookOpen },
] as const

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}

export function PracticeTab({ token, childId, atlas, blocked, autoStudy, onAutoStudyHandled }: { token: string; childId: string; atlas: PhonicsAtlasDto | null; blocked: boolean; autoStudy: boolean; onAutoStudyHandled: () => void }) {
  const sync = useWordSession(token, childId, atlas?.versionId ?? null)
  const session = sync.session
  const currentSession = sync.current
  const [active, setActive] = useState(false)
  const activated = useRef(false)
  const [typing, setTyping] = useState(false)
  const [summary, setSummary] = useState<PracticeSummary | null>(null)
  const [schedule, setSchedule] = useState<StudySchedule | null>(null)
  const [settings, setSettings] = useState<WordSettings | null>(null)
  const [scope, setScope] = useState<'all' | 'wrong' | 'favorite'>('all')
  const [answer, setAnswer] = useState('')
  const [busy, setBusy] = useState(false)
  const locked = useRef(false)
  const autoConsumed = useRef(false)
  const [error, setError] = useState('')
  const [audioReady, setAudioReady] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [hintCount, setHintCount] = useState(0)
  const questionStarted = useRef(Date.now())
  const lastAuto = useRef('')
  const audio = useRef<PhonicsAudio | null>(null)
  const words = atlas?.words ?? []
  const eligible = words.filter(word => word.unlocked && word.text)
  const targets = scope === 'wrong' ? eligible.filter(word => summary?.wrongWordIds.includes(word.id)) : scope === 'favorite' ? eligible.filter(word => word.favorite) : eligible
  const question = session?.questions[session.index]
  const word = words.find(item => item.id === question?.wordId)
  const wordAudio = word?.audios.find(item => item.purpose === 'word')
  const syncBlocked = !sync.ready || sync.syncing || Boolean(sync.issue)
  useEffect(() => { if (sync.ready && !activated.current) { activated.current = true; setActive(Boolean(currentSession.current)) } }, [sync.ready, currentSession])
  async function refreshSummary() {
    try { setSummary(await phonicsApi.practiceSummary(token, childId)) } catch { setError('练习记录暂时没有取到，请稍后重试') }
  }
  async function refreshSchedule() {
    try { setSchedule(await phonicsApi.studySchedule(token, childId)) } catch { setError('复习安排暂时没有取到，请稍后重试') }
  }
  useEffect(() => { void refreshSummary() }, [token, childId]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { void refreshSchedule() }, [token, childId]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { let live = true; void phonicsApi.wordSettings(token, childId).then(value => { if (live) setSettings(value) }).catch(() => { if (live) setError('学习设置暂时没有取到') }); return () => { live = false } }, [token, childId])
  useEffect(() => { questionStarted.current = Date.now(); setHintCount(0) }, [session?.index, session?.showIntro, active])
  useEffect(() => {
    const engine = new PhonicsAudio()
    audio.current = engine
    let live = true
    setAudioReady(false)
    if (wordAudio?.url) void engine.prepare([wordAudio]).then(() => { if (live) setAudioReady(true) }).catch(() => { if (live) setError('声音没有准备好，请重新打开这道题') })
    return () => { live = false; engine.dispose(); audio.current = null }
  }, [wordAudio?.id, wordAudio?.url]) // eslint-disable-line react-hooks/exhaustive-deps

  async function start(mode: PracticeMode) {
    if (!atlas?.versionId || blocked || syncBlocked) return
    const possible = targets.filter(item => (mode !== 'picture' && mode !== 'contrast') || item.image?.url)
      .filter(item => mode !== 'listen' || item.audios.some(a => a.purpose === 'word' && a.url))
      .filter(item => mode !== 'contrast' || similarWords(item, eligible).length > 0)
      .filter(item => mode === 'spelling' || distinctChoices(item, eligible, mode).length >= 2)
    if (!possible.length) return
    const questions = shuffle(possible).slice(0, 10).map(item => ({
      id: uid(), wordId: item.id, mode, isNew: false,
      choices: shuffle([item.id, ...shuffle(mode === 'contrast' ? similarWords(item, eligible) : distinctChoices(item, eligible, mode).slice(1)).slice(0, 3).map(other => other.id)]),
    }))
    const next: Session = { id: uid(), versionId: atlas.versionId, track: 'practice', questions, index: 0, showIntro: false, firstCorrect: 0, feedback: null, pending: null }
    setError(''); setAnswer(''); setActive(true)
    await sync.save(next)
  }

  async function startStudy() {
    if (!atlas?.versionId || !schedule || !settings || blocked || syncBlocked || currentSession.current) return
    const questions = buildStudySteps(eligible, schedule, settings.spelling, uid, shuffle)
    if (!questions.length) return
    const next: Session = { id: uid(), versionId: atlas.versionId, track: 'study', questions, index: 0, showIntro: false, firstCorrect: 0, feedback: null, pending: null }
    setError(''); setAnswer(''); setActive(true)
    await sync.save(next)
  }
  useEffect(() => {
    if (!autoStudy) { autoConsumed.current = false; return }
    if (!atlas || !schedule || !settings || !sync.ready || syncBlocked || autoConsumed.current) return
    autoConsumed.current = true
    if (currentSession.current) setActive(true)
    else void startStudy()
    onAutoStudyHandled()
  }, [autoStudy, atlas, schedule, settings, sync.ready, syncBlocked]) // eslint-disable-line react-hooks/exhaustive-deps

  async function sendPending(next: Session) {
    if (!next.pending || locked.current) return
    locked.current = true; setBusy(true); setError('')
    try {
      const result = await phonicsApi.practiceAnswer(token, childId, next.pending)
      const latest = currentSession.current
      if (!latest || latest.pending?.clientEventId !== next.pending.clientEventId) return
      const questions = [...latest.questions]
      const current = questions[latest.index]
      if (latest.track === 'study' && !result.correct && current && questions.filter(item => item.wordId === current.wordId && item.retry).length < 2) {
        const retry = makeStudyRetry(current, eligible, settings?.spelling ?? true, schedule?.stabilities?.[current.wordId] ?? 0, shuffle)
        if (retry) questions.splice(Math.min(questions.length, latest.index + 4), 0, retry)
      }
      await sync.save({ ...latest, questions, pending: null, feedback: result.correct ? 'correct' : 'incorrect', firstCorrect: latest.firstCorrect + (result.firstAttempt && result.correct ? 1 : 0) })
      void refreshSummary()
      if (latest.track === 'study') void refreshSchedule()
    } catch (e) {
      if (e instanceof ApiError && e.status >= 400 && e.status < 500) {
        const latest = currentSession.current
        if (latest) await sync.save({ ...latest, pending: null })
      }
      setError(e instanceof Error ? e.message : '记录没有保存，请再试一次')
    } finally { locked.current = false; setBusy(false) }
  }

  async function submit(value: string) {
    if (!session || !question || session.pending || session.feedback || busy || syncBlocked || !value.trim()) return
    const pending: PracticeAnswer = { clientEventId: uid(), questionId: question.id, versionId: session.versionId, wordId: question.wordId, mode: question.mode, track: session.track, answer: value.trim(), elapsedMs: Math.min(90000, Math.max(0, Date.now() - questionStarted.current)), hinted: hintCount > 0 }
    const next = { ...session, pending }
    if (await sync.save(next)) await sendPending(next)
  }
  async function play() {
    if (!audioReady || !wordAudio || !audio.current || audioPlaying) return
    setAudioPlaying(true); setError('')
    try { await audio.current.play([wordAudio.id]) } catch { setError('声音没有播出来，请再试一次') } finally { setAudioPlaying(false) }
  }
  async function nextQuestion() {
    if (!session || syncBlocked) return
    const index = session.index + 1
    await sync.save({ ...session, index, showIntro: false, feedback: null }); setAnswer(''); setError('')
  }

  useEffect(() => {
    if (!active || !settings?.autoplay || !audioReady || !(question?.intro || session?.showIntro)) return
    const key = `${session?.index}:${question?.id}`
    if (lastAuto.current === key) return
    lastAuto.current = key
    void play()
  }, [active, settings?.autoplay, audioReady, question?.intro, question?.id, session?.index, session?.showIntro]) // eslint-disable-line react-hooks/exhaustive-deps

  const syncNotice = <>
    {sync.issue && <div className="phonics-notice" role="alert">
      <p>{sync.issue === 'conflict' ? '另一设备的进度已更新，本机未同步内容仍保留在此设备。' : sync.issue === 'storage' ? '本机暂时无法保存待同步进度。' : '学习进度暂时没有同步。'}</p>
      {sync.issue !== 'conflict' && <button className="ph-ghost-btn min-h-[44px]" disabled={sync.syncing} onClick={() => void sync.retry()}>重新同步</button>}
      {(sync.issue === 'conflict' || sync.issue === 'storage') && <button className="ph-ghost-btn min-h-[44px]" disabled={sync.syncing} onClick={() => void sync.useRemote().then(ok => { if (ok) setActive(Boolean(currentSession.current)) })}>读取另一设备进度</button>}
    </div>}
    {sync.drafts.length > 0 && <details className="phonics-notice">
      <summary>本机保留的进度（{sync.drafts.length}）</summary>
      {sync.drafts.map(({ key, mutation }, index) => <div key={key}>
        <p>草稿 {index + 1}：{!mutation ? '无法读取，请保留浏览器数据' : mutation.versionId !== atlas?.versionId ? '课程已变化，暂不能恢复' : mutation.session ? `${mutation.session.track === 'study' ? '单词学习' : '单词练习'} ${Math.min(mutation.session.index + 1, mutation.session.questions.length)} / ${mutation.session.questions.length}${mutation.session.pending ? '，有待确认答案' : ''}` : '已结束的练习'}</p>
        {mutation && <div className="phonics-actions">
          <button className="ph-ghost-btn min-h-[44px]" disabled={syncBlocked || mutation.versionId !== atlas?.versionId} onClick={() => {
            if (window.confirm('恢复此草稿会切换当前学习进度。当前云端进度会先保留在本机，继续吗？')) void sync.restoreDraft(key).then(ok => { if (ok) setActive(Boolean(currentSession.current)) })
          }}>恢复草稿 {index + 1}</button>
          <button className="ph-ghost-btn min-h-[44px]" disabled={sync.syncing} onClick={() => { if (window.confirm('确定删除这个本机草稿吗？此操作无法撤销。')) sync.discardDraft(key) }}>删除草稿 {index + 1}</button>
        </div>}
      </div>)}
    </details>}
  </>
  async function endSession() { if (await sync.save(null)) { setActive(false); setError('') } }

  if (typing && atlas?.versionId) return <TypingPractice token={token} childId={childId} versionId={atlas.versionId} words={words} schedule={schedule} summary={summary} onExit={() => setTyping(false)} />

  if (active && session) {
    if (atlas && session.versionId !== atlas.versionId) return <section className="ph-exercise">{syncNotice}<h2>课程已变化</h2><button className="ph-ghost-btn min-h-[44px]" disabled={syncBlocked} onClick={() => void endSession()}>返回练习</button></section>
    if (session.index >= session.questions.length) return <section className="ph-exercise" aria-label="练习完成">
      {syncNotice}<p className="phonics-kicker">练习完成</p><h2>今天练过了</h2>
      <p>完成 {session.questions.filter(item => !item.intro && !item.retry).length} 题，首次答对 {session.firstCorrect} 题。</p>
      <button className="ph-cta min-h-[44px]" disabled={syncBlocked} onClick={() => void endSession()}>回到练习</button>
    </section>
    if (!word || !question) return <section className="ph-exercise">{syncNotice}<h2>正在准备练习…</h2><button className="ph-ghost-btn min-h-[44px]" onClick={() => setActive(false)}>返回</button></section>
    const mode = MODES.find(item => item.id === question.mode)!
    const sentence = question.mode === 'picture' && word.text ? word.examples.map(example => gapSentence(example.text, word.text!)).find(Boolean) : null
    if (question.intro || session.showIntro) return <section className="ph-exercise" aria-label="认识新单词">
      {syncNotice}<div className="ph-exercise-top"><button className="ph-ghost-btn min-h-[44px]" onClick={() => setActive(false)}>暂停</button><span>{session.index + 1} / {session.questions.length}</span></div>
      <p className="phonics-kicker">认识新单词</p>
      {word.image?.url && <img className="ph-question-image" src={word.image.url.startsWith('/') ? `${API_BASE}${word.image.url}` : word.image.url} alt="" />}
      <p className="ph-question-word" lang="en-GB">{word.text}</p><p>{word.meaningZh}</p>
      <button className="ph-listen min-h-[44px]" disabled={!audioReady || audioPlaying} onClick={() => void play()}><IconVolume size={24} />{audioPlaying ? '播放中' : '听发音'}</button>
      {word.examples[0] && <p lang="en-GB">{word.examples[0].text}</p>}
      <div className="phonics-actions"><button className="ph-cta min-h-[44px]" disabled={syncBlocked} onClick={() => { if (question.intro) void nextQuestion(); else void sync.save({ ...session, showIntro: false }) }}>继续</button></div>
      {error && <p role="alert" className="phonics-notice">{error}</p>}
    </section>
    return <section className="ph-exercise" aria-label={mode.title}>
      {syncNotice}<div className="ph-exercise-top"><button className="ph-ghost-btn min-h-[44px]" disabled={busy} onClick={() => setActive(false)}>暂停</button><span>{session.index + 1} / {session.questions.length}</span></div>
      <div className="phonics-progress" aria-label={`进度 ${session.index + 1}/${session.questions.length}`}><span style={{ width: `${session.index / session.questions.length * 100}%` }} /></div>
      <p className="phonics-kicker">{mode.title}</p><h2>{question.mode === 'meaning' ? '这个词是什么意思？' : question.mode === 'spelling' ? '这个单词怎么写？' : question.mode === 'listen' ? '听一听，是哪个单词？' : question.mode === 'contrast' ? '哪个单词和图片相符？' : sentence ? '看图，补全句子' : '看图片，选单词'}</h2>
      {question.mode === 'meaning' && <p className="ph-question-word" lang="en-GB">{word.text}</p>}
      {(question.mode === 'picture' || question.mode === 'spelling' || question.mode === 'contrast') && word.image?.url && <img className="ph-question-image" src={word.image.url.startsWith('/') ? `${API_BASE}${word.image.url}` : word.image.url} alt="" />}
      {sentence && <p lang="en-GB" aria-label={sentence.replaceAll('____', '空格')}>{sentence}</p>}
      {(question.mode === 'spelling' || question.mode === 'contrast') && <p>{word.meaningZh}</p>}
      {question.mode === 'listen' && <button className="ph-listen min-h-[44px]" disabled={!audioReady || audioPlaying} onClick={() => void play()}><IconVolume size={26} />{audioPlaying ? '播放中' : '听发音'}</button>}
      {question.mode === 'spelling' ? <form className="ph-spelling" onSubmit={e => { e.preventDefault(); void submit(answer) }}>
        <input aria-label="输入单词" autoComplete="off" autoCapitalize="none" spellCheck={false} value={answer} onChange={e => setAnswer(e.target.value)} disabled={syncBlocked || busy || Boolean(session.pending) || Boolean(session.feedback)} />
        <button className="ph-cta min-h-[44px]" disabled={syncBlocked || !answer.trim() || busy || Boolean(session.pending) || Boolean(session.feedback)}>确认</button>
        <button type="button" className="ph-ghost-btn min-h-[44px]" disabled={syncBlocked || busy || Boolean(session.pending) || Boolean(session.feedback) || hintCount >= word.text!.length} onClick={() => setHintCount(count => count + 1)}>提示字母</button>
        {hintCount > 0 && <span aria-live="polite" lang="en-GB">{word.text!.slice(0, hintCount)}{'_'.repeat(Math.max(0, word.text!.length - hintCount))}</span>}
      </form> : <div className="ph-answer-grid" role="group" aria-label="选择答案">
        {question.choices.map(id => {
          const option = words.find(item => item.id === id)
          return <button key={id} className="min-h-[44px]" disabled={syncBlocked || busy || Boolean(session.pending) || Boolean(session.feedback)} onClick={() => void submit(id)}>{question.mode === 'meaning' ? option?.meaningZh : option?.text}</button>
        })}
      </div>}
      {session.feedback && <div className="ph-feedback" role="status">
        {session.feedback === 'correct' ? <><b>答对了</b><span lang="en-GB">{word.text}</span><span>{word.meaningZh}</span><button className="ph-cta min-h-[44px]" disabled={syncBlocked} onClick={() => void nextQuestion()}>继续</button></>
          : session.track === 'study' ? <><b>我们稍后再练</b><span lang="en-GB">{word.text}</span><span>{word.meaningZh}</span><button className="ph-cta min-h-[44px]" disabled={syncBlocked} onClick={() => void nextQuestion()}>继续</button></>
            : <><b>再试一次</b><button className="ph-ghost-btn min-h-[44px]" disabled={syncBlocked} onClick={() => { void sync.save({ ...session, feedback: null }); setAnswer('') }}>换个答案</button></>}
      </div>}
      {error && <p role="alert" className="phonics-notice">{error}</p>}
      {session.pending && <button className="ph-ghost-btn min-h-[44px]" disabled={syncBlocked || busy} onClick={() => void sendPending(session)}>重新保存答案</button>}
    </section>
  }

  return <section aria-label="练习">
    {syncNotice}
    <div className="ph-section-heading"><div><p className="phonics-kicker">PRACTICE</p><h2 className="ph-tab-title">单词练习</h2></div></div>
    <button className="ph-mode ph-study-entry min-h-[44px]" disabled={blocked || syncBlocked || Boolean(session) || !schedule || !settings || !(schedule.dueWordIds.length + schedule.newWordIds.length)} onClick={() => void startStudy()}>
      <span className="ph-mode-icon"><IconSun size={26} /></span><span><b>今日单词学习</b><small>{schedule ? `${schedule.dueWordIds.length} 个待复习 · ${schedule.newWordIds.length} 个新词` : '正在准备'}</small></span>
    </button>
    {summary && <p className="ph-result-count">已练 {summary.total} 题 · 首次答对 {summary.correct} 题</p>}
    <button className="ph-mode min-h-[44px]" disabled={blocked || syncBlocked || Boolean(session) || !eligible.length} onClick={() => setTyping(true)}><span className="ph-mode-icon"><IconType size={26} /></span><span><b>打字练习</b><small>单词、例句和听写</small></span></button>
    {session && <div className="ph-resume"><button className="ph-cta min-h-[44px]" disabled={syncBlocked} onClick={() => setActive(true)}>继续上次练习</button><button className="ph-icon-button min-h-[44px] min-w-[44px]" title="结束上次练习" aria-label="结束上次练习" disabled={syncBlocked || Boolean(session.pending)} onClick={() => void endSession()}><IconClose size={20} /></button></div>}
    <div className="ph-filters" role="group" aria-label="练习范围">
      <button className={`ph-chip min-h-[44px]${scope === 'all' ? ' on' : ''}`} aria-pressed={scope === 'all'} onClick={() => setScope('all')}>已开放的词</button>
      <button className={`ph-chip min-h-[44px]${scope === 'wrong' ? ' on' : ''}`} aria-pressed={scope === 'wrong'} onClick={() => setScope('wrong')}>错词本 {summary?.wrongWordIds.length ?? 0}</button>
      <button className={`ph-chip min-h-[44px]${scope === 'favorite' ? ' on' : ''}`} aria-pressed={scope === 'favorite'} onClick={() => setScope('favorite')}>收藏</button>
    </div>
    <p className="ph-result-count">可练 {targets.length} 个词 · 每轮最多 10 题</p>
    {MODES.map(mode => {
      const hasTargets = targets.some(item => ((mode.id !== 'picture' && mode.id !== 'contrast') || item.image?.url) && (mode.id !== 'listen' || item.audios.some(a => a.purpose === 'word' && a.url)) && (mode.id !== 'contrast' || similarWords(item, eligible).length > 0) && (mode.id === 'spelling' || distinctChoices(item, eligible, mode.id).length >= 2))
      return <button key={mode.id} className="ph-mode min-h-[44px]" disabled={blocked || syncBlocked || Boolean(session) || !hasTargets} onClick={() => void start(mode.id)}>
        <span className="ph-mode-icon"><mode.icon size={26} /></span><span><b>{mode.title}</b><small>{mode.description}</small></span>
      </button>
    })}
    {atlas && !eligible.length && <p className="phonics-hint">完成课程后，可以在这里练习已开放的单词。</p>}
    {error && <p role="alert" className="phonics-notice">{error}</p>}
  </section>
}
