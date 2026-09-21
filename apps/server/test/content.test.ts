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
  // docs/24：书库扩到 103 本后 seed 耗时上升，放宽 hook 超时
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
}, 120_000)

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

  // docs/11 P0-1：书名/作者/章节标题子串搜索（孩子记的是「静夜思」这首诗，不是集子名）
  it('q 参数按书名子串过滤', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?q=%E9%9D%99%E5%A4%9C',
      headers: authHeaders(token),
    })
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body.total).toBeGreaterThan(0)
    // 命中章节标题的算命中：唐诗集子里有「静夜思」
    expect(body.books.map((b: { id: string }) => b.id)).toContain('tangshi-300')
  })

  it('q 匹配书名本身', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?q=%E8%A5%BF%E6%B8%B8',
      headers: authHeaders(token),
    })
    expect(res.json().books.map((b: { id: string }) => b.id)).toContain('xiyou-journey')
  })

  it('q 参数匹配作者且大小写无关', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?q=carroll',
      headers: authHeaders(token),
    })
    const body = res.json()
    expect(body.books.map((b: { id: string }) => b.id)).toContain('alice-wonderland')
  })

  it('q 无结果时返回空数组而非报错', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?q=zzzz-none',
      headers: authHeaders(token),
    })
    expect(res.statusCode).toBe(200)
    expect(res.json().total).toBe(0)
  })

  it('q 搜索结果仍受家庭屏蔽约束', async () => {
    // 先屏蔽 alice（家长端 PUT /blocked 的副作用：孩子端书架不可见）
    await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/alice-wonderland/blocked',
      headers: authHeaders(token),
      payload: { blocked: true },
    })
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?q=alice',
      headers: authHeaders(token),
    })
    const body = res.json()
    expect(body.books.find((b: { id: string }) => b.id === 'alice-wonderland')).toBeUndefined()
    // 解除屏蔽，避免污染后续用例
    await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/alice-wonderland/blocked',
      headers: authHeaders(token),
      payload: { blocked: false },
    })
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
    // 全本《三字经》：一课一章，整课诗文为一个带拼音的 poem 块
    expect(ch.blocks.length).toBe(1)
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
    // 全本《三字经》共 17 课，越界钳到末章
    expect(res.json().chapterOrder).toBe(17)
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

describe('内容域 收藏（docs/15 P1-A）', () => {
  it('收藏后书架列表带 favorite=true，且再调一次取消', async () => {
    const fav = await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/sanzi-jing/favorite',
      headers: authHeaders(token),
      payload: { childId, favorite: true },
    })
    expect(fav.statusCode).toBe(200)
    expect(fav.json().favorite).toBe(true)

    const list = await harness.app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: authHeaders(token),
    })
    const sanzi = list.json().books.find((b: { id: string }) => b.id === 'sanzi-jing')
    expect(sanzi.favorite).toBe(true)

    const unfav = await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/sanzi-jing/favorite',
      headers: authHeaders(token),
      payload: { childId, favorite: false },
    })
    expect(unfav.json().favorite).toBe(false)
  })

  it('收藏归属孩子：家庭 B 的令牌不能动家庭 A 孩子的收藏', async () => {
    const res = await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/sanzi-jing/favorite',
      headers: authHeaders(otherToken),
      payload: { childId, favorite: true },
    })
    expect(res.statusCode).toBe(404)
  })

  it('收藏不存在的书返回 404', async () => {
    const res = await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/no-such-book/favorite',
      headers: authHeaders(token),
      payload: { childId, favorite: true },
    })
    expect(res.statusCode).toBe(404)
  })
})

describe('内容域 生词本（docs/15 P1-B）', () => {
  it('收录一个英文词，列表里带出处', async () => {
    const add = await harness.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(token),
      payload: { childId, word: 'curious', lang: 'en', bookId: 'alice-wonderland', context: 'Chapter 1' },
    })
    expect(add.statusCode).toBe(200)
    expect(add.json().card.word).toBe('curious')
    expect(add.json().card.bookTitle).toBe('Alice in Wonderland')

    const list = await harness.app.inject({
      method: 'GET',
      url: `/api/content/words?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(list.json().total).toBeGreaterThanOrEqual(1)
    const hit = list.json().cards.find((c: { word: string }) => c.word === 'curious')
    expect(hit?.context).toBe('Chapter 1')
  })

  it('重复收录同一词是幂等的，不会长出两条', async () => {
    await harness.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(token),
      payload: { childId, word: 'curious', lang: 'en' },
    })
    const list = await harness.app.inject({
      method: 'GET',
      url: `/api/content/words?childId=${childId}`,
      headers: authHeaders(token),
    })
    const hits = list.json().cards.filter((c: { word: string }) => c.word === 'curious')
    expect(hits.length).toBe(1)
  })

  it('删除词后列表不再出现', async () => {
    const add = await harness.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(token),
      payload: { childId, word: 'hare', lang: 'en' },
    })
    const wordId = add.json().card.id
    const del = await harness.app.inject({
      method: 'DELETE',
      url: `/api/content/words/${wordId}?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(del.statusCode).toBe(200)
    const list = await harness.app.inject({
      method: 'GET',
      url: `/api/content/words?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(list.json().cards.find((c: { word: string }) => c.word === 'hare')).toBeUndefined()
  })

  it('跨家庭越权：家庭 B 令牌读不到家庭 A 孩子的词', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: `/api/content/words?childId=${childId}`,
      headers: authHeaders(otherToken),
    })
    expect(res.statusCode).toBe(404)
  })

  it('空词与超长词被拒绝', async () => {
    const empty = await harness.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(token),
      payload: { childId, word: '  ', lang: 'en' },
    })
    expect(empty.statusCode).toBe(400)
    const long = await harness.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(token),
      payload: { childId, word: 'x'.repeat(100), lang: 'en' },
    })
    expect(long.statusCode).toBe(400)
  })
})

describe('内容域 seed 幂等性', () => {
  // seedAllPacks 全量 IO 重（与媒体生成脚本同机运行时会抢资源），放宽门限
  it('重复入库不产生重复章节', async () => {
    const db = harness.db as PrismaClient
    await seedAllPacks(db, ALL_PACKS)
    await seedAllPacks(db, ALL_PACKS)
    const count = await db.chapter.count({ where: { bookId: 'sanzi-jing' } })
    // 全本《三字经》：17 课 × 每课 1 个整课诗文块
    expect(count).toBe(17)
    const blocks = await db.block.count({ where: { chapter: { bookId: 'sanzi-jing' } } })
    expect(blocks).toBe(17)
  }, 60_000)

  it('版权台账一书一行', async () => {
    const db = harness.db as PrismaClient
    const rows = await db.rightsLedger.findMany()
    const ids = rows.map((r: { bookId: string }) => r.bookId)
    expect(new Set(ids).size).toBe(ids.length)
    const alice = rows.find((r: { bookId: string }) => r.bookId === 'alice-wonderland')
    expect(alice?.basis).toBe('pd-us')
  })
})
