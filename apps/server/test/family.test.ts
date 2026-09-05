import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import {
  createFamilyAsParent,
  joinFamily,
  makeApp,
  FAKE_KEY,
  tokenSecret,
  TEST_MASTER_KEY,
  type TestHarness,
} from './helper'
import { signToken, verifyToken } from '../src/lib/auth'
import { wipeDb } from '../src/lib/db'
import { ValidationError } from '../src/lib/errors'

// 三个注入探针：成功 / 明确拒绝（等价网关 WEREAD_API → ValidationError） / 网络不可达
const probeOk = async () => 'active' as const
const probeRejected = async () => {
  throw new ValidationError('这把 API Key 没有通过微信读书验证，请核对后重试')
}
const probeUnreachable = async () => 'unverified' as const

describe('家庭域 API', () => {
  let h: TestHarness
  let db: PrismaClient

  beforeAll(async () => {
    h = await makeApp(probeOk)
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

  describe('创建与加入', () => {
    it('创建家庭返回家庭码与家长令牌（201）', async () => {
      const res = await h.app.inject({
        method: 'POST',
        url: '/api/family',
        payload: { deviceId: 'p1' },
      })
      expect(res.statusCode).toBe(201)
      const body = res.json()
      expect(body.familyCode).toMatch(/^[A-HJ-NP-Z2-9]{8}$/)
      const claims = verifyToken(body.token, tokenSecret)
      expect(claims.fid).toBe(body.familyId)
      expect(claims.role).toBe('parent')
    })

    it('凭家庭码以孩子角色加入并取得有效令牌', async () => {
      const parent = await createFamilyAsParent(h.app)
      const child = await joinFamily(h.app, parent.familyCode, 'child')
      expect(child.familyId).toBe(parent.familyId)
      expect(verifyToken(child.token, tokenSecret).role).toBe('child')
    })

    it('不存在的家庭码返回 404 与中文提示', async () => {
      const res = await h.app.inject({
        method: 'POST',
        url: '/api/family/join',
        payload: { familyCode: 'AAAA2222', role: 'child' },
      })
      expect(res.statusCode).toBe(404)
      expect(res.json().message).toContain('家庭码')
    })

    it('格式非法的家庭码返回 400', async () => {
      const res = await h.app.inject({
        method: 'POST',
        url: '/api/family/join',
        payload: { familyCode: 'bad-code', role: 'child' },
      })
      expect(res.statusCode).toBe(400)
    })
  })

  describe('认证中间件（验收项：缺 token/错 token 均 401）', () => {
    it('缺少 Authorization 头 → 401', async () => {
      const parent = await createFamilyAsParent(h.app)
      const res = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
      })
      expect(res.statusCode).toBe(401)
    })

    it('非 Bearer 格式 → 401', async () => {
      const parent = await createFamilyAsParent(h.app)
      const res = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
        headers: { authorization: 'Basic abc' },
      })
      expect(res.statusCode).toBe(401)
    })

    it('伪造令牌 → 401', async () => {
      const parent = await createFamilyAsParent(h.app)
      const res = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
        headers: { authorization: 'Bearer not-a-jwt' },
      })
      expect(res.statusCode).toBe(401)
    })

    it('错误签名密钥签发的令牌 → 401', async () => {
      const parent = await createFamilyAsParent(h.app)
      const forged = signToken(
        { fid: parent.familyId, role: 'parent', did: 'x' },
        Buffer.from('wrong-secret-wrong-secret-0000'),
        { nowSec: Math.floor(Date.now() / 1000), ttlSec: 3600 },
      )
      const res = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
        headers: { authorization: `Bearer ${forged}` },
      })
      expect(res.statusCode).toBe(401)
    })

    it('过期令牌 → 401 且提示重新加入', async () => {
      const parent = await createFamilyAsParent(h.app)
      const expired = signToken(
        { fid: parent.familyId, role: 'parent', did: 'x' },
        tokenSecret,
        { nowSec: 1_000, ttlSec: 100 },
      )
      const res = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
        headers: { authorization: `Bearer ${expired}` },
      })
      expect(res.statusCode).toBe(401)
      expect(res.json().message).toContain('重新加入')
    })
  })

  describe('越权防线（审查重点：family A 不可触达 family B）', () => {
    it('A 家长令牌访问 B 家庭视图 → 403', async () => {
      const a = await createFamilyAsParent(h.app)
      const b = await createFamilyAsParent(h.app, 'parent-b')
      const res = await h.app.inject({
        method: 'GET',
        url: `/api/family/${b.familyId}`,
        headers: { authorization: `Bearer ${a.token}` },
      })
      expect(res.statusCode).toBe(403)
    })

    it('A 家长向 B 家庭添加孩子 → 403', async () => {
      const a = await createFamilyAsParent(h.app)
      const b = await createFamilyAsParent(h.app, 'parent-b')
      const res = await h.app.inject({
        method: 'POST',
        url: `/api/family/${b.familyId}/children`,
        headers: { authorization: `Bearer ${a.token}` },
        payload: { nickname: '小桃', stage: '3-5' },
      })
      expect(res.statusCode).toBe(403)
    })

    it('A 家长为 B 家庭绑定微信读书 → 403', async () => {
      const a = await createFamilyAsParent(h.app)
      const b = await createFamilyAsParent(h.app, 'parent-b')
      const res = await h.app.inject({
        method: 'POST',
        url: `/api/family/${b.familyId}/bind-weread`,
        headers: { authorization: `Bearer ${a.token}` },
        payload: { apiKey: FAKE_KEY },
      })
      expect(res.statusCode).toBe(403)
      const stored = await db.wereadBinding.findUnique({ where: { familyId: b.familyId } })
      expect(stored).toBeNull()
    })

    it('A 家长修改/删除 B 家庭的孩子 → 404（不泄露存在性）', async () => {
      const a = await createFamilyAsParent(h.app)
      const b = await createFamilyAsParent(h.app, 'parent-b')
      const child = await h.app.inject({
        method: 'POST',
        url: `/api/family/${b.familyId}/children`,
        headers: { authorization: `Bearer ${b.token}` },
        payload: { nickname: '小柚', stage: '6-8' },
      })
      const childId = child.json().id
      const patch = await h.app.inject({
        method: 'PATCH',
        url: `/api/children/${childId}`,
        headers: { authorization: `Bearer ${a.token}` },
        payload: { nickname: '改名' },
      })
      expect(patch.statusCode).toBe(404)
      const del = await h.app.inject({
        method: 'DELETE',
        url: `/api/children/${childId}`,
        headers: { authorization: `Bearer ${a.token}` },
      })
      expect(del.statusCode).toBe(404)
    })
  })

  describe('角色权限', () => {
    it('孩子令牌不能绑定微信读书（403）也不能增删孩子（403）', async () => {
      const parent = await createFamilyAsParent(h.app)
      const child = await joinFamily(h.app, parent.familyCode, 'child')
      const bind = await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/bind-weread`,
        headers: { authorization: `Bearer ${child.token}` },
        payload: { apiKey: FAKE_KEY },
      })
      expect(bind.statusCode).toBe(403)
      const add = await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/children`,
        headers: { authorization: `Bearer ${child.token}` },
        payload: { nickname: '小桃', stage: '3-5' },
      })
      expect(add.statusCode).toBe(403)
    })

    it('孩子令牌可读家庭视图与孩子列表（ ritual 流需要）', async () => {
      const parent = await createFamilyAsParent(h.app)
      const child = await joinFamily(h.app, parent.familyCode, 'child')
      const view = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
        headers: { authorization: `Bearer ${child.token}` },
      })
      expect(view.statusCode).toBe(200)
      const list = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}/children`,
        headers: { authorization: `Bearer ${child.token}` },
      })
      expect(list.statusCode).toBe(200)
    })
  })

  describe('绑定微信读书（验收项：key 落库为密文、不回显全文）', () => {
    it('绑定成功：返回尾 4 位掩码，库中只有密文，接口响应不含明文 key', async () => {
      const parent = await createFamilyAsParent(h.app)
      const res = await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/bind-weread`,
        headers: { authorization: `Bearer ${parent.token}` },
        payload: { apiKey: FAKE_KEY },
      })
      expect(res.statusCode).toBe(200)
      const body = res.json()
      expect(body).toEqual({ maskedTail: '****0001', status: 'active' })
      expect(res.body).not.toContain(FAKE_KEY)

      const stored = await db.wereadBinding.findUnique({ where: { familyId: parent.familyId } })
      expect(stored).not.toBeNull()
      expect(stored!.ciphertext).not.toContain(FAKE_KEY)
      expect(stored!.maskedTail).toBe('****0001')

      // 家庭视图只出现掩码
      const view = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}`,
        headers: { authorization: `Bearer ${parent.token}` },
      })
      expect(view.body).toContain('****0001')
      expect(view.body).not.toContain(FAKE_KEY)
    })

    it('格式非法的 key → 400，不落库', async () => {
      const parent = await createFamilyAsParent(h.app)
      const res = await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/bind-weread`,
        headers: { authorization: `Bearer ${parent.token}` },
        payload: { apiKey: 'not-a-wrk-key' },
      })
      expect(res.statusCode).toBe(400)
      expect(await db.wereadBinding.count()).toBe(0)
    })

    it('网关明确拒绝 key → 400 不落库；网络不可达 → 绑定为未验证状态', async () => {
      const parent = await createFamilyAsParent(h.app)
      const rejApp = await makeApp(probeRejected)
      await rejApp.app.ready()
      const rej = await rejApp.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/bind-weread`,
        headers: { authorization: `Bearer ${parent.token}` },
        payload: { apiKey: FAKE_KEY },
      })
      expect(rej.statusCode).toBe(400)
      expect(await db.wereadBinding.count()).toBe(0) // 不落库
      await rejApp.app.close()
      await rejApp.db.$disconnect()

      const offApp = await makeApp(probeUnreachable)
      await offApp.app.ready()
      const off = await offApp.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/bind-weread`,
        headers: { authorization: `Bearer ${parent.token}` },
        payload: { apiKey: FAKE_KEY },
      })
      expect(off.statusCode).toBe(200)
      expect(off.json().status).toBe('unverified')
      await offApp.app.close()
      await offApp.db.$disconnect()
    })

    it('重复绑定覆盖旧 key（upsert），仍只回显掩码', async () => {
      const parent = await createFamilyAsParent(h.app)
      const url = `/api/family/${parent.familyId}/bind-weread`
      const headers = { authorization: `Bearer ${parent.token}` }
      await h.app.inject({ method: 'POST', url, headers, payload: { apiKey: FAKE_KEY } })
      const second = await h.app.inject({
        method: 'POST', url, headers,
        payload: { apiKey: 'wrk-secondkey0000000000' },
      })
      expect(second.statusCode).toBe(200)
      expect(second.json().maskedTail).toBe('****0000')
      expect(await db.wereadBinding.count()).toBe(1)
    })

    it('getBoundKey 解密往返无损（服务层集成）', async () => {
      const { getBoundKey } = await import('../src/modules/family/service')
      const parent = await createFamilyAsParent(h.app)
      await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/bind-weread`,
        headers: { authorization: `Bearer ${parent.token}` },
        payload: { apiKey: FAKE_KEY },
      })
      expect(await getBoundKey(db, TEST_MASTER_KEY, parent.familyId)).toBe(FAKE_KEY)
      expect(await getBoundKey(db, TEST_MASTER_KEY, 'no-such-family')).toBeNull()
    })
  })

  describe('孩子档案 CRUD', () => {
    async function setup() {
      const parent = await createFamilyAsParent(h.app)
      const headers = { authorization: `Bearer ${parent.token}` }
      return { parent, headers }
    }

    it('创建/列表/改名/删除全流程', async () => {
      const { parent, headers } = await setup()
      const c1 = await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/children`,
        headers,
        payload: { nickname: '小桃', stage: '3-5' },
      })
      expect(c1.statusCode).toBe(201)
      await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/children`,
        headers,
        payload: { nickname: '小柚', stage: '6-8' },
      })
      const list = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}/children`,
        headers,
      })
      expect(list.json().children).toHaveLength(2)

      const renamed = await h.app.inject({
        method: 'PATCH',
        url: `/api/children/${c1.json().id}`,
        headers,
        payload: { nickname: '桃桃', stage: '6-8' },
      })
      expect(renamed.statusCode).toBe(200)
      const after = await h.app.inject({
        method: 'GET',
        url: `/api/family/${parent.familyId}/children`,
        headers,
      })
      expect(after.json().children[0]).toMatchObject({ nickname: '桃桃', stage: '6-8' })

      const del = await h.app.inject({
        method: 'DELETE',
        url: `/api/children/${c1.json().id}`,
        headers,
      })
      expect(del.statusCode).toBe(204)
      expect(
        (await h.app.inject({ method: 'GET', url: `/api/family/${parent.familyId}/children`, headers })).json().children,
      ).toHaveLength(1)
    })

    it('校验：昵称长度/阶段枚举/未知孩子 404', async () => {
      const { parent, headers } = await setup()
      const longName = await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/children`,
        headers,
        payload: { nickname: 'x'.repeat(21), stage: '3-5' },
      })
      expect(longName.statusCode).toBe(400)
      const badStage = await h.app.inject({
        method: 'POST',
        url: `/api/family/${parent.familyId}/children`,
        headers,
        payload: { nickname: '小桃', stage: '13-18' },
      })
      expect(badStage.statusCode).toBe(400)
      const missing = await h.app.inject({
        method: 'PATCH',
        url: '/api/children/no-such-id',
        headers,
        payload: { nickname: 'x' },
      })
      expect(missing.statusCode).toBe(404)
    })
  })
})
