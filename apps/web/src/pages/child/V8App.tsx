/**
 * 「贴纸绘本 v8」孩子端（2026-09-21 全量重构）。
 * DOM/样式 1:1 复刻 taoread-codex-resets-demo-v8-full-cn（样式见 src/v8.css），
 * 数据全部接真实 API：真书库/真进度/真收藏/真共读会话/真 TTS；桃子 logo 沿用品牌图。
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { api, type ContentBookDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { audioPlayer } from '../../lib/audioPlayer'
import { tts } from '../../lib/tts'
import { PoemRuby } from './ReaderScreen'

type Page = 'home' | 'discover' | 'shelf' | 'detail' | 'reader' | 'finish'
type V8Theme = 'paper' | 'sepia' | 'night'

const TONES = ['mint', 'rose', 'sun', 'orange', 'sky']
function toneOf(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return TONES[h % TONES.length] ?? 'mint'
}

/** v8 书目视图：ContentBookDto + 演示所需的派生字段 */
interface V8Book {
  id: string
  title: string
  author: string
  meta: string
  desc: string
  tone: string
  cover: string | null
  progress: number
  finished: boolean
  fav: boolean
  chapterCount: number
}

const CATEGORY_LABEL: Record<string, string> = { poetry: '古诗', primer: '蒙学', story: '故事', tale: '童话' }

function toV8(b: ContentBookDto): V8Book {
  return {
    id: b.id,
    title: b.title,
    author: b.author ?? (b.lang === 'en' ? 'English' : '佚名'),
    meta: `${b.chapterCount} 章 · ${CATEGORY_LABEL[b.category] ?? b.category}`,
    desc: b.intro ?? '',
    tone: toneOf(b.id),
    cover: b.coverArtUrl ?? null,
    progress: b.progress,
    finished: b.finished,
    fav: b.favorite,
    chapterCount: b.chapterCount,
  }
}

/** demo 素材文案（页面固定部件，逐字保留） */
const LABELS = {
  brandSub: '贴纸绘本 · 儿童阅读空间',
  memory: '阅读记忆',
  discover: '找故事',
  navHome: '今天',
  navDiscover: '找故事',
  navShelf: '我的书架',
  together: '本周一起读',
  today: '今天想读什么？',
  hello: '下午好',
  pick3: '为你挑了三本',
  pickDesc: '不是任务，是三个可以进去看看的世界。',
  mood: '今天想读哪种感觉？',
  moodSub: '先凭感觉，再看分类',
  rhythm: '阅读节奏',
  rhythmSub: '不是连续打卡，只是一起读过的痕迹',
  memoryTitle: '家庭记忆',
  memorySub: '我们一起读过的片段',
  calendarTitle: '近 26 周阅读记录',
  calendarHint: '橙色 = 一起读过',
  discoverSub: '先看封面，再决定要不要打开。',
  searchPlaceholder: '搜书名、作者，或者“兔子”“下雨”…',
  random: '随机一本',
  shelfSub: '不用整理得像仓库',
  reading: '正在读',
  liked: '喜欢',
  done: '读完',
  all: '全部',
  back: '返回',
  start: '开始读',
  continueRead: '继续读',
  preview: '先听一小段',
  like: '喜欢这本',
  likedAlready: '已喜欢',
  chaptersFrom: '从哪一章开始',
  chaptersSub: '一次只打开一个小故事',
  readAloud: '朗读这一段',
  stopAloud: '停止朗读',
  settings: '阅读设置',
  finish: '读完啦',
  paper: '纸白',
  sepia: '护眼',
  night: '夜间',
  smaller: '小一点',
  bigger: '大一点',
  savedToast: '今天的阅读留下来了',
  finishTitle: '这一章读完啦',
  finishCopy: '不用积分，也不用连续打卡。今天一起读过的这一小段，已经被好好保存。',
  backToday: '回到今天',
  typeset: '排版',
}

/** 每章数据（阅读器） */
interface ChapterBlock {
  id: string
  kind: string
  text: string
  pinyin?: string | null
  translation?: string | null
  art?: string | null
  artUrl?: string | null
}

