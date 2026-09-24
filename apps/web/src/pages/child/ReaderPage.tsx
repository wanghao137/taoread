/**
 * V8 阅读器页（路由 /child/book/:bookId/chapter/:order）。
 * 审计整改 Phase 2 + A8.3：把旧 ReaderScreen 的成熟能力移植进 v8.css 贴纸绘本壳——
 * 会话守卫（ACTIVE_SESSION_OTHER_BOOK 三选一 / RITUAL_CLOSED 休息时间）、章节加载与目录、
 * 进度上报（进入即报 + 滚动 5s 节流 + 按已存 blockOrder 续读定位）、
 * 服务端朗读（回退 Web Speech）与高亮档位、主题/字号/专注模式、生词贴纸、读完结算浮层。
 * 样式只用 v8.css 既有类（.reader/.reader-top/.reader-body/.reader-art/.reader-text/.reader-controls/.settings）。
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, API_BASE, type ContentChapterDto } from '../../lib/api'
import { tts } from '../../lib/tts'
import { audioPlayer, type VoiceOption } from '../../lib/audioPlayer'
import { useSession } from '../../stores/session'
import { extractNoteWord } from '../../lib/preview'
import { AiBadge } from '../../components/art/AiBadge'
import { PoemRuby } from './ReaderScreen'
import { useV8, LABELS, type V8Book } from './V8App'

type ReaderTheme = 'paper' | 'sepia' | 'night'

const FONT_MIN = 18
const FONT_MAX = 30
const FONT_STEP = 2

/** 语速档位（朗读给跟读用，不给无极滑杆） */
const SPEED_STEPS: Array<{ label: string; value: number }> = [
  { label: '慢一点', value: 0.8 },
  { label: '刚好', value: 1 },
  { label: '快一点', value: 1.2 },
]

/** 结算浮层心情五档（A7 mood taxonomy 的孩子语义） */
const MOOD_OPTIONS: Array<{ key: string; label: string }> = [
  { key: 'happy', label: '开心' },
  { key: 'excited', label: '惊喜' },
  { key: 'calm', label: '安静' },
  { key: 'curious', label: '好奇' },
  { key: 'thinking', label: '想一想' },
]

const HIGHLIGHT_MODES: Array<{ v: 'auto' | 'word' | 'sentence' | 'off'; label: string }> = [
  { v: 'auto', label: '跟着年龄' },
  { v: 'word', label: '逐字' },
  { v: 'sentence', label: '逐句' },
  { v: 'off', label: '关掉' },
]

/** 正文/拼音的墨色（v8.css 的 .reader 只给底色，PoemRuby 需要显式色值） */
const THEME_INK: Record<ReaderTheme, string> = {
  paper: '#2b261f',
  sepia: '#4a3b28',
  night: '#f6eddc',
}

/** 内容域书在共读会话里的引用前缀（apps/server/src/content/service.ts CBF_PREFIX） */
const CBF_PREFIX = 'cbf:'

interface SpeakHighlight {
  index: number
  total: number
  text: string
  /** 段内字符下标；-1 = 尚未定位（Web Speech 回退恒为 -1） */
  charIndex: number
}

interface ChapterTitleItem {
  order: number
  title: string
}

/** 就寝/超时的会话冲突与窗口状态之外的共同浮层壳：.settings 样式 + 半透明背板 */
function Overlay({
  onClose,
  children,
  dismissable = true,
}: {
  onClose: () => void
  children: ReactNode
  dismissable?: boolean
}) {
  return (
    <>
      <div
        aria-hidden
        onClick={dismissable ? onClose : undefined}
        style={{ position: 'fixed', inset: 0, background: 'rgba(38,32,26,.45)', zIndex: 25 }}
      />
      <section className="settings" style={{ zIndex: 30 }}>
        {children}
      </section>
    </>
  )
}

