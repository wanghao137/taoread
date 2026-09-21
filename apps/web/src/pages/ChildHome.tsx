/**
 * 孩子端入口（v8 贴纸绘本重构）：登录引导 → 选孩子 → V8App（demo 1:1）。
 * 旧仪式流（门屏/出发/星海/庆祝）由 v8 的 首页-找故事-书架-阅读器-结算 承接；
 * 家庭码登录、多孩选择、服务端共读会话与进度全部保留。
 */
import { useCallback, useEffect, useState } from 'react'
import { api, ApiError, type ChildDto } from '../lib/api'
import { useSession } from '../stores/session'
import { Loading, ErrorState, EmptyState, TaSheet, TaButton } from '../components/ui'
import { ChildPicker } from './child/ChildPicker'
import { V8App } from './child/V8App'

export function ChildHome() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const setChild = useSession((s) => s.setChild)
  const signOut = useSession((s) => s.signOut)
  const childId = useSession((s) => s.childId)

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | undefined>(undefined)
  const [childrenList, setChildrenList] = useState<ChildDto[]>([])
  const [pickOpen, setPickOpen] = useState(false)
  const [confirmSwitch, setConfirmSwitch] = useState(false)

  const [childName, setChildName] = useState('小读者')

  const loadChildren = useCallback(() => {
    if (!token || !familyId) return
    let alive = true
    setLoading(true)
    api
      .familyView(familyId, token)
      .then((view) => {
        if (!alive) return
        const kids = view.children
        setChildrenList(kids)
        if (kids.length === 0) {
          setLoading(false)
          return
        }
        const storedChildId = useSession.getState().childId
        const stored = storedChildId && kids.some((k) => k.id === storedChildId) ? storedChildId : null
        if (stored || kids.length === 1) {
          const target = kids.find((k) => k.id === stored) ?? kids[0]
          if (target && !stored) setChild({ childId: target.id, stage: target.stage })
          if (target) setChildName(target.nickname)
          setLoading(false)
          setPickOpen(false)
        } else {
          setLoading(false)
          setPickOpen(true)
        }
      })
      .catch((err: unknown) => {
        if (!alive) return
        setLoadError(err instanceof ApiError ? err.message : undefined)
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [token, familyId, setChild])

  useEffect(() => void loadChildren(), [loadChildren])

  // 已选孩子但名字缺失（刷新后）：从列表回填
  useEffect(() => {
    if (!childId || childrenList.length === 0) return
    const me = childrenList.find((k) => k.id === childId)
    if (me) setChildName(me.nickname)
  }, [childId, childrenList])

  function body() {
    if (loading) return <Loading label="小桃正在准备…" />
    if (loadError) return <ErrorState message={loadError} onRetry={loadChildren} />
    if (childrenList.length === 0) {
      return (
        <EmptyState
          art="nursery-window"
          mood="sleepy"
          title="还没有小读者档案"
          hint="请爸爸妈妈先在家长端添加，然后回来选书"
          action={{ label: '回到登录页', onClick: () => useSession.getState().signOut() }}
        />
      )
    }
    if (pickOpen || !childId) {
      return <ChildPicker children={childrenList} onPick={(c) => { setChild(c); setPickOpen(false) }} />
    }
    return <V8App childName={childName} onSwitchFamily={() => setConfirmSwitch(true)} />
  }

  return (
    <main className="min-h-dvh">
      {body()}
      <TaSheet open={confirmSwitch} onClose={() => setConfirmSwitch(false)} title="要换一个家庭吗？">
        <p className="text-sm leading-relaxed text-ink-700">
          回到登录页以后，这次读到一半的故事会先保存在云端，下次进来还能接着读。
        </p>
        <div className="mt-5 flex gap-3">
          <TaButton variant="secondary" className="flex-1" onClick={() => setConfirmSwitch(false)}>
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
