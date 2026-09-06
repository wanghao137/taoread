import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import { wipeDb } from '../src/lib/db'
import { WereadApiError } from '../src/lib/errors'
import {
  authHeaders,
  createBoundFamily,
  createFamilyAsParent,
  joinFamily,
  makeApp,
  type TestHarness,
} from './helper'
import type { WereadCall } from '../src/services/weread/endpoints'
import { WereadServiceRegistry } from '../src/services/weread/registry'

const probeOk = async () => 'active' as const

/** 每个用例独立的假 key（wrk-[\w-]{8,}）：隔离 TTL 缓存命名空间与出网计数 */
let keySeq = 0
const nextKey = () => `wrk-k${String(++keySeq).padStart(4, '0')}-mock`

// ── mock 网关：回包结构严格对照 weread skill 文档，不做字段臆测 ──

const SHELF_FIXTURE = {
  books: [
    {
      bookId: 'B1001',
      title: '小王子',
      author: '圣埃克苏佩里',
      category: '1300000234',
      deepLink: 'weread://book/B1001',
      finishReading: 0,
      readUpdateTime: 1_725_000_000,
      secret: 0,
    },
    {
      bookId: 'B1002',
      title: '夏洛的网',
      category: '1300000999',
      finishReading: 1,
      readUpdateTime: 1_724_000_000,
    },
    { bookId: 'B2001', title: '三体', category: '1000000', finishReading: 0 },
  ],
  albums: [
    {
      albumInfo: {
        albumId: 'A3001',
        name: '小猪佩奇故事集',
        authorName: '佩奇',
        cover: 'https://img.example/a3001.jpg',
        trackCount: 40,
        finish: 1,
        updateTime: 1_723_000_000,
      },
      albumInfoExtra: { secret: 0 },
    },
  ],
  mp: { bookId: 'MP_ENTRY' },
  bookCount: 3,
}

const RECOMMEND_FIXTURE = {
  books: [
    { bookId: 'R1', title: '猜猜我有多爱你', category: '1300000555', reason: '经典绘本' },
    { bookId: 'R2', title: '成人小说', category: '2000000', reason: '热销' },
    { bookId: 'B1001', title: '小王子', category: '1300000234', reason: '读过相似' },
  ],
}

function fixtureFor(apiName: string, params?: Record<string, unknown>): unknown {
  switch (apiName) {
    case '/shelf/sync':
      return SHELF_FIXTURE
    case '/book/info':
      return {
        bookId: params?.bookId,
        title: `书${String(params?.bookId)}`,
        deepLink: `weread://book/${String(params?.bookId)}`,
        category: '1300000234',
      }
    case '/book/chapterinfo':
      return { bookId: params?.bookId, chapters: [{ chapterUid: 1, title: '第一章', level: 1 }] }
    case '/book/getprogress':
      return { bookId: params?.bookId, book: { progress: 45, recordReadingTime: 600 } }
    case '/book/recommend':
      return RECOMMEND_FIXTURE
    case '/book/bestbookmarks':
      return {
        totalCount: 1,
        items: [{ bookId: params?.bookId, markText: '重要的不是所见，而是所感', totalCount: 823 }],
      }
    default:
      throw new Error(`mock 网关未实现接口：${apiName}`)
  }
}

/** 记录全部出网调用的 mock 工厂 */
function makeMockGateway() {
  const calls: Array<{
    apiKey: string
    apiName: string
    params: Record<string, unknown> | undefined
  }> = []
  const factory = (apiKey: string): WereadCall => async (apiName, params) => {
    calls.push({ apiKey, apiName, params })
    return fixtureFor(apiName, params) as never
  }
  const count = (apiName: string, apiKey: string) =>
    calls.filter((c) => c.apiName === apiName && c.apiKey === apiKey).length
  const last = () => calls[calls.length - 1]
  return { factory, calls, count, last }
}

const gateway = makeMockGateway()

