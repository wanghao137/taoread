/**
 * 演示模式入口（`npm run demo`）：
 * 演示隔离边界 = 独立入口（本文件硬编码 mock 探针/网关 + 就寝窗关闭）；无 TAO_DEMO 开关。
 * 环境变量缺失时使用演示内置主密钥（仅本地演示，不用于生产）。
 * 审计 F35（T01）：e2e 以 TAO_E2E_ISOLATION=1 声明隔离——跳过 .env 读取并强制
 * 全部真实供应商为 null（结构上可证明测试零外网/零付费，不依赖 env 卫生）。
 */
const E2E_ISOLATION = process.env.TAO_E2E_ISOLATION === '1'
if (!E2E_ISOLATION) await import('dotenv/config')
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { loadConfig, ttsAvailable, imageGenAvailable, videoGenAvailable } from '../config'
import { buildApp } from '../app'
import { IpRateLimiter } from '../lib/ipRateLimit'
import { createDb } from '../lib/db'
import { tokenSecretFrom } from '../modules/family/service'
import { createDemoGateway } from './mock-gateway'
import { seedDemoFamily, DEMO_FAMILY_CODE } from './seed'
import { seedAllPacks } from '../content/seed'
import { seedMediaLedger } from './seed-media'
import { ALL_PACKS } from '../content/packs'
import type { TtsClientDeps } from '../modules/tts/client'
import type { ImageGenDeps } from '../modules/media/imagegen'
import type { VideoGenDeps } from '../modules/media/video'

async function main(): Promise<void> {
  const config = loadConfig()
  // N11-001（P1）：演示库隔离强制化——TAO_DATABASE_URL 必须是 demo 专属文件。
  // 否则演示 key（wrk-demo-key-0001）会经共用库进入真实网关出网路径。
  if (!/file:\.\/(demo|e2e-run)/.test(config.TAO_DATABASE_URL)) {
    console.error(
      `演示模式拒绝启动：TAO_DATABASE_URL 必须指向 demo 专属库（如 "file:./demo.db"），当前为 "${config.TAO_DATABASE_URL}"。` +
        '演示 key 严禁经共用库进入真实网关路径。',
    )
    process.exit(1)
  }
  // 演示库自迁移：全新环境零配置可跑（demo 指向独立 sqlite 文件时自动建表）
  execSync('npx --no-install prisma migrate deploy', {
    cwd: process.cwd(),
    env: { ...process.env, TAO_DATABASE_URL: config.TAO_DATABASE_URL },
    stdio: 'pipe',
  })
  const db = createDb(config.TAO_DATABASE_URL)
  const masterKey = config.TAO_MASTER_KEY

  // 演示模式媒体接线（N13-002）：此前 demo 只接了 mock 网关，
  // ttsDeps/imageDeps/videoDeps 全部缺失，导致封面/题图回退 SVG、TTS 降级 Web Speech、
  // 「让画面动起来」按钮不渲染——演示看起来像半成品。这里按可用性按需接线：
  // 仅内容域（公版书 + 媒体）用真实 AI 能力，网关仍是 mock（零微信出网）。
  // 审计 F35（T01）：TAO_E2E_ISOLATION=1（e2e）时无论宿主配置如何，供应商一律 null。
  const mediaDir = join(process.cwd(), 'media')
  const ttsDeps: TtsClientDeps | null = !E2E_ISOLATION && ttsAvailable(config)
    ? { base: config.TTS_BASE!, apiKey: config.TTS_API_KEY!, model: config.TTS_MODEL }
    : null
  const imageDeps: ImageGenDeps | null = !E2E_ISOLATION && imageGenAvailable(config)
    ? { base: config.TAO_IMAGE_BASE!, apiKey: config.TAO_IMAGE_KEY!, model: config.TAO_IMAGE_MODEL }
    : null
  const videoDeps: VideoGenDeps | null = !E2E_ISOLATION && videoGenAvailable(config)
    ? { base: config.TAO_VIDEO_BASE!, apiKey: config.TAO_VIDEO_KEY!, model: config.TAO_VIDEO_MODEL }
    : null

  const app = await buildApp({
    db,
    tokenSecret: tokenSecretFrom(masterKey),
    masterKey,
    probeKey: async () => 'active', // 演示模式：绑定探针恒成功
    wereadCall: () => createDemoGateway(), // 演示模式：mock 网关（零真实出网，全家庭同一数据源）
    bedTimeMin: null, // 演示不受就寝窗限制，完整链路可走
    // 演示库单家庭 + mock 网关：join 无爆破面；e2e 全程同 IP 串行登录需宽松桶（生产仍用默认 5/分钟）
    ipLimiter: new IpRateLimiter({ capacity: 1000, refillPerMinute: 10_000 }),
    allowedOrigin: config.TAO_ALLOWED_ORIGIN === '*' ? true : config.TAO_ALLOWED_ORIGIN,
    logger: false,
    mediaDir,
    ttsDeps,
    imageDeps,
    videoDeps,
  })

  const familyId = await seedDemoFamily(db, masterKey)

  // v2 内容域：公版书库入库（幂等），演示即可读到正文
  await seedAllPacks(db, ALL_PACKS)

  // 媒体台账播种：把磁盘上已生成的插画/视频登记进演示库（幂等），
  // 否则 coverArtUrl/artUrl 恒为 null，前端回退 SVG 矢量图。
  const seeded = await seedMediaLedger(db, mediaDir)
  if (seeded.art > 0 || seeded.video > 0) {
    console.log(`   媒体台账: +${seeded.art} 插画 / +${seeded.video} 视频`)
  }
  if (!ttsDeps) console.log('   ⚠️ TTS 未配置，听书将降级为浏览器语音')
  if (!imageDeps) console.log('   ⚠️ 生图未配置，插画为 SVG 矢量图')
  if (!videoDeps) console.log('   ⚠️ 视频未配置，「让画面动起来」不展示')
  // 审计 F35（T01）：demo 承诺「mock 网关零出网」仅指微信读书；内容域 AI 生成
  // 在宿主配置了真实 key 时会真实计费出网——启动时明示，杜绝「零网络」误解
  const realProviders = [ttsDeps && 'TTS', imageDeps && '生图', videoDeps && '视频'].filter(Boolean)
  if (realProviders.length > 0) console.log(`   💡 真实 AI 供应商已接线: ${realProviders.join(' / ')}（内容域生成会调用付费 API；e2e 已强制剥离）`)

  await app.listen({ port: config.PORT, host: '0.0.0.0' })
  console.log('')
  console.log('🍑 桃阅读 演示模式已启动')
  console.log(`   API:      http://localhost:${config.PORT}`)
  console.log(`   家庭码:   ${DEMO_FAMILY_CODE}（登录页输入，可选「爸爸妈妈」或「小朋友」）`)
  console.log(`   演示家庭: ${familyId}`)
  console.log('   前端:     另开终端 npm run dev:web → http://localhost:5173')
  console.log('   或使用根目录 npm run demo（自动拉起前端）')
  console.log('')
}

main().catch((err) => {
  console.error('演示服务启动失败：', err)
  process.exit(1)
})
