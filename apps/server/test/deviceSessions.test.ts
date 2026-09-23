import { beforeAll, describe, expect, it } from 'vitest'
import { authHeaders, createFamilyAsParent, joinFamily, makeApp, type TestHarness } from './helper'

let h: TestHarness
let familyId: string
let parentToken: string
let childToken: string
let otherParentToken: string
let otherFamilyId: string

beforeAll(async () => {
  h = await makeApp()
  const family = await createFamilyAsParent(h.app, 'sessions-parent')
  familyId = family.familyId
  parentToken = family.token
  const child = await joinFamily(h.app, family.familyCode, 'child', 'kid-tablet')
  childToken = child.token
  const other = await createFamilyAsParent(h.app, 'other-parent')
  otherFamilyId = other.familyId
  otherParentToken = other.token
})

describe('设备会话列表（A1）', () => {
  it('家长可见全部会话并标记当前设备', async () => {
    const res = await h.app.inject({ method: 'GET', url: `/api/family/${familyId}/sessions`, headers: authHeaders(parentToken) })
    expect(res.statusCode).toBe(200)
    const sessions = res.json().sessions
    const parentSession = sessions.find((s: { current: boolean }) => s.current)
    const childSession = sessions.find((s: { role: string }) => s.role === 'child')
    expect(parentSession).toMatchObject({ role: 'parent', deviceId: 'sessions-parent', revokedAt: null })
    expect(childSession).toMatchObject({ role: 'child', deviceId: 'kid-tablet', current: false })
    expect(sessions.length).toBe(2)
  })

  it('孩子无权查看设备列表，外部家庭家长也不行', async () => {
    const asChild = await h.app.inject({ method: 'GET', url: `/api/family/${familyId}/sessions`, headers: authHeaders(childToken) })
    expect(asChild.statusCode).toBe(403)
    const asForeign = await h.app.inject({ method: 'GET', url: `/api/family/${familyId}/sessions`, headers: authHeaders(otherParentToken) })
    expect(asForeign.statusCode).toBe(403)
    expect(otherFamilyId).not.toBe(familyId)
  })

  it('撤销孩子会话后其令牌立即失效，列表显示已撤销', async () => {
    const list = await h.app.inject({ method: 'GET', url: `/api/family/${familyId}/sessions`, headers: authHeaders(parentToken) })
    const childSession = list.json().sessions.find((s: { role: string }) => s.role === 'child')
    const before = await h.app.inject({ method: 'GET', url: `/api/content/books`, headers: authHeaders(childToken) })
    expect(before.statusCode).toBe(200)
    const revoke = await h.app.inject({ method: 'POST', url: `/api/family/${familyId}/sessions/${childSession.id}/revoke`, headers: authHeaders(parentToken) })
    expect(revoke.statusCode).toBe(200)
    const after = await h.app.inject({ method: 'GET', url: `/api/content/books`, headers: authHeaders(childToken) })
    expect(after.statusCode).toBe(401)
    const list2 = await h.app.inject({ method: 'GET', url: `/api/family/${familyId}/sessions`, headers: authHeaders(parentToken) })
    const revoked = list2.json().sessions.find((s: { id: string }) => s.id === childSession.id)
    expect(revoked.revokedAt).not.toBeNull()
  })
})
