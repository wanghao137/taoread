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
import { IconCheck, IconClock, IconSparkle } from '../../components/ui/icons'
import { SceneArt } from '../../components/art/SceneArt'

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
        今晚读<span className="font-display text-terra-600">什么</span>？
      </h2>

      {continueBook && (
        <section aria-labelledby="continue-title">
          <h3 id="continue-title" className="mb-2 text-base font-bold text-ink-700">
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
          <h3 id="rec-title" className="mb-2 text-base font-bold text-ink-700">
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
        <IconSparkle size={18} /> 掷骰子，抽一本惊喜
      </TaButton>

      <SearchBox token={token} busy={anyDisabled} onSelect={select} />

      {feed.shelf.length > 0 && (
        <section aria-labelledby="shelf-title">
          <div className="mb-2 flex items-center justify-between">
            <h3 id="shelf-title" className="text-base font-bold text-ink-700">
              我的书架（{feed.shelf.length} 本）
            </h3>
            {feed.shelf.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="min-h-touch cursor-pointer rounded-xl px-4 text-base text-terra-600"
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
          art="bookshelf"
          mood="hint"
          title="书架还空着"
          hint="请爸爸妈妈先在微信读书里把童书放进书架"
        />
      )}

      {error && (
        <p role="alert" className="text-center text-base text-terra-600">
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
  // 封面策略（对抗审查修复）：只渲染本站媒体（/api/media/...）的封面。
  // 微信书等外部 CDN 封面会因 ORB 拦截变成坏图，还向第三方泄露孩子 IP——
  // 一律不出 <img>，走本地 SVG 场景回退，孩子端界面零外链。
  const localCover = book.cover?.startsWith('/api/') ? book.cover : null
  return (
    <TaCard className={highlight ? 'border-terra-300' : ''}>
      <motion.button
        type="button"
        whileTap={disabled ? undefined : { scale: 0.97 }}
        disabled={disabled}
        onClick={() => onSelect(book)}
        className="flex min-h-touch w-full cursor-pointer items-center gap-4 text-left disabled:cursor-not-allowed"
        aria-label={`选《${book.title}》今晚读`}
      >
        {localCover ? (
          <img
            src={localCover}
            alt=""
            loading="lazy"
            className="h-20 w-16 shrink-0 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden'
            }}
          />
        ) : (
          <span aria-hidden className="block h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-paper-300">
            <SceneArt scene="bookshelf" className="h-full w-full" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-lg font-bold leading-snug">{book.title}</span>
          {book.author && (
            <span className="mt-0.5 block truncate text-base text-ink-700">{book.author}</span>
          )}
          {note && <span className="mt-1 block text-base text-terra-600">{note}</span>}
        </span>
        <span aria-hidden className="shrink-0 text-terra-600">
          {busy ? <IconClock size={22} /> : <IconCheck size={22} />}
        </span>
      </motion.button>
    </TaCard>
  )
}

/** 搜索选书（第 11 夜 M-C）：孩子端大键盘，服务端适龄过滤后展示 */
function SearchBox({
  token,
  busy,
  onSelect,
}: {
  token: string
  busy: boolean
  onSelect: (book: ShelfItemDto) => void
}) {
  const [keyword, setKeyword] = useState('')
  const [hits, setHits] = useState<ShelfItemDto[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function run() {
    const kw = keyword.trim()
    if (kw.length < 1 || searching) return
    setSearching(true)
    setError(null)
    try {
      const dto = await api.search(kw, token)
      setHits(dto.hits ?? [])
    } catch (err) {
      setError(err instanceof ApiError ? err.message : '搜索没有成功，再试一次')
    } finally {
      setSearching(false)
    }
  }

  return (
    <section aria-labelledby="search-title">
      <h3 id="search-title" className="mb-2 text-base font-bold text-ink-700">
        找一本想读的书
      </h3>
      <TaCard>
        <div className="flex gap-2">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void run()
            }}
            placeholder="输入书名或作者"
            maxLength={60}
            aria-label="搜索书名或作者"
            className="h-12 min-w-0 flex-1 rounded-xl border border-paper-border bg-paper-300 px-4 text-base"
          />
          <TaButton size="md" disabled={keyword.trim().length < 1} loading={searching} onClick={() => void run()}>
            搜一搜
          </TaButton>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-base text-terra-600">
            {error}
          </p>
        )}
        {hits !== null && hits.length === 0 && (
          <p className="mt-3 text-base text-ink-700">
            没找到「{keyword}」，换个词试试，或者从上面的书架里挑一本
          </p>
        )}
        {hits !== null && hits.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {hits.map((b) => (
              <li key={b.bookId}>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onSelect(b)}
                  className="flex min-h-touch w-full cursor-pointer items-center justify-between rounded-2xl border border-paper-border bg-paper-300/60 px-4 text-left disabled:cursor-not-allowed"
                >
                  <span className="truncate text-base">
                    《{b.title}》
                    {b.author && <span className="ml-2 text-ink-700">{b.author}</span>}
                  </span>
                  <span aria-hidden className="ml-2 shrink-0 text-terra-600">
                    ✓
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </TaCard>
    </section>
  )
}
