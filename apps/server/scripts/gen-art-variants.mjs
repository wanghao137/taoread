/**
 * 一次性任务：为存量公共插图生成 thumb(320w)/reader(800w) 变体（性能方案阶段 1）。
 * 新图由 artRoutes 落库时自动生成（media/variants.ts），本脚本只补历史存量。
 *
 * 用法（apps/server 目录）：node --import tsx scripts/gen-art-variants.mjs
 * 幂等：已存在的变体跳过；失败单个记录继续，结尾汇总。
 */
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const mediaDir = process.env.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const dirs = ['art/covers', 'art/chapters']

let created = 0
let skipped = 0
let failed = 0
let t0 = Date.now()

for (const dir of dirs) {
  const abs = join(mediaDir, dir)
  if (!existsSync(abs)) continue
  for (const name of readdirSync(abs)) {
    if (!name.endsWith('.webp') || /\.(thumb|reader)\.webp$/.test(name)) continue
    const base = join(abs, name)
    for (const { suffix, width } of [
      { suffix: 'thumb', width: 320 },
      { suffix: 'reader', width: 800 },
    ]) {
      const out = base.replace(/\.webp$/, `.${suffix}.webp`)
      if (existsSync(out) && statSync(out).size > 0) {
        skipped++
        continue
      }
      try {
        await sharp(base).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
        created++
      } catch (err) {
        failed++
        console.error(`[variants] FAIL ${dir}/${name} ${suffix}: ${err.message}`)
      }
      if ((created + skipped) % 400 === 0) {
        console.log(`[variants] 进度 ${created + skipped}（新建 ${created}） ${Math.round((Date.now() - t0) / 1000)}s`)
      }
    }
  }
}
console.log(`[variants] 完成：新建 ${created}，已存在跳过 ${skipped}，失败 ${failed}，耗时 ${Math.round((Date.now() - t0) / 1000)}s`)
if (failed > 0) process.exitCode = 1
