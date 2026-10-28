import { describe, expect, it } from 'vitest'
import { practiceDays, streakOf, weekStrip } from '../src/pages/child/phonics/phonicsDates'

describe('phonics practice dates', () => {
  it('uses Shanghai calendar days and weekdays', () => {
    const today = new Date('2026-10-27T04:00:00Z')
    const calendar = [{ day: '2026-10-27', count: 1 }, { day: '2026-10-26', count: 2 }]
    expect(practiceDays(calendar).size).toBe(2)
    expect(streakOf(calendar, today)).toBe(2)
    expect(weekStrip(calendar, today).slice(-3)).toEqual([
      { day: '日', count: 0, today: false }, { day: '一', count: 2, today: false }, { day: '二', count: 1, today: true },
    ])
  })
  it('continues a streak from yesterday across a year boundary', () => {
    const today = new Date('2026-01-01T04:00:00Z')
    expect(streakOf([{ day: '2025-12-31', count: 1 }], today)).toBe(1)
  })
})
