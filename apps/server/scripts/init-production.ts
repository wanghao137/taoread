/**
 * 生产内容初始化（审计 F34/T10）：空库一条命令完成 迁移→公版书库→媒体台账。
 * 幂等可重复执行；不创建演示家庭（index.ts 启动时会反向拒绝含演示家庭的库）。
 *
 * 用法（apps/server 目录）：
 *   TAO_DATABASE_URL="file:./prod.db" npx tsx scripts/init-production.ts
 * 前置：media/ 目录已随发布同步到服务器（插画/视频台账按文件登记）。
 */
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { createDb } from '../src/lib/db'
import { seedAllPacks } from '../src/content/seed'
import { seedMediaLedger } from '../src/demo/seed-media'
import { ALL_PACKS } from '../src/content/packs'

const dbUrl = process.env.TAO_DATABASE_URL
if (!dbUrl) throw new Error('TAO_DATABASE_URL 必填（如 file:./prod.db）')

// 1) 迁移（N9-206：手工 SQL 迁移存在，禁止 migrate dev，只允许 deploy）
execSync('npx --no-install prisma migrate deploy', {
  cwd: process.cwd(),
  env: { ...process.env, TAO_DATABASE_URL: dbUrl },
  stdio: 'inherit',
})

// 2) 公版书库（幂等 upsert，重复执行不产生重复章节）
const db = createDb(dbUrl)
await seedAllPacks(db, ALL_PACKS)
console.log(`公版书库：${ALL_PACKS.length} 本已入库`)

// 3) 媒体台账（按 media/ 目录实际文件登记；缺目录时明确提示而非静默空跑）
// 目标库已随库携带台账（如从 dev.db 复制来的生产库）则跳过；真·空库需
// TAO_LEDGER_SOURCE 指向台账源库（默认 file:./dev.db，源不存在时警告而非崩溃）
const mediaDir = join(process.cwd(), 'media')
if (!existsSync(mediaDir)) {
  console.warn(`⚠️ 未找到 ${mediaDir}——插画/视频将回退 SVG，请先同步 media/ 目录后重跑本命令`)
} else {
  const ledgerRows = await db.artAsset.count()
  if (ledgerRows > 0) {
    console.log(`媒体台账：已存在 ${ledgerRows} 行（随库携带），跳过播种`)
  } else {
    const sourceUrl = process.env.TAO_LEDGER_SOURCE ?? 'file:./dev.db'
    const sourceFile = join(process.cwd(), 'prisma', sourceUrl.replace(/^file:/, ''))
    if (!existsSync(sourceFile)) {
      console.warn(`⚠️ 台账源库不存在（${sourceFile}）——封面链接将为空，插画回退 SVG；同步台账后重跑本命令`)
    } else {
      const seeded = await seedMediaLedger(db, mediaDir, sourceUrl)
      console.log(`媒体台账：+${seeded.art} 插画 / +${seeded.video} 视频`)
    }
  }
}

await db.$disconnect()
console.log('内容初始化完成')
