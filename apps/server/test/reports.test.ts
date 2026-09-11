import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import {
  authHeaders,
  createChild,
  createFamilyAsParent,
  makeApp,
  type TestHarness,
} from './helper'
import { wipeDb } from '../src/lib/db'

const probeOk = async () => 'active' as const
import { generateWeeklyReport, isSundayEveningRun, renderShareCardSvg } from '../src/modules/reports/service'
import { weekStartFromParts } from '../src/lib/week'

// 2026-09-07（周一）20:00 本地
const T0 = new Date(2026, 8, 7, 20, 0).getTime() / 1000

describe('周报域（第 10 夜 M-B 收官）', () => {
  let h: TestHarness
  let db: PrismaClient

  beforeAll(async () => {
    h = await makeApp(probeOk)
    db = h.db
    await h.app.ready()
  })
  afterAll(async () => {
    await h.app.close()
    await db.$disconnect()
  })
  beforeEach(async () => {
    await wipeDb(db)
  })

  async function seedWeek(familyId: string, childId: string) {
    // 周一与周三两晚共读：一场 30 分钟读完，一场 10 分钟，金句两句，成就一个
    for (const dayOffset of [0, 2]) {
      const startedAt = new Date((T0 + dayOffset * 86_400) * 1000)
      const s = await db.cosession.create({
        data: {
          familyId,
          childId,
          bookId: dayOffset === 0 ? 'B1' : 'B2',
          startedAt,
          endedAt: new Date((T0 + dayOffset * 86_400 + 1800) * 1000),
          durationSec: dayOffset === 0 ? 1800 : 600,
          progressMark: 'lot',
        },
      })
      await db.highlightStar.create({
        data: {
          familyId,
          childId,
          cosessionId: s.id,
          source: 'voice',
          text: dayOffset === 0 ? '第一晚的金句' : '第二晚的金句',
        },
      })
    }
    await db.achievement.create({
      data: { familyId, childId, kind: 'night_lamp', value: 2 },
    })
  }

  it('聚合口径：晚数去重/分钟求和/书目去重/金句/成就数', async () => {
    const f = await createFamilyAsParent(h.app)
    const childId = await createChild(h.app, f.token, f.familyId)
    await seedWeek(f.familyId, childId)
    const weekStart = weekStartFromParts(2026, 9, 7)
    const report = await generateWeeklyReport(db, f.familyId, weekStart)
    expect(report.nights).toBe(2)
    expect(report.totalMinutes).toBe(40) // 1800s+600s = 40min
    expect(report.books).toHaveLength(2)
    expect(report.highlights).toHaveLength(2)
    expect(report.achievementsUnlocked).toBe(1)
    expect(report.nextWeekHint).toContain('2 晚')
  })

  it('空周优雅：零值结构与正向提示', async () => {
    const f = await createFamilyAsParent(h.app)
    const report = await generateWeeklyReport(db, f.familyId, weekStartFromParts(2026, 9, 7))
    expect(report.nights).toBe(0)
    expect(report.totalMinutes).toBe(0)
    expect(report.books).toEqual([])
    expect(report.nextWeekHint).toBe('新的一周，第一页故事在等你')
  })

  it('任意历史周可重生成：upsert 不产生重复行', async () => {
    const f = await createFamilyAsParent(h.app)
    const weekStart = weekStartFromParts(2026, 9, 7)
    await generateWeeklyReport(db, f.familyId, weekStart)
    await generateWeeklyReport(db, f.familyId, weekStart)
    expect(await db.weeklyReport.count({ where: { familyId: f.familyId } })).toBe(1)
  })

  it('越权与参数：跨家庭 404 / 非法日期 404（含分量回绕 N10-003）', async () => {
    const f = await createFamilyAsParent(h.app)
    const other = await createFamilyAsParent(h.app, 'other')
    const bad1 = await h.app.inject({
      method: 'GET',
      url: `/api/reports/weekly?familyId=${f.familyId}&start=2026-9-7`,
      headers: authHeaders(other.token),
    })
    expect(bad1.statusCode).toBe(404)
    const bad2 = await h.app.inject({
      method: 'GET',
      url: `/api/reports/weekly?familyId=${f.familyId}&start=not-a-date`,
      headers: authHeaders(f.token),
    })
    expect(bad2.statusCode).toBe(404)
    // 滚动日期拒绝（Date 静默进位防御回归锁）
    const rolled = await h.app.inject({
      method: 'GET',
      url: `/api/reports/weekly?familyId=${f.familyId}&start=2026-02-30`,
      headers: authHeaders(f.token),
    })
    expect(rolled.statusCode).toBe(404)
    const rolled2 = await h.app.inject({
      method: 'GET',
      url: `/api/reports/weekly?familyId=${f.familyId}&start=2026-13-45`,
      headers: authHeaders(f.token),
    })
    expect(rolled2.statusCode).toBe(404)
  })

  it('分享卡 SVG：1080×1440 规格、无隐私字段、空周可渲染', async () => {
    const f = await createFamilyAsParent(h.app)
    const childId = await createChild(h.app, f.token, f.familyId, '小名真名不应出现')
    await seedWeek(f.familyId, childId)
    const report = await generateWeeklyReport(db, f.familyId, weekStartFromParts(2026, 9, 7))
    const svg = renderShareCardSvg(report)
    expect(svg).toContain('width="1080"')
    expect(svg).toContain('height="1440"')
    // 隐私红线：不含家庭码/真名/key
    expect(svg).not.toContain(f.familyCode ?? 'zzz')
    expect(svg).not.toContain('小名真名不应出现')
    expect(svg).not.toContain('wrk-')
    // 书名与金句在卡上
    expect(svg).toContain('共读的夜晚')
    const emptySvg = renderShareCardSvg(await generateWeeklyReport(db, f.familyId, weekStartFromParts(2026, 8, 31)))
    expect(emptySvg).toContain('第一页故事')
  })

  it('调度器：周日 19:00 触发生成一次，非周日不触发，重入安全', async () => {
    const f = await createFamilyAsParent(h.app)
    const childId = await createChild(h.app, f.token, f.familyId)
    await seedWeek(f.familyId, childId)
    // 2026-09-06 是周日；19:00 整
    const sunday1900 = new Date(2026, 8, 6, 19, 0)
    let tickNow = sunday1900
    const { startWeeklyReportScheduler } = await import('../src/modules/reports/routes')
    const handle = startWeeklyReportScheduler(db, {
      intervalMs: 10,
      now: () => tickNow,
    })
    // 等两轮 tick
    await new Promise((r) => setTimeout(r, 60))
    expect(await db.weeklyReport.count({ where: { familyId: f.familyId } })).toBe(1)
    // 同日再 tick 不重复（lastRunDay 标记 + upsert 双保险）
    await new Promise((r) => setTimeout(r, 40))
    expect(await db.weeklyReport.count()).toBe(1)
    // 非周日不触发
    tickNow = new Date(2026, 8, 7, 19, 0) // 周一
    await new Promise((r) => setTimeout(r, 40))
    expect(await db.weeklyReport.count()).toBe(1)
    handle.stop()
    // 时间推进验证：注入时钟变化后 isSundayEveningRun 语义
    expect(isSundayEveningRun(new Date(2026, 8, 6, 19, 1))).toBe(false)
    expect(isSundayEveningRun(new Date(2026, 8, 6, 18, 59))).toBe(false)
  })
})
