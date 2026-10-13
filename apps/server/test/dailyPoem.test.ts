import { afterAll, beforeAll, expect, it } from 'vitest'
import { makeApp, createChild, createFamilyAsParent, authHeaders, type TestHarness } from './helper'
import { ALL_PACKS } from '../src/content/packs'
import { dailyPoem, shanghaiDay } from '../src/content/dailyPoem'
import { DAILY_POEM_POOL } from '../src/content/daily-poem-pool'
let h: TestHarness, familyId: string, token: string, childId: string
beforeAll(async () => {
  h = await makeApp()
  const parent = await createFamilyAsParent(h.app, 'daily-poem-test')
  familyId = parent.familyId; token = parent.token
  childId = await createChild(h.app, token, familyId)
  for (const id of new Set(DAILY_POEM_POOL.map(e => e.bookId))) {
    const pack = ALL_PACKS.find(p => p.id === id)!
    // A few sparse chapters preserve their real chapter positions without seeding 1,365 poems.
    await h.db.book.upsert({ where: { id }, create: { id, title: pack.title, lang: 'zh', category: 'poetry', ageStage: pack.ageStage, coverArt: pack.coverArt, source: pack.source }, update: { publicationStatus: 'published' } })
    for (const entry of DAILY_POEM_POOL.filter(e => e.bookId === id)) {
      const chapter = pack.chapters[entry.order - 1]!
      const row = await h.db.chapter.upsert({ where: { bookId_order: { bookId: id, order: entry.order } }, create: { bookId: id, order: entry.order, title: chapter.title }, update: { title: chapter.title } })
      for (const [i, b] of chapter.blocks.entries()) await h.db.block.upsert({ where: { chapterId_order: { chapterId: row.id, order: i + 1 } }, create: { chapterId: row.id, order: i + 1, kind: b.kind, text: b.text, pinyin: b.pinyin, translation: b.translation }, update: { kind: b.kind, text: b.text, pinyin: b.pinyin ?? null, translation: b.translation ?? null } })
    }
  }
}, 60_000)
afterAll(async () => { await h.app.close(); await h.db.$disconnect() })
it('uses Shanghai midnight, stays stable, rotates, and chooses stage appropriate chapters', async () => {
  expect(shanghaiDay(new Date('2026-10-12T15:59:59Z'))).toBe('2026-10-12')
  expect(shanghaiDay(new Date('2026-10-12T16:00:00Z'))).toBe('2026-10-13')
  const a = await dailyPoem(h.db, familyId, '3-5', new Date('2026-10-12T05:00:00Z'))
  expect(a).toEqual(await dailyPoem(h.db, familyId, '3-5', new Date('2026-10-12T15:59:59Z')))
  expect(a.poem).not.toBeNull()
  expect(DAILY_POEM_POOL.find(e => e.bookId === a.poem?.bookId && e.order === a.poem?.chapterOrder)?.minStage).toBe('3-5')
  expect((await dailyPoem(h.db, familyId, '3-5', new Date('2026-10-12T16:00:00Z'))).poem).not.toEqual(a.poem)
})
it('requires authentication and a child owned by the requesting family', async () => {
  expect((await h.app.inject({ method: 'GET', url: `/api/content/daily-poem?childId=${childId}` })).statusCode).toBe(401)
  expect((await h.app.inject({ method: 'GET', url: '/api/content/daily-poem', headers: authHeaders(token) })).statusCode).toBe(400)
  const other = await createFamilyAsParent(h.app, 'daily-poem-other')
  expect((await h.app.inject({ method: 'GET', url: `/api/content/daily-poem?childId=${childId}`, headers: authHeaders(other.token) })).statusCode).toBe(404)
  const res = await h.app.inject({ method: 'GET', url: `/api/content/daily-poem?childId=${childId}`, headers: authHeaders(token) })
  expect(res.statusCode).toBe(200)
  expect(res.headers['cache-control']).toBe('private, no-store')
})
it('excludes blocked, unpublished, and altered editions, returning null when no safe poem remains', async () => {
  const ids = [...new Set(DAILY_POEM_POOL.map(e => e.bookId))]
  for (const id of ids) await h.db.shelfSnapshot.upsert({ where: { familyId_bookId_kind: { familyId, bookId: id, kind: 'cbf' } }, create: { familyId, bookId: id, kind: 'cbf', title: 'test', blocked: true }, update: { blocked: true } })
  expect((await dailyPoem(h.db, familyId, '9-12')).poem).toBeNull()
  await h.db.shelfSnapshot.deleteMany({ where: { familyId, kind: 'cbf' } })
  await h.db.book.updateMany({ where: { id: { in: ids } }, data: { publicationStatus: 'draft' } })
  expect((await dailyPoem(h.db, familyId, '9-12')).poem).toBeNull()
  await h.db.book.updateMany({ where: { id: { in: ids } }, data: { publicationStatus: 'published' } })
  await h.db.block.updateMany({ where: { chapter: { bookId: { in: ids } }, kind: 'poem' }, data: { translation: 'changed edition' } })
  expect((await dailyPoem(h.db, familyId, '9-12')).poem).toBeNull()
  // Restore only the sparse chapters this test changed, rather than reseeding
  // 1,365 poems at the end of a quota/availability test.
  for (const entry of DAILY_POEM_POOL) {
    const pack = ALL_PACKS.find(p => p.id === entry.bookId)!
    for (const [i, block] of pack.chapters[entry.order - 1]!.blocks.entries()) {
      await h.db.block.updateMany({ where: { chapter: { bookId: entry.bookId, order: entry.order }, order: i + 1 }, data: { translation: block.translation ?? null } })
    }
  }
}, 60_000)
