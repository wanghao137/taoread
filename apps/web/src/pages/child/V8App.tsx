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
import { Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { api, type ContentBookDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { audioPlayer } from '../../lib/audioPlayer'
import { tts } from '../../lib/tts'
import { AiBadge } from '../../components/art/AiBadge'
import { haptic } from '../../lib/haptics'
import { Dialog } from '../../components/ui/Dialog'
import { saveOfflineBook } from '../../lib/offline'
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
  /** 公共书库缩图外链（性能方案）；null/加载失败回退 cover */
  coverThumb: string | null
  progress: number
  finished: boolean
  fav: boolean
  chapterCount: number
  words: number
  contentVersion: string
  /** 续读章序 / 最近读时间 / 难度徽章（docs/34 P0-4、P1-7） */
  resumeChapter: number | null
  lastReadAt: string | null
  difficulty: 'easy' | 'fit' | 'stretch'
}

const TONES = ['mint', 'rose', 'sun', 'orange', 'sky']
function toneOf(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return TONES[h % TONES.length] ?? 'mint'
}

const CATEGORY_LABEL: Record<string, string> = {
  poetry: '古诗',
  primer: '蒙学',
  story: '故事',
  tale: '童话',
  science: '科学',
}

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
    coverThumb: b.coverThumbUrl ?? null,
    progress: b.progress,
    finished: b.finished,
    fav: b.favorite,
    chapterCount: b.chapterCount,
    words: b.words,
    contentVersion: b.contentVersion ?? 'legacy',
    resumeChapter: b.resumeChapter ?? null,
    lastReadAt: b.lastReadAt ?? null,
    difficulty: b.difficulty ?? 'fit',
  }
}

export const LABELS = {
  brandSub: '贴纸绘本 · 儿童阅读空间',  memory: '阅读记忆',
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
  searchPlaceholder: '搜书名、作者，或章节标题…',
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
  sepia: '暖纸',
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

/** mood taxonomy（A7 P1）：孩子入口语义，与内容管理 category 解耦。
 * match 一律用结构化字段（category/lang）——此前用展示文案 meta.includes('故事')
 * 反推，文案一改分类就悄悄失效（A3.5 红线）。 */
export const MOODS: Array<{ key: string; label: string; match: (b: V8Book) => boolean }> = [
  { key: 'funny', label: '想笑一笑', match: (b) => b.category === 'story' },
  { key: 'adventure', label: '想去冒险', match: (b) => b.category === 'tale' },
  { key: 'calm', label: '想安静一下', match: (b) => b.category === 'poetry' },
  { key: 'curious', label: '想知道为什么', match: (b) => b.category === 'primer' || b.category === 'science' },
  { key: 'english', label: '想听英文', match: (b) => b.lang === 'en' },
]

/** 结算心情（与服务端 MOODS 枚举对齐；纸质书收尾浮层用） */
const FINISH_MOODS: Array<[string, string]> = [
  ['happy', '开心'],
  ['excited', '惊喜'],
  ['calm', '安静'],
  ['curious', '好奇'],
  ['thinking', '想一想'],
]

/** docs/34 P0-6：成就解锁反馈——finishCosession 回包里的 unlocked 此前被丢弃，
 * 现在解锁时给文案 + 专属触感（纪念式，无积分无兑换）。 */
export function announceUnlocked(
  unlocked: Array<{ kind: string; value: number }> | undefined,
  showToast: (m: string) => void,
): void {
  if (!unlocked || unlocked.length === 0) return
  const labels: Record<string, string> = {
    night_lamp: '夜灯',
    streak_best: '连读纪录',
    book_done: '读完一本书',
  }
  for (const u of unlocked) {
    showToast(`解锁新成就：${labels[u.kind] ?? u.kind} × ${u.value}`)
  }
  haptic('achievement')
}

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
    toastTimer.current = setTimeout(() => setToastMsg(''), 4000)
  }, [])

  // 卸载时清掉未触发的 toast 定时器，避免卸载后 setState
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
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

  // 审计 A10.5 的初衷保留：读完回列表要看到新进度——但触发点收窄为
  // 「从阅读器/家庭书返回列表页」（docs/35 B2：此前每次切 tab 全量重拉 178KB，
  // 孩子 today→discover→my 逛一圈 = 4 次全量请求；现改为定向刷新 + 60s 节流兜底）
  const lastFetchRef = useRef(0)
  const prevPathRef = useRef('')
  useEffect(() => {
    const listRoutes = ['/child', '/child/today', '/child/my', '/child/discover']
    if (!listRoutes.includes(location.pathname)) {
      prevPathRef.current = location.pathname
      return
    }
    // 对抗审查 P2-4：来源判定泛化——「从任何非列表路由回到列表」都定向刷新
    // （覆盖阅读器→详情页→返回 的最常见浏览路径；chapter 路由本身也属非列表）
    const cameFromElsewhere = prevPathRef.current !== '' && !listRoutes.includes(prevPathRef.current)
    prevPathRef.current = location.pathname
    if (cameFromElsewhere || Date.now() - lastFetchRef.current > 60_000) {
      lastFetchRef.current = Date.now()
      void reloadBooks()
    }
  }, [location.pathname, reloadBooks])
  // 回前台且距上次拉取 >60s 时静默刷新（家长在另一端屏蔽/孩子换设备读完的场景）
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetchRef.current > 60_000) {
        lastFetchRef.current = Date.now()
        void reloadBooks()
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [reloadBooks])

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
  const inReader = /^\/child\/book\/[^/]+\/chapter\//.test(location.pathname) || /^\/child\/family-book\//.test(location.pathname)

  return (
    <V8Context.Provider value={ctx}>
      <div className={`app ${inReader ? 'reading-layout' : ''}`}>
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
              <button className="sticker-btn keep" onClick={onSwitchChild}>
                {childName} · 换人
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
            <main className="main" id="main-content">
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
              ] as Array<[string, string]>
            ).map(([to, label]) => (
              <button key={to} className="nav-touch" aria-current={location.pathname === to ? 'page' : undefined} onClick={() => navigate(to)}>
                {label}
              </button>
            ))}
          </nav>
        ) : null}
      </div>
      {toastMsg ? (
        <div className="toast" role="status" aria-live="polite">
          {toastMsg}
        </div>
      ) : null}
    </V8Context.Provider>
  )
}

