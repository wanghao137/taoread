/**
 * 「贴纸绘本 v8」孩子端外壳 + 数据上下文（2026-09-21 审计整改）。
 * 样式 1:1 复刻 taoread-codex-resets-demo-v8（src/v8.css）；路由化（A4 P1）：
 *   /child/today · /child/discover · /child/my · /child/book/:bookId · /child/book/:bookId/chapter/:order
 * 数据接真实 API；V8Book 保留结构化 lang/category/ageStage（A3.5）。
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { api, type ContentBookDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { AiBadge } from '../../components/art/AiBadge'
import { ReaderPage } from './ReaderPage'
import { FamilyLibraryPage, FamilyReaderPage, PhonicsTrialPage } from './FamilyTrialPages'

export type V8Theme = 'paper' | 'sepia' | 'night'

export interface V8Book {
  id: string
  title: string
  author: string
  /** 结构化业务字段（A3.5：禁止用展示文案反推） */
  lang: 'zh' | 'en'
  category: string
  ageStage: string
  meta: string
  desc: string
  tone: string
  cover: string | null
  progress: number
  finished: boolean
  fav: boolean
  chapterCount: number
}

const TONES = ['mint', 'rose', 'sun', 'orange', 'sky']
function toneOf(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return TONES[h % TONES.length] ?? 'mint'
}

const CATEGORY_LABEL: Record<string, string> = { poetry: '古诗', primer: '蒙学', story: '故事', tale: '童话' }

