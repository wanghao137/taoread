import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api, ApiError, type ImportedBookDto, type PhonicsLessonDto } from '../../lib/api'
import { uid } from '../../lib/uid'
import { useSession } from '../../stores/session'
import { PageHead } from './V8App'
import { defaultReadingTheme, type ReadingTheme } from '../../lib/readingTheme'

const MARKER_RE = /\[\[img:([^\]]+)\]\]/g

/** 家庭书阅读器主题（与主站 paper/sepia/night 三档一致；配色自包含，不依赖主站块状 DOM） */
const FAMILY_THEME: Record<ReadingTheme, { bg: string; fg: string; muted: string; highlight: string }> = {
  paper: { bg: '#FFFDF6', fg: '#3E2F23', muted: '#8A7A6A', highlight: '#FFE082' },
  sepia: { bg: '#F4E8D0', fg: '#4A3A28', muted: '#8A7355', highlight: '#E8C87F' },
  night: { bg: '#1C1B18', fg: '#D8D2C4', muted: '#8F897A', highlight: '#5A523A' },
}

type ReaderBlock = { kind: 'p'; text: string; cleanStart: number; cleanLen: number } | { kind: 'img'; key: string }

/** 正文 → 渲染块。坐标空间 = 服务端朗读合成全文（chunkText 输入）：行去标记、去首尾空白、丢空行后以 '\n' 相连——
 * 因此纯标记行与空行不占坐标（前进 0），普通行前进「行宽 + 1（连接符）」。cleanStart/cleanLen 用于朗读高亮与进度定位。 */
export function parseBlocks(text: string): ReaderBlock[] {
  const blocks: ReaderBlock[] = []
  let cleanStart = 0
  for (const paragraph of text.split(/\n{2,}/)) {
    let buffer: string[] = []
    let bufferStart = -1
    const flush = () => {
      if (buffer.length > 0) {
        const joined = buffer.join('\n')
        blocks.push({ kind: 'p', text: joined, cleanStart: bufferStart, cleanLen: joined.length })
        buffer = []
        bufferStart = -1
      }
    }
    for (const rawLine of paragraph.split('\n')) {
      const markers = [...rawLine.matchAll(MARKER_RE)]
      const cleaned = rawLine.replace(MARKER_RE, '').trim()
      if (cleaned === '') {
        flush()
        for (const item of markers) blocks.push({ kind: 'img', key: item[1]! })
        continue
      }
      if (bufferStart < 0) bufferStart = cleanStart
      buffer.push(cleaned)
      cleanStart += cleaned.length + 1
    }
    flush()
  }
  return blocks
}

/** 段 k 在「行 trim 后以 '\n' 相连」全文中的起点 = Σ_{j<k}(len_j + 1)：
 * 段由整行组成（chunkText），每段末行在全文里后随一个换行符。
 * 2026-09-28 高亮漂移修复：此前起点用纯长度和，第 k 段的高亮整体前移 k 字。 */
export function segmentStarts(lengths: number[]): number[] {
  const starts: number[] = []
  let acc = 0
  for (const len of lengths) {
    starts.push(acc)
    acc += len + 1
  }
  return starts
}

/** 全文字符坐标 → 所在渲染块与块内偏移（字级高亮定位；img 块与块间换行不占坐标） */
export function locateChar(blocks: ReaderBlock[], globalChar: number): { index: number; localChar: number } | null {
  if (globalChar < 0) return null
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]!
    if (block.kind !== 'p') continue
    if (globalChar >= block.cleanStart && globalChar < block.cleanStart + block.cleanLen) {
      return { index: i, localChar: globalChar - block.cleanStart }
    }
  }
  return null
}

/** 字级时间轴按码点计（服务端 [...text] 切分），块坐标按 UTF-16 计：下标换算 */
export function codePointToUtf16Offset(text: string, cpIndex: number): number {
  let utf16 = 0
  let i = 0
  for (const ch of text) {
    if (i >= cpIndex) break
    utf16 += ch.length
    i += 1
  }
  return utf16
}

