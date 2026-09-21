import { useCallback, useEffect, useRef, useState } from 'react'
import { api, ApiError, type ChildDto, type ContentBookDto, type CosessionDto, type UnlockDto } from '../lib/api'
import { useSession } from '../stores/session'
import { Loading, ErrorState, EmptyState, TaSheet, TaButton } from '../components/ui'
import { ChildPicker } from './child/ChildPicker'
import { RitualGate } from './child/RitualGate'
import { BookPicker } from './child/BookPicker'
import { ReadyScreen } from './child/ReadyScreen'
import { DepartureScreen } from './child/DepartureScreen'
import { FinishScreen } from './child/FinishScreen'
import { CelebrationScreen } from './child/CelebrationScreen'
import { StarSea } from './child/StarSea'
import { OnboardingTour, onboardingSeen } from './child/OnboardingTour'
import { ChildTabBar } from '../components/ui/ChildTabBar'
import { AchievementWall } from './child/AchievementWall'
import { BedtimeScreen } from './child/BedtimeScreen'
import { BookShelf } from './child/BookShelf'
import { BookDetail } from './child/BookDetail'
import { ReaderScreen } from './child/ReaderScreen'

interface BookRef {
  /** 会话/书籍归属的微信读书 bookId（纸质书会话为空；cbf: 前缀 = 自研公版书） */
  bookId?: string
  title: string
  deepLink?: string
  cover?: string
  /** 自研书内容包（cbf: 书专有）：出发屏「开始阅读」直达阅读器 */
  content?: ContentBookDto
}

type Phase =
  | { kind: 'loading' }
  | { kind: 'load-error'; message?: string }
  | { kind: 'no-children' }
  | { kind: 'pick-child'; children: ChildDto[] }
  | {
      kind: 'gate'
      checking: boolean
      active: CosessionDto | null
      activeTitle: string | null
      overtime?: boolean
    }
  | { kind: 'bedtime'; hasActive: boolean; session: CosessionDto | null }
  | { kind: 'wall' }
  | { kind: 'select' }
  | { kind: 'ready'; book: BookRef; sessionId: string }
  | { kind: 'departure'; book: BookRef; sessionId: string; isPaper: boolean }
  | { kind: 'finish'; sessionId: string; bookId: string | null; title: string }
  | { kind: 'celebrate'; unlocked: UnlockDto[] }
  | { kind: 'star-sea'; bookId: string; title: string }
  | { kind: 'resolving' } // 继续读：正在解析书名/链接
  | { kind: 'shelf' } // v2 桃书架
  | { kind: 'detail'; book: ContentBookDto } // v2 书籍详情页（A2）
  | { kind: 'reading'; book: ContentBookDto; startChapter: number; startBlock: number } // v2 自研阅读器

/**
 * 底部导航只在这些阶段展示（P1-2）。
 * 阅读/收尾/庆祝是全屏沉浸流程，自带导航，钉一条 bar 会遮挡画面。
 */
const SHOW_TAB_BAR_PHASES = new Set<Phase['kind']>([
  'gate',
  'bedtime',
  'wall',
  'shelf',
  'detail',
  'resolving',
])

