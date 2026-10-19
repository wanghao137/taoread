import { uid } from '../../lib/uid'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { PhonicsAttemptDto, PhonicsEnrollmentDto } from '@taoread/shared'
import type { ChildDto } from '../../lib/api'
import { phonicsApi, type PhonicsCatalog, type PhonicsEnrollmentInput, type PhonicsSummary } from '../child/phonics/api'
import '../child/phonics/phonics.css'

export function ParentPhonicsV2({ token, children }: { token: string; children: ChildDto[] }) {
  const [catalog, setCatalog] = useState<PhonicsCatalog | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let live = true
    void phonicsApi.catalog(token).then(r => { if (live) setCatalog(r) }).catch(e => { if (live) setError(e instanceof Error ? e.message : '课程信息没有取到') })
    return () => { live = false }
  }, [token])
  return <section className="panel phonics-parent"><h3>英语自然拼读</h3>
    <p>适合 5–7 岁、英语启蒙不多的孩子。采用英式发音，每次约 5–8 分钟，随时可以暂停。建议家长短时陪伴，不需要教音标。</p>
    <p>点选和拼摆可以核对字母顺序；“我试过了”只是孩子自述。口头读出的情况由实际观察到的家长补记，不提供自动发音评分或掌握率。</p>
    {error && <p role="alert">{error}</p>}
    {catalog && !catalog.versions.length && <p role="status">正式课程正在完成发音与教学审校。审定后，这里会出现可开启的课程。</p>}
    {catalog && children.map(child => <ChildPhonics key={`${token}:${child.id}`} token={token} child={child} catalog={catalog} />)}
  </section>
}

