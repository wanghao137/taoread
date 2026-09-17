import { describe, expect, it } from 'vitest'
import { defaultReadingTheme, isQuietHours } from '../src/lib/readingTheme'

const at = (h: number, m = 0): Date => new Date(2026, 8, 17, h, m)

describe('isQuietHours（安静时段 20:00~06:00）', () => {
  it('19:59 不是安静时段', () => {
    expect(isQuietHours(at(19, 59))).toBe(false)
  })
  it('20:00 是安静时段（含端点）', () => {
    expect(isQuietHours(at(20, 0))).toBe(true)
  })
  it('23:30 是安静时段', () => {
    expect(isQuietHours(at(23, 30))).toBe(true)
  })
  it('00:00 跨日仍是安静时段', () => {
    expect(isQuietHours(at(0, 0))).toBe(true)
  })
  it('05:59 是安静时段', () => {
    expect(isQuietHours(at(5, 59))).toBe(true)
  })
  it('06:00 不是安静时段（含端点）', () => {
    expect(isQuietHours(at(6, 0))).toBe(false)
  })
  it('正午不是安静时段', () => {
    expect(isQuietHours(at(12, 0))).toBe(false)
  })
})

describe('defaultReadingTheme（阅读器默认主题）', () => {
  it('安静时段默认夜空主题', () => {
    expect(defaultReadingTheme(at(21, 30))).toBe('night')
  })
  it('白天默认纸白主题', () => {
    expect(defaultReadingTheme(at(10, 0))).toBe('paper')
  })
  it('不传参数时按当前时间推导，返回合法主题', () => {
    const t = defaultReadingTheme()
    expect(['paper', 'night', 'sepia']).toContain(t)
  })
})
