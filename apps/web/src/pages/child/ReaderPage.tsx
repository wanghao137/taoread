/**
 * V8 阅读器页（路由 /child/book/:bookId/chapter/:order）。
 * 审计整改 Phase 2 + A8.3：把旧 ReaderScreen 的成熟能力移植进 v8.css 贴纸绘本壳——
 * 会话守卫（ACTIVE_SESSION_OTHER_BOOK 三选一）、章节加载与目录、
 * 进度上报（进入即报 + 滚动 5s 节流 + 按已存 blockOrder 续读定位）、
 * 服务端朗读（回退 Web Speech）与高亮档位、主题/字号/专注模式、生词贴纸、读完结算浮层、
 * 朗读期 Wake Lock 常亮与翻章触觉。就寝/休息时间闸已随 09-25 产品决策整体移除。
 * 样式只用 v8.css 既有类（.reader/.reader-top/.reader-body/.reader-art/.reader-text/.reader-controls/.settings）。
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, ApiError, API_BASE, type ContentChapterDto, type WordQuizDto } from '../../lib/api'
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
import { LocalRecorder } from '../../components/ui/LocalRecorder'
import { readPreference as loadPref, writePreference as savePref, readerTheme, readerFont } from '../../lib/storage'
import { useV8, LABELS, announceUnlocked, type V8Book } from './V8App'

type ReaderTheme = 'paper' | 'sepia' | 'night'

const FONT_MIN = 18
const FONT_MAX = 30
const FONT_STEP = 2

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

/** 行距三档（docs/34 P1-10） */
const LINE_STEPS: Array<{ label: string; value: number }> = [
  { label: '紧凑', value: 1.7 },
  { label: '舒适', value: 1.9 },
  { label: '宽松', value: 2.1 },
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
}: {
  onClose: () => void
  children: ReactNode
  dismissable?: boolean
  label: string
}) {
  return <Dialog label={label} onClose={onClose} dismissable={dismissable} className="settings">{children}</Dialog>
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
  const focusHintShown = useRef(false)
  useEffect(() => savePref('taoread-reader-theme', theme), [theme])
  useEffect(() => savePref('taoread-reader-font', font), [font])
  useEffect(() => savePref('taoread-reader-fontfamily', fontFamily), [fontFamily])
  useEffect(() => savePref('taoread-reader-lineheight', lineHeight), [lineHeight])

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
  const longPressRef = useRef(false)
  const pressTimerRef = useRef<number | null>(null)
  /** 书签（P1-11；本机 localStorage，跨章持久） */
  const familyId = useSession((s) => s.familyId)
  const bookmarkKey = `taoread-bookmarks-v2:${familyId}:${childId}:public:${book.id}:${book.contentVersion}`
  const [bookmarks, setBookmarks] = useState<Array<{ chapter: number; block: number }>>([])
  /** 插图灯箱（P1-11/P2-4） */
  const [lightbox, setLightbox] = useState<string | null>(null)

  /* ── 浮层开关 ── */
  const [showSettings, setShowSettings] = useState(false)
  const [settingsTab, setSettingsTab] = useState<'layout' | 'audio' | 'record'>('layout')
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
  /** R-04：客户端持有的行版本（updatedAt），上报时带回做防乱序覆盖 */
  const progressVerRef = useRef<string | undefined>(undefined)

  const persistProgress = useCallback(
    async (payload: { chapterOrder: number; blockOrder: number }) => {
      if (!childId || !token) return
      const seq = ++saveSeqRef.current
      setSaveState('saving')
      try {
        const res = await api.reportContentProgress(book.id, childId, { ...payload, baseUpdatedAt: progressVerRef.current }, token)
        progressVerRef.current = res.updatedAt
        if (seq === saveSeqRef.current) {
          unsavedRef.current = null
          setSaveState('saved')
        }
        // stale=另一台设备已写入更新进度：本机旧位置不覆盖服务器，也不重试
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
    async (target: number, restoreBlock = 0) => {
      if (!token) return
      const request = ++chapterRequest.current
      setLoading(true)
      setChapterError(null)
      try {
        // docs/35 C1：章节正文缓存命中则零网络开章（预取已 warmed）
        const res = { chapter: takeChapterCache(cacheBookKey, target) ?? (await api.contentChapter(book.id, target, token)).chapter }
        if (request !== chapterRequest.current) return
        putChapterCache(cacheBookKey, target, res.chapter)
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
              .reportContentProgress(book.id, childId, { chapterOrder: target, blockOrder: restoreBlock, baseUpdatedAt: progressVerRef.current }, token)
              .then((r) => {
                if (request === chapterRequest.current) progressVerRef.current = r.updatedAt
              })
              .catch(() => {})
          }
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
    [token, book.id, cacheBookKey, childId, showToast],
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

  /* ── 首次进入：先取已存进度（续读定位），再载入章节 ── */
  useEffect(() => {
    let alive = true
    void (async () => {
      let restore = 0
      if (childId && token) {
        try {
          const res = await api.contentProgress(book.id, childId, token)
          progressVerRef.current = res.progress.updatedAt
          if (alive && res.progress.versionChanged) showToast('内容有更新，已回到本章开头；原完成记录仍保留')
          if (alive && !res.progress.versionChanged && !res.progress.finished && res.progress.chapterOrder === startOrder) {
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
  useEffect(() => {
    try {
      const raw = localStorage.getItem(bookmarkKey)
      const data: unknown = raw ? JSON.parse(raw) : []
      setBookmarks(Array.isArray(data) ? data.filter((b): b is { chapter: number; block: number } =>
        !!b && Number.isInteger(b.chapter) && b.chapter >= 1 && b.chapter <= book.chapterCount &&
        Number.isInteger(b.block) && b.block >= 0).slice(0, 200) : [])
    } catch {
      setBookmarks([])
    }
  }, [bookmarkKey, book.chapterCount])

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
      if (e.key === 'ArrowLeft') goChapterRef.current(order - 1)
      if (e.key === 'ArrowRight') goChapterRef.current(order + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [order, showSettings, showChapters, showFinish, showScaffold, conflict, lightbox])

  /* ── 滚动节流上报（5s；挂在 main 容器上——scroll 不冒泡到 window） ── */
  useEffect(() => {
    const mainEl = mainRef.current
    if (!mainEl) return
    const onScroll = () => {
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
      if (now - lastReport.current < 5000) return
      lastReport.current = now
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
      // 兜底：极端情况下首段一直不来，90 秒后恢复按钮可用
      const prepareGuard = window.setTimeout(() => setPreparing(false), 90_000)
      // 中止器随本轮朗读生命周期：停止/离开页面时断开 SSE，后台不再白拉整章
      const ac = new AbortController()
      speakAbortRef.current = ac
      try {
        if (serverReady) {
          // speakChapter 在首段音频开播即返回（不再等整章 SSE 拉完）
          started = await audioPlayer.speakChapter(
            book.id,
            order,
            { title: ch.title, bookTitle: book.title },
            { lang: book.lang, ...(voiceId ? { voiceId } : {}), ...(speed !== null ? { speed } : {}), signal: ac.signal },
          )
        }
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
    const probe = highlight.text.slice(0, 60)
    if (!probe) return -1
    const from = Math.max(0, segAlignRef.current.start - 40)
    let at = chapterAlign.text.indexOf(probe, from)
    if (at < 0) at = chapterAlign.text.indexOf(probe)
    if (at < 0) return -1
    segAlignRef.current = { text: highlight.text, start: at }
    return at
  }, [chapterAlign, highlight])

  const globalChar = segStart >= 0 && highlight ? segStart + (highlight.charIndex >= 0 ? highlight.charIndex : 0) : -1

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
    if (!fallbackRanges || (highlight?.charIndex ?? -1) < 0) return null
    let last: (typeof fallbackRanges)[number] | null = null
    for (const r of fallbackRanges) {
      if (highlight!.charIndex >= r.start && highlight!.charIndex < r.end) return r
      if (highlight!.charIndex >= r.end) last = r
    }
    return last
  }, [chapterAlign, globalChar, fallbackRanges, highlight])

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
    // 全局对齐：块在章节全文的区间 + 全文偏移 → 块内偏移
    let localChar = -1
    if (chapterAlign && globalChar >= 0 && blockId) {
      const r = chapterAlign.ranges.find((x) => x.id === blockId)
      if (r && globalChar >= r.start && globalChar < r.end) localChar = globalChar - r.start
    }
    // 回退：段内映射（全局对齐失败时）
    if (localChar < 0 && blockId && fallbackRanges) {
      const r = fallbackRanges.find((x) => x.id === blockId)
      if (r && hl.charIndex >= r.start && hl.charIndex < r.end) localChar = hl.charIndex - r.start
    }
    if (localChar < 0) return text
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
      haptic('chapter')
      void loadChapter(target, 0)
    },
    [book.chapterCount, loadChapter, stopSpeaking],
  )
  // 键盘翻章 effect 在 goChapter 定义之前挂载，用 ref 取最新实现
  const goChapterRef = useRef<(target: number) => void>(() => undefined)
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
  const toggleBookmark = useCallback(() => {
    const current = { chapter: order, block: currentBlockRef.current }
    const exists = bookmarks.some((b) => b.chapter === current.chapter && b.block === current.block)
    const next = exists
      ? bookmarks.filter((b) => b.chapter !== current.chapter || b.block !== current.block)
      : [...bookmarks, current].sort((a, b) => a.chapter - b.chapter)
    setBookmarks(next)
    savePref(bookmarkKey, next)
    showToast(exists ? '书签收起来了' : '夹了张书签')
  }, [bookmarks, order, bookmarkKey, showToast])

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
        await api.addWord(childId, { word, lang: book.lang, bookId: book.id, context: chapterRef.current?.title }, token)
        setCollectedWords((prev) => new Set(prev).add(word))
        showToast('已收进生词本')
      } catch (err) {
        showToast(err instanceof Error ? err.message : '这个词没收进来，再试一次')
      }
    },
    [childId, token, book.lang, book.id, showToast],
  )

  /* ── 读完啦：先报进度（completed 只在最后一章为 true），再开结算浮层；
   * 同时预取读后小测（docs/34 P1-5）——出不了题就静默隐藏，绝不造假题 ── */
  const openFinish = useCallback(async () => {
    if (!childId || !token) return
    if (speaking) stopSpeaking()
    try {
      const res = await api.reportContentProgress(
        book.id,
        childId,
        {
          chapterOrder: order,
          blockOrder: currentBlockRef.current,
          completed: order >= book.chapterCount,
          baseUpdatedAt: progressVerRef.current,
        },
        token,
      )
      progressVerRef.current = res.updatedAt
      // stale=另一台设备已写入更新进度：不覆盖服务器，但本机照常进入结算
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

  return (
    <div className={`reader ${theme}`} style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
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

          {/* 题图：章节 image 块的 AI 图优先，回退封面；16:9 画框 + AI 角标；点击放大（docs/34 P1-11）。
              data-no-focus：点图开灯箱不应同时切换专注模式（验收修正，与 figure 块同口径）。
              fetchpriority=high（docs/35 A5）：题图是阅读器 LCP，优先于懒加载图块 */}
          <div className={`reader-art ${showHeroArt ? 'has-art' : ''}`} data-no-focus style={{ aspectRatio: '16 / 9', height: 'auto' }}>
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
          </div>

          <div
            className="reader-text"
            style={{
              fontSize: font,
              lineHeight,
              ...(fontFamily === 'sans' ? { fontFamily: SANS_STACK } : {}),
            }}
          >
            {blocks.map((b) => {
              const isSpeakingBlock = speakingBlockId === b.id
              if (b.kind === 'image') {
                // docs/35 A1：优先 reader 档（800w/R2，冷穿透不再走家庭上行），失败回退原档
                const url =
                  (b.artReaderUrl && !artBroken.has(b.artReaderUrl) ? b.artReaderUrl : null) ??
                  (b.artUrl && !artBroken.has(b.artUrl) ? b.artUrl : null)
                const showImg = Boolean(url)
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
                    <p
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
                      {isSpeakingBlock ? renderSpeakingChars(b.text, b.id) : b.text}
                      {savedBlocks.has(b.order) ? ' ✒️' : null}
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
                  {savedBlocks.has(b.order) ? ' ✒️' : null}
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
        {...(focused ? { inert: "" } : {})}
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
      {showSettings ? (
        <Overlay onClose={() => setShowSettings(false)} label="阅读设置">
          <div className="setting-row" role="group" aria-label="设置分类">
            <button aria-pressed={settingsTab === 'layout'} onClick={() => setSettingsTab('layout')}>排版</button>
            <button aria-pressed={settingsTab === 'audio'} onClick={() => setSettingsTab('audio')}>听读</button>
            <button aria-pressed={settingsTab === 'record'} onClick={() => { stopSpeaking(); setSettingsTab('record') }}>跟读录音 · 试点</button>
          </div>
          {settingsTab === 'record' && <LocalRecorder />}
          {settingsTab === 'layout' && <>
          <div className="setting-row">
            <button onClick={toggleBookmark}>在当前位置夹书签</button>
            <button onClick={() => { setShowSettings(false); void loadScaffold() }} disabled={scaffoldLoading}>给爸妈的共读话题</button>
          </div>
          <button className="sticker-btn" onClick={() => { const block = blocks[currentBlockRef.current]; if (block) void saveHighlight(block.order, block.text) }}>收藏当前段落为金句</button>
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
          {/* 字体/行距（docs/34 P1-10） */}
          <p className="mono-label" style={{ margin: '14px 0 8px' }}>
            字体
          </p>
          <div className="setting-row">
            <button aria-pressed={fontFamily === 'serif'} style={fontFamily === 'serif' ? { background: 'var(--sun)' } : undefined} onClick={() => setFontFamily('serif')}>
              宋体
            </button>
            <button aria-pressed={fontFamily === 'sans'} style={fontFamily === 'sans' ? { background: 'var(--sun)' } : undefined} onClick={() => setFontFamily('sans')}>
              黑体
            </button>
          </div>
          <p className="mono-label" style={{ margin: '14px 0 8px' }}>
            行距
          </p>
          <div className="setting-row">
            {LINE_STEPS.map((s) => (
              <button
                key={s.value}
                aria-pressed={lineHeight === s.value}
                style={lineHeight === s.value ? { background: 'var(--sun)' } : undefined}
                onClick={() => setLineHeight(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
          </>}
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
        </Overlay>
      ) : null}

      {/* ── 章节目录抽屉 ── */}
      {showChapters ? (
        <Overlay onClose={() => setShowChapters(false)} label="目录">
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
          {/* 书签（docs/34 P1-11）：本机书签跳回当时的段落 */}
          {bookmarks.length > 0 ? (
            <div style={{ marginTop: 14 }}>
              <p className="mono-label">🔖 书签</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {bookmarks.map((bm) => (
                  <button
                    key={`${bm.chapter}-${bm.block}`}
                    style={{ textAlign: 'left' }}
                    onClick={() => {
                      setShowChapters(false)
                      goBookmark(bm)
                    }}
                  >
                    第 {bm.chapter} 章 · 回到书签
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </Overlay>
      ) : null}

      {/* ── 共读脚手架（docs/34 P0-3）：给爸妈的悄悄话 ── */}
      {showScaffold && scaffold ? (
        <Overlay onClose={() => setShowScaffold(false)} label="给爸妈的悄悄话">
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
        <Overlay onClose={() => undefined} dismissable={false} label="上一本还没收尾">
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
        <Overlay onClose={() => setShowFinish(false)} label="读完啦">
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
        <Overlay onClose={() => setLightbox(null)} label="放大插图">
          <img src={lightbox} alt="放大插图" style={{ width: '100%', borderRadius: 10, display: 'block' }} />
          <div className="setting-row" style={{ marginTop: 12 }}>
            <button onClick={() => setLightbox(null)}>收起</button>
          </div>
        </Overlay>
      ) : null}
    </div>
  )
}
