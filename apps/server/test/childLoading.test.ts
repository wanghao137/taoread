import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { authHeaders, createChild, createFamilyAsParent, joinFamily, makeApp, type TestHarness } from './helper'
import { seedAllPacks } from '../src/content/seed'
import { ALL_PACKS } from '../src/content/packs'
import { homeSelection } from '../src/content/homeSelection'
import { listBooks } from '../src/content/service'

let h: TestHarness
let parent: Awaited<ReturnType<typeof createFamilyAsParent>>
let childId: string
let childToken: string
let foreign: Awaited<ReturnType<typeof createFamilyAsParent>>
beforeAll(async () => {
  h = await makeApp()
  await seedAllPacks(h.db, ALL_PACKS.slice(0, 8))
  parent = await createFamilyAsParent(h.app, 'loading-owner')
  foreign = await createFamilyAsParent(h.app, 'loading-foreign')
  childId = await createChild(h.app, parent.token, parent.familyId, '测试读者', '3-5')
  childToken = (await joinFamily(h.app, parent.familyCode, 'child')).token
}, 120_000)
afterAll(async () => { await h?.app.close(); await h?.db.$disconnect() })
const get = (url: string, token = childToken) => h.app.inject({ method: 'GET', url, headers: authHeaders(token) })

describe('bounded child loading and adversarial access', () => {
  it('home transfers only selected books; progress, favorite and block changes are fresh', async () => {
    const all = await listBooks(h.db, { familyId: parent.familyId, childId })
    expect(all.length).toBeGreaterThan(4)
    const a = all[0]!, b = all[1]!
    await h.db.readingProgress.create({ data: { childId, bookId: a.id, chapterOrder: 1, blockOrder: 0 } })
    await h.db.bookFavorite.create({ data: { childId, bookId: b.id } })
    const res = await get(`/api/content/home?childId=${childId}`)
    expect(res.statusCode).toBe(200)
    expect(res.headers['cache-control']).toBe('private, no-store')
    expect(res.headers['server-timing']).toMatch(/identity;dur=.*shelf;dur=.*total;dur=/)
    expect(res.headers['x-request-id']).toBeTruthy()
    const body = res.json()
    const expected = homeSelection(await listBooks(h.db, { familyId: parent.familyId, childId }), '3-5')
    expect(body.continueId).toBe(a.id)
    expect(body.pickIds).toEqual(expected.pickIds)
    expect(body.books.length).toBeLessThanOrEqual(4)
    expect(Buffer.byteLength(res.body)).toBeLessThan(40_000)
    await h.db.shelfSnapshot.create({ data: { familyId: parent.familyId, bookId: a.id, title: a.title, kind: 'cbf', blocked: true } })
    const blocked = (await get(`/api/content/home?childId=${childId}`)).json()
    expect(blocked.books.map((x: { id: string }) => x.id)).not.toContain(a.id)
    expect(blocked.continueId).not.toBe(a.id)
    await h.db.shelfSnapshot.deleteMany({ where: { familyId: parent.familyId, bookId: a.id } })
  })

  it('paginated books preserve complete filtered order with no duplicates and old contract', async () => {
    const base = `/api/content/books?childId=${childId}`
    const old = (await get(base)).json()
    expect(old.nextCursor).toBeUndefined()
    const ids: string[] = []
    let cursor: string | null = null
    do {
      const res = await get(`${base}&limit=2${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`)
      expect(res.statusCode).toBe(200)
      expect(res.headers['cache-control']).toBe('private, no-store')
      const page = res.json()
      expect(page.books.length).toBeLessThanOrEqual(2)
      expect(page.total).toBe(old.total)
      ids.push(...page.books.map((b: { id: string }) => b.id))
      cursor = page.nextCursor
    } while (cursor && ids.length < 30)
    expect(ids).toEqual(old.books.map((b: { id: string }) => b.id))
    expect(new Set(ids).size).toBe(ids.length)
    for (const query of ['lang=en', 'q=不存在zz', 'mood=calm']) {
      const full = (await get(`${base}&${query}`)).json()
      const first = (await get(`${base}&${query}&limit=2`)).json()
      expect(first.total).toBe(full.total)
      expect(first.books.map((b: { id: string }) => b.id)).toEqual(full.books.slice(0, 2).map((b: { id: string }) => b.id))
    }
    const anchor = ids[0]!
    await h.db.shelfSnapshot.create({ data: { familyId: parent.familyId, bookId: anchor, title: '屏蔽测试', kind: 'cbf', blocked: true } })
    expect((await get(`${base}&limit=2&cursor=${anchor}`)).statusCode).toBe(409)
    await h.db.shelfSnapshot.deleteMany({ where: { familyId: parent.familyId, bookId: anchor } })
  })

  it('import keysets handle equal timestamps and never accept another family cursor', async () => {
    const date = new Date('2026-10-01T00:00:00Z')
    for (let i = 0; i < 5; i++) await h.db.importedBook.create({ data: { id: `${childId}-import-${i}`, familyId: parent.familyId, title: `家庭书${i}`, lang: 'zh', ageStage: '3-5', sourceName: 'fixture.txt', sha256: `loading-${i}`, createdAt: date, chapters: { create: { order: 1, title: '章', text: '正文' } } } })
    const foreignId = `${foreign.familyId}-import`
    await h.db.importedBook.create({ data: { id: foreignId, familyId: foreign.familyId, title: '别家书', lang: 'zh', ageStage: '3-5', sourceName: 'fixture.txt', sha256: 'foreign' } })
    const base = `/api/content/imports?childId=${childId}`
    const full = (await get(base)).json().books
    const ids: string[] = []
    let cursor: string | null = null
    do {
      const res = await get(`${base}&limit=2${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`)
      expect(res.statusCode).toBe(200)
      const page = res.json()
      expect(page.total).toBe(5)
      expect(page.books.every((b: { chapterCount: number }) => b.chapterCount === 1)).toBe(true)
      ids.push(...page.books.map((b: { id: string }) => b.id)); cursor = page.nextCursor
    } while (cursor && ids.length < 20)
    expect(ids).toEqual(full.map((b: { id: string }) => b.id))
    expect(new Set(ids).size).toBe(5)
    expect((await get(`${base}&limit=2&cursor=${foreignId}`)).statusCode).toBe(409)
  })

  it('requires a selected owned child and validates all pagination parameters', async () => {
    for (const path of ['/api/content/home', '/api/content/books?limit=2', '/api/content/imports?limit=2']) expect((await get(path)).statusCode).toBe(400)
    for (const path of ['/api/content/home', '/api/content/books', '/api/content/imports']) {
      expect((await get(`${path}?childId=${childId}`, foreign.token)).statusCode).toBe(404)
      expect((await h.app.inject({ method: 'GET', url: `${path}?childId=${childId}` })).statusCode).toBe(401)
    }
    for (const query of ['limit=0', 'limit=49', 'limit=2.5', 'cursor=abc']) for (const path of ['books', 'imports']) expect((await get(`/api/content/${path}?childId=${childId}&${query}`)).statusCode).toBe(400)
    expect((await get(`/api/content/books?childId=${childId}&mood=invalid`)).statusCode).toBe(400)
  })

  it('preflight caches permission only; an invalid bearer remains unauthorized', async () => {
    const res = await h.app.inject({ method: 'OPTIONS', url: '/api/content/home', headers: { origin: 'https://localhost', 'access-control-request-method': 'GET', 'access-control-request-headers': 'authorization,content-type' } })
    expect(res.statusCode).toBe(204)
    expect(res.headers['access-control-allow-origin']).toBe('https://localhost')
    expect(res.headers['access-control-max-age']).toBe('600')
    expect(res.headers.vary).toContain('Origin')
    expect(res.headers['access-control-allow-headers']).toContain('authorization')
    expect((await get(`/api/content/home?childId=${childId}`, 'invalid-bearer')).statusCode).toBe(401)
  })
})
