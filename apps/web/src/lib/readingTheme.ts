/**
 * 阅读器默认主题推导（docs/13 P0-1）。
 *
 * 定位：桃阅读是全天候阅读游乐园，白天（纸白）是主场景；夜间主题只是
 * 一个护眼工具——孩子在昏暗环境下阅读时，屏幕不应是整块发光体。
 *
 * 方案：进入阅读器时按本地时钟推导默认主题，安静时段（每晚 20:00 ~ 次日 06:00）
 * 默认给夜间护眼主题。只是默认值，孩子/家长仍可手动切换，白天随时可切回纸白。
 *
 * 不读服务端休息窗口：那需要一次网络请求，且阅读器拿不到 ritualWindow；
 * 本地时钟是暗环境物理事实的最短路径，失败模式为零。
 */

/** 阅读器主题（与 ReaderScreen 内联定义保持一致） */
export type ReadingTheme = 'paper' | 'night' | 'sepia'

/** 安静时段：20:00 ~ 06:00（含端点） */
export function isQuietHours(now: Date = new Date()): boolean {
  const h = now.getHours()
  return h >= 20 || h < 6
}

/** 阅读器默认主题：安静时段给夜间护眼（工具属性），其余时间给纸白主场景 */
export function defaultReadingTheme(now: Date = new Date()): ReadingTheme {
  return isQuietHours(now) ? 'night' : 'paper'
}