function Cover({
  book,
  onFav,
  onOpen,
}: {
  book: V8Book
  onFav: (id: string) => void
  onOpen?: (id: string) => void
}) {
  return (
    <div
      className={`book-cover ${book.tone} ${book.cover ? 'has-art' : ''}`}
      {...(onOpen ? { role: 'button', tabIndex: 0, onClick: () => onOpen(book.id) } : {})}
    >
      {book.cover ? <img className="cover-art" src={book.cover} alt="" loading="lazy" decoding="async" /> : null}
      <span className="cover-kicker">桃阅读 · 故事</span>
      <span className="cover-title">{book.title}</span>
      <button
        className={`fav ${book.fav ? 'on' : ''}`}
        aria-label={`${book.fav ? '取消喜欢' : '喜欢'}《${book.title}》`}
        onClick={(e) => {
          e.stopPropagation()
          onFav(book.id)
        }}
      >
        {book.fav ? '♥' : '+'}
      </button>
    </div>
  )
}

function StoryCard({ book, onOpen, onFav }: { book: V8Book; onOpen: (id: string) => void; onFav: (id: string) => void }) {
  return (
    <div
      className="story-card"
      role="button"
      tabIndex={0}
      aria-label={`打开《${book.title}》`}
      onClick={() => onOpen(book.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(book.id)
      }}
    >
      <Cover book={book} onFav={onFav} />
      <div className="story-meta">
        <b>{book.title}</b>
        <small>
          {book.author} / {book.meta}
        </small>
      </div>
    </div>
  )
}

/** 近 26 周阅读格子（demo：104 格 / 26 列）：格子命中 = 对应时间窗内有共读夜 */
function Calendar({ nights }: { nights: string[] }) {
  const nightSet = useMemo(() => new Set(nights), [nights])
  const cells = []
  const DAY = 24 * 60 * 60 * 1000
  const now = Date.now()
  for (let i = 0; i < 104; i++) {
    // 每格 ≈ 1.75 天（26 周 / 104 格），从旧到新
    const start = now - (104 - i) * 1.75 * DAY
    const end = start + 1.75 * DAY
    let hit = false
    for (const n of nightSet) {
      const t = new Date(n).getTime()
      if (t >= start && t < end) {
        hit = true
        break
      }
    }
    cells.push(<i key={i} className={`cell ${hit ? 'hit' : ''}`} />)
  }
  return (
    <div className="calendar">
      <div className="calendar-top">
        <b>{LABELS.calendarTitle}</b>
        <span>{LABELS.calendarHint}</span>
      </div>
      <div className="cells">{cells}</div>
    </div>
  )
}

