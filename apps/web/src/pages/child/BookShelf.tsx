import { useCallback, useEffect, useRef, useState } from 'react'
import { IconMoon, IconBook, IconHeart, IconSparkle, IconPlay, IconPause } from '../../components/ui/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { MOTION, useReducedMotion, reducedAware } from '../../lib/motion'
import { api, ApiError, type ContentBookDto, type WordCardDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { SceneArt, TaoMascot } from '../../components/art/SceneArt'
import { BookCover } from '../../components/art/BookCover'
import { audioPlayer } from '../../lib/audioPlayer'
import { tts } from '../../lib/tts'
import { previewText } from '../../lib/preview'
// docs/17 P0-2：readingTime 的时长估算只给家长看（Common Sense Media 点名
// Epic 的预计阅读时长给慢读者压力），孩子端书架不展示分钟数

interface BookShelfProps {
  onOpen: (book: ContentBookDto) => void
  onBack: () => void
}

const CATEGORY_META: Record<string, { label: string; icon: (p: { size?: number }) => JSX.Element }> = {
  poetry: { label: '古诗', icon: IconMoon },
  primer: { label: '蒙学', icon: IconBook },
  story: { label: '故事', icon: IconHeart },
  tale: { label: '童话', icon: IconSparkle },
}

type Filter = 'all' | 'zh' | 'en' | 'poetry' | 'story'

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'zh', label: '中文' },
  { key: 'en', label: 'English' },
  { key: 'poetry', label: '古诗' },
  { key: 'story', label: '故事' },
]

