/**
 * 公共书库 TTS 预生成（性能方案阶段 2，2026-09-25）。
 *
 * 离线把全书库可读文本按「与整章合成完全一致的切分/音色/语速/模型」合成 mp3，
 * 落盘 media/tts-public/<key>.mp3 + 上传 R2 + 写清单 media/.tts-public-state.json。
 * 运行中的服务通过清单惰性重载直接命中（秒回、不计家庭配额、不写归属）。
 *
 * 与运行时一致的保证：chunkText / cacheKey(text,voice,speed,'mp3',lang,'__public__',model) /
 * DEFAULT_VOICE_ID / DEFAULT_SPEED / clampSpeed 全部直接 import 自 src。
 *
 * 用法（apps/server 目录）：
 *   node --import tsx scripts/pregen-tts.mjs [--book=slug1,slug2] [--stage=3-5,6-8]
 *        [--concurrency=4] [--no-upload] [--limit=N]
 * 断点续跑：清单里已有的 key 跳过。上传失败标记 uploaded=false，服务端回源站兜底，
 * 重跑本脚本（或 --retry-upload）可补传。
 */
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { loadConfig } from '../src/config.ts'
import { chunkText, synthesizeSegment, TtsError } from '../src/modules/tts/client.ts'
import { cacheKey } from '../src/modules/tts/cache.ts'
import { DEFAULT_VOICE_ID, findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { TTS_PUBLIC_NS } from '../src/modules/tts/publicCache.ts'
import { parseMp3 } from '../src/modules/tts/mp3duration.ts'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText.ts'

dotenv.config()
const databaseUrl = process.env.TAO_DATABASE_URL
dotenv.config({ path: '.env.r2', override: true })
// Historical media credentials files can contain a dev DB URL. Never replace
// the explicitly selected production/staging database while loading R2 keys.
if (databaseUrl) process.env.TAO_DATABASE_URL = databaseUrl

const config = loadConfig()
if (!config.TTS_BASE || !config.TTS_API_KEY) throw new Error('TTS 未配置（TTS_BASE/TTS_API_KEY）')
const model = config.TTS_MODEL || 'stepaudio-3-gen-preview'
const mediaDir = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const outDir = join(mediaDir, 'tts-public')
const manifestPath = join(mediaDir, '.tts-public-state.json')

// ── R2 上传（凭据来自 .env.r2；未配置或 --no-upload 时仅落盘）──
const accountId = process.env.R2_ACCOUNT_ID
const accessKey = process.env.R2_ACCESS_KEY_ID
const secretKey = process.env.R2_SECRET_ACCESS_KEY
const mediaBucket = process.env.TAO_R2_MEDIA_BUCKET || 'taoread-media'
const wantUpload = !process.argv.includes('--no-upload') && accountId && accessKey && secretKey
let s3 = null
if (wantUpload) {
  const { S3Client } = await import('@aws-sdk/client-s3')
  s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  })
}

const arg = (name) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.split('=').slice(1).join('=') : undefined
}
const stageFilter = arg('stage')?.split(',').filter(Boolean) ?? null
const bookFilter = arg('book')?.split(',').filter(Boolean) ?? null
const concurrency = Math.max(1, Math.min(8, Number(arg('concurrency') ?? 4)))
const limit = arg('limit') ? Number(arg('limit')) : Infinity
const retryUploadOnly = process.argv.includes('--retry-upload')
const langFilter = arg('lang') ?? null // 'zh' | 'en'：只处理某语言的书的预生成
const voiceOverride = arg('voice') ?? null // 指定音色（如 en-storyteller 重合成英文书）

// 音色默认值与运行时同源（chapterText.speakVoiceId）：--lang=en 不带 --voice 时
// 自动用英文默认音色，避免生成一批运行时永远请求不到的 mom-warm 英文键
const voice = findVoice(voiceOverride ?? (langFilter === 'en' ? speakVoiceId('en') : DEFAULT_VOICE_ID))
const speed = DEFAULT_SPEED

function log(msg) {
  console.log(`[pregen ${new Date().toISOString()}] ${msg}`)
}

// ── 清单（原子写）──
let manifest = {}
if (existsSync(manifestPath)) {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
}
let manifestDirty = false
async function saveManifest() {
  if (!manifestDirty) return
  const tmp = `${manifestPath}.${Math.random().toString(36).slice(2, 8)}.tmp`
  const data = JSON.stringify(manifest)
  // 服务端 PublicTtsIndex 可能正持有清单句柄：rename 竞争 EPERM 时退避重试，兜底直接写
  for (let attempt = 0; ; attempt++) {
    try {
      await writeFile(tmp, data)
      await rename(tmp, manifestPath)
      manifestDirty = false
      return
    } catch (err) {
      if (err?.code !== 'EPERM' || attempt >= 6) {
        try { await writeFile(manifestPath, data); manifestDirty = false; return } catch { if (attempt >= 8) throw err }
      }
      await new Promise((r) => setTimeout(r, 250 * (attempt + 1)))
    }
  }
}

async function uploadR2(key, buf) {
  const { PutObjectCommand } = await import('@aws-sdk/client-s3')
  await s3.send(new PutObjectCommand({
    Bucket: mediaBucket,
    Key: `tts-public/${key}.mp3`,
    Body: buf,
    ContentType: 'audio/mpeg',
    CacheControl: 'public, max-age=31536000, immutable',
  }))
}

