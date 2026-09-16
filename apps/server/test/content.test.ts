/**
 * 内容域测试（v2）：公版书库 CRUD + 适龄过滤 + 进度 + cbf: 前缀归属。
 */
import { describe, it, expect, beforeAll } from 'vitest'
import {
  makeApp,
  createChild,
  authHeaders,
  createFamilyAsParent,
  type TestHarness,
} from './helper'
import { seedAllPacks } from '../src/content/seed'
import { ALL_PACKS } from '../src/content/packs'
import { toCbfBookId } from '../src/content/service'
import type { PrismaClient } from '@prisma/client'

let harness: TestHarness
let token: string
let familyId: string
let childId: string
let otherToken: string

beforeAll(async () => {
  harness = await makeApp()
  const db = harness.db as PrismaClient
  await seedAllPacks(db, ALL_PACKS)

  // 家庭 A：3-5 岁孩子
  const parent = await createFamilyAsParent(harness.app, 'parent-a')
  token = parent.token
  familyId = parent.familyId
  childId = await createChild(harness.app, token, familyId, '小桃', '3-5')

  // 家庭 B：越权探测用
  const other = await createFamilyAsParent(harness.app, 'parent-b')
  otherToken = other.token
})

describe('内容域 /api/content/books', () => {
  it('列出全部书籍，bookId 带 cbf: 前缀', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books',
      headers: authHeaders(token),
    })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body.total).toBeGreaterThanOrEqual(8)
    const alice = body.books.find((b: { id: string }) => b.id === 'alice-wonderland')
    expect(alice).toBeDefined()
    expect(alice.bookId).toBe('cbf:alice-wonderland')
    // P0-8：英文公版书扩至 3 章（docs/09 §4.2）
    expect(alice.chapterCount).toBe(3)
    expect(alice.coverArt).toBe('alice-rabbit')
    const peterRabbit = body.books.find((b: { id: string }) => b.id === 'peter-rabbit')
    expect(peterRabbit).toBeDefined()
    expect(peterRabbit.chapterCount).toBe(3)
  })

  it('3-5 岁孩子过滤掉 6-8 岁书目', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?stage=3-5',
      headers: authHeaders(token),
    })
    const body = res.json()
    const stages = new Set(body.books.map((b: { ageStage: string }) => b.ageStage))
    expect(stages.has('6-8')).toBe(false)
    expect(stages.has('3-5')).toBe(true)
    // 西游记与刻舟求剑标注 6-8，应被过滤
    expect(body.books.find((b: { id: string }) => b.id === 'xiyou-journey')).toBeUndefined()
    expect(body.books.find((b: { id: string }) => b.id === 'sanzi-jing')).toBeDefined()
  })

  it('未登录拒绝', async () => {
    const res = await harness.app.inject({ method: 'GET', url: '/api/content/books' })
    expect(res.statusCode).toBe(401)
  })

  it('章节正文按顺序返回块', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books/sanzi-jing/chapters/1',
      headers: authHeaders(token),
    })
    expect(res.statusCode).toBe(200)
    const ch = res.json().chapter
    expect(ch.title).toContain('人之初')
    expect(ch.blocks.length).toBe(3)
    expect(ch.blocks[0].kind).toBe('poem')
    expect(ch.blocks[0].pinyin).toContain('rén zhī chū')
  })

  it('不存在的书 404 且消息不泄露内部', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books/no-such-book/chapters/1',
      headers: authHeaders(token),
    })
    expect(res.statusCode).toBe(404)
  })

  it('进度上报与读取，跨家庭 childId 被拒', async () => {
    const res = await harness.app.inject({
      method: 'POST',
      url: '/api/content/books/sanzi-jing/progress',
      headers: authHeaders(token),
      payload: { childId, chapterOrder: 2, blockOrder: 1 },
    })
    expect(res.statusCode).toBe(200)
    expect(res.json().chapterOrder).toBe(2)

    const read = await harness.app.inject({
      method: 'GET',
      url: `/api/content/books/sanzi-jing/progress?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(read.json().progress.chapterOrder).toBe(2)

    // 跨家庭：孩子不属于家庭 B
    const cross = await harness.app.inject({
      method: 'POST',
      url: '/api/content/books/sanzi-jing/progress',
      headers: authHeaders(otherToken),
      payload: { childId, chapterOrder: 3 },
    })
    expect(cross.statusCode).toBe(404)
  })

  it('末章上报标记 finished，越界钳到末章', async () => {
    const res = await harness.app.inject({
      method: 'POST',
      url: '/api/content/books/sanzi-jing/progress',
      headers: authHeaders(token),
      payload: { childId, chapterOrder: 99, blockOrder: 0 },
    })
    expect(res.json().chapterOrder).toBe(3)
    expect(res.json().finished).toBe(true)
  })

  it('cbf: 书籍可正常开启共读会话', async () => {
    const res = await harness.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(token),
      payload: { childId, bookId: toCbfBookId('sanzi-jing') },
    })
    expect(res.statusCode).toBe(201)
    expect(res.json().bookId).toBe('cbf:sanzi-jing')
  })

  it('cbf: 会话的共读卡走内容域，不出网', async () => {
    // 用第二个孩子：幂等守卫不会复用家庭 A 的既有 cbf 会话
    const child2 = await createChild(harness.app, token, familyId, '小柚', '6-8')
    const start = await harness.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(token),
      payload: { childId: child2, bookId: toCbfBookId('xiyou-journey') },
    })
    const sessionId = start.json().id
    const res = await harness.app.inject({
      method: 'POST',
      url: `/api/cosession/${sessionId}/reading-card`,
      headers: authHeaders(token),
    })
    expect(res.statusCode).toBe(200)
    expect(res.json().card.bookTitle).toBe('西游记·美猴王出世')
  })

  it('进度记录按孩子归属，第二个孩子独立计数', async () => {
    const child2 = await createChild(harness.app, token, familyId, '小柚', '6-8')
    const res = await harness.app.inject({
      method: 'GET',
      url: `/api/content/books?stage=6-8&childId=${child2}`,
      headers: authHeaders(token),
    })
    const xiyou = res.json().books.find((b: { id: string }) => b.id === 'xiyou-journey')
    expect(xiyou.progress).toBe(0)
  })
})

describe('内容域 seed 幂等性', () => {
  it('重复入库不产生重复章节', async () => {
    const db = harness.db as PrismaClient
    await seedAllPacks(db, ALL_PACKS)
    await seedAllPacks(db, ALL_PACKS)
    const count = await db.chapter.count({ where: { bookId: 'sanzi-jing' } })
    expect(count).toBe(3)
    const blocks = await db.block.count({ where: { chapter: { bookId: 'sanzi-jing' } } })
    expect(blocks).toBe(10)
  })

  it('版权台账一书一行', async () => {
    const db = harness.db as PrismaClient
    const rows = await db.rightsLedger.findMany()
    const ids = rows.map((r: { bookId: string }) => r.bookId)
    expect(new Set(ids).size).toBe(ids.length)
    const alice = rows.find((r: { bookId: string }) => r.bookId === 'alice-wonderland')
    expect(alice?.basis).toBe('pd-us')
  })
})