function toV8(b: ContentBookDto): V8Book {
  return {
    id: b.id,
    title: b.title,
    author: b.author ?? (b.lang === 'en' ? 'English' : '佚名'),
    lang: b.lang === 'en' ? 'en' : 'zh',
    category: b.category,
    ageStage: b.ageStage,
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

export const LABELS = {
  brandSub: '贴纸绘本 · 儿童阅读空间',
  memory: '阅读记忆',
  discover: '找故事',
  navHome: '今天',
  navMy: '我的',
  together: '本周一起读',
  today: '今天想读什么？',
  pick3: '为你挑了三本',
  pickDesc: '不是任务，是三个可以进去看看的世界。',
  mood: '今天想读哪种感觉？',
  moodSub: '先凭感觉，再看分类',
  discoverSub: '先看封面，再决定要不要打开。',
  searchPlaceholder: '搜书名、作者，或者“兔子”“下雨”…',
  random: '帮我挑一本',
  mySub: '正在读、喜欢、读完，还有收下来的词',
  reading: '正在读',
  liked: '喜欢',
  done: '读完',
  words: '生词',
  memoryTab: '阅读记忆',
  all: '全部',
  back: '返回',
  start: '开始读',
  continueRead: '继续读',
  preview: '先听一小段',
  like: '喜欢这本',
  likedAlready: '已喜欢',
  chaptersFrom: '从哪一章开始',
  chaptersSub: '一次只打开一个小故事',
  readAloud: '朗读本章',
  stopAloud: '停止朗读',
  settings: '阅读设置',
  finish: '读完啦',
  paper: '纸白',
  sepia: '护眼',
  night: '夜间',
  smaller: '小一点',
  bigger: '大一点',
  typeset: '排版',
  prevChapter: '← 上一章',
  nextChapter: '下一章 →',
  toc: '目录',
  more: '更多',
  finishTitle: '这一章读完啦',
  finishCopy: '不用积分，也不用连续打卡。今天一起读过的这一小段，已经被好好保存。',
  backToday: '回到今天',
}

/** mood taxonomy（A7 P1）：孩子入口语义，与内容管理 category 解耦 */
export const MOODS: Array<{ key: string; label: string; match: (b: V8Book) => boolean }> = [
  { key: 'funny', label: '想笑一笑', match: (b) => b.meta.includes('故事') },
  { key: 'adventure', label: '想去冒险', match: (b) => b.meta.includes('童话') || b.meta.includes('冒险') },
  { key: 'calm', label: '想安静一下', match: (b) => b.category === 'poetry' },
  { key: 'curious', label: '想知道为什么', match: (b) => b.category === 'primer' || b.desc.includes('自然') },
  { key: 'english', label: '想听英文', match: (b) => b.lang === 'en' },
]

interface V8ContextValue {
  childName: string
  books: V8Book[]
  loaded: boolean
  booksError: string | null
  reloadBooks: () => void
  report: { nights: number; highlightsTotal: number; booksCompleted: number; highlights: Array<{ text: string; source: string }> } | null
  nights: string[]
  toggleFav: (id: string) => void
  openBook: (id: string) => void
  readBook: (id: string, order?: number) => void
  showToast: (m: string) => void
  onSwitchFamily: () => void
  onSwitchChild: () => void
}

const V8Context = createContext<V8ContextValue | null>(null)
export function useV8(): V8ContextValue {
  const v = useContext(V8Context)
  if (!v) throw new Error('V8Context missing')
  return v
}

/** 路由壳 + 数据上下文 */
export function V8App({ childName, onSwitchFamily, onSwitchChild }: { childName: string; onSwitchFamily: () => void; onSwitchChild: () => void }) {
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const stage = useSession((s) => s.childStage)
  const familyId = useSession((s) => s.familyId)
  const navigate = useNavigate()

  const [books, setBooks] = useState<V8Book[]>([])
  const [loaded, setLoaded] = useState(false)
  const [booksError, setBooksError] = useState<string | null>(null)
  const [report, setReport] = useState<V8ContextValue['report']>(null)
  const [nights, setNights] = useState<string[]>([])
  const [toastMsg, setToastMsg] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  const showToast = useCallback((m: string) => {
    setToastMsg(m)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(''), 1400)
  }, [])

  const reloadBooks = useCallback(() => {
    if (!token) return
    setBooksError(null)
    api
      .contentBooks(token, { ...(stage ? { stage } : {}), ...(childId ? { childId } : {}) })
      .then((res) => {
        setBooks(res.books.map(toV8))
        setLoaded(true)
      })
      .catch((err: unknown) => {
        setLoaded(true)
        setBooksError(err instanceof Error ? err.message : '书架暂时打不开')
      })
  }, [token, stage, childId])

  // 审计 A10.5：阅读会改进度，回到列表页时必须重拉书架——
  // 否则卡片上的「读到 N%」停留在进 App 时的旧值，阅读了也不涨
  useEffect(() => {
    if (!['/child', '/child/today', '/child/my', '/child/discover'].includes(location.pathname)) return
    void reloadBooks()
  }, [location.pathname, reloadBooks])

  useEffect(() => {
    if (!token || !familyId) return
    api
      .getSettings(familyId, token)
      .then((dto) => {
        document.documentElement.dataset.calm = dto.calmMode === true ? '1' : ''
      })
      .catch(() => undefined)
  }, [token, familyId])

  useEffect(() => {
    if (!token || !familyId || !childId) return
    api
      .weeklyReport(familyId, token)
      .then(({ report: r }) =>
        setReport({ nights: r.nights, highlightsTotal: r.highlightsTotal, booksCompleted: r.booksCompleted, highlights: r.highlights }),
      )
      .catch(() => setReport(null))
    api
      .achievements(childId, token)
      .then((a) => setNights(a.nightLamps.map((x) => x.unlockedAt)))
      .catch(() => setNights([]))
  }, [token, familyId, childId])

  const toggleFav = useCallback(
    (id: string) => {
      const target = books.find((b) => b.id === id)
      if (!target || !token || !childId) return
      const next = !target.fav
      setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, fav: next } : b)))
      api
        .setFavorite(id, childId, next, token)
        .then(() => showToast(next ? '已放进“喜欢”' : '已从“喜欢”移除'))
        .catch(() => {
          // A3.7：失败必须回滚，不能假装成功
          setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, fav: !next } : b)))
          showToast('没成功，再试一次')
        })
    },
    [books, token, childId, showToast],
  )

  const openBook = useCallback((id: string) => navigate(`/child/book/${id}`), [navigate])
  const readBook = useCallback(
    (id: string, order?: number) => navigate(order && order > 1 ? `/child/book/${id}/chapter/${order}` : `/child/book/${id}/chapter/1`),
    [navigate],
  )

  const ctx = useMemo<V8ContextValue>(
    () => ({
      childName,
      books,
      loaded,
      booksError,
      reloadBooks,
      report,
      nights,
      toggleFav,
      openBook,
      readBook,
      showToast,
      onSwitchFamily,
      onSwitchChild,
    }),
    [childName, books, loaded, booksError, reloadBooks, report, nights, toggleFav, openBook, readBook, showToast, onSwitchFamily, onSwitchChild],
  )

  // 阅读器（章节路由）为沉浸式：隐藏壳层底部导航与换人浮钮，避免遮挡阅读器控制条
  const inReader = /^\/child\/(?:book|family-book)\/[^/]+\/chapter\//.test(location.pathname)

  return (
    <V8Context.Provider value={ctx}>
      <div className="app">
        <div className="wrap">
          <header className="mast">
            <div className="logo">
              <img src="/brand/logo-256.png" alt="桃阅读" />
            </div>
            <div className="brand">
              <h1>桃阅读</h1>
              <p>{LABELS.brandSub}</p>
            </div>
            <div className="mast-actions">
              <button className="sticker-btn" onClick={() => navigate('/child/my')}>
                {LABELS.memory}
              </button>
              <button className="sticker-btn primary" onClick={() => navigate('/child/discover')}>
                {LABELS.discover}
              </button>
            </div>
          </header>
          <div className="layout">
            <aside className="side">
              <p className="side-label">导航</p>
              <nav className="nav">
                {(
                  [
                    ['/child/today', LABELS.navHome],
                    ['/child/discover', LABELS.discover],
                    ['/child/my', LABELS.navMy],
                    ['/child/family-books', '家庭书架'],
                    ['/child/phonics', '英语小练习'],
                  ] as Array<[string, string]>
                ).map(([to, label]) => (
                  <button key={to} className="nav-touch" aria-current={location.pathname === to ? 'page' : undefined} onClick={() => navigate(to)}>
                    {label}
                  </button>
                ))}
              </nav>
              <div className="side-card">
                <b>{LABELS.together}</b>
                <p>本周共读 {report?.nights ?? 0} 次</p>
              </div>
            </aside>
            <main className="main">
              <Routes>
                <Route path="/" element={<TodayPage />} />
                <Route path="/today" element={<TodayPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/family-books" element={<FamilyLibraryPage />} />
                <Route path="/family-book/:id" element={<FamilyReaderPage />} />
                <Route path="/family-book/:id/chapter/:order" element={<FamilyReaderPage />} />
                <Route path="/phonics" element={<PhonicsTrialPage />} />
                <Route path="/book/:bookId" element={<BookDetailPage />} />
                <Route path="/book/:bookId/chapter/:order" element={<ReaderRoute />} />
                <Route path="*" element={<Navigate to="/child/today" replace />} />
              </Routes>
            </main>
          </div>
        </div>
        {/* 阅读器为沉浸式全屏（v8 demo）：章节路由下不渲染底部导航，避免盖住阅读器控制条 */}
        {!inReader ? (
          <nav className="mobile-nav">
            {(
              [
                ['/child/today', LABELS.navHome],
                ['/child/discover', LABELS.discover],
                ['/child/my', LABELS.navMy],
                ['/child/family-books', '家庭书架'],
                ['/child/phonics', '英语小练习'],
              ] as Array<[string, string]>
            ).map(([to, label]) => (
              <button key={to} className="nav-touch" aria-current={location.pathname === to ? 'page' : undefined} onClick={() => navigate(to)}>
                {label}
              </button>
            ))}
          </nav>
        ) : null}
      </div>
      {toastMsg ? <div className="toast">{toastMsg}</div> : null}
      {!inReader ? (
        <button
          onClick={onSwitchChild}
          className="mono-label"
          style={{ position: 'fixed', right: 12, bottom: 10, zIndex: 60, border: 0, background: 'transparent', cursor: 'pointer' }}
        >
          换人
        </button>
      ) : null}
    </V8Context.Provider>
  )
}

