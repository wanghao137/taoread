import { StrictMode, Component, type ReactNode } from 'react'
import { IconSun } from './components/ui/icons'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AppUpdateBanner } from './components/AppUpdateBanner'
import './index.css'
import './v8.css'
import './reading-ui.css'
import './theme.css'
import './secondary-ui.css'

/** 全局错误边界：任何未捕获渲染异常都不该让孩子看到白屏 */
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main id="main-content" className="app recovery-page">
          <section className="panel recovery-card">
          <span aria-hidden className="text-sun">
            <IconSun size={56} />
          </span>
          <p className="text-lg font-bold">翻开书页，故事就开始啦</p>
          <p className="text-ink-700">刷新一下，我们从头开始</p>
          <button
            type="button"
            onClick={() => location.assign('/')}
            className="sticker-btn primary"
          >
            回到首页
          </button>
          </section>
        </main>
      )
    }
    return this.props.children
  }
}

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('missing #root')

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <>
          <App />
          {/* M1-5：原生壳内升级提示条；web 构建恒为 null，不渲染任何节点 */}
          <AppUpdateBanner />
        </>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

/**
 * Service Worker：v2（docs/34 P1-4）可安装 PWA + 静态外壳轻缓存。
 * API 与导航绝不缓存（家庭数据带会话凭据）；仅 /assets//fonts//icons//brand/
 * cache-first。v1 时代的「清理历史预缓存」能力保留（activate 清旧版本缓存）。
 */
if (!import.meta.env.VITE_TAO_NATIVE && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => undefined)
  })
}