export function V8App({ childName, onSwitchFamily }: { childName: string; onSwitchFamily: () => void }) {
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const stage = useSession((s) => s.childStage)

  const [page, setPage] = useState<Page>('home')
  const [books, setBooks] = useState<V8Book[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState('all')
  const [shelfTab, setShelfTab] = useState('all')
  const [query, setQuery] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [report, setReport] = useState<{ nights: number; highlightsTotal: number; highlights: Array<{ text: string; source: string }> } | null>(null)
  const [nights, setNights] = useState<string[]>([])
  const [detail, setDetail] = useState<V8Book | null>(null)
  const [chapters, setChapters] = useState<Array<{ order: number; title: string }>>([])
  const [resumeOrder, setResumeOrder] = useState(0)

  // 阅读器状态
  const [readerBook, setReaderBook] = useState<V8Book | null>(null)
  const [readerOrder, setReaderOrder] = useState(1)
  const [blocks, setBlocks] = useState<ChapterBlock[]>([])
  const [readerLoading, setReaderLoading] = useState(false)
  const [theme, setTheme] = useState<V8Theme>('paper')
  const [font, setFont] = useState(22)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [speakingIdx, setSpeakingIdx] = useState(-1)
  const [finishStats, setFinishStats] = useState<{ minutes: number; quotes: number; times: number } | null>(null)
  const sessionIdRef = useRef<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((m: string) => {
    setToastMsg(m)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(''), 1100)
  }, [])

  /** 书单：适龄全量（客户端筛选/搜索，口径与 demo 一致） */
  useEffect(() => {
    if (!token) return
    api
      .contentBooks(token, { ...(stage ? { stage } : {}), ...(childId ? { childId } : {}) })
      .then((res) => {
        setBooks(res.books.map(toV8))
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [token, stage, childId])

  /** 周报（指标 + 家庭记忆金句）与夜灯记录（日历） */
  const familyId = useSession((s) => s.familyId)
  useEffect(() => {
    if (!token || !familyId || !childId) return
    api
      .weeklyReport(familyId, token)
      .then(({ report: r }) =>
        setReport({ nights: r.nights, highlightsTotal: r.highlightsTotal, highlights: r.highlights }),
      )
      .catch(() => undefined)
    api
      .achievements(childId, token)
      .then((a) => setNights(a.nightLamps.map((x) => x.unlockedAt)))
      .catch(() => undefined)
  }, [token, familyId, childId])

  const continueBook = useMemo(() => books.find((b) => b.progress > 0 && !b.finished) ?? null, [books])
  const doneCount = useMemo(() => books.filter((b) => b.finished).length, [books])
  const picks = useMemo(() => books.filter((b) => b.id !== continueBook?.id).slice(0, 3), [books, continueBook])

  const toggleFav = useCallback(
    (id: string) => {
      const target = books.find((b) => b.id === id)
      if (!target || !token || !childId) return
      const next = !target.fav
      setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, fav: next } : b)))
      setDetail((d) => (d && d.id === id ? { ...d, fav: next } : d))
      api.setFavorite(id, childId, next, token).catch(() => undefined)
      showToast(next ? '已放进“喜欢”' : '已从“喜欢”移除')
    },
    [books, token, childId, showToast],
  )

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = books
    if (q) {
      arr = arr.filter((b) => `${b.title} ${b.author} ${b.meta} ${b.desc}`.toLowerCase().includes(q))
    } else if (filter !== 'all') {
      arr = arr.filter((b) => {
        if (filter === 'story') return b.meta.includes('故事') || b.meta.includes('童话')
        if (filter === 'poem') return b.meta.includes('古诗')
        if (filter === 'nature') return b.title.includes('自然') || (b.desc ?? '').includes('自然')
        if (filter === 'english') return b.meta.includes('英文') || b.meta.includes('English')
        return true
      })
    }
    return arr
  }, [books, filter, query])

  const shelfBooks = useMemo(() => {
    if (shelfTab === 'reading') return books.filter((b) => b.progress > 0 && !b.finished)
    if (shelfTab === 'liked') return books.filter((b) => b.fav)
    if (shelfTab === 'done') return books.filter((b) => b.finished)
    return books
  }, [books, shelfTab])

  const go = useCallback((p: Page) => {
    setPage(p)
    setSettingsOpen(false)
    setSpeakingIdx(-1)
    audioPlayer.stop()
    tts.stop()
    window.scrollTo({ top: 0 })
  }, [])

  const openBook = useCallback(
    async (id: string) => {
      const b = books.find((x) => x.id === id)
      if (!b || !token || !childId) return
      setDetail(b)
      setPage('detail')
      window.scrollTo({ top: 0 })
      setResumeOrder(0)
      try {
        const list = await api.contentChapterList(id, token)
        setChapters(list.chapters)
        const p = await api.contentProgress(id, childId, token)
        setResumeOrder(p.progress.finished ? 0 : p.progress.chapterOrder)
      } catch {
        setChapters([])
      }
    },
    [books, token, childId],
  )

  const speakPreview = useCallback(
    async (b: V8Book) => {
      if (!token) return
      showToast('正在试听一小段')
      try {
        const res = await api.contentChapter(b.id, 1, token)
        const text = res.chapter.blocks
          .filter((x) => x.kind === 'text' || x.kind === 'poem')
          .map((x) => x.text)
          .join('\n')
          .slice(0, 120)
        const ok = await audioPlayer.speak(text, { lang: b.meta.includes('英文') ? 'en' : 'zh' })
        if (!ok) tts.speak(text, { lang: b.meta.includes('英文') ? 'en' : 'zh' })
      } catch {
        /* 静默：试听失败不打断 */
      }
    },
    [token, showToast],
  )

  /** 进阅读器：开会话（收尾计时长）+ 加载章节 + 打底进度 */
  const readBook = useCallback(
    async (id: string, fromOrder?: number) => {
      const b = books.find((x) => x.id === id) ?? detail
      if (!b || !token || !childId) return
      setReaderBook(b)
      setReaderLoading(true)
      setPage('reader')
      setSettingsOpen(false)
      setSpeakingIdx(-1)
      window.scrollTo(0, 0)
      try {
        const session = await api.startCosession(childId, `cbf:${b.id}`, token)
        sessionIdRef.current = session.id
      } catch {
        sessionIdRef.current = null
      }
      let order = fromOrder ?? 1
      if (!fromOrder) {
        try {
          const p = await api.contentProgress(b.id, childId, token)
          order = p.progress.finished ? 1 : p.progress.chapterOrder || 1
        } catch {
          order = 1
        }
      }
      setReaderOrder(order)
      try {
        const res = await api.contentChapter(b.id, order, token)
        setBlocks(res.chapter.blocks)
        if (childId) {
          api
            .reportContentProgress(b.id, childId, { chapterOrder: order, blockOrder: 0 }, token)
            .catch(() => undefined)
        }
      } catch {
        setBlocks([])
      } finally {
        setReaderLoading(false)
      }
    },
    [books, detail, token, childId],
  )

  /** 朗读本章：段落级高亮（服务端 TTS 不可用时回退浏览器语音） */
  const speakChapter = useCallback(async () => {
    if (!readerBook || !token) return
    if (speakingIdx >= 0) {
      audioPlayer.stop()
      tts.stop()
      setSpeakingIdx(-1)
      showToast('已停止朗读')
      return
    }
    const text = blocks
      .filter((b) => b.kind === 'text' || b.kind === 'poem')
      .map((b) => b.text)
      .join('\n')
    const lang = readerBook.meta.includes('英文') ? ('en' as const) : ('zh' as const)
    const ok = await audioPlayer.speakChapter(
      readerBook.id,
      readerOrder,
      {
        title: `第 ${readerOrder} 章`,
        bookTitle: readerBook.title,
      },
      { lang },
    )
    if (ok) {
      const off = audioPlayer.onProgress((p) => setSpeakingIdx(p.index))
      const stop = audioPlayer.onEnd(() => {
        setSpeakingIdx(-1)
        off()
        stop()
      })
      return
    }
    if (tts.speak(text, { lang })) {
      setSpeakingIdx(0)
      showToast('正在朗读')
    } else {
      showToast('这台设备暂时不能朗读')
    }
  }, [readerBook, token, blocks, speakingIdx, readerOrder, showToast])

  useEffect(() => {
    const off = audioPlayer.onProgress((p) => setSpeakingIdx(p.index))
    const stop = audioPlayer.onEnd(() => setSpeakingIdx(-1))
    return () => {
      off()
      stop()
    }
  }, [])

  /** 读完啦：底章进度 + 收尾（真实时长进结算卡） */
  const finishRead = useCallback(async () => {
    audioPlayer.stop()
    tts.stop()
    let minutes = 12
    const quotes = report?.highlightsTotal ?? 0
    const last = readerOrder
    if (readerBook && childId && token) {
      try {
        await api.reportContentProgress(readerBook.id, childId, { chapterOrder: last, blockOrder: 0 }, token)
      } catch {
        /* 进度失败不挡结算 */
      }
    }
    const sessionId = sessionIdRef.current
    if (sessionId && token) {
      try {
        const r = await api.finishCosession(sessionId, { progressMark: 'done' }, token)
        if (r.durationSec !== null) minutes = Math.max(1, Math.round(r.durationSec / 60))
        sessionIdRef.current = null
      } catch {
        /* 收尾失败不挡结算页 */
      }
    }
    setFinishStats({ minutes, quotes, times: 1 })
    setBooks((prev) =>
      prev.map((b) =>
        b.id === readerBook?.id && last >= b.chapterCount ? { ...b, finished: true, progress: 100 } : b,
      ),
    )
    setPage('finish')
    window.scrollTo(0, 0)
  }, [readerBook, readerOrder, childId, token, report])

  /* ── 页面部件（DOM 1:1 对齐 demo） ── */

  function Mast({ sub, actions }: { sub: string; actions?: ReactNode }) {
    return (
      <header className="mast">
        <div className="logo">
          <img src="/brand/logo-256.png" alt="桃阅读" />
        </div>
        <div className="brand">
          <h1>桃阅读</h1>
          <p>{sub}</p>
        </div>
        <div className="mast-actions">
          {actions}
          <button className="sticker-btn" onClick={() => showToast('阅读记忆已打开')}>
            {LABELS.memory}
          </button>
          <button className="sticker-btn primary" onClick={() => go('discover')}>
            {LABELS.discover}
          </button>
        </div>
      </header>
    )
  }

  function SideNav() {
    return (
      <aside className="side">
        <p className="side-label">导航</p>
        <nav className="nav">
          <button className={page === 'home' ? 'on' : ''} onClick={() => go('home')}>
            {LABELS.navHome}
          </button>
          <button className={page === 'discover' ? 'on' : ''} onClick={() => go('discover')}>
            {LABELS.navDiscover}
          </button>
          <button className={page === 'shelf' ? 'on' : ''} onClick={() => go('shelf')}>
            {LABELS.navShelf}
          </button>
        </nav>
        <div className="side-card">
          <b>{LABELS.together}</b>
          <p>本周共读 {report?.nights ?? 0} 次</p>
        </div>
      </aside>
    )
  }

  function MobileNav() {
    return (
      <nav className="mobile-nav">
        {(
          [
            ['home', LABELS.navHome],
            ['discover', LABELS.navDiscover],
            ['shelf', LABELS.navShelf],
          ] as Array<[Page, string]>
        ).map(([p, label]) => (
          <button key={p} className={page === p ? 'on' : ''} onClick={() => go(p)}>
            {label}
          </button>
        ))}
      </nav>
    )
  }

  function Shell(content: ReactNode, title: string, sub: string) {
    return (
      <div className="app">
        <div className="wrap">
          <Mast sub={LABELS.brandSub} />
          <div className="layout">
            <SideNav />
            <main className="main">
              <div className="page-head">
                <span className="page-index">01 / 桃阅读</span>
                <h2>{title}</h2>
                <p>{sub}</p>
              </div>
              {content}
            </main>
          </div>
        </div>
        <MobileNav />
      </div>
    )
  }

  /* ── 首页 ── */
  function renderHome() {
    const b = continueBook ?? books[0]
    return Shell(
      <>
        <section className="hero">
          <div className="hero-grid">
            <div>
              <span className="mono-label">今天的故事 / 继续昨天的故事</span>
              <div className="hero-title">
                <span className="marker">{b ? b.title : '挑一本书开始'}</span>
              </div>
              <p className="hero-copy">{b ? b.desc : '书架还在长新故事，先去看看。'}</p>
              <div className="hero-actions">
                <button className="sticker-btn primary" onClick={() => b && void readBook(b.id)} disabled={!b}>
                  继续读
                </button>
                <button className="sticker-btn" onClick={() => b && void openBook(b.id)} disabled={!b}>
                  看看这本书
                </button>
              </div>
            </div>
            {b ? <Cover book={b} onFav={toggleFav} /> : null}
          </div>
        </section>
        <section className="metrics">
          <div className="metric">
            <span>本周共读</span>
            <strong>{report?.nights ?? 0}</strong>
          </div>
          <div className="metric">
            <span>收藏句子</span>
            <strong>{report?.highlightsTotal ?? 0}</strong>
          </div>
          <div className="metric">
            <span>读完故事</span>
            <strong>{doneCount}</strong>
          </div>
        </section>
        <section className="section">
          <div className="section-head">
            <span className="section-no">02</span>
            <h3>{childName}为你挑了三本</h3>
            <p>{LABELS.pickDesc}</p>
          </div>
          <div className="story-row">{picks.map((x) => <StoryCard key={x.id} book={x} onOpen={openBook} onFav={toggleFav} />)}</div>
        </section>
        <section className="section">
          <div className="section-head">
            <span className="section-no">03</span>
            <h3>{LABELS.mood}</h3>
            <p>{LABELS.moodSub}</p>
          </div>
          <div className="mood-row">
            {(
              [
                ['想笑一笑', 'story'],
                ['想去冒险', 'story'],
                ['想安静一下', 'poem'],
                ['想听英文', 'english'],
              ] as Array<[string, string]>
            ).map(([label, f]) => (
              <button
                key={label}
                className="mood"
                onClick={() => {
                  setFilter(f)
                  setQuery('')
                  go('discover')
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="section-head">
            <span className="section-no">04</span>
            <h3>{LABELS.rhythm}</h3>
            <p>{LABELS.rhythmSub}</p>
          </div>
          <Calendar nights={nights} />
        </section>
        <section className="section">
          <div className="section-head">
            <span className="section-no">05</span>
            <h3>{LABELS.memoryTitle}</h3>
            <p>{LABELS.memorySub}</p>
          </div>
          <div className="speech-list">
            {(report?.highlights ?? []).slice(0, 3).map((h, i) => (
              <div className="speech-row" key={i}>
                <div className="avatar">{i === 0 ? '妈' : '桃'}</div>
                <div className="speech">
                  <time>{i === 0 ? '最近' : `+${i} 天`}</time>
                  <p>“{h.text}”</p>
                </div>
              </div>
            ))}
            {(report?.highlights?.length ?? 0) === 0 ? (
              <div className="speech-row">
                <div className="avatar">桃</div>
                <div className="speech">
                  <time>今天</time>
                  <p>一起读过，就会在这里留下一句话。</p>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </>,
      LABELS.today,
      `${LABELS.hello}，${childName}`,
    )
  }

  /* ── 找故事 ── */
  function renderDiscover() {
    const filters: Array<[string, string]> = [
      ['all', LABELS.all],
      ['story', '故事'],
      ['poem', '古诗'],
      ['nature', '自然'],
      ['english', '英文'],
    ]
    return Shell(
      <>
        <div className="search-wrap">
          <input
            id="shelf-search"
            aria-label="搜索书名或作者"
            className="search"
            placeholder={LABELS.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="sticker-btn hot"
            onClick={() => {
              const pick = filteredBooks[Math.floor(Math.random() * Math.max(1, filteredBooks.length))]
              if (pick) void openBook(pick.id)
            }}
          >
            {LABELS.random}
          </button>
        </div>
        <div className="filter-row">
          {filters.map(([k, label]) => (
            <button
              key={k}
              className={`filter ${filter === k && !query.trim() ? 'on' : ''}`}
              onClick={() => {
                setFilter(k)
                setQuery('')
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="library">
          {filteredBooks.map((b) => (
            <StoryCard key={b.id} book={b} onOpen={openBook} onFav={toggleFav} />
          ))}
          {loaded && filteredBooks.length === 0 ? <p className="mono-label">没找到，换个词试试。</p> : null}
        </div>
      </>,
      LABELS.navDiscover,
      LABELS.discoverSub,
    )
  }

  /* ── 我的书架 ── */
  function renderShelf() {
    const tabs: Array<[string, string]> = [
      ['all', LABELS.all],
      ['reading', LABELS.reading],
      ['liked', LABELS.liked],
      ['done', LABELS.done],
    ]
    return Shell(
      <>
        <div className="tabs">
          {tabs.map(([k, label]) => (
            <button key={k} className={`tab ${shelfTab === k ? 'on' : ''}`} onClick={() => setShelfTab(k)}>
              {label}
            </button>
          ))}
        </div>
        <div className="library">
          {shelfBooks.map((b) => (
            <StoryCard key={b.id} book={b} onOpen={openBook} onFav={toggleFav} />
          ))}
          {!loaded ? <p className="mono-label">小桃正在搬书…</p> : null}
        </div>
        <section className="section">
          <div className="section-head">
            <span className="section-no">02</span>
            <h3>我的阅读地图</h3>
            <p>{LABELS.shelfSub}</p>
          </div>
          <Calendar nights={nights} />
        </section>
      </>,
      LABELS.navShelf,
      LABELS.shelfSub,
    )
  }

  /* ── 书籍详情 ── */
  function renderDetail() {
    const b = detail
    if (!b) return null
    const ctaLabel = b.progress > 0 && !b.finished ? LABELS.continueRead : LABELS.start
    return (
      <div className="app">
        <div className="wrap">
          <Mast sub="书籍详情" actions={<button className="sticker-btn" onClick={() => go('shelf')}>{LABELS.back}</button>} />
          <main className="main">
            <div className="detail-grid">
              <div className="detail-cover">
                <div className={`book-cover ${b.tone} ${b.cover ? 'has-art' : ''}`}>
                  {b.cover ? <img className="cover-art" src={b.cover} alt="" loading="lazy" /> : null}
                  <span className="cover-kicker">桃阅读 · 故事</span>
                  <span className="cover-title">{b.title}</span>
                </div>
              </div>
              <div>
                <span className="mono-label">适合一起读</span>
                <div className="detail-title">
                  <span className="marker">{b.title}</span>
                </div>
                <div className="detail-author">
                  {b.author} / {b.meta}
                </div>
                <p className="detail-intro">
                  {b.desc} 这里不用星级给孩子贴“难度”标签，只告诉家庭这本书怎么读会更舒服。
                </p>
                <div className="hero-actions">
                  <button className="sticker-btn primary" onClick={() => void readBook(b.id)}>
                    {ctaLabel}
                  </button>
                  <button className="sticker-btn" onClick={() => void speakPreview(b)}>
                    {LABELS.preview}
                  </button>
                  <button className="sticker-btn" onClick={() => toggleFav(b.id)}>
                    {b.fav ? LABELS.likedAlready : LABELS.like}
                  </button>
                </div>
                <div className="info-stickers">
                  <div className="info">
                    <small>阅读节奏</small>
                    <b>慢慢读</b>
                  </div>
                  <div className="info">
                    <small>陪伴方式</small>
                    <b>轮流读</b>
                  </div>
                  <div className="info">
                    <small>朗读方式</small>
                    <b>大声朗读</b>
                  </div>
                </div>
              </div>
            </div>
            <section className="section">
              <div className="section-head">
                <span className="section-no">02</span>
                <h3>{LABELS.chaptersFrom}</h3>
                <p>{LABELS.chaptersSub}</p>
              </div>
              <div className="chapter-list">
                {chapters.map((c, i) => (
                  <button key={c.order} className="chapter" onClick={() => void readBook(b.id, c.order)}>
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <b>{c.title}</b>
                    <em>{resumeOrder === c.order ? '上次读到这里' : '打开'}</em>
                  </button>
                ))}
              </div>
            </section>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  /* ── 阅读器 ── */
  function renderReader() {
    return (
      <div className={`reader ${theme}`}>
        <header className="reader-top">
          <button onClick={() => go('shelf')}>返回书籍</button>
          <span className="mono-label">
            第 {String(readerOrder).padStart(2, '0')} 章 / {readerBook?.title ?? ''}
          </span>
          <button onClick={() => setSettingsOpen((v) => !v)}>排版</button>
        </header>
        <main className="reader-body">
          <div className="reader-label">第 {readerOrder} 章</div>
          <h2>{chapters.find((c) => c.order === readerOrder)?.title ?? readerBook?.title ?? ''}</h2>
          <div className={`reader-art ${blocks.some((b) => b.kind === 'image') || readerBook?.cover ? 'has-art' : ''}`}>
            {blocks.find((b) => b.kind === 'image')?.artUrl || readerBook?.cover ? (
              <img
                className="cover-art"
                src={blocks.find((b) => b.kind === 'image')?.artUrl ?? readerBook?.cover ?? ''}
                alt=""
                loading="lazy"
              />
            ) : null}
          </div>
          <div className="reader-text" style={{ fontSize: font }}>
            {readerLoading ? <p>故事正在赶来…</p> : null}
            {blocks.map((b, i) => {
              if (b.kind === 'image') return null
              const speaking = speakingIdx >= 0 ? speakingIdx === i : false
              if (b.kind === 'poem' && b.pinyin) {
                return (
                  <p key={b.id} className={speaking ? 'speaking' : ''}>
                    <PoemRuby text={b.text} pinyin={b.pinyin} color="inherit" fontSize={font} />
                  </p>
                )
              }
              return (
                <p key={b.id} className={speaking ? 'speaking' : ''}>
                  {b.text}
                </p>
              )
            })}
          </div>
        </main>
        <footer className="reader-controls">
          <button className="main-action" onClick={() => void speakChapter()}>
            {speakingIdx >= 0 ? LABELS.stopAloud : LABELS.readAloud}
          </button>
          <button onClick={() => setFont((f) => Math.max(18, f - 1))}>小字</button>
          <button onClick={() => setFont((f) => Math.min(30, f + 1))}>大字</button>
          <button onClick={() => setSettingsOpen((v) => !v)}>{LABELS.settings}</button>
          <button onClick={() => void finishRead()}>{LABELS.finish}</button>
        </footer>
        {settingsOpen ? (
          <section className="settings">
            <h3>{LABELS.settings}</h3>
            <div className="setting-row">
              {(
                [
                  ['paper', LABELS.paper],
                  ['sepia', LABELS.sepia],
                  ['night', LABELS.night],
                ] as Array<[V8Theme, string]>
              ).map(([t, label]) => (
                <button key={t} onClick={() => setTheme(t)} style={theme === t ? { background: 'var(--sun)' } : undefined}>
                  {label}
                </button>
              ))}
            </div>
            <div className="setting-row">
              <button onClick={() => setFont((f) => Math.max(18, f - 1))}>{LABELS.smaller}</button>
              <button onClick={() => setFont((f) => Math.min(30, f + 1))}>{LABELS.bigger}</button>
              <span className="mono-label">字号 {font}</span>
            </div>
          </section>
        ) : null}
      </div>
    )
  }

  /* ── 结算 ── */
  function renderFinish() {
    const s = finishStats ?? { minutes: 12, quotes: report?.highlightsTotal ?? 0, times: 1 }
    return (
      <div className="finish">
        <section className="finish-card">
          <span className="mono-label">阅读已保存</span>
          <h2>
            <span className="marker">{LABELS.finishTitle}</span>
          </h2>
          <p>{LABELS.finishCopy}</p>
          <div className="finish-stats">
            <div>
              <small>共读时长</small>
              <b>{s.minutes} 分钟</b>
            </div>
            <div>
              <small>收藏句子</small>
              <b>{s.quotes}</b>
            </div>
            <div>
              <small>本次共读</small>
              <b>{s.times} 次</b>
            </div>
          </div>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <button className="sticker-btn primary" onClick={() => go('home')}>
              {LABELS.backToday}
            </button>
            <button className="sticker-btn" onClick={() => go('shelf')}>
              {LABELS.navShelf}
            </button>
          </div>
        </section>
      </div>
    )
  }

  const html =
    page === 'home'
      ? renderHome()
      : page === 'discover'
        ? renderDiscover()
        : page === 'shelf'
          ? renderShelf()
          : page === 'detail'
            ? renderDetail()
            : page === 'reader'
              ? renderReader()
              : renderFinish()

  return (
    <>
      {html}
      {toastMsg ? <div className="toast">{toastMsg}</div> : null}
      {/* 换家庭入口（产品必需；视觉收敛为 mono 小字，尽量不偏离 demo） */}
      <button
        onClick={onSwitchFamily}
        className="mono-label"
        style={{ position: 'fixed', right: 12, bottom: 10, zIndex: 60, border: 0, background: 'transparent', cursor: 'pointer' }}
      >
        换人
      </button>
    </>
  )
}
