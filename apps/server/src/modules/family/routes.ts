import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { callWereadApi } from '../../services/weread/gateway'
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  WereadApiError,
  WereadHttpError,
} from '../../lib/errors'
import { verifyToken, type DeviceRole, type TokenClaims } from '../../lib/auth'
import { type IpRateLimiter, ipRateLimit } from '../../lib/ipRateLimit'
import type { KeyProbe } from './service'
import * as svc from './service'

/** 请求上注入的认证信息 */
declare module 'fastify' {
  interface FastifyRequest {
    auth?: TokenClaims
  }
}

function extractBearer(request: FastifyRequest): string {
  const header = request.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    throw new UnauthorizedError()
  }
  return header.slice(7).trim()
}

/** 认证中间件工厂：校验令牌；roles 限定角色 */
export function requireAuth(
  tokenSecret: Buffer,
  opts: { roles?: DeviceRole[] } = {},
) {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const token = extractBearer(request)
    const claims = verifyToken(token, tokenSecret)
    if (opts.roles && !opts.roles.includes(claims.role)) {
      throw new ForbiddenError('这项操作需要家长权限')
    }
    request.auth = claims
  }
}

/** 家庭域资源守卫：路径 familyId 必须与令牌一致（防跨家庭越权） */
export function assertSameFamily(request: FastifyRequest, familyId: string): void {
  if (!request.auth || request.auth.fid !== familyId) {
    throw new ForbiddenError('家庭不存在或无权访问')
  }
}

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const detail = result.error.issues
      .map((issue) => issue.message)
      .join('；')
    throw new ValidationError(detail || '请求参数不正确')
  }
  return result.data
}

const deviceIdSchema = z.string().max(64).optional()
const familyIdParamSchema = z.object({ familyId: z.string().min(1) })

export interface FamilyRoutesDeps {
  db: svc.FamilyDb
  tokenSecret: Buffer
  masterKey: string
  /** 绑定探活（测试注入假实现；默认真实网关 /_list） */
  probeKey?: KeyProbe
  /** 无凭据入口的 IP 限流（N2-007；不传则不限流，仅供测试） */
  ipLimiter?: IpRateLimiter
  /** 注销后逐出进程内该家庭的缓存/服务实例（N9-205，app 层注入 registry.remove+指纹失效） */
  onFamilyDeleted?: (familyId: string) => void
}

/** 默认探针：真实网关 /_list；fetchImpl 可注入（测试）。
 * 错误语义：key 被网关明确拒绝（业务/HTTP 4xx）→ ValidationError 不落库；
 * 网络层失败或网关 5xx → 允许绑定但标记 unverified；
 * 升级信号/限流等其他错误 → 原样上抛，绝不静默吞掉。 */
export function makeDefaultProbe(fetchImpl?: typeof fetch): KeyProbe {
  return async (apiKey) => {
    try {
      await callWereadApi({
        apiKey,
        apiName: '/_list',
        maxRetries: 0,
        timeoutMs: 8000,
        fetchImpl,
      })
      return 'active'
    } catch (err) {
      if (err instanceof WereadApiError) {
        throw new ValidationError('这把 API Key 没有通过微信读书验证，请核对后重试')
      }
      if (err instanceof WereadHttpError) {
        if (err.status === 0 || err.status >= 500) return 'unverified'
        throw new ValidationError('这把 API Key 没有通过微信读书验证，请核对后重试')
      }
      throw err
    }
  }
}

const defaultProbe: KeyProbe = makeDefaultProbe()

