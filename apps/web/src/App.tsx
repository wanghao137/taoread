import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useSession } from './stores/session'
import { api } from './lib/api'
import { LoginPage } from './pages/LoginPage'
import { PrivacyPage } from './pages/PrivacyPage'
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
const OpsPage = lazy(() => import('./pages/OpsPage').then((m) => ({ default: m.OpsPage })))
// DEV 条件下才产生动态 import：生产构建时 import.meta.env.DEV 被静态替换为 false，
// rollup 会把该分支连同 chunk 一起裁掉（此前 KitchenSink chunk 一直随产包发布）。
const KitchenSink = import.meta.env.DEV
  ? lazy(() => import('./pages/KitchenSink').then((m) => ({ default: m.KitchenSink })))
  : null

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
  // 安静模式的 CSS 一半：v8.css 的 html[data-calm='1'] 规则停用原生 CSS 过渡/旋转/
  // 浮动动画（MotionConfig 只管 framer-motion）。此前该属性从未被写入（死规则）。
  useEffect(() => {
    if (calmMode) document.documentElement.setAttribute('data-calm', '1')
    else document.documentElement.removeAttribute('data-calm')
  }, [calmMode])
  return (
    <MotionConfig reducedMotion={calmMode ? 'always' : 'user'}>
      {/* docs/34 P2-7：跳到主内容（键盘/读屏用户跳过导航） */}
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <CalmModeBootstrap />
      <Suspense fallback={<Loading label="桃阅读正在开门…" />}>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          {/* 隐私政策（docs/34 P1-3）：公开静态页，孩子端红线内无外链 */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route
            /* 尾部 * 必须保留：ChildHome→V8App 用「后代 <Routes>」做子路由（/child/today、
             * /child/book/:id…），父路由不带 * 时任何子路径都匹配失败、被兜底重定向回首页
             * （React Router v6 会出 descendant-routes 警告，审计 e2e 抓到的回归） */
            path="/child/*"
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
          {/* 运营体检（docs/34 P2-10）：家长角色、不在导航内，直接访问 /ops */}
          <Route
            path="/ops"
            element={
              <RequireRole role="parent">
                <OpsPage />
              </RequireRole>
            }
          />
          {/* 设计系统调试页：只在开发构建开放，生产构建不挂路由（含 emoji 字典等内部素材） */}
          {import.meta.env.DEV && KitchenSink && (
            <Route path="/dev/kitchen-sink" element={<KitchenSink />} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  )
}
