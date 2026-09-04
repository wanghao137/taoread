import 'dotenv/config'
import { loadConfig } from './config'
import { buildApp } from './app'

async function main(): Promise<void> {
  const config = loadConfig()
  const app = await buildApp({
    allowedOrigin: config.TAO_ALLOWED_ORIGIN === '*' ? true : config.TAO_ALLOWED_ORIGIN,
    logger: true,
  })
  await app.listen({ port: config.PORT, host: '0.0.0.0' })
}

main().catch((err) => {
  console.error('服务启动失败：', err)
  process.exit(1)
})
