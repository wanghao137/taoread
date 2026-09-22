import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import {
  authHeaders,
  createChild,
  createFamilyAsParent,
  joinFamily,
  makeApp,
  type TestHarness,
} from './helper'
import { seedPack } from '../src/content/seed'
import type { PackBook } from '../src/content/types'
import { wipeDb } from '../src/lib/db'

/**
 * 审计 T03 回归：
 *  - F02 屏蔽策略：屏蔽书对孩端所有读取路径统一 403（详情/目录/正文/进度/生词/共读/TTS），
 *    家长保留管理预览；解除屏蔽立即恢复（probe AUTH-02 场景转正测试）
 *  - F03 生成角色门：孩子触发生成 → 403（AUTH-03 修复）；家长生成走家庭命名空间
 *  - F06 信任代理：默认伪造 X-Forwarded-For 无效；开启后按转发头分桶
 */

const PACK: PackBook = {
  id: 'policy-book',
  title: '策略审计书',
  lang: 'zh',
  category: 'story',
  ageStage: '6-8',
  coverArt: 'policy',
  source: 'Synthetic policy fixture',
  rights: { workTitle: '策略审计书', basis: 'original', jurisdiction: 'CN' },
  chapters: [
    { title: '一章', blocks: [{ kind: 'text', text: '小明读书。' }] },
    { title: '二章', blocks: [{ kind: 'text', text: '小明跑步。' }] },
  ],
}

