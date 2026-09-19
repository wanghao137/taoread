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
    expect(initial.json()).toEqual({ bedtimeMin: null, overtimeCapSec: null, calmMode: null })

    const patch = await h.app.inject({
      method: 'PATCH',
      url: `/api/family/${f.familyId}/settings`,
      headers: authHeaders(f.token),
      payload: { bedtimeMin: 1320, overtimeCapSec: 600 },
    })
    expect(patch.statusCode).toBe(200)
    expect(patch.json()).toEqual({ bedtimeMin: 1320, overtimeCapSec: 600, calmMode: null })
  })

  it('设置边界：越界拒绝（bedtime 1440 / cap 59），null 显式回落', async () => {
    const f = await createFamilyAsParent(h.app)
    const url = `/api/family/${f.familyId}/settings`
    const headers = authHeaders(f.token)
    for (const payload of [
      { bedtimeMin: 1440 },
      { bedtimeMin: -1 },
      { overtimeCapSec: 59 },
      { overtimeCapSec: 3601 },
    ]) {
      const res = await h.app.inject({ method: 'PATCH', url, headers, payload })
      expect(res.statusCode).toBe(400)
    }
    const reset = await h.app.inject({
      method: 'PATCH',
      url,
      headers,
      payload: { bedtimeMin: null, overtimeCapSec: null },
    })
    expect(reset.statusCode).toBe(200)
    expect(reset.json()).toEqual({ bedtimeMin: null, overtimeCapSec: null, calmMode: null })
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
        payload: { bedtimeMin: 1260 },
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
    expect(on.json()).toEqual({ bedtimeMin: null, overtimeCapSec: null, calmMode: true })

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

  it('家庭级 bedtimeMin 覆盖环境默认：设置 1320 后 21:30 可开课', async () => {
    // env 默认 1290（21:30 会挡），家庭覆盖 1320（22:00）→ 21:45 开课放行
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
    // 无覆盖的另一家庭仍被 1290 闸挡住
    const f2 = await createFamilyAsParent(overrideApp.app, 'no-override')
    const childId2 = await createChild(overrideApp.app, f2.token, f2.familyId, '小柚', '6-8')
    const start2 = await overrideApp.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(f2.token),
      payload: { childId: childId2, bookId: 'B2' },
    })
    expect(start2.statusCode).toBe(403)
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

    const del = await h.app.inject({
      method: 'DELETE',
      url: `/api/family/${f.familyId}`,
      headers: authHeaders(f.token),
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
