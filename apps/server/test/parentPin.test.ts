import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { authHeaders, createFamilyAsParent, joinFamily, makeApp, TEST_PARENT_PIN, tokenSecret, type TestHarness } from './helper'
import { hashParentPin, matchesParentPin, recoverParentPin } from '../src/lib/parentPin'
import { signToken, verifyToken } from '../src/lib/auth'

describe('独立家长 PIN 对抗回归', () => {
  let h: TestHarness
  beforeAll(async () => { h = await makeApp() })
  afterAll(async () => { await h.app.close(); await h.db.$disconnect() })

  it('创建必须提供合格 PIN；数据库仅存随机盐哈希，响应及导出不含凭据', async () => {
    for (const parentPin of [undefined, '12345', '1234567890123', 'abcdef']) {
      const res = await h.app.inject({ method: 'POST', url: '/api/family', payload: { agreeVersion: 'pin-test', parentPin } })
      expect(res.statusCode).toBe(400)
    }
    const a = await createFamilyAsParent(h.app)
    const b = await createFamilyAsParent(h.app)
    const fa = await h.db.family.findUniqueOrThrow({ where: { id: a.familyId } })
    const fb = await h.db.family.findUniqueOrThrow({ where: { id: b.familyId } })
    expect(fa.parentPinHash).not.toContain(TEST_PARENT_PIN)
    expect(fa.parentPinHash).not.toBe(fb.parentPinHash)
    expect(await matchesParentPin(TEST_PARENT_PIN, fa.parentPinHash!, tokenSecret)).toBe(true)
    expect(await matchesParentPin(TEST_PARENT_PIN, fa.parentPinHash!, Buffer.alloc(32))).toBe(false)
    expect(Object.keys(a).sort()).toEqual(['familyCode', 'familyId', 'token'])
    for (const suffix of ['', '/export']) {
      const res = await h.app.inject({ method: 'GET', url: `/api/family/${a.familyId}${suffix}`, headers: authHeaders(a.token) })
      expect(res.statusCode).toBe(200)
      expect(res.body).not.toContain(fa.parentPinHash)
      expect(res.body).not.toContain('parentPinHash')
    }
  })

  it('篡改 role、复用家庭码或旧 parentCode 均不能取得家长令牌，孩子仍可正常加入', async () => {
    const f = await createFamilyAsParent(h.app)
    for (const extra of [{}, { parentCode: TEST_PARENT_PIN }, { parentPin: f.familyCode }, { parentPin: '000000' }]) {
      const res = await h.app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: f.familyCode, role: 'parent', ...extra } })
      expect(res.statusCode).toBe(403)
      expect(res.json().token).toBeUndefined()
    }
    const child = await joinFamily(h.app, f.familyCode, 'child')
    const parent = await joinFamily(h.app, f.familyCode, 'parent')
    const denied = await h.app.inject({ method: 'GET', url: `/api/family/${f.familyId}/sessions`, headers: authHeaders(child.token) })
    expect(denied.statusCode).toBe(403)
    expect((await h.app.inject({ method: 'GET', url: `/api/family/${f.familyId}/sessions`, headers: authHeaders(parent.token) })).statusCode).toBe(200)
  })

  it('并发尝试最多五次进入验证，换 IP 和重启应用不能绕过；超时后允许重新验证', async () => {
    const f = await createFamilyAsParent(h.app)
    const attempts = await Promise.all(Array.from({ length: 10 }, (_, i) => h.app.inject({
      method: 'POST', url: '/api/family/join', remoteAddress: `10.10.0.${i + 1}`,
      payload: { familyCode: f.familyCode, role: 'parent', parentPin: '000000' },
    })))
    expect(attempts.filter(r => r.statusCode === 403)).toHaveLength(5)
    expect(attempts.filter(r => r.statusCode === 429)).toHaveLength(5)
    const another = await makeApp()
    try {
      const blocked = await another.app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: f.familyCode, role: 'parent', parentPin: TEST_PARENT_PIN } })
      expect(blocked.statusCode).toBe(429)
      expect(blocked.json().code).toBe('PARENT_PIN_RATE_LIMIT')
      expect((await joinFamily(another.app, f.familyCode, 'child')).token).toBeTruthy()
      await h.db.family.update({ where: { id: f.familyId }, data: { parentPinWindowStart: new Date(Date.now() - 16 * 60_000) } })
      expect((await joinFamily(another.app, f.familyCode, 'parent')).token).toBeTruthy()
    } finally { await another.app.close(); await another.db.$disconnect() }
  })

  it('错误 PIN 不创建或挤掉设备；孩子即使刷满额度也不能挤掉家长', async () => {
    const f = await createFamilyAsParent(h.app)
    const before = await h.db.deviceSession.count({ where: { familyId: f.familyId } })
    await h.app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: f.familyCode, role: 'parent', parentPin: '000000' } })
    expect(await h.db.deviceSession.count({ where: { familyId: f.familyId } })).toBe(before)
    // 满额且全为家长时，持家庭码的孩子必须被限流，不能撤销管理设备。
    await h.db.deviceSession.createMany({ data: Array.from({ length: 19 }, (_, i) => ({ id: `pin-cap-${f.familyId}-${i}`, familyId: f.familyId, role: 'parent' })) })
    const denied = await h.app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: f.familyCode, role: 'child' } })
    expect(denied.statusCode).toBe(429)
    expect(await h.db.deviceSession.count({ where: { familyId: f.familyId, revokedAt: { not: null } } })).toBe(0)
  })

  it('改 PIN 要校验原 PIN；孩子、其他家庭或错误原 PIN 均不能更改', async () => {
    const f = await createFamilyAsParent(h.app)
    const child = await joinFamily(h.app, f.familyCode, 'child')
    const foreign = await createFamilyAsParent(h.app)
    for (const [token, currentPin] of [[child.token, TEST_PARENT_PIN], [foreign.token, TEST_PARENT_PIN], [f.token, '000000']]) {
      const res = await h.app.inject({ method: 'PUT', url: `/api/family/${f.familyId}/parent-pin`, headers: authHeaders(token!), payload: { currentPin, newPin: '730862' } })
      expect(res.statusCode).toBe(403)
    }
    expect((await joinFamily(h.app, f.familyCode, 'parent')).token).toBeTruthy()
  })

  it('改 PIN 后旧家长令牌在所有实例立即失效，本机新令牌和孩子继续使用', async () => {
    const f = await createFamilyAsParent(h.app)
    const parent2 = await joinFamily(h.app, f.familyCode, 'parent')
    const child = await joinFamily(h.app, f.familyCode, 'child')
    const another = await makeApp()
    const view = (token: string) => another.app.inject({ method: 'GET', url: `/api/family/${f.familyId}`, headers: authHeaders(token) })
    try {
      expect((await view(f.token)).statusCode).toBe(200)
      expect((await view(parent2.token)).statusCode).toBe(200)
      expect((await view(child.token)).statusCode).toBe(200)
      const changed = await h.app.inject({ method: 'PUT', url: `/api/family/${f.familyId}/parent-pin`, headers: authHeaders(f.token), payload: { currentPin: TEST_PARENT_PIN, newPin: '730862' } })
      expect(changed.statusCode).toBe(200)
      expect((await view(f.token)).statusCode).toBe(401)
      expect((await view(parent2.token)).statusCode).toBe(401)
      expect((await view(changed.json().token)).statusCode).toBe(200)
      expect((await view(child.token)).statusCode).toBe(200)
      const oldPin = await h.app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: f.familyCode, role: 'parent', parentPin: TEST_PARENT_PIN } })
      expect(oldPin.statusCode).toBe(403)
      expect((await joinFamily(h.app, f.familyCode, 'parent', 'new-parent', '730862')).token).toBeTruthy()
    } finally { await another.app.close(); await another.db.$disconnect() }
  })

  it('旧家长令牌不能自认可信或设置 PIN；主机迁移/恢复后能重新登录，孩子令牌保留', async () => {
    const f = await createFamilyAsParent(h.app)
    const child = await joinFamily(h.app, f.familyCode, 'child')
    const claims = verifyToken(f.token, tokenSecret)
    const oldToken = signToken({ fid: f.familyId, role: 'parent', did: 'legacy', sid: claims.sid }, tokenSecret)
    await h.db.family.update({ where: { id: f.familyId }, data: { parentPinHash: null, parentPinVersion: 0 } })
    const view = (token: string) => h.app.inject({ method: 'GET', url: `/api/family/${f.familyId}`, headers: authHeaders(token) })
    expect((await view(oldToken)).statusCode).toBe(401)
    const join = await h.app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: f.familyCode, role: 'parent', parentPin: '730862' } })
    expect(join.statusCode).toBe(403)
    expect(join.json().code).toBe('PARENT_PIN_SETUP_REQUIRED')
    const setup = await h.app.inject({ method: 'PUT', url: `/api/family/${f.familyId}/parent-pin`, headers: authHeaders(oldToken), payload: { currentPin: '', newPin: '730862' } })
    expect(setup.statusCode).toBe(401)
    await recoverParentPin(h.db, f.familyCode, '730862', tokenSecret)
    const recovered = await joinFamily(h.app, f.familyCode, 'parent', 'recovered', '730862')
    expect((await view(recovered.token)).statusCode).toBe(200)
    expect((await view(oldToken)).statusCode).toBe(401)
    expect((await view(child.token)).statusCode).toBe(200)
    // 同一主机恢复能力也处理遗忘 PIN，不需要知晓旧 PIN。
    await recoverParentPin(h.db, f.familyCode, '946208', tokenSecret)
    expect((await view(recovered.token)).statusCode).toBe(401)
    expect((await joinFamily(h.app, f.familyCode, 'parent', 'recovered-again', '946208')).token).toBeTruthy()
  })

  it('客户端带着失效旧令牌，也仍能通过正确凭据重新登录', async () => {
    const f = await createFamilyAsParent(h.app)
    const joined = await h.app.inject({ method: 'POST', url: '/api/family/join', headers: authHeaders('expired-token'), payload: { familyCode: f.familyCode, role: 'parent', parentPin: TEST_PARENT_PIN } })
    expect(joined.statusCode).toBe(200)
  })

  it('损坏的哈希与格式无效 PIN 不会被接受', async () => {
    const hash = await hashParentPin(TEST_PARENT_PIN, tokenSecret)
    expect(await matchesParentPin('abc123', hash, tokenSecret)).toBe(false)
    expect(await matchesParentPin(TEST_PARENT_PIN, hash + '$extra', tokenSecret)).toBe(false)
    expect(await matchesParentPin(TEST_PARENT_PIN, 'broken', tokenSecret)).toBe(false)
  })

  it('数字家庭码也不能被用作家长 PIN', async () => {
    const f = await createFamilyAsParent(h.app)
    await h.db.family.update({ where: { id: f.familyId }, data: { code: '284692' } })
    await expect(recoverParentPin(h.db, '284692', '284692', tokenSecret)).rejects.toThrow('不能与家庭码相同')
    const changed = await h.app.inject({ method: 'PUT', url: `/api/family/${f.familyId}/parent-pin`, headers: authHeaders(f.token), payload: { currentPin: TEST_PARENT_PIN, newPin: '284692' } })
    expect(changed.statusCode).toBe(400)
  })
})
