import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import {
  authHeaders,
  createBoundFamily,
  createChild,
  createFamilyAsParent,
  joinFamily,
  makeApp,
  type TestHarness,
} from './helper'
import { wipeDb } from '../src/lib/db'

const probeOk = async () => 'active' as const

/** 第 9 夜：家庭设置 / 注销级联 / 金句去重 / 夜键 upsert / 家庭级护眼覆盖 */
describe('家庭设置与注销（第 9 夜）', () => {
  let h: TestHarness
  let db: PrismaClient

  beforeAll(async () => {
    h = await makeApp(probeOk, { bedTimeMin: 1290 })
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

  it('设置读写：null 回落语义 + 合法值持久化', async () => {
    const f = await createFamilyAsParent(h.app)
    const initial = await h.app.inject({
      method: 'GET',
      url: `/api/family/${f.familyId}/settings`,
      headers: authHeaders(f.token),
    })
    // 阅读时间限制已取消：bedtimeMin/overtimeCapSec 不再暴露，设置只剩 calmMode
    expect(initial.json()).toEqual({ calmMode: null, dailyReadingLimitMin: null })

    const patch = await h.app.inject({
      method: 'PATCH',
      url: `/api/family/${f.familyId}/settings`,
      headers: authHeaders(f.token),
      payload: { bedtimeMin: 1320, overtimeCapSec: 600, calmMode: true },
    })
    expect(patch.statusCode).toBe(200)
    expect(patch.json()).toEqual({ calmMode: true, dailyReadingLimitMin: null })
  })

  it('就寝残留字段：旧客户端传入被忽略（不报错也不落库），非法 calmMode 仍拒绝', async () => {
    const f = await createFamilyAsParent(h.app)
    const url = `/api/family/${f.familyId}/settings`
    const headers = authHeaders(f.token)
    // 旧字段原样忽略（zod 非严格模式剔除），不能 500 也不能写库
    const legacy = await h.app.inject({ method: 'PATCH', url, headers, payload: { bedtimeMin: 1440, overtimeCapSec: 59 } })
    expect(legacy.statusCode).toBe(200)
    expect(legacy.json()).toEqual({ calmMode: null, dailyReadingLimitMin: null })
    const bad = await h.app.inject({ method: 'PATCH', url, headers, payload: { calmMode: 'yes' } })
    expect(bad.statusCode).toBe(400)
  })

  it('设置越权：孩子令牌 403 / 跨家庭家长 403', async () => {
    const f = await createFamilyAsParent(h.app)
    const child = await joinFamily(h.app, f.familyCode, 'child')
    const other = await createFamilyAsParent(h.app, 'other')
    for (const token of [child.token, other.token]) {
      const res = await h.app.inject({
        method: 'PATCH',
        url: `/api/family/${f.familyId}/settings`,
        headers: { authorization: `Bearer ${token}` },
        payload: { calmMode: true },
      })
      expect(res.statusCode).toBe(403)
    }
  })

  it('安静模式：家长可开关并持久化，孩子令牌可读不可写（docs/15 P1-C）', async () => {
    const f = await createFamilyAsParent(h.app)
    const child = await joinFamily(h.app, f.familyCode, 'child')
    const url = `/api/family/${f.familyId}/settings`
    const parentHeaders = authHeaders(f.token)

    // 孩子设备必须能读到家庭级开关——这是 calmMode 在孩子端生效的唯一路径
    const childRead = await h.app.inject({
      method: 'GET',
      url,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(childRead.statusCode).toBe(200)
    expect(childRead.json().calmMode).toBeNull()

    const on = await h.app.inject({
      method: 'PATCH',
      url,
      headers: parentHeaders,
      payload: { calmMode: true },
    })
    expect(on.statusCode).toBe(200)
    expect(on.json()).toEqual({ calmMode: true, dailyReadingLimitMin: null })

    // 孩子端再读已能拿到开闸后的值
    const childReadOn = await h.app.inject({
      method: 'GET',
      url,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(childReadOn.json().calmMode).toBe(true)

    const off = await h.app.inject({
      method: 'PATCH',
      url,
      headers: parentHeaders,
      payload: { calmMode: false },
    })
    expect(off.json().calmMode).toBe(false)

    // 非布尔值被 zod 挡下，不会写入
    const bad = await h.app.inject({
      method: 'PATCH',
      url,
      headers: parentHeaders,
      payload: { calmMode: 'yes' },
    })
    expect(bad.statusCode).toBe(400)
    const afterBad = await h.app.inject({ method: 'GET', url, headers: parentHeaders })
    expect(afterBad.json().calmMode).toBe(false)
  })

  it('阅读时间限制已取消：就寝时刻内外、有无家庭覆盖都恒可开课（2026-09-25）', async () => {
    // env 默认 1290、时钟注入 21:45（旧逻辑下无覆盖家庭会被挡）——闸取消后放行
    const overrideApp = await makeApp(probeOk, { bedTimeMin: 1290, ritualNowMin: () => 21 * 60 + 45 })
    await overrideApp.app.ready()
    const f = await createFamilyAsParent(overrideApp.app)
    const childId = await createChild(overrideApp.app, f.token, f.familyId, '桃桃', '6-8')
    await db.family.update({ where: { id: f.familyId }, data: { bedtimeMin: 1320 } })
    const start = await overrideApp.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(f.token),
      payload: { childId, bookId: 'B1' },
    })
    expect(start.statusCode).toBe(201)
    // 无覆盖的另一家庭同样放行（ Family.bedtimeMin 不再参与判定）
    const f2 = await createFamilyAsParent(overrideApp.app, 'no-override')
    const childId2 = await createChild(overrideApp.app, f2.token, f2.familyId, '小柚', '6-8')
    const start2 = await overrideApp.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(f2.token),
      payload: { childId: childId2, bookId: 'B2' },
    })
    expect(start2.statusCode).toBe(201)
    await overrideApp.app.close()
    await overrideApp.db.$disconnect()
  })

  it('注销家庭：9 张家庭域表级联物理清零', async () => {
    const f = await createBoundFamily(h.app, undefined)
    const childId = await createChild(h.app, f.token, f.familyId)
    const session = await h.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(f.token),
      payload: { childId, bookId: 'B1' },
    })
    await h.app.inject({
      method: 'POST',
      url: `/api/cosession/${session.json().id}/highlights`,
      headers: authHeaders(f.token),
      payload: { source: 'voice', text: '睡前金句' },
    })
    await h.app.inject({
      method: 'POST',
      url: `/api/cosession/${session.json().id}/finish`,
      headers: authHeaders(f.token),
      payload: { progressMark: 'done' },
    })

    // 注销需要家庭码确认（不可恢复操作防误触）：缺码/错码 400，正确家庭码才执行
    const noConfirm = await h.app.inject({
      method: 'DELETE',
      url: `/api/family/${f.familyId}`,
      headers: authHeaders(f.token),
    })
    expect(noConfirm.statusCode).toBe(400)
    const wrongConfirm = await h.app.inject({
      method: 'DELETE',
      url: `/api/family/${f.familyId}`,
      headers: authHeaders(f.token),
      payload: { confirmCode: 'WRONG01' },
    })
    expect(wrongConfirm.statusCode).toBe(400)
    expect(wrongConfirm.json().message).toContain('家庭码')

    const del = await h.app.inject({
      method: 'DELETE',
      url: `/api/family/${f.familyId}`,
      headers: authHeaders(f.token),
      payload: { confirmCode: f.familyCode },
    })
    expect(del.statusCode).toBe(204)

    for (const table of [
      'family',
      'childProfile',
      'wereadBinding',
      'shelfSnapshot',
      'cosession',
      'highlightStar',
      'achievement',
      'parentPrompt',
      'weeklyReport',
      'eventLog',
    ]) {
      const count = await (db as unknown as Record<string, { count: () => Promise<number> }>)[table]!.count()
      expect(count, `${table} 应为空`).toBe(0)
    }

    // 旧凭据失效
    const probe = await h.app.inject({
      method: 'GET',
      url: `/api/family/${f.familyId}`,
      headers: authHeaders(f.token),
    })
    expect([401, 403, 404]).toContain(probe.statusCode)
  })
})

