import { useReadyTiming } from '../../lib/readyTiming'
/**
 * 「贴纸绘本 v8」孩子端外壳 + 数据上下文（2026-09-21 审计整改）。
 * 暖纸阅读空间（v8.css 基础 + reading-ui.css 孩子端规范）；路由化（A4 P1）：
 *   /child/today · /child/discover · /child/my · /child/book/:bookId · /child/book/:bookId/chapter/:order
 * 数据接真实 API；V8Book 保留结构化 lang/category/ageStage（A3.5）。
 */
import {
  createContext,
  lazy,
  memo,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { api, type ContentBookDto, type ChildHomeDto } from '../../lib/api'
import { useSession } from '../../stores/session'
import { audioPlayer } from '../../lib/audioPlayer'
import { tts } from '../../lib/tts'
import { AiBadge } from '../../components/art/AiBadge'
import { haptic } from '../../lib/haptics'
import { Dialog } from '../../components/ui/Dialog'
import { DisclosureSummary } from '../../components/ui/DisclosureSummary'
import { saveOfflineBook } from '../../lib/offline'
import { PageHead } from '../../components/PageHead'
import { DailyPoemCard } from './DailyPoemCard'
import { PhonicsToday } from './phonics/PhonicsToday'
import { RecentReading } from '../../components/ReadingSupport'
import { MemoryArchive } from '../../components/MemoryArchive'
import { ReadingIllustration } from '../../components/art/ReadingIllustration'
import { IconSun, IconStar, IconSearch, IconUser, IconFamily, IconBookOpen, IconType, IconPlay, IconHeart, IconHeartFilled, IconChevronDown, IconArrowRight, IconMoon, IconShelf, IconShield, IconLeaf } from '../../components/ui/icons'
import type { WordCardDto } from '../../lib/api'
import type { InitialListeningRequest } from './ListeningPage'

const loadReader = () => import('./ReaderPage')
const loadFamilyPages = () => import('./FamilyTrialPages')
const loadPhonics = () => import('./phonics/PhonicsPage')
const loadListening = () => import('./ListeningPage')
const ReaderPage = lazy(() => loadReader().then(m => ({ default: m.ReaderPage })))
const FamilyLibraryPage = lazy(() => loadFamilyPages().then(m => ({ default: m.FamilyLibraryPage })))
const FamilyReaderPage = lazy(() => loadFamilyPages().then(m => ({ default: m.FamilyReaderPage })))
const PhonicsTrialPage = lazy(() => loadFamilyPages().then(m => ({ default: m.PhonicsTrialPage })))
const PhonicsPage = lazy(() => loadPhonics().then(m => ({ default: m.PhonicsPage })))
const ListeningPage = lazy(() => loadListening().then(m => ({ default: m.ListeningPage })))

/** Load only the requested route, alongside family validation/catalogue reads. */
export function prepareChildRoute(path: string): void {
  const pending = /^\/child\/book\/[^/]+\/chapter\//.test(path) ? loadReader()
    : path === '/child/phonics/draft' ? loadFamilyPages()
    : /^\/child\/phonics(\/|$)/.test(path) ? loadPhonics()
    : /^\/child\/(family-books|family-book)(\/|$)/.test(path) ? loadFamilyPages()
    : path.startsWith('/child/listen/') ? loadListening() : null
  void pending?.catch(() => undefined)
}

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
  matchedChapters?: Array<{ order: number; title: string }>
  readingGuidance?: ContentBookDto['readingGuidance']
}

const TONES = ['mint', 'rose', 'sun', 'orange', 'sky']
function toneOf(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return TONES[h % TONES.length] ?? 'mint'
}

const CATEGORY_LABEL: Record<string, string> = {
  poetry: '诗歌',
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
    matchedChapters: b.matchedChapters,
    readingGuidance: b.readingGuidance,
  }
}

export const LABELS = {
  brandSub: '和故事一起长大',  memory: '阅读记忆',
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
  discoverReturn: { current: { search: string; query: string; lang: 'all' | 'zh' | 'en'; count: number; scroll: number } | null }
  home: ChildHomeDto | null
  rememberBooks: (books: ContentBookDto[]) => void
  loadReport: () => void
  reloadBooks: () => void
  loadBook: (id: string) => Promise<void>
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

// A deep link needs one book, not the entire catalogue. Keep the result in the
// shared shelf so favorites and returning navigation retain the same behavior.
function useRouteBook(id: string | undefined) {
  const { books, loadBook } = useV8()
  const book = books.find(b => b.id === id) ?? null
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    if (!id || book) return
    let alive = true
    setError(null)
    void loadBook(id).catch(err => {
      if (alive) setError(err instanceof Error ? err.message : '这本书暂时打不开')
    })
    return () => { alive = false }
  }, [id, book, loadBook, attempt])
  return { book, error, retry: () => setAttempt(n => n + 1) }
}

/** 路由壳 + 数据上下文 */
export interface InitialBooksRequest {
  token: string
  childId: string
  home?: boolean
  result: Promise<({ books: ContentBookDto[] } & Partial<ChildHomeDto>) | null>
}

export interface InitialBookRequest {
  token: string
  childId: string
  bookId: string
  result: Promise<ContentBookDto | null>
}

