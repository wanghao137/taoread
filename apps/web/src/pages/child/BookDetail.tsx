/**
 * 书籍详情页（docs/09 A2；2026-09-20 UI 复盘重构）。
 * 大封面 + 适龄标签 + 难度 + 简介 + 章节目录 + 试读/开始读。
 * 桌面端（lg）双栏：左栏 sticky（封面/元信息/主 CTA），右栏简介 + 章节双列网格；
 * 移动端保持单列，CTA 吸底但为底部 dock 让位（bottom-offset）。
 * 难度由 stageRank + 章节数 + 字数推导，不在内容包里硬编码。
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
 * 难度推导（0-5）。判据公开可解释：
 *  - 年龄段越高，基础分越高（9-12 岁的书对小孩子更难）
 *  - 章节越多、字数越多，越难
 *  中文按字数、英文按词数，量纲不同所以分档。
 * UI 复盘：星级「1.5/5」观感像评分且半星不清，改为「难度 入门/进阶/挑战」文案。
 */
function difficulty(book: ContentBookDto): { score: number; label: string } {
  const stageBase: Record<string, number> = { '3-5': 1, '6-8': 2.5, '9-12': 4 }
  let score = stageBase[book.ageStage] ?? 2
  const units = book.words
  const perChapter = book.chapterCount > 0 ? units / book.chapterCount : units
  if (book.lang === 'zh') {
    if (perChapter > 800) score += 1
    else if (perChapter > 350) score += 0.5
  } else {
    if (perChapter > 500) score += 1
    else if (perChapter > 200) score += 0.5
  }
  if (book.chapterCount > 5) score += 0.5
  score = Math.max(0.5, Math.min(5, score))
  const label = score < 2 ? '入门' : score < 3.5 ? '进阶' : '挑战'
  return { score, label }
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
  const { label: difficultyLabel } = difficulty(book)
  const continuing = book.progress > 0 && !book.finished
  /** 目录里标出接续章（进度百分比 → 章序），与 CTA 提示呼应 */
  const resumeChapter = continuing
    ? Math.max(1, Math.min(book.chapterCount, Math.ceil((book.progress / 100) * book.chapterCount)))
    : null

  const chips = (
    <div className="flex flex-wrap gap-1.5">
      <span className="rounded-full bg-terra px-2.5 py-1 text-[10px] font-bold leading-none text-white">
        {STAGE_LABEL[book.ageStage] ?? book.ageStage}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border-[1.5px] border-ink bg-paper-200 px-2.5 py-1 text-[10px] font-bold leading-none text-ink-700">
        <meta.icon size={12} /> {meta.label}
      </span>
      <span className="rounded-full border-[1.5px] border-ink bg-paper-200 px-2.5 py-1 text-[10px] font-bold leading-none text-ink-700">
        {book.lang === 'en' ? 'English' : '中文'}
      </span>
      <span className="rounded-full border-[1.5px] border-ink bg-paper-200 px-2.5 py-1 text-[10px] font-bold leading-none text-ink-700">
        难度 {difficultyLabel}
      </span>
    </div>
  )

  const cta = (
    <>
      <button
        type="button"
        onClick={onPreview}
        className="min-h-touch flex-1 rounded-full border-2 border-ink bg-paper-200 px-4 text-sm font-bold text-ink-700 shadow-xs"
      >
        试读第一章
      </button>
      <motion.button
        type="button"
        onClick={handleStart}
        whileTap={{ scale: 0.97 }}
        className="min-h-touch flex-1 rounded-full border-2 border-ink bg-terra px-4 text-sm font-bold text-white shadow-xs"
      >
        {continuing ? `接着读 · ${book.progress}%` : book.finished ? '再读一遍' : '开始读'}
      </motion.button>
    </>
  )

  const chapterList = loading ? (
    <p className="py-4 text-center text-xs text-ink-700 opacity-70">目录正在翻开…</p>
  ) : error ? (
    <p className="py-4 text-center text-xs text-ink-700">{error}</p>
  ) : (
    <div className="grid gap-2 sm:grid-cols-2">
      {titles.map((t) => (
        <button
          key={t.order}
          type="button"
          onClick={() => onStart(t.order)}
          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
            resumeChapter === t.order
              ? 'border-terra bg-terra-50'
              : 'border-paper-border bg-paper-200 hover:border-ink'
          }`}
        >
          <span
            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
              resumeChapter === t.order ? 'bg-terra text-white' : 'bg-terra-100 text-terra-700'
            }`}
          >
            {t.order}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm text-ink-900">{t.title}</span>
          {resumeChapter === t.order ? (
            <span className="flex-shrink-0 rounded-full bg-terra px-2 py-0.5 text-[9px] font-bold text-white">
              接着读
            </span>
          ) : null}
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex flex-1 flex-col">
      {/* 顶栏：返回统一为奶白+墨线+硬阴影胶囊（UI 复盘：全站返回按钮同族） */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-touch rounded-full border-2 border-ink bg-paper-200 px-4 text-sm font-bold text-ink-700 shadow-xs"
        >
          ← 书架
        </button>
        <h2 className="min-w-0 flex-1 truncate text-xl font-bold text-ink-900">{book.title}</h2>
        <TaoMascot mood="happy" className="h-9 w-9 flex-shrink-0" />
      </div>

      <div className="mt-4 gap-8 lg:grid lg:grid-cols-[340px_1fr]">
        {/* 左栏：封面 + 元信息（桌面 sticky） */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="flex gap-4 lg:flex-col">
            <div className="relative aspect-[3 / 4] w-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-paper-border sm:w-36 lg:w-full">
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

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3 className="text-lg font-bold leading-tight text-ink-900 lg:text-xl">{book.title}</h3>
              <p className="text-sm text-ink-700">{book.author ?? (book.lang === 'en' ? 'English' : '佚名')}</p>
              {chips}
              <p className="text-[10px] text-ink-700 opacity-70">
                {book.chapterCount} 章 · 约 {book.words} {book.lang === 'zh' ? '字' : '词'}
              </p>
              {continuing ? (
                <p className="text-[11px] font-medium text-terra-600">🔖 读到 {book.progress}%，可以从这里接着读</p>
              ) : null}
              {/* 桌面主 CTA：左栏封面下方（移动端隐藏，走吸底 CTA） */}
              <div className="mt-2 hidden gap-3 lg:flex">{cta}</div>
            </div>
          </div>
        </div>

        {/* 右栏：简介 + 章节目录 */}
        <div className="mt-5 lg:mt-0">
          {book.intro ? (
            <div className="rounded-2xl border-[1.5px] border-ink bg-paper-200 p-4 shadow-xs">
              <p className="text-sm font-bold text-ink-900">这本书讲了什么</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{book.intro}</p>
            </div>
          ) : null}

          <p className="mb-2 mt-5 text-sm font-bold text-ink-900">章节目录</p>
          {chapterList}
        </div>
      </div>

      {/* 移动端吸底 CTA：为底部 dock 让位（bottom-offset），不再三层叠压 */}
      <div className="sticky bottom-[4.75rem] z-20 mt-6 flex gap-3 rounded-3xl bg-paper-200/90 p-2 ring-1 ring-paper-border backdrop-blur-sm lg:hidden">
        {cta}
      </div>
      {/* 桌面端内容收尾留白（CTA 已在左栏） */}
      <div className="hidden pb-6 lg:block" />
    </div>
  )
}