export function BookShelf({ onOpen, onBack }: BookShelfProps) {
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const stage = useSession((s) => s.childStage)
  const reduced = useReducedMotion()

  const [books, setBooks] = useState<ContentBookDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  /** 正在试听的书 id（docs/13 P0-4：书架卡片「试听一下」） */
  const [previewing, setPreviewing] = useState<string | null>(null)
  const previewTextCache = useRef<Map<string, string>>(new Map())
  /** 生词本（docs/15 P1-B） */
  const [wordbookOpen, setWordbookOpen] = useState(false)
  const [wordCards, setWordCards] = useState<WordCardDto[]>([])
  const [wordCount, setWordCount] = useState(0)

  const stopPreview = useCallback(() => {
    audioPlayer.stop()
    tts.stop()
    setPreviewing(null)
  }, [])

  // 服务端朗读结束 → 试听态自动复位；离开书架时停掉试听
  useEffect(() => audioPlayer.onEnd(() => setPreviewing(null)), [])
  useEffect(() => () => stopPreview(), [stopPreview])

  const togglePreview = useCallback(
    async (book: ContentBookDto) => {
      if (previewing === book.id) {
        stopPreview()
        return
      }
      audioPlayer.stop()
      tts.stop()
      if (!token) return
      let text = previewTextCache.current.get(book.id)
      if (!text) {
        try {
          const res = await api.contentChapter(book.id, 1, token)
          const raw = res.chapter.blocks
            .filter((b) => b.kind === 'text' || b.kind === 'poem')
            .map((b) => b.text)
            .join('\n')
          text = previewText(raw)
          if (text) previewTextCache.current.set(book.id, text)
        } catch {
          return
        }
      }
      if (!text) return
      const lang: 'zh' | 'en' = book.lang === 'en' ? 'en' : 'zh'
      setPreviewing(book.id)
      const ok = await audioPlayer.speak(text, { lang })
      if (!ok) {
        // 服务端 TTS 不可用时静默回退 Web Speech（与阅读器同一套降级口径）
        if (tts.speak(text, { lang })) setPreviewing(book.id)
        else setPreviewing(null)
      }
    },
    [previewing, token, stopPreview],
  )

  const load = useCallback(
    (q: string) => {
      if (!token) return
      setLoading(true)
      setError(null)
      api
        .contentBooks(token, {
          ...(stage ? { stage } : {}),
          ...(childId ? { childId } : {}),
          ...(q.trim() ? { q } : {}),
        })
        .then((res) => setBooks(res.books))
        .catch((err: unknown) => {
          setError(err instanceof ApiError ? err.message : '书架还在梳洗打扮…')
        })
        .finally(() => setLoading(false))
    },
    [token, stage, childId],
  )

  // 搜索：输入词后防抖 300ms 走服务端 q；清空时立即拉回全量（docs/11 P0-1）
  useEffect(() => {
    const trimmed = query.trim()
    const timer = setTimeout(() => load(trimmed), trimmed ? 300 : 0)
    return () => clearTimeout(timer)
  }, [query, load])

  const visible = books.filter((b) => {
    if (filter === 'all') return true
    if (filter === 'zh' || filter === 'en') return b.lang === filter
    return b.category === filter
  })

  // 收藏的孩子亲手点过，排有进度的书之后、其余书之前（docs/15 P1-A）
  const sorted = [...visible].sort((a, b) => {
    const pa = a.progress > 0 && !a.finished ? 2 : 0
    const pb = b.progress > 0 && !b.finished ? 2 : 0
    if (pb !== pa) return pb - pa
    return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0)
  })

  // 换筛选或换搜索词 = 换了一份列表，回到第一页
  useEffect(() => {
  }, [filter, query])

  /** 分页只切渲染列表：排序、筛选、搜索的口径都在 sorted 里，不动 */
  const shown = sorted

  /** 生词本角标计数：只取数量，轻量（docs/15 P1-B） */
  const refreshWordCount = useCallback(() => {
    if (!token || !childId) return
    api
      .listWords(childId, token)
      .then((res) => setWordCount(res.total))
      .catch(() => {})
  }, [token, childId])

  useEffect(() => {
    refreshWordCount()
  }, [refreshWordCount])

  const openWordbook = useCallback(async () => {
    if (!token || !childId) return
    setWordbookOpen(true)
    try {
      const res = await api.listWords(childId, token)
      setWordCards(res.cards)
      setWordCount(res.total)
    } catch {
      setWordCards([])
    }
  }, [token, childId])

  const removeWordCard = useCallback(
    async (wordId: string) => {
      if (!token || !childId) return
      setWordCards((prev) => prev.filter((c) => c.id !== wordId))
      setWordCount((n) => Math.max(0, n - 1))
      try {
        await api.removeWord(wordId, childId, token)
      } catch {
        // 删失败不恢复列表：下次打开会重新拉真实状态
      }
    },
    [token, childId],
  )

  const toggleFavorite = useCallback(
    async (book: ContentBookDto) => {
      if (!token || !childId) return
      // 乐观更新：界面立刻响应，失败时回滚
      setBooks((prev) => prev.map((b) => (b.id === book.id ? { ...b, favorite: !b.favorite } : b)))
      try {
        await api.setFavorite(book.id, childId, !book.favorite, token)
      } catch {
        setBooks((prev) => prev.map((b) => (b.id === book.id ? { ...b, favorite: book.favorite } : b)))
      }
    },
    [token, childId],
  )

  // 大卡片用的那一本：进度最高且未读完（进度相同时取字数少的，孩子更快看到「读完」）
  const continueBook = sorted
    .filter((b) => b.progress > 0 && !b.finished)
    .sort((a, b) => b.progress - a.progress || a.words - b.words)[0]

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
        <motion.div
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={MOTION.float.transition}
        >
          <TaoMascot mood="happy" className="h-14 w-14" />
        </motion.div>
        <p className="text-sm text-ink-700">小桃正在搬书…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <p className="text-base text-ink-900">{error}</p>
        <button
          type="button"
          onClick={() => load(query.trim())}
          className="min-h-touch rounded-full bg-terra px-6 text-sm font-bold text-white"
        >
          再试一次
        </button>
      </div>
    )
  }

  if (books.length === 0) {
    const searching = query.trim().length > 0
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="relative h-40 w-40 overflow-hidden rounded-3xl shadow-lg ring-1 ring-paper-border">
          <SceneArt scene={searching ? 'lamp-hint' : 'empty-sprout'} from="#3A2814" to="#8A5A28" lang="zh" />
        </div>
        <TaoMascot mood={searching ? 'hint' : 'sleepy'} className="h-12 w-12" />
        <p className="text-base text-ink-900">{searching ? '小桃没找到这本书' : '书架还是空的'}</p>
        <p className="max-w-xs text-sm text-ink-700">
          {searching ? '换个词试试？比如下面这两个' : '桃树上的书还在长呢。让爸爸妈妈先在设置里检查一下应用版本哦。'}
        </p>
        {searching ? (
          // docs/17 P1-5：示例词做成可点 chip 而非行内小字按钮——
          // 行内文字按钮的热区只有字高，3-6 岁手指点不准（Soni 2019 TIDRC：App 普遍触控热区不足）
          <div className="flex gap-3">
            {['静夜', 'Peter'].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setQuery(w)}
                className="min-h-touch rounded-full border border-terra-300 px-6 text-sm font-bold text-terra-600"
              >
                {w}
              </button>
            ))}
          </div>
        ) : null}
        {searching ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="min-h-touch rounded-full bg-terra px-6 text-sm font-bold text-white"
          >
            清空搜索
          </button>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="min-h-touch rounded-full border-2 border-ink bg-paper-200 px-6 text-sm text-ink-700 shadow-card"
          >
            回到首页
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* 顶部：标题 + 返回（docs/22：亮色氛围头图区，赤陶柔光渐变） */}
      <div className="relative overflow-hidden rounded-3xl border border-paper-border bg-paper-200/60 p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(120deg, rgba(251,241,235,0.9) 0%, rgba(235,207,168,0.35) 55%, rgba(246,226,214,0.8) 100%)' }}
        />
        {/* 装饰层（docs/22）：赤陶柔光 + 星点，绝对定位不挡内容（纯静态无动效） */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute right-6 top-3 h-16 w-16 rounded-full bg-terra-50 blur-2xl" />
          <div className="absolute right-20 top-12 h-2 w-2 rounded-full bg-kraft-400/70" />
          <div className="absolute right-32 top-5 h-1.5 w-1.5 rounded-full bg-kraft-400/60" />
          <div className="absolute right-10 top-20 h-1.5 w-1.5 rounded-full bg-terra-300/60" />
        </div>
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex min-h-touch items-center gap-1 rounded-full border-2 border-ink bg-paper-200 px-4 text-sm text-ink-700 shadow-card"
          >
            ← 首页
          </button>
          <h2 className="flex-1 text-xl font-bold text-ink-900">桃书架</h2>
          {/* 生词本（docs/15 P1-B）：孩子收下的词，随时翻开复习 */}
          <button
            type="button"
            onClick={() => void openWordbook()}
            className="flex min-h-touch items-center gap-1.5 rounded-full border border-paper-border bg-paper-300/60 px-4 text-sm text-ink-700"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />
              <path d="M8 7h7M8 11h7M8 15h4" />
            </svg>
            生词本
            {wordCount > 0 ? (
              <span className="rounded-full bg-terra px-1.5 text-[10px] font-bold text-white">{wordCount}</span>
            ) : null}
          </button>
          <span className="rounded-full bg-terra px-3 py-1 text-xs font-bold text-white">
            {sorted.length} 本
          </span>
        </div>
      </div>

      {/* 搜索框（docs/11 P0-1：孩子找书不靠翻分类） */}
      <div className="relative mt-4">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 L21 21" />
        </svg>
        <label htmlFor="shelf-search" className="sr-only">
          搜索书名或作者
        </label>
        <input
          id="shelf-search"
          type="search"
          inputMode="search"
          enterKeyHint="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="找一本书…"
          className="min-h-touch w-full rounded-full border border-paper-border bg-paper-300 pl-11 pr-10 text-sm text-ink-900 placeholder:text-ink-700/70 focus:border-terra-500 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="清空搜索"
            className="absolute right-2 top-1/2 flex min-h-touch w-10 -translate-y-1/2 items-center justify-center text-base text-ink-700"
          >
            ✕
          </button>
        ) : null}
      </div>

      {/* 「继续读」大卡片（docs/13 P1-3）：首屏最大的入口，只在没有搜索/筛选时出现 */}
      {!query.trim() && filter === 'all' && continueBook ? (
        <motion.button
          type="button"
          onClick={() => onOpen(continueBook)}
          {...(reduced ? {} : MOTION.tap)}
          aria-label={`接着读《${continueBook.title}》`}
          className="mt-4 flex min-h-touch items-center gap-4 rounded-3xl p-4 text-left shadow-lg ring-1 ring-paper-border"
          style={{ background: 'linear-gradient(135deg, #4A3418 0%, #5C4322 100%)' }}
        >
          <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-paper-border">
            <BookCover
              urlPath={continueBook.coverArtUrl}
              scene={continueBook.coverArt}
              from={continueBook.coverFrom}
              to={continueBook.coverTo}
              lang={continueBook.lang}
              alt={`《${continueBook.title}》封面`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-terra-600">接着读</p>
            <p className="mt-0.5 truncate text-base font-bold text-ink-900">{continueBook.title}</p>
            <p className="mt-1 text-xs text-ink-700">
              已读 {continueBook.progress}% · 剩 {continueBook.chapterCount - Math.max(1, Math.round(continueBook.chapterCount * continueBook.progress / 100))} 章
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-100/50">
              <div
                className="h-full rounded-full bg-terra"
                style={{ width: `${continueBook.progress}%` }}
              />
            </div>
          </div>
          <span className="flex-shrink-0 text-terra-600" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </span>
        </motion.button>
      ) : null}

      {/* 筛选条 */}
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className="min-h-touch flex-shrink-0 rounded-full px-4 text-sm font-medium transition-colors"
            style={{
              background: filter === f.key ? 'linear-gradient(135deg, #FF8E75 0%, #FF6D54 100%)' : 'transparent',
              color: filter === f.key ? '#FFFFFF' : '#CBB9A3',
              border: filter === f.key ? 'none' : '1px solid #D6D1C2',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 书籍网格：全量渲染（e2e 与「架子完整性」契约），封面 lazy 按需加载 */}
      <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3">
        {shown.map((book, i) => {
          const meta = CATEGORY_META[book.category] ?? { label: book.category, icon: IconBook }
          return (
            <motion.div
              key={book.id}
              {...reducedAware(
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: Math.min(i * 0.05, 0.4), duration: 0.28, ease: [0.22, 0.61, 0.36, 1] },
                },
                reduced,
              )}
              className="group relative flex flex-col gap-2 text-left"
            >
              <motion.button
                type="button"
                onClick={() => onOpen(book)}
                {...(reduced ? {} : MOTION.tap)}
                className="flex flex-1 cursor-pointer flex-col gap-2 text-left"
                aria-label={`打开《${book.title}》`}
              >
              {/* 封面 */}
              <div
                className="relative aspect-[3 / 4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-paper-border transition-shadow group-hover:shadow-2xl"
              >
                <BookCover
                  urlPath={book.coverArtUrl}
                  scene={book.coverArt}
                  from={book.coverFrom}
                  to={book.coverTo}
                  lang={book.lang}
                  alt={`《${book.title}》封面`}
                />
                {/* 分类角标 */}
                <span className="absolute left-2 top-2 rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  <meta.icon size={14} /> {meta.label}
                </span>
                {/* 进度条 */}
                {book.progress > 0 ? (
                  <div className="absolute inset-x-2 bottom-2">
                    <div className="h-1.5 overflow-hidden rounded-full bg-black/30">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${book.progress}%`,
                          background: book.finished ? '#A5D6A7' : '#FFE9B8',
                        }}
                      />
                    </div>
                    <p className="mt-1 text-[10px] font-medium text-white drop-shadow">
                      {book.finished ? '读完啦' : `读到 ${book.progress}%`}
                    </p>
                  </div>
                ) : null}
              </div>
              {/* 标题（pr-14 给右侧试听圆钮留出独立列，文字与按钮并排不重叠；
                  flex-1 让文字块撑到卡片底，圆钮钉底部时永远落在预留列里） */}
              <div className="flex-1 pl-1 pr-14">
                <p className="line-clamp-2 text-sm font-bold leading-tight text-ink-900">
                  {book.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink-700">
                  {book.author ?? (book.lang === 'en' ? 'English' : '佚名')}
                </p>
                <p className="text-[10px] text-ink-700 opacity-70">
                  {/* docs/17 P0-2：不向孩子展示「约 N 分钟读完」——Common Sense Media 明确点名
                      Epic 的预计阅读时长给慢读者压力。孩子只需要知道「有几章」。 */}
                  {book.progress > 0
                    ? `${book.chapterCount} 章`
                    : `${book.chapterCount} 小节`}
                </p>
              </div>
              </motion.button>

              {/* 试听一下（docs/13 P0-4）：不识字孩子的发现入口——按一下就响。
                  222 本验收（2026-09）：原 64px 长条压住标题/作者行，改为独立圆形钮
                  （h-12 w-12 = 48px，≥44px 触达下限），钉在卡片底部右侧预留列，
                  与文字水平错开，不再重叠。 */}
              <button
                type="button"
                onClick={() => void togglePreview(book)}
                disabled={previewing !== null && previewing !== book.id}
                aria-label={previewing === book.id ? `停止试听《${book.title}》` : `试听《${book.title}》`}
                className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/90 text-paper-100 shadow-card backdrop-blur-sm transition-transform active:scale-90 disabled:opacity-30"
              >
                {previewing === book.id ? <IconPause size={18} /> : <IconPlay size={18} />}
              </button>

              {/* 收藏（docs/15 P1-A）：右上角小心，按一下就记住「我喜欢这本」。
                  222 本验收（2026-09）：64px 大圆盘压封面太重，缩到 h-11 w-11（44px
                  触达下限），仍在封面右上角，不碰标题/作者行。 */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  void toggleFavorite(book)
                }}
                aria-label={book.favorite ? `取消收藏《${book.title}》` : `收藏《${book.title}》`}
                aria-pressed={book.favorite}
                className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 backdrop-blur-sm transition-transform active:scale-90"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill={book.favorite ? '#FF8E75' : 'none'}
                  stroke={book.favorite ? '#FF8E75' : '#FFFFFF'}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
                </svg>
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* 生词本抽屉（docs/15 P1-B）：孩子收下的词，点喇叭能听、点叉能删 */}
      <AnimatePresence>
        {wordbookOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setWordbookOpen(false)}
              className="fixed inset-0 z-50 bg-black/40"
            />
            <motion.div
              {...(reduced ? {} : MOTION.sheetIn)}
              role="dialog"
              aria-label="生词本"
              className="fixed inset-x-0 bottom-0 z-50 max-h-[72vh] overflow-y-auto rounded-t-3xl bg-paper-200 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] ring-1 ring-paper-border"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-ink-900">
                  生词本 <span className="text-xs font-normal text-ink-700">{wordCards.length} 个词</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setWordbookOpen(false)}
                  aria-label="关闭生词本"
                  className="flex h-16 w-16 items-center justify-center rounded-full text-xl text-ink-700"
                >
                  ✕
                </button>
              </div>
              {wordCards.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <TaoMascot mood="hint" className="h-14 w-14" />
                  <p className="text-sm text-ink-700">
                    还没收下词呢。读书时看到「☆ 收下这个词」，按一下就会来到这里。
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {wordCards.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center gap-3 rounded-2xl bg-paper-300 p-3 ring-1 ring-paper-border"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          audioPlayer.stop()
                          tts.stop()
                          const lang = c.lang === 'en' ? 'en' : 'zh'
                          if (!audioPlayer.speak(c.word, { lang })) tts.speak(c.word, { lang })
                        }}
                        aria-label={`听 ${c.word} 的发音`}
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-terra text-white"
                      >
                        <IconPlay size={18} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-ink-900">
                          {c.word}
                          <span className="ml-2 text-[10px] font-normal text-ink-700">
                            {c.lang === 'en' ? 'English' : '中文'}
                          </span>
                        </p>
                        {c.context ? (
                          <p className="mt-0.5 truncate text-xs text-ink-700">来自：{c.context}</p>
                        ) : null}
                        {c.bookTitle ? (
                          <p className="truncate text-[10px] text-ink-700 opacity-70">《{c.bookTitle}》</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => void removeWordCard(c.id)}
                        aria-label={`删除 ${c.word}`}
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base text-ink-700"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
