import Fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { join } from 'node:path'
import type { PrismaClient } from '@prisma/client'
import {
  AppError,
  WereadApiError,
  WereadHttpError,
} from './lib/errors'
import { IpRateLimiter, IP_LIMIT_DEFAULTS } from './lib/ipRateLimit'
import { createSessionGuard } from './lib/sessions'
import { verifyToken } from './lib/auth'
import { registerFamilyRoutes } from './modules/family/routes'
import { getBoundKey, type KeyProbe } from './modules/family/service'
import { registerWereadRoutes } from './modules/weread/routes'
import { invalidateSyncFingerprint } from './modules/weread/shelf'
import { registerCosessionRoutes } from './modules/cosession/routes'
import { registerRitualRoutes } from './modules/ritual/routes'
import { registerReportsRoutes } from './modules/reports/routes'
import { registerContentRoutes } from './content/routes'
import { registerTtsRoutes } from './modules/tts/routes'
import type { TtsClientDeps } from './modules/tts/client'
import { registerMediaRoutes } from './modules/media/routes'
import { registerArtRoutes } from './modules/media/artRoutes'
import { registerVideoRoutes } from './modules/media/videoRoutes'
import type { ImageGenDeps } from './modules/media/imagegen'
import type { VideoGenDeps } from './modules/media/video'
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
  /** 就寝时刻（本地日内分钟数，生产默认 21:30 由 config 提供）；null=关闭（测试缺省，防深夜测试被闸） */
  bedTimeMin?: number | null
  /** 活跃会话软封顶秒数（默认 300）；超时温和引导收尾 */
  overtimeCapSec?: number
  /** 仪式域时钟注入（测试） */
  ritualNowSec?: () => number
  ritualNowMin?: () => number
  allowedOrigin?: string | boolean
  logger?: boolean
  /** 媒体目录（AI 插画 + TTS 音频缓存落地，docs/13） */
  mediaDir?: string
  /** stepaudio 客户端依赖；为空时 TTS 路由返回 503 由前端降级（docs/13 P0-B） */
  ttsDeps?: TtsClientDeps | null
  /** AI 生图依赖；为空时插画路由返回 503，封面回退 SVG 场景（docs/13 P0-A） */
  imageDeps?: ImageGenDeps | null
  /** AI 视频依赖；为空时不展示「让画面动起来」（docs/13 P0-E） */
  videoDeps?: VideoGenDeps | null
  /** 审计 T03/F06：信任反向代理（X-Forwarded-*）。false=直连（默认）；true/正整数=信任一级/N 跳 */
  trustProxy?: boolean | number
}

export async function buildApp(options: BuildAppOptions): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? false,
    // 放宽路径参数长度上限到 256（zod 校验限 bookId≤128；默认 100 会让超长参数在路由层 404 而非 400）
    maxParamLength: 256,
    // 审计 T03/F06：显式信任代理配置——默认 false 时伪造 X-Forwarded-For 不影响
    // request.ip（限流按真实对端地址）；启用后按一级/N 跳可信代理解析客户端地址
    trustProxy: options.trustProxy ?? false,
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

  // 审计 T02/F04：可撤销设备会话。全局 preHandler 对所有带 Authorization 的请求
  // 校验「会话存在 + 未撤销 + 家庭仍存在」，一处覆盖全部域路由；令牌绑定 sid，
  // 旧无 sid 令牌在 verifyToken 层直接拒绝（迁移：凭家庭码/家长码重新加入）。
  const sessionGuard = createSessionGuard(options.db)
  app.addHook('preHandler', async (request) => {
    const header = request.headers.authorization
    if (!header || !header.startsWith('Bearer ')) return
    const claims = verifyToken(header.slice(7).trim(), options.tokenSecret)
    await sessionGuard.assertActive(claims.fid, claims.sid)
  })

  registerFamilyRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    masterKey: options.masterKey,
    probeKey: options.probeKey,
    sessionGuard,
    ipLimiter:
      options.ipLimiter ??
      new IpRateLimiter({ ...IP_LIMIT_DEFAULTS }),
    onFamilyDeleted: (familyId) => {
      // N9-205：注销后逐出进程内的服务实例（含解密 key）与书架同步指纹
      registry.remove(familyId)
      invalidateSyncFingerprint(familyId)
    },
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
    bedTimeMin: options.bedTimeMin ?? null,
    ...(options.ritualNowMin ? { nowMinutesOfDay: options.ritualNowMin } : {}),
    ...(options.cosessionNow ? { nowSec: options.cosessionNow } : {}),
  })

  registerRitualRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    bedTimeMin: options.bedTimeMin ?? null,
    overtimeCapSec: options.overtimeCapSec ?? 300,
    ...(options.ritualNowSec ? { nowSec: options.ritualNowSec } : {}),
    ...(options.ritualNowMin ? { nowMinutesOfDay: options.ritualNowMin } : {}),
  })

  registerReportsRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
  })

  // v2 内容域：公版书库 + 自研阅读器正文来源（docs/07）
  registerContentRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
  })

  // 第四轮（docs/13）：媒体静态服务 + 服务端 TTS
  const mediaDir = options.mediaDir ?? join(process.cwd(), 'media')
  registerMediaRoutes(app, { mediaDir })
  const ttsDeps: TtsClientDeps | null = options.ttsDeps ?? null
  registerTtsRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    ttsDeps,
    mediaDir,
  })
  const imageDeps: ImageGenDeps | null = options.imageDeps ?? null
  registerArtRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    mediaDir,
    imageDeps,
  })
  const videoDeps: VideoGenDeps | null = options.videoDeps ?? null
  registerVideoRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    mediaDir,
    videoDeps,
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
