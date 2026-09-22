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
import { MOODS } from '@taoread/shared'
import type { PackBook } from '../src/content/types'
import { wipeDb } from '../src/lib/db'

/**
 * 审计 T04/T06 第一批回归：
 *  - F12/DATA-01：completed 严格 boolean——字符串 "false" → 400，不再 coerce 成 true
 *  - F11/DATA（心情枚举）：@taoread/shared 为唯一事实源，全部心情（含好奇）可提交
 *  - F16：英文书整章 TTS 上游收到 lang=en，不再写死 zh
 */

const PACK: PackBook = {
  id: 'facts-book',
  title: '事实审计书',
  lang: 'en',
  category: 'story',
  ageStage: '6-8',
  coverArt: 'facts',
  source: 'Synthetic facts fixture',
  rights: { workTitle: '事实审计书', basis: 'original', jurisdiction: 'CN' },
  chapters: [{ title: 'One', blocks: [{ kind: 'text', text: 'A cat sat.' }] }],
}

describe('阅读事实与契约第一批（T04/T06）', () => {
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
    childId = await createChild(h.app, parentToken, familyId, '事实娃', '6-8')
    const child = await joinFamily(h.app, parent.familyCode, 'child')
    childToken = child.token
    await seedPack(db, PACK)
  })

  afterAll(async () => {
    await wipeDb(db)
    await h.app.close()
  })

  it('DATA-01：completed 传字符串 "false" → 400 拒绝（不再 coerce 成 true）', async () => {
    const res = await h.app.inject({
      method: 'POST',
      url: '/api/content/books/facts-book/progress',
      headers: authHeaders(childToken),
      payload: { childId, chapterOrder: 1, blockOrder: 0, completed: 'false' },
    })
    expect(res.statusCode).toBe(400)
    const row = await db.readingProgress.findFirst({ where: { childId, bookId: 'facts-book' } })
    expect(row?.finished ?? false).toBe(false)
  })

  it('F11：shared 全部心情（含好奇）都能收尾提交，非法心情仍 400', async () => {
    for (const mood of MOODS) {
      const session = await h.app.inject({
        method: 'POST',
        url: '/api/cosession',
        headers: authHeaders(childToken),
        payload: { childId, bookId: 'cbf:facts-book' },
      })
      expect(session.statusCode).toBe(201)
      const id = session.json().id as string
      const finish = await h.app.inject({
        method: 'POST',
        url: `/api/cosession/${id}/finish`,
        headers: authHeaders(childToken),
        payload: { progressMark: 'lot', mood },
      })
      expect(finish.statusCode, mood).toBe(200)
      expect(finish.json().mood, mood).toBe(mood)
    }
    const bad = await h.app.inject({
      method: 'POST',
      url: '/api/cosession',
      headers: authHeaders(childToken),
      payload: { childId, bookId: 'cbf:facts-book' },
    })
    const badFinish = await h.app.inject({
      method: 'POST',
      url: `/api/cosession/${bad.json().id as string}/finish`,
      headers: authHeaders(childToken),
      payload: { progressMark: 'lot', mood: 'angry' },
    })
    expect(badFinish.statusCode).toBe(400)
  })

  it('F16：英文书整章 TTS 上游收到英文指令与英文入缓存键（F16/T06）', async () => {
    const captured: string[] = []
    const ttsApp = await makeApp(undefined, {
      ttsDeps: {
        base: 'https://tts.invalid',
        apiKey: 'facts-test',
        model: 'test',
        fetch: (async (_input: unknown, init?: { body?: string }) => {
          const body = JSON.parse(init?.body ?? '{}') as { instruction?: string }
          captured.push(body.instruction ?? 'missing')
          return new Response('{"audio":"AA=="}', { status: 200 })
        }) as unknown as typeof fetch,
      },
    })
    await ttsApp.app.ready()
    try {
      await seedPack(ttsApp.db, PACK)
      const res = await ttsApp.app.inject({
        method: 'POST',
        url: '/api/tts/chapter/facts-book/1',
        headers: authHeaders(childToken),
        payload: {},
      })
      expect(res.statusCode).toBe(200)
      expect(captured.length).toBeGreaterThanOrEqual(1)
      // 英文书：instruction 必须是英文朗读指令（lang=en 已生效，不再写死 zh）
      expect(captured.every((s) => s.includes('natural English'))).toBe(true)
    } finally {
      await ttsApp.app.close()
    }
  })
})
