import { useCallback, useEffect, useState } from 'react'
import { IconStar, IconSparkle, IconPeach, IconSun, IconHeart, IconMoon, IconBook } from '../../components/ui/icons'
import { motion } from 'framer-motion'
import { api, ApiError, type BestBookmarksDto, type UnlockDto } from '../../lib/api'
import {
  isValidHighlightText,
  MOOD_OPTIONS,
  PROGRESS_OPTIONS,
} from '../../lib/finish'
import { TaCard, TaButton, TaSticker, Loading, ErrorState } from '../../components/ui'
import { haptic } from '../../lib/haptics'

export interface FinishScreenProps {
  sessionId: string
  bookId: string | null
  title: string
  token: string
  /** 收尾成功（含幂等重复收尾）→ 带解锁成就进入庆祝屏 */
  onFinished: (unlocked: UnlockDto[]) => void
}

type BookmarksState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'ready'; items: Array<{ text: string; count?: number }> }

/** M4 收尾流：进度三档 → 心情贴纸 → 金句两来源（挑一句/自己说）→ 盖章完成 */

/** 贴纸图标映射（docs/26：UI 红线不用 emoji 字形，用线性图标） */
const STICKER_ICONS = {
  sprout: IconSparkle,
  star: IconStar,
  peach: IconPeach,
  sun: IconSun,
  sparkle: IconSparkle,
  heart: IconHeart,
  moon: IconMoon,
  book: IconBook,
} as const

