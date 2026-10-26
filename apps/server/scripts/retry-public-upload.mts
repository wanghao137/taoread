/**
 * 定向补传：把清单里 uploaded=false 的公共 TTS 段传到 R2（短超时+多轮）。
 * 背景（docs/80）：百家姓 9 段合成成功但 R2 上传受国际网抖动影响半数失败；
 * 回源站走家庭上行 ~95KB/s，300KB 段≈3s——正是 iPad 首听延迟的量级。
 * 用法（apps/server）：npx tsx scripts/retry-public-upload.mts [rounds=6]
 */
import { readFile, writeFile, rename } from 'node:fs/promises'
import { join } from 'node:path'
import dotenv from 'dotenv'
import { loadConfig } from '../src/config'
// @ts-expect-error 无类型 .mjs（与 pregen-tts.mjs 同源）
import { loadAudioEnvironment, audioSettings, audioClient, putAudio } from './lib/public-audio-store.mjs'
import { publicSegmentAudioKey } from '../src/modules/tts/publicCache'

dotenv.config()
await loadAudioEnvironment(process.env)
const config = loadConfig()
const mediaDir = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const manifestPath = join(mediaDir, '.tts-public-state.json')
const outDir = join(mediaDir, 'tts-public')
const store = audioSettings(process.env)
const s3 = audioClient(store)
const rounds = Number(process.argv[2] ?? 6)

type SegInfo = { durationMs: number; bytes: number; uploaded: boolean; audioKey?: string; model?: string; store?: string }
const manifest: Record<string, SegInfo> =
  JSON.parse(await readFile(manifestPath, 'utf8'))

const pending = Object.entries(manifest).filter(([, v]) => !v.uploaded)
console.log(`待补传 ${pending.length} 段，最多 ${rounds} 轮`)
let uploaded = 0
for (let round = 1; round <= rounds && uploaded < pending.length; round++) {
  const batch = pending.filter(([, v]) => !v.uploaded)
  console.log(`第 ${round} 轮：${batch.length} 段`)
  // docs/80 教训：并发上传会在容量守卫的账号锁上互相超时（每笔上传持锁可数分钟）——串行
  const results = [] as Array<PromiseSettledResult<string>>
  for (const [key, info] of batch) {
    try {
      const audioKey = publicSegmentAudioKey(key, info)
      const buf = await readFile(join(outDir, `${audioKey}.mp3`))
      await putAudio(s3, store, `tts-public/${audioKey}.mp3`, buf)
      results.push({ status: 'fulfilled', value: key })
    } catch (err) {
      results.push({ status: 'rejected', reason: err })
    }
  }
  for (let i = 0; i < results.length; i++) {
    const r = results[i]!
    if (r.status === 'fulfilled') {
      const key = r.value
      manifest[key]!.uploaded = true
      manifest[key]!.store = store.target
      uploaded++
      console.log(`  ✓ ${key.slice(0, 8)}`)
    } else {
      console.log(`  ✗ ${batch[i]![0].slice(0, 8)}: ${String(r.reason?.message ?? r.reason).slice(0, 60)}`)
    }
  }
  if (batch.some(([, v]) => v.uploaded)) {
    const tmp = `${manifestPath}.retry-${Date.now()}.tmp`
    await writeFile(tmp, JSON.stringify(manifest))
    await rename(tmp, manifestPath).catch(async () => { await writeFile(manifestPath, JSON.stringify(manifest)) })
    console.log('清单已保存')
  }
  if (uploaded < pending.length) await new Promise(r => setTimeout(r, 3000))
}
const still = pending.length - uploaded
console.log(`完成：成功 ${uploaded}，剩余 ${still}`)
process.exit(still === 0 ? 0 : 1)
