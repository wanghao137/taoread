/**
 * 书架时长估算回归（docs/13 P1-3：「5 分钟就读完」分区）。
 *
 * 孩子选书的核心疑问是「这本要读多久」。字数 → 分钟按儿童朗读语速换算：
 * 中文 150 字/分钟、英文 100 词/分钟，剩余分钟 = 总时长 × 未读比例。
 * 向上取整（宁多说不少），<1 分钟归 1 避免显示「0 分钟」。
 */
import { describe, expect, it } from 'vitest'
import { minutesLabel, remainingMinutes } from '../src/lib/readingTime'

describe('书架时长估算（P1-3）', () => {
  it('中文 150 字/分钟：600 字未读 ≈ 4 分钟', () => {
    expect(remainingMinutes({ words: 600, lang: 'zh', progress: 0 })).toBe(4)
  })

  it('英文 100 词/分钟：300 词未读 = 3 分钟', () => {
    expect(remainingMinutes({ words: 300, lang: 'en', progress: 0 })).toBe(3)
  })

  it('进度过半时只算剩余部分：1200 字读到 50% ≈ 4 分钟', () => {
    expect(remainingMinutes({ words: 1200, lang: 'zh', progress: 50 })).toBe(4)
  })

  it('读完了剩余 0 分钟', () => {
    expect(remainingMinutes({ words: 600, lang: 'zh', progress: 100 })).toBe(0)
  })

  it('剩余不足 1 分钟向上取整为 1，不显示 0', () => {
    // 200 字读到 90% → 剩 20 字 = 0.13 分钟 → 向上取整 1
    expect(remainingMinutes({ words: 200, lang: 'zh', progress: 90 })).toBe(1)
  })

  it('越界进度被钳制，不产生负数或翻倍', () => {
    expect(remainingMinutes({ words: 600, lang: 'zh', progress: 150 })).toBe(0)
    expect(remainingMinutes({ words: 600, lang: 'zh', progress: -10 })).toBe(4)
  })

  it('标签文案：0 分钟 → 已经读完啦；1 分钟 → 不到 1 分钟', () => {
    expect(minutesLabel(0)).toBe('已经读完啦')
    expect(minutesLabel(1)).toBe('不到 1 分钟')
    expect(minutesLabel(5)).toBe('约 5 分钟')
  })
})
