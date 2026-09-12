import 'dotenv/config'
import { loadConfig } from './config'
import { buildApp } from './app'
import { createDb } from './lib/db'
import { tokenSecretFrom } from './modules/family/service'
import { startWeeklyReportScheduler } from './modules/reports/routes'

async function main(): Promise<void> {
  const config = loadConfig()
  const db = createDb(config.TAO_DATABASE_URL)
  // N11-001 反向守卫：本入口使用真实网关。库内若存在演示家庭（PEACH888），
  // 说明误将演示库交给真实服务——演示 key 会经真实网关出网，必须拒绝启动。
  const demoLeak = await db.family.findUnique({ where: { code: 'PEACH888' }, select: { id: true } })
  if (demoLeak) {
    console.error('拒绝启动：当前库包含演示家庭（PEACH888）。请使用 npm run demo 入口，或更换 TAO_DATABASE_URL。')
    process.exit(1)
  }
  const app = await buildApp({
    db,
    tokenSecret: tokenSecretFrom(config.TAO_MASTER_KEY),
    masterKey: config.TAO_MASTER_KEY,
    allowedOrigin: config.TAO_ALLOWED_ORIGIN === '*' ? true : config.TAO_ALLOWED_ORIGIN,
    bedTimeMin: config.TAO_BEDTIME === 'off' ? null : config.TAO_BEDTIME,
    logger: true,
  })
  // 周报调度：周日 19:00–20:00（服务器本地时间）为全部家庭生成当周周报（幂等 upsert）
  startWeeklyReportScheduler(db)
  const gateState =
    config.TAO_BEDTIME === 'off'
      ? '已关闭（TAO_BEDTIME=off）'
      : '就寝时刻 ' + config.TAO_BEDTIME + ' 分钟（家庭级设置可覆盖）'
  console.log('[护眼闸]', gateState)
  await app.listen({ port: config.PORT, host: '0.0.0.0' })
}

main().catch((err) => {
  console.error('服务启动失败：', err)
  process.exit(1)
})
