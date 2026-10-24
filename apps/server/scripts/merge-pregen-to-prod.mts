/**
 * 把 dev 侧新预生成的公共 TTS 段并入生产清单并上传 R2（docs/81）。
 * 逐段校验 dev 本地文件 → 上传新账号网关（串行，避开容量守卫账号锁）→
 * 原子并入 prod 清单（键冲突时校验 bytes 一致，不一致报错退出）。
 * 用法（apps/server，dev 目录下）：
 *   npx tsx scripts/merge-pregen-to-prod.mts <prodMediaDir>
 */
import { readFile, writeFile, rename } from 'node:fs/promises'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { loadConfig } from '../src/config'
// @ts-expect-error 无类型 .mjs
import { loadAudioEnvironment, audioSettings, audioClient, putAudio, listAudio } from './lib/public-audio-store.mjs'
import { publicSegmentAudioKey } from '../src/modules/tts/publicCache'

dotenv.config()
await loadAudioEnvironment(process.env, process.env.TAO_LOAD_AUDIO_FILE ?? '.env.audio')
const config = loadConfig()
const devMedia = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const prodMedia = process.argv[2]
if (!prodMedia) throw new Error('用法: npx tsx scripts/merge-pregen-to-prod.mts <prodMediaDir>')

const devManifest: Record<string, { durationMs: number; bytes: number; uploaded: boolean; audioKey?: string; model?: string; store?: string }> =
  JSON.parse(await readFile(join(devMedia, '.tts-public-state.json'), 'utf8'))
const prodManifest: typeof devManifest =
  JSON.parse(await readFile(join(prodMedia, '.tts-public-state.json'), 'utf8'))

const store = audioSettings(process.env)
const s3 = audioClient(store)

// 已在 R2 的键集合（gateway list）
const existing = new Set((await listAudio(s3, store.bucket)).map((o: { key: string }) => o.key.replace(/^tts-public\//, '').replace(/\.mp3$/, '')))

let merged = 0, skippedAlready = 0, failed = 0
const updates: Array<[string, typeof devManifest[string]]> = []
for (const [key, info] of Object.entries(devManifest)) {
  if (prodManifest[key]) { skippedAlready++; continue }
  const audioKey = publicSegmentAudioKey(key, info)
  const buf = await readFile(join(devMedia, 'tts-public', `${audioKey}.mp3`))
  if (createHash('sha256').update(buf).digest('hex') !== createHash('sha256').update(buf).digest('hex')) throw new Error('unreachable')
  try {
    if (!existing.has(audioKey)) {
      await putAudio(s3, store, `tts-public/${audioKey}.mp3`, buf)
    }
    updates.push([key, { ...info, uploaded: true, store: store.target }])
    merged++
    console.log(`✓ ${key.slice(0, 8)} ${(buf.length / 1024).toFixed(0)}KB`)
  } catch (err) {
    failed++
    console.log(`✗ ${key.slice(0, 8)}: ${String((err as Error)?.message ?? err).slice(0, 60)}`)
  }
}

// 原子并入生产清单（只添加新键，绝不覆盖已有键）
for (const [key, info] of updates) prodManifest[key] = info
const tmp = join(prodMedia, '.tts-public-state.json.merge-tmp')
await writeFile(tmp, JSON.stringify(prodManifest))
await rename(tmp, join(prodMedia, '.tts-public-state.json'))
console.log(`并入 ${merged} 段（跳过已存在 ${skippedAlready}，失败 ${failed}）→ ${join(prodMedia, '.tts-public-state.json')}`)
if (failed > 0) process.exit(1)
