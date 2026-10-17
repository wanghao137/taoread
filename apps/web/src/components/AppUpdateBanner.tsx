import { useEffect, useState } from 'react'
import { checkMobileUpdate, type MobileRelease } from '../lib/appUpdate'

/** 原生壳内的新版本提示条（M1-5）：仅原生构建会出结果，web 恒为 null 不渲染。
 * 下载用 window.open 而非 <a target="_blank">：Capacitor WebView 里锚点外链可能把
 * 应用自身导航走，window.open 才会交给系统浏览器。 */
export function AppUpdateBanner(): JSX.Element | null {
  const [release, setRelease] = useState<MobileRelease | null>(null)
  useEffect(() => {
    const timer = window.setTimeout(() => void checkMobileUpdate().then(setRelease), 8000)
    return () => window.clearTimeout(timer)
  }, [])
  if (!release) return null
  return (
    <button
      type="button"
      className="app-update-banner"
      onClick={() => window.open(release.url, '_blank')}
    >
      桃阅读有新版本 v{release.version}，点这里下载后覆盖安装
    </button>
  )
}
