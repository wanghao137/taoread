/**
 * 公共 TTS 音频死条目清理（story-expand 2026-10-31）。
 *
 * live set（期望键集）与 pregen-tts.mjs 完全同源：内容包全集 ALL_PACKS
 * （src/content/packs/index.ts）按书语言取音色（zh=findVoice(DEFAULT_VOICE_ID)=mom-warm，
 * en=findVoice(speakVoiceId('en'))=en-storyteller），每章
 * chapterSpeakText(ch.blocks) → chunkText → cacheKey(seg, voiceId, DEFAULT_SPEED,
 * 'mp3', lang, TTS_PUBLIC_NS, TTS_MODEL || 'stepaudio-3-gen-preview')。
 * 清单键 ∉ live set = 死条目。
 *
 * 处理两份清单（各自的文件目录为清单旁同名 tts-public/）：
 *   - D:/codesolo/taoread/apps/server/media/.tts-public-state.json
 *   - D:/taoread-prod/apps/server/media/.tts-public-state.json
 *
 * 默认 dry-run（只统计不删）。--apply 真删：删文件（entry.audioKey ?? key 拼
 * tts-public/<stem>.mp3，文件可能不存在则跳过）+ 原子重写瘦身清单（tmp+rename）。
 * --force 放行占比护栏。护栏：live<5000 拒跑；单清单死条目占比>50% 拒跑。
 *
 * receipt（dry-run/apply 都写，label → 统计）：
 *   D:/codesolo/taoread/output/story-expand-20261031/cleanup-receipt.json
 *
 * 用法（apps/server 目录）：
 *   node --import tsx scripts/expand-cleanup.mjs             # dry-run
 *   node --import tsx scripts/expand-cleanup.mjs --apply     # 真删
 *   node --import tsx scripts/expand-cleanup.mjs --apply --force
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, rename, stat, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import dotenv from 'dotenv'
import { loadConfig } from '../src/config.ts'
import { chunkText } from '../src/modules/tts/client.ts'
import { cacheKey } from '../src/modules/tts/cache.ts'
import { DEFAULT_VOICE_ID, findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { TTS_PUBLIC_NS, publicSegmentAudioKey } from '../src/modules/tts/publicCache.ts'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText.ts'
import { ALL_PACKS } from '../src/content/packs/index.ts'

dotenv.config()

const APPLY = process.argv.includes('--apply')
const FORCE = process.argv.includes('--force')
const LIVE_MIN = 5000
const DEAD_RATIO_MAX = 0.5
const RECEIPT_DIR = 'D:/codesolo/taoread/output/story-expand-20261031'
const TARGETS = [
  { label: 'codesolo', root: 'D:/codesolo/taoread/apps/server/media' },
  { label: 'prod', root: 'D:/taoread-prod/apps/server/media' },
]

const config = loadConfig()
const model = config.TTS_MODEL || 'stepaudio-3-gen-preview'
const speed = DEFAULT_SPEED
// 音色选择与 pregen-tts.mjs 同款：中文 findVoice(DEFAULT_VOICE_ID)，英文 findVoice(speakVoiceId('en'))
const voiceByLang = { zh: findVoice(DEFAULT_VOICE_ID).id, en: findVoice(speakVoiceId('en')).id }

function log(msg) {
  console.log(`[cleanup ${new Date().toISOString()}] ${msg}`)
}
const mb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`

/** live set：键空间单一事实源（与运行时路由/预生成/覆盖率验收同口径） */
function computeLiveKeys() {
  const live = new Set()
  for (const book of ALL_PACKS) {
    const lang = book.lang === 'en' ? 'en' : 'zh'
    const voiceId = voiceByLang[lang]
    for (const ch of book.chapters) {
      const fullText = chapterSpeakText(ch.blocks)
      if (!fullText.trim()) continue
      for (const seg of chunkText(fullText)) {
        live.add(cacheKey(seg, voiceId, speed, 'mp3', lang, TTS_PUBLIC_NS, model))
      }
    }
  }
  return live
}

// 原子重写清单（服务端 PublicTtsIndex 可能正持有句柄：rename 竞争 EPERM 时退避重试，
// 兜底直接写——pregen-tts.mjs saveManifest 同款）
async function writeManifestAtomic(manifestPath, data) {
  const tmp = `${manifestPath}.${Math.random().toString(36).slice(2, 8)}.tmp`
  for (let attempt = 0; ; attempt++) {
    try {
      await writeFile(tmp, data)
      await rename(tmp, manifestPath)
      return
    } catch (err) {
      if (err?.code !== 'EPERM' || attempt >= 6) {
        try { await writeFile(manifestPath, data); return } catch { if (attempt >= 8) throw err }
      }
      await new Promise((r) => setTimeout(r, 250 * (attempt + 1)))
    }
  }
}

