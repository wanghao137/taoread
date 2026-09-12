/**
 * 演示模式入口（`npm run demo`）：
 * TAO_DEMO=1 语义 = mock 网关 + 种子家庭 DEMO8888 + 就寝窗关闭。
 * 环境变量缺失时使用演示内置主密钥（仅本地演示，不用于生产）。
 */
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { loadConfig } from '../config'
import { buildApp } from '../app'
import { createDb } from '../lib/db'
import { tokenSecretFrom } from '../modules/family/service'
import { createDemoGateway } from './mock-gateway'
import { seedDemoFamily, DEMO_FAMILY_CODE } from './seed'

async function main(): Promise<void> {
  const config = loadConfig()
  // 演示库自迁移：全新环境零配置可跑（demo 指向独立 sqlite 文件时自动建表）
  execSync('npx --no-install prisma migrate deploy', {
    cwd: process.cwd(),
    env: { ...process.env, TAO_DATABASE_URL: config.TAO_DATABASE_URL },
    stdio: 'pipe',
  })
  const db = createDb(config.TAO_DATABASE_URL)
  const masterKey = config.TAO_MASTER_KEY
  const app = await buildApp({
    db,
    tokenSecret: tokenSecretFrom(masterKey),
    masterKey,
    probeKey: async () => 'active', // 演示模式：绑定探针恒成功
    wereadCall: () => createDemoGateway(), // 演示模式：mock 网关（零真实出网，全家庭同一数据源）
    bedTimeMin: null, // 演示不受就寝窗限制，完整链路可走
    allowedOrigin: config.TAO_ALLOWED_ORIGIN === '*' ? true : config.TAO_ALLOWED_ORIGIN,
    logger: false,
  })

  const familyId = await seedDemoFamily(db)

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
