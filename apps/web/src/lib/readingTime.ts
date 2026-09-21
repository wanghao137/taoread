/**
 * 朗读时长估算（docs/13 P1-3：「5 分钟就读完」分区）。
 *
 * 孩子选书的核心疑问是「这本要读多久」。字数 → 分钟按儿童朗读语速换算：
 * 中文 150 字/分钟、英文 100 词/分钟，剩余分钟 = 总时长 × 未读比例。
 * 向上取整（宁多说不少），<1 分钟归 1 避免显示「0 分钟」。
 */
export interface ReadingTimeInput {
  words: number
  lang: string
  /** 0-100 已读百分比 */
  progress: number
}

const PER_MINUTE_ZH = 150
const PER_MINUTE_EN = 100

/** 剩余朗读分钟数（向上取整，>=0） */
export function remainingMinutes(book: ReadingTimeInput): number {
  const perMinute = book.lang === 'en' ? PER_MINUTE_EN : PER_MINUTE_ZH
  const total = book.words / perMinute
  const remaining = total * (1 - Math.max(0, Math.min(100, book.progress)) / 100)
  return Math.max(0, Math.ceil(remaining))
}

/** 友好文案：0 → 已经读完啦；1 → 不到 1 分钟；其余 → 约 N 分钟 */
export function minutesLabel(min: number): string {
  if (min <= 0) return '已经读完啦'
  if (min === 1) return '不到 1 分钟'
  return `约 ${min} 分钟`
}
