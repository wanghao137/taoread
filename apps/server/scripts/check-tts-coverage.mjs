/**
 * 公共预生成 TTS 覆盖率验收（2026-09-28 键空间单一事实源收官判据）。
 *
 * 背景：预生成曾「9889/9889 上传收官」但运行时命中率 0%——验收度量的是
 * 「清单内上传完成率」而非「运行时请求的键能命中」。本脚本用与运行时完全
 * 同源的口径（chapterText.ts + voices.ts + 运行时 model）算期望键集，
 * 与 media/.tts-public-state.json 对账，覆盖率 < 阈值即非零退出。
 *
 * 用法：npx tsx scripts/check-tts-coverage.mjs [--min=0.99]
 * 退出码：0 = 达标；1 = 未达标；2 = 环境错误。
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { chunkText } from '../src/modules/tts/client.ts'
import { cacheKey } from '../src/modules/tts/cache.ts'
import { DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText.ts'
import { loadConfig } from '../src/config.ts'

dotenv.config()
dotenv.config({ path: '.env.r2', override: true })

const minArg = process.argv.find((a) => a.startsWith('--min='))
const min = minArg ? Number(minArg.split('=')[1]) : 0.99
if (!Number.isFinite(min) || min <= 0 || min > 1) {
  console.error('--min 需为 (0,1] 区间的数')
  process.exit(2)
}

const config = loadConfig()
const model = config.TTS_MODEL || 'stepaudio-3-gen-preview'
const mediaDir = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const manifestPath = join(mediaDir, '.tts-public-state.json')

let manifest
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
} catch {
  console.error(`读不到清单 ${manifestPath}：预生成从未跑过或目录配置错误`)
  process.exit(2)
}

const db = new PrismaClient()
try {
  const books = await db.book.findMany({ select: { id: true, lang: true } })
  let total = 0
  let hit = 0
  const missingBooks = new Map()
  for (const book of books) {
    const lang = book.lang === 'en' ? 'en' : 'zh'
    const voiceId = speakVoiceId(lang)
    const chapters = await db.chapter.findMany({ where: { bookId: book.id }, select: { id: true } })
    for (const ch of chapters) {
      const blocks = await db.block.findMany({
        where: { chapterId: ch.id },
        orderBy: { order: 'asc' },
        select: { kind: true, text: true },
      })
      const fullText = chapterSpeakText(blocks)
      if (!fullText.trim()) continue
      for (const seg of chunkText(fullText)) {
        total++
        if (manifest[cacheKey(seg, voiceId, DEFAULT_SPEED, 'mp3', lang, '__public__', model)]) hit++
        else missingBooks.set(book.id, (missingBooks.get(book.id) ?? 0) + 1)
      }
    }
  }
  const rate = total === 0 ? 0 : hit / total
  console.log(`期望段数 ${total}，清单命中 ${hit}，覆盖率 ${(rate * 100).toFixed(2)}%（阈值 ${(min * 100).toFixed(0)}%）`)
  if (missingBooks.size > 0) {
    const top = [...missingBooks.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
    console.log('缺口最多的书（前 10）: ' + top.map(([id, n]) => `${id}(${n})`).join(' '))
  }
  if (rate < min) {
    console.error('未达标：请运行 scripts/pregen-tts.mjs 补齐（zh 一轮 + --lang=en 一轮）')
    process.exit(1)
  }
  console.log('达标。')
} finally {
  await db.$disconnect()
}
