import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import {
  authHeaders,
  createChild,
  createFamilyAsParent,
  joinFamily,
  makeApp,
  tokenSecret,
  type TestHarness,
} from './helper'
import { signToken } from '../src/lib/auth'
import { wipeDb } from '../src/lib/db'

/**
 * 审计 T02/F01+F04 回归：
 *  - F01 家庭码不能直接取得家长身份——家长身份必须凭独立家长码，服务端决定角色；
 *  - F04 令牌可撤销——注销家庭/撤销会话后旧令牌立即失效。
 */

describe('家长身份与会话撤销（T02）', () => {
  let h: TestHarness
  let db: PrismaClient

  beforeAll(async () => {
    h = await makeApp()
    db = h.db
    await h.app.ready()
  })

  afterAll(async () => {
    await wipeDb(db)
    await h.app.close()
  })

  const sidOf = (token: string): string =>
    (JSON.parse(Buffer.from(token.split('.')[1]!, 'base64url').toString('utf8')) as { sid: string }).sid

  it('仅凭家庭码申请家长身份 → 403（AUTH-01 修复）', async () => {
    const parent = await createFamilyAsParent(h.app)
    const res = await h.app.inject({
      method: 'POST',
      url: '/api/family/join',
      payload: { familyCode: parent.familyCode, role: 'parent', deviceId: 'evil-device' },
    })
    expect(res.statusCode).toBe(403)
    expect(res.json().message).toContain('家长码')
  })

  it('家长码错误 → 403；正确 → 200 且角色为家长', async () => {
    const parent = await createFamilyAsParent(h.app)
    const wrong = await h.app.inject({
      method: 'POST',
      url: '/api/family/join',
      payload: { familyCode: parent.familyCode, role: 'parent', parentCode: 'WRONG99', deviceId: 'p2' },
    })
    expect(wrong.statusCode).toBe(403)

    const ok = await joinFamily(h.app, parent.familyCode, 'parent', 'parent-2', parent.parentCode)
    expect(ok.familyId).toBe(parent.familyId)
    expect((await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}/settings`,
      headers: authHeaders(ok.token),
    })).statusCode).toBe(200)
  })

  it('孩子加入响应不回显家长码（家庭码不等价家长凭据）', async () => {
    const parent = await createFamilyAsParent(h.app)
    const child = await joinFamily(h.app, parent.familyCode, 'child')
    expect(child).not.toHaveProperty('parentCode')
  })

  it('家长码可查看与轮换；轮换后旧家长码加入 → 403，新码可加入', async () => {
    const parent = await createFamilyAsParent(h.app)
    const view = await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}/parent-code`,
      headers: authHeaders(parent.token),
    })
    expect(view.statusCode).toBe(200)
    expect(view.json().parentCode).toBe(parent.parentCode)

    const rotated = await h.app.inject({
      method: 'POST',
      url: `/api/family/${parent.familyId}/parent-code/rotate`,
      headers: authHeaders(parent.token),
    })
    expect(rotated.statusCode).toBe(200)
    const newCode = rotated.json().parentCode as string
    expect(newCode).not.toBe(parent.parentCode)

    const oldJoin = await h.app.inject({
      method: 'POST',
      url: '/api/family/join',
      payload: { familyCode: parent.familyCode, role: 'parent', parentCode: parent.parentCode },
    })
    expect(oldJoin.statusCode).toBe(403)

    const newJoin = await joinFamily(h.app, parent.familyCode, 'parent', 'parent-3', newCode)
    expect(newJoin.token).toBeTruthy()
  })

  it('孩子令牌访问家长码端点 → 403', async () => {
    const parent = await createFamilyAsParent(h.app)
    const child = await joinFamily(h.app, parent.familyCode, 'child')
    const res = await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}/parent-code`,
      headers: authHeaders(child.token),
    })
    expect(res.statusCode).toBe(403)
  })

  it('注销家庭后旧令牌全部失效（AUTH-04 修复）', async () => {
    const parent = await createFamilyAsParent(h.app)
    const childId = await createChild(h.app, parent.token, parent.familyId, '注销娃', '6-8')
    const child = await joinFamily(h.app, parent.familyCode, 'child', 'kid-device')

    // 注销前令牌可用
    const before = await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}`,
      headers: authHeaders(child.token),
    })
    expect(before.statusCode).toBe(200)

    const del = await h.app.inject({
      method: 'DELETE',
      url: `/api/family/${parent.familyId}`,
      headers: authHeaders(parent.token),
    })
    expect(del.statusCode).toBe(204)

    // 注销后：家长与孩子令牌、伪造的合法签名令牌全部 401
    for (const token of [parent.token, child.token]) {
      const res = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
        headers: authHeaders(token),
      })
      expect(res.statusCode).toBe(401)
    }
    const childTokenAfter = signToken(
      { fid: parent.familyId, role: 'child', did: 'x', sid: sidOf(child.token) },
      tokenSecret,
    )
    const res = await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}`,
      headers: authHeaders(childTokenAfter),
    })
    expect(res.statusCode).toBe(401)
    expect(childId).toBeTruthy()
  })

  it('单设备撤销：撤销后该设备 401，家庭其他设备不受影响', async () => {
    const parent = await createFamilyAsParent(h.app)
    const kid = await joinFamily(h.app, parent.familyCode, 'child', 'kid-a')
    const kid2 = await joinFamily(h.app, parent.familyCode, 'child', 'kid-b')
    await createChild(h.app, parent.token, parent.familyId, '撤销娃', '6-8')

    const revoke = await h.app.inject({
      method: 'POST',
      url: `/api/family/${parent.familyId}/sessions/${sidOf(kid.token)}/revoke`,
      headers: authHeaders(parent.token),
    })
    expect(revoke.statusCode).toBe(200)

    const revoked = await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}`,
      headers: authHeaders(kid.token),
    })
    expect(revoked.statusCode).toBe(401)

    const sibling = await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}`,
      headers: authHeaders(kid2.token),
    })
    expect(sibling.statusCode).toBe(200)
  })

  it('家长不能撤销自己（防自锁）；伪造 sid 撤销 → 404', async () => {
    const parent = await createFamilyAsParent(h.app)
    const self = await h.app.inject({
      method: 'POST',
      url: `/api/family/${parent.familyId}/sessions/${sidOf(parent.token)}/revoke`,
      headers: authHeaders(parent.token),
    })
    expect(self.statusCode).toBe(400)

    const ghost = await h.app.inject({
      method: 'POST',
      url: `/api/family/${parent.familyId}/sessions/ses_nonexistent0000/revoke`,
      headers: authHeaders(parent.token),
    })
    expect(ghost.statusCode).toBe(404)
  })

  it('旧无 sid 令牌经完整路由 → 401（迁移前令牌不可用）', async () => {
    const parent = await createFamilyAsParent(h.app)
    // 合法签名但 payload 无 sid（模拟迁移前签发的存量令牌）
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
    const legacyPayload = Buffer.from(
      JSON.stringify({ fid: parent.familyId, role: 'parent', did: 'legacy', iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600 }),
    ).toString('base64url')
    const { createHmac } = await import('node:crypto')
    const sig = createHmac('sha256', tokenSecret).update(`${header}.${legacyPayload}`).digest('base64url')
    const res = await h.app.inject({
      method: 'GET',
      url: `/api/family/${parent.familyId}`,
      headers: authHeaders(`${header}.${legacyPayload}.${sig}`),
    })
    expect(res.statusCode).toBe(401)
  })
})
