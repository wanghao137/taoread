import Fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import compress from '@fastify/compress'
import fastifyStatic from '@fastify/static'
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
import { registerPhonicsRoutes } from './modules/phonics/routes'
import { registerTtsRoutes } from './modules/tts/routes'
import { PublicTtsIndex } from './modules/tts/publicCache'
import type { TtsClientDeps } from './modules/tts/client'
import { registerMediaRoutes } from './modules/media/routes'
import { registerArtRoutes } from './modules/media/artRoutes'
import { registerVideoRoutes } from './modules/media/videoRoutes'
import type { ImageGenDeps } from './modules/media/imagegen'
import type { VideoGenDeps } from './modules/media/video'
import { callWereadApi } from './services/weread/gateway'
import type { WereadCall } from './services/weread/endpoints'
import { WereadServiceRegistry } from './services/weread/registry'
import { registerOpsRoutes } from './modules/ops/routes'

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
  /** A3 费用边界：每家庭每日 AI 生成上限（默认 60） */
  genDailyLimit?: number
  /** 前端构建产物目录（apps/web/dist）。设置后同源托管 SPA（部署 read.taostudioai.com 用） */
  staticDir?: string
}

export async function buildApp(options: BuildAppOptions): Promise<FastifyInstance> {
  const app = Fastify({
    // Media capabilities travel in image/audio URLs; never put raw query strings in request logs.
    logger: options.logger ? { serializers: { req: (req) => ({ method: req.method, path: req.url?.split('?')[0], hostname: req.hostname, remoteAddress: req.ip }) } } : false,
    // 放宽路径参数长度上限到 256（zod 校验限 bookId≤128；默认 100 会让超长参数在路由层 404 而非 400）
    maxParamLength: 256,
    // 审计 T03/F06：显式信任代理配置——默认 false 时伪造 X-Forwarded-For 不影响
    // request.ip（限流按真实对端地址）；启用后按一级/N 跳可信代理解析客户端地址
    trustProxy: options.trustProxy ?? false,
    // 大文件导入：家庭上行收 45MB base64 body 要数分钟，Node 默认 requestTimeout(300s)
    // 会在慢链路上掐断仍在传输的请求；与客户端导入超时（10min）对齐放宽
    requestTimeout: 600_000,
  })

  app.addHook('onRequest', async (_request, reply) => {
    reply.header('Referrer-Policy', 'no-referrer')
    // R-07（docs/31）：基线安全头。nosniff 防 MIME 嗅探（SPA fallback 的 text/html
    // 绝不能被当脚本解析）；frame 限制防点击劫持；权限策略收窄设备能力。
    // microphone=(self)（docs/34 P1-6）：「跟我读」录音回放仅用本站 MediaRecorder，
    // 不授予任何第三方帧。
    reply.header('X-Content-Type-Options', 'nosniff')
    reply.header('X-Frame-Options', 'SAMEORIGIN')
    reply.header('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()')
    // R-07：CSP 先走 report-only 观察期（未配置报告端点，违规只在浏览器控制台可见），
    // 观察无违规后再切强制版。指令依据全仓外联域名盘点：
    //  - connect-src：同源 API/SSE + 公共媒体外链（media.taostudioai.com，R2 自定义域，
    //    随 TAO_MEDIA_PUBLIC_BASE 配置）+ 服务端依赖的上游网关（weread 代理、生图/视频
    //    apihub、TTS stepfun——当前无前端直连，观察期一并放行防误伤）；
    //  - img-src/media-src：公共封面缩图与 tts-public 音频走 media.taostudioai.com；
    //  - style-src 'unsafe-inline'：React 内联样式；script 皆为同源产物故 'self'。
    reply.header(
      'Content-Security-Policy-Report-Only',
      [
        "default-src 'self'",
        "connect-src 'self' https://media.taostudioai.com https://i.weread.qq.com https://apihub.agnes-ai.com https://api.stepfun.com",
        "img-src 'self' data: https://media.taostudioai.com",
        "media-src 'self' https://media.taostudioai.com",
        "font-src 'self' data:",
        "style-src 'self' 'unsafe-inline'",
        "script-src 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),
    )
  })

  await app.register(cors, {
    origin: options.allowedOrigin ?? true,
  })

  // docs/35 B1：gzip 压缩——书架接口 178KB JSON 压后 ~30KB，家庭上行是全站瓶颈。
  // SSE（TTS 整章）走 reply.raw 直写，天然绕过本插件的 onSend 管道，不受影响。
  await app.register(compress, {
    threshold: 1024,
    encodings: ['gzip', 'deflate'],
  })

  // docs/35 D1：慢端点观测——>500ms 的 API 记一行结构化日志，积累 p95 证据
  app.addHook('onResponse', async (request, reply) => {
    const elapsed = typeof reply.elapsedTime === 'number' ? reply.elapsedTime : 0
    if (elapsed > 500 && request.url?.startsWith('/api/')) {
      console.log(
        JSON.stringify({
          slow: true,
          method: request.method,
          path: request.url.split('?')[0],
          ms: Math.round(elapsed),
          status: reply.statusCode,
        }),
      )
    }
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
    onWereadUnbound: (familyId) => {
      // docs/34 P0-9：解绑同样要逐出实例与指纹，防止旧 key 继续服务到进程重启
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
  const mediaDir = options.mediaDir ?? join(process.cwd(), 'media')
  registerContentRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    mediaDir,
  })

  registerPhonicsRoutes(app, { db: options.db, tokenSecret: options.tokenSecret })

  // 运营摘要（docs/34 P2-10）：只读体检数据，家长角色，孩子端无入口
  registerOpsRoutes(app, { db: options.db, tokenSecret: options.tokenSecret })


  // 第四轮（docs/13）：媒体静态服务 + 服务端 TTS
  registerMediaRoutes(app, { mediaDir, db: options.db, tokenSecret: options.tokenSecret, sessionGuard })
  const ttsDeps: TtsClientDeps | null = options.ttsDeps ?? null
  registerTtsRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    ttsDeps,
    mediaDir,
    publicTts: new PublicTtsIndex(mediaDir),
    ttsDailyLimit: (options.genDailyLimit ?? 60) * 10,
  })
  const imageDeps: ImageGenDeps | null = options.imageDeps ?? null
  registerArtRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    mediaDir,
    imageDeps,
    genDailyLimit: options.genDailyLimit ?? 60,
  })
  const videoDeps: VideoGenDeps | null = options.videoDeps ?? null
  registerVideoRoutes(app, {
    db: options.db,
    tokenSecret: options.tokenSecret,
    mediaDir,
    videoDeps,
    genDailyLimit: options.genDailyLimit ?? 60,
  })

  // ── 同源 SPA 托管（部署 read.taostudioai.com）：静态产物 + 前端路由回退 ──
  // 对抗审查后改 wildcard:true：@fastify/static 关闭通配符时按「启动时快照」注册精确
  // 路由，部署新增的哈希产物全部 404 → 白屏。通配符模式按请求实时解析磁盘（realpath
  // 防穿越依旧生效），网页产物部署即生效、无需重启服务。
  if (options.staticDir) {
    await app.register(fastifyStatic, {
      root: options.staticDir,
      index: false,
      wildcard: true,
      setHeaders: (res, filePath) => {
        const base = filePath.replace(/\\/g, '/').split('/').pop() ?? ''
        // 入口/外壳/清单绝不缓存：部署后老访客第一时间拿到新 index
        if (base === 'index.html' || base === 'sw.js' || base === 'registerSW.js' || base === 'offline-reader.js' || base.endsWith('.webmanifest')) {
          res.setHeader('Cache-Control', 'no-cache')
          return
        }
        // 带内容哈希的产物永久缓存；其余（图标等）不缓存
        if (/-[A-Za-z0-9_-]{6,}\.(js|css|woff2)$/.test(base)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        } else {
          res.setHeader('Cache-Control', 'no-cache')
        }
      },
    })
    app.setNotFoundHandler((request, reply) => {
      const url = (request.raw.url ?? '/').split('?')[0]!
      if (url.startsWith('/api/') || url.startsWith('/api?')) {
        return reply.code(404).send({ code: 'NOT_FOUND', message: '接口不存在' })
      }
      // 带扩展名的路径=静态资源缺失：返回 404，绝不把 index.html 当 JS/CSS 回给浏览器
      const lastSegment = url.slice(url.lastIndexOf('/') + 1)
      if (lastSegment.includes('.')) {
        return reply.code(404).send({ code: 'NOT_FOUND', message: '资源不存在' })
      }
      return reply.sendFile('index.html')
    })
  }

  // 统一错误出口：AppError 按其 statusCode 输出；框架级 4xx（畸形 JSON 等）原样透传；
  // 网关错误统一 502（客户端只见语义化中文，不暴露重试/内部细节）；未知错误一律 500
  app.setErrorHandler((error, _request, reply) => {    if (error instanceof AppError) {
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
    // 意外 500 至少留痕 stderr（logger 关闭的实例此前把错误整条吞掉，排障无从下手）
    if (!options.logger) console.error('[unhandled]', error)
    if (options.logger) app.log.error(error)
    reply.code(500).send({ code: 'INTERNAL', message: '服务器开小差了，请稍后再试' })
  })

  return app
}
