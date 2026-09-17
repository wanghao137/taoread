/**
 * 端到端视频链路验收（docs/14 §1 视频重测 · 全链路版）。
 *
 * 起真实 server，走 HTTP 路由完成：登录 → 建家庭 → 孩子 → 生成视频任务 →
 * 轮询状态 → completed 后本地 mp4 落盘 → /api/media/ 直取校验 MIME。
 * 验证的不只是云端通，还有「下载回填 + 静态服务 content-type」这一整段。
 *
 * 用法：npx tsx scripts/probe-video-route.mjs   （在 apps/server 目录）
 */
import 'dotenv/config'
import { createDb } from '../src/lib/db.js'
import { loadConfig } from '../src/config.js'
import { buildApp } from '../src/app.js'
import { tokenSecretFrom } from '../src/modules/family/service.js'
import { IpRateLimiter } from '../src/lib/ipRateLimit.js'
import { join } from 'node:path'

const config = loadConfig()
const db = createDb('file:./probe-video-route.db')
const probeKey = async () => 'active'

const log = (m) => console.log(`[${new Date().toLocaleTimeString('zh-CN', { hour12: false })}] ${m}`)

async function main() {
  // 独立库，避免污染：推 schema 到新库（prisma migrate deploy 会建表）
  const { execSync } = await import('node:child_process')
  execSync('npx prisma db push --skip-generate --accept-data-loss', {
    stdio: 'inherit',
    env: { ...process.env, TAO_DATABASE_URL: 'file:./probe-video-route.db' },
  })

  const app = await buildApp({
    db,
    tokenSecret: tokenSecretFrom(config.TAO_MASTER_KEY),
    masterKey: config.TAO_MASTER_KEY,
    probeKey,
    ipLimiter: new IpRateLimiter({ capacity: 100_000, refillPerMinute: 100_000 }),
    // 视频依赖：与 index.ts 生产接线一致，读 .env 里的 TAO_VIDEO_*
    videoDeps: config.TAO_VIDEO_BASE && config.TAO_VIDEO_KEY
      ? { base: config.TAO_VIDEO_BASE, apiKey: config.TAO_VIDEO_KEY, model: config.TAO_VIDEO_MODEL }
      : null,
    mediaDir: join(process.cwd(), 'media'),
  })
  await app.ready()
  log('server ready')

  // 建家庭
  const fam = await app.inject({ method: 'POST', url: '/api/family', payload: { deviceId: 'probe-route' } })
  const f = fam.json()
  const headers = { authorization: `Bearer ${f.token}` }
  const child = await app.inject({
    method: 'POST', url: `/api/family/${f.familyId}/children`, headers,
    payload: { nickname: '探针娃娃', stage: '3-5' },
  })
  const childId = child.json().id
  log(`家庭 ${f.familyId} / 孩子 ${childId}`)

  const scene = 'probe:route:test'
  const desc = '一只小桃子在月光下的竹林里轻轻摇晃，萤火虫飞舞，卡通绘本风格'

  log('POST /api/video/generate（真实云端，队列满会自动退避重试）…')
  const t0 = Date.now()
  const gen = await app.inject({
    method: 'POST', url: '/api/video/generate', headers,
    payload: { scene, description: desc, seconds: 4, aspectRatio: '16:9' },
  })
  log(`generate HTTP ${gen.statusCode} (${Date.now() - t0}ms): ${gen.body.slice(0, 200)}`)
  if (gen.statusCode !== 200) { await app.close(); process.exit(1) }

  const genJson = gen.json()
  if (genJson.status === 'completed') {
    log('竟然秒完成（命中缓存），直接校验静态服务')
  }

  // 轮询状态路由
  for (let i = 1; i <= 90; i++) {
    await new Promise((r) => setTimeout(r, 5000))
    const st = await app.inject({ method: 'GET', url: `/api/video/${scene}`, headers })
    const sj = st.json()
    log(`第 ${i} 轮 HTTP ${st.statusCode}: status=${sj.status} progress=${sj.progress ?? '-'}`)
    if (sj.status === 'completed') {
      log(`✅ 视频就绪：${sj.videoUrl}`)
      // 校验本地文件 + 静态服务 content-type
      const local = await db.videoAsset.findUnique({ where: { scene } })
      log(`DB: urlPath=${local?.urlPath} bytes=${local?.bytes} model=${local?.model}`)
      // 走 HTTP 静态服务（无鉴权路由）
      const media = await app.inject({ method: 'GET', url: sj.videoUrl })
      log(`静态服务 HTTP ${media.statusCode} content-type=${media.headers['content-type']} bytes=${media.body.length}`)
      const ct = media.headers['content-type']
      if (media.statusCode === 200 && ct === 'video/mp4' && media.body.length > 100_000) {
        log('✅✅ 全链路验收通过：云端渲染 + 本地回填 + video/mp4 正确下发')
        await app.close()
        process.exit(0)
      }
      log('❌ 静态服务校验未通过')
      await app.close()
      process.exit(1)
    }
    if (sj.status === 'failed') {
      log(`❌ 云端失败：${sj.error ?? ''}`)
      await app.close()
      process.exit(1)
    }
  }
  log('轮询 90 轮（7.5 分钟）未完成')
  await app.close()
  process.exit(1)
}

void main().catch((err) => {
  console.error('探针异常：', err)
  process.exit(1)
})