/** 正读块逐字渲染：当前字加粗、已读字略淡（与主阅读器同一视觉语言；按 UTF-16 偏移切分，增补平面字安全） */
function renderReadingChars(text: string, localChar: number): ReactNode {
  let utf16 = 0
  return Array.from(text).map((ch, i) => {
    const start = utf16
    utf16 += ch.length
    const isCurrent = localChar >= start && localChar < utf16
    const isPast = utf16 <= localChar
    return (
      <span key={i} style={{ fontWeight: isCurrent ? 800 : undefined, opacity: isPast && !isCurrent ? 0.72 : 1 }}>
        {ch}
      </span>
    )
  })
}

export function FamilyLibraryPage() {
  const token = useSession((state) => state.token)
  const childId = useSession((state) => state.childId)
  const navigate = useNavigate()
  const [books, setBooks] = useState<ImportedBookDto[]>([])
  const [error, setError] = useState('')
  const [progress, setProgress] = useState<Record<string, { order: number; completed: boolean }>>({})
  useEffect(() => { if (!token || !childId || !books.length) return; let live = true; void Promise.all(books.map(async (book) => [book.id, (await api.importedProgress(token, book.id, childId)).progress] as const)).then((rows) => { if (live) setProgress(Object.fromEntries(rows.filter((row) => row[1]).map(([id, value]) => [id, value!])) ) }); return () => { live = false } }, [token, childId, books])
  useEffect(() => { if (!token || !childId) return; let live = true; void api.importedBooks(token, childId).then((result) => { if (live) setBooks(result.books) }).catch((err: unknown) => { if (live) setError(err instanceof Error ? err.message : '无法加载家庭书架') }); return () => { live = false } }, [token, childId])
  return <><PageHead title="家庭书架" sub="家长挑选、只供本家庭阅读的书" />{error && <p role="alert">{error}</p>}<div className="fam-shelf">{books.map((book) => {
    const p = progress[book.id]
    return <button className="fam-card" key={book.id} onClick={() => navigate(`/child/family-book/${encodeURIComponent(book.id)}`)}>
      <span className="fam-cover">
        {book.coverUrl
          ? <img src={book.coverUrl} alt="" loading="lazy" />
          : <span className="fam-cover-fallback">{book.title.slice(0, 1)}</span>}
        {p?.completed && <span className="fam-done">读完啦</span>}
      </span>
      <b>{book.title}</b>
      <small className="mono-line">{book.author ?? '作者未标注'} · {book.chapterCount} 章</small>
      <small className={`fam-progress ${p?.completed ? 'done' : ''}`}>{p?.completed ? '已读完' : p ? `读至第 ${p.order} 章` : '未开始'}</small>
    </button>
  })}</div>{books.length === 0 && !error && <p className="mono-label">这里暂时没有适合你年龄段的家庭书。请家长在「内容 → 家庭书」里上传。</p>}</>
}

interface TtsSegment {
  index: number
  text: string
  audioUrl: string
  /** 字级时间轴（服务端按时长估算）：驱动「读到哪个字哪个字变粗」 */
  chars: Array<{ char: string; start: number; end: number }>
}