describe('屏蔽策略与生成角色门（T03）', () => {
  let h: TestHarness
  let db: PrismaClient
  let parentToken: string
  let childToken: string
  let familyId: string
  let childId: string

  beforeAll(async () => {
    h = await makeApp()
    db = h.db
    await h.app.ready()
    const parent = await createFamilyAsParent(h.app)
    parentToken = parent.token
    familyId = parent.familyId
    childId = await createChild(h.app, parentToken, familyId, '策略娃', '6-8')
    const child = await joinFamily(h.app, parent.familyCode, 'child')
    childToken = child.token
    await seedPack(db, PACK)
  })

  afterAll(async () => {
    await wipeDb(db)
    await h.app.close()
  })

  async function blockBook(blocked: boolean): Promise<void> {
    const res = await h.app.inject({
      method: 'PUT',
      url: '/api/content/books/policy-book/blocked',
      headers: authHeaders(parentToken),
      payload: { blocked },
    })
    expect(res.statusCode).toBe(200)
  }

  it('屏蔽前孩子可读正文', async () => {
    const res = await h.app.inject({
      method: 'GET',
      url: '/api/content/books/policy-book/chapters/1',
      headers: authHeaders(childToken),
    })
    expect(res.statusCode).toBe(200)
  })

  it('屏蔽后：孩子端 详情/目录/正文/进度/生词 全部 403（AUTH-02 修复）', async () => {
    await blockBook(true)
    const cases: Array<['GET', string]> = [
      ['GET', '/api/content/books/policy-book'],
      ['GET', '/api/content/books/policy-book/chapters'],
      ['GET', '/api/content/books/policy-book/chapters/1'],
    ]
    for (const [method, url] of cases) {
      const res = await h.app.inject({ method, url, headers: authHeaders(childToken) })
      expect(res.statusCode, url).toBe(403)
      expect(res.json().code, url).toBe('BOOK_BLOCKED')
    }
    const progress = await h.app.inject({
      method: 'POST',
      url: '/api/content/books/policy-book/progress',
      headers: authHeaders(childToken),
      payload: { childId, chapterOrder: 1, blockOrder: 0 },
    })
    expect(progress.statusCode).toBe(403)
    const word = await h.app.inject({
      method: 'POST',
      url: '/api/content/words',
      headers: authHeaders(childToken),
      payload: { childId, word: '测试', lang: 'zh', bookId: 'policy-book' },
    })
    expect(word.statusCode).toBe(403)
  })

  it('屏蔽后：家长管理预览详情/目录/正文可用；共读会话仍拒绝', async () => {
    for (const url of [
      '/api/content/books/policy-book',
      '/api/content/books/policy-book/chapters',
      '/api/content/books/policy-book/chapters/1',
    ]) {
      const res = await h.app.inject({ method: 'GET', url, headers: authHeaders(parentToken) })
      expect(res.statusCode, url).toBe(200)
    }
    const session = await h.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(childToken),
      payload: { childId, bookId: 'cbf:policy-book' },
    })
    expect(session.statusCode).toBe(403)
    const parentSession = await h.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(parentToken),
      payload: { childId, bookId: 'cbf:policy-book' },
    })
    expect(parentSession.statusCode).toBe(403)
  })

  it('屏蔽后：整章 TTS 同策略拒绝（孩子 403，不触达上游）', async () => {
    // 独立 app 注入假 TTS 依赖：屏蔽检查应先于上游调用
    const ttsApp = await makeApp(undefined, {
      ttsDeps: {
        base: 'https://tts.invalid',
        apiKey: 'policy-test',
        model: 'test',
        fetch: async () => {
          throw new Error('upstream must not be called')
        },
      } as never,
    })
    await ttsApp.app.ready()
    try {
      await seedPack(ttsApp.db, PACK)
      const p = await createFamilyAsParent(ttsApp.app)
      const kid = await createChild(ttsApp.app, p.token, p.familyId, 'TTS娃', '6-8')
      await ttsApp.app.inject({
        method: 'PUT',
        url: '/api/content/books/policy-book/blocked',
        headers: authHeaders(p.token),
        payload: { blocked: true },
      })
      const res = await ttsApp.app.inject({
        method: 'POST',
        url: '/api/tts/chapter/policy-book/1',
        headers: authHeaders(await childTokenOf(ttsApp, p, kid)),
        payload: {},
      })
      expect(res.statusCode).toBe(403)
    } finally {
      await ttsApp.app.close()
    }
  })

  it('解除屏蔽立即恢复孩子读取', async () => {
    await blockBook(false)
    const res = await h.app.inject({
      method: 'GET',
      url: '/api/content/books/policy-book/chapters/1',
      headers: authHeaders(childToken),
    })
    expect(res.statusCode).toBe(200)
  })

  it('生成角色门：孩子触发生图/视频 → 403（AUTH-03 修复）', async () => {
    const art = await h.app.inject({
      method: 'POST',
      url: '/api/art/generate',
      headers: authHeaders(childToken),
      payload: { kind: 'cover', scene: 'cover:evil', description: '测试画面', label: '测试' },
    })
    expect(art.statusCode).toBe(403)
    const video = await h.app.inject({
      method: 'POST',
      url: '/api/video/generate',
      headers: authHeaders(childToken),
      payload: { scene: 'chapter:evil:1', description: '测试画面' },
    })
    expect(video.statusCode).toBe(403)
  })

  it('家长生成进家庭命名空间：公共 scene 键不可经 API 写（imageDeps 缺失时先 503，角色已过门）', async () => {
    // 本 harness 无 imageDeps：过角色门后 503 IMAGE_UNAVAILABLE（证明角色门已通过）
    const res = await h.app.inject({
      method: 'POST',
      url: '/api/art/generate',
      headers: authHeaders(parentToken),
      payload: { kind: 'cover', scene: 'cover:policy-book', description: '测试画面', label: '测试' },
    })
    expect(res.statusCode).toBe(503)
    expect(res.json().code).toBe('IMAGE_UNAVAILABLE')
    // 公共键没有被写入
    const row = await db.artAsset.findUnique({ where: { scene: 'cover:policy-book' } })
    expect(row).toBeNull()
  })

  it('F06：默认不信任 X-Forwarded-For（伪造头不影响限流分桶）；开启后按转发头区分', async () => {
    // 默认（直连）：同 remoteAddress 伪造不同 XFF 仍在同一桶
    const direct = await makeApp(undefined, {
      ipLimiter: new (await import('../src/lib/ipRateLimit')).IpRateLimiter({ capacity: 1, refillPerMinute: 1 }),
    })
    await direct.app.ready()
    try {
      const create = (xff?: string) =>
        direct.app.inject({
          method: 'POST',
          url: '/api/family',
          payload: {},
          remoteAddress: '10.9.0.1',
          ...(xff ? { headers: { 'x-forwarded-for': xff } } : {}),
        })
      expect((await create('9.9.9.9')).statusCode).toBe(201)
      expect((await create('8.8.8.8')).statusCode).toBe(429) // 伪造头没有换桶
    } finally {
      await direct.app.close()
    }

    // trustProxy=true：XFF 参与分桶，不同客户端互不影响
    const proxied = await makeApp(undefined, {
      trustProxy: true,
      ipLimiter: new (await import('../src/lib/ipRateLimit')).IpRateLimiter({ capacity: 1, refillPerMinute: 1 }),
    })
    await proxied.app.ready()
    try {
      const create = (xff: string) =>
        proxied.app.inject({
          method: 'POST',
          url: '/api/family',
          payload: {},
          remoteAddress: '10.9.0.1',
          headers: { 'x-forwarded-for': xff },
        })
      expect((await create('7.7.7.7')).statusCode).toBe(201)
      expect((await create('6.6.6.6')).statusCode).toBe(201) // 可信代理下区分客户端
      expect((await create('7.7.7.7')).statusCode).toBe(429) // 同客户端限流
    } finally {
      await proxied.app.close()
    }
  })
})

/** 在独立 ttsApp 里建孩子并签发孩子令牌 */
async function childTokenOf(h: TestHarness, parent: { familyCode: string; familyId: string }, childId: string): Promise<string> {
  void childId
  const child = await joinFamily(h.app, parent.familyCode, 'child')
  return child.token
}