export function PageHead({ title, sub, index = '01' }: { title: string; sub: string; index?: string }) {
  return (
    <div className="page-head">
      <span className="page-index">{index} / 桃阅读</span>
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  )
}

/** demo 画框封面：有 AI 图填图（隐藏 CSS 装饰）+ AI 标识；无图保持 CSS 画面 */
export function V8Cover({ book, onFav }: { book: V8Book; onFav: (id: string) => void }) {
  const [artOk, setArtOk] = useState(Boolean(book.cover))
  return (
    <div className={`book-cover ${book.tone} ${artOk ? 'has-art' : ''}`}>
      {book.cover ? (
        <img
          className="cover-art"
          src={book.cover}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setArtOk(true)}
          onError={() => setArtOk(false)}
        />
      ) : null}
      <span className="cover-kicker">桃阅读 · 故事</span>
      <span className="cover-title">{book.title}</span>
      {artOk ? <AiBadge /> : null}
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

export function StoryCard({
  book,
  onOpen,
  onFav,
}: {
  book: V8Book
  onOpen: (id: string) => void
  onFav: (id: string) => void
}) {
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
      <V8Cover book={book} onFav={onFav} />
      <div className="story-meta">
        <b>{book.title}</b>
        <small>
          {book.author} / {book.meta}
          {/* 进度贴纸（审计 A10.5）：读到一半显示「读到 N%」，读完显示「读完啦」 */}
          {book.finished ? ' · 读完啦' : book.progress > 0 ? ` · 读到 ${book.progress}%` : ''}
        </small>
      </div>
    </div>
  )
}

