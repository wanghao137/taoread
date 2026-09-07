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
  const childId = useSession((s) => s.childId)
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
        const stored = childId && kids.some((k) => k.id === childId) ? childId : null
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
  }, [token, familyId, childId, setChildId])

  useEffect(() => loadChildren(), [loadChildren])

  // M1：进入月亮门后检查未收尾会话（断线续传）
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

  /** M2 选定：开启共读（服务端幂等）→ 进入确认屏 */
  const handlePick = useCallback(
    async (book: { bookId: string; title: string; deepLink?: string }) => {
      if (!token || !childId) throw new ApiError(0, 'NO_SESSION', '请先回到登录页重新加入')
      await api.startCosession(childId, book.bookId, token)
      setPhase({ kind: 'ready', title: book.title, deepLink: book.deepLink })
    },
    [token, childId],
  )

  /** M1 继续今晚的故事：解析书名与 deepLink 后直达确认屏 */
  const handleResume = useCallback(async () => {
    if (phase.kind !== 'gate' || !phase.active?.bookId || !token) return
    setPhase({ kind: 'resolving' })
    try {
      const info = await api.bookInfo(phase.active.bookId, token)
      setPhase({ kind: 'ready', title: info.title, deepLink: info.deepLink })
    } catch {
      // 书籍信息失败不阻断：至少回到选书流
      setPhase({ kind: 'select' })
    }
  }, [phase, token])

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
            onPick={(id) => {
              setChildId(id)
              setPhase({ kind: 'gate', checking: true, active: null, activeTitle: null })
            }}
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
