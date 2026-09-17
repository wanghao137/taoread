/**
 * 存量插画隐式标识回填（docs/13 P0-8）。
 *
 * 已落盘的 32 张 WebP 在打标能力上线前生成，这里只重写 EXIF 元数据、
 * 不重新出网生成、不重压画面（sharp 加载 WebP → 注入 EXIF → 存回）。
 *
 * 用法：cd apps/server && node scripts/label-art.mjs
 *      加 --check 只校验不写入（巡检用）
 */
import 'dotenv/config'
import { createDb } from '../src/lib/db.js'
import { loadConfig } from '../src/config.js'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { labelWebpImage, readAigcLabel } from '../src/modules/media/label.js'

const checkOnly = process.argv.includes('--check')
const config = loadConfig()
const db = createDb(config.TAO_DATABASE_URL)

const assets = await db.artAsset.findMany({ select: { scene: true, urlPath: true, model: true, kind: true } })
console.log(`存量插画 ${assets.length} 张${checkOnly ? '（仅校验）' : '（回填隐式标识）'}`)

let ok = 0
let already = 0
let fail = 0
for (const a of assets) {
  // urlPath 形如 /api/media/art/covers/xxx.webp → media/art/covers/xxx.webp
  const rel = a.urlPath.replace(/^\/api\/media\//, 'media/')
  const abs = join(process.cwd(), rel)
  let buf
  try {
    buf = await readFile(abs)
  } catch {
    console.log(`  ✗ ${a.scene}（文件缺失：${rel}）`)
    fail++
    continue
  }

  const existing = await readAigcLabel(buf)
  if (existing) {
    already++
    continue
  }

  if (checkOnly) {
    console.log(`  ⚠ ${a.scene}（未打标）`)
    continue
  }

  try {
    const labeled = await labelWebpImage(buf, {
      provider: 'taoread',
      model: a.model,
      scene: a.scene,
      kind: a.kind,
    })
    await writeFile(abs, labeled)
    const verify = await readAigcLabel(labeled)
    if (verify) {
      ok++
      console.log(`  ✓ ${a.scene}（${(labeled.length / 1024).toFixed(0)}KB）`)
    } else {
      fail++
      console.log(`  ✗ ${a.scene}（写入后校验失败）`)
    }
  } catch (err) {
    fail++
    console.log(`  ✗ ${a.scene}（${err instanceof Error ? err.message.slice(0, 80) : err}）`)
  }
}

console.log(`\n完成：新打标 ${ok}，已存在 ${already}，失败 ${fail}`)
await db.$disconnect()
process.exit(fail > 0 ? 1 : 0)