function ChildPhonics({ token, child, catalog }: { token: string; child: ChildDto; catalog: PhonicsCatalog }) {
  const [enrollment, setEnrollment] = useState<PhonicsEnrollmentDto | null>(null)
  const [summary, setSummary] = useState<PhonicsSummary | null>(null)
  const [versionId, setVersionId] = useState('')
  const [mode, setMode] = useState<'entry' | 'lesson'>('entry')
  const [lesson, setLesson] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [reset, setReset] = useState<{ input: PhonicsEnrollmentInput; attempt: PhonicsAttemptDto } | null>(null)
  const live = useRef(true)
  const lock = useRef(false)
  const pendingObservation = useRef<Parameters<typeof phonicsApi.observe> | null>(null)
  const [retryObservation, setRetryObservation] = useState(false)
  const refresh = useCallback(async (page = 0) => {
    const [e, s] = await Promise.all([phonicsApi.enrollment(token, child.id), phonicsApi.summary(token, child.id, page)])
    if (!live.current) return
    setEnrollment(e.enrollment); setSummary(s)
    return e.enrollment
  }, [token, child.id])
  useEffect(() => {
    live.current = true
    void refresh().then(e => {
      if (!e || !live.current) return
      const version = catalog.versions.find(v => v.versionId === e.versionId) ?? catalog.versions[0]
      setVersionId(e.versionId ?? version?.versionId ?? ''); setMode(e.versionId ? e.entryMode : 'entry')
      setLesson(e.entryLessonKey ?? version?.lessons[0]?.id ?? '')
    }).catch(e => { if (live.current) setNotice(e instanceof Error ? e.message : '记录获取失败') })
    return () => { live.current = false }
  }, [refresh, catalog])
  async function save(input: PhonicsEnrollmentInput) {
    if (lock.current) return
    lock.current = true; setBusy(true); setNotice('')
    try {
      const result = await phonicsApi.setEnrollment(token, child.id, input)
      if (!live.current) return
      setEnrollment(result.enrollment); setReset(null); setNotice(input.enabled ? '已保存开启设置' : '已暂停英语练习，记录保留')
      await refresh()
    } catch (e) { if (live.current) { setNotice(e instanceof Error ? e.message : '设置未保存'); await refresh().catch(() => undefined) } }
    finally { lock.current = false; if (live.current) setBusy(false) }
  }
  async function prepareSave(enabled: boolean) {
    if (!enrollment || busy) return
    const input: PhonicsEnrollmentInput = enabled ? { enabled, versionId, entryMode: mode, entryLessonKey: lesson, expectedRevision: enrollment.revision }
      : { enabled, versionId: enrollment.versionId!, entryMode: enrollment.entryMode, entryLessonKey: enrollment.entryLessonKey!, expectedRevision: enrollment.revision }
    const changing = enabled && (input.versionId !== enrollment.versionId || input.entryMode !== enrollment.entryMode || input.entryLessonKey !== enrollment.entryLessonKey)
    if (changing && summary?.next.attemptId) {
      setBusy(true)
      try {
        const result = await phonicsApi.attempt(token, summary.next.attemptId)
        if (live.current) setReset({ input, attempt: result.attempt })
      } catch (e) { if (live.current) setNotice(e instanceof Error ? e.message : '当前进度获取失败') }
      finally { if (live.current) setBusy(false) }
    } else await save(input)
  }
  async function observe(args: Parameters<typeof phonicsApi.observe>) {
    if (lock.current) return
    lock.current = true; setBusy(true); setNotice(''); pendingObservation.current = args
    try {
      await phonicsApi.observe(...args)
      pendingObservation.current = null
      if (live.current) { setRetryObservation(false); setNotice('已保存家长观察'); await refresh(summary?.pagination.page) }
    } catch (e) {
      if (live.current) { setRetryObservation(true); setNotice(e instanceof Error ? e.message : '观察未确认保存') }
    } finally { lock.current = false; if (live.current) setBusy(false) }
  }
  async function newObservation(task: NonNullable<PhonicsSummary['oralTasks']>[number], value: 'independent' | 'with_help' | 'not_observed', oldId?: string) {
    if (busy || retryObservation) return
    setBusy(true)
    try {
      const current = await phonicsApi.attempt(token, task.attemptId)
      if (!live.current) return
      await observe([token, task.attemptId, { clientEventId: uid(), expectedRevision: current.attempt.revision, taskInstanceId: task.taskInstanceId, observation: value, ...(oldId ? { supersedesEventId: oldId } : {}) }])
    } catch (e) { if (live.current) setNotice(e instanceof Error ? e.message : '当前记录获取失败') }
    finally { if (live.current) setBusy(false) }
  }
  const version = catalog.versions.find(v => v.versionId === versionId)
  return <fieldset disabled={busy}><legend>{child.nickname}的英语练习</legend>
    {enrollment && <p>当前：{enrollment.enabled && enrollment.versionId ? '已开启' : '未开启正式课程'}</p>}
    {!!catalog.versions.length && <>
      <label>课程<select value={versionId} onChange={e => { setVersionId(e.target.value); setLesson(catalog.versions.find(v => v.versionId === e.target.value)?.lessons[0]?.id ?? '') }}>{catalog.versions.map(v => <option key={v.versionId} value={v.versionId}>英式发音 · {v.lessons.length} 课</option>)}</select></label>
      <label>从哪里开始<select value={mode} onChange={e => setMode(e.target.value as 'entry' | 'lesson')}><option value="entry">先玩声音游戏（推荐）</option><option value="lesson">从字母音开始</option></select></label>
      {mode === 'lesson' && <label>字母音起点<select value={lesson} onChange={e => setLesson(e.target.value)}>{version?.lessons.map(l => <option key={l.id} value={l.id}>{l.titleZh}</option>)}</select></label>}
      <p>调整起点不会补记前面的课已完成。后续起点会先安排必要示范；零基础建议先玩声音游戏。</p>
      <button type="button" className="sticker-btn hot" disabled={!version || !enrollment || !!reset} onClick={() => void prepareSave(true)}>保存并开启</button>
    </>}
    {enrollment?.enabled && enrollment.versionId && <button type="button" className="sticker-btn" onClick={() => void prepareSave(false)}>暂停开启，保留记录</button>}
    {reset && <div className="phonics-notice"><p>调整起点会结束当前这一段练习，已保存的记录保留。之后从新起点开始。</p><div className="phonics-actions"><button type="button" className="sticker-btn hot" onClick={() => void save({ ...reset.input, closeActive: { attemptId: reset.attempt.id, expectedRevision: reset.attempt.revision, clientEventId: uid() } })}>结束原进度并保存</button><button type="button" className="sticker-btn" onClick={() => setReset(null)}>保留原进度</button></div></div>}
    {notice && <p role="status">{notice}</p>}
    {summary && <>
      <p data-testid={`phonics-v2-summary-${child.id}`}>开始过 {summary.totalAttempts} 段，完成 {summary.completedAttempts} 段，暂停 {summary.pausedAttempts} 段。完成过 {summary.completedLessonKeys.length} 节不同课程；重读和复习另记。旧草稿开始过 {summary.v1Starts} 次。</p>
      <p>家长有观察的口头尝试 {summary.caregiverObservedCount} 项；没有观察证据 {summary.unobservedOralTaskCount} 项。完成次数不代表已经掌握。</p>
      <p>下次建议：{summary.next.label}</p>
      <details><summary>练习记录与口头观察</summary>
        {summary.recentPractice.map(p => <p key={p.id}>{new Date(p.startedAt * 1000).toLocaleDateString('zh-CN')} · {{ entry: '声音游戏', lesson: '课堂', review: '复习', reread: '重读' }[p.planKind]} · {{ started: '进行中', paused: '已暂停', completed: '已完成', cancelled: '已结束' }[p.status]}{!p.hadLearningActions ? '（尚未保存学习动作）' : ''}</p>)}
        <div className="phonics-actions"><button type="button" className="sticker-btn" disabled={summary.pagination.page === 0} onClick={() => void refresh(summary.pagination.page - 1).catch(e => setNotice(String(e)))}>上一页记录</button><button type="button" className="sticker-btn" disabled={(summary.pagination.page + 1) * summary.pagination.limit >= summary.pagination.total} onClick={() => void refresh(summary.pagination.page + 1).catch(e => setNotice(String(e)))}>下一页记录</button></div>
        {(summary.oralTasks ?? []).slice(0, 20).map(task => {
          const old = summary.observations?.find(o => o.attemptId === task.attemptId && o.taskInstanceId === task.taskInstanceId)
          return <div className="phonics-observation" key={`${task.attemptId}:${task.taskInstanceId}`}><p>{new Date(task.reportedAt * 1000).toLocaleString('zh-CN')} · 读出尝试：{task.text}{task.pageNumber ? `（第 ${task.pageNumber} 页）` : ''} · 孩子自述{task.report === 'tried' ? '试过了' : '需要帮助'}{task.hadHelp ? '（本次已用帮助）' : ''} · 家长：{old ? { independent: '独立尝试读出', with_help: '需要帮助', not_observed: '未观察' }[old.observation] : '尚未补记'}</p><div className="phonics-actions">{(['independent', 'with_help', 'not_observed'] as const).map(value => <button type="button" className="sticker-btn" key={value} disabled={retryObservation || (value === 'independent' && task.hadHelp)} onClick={() => void newObservation(task, value, old?.id)}>{old ? '更正：' : ''}{{ independent: '独立读出', with_help: '需要帮助', not_observed: '没有观察' }[value]}</button>)}</div></div>
        })}
        {retryObservation && <div className="phonics-actions"><button type="button" className="sticker-btn" onClick={() => { if (pendingObservation.current) void observe(pendingObservation.current) }}>重试保存这条观察</button><button type="button" className="sticker-btn" onClick={() => { pendingObservation.current = null; setRetryObservation(false); void refresh().catch(e => setNotice(String(e))) }}>读取最新观察</button></div>}
      </details>
    </>}
  </fieldset>
}