describe('微信读书业务 API（第 3 夜四件套）', () => {
  let h: TestHarness
  let db: PrismaClient

  beforeAll(async () => {
    h = await makeApp(probeOk, { wereadCall: gateway.factory })
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

  describe('GET /api/shelf', () => {
    it('未绑定返回 409 与引导文案', async () => {
      const parent = await createFamilyAsParent(h.app)
      const res = await h.app.inject({
        method: 'GET',
        url: '/api/shelf',
        headers: authHeaders(parent.token),
      })
      expect(res.statusCode).toBe(409)
      expect(res.json().code).toBe('WEREAD_NOT_BOUND')
      expect(res.json().message).toContain('绑定')
    })

    it('未认证返回 401', async () => {
      const res = await h.app.inject({ method: 'GET', url: '/api/shelf' })
      expect(res.statusCode).toBe(401)
    })

    it('全量视图：三区和口径（books+albums+mp）且条目原样直通', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const res = await h.app.inject({
        method: 'GET',
        url: '/api/shelf',
        headers: authHeaders(f.token),
      })
      expect(res.statusCode).toBe(200)
      const body = res.json()
      // 口径：3 书 + 1 专辑 + 1 mp 入口 = 5
      expect(body.total).toBe(5)
      expect(body.bookCount).toBe(3)
      expect(body.albumCount).toBe(1)
      expect(body.books).toHaveLength(3)
      expect(body.books[0].deepLink).toBe('weread://book/B1001') // deepLink 只透传原值
      expect(body.albums[0].albumInfo.albumId).toBe('A3001')
    })

    it('第二次调用缓存命中：0 次出网', async () => {
      const key = nextKey()
      const f = await createBoundFamily(h.app, key)
      const get = () =>
        h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f.token) })
      expect((await get()).statusCode).toBe(200)
      expect((await get()).statusCode).toBe(200)
      expect(gateway.count('/shelf/sync', key)).toBe(1)
    })

    it('快照落库：books+albums 入 ShelfSnapshot，blocked 标记在重同步后保留', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f.token) })

      let rows = await db.shelfSnapshot.findMany({ where: { familyId: f.familyId } })
      expect(rows).toHaveLength(4) // 3 books + 1 album；mp 无文档化 id 不入快照
      expect(rows.find((r) => r.bookId === 'B1002')?.finished).toBe(true)
      expect(rows.find((r) => r.bookId === 'A3001')?.kind).toBe('album')

      // 家长屏蔽 B1001 后重拉书架（缓存命中不出网），blocked 仍保留
      const put = await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f.familyId}/shelf/B1001/blocked`,
        headers: authHeaders(f.token),
        payload: { kind: 'book', blocked: true },
      })
      expect(put.statusCode).toBe(200)
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f.token) })
      rows = await db.shelfSnapshot.findMany({ where: { familyId: f.familyId } })
      expect(rows.find((r) => r.bookId === 'B1001')?.blocked).toBe(true)
      expect(rows.find((r) => r.bookId === 'B1002')?.blocked).toBe(false)
    })

    it('孩子视图 view=child：白名单 books、专辑默认不放行，总数按同口径重算', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f.familyId}/shelf/A3001/blocked`,
        headers: authHeaders(f.token),
        payload: { kind: 'album', blocked: true, title: '小猪佩奇故事集' },
      })
      const res = await h.app.inject({
        method: 'GET',
        url: '/api/shelf?view=child',
        headers: authHeaders(f.token),
      })
      const body = res.json()
      expect(body.view).toBe('child')
      // 白名单书 B1001/B1002（1300000xxx），B2001(1000000) 被滤；
      // 专辑无类目可判默认不放行（N3-003）；mp 入口保留 → 总数 = 2 + 0 + 1 = 3
      expect(body.books.map((b: { bookId: string }) => b.bookId)).toEqual(['B1001', 'B1002'])
      expect(body.albums).toEqual([])
      expect(body.total).toBe(3)
    })

    it('N3-002 回归：孩子角色不带 view 参数也强制孩子视图（服务端适龄义务）', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const child = await joinFamily(h.app, f.familyCode, 'child')
      const res = await h.app.inject({
        method: 'GET',
        url: '/api/shelf',
        headers: authHeaders(child.token),
      })
      const body = res.json()
      expect(body.view).toBe('child')
      expect(body.books.map((b: { bookId: string }) => b.bookId)).toEqual(['B1001', 'B1002'])
      expect(body.blockedBookIds).toBeUndefined() // 全量视图专属字段不泄露给孩子
    })

    it('N3-001 回归：屏蔽不在书架上的推荐书，快照同步不丢屏蔽行，推荐流持续过滤', async () => {
      const key = nextKey()
      const f = await createBoundFamily(h.app, key)
      // R1 是推荐流的书，不在书架回包里
      const put = await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f.familyId}/shelf/R1/blocked`,
        headers: authHeaders(f.token),
        payload: { kind: 'book', blocked: true, title: '猜猜我有多爱你' },
      })
      expect(put.statusCode).toBe(200)
      // 书架同步（缓存未命中首拉 + 二次缓存命中都会跑同步）
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f.token) })
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f.token) })

      const row = await db.shelfSnapshot.findFirst({ where: { familyId: f.familyId, bookId: 'R1' } })
      expect(row?.blocked).toBe(true) // 屏蔽行在同步后存活

      const rec = await h.app.inject({
        method: 'GET',
        url: '/api/book/recommend',
        headers: authHeaders(f.token),
      })
      // R1 被屏蔽、R2 非童书被滤；B1001 是童书且未屏蔽 → 保留
      expect(rec.json().books.map((b: { bookId: string }) => b.bookId)).toEqual(['B1001'])
    })

    it('N3-002 回归：孩子访问被屏蔽书的详情接口返回 404', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const child = await joinFamily(h.app, f.familyCode, 'child')
      await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f.familyId}/shelf/B1001/blocked`,
        headers: authHeaders(f.token),
        payload: { kind: 'book', blocked: true },
      })
      for (const suffix of ['info', 'chapters', 'progress', 'bestbookmarks']) {
        const res = await h.app.inject({
          method: 'GET',
          url: `/api/book/B1001/${suffix}`,
          headers: authHeaders(child.token),
        })
        expect(res.statusCode).toBe(404)
      }
      // 家长本人不受屏蔽限制（屏蔽是给孩子的适龄管控，不是家长的）
      const parentRes = await h.app.inject({
        method: 'GET',
        url: '/api/book/B1001/info',
        headers: authHeaders(f.token),
      })
      expect(parentRes.statusCode).toBe(200)
    })
  })

  describe('GET /api/book/:id/info|chapters|progress 与 bestbookmarks', () => {
    it('info/chapters/bestbookmarks 回包直通且缓存生效（第二次 0 出网）', async () => {
      const key = nextKey()
      const f = await createBoundFamily(h.app, key)
      const urls = [
        '/api/book/B1001/info',
        '/api/book/B1001/chapters',
        '/api/book/B1001/bestbookmarks?chapterUid=2',
      ]
      for (const url of urls) {
        const first = await h.app.inject({ method: 'GET', url, headers: authHeaders(f.token) })
        expect(first.statusCode).toBe(200)
        const second = await h.app.inject({ method: 'GET', url, headers: authHeaders(f.token) })
        expect(second.json()).toEqual(first.json())
      }
      expect(gateway.count('/book/info', key)).toBe(1)
      expect(gateway.count('/book/chapterinfo', key)).toBe(1)
      expect(gateway.count('/book/bestbookmarks', key)).toBe(1)
      expect(gateway.last()?.params).toMatchObject({ bookId: 'B1001', chapterUid: 2 })
    })

    it('progress 是实时数据：每次调用都出网（不缓存）', async () => {
      const key = nextKey()
      const f = await createBoundFamily(h.app, key)
      await h.app.inject({ method: 'GET', url: '/api/book/B1001/progress', headers: authHeaders(f.token) })
      await h.app.inject({ method: 'GET', url: '/api/book/B1001/progress', headers: authHeaders(f.token) })
      expect(gateway.count('/book/getprogress', key)).toBe(2)
    })

    it('非法参数返回 400（bookId 超长 / count 越界）', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const tooLong = 'x'.repeat(129)
      const res1 = await h.app.inject({
        method: 'GET',
        url: `/api/book/${encodeURIComponent(tooLong)}/info`,
        headers: authHeaders(f.token),
      })
      expect(res1.statusCode).toBe(400)
      const res2 = await h.app.inject({
        method: 'GET',
        url: '/api/book/recommend?count=0',
        headers: authHeaders(f.token),
      })
      expect(res2.statusCode).toBe(400)
    })
  })

  describe('GET /api/book/recommend', () => {
    it('童书白名单 + 家长屏蔽过滤，count 透传给上游', async () => {
      const key = nextKey()
      const f = await createBoundFamily(h.app, key)
      await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f.familyId}/shelf/B1001/blocked`,
        headers: authHeaders(f.token),
        payload: { kind: 'book', blocked: true },
      })
      const res = await h.app.inject({
        method: 'GET',
        url: '/api/book/recommend?count=6',
        headers: authHeaders(f.token),
      })
      expect(res.statusCode).toBe(200)
      const body = res.json()
      expect(body.rawCount).toBe(3)
      expect(body.books.map((b: { bookId: string }) => b.bookId)).toEqual(['R1'])
      expect(gateway.last()?.params).toMatchObject({ count: 6 })
    })
  })

  describe('家长屏蔽 API 与越权', () => {
    it('孩子角色 PUT 屏蔽返回 403', async () => {
      const f = await createBoundFamily(h.app, nextKey())
      const child = await joinFamily(h.app, f.familyCode, 'child')
      const res = await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f.familyId}/shelf/B1001/blocked`,
        headers: authHeaders(child.token),
        payload: { kind: 'book', blocked: true },
      })
      expect(res.statusCode).toBe(403)
    })

    it('跨家庭 token 操作他人家庭返回 403', async () => {
      const f1 = await createBoundFamily(h.app, nextKey())
      const f2 = await createFamilyAsParent(h.app, 'p2')
      const res = await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f2.familyId}/shelf/B1001/blocked`,
        headers: authHeaders(f1.token),
        payload: { kind: 'book', blocked: true },
      })
      expect(res.statusCode).toBe(403)
    })
  })

  describe('缓存键家庭隔离与重新绑定自愈', () => {
    it('两个家庭各自出网互不共享缓存，屏蔽列表互相独立', async () => {
      const keyA = nextKey()
      const keyB = nextKey()
      const f1 = await createBoundFamily(h.app, keyA)
      const f2 = await createBoundFamily(h.app, keyB)
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f1.token) })
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f1.token) })
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f2.token) })
      expect(gateway.count('/shelf/sync', keyA)).toBe(1)
      expect(gateway.count('/shelf/sync', keyB)).toBe(1)

      await h.app.inject({
        method: 'PUT',
        url: `/api/family/${f2.familyId}/shelf/B1001/blocked`,
        headers: authHeaders(f2.token),
        payload: { kind: 'book', blocked: true },
      })
      const v1 = await h.app.inject({
        method: 'GET',
        url: '/api/shelf?view=child',
        headers: authHeaders(f1.token),
      })
      expect(v1.json().books.map((b: { bookId: string }) => b.bookId)).toContain('B1001')
      const v2 = await h.app.inject({
        method: 'GET',
        url: '/api/shelf?view=child',
        headers: authHeaders(f2.token),
      })
      expect(v2.json().books.map((b: { bookId: string }) => b.bookId)).not.toContain('B1001')
    })

    it('重新绑定换 key 后：新 key 重新出网（缓存不串旧 key 数据）', async () => {
      const key1 = nextKey()
      const key2 = nextKey()
      const f = await createBoundFamily(h.app, key1)
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f.token) })
      expect(gateway.count('/shelf/sync', key1)).toBe(1)

      const rebind = await h.app.inject({
        method: 'POST',
        url: `/api/family/${f.familyId}/bind-weread`,
        headers: authHeaders(f.token),
        payload: { apiKey: key2 },
      })
      expect(rebind.statusCode).toBe(200)
      await h.app.inject({ method: 'GET', url: '/api/shelf', headers: authHeaders(f.token) })
      expect(gateway.count('/shelf/sync', key1)).toBe(1)
      expect(gateway.count('/shelf/sync', key2)).toBe(1)
    })
  })

  describe('出网限流（令牌桶耗尽 → 429 语义化中文）', () => {
    it('同一家庭连续 6 次实时调用，第 6 次起返回 429（冻结时钟，确定性）', async () => {
      // 独立 app + 冻结时钟：桶容量 5 且永不回补 → 恰好 5 次 200 后 429
      const local = await makeApp(probeOk, {
        wereadCall: gateway.factory,
        wereadNow: () => 1_000_000,
      })
      try {
        const f = await createBoundFamily(local.app, nextKey())
        const codes: number[] = []
        for (let i = 1; i <= 6; i++) {
          const res = await local.app.inject({
            method: 'GET',
            url: `/api/book/P${i}/progress`, // progress 不缓存，每次真实出网
            headers: authHeaders(f.token),
          })
          codes.push(res.statusCode)
        }
        expect(codes.slice(0, 5)).toEqual([200, 200, 200, 200, 200])
        expect(codes[5]).toBe(429)
        const body = (
          await local.app.inject({
            method: 'GET',
            url: '/api/book/P7/progress',
            headers: authHeaders(f.token),
          })
        ).json()
        expect(body.code).toBe('WEREAD_RATE_LIMITED')
        expect(body.message).toContain('频繁')
      } finally {
        await local.app.close()
        await local.db.$disconnect()
      }
    })
  })

  describe('网关错误映射', () => {
    it('mock 网关抛业务错误时路由返回 502 语义化提示（不泄露内部细节）', async () => {
      const boom = (_apiKey: string): WereadCall => async (apiName) => {
        if (apiName === '/shelf/sync') {
          throw new WereadApiError(42, '内部 errmsg 含敏感细节')
        }
        return fixtureFor(apiName) as never
      }
      const local = await makeApp(probeOk, { wereadCall: boom })
      try {
        const f = await createBoundFamily(local.app, nextKey())
        const res = await local.app.inject({
          method: 'GET',
          url: '/api/shelf',
          headers: authHeaders(f.token),
        })
        expect(res.statusCode).toBe(502)
        const body = res.json()
        expect(body.code).toBe('WEREAD_API')
        expect(body.message).not.toContain('敏感细节')
        expect(body.message).toContain('微信读书')
      } finally {
        await local.app.close()
        await local.db.$disconnect()
      }
    })
  })
})

describe('WereadServiceRegistry 单元', () => {
  it('同家庭复用同一服务实例；未绑定抛 NotBoundError；换 key 自愈重建', async () => {
    let currentKey: string | null = 'wrk-abc-0001'
    const registry = new WereadServiceRegistry({
      getKey: async () => currentKey,
      makeCall: () => (async () => ({})) as WereadCall,
    })
    const s1 = await registry.get('f1')
    const s2 = await registry.get('f1')
    expect(s1).toBe(s2)

    currentKey = null
    await expect(registry.get('f2')).rejects.toThrow(/绑定/)

    currentKey = 'wrk-abc-0002'
    const s3 = await registry.get('f1')
    expect(s3).not.toBe(s1) // key 变化 → 新实例（自愈重绑）

    registry.reset()
    const s4 = await registry.get('f1')
    expect(s4).not.toBe(s3) // reset 后重建（测试辅助）
  })
})
