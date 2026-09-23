import 'dotenv/config'
import { join, resolve } from 'node:path'
import { loadConfig, ttsAvailable, imageGenAvailable, videoGenAvailable } from './config'
import { buildApp } from './app'
import { createDb } from './lib/db'
import { tokenSecretFrom } from './modules/family/service'
import { startWeeklyReportScheduler } from './modules/reports/routes'
import type { TtsClientDeps } from './modules/tts/client'
import type { ImageGenDeps } from './modules/media/imagegen'
import type { VideoGenDeps } from './modules/media/video'

async function main(): Promise<void> {
  const config = loadConfig()
  const db = createDb(config.TAO_DATABASE_URL)
  // N11-001 反向守卫：本入口使用真实网关。库内若存在演示家庭（123456），
  // 说明误将演示库交给真实服务——演示 key 会经真实网关出网，必须拒绝启动。
  const demoLeak = await db.family.findUnique({ where: { code: '123456' }, select: { id: true } })
  if (demoLeak) {
    console.error('拒绝启动：当前库包含演示家庭（123456）。请使用 npm run demo 入口，或更换 TAO_DATABASE_URL。')
    process.exit(1)
  }
  // 第四轮（docs/13）：stepaudio 客户端。未配置时 ttsDeps=null，TTS 路由返回 503 由前端降级。
  const ttsDeps: TtsClientDeps | null = ttsAvailable(config)
    ? {
        base: config.TTS_BASE!,
        apiKey: config.TTS_API_KEY!,
        model: config.TTS_MODEL,
      }
    : null
  const mediaDir = config.TAO_MEDIA_DIR ? resolve(config.TAO_MEDIA_DIR) : join(process.cwd(), 'media')
  const imageDeps: ImageGenDeps | null = imageGenAvailable(config)
    ? {
        base: config.TAO_IMAGE_BASE!,
        apiKey: config.TAO_IMAGE_KEY!,
        model: config.TAO_IMAGE_MODEL,
      }
    : null
  const videoDeps: VideoGenDeps | null = videoGenAvailable(config)
    ? {
        base: config.TAO_VIDEO_BASE!,
        apiKey: config.TAO_VIDEO_KEY!,
        model: config.TAO_VIDEO_MODEL,
      }
    : null

  const app = await buildApp({
    db,
    tokenSecret: tokenSecretFrom(config.TAO_MASTER_KEY),
    masterKey: config.TAO_MASTER_KEY,
    // 审计 T03/F06：docs/06 部署文档承诺的 TAO_TRUST_PROXY 落实到 Fastify
    trustProxy: config.TAO_TRUST_PROXY,
    genDailyLimit: config.TAO_DAILY_GEN_LIMIT,
    ...(config.TAO_STATIC_DIR ? { staticDir: resolve(config.TAO_STATIC_DIR) } : {}),
    allowedOrigin: config.TAO_ALLOWED_ORIGIN === '*' ? true : config.TAO_ALLOWED_ORIGIN,
    bedTimeMin: config.TAO_BEDTIME === 'off' ? null : config.TAO_BEDTIME,
    logger: true,
    mediaDir,
    ttsDeps,
    imageDeps,
    videoDeps,
  })
  // 周报调度：周日 19:00–20:00（服务器本地时间）为全部家庭生成当周周报（幂等 upsert）
  startWeeklyReportScheduler(db)
  const gateState =
    config.TAO_BEDTIME === 'off'
      ? '已关闭（TAO_BEDTIME=off）'
      : '就寝时刻 ' + config.TAO_BEDTIME + ' 分钟（家庭级设置可覆盖）'
  console.log('[护眼闸]', gateState)
  console.log('[TTS]', ttsDeps ? `服务端朗读已就绪（${ttsDeps.model}）` : '未配置 TTS，朗读将使用浏览器语音')
  console.log('[生图]', imageDeps ? `AI 插画已就绪（${imageDeps.model}）` : '未配置生图，封面使用 SVG 场景')
  console.log('[视频]', videoDeps ? `AI 动画已就绪（${videoDeps.model}）` : '未配置视频，不展示动画入口')
  console.log('[媒体]', mediaDir)
  await app.listen({ port: config.PORT, host: config.TAO_HOST })
}

main().catch((err) => {
  console.error('服务启动失败：', err)
  process.exit(1)
})
