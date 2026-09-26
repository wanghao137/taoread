/**
 * 一次性修复：旧 parseMp3 对 MPEG-2/2.5 音频把时长算成一半（帧长系数 144 应为 72）。
 * 用修复后的解析器重算：
 *   1. 家庭缓存 media/tts/**／*.json 的 durationMs；
 *   2. 公共预生成清单 media/.tts-public-state.json 的 durationMs。
 * 幂等：重算值与现值一致（±2%）即跳过。运行时无需重启——公共清单按 mtime 惰性重载，
 * 家庭缓存 .json 在 cache.get 时重读。
 *
 * 用法（apps/server 目录）：node --import tsx scripts/fix-tts-durations.mjs
 */
import { readdirSync, readFileSync, existsSync, writeFileSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { parseMp3 } from '../src/modules/tts/mp3duration.ts'

const mediaDir = process.env.TAO_MEDIA_DIR || join(process.cwd(), 'media')

function log(m) {
  console.log(`[fixdur ${new Date().toISOString()}] ${m}`)
}

function fixedDuration(absMp3) {
  const buf = readFileSync(absMp3)
  const info = parseMp3(buf)
  return info?.durationMs ?? null
}

function close(a, b) {
  return Math.abs(a - b) <= Math.max(200, b * 0.02)
}

// ── 1. 家庭缓存 .json ──
let fixed = 0
let checked = 0
const ttsDir = join(mediaDir, 'tts')
if (existsSync(ttsDir)) {
  for (const sub of readdirSync(ttsDir)) {
    const subAbs = join(ttsDir, sub)
    for (const name of readdirSync(subAbs)) {
      if (!name.endsWith('.mp3')) continue
      const mp3 = join(subAbs, name)
      const json = mp3.slice(0, -4) + '.json'
      if (!existsSync(json)) continue
      checked++
      const d = fixedDuration(mp3)
      if (d === null) continue
      try {
        const meta = JSON.parse(readFileSync(json, 'utf8'))
        if (typeof meta.durationMs === 'number' && !close(meta.durationMs, d)) {
          meta.durationMs = d
          const tmp = json + '.tmp'
          writeFileSync(tmp, JSON.stringify(meta))
          renameSync(tmp, json)
          fixed++
        }
      } catch { /* 坏元数据跳过 */ }
    }
  }
}
log(`家庭缓存：检查 ${checked}，修正 ${fixed}`)

// ── 2. 公共预生成清单 ──
const manifestPath = join(mediaDir, '.tts-public-state.json')
let pubFixed = 0
let pubChecked = 0
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const pubDir = join(mediaDir, 'tts-public')
  for (const [key, info] of Object.entries(manifest)) {
    const mp3 = join(pubDir, `${key}.mp3`)
    if (!existsSync(mp3)) continue
    pubChecked++
    const d = fixedDuration(mp3)
    if (d === null || close(info.durationMs ?? 0, d)) continue
    manifest[key].durationMs = d
    pubFixed++
  }
  const tmp = manifestPath + '.tmp'
  writeFileSync(tmp, JSON.stringify(manifest))
  renameSync(tmp, manifestPath)
}
log(`公共清单：检查 ${pubChecked}，修正 ${pubFixed}`)
