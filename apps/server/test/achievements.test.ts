import { describe, expect, it } from 'vitest'
import { planUnlocks } from '../src/modules/cosession/achievements'
import {
  countDistinctNights,
  currentStreak,
  longestStreak,
  nightKeyOf,
} from '../src/modules/cosession/nights'

const TZ_CN = 480 // UTC+8

describe('夜界分桶（nightKeyOf）', () => {
  it('UTC+8 下同一晚的 21:00 与次日 01:00 不在同一桶（睡前场景关键边界）', () => {
    const ninePm = Date.UTC(2026, 8, 6, 13, 0, 0) / 1000 // 北京 9/6 21:00
    const oneAm = Date.UTC(2026, 8, 6, 17, 0, 0) / 1000 // 北京 9/7 01:00
    expect(nightKeyOf(ninePm, TZ_CN)).toBe('2026-09-06')
    expect(nightKeyOf(oneAm, TZ_CN)).toBe('2026-09-07')
  })

  it('跨月/跨年边界正确（UTC 正午构造，任何 ±12h 时区不翻日）', () => {
    // 9/30 16:00 UTC = 北京 10/1 00:00 → 跨月
    expect(nightKeyOf(Date.UTC(2026, 8, 30, 16, 0, 0) / 1000, TZ_CN)).toBe('2026-10-01')
    expect(nightKeyOf(Date.UTC(2026, 8, 30, 15, 59, 0) / 1000, TZ_CN)).toBe('2026-09-30')
    // 12/31 16:00 UTC = 北京 1/1 00:00 → 跨年
    expect(nightKeyOf(Date.UTC(2026, 11, 31, 16, 0, 0) / 1000, TZ_CN)).toBe('2027-01-01')
    expect(nightKeyOf(Date.UTC(2026, 11, 31, 15, 59, 0) / 1000, TZ_CN)).toBe('2026-12-31')
  })

  it('同一时刻不同时区落入不同桶（分桶对时区敏感，已登记决策）', () => {
    const t = Date.UTC(2026, 8, 6, 14, 30, 0) / 1000
    expect(nightKeyOf(t, 480)).toBe('2026-09-06') // 北京 22:30
    expect(nightKeyOf(t, -300)).toBe('2026-09-06') // 纽约 10:30
    expect(nightKeyOf(t, 0)).toBe('2026-09-06')
    const lateNight = Date.UTC(2026, 8, 6, 20, 30, 0) / 1000
    expect(nightKeyOf(lateNight, 480)).toBe('2026-09-07') // 北京 9/7 04:30
    expect(nightKeyOf(lateNight, 0)).toBe('2026-09-06')
  })
})

describe('晚数与连续', () => {
  const night = (day: number, hour = 12) => Date.UTC(2026, 8, day, hour, 0, 0) / 1000

  it('同一晚多次共读只计 1 晚', () => {
    expect(countDistinctNights([night(1), night(1, 21), night(2)])).toBe(2)
  })

  it('连续晚数：断档即止', () => {
    const secs = [night(1), night(2), night(3), night(6)]
    expect(currentStreak(secs, '2026-09-06', TZ_CN)).toBe(1) // 只有 9/6 当晚
    expect(currentStreak(secs, '2026-09-03', TZ_CN)).toBe(3)
    expect(currentStreak(secs, '2026-09-05', TZ_CN)).toBe(0)
  })

  it('历史最长连续独立于终点', () => {
    const secs = [night(1), night(2), night(3), night(6), night(7)]
    expect(longestStreak(secs, TZ_CN)).toBe(3)
    expect(longestStreak([], TZ_CN)).toBe(0)
    expect(longestStreak([night(4)], TZ_CN)).toBe(1)
  })
})

describe('成就解锁计划（planUnlocks）', () => {
  const night = (day: number, hour = 12) => Date.UTC(2026, 8, day, hour, 0, 0) / 1000
  const s = (endedAtSec: number, bookId: string | null, mark: string | null) => ({
    endedAtSec,
    bookId,
    progressMark: mark,
  })

  it('首晚收尾：夜灯第 1 晚；无连续成就（streak≥2 才解锁）', () => {
    const plan = planUnlocks({
      past: [],
      current: s(night(1), 'B1', 'little'),
      existing: [],
    })
    expect(plan).toEqual([{ kind: 'night_lamp', value: 1 }])
  })

  it('同晚第二次收尾：夜灯值不变（由唯一约束兜底防重复点亮）', () => {
    const plan = planUnlocks({
      past: [s(night(1), 'B1', 'little')],
      current: s(night(1, 13), 'B2', 'done'), // 同在 9/1（UTC 正午附近构造，任何时区不翻日）
      existing: [{ kind: 'night_lamp', value: 1 }],
    })
    expect(plan).toContainEqual({ kind: 'night_lamp', value: 1 })
    // 第一本读完 → 读完第 1 本
    expect(plan).toContainEqual({ kind: 'book_done', value: 1 })
  })

  it('连续第 2 晚解锁最长连续 2；第 3 晚解锁 3（跨 best 瞬间）', () => {
    const plan2 = planUnlocks({
      past: [s(night(1), null, null)],
      current: s(night(2), null, null),
      existing: [{ kind: 'night_lamp', value: 1 }],
    })
    expect(plan2).toContainEqual({ kind: 'streak_best', value: 2 })

    const plan3 = planUnlocks({
      past: [s(night(1), null, null), s(night(2), null, null)],
      current: s(night(3), null, null),
      existing: [
        { kind: 'night_lamp', value: 2 },
        { kind: 'streak_best', value: 2 },
      ],
    })
    expect(plan3).toContainEqual({ kind: 'streak_best', value: 3 })
  })

  it('断档后重来：连读数不超过历史 best 时不解锁 streak_best', () => {
    const plan = planUnlocks({
      past: [s(night(1), null, null), s(night(2), null, null), s(night(5), null, null)],
      current: s(night(6), null, null), // 与 9/5 连续 2 晚，但 best 已是 2
      existing: [
        { kind: 'streak_best', value: 2 },
        { kind: 'night_lamp', value: 3 },
      ],
    })
    expect(plan).not.toContainEqual({ kind: 'streak_best', value: 2 })
    expect(plan).toContainEqual({ kind: 'night_lamp', value: 4 })
  })

  it('读完同一本书不重复解锁；不同书 value 递增', () => {
    const plan = planUnlocks({
      past: [s(night(1), 'B1', 'done')],
      current: s(night(2), 'B1', 'done'), // 重读同一本
      existing: [
        { kind: 'book_done', value: 1 },
        { kind: 'night_lamp', value: 1 },
      ],
    })
    expect(plan).not.toContainEqual({ kind: 'book_done', value: 2 })

    const planNewBook = planUnlocks({
      past: [s(night(1), 'B1', 'done')],
      current: s(night(2), 'B2', 'done'),
      existing: [
        { kind: 'book_done', value: 1 },
        { kind: 'night_lamp', value: 1 },
      ],
    })
    expect(planNewBook).toContainEqual({ kind: 'book_done', value: 2 })
  })

  it('未标 done 的收尾不触发 book_done；纸质书（bookId=null）同样不触发', () => {
    const plan = planUnlocks({
      past: [],
      current: s(night(1), 'B1', 'lot'),
      existing: [],
    })
    expect(plan).not.toContainEqual(expect.objectContaining({ kind: 'book_done' }))
    const paper = planUnlocks({ past: [], current: s(night(1), null, 'done'), existing: [] })
    expect(paper).not.toContainEqual(expect.objectContaining({ kind: 'book_done' }))
  })
})