/** 26 周节奏格子（A4 P1 修正时间语义：8 周 × 7 天 = 56 格，一格一天） */
export function Calendar({ nights }: { nights: string[] }) {
  const nightSet = useMemo(() => new Set(nights), [nights])
  const cells = []
  const DAY = 24 * 60 * 60 * 1000
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()
  for (let i = 0; i < 56; i++) {
    const dayStart = todayStart - (55 - i) * DAY
    const key = new Date(dayStart).toISOString().slice(0, 10)
    const localKey = `${new Date(dayStart).getFullYear()}-${String(new Date(dayStart).getMonth() + 1).padStart(2, '0')}-${String(new Date(dayStart).getDate()).padStart(2, '0')}`
    const hit = nightSet.has(localKey) || nightSet.has(key)
    cells.push(<i key={i} className={`cell ${hit ? 'hit' : ''}`} title={localKey} />)
  }
  return (
    <div className="calendar">
      <div className="calendar-top">
        <b>近 8 周阅读足迹</b>
        <span>橙色 = 一起读过</span>
      </div>
      <div className="cells" style={{ gridTemplateColumns: 'repeat(26, 20px)' }}>
        {cells}
      </div>
    </div>
  )
}

/* ── 今天 ── */
function TodayPage() {
  const v = useV8()
  const navigate = useNavigate()
  const continueBook = v.books.find((b) => b.progress > 0 && !b.finished) ?? null
  // 规则推荐（A7 P1 / Phase 5）：未读优先 → 收藏优先 → 同类去重 → 语言搭配，取 3 本
  const picks = useMemo(() => {
    const pool = v.books.filter((b) => b.id !== continueBook?.id)
    const scored = pool
      .map((b) => ({
        b,
        score:
          (b.progress === 0 ? 2 : 0) + (b.fav ? 1 : 0) + (b.lang === 'en' ? 0.5 : 0) + (b.finished ? -2 : 0),
      }))
      .sort((x, y) => y.score - x.score)
    const out: V8Book[] = []
    const seenCat = new Set<string>()
    for (const { b } of scored) {
      if (out.length >= 3) break
      if (seenCat.has(b.category) && out.length < 2 && pool.length > 3) continue
      seenCat.add(b.category)
      out.push(b)
    }
    return out
  }, [v.books, continueBook])
  const firstMemory = v.report?.highlights?.[0] ?? null

  return (
    <>
      <PageHead title={LABELS.today} sub={`${'下午好'}，${v.childName}`} />
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="mono-label">今天的故事 / 继续昨天的故事</span>
            <div className="hero-title">
              <span className="marker">{continueBook ? continueBook.title : '挑一本书开始'}</span>
            </div>
            <p className="hero-copy">{continueBook ? continueBook.desc : '去 找故事 里看看今天有什么。'}</p>
            <div className="hero-actions">
              <button
                className="sticker-btn primary"
                onClick={() => continueBook && v.readBook(continueBook.id, undefined)}
                disabled={!continueBook}
              >
                {LABELS.continueRead}
              </button>
              <button className="sticker-btn" onClick={() => continueBook && v.openBook(continueBook.id)} disabled={!continueBook}>
                看看这本书
              </button>
            </div>
          </div>
          {continueBook ? <V8Cover book={continueBook} onFav={v.toggleFav} /> : null}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <span className="section-no">02</span>
          <h3>
            {v.childName}
            {LABELS.pick3}
          </h3>
          <p>{LABELS.pickDesc}</p>
        </div>
        <div className="story-row">
          {picks.map((b) => (
            <StoryCard key={b.id} book={b} onOpen={v.openBook} onFav={v.toggleFav} />
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <span className="section-no">03</span>
          <h3>{LABELS.mood}</h3>
          <p>{LABELS.moodSub}</p>
        </div>
        <div className="mood-row">
          {MOODS.map((m) => (
            <button
              key={m.key}
              className="mood"
              onClick={() => navigate(`/child/discover?mood=${m.key}`)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <span className="section-no">04</span>
          <h3>最近的家庭阅读记忆</h3>
          <p>我们一起读过的片段</p>
        </div>
        <div className="speech-list">
          {firstMemory ? (
            <div className="speech-row">
              <div className="avatar">家</div>
              <div className="speech">
                <p>“{firstMemory.text}”</p>
              </div>
            </div>
          ) : (
            <div className="speech-row">
              <div className="avatar">桃</div>
              <div className="speech">
                <p>一起读过，就会在这里留下一句话。</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

/* ── 找故事 ── */
function DiscoverPage() {
  const v = useV8()
  const token = useSession((s) => s.token)
  const stage = useSession((s) => s.childStage)
  const childId = useSession((s) => s.childId)
  const [params] = useState(() => new URLSearchParams(window.location.search))
  const [moodKey, setMoodKey] = useState<string | null>(params.get('mood'))
  const [query, setQuery] = useState('')
  const [langFilter, setLangFilter] = useState<'all' | 'zh' | 'en'>('all')
  const [serverHits, setServerHits] = useState<V8Book[] | null>(null)
  const [visible, setVisible] = useState(60)
  // Phase 5：≥2 字走服务端搜索（含章节标题命中，审计 A4「后端章节搜索被 V8 丢失」）
  useEffect(() => {
    const q = query.trim()
    if (q.length < 2 || !token) {
      setServerHits(null)
      return
    }
    const t = setTimeout(() => {
      api
        .contentBooks(token, { ...(stage ? { stage } : {}), ...(childId ? { childId } : {}), q })
        .then((res) => setServerHits(res.books.map(toV8)))
        .catch(() => setServerHits(null))
    }, 300)
    return () => clearTimeout(t)
  }, [query, token, stage, childId])
  const filtered = useMemo(() => {
    if (serverHits) return serverHits
    const q = query.trim().toLowerCase()
    let arr = v.books
    if (q) return arr.filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(q))
    const mood = MOODS.find((m) => m.key === moodKey)
    if (mood) arr = arr.filter(mood.match)
    if (langFilter !== 'all') arr = arr.filter((b) => b.lang === langFilter)
    return arr
  }, [v.books, query, moodKey, langFilter, serverHits])

  return (
    <>
      <PageHead title={LABELS.discover} sub={LABELS.discoverSub} index="02" />
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
            const pick = filtered[Math.floor(Math.random() * Math.max(1, filtered.length))]
            if (pick) v.openBook(pick.id)
          }}
        >
          {LABELS.random}
        </button>
      </div>
      <div className="filter-row">
        <button className={`filter ${!moodKey && langFilter === 'all' ? 'on' : ''}`} onClick={() => { setMoodKey(null); setLangFilter('all') }}>
          {LABELS.all}
        </button>
        {MOODS.map((m) => (
          <button
            key={m.key}
            className={`filter ${moodKey === m.key ? 'on' : ''}`}
            onClick={() => { setMoodKey(m.key); setLangFilter('all') }}
          >
            {m.label}
          </button>
        ))}
        <button className={`filter ${langFilter === 'en' ? 'on' : ''}`} onClick={() => { setMoodKey(null); setLangFilter('en') }}>
          英文
        </button>
      </div>
      <div className="library">
        {!v.loaded ? (
          <div>
            <p className="mono-label">书架赶来中…</p>
            <button className="sticker-btn" style={{ marginTop: 8 }} onClick={v.reloadBooks}>
              刷新书架
            </button>
          </div>
        ) : null}
        {v.booksError ? (
          <div>
            <p className="mono-label">{v.booksError}</p>
            <button className="sticker-btn" onClick={v.reloadBooks}>
              再试一次
            </button>
          </div>
        ) : null}
        {v.loaded && !v.booksError && filtered.length === 0 ? <p className="mono-label">没找到，换个词试试。</p> : null}
        {filtered.slice(0, visible).map((b) => (
          <StoryCard key={b.id} book={b} onOpen={v.openBook} onFav={v.toggleFav} />
        ))}
        {filtered.length > visible ? (
          <button className="sticker-btn" style={{ gridColumn: '1 / -1' }} onClick={() => setVisible((n) => n + 60)}>
            再看 60 本
          </button>
        ) : null}
      </div>
    </>
  )
}

/* ── 我的 ── */
function MyPage() {
  const v = useV8()
  const [tab, setTab] = useState<'reading' | 'liked' | 'done' | 'words' | 'memory'>('reading')
  const [words, setWords] = useState<Array<{ id: string; word: string; lang: string; context: string | null; bookTitle: string | null }>>([])
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)

  useEffect(() => {
    if (tab !== 'words' || !token || !childId) return
    api
      .listWords(childId, token)
      .then((res) => setWords(res.cards.map((c) => ({ id: c.id, word: c.word, lang: c.lang, context: c.context ?? null, bookTitle: c.bookTitle ?? null }))))
      .catch(() => setWords([]))
  }, [tab, token, childId])

  const lists = {
    reading: v.books.filter((b) => b.progress > 0 && !b.finished),
    liked: v.books.filter((b) => b.fav),
    done: v.books.filter((b) => b.finished),
  }
  const tabs: Array<[typeof tab, string]> = [
    ['reading', LABELS.reading],
    ['liked', LABELS.liked],
    ['done', LABELS.done],
    ['words', LABELS.words],
    ['memory', LABELS.memoryTab],
  ]
  const arr = tab === 'reading' || tab === 'liked' || tab === 'done' ? lists[tab] : []

  return (
    <>
      <PageHead title={LABELS.navMy} sub={LABELS.mySub} index="03" />
      <div className="tabs">
        {tabs.map(([k, label]) => (
          <button key={k} className={`tab ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'words' ? (
        words.length === 0 ? (
          <p className="mono-label">还没有收下生词。阅读时看到「收下这个词」就能收进来。</p>
        ) : (
          <div className="speech-list">
            {words.map((w) => (
              <div className="speech-row" key={w.id}>
                <div className="avatar">{w.lang === 'en' ? 'EN' : '词'}</div>
                <div className="speech">
                  <p>
                    <b>{w.word}</b>
                    {w.bookTitle ? <span className="mono-label"> · 《{w.bookTitle}》</span> : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : tab === 'memory' ? (
        <>
          <Calendar nights={v.nights} />
          <div className="speech-list" style={{ marginTop: 18 }}>
            {(v.report?.highlights ?? []).map((h, i) => (
              <div className="speech-row" key={i}>
                <div className="avatar">家</div>
                <div className="speech">
                  <p>“{h.text}”</p>
                </div>
              </div>
            ))}
            {(v.report?.highlights?.length ?? 0) === 0 ? (
              <p className="mono-label">一起读过，就会在这里留下一句话。</p>
            ) : null}
          </div>
        </>
      ) : (
        <div className="library">
          {arr.map((b) => (
            <StoryCard key={b.id} book={b} onOpen={v.openBook} onFav={v.toggleFav} />
          ))}
          {v.loaded && arr.length === 0 ? <p className="mono-label">这里还空着，去 找故事 逛逛。</p> : null}
        </div>
      )}
    </>
  )
}

/* ── 详情 ── */
function BookDetailPage() {
  const v = useV8()
  const { bookId } = useParams()
  const navigate = useNavigate()
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const book = v.books.find((b) => b.id === bookId) ?? null
  const [chapters, setChapters] = useState<Array<{ order: number; title: string }>>([])
  const [resumeOrder, setResumeOrder] = useState(0)
  const [previewing, setPreviewing] = useState(false)

  useEffect(() => {
    if (!bookId || !token) return
    api
      .contentChapterList(bookId, token)
      .then((res) => setChapters(res.chapters))
      .catch(() => setChapters([]))
  }, [bookId, token])

  useEffect(() => {
    if (!bookId || !childId || !token) return
    api
      .contentProgress(bookId, childId, token)
      .then((res) => setResumeOrder(res.progress.finished ? 0 : res.progress.chapterOrder))
      .catch(() => undefined)
  }, [bookId, childId, token])

  if (!v.loaded) {
    // 书架列表还没加载完：此时不能断定“书不存在”（修复：错误/加载中伪装成 404）
    return (
      <div className="app">
        <div className="wrap">
          <PageHead title="书籍赶来中…" sub="马上就好" index="02" />
          <button className="sticker-btn" onClick={() => v.reloadBooks()}>
            重新加载
          </button>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="app">
        <div className="wrap">
          <PageHead title="这本书不在这棵桃树上" sub="可能还没有对你开放，去 找故事 看看别的。" index="02" />
          <button className="sticker-btn" onClick={() => navigate('/child/discover')}>
            {LABELS.back}
          </button>
        </div>
      </div>
    )
  }

  const speakPreview = async () => {
    if (!token || previewing) return
    setPreviewing(true)
    try {
      const res = await api.contentChapter(book.id, 1, token)
      const text = res.chapter.blocks
        .filter((x) => x.kind === 'text' || x.kind === 'poem')
        .map((x) => x.text)
        .join('\n')
        .slice(0, 120)
      const { audioPlayer } = await import('../../lib/audioPlayer')
      const { tts } = await import('../../lib/tts')
      const ok = await audioPlayer.speak(text, { lang: book.lang })
      if (!ok) tts.speak(text, { lang: book.lang })
    } catch {
      /* 试听失败静默（toast 不打断） */
    } finally {
      setPreviewing(false)
    }
  }

  return (
    <div className="app">
      <div className="wrap">
        <header className="mast">
          <div className="logo">
            <img src="/brand/logo-256.png" alt="桃阅读" />
          </div>
          <div className="brand">
            <h1>桃阅读</h1>
            <p>书籍详情</p>
          </div>
          <div className="mast-actions">
            <button className="sticker-btn" onClick={() => navigate(-1)}>
              {LABELS.back}
            </button>
          </div>
        </header>
        <main className="main">
          <div className="detail-grid">
            <div className="detail-cover">
              <div className={`book-cover ${book.tone} ${book.cover ? 'has-art' : ''}`}>
                {book.cover ? <img className="cover-art" src={book.cover} alt="" loading="lazy" /> : null}
                <span className="cover-kicker">桃阅读 · 故事</span>
                <span className="cover-title">{book.title}</span>
                {book.cover ? <AiBadge /> : null}
              </div>
            </div>
            <div>
              <span className="mono-label">适合一起读</span>
              <div className="detail-title">
                <span className="marker">{book.title}</span>
              </div>
              <div className="detail-author">
                {book.author} / {book.meta}
              </div>
              <p className="detail-intro">
                {book.desc} 这里不用星级给孩子贴“难度”标签，只告诉家庭这本书怎么读会更舒服。
              </p>
              <div className="hero-actions">
                <button className="sticker-btn primary" onClick={() => v.readBook(book.id, resumeOrder || undefined)}>
                  {book.progress > 0 && !book.finished ? LABELS.continueRead : LABELS.start}
                </button>
                <button className="sticker-btn" onClick={() => void speakPreview()}>
                  {previewing ? '正在合成…' : LABELS.preview}
                </button>
                <button className="sticker-btn" onClick={() => v.toggleFav(book.id)}>
                  {book.fav ? LABELS.likedAlready : LABELS.like}
                </button>
              </div>
              <div className="info-stickers">
                <div className="info">
                  <small>每章大约</small>
                  <b>一个小故事</b>
                </div>
                <div className="info">
                  <small>{book.lang === 'en' ? '语言' : '拼音'}</small>
                  <b>{book.lang === 'en' ? '英文' : '带拼音'}</b>
                </div>
                <div className="info">
                  <small>朗读方式</small>
                  <b>支持朗读</b>
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
                <button key={c.order} className="chapter" onClick={() => v.readBook(book.id, c.order)}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <b>{c.title}</b>
                  <em>{resumeOrder === c.order ? '上次读到这里' : '打开'}</em>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
      <nav className="mobile-nav">
        <button onClick={() => navigate('/child/today')}>{LABELS.navHome}</button>
        <button onClick={() => navigate('/child/discover')}>{LABELS.discover}</button>
        <button onClick={() => navigate('/child/my')}>{LABELS.navMy}</button>
      </nav>
    </div>
  )
}

/* ── 阅读器路由页（能力在 ReaderPage，V8 画框与语言传入） ── */
function ReaderRoute() {
  const { bookId, order } = useParams()
  const v = useV8()
  const book = v.books.find((b) => b.id === bookId) ?? null
  if (!book) {
    return (
      <div className="app">
        <div className="wrap">
          <PageHead title="先去挑一本书" sub="这本还不在书架上。" />
          <button className="sticker-btn" onClick={() => v.openBook(bookId ?? '')}>
            去看这本书
          </button>
        </div>
      </div>
    )
  }
  return <ReaderPage key={`${book.id}:${order}`} book={book} order={Number(order ?? 1) || 1} />
}
