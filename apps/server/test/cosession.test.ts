import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import { wipeDb } from '../src/lib/db'
import {
  authHeaders,
  createBoundFamily,
  createChild,
  createFamilyAsParent,
  joinFamily,
  makeApp,
  type TestHarness,
} from './helper'
import type { WereadCall } from '../src/services/weread/endpoints'

const probeOk = async () => 'active' as const

let keySeq = 0
const nextKey = () => `wrk-card${String(++keySeq).padStart(4, '0')}-mock`

/** mock 网关：只为共读卡需要的两个接口提供回包 */
const cardGateway = (apiKey: string): WereadCall => async (apiName, params) => {
  void apiKey
  if (apiName === '/book/info') {
    return {
      bookId: params?.bookId,
      title: '小王子',
      intro: '一位飞行员在沙漠里遇见了来自B-612小行星的小王子。',
      category: '1300000234',
    } as never
  }
  if (apiName === '/book/bestbookmarks') {
    return {
      totalCount: 2,
      items: [
        { markText: '重要的不是所见，而是所感', totalCount: 823 },
        { markText: '所有的大人都曾经是小孩', totalCount: 500 },
      ],
    } as never
  }
  throw new Error(`共读卡测试不需要该接口：${apiName}`)
}

/** 可控 Unix 秒时钟（跨夜成就测试） */
let clockSec = Math.floor(Date.UTC(2026, 8, 6, 12, 0, 0) / 1000) // 9/6 20:00 北京

