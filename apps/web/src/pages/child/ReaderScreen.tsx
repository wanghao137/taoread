import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IconPlay, IconPause, IconVolume } from '../../components/ui/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { MOTION, useReducedMotion } from '../../lib/motion'
import { api, ApiError, type ContentChapterDto } from '../../lib/api'
import { tts, listVoices, type TtsVoiceInfo, type TtsProgress } from '../../lib/tts'
import { audioPlayer, type VoiceOption, type AudioProgress } from '../../lib/audioPlayer'
import { BookCover } from '../../components/art/BookCover'
import { SceneVideo } from '../../components/art/SceneVideo'
import { SceneArt, TaoMascot } from '../../components/art/SceneArt'
import { useSession } from '../../stores/session'
import { defaultReadingTheme, type ReadingTheme } from '../../lib/readingTheme'
import { haptic } from '../../lib/haptics'
import { extractNoteWord } from '../../lib/preview'
import { acquireWakeLock, releaseWakeLock, wakeLockSupported } from '../../lib/wakeLock'

interface ReaderProps {
  contentId: string
  bookTitle: string
  coverArt: string
  coverFrom?: string | null
  coverTo?: string | null
  lang: string
  totalChapters: number
  startChapter: number
  /** C3：续读时恢复到的块下标（来自 readingProgress.blockOrder） */
  startBlock?: number
  onExit: (finished: boolean) => void
}

type Theme = ReadingTheme

const THEMES: Record<Theme, { bg: string; text: string; panel: string; border: string; artFrom: string; artTo: string }> = {
  paper: { bg: '#FFFDF8', text: '#3E3A33', panel: '#FFFFFF', border: '#E8E0D0', artFrom: '#FFF3E0', artTo: '#FFE0B2' },
  sepia: { bg: '#F5EEDC', text: '#4E3B28', panel: '#FAF4E6', border: '#E3D5BB', artFrom: '#FFE0B2', artTo: '#D7CCC8' },
  // 暖夜主题（docs/21 §0 / docs/22）：从冷靛蓝换深暖棕 + 琥珀强调——
  // 儿童褪黑素对蓝光的敏感度是成人 2 倍，睡前正文页必须压低蓝光成分
  night: { bg: '#211810', text: '#F2E4CE', panel: '#2E2118', border: '#52402C', artFrom: '#5A3E1E', artTo: '#8A5A28' },
}

const FONT_SIZES = [18, 20, 22, 24, 26, 28]

/**
 * 朗读语速档位（docs/11 P0-2）。默认 0.92 = 引擎出厂值（略慢、适合跟读）。
 * 档位刻意只给 4 个：孩子不需要无极滑杆，家长一眼能选完。
 */
const RATE_STEPS: Array<{ label: string; value: number }> = [
  { label: '慢一点', value: 0.8 },
  { label: '刚好', value: 0.92 },
  { label: '稍快', value: 1.1 },
  { label: '快一点', value: 1.25 },
]