export function ReaderPage({ book, order: initialOrder }: { book: V8Book; order: number }): JSX.Element {
  const { showToast } = useV8()
  const navigate = useNavigate()
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const childStage = useSession((s) => s.childStage)

  /* ── 章节与目录 ── */
  const startOrder = Math.min(Math.max(Math.floor(initialOrder) || 1, 1), Math.max(1, book.chapterCount))
  const [order, setOrder] = useState(startOrder)
  const [chapter, setChapter] = useState<ContentChapterDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [chapterError, setChapterError] = useState<string | null>(null)
  const [titles, setTitles] = useState<ChapterTitleItem[]>([])
  const [titlesError, setTitlesError] = useState(false)

  /* ── 共读会话（Phase 2 A3.2：异书冲突三选一；RITUAL_CLOSED 休息时间） ── */
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [conflict, setConflict] = useState<{ id: string; bookId: string | null } | null>(null)
  const [conflictBusy, setConflictBusy] = useState(false)
  const [ritualClosed, setRitualClosed] = useState(false)
  const [overtime, setOvertime] = useState(false)

  /* ── 排版与专注 ── */
  const [theme, setTheme] = useState<ReaderTheme>('paper')
  const [font, setFont] = useState(22)
  const [focused, setFocused] = useState(false)
  const focusHintShown = useRef(false)

  /* ── 朗读 ── */
  const [speaking, setSpeaking] = useState(false)
  /** 服务端朗读合成中（首次点击到首段音频返回，约 10-40 秒）——给用户可见的等待状态 */
  const [preparing, setPreparing] = useState(false)
  const [highlight, setHighlight] = useState<SpeakHighlight | null>(null)
  const [highlightMode, setHighlightMode] = useState<'auto' | 'word' | 'sentence' | 'off'>('auto')
  const [serverReady, setServerReady] = useState<boolean | null>(null)
  const [serverVoices, setServerVoices] = useState<VoiceOption[]>([])
  const [voiceId, setVoiceId] = useState<string | null>(null)
  const [speed, setSpeed] = useState(1)

  /* ── 浮层开关 ── */
  const [showSettings, setShowSettings] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  const [showFinish, setShowFinish] = useState(false)
  const [mood, setMood] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [finishing, setFinishing] = useState(false)

  /* ── 生词本 ── */
  const [collectedWords, setCollectedWords] = useState<Set<string>>(new Set())

  /* ── 插画加载失败集合（隐藏坏图，回退 CSS 画框，绝不假装有图） ── */
  const [artBroken, setArtBroken] = useState<Set<string>>(new Set())

  /* ── 进度上报（旧 ReaderScreen C3 的可视块算法） ── */
  const blockRefs = useRef<Map<string, HTMLElement | null>>(new Map())
  const lastReport = useRef(0)
  const currentBlockRef = useRef(0)
  /** 进入章节时待恢复的块下标（来自 contentProgress.blockOrder，消费一次即清零） */
  const restoredBlockRef = useRef(0)
  /** 内部滚动容器（scroll 不冒泡，必须 addEventListener 到容器本身） */
  const mainRef = useRef<HTMLElement | null>(null)

  /* ── B2/F13：保存状态机——失败可见、自动重试、离开页面 keepalive 兜底提交 ── */
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  /** 尚未成功落库的进度；重试与离开提交都以它为准，成功后清空 */
  const unsavedRef = useRef<{ chapterOrder: number; blockOrder: number } | null>(null)
  const saveSeqRef = useRef(0)

  const persistProgress = useCallback(
    async (payload: { chapterOrder: number; blockOrder: number }) => {
      if (!childId || !token) return
      const seq = ++saveSeqRef.current
      setSaveState('saving')
      try {
        await api.reportContentProgress(book.id, childId, payload, token)
        if (seq === saveSeqRef.current) {
          unsavedRef.current = null
          setSaveState('saved')
        }
      } catch {
        // 保留 unsavedRef，等 8 秒重试 / 下次滚动 / 离开兜底；顶部状态条可见
        if (seq === saveSeqRef.current) setSaveState('failed')
      }
    },
    [childId, token, book.id],
  )

  /** 失败自动重试（8s）；在途保存由序号保证只认最新一次结果 */
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (unsavedRef.current) void persistProgress(unsavedRef.current)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [persistProgress])

  /** 离开页面兜底：sendBeacon 带不了 Authorization，用 keepalive fetch 提交未保存进度 */
  useEffect(() => {
    const flush = () => {
      const payload = unsavedRef.current
      if (!payload || !childId || !token) return
      try {
        void fetch(`${API_BASE}/api/content/books/${encodeURIComponent(book.id)}/progress`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` },
          body: JSON.stringify({ childId, ...payload }),
          keepalive: true,
        }).catch(() => undefined)
      } catch {
        /* 已尽力：下次打开按服务器已有进度续读 */
      }
    }
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', onHide)
    return () => {
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [childId, token, book.id])
  const chapterRef = useRef<ContentChapterDto | null>(null)

  const isLastChapter = order >= book.chapterCount
  const ink = THEME_INK[theme]

  /* ── 会话：开启共读；409 异书冲突 → 三选一浮层；就寝闸 → 休息时间全屏 ──
   * 审计 A10.5：内容域书进会话必须带 cbf: 前缀（服务端据此解析书名/判定 book_done/
   * 放行「继续读旧书」）——裸内容 id 会被当成微信读书书，污染周报与成就口径。 */
  const startSession = useCallback(async (): Promise<string | null> => {
    if (!token || !childId) return null
    try {
      const s = await api.startCosession(childId, `${CBF_PREFIX}${book.id}`, token)
      setSessionId(s.id)
      return s.id
    } catch (err) {
      if (err instanceof ApiError && err.code === 'RITUAL_CLOSED') {
        // 审计 Phase 7：就寝窗口服务端拒绝——孩子端必须停在休息屏，绝不照常进书
        setRitualClosed(true)
        return null
      }
      if (err instanceof ApiError && err.code === 'ACTIVE_SESSION_OTHER_BOOK') {
        try {
          const res = await api.activeCosession(childId, token)
          if (res.session) {
            setConflict({ id: res.session.id, bookId: res.session.bookId ?? null })
            return null
          }
        } catch {
          /* 拿不到旧会话信息也要给选择浮层，收尾按钮兜底 */
        }
        setConflict({ id: '', bookId: null })
        return null
      }
      showToast(err instanceof Error ? err.message : '共读会话没开起来，再试一次')
      return null
    }
  }, [token, childId, book.id, showToast])

  useEffect(() => {
    void startSession()
  }, [startSession])

  /* ── 仪式时段窗口（服务端权威）：bedtime 直接进休息屏；overtime 顶栏挂温和徽标 ── */
  useEffect(() => {
    if (!token || !childId) return
    let alive = true
    api
      .ritualWindow(childId, token)
      .then((res) => {
        if (!alive) return
        if (res.mode === 'bedtime') setRitualClosed(true)
        else if (res.mode === 'overtime') setOvertime(true)
      })
      .catch(() => {
        /* 探测失败不拦阅读：startCosession 的 RITUAL_CLOSED 仍是硬闸 */
      })
    return () => {
      alive = false
    }
  }, [token, childId])

  useEffect(() => {
    if (!ritualClosed) return
    audioPlayer.stop()
    if (tts.isSpeaking) tts.stop()
    setSpeaking(false)
    setHighlight(null)
  }, [ritualClosed])

  /* ── 章节加载：进入即报进度（带恢复块），失败给错误态/翻章失败留在原章 ── */
  const loadChapter = useCallback(
    async (target: number, restoreBlock = 0) => {
      if (!token) return
      setLoading(true)
      setChapterError(null)
      try {
        const res = await api.contentChapter(book.id, target, token)
        restoredBlockRef.current = restoreBlock
        currentBlockRef.current = restoreBlock
        chapterRef.current = res.chapter
        setChapter(res.chapter)
        setOrder(target)
        if (childId) {
          const now = Date.now()
          if (now - lastReport.current > 5000) {
            lastReport.current = now
            void api
              .reportContentProgress(book.id, childId, { chapterOrder: target, blockOrder: restoreBlock }, token)
              .catch(() => {})
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : '这一章还藏在云朵后面'
        if (chapterRef.current) {
          // 翻章失败：留在当前章，错误用 toast 可见
          showToast(msg)
        } else {
          setChapterError(msg)
        }
      } finally {
        setLoading(false)
      }
    },
    [token, book.id, childId, showToast],
  )

  /* ── 首次进入：先取已存进度（续读定位），再载入章节 ── */
  useEffect(() => {
    let alive = true
    void (async () => {
      let restore = 0
      if (childId && token) {
        try {
          const res = await api.contentProgress(book.id, childId, token)
          if (alive && !res.progress.finished && res.progress.chapterOrder === startOrder) {
            restore = res.progress.blockOrder
          }
        } catch {
          /* 没有进度记录就从头读 */
        }
      }
      if (alive) void loadChapter(startOrder, restore)
    })()
    return () => {
      alive = false
    }
    // 仅在挂载时恢复一次；翻章由 goPrev/goNext/目录驱动
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── 章节目录（并行加载；失败在抽屉里给重试） ── */
  const loadTitles = useCallback(() => {
    if (!token) return
    setTitlesError(false)
    api
      .contentChapterList(book.id, token)
      .then((res) => setTitles(res.chapters))
      .catch(() => setTitlesError(true))
  }, [token, book.id])

  useEffect(() => {
    loadTitles()
  }, [loadTitles])

  /* ── 朗读引擎事件订阅：两条路径共用 highlight 状态，UI 无感差异 ── */
  useEffect(() => {
    const offAp = audioPlayer.onProgress((p) => setHighlight({ index: p.index, total: p.total, text: p.text, charIndex: p.charIndex }))
    const offAe = audioPlayer.onEnd(() => {
      setSpeaking(false)
      setHighlight(null)
    })
    const offAerr = audioPlayer.onError((msg) => {
      setSpeaking(false)
      setHighlight(null)
      showToast(msg)
    })
    const offTp = tts.onProgress((p) => setHighlight({ index: p.index, total: p.total, text: p.text, charIndex: p.charIndex }))
    const offTe = tts.onEnd(() => {
      setSpeaking(false)
      setHighlight(null)
    })
    const offTerr = tts.onError((msg) => {
      setSpeaking(false)
      setHighlight(null)
      showToast(msg)
    })
    return () => {
      offAp()
      offAe()
      offAerr()
      offTp()
      offTe()
      offTerr()
    }
  }, [showToast])

  /* ── 服务端 TTS 探测（内部走 api.ttsVoices）：音色列表空则设置里隐藏声音项 ── */
  useEffect(() => {
    let alive = true
    void audioPlayer.probe().then((ok) => {
      if (!alive) return
      setServerReady(ok)
      setServerVoices(audioPlayer.voiceList)
    })
    return () => {
      alive = false
    }
  }, [])

  /* ── 离开阅读器停掉两个引擎 ── */
  useEffect(() => {
    return () => {
      if (tts.isSpeaking) tts.stop()
      audioPlayer.stop()
    }
  }, [])

  /* ── 滚动节流上报（5s；挂在 main 容器上——scroll 不冒泡到 window） ── */
  useEffect(() => {
    const mainEl = mainRef.current
    if (!mainEl) return
    const onScroll = () => {
      const ch = chapterRef.current
      if (!ch || !childId || !token) return
      const now = Date.now()
      if (now - lastReport.current < 5000) return
      // 视口顶部之下第一个可见块（旧 ReaderScreen 同款算法）
      const probe = 120
      let idx = 0
      for (let i = 0; i < ch.blocks.length; i++) {
        const el = blockRefs.current.get(ch.blocks[i]!.id)
        if (el && el.getBoundingClientRect().top > probe) {
          idx = Math.max(0, i - 1)
          break
        }
        idx = i
      }
      lastReport.current = now
      currentBlockRef.current = idx
      const payload = { chapterOrder: order, blockOrder: idx }
      unsavedRef.current = payload
      void persistProgress(payload)
    }
    mainEl.addEventListener('scroll', onScroll, { passive: true })
    return () => mainEl.removeEventListener('scroll', onScroll)
  }, [chapter, childId, token, order, book.id, persistProgress])

  /* ── 进入章节按已存 blockOrder 滚动定位（消费 restoredBlockRef 一次） ── */
  useEffect(() => {
    if (!chapter) return
    const want = restoredBlockRef.current
    restoredBlockRef.current = 0
    const raf = requestAnimationFrame(() => {
      const mainEl = mainRef.current
      if (!mainEl) return
      if (want > 0) {
        const blocks = chapter.blocks
        const hit = blocks[Math.min(want, blocks.length - 1)]
        const el = hit ? blockRefs.current.get(hit.id) : null
        if (el) {
          el.scrollIntoView({ behavior: 'instant', block: 'start' })
          return
        }
      }
      mainEl.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    })
    return () => cancelAnimationFrame(raf)
  }, [chapter])

  /* ── 朗读当前章：服务端优先，不可用回退 Web Speech ── */
  const stopSpeaking = useCallback(() => {
    audioPlayer.stop()
    tts.stop()
    setSpeaking(false)
    setHighlight(null)
  }, [])

  const toggleSpeak = useCallback(() => {
    const ch = chapterRef.current
    if (!ch) return
    if (speaking) {
      stopSpeaking()
      return
    }
    void (async () => {
      // 被自动播放策略拦下时，这是用户手势入口：从队列当前段恢复
      if (serverReady) {
        // 冷合成要 10-40s，等首段返回时手势已失效——先在点击手势内解锁音频元素
        audioPlayer.prime()
        const resumed = await audioPlayer.resumeQueue()
        if (resumed) {
          setSpeaking(true)
          setPreparing(false)
          return
        }
      }
      let started = false
      setPreparing(true)
      // 兜底：极端情况下请求挂起，90 秒后恢复按钮可用
      const prepareGuard = window.setTimeout(() => setPreparing(false), 90_000)
      try {
        if (serverReady) {
          started = await audioPlayer.speakChapter(
            book.id,
            order,
            { title: ch.title, bookTitle: book.title },
            { lang: book.lang, ...(voiceId ? { voiceId } : {}), speed },
          )
        }
      } catch {
        started = false
      }
      window.clearTimeout(prepareGuard)
      setPreparing(false)
      if (started) {
        setSpeaking(true)
        return
      }
      const text = ch.blocks
        .filter((b) => b.kind === 'text' || b.kind === 'poem')
        .map((b) => b.text)
        .join('\n')
      const fallbackStarted = tts.speak(text, { lang: book.lang, rate: speed })
      if (fallbackStarted) {
        setSpeaking(true)
      } else {
        showToast('这台设备暂时不能朗读')
      }
    })()
  }, [speaking, serverReady, book.id, book.lang, book.title, order, voiceId, speed, stopSpeaking, showToast])

  /* ── 高亮档位与正在读的块 ── */
  const effectiveHighlight = useMemo<'word' | 'sentence' | 'off'>(() => {
    if (highlightMode === 'off') return 'off'
    if (highlightMode === 'auto') {
      // 6-8 / 9-12 识字敏感期逐字；3-5 前读写者整段
      return childStage === '6-8' || childStage === '9-12' ? 'word' : 'sentence'
    }
    return highlightMode
  }, [highlightMode, childStage])

  /* ── 朗读高亮定位：段文本 → 原文块范围映射（修复英文/多块高亮错位） ──
   * 服务端把多个块拼成一段合成，charIndex 是「段内偏移」。此前直接拿段内偏移对
   * 每个块逐字渲染，非首块必然错位；英文按字符等分时间轴还会停到词中间。
   * 现在按顺序在段文本中定位每个块的出现区间，charIndex → (块, 块内偏移)。 */
  const segmentRanges = useMemo(() => {
    if (!chapter || !highlight?.text) return null
    const segText = highlight.text
    const ranges: Array<{ id: string; start: number; end: number }> = []
    let from = 0
    for (const b of chapter.blocks) {
      if (b.kind === 'image' || !b.text) continue
      const hit = segText.indexOf(b.text, from)
      if (hit < 0) continue
      ranges.push({ id: b.id, start: hit, end: hit + b.text.length })
      from = hit + b.text.length
    }
    return ranges.length ? ranges : null
  }, [chapter, highlight])

  const currentChar = highlight?.charIndex ?? -1
  const activeRange = useMemo(() => {
    if (!segmentRanges || currentChar < 0) return null
    let last: (typeof segmentRanges)[number] | null = null
    for (const r of segmentRanges) {
      if (currentChar >= r.start && currentChar < r.end) return r
      if (currentChar >= r.end) last = r
    }
    return last
  }, [segmentRanges, currentChar])

  const speakingBlockId = useMemo(() => {
    if (!highlight || !chapter || effectiveHighlight === 'off') return null
    if (activeRange) return activeRange.id
    const hit = chapter.blocks.find((b) => b.text.includes(highlight.text.slice(0, 12)))
    return hit?.id ?? null
  }, [highlight, chapter, effectiveHighlight, activeRange])

  // 朗读的块滚动进视野（只在块切换时滚，不逐字打断）
  useEffect(() => {
    if (!speakingBlockId) return
    const el = blockRefs.current.get(speakingBlockId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [speakingBlockId])

  /** 逐字档：当前字加粗、已读略淡（靠字重与透明度，色盲友好） */
  function renderSpeakingChars(text: string, blockId?: string): ReactNode {
    const hl = highlight
    if (effectiveHighlight !== 'word' || !hl || hl.charIndex < 0) return text
    // 段内偏移 → 块内偏移（映射失败则不做逐字，避免错位假高亮）
    const range = blockId ? segmentRanges?.find((r) => r.id === blockId) : null
    if (!range) return text
    if (currentChar < range.start || currentChar >= range.end) return text
    const localChar = currentChar - range.start
    const chars = Array.from(text)
    // 英文：锁定到当前词整体（字符等分时间轴天然有偏移，逐字符高亮必然对不上）
    if (book.lang === 'en') {
      let ws = localChar
      let we = localChar
      while (ws > 0 && /[A-Za-z']/.test(chars[ws - 1] ?? '')) ws -= 1
      while (we < chars.length - 1 && /[A-Za-z']/.test(chars[we + 1] ?? '')) we += 1
      if (!/[A-Za-z']/.test(chars[ws] ?? '')) return text
      return chars.map((ch, i) => (
        <span
          key={i}
          style={{
            fontWeight: i >= ws && i <= we ? 800 : undefined,
            opacity: i < ws ? 0.72 : 1,
          }}
        >
          {ch}
        </span>
      ))
    }
    return chars.map((ch, i) => (
      <span
        key={i}
        style={{
          fontWeight: i === localChar ? 800 : undefined,
          opacity: i < localChar ? 0.72 : 1,
        }}
      >
        {ch}
      </span>
    ))
  }

  /* ── 章节切换（切章先停朗读，避免读到上一章的声音） ── */
  const goChapter = useCallback(
    (target: number) => {
      if (target < 1 || target > book.chapterCount) return
      stopSpeaking()
      void loadChapter(target, 0)
    },
    [book.chapterCount, loadChapter, stopSpeaking],
  )

  /* ── 专注模式：点正文留白收起/恢复顶栏与控制条 ── */
  const toggleFocus = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('button, a, figure, input, [data-no-focus]')) return
      setFocused((prev) => {
        const next = !prev
        if (next && !focusHintShown.current) {
          focusHintShown.current = true
          showToast('专心读故事吧 · 再点一下屏幕，工具就回来啦')
        }
        return next
      })
    },
    [showToast],
  )

  /* ── 生词：note 块听词/收词 ── */
  const speakWord = useCallback(
    (word: string) => {
      void audioPlayer.speak(word, { lang: 'en', speed }).then((ok) => {
        if (!ok) tts.speak(word, { lang: 'en', rate: speed })
      })
    },
    [speed],
  )

  const collectWord = useCallback(
    async (word: string) => {
      if (!childId || !token) return
      try {
        await api.addWord(childId, { word, lang: book.lang, bookId: book.id, context: chapterRef.current?.title }, token)
        setCollectedWords((prev) => new Set(prev).add(word))
        showToast('已收进生词本')
      } catch (err) {
        showToast(err instanceof Error ? err.message : '这个词没收进来，再试一次')
      }
    },
    [childId, token, book.lang, book.id, showToast],
  )

  /* ── 读完啦：先报进度（completed 只在最后一章为 true），再开结算浮层 ── */
  const openFinish = useCallback(async () => {
    if (!childId || !token) return
    if (speaking) stopSpeaking()
    try {
      await api.reportContentProgress(
        book.id,
        childId,
        { chapterOrder: order, blockOrder: currentBlockRef.current, completed: order >= book.chapterCount },
        token,
      )
    } catch (err) {
      showToast(err instanceof Error ? err.message : '进度没存上，再试一次')
      return
    }
    setShowFinish(true)
  }, [childId, token, book.id, book.chapterCount, order, speaking, stopSpeaking, showToast])

  const submitHighlight = useCallback(async () => {
    const text = noteText.trim()
    if (!text || !token) return
    let sid = sessionId
    if (!sid) sid = await startSession()
    if (!sid) return // startSession 已给出可见错误/浮层
    setSavingNote(true)
    try {
      await api.addHighlight(sid, { source: 'voice', text }, token)
      setNoteText('')
      showToast('收好啦')
    } catch (err) {
      showToast(err instanceof Error ? err.message : '这句话没收进来，再试一次')
    } finally {
      setSavingNote(false)
    }
  }, [noteText, sessionId, startSession, token, showToast])

  /** 「今天先读到这里」：收尾会话（末章 done / 其余 lot）后回今天 */
  const goHomeFromFinish = useCallback(async () => {
    if (!token) return
    let sid = sessionId
    if (!sid) sid = await startSession()
    if (!sid) return
    setFinishing(true)
    try {
      await api.finishCosession(
        sid,
        { progressMark: order >= book.chapterCount ? 'done' : 'lot', ...(mood ? { mood } : {}) },
        token,
      )
      navigate('/child/today')
    } catch (err) {
      showToast(err instanceof Error ? err.message : '收尾没有成功，再试一次')
      setFinishing(false)
    }
  }, [sessionId, startSession, order, book.chapterCount, mood, token, navigate, showToast])

  /* ── 冲突浮层三选一 ── */
  const continueOldBook = useCallback(() => {
    const oldBookId = conflict?.bookId ?? ''
    if (!oldBookId.startsWith(CBF_PREFIX)) {
      showToast('旧书不是桃书库里的书，让爸爸妈妈帮你收个尾吧')
      return
    }
    navigate(`/child/book/${oldBookId.slice(CBF_PREFIX.length)}/chapter/1`)
  }, [conflict, navigate, showToast])

  const endOldAndStart = useCallback(async () => {
    if (!conflict || !childId || !token) return
    setConflictBusy(true)
    try {
      await api.finishCosession(conflict.id, { progressMark: 'lot' }, token)
      const sid = await startSession()
      if (sid) {
        setConflict(null)
        showToast('换好啦，开始读这本')
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : '旧书没收好尾，再试一次')
    } finally {
      setConflictBusy(false)
    }
  }, [conflict, childId, token, startSession, showToast])

  /* ── 休息时间全屏（服务端就寝闸 / ritualWindow=bedtime）：绝不照常进书 ── */
  if (ritualClosed) {
    return (
      <div className="finish">
        <div className="finish-card">
          <span className="mono-label">月亮睡觉啦</span>
          <h2>该休息啦，明天再继续</h2>
          <p>故事不会跑，桃阅读会把你读到的这一页好好收着，明天接着读。</p>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <button className="sticker-btn primary" onClick={() => navigate('/child/today')}>
              我知道了
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── 加载态 / 首次加载失败错误态 ── */
  if (loading && !chapter) {
    return (
      <div className="reader" style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
        <p className="mono-label">正在翻开这一章…</p>
      </div>
    )
  }
  if (chapterError && !chapter) {
    return (
      <div className="reader" style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24, textAlign: 'center' }}>
          <p className="mono-label">{chapterError}</p>
          <button className="sticker-btn primary" onClick={() => void loadChapter(order)}>
            再试一次
          </button>
          <button className="sticker-btn" onClick={() => navigate(-1)}>
            {LABELS.back}
          </button>
        </div>
      </div>
    )
  }

  const blocks = chapter?.blocks ?? []
  const heroArtUrl = blocks.find((b) => b.kind === 'image' && b.artUrl)?.artUrl ?? book.cover
  const showHeroArt = Boolean(heroArtUrl) && !artBroken.has(heroArtUrl!)

  return (
    <div className={`reader ${theme}`} style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* ── 顶栏三段：返回 / 第 N 章 · 书名 / 目录 + 排版 ── */}
      <header
        className="reader-top"
        aria-hidden={focused}
        style={{
          transition: 'opacity .2s, transform .2s',
          opacity: focused ? 0 : 1,
          transform: focused ? 'translateY(-10px)' : undefined,
          pointerEvents: focused ? 'none' : undefined,
        }}
      >
        <button onClick={() => navigate(-1)} aria-label="退出阅读">
          ← {LABELS.back}
        </button>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <span className="mono-label" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            第 {order} 章 / {book.title}
          </span>
          {saveState !== 'idle' && !focused && (
            <span
              data-testid="save-state"
              aria-live="polite"
              className="mono-label"
              style={{
                padding: '3px 8px',
                border: '1.5px solid var(--ink)',
                borderRadius: 999,
                background: saveState === 'failed' ? 'var(--rose, #ffd6cc)' : 'var(--mint, #dcf5e3)',
                fontFamily: 'var(--mono)',
                fontSize: 10,
                whiteSpace: 'nowrap',
              }}
            >
              {saveState === 'saving' ? '保存中…' : saveState === 'saved' ? '已保存' : '没存上，重试中'}
            </span>
          )}
          {overtime ? (
            <span
              style={{
                padding: '3px 8px',
                border: '1.5px solid var(--ink)',
                borderRadius: 999,
                background: 'var(--sun)',
                fontFamily: 'var(--mono)',
                fontSize: 10,
                whiteSpace: 'nowrap',
              }}
            >
              今天读得够多啦，读完这页就休息
            </span>
          ) : null}
        </span>
        <span style={{ display: 'inline-flex', gap: 10 }}>
          <button onClick={() => setShowChapters(true)}>{LABELS.toc}</button>
          <button onClick={() => setShowSettings(true)}>{LABELS.typeset}</button>
        </span>
      </header>

      {/* ── 正文（点击留白切专注模式；本容器是进度上报的 scroll 事件源） ── */}
      <main ref={mainRef} onClick={toggleFocus} style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <div className="reader-body">
          <div className="reader-label">
            第 {order} 章 / 共 {book.chapterCount} 章
          </div>
          <h2>{chapter?.title}</h2>

          {/* 题图：章节 image 块的 AI 图优先，回退封面；16:9 画框 + AI 角标 */}
          <div className={`reader-art ${showHeroArt ? 'has-art' : ''}`} style={{ aspectRatio: '16 / 9', height: 'auto' }}>
            {showHeroArt ? (
              <img
                className="cover-art"
                src={heroArtUrl!}
                alt={`${chapter?.title ?? book.title} 插图`}
                onError={() => setArtBroken((prev) => new Set(prev).add(heroArtUrl!))}
              />
            ) : null}
            {showHeroArt ? <AiBadge /> : null}
          </div>

          <div className="reader-text" style={{ fontSize: font }}>
            {blocks.map((b) => {
              const isSpeakingBlock = speakingBlockId === b.id
              if (b.kind === 'image') {
                const url = b.artUrl
                const showImg = Boolean(url) && !artBroken.has(url!)
                return (
                  <figure
                    key={b.id}
                    ref={(el) => {
                      blockRefs.current.set(b.id, el)
                    }}
                    data-no-focus
                    style={{ margin: '0 0 24px' }}
                  >
                    <div
                      className={`reader-art ${showImg ? 'has-art' : ''}`}
                      style={{ aspectRatio: '16 / 9', height: 'auto', margin: 0, transform: 'none' }}
                    >
                      {showImg ? (
                        <img
                          className="cover-art"
                          src={url!}
                          alt={b.text || `${chapter?.title ?? ''}插图`}
                          loading="lazy"
                          onError={() => setArtBroken((prev) => new Set(prev).add(url!))}
                        />
                      ) : null}
                      {showImg ? <AiBadge /> : null}
                    </div>
                    {b.text ? (
                      <figcaption className="mono-label" style={{ textAlign: 'center', marginTop: 8, textTransform: 'none' }}>
                        {b.text}
                      </figcaption>
                    ) : null}
                  </figure>
                )
              }
              if (b.kind === 'note') {
                // 生词贴纸：听发音 / 收进生词本
                const noteWord = extractNoteWord(b.text)
                const collected = noteWord !== null && collectedWords.has(noteWord)
                return (
                  <div
                    key={b.id}
                    ref={(el) => {
                      blockRefs.current.set(b.id, el)
                    }}
                    style={{
                      margin: '0 0 24px',
                      padding: '12px 14px',
                      border: '2px solid var(--ink)',
                      borderRadius: 14,
                      background: 'var(--card)',
                      boxShadow: '3px 3px 0 var(--ink)',
                    }}
                  >
                    <p style={{ textIndent: 0, fontSize: Math.round(font * 0.72), lineHeight: 1.7, margin: 0 }}>{b.text}</p>
                    {noteWord ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                        <button className="sticker-btn" style={{ minHeight: 38, fontSize: 12 }} onClick={() => speakWord(noteWord)}>
                          听这个词
                        </button>
                        <button
                          className="sticker-btn"
                          style={{ minHeight: 38, fontSize: 12, ...(collected ? { background: 'var(--mint)' } : {}) }}
                          disabled={collected}
                          onClick={() => void collectWord(noteWord)}
                        >
                          {collected ? '✓ 已收下' : '☆ 收下这个词'}
                        </button>
                      </div>
                    ) : null}
                  </div>
                )
              }
              if (b.kind === 'poem') {
                return (
                  <div
                    key={b.id}
                    ref={(el) => {
                      blockRefs.current.set(b.id, el)
                    }}
                    style={{ margin: '0 0 24px' }}
                  >
                    <p
                      className={isSpeakingBlock ? 'speaking' : undefined}
                      style={{ whiteSpace: 'pre-line', textAlign: 'center', letterSpacing: '0.04em' }}
                    >
                      {isSpeakingBlock ? renderSpeakingChars(b.text, b.id) : b.text}
                    </p>
                    {/* 逐字拼音对注（朗读高亮时退回正文，避免与高亮分词打架） */}
                    {b.pinyin && !isSpeakingBlock ? (
                      <PoemRuby text={b.text} pinyin={b.pinyin} color={ink} fontSize={font} />
                    ) : null}
                    {b.translation ? (
                      <p
                        style={{
                          textIndent: 0,
                          whiteSpace: 'pre-line',
                          textAlign: 'center',
                          fontSize: Math.round(font * 0.66),
                          opacity: 0.78,
                          borderTop: '1px solid rgba(38,32,26,.2)',
                          paddingTop: 12,
                        }}
                      >
                        {b.translation}
                      </p>
                    ) : null}
                  </div>
                )
              }
              // kind === 'text'
              return (
                <p
                  key={b.id}
                  ref={(el) => {
                    blockRefs.current.set(b.id, el)
                  }}
                  className={isSpeakingBlock ? 'speaking' : undefined}
                >
                  {isSpeakingBlock ? renderSpeakingChars(b.text, b.id) : b.text}
                </p>
              )
            })}
          </div>

          {/* A8.3：上一章 / 下一章在正文尾部 */}
          <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 40 }}>
            <button
              className="sticker-btn"
              disabled={order <= 1}
              style={order <= 1 ? { opacity: 0.4, cursor: 'default' } : undefined}
              onClick={() => goChapter(order - 1)}
            >
              {LABELS.prevChapter}
            </button>
            {isLastChapter ? (
              <button className="sticker-btn primary" onClick={() => void openFinish()}>
                {LABELS.finish}
              </button>
            ) : (
              <button className="sticker-btn primary" onClick={() => goChapter(order + 1)}>
                {LABELS.nextChapter}
              </button>
            )}
          </nav>
        </div>
      </main>

      {/* ── 底部控制条 ── */}
      <footer
        className="reader-controls"
        aria-hidden={focused}
        style={{
          transition: 'opacity .2s, transform .2s',
          opacity: focused ? 0 : 1,
          transform: focused ? 'translateX(-50%) translateY(10px)' : undefined,
          pointerEvents: focused ? 'none' : undefined,
        }}
      >
        <button className="main-action min-h-[44px]" onClick={toggleSpeak} disabled={!chapter || preparing}>
          {preparing ? '正在准备朗读…' : speaking ? LABELS.stopAloud : LABELS.readAloud}
        </button>
        <button onClick={() => setFont((s) => Math.max(FONT_MIN, s - FONT_STEP))}>{LABELS.smaller}</button>
        <button onClick={() => setFont((s) => Math.min(FONT_MAX, s + FONT_STEP))}>{LABELS.bigger}</button>
        <button onClick={() => setShowSettings(true)}>{LABELS.settings}</button>
        <button onClick={() => void openFinish()}>{LABELS.finish}</button>
      </footer>

      {/* ── 排版设置浮层 ── */}
      {showSettings ? (
        <Overlay onClose={() => setShowSettings(false)}>
          <h3>{LABELS.settings}</h3>
          <p className="mono-label" style={{ marginBottom: 8 }}>
            主题
          </p>
          <div className="setting-row">
            {(['paper', 'sepia', 'night'] as const).map((t) => (
              <button key={t} style={theme === t ? { background: 'var(--sun)' } : undefined} onClick={() => setTheme(t)}>
                {t === 'paper' ? LABELS.paper : t === 'sepia' ? LABELS.sepia : LABELS.night}
              </button>
            ))}
          </div>
          <p className="mono-label" style={{ margin: '14px 0 8px' }}>
            字号
          </p>
          <div className="setting-row">
            <button onClick={() => setFont((s) => Math.max(FONT_MIN, s - FONT_STEP))}>{LABELS.smaller}</button>
            <button onClick={() => setFont((s) => Math.min(FONT_MAX, s + FONT_STEP))}>{LABELS.bigger}</button>
            <span className="mono-label" style={{ alignSelf: 'center' }}>
              {font}
            </span>
          </div>
          <p className="mono-label" style={{ margin: '14px 0 8px' }}>
            朗读语速
          </p>
          <div className="setting-row">
            {SPEED_STEPS.map((r) => (
              <button
                key={r.value}
                aria-pressed={speed === r.value}
                style={speed === r.value ? { background: 'var(--sun)' } : undefined}
                onClick={() => {
                  setSpeed(r.value)
                  tts.configure({ rate: r.value, lang: book.lang })
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          {serverVoices.length > 0 ? (
            <>
              <p className="mono-label" style={{ margin: '14px 0 8px' }}>
                朗读声音
              </p>
              <div className="setting-row">
                {serverVoices.map((v) => (
                  <button
                    key={v.id}
                    title={v.description}
                    aria-pressed={voiceId === v.id}
                    style={voiceId === v.id ? { background: 'var(--sun)' } : undefined}
                    onClick={() => setVoiceId(v.id)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </>
          ) : null}
          <p className="mono-label" style={{ margin: '14px 0 8px' }}>
            朗读高亮
          </p>
          <div className="setting-row">
            {HIGHLIGHT_MODES.map((o) => (
              <button
                key={o.v}
                aria-pressed={highlightMode === o.v}
                style={highlightMode === o.v ? { background: 'var(--sun)' } : undefined}
                onClick={() => setHighlightMode(o.v)}
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="mono-label" style={{ marginTop: 10, textTransform: 'none' }}>
            {highlightMode === 'auto'
              ? `按年龄自动：${childStage === '6-8' || childStage === '9-12' ? '识字期，逐字跟着亮' : '年龄小，整段跟着亮'}`
              : highlightMode === 'word'
                ? '读到哪个字，哪个字变粗'
                : highlightMode === 'sentence'
                  ? '读到哪段，哪段铺上黄光'
                  : '朗读时文字不变样'}
          </p>
        </Overlay>
      ) : null}

      {/* ── 章节目录抽屉 ── */}
      {showChapters ? (
        <Overlay onClose={() => setShowChapters(false)}>
          <h3>{LABELS.toc}</h3>
          {titlesError ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
              <p className="mono-label">目录暂时没拿到</p>
              <button className="sticker-btn" onClick={loadTitles}>
                再试一次
              </button>
            </div>
          ) : titles.length === 0 ? (
            <p className="mono-label">目录正在赶来…</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 'min(52vh, 420px)', overflowY: 'auto' }}>
              {titles.map((t) => (
                <button
                  key={t.order}
                  style={{
                    textAlign: 'left',
                    ...(t.order === order ? { background: 'var(--sun)' } : {}),
                  }}
                  onClick={() => {
                    goChapter(t.order)
                    setShowChapters(false)
                  }}
                >
                  第 {t.order} 章 · {t.title}
                  {t.order === order ? ' · 正在读' : ''}
                </button>
              ))}
            </div>
          )}
        </Overlay>
      ) : null}

      {/* ── 共读会话冲突三选一（不可点背板关掉，必须选一个） ── */}
      {conflict ? (
        <Overlay onClose={() => undefined} dismissable={false}>
          <h3>上一本还没收尾</h3>
          <p className="mono-label" style={{ textTransform: 'none', marginBottom: 12 }}>
            一次只打开一个小故事。想读这本，先给上一本收个尾。
          </p>
          <div className="setting-row">
            <button disabled={!conflict.bookId?.startsWith(CBF_PREFIX) || conflictBusy} onClick={continueOldBook}>
              继续读旧书
            </button>
            <button style={{ background: 'var(--sun)' }} disabled={conflictBusy || !conflict.id} onClick={() => void endOldAndStart()}>
              {conflictBusy ? '收尾中…' : '结束旧书，改读这本'}
            </button>
            <button disabled={conflictBusy} onClick={() => navigate(-1)}>
              取消
            </button>
          </div>
          {conflict.bookId && !conflict.bookId.startsWith(CBF_PREFIX) ? (
            <p className="mono-label" style={{ marginTop: 10, textTransform: 'none' }}>
              旧书不是桃书库里的书，这里打不开它，收尾后就能读新的一本。
            </p>
          ) : null}
        </Overlay>
      ) : null}

      {/* ── 读完啦结算浮层 ── */}
      {showFinish ? (
        <Overlay onClose={() => setShowFinish(false)}>
          <h3>{LABELS.finishTitle}</h3>
          <p className="mono-label" style={{ textTransform: 'none', marginBottom: 12 }}>
            {LABELS.finishCopy}
          </p>
          <div className="setting-row">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m.key}
                aria-pressed={mood === m.key}
                style={mood === m.key ? { background: 'var(--sun)' } : undefined}
                onClick={() => setMood(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="setting-row" style={{ marginTop: 12 }}>
            <input
              className="search"
              style={{ minHeight: 42, flex: 1, height: 'auto', padding: '8px 12px' }}
              placeholder="留下一句话…"
              value={noteText}
              maxLength={80}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void submitHighlight()
              }}
            />
            <button disabled={savingNote || noteText.trim().length === 0} onClick={() => void submitHighlight()}>
              {savingNote ? '收着…' : '收下'}
            </button>
          </div>
          <div className="setting-row" style={{ marginTop: 14 }}>
            {!isLastChapter ? (
              <button
                onClick={() => {
                  setShowFinish(false)
                  goChapter(order + 1)
                }}
              >
                {LABELS.nextChapter}
              </button>
            ) : null}
            <button style={{ background: 'var(--sun)' }} disabled={finishing} onClick={() => void goHomeFromFinish()}>
              {LABELS.backToday}
            </button>
          </div>
        </Overlay>
      ) : null}
    </div>
  )
}
