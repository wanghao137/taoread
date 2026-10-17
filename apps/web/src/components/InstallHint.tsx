import { useEffect, useState } from 'react'
import { canInstall, isIOS, isStandalone, onInstallAvailability, promptInstall } from '../lib/installPrompt'

/** 设置浮层内的安装入口：Android 一键安装；iOS 给「添加到主屏幕」图文步骤 */
export function InstallHint(): JSX.Element | null {
  const [installable, setInstallable] = useState(canInstall())
  useEffect(() => onInstallAvailability(() => setInstallable(canInstall())), [])
  if (isStandalone()) return null

  if (installable) {
    return (
      <section className="panel install-hint">
        <p>把桃阅读装成 App，图标一点就到，故事不迷路</p>
        <button
          type="button"
          className="sticker-btn primary"
          onClick={() => void promptInstall()}
        >
          安装桃阅读
        </button>
      </section>
    )
  }
  if (isIOS()) {
    return (
      <details className="panel install-hint">
        <summary>安装到 iPhone / iPad 主屏幕</summary>
        <ol>
          <li>点 Safari 底部的「分享」按钮（方框加向上箭头）</li>
          <li>下滑找到「添加到主屏幕」</li>
          <li>点右上角「添加」，桌面出现桃阅读图标</li>
        </ol>
        <p className="text-sm">添加后数据不会被系统定期清理，朗读也能锁屏继续。</p>
      </details>
    )
  }
  return null
}
