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
  /** 冻结业务缓存/限流时钟（限流类测试确定性用） */
  wereadNow?: () => number
  /** 冻结共读域时钟（成就解锁/幂等收尾类测试确定性用） */
  cosessionNow?: () => number
  /** 就寝时刻（本地日内分钟数）；null=关闭。缺省关闭（时段专项测试自注入） */
  bedTimeMin?: number | null
  /** 活跃会话软封顶秒数（默认 300） */
  overtimeCapSec?: number
  /** 仪式域时钟注入（overtime 判定） */
  ritualNowSec?: () => number
  /** 仪式域本地分钟注入（bedtime 判定） */
  ritualNowMin?: () => number
  /** 审计 T03/F06：信任反向代理（true/跳数） */
  mediaDir?: string
  trustProxy?: boolean | number
  /** 审计 T03/F02：TTS 依赖注入（测屏蔽书 TTS 拒读用） */
  ttsDeps?: import('../src/modules/tts/client').TtsClientDeps | null
  /** A3：生图依赖注入（测并发去重/每日配额用） */
  imageDeps?: import('../src/modules/media/imagegen').ImageGenDeps | null
  /** A3：每家庭每日生成上限注入 */
  genDailyLimit?: number
}

export async function makeApp(probe?: KeyProbe, opts: MakeAppOpts = {}): Promise<TestHarness> {
  const db = createDb(TEST_DB_URL)
  const app = await buildApp({
    db,
    tokenSecret,
    masterKey: TEST_MASTER_KEY,
    ...(opts.mediaDir ? { mediaDir: opts.mediaDir } : {}),
    probeKey: probe,
    // 默认宽松限流：既有家庭域测试会连续创建大量家庭；限流专项测试自行注入小实例
    ipLimiter:
      opts.ipLimiter ??
      new IpRateLimiter({ capacity: 100_000, refillPerMinute: 100_000 }),
    wereadCall: opts.wereadCall,
    wereadNow: opts.wereadNow,
    ...(opts.cosessionNow ? { cosessionNow: opts.cosessionNow } : {}),
    bedTimeMin: opts.bedTimeMin ?? null,
    overtimeCapSec: opts.overtimeCapSec,
    ...(opts.ritualNowSec ? { ritualNowSec: opts.ritualNowSec } : {}),
    ...(opts.ritualNowMin ? { ritualNowMin: opts.ritualNowMin } : {}),
    ...(opts.trustProxy !== undefined ? { trustProxy: opts.trustProxy } : {}),
    ...(opts.ttsDeps !== undefined ? { ttsDeps: opts.ttsDeps } : {}),
    ...(opts.imageDeps !== undefined ? { imageDeps: opts.imageDeps } : {}),
    ...(opts.genDailyLimit !== undefined ? { genDailyLimit: opts.genDailyLimit } : {}),
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

/** 家长给孩子建档，返回 childId */
export async function createChild(
  app: FastifyInstance,
  token: string,
  familyId: string,
  nickname = '桃桃',
  stage = '3-5',
): Promise<string> {
  const res = await app.inject({
    method: 'POST',
    url: `/api/family/${familyId}/children`,
    headers: authHeaders(token),
    payload: { nickname, stage },
  })
  if (res.statusCode !== 201) {
    throw new Error(`createChild 失败：${res.statusCode} ${res.body}`)
  }
  return res.json().id
}

/** 建家庭并返回家长端会话（含家长码，T02/F01） */
export async function createFamilyAsParent(
  app: FastifyInstance,
  deviceId = 'parent-device',
): Promise<{ familyId: string; familyCode: string; parentCode: string; token: string }> {
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

/** 凭家庭码以指定角色加入；role=parent 必须携带家长码（T02/F01 服务端决定角色） */
export async function joinFamily(
  app: FastifyInstance,
  familyCode: string,
  role: 'parent' | 'child',
  deviceId = `${role}-device`,
  parentCode?: string,
): Promise<{ familyId: string; token: string }> {
  const res = await app.inject({
    method: 'POST',
    url: '/api/family/join',
    payload: {
      familyCode,
      role,
      deviceId,
      ...(role === 'parent' && parentCode ? { parentCode } : {}),
    },
  })
  if (res.statusCode !== 200) {
    throw new Error(`joinFamily 失败：${res.statusCode} ${res.body}`)
  }
  return res.json()
}