/** 合成+落盘+上传+记账；返回 'ok' | 'skip' | 'fail' */
async function ensureSegment(key, text, lang) {
  if (retryUploadOnly) {
    const info = manifest[key]
    if (!info || info.uploaded || !s3) return 'skip'
    try {
      const { readFile: rf } = await import('node:fs/promises')
      await uploadR2(key, await rf(join(outDir, `${key}.mp3`)))
      info.uploaded = true
      manifestDirty = true
      return 'ok'
    } catch (err) {
      log(`上传失败 ${key.slice(0, 8)}: ${err.message?.slice(0, 80)}`)
      return 'fail'
    }
  }
  if (manifest[key]) return 'skip'
  for (let attempt = 1; ; attempt++) {
    try {
      const out = await synthesizeSegment(
        { base: config.TTS_BASE, apiKey: config.TTS_API_KEY, model, fetch: undefined },
        { text, voice, speed, lang, format: 'mp3' },
      )
      const info = parseMp3(out.audio)
      const durationMs = info?.durationMs ?? 0
      await mkdir(outDir, { recursive: true })
      const { writeFile: wf } = await import('node:fs/promises')
      await wf(join(outDir, `${key}.mp3`), out.audio)
      const rec = { durationMs, bytes: out.audio.length, uploaded: false }
      if (s3) {
        try {
          await uploadR2(key, out.audio)
          rec.uploaded = true
        } catch (err) {
          log(`上传失败（本地已存）${key.slice(0, 8)}: ${err.message?.slice(0, 80)}`)
        }
      }
      manifest[key] = rec
      manifestDirty = true
      return 'ok'
    } catch (err) {
      const retryable = err instanceof TtsError || attempt < 3
      if (!retryable || attempt >= 3) {
        log(`合成失败（放弃）${key.slice(0, 8)}: ${err.message?.slice(0, 100)}`)
        return 'fail'
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt))
    }
  }
}

const db = new PrismaClient({ datasources: { db: { url: config.TAO_DATABASE_URL } } })
let done = 0
let failed = 0
let skipped = 0
let t0 = Date.now()

try {
  // 简单分步查询（嵌套 select+where+orderBy 在 sqlite 引擎上会触发 panic，且逐本查询便于限流）
  const bookRows = await db.book.findMany({
    ...(stageFilter ? { where: { ageStage: { in: stageFilter } } } : {}),
    ...(langFilter ? { where: { lang: langFilter } } : {}),
    select: { id: true, lang: true },
  })
  const ordered = bookFilter ? bookRows.filter((b) => bookFilter.includes(b.id)) : bookRows
  log(`书库 ${ordered.length} 本（stage=${stageFilter?.join(',') ?? '全部'}，音色=${voice.id}，语速=${speed}，模型=${model}，R2=${s3 ? mediaBucket : '关闭'}）`)

  let budget = limit
  outer: for (const book of ordered) {
    const lang = book.lang === 'en' ? 'en' : 'zh'
    const chapters = await db.chapter.findMany({
      where: { bookId: book.id },
      orderBy: { order: 'asc' },
      select: { id: true },
    })
    for (const ch of chapters) {
      // 与运行时完全同源：取文口径 = chapterText.chapterSpeakText（键空间单一事实源）。
      // 英文书的默认音色是 en-storyteller（chapterText.speakVoiceId）——用 --lang=en
      // --voice=en-storyteller 单独跑一遍，否则英文书键不匹配（覆盖率脚本会卡关）
      const blocks = await db.block.findMany({
        where: { chapterId: ch.id },
        orderBy: { order: 'asc' },
        select: { kind: true, text: true },
      })
      const fullText = chapterSpeakText(blocks)
      if (!fullText.trim()) continue
      const segments = chunkText(fullText)
      const pending = []
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i]
        const key = cacheKey(seg, voice.id, speed, 'mp3', lang, TTS_PUBLIC_NS, model)
        if (manifest[key] && !(retryUploadOnly && !manifest[key].uploaded)) continue
        pending.push({ key, seg, lang })
      }
      if (pending.length === 0) continue
      log(`《${book.id}》待生成 ${pending.length} 段`)
      let idx = 0
      const workers = Array.from({ length: Math.min(concurrency, pending.length) }, async () => {
        while (idx < pending.length) {
          if (budget <= 0) return
          const job = pending[idx++]
          const r = await ensureSegment(job.key, job.seg, job.lang)
          if (r === 'ok') { done++; budget--; if (manifestDirty) await saveManifest() }
          else if (r === 'skip') skipped++
          else failed++
          if ((done + failed) % 25 === 0 && done + failed > 0) {
            const rate = (done + failed) / ((Date.now() - t0) / 60000)
            log(`进度：完成 ${done} / 失败 ${failed} / 跳过 ${skipped}（${rate.toFixed(1)} 段/分钟）`)
          }
        }
      })
      await Promise.all(workers)
      if (budget <= 0) break outer
    }
  }
  await saveManifest()
  log(`结束：完成 ${done}，失败 ${failed}，跳过 ${skipped}，耗时 ${Math.round((Date.now() - t0) / 60000)} 分钟`)
  if (failed > 0) process.exitCode = 1
} finally {
  await db.$disconnect()
}
