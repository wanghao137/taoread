/**
 * 家庭导入书 TTS 预热（2026-09-27；2026-10-20 改直读 DB）。
 *
 * 与公共预生成（pregen-tts.mjs）的区别：家庭书音频是私有素材，键空间含家庭 id
 * （cacheKey 的 fid 位），只落本地 tts 缓存（media/tts/），不上传公共域、不写 R2。
 * 只做「合成 + 写缓存文件」，不写数据库——TtsMediaOwner 所有权行由运行时首次播放
 * 时经 ownAudio 自然创建，既避开 prod.db 的跨进程写锁，也不扰动每日配额的记账语义。
 *
 * 2026-10-20：不再走 HTTP join（家长加入现在必须 PIN，脚本场景拿不到），
 * 书单与章节文本直读 DB；网络抖动时段每段重试 3 次。
 *
 * 用法（对生产实例预热，env 用生产 .env 提供 DATABASE_URL/TAO_MEDIA_DIR 与 TTS 网关键）：
 *   node --env-file=D:\taoread-prod\apps\server\.env --import tsx \
 *     scripts/pregen-family-tts.mjs [--family=<familyId>] [--book=<impId>] [--concurrency=4]
 */
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { loadConfig } from '../src/config.ts'
import { chunkText, synthesizeSegment } from '../src/modules/tts/client.ts'
import { cacheKey, TtsCache } from '../src/modules/tts/cache.ts'
import { findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { parseMp3 } from '../src/modules/tts/mp3duration.ts'

dotenv.config()

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=')
const familyArg = arg('family') ?? null
const bookFilter = arg('book') ?? null
const concurrency = Math.max(1, Math.min(8, Number(arg('concurrency') ?? 4)))

const config = loadConfig()
if (!config.TTS_BASE || !config.TTS_API_KEY) { console.error('TTS 未配置（TTS_BASE/TTS_API_KEY）'); process.exit(1) }
const model = config.TTS_MODEL ?? ''
const client = { base: config.TTS_BASE, apiKey: config.TTS_API_KEY, model, fetch: undefined }
const voice = findVoice(undefined)
const speed = DEFAULT_SPEED
const cache = new TtsCache(config.TAO_MEDIA_DIR)
const db = new PrismaClient()
const log = (m) => console.log(`[${new Date().toISOString()}] ${m}`)

// 家庭锚定：多家庭库拒绝猜测（与 import-family-books.mjs 同规则）
const impFamilies = await db.importedBook.findMany({ where: { id: { startsWith: 'imp:' } }, select: { familyId: true }, distinct: ['familyId'] })
let familyId
if (familyArg) familyId = familyArg
else if (impFamilies.length === 1) familyId = impFamilies[0].familyId
else { console.error(`库中存在 ${impFamilies.length} 个持有家庭书的家庭，请用 --family=<familyId> 指定`); process.exit(1) }

const books = await db.importedBook.findMany({
  where: { familyId, ...(bookFilter ? { id: bookFilter } : {}) },
  select: {
    id: true, title: true, lang: true,
    chapters: { select: { order: true, title: true, text: true }, orderBy: { order: 'asc' } },
  },
  orderBy: { createdAt: 'asc' },
})
if (books.length === 0) { console.error('没有匹配的家庭书'); process.exit(1) }

const stats = { books: 0, chapters: 0, segments: 0, cached: 0, synthesized: 0, failed: 0 }

async function synthOne(label, seg, lang, fid) {
  const key = cacheKey(seg, voice.id, speed, 'mp3', lang, fid, model)
  const hit = await cache.get(key, 'mp3')
  if (hit) { stats.cached += 1; return }
  let lastError = null
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const out = await synthesizeSegment(client, { text: seg, voice, speed, lang, format: 'mp3' })
      const durationMs = parseMp3(out.audio)?.durationMs ?? 0
      await cache.set(key, 'mp3', out.audio, durationMs)
      stats.synthesized += 1
      return
    } catch (error) {
      lastError = error
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt === 1 ? 3000 : 8000))
    }
  }
  stats.failed += 1
  log(`✗ ${label} 合成失败：${lastError?.message?.slice(0, 100)}`)
}

for (const book of books) {
  stats.books += 1
  const lang = book.lang === 'en' ? 'en' : 'zh'
  log(`📖 ${book.title}（${book.chapters.length} 章，${lang}）`)
  for (const chapter of book.chapters) {
    const fullText = chapter.text.replace(/\[\[img:[^\]]+\]\]/g, '')
    const segments = chunkText(fullText)
    stats.chapters += 1
    stats.segments += segments.length
    let cursor = 0
    const workers = Array.from({ length: Math.min(concurrency, segments.length) }, async () => {
      while (cursor < segments.length) {
        const index = cursor
        cursor += 1
        await synthOne(`${chapter.title}#${index + 1}`, segments[index], lang, familyId)
      }
    })
    await Promise.all(workers)
    log(`第 ${chapter.order}/${book.chapters.length} 章完成（${segments.length} 段）`)
  }
}

log(`汇总：${stats.books} 本 / ${stats.chapters} 章 / ${stats.segments} 段 —— 已缓存 ${stats.cached}，本次合成 ${stats.synthesized}，失败 ${stats.failed}`)
console.log(stats.failed === 0 ? 'FAMILY_PREGEN_CLEAN' : `FAMILY_PREGEN_WITH_FAILURES:${stats.failed}`)
await db.$disconnect()
