/**
 * V8 阅读器页（路由 /child/book/:bookId/chapter/:order）。
 * 审计整改 Phase 2 + A8.3：把旧 ReaderScreen 的成熟能力移植进 v8.css 贴纸绘本壳——
 * 会话守卫（ACTIVE_SESSION_OTHER_BOOK 三选一）、章节加载与目录、
 * 进度上报（进入即报 + 滚动 5s 节流 + 按已存 blockOrder 续读定位）、
 * 服务端朗读（回退 Web Speech）与高亮档位、主题/字号/专注模式、生词贴纸、读完结算浮层、
 * 朗读期 Wake Lock 常亮与翻章触觉。就寝/休息时间闸已随 09-25 产品决策整体移除。
 * 阅读样式由 reading-ui.css 补充，排版控件与家庭阅读器共用 ReadingAppearance。
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, type ContentChapterDto, type WordQuizDto } from '../../lib/api'
import { tts } from '../../lib/tts'
import { audioPlayer, type VoiceOption } from '../../lib/audioPlayer'
import { useSession } from '../../stores/session'
import { extractNoteWord } from '../../lib/preview'
import { acquireWakeLock, releaseWakeLock } from '../../lib/wakeLock'
import { haptic } from '../../lib/haptics'
import { defaultReadingTheme } from '../../lib/readingTheme'
import { AiBadge } from '../../components/art/AiBadge'
import { PoemRuby } from '../../components/art/PoemRuby'
import { Dialog } from '../../components/ui/Dialog'
import { FeedbackForm } from '../../components/ReadingSupport'
import { useBookmarks } from '../../hooks/useBookmarks'
import { LocalRecorder } from '../../components/ui/LocalRecorder'
import { InstallHint } from '../../components/InstallHint'
import { ReadingAppearance, ReadingOption } from '../../components/ReadingAppearance'
import { IconBookmark } from '../../components/ui/icons'
import { readPreference as loadPref, writePreference as savePref, readerTheme, readerFont } from '../../lib/storage'
import { usePagedReading } from '../../lib/pagedReading'
import { codePointToUtf16Offset } from '../../lib/readingPosition'
import { ContentProgressWriter, type ContentPosition, type ProgressSaveState } from '../../lib/contentProgress'
import { useV8, LABELS, announceUnlocked, type V8Book } from './V8App'

type ReaderTheme = 'paper' | 'sepia' | 'night'


/** 语速档位（朗读给跟读用，不给无极滑杆）。「刚好」= 不传 speed → 服务端默认 0.92：
 * 预生成键空间（chapterText.ts 单一事实源）只覆盖默认语速，客户端必须同源——
 * 慢一点/快一点属按需实时合成的合法未命中（家庭缓存会让重复收听秒回） */
const SPEED_STEPS: Array<{ label: string; value: number | null }> = [
  { label: '慢一点', value: 0.8 },
  { label: '刚好', value: null },
  { label: '快一点', value: 1.2 },
]

/** 朗读定时（docs/34 P2-1）：到点渐弱收尾，哄睡不惊醒 */
const SLEEP_STEPS: Array<{ label: string; value: number | null }> = [
  { label: '不限', value: null },
  { label: '15 分钟', value: 15 },
  { label: '30 分钟', value: 30 },
  { label: '45 分钟', value: 45 },
]


const SANS_STACK = "-apple-system, 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif"

/** 排版偏好持久化（docs/34 P1-10；主阅读器此前字号/主题都不记忆，与家庭书阅读器对齐） */

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
  start?: number
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

/* ── docs/35 C1：章节正文模块级缓存（翻章即时开 + 预取落点）。
 *    TTL 10min / 上限 40 章逐出最旧——章节正文不可变，缓存天然安全 ── */
const CHAPTER_CACHE_TTL_MS = 10 * 60_000
const CHAPTER_CACHE_MAX = 40
const chapterCache = new Map<string, { at: number; chapter: ContentChapterDto }>()

function takeChapterCache(bookId: string, order: number): ContentChapterDto | null {
  const hit = chapterCache.get(`${bookId}:${order}`)
  if (!hit) return null
  if (Date.now() - hit.at > CHAPTER_CACHE_TTL_MS) {
    chapterCache.delete(`${bookId}:${order}`)
    return null
  }
  return hit.chapter
}

function putChapterCache(bookId: string, order: number, chapter: ContentChapterDto): void {
  const key = `${bookId}:${order}`
  chapterCache.set(key, { at: Date.now(), chapter })
  while (chapterCache.size > CHAPTER_CACHE_MAX) {
    const oldest = chapterCache.keys().next().value
    if (oldest === undefined) break
    chapterCache.delete(oldest)
  }
}

/** 浮层壳：.settings 样式 + 半透明背板；dialog 语义 + Esc + 焦点圈定与归还（对齐 TaSheet 的 R-06） */
function Overlay({
  onClose,
  children,
  dismissable = true,
  label,
  theme,
  open = true,
}: {
  onClose: () => void
  children: ReactNode
  dismissable?: boolean
  label: string
  theme: ReaderTheme
  open?: boolean
}) {
  return <Dialog label={label} onClose={onClose} dismissable={dismissable} open={open} className={`settings reading-dialog reading-theme-${theme}`}>{children}</Dialog>
}

