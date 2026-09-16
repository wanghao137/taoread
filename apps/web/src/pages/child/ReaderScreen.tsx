import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { api, ApiError, type ContentChapterDto } from '../../lib/api'
import { tts, listVoices, type TtsVoiceInfo, type TtsProgress } from '../../lib/tts'
import { SceneArt } from '../../components/art/SceneArt'
import { useSession } from '../../stores/session'

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

type Theme = 'paper' | 'night' | 'sepia'

const THEMES: Record<Theme, { bg: string; text: string; panel: string; border: string; artFrom: string; artTo: string }> = {
  paper: { bg: '#FFFDF8', text: '#3E3A33', panel: '#FFFFFF', border: '#E8E0D0', artFrom: '#FFF3E0', artTo: '#FFE0B2' },
  sepia: { bg: '#F5EEDC', text: '#4E3B28', panel: '#FAF4E6', border: '#E3D5BB', artFrom: '#FFE0B2', artTo: '#D7CCC8' },
  night: { bg: '#141B33', text: '#E8EAF6', panel: '#1E2748', border: '#32406B', artFrom: '#1E2A5A', artTo: '#3949AB' },
}

const FONT_SIZES = [18, 20, 22, 24, 26, 28]

export function ReaderScreen(props: ReaderProps) {
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const role = useSession((s) => s.role)

  const [chapter, setChapter] = useState<ContentChapterDto | null>(null)
  const [titles, setTitles] = useState<Array<{ order: number; title: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState(props.startChapter)
  const [theme, setTheme] = useState<Theme>('paper')
  const [fontIdx, setFontIdx] = useState(2)
  const [showSettings, setShowSettings] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [highlight, setHighlight] = useState<TtsProgress | null>(null)
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
  const [scaffoldOpen, setScaffoldOpen] = useState(false)
  const [scaffoldLoading, setScaffoldLoading] = useState(false)

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

  // 退出时停止朗读
  useEffect(() => {
    return () => {
      if (tts.isSpeaking) tts.stop()
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
        tts.stop()
        setSpeaking(false)
        setHighlight(null)
        setSleepMinutes(null)
        setSleepPanel(false)
        setTtsError('时间到啦，今晚的故事先到这里，晚安 🌙')
      } else {
        setSleepLeft(sleepLeftRef.current)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [sleepMinutes])

  /** B1：家长打开「今晚怎么讲」——按当前章节取脚手架，只在家长角色下可用 */
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

  /** 朗读当前章节：拼接所有文本块 */
  const speakChapter = useCallback(() => {
    if (!chapter) return
    setTtsError(null)
    if (speaking) {
      stopTts()
      return
    }
    const text = chapter.blocks
      .filter((b) => b.kind === 'text' || b.kind === 'poem')
      .map((b) => b.text)
      .join('\n')
    const started = tts.speak(text, { lang: props.lang })
    if (started) setSpeaking(true)
  }, [chapter, speaking, props.lang, stopTts])

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

  const isLastChapter = order >= props.totalChapters

  const goPrev = useCallback(() => {
    if (order > 1) void loadChapter(order - 1)
  }, [order, loadChapter])
  const goNext = useCallback(() => {
    if (!isLastChapter) void loadChapter(order + 1)
  }, [isLastChapter, order, loadChapter])

  const finish = useCallback(() => {
    if (speaking) stopTts()
    if (childId && token) {
      void api
        .reportContentProgress(props.contentId, childId, { chapterOrder: props.totalChapters, blockOrder: 0 }, token)
        .catch(() => {})
    }
    props.onExit(true)
  }, [speaking, stopTts, childId, token, props])

  const blocks = chapter?.blocks ?? []
  const speakingBlockId = useMemo(() => {
    if (!highlight || !chapter) return null
    const hit = chapter.blocks.find((b) => b.text.includes(highlight.text.slice(0, 12)))
    return hit?.id ?? null
  }, [highlight, chapter])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: theme_.bg }}>
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
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
        <p style={{ color: theme_.text }} className="text-lg">
          {error}
        </p>
        <button
          type="button"
          onClick={() => props.onExit(false)}
          className="min-h-touch rounded-full px-6 text-base font-medium"
          style={{ background: theme_.text, color: theme_.bg }}
        >
          回到书架
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: theme_.bg }}>
      {/* ── 顶栏（z-20 盖住底部栏的渐变蒙层，避免返回按钮被遮挡） ── */}
      <header
        className="relative z-20 flex items-center gap-3 px-4 py-3"
        style={{ background: theme_.panel, borderBottom: `1px solid ${theme_.border}` }}
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
            aria-label="今晚怎么讲"
          >
            {scaffoldLoading ? '…' : '讲什么'}
          </button>
        ) : null}
      </header>

      {/* ── 正文 ── */}
      <main
        className="flex-1 overflow-y-auto px-6 pb-40 pt-6"
        style={{ scrollPaddingTop: 80 }}
      >
        <div className="mx-auto max-w-2xl">
          {/* 章节题图 */}
          {chapter?.art && (
            <div className="mb-6 overflow-hidden rounded-3xl shadow-lg" style={{ aspectRatio: '16 / 9' }}>
              <SceneArt
                scene={chapter.art}
                from={theme === 'night' ? theme_.artFrom : props.coverFrom}
                to={theme === 'night' ? theme_.artTo : props.coverTo}
                lang={props.lang}
              />
            </div>
          )}
          <h2
            className="mb-6 text-center text-2xl font-bold"
            style={{ color: theme_.text, fontFamily: props.lang === 'zh' ? 'serif' : 'inherit' }}
          >
            {chapter?.title}
          </h2>
          {blocks.map((b) => {
            const isSpeaking = speakingBlockId === b.id
            if (b.kind === 'image') {
              return (
                <figure key={b.id} className="my-6">
                  <div className="overflow-hidden rounded-3xl shadow-lg" style={{ aspectRatio: '16 / 9' }}>
                    <SceneArt
                      scene={b.art ?? chapter?.art ?? 'bookshelf'}
                      from={theme === 'night' ? theme_.artFrom : props.coverFrom}
                      to={theme === 'night' ? theme_.artTo : props.coverTo}
                      lang={props.lang}
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
              return (
                <div
                  key={b.id}
                  ref={(el) => blockRefs.current.set(b.id, el)}
                  className="my-5 flex gap-3 rounded-2xl p-4"
                  style={{ background: theme === 'night' ? '#22304F' : '#FFF8E7', border: `1px solid ${theme_.border}` }}
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl">
                    <SceneArt scene={b.art ?? 'lamp-hint'} from={theme_.artFrom} to={theme_.artTo} lang={props.lang} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: theme_.text }}>
                    {b.text}
                  </p>
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
                    background: theme === 'night' ? '#1B2544' : '#FFFDF6',
                    border: `1px solid ${theme_.border}`,
                    transition: 'box-shadow 0.3s',
                    boxShadow: isSpeaking ? `0 0 0 2px ${theme_.text}55` : 'none',
                  }}
                >
                  <p
                    className="whitespace-pre-line text-lg leading-loose"
                    style={{ color: theme_.text, fontFamily: 'serif', fontSize: fontSize * 0.95 }}
                  >
                    {b.text}
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
                  fontFamily: props.lang === 'zh' ? 'serif' : 'inherit',
                  transition: 'box-shadow 0.3s',
                  borderRadius: 12,
                  boxShadow: isSpeaking ? `0 0 0 2px ${theme_.text}44` : 'none',
                }}
              >
                {b.text}
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
                className="min-h-touch rounded-full bg-peach-gradient px-6 text-sm font-bold text-white shadow-lg"
              >
                读完啦 🍑
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="min-h-touch rounded-full bg-peach-gradient px-6 text-sm font-bold text-white shadow-lg"
              >
                下一章 →
              </button>
            )}
          </nav>
        </div>
      </main>

      {/* ── 底部朗读栏 ── */}
      <footer
        className="absolute inset-x-0 bottom-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2"
        style={{
          background: `linear-gradient(180deg, ${theme_.bg}00 0%, ${theme_.bg}cc 30%, ${theme_.bg} 100%)`,
        }}
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
            style={{ background: speaking ? '#7E57C2' : 'linear-gradient(135deg, #FF8E75 0%, #FF6D54 100%)' }}
            aria-label={speaking ? '停止朗读' : '朗读本章'}
          >
            {speaking ? '⏸' : '🔊'}
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
                <span className="opacity-60">{tts.isSupported ? '点击选择声音' : '当前浏览器不支持朗读'}</span>
              </button>
            )}
          </div>
          {tts.isSupported ? (
            <button
              type="button"
              onClick={() => setVoicePanel(true)}
              className="min-h-touch rounded-full px-3 text-xs"
              style={{ color: theme_.text, border: `1px solid ${theme_.border}` }}
            >
              {voices.find((v) => v.voiceURI === tts.config.voiceURI)?.name?.split(' ').slice(0, 2).join(' ') ?? '声音'}
            </button>
          ) : null}
          {tts.isSupported ? (
            <button
              type="button"
              onClick={() => setSleepPanel(true)}
              className="flex min-h-touch flex-shrink-0 items-center rounded-full px-3 text-xs font-medium"
              style={{
                color: sleepMinutes !== null ? '#FFFFFF' : theme_.text,
                background: sleepMinutes !== null ? '#5C6BC0' : 'transparent',
                border: `1px solid ${sleepMinutes !== null ? '#5C6BC0' : theme_.border}`,
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
                    {t === 'paper' ? '纸白' : t === 'sepia' ? '护眼' : '夜空'}
                  </span>
                  <span className="text-[10px] opacity-60" style={{ color: THEMES[t].text }}>
                    abc 桃
                  </span>
                </button>
              ))}
            </div>
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
          <Sheet onClose={() => setScaffoldOpen(false)} theme_={theme_} title="今晚怎么讲">
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
              朗读到时间会轻轻停下，不说「该睡觉了」，只留一句晚安。
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
            {voices.length === 0 ? (
              <p className="py-6 text-center text-sm opacity-70" style={{ color: theme_.text }}>
                正在加载浏览器声音列表…
              </p>
            ) : (
              <div className="flex max-h-64 flex-col gap-1 overflow-y-auto">
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
                        style={{ background: '#7C4DFF' }}
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
            )}
            <p className="mt-3 text-xs leading-relaxed opacity-60" style={{ color: theme_.text }}>
              带「自然语音」标记的是云端神经网络语音，发音更像真人。推荐使用 Chrome 或 Edge 浏览器获得最佳效果。
            </p>
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
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
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
