import { Navigate, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useSession } from './stores/session'
import { LoginPage } from './pages/LoginPage'
import { ChildHome } from './pages/ChildHome'
import { ParentHome } from './pages/ParentHome'
import { KitchenSink } from './pages/KitchenSink'

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
  if (!token || !role) return <Navigate to="/login" replace />
  return <Navigate to={role === 'child' ? '/child' : '/parent'} replace />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
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
        <Route path="/dev/kitchen-sink" element={<KitchenSink />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MotionConfig>
  )
}
