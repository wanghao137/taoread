import { beforeAll, describe, expect, it } from 'vitest'
import { authHeaders, createChild, createFamilyAsParent, joinFamily, makeApp, type TestHarness } from './helper'

let h: TestHarness
let parent: Awaited<ReturnType<typeof createFamilyAsParent>>
let other: Awaited<ReturnType<typeof createFamilyAsParent>>
let childToken: string
let childId: string
let youngerId: string
let bookId: string

beforeAll(async () => {
  h = await makeApp()
  parent = await createFamilyAsParent(h.app, 'private-book-owner')
  other = await createFamilyAsParent(h.app, 'private-book-other')
  childId = await createChild(h.app, parent.token, parent.familyId, '读者', '6-8')
  youngerId = await createChild(h.app, parent.token, parent.familyId, '小读者', '3-5')
  childToken = (await joinFamily(h.app, parent.familyCode, 'child', 'book-child')).token
})

const novel = { title: '家庭故事', lang: 'zh', ageStage: '6-8', sourceName: 'novel.txt', rightsConfirmed: true, text: '第一章 早晨\n花开了。\n第二章 傍晚\n星星亮了。' }
const call = (method: 'GET' | 'POST' | 'DELETE' | 'PUT', url: string, token: string, payload?: unknown) => h.app.inject({ method, url, headers: authHeaders(token), ...(payload ? { payload } : {}) })

describe('家庭私有导入', () => {
  it('只允许家长导入，去重并限制使用权和体积', async () => {
    expect((await call('POST', '/api/content/imports', childToken, novel)).statusCode).toBe(403)
    expect((await call('POST', '/api/content/imports', parent.token, { ...novel, rightsConfirmed: false })).statusCode).toBe(400)
    expect((await call('POST', '/api/content/imports', parent.token, { ...novel, text: 'A'.repeat(4 * 1024 * 1024 + 1) })).statusCode).toBe(400)
    const created = await call('POST', '/api/content/imports', parent.token, novel)
    expect(created.statusCode).toBe(201)
    bookId = created.json().id
    expect(created.json().chapterCount).toBe(2)
    const repeated = await call('POST', '/api/content/imports', parent.token, novel)
    expect(repeated.statusCode).toBe(200)
    expect(repeated.json()).toMatchObject({ id: bookId, duplicate: true })
  })
  it('按家庭与孩子年龄隔离正文，家长保留管理视图', async () => {
    const books = await call('GET', `/api/content/imports?childId=${childId}`, childToken)
    expect(books.json().books.map((book: { id: string }) => book.id)).toContain(bookId)
    expect((await call('GET', `/api/content/imports?childId=${youngerId}`, childToken)).json().books).toHaveLength(0)
    expect((await call('GET', '/api/content/imports', childToken)).statusCode).toBe(400)
    expect((await call('GET', `/api/content/imports/${encodeURIComponent(bookId)}?childId=${youngerId}`, childToken)).statusCode).toBe(404)
    expect((await call('GET', `/api/content/imports/${encodeURIComponent(bookId)}/chapters/1?childId=${childId}`, childToken)).json().chapter.text).toContain('花开了')
    expect((await call('GET', `/api/content/imports/${encodeURIComponent(bookId)}/chapters/1?childId=${childId}`, other.token)).statusCode).toBe(404)
    expect((await call('GET', `/api/content/imports/${encodeURIComponent(bookId)}/chapters/1?childId=${youngerId}`, childToken)).statusCode).toBe(404)
    expect((await call('DELETE', `/api/content/imports/${encodeURIComponent(bookId)}`, childToken)).statusCode).toBe(403)
    expect((await call('GET', '/api/content/imports', parent.token)).json().books).toHaveLength(1)
  })
  it('阅读进度按孩子与家庭隔离且可续读', async () => {
    const path = `/api/content/imports/${encodeURIComponent(bookId)}/progress?childId=${childId}`
    expect((await call('GET', path, childToken)).json().progress).toBeNull()
    expect((await call('PUT', path, childToken, { order: 1, offset: 3, completed: false })).statusCode).toBe(200)
    expect((await call('GET', path, parent.token)).json().progress).toMatchObject({ order: 1, offset: 3, completed: false })
    expect((await call('GET', path, other.token)).statusCode).toBe(404)
    expect((await call('PUT', path, childToken, { order: 100, offset: 0, completed: false })).statusCode).toBe(400)
    expect((await call('GET', `/api/content/imports/${encodeURIComponent(bookId)}/progress?childId=${youngerId}`, childToken)).statusCode).toBe(404)
  })
  it('删除后章节级联消失', async () => {
    expect((await call('DELETE', `/api/content/imports/${encodeURIComponent(bookId)}`, parent.token)).statusCode).toBe(204)
    expect((await call('GET', `/api/content/imports/${encodeURIComponent(bookId)}/chapters/1?childId=${childId}`, childToken)).statusCode).toBe(404)
  })
})

describe('自然拼读草稿试点', () => {
  it('默认关闭、家长开启、跨家庭不能操作、答案不在目录中', async () => {
    const catalog = await call('GET', '/api/phonics/catalog', childToken)
    expect(catalog.statusCode).toBe(200)
    expect(JSON.stringify(catalog.json())).not.toContain('"answer"')
    expect((await call('GET', '/api/phonics/readers', childToken)).json().readers).toHaveLength(6)
    expect((await call('POST', `/api/children/${childId}/phonics/attempts`, childToken, { lessonId: 'draft-en-l01', clientAttemptId: crypto.randomUUID() })).statusCode).toBe(403)
    expect((await call('PUT', `/api/children/${childId}/phonics/enrollment`, childToken, { enabled: true })).statusCode).toBe(403)
    expect((await call('PUT', `/api/children/${childId}/phonics/enrollment`, other.token, { enabled: true })).statusCode).toBe(404)
    expect((await call('PUT', `/api/children/${childId}/phonics/enrollment`, parent.token, { enabled: true })).statusCode).toBe(200)
  })
  it('作答重试幂等、越权与结束状态受控', async () => {
    const key = crypto.randomUUID()
    const url = `/api/children/${childId}/phonics/attempts`
    const attempt = await call('POST', url, childToken, { lessonId: 'draft-en-l01', clientAttemptId: key })
    expect(attempt.statusCode).toBe(200)
    const id = attempt.json().attempt.id
    expect((await call('POST', url, childToken, { lessonId: 'draft-en-l01', clientAttemptId: key })).json().attempt.id).toBe(id)
    expect((await call('POST', `/api/phonics/attempts/${id}/responses`, other.token, { itemId: 'l01-s-find', answerId: 's' })).statusCode).toBe(404)
    const responseUrl = `/api/phonics/attempts/${id}/responses`
    expect((await call('POST', responseUrl, childToken, { itemId: 'l01-s-find', answerId: 's' })).json().correct).toBe(true)
    expect((await call('POST', responseUrl, childToken, { itemId: 'l01-s-find', answerId: 's' })).json().repeated).toBe(true)
    expect((await call('POST', responseUrl, childToken, { itemId: 'l01-s-find', answerId: 'a' })).statusCode).toBe(409)
    expect((await call('POST', `/api/phonics/attempts/${id}/finish`, childToken, { status: 'completed' })).statusCode).toBe(200)
    expect((await call('POST', responseUrl, childToken, { itemId: 'l01-a-find', answerId: 'a' })).statusCode).toBe(409)
  })
})