export function FamilyReaderPage() {
  const token = useSession((state) => state.token)
  const childId = useSession((state) => state.childId)
  const { id, order } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState<{ title: string; lang: string; chapters: Array<{ order: number; title: string }> } | null>(null)
  const [chapter, setChapter] = useState<{ order: number; title: string; text: string } | null>(null)
  const [images, setImages] = useState<Record<string, string>>({})
  const [artUrl, setArtUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState<{ order: number; offset: number; completed: boolean; updatedAt: string } | null>(null)
  const [theme, setTheme] = useState<ReadingTheme>(() => (localStorage.getItem('taoread-family-reader-theme') as ReadingTheme) || defaultReadingTheme())
  const [font, setFont] = useState(() => Number(localStorage.getItem('taoread-family-reader-font')) || 19)
  const [tocOpen, setTocOpen] = useState(false)
  const [tts, setTts] = useState<'idle' | 'loading' | 'playing' | 'paused'>('idle')
  const [speakingRange, setSpeakingRange] = useState<{ start: number; end: number } | null>(null)
  /** 字级高亮：正在读的块下标 + 块内字符偏移（UTF-16；null = 无字级定位，回退整段铺黄） */
  const [playingChar, setPlayingChar] = useState<{ index: number; localChar: number } | null>(null)
  const blocksRef = useRef<HTMLDivElement>(null)
  const sseRef = useRef<AbortController | null>(null)
  const jumpRef = useRef<number>(-1)
  const saveTimerRef = useRef<number | null>(null)
  const segmentsRef = useRef<Array<TtsSegment | undefined>>([])
  const startsRef = useRef<number[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playingIndexRef = useRef(-1)
  const ttsStateRef = useRef<'idle' | 'loading' | 'playing' | 'paused'>('idle')
  /** 字级高亮 rAF 句柄与去重键（每字一渲染，不逐帧刷） */
  const charRafRef = useRef<number | null>(null)
  const charKeyRef = useRef('')
  const renderBlocksRef = useRef<ReturnType<typeof parseBlocks>>([])
  const ink = FAMILY_THEME[theme]
  const chapterOrder = Number(order)

  useEffect(() => { localStorage.setItem('taoread-family-reader-theme', theme) }, [theme])
  useEffect(() => { localStorage.setItem('taoread-family-reader-font', String(font)) }, [font])

  const blocks = useMemo(() => (chapter ? parseBlocks(chapter.text) : []), [chapter])
  // 字级定位在 rAF 回调里读块表：提交后再写 ref，不违反渲染期不可写 ref 约束
  useLayoutEffect(() => {
    renderBlocksRef.current = blocks
  })
  const chapterIndex = book?.chapters.findIndex((item) => item.order === chapterOrder) ?? -1

  // 停掉朗读：换章/离开页面时必须断流（后台不再白合成）
  const stopTts = useCallback(() => {
    sseRef.current?.abort()
    sseRef.current = null
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.onended = null }
    stopCharLoop()
    segmentsRef.current = []
    startsRef.current = []
    playingIndexRef.current = -1
    jumpRef.current = -1
    charKeyRef.current = ''
    setPlayingChar(null)
    ttsStateRef.current = 'idle'
    setSpeakingRange(null)
    setTts('idle')
  }, [])
  useEffect(() => { stopTts() }, [order, id, stopTts])
  useEffect(() => () => stopTts(), [stopTts])

  useEffect(() => { setBook(null); if (!token || !childId || !id) return; let live = true; setError(''); void api.importedBook(token, id, childId).then(({ book: value }) => { if (live) setBook(value) }).catch((err: unknown) => { if (live) setError(err instanceof Error ? err.message : '书籍不可用') }); return () => { live = false } }, [token, childId, id])
  useEffect(() => {
    setChapter(null); setImages({}); setArtUrl(null); if (!token || !childId || !id || !order) return
    let live = true; setError('')
    void api.importedChapter(token, id, Number(order), childId).then((result) => { if (live) { setChapter(result.chapter); setImages(result.images ?? {}); setArtUrl(result.artUrl ?? null) } }).catch((err: unknown) => { if (live) setError(err instanceof Error ? err.message : '章节不可用') })
    return () => { live = false }
  }, [token, childId, id, order])

  useEffect(() => { if (!token || !childId || !id) return; let live = true; void api.importedProgress(token, id, childId).then(({ progress: value }) => { if (live) setProgress(value) }); return () => { live = false } }, [token, childId, id])

  async function save(offset: number, completed = false) {
    if (!token || !childId || !id || !order) return
    try {
      // B3：携带本机所基于的服务器版本；409=其他设备已写入更新进度，重新拉取并采用服务器版本
      const result = await api.saveImportedProgressV2(token, id, childId, { order: Number(order), offset, completed, ...(progress ? { baseUpdatedAt: progress.updatedAt } : {}) })
      setProgress(result.progress)
      setError('')
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        try {
          const latest = await api.importedProgress(token, id, childId)
          setProgress(latest.progress)
          setError('进度已在别的设备更新，已按最新进度继续')
        } catch { setError('保存没成功，再点一次试试') }
      } else {
        setError(err instanceof Error ? err.message : '保存进度失败')
      }
    }
  }

  // 续读定位：章节打开后滚到上次读到的块
  const resumedRef = useRef('')
  useEffect(() => {
    if (!chapter || !progress || progress.order !== Number(order) || progress.offset <= 0) return
    const key = `${id}:${order}:${chapter.text.length}`
    if (resumedRef.current === key) return
    resumedRef.current = key
    const target = blocks.find((block) => block.kind === 'p' && block.cleanStart + block.cleanLen >= progress.offset) ?? blocks[blocks.length - 1]
    if (target) {
      const element = blocksRef.current?.querySelector(`[data-block="${blocks.indexOf(target)}"]`)
      element?.scrollIntoView({ block: 'center' })
    }
  }, [chapter, progress, order, id, blocks])

  // 自动记进度：滚动停下 2 秒后，取视口顶部可见块的字符位置
  function onScroll() {
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => {
      const container = blocksRef.current
      if (!container || !chapter) return
      const containerTop = container.getBoundingClientRect().top
      let offset = 0
      for (const node of container.querySelectorAll<HTMLElement>('[data-block][data-clean-start]')) {
        if (node.getBoundingClientRect().top >= containerTop) { offset = Number(node.dataset.cleanStart ?? 0); break }
      }
      if (offset > 0) void save(offset)
    }, 2000)
  }

  // 朗读播放器（ref 控制器）：SSE 逐段拉取 → 顺序播放；段落高亮区间 = 当前段在「剔除标记后文本」中的范围。
  // 段由整行组成，段起点 = Σ前面各段(长度+1)——每段末行在全文里后随一个换行符（segmentStarts）。
  function stopCharLoop() {
    if (charRafRef.current !== null) {
      globalThis.cancelAnimationFrame(charRafRef.current)
      charRafRef.current = null
    }
  }

  /** 字级高亮驱动：rAF + 二分查当前段音频时间轴（与主阅读器 audioPlayer 同款），换算到全文坐标后定位渲染块 */
  function startCharLoop() {
    stopCharLoop()
    const tick = () => {
      charRafRef.current = globalThis.requestAnimationFrame(tick)
      const index = playingIndexRef.current
      const seg = index >= 0 ? segmentsRef.current[index] : undefined
      const audio = audioRef.current
      if (!seg || seg.chars.length === 0 || !audio || audio.paused || audio.ended) return
      const t = audio.currentTime * 1000
      let lo = 0
      let hi = seg.chars.length - 1
      let cp = -1
      while (lo <= hi) {
        const mid = (lo + hi) >> 1
        const c = seg.chars[mid]
        if (!c) break
        if (t < c.start) hi = mid - 1
        else if (t >= c.end) { cp = mid; lo = mid + 1 }
        else { cp = mid; break }
      }
      if (cp < 0) return
      const start = startsRef.current[index] ?? 0
      const hit = locateChar(renderBlocksRef.current, start + codePointToUtf16Offset(seg.text, cp))
      if (!hit) return
      const key = `${hit.index}:${hit.localChar}`
      if (key !== charKeyRef.current) {
        charKeyRef.current = key
        setPlayingChar(hit)
      }
    }
    charRafRef.current = globalThis.requestAnimationFrame(tick)
  }

  function applyTtsState(state: 'idle' | 'loading' | 'playing' | 'paused') {
    ttsStateRef.current = state
    setTts(state)
    if (state !== 'playing') stopCharLoop()
    if (state === 'idle' || state === 'loading') {
      charKeyRef.current = ''
      scrolledBlockRef.current = -1
      setPlayingChar(null)
    }
  }

  function playSegment(index: number) {
    const segment = segmentsRef.current[index]
    const start = startsRef.current[index]
    if (!segment || start === undefined) {
      // 段未到达（服务端串行合成，冷段可达数十秒）：短轮询等待到达。
      // 轮询闭包绑定当前 SSE 会话与 playing|paused 两态：stop 后旧轮询自我作废，
      // 段间隙点暂停只冻结会话、不再把它误重置成 idle（恢复后继续等下一段）。
      const sess = sseRef.current
      if (sess && !sess.signal.aborted && (ttsStateRef.current === 'playing' || ttsStateRef.current === 'paused')) {
        window.setTimeout(() => {
          if (sseRef.current === sess && (ttsStateRef.current === 'playing' || ttsStateRef.current === 'paused')) playSegment(index)
        }, 800)
        return
      }
      // 流已结束仍缺段（该段被服务端跳过/合成失败）：顺延到下一个已到达的段，否则收尾
      for (let next = index + 1; next < segmentsRef.current.length; next++) {
        if (segmentsRef.current[next]) {
          playSegment(next)
          return
        }
      }
      applyTtsState('idle')
      return
    }
    playingIndexRef.current = index
    applyTtsState('playing')
    setSpeakingRange({ start, end: start + segment.text.length })
    if (segment.chars.length > 0) startCharLoop()
    const audio = audioRef.current ?? (audioRef.current = new Audio())
    audio.onended = () => {
      if (ttsStateRef.current !== 'playing') return
      playSegment(index + 1)
    }
    audio.src = segment.audioUrl
    void audio.play().catch(() => applyTtsState('paused'))
  }

  function playFrom(paragraphCleanStart: number | null) {
    if (!token || !id || !order || !chapter) return
    stopTts()
    const controller = new AbortController()
    sseRef.current = controller
    applyTtsState('loading')
    if (paragraphCleanStart !== null) jumpRef.current = paragraphCleanStart
    void api.ttsChapterStream(id, Number(order), { lang: (book?.lang as 'zh' | 'en') ?? 'zh' }, {
      onSegment: (segment) => {
        // 段起点用服务端权威值（服务端跳段时客户端拼不出真值）；缺失时退回 Σ(len+1) 自算
        startsRef.current[segment.index] = segment.start ?? segmentsRef.current.reduce((sum, item) => sum + (item ? item.text.length + 1 : 0), 0)
        segmentsRef.current[segment.index] = { index: segment.index, text: segment.text, audioUrl: segment.audioUrl, chars: segment.chars }
        const jump = jumpRef.current
        const start = startsRef.current[segment.index]!
        if (jump >= 0 && start + segment.text.length > jump) {
          // 跳读目标落进当前段：从这一段开始播
          jumpRef.current = -1
          playSegment(segment.index)
        } else if (jump < 0 && playingIndexRef.current < 0) {
          // 无跳读目标：从第一个到达的段起播（首段被供应商跳过时自动顺延，不再整体哑火）
          playSegment(segment.index)
        }
      },
      onError: (message) => {
        // 服务端单段失败后仍会继续推后续段：只提示，不断播放链
        setError(message)
        if (playingIndexRef.current < 0) applyTtsState('idle')
      },
      onDone: () => {
        // 流结束即释放会话引用：末段播完后的等待轮询据此走顺延/收尾，不再永久空转卡在暂停态
        sseRef.current = null
        if (jumpRef.current >= 0) { jumpRef.current = -1; applyTtsState('idle') }
      },
    }, { signal: controller.signal })
  }

  function togglePlay() {
    if (ttsStateRef.current === 'playing') {
      audioRef.current?.pause()
      applyTtsState('paused')
      return
    }
    if (ttsStateRef.current === 'paused') {
      void audioRef.current?.play().then(() => {
        applyTtsState('playing')
        startCharLoop()
      }).catch(() => applyTtsState('idle'))
      return
    }
    playFrom(null)
  }

  /** 点段落：已在播 → 跳到覆盖该段的音频；未播 → 从该段开始整章朗读 */
  function jumpToParagraph(cleanStart: number) {
    if (ttsStateRef.current === 'idle' || ttsStateRef.current === 'loading') { playFrom(cleanStart); return }
    const index = segmentsRef.current.findIndex((segment) => segment !== undefined && startsRef.current[segment.index] !== undefined && startsRef.current[segment.index]! + segment.text.length > cleanStart)
    if (index >= 0) playSegment(index)
  }

  // 朗读跟随滚动：正在读的块滚到视野中央（字级定位优先，无字级时间轴时回退段区间首块）；只在块切换时滚
  const scrolledBlockRef = useRef(-1)
  useEffect(() => {
    const container = blocksRef.current
    if (!container) return
    let targetIndex = -1
    if (playingChar) targetIndex = playingChar.index
    else if (speakingRange) {
      targetIndex = renderBlocksRef.current.findIndex((block) => block.kind === 'p' && block.cleanStart < speakingRange.end && block.cleanStart + block.cleanLen > speakingRange.start)
    }
    if (targetIndex < 0 || targetIndex === scrolledBlockRef.current) return
    const element = container.querySelector<HTMLElement>(`[data-block="${targetIndex}"]`)
    if (!element) return
    scrolledBlockRef.current = targetIndex
    const rect = element.getBoundingClientRect()
    if (rect.top < 0 || rect.bottom > window.innerHeight) element.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [playingChar, speakingRange])

  const tocGroups = useMemo(() => {
    const groups: Array<{ label: string | null; chapters: Array<{ order: number; title: string }> }> = []
    for (const item of book?.chapters ?? []) {
      const separator = item.title.indexOf(' · ')
      const label = separator > 0 ? item.title.slice(0, separator) : null
      const last = groups[groups.length - 1]
      if (last && last.label === label) last.chapters.push(item)
      else groups.push({ label, chapters: [item] })
    }
    return groups
  }, [book])

  const chapterTotal = book?.chapters.length ?? 0

  return <><PageHead title={book?.title ?? '家庭书'} sub="私有文本阅读" /><button className="sticker-btn" onClick={() => navigate('/child/family-books')}>返回家庭书架</button>{error && <p role="alert">{error}</p>}
    {!order ? <div className="library">
      {progress && !progress.completed && <button className="sticker-btn primary" onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${progress.order}`)}>从第 {progress.order} 章续读</button>}
      <button className="sticker-btn" onClick={() => setTocOpen(true)}>打开目录</button>
      {tocOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setTocOpen(false)}>
        <div style={{ width: 'min(360px, 86vw)', background: ink.bg, color: ink.fg, overflowY: 'auto', padding: 16 }} onClick={(event) => event.stopPropagation()}>
          <b>目录</b>
          {tocGroups.map((group, groupIndex) => <div key={groupIndex} style={{ marginTop: 12 }}>
            {group.label && <div style={{ fontSize: 13, color: ink.muted, margin: '8px 0 4px' }}>{group.label}</div>}
            {group.chapters.map((item) => <button key={item.order} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 10, background: item.order === chapterOrder ? ink.highlight : 'transparent', color: ink.fg, border: 'none', cursor: 'pointer' }} onClick={() => { setTocOpen(false); navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${item.order}`) }}>{item.order}. {group.label ? item.title.slice(group.label.length + 3) : item.title}</button>)}
          </div>)}
        </div>
      </div>}
      {book?.chapters.map((item) => <button className="panel" key={item.order} style={{ display: 'block', width: '100%', textAlign: 'left' }} onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${item.order}`)}>{item.order}. {item.title}</button>)}
    </div>
      : <div style={{ maxWidth: 780, margin: '24px auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: ink.muted }}>{chapterIndex >= 0 ? `第 ${chapterIndex + 1} / ${chapterTotal} 章` : ''}</span>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: ink.highlight, opacity: 0.5, minWidth: 80 }}>
            <div style={{ width: `${chapterTotal ? ((chapterIndex + 1) / chapterTotal) * 100 : 0}%`, height: '100%', borderRadius: 3, background: ink.fg }} />
          </div>
          <button className="sticker-btn" style={{ minHeight: 34, fontSize: 12 }} onClick={() => setTocOpen(true)}>目录</button>
          <button className="sticker-btn" style={{ minHeight: 34, fontSize: 12 }} onClick={() => setTheme(theme === 'paper' ? 'sepia' : theme === 'sepia' ? 'night' : 'paper')}>{theme === 'paper' ? '☀' : theme === 'sepia' ? '📜' : '🌙'}</button>
          <button className="sticker-btn" style={{ minHeight: 34, fontSize: 12 }} onClick={() => setFont((value) => Math.max(14, value - 2))}>A-</button>
          <button className="sticker-btn" style={{ minHeight: 34, fontSize: 12 }} onClick={() => setFont((value) => Math.min(30, value + 2))}>A+</button>
          <button className="sticker-btn primary" style={{ minHeight: 34, fontSize: 12 }} onClick={togglePlay}>{tts === 'loading' ? '准备中…' : tts === 'playing' ? '⏸ 暂停朗读' : tts === 'paused' ? '▶ 继续朗读' : '▶ 朗读本章'}</button>
        </div>
        {tocOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setTocOpen(false)}>
          <div style={{ width: 'min(360px, 86vw)', background: ink.bg, color: ink.fg, overflowY: 'auto', padding: 16 }} onClick={(event) => event.stopPropagation()}>
            <b>目录</b>
            {tocGroups.map((group, groupIndex) => <div key={groupIndex} style={{ marginTop: 12 }}>
              {group.label && <div style={{ fontSize: 13, color: ink.muted, margin: '8px 0 4px' }}>{group.label}</div>}
              {group.chapters.map((item) => <button key={item.order} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 10, background: item.order === chapterOrder ? ink.highlight : 'transparent', color: ink.fg, border: 'none', cursor: 'pointer' }} onClick={() => { setTocOpen(false); navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${item.order}`) }}>{item.order}. {group.label ? item.title.slice(group.label.length + 3) : item.title}</button>)}
            </div>)}
          </div>
        </div>}
        <article className="panel" onScroll={onScroll} style={{ background: ink.bg, color: ink.fg, lineHeight: 2, overflowWrap: 'anywhere', padding: '20px 24px', maxHeight: 'calc(100dvh - 220px)', overflowY: 'auto' }}>
          <div ref={blocksRef}>
            <h2 style={{ fontSize: Math.round(font * 1.25) }}>{chapter?.title ?? '正在打开章节…'}</h2>
            {artUrl && <div style={{ margin: '0 0 14px' }}><img src={artUrl} alt="" style={{ width: '100%', borderRadius: 14 }} onError={(event) => { (event.target as HTMLImageElement).style.display = 'none' }} /></div>}
            {blocks.map((block, index) => block.kind === 'img'
              ? <div key={index} data-block={index} style={{ margin: '14px 0' }}><img src={images[block.key]} alt="" loading="lazy" style={{ width: '100%', borderRadius: 14 }} onError={(event) => { (event.target as HTMLImageElement).style.display = 'none' }} /></div>
              : <p key={index} data-block={index} data-clean-start={block.cleanStart} data-clean-len={block.cleanLen} onClick={() => jumpToParagraph(block.cleanStart)} style={{ whiteSpace: 'pre-wrap', textIndent: '2em', margin: '0 0 14px', fontSize: font, cursor: tts === 'idle' ? 'default' : 'pointer', background: (playingChar && playingChar.index === index) || (speakingRange && block.cleanStart < speakingRange.end && block.cleanStart + block.cleanLen > speakingRange.start) ? ink.highlight : 'transparent', borderRadius: 8, transition: 'background 0.3s' }}>{playingChar && playingChar.index === index ? renderReadingChars(block.text, playingChar.localChar) : block.text}</p>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button disabled={chapterOrder <= 1} onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${chapterOrder - 1}`)}>上一章</button>
            <button onClick={() => { const lastText = [...blocks].reverse().find((block) => block.kind === 'p'); void save(lastText ? lastText.cleanStart + lastText.cleanLen : 0, chapterOrder === chapterTotal) }}>读完本章</button>
            <button disabled={chapterOrder >= chapterTotal} onClick={() => navigate(`/child/family-book/${encodeURIComponent(id ?? '')}/chapter/${chapterOrder + 1}`)}>下一章</button>
          </div>
        </article>
      </div>}
  </>
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