describe('共读域 API（第 4 夜）', () => {
  let h: TestHarness
  let db: PrismaClient

  beforeAll(async () => {
    h = await makeApp(probeOk, {
      wereadCall: cardGateway,
      cosessionNow: () => clockSec,
    })
    db = h.db
    await h.app.ready()
  })
  afterAll(async () => {
    await h.app.close()
    await db.$disconnect()
  })
  beforeEach(async () => {
    await wipeDb(db)
    clockSec = Math.floor(Date.UTC(2026, 8, 6, 12, 0, 0) / 1000)
  })

  const nightOffset = (day: number) => day * 86_400

  describe('完整共读闭环', () => {
    it('开→选书→收尾：落库正确（时长/进度/心情/事件）', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const start = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1001' },
      })
      expect(start.statusCode).toBe(201)

      clockSec += 15 * 60 // 共读 15 分钟
      const finish = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${start.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'lot', mood: 'calm' },
      })
      expect(finish.statusCode).toBe(200)
      const body = finish.json()
      expect(body.alreadyFinished).toBe(false)
      expect(body.durationSec).toBe(900)
      expect(body.unlocked).toContainEqual({ kind: 'night_lamp', value: 1 })

      const session = await db.cosession.findUnique({ where: { id: start.json().id } })
      expect(session?.endedAt).not.toBeNull()
      expect(session?.durationSec).toBe(900)
      expect(session?.progressMark).toBe('lot')
      expect(session?.mood).toBe('calm')

      const events = await db.eventLog.findMany({
        where: { familyId: f.familyId },
        orderBy: { ts: 'asc' },
      })
      expect(events.map((e) => e.event)).toEqual(['ritual_started', 'cosession_finished'])
    })

    it('纸质书共读：paperTitle 落库', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const res = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, paperTitle: '猜猜我有多爱你' },
      })
      expect(res.statusCode).toBe(201)
      const session = await db.cosession.findUnique({ where: { id: res.json().id } })
      expect(session?.paperTitle).toBe('猜猜我有多爱你')
      expect(session?.bookId).toBeNull()
    })

    it('既无 bookId 也无 paperTitle → 400；孩子不属于本家庭 → 404', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const bad = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId },
      })
      expect(bad.statusCode).toBe(400)

      const stranger = await createFamilyAsParent(h.app, 'p-other')
      const notMine = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(stranger.token),
        payload: { childId, bookId: 'B1' },
      })
      expect(notMine.statusCode).toBe(404)
    })

    it('非法 progressMark / mood → 400（schema 枚举）', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' },
      })
      const id = s.json().id
      const bad = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'finished' },
      })
      expect(bad.statusCode).toBe(400)
    })
  })

  describe('断线续传与幂等', () => {
    it('active 返回未收尾会话；收尾后 active 为空', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' },
      })
      const active = await h.app.inject({
        method: 'GET',
        url: `/api/cosession/active?childId=${childId}`,
        headers: authHeaders(f.token),
      })
      expect(active.json().session.id).toBe(s.json().id)

      await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'little' },
      })
      const after = await h.app.inject({
        method: 'GET',
        url: `/api/cosession/active?childId=${childId}`,
        headers: authHeaders(f.token),
      })
      expect(after.json().session).toBeNull()
    })

    it('重复收尾幂等：第二次 alreadyFinished、不改库、不重评成就', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' },
      })
      const first = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'done', mood: 'happy' },
      })
      expect(first.json().alreadyFinished).toBe(false)

      clockSec += 3600
      const second = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'lot' }, // 试图覆盖进度
      })
      expect(second.statusCode).toBe(200)
      expect(second.json().alreadyFinished).toBe(true)
      expect(second.json().progressMark).toBe('done') // 首次值不被覆盖
      expect(second.json().unlocked).toEqual([])

      const achievements = await db.achievement.findMany({ where: { childId } })
      expect(achievements).toHaveLength(2) // night_lamp:1 + book_done:1，重复收尾未新增
      const session = await db.cosession.findUnique({ where: { id: s.json().id } })
      expect(session?.durationSec).toBe(first.json().durationSec) // 时长不因第二次调用变化
    })
  })

  describe('成就只解锁一次', () => {
    it('跨夜：夜灯 1→2、连续 2 解锁；同晚第二场共读不再点亮新夜灯', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)

      // 第 1 晚
      const s1 = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' },
      })
      const r1 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s1.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'little' },
      })
      expect(r1.json().unlocked).toEqual([{ kind: 'night_lamp', value: 1 }])

      // 第 2 晚：连续 2 跨 best + 夜灯 2
      clockSec += nightOffset(1)
      const s2 = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B2' },
      })
      const r2 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s2.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'little' },
      })
      expect(r2.json().unlocked).toEqual([
        { kind: 'night_lamp', value: 2 },
        { kind: 'streak_best', value: 2 },
      ])

      // 第 2 晚第二场（同晚）：夜灯值不变 → 唯一约束拦截 → 无新解锁
      const s3 = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B3' },
      })
      const r3 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s3.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'little' },
      })
      expect(r3.json().unlocked).toEqual([])

      const all = await db.achievement.findMany({ where: { childId } })
      expect(all).toHaveLength(3) // night_lamp:1, night_lamp:2, streak_best:2
    })

    it('读完第 1 本解锁；同书重读不再解锁，新书递增', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)

      const s1 = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' },
      })
      const r1 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s1.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'done' },
      })
      expect(r1.json().unlocked).toContainEqual({ kind: 'book_done', value: 1 })

      clockSec += nightOffset(1)
      const s2 = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' }, // 重读同一本
      })
      const r2 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s2.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'done' },
      })
      expect(r2.json().unlocked).not.toContainEqual({ kind: 'book_done', value: 2 })

      clockSec += nightOffset(1)
      const s3 = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B2' },
      })
      const r3 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s3.json().id}/finish`,
        headers: authHeaders(f.token),
        payload: { progressMark: 'done' },
      })
      expect(r3.json().unlocked).toContainEqual({ kind: 'book_done', value: 2 })
    })
  })

  describe('金句两来源', () => {
    it('口述录入（voice）与热门划线点选（weread 带 markCount）均落库', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' },
      })
      const id = s.json().id

      const v = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${id}/highlights`,
        headers: authHeaders(f.token),
        payload: { source: 'voice', text: '小王子说重要的东西眼睛是看不见的' },
      })
      expect(v.statusCode).toBe(201)
      const w = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${id}/highlights`,
        headers: authHeaders(f.token),
        payload: { source: 'weread', text: '所有的大人都曾经是小孩', markCount: 500 },
      })
      expect(w.statusCode).toBe(201)

      const rows = await db.highlightStar.findMany({ where: { cosessionId: id } })
      expect(rows).toHaveLength(2)
      expect(rows.find((r) => r.source === 'weread')?.markCount).toBe(500)
      expect(rows.find((r) => r.source === 'voice')?.markCount).toBeNull()

      // 详情接口能看到金句
      const detail = await h.app.inject({
        method: 'GET',
        url: `/api/cosession/${id}`,
        headers: authHeaders(f.token),
      })
      expect(detail.json().highlights).toHaveLength(2)
    })

    it('文本长度越界 → 400；跨家庭操作他人会话 → 404', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1' },
      })
      const id = s.json().id
      const tooLong = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${id}/highlights`,
        headers: authHeaders(f.token),
        payload: { source: 'voice', text: '长'.repeat(501) },
      })
      expect(tooLong.statusCode).toBe(400)

      const stranger = await createFamilyAsParent(h.app, 'p-other2')
      const cross = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${id}/finish`,
        headers: authHeaders(stranger.token),
        payload: {},
      })
      expect(cross.statusCode).toBe(404)
    })
  })

  describe('模板共读卡', () => {
    it('绑定家庭 + 网关可用：卡片含书名/三要点/三问题/钩子，ParentPrompt 落库', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId, '桃桃', '6-8')
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1001' },
      })
      const res = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/reading-card`,
        headers: authHeaders(f.token),
      })
      expect(res.statusCode).toBe(200)
      const { card, promptId } = res.json()
      expect(card.bookTitle).toBe('小王子')
      expect(card.genType).toBe('template')
      expect(card.tellPoints).toHaveLength(3)
      expect(card.questions).toHaveLength(3)
      expect(card.questions.join()).toContain('小王子')
      expect(card.hook).toBeTruthy()
      // 要点引用了热门划线原文（稳定散列二选一，两条都是文档回包里的划线）
      const joined = card.tellPoints.join()
      expect(joined).toContain('打动过')
      expect(
        joined.includes('重要的不是所见') || joined.includes('所有的大人都曾经是小孩'),
      ).toBe(true)

      const prompt = await db.parentPrompt.findUnique({ where: { id: promptId } })
      expect(prompt?.stage).toBe('6-8')
      expect(prompt?.genType).toBe('template')
      expect(JSON.parse(prompt?.questions ?? '[]')).toHaveLength(3)
    })

    it('未绑定家庭：模板兜底不报错（书名退化为 bookId）', async () => {
      const f = await createFamilyAsParent(h.app)
      const childId = await createChild(h.app, f.token, f.familyId)
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B9999' },
      })
      const res = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/reading-card`,
        headers: authHeaders(f.token),
      })
      expect(res.statusCode).toBe(200)
      expect(res.json().card.bookTitle).toBe('B9999')
      expect(res.json().card.tellPoints).toHaveLength(3)
    })

    it('纸质书会话：直接用 paperTitle 生成，不出网', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId, '桃桃', '9-12')
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, paperTitle: '猜猜我有多爱你' },
      })
      const res = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/reading-card`,
        headers: authHeaders(f.token),
      })
      expect(res.statusCode).toBe(200)
      const card = res.json().card
      expect(card.bookTitle).toBe('猜猜我有多爱你')
      expect(card.stage).toBe('9-12')
      expect(card.questions.join()).not.toContain('undefined')
    })

    it('同一会话重复生成：内容稳定（确定性模板）', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(f.token),
        payload: { childId, bookId: 'B1001' },
      })
      const r1 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/reading-card`,
        headers: authHeaders(f.token),
      })
      const r2 = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/reading-card`,
        headers: authHeaders(f.token),
      })
      expect(r2.json().card).toEqual(r1.json().card)
    })
  })

  describe('角色与未认证', () => {
    it('孩子设备可以开共读、收尾、加金句（仪式主角）', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const childId = await createChild(h.app, f.token, f.familyId)
      const child = await joinFamily(h.app, f.familyCode, 'child')
      const s = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(child.token),
        payload: { childId, bookId: 'B1' },
      })
      expect(s.statusCode).toBe(201)
      const finish = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${s.json().id}/finish`,
        headers: authHeaders(child.token),
        payload: { progressMark: 'little', mood: 'sleepy' },
      })
      expect(finish.statusCode).toBe(200)
    })

    it('未认证 → 401', async () => {
      const res = await h.app.inject({ method: 'POST', url: '/api/cosession', payload: {} })
      expect(res.statusCode).toBe(401)
    })
  })
})
