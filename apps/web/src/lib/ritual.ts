import type { ShelfItemDto } from './api'

/**
 * 选书流纯逻辑（第 6 夜 M2）——独立于 React，全部可确定性单测。
 * 口径约定：readUpdateTime 为 Unix 秒（微信读书回包原值，skill 文档字段）。
 */

/** 继续读 = 孩子书架里 readUpdateTime 最新的一本（无时间戳的书排最后） */
export function pickContinueReading(items: ShelfItemDto[]): ShelfItemDto | null {
  if (items.length === 0) return null
  const sorted = [...items].sort((a, b) => (b.readUpdateTime ?? 0) - (a.readUpdateTime ?? 0))
  return sorted[0] ?? null
}

/** 骰子随机 = 均匀随机（rng 可注入以便测试） */
export function pickRandom(items: ShelfItemDto[], rng: () => number = Math.random): ShelfItemDto | null {
  if (items.length === 0) return null
  const idx = Math.min(items.length - 1, Math.floor(rng() * items.length))
  return items[idx] ?? null
}

/** 「上次翻开」友好文案（相对 nowSec；只描述事实，不带任何催促语气）。
 * 毫秒防御：skill 文档只写「Unix 时间戳」未锁单位，>1e12 视为毫秒自动折算。 */
export function friendlyLastRead(readUpdateTimeSec: number | undefined, nowSec: number): string | null {
  if (!readUpdateTimeSec || readUpdateTimeSec <= 0) return null
  const seconds = readUpdateTimeSec > 1e12 ? Math.floor(readUpdateTimeSec / 1000) : readUpdateTimeSec
  const diffDays = Math.floor((nowSec - seconds) / 86_400)
  if (diffDays <= 0) return '今天已经翻开过啦'
  if (diffDays === 1) return '上次翻开是昨天'
  if (diffDays < 30) return `上次翻开是 ${diffDays} 天前`
  if (diffDays < 365) return '上次翻开是很久以前'
  return '这是一本很久没见的老朋友'
}

/** 推荐流取前 N 本（服务端已过滤，前端只做展示裁剪） */
export function topRecommendations(items: ShelfItemDto[], n = 3): ShelfItemDto[] {
  return items.slice(0, n)
}
