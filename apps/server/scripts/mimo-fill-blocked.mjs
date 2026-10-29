/**
 * MiMo TTS 补生成被 StepAudio 451 拦截的段（用户指令 2026-10-25）。
 *
 * 用法：cd apps/server && node --import tsx scripts/mimo-fill-blocked.mjs --book=slug1,slug2
 * 密钥：apps/server/.env.mimo 里 MIMO_KEY=sk-...（不入 git）
 *
 * 与 pregen-tts.mjs 完全一致的落盘/清单/上传约定：
 *   文件 media/tts-public/<key>.mp3，清单键=cacheKey，记录 {durationMs,bytes,uploaded,store}，
 *   上传公共音频桶 tts-public/<key>.mp3；运行中服务清单惰性重载即命中。
 * 音色：英文 Mia / 中文 茉莉（MiMo 预置），mimo-v2.5-tts 非流式 WAV 24k → ffmpeg 转 mp3 64k。
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { chunkText } from '../src/modules/tts/client.ts'
import { cacheKey } from '../src/modules/tts/cache.ts'
import { DEFAULT_SPEED, findVoice } from '../src/modules/tts/voices.ts'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText.ts'
import { parseMp3 } from '../src/modules/tts/mp3duration.ts'
import { loadAudioEnvironment, audioSettings, audioClient, putAudio } from './lib/public-audio-store.mjs'

// lamejs 1.2.1 需要先注入内部模块（issue #86 workaround）
globalThis.MPEGMode = (await import('lamejs/src/js/MPEGMode.js')).default
globalThis.Lame = (await import('lamejs/src/js/Lame.js')).default
globalThis.BitStream = (await import('lamejs/src/js/BitStream.js')).default
const lamejs = (await import('lamejs')).default ?? (await import('lamejs'))

const __dirname = dirname(fileURLToPath(import.meta.url))
const MIMO_BASE = 'https://api.xiaomimimo.com/v1/chat/completions'
dotenv.config()
dotenv.config({ path: join(__dirname, '..', '.env.mimo'), override: true })
const KEY = process.env.MIMO_KEY
if (!KEY) { console.error('缺少 MIMO_KEY（写入 apps/server/.env.mimo：MIMO_KEY=sk-...）'); process.exit(1) }

const bookArg = (process.argv.find(a => a.startsWith('--book=')) ?? '').slice(7)
if (!bookArg) { console.error('用法：--book=slug1,slug2 [--missing-only]'); process.exit(1) }
// --missing-only：只填 manifest 中完全不存在的键（451 拦截类）；不带标志时维持原行为
// （连 uploaded=false 的段也重生成——用于整体换供应商口径）
const missingOnly = process.argv.includes('--missing-only')
const db = new PrismaClient({ datasources: { db: { url: process.env.TAO_DATABASE_URL ?? 'file:./prod.db' } } })

const statePath = join(__dirname, '..', 'media', '.tts-public-state.json')
const manifest = JSON.parse(await readFile(statePath, 'utf8'))
const outDir = join(__dirname, '..', 'media', 'tts-public')

const store = audioSettings(await loadAudioEnvironment(process.env))
const s3 = store ? audioClient(store) : null
const model = process.env.TTS_MODEL || 'stepaudio-3-gen-preview'

async function mimoSynth(text, lang) {
  const style = lang === 'en'
    ? 'Read this children story aloud gently, warm storyteller voice, steady pace, natural pauses.'
    : '用温柔自然的女声给孩子读睡前故事，语调平缓，句间停顿自然，吐字清晰。'
  const voice = lang === 'en' ? 'Mia' : '茉莉'
  const res = await fetch(MIMO_BASE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mimo-v2.5-tts',
      messages: [{ role: 'user', content: style }, { role: 'assistant', content: text }],
      audio: { format: 'wav', voice },
      stream: false,
    }),
    signal: AbortSignal.timeout(180_000),
  })
  if (!res.ok) throw new Error(`mimo 返回 ${res.status}: ${(await res.text()).slice(0, 120)}`)
  const json = await res.json()
  const b64 = json?.choices?.[0]?.message?.audio?.data
  if (!b64) throw new Error('mimo 未返回音频')
  return Buffer.from(b64, 'base64')
}

/** WAV(PCM16 单声道) → Int16 样本（跳过头，按 data 块定位） */
function wavToSamples(wav) {
  if (wav.readUInt32BE(0) !== 0x52494646 || wav.readUInt32BE(8) !== 0x57415645) throw new Error('非 WAV')
  let off = 12
  while (off + 8 <= wav.length) {
    const id = wav.readUInt32BE(off)
    const size = wav.readUInt32LE(off + 4)
    if (id === 0x64617461) return new Int16Array(wav.buffer, wav.byteOffset + off + 8, Math.floor(size / 2))
    off += 8 + size + (size % 2)
  }
  throw new Error('WAV 无 data 块')
}

