import Fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import type { PrismaClient } from '@prisma/client'
import {
  AppError,
  WereadApiError,
  WereadHttpError,
} from './lib/errors'
import { IpRateLimiter, IP_LIMIT_DEFAULTS } from './lib/ipRateLimit'
import { registerFamilyRoutes } from './modules/family/routes'
import { getBoundKey, type KeyProbe } from './modules/family/service'
import { registerWereadRoutes } from './modules/weread/routes'
import { registerCosessionRoutes } from './modules/cosession/routes'
import { callWereadApi } from './services/weread/gateway'
import type { WereadCall } from './services/weread/endpoints'
import { WereadServiceRegistry } from './services/weread/registry'

export interface BuildAppOptions {
  db: PrismaClient
  tokenSecret: Buffer
  masterKey: string
  /** 绑定探活注入点（测试用假实现，默认真实网关） */
  probeKey?: KeyProbe
  /** 无凭据入口 IP 限流（测试可注入宽松/可控实例） */
  ipLimiter?: IpRateLimiter
  /** 业务出网函数工厂（测试注入 mock 网关；默认真实网关） */
  wereadCall?: (apiKey: string) => WereadCall
  /** 出网缓存/限流时钟注入（测试冻结时间用） */
  wereadNow?: () => number
  /** 共读域时钟注入（测试冻结时间用；默认真实 Unix 秒） */
  cosessionNow?: () => number
  allowedOrigin?: string | boolean
  logger?: boolean
}

export async function buildApp(options: BuildAppOptions): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? false,
    // 放宽路径参数长度上限到 256（zod 校验限 bookId≤128；默认 100 会让超长参数在路由层 404 而非 400）
    maxParamLength: 256,
  })

  await app.register(cors, {
    origin: options.allowedOrigin ?? true,
  })

  app.get('/api/health', async () => ({
    ok: true,
    service: 'taoread-server',
    time: new Date().toISOString(),
  }))

  const registry = new WereadServiceRegistry({
    getKey: (familyId) => getBoundKey(options.db, options.masterKey, familyId),
    makeCall:
      options.wereadCall ??
      ((apiKey) => (apiName, params) =>
        callWereadApi({ apiKey, apiName, params })),
    now: options.wereadNow,
  })

  registerFamilyRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    masterKey: options.masterKey,
    probeKey: options.probeKey,
    ipLimiter:
      options.ipLimiter ??
      new IpRateLimiter({ ...IP_LIMIT_DEFAULTS }),
  })

  registerWereadRoutes(app, {
    db: options.db,
    registry,
    tokenSecret: options.tokenSecret,
  })

  registerCosessionRoutes(app, {
    db: options.db,
    registry,
    tokenSecret: options.tokenSecret,
    ...(options.cosessionNow ? { nowSec: options.cosessionNow } : {}),
  })

  // 统一错误出口：AppError 按其 statusCode 输出；框架级 4xx（畸形 JSON 等）原样透传；
  // 网关错误统一 502（客户端只见语义化中文，不暴露重试/内部细节）；未知错误一律 500
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
      if (error instanceof WereadHttpError || error instanceof WereadApiError) {
        reply.code(502).send({ code: error.code, message: '微信读书暂时联系不上，请稍后再试~' })
        return
      }
      reply.code(error.statusCode).send({ code: error.code, message: error.message })
      return
    }
    if (error.validation) {
      reply.code(400).send({ code: 'VALIDATION', message: '请求参数不正确' })
      return
    }
    const statusCode = (error as { statusCode?: unknown }).statusCode
    if (typeof statusCode === 'number' && statusCode >= 400 && statusCode < 500) {
      reply.code(statusCode).send({ code: 'BAD_REQUEST', message: '请求不合法' })
      return
    }
    if (options.logger) app.log.error(error)
    reply.code(500).send({ code: 'INTERNAL', message: '服务器开小差了，请稍后再试' })
  })

  return app
}
