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

  it('成就墙端点：空态与解锁列表（含越权 403）', async () => {
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
    expect(cross.statusCode).toBe(403)
  })

  it('开课就寝闸：就寝窗口内 POST /api/cosession 被拒绝（正向文案 403），收尾不受限', async () => {
    const bedApp = await makeApp(undefined, { bedTimeMin: 1290, ritualNowMin: () => 22 * 60 })
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
    await bedApp.app.close()
    await bedApp.db.$disconnect()
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
