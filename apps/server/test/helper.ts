import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { buildApp } from '../src/app'
import { createDb } from '../src/lib/db'
import { IpRateLimiter } from '../src/lib/ipRateLimit'
import { tokenSecretFrom, type KeyProbe } from '../src/modules/family/service'
import type { WereadCall } from '../src/services/weread/endpoints'

export const TEST_MASTER_KEY = 'test-master-key-0123456789abcdef'
export const TEST_DB_URL = 'file:./test.db'
export const tokenSecret = tokenSecretFrom(TEST_MASTER_KEY)
/** 测试专用假 key：真实 key 只允许存在于 .env（gitignored），绝不写入任何源码 */
export const FAKE_KEY = 'wrk-test-fake-key-0001'

export interface TestHarness {
  app: FastifyInstance
  db: PrismaClient
}

export interface MakeAppOpts {
  ipLimiter?: IpRateLimiter
  /** mock 网关工厂（业务出网注入） */
  wereadCall?: (apiKey: string) => WereadCall
}

export async function makeApp(probe?: KeyProbe, opts: MakeAppOpts = {}): Promise<TestHarness> {
  const db = createDb(TEST_DB_URL)
  const app = await buildApp({
    db,
    tokenSecret,
    masterKey: TEST_MASTER_KEY,
    probeKey: probe,
    // 默认宽松限流：既有家庭域测试会连续创建大量家庭；限流专项测试自行注入小实例
    ipLimiter:
      opts.ipLimiter ??
      new IpRateLimiter({ capacity: 100_000, refillPerMinute: 100_000 }),
    wereadCall: opts.wereadCall,
  })
  return { app, db }
}

/** 建家庭 → 家长绑定假 key，返回带 Authorization 头所需的全套凭据 */
export async function createBoundFamily(
  app: FastifyInstance,
  apiKey = FAKE_KEY,
): Promise<{ familyId: string; familyCode: string; token: string }> {
  const parent = await createFamilyAsParent(app)
  const res = await app.inject({
    method: 'POST',
    url: `/api/family/${parent.familyId}/bind-weread`,
    headers: { authorization: `Bearer ${parent.token}` },
    payload: { apiKey },
  })
  if (res.statusCode !== 200) {
    throw new Error(`createBoundFamily 绑定失败：${res.statusCode} ${res.body}`)
  }
  return parent
}

export function authHeaders(token: string): Record<string, string> {
  return { authorization: `Bearer ${token}` }
}

/** 建家庭并返回家长端会话 */
export async function createFamilyAsParent(
  app: FastifyInstance,
  deviceId = 'parent-device',
): Promise<{ familyId: string; familyCode: string; token: string }> {
  const res = await app.inject({
    method: 'POST',
    url: '/api/family',
    payload: { deviceId },
  })
  if (res.statusCode !== 201) {
    throw new Error(`createFamilyAsParent 失败：${res.statusCode} ${res.body}`)
  }
  return res.json()
}

/** 凭家庭码以指定角色加入 */
export async function joinFamily(
  app: FastifyInstance,
  familyCode: string,
  role: 'parent' | 'child',
  deviceId = `${role}-device`,
): Promise<{ familyId: string; token: string }> {
  const res = await app.inject({
    method: 'POST',
    url: '/api/family/join',
    payload: { familyCode, role, deviceId },
  })
  if (res.statusCode !== 200) {
    throw new Error(`joinFamily 失败：${res.statusCode} ${res.body}`)
  }
  return res.json()
}
