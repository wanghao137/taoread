import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useSession } from './stores/session'
import { api } from './lib/api'
import { LoginPage } from './pages/LoginPage'
import { Loading } from './components/ui'

/**
 * 路由级代码分割（docs/11 P0-7）：登录页直出，孩子端/家长端/演示页各自懒加载。
 * 浏览器闲置时预取另一端，切换角色时不再卡首屏。
 */
const ChildHome = lazy(() =>
  import('./pages/ChildHome').then((m) => ({ default: m.ChildHome })),
)
const ParentHome = lazy(() =>
  import('./pages/ParentHome').then((m) => ({ default: m.ParentHome })),
)
const KitchenSink = lazy(() =>
  import('./pages/KitchenSink').then((m) => ({ default: m.KitchenSink })),
)

function prefetchOtherHalf(role: 'parent' | 'child'): void {
  // 登录后浏览器空闲时把另一端也拉下来，家长/孩子切换零等待
  const run = () => {
    if (role === 'child') void import('./pages/ParentHome')
    else void import('./pages/ChildHome')
  }
  if ('requestIdleCallback' in globalThis) {
    globalThis.requestIdleCallback(run, { timeout: 4000 })
  } else {
    setTimeout(run, 2000)
  }
}

/** 路由守卫：无会话去登录；角色与路由不匹配时纠正到自己的端 */
function RequireRole({ role, children }: { role: 'parent' | 'child'; children: JSX.Element }) {
  const token = useSession((s) => s.token)
  const sessionRole = useSession((s) => s.role)
  if (!token || !sessionRole) return <Navigate to="/login" replace />
  if (sessionRole !== role) {
    return <Navigate to={sessionRole === 'child' ? '/child' : '/parent'} replace />
  }
  return children
}

function HomeRedirect() {
  const token = useSession((s) => s.token)
  const role = useSession((s) => s.role)
  useEffect(() => {
    if (role) prefetchOtherHalf(role)
  }, [role])
  if (!token || !role) return <Navigate to="/login" replace />
  return <Navigate to={role === 'child' ? '/child' : '/parent'} replace />
}

/**
 * 安静模式引导（docs/15 P1-C）：会话存在时拉一次家庭设置，把 calmMode 写进会话 store。
 * 孩子端通常拿不到系统辅助功能开关，家庭级开关是唯一能让「动效可关闭」落地的路径；
 * GET 接口对家长/孩子角色都开放（只读，PATCH 仍限家长）。
 */
function CalmModeBootstrap() {
  const token = useSession((s) => s.token)
  const familyId = useSession((s) => s.familyId)
  const setCalmMode = useSession((s) => s.setCalmMode)
  useEffect(() => {
    if (!token || !familyId) return
    let alive = true
    void api
      .getSettings(familyId, token)
      .then((dto) => {
        if (alive) setCalmMode(dto.calmMode === true)
      })
      .catch(() => {
        /* 拉取失败时保持当前态，不阻塞进应用 */
      })
    return () => {
      alive = false
    }
  }, [token, familyId, setCalmMode])
  return null
}

export default function App() {
  const calmMode = useSession((s) => s.calmMode)
  return (
    <MotionConfig reducedMotion={calmMode ? 'always' : 'user'}>
      <CalmModeBootstrap />
      <Suspense fallback={<Loading label="桃阅读正在开门…" />}>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/child"
            element={
              <RequireRole role="child">
                <ChildHome />
              </RequireRole>
            }
          />
          <Route
            path="/parent"
            element={
              <RequireRole role="parent">
                <ParentHome />
              </RequireRole>
            }
          />
          {/* 设计系统调试页：只在开发构建开放，生产构建不挂路由（含 emoji 字典等内部素材） */}
          {import.meta.env.DEV && <Route path="/dev/kitchen-sink" element={<KitchenSink />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  )
}