describe('金句去重与夜键 upsert（第 9 夜）', () => {
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

  it('同会话同来源同文本重复添加 → 返回同一行（幂等）', async () => {
    const f = await createBoundFamily(h.app)
    const childId = await createChild(h.app, f.token, f.familyId)
    const session = await h.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(f.token),
      payload: { childId, bookId: 'B1' },
    })
    const sid = session.json().id
    const url = `/api/cosession/${sid}/highlights`
    const headers = authHeaders(f.token)
    const first = await h.app.inject({
      method: 'POST', url, headers,
      payload: { source: 'voice', text: '重要的东西用眼睛是看不见的' },
    })
    expect(first.statusCode).toBe(201)
    const second = await h.app.inject({
      method: 'POST', url, headers,
      payload: { source: 'voice', text: '重要的东西用眼睛是看不见的' },
    })
    expect(second.statusCode).toBe(201)
    expect(second.json().id).toBe(first.json().id)
    expect(await db.highlightStar.count({ where: { cosessionId: sid } })).toBe(1)
    // 同文本不同来源不算重复
    const third = await h.app.inject({
      method: 'POST', url, headers,
      payload: { source: 'manual', text: '重要的东西用眼睛是看不见的' },
    })
    expect(third.statusCode).toBe(201)
    expect(await db.highlightStar.count({ where: { cosessionId: sid } })).toBe(2)
  })

  it('夜键 upsert：同晚重复生成共读卡返回同一 promptId（N4-007 项结）', async () => {
    const f = await createBoundFamily(h.app)
    const childId = await createChild(h.app, f.token, f.familyId)
    const session = await h.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(f.token),
      payload: { childId, bookId: 'B1' },
    })
    const sid = session.json().id
    const card1 = await h.app.inject({
      method: 'POST',
      url: `/api/cosession/${sid}/reading-card`,
      headers: authHeaders(f.token),
    })
    expect(card1.statusCode).toBe(200)
    const card2 = await h.app.inject({
      method: 'POST',
      url: `/api/cosession/${sid}/reading-card`,
      headers: authHeaders(f.token),
    })
    expect(card2.json().promptId).toBe(card1.json().promptId)
    expect(await db.parentPrompt.count()).toBe(1)
  })
})
