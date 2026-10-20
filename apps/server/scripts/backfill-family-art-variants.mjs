/**
 * 家庭素材缩图档回填（2026-10-20 书架性能修复）。
 *
 * 背景：家庭书 AI 插画由 gen-family-art 直写盘，历史版本没挂变体钩子——
 * 存量封面/题图没有 thumb(320w)/reader(800w) 档，书架只能下发 2K 原图
 * （300-400KB/张，公网单张实测 33s，移动端集体超时裂图）。
 * 本脚本为全部 fam: 素材与 fam-import 提取封面补产变体；幂等（已有即跳过）。
 *
 * 用法（对生产实例，env 用生产 .env 提供 DATABASE_URL 与 TAO_MEDIA_DIR）：
 *   node --env-file=D:\taoread-prod\apps\server\.env --import tsx \
 *     scripts/backfill-family-art-variants.mjs
 */
import { readdir, rename, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { PrismaClient } from '@prisma/client'
import sharp from 'sharp'
import { loadConfig } from '../src/config.ts'
import { writeArtVariants } from '../src/modules/media/variants.ts'

const p = new PrismaClient()
const config = loadConfig()
const mediaDir = config.TAO_MEDIA_DIR
let made = 0
let skipped = 0
let missing = 0

// 注意：不要与 gen-family-art.mjs 并行运行（避免对同一变体文件并发写）
const rows = await p.artAsset.findMany({ where: { scene: { startsWith: 'fam:' } }, select: { urlPath: true } })
for (const { urlPath } of rows) {
  // png 基底跳过：writeArtVariants 对 png 直接跳过（按文件名 .webp$ 替换会原地覆盖原图）
  if (!urlPath.endsWith('.webp')) { console.log(`↷ 非 webp 基底 ${urlPath}`); continue }
  const abs = join(mediaDir, urlPath.slice('/api/media/'.length))
  // thumb 与 reader 双档齐全才算已完成（半档状态必须重产，否则静默回退 2K 原图）
  let complete = true
  for (const suffix of ['thumb', 'reader']) {
    try { await stat(abs.replace(/\.webp$/, `.${suffix}.webp`)) } catch { complete = false }
  }
  if (complete) { skipped += 1; continue }
  try {
    await stat(abs)
  } catch {
    missing += 1
    continue
  }
  try {
    await writeArtVariants(abs)
    made += 1
  } catch (error) {
    console.log(`✗ ${urlPath}：${String(error?.message ?? error).slice(0, 80)}`)
  }
}

// fam-import 提取封面（480w）→ cover.thumb.webp（320w 书架档），临时文件 + rename 原子落盘
const dirs = await readdir(join(mediaDir, 'fam-import')).catch(() => [])
for (const hex of dirs) {
  const base = join(mediaDir, 'fam-import', hex, 'cover.webp')
  const thumb = join(mediaDir, 'fam-import', hex, 'cover.thumb.webp')
  try { await stat(thumb); skipped += 1; continue } catch { /* 需要生成 */ }
  try { await stat(base) } catch { continue }
  const tmp = `${thumb}.tmp-${process.pid}`
  try {
    await sharp(base).resize({ width: 320, withoutEnlargement: true }).webp({ quality: 80 }).toFile(tmp)
    await rename(tmp, thumb)
    made += 1
  } catch (error) {
    console.log(`✗ fam-import/${hex}：${String(error?.message ?? error).slice(0, 80)}`)
  }
}
console.log(`回填完成：新产 ${made}，已有 ${skipped}，素材缺失 ${missing}`)
await p.$disconnect()