/** 孩子端阅读流：绑定档案 → M1 首页 → M2 选书 → M3 出发 → M4 收尾 → 庆祝 */
export function ChildHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const setChild = useSession((s) => s.setChild)
  const signOut = useSession((s) => s.signOut)

  const [phase, setPhase] = useState<Phase>({ kind: 'loading' })
  /** 换家庭确认层（docs/11 P0-8） */
  const [confirmSwitch, setConfirmSwitch] = useState(false)
  /** 首次运行引导（docs/13 P1-1）：看过一次就不再弹，localStorage 标记 */
  const [showOnboarding, setShowOnboarding] = useState(false)
  /** 桃子墙可收桃子数（底部导航角标；0 时不显示角标） */
  const [lampTotal, setLampTotal] = useState(0)

  // 门屏双通道防连点（N7-006，延续 BookPicker 的 busyRef 模式）
  const gateBusyRef = useRef(false)

  const loadChildren = useCallback(() => {
    if (!token || !familyId) return
    let alive = true
    setPhase({ kind: 'loading' })
    api
      .familyView(familyId, token)
      .then((view) => {
        if (!alive) return
        const kids = view.children
        if (kids.length === 0) {
          setPhase({ kind: 'no-children' })
          return
        }
        // childId 经 getState 读取（N6-009）：选择孩子属本地 phase 切换，不触发重拉
        const storedChildId = useSession.getState().childId
        const stored = storedChildId && kids.some((k) => k.id === storedChildId) ? storedChildId : null
        if (stored || (kids.length === 1 && kids[0])) {
          // 单娃或记忆中的孩子直接进门屏；选孩子那一步在 pick-child 里
          if (!stored && kids[0]) setChild({ childId: kids[0].id, stage: kids[0].stage })
          // 第一次进孩子端先看三步引导（P1-1），看完再进门屏
          if (!onboardingSeen()) setShowOnboarding(true)
          setPhase({ kind: 'gate', checking: true, active: null, activeTitle: null })
        } else {
          setPhase({ kind: 'pick-child', children: kids })
        }
      })
      .catch((err: unknown) => {
        if (!alive) return
        setPhase({ kind: 'load-error', message: err instanceof ApiError ? err.message : undefined })
      })
    return () => {
      alive = false
    }
  }, [token, familyId, setChild])

  useEffect(() => loadChildren(), [loadChildren])

  const enterGate = useCallback(
    (child: { childId: string; stage: string }) => {
      setChild(child)
      // 选孩子这条路也要引导（P1-1）：多孩家庭第一次进同样没看过
      if (!onboardingSeen()) setShowOnboarding(true)
      setPhase({ kind: 'gate', checking: true, active: null, activeTitle: null })
    },
    [setChild],
  )

  /** 已绑定孩子的回门捷径：从会话读 stage（onBack 类回调只有 childId） */
  const reEnterGate = useCallback(
    (id: string) => {
      const stage = useSession.getState().childStage ?? '3-5'
      enterGate({ childId: id, stage })
    },
    [enterGate],
  )

  // M1：进入首页后检查未收尾会话（断线续传）+ 服务端时段窗口（就寝/超时，第 8 夜）
  const childId = useSession((s) => s.childId)

  // 桃子总数（底部导航角标用；失败静默，角标不亮总比报错强）
  useEffect(() => {
    if (!token || !childId) return
    let alive = true
    api
      .achievements(childId, token)
      .then((a) => alive && setLampTotal(a.nightLamps.length))
      .catch(() => {
        // 角标是锦上添花，失败绝不打断主流程
      })
    return () => {
      alive = false
    }
  }, [token, childId])
  useEffect(() => {
    if (phase.kind !== 'gate' || !phase.checking || !token || !childId) return
    let alive = true
    void Promise.all([
      api.activeCosession(childId, token),
      api.ritualWindow(childId, token).catch(() => null), // 窗口失败静默降级为 open（功能可用性优先）
    ]).then(([activeRes, windowRes]) => {
      if (!alive) return
      const session = activeRes.session
      const mode = windowRes?.mode ?? 'open'
      if (mode === 'bedtime') {
        setPhase({ kind: 'bedtime', hasActive: session !== null, session })
        return
      }
      setPhase({
        kind: 'gate',
        checking: false,
        active: session,
        activeTitle: session && !session.bookId ? session.paperTitle : null,
        overtime: mode === 'overtime',
      })
    }).catch(() => {
      // 网络失败降级为无会话门屏：续传/收尾通道仍在，服务端幂等兜底（N8-002）
      if (alive) setPhase({ kind: 'gate', checking: false, active: null, activeTitle: null })
    })
    return () => {
      alive = false
    }
  }, [phase, token, childId])

  /** 解析会话/书籍的书名、封面与 deepLink（bookInfo 失败返回 null，不阻断）
   *  对抗审查修复：cbf: 前缀是自研公版书，走内容域接口；
   *  之前一律打微信书 info 接口，自研书必 404（噪音 + 多余往返）。 */
  const resolveBook = useCallback(
    async (bookId: string): Promise<BookRef | null> => {
      if (!token) return null
      try {
        if (bookId.startsWith('cbf:')) {
          const contentId = bookId.slice(4)
          const info = await api.contentBook(contentId, token)
          return {
            bookId,
            title: info.title,
            ...(info.coverArtUrl ? { cover: info.coverArtUrl } : {}),
            content: info,
          }
        }
        const info = await api.bookInfo(bookId, token)
        return {
          bookId,
          title: info.title,
          ...(info.deepLink ? { deepLink: info.deepLink } : {}),
          ...(info.cover ? { cover: info.cover } : {}),
        }
      } catch {
        return null
      }
    },
    [token],
  )

  /** M2 选定：开启共读（服务端幂等）→ 确认屏。
   * reused 语义消费（N6-006）：确认屏永远显示会话真实归属的那本。 */
  const handlePick = useCallback(
    async (book: { bookId: string; title: string; deepLink?: string; cover?: string }) => {
      const currentChildId = useSession.getState().childId
      if (!token || !currentChildId) throw new ApiError(0, 'NO_SESSION', '请先回到登录页重新加入')
      const session = await api.startCosession(currentChildId, book.bookId, token)
      const belongsToAnother =
        session.reused && (session.bookId !== book.bookId || session.bookId === null)
      if (belongsToAnother) {
        if (session.bookId) {
          const resolved = await resolveBook(session.bookId)
          if (!resolved) {
            throw new ApiError(409, 'SESSION_ACTIVE', '这本书已经开始啦，先把这本读完吧')
          }
          setPhase({ kind: 'ready', book: resolved, sessionId: session.id })
          return
        }
        // 会话是纸质书：确认屏走纸书出发分支
        setPhase({
          kind: 'ready',
          book: { title: session.paperTitle ?? '这次的故事' },
          sessionId: session.id,
        })
        return
      }
      setPhase({
        kind: 'ready',
        sessionId: session.id,
        book: {
          bookId: session.bookId ?? book.bookId,
          title: book.title,
          ...(book.deepLink ? { deepLink: book.deepLink } : {}),
          ...(book.cover ? { cover: book.cover } : {}),
        },
      })
    },
    [token, resolveBook],
  )

  /** M1 继续去读：解析后进出发卡；解析失败回门屏（N7-001：绝不降级进 select——
   * active 会话存在时 select 无法开新书也回不到收尾，是死路） */
  const handleResume = useCallback(async () => {
    if (phase.kind !== 'gate' || !phase.active || gateBusyRef.current) return
    gateBusyRef.current = true
    try {
      const { bookId, paperTitle } = phase.active
      const sessionId = phase.active.id
      if (!bookId) {
        // 纸质书会话：无 deepLink，出发卡走纸书分支
        setPhase({
          kind: 'departure',
          book: { title: paperTitle ?? '这次的故事' },
          sessionId,
          isPaper: true,
        })
        return
      }
      setPhase({ kind: 'resolving' })
      const resolved = await resolveBook(bookId)
      if (!resolved) {
        // 解析失败回门屏：续传卡仍在，「读完收尾」通道可达
        setPhase({ kind: 'gate', checking: false, active: phase.active, activeTitle: null })
        return
      }
      setPhase({ kind: 'departure', book: resolved, sessionId, isPaper: false })
    } finally {
      gateBusyRef.current = false
    }
  }, [phase, resolveBook])

  /** M1 读完收尾：解析书名（金句区按 bookId 拉热门划线） */
  const handleFinishEntry = useCallback(async () => {
    if (phase.kind !== 'gate' || !phase.active || gateBusyRef.current) return
    gateBusyRef.current = true
    try {
      const { bookId, paperTitle } = phase.active
      const sessionId = phase.active.id
      if (!bookId) {
        setPhase({ kind: 'finish', sessionId, bookId: null, title: paperTitle ?? '这次的故事' })
        return
      }
      setPhase({ kind: 'resolving' })
      const resolved = await resolveBook(bookId)
      setPhase({
        kind: 'finish',
        sessionId,
        bookId,
        title: resolved?.title ?? paperTitle ?? '这次的故事',
      })
    } finally {
      gateBusyRef.current = false
    }
  }, [phase, resolveBook])

  /**
   * v2：从详情页/书架打开一本内容域书，进入自研阅读器。
   * C2：进入阅读器即开启共读会话，使收尾时 durationSec 记录真实阅读时长
   * （原先只在「读完」时开会话，起止几乎同时，周报分钟数系统性漏掉工具内阅读）。
   * startChapter/startBlock 由调用方决定（详情页「接着读」读真实进度，「试读」固定第 1 章）。
   */
  const openShelfBookAt = useCallback(
    async (book: ContentBookDto, startChapter: number, startBlock: number) => {
      if (!token || !childId) return
      try {
        await api.startCosession(childId, book.bookId, token)
      } catch {
        // 就寝窗口外/限流等：会话开不了也不阻断阅读，只是时长不入账
      }
      setPhase({ kind: 'reading', book, startChapter, startBlock })
    },
    [token, childId],
  )

  function body() {
    switch (phase.kind) {
      case 'loading':
        return <Loading label="小桃正在准备…" />
      case 'load-error':
        return <ErrorState message={phase.message} onRetry={loadChildren} />
      case 'no-children':
        return (
          <EmptyState
            art="nursery-window"
            mood="sleepy"
            title="还没有小读者档案"
            hint="请爸爸妈妈先在家长端添加，然后回来选书"
            // 不能是死路：孩子拿着设备时，唯一可行的出口是退回登录页让家长加入（P1-1）
            action={{ label: '回到登录页', onClick: () => useSession.getState().signOut() }}
          />
        )
      case 'pick-child':
        return <ChildPicker children={phase.children} onPick={(c) => enterGate(c)} />
      case 'gate':
        return (
          <>
            {showOnboarding ? (
              <OnboardingTour onDone={() => setShowOnboarding(false)} />
            ) : (
              <RitualGate
                checking={phase.checking}
                active={phase.active}
                activeTitle={phase.activeTitle}
                overtime={phase.overtime}
                onStart={() => setPhase({ kind: 'select' })}
                onResume={() => void handleResume()}
                onFinish={() => void handleFinishEntry()}
                onWall={() => setPhase({ kind: 'wall' })}
              />
            )}
          </>
        )
      case 'bedtime':
        return (
          <BedtimeScreen
            hasActive={phase.hasActive}
            onFinish={() => {
              const s = phase.session
              if (!s) return
              if (!s.bookId) {
                setPhase({ kind: 'finish', sessionId: s.id, bookId: null, title: s.paperTitle ?? '这次的故事' })
                return
              }
              setPhase({ kind: 'resolving' })
              void resolveBook(s.bookId).then((resolved) => {
                setPhase({
                  kind: 'finish',
                  sessionId: s.id,
                  bookId: s.bookId,
                  title: resolved?.title ?? s.paperTitle ?? '这次的故事',
                })
              })
            }}
          />
        )
      case 'wall':
        return token && childId ? (
          <AchievementWall childId={childId} token={token} onBack={() => reEnterGate(childId)} />
        ) : null
      case 'select':
        return token ? (
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() =>
                setPhase({ kind: 'gate', checking: true, active: null, activeTitle: null })
              }
              className="min-h-touch cursor-pointer self-start rounded-full border-2 border-ink bg-paper-200 px-4 text-sm font-bold text-ink-700 shadow-xs"
            >
              ← 回到首页
            </button>
            <BookPicker token={token} onPick={handlePick} />
          </div>
        ) : null
      case 'resolving':
        return <Loading label="把书找出来…" />
      case 'star-sea':
        return token ? (
          <StarSea
            bookId={phase.bookId}
            title={phase.title}
            token={token}
            onBack={() => (childId ? reEnterGate(childId) : undefined)}
          />
        ) : null
      case 'ready':
        return (
          <ReadyScreen
            title={phase.book.title}
            cover={phase.book.cover}
            bookId={phase.book.bookId}
            onStarSea={() =>
              setPhase({ kind: 'star-sea', bookId: phase.book.bookId ?? '', title: phase.book.title })
            }
            onDepart={() => {
              // sessionId 已在 handlePick 落入 phase（无多余请求）
              setPhase({
                kind: 'departure',
                book: phase.book,
                sessionId: phase.sessionId,
                isPaper: !phase.book.bookId,
              })
            }}
          />
        )
      case 'departure':
        return (
          <DepartureScreen
            title={phase.book.title}
            cover={phase.book.cover}
            deepLink={phase.book.deepLink}
            isPaper={phase.isPaper}
            /* 自研公版书：出发屏直达阅读器（对抗审查修复：原来只会提示「去微信读书找」，死路） */
            onStartReader={
              phase.book.content
                ? () => void openShelfBookAt(phase.book.content!, 1, 0)
                : undefined
            }
            onFinish={() =>
              setPhase({
                kind: 'finish',
                sessionId: phase.sessionId,
                bookId: phase.book.bookId ?? null,
                title: phase.book.title,
              })
            }
          />
        )
      case 'finish':
        return token ? (
          <FinishScreen
            sessionId={phase.sessionId}
            bookId={phase.bookId}
            title={phase.title}
            token={token}
            onFinished={(unlocked) => setPhase({ kind: 'celebrate', unlocked })}
          />
        ) : null
      case 'celebrate':
        return <CelebrationScreen unlocked={phase.unlocked} onBack={() => reEnterGate(childId ?? '')} />
      case 'shelf':
        return childId ? (
          <BookShelf
            onBack={() => reEnterGate(childId)}
            onOpen={(book) => setPhase({ kind: 'detail', book })}
          />
        ) : null
      case 'detail':
        return childId ? (
          <BookDetail
            book={phase.book}
            onBack={() => setPhase({ kind: 'shelf' })}
            onStart={(startChapter) => {
              // 「接着读」时取真实块位置恢复（C3）；目录直点某章则从该章顶部开始
              if (!token || startChapter !== 0) {
                void openShelfBookAt(phase.book, startChapter, 0)
                return
              }
              api
                .contentProgress(phase.book.id, childId, token)
                .then((res) => {
                  const ch = res.progress.finished ? 1 : res.progress.chapterOrder
                  const blk = res.progress.finished ? 0 : res.progress.blockOrder
                  void openShelfBookAt(phase.book, ch, blk)
                })
                .catch(() => void openShelfBookAt(phase.book, 1, 0))
            }}
            onPreview={() => {
              void openShelfBookAt(phase.book, 1, 0)
            }}
          />
        ) : null
      case 'reading':
        return (
          <ReaderScreen
            contentId={phase.book.id}
            bookTitle={phase.book.title}
            coverArt={phase.book.coverArt}
            coverFrom={phase.book.coverFrom}
            coverTo={phase.book.coverTo}
            lang={phase.book.lang}
            totalChapters={phase.book.chapterCount}
            startChapter={phase.startChapter}
            startBlock={phase.startBlock}
            onExit={(finished) => {
              if (finished && childId) {
                // 读完触发收尾流：开共读会话（cbf: 前缀）再走既有 M4
                void api
                  .startCosession(childId, phase.book.bookId, token ?? '')
                  .then((session) =>
                    setPhase({
                      kind: 'finish',
                      sessionId: session.id,
                      bookId: phase.book.bookId,
                      title: phase.book.title,
                    }),
                  )
                  .catch(() => setPhase({ kind: 'shelf' }))
                return
              }
              // 中途退出：回到书架（不是首页，孩子的上下文还在选书里）
              setPhase({ kind: 'shelf' })
            }}
          />
        )
    }
  }

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-8 md:max-w-2xl lg:max-w-7xl lg:px-10">
      {/* 宽屏侧翼氛围层（任务1：PC 两侧不再空置）——纯装饰，小屏隐藏 */}
      <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 right-0 hidden xl:block">
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-terra-50 blur-3xl" />
        <div className="absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-sun/20 blur-3xl" />
        <div className="absolute left-16 top-1/3 h-6 w-6 rotate-12 rounded-xl border-2 border-ink bg-sun shadow-xs" />
        <div className="absolute left-24 top-[45%] h-4 w-4 rounded-full border-2 border-ink bg-sky" />
        <div className="absolute right-20 top-28 h-5 w-5 rounded-full border-2 border-ink bg-rose" />
        <div className="absolute right-28 top-[42%] h-7 w-7 rotate-6 rounded-xl border-2 border-ink bg-mint shadow-xs" />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="bg-terra-gradient bg-clip-text font-display text-2xl font-bold text-transparent lg:text-3xl">
          桃阅读
        </h1>
        <button
          type="button"
          // 孩子误触会丢掉整个会话：先弹确认层（docs/11 P0-8 / MC-4 容错）
          onClick={() => setConfirmSwitch(true)}
          className="min-h-touch cursor-pointer rounded-full border-2 border-ink bg-paper-200 px-4 text-sm font-bold text-ink-700 shadow-xs"
        >
          换家庭
        </button>
      </div>
      <div className="flex flex-1 flex-col py-6 pb-28 lg:pb-24">{body()}</div>

      {/* 持久底部导航（P1-2）：只在非沉浸阶段展示，阅读器/收尾/庆祝自己有导航 */}
      {SHOW_TAB_BAR_PHASES.has(phase.kind) ? (
        <ChildTabBar
          active={phase.kind === 'wall' ? 'wall' : phase.kind === 'shelf' || phase.kind === 'detail' ? 'shelf' : 'home'}
          peachCount={lampTotal}
          onSelect={(tab) => {
            if (tab === 'home') reEnterGate(useSession.getState().childId ?? '')
            else if (tab === 'shelf') setPhase({ kind: 'shelf' })
            else if (tab === 'wall' && useSession.getState().childId) setPhase({ kind: 'wall' })
          }}
        />
      ) : null}

      {/* 换家庭确认：把「不可逆」变成「可取消」 */}
      <TaSheet open={confirmSwitch} onClose={() => setConfirmSwitch(false)} title="要换一个家庭吗？">
        <p className="text-sm leading-relaxed text-ink-700">
          回到登录页以后，这次读到一半的故事会先保存在云端，下次进来还能接着读。
        </p>
        <div className="mt-5 flex gap-3">
          <TaButton
            variant="secondary"
            className="flex-1"
            onClick={() => setConfirmSwitch(false)}
          >
            我按错啦
          </TaButton>
          <TaButton className="flex-1" onClick={signOut}>
            确认换家庭
          </TaButton>
        </div>
      </TaSheet>
    </main>
  )
}
