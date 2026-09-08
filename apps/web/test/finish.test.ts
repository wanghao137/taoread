import { describe, expect, it } from 'vitest'
import {
  isValidHighlightText,
  MOOD_OPTIONS,
  PROGRESS_OPTIONS,
  unlockCopy,
} from '../src/lib/finish'

describe('isValidHighlightText（与服务端 1-500 字口径一致）', () => {
  it('合法：1-500 字（前后空白不计）', () => {
    expect(isValidHighlightText('小王子真好看')).toBe(true)
    expect(isValidHighlightText('  x  ')).toBe(true)
    expect(isValidHighlightText('长'.repeat(500))).toBe(true)
  })

  it('非法：空/纯空白/超 500 字', () => {
    expect(isValidHighlightText('')).toBe(false)
    expect(isValidHighlightText('   ')).toBe(false)
    expect(isValidHighlightText('长'.repeat(501))).toBe(false)
  })
})

describe('unlockCopy（纪念式成就文案，红线：正向无兑换）', () => {
  it('夜灯/最长连续/读完第 N 本', () => {
    expect(unlockCopy({ kind: 'night_lamp', value: 7 })).toBe('夜灯点亮！第 7 晚')
    expect(unlockCopy({ kind: 'streak_best', value: 3 })).toBe('连续 3 晚，全家的最棒纪录')
    expect(unlockCopy({ kind: 'book_done', value: 2 })).toBe('第 2 本读完啦！')
  })

  it('未知类型兜底（不崩溃、不暴露内部枚举）', () => {
    expect(unlockCopy({ kind: 'mystery', value: 1 })).toBe('解锁了新成就！')
  })
})

describe('收尾选项与服务端枚举对齐', () => {
  it('进度三档/心情五档的 value 与后端 zod enum 一致', () => {
    expect(PROGRESS_OPTIONS.map((p) => p.value)).toEqual(['little', 'lot', 'done'])
    expect(MOOD_OPTIONS.map((m) => m.value)).toEqual([
      'happy',
      'excited',
      'calm',
      'sleepy',
      'thinking',
    ])
  })
})
