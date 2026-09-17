import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { api, ApiError, type ContentBookDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { SceneArt, TaoMascot } from '../../components/art/SceneArt'
import { BookCover } from '../../components/art/BookCover'
import { audioPlayer } from '../../lib/audioPlayer'
import { tts } from '../../lib/tts'
import { previewText } from '../../lib/preview'
import { remainingMinutes, minutesLabel } from '../../lib/readingTime'

interface BookShelfProps {
  onOpen: (book: ContentBookDto) => void
  onBack: () => void
}

const CATEGORY_META: Record<string, { label: string; emoji: string }> = {
  poetry: { label: '古诗', emoji: '🌙' },
  primer: { label: '蒙学', emoji: '📜' },
  story: { label: '故事', emoji: '🍑' },
  tale: { label: '童话', emoji: '✨' },
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

  const [books, setBooks] = useState<ContentBookDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  /** 正在试听的书 id（docs/13 P0-4：书架卡片「试听一下」） */
  const [previewing, setPreviewing] = useState<string | null>(null)
  const previewTextCache = useRef<Map<string, string>>(new Map())

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

  // 继续读：有进度且未读完的排最前
  const sorted = [...visible].sort((a, b) => {
    const pa = a.progress > 0 && !a.finished ? 1 : 0
    const pb = b.progress > 0 && !b.finished ? 1 : 0
    return pb - pa
  })

  // 大卡片用的那一本：进度最高且未读完（进度相同时取字数少的，孩子更快看到「读完」）
  const continueBook = sorted
    .filter((b) => b.progress > 0 && !b.finished)
    .sort((a, b) => b.progress - a.progress || a.words - b.words)[0]

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        >
          <TaoMascot mood="happy" className="h-14 w-14" />
        </motion.div>
        <p className="text-sm text-ink-secondary">小桃正在搬书…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <p className="text-base text-ink-primary">{error}</p>
        <button
          type="button"
          onClick={() => load(query.trim())}
          className="min-h-touch rounded-full bg-peach-gradient px-6 text-sm font-bold text-white"
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
        <div className="relative h-40 w-40 overflow-hidden rounded-3xl shadow-lg ring-1 ring-white/10">
          <SceneArt scene={searching ? 'lamp-hint' : 'empty-sprout'} from="#1E2A5A" to="#4A5FBF" lang="zh" />
        </div>
        <TaoMascot mood={searching ? 'hint' : 'sleepy'} className="h-12 w-12" />
        <p className="text-base text-ink-primary">{searching ? '小桃没找到这本书' : '书架还是空的'}</p>
        <p className="max-w-xs text-sm text-ink-secondary">
          {searching ? (
            <>
              换个词试试？比如「<button type="button" onClick={() => setQuery('静夜')} className="font-bold text-peach-300 underline-offset-2 hover:underline">静夜</button>」或者「<button type="button" onClick={() => setQuery('Peter')} className="font-bold text-peach-300 underline-offset-2 hover:underline">Peter</button>」
            </>
          ) : (
            '桃树上的书还在长呢。让爸爸妈妈先在设置里检查一下应用版本哦。'
          )}
        </p>
        {searching ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="min-h-touch rounded-full bg-peach-gradient px-6 text-sm font-bold text-white"
          >
            清空搜索
          </button>
        ) : (
          <button
            type="button"
            onClick={onBack}
            className="min-h-touch rounded-full border border-night-border px-6 text-sm text-ink-secondary"
          >
            回到月亮
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* 顶部：标题 + 返回 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-touch rounded-full border border-night-border px-4 text-sm text-ink-secondary"
        >
          ← 月亮
        </button>
        <h2 className="flex-1 text-xl font-bold text-ink-primary">桃书架</h2>
        <span className="rounded-full bg-peach-gradient px-3 py-1 text-xs font-bold text-white">
          {sorted.length} 本
        </span>
      </div>

      {/* 搜索框（docs/11 P0-1：孩子找书不靠翻分类） */}
      <div className="relative mt-4">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-secondary"
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
          className="min-h-touch w-full rounded-full border border-night-border bg-night-700/60 pl-11 pr-10 text-sm text-ink-primary placeholder:text-ink-secondary/70 focus:border-peach-400 focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="清空搜索"
            className="absolute right-2 top-1/2 flex min-h-touch w-10 -translate-y-1/2 items-center justify-center text-base text-ink-secondary"
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
          whileTap={{ scale: 0.98 }}
          aria-label={`接着读《${continueBook.title}》`}
          className="mt-4 flex min-h-touch items-center gap-4 rounded-3xl p-4 text-left shadow-lg ring-1 ring-white/10"
          style={{ background: 'linear-gradient(135deg, #3A2A6B 0%, #4A3580 100%)' }}
        >
          <div className="h-20 w-14 flex-shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-white/15">
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
            <p className="text-xs font-medium text-peach-300">接着读</p>
            <p className="mt-0.5 truncate text-base font-bold text-ink-primary">{continueBook.title}</p>
            <p className="mt-1 text-xs text-ink-secondary">
              已读 {continueBook.progress}% · 剩 {continueBook.chapterCount - Math.max(1, Math.round(continueBook.chapterCount * continueBook.progress / 100))} 章 · {minutesLabel(remainingMinutes(continueBook))}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-night-900/50">
              <div
                className="h-full rounded-full bg-peach-gradient"
                style={{ width: `${continueBook.progress}%` }}
              />
            </div>
          </div>
          <span className="flex-shrink-0 text-peach-300" aria-hidden>
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
              color: filter === f.key ? '#FFFFFF' : '#B8C1E2',
              border: filter === f.key ? 'none' : '1px solid #2E4278',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 书籍网格 */}
      <div className="grid grid-cols-2 gap-4 pb-8 sm:grid-cols-3">
        {sorted.map((book, i) => {
          const meta = CATEGORY_META[book.category] ?? { label: book.category, emoji: '📖' }
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.35 }}
              className="group relative flex flex-col gap-2 text-left"
            >
              <motion.button
                type="button"
                onClick={() => onOpen(book)}
                whileTap={{ scale: 0.96 }}
                className="flex flex-1 cursor-pointer flex-col gap-2 text-left"
                aria-label={`打开《${book.title}》`}
              >
              {/* 封面 */}
              <div
                className="relative aspect-[3 / 4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 transition-shadow group-hover:shadow-2xl"
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
                  {meta.emoji} {meta.label}
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
                      {book.finished ? '已读完 🎉' : `读到 ${book.progress}%`}
                    </p>
                  </div>
                ) : null}
              </div>
              {/* 标题 */}
              <div className="px-1">
                <p className="line-clamp-2 text-sm font-bold leading-tight text-ink-primary">
                  {book.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink-secondary">
                  {book.author ?? (book.lang === 'en' ? 'English' : '佚名')}
                </p>
                <p className="text-[10px] text-ink-secondary opacity-70">
                  {/* 有进度的书：封面已有进度条+「读到 N%」，这里只补章数，不重复 */}
                  {/* 没进度的书：显示「几分钟读完」分区标签（P1-3） */}
                  {book.progress > 0
                    ? `${book.chapterCount} 章`
                    : `${minutesLabel(remainingMinutes(book))}读完`}
                </p>
              </div>
              </motion.button>

              {/* 试听一下（docs/13 P0-4）：不识字孩子的发现入口——按一下就响 */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  void togglePreview(book)
                }}
                disabled={previewing !== null && previewing !== book.id}
                aria-label={previewing === book.id ? `停止试听《${book.title}》` : `试听《${book.title}》`}
                className="absolute bottom-2 right-2 flex min-h-touch items-center gap-1 rounded-full bg-night-900/70 px-3 text-xs font-bold text-moon-300 backdrop-blur-sm disabled:opacity-30"
              >
                {previewing === book.id ? '■ 停止' : '▶ 试听'}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
