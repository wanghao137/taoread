import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ChildDto, type CosessionDto } from '../lib/api'
import { useSession } from '../stores/session'
import { Loading, ErrorState, EmptyState } from '../components/ui'
import { ChildPicker } from './child/ChildPicker'
import { RitualGate } from './child/RitualGate'
import { BookPicker } from './child/BookPicker'
import { ReadyScreen } from './child/ReadyScreen'

type Phase =
  | { kind: 'loading' }
  | { kind: 'load-error'; message?: string }
  | { kind: 'no-children' }
  | { kind: 'pick-child'; children: ChildDto[] }
  | { kind: 'gate'; checking: boolean; active: CosessionDto | null; activeTitle: string | null }
  | { kind: 'select' }
  | { kind: 'ready'; title: string; deepLink?: string }
  | { kind: 'resolving' } // 继续读：正在解析书名/链接

/** 孩子端仪式流（第 6 夜）：绑定档案 → M1 月亮门 → M2 选书 → 选定确认 */
export function ChildHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const setChildId = useSession((s) => s.setChildId)
  const signOut = useSession((s) => s.signOut)

  const [phase, setPhase] = useState<Phase>({ kind: 'loading' })

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
        // childId 经 getState 读取（P2-2）：选择孩子属本地 phase 切换，
        // 不进入本回调依赖，避免 setChildId 触发拉取翻倍
        const storedChildId = useSession.getState().childId
        const stored = storedChildId && kids.some((k) => k.id === storedChildId) ? storedChildId : null
        if (stored) {
          setPhase({ kind: 'gate', checking: true, active: null, activeTitle: null })
        } else if (kids.length === 1 && kids[0]) {
          setChildId(kids[0].id) // 独生孩子自动绑定，少一步点击
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
  }, [token, familyId, setChildId])

  useEffect(() => loadChildren(), [loadChildren])

  const enterGate = useCallback(
    (childId: string) => {
      setChildId(childId)
      setPhase({ kind: 'gate', checking: true, active: null, activeTitle: null })
    },
    [setChildId],
  )

  // M1：进入月亮门后检查未收尾会话（断线续传）
  const childId = useSession((s) => s.childId)
  useEffect(() => {
    if (phase.kind !== 'gate' || !phase.checking || !token || !childId) return
    let alive = true
    api
      .activeCosession(childId, token)
      .then(({ session }) => {
        if (!alive) return
        setPhase({ kind: 'gate', checking: false, active: session, activeTitle: null })
      })
      .catch(() => {
        if (alive) setPhase({ kind: 'gate', checking: false, active: null, activeTitle: null })
      })
    return () => {
      alive = false
    }
  }, [phase, token, childId])

  /** 解析会话真实归属的书名与 deepLink（bookInfo 失败返回 null，不阻断） */
  const resolveBook = useCallback(
    async (bookId: string): Promise<{ title: string; deepLink?: string } | null> => {
      if (!token) return null
      try {
        const info = await api.bookInfo(bookId, token)
        return { title: info.title, deepLink: info.deepLink }
      } catch {
        return null
      }
    },
    [token],
  )

  /** M2 选定：开启共读（服务端幂等）→ 进入确认屏。
   * reused 语义消费（N6-006）：会话若已归属另一本书（微信读书书或纸质书），
   * 确认屏必须显示会话真实归属——显示与账本（共读卡/收尾/成就）永远一致。 */
  const handlePick = useCallback(
    async (book: { bookId: string; title: string; deepLink?: string }) => {
      const currentChildId = useSession.getState().childId
      if (!token || !currentChildId) throw new ApiError(0, 'NO_SESSION', '请先回到登录页重新加入')
      const session = await api.startCosession(currentChildId, book.bookId, token)
      const belongsToAnother =
        session.reused && (session.bookId !== book.bookId || session.bookId === null)
      if (belongsToAnother) {
        // 会话在别的微信读书书上：以会话真实书名/链接进确认屏
        if (session.bookId) {
          const resolved = await resolveBook(session.bookId)
          if (!resolved) {
            // 无法确认会话归属时绝不冒充新书：给正向提示，留在选书屏
            throw new ApiError(409, 'SESSION_ACTIVE', '今晚的故事已经开始啦，先把这本读完吧')
          }
          setPhase({ kind: 'ready', title: resolved.title, deepLink: resolved.deepLink })
          return
        }
        // 会话是纸质书：无 deepLink，确认屏走纸书文案分支（N6-008 复审补）
        setPhase({ kind: 'ready', title: session.paperTitle ?? '今晚的故事' })
        return
      }
      setPhase({ kind: 'ready', title: book.title, deepLink: book.deepLink })
    },
    [token, resolveBook],
  )

  /** M1 继续今晚的故事：解析书名与 deepLink 后直达确认屏（纸质书会话直接展示书名） */
  const handleResume = useCallback(async () => {
    if (phase.kind !== 'gate' || !phase.active) return
    const { bookId, paperTitle } = phase.active
    if (!bookId) {
      // 纸质书会话（P2-1）：无 deepLink，确认屏走纸书文案分支
      setPhase({ kind: 'ready', title: paperTitle ?? '今晚的故事' })
      return
    }
    setPhase({ kind: 'resolving' })
    const resolved = await resolveBook(bookId)
    if (!resolved) {
      // 书籍信息失败不阻断：回到选书流
      setPhase({ kind: 'select' })
      return
    }
    setPhase({ kind: 'ready', title: resolved.title, deepLink: resolved.deepLink })
  }, [phase, resolveBook])

  function body() {
    switch (phase.kind) {
      case 'loading':
        return <Loading label="月亮正在升起…" />
      case 'load-error':
        return <ErrorState message={phase.message} onRetry={loadChildren} />
      case 'no-children':
        return (
          <EmptyState
            emoji="🍼"
            title="还没有小读者档案"
            hint="请爸爸妈妈先在家长端添加，然后回来点亮月亮"
          />
        )
      case 'pick-child':
        return (
          <ChildPicker
            children={phase.children}
            onPick={(id) => enterGate(id)}
          />
        )
      case 'gate':
        return (
          <RitualGate
            checking={phase.checking}
            active={phase.active}
            activeTitle={phase.activeTitle}
            onStart={() => setPhase({ kind: 'select' })}
            onResume={handleResume}
          />
        )
      case 'select':
        return token ? <BookPicker token={token} onPick={handlePick} /> : null
      case 'resolving':
        return <Loading label="把书找出来…" />
      case 'ready':
        return <ReadyScreen title={phase.title} deepLink={phase.deepLink} />
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">桃阅读</h1>
        <button
          type="button"
          onClick={signOut}
          className="min-h-touch cursor-pointer rounded-full border border-night-border px-5 text-base text-ink-secondary"
        >
          换一个家庭
        </button>
      </div>
      <div className="flex flex-1 flex-col py-6">{body()}</div>
    </main>
  )
}