export function PageHead({ title, sub, index = '01' }: { title: string; sub: string; index?: string }) {
  return (
    <div className="page-head">
      <span className="page-index" aria-hidden="true">{index} / 桃阅读</span>
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  )
}

/** demo 画框封面：有 AI 图填图（隐藏 CSS 装饰）+ AI 标识；无图保持 CSS 画面。
 * 缩图档优先（性能方案阶段 1）：thumb 加载失败静默回退原档。
 * onOpen 传入时封面整体可点开（替代旧 role=button 外壳，收藏钮不再嵌套在按钮里）。 */
export function V8Cover({
  book,
  onFav,
  onOpen,
}: {
  book: V8Book
  onFav: (id: string) => void
  onOpen?: (id: string) => void
}) {
  const [fallback, setFallback] = useState(false)
  const src = !fallback && book.coverThumb ? book.coverThumb : book.cover
  const [artOk, setArtOk] = useState(Boolean(src))
  const [artLoaded, setArtLoaded] = useState(false)
  useEffect(() => setArtLoaded(false), [src])
  return (
    <div className={`book-cover ${book.tone} ${artOk && artLoaded ? 'has-art' : ''}`}>
      {src && artOk ? (
        <img
          className="cover-art"
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => { setArtOk(true); setArtLoaded(true) }}
          onError={() => {
            if (!fallback && book.coverThumb) setFallback(true)
            else setArtOk(false)
          }}
        />
      ) : null}
      <span className="cover-kicker">桃阅读 · {CATEGORY_LABEL[book.category] ?? (book.lang === 'en' ? 'Story' : '故事')}</span>
      <span className="cover-title">{book.title}</span>
      {artOk && artLoaded ? <AiBadge /> : null}
      {/* 打开热区铺满封面（键盘可达）；收藏钮 z-index 更高，两者互不嵌套（读屏不再报「按钮内按钮」） */}
      {onOpen ? (
        <button
          type="button"
          aria-label={`打开《${book.title}》`}
          onClick={() => onOpen(book.id)}
          style={{ position: 'absolute', inset: 0, zIndex: 3, border: 0, background: 'transparent', cursor: 'pointer', padding: 0 }}
        />
      ) : null}
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
    <div className="story-card">
      <V8Cover book={book} onFav={onFav} onOpen={onOpen} />
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

/** 8 周阅读足迹（A4 P1 修正时间语义：8 周 × 7 天 = 56 格，一格一天，7 列 × 8 行） */
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
    cells.push(<i key={i} className={`cell ${hit ? 'hit' : ''}`} title={localKey} aria-label={`${localKey}${hit ? '，一起读过' : ''}`} />)
  }
  return (
    <div className="calendar">
      <div className="calendar-top">
        <b>近 8 周阅读足迹</b>
        <span>橙色 = 一起读过</span>
      </div>
      <div className="cells" style={{ gridTemplateColumns: 'repeat(7, 20px)', minWidth: 170 }}>
        {cells}
      </div>
    </div>
  )
}

/* ── 今天 ── */
/** 按本地时间问候（此前硬编码「下午好」，凌晨打开也是下午好） */
function greetingNow(now: Date = new Date()): string {
  const h = now.getHours()
  if (h >= 5 && h < 11) return '早上好'
  if (h >= 11 && h < 13) return '中午好'
  if (h >= 13 && h < 18) return '下午好'
  return '晚上好'
}

