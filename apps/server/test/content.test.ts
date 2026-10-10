/**
 * 内容域测试：公版书库 CRUD + 全年龄可读 + 进度 + cbf: 前缀归属。
 */
import { describe, it, expect, beforeAll } from 'vitest'
import {
  makeApp,
  createChild,
  authHeaders,
  createFamilyAsParent,
  joinFamily,
  type TestHarness,
} from './helper'
import { seedAllPacks, seedPack } from '../src/content/seed'
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

  it('旧客户端传 stage=3-5 也可看到全部年龄的书目', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?stage=3-5',
      headers: authHeaders(token),
    })
    const body = res.json()
    const stages = new Set(body.books.map((b: { ageStage: string }) => b.ageStage))
    expect(stages.has('6-8')).toBe(true)
    expect(stages.has('9-12')).toBe(true)
    expect(stages.has('3-5')).toBe(true)
    expect(body.books.find((b: { id: string }) => b.id === 'xiyou-journey')).toBeDefined()
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

  it('R-04 乱序旧写：过期 baseUpdatedAt 的进度不覆盖服务器，返回现状（stale）', async () => {
    const post = (body: Record<string, unknown>) =>
      harness.app.inject({
        method: 'POST',
        url: '/api/content/books/sanzi-jing/progress',
        headers: authHeaders(token),
        payload: body,
      })
    const first = await post({ childId, chapterOrder: 3, blockOrder: 1 })
    expect(first.json().stale).toBe(false)
    expect(first.json().blockOrder).toBe(1)
    const ver = first.json().updatedAt as string

    // 同设备短间隔内的连写（同一版本基数）在容差内正常生效——不误伤快速滚动
    const quick = await post({ childId, chapterOrder: 4, blockOrder: 0, baseUpdatedAt: ver })
    expect(quick.json().stale).toBe(false)

    // 另一台设备已写入新进度后，携带 1 分钟前旧版本的补报必须被拒
    const second = await post({ childId, chapterOrder: 8, blockOrder: 2 })
    expect(second.json().stale).toBe(false)
    const oldBase = new Date(Date.now() - 60_000).toISOString()
    const stale = await post({ childId, chapterOrder: 2, blockOrder: 0, baseUpdatedAt: oldBase })
    expect(stale.json().stale).toBe(true)
    expect(stale.json().chapterOrder).toBe(8)

    // 读取保持服务器新值；基于最新版本的写入恢复正常
    const read = await harness.app.inject({
      method: 'GET',
      url: `/api/content/books/sanzi-jing/progress?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(read.json().progress.chapterOrder).toBe(8)
    const fresh = await post({ childId, chapterOrder: 5, blockOrder: 0, baseUpdatedAt: stale.json().updatedAt })
    expect(fresh.json().stale).toBe(false)
    expect(fresh.json().chapterOrder).toBe(5)
  })

  it('末章上报：越界钳到末章；位置上报不再自动 finished，显式 completed 才标记', async () => {
    // 位置上报（无 completed）：钳到末章但不算读完
    const res = await harness.app.inject({
      method: 'POST',
      url: '/api/content/books/sanzi-jing/progress',
      headers: authHeaders(token),
      payload: { childId, chapterOrder: 99, blockOrder: 0 },
    })
    // 全本《三字经》共 17 课，越界钳到末章
    expect(res.json().chapterOrder).toBe(17)
    expect(res.json().finished).toBe(false)
    // 显式完成动作（真实读完末章）才标记 finished
    const done = await harness.app.inject({
      method: 'POST',
      url: '/api/content/books/sanzi-jing/progress',
      headers: authHeaders(token),
      payload: { childId, chapterOrder: 17, blockOrder: 0, completed: true },
    })
    expect(done.json().finished).toBe(true)
    const reread = await harness.app.inject({
      method: 'POST',
      url: '/api/content/books/sanzi-jing/progress',
      headers: authHeaders(token),
      payload: { childId, chapterOrder: 1, blockOrder: 0 },
    })
    expect(reread.json().finished).toBe(true)
    const progress = await harness.app.inject({
      method: 'GET',
      url: `/api/content/books/sanzi-jing/progress?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(progress.json().progress.finished).toBe(true)
    expect(progress.json().progress.chapterOrder).toBe(1)
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

  it('导入书出处可收录：imp: 书不再 404，出处书名前缀保留在 context', async () => {
    const db = harness.db as PrismaClient
    const impId = 'imp:wordstest000000000000000abc'
    // test.db 跨用例复用：upsert 防上次运行残留撞唯一键
    await db.importedBook.upsert({
      where: { id: impId },
      create: { id: impId, familyId, title: '家庭导入的英文书', lang: 'en', ageStage: '6-8', sourceName: 'family-book.epub', sha256: 'sha-words-imp-1' },
      update: {},
    })
    const add = await harness.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(token),
      payload: { childId, word: 'wonder', lang: 'en', bookId: impId, context: 'curiouser and curiouser' },
    })
    expect(add.statusCode).toBe(200)
    // WordCard.bookId 外键只指向公版 Book 表：导入书出处以《书名》保留在 context
    expect(add.json().card.bookId).toBeNull()
    expect(add.json().card.context).toBe('《家庭导入的英文书》·curiouser and curiouser')

    const list = await harness.app.inject({
      method: 'GET',
      url: `/api/content/words?childId=${childId}`,
      headers: authHeaders(token),
    })
    const hit = list.json().cards.find((c: { word: string }) => c.word === 'wonder')
    expect(hit?.context).toContain('家庭导入的英文书')

    const del = await harness.app.inject({
      method: 'DELETE',
      url: `/api/content/words/${add.json().card.id}?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(del.statusCode).toBe(200)

    // 别的家庭的导入书：与正文读取同口径 404
    const otherFamily = await db.family.findFirst({ where: { id: { not: familyId } }, select: { id: true } })
    await db.importedBook.upsert({
      where: { id: 'imp:otherfamily000000000000abc' },
      create: { id: 'imp:otherfamily000000000000abc', familyId: otherFamily!.id, title: '别人家的书', lang: 'en', ageStage: '6-8', sourceName: 'x.epub', sha256: 'sha-words-imp-2' },
      update: {},
    })
    const foreign = await harness.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(token),
      payload: { childId, word: 'foreign', lang: 'en', bookId: 'imp:otherfamily000000000000abc', context: 'c' },
    })
    expect(foreign.statusCode).toBe(404)
  })
})

describe('内容域 年龄仅为建议，档案归属仍强制校验', () => {
  let childToken: string
  let familyCode: string

  beforeAll(async () => {
    const fam = await (harness.db as PrismaClient).family.findUnique({ where: { id: familyId }, select: { code: true } })
    familyCode = fam!.code
    const child = await joinFamily(harness.app, familyCode, 'child')
    childToken = child.token
  })

  it('3-5 岁孩子传旧 stage 参数仍可看到所有年龄和新增故事', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: `/api/content/books?stage=3-5&childId=${childId}`,
      headers: authHeaders(childToken),
    })
    expect(res.statusCode).toBe(200)
    const stages = new Set(res.json().books.map((b: { ageStage: string }) => b.ageStage))
    expect(stages.has('9-12')).toBe(true)
    expect(stages.has('6-8')).toBe(true)
    expect(stages.has('3-5')).toBe(true)
    expect(res.json().books.map((b: { id: string }) => b.id)).toContain('zh-asb-0201')
  })

  it('孩子不带 childId → 400（必须选择档案）', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books',
      headers: authHeaders(childToken),
    })
    expect(res.statusCode).toBe(400)
  })

  it('孩子带别家 childId → 404', async () => {
    const other = await createFamilyAsParent(harness.app, 'stage-other-parent')
    const otherChild = await createChild(harness.app, other.token, other.familyId, '别家娃', '9-12')
    const res = await harness.app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${otherChild}`,
      headers: authHeaders(childToken),
    })
    expect(res.statusCode).toBe(404)
  })

  it('家长传旧 query.stage 也可看到全部年龄', async () => {
    const res = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books?stage=3-5',
      headers: authHeaders(token),
    })
    const stages = new Set(res.json().books.map((b: { ageStage: string }) => b.ageStage))
    expect(stages.has('6-8')).toBe(true)
    expect(stages.has('9-12')).toBe(true)
    expect(stages.has('3-5')).toBe(true)
  })

  it('最小年龄孩子的专题书单与家长一致，并可搜索和阅读高年龄故事', async () => {
    for (const id of ['quick-stories', 'classic-tales', 'bedtime-poems']) {
      const url = `/api/content/collections/${id}?childId=${childId}`
      const parent = await harness.app.inject({ method: 'GET', url, headers: authHeaders(token) })
      const child = await harness.app.inject({ method: 'GET', url, headers: authHeaders(childToken) })
      expect(child.statusCode).toBe(200)
      expect(child.json().books.map((b: { id: string }) => b.id)).toEqual(parent.json().books.map((b: { id: string }) => b.id))
    }
    const search = await harness.app.inject({ method: 'GET', url: `/api/content/books?childId=${childId}&q=${encodeURIComponent('为什么河马没有毛发')}`, headers: authHeaders(childToken) })
    expect(search.json().books.map((b: { id: string }) => b.id)).toContain('zh-asb-0111')
    const read = await harness.app.inject({ method: 'GET', url: '/api/content/books/zh-asb-0201/chapters/1', headers: authHeaders(childToken) })
    expect(read.statusCode).toBe(200)
  })
})

