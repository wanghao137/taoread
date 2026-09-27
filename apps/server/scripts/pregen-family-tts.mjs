/**
 * 家庭导入书 TTS 预热（2026-09-27）。
 *
 * 与公共预生成（pregen-tts.mjs）的区别：家庭书音频是私有素材，键空间含家庭 id
 * （cacheKey 的 fid 位），只落本地 tts 缓存（media/tts/），不上传公共域、不写 R2。
 * 只做「合成 + 写缓存文件」，不写数据库——TtsMediaOwner 所有权行由运行时首次播放
 * 时经 ownAudio 自然创建，既避开 prod.db 的跨进程写锁，也不扰动每日配额的记账语义。
 *
 * 用法（对生产实例预热，env 用生产 .env 提供 TAO_MEDIA_DIR 与 TTS 网关键）：
 *   node --env-file=D:\taoread-prod\apps\server\.env --import tsx \
 *     scripts/pregen-family-tts.mjs --base=http://127.0.0.1:8091 \
 *     --code=<家庭码> [--book=<impId>] [--concurrency=4]
 */
import dotenv from 'dotenv'
import { loadConfig } from '../src/config.ts'
import { chunkText, synthesizeSegment } from '../src/modules/tts/client.ts'
import { cacheKey, TtsCache } from '../src/modules/tts/cache.ts'
import { findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { parseMp3 } from '../src/modules/tts/mp3duration.ts'

dotenv.config()

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=')
const BASE = arg('base') ?? 'http://127.0.0.1:8091'
const CODE = arg('code')
const bookFilter = arg('book') ?? null
const concurrency = Math.max(1, Math.min(8, Number(arg('concurrency') ?? 4)))
if (!CODE) { console.error('缺少 --code=<家庭码>'); process.exit(1) }

const config = loadConfig()
if (!config.TTS_BASE || !config.TTS_API_KEY) { console.error('TTS 未配置（TTS_BASE/TTS_API_KEY）'); process.exit(1) }
const model = config.TTS_MODEL ?? ''
const client = { base: config.TTS_BASE, apiKey: config.TTS_API_KEY, model, fetch: undefined }
const voice = findVoice(undefined)
const speed = DEFAULT_SPEED
const cache = new TtsCache(config.TAO_MEDIA_DIR)
const log = (m) => console.log(`[${new Date().toISOString()}] ${m}`)

const joinRes = await fetch(`${BASE}/api/family/join`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ familyCode: CODE, role: 'parent', deviceId: 'pregen-family-tts' }) })
if (!joinRes.ok) { console.error(`join 失败 ${joinRes.status}`); process.exit(1) }
const session = await joinRes.json()
const headers = { 'content-type': 'application/json', authorization: `Bearer ${session.token}` }
log(`家庭 ${session.familyId} 预热开始（音色 ${voice.id}，语速 ${speed}）`)

const shelf = await (await fetch(`${BASE}/api/content/imports`, { headers })).json()
const books = shelf.books.filter((b) => !bookFilter || b.id === bookFilter)
if (books.length === 0) { console.error('没有匹配的家庭书'); process.exit(1) }

const stats = { books: 0, chapters: 0, segments: 0, cached: 0, synthesized: 0, failed: 0 }

async function synthOne(label, seg, lang, fid) {
  const key = cacheKey(seg, voice.id, speed, 'mp3', lang, fid, model)
  const hit = await cache.get(key, 'mp3')
  if (hit) { stats.cached += 1; return }
  try {
    const out = await synthesizeSegment(client, { text: seg, voice, speed, lang, format: 'mp3' })
    const durationMs = parseMp3(out.audio)?.durationMs ?? 0
    await cache.set(key, 'mp3', out.audio, durationMs)
    stats.synthesized += 1
  } catch (error) {
    stats.failed += 1
    log(`✗ ${label} 合成失败：${error.message?.slice(0, 100)}`)
  }
}

for (const book of books) {
  stats.books += 1
  const detail = await (await fetch(`${BASE}/api/content/imports/${encodeURIComponent(book.id)}`, { headers })).json()
  const lang = detail.book.lang === 'en' ? 'en' : 'zh'
  log(`📖 ${book.title}（${book.chapterCount} 章，${lang}）`)
  for (const item of detail.book.chapters) {
    const chapterRes = await fetch(`${BASE}/api/content/imports/${encodeURIComponent(book.id)}/chapters/${item.order}`, { headers })
    if (!chapterRes.ok) { log(`✗ 第 ${item.order} 章读取失败 ${chapterRes.status}`); stats.failed += 1; continue }
    const { chapter } = await chapterRes.json()
    const fullText = chapter.text.replace(/\[\[img:[^\]]+\]\]/g, '')
    const segments = chunkText(fullText)
    stats.chapters += 1
    stats.segments += segments.length
    let cursor = 0
    const workers = Array.from({ length: Math.min(concurrency, segments.length) }, async () => {
      while (cursor < segments.length) {
        const index = cursor
        cursor += 1
        await synthOne(`${item.title}#${index + 1}`, segments[index], lang, session.familyId)
      }
    })
    await Promise.all(workers)
    log(`第 ${item.order}/${book.chapterCount} 章完成（${segments.length} 段）`)
  }
}

log(`汇总：${stats.books} 本 / ${stats.chapters} 章 / ${stats.segments} 段 —— 已缓存 ${stats.cached}，本次合成 ${stats.synthesized}，失败 ${stats.failed}`)
console.log(stats.failed === 0 ? 'FAMILY_PREGEN_CLEAN' : `FAMILY_PREGEN_WITH_FAILURES:${stats.failed}`)
