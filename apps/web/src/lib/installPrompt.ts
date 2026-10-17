/**
 * PWA 安装引导（docs/67 §4.3 M0）。
 * Android/桌面 Chrome：捕获 beforeinstallprompt，提供程序化安装；
 * iOS：无该事件，由 InstallHint 组件展示「添加到主屏幕」图文步骤。
 * 已安装（standalone）时全部引导隐藏。
 */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferred: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()

function notify(): void {
  listeners.forEach((fn) => fn())
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferred = event as BeforeInstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    notify()
  })
}

export function _acceptPromptEvent(event: BeforeInstallPromptEvent): void {
  event.preventDefault?.()
  deferred = event
  notify()
}

export function canInstall(): boolean {
  return deferred !== null
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferred) return 'unavailable'
  const event = deferred
  await event.prompt()
  const { outcome } = await event.userChoice
  deferred = null
  notify()
  return outcome
}

export function onInstallAvailability(fn: () => void): () => void {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function isStandalone(): boolean {
  // 单测跑在 node 环境（无 window）：直接返回 false，不抛错
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as { standalone?: boolean }).standalone === true
  )
}

export function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}
