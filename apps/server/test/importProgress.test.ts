import { beforeAll, describe, expect, it } from 'vitest'
import { authHeaders, createChild, createFamilyAsParent, makeApp, type TestHarness } from './helper'

let h: TestHarness
let token: string
let childId: string
let bookId: string

const TWO_CHAPTERS = ['第一章', 'first chapter body text here', '第二章', 'second chapter body text here'].join('\n')

async function putProgress(body: Record<string, unknown>) {
  return h.app.inject({
    method: 'PUT',
    url: `/api/content/imports/${encodeURIComponent(bookId)}/progress?childId=${encodeURIComponent(childId)}`,
    headers: authHeaders(token),
    payload: body,
  })
}

beforeAll(async () => {
  h = await makeApp()
  const family = await createFamilyAsParent(h.app, 'import-progress-owner')
  token = family.token
  childId = await createChild(h.app, token, family.familyId, '进度读者', '6-8')
  const created = await h.app.inject({
    method: 'POST',
    url: '/api/content/imports',
    headers: authHeaders(token),
    payload: { title: '两章家庭书', lang: 'zh', ageStage: '6-8', sourceName: 'two.txt', text: TWO_CHAPTERS, rightsConfirmed: true },
  })
  expect(created.statusCode).toBe(201)
  bookId = created.json().id
})

describe('家庭导入进度契约（B3）', () => {
  it('非末章不允许标记读完', async () => {
    const res = await putProgress({ order: 1, offset: 0, completed: true })
    expect(res.statusCode).toBe(400)
  })

  it('末章可标记读完，非末章写入 completed=false 被拒绝', async () => {
    const finish = await putProgress({ order: 2, offset: 3, completed: true })
    expect(finish.statusCode).toBe(200)
    expect(finish.json().progress).toMatchObject({ order: 2, completed: true })
    const reopen = await putProgress({ order: 1, offset: 0, completed: false })
    expect(reopen.statusCode).toBe(200)
    expect(reopen.json().progress).toMatchObject({ order: 1, completed: true })
  })

  it('完成态不回退：回看前章保持已读完', async () => {
    const saved = await putProgress({ order: 1, offset: 5, completed: false })
    expect(saved.statusCode).toBe(200)
    expect(saved.json().progress).toMatchObject({ order: 1, offset: 5, completed: true })
  })

  it('陈旧写入且光标倒退返回 409 并携带服务器进度（双设备乱序保护）', async () => {
    const res = await putProgress({ order: 1, offset: 2, completed: false, baseUpdatedAt: '2020-01-01T00:00:00.000Z' })
    expect(res.statusCode).toBe(409)
    expect(res.json().code).toBe('PROGRESS_STALE')
    expect(res.json().progress).toMatchObject({ order: 1, offset: 5, completed: true })
  })

  it('带最新 baseUpdatedAt 的回看写入放行（光标可以后退）', async () => {
    const latest = await putProgress({ order: 1, offset: 7, completed: false })
    expect(latest.statusCode).toBe(200)
    const base = latest.json().progress.updatedAt
    const reopen = await putProgress({ order: 1, offset: 2, completed: false, baseUpdatedAt: base })
    expect(reopen.statusCode).toBe(200)
    expect(reopen.json().progress).toMatchObject({ order: 1, offset: 2, completed: true })
  })

  it('offset 超出章节长度拒绝', async () => {
    const res = await putProgress({ order: 1, offset: 999_999, completed: false })
    expect(res.statusCode).toBe(400)
  })
})
