import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { buildApp } from '../src/app'
import { createDb } from '../src/lib/db'
import { tokenSecretFrom, type KeyProbe } from '../src/modules/family/service'

export const TEST_MASTER_KEY = 'test-master-key-0123456789abcdef'
export const TEST_DB_URL = 'file:./test.db'
export const tokenSecret = tokenSecretFrom(TEST_MASTER_KEY)
/** 测试专用假 key：真实 key 只允许存在于 .env（gitignored），绝不写入任何源码 */
export const FAKE_KEY = 'wrk-test-fake-key-0001'

export interface TestHarness {
  app: FastifyInstance
  db: PrismaClient
}

export async function makeApp(probe?: KeyProbe): Promise<TestHarness> {
  const db = createDb(TEST_DB_URL)
  const app = await buildApp({
    db,
    tokenSecret,
    masterKey: TEST_MASTER_KEY,
    probeKey: probe,
  })
  return { app, db }
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