export function ReaderScreen(props: ReaderProps) {
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const role = useSession((s) => s.role)
  const childStage = useSession((s) => s.childStage)

  const [chapter, setChapter] = useState<ContentChapterDto | null>(null)
  const [titles, setTitles] = useState<Array<{ order: number; title: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState(props.startChapter)
  // P0-1：默认主题按本地时段推导——安静时段（20:00~06:00）默认给夜间护眼主题（护眼工具，白天仍默认纸白），
  // 不让孩子在暗夜里盯一块白屏
  const [theme, setTheme] = useState<Theme>(() => defaultReadingTheme())
  const [fontIdx, setFontIdx] = useState(2)
  const [showSettings, setShowSettings] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [highlight, setHighlight] = useState<TtsProgress | null>(null)
  /**
   * 朗读高亮粒度（docs/17 P0-1）。
   * 「跟随年龄」：6-8 岁逐字加粗（识字敏感期），3-5 岁只逐句（前读写者逐词证据缺失）。
   * 家长可在设置抽屉强制改三档——Wang & Huang 2015（n=185）：线索粒度必须匹配解码水平，
   * 熟练读者加线索无收益，所以允许关闭。
   */
  const [highlightMode, setHighlightMode] = useState<'auto' | 'word' | 'sentence' | 'off'>('auto')
  const [ttsError, setTtsError] = useState<string | null>(null)
  const [voicePanel, setVoicePanel] = useState(false)
  const [voices, setVoices] = useState<TtsVoiceInfo[]>([])
  /** 哄睡定时关闭（A1）：剩余分钟数；null=未设定 */
  const [sleepMinutes, setSleepMinutes] = useState<number | null>(null)
  const [sleepPanel, setSleepPanel] = useState(false)
  const sleepLeftRef = useRef<number>(0)
  const [sleepLeft, setSleepLeft] = useState<number>(0)
  /** B1 共读脚手架：家长向引导浮层（孩子端默认不显示，避免打断阅读节奏） */
  const [scaffold, setScaffold] = useState<{
    tellPoints: string[]
    questions: string[]
    hook: string
  } | null>(null)
  /**
   * 翻页方向（docs/15 动效）：上一章时正文从左进、下一章时从右进，
   * 复刻纸质书的翻页方向暗示。reduced-motion 时归零位移。
   */
  const [pageDir, setPageDir] = useState<1 | -1>(1)
  const reduced = useReducedMotion()
  const pageMotion = reduced
    ? MOTION.pageFade
    : pageDir === 1
      ? MOTION.pageForward
      : MOTION.pageBackward
  const [scaffoldOpen, setScaffoldOpen] = useState(false)
  const [scaffoldLoading, setScaffoldLoading] = useState(false)
  /**
   * 服务端朗读（docs/13 P0-C）：stepaudio 状态与选择。
   * serverReady=null 表示尚未探测；true 时朗读栏优先走服务端合成。
   */
  const [serverReady, setServerReady] = useState<boolean | null>(null)
  const [serverVoices, setServerVoices] = useState<VoiceOption[]>([])
  const [serverVoice, setServerVoice] = useState<string | null>(null)
  const [serverSpeed, setServerSpeed] = useState<number>(0.92)
  const serverHighlightRef = useRef<AudioProgress | null>(null)
  /**
   * 专注模式（docs/11 P0-6 / RD-8）：点正文区收起顶栏与朗读栏，把屏幕还给共读。
   * Reich 2016：平台控件越不抢眼，亲子对话越容易围绕书本身展开。
   */
  const [focused, setFocused] = useState(false)
  const [focusHint, setFocusHint] = useState(false)

  const theme_ = THEMES[theme]
  const fontSize = FONT_SIZES[fontIdx] ?? 22
  const blockRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())
  const lastReport = useRef(0)
  /** C3：进入章节时待恢复的块下标（由 ChildHome 从 progress.blockOrder 传入） */
  const restoredRef = useRef<number>(props.startBlock ?? 0)

  /* ── 章节加载 ── */
  const loadChapter = useCallback(
    async (target: number, restoreBlock?: number) => {
      if (!token) return
      setLoading(true)
      setError(null)
      try {
        const res = await api.contentChapter(props.contentId, target, token)
        setChapter(res.chapter)
        setOrder(target)
        // C3：恢复到上次读到的块；无记录时回章节顶
        const wantBlock = restoreBlock ?? restoredRef.current
        restoredRef.current = 0
        if (wantBlock > 0) {
          // 等 DOM 渲染完再滚动
          requestAnimationFrame(() => {
            const blocks = res.chapter.blocks
            const hit = blocks[Math.min(wantBlock, blocks.length - 1)]
            const el = hit ? blockRefs.current.get(hit.id) : null
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
            else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
          })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        }
        // 进度上报（节流：同一章 5s 内不重复写；C3 带上 blockOrder）
        if (childId) {
          const now = Date.now()
          if (now - lastReport.current > 5000) {
            lastReport.current = now
            void api
              .reportContentProgress(props.contentId, childId, { chapterOrder: target, blockOrder: wantBlock }, token)
              .catch(() => {})
          }
        }
      } catch (err) {
        setError(err instanceof ApiError ? err.message : '这一章还藏在云朵后面')
      } finally {
        setLoading(false)
      }
    },
    [token, props.contentId, childId],
  )

  useEffect(() => {
    void loadChapter(props.startChapter, props.startBlock ?? 0)
    // 仅在挂载时用一次 startBlock；后续翻章不再回弹
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 章节标题列表（目录用；与首章并行加载）
  useEffect(() => {
    if (!token) return
    api
      .contentChapterList(props.contentId, token)
      .then((res) => setTitles(res.chapters))
      .catch(() => {})
  }, [token, props.contentId])

  /* ── TTS ── */
  useEffect(() => {
    if (!tts.isSupported) return
    const offP = tts.onProgress((p) => setHighlight(p))
    const offE = tts.onEnd(() => {
      setSpeaking(false)
      setHighlight(null)
    })
    const offErr = tts.onError((msg) => {
      setSpeaking(false)
      setHighlight(null)
      setTtsError(msg)
    })
    return () => {
      offP()
      offE()
      offErr()
    }
  }, [])

  // 语音列表（异步加载完成后刷新一次）
  useEffect(() => {
    if (!tts.isSupported) return
    const refresh = () => setVoices(listVoices(props.lang))
    refresh()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = refresh
    }
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null
    }
  }, [props.lang])

  const stopTts = useCallback(() => {
    tts.stop()
    setSpeaking(false)
    setHighlight(null)
  }, [])

  /** 停止服务端朗读（与 Web Speech 引擎互斥，两者不会同时出声） */
  const stopServer = useCallback(() => {
    audioPlayer.stop()
  }, [])

  /* ── 服务端 TTS 探测 + 事件订阅（docs/13 P0-C）── */
  useEffect(() => {
    // 异步探测；失败/不支持时静默回退（serverReady=false 走 Web Speech）
    void audioPlayer.probe().then((ok) => {
      setServerReady(ok)
      if (ok) {
        setServerVoices(audioPlayer.voiceList)
        // 语速偏好复用 Web Speech 引擎已持久化的档位
        try {
          const saved = globalThis.localStorage?.getItem('taoread-tts-rate')
          if (saved) {
            const n = Number(saved)
            if (Number.isFinite(n) && n >= 0.5 && n <= 2) setServerSpeed(n)
          }
        } catch {
          /* 隐私模式无存储 */
        }
      }
    })
    const offP = audioPlayer.onProgress((p) => {
      serverHighlightRef.current = p
      setHighlight({
        index: p.index,
        total: p.total,
        text: p.text,
        charIndex: p.charIndex,
      })
    })
    const offE = audioPlayer.onEnd(() => {
      setSpeaking(false)
      setHighlight(null)
      serverHighlightRef.current = null
    })
    const offErr = audioPlayer.onError((msg) => {
      setSpeaking(false)
      setHighlight(null)
      serverHighlightRef.current = null
      setTtsError(msg)
    })
    return () => {
      offP()
      offE()
      offErr()
    }
  }, [])

  // 退出时停止朗读（两个引擎都停）
  useEffect(() => {
    return () => {
      if (tts.isSpeaking) tts.stop()
      audioPlayer.stop()
    }
  }, [])

  /* ── C3：滚动时节流上报当前块下标，作为续读恢复点 ── */
  useEffect(() => {
    const onScroll = () => {
      if (!chapter || !childId || !token) return
      const now = Date.now()
      if (now - lastReport.current < 5000) return
      // 找到视口顶部之下第一个可见块
      const probe = 120
      let idx = 0
      for (let i = 0; i < chapter.blocks.length; i++) {
        const el = blockRefs.current.get(chapter.blocks[i]!.id)
        if (el && el.getBoundingClientRect().top > probe) {
          idx = Math.max(0, i - 1)
          break
        }
        idx = i
      }
      lastReport.current = now
      void api
        .reportContentProgress(props.contentId, childId, { chapterOrder: order, blockOrder: idx }, token)
        .catch(() => {})
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [chapter, childId, token, order, props.contentId])

  /* ── A1：哄睡定时关闭。到点温和停止朗读，不催促、不警告（Scholastic：唠叨毁动机） ── */
  useEffect(() => {
    if (sleepMinutes === null) {
      sleepLeftRef.current = 0
      setSleepLeft(0)
      return
    }
    sleepLeftRef.current = sleepMinutes * 60
    setSleepLeft(sleepMinutes * 60)
    const timer = setInterval(() => {
      sleepLeftRef.current -= 1
      if (sleepLeftRef.current <= 0) {
        clearInterval(timer)
        // 渐弱停止（Tonies 范式）：突然安静会惊醒半睡的孩子
        tts.stop()
        audioPlayer.fadeOutAndStop()
        setSpeaking(false)
        setHighlight(null)
        setSleepMinutes(null)
        setSleepPanel(false)
        setTtsError('时间到啦，这次的故事先到这里，下次见')
      } else {
        setSleepLeft(sleepLeftRef.current)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [sleepMinutes])

  /** B1：家长打开「这次怎么讲」——按当前章节取脚手架，只在家长角色下可用 */
  const openScaffold = useCallback(async () => {
    if (!token) return
    if (scaffold) {
      setScaffoldOpen(true)
      return
    }
    setScaffoldLoading(true)
    try {
      const res = await api.contentScaffold(props.contentId, order, token)
      setScaffold({
        tellPoints: res.card.tellPoints,
        questions: res.card.questions,
        hook: res.card.hook,
      })
      setScaffoldOpen(true)
    } catch {
      setTtsError('脚手架暂时没拿到，共读可以先开始')
    } finally {
      setScaffoldLoading(false)
    }
  }, [token, scaffold, props.contentId, order])

  // B1：章节切换后清掉旧脚手架，下次打开按新章正文取
  useEffect(() => {
    setScaffold(null)
    setScaffoldOpen(false)
  }, [order])

  const sleepLabel =
    sleepMinutes === null
      ? '定时'
      : `⏲ ${Math.floor(sleepLeft / 60)}:${String(sleepLeft % 60).padStart(2, '0')}`

  /**
   * 朗读当前章节（docs/13 P0-C）。
   * 优先服务端 stepaudio（拟人化、整章流式、字级时间轴），
   * 不可用时回退浏览器 Web Speech（按句高亮）。
   * 两条路径共用 speaking/highlight 状态，UI 无感知差异。
   */
  const speakChapter = useCallback(() => {
    if (!chapter) return
    setTtsError(null)
    if (speaking) {
      stopServer()
      stopTts()
      return
    }
    // 用户手势入口：如果服务端队列被自动播放策略拦下（paused），从这里恢复
    void (async () => {
      if (serverReady) {
        const resumed = await audioPlayer.resumeQueue()
        if (resumed) {
          setSpeaking(true)
          return
        }
      }
      // 先探测服务端 TTS；未就绪/失败时同步回退 Web Speech
      let started = false
      const lang: 'zh' | 'en' = props.lang === 'en' ? 'en' : 'zh'
      try {
        if (serverReady) {
          started = await audioPlayer.speakChapter(
            props.contentId,
            order,
            { bookTitle: props.bookTitle, title: chapter.title },
            { lang, ...(serverVoice ? { voiceId: serverVoice } : {}), speed: serverSpeed },
          )
        }
      } catch {
        started = false
      }
      if (started) {
        setSpeaking(true)
        return
      }
      // 回退：浏览器语音
      const text = chapter.blocks
        .filter((b) => b.kind === 'text' || b.kind === 'poem')
        .map((b) => b.text)
        .join('\n')
      const fallbackStarted = tts.speak(text, { lang: props.lang })
      if (fallbackStarted) setSpeaking(true)
    })()
  }, [chapter, speaking, props.lang, props.contentId, props.bookTitle, order, serverReady, serverVoice, serverSpeed, stopTts, stopServer])

  // P0-7：朗读时屏幕常亮（Wake Lock），停读/离开阅读器时释放
  // iOS 18.4 以前不支持——拿不到锁时给一句温和提示，不阻塞朗读
  const [wakeHint, setWakeHint] = useState(false)
  useEffect(() => {
    if (speaking) {
      if (!wakeLockSupported()) setWakeHint(true)
      void acquireWakeLock()
    } else {
      setWakeHint(false)
      void releaseWakeLock()
    }
    return () => {
      void releaseWakeLock()
    }
  }, [speaking])

  // 高亮句所在块滚动到视野
  useEffect(() => {
    if (!highlight || !chapter) return
    const block = chapter.blocks.find((b) => b.text.includes(highlight.text.slice(0, 12)))
    if (block) {
      const el = blockRefs.current.get(block.id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlight, chapter])

  const pickVoice = useCallback(
    (voiceURI: string) => {
      tts.configure({ voiceURI, lang: props.lang })
      setVoicePanel(false)
      if (speaking) {
        // 换语音：重播当前句
        const current = highlight
        stopTts()
        setTimeout(() => {
          const started = tts.speak(current?.text ?? '', { lang: props.lang, voiceURI })
          if (started) setSpeaking(true)
        }, 120)
      }
    },
    [props.lang, speaking, highlight, stopTts],
  )

  /** 服务端音色选择（docs/13 P0-C）：写入播放器，朗读中切换则重播当前段 */
  const pickServerVoice = useCallback(
    (voiceId: string) => {
      setServerVoice(voiceId)
      setVoicePanel(false)
      if (speaking && serverReady) {
        const current = serverHighlightRef.current
        audioPlayer.stop()
        setSpeaking(false)
        setHighlight(null)
        if (current && current.text) {
          const lang: 'zh' | 'en' = props.lang === 'en' ? 'en' : 'zh'
          setTimeout(() => {
            void audioPlayer.speak(current.text, { voiceId, speed: serverSpeed, lang }).then((ok) => {
              if (ok) setSpeaking(true)
            })
          }, 120)
        }
      }
    },
    [speaking, serverReady, serverSpeed, props.lang],
  )

  /** 语速档位：写入两个引擎并持久化，朗读中改对下一段生效 */
  const pickRate = useCallback(
    (rate: number) => {
      tts.configure({ rate, lang: props.lang })
      setServerSpeed(rate)
      setVoicePanel(false)
    },
    [props.lang],
  )

  /**
   * 专注模式切换：只有点击在正文留白/段落上才触发，
   * 落在按钮、图片、链接上的点击一律不吞（避免误触退出朗读）。
   */
  const toggleFocus = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement | null
    if (target?.closest('button, a, figure, input, textarea, [data-no-focus]')) return
    setFocused((prev) => {
      const next = !prev
      // 首次进入专注模式时给一次提示，告诉孩子怎么回来
      if (next && !focusHint) {
        setFocusHint(true)
        setTimeout(() => setFocusHint(false), 2600)
      }
      return next
    })
  }, [focusHint])

  const isLastChapter = order >= props.totalChapters

  /**
   * 动画画面描述（docs/13 P0-E）：用章节标题 + 书名拼一段画面描述，
   * 与插画 prompt 同源，让动起来的是同一幅画。诗意章节用标题本身最有画面感。
   */
  const videoDescription = useMemo(() => {
    const t = chapter?.title ?? ''
    // 标题里的「· 作者」后缀去掉，只要画面本身
    const main = t.split('·')[0]?.trim() || t
    return `${props.bookTitle}·${main}：与诗意相符的安静优美画面`
  }, [chapter?.title, props.bookTitle])

  const goPrev = useCallback(() => {
    if (order > 1) {
      haptic('chapter')
      setPageDir(-1)
      void loadChapter(order - 1)
    }
  }, [order, loadChapter])
  const goNext = useCallback(() => {
    if (!isLastChapter) {
      haptic('chapter')
      setPageDir(1)
      void loadChapter(order + 1)
    }
  }, [isLastChapter, order, loadChapter])

  const finish = useCallback(() => {
    haptic('stamp')
    if (speaking) stopTts()
    if (childId && token) {
      void api
        .reportContentProgress(props.contentId, childId, { chapterOrder: props.totalChapters, blockOrder: 0 }, token)
        .catch(() => {})
    }
    props.onExit(true)
  }, [speaking, stopTts, childId, token, props])

  /** P0-5：朗读英文 note 里的生词。服务端 TTS 优先，不可用时回退 Web Speech */
  const speakNoteWord = useCallback(
    async (word: string) => {
      stopTts()
      const ok = await audioPlayer.speak(word, { lang: 'en' })
      if (!ok) tts.speak(word, { lang: 'en' })
    },
    [stopTts],
  )

  /** 生词本（docs/15 P1-B）：本章节已收录的词，用于按钮态 */
  const [collectedWords, setCollectedWords] = useState<Set<string>>(new Set())

  const collectWord = useCallback(
    async (word: string) => {
      if (!childId || !token) return
      setCollectedWords((prev) => new Set(prev).add(word))
      try {
        await api.addWord(
          childId,
          { word, lang: props.lang === 'en' ? 'en' : 'zh', bookId: props.contentId, context: chapter?.title },
          token,
        )
      } catch {
        // 收失败不撤回界面状态：词可能已收录过（幂等），下次进来仍显示已收
      }
    },
    [childId, token, props.lang, props.contentId, chapter?.title],
  )

  const blocks = chapter?.blocks ?? []
  const speakingBlockId = useMemo(() => {
    if (!highlight || !chapter) return null
    const hit = chapter.blocks.find((b) => b.text.includes(highlight.text.slice(0, 12)))
    return hit?.id ?? null
  }, [highlight, chapter])

  /**
   * 实际生效的高亮粒度（docs/17 P0-1）。
   * auto 按年龄段落定；charIndex===-1（Web Speech 回退）时永远只逐句，不假装逐字。
   */
  const effectiveHighlight = useMemo<'word' | 'sentence' | 'off'>(() => {
    if (highlightMode === 'off') return 'off'
    if (highlightMode === 'auto') {
      // 6-8 / 9-12 岁识字敏感期才逐字；3-5 岁前读写者只逐句
      return childStage === '6-8' || childStage === '9-12' ? 'word' : 'sentence'
    }
    return highlightMode
  }, [highlightMode, childStage])

  /** 当前句的字级高亮下标；非逐字模式或无时间轴时为 -1 */
  const activeCharIdx = useMemo(() => {
    if (effectiveHighlight !== 'word' || !highlight) return -1
    if (highlight.charIndex < 0) return -1
    return highlight.charIndex
  }, [effectiveHighlight, highlight])

  /**
   * 渲染正在朗读的那一句（docs/17 P0-1）。
   * 逐字模式：当前字深色加粗，已读字略深、未读字略淡——karaoke 式但不用颜色区分
   * （色盲友好：靠字重与透明度，不靠红绿）。逐句模式：整句底色柔和高亮。
   * 高亮与音频同步连续推进，不触发停顿、不弹窗（Bus 2025：打断故事流程的交互无效）。
   */
  function renderSpeakingText(text: string): React.ReactNode {
    if (effectiveHighlight === 'off' || activeCharIdx < 0) return text
    const chars = Array.from(text)
    return chars.map((ch, i) => (
      <span
        key={i}
        style={{
          fontWeight: i === activeCharIdx ? 800 : 'inherit',
          color: i < activeCharIdx ? theme_.text : `${theme_.text}99`,
          transition: 'color 0.15s, font-weight 0.15s',
        }}
      >
        {ch}
      </span>
    ))
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: theme_.bg }}>
        <div className="flex flex-col items-center gap-3">
          <motion.div
            // docs/17 P0-4：加载圈是「进度指示」非装饰动效，保留旋转；reduced 时降为脉冲
            animate={reduced ? { opacity: [0.4, 1, 0.4] } : { rotate: 360 }}
            transition={reduced ? MOTION.twinkle.transition : { repeat: Infinity, duration: 1.6, ease: 'linear' }}
            className="h-12 w-12 rounded-full border-4 border-t-transparent"
            style={{ borderColor: `${theme_.text}33`, borderTopColor: theme_.text }}
          />
          <p style={{ color: theme_.text }} className="text-sm opacity-70">
            翻开下一页…
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 px-8" style={{ background: theme_.bg }}>
        {/* S-12：网络闪一下不该把孩子踢出阅读器——先给「再试一次」，退出是次要操作 */}
        <div aria-hidden>
          <TaoMascot mood="hint" className="h-20 w-20" />
        </div>
        <p style={{ color: theme_.text }} className="text-lg">
          {error}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void loadChapter(order)}
            className="min-h-touch rounded-full px-6 text-base font-bold"
            style={{ background: theme_.text, color: theme_.bg }}
          >
            再试一次
          </button>
          <button
            type="button"
            onClick={() => props.onExit(false)}
            className="min-h-touch rounded-full px-5 text-base font-medium"
            style={{ border: `1px solid ${theme_.border}`, color: theme_.text }}
          >
            回到书架
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: theme_.bg }}>
      {/* ── 顶栏（z-20 盖住底部栏的渐变蒙层，避免返回按钮被遮挡） ── */}
      <header
        className={`relative z-20 flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
          focused ? '-translate-y-2 opacity-0' : 'opacity-100'
        }`}
        style={{ background: theme_.panel, borderBottom: `1px solid ${theme_.border}` }}
        aria-hidden={focused}
      >
        <button
          type="button"
          onClick={() => props.onExit(false)}
          className="flex min-h-touch items-center gap-1 rounded-full px-3 text-sm"
          style={{ color: theme_.text }}
          aria-label="退出阅读"
        >
          <span className="text-lg">←</span> 书架
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-semibold" style={{ color: theme_.text }}>
            {props.bookTitle}
          </p>
          <p className="text-xs opacity-60" style={{ color: theme_.text }}>
            {chapter?.title} · 第 {order} / {props.totalChapters} 章
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowChapters(true)}
          className="min-h-touch rounded-full px-3 text-sm"
          style={{ color: theme_.text }}
          aria-label="章节目录"
        >
          目录
        </button>
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="flex min-h-touch h-10 w-10 items-center justify-center rounded-full text-lg"
          style={{ color: theme_.text }}
          aria-label="阅读设置"
        >
          Aa
        </button>
        {role === 'parent' ? (
          <button
            type="button"
            onClick={() => void openScaffold()}
            disabled={scaffoldLoading}
            className="flex min-h-touch h-10 items-center justify-center rounded-full px-3 text-xs font-medium"
            style={{ color: theme_.text, border: `1px solid ${theme_.border}` }}
            aria-label="这次怎么讲"
          >
            {scaffoldLoading ? '…' : '讲什么'}
          </button>
        ) : null}
      </header>

      {/* ── 正文（点击留白处切换专注模式，docs/11 P0-6） ── */}
      <main
        onClick={toggleFocus}
        className="flex-1 overflow-y-auto px-6 pb-40 pt-6"
        style={{ scrollPaddingTop: 80 }}
      >
        <div className="mx-auto max-w-2xl">
          {/*
            翻页动效（docs/15）：key 随 order 变化即触发重挂载，正文按翻页方向滑入。
            不用 AnimatePresence exit——章节加载会先走全屏 loading，exit 动画会被打断；
            只播进场，足够给出方向暗示又不增加等待。
          */}
          <motion.div key={order} {...pageMotion}>
          {/* 章节题图（docs/13 P0-D：优先 AI 插画，回退 SVG 场景；P0-E：可生成 5 秒动画） */}
          {chapter?.art ? (
            <div className="mb-6">
              <SceneVideo
                scene={chapter.art}
                description={videoDescription}
                aspectRatio="16:9"
                poster={chapter.artUrl}
              >
                <div className="overflow-hidden rounded-3xl shadow-lg" style={{ aspectRatio: '16 / 9' }}>
                  <BookCover
                    urlPath={chapter.artUrl}
                    scene={chapter.art}
                    from={theme === 'night' ? theme_.artFrom : props.coverFrom}
                    to={theme === 'night' ? theme_.artTo : props.coverTo}
                    lang={props.lang}
                    alt={`${chapter.title}题图`}
                  />
                </div>
              </SceneVideo>
            </div>
          ) : null}
          <h2
            className="mb-6 text-center text-2xl font-bold"
            style={{ color: theme_.text, fontFamily: props.lang === 'zh' ? 'serif' : 'inherit' }}
          >
            {chapter?.title}
          </h2>
          {blocks.map((b) => {
            const isSpeaking = speakingBlockId === b.id
            const isSpeakingBlock = isSpeaking && effectiveHighlight !== 'off'
            if (b.kind === 'image') {
              return (
                <figure key={b.id} className="my-6">
                  <div className="overflow-hidden rounded-3xl shadow-lg" style={{ aspectRatio: '16 / 9' }}>
                    {/* docs/24：图片块优先 AI 插画（与章节题图同管线），无记录回退 SVG 场景 */}
                    <BookCover
                      urlPath={b.artUrl}
                      scene={b.art ?? chapter?.art ?? 'bookshelf'}
                      from={theme === 'night' ? theme_.artFrom : props.coverFrom}
                      to={theme === 'night' ? theme_.artTo : props.coverTo}
                      lang={props.lang}
                      alt={b.text ?? `${chapter?.title ?? ''}插图`}
                    />
                  </div>
                  {b.text ? (
                    <figcaption
                      className="mt-2 text-center text-xs opacity-70"
                      style={{ color: theme_.text }}
                    >
                      {b.text}
                    </figcaption>
                  ) : null}
                </figure>
              )
            }
            if (b.kind === 'note') {
              // P0-5：英文 note 切出生词，孩子可以点喇叭听发音（切不出时不渲染按钮）
              const noteWord = extractNoteWord(b.text)
              return (
                <div
                  key={b.id}
                  ref={(el) => blockRefs.current.set(b.id, el)}
                  className="my-5 flex gap-3 rounded-2xl p-4"
                  style={{ background: theme === 'night' ? '#3A2B1C' : '#FFF8E7', border: `1px solid ${theme_.border}` }}
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl">
                    <SceneArt scene={b.art ?? 'lamp-hint'} from={theme_.artFrom} to={theme_.artTo} lang={props.lang} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-relaxed" style={{ color: theme_.text }}>
                      {b.text}
                    </p>
                    {noteWord ? (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void speakNoteWord(noteWord)}
                          className="flex min-h-touch items-center gap-1.5 rounded-full px-3 text-xs font-bold"
                          style={{ border: `1px solid ${theme_.border}`, color: theme_.text }}
                          aria-label={`听 ${noteWord} 的发音`}
                        >
                          <IconPlay size={12} /> 听这个词
                        </button>
                        {/* 生词本（docs/15 P1-B）：收下这个词，回头在生词本里翻看 */}
                        <button
                          type="button"
                          onClick={() => void collectWord(noteWord)}
                          aria-label={`把 ${noteWord} 收进生词本`}
                          className="flex min-h-touch items-center gap-1.5 rounded-full px-3 text-xs font-bold"
                          style={{
                            border: `1px solid ${collectedWords.has(noteWord) ? theme_.text : theme_.border}`,
                            color: theme_.text,
                            background: collectedWords.has(noteWord) ? `${theme_.text}18` : 'transparent',
                          }}
                        >
                          {collectedWords.has(noteWord) ? '✓ 已收下' : '☆ 收下这个词'}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            }
            if (b.kind === 'poem') {
              return (
                <div
                  key={b.id}
                  ref={(el) => blockRefs.current.set(b.id, el)}
                  className="my-6 rounded-3xl p-6 text-center"
                  style={{
                    background: theme === 'night' ? '#2A1F14' : '#FFFDF6',
                    border: `1px solid ${theme_.border}`,
                    transition: 'box-shadow 0.3s',
                    boxShadow: isSpeaking ? `0 0 0 2px ${theme_.text}55` : 'none',
                  }}
                >
                  <p
                    className="whitespace-pre-line text-lg leading-loose"
                    style={{
                      color: theme_.text,
                      fontFamily: 'serif',
                      fontSize: fontSize * 0.95,
                      // docs/17 P0-3：Hakvoort 2017（JECP）——增大字间距提升阅读准确率，
                      // 且该效应非阅读障碍儿童特有，典型发展儿童同样获益，故作为默认排版基线
                      letterSpacing: '0.04em',
                    }}
                  >
                    {isSpeakingBlock ? renderSpeakingText(b.text) : b.text}
                  </p>
                  {b.pinyin ? (
                    <p
                      className="mt-3 whitespace-pre-line text-sm leading-relaxed opacity-70"
                      style={{ color: theme_.text }}
                    >
                      {b.pinyin}
                    </p>
                  ) : null}
                  {b.translation ? (
                    <p
                      className="mt-4 border-t pt-4 text-sm leading-relaxed opacity-80"
                      style={{ color: theme_.text, borderColor: theme_.border }}
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
                ref={(el) => blockRefs.current.set(b.id, el)}
                className="mb-5 leading-loose"
                style={{
                  color: theme_.text,
                  fontSize,
                  lineHeight: 1.9,
                  textIndent: props.lang === 'zh' ? '2em' : '0',
                  // docs/17 P0-3：同上，字间距普适基线；英文用 wordSpacing 更自然
                  letterSpacing: props.lang === 'zh' ? '0.04em' : '0.01em',
                  fontFamily: props.lang === 'zh' ? 'serif' : 'inherit',
                  transition: 'box-shadow 0.3s',
                  borderRadius: 12,
                  boxShadow: isSpeaking ? `0 0 0 2px ${theme_.text}44` : 'none',
                }}
              >
                {isSpeakingBlock ? renderSpeakingText(b.text) : b.text}
              </p>
            )
          })}

          {/* 章节导航 */}
          <nav className="my-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={order <= 1}
              className="min-h-touch rounded-full px-5 text-sm font-medium disabled:opacity-30"
              style={{ background: theme_.panel, color: theme_.text, border: `1px solid ${theme_.border}` }}
            >
              ← 上一章
            </button>
            {isLastChapter ? (
              <button
                type="button"
                onClick={finish}
                className="min-h-touch rounded-full bg-terra px-6 text-sm font-bold text-white shadow-lg"
              >
                读完啦
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="min-h-touch rounded-full bg-terra px-6 text-sm font-bold text-white shadow-lg"
              >
                下一章 →
              </button>
            )}
          </nav>
          </motion.div>
        </div>
      </main>

      {/* 专注模式首次提示：2.6 秒后自动消失，不打断阅读 */}
      <AnimatePresence>
        {focused && focusHint ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-x-0 top-4 z-30 flex justify-center"
          >
            <span
              className="rounded-full px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-sm"
              style={{ background: `${theme_.panel}ee`, color: theme_.text, border: `1px solid ${theme_.border}` }}
            >
              专心读故事吧 · 再点一下屏幕，工具就回来啦
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ── 底部朗读栏 ── */}
      <footer
        className={`absolute inset-x-0 bottom-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 transition-all duration-200 ${
          focused ? 'pointer-events-none translate-y-2 opacity-0' : 'opacity-100'
        }`}
        style={{
          background: `linear-gradient(180deg, ${theme_.bg}00 0%, ${theme_.bg}cc 30%, ${theme_.bg} 100%)`,
        }}
        aria-hidden={focused}
      >
        <div
          className="mx-auto flex max-w-2xl items-center gap-3 rounded-full p-2 shadow-xl"
          style={{ background: theme_.panel, border: `1px solid ${theme_.border}` }}
        >
          <button
            type="button"
            onClick={speakChapter}
            disabled={!chapter}
            className="flex min-h-touch h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xl text-white shadow-md"
            style={{ background: speaking ? '#C15F3C' : '#D97757' }}
            aria-label={speaking ? '停止朗读' : '朗读本章'}
          >
            {speaking ? <IconPause size={22} /> : <IconVolume size={22} />}
          </button>
          <div className="min-w-0 flex-1">
            {speaking && highlight ? (
              <p className="truncate text-xs" style={{ color: theme_.text }}>
                <span className="opacity-60">{highlight.index + 1}/{highlight.total} </span>
                {highlight.text}
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setVoicePanel(true)}
                className="flex w-full min-h-touch items-center gap-2 rounded-full px-2 text-left text-sm"
                style={{ color: theme_.text }}
              >
                <span className="opacity-60">
                  {serverReady
                    ? serverVoices.find((v) => v.id === serverVoice)?.label ?? '桃桃声库 · 拟人朗读'
                    : tts.isSupported
                      ? '点击选择声音'
                      : '当前浏览器不支持朗读'}
                </span>
              </button>
            )}
          </div>
          {tts.isSupported || serverReady ? (
            <button
              type="button"
              onClick={() => setVoicePanel(true)}
              className="min-h-touch rounded-full px-3 text-xs"
              style={{ color: theme_.text, border: `1px solid ${theme_.border}` }}
            >
              {serverReady
                ? serverVoices.find((v) => v.id === serverVoice)?.label ?? '声音'
                : voices.find((v) => v.voiceURI === tts.config.voiceURI)?.name?.split(' ').slice(0, 2).join(' ') ?? '声音'}
            </button>
          ) : null}
          {tts.isSupported || serverReady ? (
            <button
              type="button"
              onClick={() => setSleepPanel(true)}
              className="flex min-h-touch flex-shrink-0 items-center rounded-full px-3 text-xs font-medium"
              style={{
                color: sleepMinutes !== null ? '#FFFFFF' : theme_.text,
                background: sleepMinutes !== null ? '#B07A2E' : 'transparent',
                border: `1px solid ${sleepMinutes !== null ? '#B07A2E' : theme_.border}`,
              }}
              aria-label="哄睡定时"
            >
              {sleepLabel}
            </button>
          ) : null}
        </div>
        {ttsError ? (
          <p className="mt-1 text-center text-xs" style={{ color: '#E57373' }}>
            {ttsError}
          </p>
        ) : null}
        {wakeHint ? (
          <p className="mt-1 text-center text-xs" style={{ color: theme_.text, opacity: 0.7 }}>
            这台设备管不住屏幕，请帮小读者保持屏幕亮着
          </p>
        ) : null}
      </footer>

      {/* ── 设置面板 ── */}
      <AnimatePresence>
        {showSettings ? (
          <Sheet onClose={() => setShowSettings(false)} theme_={theme_} title="阅读设置">
            <p className="mb-2 text-sm opacity-70" style={{ color: theme_.text }}>
              字号
            </p>
            <div className="mb-5 flex items-center gap-2">
              {FONT_SIZES.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFontIdx(i)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium"
                  style={{
                    background: fontIdx === i ? theme_.text : theme_.panel,
                    color: fontIdx === i ? theme_.bg : theme_.text,
                    border: `1px solid ${theme_.border}`,
                    fontSize: s * 0.62,
                  }}
                >
                  A
                </button>
              ))}
            </div>
            <p className="mb-2 text-sm opacity-70" style={{ color: theme_.text }}>
              主题
            </p>
            <div className="flex gap-3">
              {(Object.keys(THEMES) as Theme[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className="flex h-16 flex-1 flex-col items-center justify-center gap-1 rounded-2xl"
                  style={{
                    background: THEMES[t].bg,
                    border: theme === t ? `2px solid ${theme_.text}` : `1px solid ${theme_.border}`,
                  }}
                >
                  <span className="text-xs" style={{ color: THEMES[t].text }}>
                    {t === 'paper' ? '纸白' : t === 'sepia' ? '护眼' : '夜间护眼'}
                  </span>
                  <span className="text-[10px] opacity-60" style={{ color: THEMES[t].text }}>
                    abc 桃
                  </span>
                </button>
              ))}
            </div>
            <p className="mb-2 mt-6 text-sm opacity-70" style={{ color: theme_.text }}>
              朗读跟着读
            </p>
            <div className="mb-2 flex gap-2">
              {([
                { v: 'auto', label: '跟着年龄' },
                { v: 'word', label: '逐字' },
                { v: 'sentence', label: '逐句' },
                { v: 'off', label: '关掉' },
              ] as const).map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setHighlightMode(o.v)}
                  aria-pressed={highlightMode === o.v}
                  className="min-h-touch flex-1 rounded-full text-sm font-medium"
                  style={{
                    background: highlightMode === o.v ? theme_.text : theme_.panel,
                    color: highlightMode === o.v ? theme_.bg : theme_.text,
                    border: `1px solid ${highlightMode === o.v ? theme_.text : theme_.border}`,
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="text-xs opacity-60" style={{ color: theme_.text }}>
              {highlightMode === 'auto'
                ? `按年龄自动：${childStage === '6-8' || childStage === '9-12' ? '识字期，逐字跟着读' : '年龄小，整句高亮'}`
                : highlightMode === 'off'
                  ? '朗读时文字不变化'
                  : highlightMode === 'word'
                    ? '读到哪个字，哪个字变深'
                    : '读到哪句，哪句整体高亮'}
            </p>
          </Sheet>
        ) : null}
      </AnimatePresence>

      {/* ── 章节目录 ── */}
      <AnimatePresence>
        {showChapters ? (
          <Sheet onClose={() => setShowChapters(false)} theme_={theme_} title="章节目录">
            <div className="flex flex-col gap-1">
              {Array.from({ length: props.totalChapters }, (_, i) => i + 1).map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    void loadChapter(o)
                    setShowChapters(false)
                  }}
                  className="min-h-touch rounded-xl px-4 py-3 text-left text-sm"
                  style={{
                    background: o === order ? theme_.text + '18' : 'transparent',
                    color: theme_.text,
                    fontWeight: o === order ? 700 : 400,
                  }}
                >
                  第 {o} 章 · {titles.find((t) => t.order === o)?.title ?? ''}
                  {o === order ? ' · 正在读' : ''}
                </button>
              ))}
            </div>
          </Sheet>
        ) : null}
      </AnimatePresence>

      {/* ── B1 共读脚手架（家长向） ── */}
      <AnimatePresence>
        {scaffoldOpen && scaffold ? (
          <Sheet onClose={() => setScaffoldOpen(false)} theme_={theme_} title="这次怎么讲">
            <p className="mb-1 text-xs font-bold opacity-70" style={{ color: theme_.text }}>
              讲什么
            </p>
            <ul className="mb-4 flex flex-col gap-2">
              {scaffold.tellPoints.map((t, i) => (
                <li
                  key={i}
                  className="rounded-xl p-3 text-sm leading-relaxed"
                  style={{ background: theme_.text + '10', color: theme_.text }}
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="mb-1 text-xs font-bold opacity-70" style={{ color: theme_.text }}>
              可以问
            </p>
            <ul className="mb-4 flex flex-col gap-2">
              {scaffold.questions.map((q, i) => (
                <li
                  key={i}
                  className="rounded-xl p-3 text-sm leading-relaxed"
                  style={{ background: theme_.text + '10', color: theme_.text }}
                >
                  {q}
                </li>
              ))}
            </ul>
            <p className="mb-1 text-xs font-bold opacity-70" style={{ color: theme_.text }}>
              聊什么
            </p>
            <p
              className="rounded-xl p-3 text-sm leading-relaxed"
              style={{ background: theme_.text + '10', color: theme_.text }}
            >
              {scaffold.hook}
            </p>
            <p className="mt-3 text-xs leading-relaxed opacity-60" style={{ color: theme_.text }}>
              不用每题都问，挑一个孩子接得住的就好。读不完也没关系。
            </p>
          </Sheet>
        ) : null}
      </AnimatePresence>

      {/* ── A1 哄睡定时 ── */}
      <AnimatePresence>
        {sleepPanel ? (
          <Sheet onClose={() => setSleepPanel(false)} theme_={theme_} title="哄睡定时">
            <p className="mb-4 text-sm leading-relaxed opacity-70" style={{ color: theme_.text }}>
              朗读到时间会轻轻停下，不说「该休息了」，只道一声下次见。
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '读完本章', value: null },
                { label: '10 分钟', value: 10 },
                { label: '20 分钟', value: 20 },
                { label: '30 分钟', value: 30 },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => {
                    setSleepMinutes(opt.value)
                    // 「读完本章」：让 onEnd 自然停止（不设定时器）
                    if (opt.value === null && tts.isSpeaking) {
                      // 标记本章读完即停：复用 onEnd 监听一次
                      const off = tts.onEnd(() => {
                        off()
                        setSleepMinutes(null)
                      })
                    }
                    setSleepPanel(false)
                  }}
                  className="min-h-touch rounded-2xl px-4 py-3 text-sm font-medium"
                  style={{
                    background: sleepMinutes === opt.value ? theme_.text : theme_.panel,
                    color: sleepMinutes === opt.value ? theme_.bg : theme_.text,
                    border: `1px solid ${theme_.border}`,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {sleepMinutes !== null ? (
              <button
                type="button"
                onClick={() => {
                  setSleepMinutes(null)
                  setSleepPanel(false)
                }}
                className="mt-4 min-h-touch w-full rounded-full px-4 text-sm font-medium"
                style={{ color: theme_.text, border: `1px solid ${theme_.border}` }}
              >
                取消定时
              </button>
            ) : null}
          </Sheet>
        ) : null}
      </AnimatePresence>

      {/* ── 声音选择 ── */}
      <AnimatePresence>
        {voicePanel ? (
          <Sheet onClose={() => setVoicePanel(false)} theme_={theme_} title="选择朗读声音">
            {/* 服务端音色（docs/13 P0-C）：拟人化，优先展示 */}
            {serverReady && serverVoices.length > 0 ? (
              <div className="mb-5">
                <p className="mb-2 text-xs font-bold opacity-70" style={{ color: theme_.text }}>
                  桃桃声库 · 拟人朗读
                </p>
                <div className="flex flex-col gap-1">
                  {serverVoices.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => pickServerVoice(v.id)}
                      className="min-h-touch flex items-center gap-3 rounded-xl px-4 py-3 text-left"
                      style={{
                        background: serverVoice === v.id ? theme_.text + '18' : 'transparent',
                      }}
                    >
                      <span
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base"
                        style={{ background: '#FF8E7533' }}
                      >
                        🎙️
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium" style={{ color: theme_.text }}>
                          {v.label}
                        </span>
                        <span className="block text-xs opacity-60" style={{ color: theme_.text }}>
                          {v.description}
                        </span>
                      </span>
                      {serverVoice === v.id ? (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                          style={{ background: '#FF6D54' }}
                        >
                          在用
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {voices.length === 0 ? (
              <p className="py-6 text-center text-sm opacity-70" style={{ color: theme_.text }}>
                正在加载浏览器声音列表…
              </p>
            ) : (
              <div>
                <p className="mb-2 text-xs font-bold opacity-70" style={{ color: theme_.text }}>
                  浏览器语音
                </p>
                <div className="flex max-h-48 flex-col gap-1 overflow-y-auto">
                  {voices.map((v) => (
                    <button
                      key={v.voiceURI}
                      type="button"
                      onClick={() => pickVoice(v.voiceURI)}
                      className="min-h-touch flex items-center gap-3 rounded-xl px-4 py-3 text-left"
                      style={{
                        background: tts.config.voiceURI === v.voiceURI ? theme_.text + '18' : 'transparent',
                      }}
                    >
                      <span className="flex-1 text-sm" style={{ color: theme_.text }}>
                        {v.name}
                      </span>
                      {v.neural ? (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                          style={{ background: '#B07A2E' }}
                        >
                          自然语音
                        </span>
                      ) : (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px]"
                          style={{ background: theme_.text + '22', color: theme_.text }}
                        >
                          标准
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* 语速档位（docs/11 P0-2 / RD-5）：引擎早已支持 rate，这里补上 UI */}
            <div className="mt-5 border-t pt-4" style={{ borderColor: theme_.border }}>
              <p className="mb-2 text-sm opacity-70" style={{ color: theme_.text }}>
                朗读语速
              </p>
              <div className="flex gap-2">
                {RATE_STEPS.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => pickRate(r.value)}
                    aria-pressed={serverSpeed === r.value || tts.config.rate === r.value}
                    className="flex min-h-touch flex-1 items-center justify-center rounded-full text-sm font-medium"
                    style={{
                      background: serverSpeed === r.value || tts.config.rate === r.value ? theme_.text : 'transparent',
                      color: serverSpeed === r.value || tts.config.rate === r.value ? theme_.bg : theme_.text,
                      border: `1px solid ${serverSpeed === r.value || tts.config.rate === r.value ? theme_.text : theme_.border}`,
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed opacity-60" style={{ color: theme_.text }}>
                {serverReady
                  ? '「桃桃声库」是服务器合成的拟人朗读，发音自然、可以锁屏继续听。下面是浏览器自带的语音，不需要网络也能用。'
                  : '带「自然语音」标记的是云端神经网络语音，发音更像真人。推荐使用 Chrome 或 Edge 浏览器获得最佳效果。'}
              </p>
            </div>
          </Sheet>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function Sheet({
  title,
  children,
  onClose,
  theme_,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
  theme_: (typeof THEMES)[Theme]
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-3xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        style={{ background: theme_.panel, border: `1px solid ${theme_.border}` }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold" style={{ color: theme_.text }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            // 触达红线 ≥64px（docs/11 P0-4）：36px 的叉号对孩子手指太小
            className="flex h-16 w-16 items-center justify-center rounded-full text-xl"
            style={{ color: theme_.text }}
            aria-label="关闭"
          >
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </>
  )
}