function TodayPage() {
  const v = useV8()
  const navigate = useNavigate()
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  // docs/34 P0-4：「继续读」= 最近读的那本（按进度上报时间），而不是书架序里第一本在读
  const inProgress = v.books.filter((b) => b.progress > 0 && !b.finished)
  const continueBook =
    inProgress.slice().sort((a, b) => (b.lastReadAt ?? '').localeCompare(a.lastReadAt ?? ''))[0] ?? null
  // 规则推荐（A7 P1 / docs/34 P1-9）：未读优先 → 收藏优先 → 中文书优先 → 读过的降权；
  // 新增孩子维度：难度「刚好」加分 + 读过同类书的画像偏好加分（纯本地统计，零成本）
  const startedByCat = useMemo(() => {
    const map = new Map<string, number>()
    for (const b of v.books) {
      if (b.progress > 0) map.set(b.category, (map.get(b.category) ?? 0) + 1)
    }
    return map
  }, [v.books])
  const picks = useMemo(() => {
    const pool = v.books.filter((b) => b.id !== continueBook?.id)
    const scored = pool
      .map((b) => ({
        b,
        score:
          (b.progress === 0 ? 2 : 0) +
          (b.fav ? 1 : 0) +
          (b.lang === 'zh' ? 0.5 : 0) +
          (b.finished ? -2 : 0) +
          (b.difficulty === 'fit' ? 0.5 : 0) +
          ((startedByCat.get(b.category) ?? 0) > 0 ? 0.5 : 0),
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
  }, [v.books, continueBook, startedByCat])
  const firstMemory = v.report?.highlights?.[0] ?? null

  // ── 纸质书共读（docs/34 P0-1）：今晚读纸书的孩子端入口 ──
  const [paper, setPaper] = useState<{ id: string; title: string } | null>(null)
  const [paperTitle, setPaperTitle] = useState('')
  const [paperBusy, setPaperBusy] = useState(false)
  const [finishOpen, setFinishOpen] = useState(false)
  const [finishMood, setFinishMood] = useState<string | null>(null)
  // ── 每日阅读提醒（docs/34 P1-2）：到点温柔收尾，不强制 ──
  const [windowMode, setWindowMode] = useState<'open' | 'daily_limit'>('open')
  const [usage, setUsage] = useState<{ usedMin: number | null; limitMin: number | null }>({ usedMin: null, limitMin: null })
  const [limitAcked, setLimitAcked] = useState(false)

  const loadPaperAndWindow = useCallback(() => {
    if (!token || !childId) return
    api
      .activeCosession(childId, token)
      .then(({ session }) => {
        setPaper(session?.paperTitle ? { id: session.id, title: session.paperTitle } : null)
      })
      .catch(() => undefined)
    api
      .ritualWindow(childId, token)
      .then((w) => {
        setWindowMode(w.mode === 'daily_limit' ? 'daily_limit' : 'open')
        setUsage({ usedMin: w.usedMin, limitMin: w.limitMin })
      })
      .catch(() => undefined)
  }, [token, childId])

  useEffect(() => {
    loadPaperAndWindow()
  }, [loadPaperAndWindow])

  const startPaper = async () => {
    const title = paperTitle.trim()
    if (!title || !token || !childId || paperBusy) return
    setPaperBusy(true)
    try {
      const session = await api.startPaperCosession(childId, title, token)
      setPaper({ id: session.id, title })
      setPaperTitle('')
      v.showToast('共读开始，和爸爸妈妈一起读吧')
    } catch (err) {
      v.showToast(err instanceof Error ? err.message : '没成功，再试一次')
    } finally {
      setPaperBusy(false)
    }
  }

  const finishPaper = async (progressMark: 'lot' | 'done') => {
    if (!paper || !token) return
    setPaperBusy(true)
    try {
      const result = await api.finishCosession(paper.id, { progressMark, ...(finishMood ? { mood: finishMood } : {}) }, token)
      setFinishOpen(false)
      setPaper(null)
      setFinishMood(null)
      announceUnlocked(result.unlocked, v.showToast)
      loadPaperAndWindow()
    } catch (err) {
      v.showToast(err instanceof Error ? err.message : '没成功，再试一次')
    } finally {
      setPaperBusy(false)
    }
  }

  return (
    <>
      <PageHead title={LABELS.today} sub={`${greetingNow()}，${v.childName}`} />
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
                onClick={() => continueBook ? v.readBook(continueBook.id, continueBook.resumeChapter ?? undefined) : navigate('/child/discover')}
                disabled={!v.loaded}
              >
                {continueBook ? LABELS.continueRead : '挑一本开始'}
              </button>
              {continueBook && <button className="sticker-btn" onClick={() => v.openBook(continueBook.id)}>
                看看这本书
              </button>}
            </div>
          </div>
          {continueBook ? <V8Cover book={continueBook} onFav={v.toggleFav} /> : null}
        </div>
      </section>
      {windowMode === 'daily_limit' && !limitAcked ? (
        <section className="section" role="status">
          <div className="side-card" style={{ borderColor: '#FFD97A' }}>
            <b>🌙 今天的阅读时间到啦</b>
            <p>
              已经读了 {usage.usedMin ?? 0} 分钟（家长约定 {usage.limitMin ?? 0} 分钟）。小眼睛该休息了，明天再一起读吧！
            </p>
            <button className="sticker-btn" onClick={() => setLimitAcked(true)}>
              我知道啦
            </button>
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="section-head">
          <span className="section-no">02</span>
          <h3>
            给你的推荐 · {picks.length} 本
          </h3>
          <p>未读、收藏和读过的类别，帮你发现下一本。</p>
        </div>
        <div className="story-row">
          {picks.map((b) => (
            <StoryCard key={b.id} book={b} onOpen={v.openBook} onFav={v.toggleFav} />
          ))}
        </div>
      </section>
      <section className="section paper-entry">
        <div className="section-head">
          <span className="section-no">05</span>
          <h3>今晚读纸质书？</h3>
          <p>纸质书也一起记进共读足迹</p>
        </div>
        {paper ? (
          <div className="side-card">
            <b>正在共读《{paper.title}》</b>
            <p>和爸爸妈妈读完，回来收尾今天的共读，就会被好好记住。</p>
            <button className="sticker-btn primary" onClick={() => setFinishOpen(true)}>
              读完收尾
            </button>
          </div>
        ) : (
          <div className="search-wrap">
            <input
              className="search"
              aria-label="纸质书书名"
              placeholder="输入今晚纸质书的名字…"
              value={paperTitle}
              maxLength={120}
              onChange={(e) => setPaperTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void startPaper()
              }}
            />
            <button className="sticker-btn hot" onClick={() => void startPaper()} disabled={paperBusy || !paperTitle.trim()}>
              {paperBusy ? '开始中…' : '开始共读'}
            </button>
          </div>
        )}
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
              aria-label={`${m.label}，去书架挑一本`}
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
      <section className="section"><div className="hero-actions">
        <button className="sticker-btn" onClick={() => navigate('/child/family-books')}>家庭书架</button>
        <button className="sticker-btn" onClick={() => navigate('/child/phonics')}>英语练习 · 内测</button>
      </div></section>
      {finishOpen && paper ? (
        <Dialog label="纸质书共读收尾" onClose={() => setFinishOpen(false)}>
          <div className="side-card" style={{ maxWidth: 420, width: '100%', background: '#FFFDF8' }}>
            <b>《{paper.title}》读得怎么样？</b>
            <div className="mood-row" role="group" aria-label="今晚的心情">
              {FINISH_MOODS.map(([key, label]) => (
                <button
                  key={key}
                  className="mood"
                  aria-pressed={finishMood === key}
                  onClick={() => setFinishMood(key)}
                >
                  {label}
                  {finishMood === key ? ' ✓' : ''}
                </button>
              ))}
            </div>
            <div className="hero-actions" style={{ marginTop: 12 }}>
              <button className="sticker-btn" disabled={paperBusy} onClick={() => void finishPaper('lot')}>
                读了一段
              </button>
              <button className="sticker-btn primary" disabled={paperBusy} onClick={() => void finishPaper('done')}>
                读完整本
              </button>
              <button
                className="mono-label"
                style={{ border: 0, background: 'transparent', cursor: 'pointer' }}
                onClick={() => setFinishOpen(false)}
              >
                还没读完
              </button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  )
}

/* ── 找故事 ── */
function DiscoverPage() {
  const v = useV8()
  const token = useSession((s) => s.token)
  const stage = useSession((s) => s.childStage)
  const childId = useSession((s) => s.childId)
  // mood 以 URL 为单一事实源：从「今天」心情贴纸进来带 ?mood=，点头部「找故事」
  // （无参数）自然清掉旧筛选，不再出现" mood 卡在旧值"
  const [searchParams, setSearchParams] = useSearchParams()
  const moodKey = searchParams.get('mood')
  // docs/41：书单收纳入口的展开态
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  // docs/41 修复 1 根因：chip 点击要同时清/设多个条件，若连续两次 setSearchParams，
  // 第二次会用本渲染的旧 searchParams 快照构建参数，把第一次写入的 mood 覆盖掉——
  // 这正是「想笑一笑点了没反应」的真凶。所有 chip 一律走 applyFilters 一次成型。
  const applyFilters = (patch: { mood?: string | null; collection?: string | null; lang?: 'all' | 'zh' | 'en' }) => {
    const next = new URLSearchParams(searchParams)
    if (patch.mood !== undefined) {
      if (patch.mood) next.set('mood', patch.mood)
      else next.delete('mood')
    }
    if (patch.collection !== undefined) {
      if (patch.collection) next.set('collection', patch.collection)
      else next.delete('collection')
    }
    if (patch.lang !== undefined) setLangFilter(patch.lang)
    setSearchParams(next, { replace: true })
  }
  const [query, setQuery] = useState('')
  const [langFilter, setLangFilter] = useState<'all' | 'zh' | 'en'>('all')
  const [serverHits, setServerHits] = useState<V8Book[] | null>(null)
  const [visible, setVisible] = useState(60)
  // docs/34 P1-12：主题书单（URL 单一事实源，与 mood 同模式）
  const [collections, setCollections] = useState<Array<{ id: string; title: string; subtitle: string; total: number }>>([])
  const [collectionBooks, setCollectionBooks] = useState<V8Book[] | null>(null)
  const [collectionError, setCollectionError] = useState(false)
  const [collectionRetry, setCollectionRetry] = useState(0)
  const collectionKey = searchParams.get('collection')
  useEffect(() => {
    if (!token) return
    api
      .collections(token)
      .then((r) => setCollections(r.collections))
      .catch(() => undefined)
  }, [token])
  useEffect(() => {
    let alive = true
    if (!collectionKey || !token || !childId) {
      setCollectionBooks(null)
      return
    }
    setCollectionBooks(null)
    setCollectionError(false)
    api
      .collectionBooks(collectionKey, childId, token)
      .then((r) => { if (alive) setCollectionBooks(r.books.map(toV8)) })
      .catch(() => { if (alive) setCollectionError(true) })
    return () => { alive = false }
  }, [collectionKey, token, childId, collectionRetry])
  // docs/41 修复 1b：筛选激活时的醒目结果条（放 collectionKey 声明后防 TDZ）
  const activeFilter = useMemo(() => {
    const mood = MOODS.find((m) => m.key === moodKey)
    if (mood) return { label: mood.label }
    const coll = collections.find((c) => c.id === collectionKey)
    if (coll) return { label: `书单 · ${coll.title}` }
    return null
  }, [moodKey, collections, collectionKey])
  const clearAllFilters = () => {
    applyFilters({ mood: null, collection: null, lang: 'all' })
  }
  // Phase 5：≥2 字走服务端搜索（含章节标题命中，审计 A4「后端章节搜索被 V8 丢失」）
  const searchSeq = useRef(0)
  useEffect(() => {
    const seq = ++searchSeq.current
    setServerHits(null)
    const q = query.trim()
    if (q.length < 2 || !token) {
      setServerHits(null)
      return
    }
    const t = setTimeout(() => {
      api
        .contentBooks(token, { ...(stage ? { stage } : {}), ...(childId ? { childId } : {}), q })
        .then((res) => {
          // 慢响应防护：只认最后一次搜索的结果，防旧词覆盖新词
          if (seq === searchSeq.current) setServerHits(res.books.map(toV8))
        })
        .catch(() => {
          if (seq === searchSeq.current) setServerHits(null)
        })
    }, 300)
    return () => { clearTimeout(t); searchSeq.current = seq + 1 }
  }, [query, token, stage, childId])
  const filtered = useMemo(() => {
    // 书单模式：只看书单内书目（服务端已按孩子适龄过滤）
    const q = query.trim().toLowerCase()
    let arr = collectionKey ? collectionBooks ?? [] : serverHits ?? v.books
    if (collectionKey && serverHits) {
      const ids = new Set(serverHits.map((b) => b.id))
      arr = arr.filter((b) => ids.has(b.id))
    } else if (q && !serverHits) arr = arr.filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(q))
    const mood = MOODS.find((m) => m.key === moodKey)
    if (mood) arr = arr.filter(mood.match)
    if (langFilter !== 'all') arr = arr.filter((b) => b.lang === langFilter)
    return arr
  }, [v.books, query, moodKey, langFilter, serverHits, collectionKey, collectionBooks])

  return (
    <>
      <PageHead title={LABELS.discover} sub={LABELS.discoverSub} index="02" />
      {collectionKey && !collectionBooks && <p role={collectionError ? 'alert' : 'status'}>
        {collectionError ? '书单未加载成功。' : '书单正在加载…'}
        {collectionError && <button className="sticker-btn" onClick={() => setCollectionRetry((n) => n + 1)}>重试书单</button>}
      </p>}
      <p role="status" className="mono-label">当前找到 {filtered.length} 本。</p>
      {/* docs/41 修复 1b：筛选激活时的醒目结果条（含本数与一键清除）——
          此前唯一的反馈是一行 mono 小字，筛选结果前几屏视觉几乎不变，用户感知为「不生效」 */}
      {activeFilter ? (
        <div className="filter-active" role="status">
          <b>已选：{activeFilter.label}</b>
          <span>{filtered.length} 本</span>
          <button className="sticker-btn sm" onClick={clearAllFilters}>✕ 换换</button>
        </div>
      ) : null}
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
        <button
          className={`filter ${!moodKey && langFilter === 'all' && !collectionKey ? 'on' : ''}`}
          aria-pressed={!moodKey && langFilter === 'all' && !collectionKey}
          onClick={(e) => {
            applyFilters({ mood: null, collection: null, lang: 'all' })
            e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
          }}
        >
          {LABELS.all}
        </button>
        {MOODS.map((m) => (
          <button
            key={m.key}
            className={`filter ${moodKey === m.key ? 'on' : ''}`}
            aria-pressed={moodKey === m.key}
            onClick={(e) => {
              applyFilters({ mood: moodKey === m.key ? null : m.key, collection: null, lang: 'all' })
              // docs/41 修复 1b：选中后把 chip 滚进可视区——横滑容器里点右侧 chip，
              // 选中态若停在视口外，用户以为没反应
              e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
            }}
          >
            {m.label}
          </button>
        ))}
        {/* docs/41 整合：书单收进收纳入口（原 5 枚书单 chips 平铺 + 语言 chips 已撤，13→7） */}
        <button
          className={`filter with-icon ${collectionKey ? 'on' : ''}`}
          aria-haspopup="dialog"
          aria-expanded={collectionsOpen}
          onClick={() => setCollectionsOpen(true)}
        >
          <img className="chip-icon" src="/icons/collections/bedtime-poems.webp" alt="" loading="lazy" />
          书单 ▾
        </button>
      </div>
      {collectionsOpen ? (
        <Dialog label="主题书单" onClose={() => setCollectionsOpen(false)}>
          <div className="collect-sheet">
            <p className="mono-label">按主题挑书，再点一下就可以取消</p>
            {collections.map((c) => (
              <button
                key={c.id}
                className={`collect-option ${collectionKey === c.id ? 'on' : ''}`}
                aria-pressed={collectionKey === c.id}
                onClick={() => {
                  applyFilters({ mood: null, collection: collectionKey === c.id ? null : c.id, lang: 'all' })
                  setCollectionsOpen(false)
                }}
              >
                <img src={`/icons/collections/${c.id}.webp`} alt="" loading="lazy" />
                <span className="collect-text">
                  <b>{c.title}</b>
                  <small>{c.subtitle} · {c.total} 本</small>
                </span>
                {collectionKey === c.id ? <em>已选</em> : null}
              </button>
            ))}
          </div>
        </Dialog>
      ) : null}
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
        {/* docs/41 修复 1a：书单加载中（collectionBooks 未到）不算「没找到」——此前 1-3s
            加载窗口先闪「没找到，换个词试试」，慢网用户以为书单坏了 */}
        {v.loaded && !v.booksError && filtered.length === 0 && !(collectionKey && !collectionBooks && !collectionError) ? (
          <p className="mono-label">{collectionKey ? '这份书单里暂时没有适合你的书。' : '没找到，换个词试试。'}</p>
        ) : null}
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
  const [wordsError, setWordsError] = useState(false)
  const [wordsLoading, setWordsLoading] = useState(false)
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  // docs/34 P0-7：生词复习（本地翻卡，不打分不评判）+ 删除
  const [review, setReview] = useState<Array<{ id: string; word: string; lang: string; context: string | null; bookTitle: string | null }>>([])
  const [reviewIdx, setReviewIdx] = useState(0)
  const [reviewing, setReviewing] = useState(false)
  const [reviewAgain, setReviewAgain] = useState<Set<string>>(new Set())

  const loadWords = useCallback(() => {
    if (!token || !childId) return
    setWordsLoading(true)
    setWordsError(false)
    api
      .listWords(childId, token)
      .then((res) => setWords(res.cards.map((c) => ({ id: c.id, word: c.word, lang: c.lang, context: c.context ?? null, bookTitle: c.bookTitle ?? null }))))
      .catch(() => setWordsError(true))
      .finally(() => setWordsLoading(false))
  }, [token, childId])

  useEffect(() => {
    if (tab !== 'words') return
    loadWords()
  }, [tab, loadWords])

  const startReview = () => {
    const pool = [...words].sort(() => Math.random() - 0.5).slice(0, 5)
    if (pool.length === 0) return
    setReview(pool)
    setReviewIdx(0)
    setReviewAgain(new Set())
    setReviewing(true)
  }

  const speakWord = async (word: string, lang: string) => {
    const l = lang === 'en' ? ('en' as const) : ('zh' as const)
    const ok = await audioPlayer.speak(word, { lang: l })
    if (!ok) tts.speak(word, { lang: l })
  }

  const advanceReview = (again = false) => {
    const current = review[reviewIdx]
    if (again && current && !reviewAgain.has(current.id)) {
      setReview((cards) => [...cards, current])
      setReviewAgain((ids) => new Set(ids).add(current.id))
      setReviewIdx((i) => i + 1)
      v.showToast('这个词留到这轮最后，再看一次')
      return
    }
    if (reviewIdx + 1 >= review.length) {
      setReviewing(false)
      v.showToast(`复习完 ${new Set(review.map((card) => card.id)).size} 个词，真棒`)
    } else {
      setReviewIdx((i) => i + 1)
    }
  }

  const deleteWord = (id: string) => {
    if (!token || !childId) return
    setWords((prev) => prev.filter((x) => x.id !== id))
    api.removeWord(id, childId, token).catch(() => {
      v.showToast('没删掉，再试一次')
      loadWords()
    })
  }

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

  // ── 找相同的字（docs/34 P1-8）：每周一份 20 题，只给「读什么难度」的建议，不做能力评估 ──
  const [litOpen, setLitOpen] = useState(false)
  const [litItems, setLitItems] = useState<Array<{ char: string; options: string[]; answerIndex: number }> | null>(null)
  const [litIdx, setLitIdx] = useState(0)
  const [litCorrect, setLitCorrect] = useState(0)
  const [litPicked, setLitPicked] = useState<number | null>(null)
  const [litSuggestion, setLitSuggestion] = useState<{ level: string; message: string } | null>(null)

  const startLiteracy = async () => {
    if (!token || !childId) return
    try {
      const res = await api.literacyTest(childId, token)
      if (!res.test) {
        v.showToast('小测还在准备中，过几天再来')
        return
      }
      setLitItems(res.test.items)
      setLitIdx(0)
      setLitCorrect(0)
      setLitPicked(null)
      setLitSuggestion(null)
      setLitOpen(true)
    } catch {
      v.showToast('小测没打开，再试一次')
    }
  }

  const pickLiteracy = (i: number) => {
    if (litPicked !== null || !litItems) return
    setLitPicked(i)
    if (i === litItems[litIdx]?.answerIndex) setLitCorrect((n) => n + 1)
  }

  const nextLiteracy = async () => {
    if (!litItems || !token || !childId) return
    if (litIdx + 1 < litItems.length) {
      setLitIdx((i) => i + 1)
      setLitPicked(null)
      return
    }
    try {
      const res = await api.submitLiteracyTest(childId, litCorrect, litItems.length, token)
      setLitSuggestion(res.suggestion)
    } catch {
      setLitSuggestion({ level: 'fit', message: '做完啦！继续保持每天读一点。' })
    }
  }

  return (
    <>
      <PageHead title={LABELS.navMy} sub={LABELS.mySub} index="03" />
      <div className="tabs" role="group" aria-label="我的分类">
        {tabs.map(([k, label]) => (
          <button key={k} aria-pressed={tab === k} className={`tab ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'words' && wordsLoading && <p role="status">生词正在加载…</p>}
      {tab === 'words' && wordsError && <p role="alert">生词没加载成功。<button className="sticker-btn" onClick={loadWords}>再试一次</button></p>}
      {tab === 'words' ? (
        reviewing && review.length > 0 ? (
          <div className="side-card" style={{ maxWidth: 460 }}>
            <p className="mono-label">
              复习 {reviewIdx + 1} / {review.length}
            </p>
            <div className="detail-title">
              <span className="marker">{review[reviewIdx]?.word}</span>
            </div>
            {review[reviewIdx]?.context ? <p>“{review[reviewIdx]?.context}”</p> : null}
            {review[reviewIdx]?.bookTitle ? <p className="mono-label">出自《{review[reviewIdx]?.bookTitle}》</p> : null}
            <div className="hero-actions" style={{ marginTop: 12 }}>
              <button
                className="sticker-btn"
                onClick={() => {
                  const w = review[reviewIdx]
                  if (w) void speakWord(w.word, w.lang)
                }}
              >
                听一听
              </button>
              <button className="sticker-btn primary" onClick={() => advanceReview()}>
                认识啦
              </button>
              <button className="sticker-btn" onClick={() => advanceReview(true)}>
                再看看
              </button>
              <button className="sticker-btn" onClick={() => setReviewing(false)}>先休息一下</button>
            </div>
          </div>
        ) : words.length === 0 ? (
          <p className="mono-label">还没有收下生词。阅读时看到「收下这个词」就能收进来。</p>
        ) : (
          <>
            <div className="hero-actions" style={{ marginBottom: 12 }}>
              <button className="sticker-btn primary" onClick={startReview}>
                复习 5 个词
              </button>
            </div>
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
                  <button
                    className="mono-label"
                    style={{ border: 0, background: 'transparent', cursor: 'pointer', flexShrink: 0, padding: '8px 12px' }}
                    aria-label={`删除生词 ${w.word}`}
                    onClick={() => deleteWord(w.id)}
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          </>
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
          {tab === 'reading' ? (
            <div className="hero-actions" style={{ gridColumn: '1 / -1', marginBottom: 8 }}>
              <button className="sticker-btn" onClick={() => void startLiteracy()}>
                🔤 找相同的字 · 每周一次
              </button>
            </div>
          ) : null}
          {arr.map((b) => (
            <StoryCard key={b.id} book={b} onOpen={v.openBook} onFav={v.toggleFav} />
          ))}
          {v.loaded && arr.length === 0 ? <p className="mono-label">这里还空着，去 找故事 逛逛。</p> : null}
        </div>
      )}
      {litOpen && litItems ? (
        <Dialog label="找相同的字" onClose={() => setLitOpen(false)}>
          <div className="side-card" style={{ maxWidth: 420, width: '100%', background: '#FFFDF8' }}>
            {litSuggestion ? (
              <>
                <b>完成啦！找对了 {litCorrect} / {litItems.length} 次</b>
                <p style={{ marginTop: 8 }}>{litSuggestion.message}</p>
                <p className="mono-label">这是文字配对活动，不用它调整阅读建议</p>
                <button className="sticker-btn primary" style={{ marginTop: 10 }} onClick={() => setLitOpen(false)}>
                  知道啦
                </button>
              </>
            ) : (
              <>
                <p className="mono-label">
                  第 {litIdx + 1} / {litItems.length} 题 · 找一个和上面一样的字
                </p>
                <div className="detail-title">
                  <span className="marker">{litItems[litIdx]?.char}</span>
                </div>
                <div className="mood-row" role="group" aria-label="选一个字">
                  {litItems[litIdx]?.options.map((opt, i) => (
                    <button
                      key={`${litIdx}-${i}`}
                      className="mood"
                      aria-pressed={litPicked === i}
                      onClick={() => pickLiteracy(i)}
                    >
                      {opt}
                      {litPicked !== null && i === litItems[litIdx]?.answerIndex ? ' ✓' : ''}
                    </button>
                  ))}
                </div>
                <button className="sticker-btn primary" style={{ marginTop: 10 }} disabled={litPicked === null} onClick={() => void nextLiteracy()}>
                  {litIdx + 1 < litItems.length ? '下一题' : '看结果'}
                </button>
              </>
            )}
          </div>
        </Dialog>
      ) : null}
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
  const [offlineBusy, setOfflineBusy] = useState(false)
  const [provenance, setProvenance] = useState<Awaited<ReturnType<typeof api.contentProvenance>> | null>(null)
  const [provenanceError, setProvenanceError] = useState(false)
  const [chapterRetry, setChapterRetry] = useState(0)
  const [chapterListError, setChapterListError] = useState(false)
  // docs/35 A2：详情页封面优先缩图（28KB/R2），失败回退原档
  const [coverFallback, setCoverFallback] = useState(false)
  const [coverFailed, setCoverFailed] = useState(false)
  const detailCoverSrc = coverFailed ? null : !coverFallback && book?.coverThumb ? book.coverThumb : book?.cover ?? null

  useEffect(() => {
    if (!bookId || !token) return
    let alive = true
    setChapterListError(false)
    setChapters([])
    api
      .contentChapterList(bookId, token)
      .then((res) => { if (alive) setChapters(res.chapters) })
      .catch(() => { if (alive) setChapterListError(true) })
    api.contentProvenance(bookId, token).then((r) => { if (alive) { setProvenance(r); setProvenanceError(false) } })
      .catch(() => { if (alive) setProvenanceError(true) })
    return () => { alive = false }
  }, [bookId, token, chapterRetry])

  useEffect(() => {
    if (!bookId || !childId || !token) return
    api
      .contentProgress(bookId, childId, token)
      .then((res) => setResumeOrder(res.progress.finished || !res.progress.updatedAt ? 0 : res.progress.chapterOrder))
      .catch(() => undefined)
  }, [bookId, childId, token])

  // 离开详情页立刻停掉试听——音频/朗读是全局单例，不清会跟着孩子回到列表页继续出声
  useEffect(() => {
    return () => {
      audioPlayer.stop()
      if (tts.isSpeaking) tts.stop()
    }
  }, [])

  // 深链/刷新直达详情时书单可能尚未拉取（书单只在列表页路由触发）——补拉一次（同 ReaderRoute）
  const needsLoad = !v.loaded
  useEffect(() => {
    if (needsLoad) v.reloadBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsLoad])

  if (!v.loaded) {
    return (
      <div className="app">
        <div className="wrap">
          <PageHead title="书籍赶来中…" sub="马上就好" index="02" />
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
      const ok = await audioPlayer.speak(text, { lang: book.lang })
      if (!ok) tts.speak(text, { lang: book.lang })
    } catch {
      v.showToast('试听暂时没打开，可以直接开始阅读，或稍后再试')
    } finally {
      setPreviewing(false)
    }
  }

  return (
    <section className="book-detail">
        <button className="sticker-btn" onClick={() => navigate('/child/discover')}>← 返回找故事</button>
          <div className="detail-grid">
            <div className="detail-cover">
              <div className={`book-cover ${book.tone} ${detailCoverSrc ? 'has-art' : ''}`}>
                {detailCoverSrc ? (
                  <img
                    className="cover-art"
                    src={detailCoverSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={() => {
                      if (!coverFallback) setCoverFallback(true)
                      else setCoverFailed(true)
                    }}
                  />
                ) : null}
                <span className="cover-kicker">桃阅读 · {CATEGORY_LABEL[book.category] ?? (book.lang === 'en' ? 'Story' : '故事')}</span>
                <span className="cover-title">{book.title}</span>
                {detailCoverSrc ? <AiBadge /> : null}
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
              {/* docs/39 E6：主行动前置到简介之前，PC/移动首屏即可见（原来是滚动后才到按钮组） */}
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
              <p className="detail-intro">
                {book.desc}
              </p>
              <div className="hero-actions">
                <button className="sticker-btn" disabled={offlineBusy} onClick={() => {
                  if (!token || offlineBusy) return
                  setOfflineBusy(true)
                  void saveOfflineBook(book, token).then(() => v.showToast('文字已保存；本机离线书架可读 7 天'))
                    .catch((e: Error) => v.showToast(e.message)).finally(() => setOfflineBusy(false))
                }}>{offlineBusy ? '正在保存…' : '保存文字到本机 · 试点'}</button>
                <button className="sticker-btn" onClick={() => navigate('/offline')}>离线书架</button>
              </div>
              <div className="info-stickers">
                <div className="info">
                  <small>每章大约</small>
                  <b>{Math.round(book.words / Math.max(1, book.chapterCount))} 字 / 词</b>
                </div>
                <div className="info">
                  <small>{'语言'}</small>
                  <b>{book.lang === 'en' ? '英文' : '中文'}</b>
                </div>
                {/* 难度徽章（docs/34 P1-7）：同类书每章字数中位数三档，不是评分 */}
                <div className="info">
                  <small>平均章节篇幅</small>
                  <b>{book.difficulty === 'easy' ? '短篇' : book.difficulty === 'stretch' ? '长篇' : '中篇'}</b>
                </div>
                <div className="info">
                  <small>朗读方式</small>
                  <b>支持朗读</b>
                </div>
              </div>
            </div>
          </div>
          <section className="section">
            <details><summary style={{ minHeight: 44, cursor: 'pointer' }}>来源、加工说明与版本</summary>
              {provenanceError ? <p role="alert">来源说明未加载。<button onClick={() => setChapterRetry((n) => n + 1)}>重试</button></p> : provenance ? <>
                <p>{provenance.source}</p><p>{provenance.rights?.workTitle}</p><p>{provenance.rights?.note}</p>
                <p className="mono-label">版本 {provenance.contentVersion} · {provenance.reviewStatus === 'reviewed' ? '已留存人工审核记录' : '人工精审待完成'} · 插图可能由 AI 生成</p>
                <p>{provenance.rights?.translator ? `译者：${provenance.rights.translator}` : ''}</p>
              </> : <p role="status">来源说明正在加载…</p>}
            </details>
            <div className="section-head">
              <span className="section-no">02</span>
              <h3>{LABELS.chaptersFrom}</h3>
              <p>{LABELS.chaptersSub}</p>
            </div>
            <div className="chapter-list">
              {chapterListError && <p role="alert">目录没加载成功。<button className="sticker-btn" onClick={() => setChapterRetry((n) => n + 1)}>重试目录</button></p>}
              {chapters.map((c, i) => (
                <button key={c.order} className="chapter" onClick={() => v.readBook(book.id, c.order)}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <b>{c.title}</b>
                  <em>{resumeOrder === c.order ? '上次读到这里' : '打开'}</em>
                </button>
              ))}
            </div>
          </section>
    </section>
  )
}

/* ── 阅读器路由页（能力在 ReaderPage，V8 画框与语言传入） ── */
function ReaderRoute() {
  const { bookId, order } = useParams()
  const v = useV8()
  const book = v.books.find((b) => b.id === bookId) ?? null
  // 深链/刷新直达阅读器时书单可能尚未拉取（书单只在列表页路由触发）——补拉一次
  const needsLoad = !book && !v.loaded
  useEffect(() => {
    if (needsLoad) v.reloadBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsLoad])
  if (!book) {
    if (needsLoad) {
      return (
        <div className="app">
          <div className="wrap">
            <p className="mono-label">正在翻开这一章…</p>
          </div>
        </div>
      )
    }
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