/** WAV → MP3（lamejs 纯 JS，64k 24k 单声道，与公共库口径一致） */
function wavToMp3(wav) {
  const samples = wavToSamples(wav)
  const enc = new lamejs.Mp3Encoder(1, 24000, 64)
  const parts = []
  for (let i = 0; i < samples.length; i += 1152) {
    const d = enc.encodeBuffer(samples.subarray(i, i + 1152))
    if (d.length) parts.push(Buffer.from(d))
  }
  const tail = enc.flush()
  if (tail.length) parts.push(Buffer.from(tail))
  const mp3 = Buffer.concat(parts)
  const info = parseMp3(mp3)
  return { mp3, durationMs: info?.durationMs ?? 0 }
}

let ok = 0, fail = 0
for (const bookId of bookArg.split(',')) {
  const book = await db.book.findUnique({ where: { id: bookId }, include: { chapters: { orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } } } })
  if (!book) { console.error(`没有书 ${bookId}`); continue }
  const voice = findVoice(speakVoiceId(book.lang))
  const lang = book.lang
  for (const ch of book.chapters) {
    for (const text of chunkText(chapterSpeakText(ch.blocks))) {
      const key = cacheKey(text, voice.id, DEFAULT_SPEED, 'mp3', lang, '__public__', model)
      if (missingOnly ? manifest[key] : (manifest[key] && manifest[key].uploaded !== false && existsSync(join(outDir, `${key}.mp3`)))) continue
      process.stdout.write(`合成 ${bookId} ch${ch.order} ${text.slice(0, 24)}… `)
      try {
        const wav = await mimoSynth(text, lang)
        const { mp3, durationMs } = wavToMp3(wav)
        await mkdir(outDir, { recursive: true })
        await writeFile(join(outDir, `${key}.mp3`), mp3)
        const rec = { durationMs, bytes: mp3.length, uploaded: false, store: store?.target, model: 'mimo-v2.5-tts' }
        if (s3) {
          try { await putAudio(s3, store, `tts-public/${key}.mp3`, mp3); rec.uploaded = true }
          catch (err) { console.log(`（上传失败，本地已存）${err.message?.slice(0, 80)}`) }
        }
        manifest[key] = rec
        await writeFile(statePath, JSON.stringify(manifest))
        ok++
        console.log(`✓ ${(mp3.length / 1024).toFixed(0)}KB ${(durationMs / 1000).toFixed(1)}s${rec.uploaded ? '' : ' 未上传'}`)
      } catch (e) {
        fail++
        console.log(`✗ ${e instanceof Error ? e.message : e}`)
      }
      await new Promise(r => setTimeout(r, 1200))
    }
  }
}
await db.$disconnect()
console.log(`\nMiMo 补齐：完成 ${ok}，失败 ${fail}`)
if (ok > 0) console.log('清单已更新；运行中的服务惰性重载后即命中，无需重启。')
