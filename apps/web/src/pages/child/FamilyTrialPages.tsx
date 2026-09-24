import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api, ApiError, type ImportedBookDto, type PhonicsLessonDto } from '../../lib/api'
import { uid } from '../../lib/uid'
import { useSession } from '../../stores/session'
import { PageHead } from './V8App'

export function FamilyLibraryPage() {
  const token = useSession((state) => state.token)
  const childId = useSession((state) => state.childId)
  const navigate = useNavigate()
  const [books, setBooks] = useState<ImportedBookDto[]>([])
  const [error, setError] = useState('')
  const [progress, setProgress] = useState<Record<string, { order: number; completed: boolean }>>({})
  useEffect(() => { if (!token || !childId || !books.length) return; let live = true; void Promise.all(books.map(async (book) => [book.id, (await api.importedProgress(token, book.id, childId)).progress] as const)).then((rows) => { if (live) setProgress(Object.fromEntries(rows.filter((row) => row[1]).map(([id, value]) => [id, value!])) ) }); return () => { live = false } }, [token, childId, books])
  useEffect(() => { if (!token || !childId) return; let live = true; void api.importedBooks(token, childId).then((result) => { if (live) setBooks(result.books) }).catch((err: unknown) => { if (live) setError(err instanceof Error ? err.message : '无法加载家庭书架') }); return () => { live = false } }, [token, childId])
  return <><PageHead title="家庭书架" sub="家长挑选、只供本家庭阅读的书" /><button className="sticker-btn" onClick={() => navigate('/child/discover')}>返回找故事</button>{error && <p role="alert">{error}</p>}<div className="library">{books.map((book) => <button className="panel" key={book.id} onClick={() => navigate(`/child/family-book/${encodeURIComponent(book.id)}`)}><b>{book.title}</b><p>{book.author ?? '作者未标注'} · {book.chapterCount} 章 · {progress[book.id]?.completed ? '已读完' : progress[book.id] ? `读至第 ${progress[book.id]!.order} 章` : '未开始'}</p></button>)}</div>{books.length === 0 && !error && <p>这里暂时没有适合你年龄段的家庭书。</p>}</>
}