export function V8App({ childName, onSwitchFamily, onSwitchChild, initialBooks, initialBook, initialListening }: { childName: string; onSwitchFamily: () => void; onSwitchChild: () => void; initialBooks?: InitialBooksRequest | null; initialBook?: InitialBookRequest | null; initialListening?: InitialListeningRequest | null }) {
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  const familyId = useSession((s) => s.familyId)
  const initialBooksRef = useRef(initialBooks)
  const initialBookRef = useRef(initialBook)
  const pendingBooks = useRef<{ token: string; childId: string; home: boolean; result: Promise<{ books: ContentBookDto[] } & Partial<ChildHomeDto>> } | null>(null)
  const pendingBook = useRef(new Map<string, Promise<void>>())
  const booksRequest = useRef(0)
  const navigate = useNavigate()

  const [books, setBooks] = useState<V8Book[]>([])
  const [loaded, setLoaded] = useState(false)
  const [booksError, setBooksError] = useState<string | null>(null)
  const [home, setHome] = useState<ChildHomeDto | null>(null)
  const [reportRequested, setReportRequested] = useState(0)
  const reportAt = useRef(0)
  const booksScope = useRef('')
  const discoverReturn = useRef<V8ContextValue['discoverReturn']['current']>(null)
  const rememberBooks = useCallback((rows: ContentBookDto[]) => {
    setBooks(prev => { const incoming = new Set(rows.map(b => b.id)); return [...prev.filter(b => !incoming.has(b.id)), ...rows.map(toV8)] })
  }, [])
  const loadReport = useCallback(() => setReportRequested(n => n + 1), [])
  const [report, setReport] = useState<V8ContextValue['report']>(null)
  const [nights, setNights] = useState<string[]>([])
  const [toastMsg, setToastMsg] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  useEffect(() => {
    const previous = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => { history.scrollRestoration = previous }
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
    const sequence = ++booksRequest.current
    const forHome = ['/', '/child', '/child/today'].includes(window.location.pathname)
    const scope = forHome ? 'home' : 'shelf'
    if (booksScope.current !== scope) setLoaded(false)
    booksScope.current = scope
    const initial = initialBooksRef.current
    initialBooksRef.current = null
    setBooksError(null)
    const fetchBooks = async (): Promise<{ books: ContentBookDto[] } & Partial<ChildHomeDto>> => forHome && childId ? api.childHome(childId, token) : api.contentBooks(token, { ...(childId ? { childId } : {}) })
    const pending = pendingBooks.current
    const result = (pending?.token === token && pending.childId === childId && pending.home === forHome
      ? pending.result
      : initial?.token === token && initial.childId === childId && Boolean(initial.home) === forHome
        ? initial.result.then(res => res ?? fetchBooks()) : fetchBooks())
      .finally(() => { if (pendingBooks.current?.result === result) pendingBooks.current = null })
    if (childId) pendingBooks.current = { token, childId, home: forHome, result }
    result
      .then((res) => {
        if (sequence !== booksRequest.current || useSession.getState().token !== token || useSession.getState().childId !== childId) return
        setBooks(res.books.map(toV8))
        if (forHome && 'continueId' in res) setHome(res as ChildHomeDto)
        setLoaded(true)
      })
      .catch((err: unknown) => {
        if (sequence !== booksRequest.current || useSession.getState().token !== token || useSession.getState().childId !== childId) return
        setLoaded(true)
        setBooksError(err instanceof Error ? err.message : '书架暂时打不开')
      })
  }, [token, childId])

  const loadBook = useCallback((id: string): Promise<void> => {
    if (!token || !childId) return Promise.resolve()
    const pending = pendingBook.current.get(id)
    if (pending) return pending
    const initial = initialBookRef.current
    initialBookRef.current = null
    const request = (async () => {
      const fetchBook = () => api.contentBook(id, token, childId)
      const row = initial?.token === token && initial.childId === childId && initial.bookId === id
        ? await initial.result.then(res => res ?? fetchBook()) : await fetchBook()
      if (useSession.getState().token !== token || useSession.getState().childId !== childId) return
      setBooks(prev => [...prev.filter(b => b.id !== id), toV8(row)])
    })().finally(() => { pendingBook.current.delete(id) })
    pendingBook.current.set(id, request)
    return request
  }, [token, childId])

  // 审计 A10.5 的初衷保留：读完回列表要看到新进度——但触发点收窄为
  // 「从阅读器/家庭书返回列表页」（docs/35 B2：此前每次切 tab 全量重拉 178KB，
  // 孩子 today→discover→my 逛一圈 = 4 次全量请求；现改为定向刷新 + 60s 节流兜底）
  const lastFetchRef = useRef(0)
  const prevPathRef = useRef('')
  useEffect(() => {
    const listRoutes = ['/child', '/child/today', '/child/my']
    if (!listRoutes.includes(location.pathname)) {
      prevPathRef.current = location.pathname
      return
    }
    // 对抗审查 P2-4：来源判定泛化——「从任何非列表路由回到列表」都定向刷新
    // （覆盖阅读器→详情页→返回 的最常见浏览路径；chapter 路由本身也属非列表）
    const cameFromElsewhere = prevPathRef.current !== '' && !listRoutes.includes(prevPathRef.current)
    if (cameFromElsewhere) reportAt.current = 0
    prevPathRef.current = location.pathname
    const scope = location.pathname === '/child/my' ? 'shelf' : 'home'
    if (booksScope.current !== scope || cameFromElsewhere || Date.now() - lastFetchRef.current > 60_000) {
      lastFetchRef.current = Date.now()
      void reloadBooks()
    }
  }, [location.pathname, reloadBooks])
  // 回前台且距上次拉取 >60s 时静默刷新（家长在另一端屏蔽/孩子换设备读完的场景）
  useEffect(() => {
    const listRoute = ['/child', '/child/today', '/child/my'].includes(location.pathname)
    const onVisible = () => {
      if (listRoute && document.visibilityState === 'visible' && Date.now() - lastFetchRef.current > 60_000) {
        lastFetchRef.current = Date.now()
        void reloadBooks()
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [reloadBooks, location.pathname])

  useEffect(() => {
    let alive = true
    if (!token || !familyId || !childId || (location.pathname !== '/child/my' && !reportRequested) || Date.now() - reportAt.current < 60_000) return
    api
      .weeklyReport(familyId, token, undefined, childId)
      .then(({ report: r }) =>
        { if (alive) { reportAt.current = Date.now(); setReport({ nights: r.nights, highlightsTotal: r.highlightsTotal, booksCompleted: r.booksCompleted, highlights: r.highlights }) } },
      )
      .catch(() => { if (alive) setReport(null) })

    return () => { alive = false }
  }, [token, familyId, childId, location.pathname, reportRequested])

  useEffect(() => {
    if (!token || !childId || location.pathname !== '/child/my') return
    let alive = true
    void api.achievements(childId, token).then(a => { if (alive) setNights(a.nightLamps.map(x => x.unlockedAt)) }).catch(() => { if (alive) setNights([]) })
    return () => { alive = false }
  }, [token, childId, location.pathname])

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
      discoverReturn,
      home,
      rememberBooks,
      loadReport,
      reloadBooks,
      loadBook,
      report,
      nights,
      toggleFav,
      openBook,
      readBook,
      showToast,
      onSwitchFamily,
      onSwitchChild,
    }),
    [childName, books, loaded, booksError, home, rememberBooks, loadReport, reloadBooks, loadBook, report, nights, toggleFav, openBook, readBook, showToast, onSwitchFamily, onSwitchChild],
  )

  // 阅读器（章节路由）为沉浸式：隐藏壳层底部导航与换人浮钮，避免遮挡阅读器控制条
  const inReader = /^\/child\/(?:book|family-book)\/[^/]+\/chapter\//.test(location.pathname)

  return (
    <V8Context.Provider value={ctx}>
      <div className={`app child-app ${inReader ? 'reading-layout' : ''}`}>
        <div className="wrap" key={inReader ? 'reading' : 'browsing'}>
          <header className="mast">
            <div className="logo">
              <picture><source srcSet="/brand/logo-256.webp" type="image/webp" /><img src="/brand/logo-256.png" alt="桃阅读" /></picture>
            </div>
            <div className="brand"><h1>桃阅读</h1></div>
            <nav className="desktop-nav" aria-label="孩子端导航">
              {([
                ['/child/today', LABELS.navHome],
                ['/child/discover', LABELS.discover],
                ['/child/my', LABELS.navMy],
              ] as Array<[string, string]>).map(([to, label]) => (
                <button key={to} aria-current={location.pathname === to || (to === '/child/today' && location.pathname === '/child') ? 'page' : undefined} onClick={() => navigate(to)}>{label}</button>
              ))}
            </nav>
            <div className="mast-actions">
              <button className="child-profile min-h-[44px]" aria-label={`${childName}，切换小读者`} onClick={onSwitchChild}>
                <img src="/art/reading-desk/child-avatar-reference.webp" width="64" height="64" alt="" />
                <span>{childName}</span><IconChevronDown size={18} />
              </button>
              <button className="parent-entry min-h-[44px] min-w-[44px]" aria-label="家长入口" onClick={() => { useSession.getState().signOut(); navigate('/login?role=parent') }}><IconFamily size={36} /><span>家长入口</span><IconArrowRight size={20} /></button>
            </div>
          </header>
          <div className="layout">
            <main className="main" id="main-content">
              <Suspense fallback={<p className="mono-label" role="status">正在翻开…</p>}>
              <Routes>
                <Route path="/" element={<TodayPage />} />
                <Route path="/today" element={<TodayPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/family-books" element={<FamilyLibraryPage />} />
                <Route path="/listen/:source/:id" element={<ListeningPage initialBook={initialListening} />} />
                <Route path="/family-book/:id" element={<FamilyReaderPage />} />
                <Route path="/family-book/:id/chapter/:order" element={<FamilyReaderPage />} />
                <Route path="/phonics" element={<PhonicsPage />} />
                <Route path="/phonics/draft" element={<PhonicsTrialPage />} />
                <Route path="/book/:bookId" element={<BookDetailPage />} />
                <Route path="/book/:bookId/chapter/:order" element={<ReaderRoute />} />
                <Route path="*" element={<Navigate to="/child/today" replace />} />
              </Routes>
              </Suspense>
            </main>
          </div>
        </div>
        {/* 阅读器为沉浸式全屏（v8 demo）：章节路由下不渲染底部导航，避免盖住阅读器控制条 */}
        {!inReader ? (
          <nav className="mobile-nav" aria-label="孩子端导航">
            {(
              [
                ['/child/today', LABELS.navHome],
                ['/child/discover', LABELS.discover],
                ['/child/my', LABELS.navMy],
              ] as Array<[string, string]>
            ).map(([to, label]) => (
              <button key={to} className="nav-touch" aria-current={location.pathname === to || (to === '/child/today' && location.pathname === '/child') ? 'page' : undefined} onClick={() => navigate(to)}>
                <span className="nav-icon">{to.endsWith('/today') ? <IconSun /> : to.endsWith('/discover') ? <IconSearch /> : <IconUser />}</span>
                <span>{label}</span>
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

/** demo 画框封面：有 AI 图填图（隐藏 CSS 装饰）+ AI 标识；无图保持 CSS 画面。
 * 缩图档优先（性能方案阶段 1）：thumb 加载失败静默回退原档。
 * onOpen 传入时封面整体可点开（替代旧 role=button 外壳，收藏钮不再嵌套在按钮里）。 */
export function V8Cover({
  book,
  onFav,
  onOpen,
  showFavorite = true,
}: {
  book: V8Book
  onFav: (id: string) => void
  onOpen?: (id: string) => void
  showFavorite?: boolean
}) {
  const [failedThumb, setFailedThumb] = useState<string | null>(null)
  const src = book.coverThumb && failedThumb !== book.coverThumb ? book.coverThumb : book.cover
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const artOk = Boolean(src && failedSrc !== src)
  const artLoaded = Boolean(src && loadedSrc === src)
  return (
    <div className={`book-cover ${book.tone} ${artOk && artLoaded ? 'has-art' : ''}`}>
      {!artLoaded && <ReadingIllustration className="cover-fallback-art" />}
      {src && artOk ? (
        <img
          className="cover-art"
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setLoadedSrc(src)}
          onError={() => {
            if (src === book.coverThumb && book.coverThumb) setFailedThumb(book.coverThumb)
            else setFailedSrc(src)
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
      {showFavorite && <FavoriteButton book={book} onFav={onFav} />}
    </div>
  )
}

function FavoriteButton({ book, onFav, className = 'fav' }: { book: V8Book; onFav: (id: string) => void; className?: string }) {
  return <button type="button" className={`${className} min-h-[44px] min-w-[44px]${book.fav ? ' on' : ''}`} aria-pressed={book.fav} aria-label={`${book.fav ? '取消喜欢' : '喜欢'}《${book.title}》`} onClick={e => { e.stopPropagation(); onFav(book.id) }}>
    {book.fav ? <IconHeartFilled size={19} /> : <IconHeart size={19} />}
  </button>
}

export const StoryCard = memo(function StoryCard({
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
        <button className="story-title min-h-[44px]" onClick={() => onOpen(book.id)}><b>{book.title}</b></button>
        <small>
          {book.author} · {book.meta}
          {/* 进度贴纸（审计 A10.5）：读到一半显示「读到 N%」，读完显示「读完啦」 */}
          {book.finished ? ' · 读完啦' : book.progress > 0 ? ` · 读到 ${book.progress}%` : ''}
        </small>
      </div>
    </div>
  )
})

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
function chapterLabel(order: number): string {
  const digits = '零一二三四五六七八九'
  if (order > 0 && order < 10) return digits[order]!
  if (order >= 10 && order < 100) return `${order < 20 ? '' : digits[Math.floor(order / 10)]}十${order % 10 ? digits[order % 10] : ''}`
  return String(order)
}

function TodayPage() {
  const v = useV8()
  useReadyTiming(v.loaded && !v.booksError, 'home')
  const navigate = useNavigate()
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  // docs/34 P0-4：「继续读」= 最近读的那本（按进度上报时间），而不是书架序里第一本在读
  const continueBook = v.books.find(b => b.id === v.home?.continueId) ?? null
  const picks = (v.home?.pickIds ?? []).flatMap(id => { const b = v.books.find(b => b.id === id); return b ? [b] : [] })
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
    if (!v.loaded) return
    const timer = setTimeout(loadPaperAndWindow, 300)
    return () => clearTimeout(timer)
  }, [loadPaperAndWindow, v.loaded])

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
      <header className="today-heading">
        <IconStar className="greeting-star" size={54} />
        <div><h2>{v.childName}，今天读点什么？<img className="greeting-accent" src="/art/reading-desk/greeting-accent.webp" width="41" height="65" alt="" aria-hidden="true" /></h2><p>每天一小段，故事慢慢长大。</p></div>
        <time dateTime={new Date().toLocaleDateString('sv-SE')}>{new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}<span>{new Date().toLocaleDateString('zh-CN', { weekday: 'short' })}</span></time>
      </header>
      {v.booksError && <div role="alert"><p>{v.booksError}</p><button className="sticker-btn" onClick={v.reloadBooks}>重新加载书架</button></div>}
      <div className="today-featured">
        <section className={`today-hero${!v.loaded ? ' is-loading' : ''}`} aria-busy={!v.loaded} aria-labelledby="continue-title">
          <span className="continue-tab">{continueBook ? '接着上次读' : '从一本书开始'}</span>
          <div className="continue-cover">{continueBook ? <V8Cover book={continueBook} onFav={v.toggleFav} onOpen={v.openBook} showFavorite={false} /> : <ReadingIllustration />}</div>
          <div className="today-hero-copy">
            <h3 id="continue-title">{!v.loaded ? '正在打开书架…' : continueBook ? continueBook.title : '故事等你来翻开'}</h3>
            <p className="continue-position">{continueBook ? `第${chapterLabel(continueBook.resumeChapter ?? 1)}章 · 上次读到这里` : '选一个喜欢的故事，出发吧'}</p>
            {continueBook && <div className="continue-progress" role="progressbar" aria-label="这本书的阅读进度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.max(0, Math.min(100, continueBook.progress))}><span style={{ width: `${Math.max(0, Math.min(100, continueBook.progress))}%` }} /></div>}
            <p className="continue-caption">{continueBook ? '从熟悉的地方，接着出发。' : '自己读，或和家人一起读。'}</p>
          </div>
          <div className="continue-stars" aria-hidden="true"><IconStar size={44} /><IconStar size={38} /></div>
          <button className="sticker-btn primary continue-action" onClick={() => continueBook ? v.readBook(continueBook.id, continueBook.resumeChapter ?? undefined) : navigate('/child/discover')} disabled={!v.loaded}>
            {continueBook ? LABELS.continueRead : '挑一本开始'}<IconArrowRight size={30} />
          </button>
        </section>
        <DailyPoemCard readPoem={v.readBook} />
      </div>
      <div className="today-shortcuts" aria-label="选书入口">
        <button className="today-shortcut min-h-[44px]" onClick={() => navigate('/child/discover')}><span className="shortcut-icon"><IconSearch size={48} /></span><span className="shortcut-copy"><b>找故事</b><small>发现下一本喜欢的书</small></span><IconArrowRight size={34} /></button>
        <button className="today-shortcut min-h-[44px]" onClick={() => navigate('/child/family-books')}><span className="shortcut-icon"><IconFamily size={48} /></span><span className="shortcut-copy"><b>家庭书架</b><small>家人为你挑好的故事</small></span><IconArrowRight size={34} /></button>
      </div>
      {windowMode === 'daily_limit' && !limitAcked ? (
        <section className="section" role="status">
          <div className="side-card" style={{ borderColor: '#FFD97A' }}>
            <b className="icon-label"><IconMoon />今天的阅读时间到啦</b>
            <p>
              已经读了 {usage.usedMin ?? 0} 分钟（家长约定 {usage.limitMin ?? 0} 分钟）。小眼睛该休息了，明天再一起读吧！
            </p>
            <button className="sticker-btn" onClick={() => setLimitAcked(true)}>
              我知道啦
            </button>
          </div>
        </section>
      ) : null}
      <section className="section today-picks" aria-busy={!v.loaded}>
        <div className="section-head">
          <h3>也许你会喜欢<img className="recommendation-accent" src="/art/reading-desk/recommendation-accent.webp" width="27" height="31" alt="" aria-hidden="true" /></h3>
          <button className="text-action min-h-[44px]" onClick={() => navigate('/child/discover')}>查看更多<IconArrowRight size={20} /></button>
        </div>
        <div className="story-row">
          {!v.loaded && [0, 1, 2].map(n => <div className="book-placeholder" key={n} aria-hidden="true"><div /><span /><span /></div>)}
          {picks.map((b) => (
            <article className="story-card today-book" key={b.id}>
              <V8Cover book={b} onFav={v.toggleFav} onOpen={v.openBook} showFavorite={false} />
              <div className="today-book-copy">
                <button className="story-title min-h-[44px]" onClick={() => v.openBook(b.id)}><b>{b.title}</b></button>
                <span className={`book-category ${b.tone}`}>{CATEGORY_LABEL[b.category] ?? b.category}</span>
                <p className="recommendation-reason">{b.desc || `${b.author}的故事，一起翻开看看。`}</p>
              </div>
              <FavoriteButton book={b} onFav={v.toggleFav} className="book-like" />
            </article>
          ))}
        </div>
      </section>
      {v.loaded && picks.length === 0 && <div className="child-empty"><p>书架正在等新故事，先去家庭书架看看吧。</p><button className="sticker-btn primary" onClick={() => navigate('/child/family-books')}>去家庭书架<IconArrowRight /></button></div>}
      <div className="today-more">
      {token && childId && <RecentReading token={token} childId={childId} />}
      <details className="quiet-disclosure paper-entry" open={paper ? true : undefined}>
        <DisclosureSummary icon={<IconBookOpen />} title={paper ? `纸质共读 · ${paper.title}` : '和家人读纸质书'} hint="捧起家里的书，也能留下共读记忆" />
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
      </details>
      <details className="quiet-disclosure">
        <DisclosureSummary icon={<IconSun />} title={LABELS.mood} hint="按今天的心情，找一个喜欢的故事" />
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
      </details>
      <details className="quiet-disclosure" onToggle={event => { if (event.currentTarget.open) v.loadReport() }}>
        <DisclosureSummary icon={<IconFamily />} title="最近的家庭阅读记忆" hint="把一起读过的温柔时刻收好" />
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
      </details>
      </div>
      <PhonicsToday enabled={v.home?.phonicsEnabled === true} />
      {finishOpen && paper ? (
        <Dialog label="纸质书共读收尾" onClose={() => setFinishOpen(false)}>
          <div className="side-card" style={{ maxWidth: 420, width: '100%', background: 'var(--card)' }}>
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
      next.delete('all')
      if (patch.collection) next.set('collection', patch.collection)
      else next.delete('collection')
    }
    if (patch.lang !== undefined) setLangFilter(patch.lang)
    setSearchParams(next, { replace: true })
  }
  const saved = useRef(v.discoverReturn.current?.search === searchParams.toString() ? v.discoverReturn.current : null)
  const restoring = useRef(saved.current)
  const scroll = useRef(saved.current?.scroll ?? 0)
  const [query, setQuery] = useState(saved.current?.query ?? '')
  const [randomBusy, setRandomBusy] = useState(false)
  const [langFilter, setLangFilter] = useState<'all' | 'zh' | 'en'>(saved.current?.lang ?? 'all')
  const [visible, setVisible] = useState(() => window.matchMedia('(max-width: 760px)').matches ? 4 : 12)
  const [collections, setCollections] = useState<Array<{ id: string; title: string; subtitle: string; total: number; selectedCount?: number }>>([])
  const collectionKey = searchParams.get('collection')
  const collectionAll = searchParams.get('all') === 'true'
  const [page, setPage] = useState<{ key: string; books: V8Book[]; total: number; cursor: string | null }>({ key: '', books: [], total: 0, cursor: null })
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState<string | null>(null)
  const pending = useRef<AbortController | null>(null)
  const key = JSON.stringify([token, childId, query.trim(), moodKey, langFilter, collectionKey, collectionAll])
  const scope = useRef(key)
  scope.current = key
  const { rememberBooks } = v
  const fetchPage = useCallback(async (cursor?: string) => {
    if (!token || !childId || pending.current) return
    const controller = new AbortController()
    pending.current = controller
    setLoading(true); setPageError(null)
    try {
      const result = await api.contentBooks(token, { childId, limit: 24, cursor, q: query.trim() || undefined,
        mood: MOODS.some(m => m.key === moodKey) ? moodKey! : undefined,
        lang: langFilter === 'all' ? undefined : langFilter, collection: collectionKey ?? undefined, all: collectionAll }, controller.signal)
      if (scope.current !== key || controller.signal.aborted) return
      rememberBooks(result.books)
      setPage(old => {
        const merged = cursor && old.key === key ? [...old.books, ...result.books.map(toV8)] : result.books.map(toV8)
        return { key, books: [...new Map(merged.map(b => [b.id, b])).values()], total: result.total, cursor: result.nextCursor ?? null }
      })
    } catch (error) {
      if (scope.current === key && !controller.signal.aborted) setPageError(error instanceof Error ? error.message : '书架暂时打不开')
    } finally {
      if (pending.current === controller) { pending.current = null; setLoading(false) }
    }
  }, [token, childId, query, moodKey, langFilter, collectionKey, collectionAll, key, rememberBooks])
  useEffect(() => {
    pending.current?.abort(); pending.current = null
    setPage({ key, books: [], total: 0, cursor: null }); setLoading(true); setPageError(null)
    setVisible(restoring.current?.count ?? (window.matchMedia('(max-width: 760px)').matches ? 4 : 12))
    const timer = setTimeout(() => { void fetchPage() }, query.trim() ? 300 : 0)
    return () => { clearTimeout(timer); pending.current?.abort(); pending.current = null }
  }, [fetchPage, key, query])
  useEffect(() => {
    if (!token || (!collectionsOpen && !collectionKey)) return
    let live = true
    void api.collections(token).then(r => { if (live) setCollections(r.collections) }).catch(() => undefined)
    return () => { live = false }
  }, [token, collectionsOpen, collectionKey])
  const activeFilter = MOODS.find(m => m.key === moodKey) ?? (collectionKey ? { label: '书单 · ' + (collections.find(c => c.id === collectionKey)?.title ?? '已选书单') } : null)
  const clearAllFilters = () => applyFilters({ mood: null, collection: null, lang: 'all' })
  const latest = new Map(v.books.map(b => [b.id, b]))
  const filtered = page.key === key ? page.books.map(b => ({ ...b, fav: latest.get(b.id)?.fav ?? b.fav })) : []
  const loaded = page.key === key && (filtered.length > 0 || !loading)
  const total = page.key === key ? page.total : 0
  const searchStatus = loading && query.trim() ? 'loading' : pageError ? 'error' : 'ready'
  const reloadPage = () => { setPage({ key, books: [], total: 0, cursor: null }); void fetchPage() }
  useEffect(() => {
    const target = restoring.current
    if (!target || page.key !== key || loading || pageError) return
    if (page.books.length < target.count && page.cursor) { void fetchPage(page.cursor); return }
    const frame = requestAnimationFrame(() => { window.scrollTo(0, target.scroll); restoring.current = null })
    return () => cancelAnimationFrame(frame)
  }, [page, key, loading, pageError, fetchPage])
  useEffect(() => {
    const save = () => {
      if (restoring.current || window.location.pathname !== '/child/discover') return
      scroll.current = window.scrollY
      v.discoverReturn.current = { search: searchParams.toString(), query, lang: langFilter, count: Math.min(visible, filtered.length), scroll: scroll.current }
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [v.discoverReturn, searchParams, query, langFilter, visible, filtered.length])
  const openBook = (id: string) => {
    v.discoverReturn.current = { search: searchParams.toString(), query, lang: langFilter, count: Math.min(visible, filtered.length), scroll: window.scrollY }
    v.openBook(id)
  }
  const visibleLimit = visible
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const hasMore = filtered.length > visibleLimit || Boolean(page.cursor)
  useEffect(() => {
    const sentinel = loadMoreRef.current
    if (!sentinel || !hasMore || loading || pageError) return
    const revealMore = () => {
      setVisible(n => n + 24)
      if (filtered.length <= visibleLimit && page.cursor) void fetchPage(page.cursor)
    }
    if (typeof IntersectionObserver === 'undefined') {
      const onScroll = () => { if (sentinel.getBoundingClientRect().top <= window.innerHeight + 240) revealMore() }
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { observer.disconnect(); revealMore() }
    }, { rootMargin: '0px 0px 240px 0px' })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, visibleLimit, loading, pageError, filtered.length, page.cursor, fetchPage])

  return (
    <>
      <div className="discover-heading"><PageHead title={LABELS.discover} sub={LABELS.discoverSub} index="02" /></div>
      {collectionKey && <button className="sticker-btn" aria-pressed={collectionAll} onClick={() => { const next = new URLSearchParams(searchParams); if (collectionAll) next.delete('all'); else next.set('all', 'true'); setSearchParams(next) }}>{collectionAll ? '回到精选书目' : '查看这份书单的全部书'}</button>}
      <p role="status" className="mono-label">{searchStatus === 'loading' ? '正在找书和章节…' : searchStatus === 'error' ? '搜索未完成，请重试。' : `当前找到 ${total} 本。`}</p>
      {searchStatus === 'error' && <div role="alert" className="search-error"><p>搜索没有完成，可以再试一次。</p><button className="sticker-btn" onClick={() => reloadPage()}>重试搜索</button></div>}
      {/* docs/41 修复 1b：筛选激活时的醒目结果条（含本数与一键清除）——
          此前唯一的反馈是一行 mono 小字，筛选结果前几屏视觉几乎不变，用户感知为「不生效」 */}
      {activeFilter ? (
        <div className="filter-active" role="status">
          <b>已选：{activeFilter.label}</b>
          <span>{total} 本</span>
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
          disabled={!total || randomBusy}
          onClick={() => {
            if (!token || !childId || randomBusy) return
            setRandomBusy(true)
            void api.contentBooks(token, { childId, limit: 1, random: true, q: query.trim() || undefined, mood: MOODS.some(m => m.key === moodKey) ? moodKey! : undefined, lang: langFilter === 'all' ? undefined : langFilter, collection: collectionKey ?? undefined, all: collectionAll }).then(result => { if (scope.current !== key) return; const pick = result.books[0]; if (pick) { rememberBooks(result.books); v.openBook(pick.id) } }).catch(() => { if (scope.current === key) v.showToast('没有选好，再试一次') }).finally(() => setRandomBusy(false))
          }}
        >
          {LABELS.random}
        </button>
      </div>
      <div className="filter-row discover-filters">
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
                  <small>{c.subtitle} · 精选 {c.selectedCount ?? Math.min(12, c.total)} 本 / 共 {c.total} 本</small>
                </span>
                {collectionKey === c.id ? <em>已选</em> : null}
              </button>
            ))}
          </div>
        </Dialog>
      ) : null}
      <div className="library">
        {!loaded ? (
          <div>
            <p className="mono-label">书架赶来中…</p>
            <button className="sticker-btn" style={{ marginTop: 8 }} onClick={reloadPage}>
              刷新书架
            </button>
          </div>
        ) : null}
        {pageError ? (
          <div>
            <p className="mono-label">{pageError}</p>
            <button className="sticker-btn" onClick={reloadPage}>
              再试一次
            </button>
          </div>
        ) : null}
        {loaded && !pageError && filtered.length === 0 && searchStatus !== 'loading' && searchStatus !== 'error' ? (
          <div>
            <p className="mono-label">{collectionKey ? '这份书单暂时没有匹配的故事。' : '没找到，换个词试试。'}</p>
            <button className="sticker-btn" onClick={() => { setQuery(''); clearAllFilters() }}>看看全部故事</button>
          </div>
        ) : null}
        {filtered.slice(0, visibleLimit).map((b) => (
          <div key={b.id} className="library-book"><StoryCard book={b} onOpen={openBook} onFav={v.toggleFav} />{b.matchedChapters?.map(ch => <button key={ch.order} className="sticker-btn chapter-match" onClick={() => v.readBook(b.id, ch.order)}>命中章节：{ch.title} · 直接读</button>)}</div>
        ))}
      </div>
      {loaded && !pageError && filtered.length > 0 ? (
        <div ref={loadMoreRef} className="library-more" role="status">
          {hasMore ? '继续下滑，发现更多故事' : `已经看到全部 ${total} 本故事`}
        </div>
      ) : null}
    </>
  )
}

/* ── 我的 ── */
function MyPage() {
  const v = useV8()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'reading' | 'liked' | 'done' | 'words' | 'memory'>('reading')
  const [words, setWords] = useState<WordCardDto[]>([])
  const [wordsError, setWordsError] = useState(false)
  const [wordsLoading, setWordsLoading] = useState(false)
  const token = useSession((s) => s.token)
  const childId = useSession((s) => s.childId)
  // docs/34 P0-7：生词复习（本地翻卡，不打分不评判）+ 删除
  const wordsScope = useRef('')
  wordsScope.current = `${token}:${childId}`
  const [review, setReview] = useState<Array<{ id: string; word: string; lang: string; context: string | null; bookTitle: string | null }>>([])
  const [reviewIdx, setReviewIdx] = useState(0)
  const [reviewing, setReviewing] = useState(false)
  const [reviewAgain, setReviewAgain] = useState<Set<string>>(new Set())
  useEffect(() => { setWords([]); setReview([]); setReviewing(false); setReviewIdx(0); setWordsError(false) }, [token, childId])

  const loadWords = useCallback(() => {
    if (!token || !childId) return
    setWordsLoading(true)
    setWordsError(false)
    const scope = `${token}:${childId}`
    api
      .listWords(childId, token)
      .then((res) => { if (scope === wordsScope.current) setWords(res.cards) })
      .catch(() => { if (scope === wordsScope.current) setWordsError(true) })
      .finally(() => { if (scope === wordsScope.current) setWordsLoading(false) })
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
                复习 {Math.min(5, words.length)} 个词
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
                    {w.context && <p>{w.context}</p>}
                    {(w.sourceBookId ?? w.bookId) && <button className="sticker-btn" onClick={() => { const id = w.sourceBookId ?? w.bookId!; navigate(id.startsWith('imp:') ? `/child/family-book/${encodeURIComponent(id)}/chapter/${w.chapterOrder ?? 1}` : `/child/book/${encodeURIComponent(id)}/chapter/${w.chapterOrder ?? 1}?block=${w.blockOrder ?? 0}`) }}>回到原文</button>}
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
          {token && childId && <MemoryArchive token={token} childId={childId} />}
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
                <IconType />找相同的字 · 每周一次
              </button>
            </div>
          ) : null}
          {arr.map((b) => (
            <StoryCard key={b.id} book={b} onOpen={v.openBook} onFav={v.toggleFav} />
          ))}
          {v.loaded && arr.length === 0 ? <div className="child-empty"><h3>{tab === 'liked' ? '把喜欢的故事留在这里' : tab === 'done' ? '读完的故事，会留在这里' : '你的下一段故事，从这里开始'}</h3><p>{tab === 'liked' ? '点书封上的爱心，想读时就能找到。' : tab === 'done' ? '不用着急，按自己的节奏读。' : '挑一本喜欢的书，下次回来就能接着读。'}</p><button className="sticker-btn primary" onClick={() => navigate('/child/discover')}>去找故事</button></div> : null}
        </div>
      )}
      {litOpen && litItems ? (
        <Dialog label="找相同的字" onClose={() => setLitOpen(false)}>
          <div className="side-card" style={{ maxWidth: 420, width: '100%', background: 'var(--card)' }}>
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
  const { book, error: bookError, retry: retryBook } = useRouteBook(bookId)
  const [chapters, setChapters] = useState<Array<{ order: number; title: string }>>([])
  const [resumeOrder, setResumeOrder] = useState(0)
  const [previewing, setPreviewing] = useState(false)
  const [offlineBusy, setOfflineBusy] = useState(false)
  const offlineAbort = useRef<AbortController | null>(null)
  useEffect(() => () => offlineAbort.current?.abort(), [bookId, token])
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

  if (!book && !bookError) {
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
          <PageHead title="这本书暂时打不开" sub={bookError ?? '可能还没有对你开放，去找故事看看别的。'} index="02" />
          <button className="sticker-btn" onClick={retryBook}>再试一次</button>
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
                {!detailCoverSrc && <ReadingIllustration className="cover-fallback-art" />}
                <span className="cover-title">{book.title}</span>
                {detailCoverSrc ? <AiBadge /> : null}
              </div>
            </div>
            <div className="detail-heading">
              <span className="mono-label">{CATEGORY_LABEL[book.category] ?? '一起读'}</span>
              <h1 className="detail-title">{book.title}</h1>
              <div className="detail-author">
                <span>{book.author}</span><span>{book.meta}</span>
              </div>
            </div>
          </div>
              <div className="hero-actions detail-actions">
                <button className="sticker-btn primary" onClick={() => v.readBook(book.id, resumeOrder || undefined)}>
                  <IconBookOpen />{book.progress > 0 && !book.finished ? LABELS.continueRead : LABELS.start}
                </button>
                <button className="sticker-btn" onClick={() => navigate(`/child/listen/public/${encodeURIComponent(book.id)}`)}><IconPlay />连续听读</button>
              </div>
              <div className="detail-secondary">
                <button className="text-action min-h-[44px]" disabled={previewing} onClick={() => void speakPreview()}>
                  {previewing ? '正在合成…' : LABELS.preview}
                </button>
                <button className="text-action min-h-[44px]" aria-pressed={book.fav} onClick={() => v.toggleFav(book.id)}>
                  {book.fav ? LABELS.likedAlready : LABELS.like}
                </button>
              </div>
              <p className="detail-intro">
                {book.desc}
              </p>
              <dl className="detail-facts">
                <div><dt>章节</dt><dd>{book.chapterCount} 章</dd></div>
                <div><dt>每章约</dt><dd>{Math.round(book.words / Math.max(1, book.chapterCount))} {book.lang === 'en' ? '词' : '字'}</dd></div>
                <div><dt>语言</dt><dd>{book.lang === 'en' ? '英文' : '中文'}</dd></div>
              </dl>
              <section className="section detail-chapters">
                <div className="section-head"><h2>{LABELS.chaptersFrom}</h2><p>{LABELS.chaptersSub}</p></div>
                <div className="chapter-list">
                  {chapterListError && <p role="alert">目录没加载成功。<button className="sticker-btn" onClick={() => setChapterRetry((n) => n + 1)}>重试目录</button></p>}
                  {!chapterListError && !chapters.length && <p role="status">正在打开目录…</p>}
                  {chapters.map((c, i) => (
                    <button key={c.order} className="chapter" onClick={() => v.readBook(book.id, c.order)}>
                      <span className="num">{String(i + 1).padStart(2, '0')}</span><b>{c.title}</b><em>{resumeOrder === c.order ? '上次读到这里' : '打开'}</em>
                    </button>
                  ))}
                </div>
              </section>
              <details className="quiet-disclosure reading-guidance"><DisclosureSummary icon={<IconLeaf />} title="怎么开始读 · 给共读的大人" hint="读、听，或一起读，找到舒服的方式" /><p>{book.readingGuidance ? book.readingGuidance.modes.map(mode => ({ together: '一起读', self: '自主试读', listen: '先听一听' })[mode]).join(' · ') : book.lang === 'en' || book.category === 'primer' || book.words / Math.max(1, book.chapterCount) > 1000 ? '可以先听或和大人一起读，再选择喜欢的一小段。' : '可以先读一小段，需要时打开朗读或请大人一起读。'}</p>{book.readingGuidance && <><p>{book.readingGuidance.advice}</p><p>主题：{book.readingGuidance.topics.join('、') || '未单列'}</p><small>编辑：{book.readingGuidance.reviewer} · {book.readingGuidance.reviewedOn} · 依据：{book.readingGuidance.evidence}</small></>}<p>章节篇幅和书目年龄建议帮助选择内容，不是孩子能力测评。注音和译文以各章节实际提供内容为准。</p></details>
              <details className="quiet-disclosure"><DisclosureSummary icon={<IconShelf />} title="下载与离线阅读" hint="把喜欢的故事带在身边" /><p>主动保存后，本机可离线读 7 天。离线阅读进度暂不同步。</p><div className="hero-actions">
                <button className="sticker-btn" disabled={offlineBusy} onClick={() => {
                  if (!token || offlineBusy) return
                  setOfflineBusy(true)
                  offlineAbort.current = new AbortController()
                  void saveOfflineBook(book, token, false, offlineAbort.current.signal).then(() => v.showToast('文字已保存；本机离线书架可读 7 天'))
                    .catch((e: Error) => v.showToast(e.message)).finally(() => setOfflineBusy(false))
                }}>{offlineBusy ? '正在保存…' : '保存文字到本机 · 试点'}</button>
                <button className="sticker-btn" disabled={offlineBusy} onClick={() => { if (!token || offlineBusy) return; setOfflineBusy(true); offlineAbort.current = new AbortController(); void saveOfflineBook(book, token, true, offlineAbort.current.signal).then(() => v.showToast('图文和已有朗读已下载完整，可离线使用 7 天')).catch((err: Error) => v.showToast(err.message)).finally(() => setOfflineBusy(false)) }}>保存图文与已有朗读到本机</button>{offlineBusy && <button className="sticker-btn" onClick={() => offlineAbort.current?.abort()}>取消下载</button>}
                <button className="sticker-btn" onClick={() => navigate('/offline')}>离线书架</button>
              </div></details>
            <details className="quiet-disclosure"><DisclosureSummary icon={<IconShield />} title="来源、加工说明与版本" hint="了解这本书的出处与审校情况" />
              {provenanceError ? <p role="alert">来源说明未加载。<button onClick={() => setChapterRetry((n) => n + 1)}>重试</button></p> : provenance ? <>
                <p>{provenance.source}</p><p>{provenance.rights?.workTitle}</p><p>{provenance.rights?.note}</p>
                <p className="mono-label">版本 {provenance.contentVersion} · {provenance.reviewStatus === 'reviewed' ? '已留存人工审核记录' : '人工精审待完成'} · 插图可能由 AI 生成</p>
                <p>{provenance.rights?.translator ? `译者：${provenance.rights.translator}` : ''}</p>
              </> : <p role="status">来源说明正在加载…</p>}
            </details>
    </section>
  )
}

/* ── 阅读器路由页（能力在 ReaderPage，V8 画框与语言传入） ── */
function ReaderRoute() {
  const { bookId, order } = useParams()
  const v = useV8()
  const { book, error, retry } = useRouteBook(bookId)
  if (!book) {
    if (!error) {
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
          <PageHead title="这本书暂时打不开" sub={error} />
          <button className="sticker-btn" onClick={retry}>再试一次</button>
          <button className="sticker-btn" onClick={() => v.openBook(bookId ?? '')}>
            去看这本书
          </button>
        </div>
      </div>
    )
  }
  return <ReaderPage key={`${book.id}:${order}`} book={book} order={Number(order ?? 1) || 1} />
}
