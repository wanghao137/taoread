import { StrictMode, Component, type ReactNode } from 'react'
import { IconMoon } from './components/ui/icons'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/** 全局错误边界：任何未捕获渲染异常都不该让孩子看到白屏 */
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
          <span aria-hidden className="text-terra-300">
            <IconMoon size={56} />
          </span>
          <p className="text-lg font-bold">月亮眨了下眼，故事翻了一页</p>
          <p className="text-ink-700">刷新一下，我们从头开始</p>
          <button
            type="button"
            onClick={() => location.assign('/')}
            className="bg-terra min-h-touch cursor-pointer rounded-full px-8 text-lg font-bold text-white"
          >
            回到首页
          </button>
        </div>
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
