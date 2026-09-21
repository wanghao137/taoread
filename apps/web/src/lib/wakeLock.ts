/**
 * 屏幕常亮（docs/13 P0-7，audio 报告 §2.5）。
 *
 * 朗读到一半屏幕熄灭会中断播放——孩子得重新找按钮。朗读开始时请求 Wake Lock，
 * 结束/离开时释放。
 *
 * 支持矩阵（MDN browser-compat-data 一手）：
 *   - iOS Safari 18.4+ 才支持；16.4 ~ 18.3 的用户朗读会中途息屏
 *   - 桌面 Safari 16.4+、Android Chrome 84+
 * 因此拿不到锁时不报错，只在低版本 iOS 上由调用方给一句温和提示。
 */
export interface WakeLockDeps {
  navigator?: { wakeLock?: { request: (type: 'screen') => Promise<unknown> } }
}

let lock: { release: () => Promise<void> } | null = null

/** 是否支持 Wake Lock（不支持时调用方可提示「请保持屏幕常亮」） */
export function wakeLockSupported(deps: WakeLockDeps = {}): boolean {
  const nav = deps.navigator ?? (typeof navigator !== 'undefined' ? navigator : undefined)
  return typeof nav?.wakeLock?.request === 'function'
}

/**
 * 请求屏幕常亮。已持有时重复调用是空操作。
 * 返回是否成功；失败一律静默（不阻塞朗读）。
 */
export async function acquireWakeLock(deps: WakeLockDeps = {}): Promise<boolean> {
  if (!wakeLockSupported(deps)) return false
  if (lock) return true
  const nav = deps.navigator ?? (typeof navigator !== 'undefined' ? navigator : undefined)
  try {
    lock = (await nav!.wakeLock!.request('screen')) as { release: () => Promise<void> }
    return true
  } catch {
    // 拒绝（如页面不在前台）或不可用：静默，朗读照常
    lock = null
    return false
  }
}

/** 释放屏幕常亮；未持有时空操作 */
export async function releaseWakeLock(): Promise<void> {
  try {
    await lock?.release()
  } catch {
    /* 已释放 */
  }
  lock = null
}
