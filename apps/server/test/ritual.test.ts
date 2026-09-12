import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import {
  createFamilyAsParent,
  joinFamily,
  makeApp,
  type TestHarness,
} from './helper'
import { wipeDb } from '../src/lib/db'
import { isBedtime } from '../src/modules/ritual/window'

describe('就寝判定（纯逻辑）', () => {
  it('窗口内：21:30 起至 23:59', () => {
    expect(isBedtime(21 * 60 + 30, 1290)).toBe(true)
    expect(isBedtime(23 * 60 + 59, 1290)).toBe(true)
  })
  it('窗口内：凌晨 00:00 至 06:00 前', () => {
    expect(isBedtime(0, 1290)).toBe(true)
    expect(isBedtime(5 * 60 + 59, 1290)).toBe(true)
  })
  it('窗口外：白天与傍晚', () => {
    expect(isBedtime(6 * 60, 1290)).toBe(false)
    expect(isBedtime(12 * 60, 1290)).toBe(false)
    expect(isBedtime(21 * 60 + 29, 1290)).toBe(false)
  })
  it('关闭（null）永不就寝', () => {
    expect(isBedtime(23 * 60, null)).toBe(false)
  })

  it('bedTimeMin=0（午夜就寝）窗口仅为 00:00-06:00（B1-02 边界回归锁）', () => {
    expect(isBedtime(0, 0)).toBe(true)
    expect(isBedtime(5 * 60 + 59, 0)).toBe(true)
    expect(isBedtime(6 * 60, 0)).toBe(false)
    expect(isBedtime(12 * 60, 0)).toBe(false)
    expect(isBedtime(23 * 60, 0)).toBe(false)
  })
})