describe('内容域 家长预览屏蔽书（blocked 状态真实回显）', () => {
  it('屏蔽后家长预览详情 blocked=true，解除后回 false', async () => {
    const put = await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/alice-wonderland/blocked',
      headers: authHeaders(token),
      payload: { blocked: true },
    })
    expect(put.statusCode).toBe(200)

    const preview = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books/alice-wonderland',
      headers: authHeaders(token),
    })
    expect(preview.statusCode).toBe(200)
    expect(preview.json().book.blocked).toBe(true)

    await harness.app.inject({
      method: 'PUT',
      url: '/api/content/books/alice-wonderland/blocked',
      headers: authHeaders(token),
      payload: { blocked: false },
    })
    const after = await harness.app.inject({
      method: 'GET',
      url: '/api/content/books/alice-wonderland',
      headers: authHeaders(token),
    })
    expect(after.json().book.blocked).toBe(false)
  })
})

describe('内容域 seed 幂等性', () => {
  // 幂等是 per-book 逻辑（seedAllPacks 只是逐包循环）：全量播种一次供台账断言，
  // 重复导入改用最小真实包复验同一 delete-then-create 路径——
  // 原实现双次全量（222 本×2）单独跑 42s、全量套件资源争用时撞 60s 门限。
  it('重复入库不产生重复章节', async () => {
    const db = harness.db as PrismaClient
    const pack = ALL_PACKS.find((p) => p.id === 'sanzi-jing')
    expect(pack).toBeDefined()
    await seedPack(db, pack!)
    await seedPack(db, pack!)
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