export function FinishScreen({ sessionId, bookId, title, token, onFinished }: FinishScreenProps) {
  const [progress, setProgress] = useState<string | null>(null)
  const [mood, setMood] = useState<string | null>(null)
  const [voiceText, setVoiceText] = useState('')
  const [tab, setTab] = useState<'pick' | 'voice'>('pick')
  const [bookmarks, setBookmarks] = useState<BookmarksState>({ kind: 'idle' })
  const [addedTexts, setAddedTexts] = useState<string[]>([])
  const [addingText, setAddingText] = useState(false)
  const [finishing, setFinishing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadBookmarks = useCallback(() => {
    if (!bookId) return
    let alive = true
    setBookmarks({ kind: 'loading' })
    api
      .bestBookmarks(bookId, token)
      .then((dto: BestBookmarksDto) => {
        if (!alive) return
        const items = (dto.items ?? [])
          .map((i) => ({ text: i.markText ?? '', count: i.totalCount }))
          .filter((i) => i.text.length > 0)
          .slice(0, 8)
        setBookmarks({ kind: 'ready', items })
      })
      .catch(() => {
        if (alive) setBookmarks({ kind: 'error' })
      })
    return () => {
      alive = false
    }
  }, [bookId, token])

  // 展开金句区时懒加载热门划线（返回清理函数，卸载后守卫生效）
  useEffect(() => {
    if (tab === 'pick' && bookmarks.kind === 'idle') return loadBookmarks()
  }, [tab, bookmarks.kind, loadBookmarks])

  async function addHighlight(body: { source: 'weread' | 'voice'; text: string; markCount?: number }) {
    setAddingText(true)
    setError(null)
    try {
      await api.addHighlight(sessionId, body, token)
      setAddedTexts((prev) => [...prev, body.text])
      if (body.source === 'voice') setVoiceText('')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '金句没有收进来，再试一次')
    } finally {
      setAddingText(false)
    }
  }

  async function handleFinish() {
    setFinishing(true)
    setError(null)
    try {
      const result = await api.finishCosession(
        sessionId,
        {
          ...(progress ? { progressMark: progress } : {}),
          ...(mood ? { mood } : {}),
        },
        token,
      )
      onFinished(result.unlocked ?? [])
      // 盖章成功：确认感振动（iOS 静默降级）；解锁了新成就用更长的一下
      haptic((result.unlocked ?? []).length > 0 ? 'achievement' : 'stamp')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '收尾没有成功，再试一次')
      setFinishing(false)
    }
  }

  const voiceValid = isValidHighlightText(voiceText)

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">读完好啦！</h2>
        <p className="mt-1 text-base text-ink-700">这次的《{title}》到这里，盖个章吧</p>
      </div>

      {/* 进度三档 */}
      <section aria-labelledby="progress-title">
        <h3 id="progress-title" className="mb-2 text-base font-bold text-ink-700">
          这次读到哪儿啦？
        </h3>
        <div className="flex flex-wrap gap-3">
          {PROGRESS_OPTIONS.map((p) => (
            <TaSticker
              key={p.value}
              icon={(() => { const I = STICKER_ICONS[p.icon as keyof typeof STICKER_ICONS]; return <I size={20} /> })()}
              label={p.label}
              active={progress === p.value}
              onClick={() => setProgress(p.value)}
            />
          ))}
        </div>
      </section>

      {/* 心情贴纸 */}
      <section aria-labelledby="mood-title">
        <h3 id="mood-title" className="mb-2 text-base font-bold text-ink-700">
          现在的心情
        </h3>
        <div className="flex flex-wrap gap-3">
          {MOOD_OPTIONS.map((m) => (
            <TaSticker
              key={m.value}
              icon={(() => { const I = STICKER_ICONS[m.icon as keyof typeof STICKER_ICONS]; return <I size={20} /> })()}
              label={m.label}
              active={mood === m.value}
              onClick={() => setMood(m.value)}
            />
          ))}
        </div>
      </section>

      {/* 金句两来源 */}
      <section aria-labelledby="highlight-title">
        <h3 id="highlight-title" className="mb-2 text-base font-bold text-ink-700">
          收一句金句（选做）
        </h3>
        <div className="mb-3 flex gap-2">
          <TaButton
            size="md"
            variant={tab === 'pick' ? 'primary' : 'secondary'}
            onClick={() => setTab('pick')}
          >
            挑一句
          </TaButton>
          <TaButton
            size="md"
            variant={tab === 'voice' ? 'primary' : 'secondary'}
            onClick={() => setTab('voice')}
          >
            自己说
          </TaButton>
        </div>

        {tab === 'pick' && (
          <TaCard>
            {bookmarks.kind === 'loading' && <Loading label="大家在划哪句…" />}
            {bookmarks.kind === 'error' && <ErrorState onRetry={loadBookmarks} />}
            {bookmarks.kind === 'ready' && bookmarks.items.length === 0 && (
              <p className="py-4 text-center text-ink-700">
                这本书还没有热门划线，试试「自己说」吧
              </p>
            )}
            {bookmarks.kind === 'ready' && bookmarks.items.length > 0 && (
              <ul className="flex flex-col gap-2">
                {bookmarks.items.map((item) => {
                  const added = addedTexts.includes(item.text)
                  return (
                    <li key={item.text}>
                      <button
                        type="button"
                        disabled={added || addingText}
                        onClick={() =>
                          void addHighlight({
                            source: 'weread',
                            text: item.text,
                            ...(item.count !== undefined ? { markCount: item.count } : {}),
                          })
                        }
                        className={`min-h-touch w-full cursor-pointer rounded-2xl border-2 p-4 text-left shadow-card transition-colors ${
                          added
                            ? 'border-terra-500 bg-terra-50'
                            : 'border-ink bg-paper-200 hover:bg-paper-300/60'
                        }`}
                      >
                        <span className="block text-base leading-relaxed">「{item.text}」</span>
                        <span className="mt-1 block text-base text-terra-600">
                          {added
                            ? '✓ 已收进这次的金句'
                            : item.count
                              ? `${item.count.toLocaleString()} 人划过这句`
                              : '收进这次的金句'}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </TaCard>
        )}

        {tab === 'voice' && (
          <TaCard>
            <label htmlFor="voice-highlight" className="mb-2 block text-base text-ink-700">
              把你最喜欢的一句说给爸爸妈妈听，打字收进来
            </label>
            <textarea
              id="voice-highlight"
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full rounded-2xl border-2 border-ink bg-paper-200 p-4 text-base leading-relaxed"
              placeholder="比如：小王子说，重要的东西用眼睛是看不见的"
            />
            <TaButton
              size="md"
              className="mt-3"
              disabled={!voiceValid || addingText}
              loading={addingText}
              onClick={() =>
                void addHighlight({ source: 'voice', text: voiceText.trim() })
              }
            >
              收进这次的金句
            </TaButton>
          </TaCard>
        )}

        {addedTexts.length > 0 && (
          <p className="mt-3 text-base text-terra-600" aria-live="polite">
            这次已经收了 {addedTexts.length} 句金句 <IconStar size={14} className="inline align-[-2px]" />
          </p>
        )}
      </section>

      {error && (
        <p role="alert" className="text-center text-base text-terra-600">
          {error}
        </p>
      )}

      {/* 盖章完成（金句选做；重复收尾服务端幂等） */}
      <motion.div whileTap={finishing ? undefined : { scale: 0.97 }}>
        <TaButton
          className="w-full"
          loading={finishing}
          disabled={finishing}
          onClick={() => void handleFinish()}
        >
          {progress === 'done' ? '宣布读完，收一颗桃子' : '盖这次的章'}
        </TaButton>
      </motion.div>
    </div>
  )
}
