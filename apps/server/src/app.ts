import Fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import type { PrismaClient } from '@prisma/client'
import { AppError } from './lib/errors'
import { IpRateLimiter, IP_LIMIT_DEFAULTS } from './lib/ipRateLimit'
import { registerFamilyRoutes } from './modules/family/routes'
import type { KeyProbe } from './modules/family/service'

export interface BuildAppOptions {
  db: PrismaClient
  tokenSecret: Buffer
  masterKey: string
  /** 绑定探活注入点（测试用假实现，默认真实网关） */
  probeKey?: KeyProbe
  /** 无凭据入口 IP 限流（测试可注入宽松/可控实例） */
  ipLimiter?: IpRateLimiter
  allowedOrigin?: string | boolean
  logger?: boolean
}

export async function buildApp(options: BuildAppOptions): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? false,
  })

  await app.register(cors, {
    origin: options.allowedOrigin ?? true,
  })

  app.get('/api/health', async () => ({
    ok: true,
    service: 'taoread-server',
    time: new Date().toISOString(),
  }))

  registerFamilyRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    masterKey: options.masterKey,
    probeKey: options.probeKey,
    ipLimiter:
      options.ipLimiter ??
      new IpRateLimiter({ ...IP_LIMIT_DEFAULTS }),
  })

  // 统一错误出口：AppError 按其 statusCode 输出；框架级 4xx（畸形 JSON 等）原样透传；未知错误一律 500 且不泄露内部信息
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
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
