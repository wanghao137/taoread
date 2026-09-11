import 'dotenv/config'
import { loadConfig } from './config'
import { buildApp } from './app'
import { createDb } from './lib/db'
import { tokenSecretFrom } from './modules/family/service'
import { startWeeklyReportScheduler } from './modules/reports/routes'

async function main(): Promise<void> {
  const config = loadConfig()
  const db = createDb(config.TAO_DATABASE_URL)
  const app = await buildApp({
    db,
    tokenSecret: tokenSecretFrom(config.TAO_MASTER_KEY),
    masterKey: config.TAO_MASTER_KEY,
    allowedOrigin: config.TAO_ALLOWED_ORIGIN === '*' ? true : config.TAO_ALLOWED_ORIGIN,
    bedTimeMin: config.TAO_BEDTIME === 'off' ? null : config.TAO_BEDTIME,
    logger: true,
  })
  // 周报调度：周日 19:00（服务器本地时间）为全部家庭生成当周周报（幂等 upsert）
  startWeeklyReportScheduler(db)
  await app.listen({ port: config.PORT, host: '0.0.0.0' })
}

main().catch((err) => {
  console.error('服务启动失败：', err)
  process.exit(1)
})
