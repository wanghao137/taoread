/**
 * 触觉反馈（docs/13 P0-3）。
 *
 * 刻意只用在「关键动作的确认感」上：翻章、盖章成功、解锁成就。
 * 刻意不用在按钮按压——TaButton 已有 whileTap scale 0.96 视觉反馈，
 * 过密的振动会让睡前场景变得焦躁（Lillard 2011：低频、与情节绑定）。
 *
 * 降级链：无 navigator.vibrate（iOS Safari 全系不支持）→ 静默无副作用；
 * prefers-reduced-motion 开启时同步关闭振动（前庭敏感儿童）。
 */
export type HapticMoment = 'chapter' | 'stamp' | 'achievement'

const PATTERNS: Record<HapticMoment, number> = {
  chapter: 15,
  stamp: 25,
  achievement: 35,
}

export interface HapticDeps {
  /** 浏览器振动 API；不传时从全局 navigator 取（SSR/单测 node 环境没有） */
  vibrate?: (pattern: number) => boolean
  /** 媒体查询；不传时从全局 window 取 */
  matchMedia?: (query: string) => { matches: boolean }
}

/** 轻柔振动一下；不支持/已降级时静默返回 false */
export function haptic(moment: HapticMoment, deps: HapticDeps = {}): boolean {
  const matchMedia = deps.matchMedia ?? (typeof window !== 'undefined' ? window.matchMedia : undefined)
  if (matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false

  // 注意：navigator.vibrate 必须绑定 this 再调用，否则 Chromium 抛 "Illegal invocation"，
  // 会中断调用方（翻章流程曾被这个抛出打断，章节加载不执行）
  const vibrate = deps.vibrate ?? (typeof navigator !== 'undefined' ? navigator.vibrate?.bind(navigator) : undefined)
  if (typeof vibrate !== 'function') return false
  try {
    return vibrate(PATTERNS[moment])
  } catch {
    return false
  }
}