// ── 主流程 ──
const live = computeLiveKeys()
log(`live 键集 ${live.size}（zh=${voiceByLang.zh} / en=${voiceByLang.en}，speed=${speed}，model=${model}）`)
if (live.size < LIVE_MIN) {
  log(`护栏拒跑：live 键集仅 ${live.size}（<${LIVE_MIN}），取文/切分/参数口径疑似漂移`)
  process.exit(1)
}

// pass 1：两份清单全部载入并统计，护栏全过后才进入 pass 2（避免「第一份已删、第二份拒跑」）
const loaded = []
for (const target of TARGETS) {
  const manifestPath = join(target.root, '.tts-public-state.json')
  const outDir = join(target.root, 'tts-public')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  const keys = Object.keys(manifest)
  const deadKeys = keys.filter((k) => !live.has(k))
  const ratio = keys.length > 0 ? deadKeys.length / keys.length : 0

  // 文件 stem 用清单口径 publicSegmentAudioKey（entry.audioKey ?? key）；bytes 缺失回退 stat 实测
  const fileStem = (k) => publicSegmentAudioKey(k, manifest[k])
  const fileBytes = async (k) => {
    const info = manifest[k] || {}
    return Number.isSafeInteger(info.bytes) && info.bytes > 0 ? info.bytes : (await stat(join(outDir, `${fileStem(k)}.mp3`))).size
  }
  let freedBytes = 0
  let filesPresent = 0
  for (const k of deadKeys) {
    if (!existsSync(join(outDir, `${fileStem(k)}.mp3`))) continue
    filesPresent++
    freedBytes += await fileBytes(k)
  }

  log(`${target.label}：manifest ${keys.length}，死 ${deadKeys.length}（${(ratio * 100).toFixed(2)}%），` +
    `${APPLY ? '' : '预计'}释放 ${mb(freedBytes)}（文件在盘 ${filesPresent}）`)

  if (ratio > DEAD_RATIO_MAX && !FORCE) {
    log(`护栏拒跑：${target.label} 死条目占比 ${(ratio * 100).toFixed(2)}% > 50%（确认口径无误后加 --force 放行）`)
    process.exit(1)
  }
  loaded.push({ target, manifestPath, outDir, manifest, keys, deadKeys, ratio, fileStem, fileBytes })
}

// pass 2：统计（receipt 两种模式都写）+ apply 真删
const receipt = {}
for (const item of loaded) {
  const { target, manifestPath, outDir, manifest, keys, deadKeys, ratio, fileStem, fileBytes } = item
  const entry = {
    manifestPath,
    applied: APPLY,
    manifestCount: keys.length,
    deadCount: deadKeys.length,
    deadRatio: ratio,
    removedKeys: deadKeys,
    freedBytes: 0,
    filesDeleted: 0,
  }

  if (APPLY) {
    // 保护集：live 条目实际指向的文件 stem（key 本身 + audioKey）——死条目同名文件一律不删
    const protect = new Set()
    for (const k of keys) {
      if (!live.has(k)) continue
      protect.add(k)
      if (manifest[k]?.audioKey) protect.add(manifest[k].audioKey)
    }
    let freedActual = 0
    for (const k of deadKeys) {
      const stem = fileStem(k)
      const filePath = join(outDir, `${stem}.mp3`)
      if (protect.has(stem) || !existsSync(filePath)) continue
      const bytes = await fileBytes(k)
      await unlink(filePath)
      entry.filesDeleted++
      freedActual += bytes
    }
    // 原子瘦身清单：只保留 live 键（死条目无论文件在不在盘都从清单剔除）
    const slimmed = {}
    for (const k of keys) if (live.has(k)) slimmed[k] = manifest[k]
    await writeManifestAtomic(manifestPath, JSON.stringify(slimmed))
    entry.freedBytes = freedActual
    log(`${target.label}：已删文件 ${entry.filesDeleted}，释放 ${mb(freedActual)}，清单 ${keys.length} → ${Object.keys(slimmed).length}`)
  } else {
    let freedEstimate = 0
    for (const k of deadKeys) {
      if (existsSync(join(outDir, `${fileStem(k)}.mp3`))) freedEstimate += await fileBytes(k)
    }
    entry.freedBytes = freedEstimate
  }

  receipt[target.label] = entry
}

await mkdir(RECEIPT_DIR, { recursive: true })
const receiptPath = join(RECEIPT_DIR, 'cleanup-receipt.json')
await writeFile(receiptPath, JSON.stringify(receipt, null, 2))
log(`结束（mode=${APPLY ? 'apply' : 'dry-run'}）：live ${live.size}；receipt → ${receiptPath}`)