export function FamilyReaderPage() {
  const token = useSession((state) => state.token)
  const childId = useSession((state) => state.childId)
  const { id, order } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState<{ title: string; chapters: Array<{ order: number; title: string }> } | null>(null)
  const [chapter, setChapter] = useState<{ title: string; text: string } | null>(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState<{ order: number; offset: number; completed: boolean; updatedAt: string } | null>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const selectionRef = useRef<number>(0)
  useEffect(() => { if (!token || !childId || !id) return; let live = true; void api.importedProgress(token, id, childId).then(({ progress }) => { if (live) setProgress(progress) }); return () => { live = false } }, [token, childId, id])
  useEffect(() => { if (chapter && progress?.order === Number(order) && progress.offset > 0 && textRef.current) { const walker = document.createTreeWalker(textRef.current, NodeFilter.SHOW_TEXT); let count = 0; while (walker.nextNode()) { const node = walker.currentNode; const end = count + (node.textContent?.length ?? 0); if (end >= progress.offset) { const range = document.createRange(); range.setStart(node, progress.offset - count); range.collapse(true); const span = document.createElement('span'); span.setAttribute('data-resume-marker', ''); range.insertNode(span); span.scrollIntoView({ block: 'center' }); span.remove(); break } count = end } }  }, [chapter, progress, order])
  async function save(offset: number, completed = false) {
    if (!token || !childId || !id || !order) return
    try {
      // B3：携带本机所基于的服务器版本；409=其他设备已写入更新进度，重新拉取并采用服务器版本
      const result = await api.saveImportedProgressV2(token, id, childId, {
        order: Number(order),
        offset,
        completed,
        ...(progress ? { baseUpdatedAt: progress.updatedAt } : {}),
      })
      setProgress(result.progress)
      setError('')
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        try {
          const latest = await api.importedProgress(token, id, childId)
          setProgress(latest.progress)
          setError('进度已在别的设备更新，已按最新进度继续')
        } catch {
          setError('保存没成功，再点一次试试')
        }
      } else {
        setError(err instanceof Error ? err.message : '保存进度失败')
      }
    }
  }
  useEffect(() => { setBook(null); if (!token || !childId || !id) return; let live = true; setError(''); void api.importedBook(token, id, childId).then(({ book }) => { if (live) setBook(book) }).catch((err: unknown) => { if (live) setError(err instanceof Error ? err.message : '书籍不可用') }); return () => { live = false } }, [token, childId, id])
  useEffect(() => { setChapter(null); if (!token || !childId || !id || !order) return; let live = true; setError(''); void api.importedChapter(token, id, Number(order), childId).then(({ chapter }) => { if (live) setChapter(chapter) }).catch((err: unknown) => { if (live) setError(err instanceof Error ? err.message : '章节不可用') }); return () => { live = false } }, [token, childId, id, order])
  return <><PageHead title={book?.title ?? '家庭书'} sub="私有文本阅读" /><button className="sticker-btn" onClick={() => navigate('/child/family-books')}>返回家庭书架</button>{error && <p role="alert">{error}</p>}{!order ? <div className="library">{progress && !progress.completed && <button className="sticker-btn primary" onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${progress.order}`)}>从第 {progress.order} 章续读</button>}{book?.chapters.map((item) => <button className="panel" key={item.order} onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${item.order}`)}>{item.order}. {item.title}</button>)}</div> : <article className="panel" style={{ maxWidth: 780, margin: '24px auto', lineHeight: 2, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', fontSize: '1.1rem' }}><h2>{chapter?.title ?? '正在打开章节…'}</h2>{chapter && <div ref={textRef} onPointerUp={() => { const selection = window.getSelection(); if (selection && selection.rangeCount && textRef.current?.contains(selection.anchorNode) && textRef.current?.contains(selection.focusNode)) { const range = selection.getRangeAt(0).cloneRange(); range.selectNodeContents(textRef.current); range.setEnd(selection.anchorNode!, selection.anchorOffset); selectionRef.current = range.toString().length } }}>{chapter.text}</div>}{chapter && <p>选中读到的位置后点“保存所选位置”，或点击“读完本章”。</p>}{chapter && <p><button onClick={() => void save(Math.min(chapter.text.length, selectionRef.current || (progress?.order === Number(order) ? progress.offset : 0)))}>保存所选位置</button> <button onClick={() => void save(chapter.text.length, Number(order) === book?.chapters.length)}>读完本章</button></p>}<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}><button disabled={Number(order) <= 1} onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${Number(order) - 1}`)}>上一章</button><button disabled={Number(order) >= (book?.chapters.length ?? 0)} onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${Number(order) + 1}`)}>下一章</button></div></article>}</>
}

type PhonicsPhase = 'teach' | 'items' | 'reader' | 'done'

/**
 * 英语小练习（自然拼读 · 内测草稿，D3/WP-D）。
 * 一课流程：字形示范 → 看字听音/合成/分音 → 解码短文 → 温和结束。
 * 无音素音频（待教师/语音审校）：所有环节用视觉呈现 + 家长读题提示，不用字母名冒充音素。
 * 中断可续：进入课时先查未结束的 attempt，跳过已答题目；暂停不记为失败。
 */
export function PhonicsTrialPage() {
  const token = useSession((state) => state.token)
  const childId = useSession((state) => state.childId)
  const navigate = useNavigate()
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [lessons, setLessons] = useState<PhonicsLessonDto[]>([])
  const [active, setActive] = useState<PhonicsLessonDto | null>(null)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [phase, setPhase] = useState<PhonicsPhase>('teach')
  const [index, setIndex] = useState(0)
  const [rightCount, setRightCount] = useState(0)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token || !childId) return
    let live = true
    void Promise.all([api.phonicsEnrollment(token, childId), api.phonicsCatalog(token)])
      .then(([state, catalog]) => {
        if (!live) return
        setEnabled(state.enabled)
        setLessons(catalog.lessons)
      })
      .catch((err: unknown) => {
        if (live) setMessage(err instanceof Error ? err.message : '练习不可用')
      })
    return () => {
      live = false
    }
  }, [token, childId])

  /** 进入一课：有未结束的尝试就续做（跳过已答题），否则新开一次尝试 */
  async function openLesson(lesson: PhonicsLessonDto) {
    if (!token || !childId) return
    setBusy(true)
    setMessage('')
    try {
      const { attempt } = await api.phonicsActiveAttempt(token, childId, lesson.id)
      if (attempt) {
        setAttemptId(attempt.id)
        setRightCount(attempt.answered.filter((a) => a.correct).length)
        setIndex(Math.min(attempt.answered.length, lesson.items.length))
        setPhase(attempt.answered.length >= lesson.items.length ? 'reader' : 'items')
        setMessage('上次没练完，从断开的地方继续')
      } else {
        const result = await api.startPhonicsAttempt(token, childId, lesson.id, uid())
        setAttemptId(result.attempt.id)
        setIndex(0)
        setRightCount(0)
        setPhase(lesson.taught.length > 0 ? 'teach' : 'items')
      }
      setActive(lesson)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : '开始失败')
    } finally {
      setBusy(false)
    }
  }

  async function answer(optionId: string) {
    if (!token || !attemptId || !active) return
    const item = active.items[index]
    if (!item) return
    setBusy(true)
    try {
      const result = await api.answerPhonics(token, attemptId, item.id, optionId)
      if (result.correct && !result.repeated) setRightCount((n) => n + 1)
      if (index + 1 >= active.items.length) {
        setPhase('reader')
        setMessage(result.correct ? '全部答完！最后读一读这篇小短文' : '题目走完了，和大人一起读读短文吧')
      } else {
        setIndex(index + 1)
        setMessage(result.correct ? '答对了' : '没关系，看看下一个')
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : '提交失败，再试一次')
    } finally {
      setBusy(false)
    }
  }

  /** 暂停：记为 paused（不是失败），下次进入自动续做 */
  async function pause() {
    if (!token || !attemptId) return
    setBusy(true)
    try {
      await api.finishPhonics(token, attemptId, 'paused')
      setAttemptId(null)
      setActive(null)
      setMessage('先停在这里，下次会接着练')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : '暂停失败')
    } finally {
      setBusy(false)
    }
  }

  async function finish() {
    if (!token || !attemptId) return
    setBusy(true)
    try {
      await api.finishPhonics(token, attemptId, 'completed')
      setPhase('done')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : '结束失败')
    } finally {
      setBusy(false)
    }
  }

  function backHome() {
    void navigate('/child/today')
  }

  const item = active?.items[index]

  return (
    <div>
      <PageHead title="英语小练习 · 内测" sub="和大人一起玩声音游戏；音频待审校，先看字、听大人读" />
      <div style={{ display: 'flex', gap: 8, margin: '12px 16px' }}>
        <button className="sticker-btn" onClick={backHome}>
          回今天
        </button>
        {active ? (
          <button className="sticker-btn" onClick={() => {
            setActive(null)
            setAttemptId(null)
          }}>
            课程列表
          </button>
        ) : null}
      </div>
      <section className="panel" style={{ maxWidth: 680, margin: '0 auto 40px' }}>
        <p className="mono-line" style={{ fontSize: 12 }}>
          内测草稿：标准音素音频与教学审校还没完成，不评分、不排名，请勿把字母名称当作字母音。
        </p>
        {enabled === null ? (
          <p>正在打开…</p>
        ) : !enabled ? (
          <p>请家长先在「家长 → 内容」里开启英语小练习。</p>
        ) : !active ? (
          <>
            <h3>选一课（共 {lessons.length} 课）</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className="sticker-btn block"
                  disabled={busy}
                  data-testid={`phonics-lesson-${lesson.order}`}
                  onClick={() => void openLesson(lesson)}
                  style={{ textAlign: 'left' }}
                >
                  第 {lesson.order} 课 · {lesson.title}
                </button>
              ))}
            </div>
          </>
        ) : phase === 'teach' ? (
          <>
            <h3>
              第 {active.order} 课 · {active.title}
            </h3>
            {active.taught.map((gpc) => (
              <div key={gpc.grapheme} className="panel" style={{ margin: '12px 0', background: 'var(--paper)' }}>
                <p style={{ fontSize: 56, margin: '8px 0', fontFamily: 'var(--display)', letterSpacing: '0.05em' }}>
                  {gpc.grapheme} <small style={{ fontSize: 18 }}>{gpc.ipa}</small>
                </p>
                <p>口型提示：{gpc.mouthCue}</p>
              </div>
            ))}
            <p className="mono-line" style={{ fontSize: 12 }}>请大人按提示读给孩子听（读字母音，不是字母名）。</p>
            <button className="sticker-btn primary" data-testid="phonics-begin" disabled={busy} onClick={() => setPhase('items')}>
              我认识了，开始练一练
            </button>
          </>
        ) : phase === 'items' && item ? (
          <>
            <p className="mono-label">
              第 {index + 1} 题 / 共 {active.items.length} 题 · 答对 {rightCount}
            </p>
            <h3 style={{ fontSize: 24 }}>{item.prompt}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: '16px 0' }}>
              {item.options.map((option) => (
                <button
                  key={option.id}
                  className="sticker-btn"
                  style={{ fontSize: 28, minWidth: 96, fontFamily: item.kind === 'segment' ? 'var(--mono)' : 'var(--display)' }}
                  disabled={busy}
                  data-testid={`phonics-option-${option.id}`}
                  onClick={() => void answer(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mono-line" style={{ fontSize: 12 }}>需要的话请大人把题目读一遍。</p>
            <button className="sticker-btn sm" disabled={busy} onClick={() => void pause()}>
              先歇一会（下次接着练）
            </button>
          </>
        ) : phase === 'reader' && active.reader ? (
          <>
            <h3>小短文 · {active.reader.title}</h3>
            <p style={{ fontSize: 30, lineHeight: 1.9, fontFamily: 'var(--display)', letterSpacing: '0.04em', wordSpacing: '0.3em' }}>
              {active.reader.text}
            </p>
            <p className="mono-line" style={{ fontSize: 12 }}>和大人一起指读：一个音一个音拼，再连成词。</p>
            <button className="sticker-btn primary" data-testid="phonics-finish" disabled={busy} onClick={() => void finish()}>
              我读完啦
            </button>
          </>
        ) : phase === 'done' ? (
          <>
            <h3>今天练到这里，辛苦啦</h3>
            <p>
              这一课你走了 {active.items.length} 道题、答对 {rightCount} 次，还读了《{active.reader?.title ?? '小短文'}》。
              这是练习记录，不是考试评分——想再练或先玩别的都可以。
            </p>
            <button className="sticker-btn primary" onClick={() => {
              setActive(null)
              setAttemptId(null)
            }}>
              再选一课
            </button>
          </>
        ) : (
          <p>正在准备…</p>
        )}
        {message && (
          <p role="status" aria-live="polite" style={{ marginTop: 12 }}>
            {message}
          </p>
        )}
      </section>
    </div>
  )
}



