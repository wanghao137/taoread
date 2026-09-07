import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { api, ApiError, type ShelfItemDto } from '../../lib/api'
import {
  friendlyLastRead,
  pickContinueReading,
  pickRandom,
  topRecommendations,
} from '../../lib/ritual'
import { TaCard, TaButton, Loading, ErrorState, EmptyState } from '../../components/ui'

export interface BookPickerProps {
  token: string
  /** 选定一本书：父组件负责开启共读并切换阶段；reject 时本组件展示错误并解锁 */
  onPick: (book: { bookId: string; title: string; deepLink?: string }) => Promise<void>
}

type FeedState =
  | { kind: 'loading' }
  | { kind: 'error'; message?: string }
  | { kind: 'ready'; shelf: ShelfItemDto[]; recommend: ShelfItemDto[] }

const nowSec = () => Math.floor(Date.now() / 1000)

/** M2「今晚读什么」：接着读 / 今晚的推荐 / 掷骰子 / 我的书架 */
export function BookPicker({ token, onPick }: BookPickerProps) {
  const [feed, setFeed] = useState<FeedState>({ kind: 'loading' })
  const [showAll, setShowAll] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [diceRolling, setDiceRolling] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 竞态防线（N6-004）：busy 用 ref 同步判定，杜绝「闭包捕获旧 state」的窗口；
  // 骰子定时器持有句柄，卸载/选中即撤销（N6-005）
  const busyRef = useRef(false)
  const diceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const load = useCallback(() => {
    let alive = true
    setFeed({ kind: 'loading' })
    // 两个来源独立容错：一个失败不拖垮另一个；都失败才进错误态
    Promise.all([
      api.shelf('', token, 'child').catch(() => null),
      api.recommend(token, 12).catch(() => null),
    ]).then(([shelfDto, recommendDto]) => {
      if (!alive) return
      if (!shelfDto && !recommendDto) {
        setFeed({ kind: 'error' })
        return
      }
      setFeed({
        kind: 'ready',
        shelf: shelfDto?.childrenView ?? [],
        recommend: recommendDto?.books ?? [],
      })
    })
    return () => {
      alive = false
    }
  }, [token])

  useEffect(() => load(), [load])

  // 卸载时撤销挂起的骰子定时器（防止 unmount 后触发 select）
  useEffect(() => {
    return () => {
      if (diceTimerRef.current) clearTimeout(diceTimerRef.current)
    }
  }, [])

  /** 防连点（同步 ref 判定）+ 服务端幂等兜底（reused 复用同一场） */
  const select = useCallback(
    async (book: ShelfItemDto) => {
      if (busyRef.current) return
      busyRef.current = true
      if (diceTimerRef.current) {
        clearTimeout(diceTimerRef.current)
        diceTimerRef.current = null
      }
      setDiceRolling(false)
      setBusyId(book.bookId)
      setError(null)
      try {
        await onPick({ bookId: book.bookId, title: book.title, deepLink: book.deepLink })
        // 成功后由父组件切换 phase，busy 不必解锁
      } catch (err) {
        setError(err instanceof ApiError ? err.message : '没有选成功，再试一次就好')
        setBusyId(null)
        busyRef.current = false
      }
    },
    [onPick],
  )

  const roll = useCallback(() => {
    if (feed.kind !== 'ready' || busyRef.current || diceRolling) return
    const book = pickRandom(feed.shelf)
    if (!book) {
      setError('书架还是空的，先看看今晚的推荐吧')
      return
    }
    setDiceRolling(true)
    // 星光落定 600ms 后开课；期间书卡全部禁用 + busyRef 同步判定，双保险
    diceTimerRef.current = setTimeout(() => {
      diceTimerRef.current = null
      setDiceRolling(false)
      void select(book)
    }, 600)
  }, [feed, diceRolling, select])

  if (feed.kind === 'loading') return <Loading label="书架正在醒来…" />
  if (feed.kind === 'error') return <ErrorState onRetry={load} />

  const continueBook = pickContinueReading(feed.shelf)
  const recommends = topRecommendations(feed.recommend, 3)
  const visibleShelf = showAll ? feed.shelf : feed.shelf.slice(0, 6)
  const anyDisabled = busyId !== null || diceRolling

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-center text-2xl font-bold">
        今晚读<span className="text-moon-400">什么</span>？
      </h2>

      {continueBook && (
        <section aria-labelledby="continue-title">
          <h3 id="continue-title" className="mb-2 text-base font-bold text-ink-secondary">
            接着读
          </h3>
          <BookCard
            book={continueBook}
            busy={busyId === continueBook.bookId}
            disabled={anyDisabled}
            onSelect={select}
            note={friendlyLastRead(continueBook.readUpdateTime, nowSec()) ?? undefined}
            highlight
          />
        </section>
      )}

      {recommends.length > 0 && (
        <section aria-labelledby="rec-title">
          <h3 id="rec-title" className="mb-2 text-base font-bold text-ink-secondary">
            今晚的推荐
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {recommends.map((b) => (
              <BookCard
                key={b.bookId}
                book={b}
                busy={busyId === b.bookId}
                disabled={anyDisabled}
                onSelect={select}
              />
            ))}
          </div>
        </section>
      )}

      <TaButton
        variant="secondary"
        onClick={roll}
        loading={diceRolling}
        aria-label="掷骰子随机选一本"
      >
        🎲 掷骰子，抽一本惊喜
      </TaButton>

      {feed.shelf.length > 0 && (
        <section aria-labelledby="shelf-title">
          <div className="mb-2 flex items-center justify-between">
            <h3 id="shelf-title" className="text-base font-bold text-ink-secondary">
              我的书架（{feed.shelf.length} 本）
            </h3>
            {feed.shelf.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="min-h-[3rem] cursor-pointer rounded-xl px-4 text-base text-peach-400"
              >
                {showAll ? '收起' : '展开全部'}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {visibleShelf.map((b) => (
                <motion.div
                  key={b.bookId}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <BookCard
                    book={b}
                    busy={busyId === b.bookId}
                    disabled={anyDisabled}
                    onSelect={select}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {feed.shelf.length === 0 && recommends.length === 0 && (
        <EmptyState
          emoji="📚"
          title="书架还空着"
          hint="请爸爸妈妈先在微信读书里把童书放进书架"
        />
      )}

      {error && (
        <p role="alert" className="text-center text-base text-peach-300">
          {error}
        </p>
      )}
    </div>
  )
}

function BookCard({
  book,
  busy,
  disabled,
  onSelect,
  note,
  highlight = false,
}: {
  book: ShelfItemDto
  busy: boolean
  disabled: boolean
  onSelect: (book: ShelfItemDto) => void
  note?: string
  highlight?: boolean
}) {
  return (
    <TaCard className={highlight ? 'border-peach-400/60' : ''}>
      <motion.button
        type="button"
        whileTap={disabled ? undefined : { scale: 0.97 }}
        disabled={disabled}
        onClick={() => onSelect(book)}
        className="flex min-h-touch w-full cursor-pointer items-center gap-4 text-left disabled:cursor-not-allowed"
        aria-label={`选《${book.title}》今晚读`}
      >
        {book.cover ? (
          <img
            src={book.cover}
            alt=""
            loading="lazy"
            className="h-20 w-16 shrink-0 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden'
            }}
          />
        ) : (
          <span
            aria-hidden
            className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg bg-night-700 text-3xl"
          >
            📖
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-lg font-bold leading-snug">{book.title}</span>
          {book.author && (
            <span className="mt-0.5 block truncate text-base text-ink-secondary">{book.author}</span>
          )}
          {note && <span className="mt-1 block text-base text-moon-400">{note}</span>}
        </span>
        <span aria-hidden className="shrink-0 text-2xl text-peach-400">
          {busy ? '⏳' : '✓'}
        </span>
      </motion.button>
    </TaCard>
  )
}
