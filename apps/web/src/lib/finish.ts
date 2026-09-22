import { MOODS, PROGRESS_MARKS } from '@taoread/shared'
import type { UnlockDto } from './api'

/**
 * 收尾流纯逻辑（第 7 夜 M4）——独立于 React，全部可确定性单测。
 * 枚举单一来源（N7-008）：value 取自 @taoread/shared（与服务端同源），防跨端漂移。
 */

const PROGRESS_META = {
  little: { icon: 'sprout', label: '读了一点点' },
  lot: { icon: 'star', label: '读了好多' },
  done: { icon: 'peach', label: '读完啦' },
} as const

export const PROGRESS_OPTIONS = PROGRESS_MARKS.map((value) => ({
  value,
  ...PROGRESS_META[value],
}))

const MOOD_META = {
  happy: { icon: 'sun', label: '开心' },
  excited: { icon: 'sparkle', label: '兴奋' },
  calm: { icon: 'heart', label: '平静' },
  curious: { icon: 'book', label: '好奇' },
  sleepy: { icon: 'moon', label: '困困' },
  thinking: { icon: 'book', label: '在想' },
} as const

export const MOOD_OPTIONS = MOODS.map((value) => ({
  value,
  ...MOOD_META[value],
}))

/** 金句文本校验（与服务端 1-500 字口径一致；前后空白不计） */
export function isValidHighlightText(text: string): boolean {
  const trimmed = text.trim()
  return trimmed.length >= 1 && trimmed.length <= 500
}

/** 成就文案：纪念式、正向、无兑换语义（docs/02 §3.4 红线） */
export function unlockCopy(unlock: UnlockDto): string {
  switch (unlock.kind) {
    case 'night_lamp':
      return `收下一颗桃子！第 ${unlock.value} 次共读`
    case 'streak_best':
      return `连续 ${unlock.value} 天，全家的最棒纪录`
    case 'book_done':
      return `第 ${unlock.value} 本读完啦！`
    default:
      return '解锁了新成就！'
  }
}

