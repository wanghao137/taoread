/**
 * docs/35 A3：插画变体完整性审计。
 * 本地：art/{covers,chapters}/ 下每个主图 *.webp（非变体、非 fam-）都应有 .thumb.webp 与 .reader.webp。
 * 远端：对缺失/抽样变体做 R2 HEAD（公共域），验证边缘可达。
 * 用法：node audit-art-variants.mjs [--media <dir>] [--r2-sample N]
 */
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const mediaDir = process.argv.includes('--media')
  ? process.argv[process.argv.indexOf('--media') + 1]
  : 'D:/taoread-prod/apps/server/media'
const sampleN = process.argv.includes('--r2-sample') ? Number(process.argv[process.argv.indexOf('--r2-sample') + 1]) : 30
const publicBase = process.env.TAO_MEDIA_PUBLIC_BASE || 'https://media.taostudioai.com'

const dirs = ['art/covers', 'art/chapters', 'art/mascots']
let total = 0
let missing = []
for (const d of dirs) {
  const dir = join(mediaDir, d)
  if (!existsSync(dir)) continue
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.webp')) continue
    if (f.includes('.thumb.') || f.includes('.reader.')) continue
    if (f.startsWith('fam-')) continue
    total++
    const base = join(dir, f)
    const thumb = base.replace(/\.webp$/, '.thumb.webp')
    const reader = base.replace(/\.webp$/, '.reader.webp')
    const miss = []
    if (!existsSync(thumb) || statSync(thumb).size === 0) miss.push('thumb')
    if (!existsSync(reader) || statSync(reader).size === 0) miss.push('reader')
    if (miss.length) missing.push(`${d}/${f}: ${miss.join('+')}`)
  }
}
console.log(`本地主图（非 fam）: ${total}，缺变体: ${missing.length}`)
if (missing.length) {
  console.log(missing.slice(0, 40).join('\n'))
  if (missing.length > 40) console.log(`…另有 ${missing.length - 40} 个`)
}

// R2 可达性抽查：从完整变体中随机抽 N 个 HEAD
const pool = []
for (const d of dirs) {
  const dir = join(mediaDir, d)
  if (!existsSync(dir)) continue
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.reader.webp') && !f.startsWith('fam-')) pool.push(`${d}/${f}`)
  }
}
console.log(`\nR2 抽查（reader 变体池 ${pool.length} 个，抽 ${Math.min(sampleN, pool.length)}）…`)
let ok = 0
let bad = []
for (const rel of pool.sort(() => Math.random() - 0.5).slice(0, sampleN)) {
  const url = `${publicBase}/${rel.replaceAll('\\', '/')}`
  try {
    const res = await fetch(url, { method: 'HEAD' })
    if (res.ok) ok++
    else bad.push(`${rel} → HTTP ${res.status}`)
  } catch (err) {
    bad.push(`${rel} → ${err instanceof Error ? err.message : err}`)
  }
}
console.log(`R2 HEAD: ${ok}/${Math.min(sampleN, pool.length)} 可达`)
if (bad.length) console.log(bad.join('\n'))
console.log(missing.length === 0 && bad.length === 0 ? '\nAUDIT PASS' : '\nAUDIT GAPS FOUND')
process.exit(missing.length === 0 ? 0 : 2)