describe('仪式时段窗口与成就墙 API（第 8 夜）', () => {
  let h: TestHarness
  let db: PrismaClient

  beforeAll(async () => {
    h = await makeApp(undefined, { bedTimeMin: null }) // 默认关闭就寝，测纯窗口
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

  it('窗口端点：无活跃会话 → open', async () => {
    const f = await createFamilyAsParent(h.app)
    const childId = await createChildVia(h.app, f.token, f.familyId)
    const child = await joinFamily(h.app, f.familyCode, 'child')
    const res = await h.app.inject({
      method: 'GET',
      url: `/api/ritual/window?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(res.statusCode).toBe(200)
    expect(res.json()).toMatchObject({ mode: 'open', hasActive: false })
  })

  it('窗口端点：活跃会话未超时 → open+hasActive（服务端按 startedAt 判定，客户端时钟不可信）', async () => {
    const f = await createFamilyAsParent(h.app)
    const childId = await createChildVia(h.app, f.token, f.familyId)
    const child = await joinFamily(h.app, f.familyCode, 'child')
    await h.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: { authorization: `Bearer ${child.token}` },
      payload: { childId, bookId: 'B1' },
    })
    const res = await h.app.inject({
      method: 'GET',
      url: `/api/ritual/window?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(res.json()).toMatchObject({ mode: 'open', hasActive: true })
  })

  it('窗口端点：活跃会话超过软封顶 300s → overtime（温和引导收尾）', async () => {
    let now = 1_800_000_000
    const overtimeApp = await makeApp(undefined, {
      bedTimeMin: null,
      overtimeCapSec: 300,
      cosessionNow: () => now,
      ritualNowSec: () => now,
    })
    await overtimeApp.app.ready()
    const f = await createFamilyAsParent(overtimeApp.app)
    const childId = await createChildVia(overtimeApp.app, f.token, f.familyId)
    const child = await joinFamily(overtimeApp.app, f.familyCode, 'child')
    await overtimeApp.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: { authorization: `Bearer ${child.token}` },
      payload: { childId, bookId: 'B1' },
    })
    now += 301 // 恰好超过软封顶 1 秒
    const res = await overtimeApp.app.inject({
      method: 'GET',
      url: `/api/ritual/window?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(res.json()).toMatchObject({ mode: 'overtime', hasActive: true })
    await overtimeApp.app.close()
    await overtimeApp.db.$disconnect()
  })

  it('成就墙端点：空态与解锁列表（越权 404 对齐）', async () => {
    const f = await createFamilyAsParent(h.app)
    const childId = await createChildVia(h.app, f.token, f.familyId)
    const child = await joinFamily(h.app, f.familyCode, 'child')

    const empty = await h.app.inject({
      method: 'GET',
      url: `/api/achievements?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(empty.statusCode).toBe(200)
    expect(empty.json()).toMatchObject({ nightLamps: [], streakBest: [], booksDone: [] })

    // 直接落两条成就（解锁由收尾域负责，此处只验证墙的读取）
    await db.achievement.createMany({
      data: [
        { familyId: f.familyId, childId, kind: 'night_lamp', value: 1 },
        { familyId: f.familyId, childId, kind: 'night_lamp', value: 2 },
        { familyId: f.familyId, childId, kind: 'book_done', value: 1 },
      ],
    })
    const filled = await h.app.inject({
      method: 'GET',
      url: `/api/achievements?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    const body = filled.json()
    expect(body.nightLamps.map((a: { value: number }) => a.value)).toEqual([1, 2])
    expect(body.booksDone).toHaveLength(1)

    // 越权：另一家庭读不到
    const other = await createFamilyAsParent(h.app, 'other-device')
    const cross = await h.app.inject({
      method: 'GET',
      url: `/api/achievements?childId=${childId}`,
      headers: { authorization: `Bearer ${other.token}` },
    })
    expect(cross.statusCode).toBe(404) // 口径对齐：越权统一 404（N8-004）
  })

  it('开课就寝闸：就寝窗口内 POST /api/cosession 被拒绝（正向文案 403），收尾与金句不受限', async () => {
    let nowMin = 22 * 60 // 可变注入：先就寝拒绝，再切回白天开场，再入夜验证收尾放行
    const bedApp = await makeApp(undefined, { bedTimeMin: 1290, ritualNowMin: () => nowMin })
    await bedApp.app.ready()
    const f = await createFamilyAsParent(bedApp.app)
    const childId = await createChildVia(bedApp.app, f.token, f.familyId)
    const child = await joinFamily(bedApp.app, f.familyCode, 'child')
    const start = await bedApp.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: { authorization: `Bearer ${child.token}` },
      payload: { childId, bookId: 'B1' },
    })
    expect(start.statusCode).toBe(403)
    expect(start.json()).toMatchObject({ code: 'RITUAL_CLOSED', message: /月亮睡觉啦/ })

    // 白天正常开场
    nowMin = 12 * 60
    const opened = await bedApp.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: { authorization: `Bearer ${child.token}` },
      payload: { childId, bookId: 'B1' },
    })
    expect(opened.statusCode).toBe(201)

    // 入夜后收尾与金句均放行（就寝闸只挡开新书）
    nowMin = 22 * 60
    const finished = await bedApp.app.inject({
      method: 'POST',
      url: `/api/cosession/${opened.json().id}/finish`,
      headers: { authorization: `Bearer ${child.token}` },
      payload: { progressMark: 'lot' },
    })
    expect(finished.statusCode).toBe(200)
    const hl = await bedApp.app.inject({
      method: 'POST',
      url: `/api/cosession/${opened.json().id}/highlights`,
      headers: { authorization: `Bearer ${child.token}` },
      payload: { source: 'voice', text: '睡觉前收一句' },
    })
    expect(hl.statusCode).toBe(201)
    await bedApp.app.close()
    await bedApp.db.$disconnect()
  })

  it('窗口端点：bedtime 分支端到端（注入时钟确定化，N8-009）', async () => {
    const bedApp = await makeApp(undefined, { bedTimeMin: 1290, ritualNowMin: () => 22 * 60 })
    await bedApp.app.ready()
    const f = await createFamilyAsParent(bedApp.app)
    const childId = await createChildVia(bedApp.app, f.token, f.familyId)
    const child = await joinFamily(bedApp.app, f.familyCode, 'child')
    const res = await bedApp.app.inject({
      method: 'GET',
      url: `/api/ritual/window?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(res.json()).toMatchObject({ mode: 'bedtime', hasActive: false })
    await bedApp.app.close()
    await bedApp.db.$disconnect()
  })

  it('overtime 边界：299s 未超时 / 300s 恰好超时（>= 口径，N8-009）', async () => {
    let now = 1_800_000_000
    const app2 = await makeApp(undefined, {
      bedTimeMin: null,
      overtimeCapSec: 300,
      cosessionNow: () => now,
      ritualNowSec: () => now,
    })
    await app2.app.ready()
    const f = await createFamilyAsParent(app2.app)
    const childId = await createChildVia(app2.app, f.token, f.familyId)
    const child = await joinFamily(app2.app, f.familyCode, 'child')
    await app2.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: { authorization: `Bearer ${child.token}` },
      payload: { childId, bookId: 'B1' },
    })
    now += 299
    const before = await app2.app.inject({
      method: 'GET',
      url: `/api/ritual/window?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(before.json().mode).toBe('open')
    now += 1 // 恰好 300
    const at = await app2.app.inject({
      method: 'GET',
      url: `/api/ritual/window?childId=${childId}`,
      headers: { authorization: `Bearer ${child.token}` },
    })
    expect(at.json().mode).toBe('overtime')
    await app2.app.close()
    await app2.db.$disconnect()
  })
})

async function createChildVia(
  app: TestHarness['app'],
  token: string,
  familyId: string,
): Promise<string> {
  const res = await app.inject({
    method: 'POST',
    url: `/api/family/${familyId}/children`,
    headers: { authorization: `Bearer ${token}` },
    payload: { nickname: '小桃', stage: '6-8' },
  })
  if (res.statusCode !== 201) throw new Error(`createChild 失败：${res.body}`)
  return res.json().id as string
}
