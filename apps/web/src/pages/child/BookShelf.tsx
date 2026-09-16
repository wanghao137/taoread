import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api, ApiError, type ContentBookDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { SceneArt } from '../../components/art/SceneArt'

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

  const load = useCallback(() => {
    if (!token) return
    setLoading(true)
    setError(null)
    api
      .contentBooks(token, { ...(stage ? { stage } : {}), ...(childId ? { childId } : {}) })
      .then((res) => setBooks(res.books))
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : '书架还在梳洗打扮…')
      })
      .finally(() => setLoading(false))
  }, [token, stage, childId])

  useEffect(() => {
    load()
  }, [load])

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

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="text-5xl"
        >
          🍑
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
          onClick={load}
          className="min-h-touch rounded-full bg-peach-gradient px-6 text-sm font-bold text-white"
        >
          再试一次
        </button>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="text-5xl">📚</div>
        <p className="text-base text-ink-primary">书架还是空的</p>
        <p className="max-w-xs text-sm text-ink-secondary">
          桃树上的书还在长呢。让爸爸妈妈先在设置里检查一下应用版本哦。
        </p>
        <button
          type="button"
          onClick={onBack}
          className="min-h-touch rounded-full border border-night-border px-6 text-sm text-ink-secondary"
        >
          回到月亮
        </button>
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
          const continuing = book.progress > 0 && !book.finished
          return (
            <motion.button
              key={book.id}
              type="button"
              onClick={() => onOpen(book)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.35 }}
              whileTap={{ scale: 0.96 }}
              className="group flex flex-col gap-2 text-left"
              aria-label={`打开《${book.title}》`}
            >
              {/* 封面 */}
              <div
                className="relative aspect-[3 / 4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 transition-shadow group-hover:shadow-2xl"
              >
                <SceneArt
                  scene={book.coverArt}
                  from={book.coverFrom}
                  to={book.coverTo}
                  lang={book.lang}
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
                  {continuing ? '🔖 ' : ''}
                  {book.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink-secondary">
                  {book.author ?? book.lang === 'en' ? book.author ?? 'English' : ''}
                </p>
                <p className="text-[10px] text-ink-secondary opacity-70">
                  {book.chapterCount} 章 · 约 {book.words} {book.lang === 'zh' ? '字' : '词'}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