export function registerFamilyRoutes(
  app: FastifyInstance,
  deps: FamilyRoutesDeps,
): void {
  const { db, tokenSecret, masterKey } = deps
  const probe = deps.probeKey ?? defaultProbe
  // 无凭据入口限流（家庭码即完整身份，防爆破/滥用）
  const ipLimit = deps.ipLimiter ? { preHandler: ipRateLimit(deps.ipLimiter) } : {}

  // ── 创建家庭（无需认证：家庭码即身份的起点）──
  app.post('/api/family', {
    ...ipLimit,
  }, async (request, reply) => {
    const body = parse(
      z.object({ deviceId: deviceIdSchema }),
      request.body ?? {},
    )
    const session = await svc.createFamily(db, tokenSecret, body.deviceId)
    reply.code(201)
    return session
  })

  // ── 凭家庭码加入（孩子设备/第二位家长）──
  app.post('/api/family/join', {
    ...ipLimit,
  }, async (request) => {
    const body = parse(
      z.object({
        familyCode: z.string().min(1),
        role: z.enum(['parent', 'child']),
        deviceId: deviceIdSchema,
      }),
      request.body ?? {},
    )
    return svc.joinFamily(db, tokenSecret, body)
  })

  // ── 家庭信息（任何成员可见；key 只回显掩码）──
  app.get('/api/family/:familyId', {
    preHandler: requireAuth(tokenSecret),
  }, async (request) => {
    const { familyId } = parse(familyIdParamSchema, request.params)
    assertSameFamily(request, familyId)
    return svc.getFamilyView(db, familyId)
  })

  // ── 绑定微信读书（仅家长）──
  app.post('/api/family/:familyId/bind-weread', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request) => {
    const { familyId } = parse(familyIdParamSchema, request.params)
    assertSameFamily(request, familyId)
    const body = parse(
      z.object({ apiKey: z.string().min(1) }),
      request.body ?? {},
    )
    return svc.bindWeread(db, masterKey, familyId, body.apiKey, probe)
  })

  // ── 孩子档案 CRUD ──
  app.post('/api/family/:familyId/children', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request, reply) => {
    const { familyId } = parse(familyIdParamSchema, request.params)
    assertSameFamily(request, familyId)
    const body = parse(
      z.object({
        nickname: z.string(),
        stage: z.string(),
        avatar: z.string().max(256).optional(),
      }),
      request.body ?? {},
    )
    reply.code(201)
    return svc.createChild(db, familyId, body)
  })

  app.get('/api/family/:familyId/children', {
    preHandler: requireAuth(tokenSecret),
  }, async (request) => {
    const { familyId } = parse(familyIdParamSchema, request.params)
    assertSameFamily(request, familyId)
    const view = await svc.getFamilyView(db, familyId)
    return { children: view.children }
  })

  app.patch('/api/children/:childId', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request) => {
    const { childId } = parse(z.object({ childId: z.string().min(1) }), request.params)
    if (!request.auth) throw new UnauthorizedError()
    const child = await db.childProfile.findUnique({ where: { id: childId } })
    if (!child || child.familyId !== request.auth.fid) {
      throw new NotFoundError('没有找到这个孩子档案')
    }
    const body = parse(
      z.object({
        nickname: z.string().optional(),
        stage: z.string().optional(),
        avatar: z.string().max(256).nullable().optional(),
      }),
      request.body ?? {},
    )
    await svc.updateChild(db, request.auth.fid, childId, body)
    return { ok: true }
  })

  app.delete('/api/children/:childId', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request, reply) => {
    const { childId } = parse(z.object({ childId: z.string().min(1) }), request.params)
    if (!request.auth) throw new UnauthorizedError()
    await svc.deleteChild(db, request.auth.fid, childId)
    reply.code(204)
    return null
  })

  // ── 家庭设置（第 9 夜，仅家长）：就寝时刻 / 软封顶秒数；null=回落服务端默认 ──
  app.get('/api/family/:familyId/settings', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request) => {
    const { familyId } = parse(familyIdParamSchema, request.params)
    assertSameFamily(request, familyId)
    return svc.getSettings(db, familyId)
  })

  app.patch('/api/family/:familyId/settings', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request) => {
    const { familyId } = parse(familyIdParamSchema, request.params)
    assertSameFamily(request, familyId)
    const body = parse(
      z.object({
        bedtimeMin: z.number().int().nullable().optional(),
        overtimeCapSec: z.number().int().nullable().optional(),
      }),
      request.body ?? {},
    )
    return svc.updateSettings(db, familyId, body)
  })

  // ── 注销家庭（第 9 夜，仅家长）：物理删除全部家庭数据，不可恢复 ──
  app.delete('/api/family/:familyId', {
    preHandler: requireAuth(tokenSecret, { roles: ['parent'] }),
  }, async (request, reply) => {
    const { familyId } = parse(familyIdParamSchema, request.params)
    assertSameFamily(request, familyId)
    await svc.deleteFamilyCompletely(db, familyId, deps.onFamilyDeleted)
    reply.code(204)
    return null
  })
}