export function ReaderPage({ book, order: initialOrder }: { book: V8Book; order: number }): JSX.Element {
  const cacheBookKey = `${book.id}@${book.contentVersion}`
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

  /* ── 共读会话（Phase 2 A3.2：异书冲突三选一） ── */
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [conflict, setConflict] = useState<{ id: string; bookId: string | null } | null>(null)
  const [conflictBusy, setConflictBusy] = useState(false)

  /* ── 排版与专注 ── */
  // 安静时段（20:00-06:00）默认夜间护眼主题，白天纸白；仅默认值，可手动切换
  const [theme, setTheme] = useState<ReaderTheme>(() => readerTheme(defaultReadingTheme()))
  const [font, setFont] = useState(readerFont)
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>(() => loadPref<string>('taoread-reader-fontfamily', 'serif') === 'sans' ? 'sans' : 'serif')
  const [lineHeight, setLineHeight] = useState(() => { const value = loadPref('taoread-reader-lineheight', 1.9); return [1.7, 1.9, 2.1].includes(value) ? value : 1.9 })
  const [focused, setFocused] = useState(false)
  const [showPinyin, setShowPinyin] = useState(() => loadPref('taoread-reader-pinyin', true))
  const [showTranslation, setShowTranslation] = useState(() => loadPref('taoread-reader-translation', false))
  const [dimImages, setDimImages] = useState(() => loadPref('taoread-reader-dim-images', true))
  const focusHintShown = useRef(false)
  useEffect(() => savePref('taoread-reader-theme', theme), [theme])
  useEffect(() => savePref('taoread-reader-font', font), [font])
  useEffect(() => savePref('taoread-reader-fontfamily', fontFamily), [fontFamily])
  useEffect(() => savePref('taoread-reader-lineheight', lineHeight), [lineHeight])
  useEffect(() => savePref('taoread-reader-pinyin', showPinyin), [showPinyin])
  useEffect(() => savePref('taoread-reader-translation', showTranslation), [showTranslation])
  useEffect(() => savePref('taoread-reader-dim-images', dimImages), [dimImages])

  /* ── 朗读 ── */
  const [speaking, setSpeaking] = useState(false)
  /** 暂停态（docs/34 P0-5：主阅读器此前只有停止没有暂停，引擎 pause/resume 早已实现） */
  const [paused, setPaused] = useState(false)
  /** 服务端朗读合成中（首次点击到首段音频开播，约 10-40 秒）——给用户可见的等待状态 */
  const [preparing, setPreparing] = useState(false)
  /** 整章 SSE 合成的中止器：停止朗读/离开页面时断流，后台不再白拉 */
  const speakAbortRef = useRef<AbortController | null>(null)
  const [highlight, setHighlight] = useState<SpeakHighlight | null>(null)
  const [highlightMode, setHighlightMode] = useState<'auto' | 'word' | 'sentence' | 'off'>('auto')
  const [serverReady, setServerReady] = useState<boolean | null>(null)
  const [serverVoices, setServerVoices] = useState<VoiceOption[]>([])
  const [voiceId, setVoiceId] = useState<string | null>(null)
  /** null = 「刚好」：不传 speed，服务端取默认 0.92（与预生成键空间同源，缓存必中） */
  const [speed, setSpeed] = useState<number | null>(null)

  /* ── docs/34 阅读器新增（2026-09-28）── */
  /** 共读脚手架浮层（P0-3） */
  const [showScaffold, setShowScaffold] = useState(false)
  const [scaffold, setScaffold] = useState<{ tellPoints: string[]; questions: string[]; hook: string } | null>(null)
  const [scaffoldLoading, setScaffoldLoading] = useState(false)
  /** 读后小测（P1-5） */
  const [quiz, setQuiz] = useState<WordQuizDto | null>(null)
  const [quizPick, setQuizPick] = useState<number | null>(null)
  /** 朗读定时（P2-1） */
  const [sleepMin, setSleepMin] = useState<number | null>(null)
  /** 已划线块（P1-11） */
  const [savedBlocks, setSavedBlocks] = useState<Set<number>>(new Set())
  /* ── docs/40 F1：划线回显——bookId 级「章→块」映射，重进章节 ✒️ 不丢 ── */
  const highlightsByChapter = useRef<Map<number, Set<number>>>(new Map())

  /* ── docs/41 修复 3：翻页/滚动阅读模式（移动端默认翻页，PC 默认滚动；偏好持久化） ── */
  const [pageMode, setPageMode] = useState<'scroll' | 'page'>(() => {
    const saved = loadPref<'scroll' | 'page'>('taoread-reader-pagemode', typeof window !== 'undefined' && window.innerWidth <= 760 ? 'page' : 'scroll')
    return saved === 'page' ? 'page' : 'scroll'
  })
  useEffect(() => { savePref('taoread-reader-pagemode', pageMode) }, [pageMode])
  const pagerViewportRef = useRef<HTMLDivElement | null>(null)
  const pagerTrackRef = useRef<HTMLDivElement | null>(null)
  const pagerAnchorRef = useRef<HTMLElement | null>(null)
  /* 跨 effect 的稳定引用：定位 effect（定义在 pager 之前）运行时取最新 pager/pageMode */
  const pageModeRef = useRef(pageMode)
  pageModeRef.current = pageMode
  const pagerRef = useRef<ReturnType<typeof usePagedReading> | null>(null)
  /** 滚动模式章内进度（0-100，细条显示） */
  const [scrollPct, setScrollPct] = useState(0)
  const longPressRef = useRef(false)
  const pressTimerRef = useRef<number | null>(null)
  /** 书签（P1-11；本机 localStorage，跨章持久） */
  const familyId = useSession((s) => s.familyId)
  const bookmarkSync = useBookmarks({ token, familyId, childId, bookId: book.id, source: 'public', version: book.contentVersion })
  const bookmarks = bookmarkSync.bookmarks.map(row => ({ ...row, block: row.position }))
  /** 插图灯箱（P1-11/P2-4） */
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [imagesExpanded, setImagesExpanded] = useState(false)

  /* ── 浮层开关 ── */
  const [showSettings, setShowSettings] = useState(false)
  const [settingsPrepared, setSettingsPrepared] = useState(false)
  const hasChapter = chapter !== null
  useEffect(() => {
    if (!hasChapter || settingsPrepared) return
    // Paint the reading content before laying out controls for a future action.
    let timer: ReturnType<typeof setTimeout> | undefined
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        timer = setTimeout(() => setSettingsPrepared(true), 0)
      })
    })
    return () => { cancelAnimationFrame(frame); clearTimeout(timer) }
  }, [hasChapter, settingsPrepared])
  const [sentencePicker, setSentencePicker] = useState(false)
  const [settingsTab, setSettingsTab] = useState<'layout' | 'audio' | 'more' | 'record'>('layout')
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
  const [saveState, setSaveState] = useState<ProgressSaveState>('idle')
  const progressWriter = useMemo(() => new ContentProgressWriter(
    async () => {
      const res = await api.contentProgress(book.id, childId!, token!)
      return res.progress.updatedAt ?? new Date(0).toISOString()
    },
    (payload, version) => api.reportContentProgress(book.id, childId!, { ...payload, baseUpdatedAt: version }, token!),
    setSaveState,
  ), [book.id, childId, token])
  const pendingPageSaveRef = useRef<number | null>(null)

  const persistProgress = useCallback(
    (payload: ContentPosition) => {
      if (!childId || !token) return Promise.resolve(false)
      return progressWriter.save(payload)
    },
    [childId, token, progressWriter],
  )

  const synchronizeProgress = useCallback(async () => {
    if (!childId || !token) return
    try {
      const { progress } = await api.contentProgress(book.id, childId, token)
      const target = Math.max(1, Math.min(progress.chapterOrder, book.chapterCount))
      // 同步必须打开服务器的章节；仅刷新旧 URL 会带新版本重新写回旧位置。
      if (target === startOrder) window.location.reload()
      else navigate(`/child/book/${encodeURIComponent(book.id)}/chapter/${target}`, { replace: true })
    } catch {
      showToast('最新进度没拿到，请稍后再同步')
    }
  }, [childId, token, book.id, book.chapterCount, startOrder, navigate, showToast])

  /** 失败自动重试（8s）；冲突停止补写，直到重新打开取得服务器进度。 */
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (progressWriter.pending) void progressWriter.retry()
    }, 8000)
    return () => window.clearInterval(timer)
  }, [progressWriter])

  useEffect(() => () => {
    if (pendingPageSaveRef.current !== null) window.clearTimeout(pendingPageSaveRef.current)
  }, [persistProgress])

  /** 所有进度请求都使用 keepalive；离开时仍走同一版本队列，不能并发无条件补写。 */
  useEffect(() => {
    const flush = () => {
      if (progressWriter.pending && childId && token) void progressWriter.retry()
    }
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', onHide)
    return () => {
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', onHide)
      flush()
    }
  }, [childId, token, progressWriter])
  const chapterRef = useRef<ContentChapterDto | null>(null)

  const isLastChapter = order >= book.chapterCount
  const ink = THEME_INK[theme]

  /* ── 会话：开启共读；409 异书冲突 → 三选一浮层 ──
   * 审计 A10.5：内容域书进会话必须带 cbf: 前缀（服务端据此解析书名/判定 book_done/
   * 放行「继续读旧书」）——裸内容 id 会被当成微信读书书，污染周报与成就口径。 */
  const sessionRequest = useRef(0)
  useEffect(() => () => { sessionRequest.current++ }, [])
  const startSession = useCallback(async (): Promise<string | null> => {
    if (!token || !childId) return null
    const request = ++sessionRequest.current
    try {
      const s = await api.startCosession(childId, `${CBF_PREFIX}${book.id}`, token)
      if (request !== sessionRequest.current) return null
      setSessionId(s.id)
      setConflict(null)
      return s.id
    } catch (err) {
      if (request !== sessionRequest.current) return null
      if (err instanceof ApiError && err.code === 'ACTIVE_SESSION_OTHER_BOOK') {
        try {
          const res = await api.activeCosession(childId, token)
          if (request !== sessionRequest.current) return null
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

  /* ── 章节加载：进入即报进度（带恢复块），失败给错误态/翻章失败留在原章 ── */
  const chapterRequest = useRef(0)
  useEffect(() => () => { chapterRequest.current++ }, [])
  const loadChapter = useCallback(
    async (target: number, restoreBlock = 0, prepared?: Promise<ContentChapterDto>) => {
      if (!token) return
      const request = ++chapterRequest.current
      setLoading(true)
      setChapterError(null)
      try {
        // docs/35 C1：章节正文缓存命中则零网络开章（预取已 warmed）
        const res = { chapter: prepared ? await prepared : takeChapterCache(cacheBookKey, target) ?? (await api.contentChapter(book.id, target, token)).chapter }
        if (request !== chapterRequest.current) return
        putChapterCache(cacheBookKey, target, res.chapter)
        restoredBlockRef.current = restoreBlock
        currentBlockRef.current = restoreBlock
        chapterRef.current = res.chapter
        setChapter(res.chapter)
        setOrder(target)
        if (childId) {
          lastReport.current = Date.now()
          void persistProgress({ chapterOrder: target, blockOrder: restoreBlock })
        }
      } catch (err) {
        if (request !== chapterRequest.current) return
        const msg = err instanceof Error ? err.message : '这一章还藏在云朵后面'
        if (chapterRef.current) {
          // 翻章失败：留在当前章，错误用 toast 可见
          showToast(msg)
        } else {
          setChapterError(msg)
        }
      } finally {
        if (request === chapterRequest.current) setLoading(false)
      }
    },
    [token, book.id, cacheBookKey, childId, showToast, persistProgress],
  )

  /* ── docs/35 C1：下一章空闲预取——进章 1.8s 后 idle 拉下一章 JSON + 预热题图，
   *    翻章从「点击后等待」变「缓存即时开」；末章/已缓存不动作 ── */
  useEffect(() => {
    if (!chapter || !token || order >= book.chapterCount) return
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')) return
    const timer = window.setTimeout(() => {
      const run = () => {
        if (takeChapterCache(cacheBookKey, order + 1)) return
        void api
          .contentChapter(book.id, order + 1, token)
          .then(({ chapter: next }) => {
            putChapterCache(cacheBookKey, order + 1, next)
            const hero = next.artReaderUrl ?? next.blocks.find((b) => b.kind === 'image')?.artReaderUrl
            if (hero) {
              const img = new Image()
              img.decoding = 'async'
              img.src = hero
            }
          })
          .catch(() => undefined)
      }
      if ('requestIdleCallback' in globalThis) globalThis.requestIdleCallback(run, { timeout: 4000 })
      else run()
    }, 1800)
    return () => window.clearTimeout(timer)
    // chapter 引用变化即当前章就绪；book.id/order 变化重挂
  }, [chapter, token, book.id, cacheBookKey, book.chapterCount, order])

  /* 首次进入：并行读取正文与进度；位置和版本就绪后才展示正文、上报进度。 */
  useEffect(() => {
    let alive = true
    const cached = takeChapterCache(cacheBookKey, startOrder)
    const prepared = cached ? Promise.resolve(cached) : token ? api.contentChapter(book.id, startOrder, token).then(res => res.chapter) : undefined
    // A chapter failure may arrive before progress. loadChapter owns its UI error.
    void prepared?.catch(() => undefined)
    void (async () => {
      let restore = 0
      if (childId && token) {
        try {
          const res = await api.contentProgress(book.id, childId, token)
          if (!alive) return
          progressWriter.version = res.progress.updatedAt ?? new Date(0).toISOString()
          if (alive && res.progress.versionChanged) showToast('内容有更新，已回到本章开头；原完成记录仍保留')
          if (alive && !res.progress.versionChanged && !res.progress.finished && res.progress.chapterOrder === startOrder) {
            restore = res.progress.blockOrder
          }
        } catch {
          /* 没有进度记录就从头读 */
        }
      }
      const explicitBlock = new URLSearchParams(window.location.search).get('block')
      if (explicitBlock && /^\d+$/.test(explicitBlock)) restore = Number(explicitBlock)
      if (alive) void loadChapter(startOrder, restore, prepared)
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

  /* ── docs/40 F1：挂载拉全书金句回填 ✒️；换章按映射恢复 ── */
  const orderRef = useRef(order)
  orderRef.current = order
  useEffect(() => {
    if (!childId || !token) return
    let alive = true
    const loadHighlights = async () => {
      const all: Awaited<ReturnType<typeof api.listBookHighlights>>['highlights'] = []
      let cursor: string | undefined
      do {
        const result = await api.listBookHighlights(childId, token, book.id, cursor)
        if (!alive) return { highlights: [] }
        all.push(...result.highlights); cursor = result.nextCursor ?? undefined
      } while (cursor)
      return { highlights: all }
    }
    void loadHighlights()
      .then(({ highlights }) => {
        if (!alive) return
        const map = new Map<number, Set<number>>()
        for (const h of highlights) {
          const set = map.get(h.chapterOrder) ?? new Set<number>()
          set.add(h.blockOrder)
          map.set(h.chapterOrder, set)
        }
        // 对抗审查 P1：请求飞行期间本会话新保存的划线不在服务端快照里——
        // 并入本地增量（组件 key 含 book.id，旧映射必属本书）；并用 orderRef 防
        // 「挂载闭包的旧章」覆盖用户已翻到的新章
        for (const [ch, local] of highlightsByChapter.current) {
          const merged = map.get(ch) ?? new Set<number>()
          for (const b of local) merged.add(b)
          map.set(ch, merged)
        }
        highlightsByChapter.current = map
        setSavedBlocks(map.get(orderRef.current) ?? new Set())
      })
      .catch(() => undefined)
    return () => {
      alive = false
    }
    // book.id 变化=换书重拉；order 由下方 [order] effect 回填
  }, [childId, token, book.id])

  useEffect(() => {
    setSavedBlocks(highlightsByChapter.current.get(order) ?? new Set())
  }, [order])

  /* ── 朗读引擎事件订阅：两条路径共用 highlight 状态，UI 无感差异 ── */
  useEffect(() => {
    const offAp = audioPlayer.onProgress((p) => setHighlight({ start: p.start, index: p.index, total: p.total, text: p.text, charIndex: p.charIndex }))
    const offAe = audioPlayer.onEnd(() => {
      setSpeaking(false)
      setPaused(false)
      setHighlight(null)
    })
    const offAerr = audioPlayer.onError((msg) => {
      setSpeaking(false)
      setPaused(false)
      setHighlight(null)
      showToast(msg)
    })
    // 段级跳过通知（供应商拦截个别段等）：温和提示，不清朗读状态——整章继续
    const offAnotice = audioPlayer.onNotice((msg) => showToast(msg))
    const offTp = tts.onProgress((p) => setHighlight({ index: p.index, total: p.total, text: p.text, charIndex: p.charIndex }))
    const offTe = tts.onEnd(() => {
      setSpeaking(false)
      setPaused(false)
      setHighlight(null)
    })
    const offTerr = tts.onError((msg) => {
      setSpeaking(false)
      setPaused(false)
      setHighlight(null)
      showToast(msg)
    })
    return () => {
      offAp()
      offAe()
      offAerr()
      offAnotice()
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

  /* ── 离开阅读器停掉两个引擎并断开整章 SSE ── */
  useEffect(() => {
    return () => {
      if (tts.isSpeaking) tts.stop()
      audioPlayer.stop()
      speakAbortRef.current?.abort()
      speakAbortRef.current = null
    }
  }, [])

  /* ── 朗读期屏幕常亮（能力自旧 ReaderScreen 移植回现役阅读器） ── */
  useEffect(() => {
    if (speaking) void acquireWakeLock()
    else void releaseWakeLock()
  }, [speaking])
  useEffect(
    () => () => {
      void releaseWakeLock()
    },
    [],
  )

  /* ── 书签（docs/34 P1-11）：本机 localStorage，按书记存 ── */

  /* ── 朗读定时（docs/34 P2-1）：到点渐弱收尾（哄睡不惊醒），手动停止即取消 ── */
  useEffect(() => {
    if (!speaking || !sleepMin) return
    const timer = window.setTimeout(() => {
      audioPlayer.fadeOutAndStop()
      tts.stop()
      setSpeaking(false)
      setPaused(false)
      setHighlight(null)
      showToast('朗读时间到，晚安')
    }, sleepMin * 60_000)
    return () => window.clearTimeout(timer)
  }, [speaking, sleepMin, showToast])

  /* ── 键盘翻章（docs/34 P2-4，桌面端）：←/→，浮层打开时不抢 ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
      if (showSettings || showChapters || showFinish || showScaffold || conflict || lightbox) return
      if (target?.isContentEditable || e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      e.preventDefault()
      const direction = e.key === 'ArrowLeft' ? -1 : 1
      const currentPager = pagerRef.current
      if (pageModeRef.current === 'page' && currentPager) {
        const next = currentPager.page + direction
        if (next >= 0 && next < currentPager.pageCount) currentPager.setPage(next)
        else goChapterRef.current(order + direction)
      } else goChapterRef.current(order + direction)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [order, showSettings, showChapters, showFinish, showScaffold, conflict, lightbox])

  /* ── 滚动节流上报（5s；挂在 main 容器上——scroll 不冒泡到 window） ── */
  useEffect(() => {
    const mainEl = mainRef.current
    if (!mainEl || pageMode !== 'scroll') return
    let frame: number | null = null
    const updatePosition = () => {
      frame = null
      const mainEl = mainRef.current
      // docs/41 修复 4：滚动模式的章内进度细条（翻页模式由页码指示承担）
      if (mainEl) {
        const denom = mainEl.scrollHeight - mainEl.clientHeight
        setScrollPct(denom > 0 ? Math.round(Math.min(100, Math.max(0, (mainEl.scrollTop / denom) * 100))) : 0)
      }
      const ch = chapterRef.current
      if (!ch || !childId || !token) return
      const now = Date.now()
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
      currentBlockRef.current = idx
      const payload = { chapterOrder: order, blockOrder: idx }
      progressWriter.pending = payload
      if (now - lastReport.current < 5000) return
      lastReport.current = now
      void persistProgress(payload)
    }
    const onScroll = () => { if (frame === null) frame = requestAnimationFrame(updatePosition) }
    const flushFrame = () => {
      if (frame !== null) { cancelAnimationFrame(frame); updatePosition() }
    }
    const flushOnHide = () => {
      flushFrame()
      if (progressWriter.pending) void progressWriter.retry()
    }
    const onHide = () => { if (document.visibilityState === 'hidden') flushOnHide() }
    mainEl.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flushOnHide)
    return () => {
      mainEl.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flushOnHide)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [chapter, childId, token, order, book.id, persistProgress, progressWriter, pageMode])

  /* ── 进入章节按已存 blockOrder 定位（消费 restoredBlockRef 一次）──
      滚动模式：scrollIntoView；翻页模式：设 pager 锚点后跳所在页（对抗审查 P1-2：
      scrollIntoView 会横向滚动 overflow:hidden 的分页视口，与 translateX 双重偏移） ── */
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
          if (pageModeRef.current === 'page') {
            pagerAnchorRef.current = el
            pagerRef.current?.goToElement(el)
          } else {
            el.scrollIntoView({ behavior: 'instant', block: 'start' })
          }
          return
        }
      }
      if (pageModeRef.current === 'scroll') mainEl.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    })
    return () => cancelAnimationFrame(raf)
  }, [chapter])

  /* ── 朗读当前章：服务端优先，不可用回退 Web Speech ── */
  const stopSpeaking = useCallback(() => {
    speakAbortRef.current?.abort()
    speakAbortRef.current = null
    audioPlayer.stop()
    tts.stop()
    setSpeaking(false)
    setPaused(false)
    setHighlight(null)
  }, [])

  const toggleSpeak = useCallback(() => {
    const ch = chapterRef.current
    if (!ch) return
    if (speaking) {
      stopSpeaking()
      return
    }
    // docs/40 F2：冷合成等待期也要有出口——再点一次=放弃本次朗读（断开 SSE，不回退 Web Speech）
    if (preparing) {
      stopSpeaking()
      return
    }
    void (async () => {
      // 被自动播放策略拦下时，这是用户手势入口：从队列当前段恢复
      // Activate in the gesture even if the background voices probe failed.
      audioPlayer.prime()
      const resumed = await audioPlayer.resumeQueue()
      if (resumed) {
        setSpeaking(true)
        setPreparing(false)
        return
      }
      let started = false
      setPreparing(true)
      // 兜底：极端情况下首段一直不来，90 秒后恢复按钮可用
      const prepareGuard = window.setTimeout(() => setPreparing(false), 90_000)
      // 中止器随本轮朗读生命周期：停止/离开页面时断开 SSE，后台不再白拉整章
      const ac = new AbortController()
      speakAbortRef.current = ac
      try {
        // speakChapter 在首段音频开播即返回（不再等整章 SSE 拉完）
        started = await audioPlayer.speakChapter(
          book.id,
          order,
          { title: ch.title, bookTitle: book.title },
          { lang: book.lang, ...(voiceId ? { voiceId } : {}), ...(speed !== null ? { speed } : {}), signal: ac.signal },
        )
      } catch {
        started = false
      }
      window.clearTimeout(prepareGuard)
      setPreparing(false)
      // 停止/离开触发的中止：绝不顺势回退 Web Speech（孩子要的是安静）
      if (ac.signal.aborted) return
      if (started) {
        setSpeaking(true)
        return
      }
      // 双重朗读防护（2026-09-28）：服务端音频已在出声、或被自动播放策略拦下等手势
      // 恢复时，绝不能叠加浏览器语音——宁可安静等一次点击，不让两个引擎先后念整章
      if (audioPlayer.isPlaying || audioPlayer.isPaused) return
      const text = ch.blocks
        .filter((b) => b.kind === 'text' || b.kind === 'poem')
        .map((b) => b.text)
        .join('\n')
      const fallbackStarted = tts.speak(text, { lang: book.lang, ...(speed !== null ? { rate: speed } : {}) })
      if (fallbackStarted) {
        setSpeaking(true)
      } else {
        showToast('这台设备暂时不能朗读')
      }
    })()
  }, [speaking, preparing, book.id, book.lang, book.title, order, voiceId, speed, stopSpeaking, showToast])

  /* ── 高亮档位与正在读的块 ── */
  const effectiveHighlight = useMemo<'word' | 'sentence' | 'off'>(() => {
    if (highlightMode === 'off') return 'off'
    if (highlightMode === 'auto') {
      // 6-8 / 9-12 识字敏感期逐字；3-5 前读写者整段
      return childStage === '6-8' || childStage === '9-12' ? 'word' : 'sentence'
    }
    return highlightMode
  }, [highlightMode, childStage])

  /* ── 朗读高亮定位（2026-09-25 bug2 重构：章节全文全局对齐） ──
   * 服务端整章朗读文本 = 正文块按序 '\n' 拼接后 chunkText 切段：块可能
   * 整块一段、多块合一段、或长块被切成多段。此前在「段文本」里 indexOf
   * 整块文本，长块的尾段永远匹配不到 → 该块（常是章节下半部分）永久无高亮。
   * 现在先在章节全文坐标里建立块区间，再把段文本对齐到全文起点，
   * charIndex(段内偏移) → 全文偏移 → 块 + 块内偏移，三类情况统一覆盖。 */
  const chapterAlign = useMemo(() => {
    if (!chapter) return null
    const text: string[] = []
    const ranges: Array<{ id: string; start: number; end: number }> = []
    let pos = 0
    for (const b of chapter.blocks) {
      // 只对参与朗读的块建坐标（text+poem）：服务端整章朗读文本已排除 note/image，
      // 高亮坐标系必须与段文本同空间，否则含生词卡章节的全局对齐错位
      if (!(b.kind === 'text' || b.kind === 'poem')) continue
      const t = b.text.trim()
      if (!t) continue
      if (text.length > 0) {
        text.push('\n')
        pos += 1
      }
      text.push(t)
      ranges.push({ id: b.id, start: pos, end: pos + t.length })
      pos += t.length
    }
    return { text: text.join(''), ranges }
  }, [chapter])

  /** 当前段在章节全文中的起点；段文本是全文的连续切片，前 60 字符唯一定位 */
  const segAlignRef = useRef<{ text: string; start: number }>({ text: '', start: 0 })
  const segStart = useMemo(() => {
    if (!chapterAlign || !highlight?.text) return -1
    if (highlight.start !== undefined && chapterAlign.text.slice(highlight.start, highlight.start + highlight.text.length) === highlight.text) return highlight.start
    const probe = highlight.text.slice(0, 60)
    if (!probe) return -1
    const from = Math.max(0, segAlignRef.current.start - 40)
    let at = chapterAlign.text.indexOf(probe, from)
    if (at < 0) at = chapterAlign.text.indexOf(probe)
    if (at < 0) return -1
    segAlignRef.current = { text: highlight.text, start: at }
    return at
  }, [chapterAlign, highlight])

  const segmentChar = highlight ? codePointToUtf16Offset(highlight.text, Math.max(0, highlight.charIndex)) : -1
  const globalChar = segStart >= 0 && highlight ? segStart + segmentChar : -1

  /** 回退映射：段文本里定位块（全局对齐失败的兜底） */
  const fallbackRanges = useMemo(() => {
    if (!chapter || !highlight?.text) return null
    const segText = highlight.text
    const ranges: Array<{ id: string; start: number; end: number }> = []
    let from = 0
    for (const b of chapter.blocks) {
      if (!(b.kind === 'text' || b.kind === 'poem') || !b.text) continue
      const hit = segText.indexOf(b.text, from)
      if (hit < 0) continue
      ranges.push({ id: b.id, start: hit, end: hit + b.text.length })
      from = hit + b.text.length
    }
    return ranges.length ? ranges : null
  }, [chapter, highlight])

  const activeRange = useMemo(() => {
    if (globalChar >= 0 && chapterAlign) {
      let last: (typeof chapterAlign.ranges)[number] | null = null
      for (const r of chapterAlign.ranges) {
        if (globalChar >= r.start && globalChar < r.end) return r
        if (globalChar >= r.end) last = r
      }
      return last
    }
    if (!fallbackRanges || segmentChar < 0) return null
    let last: (typeof fallbackRanges)[number] | null = null
    for (const r of fallbackRanges) {
      if (segmentChar >= r.start && segmentChar < r.end) return r
      if (segmentChar >= r.end) last = r
    }
    return last
  }, [chapterAlign, globalChar, fallbackRanges, segmentChar])

  const speakingBlockId = useMemo(() => {
    if (!highlight || !chapter) return null
    if (activeRange) return activeRange.id
    const hit = chapter.blocks.find((b) => b.text.includes(highlight.text.slice(0, 12)))
    return hit?.id ?? null
  }, [highlight, chapter, activeRange])

  const speakingOffset = activeRange ? Math.max(0, (segStart >= 0 ? globalChar : segmentChar) - activeRange.start) : 0

  // 朗读的块滚动进视野（只在块切换时滚，不逐字打断；翻页模式由 pager 跳页）
  useEffect(() => {
    if (!speakingBlockId || pageMode === 'page') return
    const el = blockRefs.current.get(speakingBlockId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [speakingBlockId, pageMode])

  /** 逐字档：当前字加粗、已读略淡（靠字重与透明度，色盲友好） */
  function renderSpeakingChars(text: string, blockId?: string): ReactNode {
    const hl = highlight
    if (effectiveHighlight !== 'word' || !hl || hl.charIndex < 0) return text
    // 全局对齐：块在章节全文的区间 + 全文偏移 → 块内偏移
    let localChar = -1
    if (chapterAlign && globalChar >= 0 && blockId) {
      const r = chapterAlign.ranges.find((x) => x.id === blockId)
      if (r && globalChar >= r.start && globalChar < r.end) localChar = globalChar - r.start
    }
    // 回退：段内映射（全局对齐失败时）
    if (localChar < 0 && blockId && fallbackRanges) {
      const r = fallbackRanges.find((x) => x.id === blockId)
      if (r && segmentChar >= r.start && segmentChar < r.end) localChar = segmentChar - r.start
    }
    if (localChar < 0) return text
    const chars = Array.from(text)
    const current = Array.from(text.slice(0, localChar)).length
    // 英文：锁定到当前词整体（字符等分时间轴天然有偏移，逐字符高亮必然对不上）
    if (book.lang === 'en') {
      let ws = current
      let we = current
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
          fontWeight: i === current ? 800 : undefined,
          opacity: i < current ? 0.72 : 1,
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
      haptic('chapter')
      void loadChapter(target, 0)
    },
    [book.chapterCount, loadChapter, stopSpeaking],
  )
  // 键盘翻章 effect 在 goChapter 定义之前挂载，用 ref 取最新实现
  const goChapterRef = useRef<(target: number) => void>(() => undefined)

  /* ── docs/41 修复 3：翻页模式（手势/页码/朗读联动/进度上报/续读定位） ── */
  const persistProgressNow = useCallback((blockOrder: number) => {
    currentBlockRef.current = blockOrder
    if (!childId || !token) return
    const now = Date.now()
    const payload = { chapterOrder: order, blockOrder }
    // 节流期间也保留最后一页，重试与离开提交都使用同一队列。
    progressWriter.pending = payload
    if (pendingPageSaveRef.current !== null) window.clearTimeout(pendingPageSaveRef.current)
    if (now - lastReport.current < 5000) {
      pendingPageSaveRef.current = window.setTimeout(() => {
        pendingPageSaveRef.current = null
        lastReport.current = Date.now()
        if (progressWriter.pending) void progressWriter.retry()
      }, 5000 - (now - lastReport.current))
      return
    }
    lastReport.current = now
    void persistProgress(payload)
  }, [childId, token, order, persistProgress, progressWriter])

  const pager = usePagedReading({
    enabled: pageMode === 'page',
    viewportRef: pagerViewportRef,
    trackRef: pagerTrackRef,
    anchorRef: pagerAnchorRef,
    contentKey: `${book.id}:${order}:${chapter?.id ?? ''}`,
    recalcKey: `${book.id}:${order}:${font}:${lineHeight}:${fontFamily}:${theme}:${showPinyin}:${showTranslation}:${imagesExpanded}:${chapter?.id ?? ''}`,
    onNext: () => { if (order < book.chapterCount) goChapterRef.current(order + 1) },
    onPrev: () => { if (order > 1) goChapterRef.current(order - 1) },
    onCenterTap: () => setFocused((f) => !f),
    onPageSettled: () => {
      const els = (chapter?.blocks ?? []).map((b) => blockRefs.current.get(b.id) ?? null)
      const idx = pager.firstVisibleIndex(els)
      // 锚点随页更新：重排（字号/主题）后保持当前页
      pagerAnchorRef.current = els[idx] ?? null
      persistProgressNow(idx)
    },
  })

  // 朗读高亮块自动翻页（滚动模式走 scrollIntoView，翻页模式跳所在页）
  useEffect(() => {
    if (pageMode !== 'page' || !speakingBlockId) return
    const block = chapter?.blocks.find(b => b.id === speakingBlockId)
    const leadingSpace = block ? block.text.length - block.text.trimStart().length : 0
    pager.goToElement(blockRefs.current.get(speakingBlockId) ?? null, speakingOffset + leadingSpace)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingBlockId, speakingOffset, pageMode, order, font, showPinyin])

  // 新章渲染：翻页模式清锚（定位由上方「按已存 blockOrder 定位」effect 统一消费；
  // 此前这里有第二套 restoredBlockRef 消费，但注册顺序在后面读到的恒为 0=死代码）
  useEffect(() => {
    if (pageMode === 'page') pagerAnchorRef.current = null
  }, [pageMode, chapter?.id])

  useEffect(() => {
    pagerRef.current = pager
  })
  goChapterRef.current = goChapter

  /* ── 暂停/继续（docs/34 P0-5）：双引擎安全——各自在不活跃时是空操作 ── */
  const togglePause = useCallback(() => {
    if (!speaking) return
    if (paused) {
      audioPlayer.resume()
      tts.resume()
      setPaused(false)
    } else {
      audioPlayer.pause()
      tts.pause()
      setPaused(true)
    }
  }, [speaking, paused])

  /** 点段落跳读（docs/34 P0-5，对齐家庭书阅读器）：朗读中点任意段落跳到覆盖它的音频段 */
  const jumpToBlock = useCallback(
    (blockId: string) => {
      if (!chapterAlign || !speaking || audioPlayer.isPaused) return
      const range = chapterAlign.ranges.find((x) => x.id === blockId)
      if (!range) return
      const starts = audioPlayer.segmentStarts()
      let best = -1
      for (let i = 0; i < starts.length; i++) {
        const s = starts[i]!
        if (s >= 0 && s <= range.start) best = i
      }
      if (best < 0) return
      if (audioPlayer.jumpToSegment(best)) {
        setPaused(false)
        haptic('chapter')
      }
    },
    [chapterAlign, speaking],
  )

  /* ── 划线（docs/34 P1-11）：长按段落 600ms 收进金句（幂等，重复划线=更新） ── */
  const saveHighlight = useCallback(
    async (blockOrder: number, text: string) => {
      if (!childId || !token) return
      const trimmed = text.trim().slice(0, 200)
      if (!trimmed) return
      try {
        await api.addBookHighlight(childId, book.id, { chapterOrder: order, blockOrder, text: trimmed }, token)
        setSavedBlocks((prev) => new Set(prev).add(blockOrder))
        const chapterSet = highlightsByChapter.current.get(order) ?? new Set<number>()
        chapterSet.add(blockOrder)
        highlightsByChapter.current.set(order, chapterSet)
        haptic('stamp')
        showToast('收进金句啦')
      } catch (err) {
        showToast(err instanceof Error ? err.message : '这句话没收进来，再试一次')
      }
    },
    [childId, token, book.id, order, showToast],
  )

  const onBlockPressStart = useCallback(
    (blockOrder: number, text: string) => {
      longPressRef.current = false
      if (pressTimerRef.current) window.clearTimeout(pressTimerRef.current)
      pressTimerRef.current = window.setTimeout(() => {
        pressTimerRef.current = null
        longPressRef.current = true
        void saveHighlight(blockOrder, text)
      }, 600)
    },
    [saveHighlight],
  )
  const onBlockPressEnd = useCallback(() => {
    if (pressTimerRef.current) {
      window.clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
  }, [])

  /* ── 书签（docs/34 P1-11）：当前章+当前块，同章重复点击=收起 ── */
  const toggleBookmark = () => {
    bookmarkSync.toggle(order, currentBlockRef.current, chapterRef.current?.blocks[currentBlockRef.current]?.text ?? '')
    showToast('书签已在本机保存')
  }

  /** 从书签跳：带块定位（与续读同路径） */
  const goBookmark = useCallback(
    (target: { chapter: number; block: number }) => {
      if (target.chapter < 1 || target.chapter > book.chapterCount) return
      stopSpeaking()
      haptic('chapter')
      void loadChapter(target.chapter, target.block)
    },
    [book.chapterCount, loadChapter, stopSpeaking],
  )

  /* ── 共读脚手架（docs/34 P0-3）：把「讲什么/问什么」前移到阅读中 ── */
  const loadScaffold = useCallback(async () => {
    if (!token) return
    setScaffoldLoading(true)
    try {
      const res = await api.readingScaffold(book.id, order, token)
      setScaffold(res.card)
      setShowScaffold(true)
    } catch (err) {
      showToast(err instanceof Error ? err.message : '悄悄话没拿到，再试一次')
    } finally {
      setScaffoldLoading(false)
    }
  }, [token, book.id, order, showToast])

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
      void audioPlayer.speak(word, { lang: 'en', ...(speed !== null ? { speed } : {}) }).then((ok) => {
        if (!ok) tts.speak(word, { lang: 'en', ...(speed !== null ? { rate: speed } : {}) })
      })
    },
    [speed],
  )

  const collectWord = useCallback(
    async (word: string) => {
      if (!childId || !token) return
      try {
        await api.addWord(childId, { word, lang: book.lang, bookId: book.id, context: chapterRef.current?.blocks[currentBlockRef.current]?.text.slice(0, 200) ?? chapterRef.current?.title, chapterOrder: order, blockOrder: currentBlockRef.current }, token)
        setCollectedWords((prev) => new Set(prev).add(word))
        showToast('已收进生词本')
      } catch (err) {
        showToast(err instanceof Error ? err.message : '这个词没收进来，再试一次')
      }
    },
    [childId, token, book.lang, book.id, order, showToast],
  )

  /* ── 读完啦：先报进度（completed 只在最后一章为 true），再开结算浮层；
   * 同时预取读后小测（docs/34 P1-5）——出不了题就静默隐藏，绝不造假题 ── */
  const openFinish = useCallback(async () => {
    if (!childId || !token) return
    if (speaking) stopSpeaking()
    try {
      const saved = await persistProgress({
          chapterOrder: order,
          blockOrder: currentBlockRef.current,
          completed: order >= book.chapterCount,
        })
      if (!saved) {
        showToast('进度未保存；若已在另一台设备更新，请重新打开本书同步')
        return
      }
      haptic('stamp')
    } catch (err) {
      showToast(err instanceof Error ? err.message : '进度没存上，再试一次')
      return
    }
    setQuizPick(null)
    api
      .readingQuiz(book.id, order, token)
      .then((r) => setQuiz(r.quiz))
      .catch(() => setQuiz(null))
    setShowFinish(true)
  }, [childId, token, book.id, book.chapterCount, order, speaking, stopSpeaking, showToast, persistProgress])

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

  /** 「今天先读到这里」：收尾会话（末章 done / 其余 lot）后回今天；解锁成就有可见反馈 */
  const goHomeFromFinish = useCallback(async () => {
    if (!token) return
    let sid = sessionId
    if (!sid) sid = await startSession()
    if (!sid) return
    setFinishing(true)
    try {
      const result = await api.finishCosession(
        sid,
        { progressMark: order >= book.chapterCount ? 'done' : 'lot', ...(mood ? { mood } : {}) },
        token,
      )
      announceUnlocked(result.unlocked, showToast)
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

  /* ── 加载态 / 首次加载失败错误态 ── */
  if (loading && !chapter) {
    return (
      <div className={`reader ${theme}`} style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
        <p className="mono-label">正在翻开这一章…</p>
      </div>
    )
  }
  if (chapterError && !chapter) {
    return (
      <div className={`reader ${theme}`} style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
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
  // 性能方案阶段 1：题图优先 800px reader 档（回退图片块原档 → 封面缩图 → 封面原档）
  // 对抗审查 P1-2：hero 与图片块同款的 artBroken 感知回退链——
  // reader 变体（R2）→ 本地原档 → 封面缩图 → 封面原档，任一档失败逐级下探而非直接落 CSS 占位
  const heroImgBlock = blocks.find((b) => b.kind === 'image' && (b.artReaderUrl ?? b.artUrl))
  const heroArtUrl =
    [
      chapter?.artReaderUrl,
      chapter?.artUrl,
      heroImgBlock?.artReaderUrl,
      heroImgBlock?.artUrl,
      book.coverThumb,
      book.cover,
    ].find((u): u is string => Boolean(u) && !artBroken.has(u!)) ?? null
  const showHeroArt = heroArtUrl !== null
  const firstImage = blocks[0]?.kind === 'image' ? blocks[0] : null
  const firstImageUrl = [firstImage?.artReaderUrl, firstImage?.artUrl].find((u) => Boolean(u) && !artBroken.has(u!)) ?? null
  const heroIsFirstBlock = showHeroArt && heroArtUrl === firstImageUrl

  return (
    <div className={`reader ${theme} ${dimImages ? 'dim-images' : ''} ${imagesExpanded ? 'images-expanded' : ''}`} style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* ── 顶栏三段：返回 / 第 N 章 · 书名 / 目录 + 排版 ── */}
      {focused && <button className="sticker-btn focus-restore" onClick={() => setFocused(false)}>显示阅读工具</button>}
      <header
        className="reader-top"
        aria-hidden={focused}
        {...(focused ? { inert: "" } : {})}
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
                color: 'var(--ink)',
                border: '1.5px solid var(--ink)',
                borderRadius: 999,
                background: saveState === 'failed' || saveState === 'conflict' ? 'var(--rose, #ffd6cc)' : 'var(--mint, #dcf5e3)',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                whiteSpace: 'nowrap',
              }}
            >
              {saveState === 'conflict' ? <button aria-label="进度已在另一台设备更新，重新打开同步" onClick={() => void synchronizeProgress()}>同步进度</button> : saveState === 'saving' ? '保存中…' : saveState === 'saved' ? '已保存' : '没存上，重试中'}
            </span>
          )}
        </span>
        <span style={{ display: 'inline-flex', gap: 10 }}>
          <button onClick={() => setShowChapters(true)}>{LABELS.toc}</button>
          <button onClick={() => setShowSettings(true)}>{LABELS.typeset}</button>
          <button className="compact-art-toggle" aria-pressed={imagesExpanded} onClick={() => setImagesExpanded(x => !x)}>{imagesExpanded ? '收起插画' : '显示插画'}</button>
        </span>
      </header>

      {/* ── 正文 ──
          滚动模式：main 是进度上报的 scroll 事件源，点击留白切专注模式。
          翻页模式（docs/41）：main 不滚动；.reader-body 变分页视口，内层 .pager-track
          按列分页、translateX 切页，手势由 usePagedReading 接管（点中间=呼出/隐藏工具条）。 ── */}
      <main
        ref={mainRef}
        className={pageMode === 'page' ? 'reader-paged-main' : undefined}
        {...(pageMode === 'scroll' ? { onClick: toggleFocus } : {})}
        style={pageMode === 'scroll' ? { flex: 1, minHeight: 0, overflowY: 'auto' } : { flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        {pageMode === 'scroll' ? (
          <div aria-hidden style={{ position: 'sticky', top: 0, zIndex: 4, height: 3, background: 'rgba(38,32,26,.12)', borderRadius: 2 }}>
            <div style={{ width: `${scrollPct}%`, height: '100%', background: 'var(--accent)', borderRadius: 2, transition: 'width .15s' }} />
          </div>
        ) : null}
        <div
          className="reader-body"
          ref={pagerViewportRef}
          style={
            pageMode === 'page'
              ? { width: '100%', maxWidth: 'none', margin: 0, padding: '18px 20px 12px', minHeight: 0, flex: 1, overflow: 'hidden', display: 'block', touchAction: 'pan-y pinch-zoom' }
              : undefined
          }
        >
          <div
            className={pageMode === 'page' ? 'pager-track' : undefined}
            ref={pagerTrackRef}
            style={pageMode === 'page' ? { fontSize: font, lineHeight, height: '100%', ...(fontFamily === 'sans' ? { fontFamily: SANS_STACK } : {}) } : undefined}
          >
            <div className="reader-label">
              第 {order} 章 / 共 {book.chapterCount} 章
            </div>
            <h2 className="reader-chapter-title">{book.category === 'poetry' ? chapter?.title.split(' · ')[0] : chapter?.title}</h2>
            {book.category === 'poetry' && chapter?.title.includes(' · ') && <p className="reader-poem-author">{chapter.title.split(' · ').slice(1).join(' · ')}</p>}

            {/* 题图：章节 image 块的 AI 图优先，回退封面；16:9 画框 + AI 角标；点击放大（docs/34 P1-11）。
                data-no-focus：点图开灯箱不应同时切换专注模式（验收修正，与 figure 块同口径）。
                fetchpriority=high（docs/35 A5）：题图是阅读器 LCP，优先于懒加载图块 */}
            {!heroIsFirstBlock && showHeroArt && <div className="reader-art has-art" data-no-focus style={{ aspectRatio: '16 / 9', height: 'auto' }}>
            {showHeroArt ? (
              <img
                className="cover-art"
                src={heroArtUrl!}
                alt={`${chapter?.title ?? book.title} 插图`}
                decoding="async"
                // React 18 未知小写属性透传为 DOM attribute
                {...{ fetchpriority: 'high' }}
                style={{ cursor: 'zoom-in' }}
                role="button"
                tabIndex={0}
                aria-label={`放大${chapter?.title ?? book.title}插图`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setLightbox(heroArtUrl!) } }}
                onClick={(e) => {
                  e.stopPropagation()
                  setLightbox(heroArtUrl!)
                }}
                onError={() => setArtBroken((prev) => new Set(prev).add(heroArtUrl!))}
              />
            ) : null}
            {showHeroArt ? <AiBadge /> : null}
          </div>}

          <div
            className="reader-text"
            style={{
              fontSize: font,
              lineHeight,
              ...(fontFamily === 'sans' ? { fontFamily: SANS_STACK } : {}),
            }}
          >
            {blocks.map((b) => {
              const isSpeakingBlock = speakingBlockId === b.id && effectiveHighlight !== 'off'
              if (b.kind === 'image') {
                // docs/35 A1：优先 reader 档（800w/R2，冷穿透不再走家庭上行），失败回退原档
                const url =
                  (b.artReaderUrl && !artBroken.has(b.artReaderUrl) ? b.artReaderUrl : null) ??
                  (b.artUrl && !artBroken.has(b.artUrl) ? b.artUrl : null)
                const showImg = Boolean(url)
                if (!showImg) return <span key={b.id} aria-hidden="true" ref={(el) => { blockRefs.current.set(b.id, el) }} />
                return (
                  <figure
                    key={b.id}
                    className="reader-illustration"
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
                          loading={b === firstImage && heroIsFirstBlock ? 'eager' : 'lazy'}
                          {...(b === firstImage && heroIsFirstBlock ? { fetchpriority: 'high' } : {})}
                          decoding="async"
                          style={{ cursor: 'zoom-in' }}
                          role="button"
                          tabIndex={0}
                          aria-label="放大插图"
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setLightbox(url!) } }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setLightbox(url!)
                          }}
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
                // 生词贴纸：听发音 / 收进生词本。
                // 2026-09-25 bug2：朗读到注释块也要高亮（此前无 speaking 类，
                // 读到「New word」卡时屏幕下半部分完全失去高亮）。
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
                      color: 'var(--ink)',
                      boxShadow: '3px 3px 0 var(--ink)',
                    }}
                  >
                    <p
                      className={isSpeakingBlock ? 'speaking' : undefined}
                      style={{ textIndent: 0, fontSize: Math.round(font * 0.72), lineHeight: 1.7, margin: 0 }}
                    >
                      {isSpeakingBlock ? renderSpeakingChars(b.text, b.id) : b.text}
                    </p>
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
                    <div
                      className={isSpeakingBlock ? 'speaking' : undefined}
                      style={{ whiteSpace: 'pre-line', textAlign: 'center', letterSpacing: '0.04em', cursor: speaking ? 'pointer' : undefined }}
                      onPointerDown={() => onBlockPressStart(b.order, b.text)}
                      onPointerUp={onBlockPressEnd}
                      onPointerCancel={onBlockPressEnd}
                      onPointerMove={onBlockPressEnd}
                      onPointerLeave={onBlockPressEnd}
                      onClick={(e) => {
                        // docs/34 验收修正：划线随时可用（此前仅朗读中绑定，非朗读时长按
                        // 无效且 click 冒泡误触专注模式）；跳读仍仅朗读中生效
                        e.stopPropagation()
                        if (longPressRef.current) {
                          longPressRef.current = false
                          return
                        }
                        if (speaking) jumpToBlock(b.id)
                      }}
                    >
                      {showPinyin && b.pinyin
                        ? <PoemRuby text={b.text} pinyin={b.pinyin} color={ink} fontSize={font} activeOffset={isSpeakingBlock && effectiveHighlight === 'word' ? speakingOffset : -1} />
                        : <p data-reading-text>{isSpeakingBlock ? renderSpeakingChars(b.text, b.id) : b.text}</p>}
                      {savedBlocks.has(b.order) ? <IconBookmark size={16} /> : null}
                    </div>
                    {b.translation && showTranslation ? (
                      <p
                        style={{
                          textIndent: 0,
                          whiteSpace: 'pre-line',
                          textAlign: 'center',
                          fontSize: Math.max(16, Math.round(font * 0.78)),
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
                  style={{ cursor: speaking ? 'pointer' : undefined }}
                  onPointerDown={() => onBlockPressStart(b.order, b.text)}
                  onPointerUp={onBlockPressEnd}
                  onPointerCancel={onBlockPressEnd}
                  onPointerMove={onBlockPressEnd}
                  onPointerLeave={onBlockPressEnd}
                  onClick={(e) => {
                    // 划线随时可用；长按消耗掉 click，不冒泡进专注模式；跳读仅朗读中
                    e.stopPropagation()
                    if (longPressRef.current) {
                      longPressRef.current = false
                      return
                    }
                    if (speaking) jumpToBlock(b.id)
                  }}
                >
                  {isSpeakingBlock ? renderSpeakingChars(b.text, b.id) : b.text}
                  {savedBlocks.has(b.order) ? <IconBookmark size={16} /> : null}
                </p>
              )
            })}
          </div>
          </div>
        </div>
        {/* A8.3：上一章 / 下一章按钮——位于分页流之外（滚动模式随正文滚动；翻页模式
            固定在视口底部，与滑动手势互为补充，不占分页空间） */}
        <nav
          className="reader-tail-nav"
          aria-hidden={focused || (pageMode === 'page' && pager.page < pager.pageCount - 1)}
          {...(focused || (pageMode === 'page' && pager.page < pager.pageCount - 1) ? { inert: '' } : {})}
          style={{
            display: 'flex', visibility: pageMode === 'page' && pager.page < pager.pageCount - 1 ? 'hidden' : undefined, justifyContent: 'space-between', gap: 10, marginTop: 12, flexShrink: 0,
            width: pageMode === 'page' ? '100%' : undefined,
            padding: pageMode === 'page' ? '0 16px 8px' : undefined,
            opacity: focused ? 0 : 1, pointerEvents: focused ? 'none' : undefined,
            transition: 'opacity .2s',
          }}
        >
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
            <button className={`sticker-btn ${pageMode === 'scroll' || pager.page === pager.pageCount - 1 ? 'primary' : ''}`} onClick={() => goChapter(order + 1)}>
              {LABELS.nextChapter}
            </button>
          )}
        </nav>
        {pageMode === 'page' && <nav className="pager-navigation" aria-label="章内翻页" aria-hidden={focused} {...(focused ? { inert: '' } : {})} style={{ opacity: focused ? 0 : undefined }}>
          <button className="min-h-[44px]" disabled={pager.page === 0} onClick={() => pager.setPage(pager.page - 1)}>这章上一页</button>
          <span className="pager-page" role="status" aria-live="polite">第 {pager.page + 1} / {pager.pageCount} 页</span>
          <button className="min-h-[44px] page-forward" disabled={pager.page === pager.pageCount - 1} onClick={() => pager.setPage(pager.page + 1)}>这章下一页</button>
        </nav>}
      </main>
      {/* ── 底部控制条 ── */}
      <footer
        className="reader-controls"
        aria-hidden={focused}
        {...(focused ? { inert: "" } : {})}
        style={{
          transition: 'opacity .2s, transform .2s',
          opacity: focused ? 0 : 1,
          transform: focused ? 'translateX(-50%) translateY(10px)' : undefined,
          pointerEvents: focused ? 'none' : undefined,
        }}
      >
        <button className="main-action min-h-[44px]" onClick={toggleSpeak} disabled={!chapter}>
          {preparing ? '正在准备朗读…再点一下取消' : speaking ? LABELS.stopAloud : LABELS.readAloud}
        </button>
        {/* 暂停/继续（docs/34 P0-5）+ 上下段（P2-2）：仅朗读中显示 */}
        {speaking ? (
          <>
            <button onClick={togglePause} aria-pressed={paused}>
              {paused ? '继续朗读' : '暂停朗读'}
            </button>
          </>
        ) : null}
        <button onClick={() => setShowSettings(true)}>{LABELS.settings}</button>
        <button onClick={() => void openFinish()}>{LABELS.finish}</button>
      </footer>

      {/* ── 排版设置浮层 ── */}
      {sentencePicker && <Overlay label="选择金句" theme={theme} onClose={() => setSentencePicker(false)}><h3>《{book.title}》 · 第 {order} 章</h3><p>选择要收藏的段落，每段最多保留 200 字。</p>{blocks.filter(b => b.kind === 'text' || b.kind === 'poem').map(b => <button className="sentence-choice" key={b.id} aria-pressed={savedBlocks.has(b.order)} onClick={() => void saveHighlight(b.order, b.text)}>{b.text.slice(0, 200)}{savedBlocks.has(b.order) ? ' · 已收藏' : ''}</button>)}</Overlay>}
      {showSettings || (settingsPrepared && settingsTab === 'layout') ? (
        <Overlay open={showSettings} onClose={() => setShowSettings(false)} label="阅读设置" theme={theme}>
          <div className="reading-tabs" role="group" aria-label="设置分类">
            <button aria-pressed={settingsTab === 'layout'} onClick={() => setSettingsTab('layout')}>排版</button>
            <button aria-pressed={settingsTab === 'audio'} onClick={() => setSettingsTab('audio')}>听读</button>
            <button aria-pressed={settingsTab === 'more' || settingsTab === 'record'} onClick={() => setSettingsTab('more')}>更多</button>
          </div>
          {settingsTab === 'record' && <div className="reading-support"><button onClick={() => setSettingsTab('more')}>返回更多工具</button><h3>跟读录音 · 试点</h3><LocalRecorder /></div>}
          {settingsTab === 'layout' && <>
            <ReadingAppearance theme={theme} setTheme={setTheme} font={font} setFont={setFont} fontFamily={fontFamily} setFontFamily={setFontFamily} lineHeight={lineHeight} setLineHeight={setLineHeight} pageMode={pageMode} setPageMode={setPageMode} dimImages={dimImages} setDimImages={setDimImages} />
            {blocks.some(block => block.kind === 'poem') && <ReadingOption label="诗歌辅助">
              <label className="reading-toggle"><span>显示拼音</span><input type="checkbox" checked={showPinyin} onChange={e => setShowPinyin(e.target.checked)} /></label>
              <label className="reading-toggle"><span>显示白话解释</span><input type="checkbox" checked={showTranslation} onChange={e => setShowTranslation(e.target.checked)} /></label>
            </ReadingOption>}
          </>}
          {settingsTab === 'more' && <div className="reading-support">
            <h3>留下喜欢的内容</h3>
            <p className="reading-hint">长按正文可收藏段落，也可以直接选择。</p>
            <div className="reading-action-list">
              <button onClick={toggleBookmark}>在当前位置夹书签</button>
              <button onClick={() => { setShowSettings(false); setShowChapters(true) }}>查看目录与书签</button>
              <button onClick={() => { setShowSettings(false); setSentencePicker(true) }}>选择并收藏句子</button>
              <button onClick={() => { const block = blocks[currentBlockRef.current]; if (block) void saveHighlight(block.order, block.text) }}>收藏当前段落为金句</button>
              <button onClick={() => { setShowSettings(false); void loadScaffold() }} disabled={scaffoldLoading}>给爸妈的共读话题</button>
              <button onClick={() => { stopSpeaking(); setSettingsTab('record') }}>跟读录音 · 试点</button>
            </div>
            {token && <FeedbackForm token={token} bookId={book.id} version={book.contentVersion} chapter={order} position={currentBlockRef.current} />}
          </div>}
          {settingsTab === 'audio' && <>
          {speaking && <div className="setting-row">
            <button onClick={togglePause}>{paused ? '继续朗读' : '暂停朗读'}</button>
            {serverReady && <>
              <button onClick={() => { if (audioPlayer.jumpToSegment(audioPlayer.currentSegmentIndex - 1)) setPaused(false) }}>上一段</button>
              <button onClick={() => { if (audioPlayer.jumpToSegment(audioPlayer.currentSegmentIndex + 1)) setPaused(false) }}>下一段</button>
            </>}
          </div>}
          {/* 朗读定时（docs/34 P2-1）：到点渐弱收尾 */}
          <p className="mono-label" style={{ margin: '14px 0 8px' }}>
            朗读定时
          </p>
          <div className="setting-row">
            {SLEEP_STEPS.map((s) => (
              <button
                key={s.label}
                aria-pressed={sleepMin === s.value}
                style={sleepMin === s.value ? { background: 'var(--sun)' } : undefined}
                onClick={() => setSleepMin(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="mono-label" style={{ marginTop: 10, textTransform: 'none' }}>
            {sleepMin ? `朗读 ${sleepMin} 分钟后会慢慢安静下来` : '不限时；睡前可以选一个定时'}
          </p>
          <p className="mono-label" style={{ margin: '14px 0 8px' }}>
            朗读语速
          </p>
          <div className="setting-row">
            {SPEED_STEPS.map((r) => (
              <button
                key={String(r.value)}
                aria-pressed={speed === r.value}
                style={speed === r.value ? { background: 'var(--sun)' } : undefined}
                onClick={() => {
                  setSpeed(r.value)
                  // null（刚好）→ Web Speech 用其默认 0.92 = 服务端 DEFAULT_SPEED（键空间同源）
                  tts.configure({ rate: r.value ?? 0.92, lang: book.lang })
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
          </>}
          {/* M0-1：设置浮层末尾的安装入口（Android 一键装 / iOS 图文步骤，已安装自动隐藏） */}
          <InstallHint />
        </Overlay>
      ) : null}

      {/* ── 章节目录抽屉 ── */}
      {showChapters ? (
        <Overlay onClose={() => setShowChapters(false)} label="目录" theme={theme}>
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
            <div className="reading-toc">
              {titles.map((t) => (
                <button
                  key={t.order}
                  aria-current={t.order === order ? 'location' : undefined}
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
          <p role="status">{bookmarkSync.status}</p><button className="sticker-btn" onClick={() => void bookmarkSync.sync()}>同步书签</button>
          {bookmarkSync.conflict && <button className="sticker-btn" onClick={() => { if (window.confirm('采用服务器书签会舍弃本机未同步的修改，是否继续？')) void bookmarkSync.adoptServer() }}>采用服务器书签</button>}
          {bookmarks.length > 0 ? (
            <div style={{ marginTop: 14 }}>
              <p className="mono-label">🔖 书签</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {bookmarks.map((bm) => (
                  <div key={bm.id}><button
                    key={bm.id}
                    disabled={bm.version !== book.contentVersion}
                    style={{ textAlign: 'left' }}
                    onClick={() => {
                      setShowChapters(false)
                      goBookmark(bm)
                    }}
                  >
                    第 {bm.chapter} 章 · {bm.version === book.contentVersion ? '回到书签' : '正文已更新，等待定位'}
                  </button><button className="sticker-btn" onClick={() => bookmarkSync.remove(bm.id)}>移除这条书签</button></div>
                ))}
              </div>
            </div>
          ) : null}
        </Overlay>
      ) : null}

      {/* ── 共读脚手架（docs/34 P0-3）：给爸妈的悄悄话 ── */}
      {showScaffold && scaffold ? (
        <Overlay onClose={() => setShowScaffold(false)} label="给爸妈的悄悄话" theme={theme}>
          <h3>给爸妈的悄悄话</h3>
          <p className="mono-label" style={{ textTransform: 'none' }}>
            读完或读中，都可以和孩子聊聊这些——
          </p>
          <p className="mono-label" style={{ textTransform: 'none', marginTop: 10 }}>
            讲什么
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {scaffold.tellPoints.map((t, i) => (
              <p key={i} style={{ textIndent: 0, margin: 0 }}>
                · {t}
              </p>
            ))}
          </div>
          <p className="mono-label" style={{ textTransform: 'none', marginTop: 10 }}>
            问什么
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {scaffold.questions.map((q, i) => (
              <p key={i} style={{ textIndent: 0, margin: 0 }}>
                {i + 1}. {q}
              </p>
            ))}
          </div>
          {scaffold.hook ? (
            <>
              <p className="mono-label" style={{ textTransform: 'none', marginTop: 10 }}>
                聊什么
              </p>
              <p style={{ textIndent: 0 }}>{scaffold.hook}</p>
            </>
          ) : null}
        </Overlay>
      ) : null}

      {/* ── 共读会话冲突三选一（不可点背板关掉，必须选一个） ── */}
      {conflict ? (
        <Overlay onClose={() => undefined} dismissable={false} label="上一本还没收尾" theme={theme}>
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
        <Overlay onClose={() => setShowFinish(false)} label="读完啦" theme={theme}>
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
          {/* 读后小测（docs/34 P1-5）：机械理解检查 + 难度自报；出不了题时整块隐藏 */}
          {quiz ? (
            <div style={{ marginTop: 16 }}>
              <p className="mono-label" style={{ textTransform: 'none' }}>
                小检查 · {quiz.prompt}
              </p>
              <div className="setting-row" style={{ marginTop: 8 }}>
                {quiz.options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={quizPick !== null}
                    aria-pressed={quizPick === i}
                    style={
                      quizPick === null
                        ? undefined
                        : i === quiz.answerIndex
                          ? { background: 'var(--mint, #dcf5e3)' }
                          : quizPick === i
                            ? { background: 'var(--rose, #ffd6cc)' }
                            : undefined
                    }
                    onClick={() => setQuizPick(i)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizPick !== null ? (
                <>
                  <p className="mono-label" style={{ textTransform: 'none', marginTop: 10 }}>
                    {quizPick === quiz.answerIndex ? '你记得这段文字！也可以聊聊你想到的事。' : '可以回头看看，也可以跳过。'}
                  </p>
                  <p className="mono-label" style={{ textTransform: 'none', marginTop: 6 }}>
                    这一章读起来：
                  </p>
                  <div className="setting-row" style={{ marginTop: 6 }}>
                    {[
                      [1, '有点难'],
                      [2, '刚刚好'],
                      [3, '太简单'],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => {
                          if (childId && token) {
                            void api
                              .reportQuizResult(
                                book.id,
                                { childId, chapterOrder: order, correct: quizPick === quiz.answerIndex, difficulty: value as 1 | 2 | 3 },
                                token,
                              )
                              .catch(() => undefined)
                          }
                        }}
                        style={{ fontSize: 12, minHeight: 38 }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
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

      {/* ── 插图灯箱（docs/34 P1-11）── */}
      {lightbox ? (
        <Overlay onClose={() => setLightbox(null)} label="放大插图" theme={theme}>
          <img src={lightbox} alt="放大插图" style={{ width: '100%', borderRadius: 10, display: 'block' }} />
          <div className="setting-row" style={{ marginTop: 12 }}>
            <button onClick={() => setLightbox(null)}>收起</button>
          </div>
        </Overlay>
      ) : null}
    </div>
  )
}
