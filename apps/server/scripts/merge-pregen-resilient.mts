/**
 * 弱网自愈上传：把 dev 预生成的公共 TTS 段并入生产并上传 R2。
 * 每段独立 fetch + 退避重试；整轮失败则等待下一轮（进程常驻直至完成/上限）。
 * 网关间歇性断流（docs/80/81 实测）不致命——已完成段记录在 dev 清单。
 * 用法（apps/server）：TAO_AUDIO_ENV=<prod .env.audio 路径> npx tsx scripts/merge-pregen-resilient.mts <prodMediaDir> [maxRounds=30]
 */
import 'dotenv/config'
import { readFile, writeFile, rename } from 'node:fs/promises'
import { join } from 'node:path'
import { loadConfig } from '../src/config'
// @ts-expect-error 无类型 .mjs
import { loadAudioEnvironment, audioSettings, audioClient, putAudio, listAudio } from './lib/public-audio-store.mjs'
import { publicSegmentAudioKey } from '../src/modules/tts/publicCache'

const prodMedia = process.argv[2]
if (!prodMedia) throw new Error('用法: npx tsx scripts/merge-pregen-resilient.mts <prodMediaDir> [maxRounds]')
const maxRounds = Number(process.argv[3] ?? 30)
const audioEnv = process.env.TAO_AUDIO_ENV
if (!audioEnv) throw new Error('TAO_AUDIO_ENV 必填（指向生产的 .env.audio）')

await loadAudioEnvironment(process.env, audioEnv)
const config = loadConfig()
const devMedia = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const devManifestPath = join(devMedia, '.tts-public-state.json')
const prodManifestPath = join(prodMedia, '.tts-public-state.json')

let store, s3
for (let attempt = 0; attempt < 5; attempt++) {
  try {
    store = audioSettings(process.env)
    s3 = audioClient(store)
    await listAudio(s3, store.bucket) // 连通性探针
    break
  } catch (err) {
    console.log(`[${new Date().toISOString()}] 网关连通失败（第 ${attempt + 1} 次）: ${String((err as Error & { cause?: { message?: string } })?.cause?.message ?? (err as Error)?.message ?? err).slice(0, 80)}`)
    if (attempt === 4) throw err
    await new Promise(r => setTimeout(r, 15_000 * (attempt + 1)))
  }
}

const devManifest: Record<string, { durationMs: number; bytes: number; uploaded: boolean; audioKey?: string; model?: string; store?: string }> =
  JSON.parse(await readFile(devManifestPath, 'utf8'))
const prodManifest: typeof devManifest = JSON.parse(await readFile(prodManifestPath, 'utf8'))

// 断点：dev 清单里 uploaded=true 的段视为已上传；每段上传成功即写 dev 清单
let done = 0, failedKeys = new Set<string>()
for (const [key, info] of Object.entries(devManifest)) {
  if (!info.uploaded && prodManifest[key]?.uploaded) info.uploaded = true
  if (info.uploaded) done++
}
console.log(`待上传 ${Object.keys(devManifest).length - done} / ${Object.keys(devManifest).length} 段`)

const log = (m: string) => console.log(`[${new Date().toISOString()}] ${m}`)

for (let round = 1; round <= maxRounds; round++) {
  const pending = Object.entries(devManifest).filter(([, v]) => !v.uploaded)
  if (pending.length === 0) break
  log(`第 ${round} 轮：待传 ${pending.length} 段`)
  for (const [key, info] of pending) {
    const audioKey = publicSegmentAudioKey(key, info)
    const path = `tts-public/${audioKey}.mp3`
    const buf = await readFile(join(devMedia, 'tts-public', `${audioKey}.mp3`))
    let ok = false
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      try {
        await putAudio(s3!, store, path, buf)
        ok = true
      } catch (err) {
        const msg = String((err as Error & { cause?: { message?: string } })?.cause?.message ?? (err as Error)?.message ?? err).slice(0, 70)
        if (String((err as Error)?.message ?? '').includes('already has different bytes')) { log(`✗ ${key.slice(0, 8)} 冲突: ${msg}`); break }
        log(`  重试 ${attempt + 1}/3 ${key.slice(0, 8)}: ${msg}`)
        await new Promise(r => setTimeout(r, 8_000 * (attempt + 1)))
      }
    }
    if (ok) {
      info.uploaded = true
      info.store = store.target
      done++
      log(`✓ ${key.slice(0, 8)} ${(buf.length / 1024).toFixed(0)}KB（剩 ${Object.keys(devManifest).length - done}）`)
      // 每段成功即原子写 dev 清单（断点）
      const tmp = `${devManifestPath}.tmp-${Date.now()}`
      await writeFile(tmp, JSON.stringify(devManifest))
      await rename(tmp, devManifestPath)
    } else {
      failedKeys.add(key)
    }
  }
  if (pending.length > 0 && Object.values(devManifest).some(v => !v.uploaded)) {
    log(`本轮结束，等 60s 进下一轮`)
    await new Promise(r => setTimeout(r, 60_000))
  }
}

// 全部完成后原子并入生产清单
const remaining = Object.entries(devManifest).filter(([, v]) => !v.uploaded)
if (remaining.length === 0) {
  for (const [key, info] of Object.entries(devManifest)) {
    if (!prodManifest[key]) prodManifest[key] = info
  }
  const tmp = `${prodManifestPath}.merge-tmp`
  await writeFile(tmp, JSON.stringify(prodManifest))
  await rename(tmp, prodManifestPath)
  log(`✅ 全部 ${Object.keys(devManifest).length} 段完成，已并入生产清单（${Object.keys(prodManifest).length} 段）`)
} else {
  log(`⏸ 上限轮次到，剩余 ${remaining.length} 段未传；已传段保留断点，重跑本脚本续传`)
  process.exit(1)
}
