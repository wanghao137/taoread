import { describe, expect, it } from 'vitest'
import { weekStartFromParts, weekStartDate } from '../src/lib/week'

describe('weekStartFromParts', () => {
  it('周一当天返回自身 00:00', () => {
    // 2026-09-07 是周一
    expect(weekStartFromParts(2026, 9, 7, 1).toISOString()).toBe('2026-09-07T00:00:00.000Z')
  })

  it('周中回退到本周一（周三回退 2 天）', () => {
    // 2026-09-09 是周三
    expect(weekStartFromParts(2026, 9, 9, 3).toISOString()).toBe('2026-09-07T00:00:00.000Z')
  })

  it('周日回退 6 天到周一（跨月）', () => {
    // 2026-09-06 是周日 → 回到 08-31 周一
    expect(weekStartFromParts(2026, 9, 6, 0).toISOString()).toBe('2026-08-31T00:00:00.000Z')
  })

  it('月初一号是周日时回退到上个月（跨年边界另测）', () => {
    // 2026-11-01 是周日 → 2026-10-26 周一
    expect(weekStartFromParts(2026, 11, 1, 0).toISOString()).toBe('2026-10-26T00:00:00.000Z')
  })

  it('跨年边界：2027-01-01 是周五 → 2026-12-28 周一', () => {
    expect(weekStartFromParts(2027, 1, 1, 5).toISOString()).toBe('2026-12-28T00:00:00.000Z')
  })

  it('同一周内任意时刻（weekday 省略，按 UTC 分量推导）结果一致', () => {
    const a = weekStartFromParts(2026, 9, 8) // 周二
    const b = weekStartFromParts(2026, 9, 12) // 周六
    expect(a.toISOString()).toBe('2026-09-07T00:00:00.000Z')
    expect(b.toISOString()).toBe('2026-09-07T00:00:00.000Z')
  })
})

describe('weekStartDate', () => {
  it('同一周的两个时刻产生完全相同的规范化值（周报唯一性前提）', () => {
    const wedMorning = new Date(2026, 8, 9, 7, 30) // 本地 2026-09-09 07:30 周三
    const satNight = new Date(2026, 8, 12, 23, 59) // 本地 2026-09-12 23:59 周六
    expect(weekStartDate(wedMorning).getTime()).toBe(weekStartDate(satNight).getTime())
  })

  it('结果为明确的 00:00:00.000（无毫秒残留）', () => {
    const t = weekStartDate(new Date(2026, 8, 9, 13, 45, 12, 999))
    expect(t.getUTCHours()).toBe(0)
    expect(t.getUTCMinutes()).toBe(0)
    expect(t.getUTCSeconds()).toBe(0)
    expect(t.getUTCMilliseconds()).toBe(0)
  })

  it('本地周日深夜与次周周一清晨属于不同周', () => {
    // 本地时区下 2026-09-06（周日）与 2026-09-07（周一）
    const sunday = weekStartDate(new Date(2026, 8, 6, 22, 0))
    const monday = weekStartDate(new Date(2026, 8, 7, 1, 0))
    expect(monday.getTime()).toBe(sunday.getTime() + 7 * 24 * 3600 * 1000)
  })
})
