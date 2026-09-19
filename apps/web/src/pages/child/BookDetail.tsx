/**
 * 书籍详情页（docs/09 A2）。
 * 书架卡片点击后先到这一层，而不是直奔阅读器——补齐「这本书适合我吗」的判断信息：
 * 大封面 + 适龄标签 + 难度星级 + 简介 + 章节目录 + 试读/开始读。
 * 难度星级由 stageRank + 章节数 + 字数推导，不在内容包里硬编码（可随书库扩展自动适配）。
 */
import { useCallback, useEffect, useState } from 'react'
import { IconMoon, IconBook, IconHeart, IconSparkle } from '../../components/ui/icons'
import { motion } from 'framer-motion'
import { api, ApiError, type ContentBookDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { TaoMascot } from '../../components/art/SceneArt'
import { BookCover } from '../../components/art/BookCover'

interface BookDetailProps {
  book: ContentBookDto
  onBack: () => void
  /**
   * 开始读。startChapter=0 表示「接着读」（由父层取真实进度恢复）；
   * >0 表示从目录直接点进某一章，从该章顶部开始。
   */
  onStart: (startChapter: number) => void
  /** 试读：固定从第 1 章开始，且不恢复进度 */
  onPreview: () => void
}

const CATEGORY_META: Record<string, { label: string; icon: (p: { size?: number }) => JSX.Element }> = {
  poetry: { label: '古诗', icon: IconMoon },
  primer: { label: '蒙学', icon: IconBook },
  story: { label: '故事', icon: IconHeart },
  tale: { label: '童话', icon: IconSparkle },
}

const STAGE_LABEL: Record<string, string> = {
  '3-5': '3-5 岁',
  '6-8': '6-8 岁',
  '9-12': '9-12 岁',
}

/**
 * 难度推导（0-5 星）。判据公开可解释：
 *  - 年龄段越高，基础分越高（9-12 岁的书对小孩子更难）
 *  - 章节越多、字数越多，越难
 *  中文按字数、英文按词数，量纲不同所以分档。
 */
function difficultyStars(book: ContentBookDto): number {
  const stageBase: Record<string, number> = { '3-5': 1, '6-8': 2.5, '9-12': 4 }
  let score = stageBase[book.ageStage] ?? 2
  const units = book.words
  const perChapter = book.chapterCount > 0 ? units / book.chapterCount : units
  // 单章越长，注意力负担越重
  if (book.lang === 'zh') {
    if (perChapter > 800) score += 1
    else if (perChapter > 350) score += 0.5
  } else {
    if (perChapter > 500) score += 1
    else if (perChapter > 200) score += 0.5
  }
  if (book.chapterCount > 5) score += 0.5
  return Math.max(0.5, Math.min(5, Math.round(score * 2) / 2))
}

export function BookDetail({ book, onBack, onStart, onPreview }: BookDetailProps) {
  const token = useSession((s) => s.token)

  const [titles, setTitles] = useState<Array<{ order: number; title: string; art: string | null }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return
    setLoading(true)
    api
      .contentChapterList(book.id, token)
      .then((res) => setTitles(res.chapters))
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : '目录还藏在云朵后面')
      })
      .finally(() => setLoading(false))
  }, [token, book.id])

  /** 主按钮：交给父层决定起点（0 = 接着读，由父层取真实进度） */
  const handleStart = useCallback(() => {
    onStart(0)
  }, [onStart])

  const meta = CATEGORY_META[book.category] ?? { label: book.category, icon: IconBook }
  const stars = difficultyStars(book)
  const continuing = book.progress > 0 && !book.finished

  return (
    <div className="flex flex-1 flex-col">
      {/* 顶栏 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-touch rounded-full border border-paper-border px-4 text-sm text-ink-700"
        >
          ← 书架
        </button>
        <h2 className="flex-1 truncate text-xl font-bold text-ink-900">书籍详情</h2>
        <TaoMascot mood="hint" className="h-9 w-9 flex-shrink-0" />
      </div>

      <div className="mt-4 flex gap-4">
        {/* 大封面 */}
        <div className="relative aspect-[3 / 4] w-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-paper-border sm:w-36">
          <BookCover
            urlPath={book.coverArtUrl}
            scene={book.coverArt}
            from={book.coverFrom}
            to={book.coverTo}
            lang={book.lang}
            alt={`《${book.title}》封面`}
          />
          {book.finished ? (
            <span className="absolute right-2 top-2 rounded-full bg-green-500/85 px-2 py-0.5 text-[10px] font-bold text-white">
              已读完
            </span>
          ) : null}
        </div>

        {/* 标题信息 */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="text-lg font-bold leading-tight text-ink-900">{book.title}</h3>
          <p className="text-sm text-ink-700">{book.author ?? (book.lang === 'en' ? 'English' : '佚名')}</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-terra px-2.5 py-0.5 text-[10px] font-bold text-white">
              {STAGE_LABEL[book.ageStage] ?? book.ageStage}
            </span>
            <span className="rounded-full border border-paper-border px-2.5 py-0.5 text-[10px] text-ink-700">
              <meta.icon size={14} /> {meta.label}
            </span>
            <span className="rounded-full border border-paper-border px-2.5 py-0.5 text-[10px] text-ink-700">
              {book.lang === 'en' ? 'English' : '中文'}
            </span>
          </div>
          {/* 难度星级 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-amber-300" aria-hidden>
              {'★'.repeat(Math.floor(stars))}
              {stars % 1 !== 0 ? '⯪' : ''}
              <span className="text-ink-700/40">{'★'.repeat(5 - Math.ceil(stars))}</span>
            </span>
            <span className="text-[10px] text-ink-700 opacity-70">
              {stars.toFixed(1)} / 5 · {book.chapterCount} 章 · 约 {book.words} {book.lang === 'zh' ? '字' : '词'}
            </span>
          </div>
          {continuing ? (
            <p className="text-[11px] font-medium text-terra-600">🔖 读到 {book.progress}%，可以从这里接着读</p>
          ) : null}
        </div>
      </div>

      {/* 简介 */}
      {book.intro ? (
        <div className="mt-5 rounded-2xl border border-paper-border bg-panel/60 p-4">
          <p className="text-sm font-bold text-ink-900">这本书讲了什么</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">{book.intro}</p>
        </div>
      ) : null}

      {/* 章节目录 */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-bold text-ink-900">章节目录</p>
        {loading ? (
          <p className="py-4 text-center text-xs text-ink-700 opacity-70">目录正在翻开…</p>
        ) : error ? (
          <p className="py-4 text-center text-xs text-ink-700">{error}</p>
        ) : (
          <div className="flex flex-col gap-1">
            {titles.map((t) => (
              <button
                key={t.order}
                type="button"
                onClick={() => onStart(t.order)}
                className="flex min-h-touch items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-white/5"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-terra text-[10px] font-bold text-white">
                  {t.order}
                </span>
                <span className="flex-1 truncate text-ink-900">{t.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 底部双按钮 */}
      <div className="sticky bottom-0 mt-6 flex gap-3 bg-gradient-to-t from-paper-100 via-paper-100/95 to-transparent pb-2 pt-4">
        <button
          type="button"
          onClick={onPreview}
          className="min-h-touch flex-1 rounded-full border border-paper-border px-4 text-sm font-medium text-ink-700"
        >
          试读第一章
        </button>
        <motion.button
          type="button"
          onClick={handleStart}
          whileTap={{ scale: 0.97 }}
          className="min-h-touch flex-1 rounded-full bg-terra px-4 text-sm font-bold text-white shadow-lg"
        >
          {continuing ? `接着读 · ${book.progress}%` : book.finished ? '再读一遍' : '开始读'}
        </motion.button>
      </div>
    </div>
  )
}
