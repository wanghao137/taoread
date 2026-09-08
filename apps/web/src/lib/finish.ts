import type { UnlockDto } from './api'

/** 收尾流纯逻辑（第 7 夜 M4）——独立于 React，全部可确定性单测。 */

export const PROGRESS_OPTIONS = [
  { value: 'little', emoji: '🌱', label: '读了一点点' },
  { value: 'lot', emoji: '🌟', label: '读了好多' },
  { value: 'done', emoji: '🏆', label: '读完啦' },
] as const

export const MOOD_OPTIONS = [
  { value: 'happy', emoji: '😄', label: '开心' },
  { value: 'excited', emoji: '🤩', label: '兴奋' },
  { value: 'calm', emoji: '😌', label: '平静' },
  { value: 'sleepy', emoji: '🥱', label: '困困' },
  { value: 'thinking', emoji: '🤔', label: '在想' },
] as const

/** 金句文本校验（与服务端 1-500 字口径一致；前后空白不计） */
export function isValidHighlightText(text: string): boolean {
  const trimmed = text.trim()
  return trimmed.length >= 1 && trimmed.length <= 500
}

/** 成就文案：纪念式、正向、无兑换语义（docs/02 §3.4 红线） */
export function unlockCopy(unlock: UnlockDto): string {
  switch (unlock.kind) {
    case 'night_lamp':
      return `夜灯点亮！第 ${unlock.value} 晚`
    case 'streak_best':
      return `连续 ${unlock.value} 晚，全家的最棒纪录`
    case 'book_done':
      return `第 ${unlock.value} 本读完啦！`
    default:
      return '解锁了新成就！'
  }
}

export const UNLOCK_EMOJI: Record<string, string> = {
  night_lamp: '🕯️',
  streak_best: '🔥',
  book_done: '📚',
}
