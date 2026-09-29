/**
 * R2 公共桶孤儿清理（2026-09-28 免费线治理）。
 *
 * 以本地 media/ 为唯一真值对账公共桶 taoread-media：
 *   art/          ←→ 本地 art/ 全部公共 webp（含 thumb/reader 变体；fam- 私有文件
 *                     本就不该在公共桶，命中即按孤儿删除——与 purge-private-r2.mjs 双保险）
 *   tts-public/   ←→ 本地 tts-public/（正本所在；陈旧 cacheKey 残留即孤儿）
 *   其他前缀       ←→ 本地无对应文件的键一律视为孤儿（报告单列，便于人工识别异常前缀）
 *
 * --tts-dead：TTS 死键治理（2026-09-28）。缓存键含音色/语速/lang/模型（cache.ts），
 * 参数一变旧键即成死键——09-26 英文书 mom-warm→en-storyteller 重预生成，旧音色段
 * 3,932 个/872MB 整批留存（本地+R2+清单三处）。本模式以 DB 正文按当前参数重算期望键集
 * （与 pregen-tts.mjs 同口径），实际键中不在期望集的即死键 → 按孤儿删除，
 * 并同步删本地死文件 + 瘦身 .tts-public-state.json。
 * 注意：--tts-dead 必须从部署 checkout（apps/server）运行——prisma 与 src TS
 * 按相对路径解析，从 dev 仓库跑会连错库（轻则查询失败退化，重则期望集为空触发护栏）。
 *
 * 用法（apps/server 目录，需 .env.r2 凭据）：
 *   node --import tsx scripts/clean-media-r2.mjs            # DRY-RUN，只打印将删对象
 *   node --import tsx scripts/clean-media-r2.mjs --tts-dead # DRY-RUN + TTS 死键纳入孤儿
 *   node --import tsx scripts/clean-media-r2.mjs --tts-dead --delete  # 真删（R2+本地+清单）
 *   --force：孤儿占比超 50% 时仍执行（默认拒删——多半是本地目录挂错）
 */
import { existsSync, readdirSync, statSync, unlinkSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import dotenv from 'dotenv'
import { DeleteObjectsCommand, DeleteObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'

dotenv.config()
dotenv.config({ path: '.env.r2', override: true })

const accountId = process.env.R2_ACCOUNT_ID
const accessKey = process.env.R2_ACCESS_KEY_ID
const secretKey = process.env.R2_SECRET_ACCESS_KEY
if (!accountId || !accessKey || !secretKey) throw new Error('R2 凭据缺失')
const bucket = process.env.TAO_R2_MEDIA_BUCKET || 'taoread-media'
const mediaDir = process.env.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const doDelete = process.argv.includes('--delete')
const force = process.argv.includes('--force')
const ttsDead = process.argv.includes('--tts-dead')

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
})

function log(msg) {
  console.log(`[clean ${new Date().toISOString()}] ${msg}`)
}

function walk(dir, cb) {
  if (!existsSync(dir)) return
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) walk(abs, cb)
    else cb(abs, st)
  }
}

// 私有判定与 sync-media-r2.mjs 同口径：文件名 fam- 前缀 ∪ DB fam: 场景文件名。
// 公共桶出现私有键即事故，按孤儿删除（本地源文件不动）。
const privateDbNames = new Set()
try {
  const dbUrl = process.env.TAO_DATABASE_URL
  if (dbUrl) {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } })
    const famRows = await prisma.artAsset.findMany({
      where: { scene: { startsWith: 'fam:' } },
      select: { urlPath: true },
    })
    for (const row of famRows) {
      const name = row.urlPath.split('/').pop()?.replace(/\.webp$/, '')
      if (name) privateDbNames.add(name)
    }
    await prisma.$disconnect()
    log(`DB 私有场景 ${privateDbNames.size} 条`)
  }
} catch (err) {
  log(`DB 私有场景查询失败，仅按文件名过滤：${String(err?.message ?? err).slice(0, 100)}`)
}
const isPrivateName = (rel) => rel.split('/').pop()?.replace(/\.webp$/, '').startsWith('fam-')
  || privateDbNames.has(rel.split('/').pop()?.replace(/\.webp$/, ''))

// ── 本地真值 ──
if (!existsSync(mediaDir)) throw new Error(`本地 media/ 不存在：${mediaDir}（拒绝在无真值时对账）`)
const desired = new Set()
for (const sub of ['art', 'tts-public']) {
  const abs = join(mediaDir, ...sub.split('/'))
  if (!existsSync(abs)) {
    log(`警告：本地 ${sub}/ 不存在，该前缀下远端对象将全部计为孤儿——如非预期请中止`)
  }
}
walk(mediaDir, (abs) => {
  const rel = relative(mediaDir, abs).split(sep).join('/')
  if (rel === '.backup-state' || rel === '.r2-sync-state' || rel === '.tts-public-state.json') return
  if (!rel.startsWith('art/') && !rel.startsWith('tts-public/')) return
  if (isPrivateName(rel)) return // 私有文件不入真值：公共桶上出现即待删
  desired.add(rel)
})

// --tts-dead：期望键集 = DB 正文按当前参数（与 pregen-tts.mjs 完全同口径）。
// 期望集 <1000 视为查询失败（连错库/空库），拒绝继续——空期望集会把全部 TTS 当死键。
let expectedTtsKeys = null
if (ttsDead) {
  const dbUrl = process.env.TAO_DATABASE_URL
  if (!dbUrl) throw new Error('--tts-dead 需要 TAO_DATABASE_URL')
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } })
  const { cacheKey } = await import('../src/modules/tts/cache.ts')
  const { chunkText } = await import('../src/modules/tts/client.ts')
  const { DEFAULT_SPEED } = await import('../src/modules/tts/voices.ts')
  const { TTS_PUBLIC_NS } = await import('../src/modules/tts/publicCache.ts')
  const { chapterSpeakText, speakVoiceId } = await import('../src/modules/tts/chapterText.ts')
  const { loadConfig } = await import('../src/config.ts')
  const model = loadConfig().TTS_MODEL || 'stepaudio-3-gen-preview'
  const books = await prisma.book.findMany({ select: { id: true, lang: true } })
  expectedTtsKeys = new Set()
  for (const book of books) {
    const lang = book.lang === 'en' ? 'en' : 'zh'
    const voiceId = speakVoiceId(lang)
    const chapters = await prisma.chapter.findMany({ where: { bookId: book.id }, orderBy: { order: 'asc' }, select: { id: true } })
    for (const ch of chapters) {
      const blocks = await prisma.block.findMany({
        where: { chapterId: ch.id },
        orderBy: { order: 'asc' },
        select: { kind: true, text: true },
      })
      const fullText = chapterSpeakText(blocks)
      if (!fullText.trim()) continue
      for (const seg of chunkText(fullText)) {
        expectedTtsKeys.add(cacheKey(seg, voiceId, DEFAULT_SPEED, 'mp3', lang, TTS_PUBLIC_NS, model))
      }
    }
  }
  await prisma.$disconnect()
  if (expectedTtsKeys.size < 1000) throw new Error(`期望键集仅 ${expectedTtsKeys.size}（<1000），疑似连错库，中止`)
  let deadCount = 0
  for (const rel of [...desired]) {
    if (!rel.startsWith('tts-public/') || !rel.endsWith('.mp3')) continue
    const key = rel.slice('tts-public/'.length, -'.mp3'.length)
    if (!expectedTtsKeys.has(key)) {
      desired.delete(rel)
      deadCount++
    }
  }
  log(`TTS 死键（本地+远端同在）：${deadCount} 个（期望键集 ${expectedTtsKeys.size}）`)
}
log(`本地真值：${desired.size} 个公共对象`)

// ── 远端对账 ──
const remote = []
let token
do {
  const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }))
  for (const o of page.Contents ?? []) remote.push({ key: o.Key, size: o.Size ?? 0 })
  token = page.IsTruncated ? page.NextContinuationToken : undefined
} while (token)
log(`远端 ${bucket}：${remote.length} 个对象`)

const orphans = remote.filter((k) => !desired.has(k.key))
const privateHits = orphans.filter((k) => k.key.startsWith('art/') && isPrivateName(k.key))
const byTop = new Map()
for (const k of orphans) {
  const top = k.key.split('/')[0]
  const cur = byTop.get(top) ?? { count: 0, bytes: 0 }
  cur.count++
  cur.bytes += k.size
  byTop.set(top, cur)
}
log(`孤儿 ${orphans.length} 个（${(orphans.reduce((s, k) => s + k.size, 0) / 1048576).toFixed(1)}MB），按前缀：`)
for (const [top, v] of [...byTop.entries()].sort((a, b) => b[1].bytes - a[1].bytes)) {
  console.log(`  ${top.padEnd(16)} ${String(v.count).padStart(7)} 个  ${(v.bytes / 1048576).toFixed(1)}MB`)
}
if (privateHits.length) log(`⚠ 其中私有键 ${privateHits.length} 个（fam- 命中）`)
for (const k of orphans.slice(0, 30)) log(`  ${doDelete ? '待删' : '示例'} ${k.key} (${(k.size / 1048576).toFixed(2)}MB)`)
if (orphans.length > 30) log(`  …等共 ${orphans.length} 个`)

if (orphans.length === 0) {
  log('无孤儿，结束')
  process.exit(0)
}
if (!doDelete) {
  log('DRY-RUN 结束：确认无误后加 --delete 执行删除')
  process.exit(0)
}
if (orphans.length > remote.length * 0.5 && !force) {
  log(`孤儿占比 ${(orphans.length / remote.length * 100).toFixed(0)}% 超过 50% 安全线——疑似本地目录挂错，拒删。确认无误请加 --force`)
  process.exit(1)
}

let deleted = 0
for (let i = 0; i < orphans.length; i += 1000) {
  const batch = orphans.slice(i, i + 1000).map((k) => ({ Key: k.key }))
  const res = await s3.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: batch, Quiet: true } }))
  deleted += batch.length - (res.Errors?.length ?? 0)
  if (res.Errors?.length) {
    for (const e of res.Errors.slice(0, 5)) log(`删除失败 ${e.Key}: ${e.Message}`)
    for (const e of res.Errors) {
      await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: e.Key })).catch(() => {})
    }
  }
  log(`进度 ${deleted}/${orphans.length}`)
}

// --tts-dead：R2 删除成功后，同步清理本地死文件 + 瘦身清单（三处一致）
if (ttsDead && deleted > 0) {
  let localRemoved = 0
  for (const k of orphans) {
    if (!k.key.startsWith('tts-public/') || !k.key.endsWith('.mp3')) continue
    const abs = join(mediaDir, ...k.key.split('/'))
    if (existsSync(abs)) {
      unlinkSync(abs)
      localRemoved++
    }
  }
  const manifestPath = join(mediaDir, '.tts-public-state.json')
  if (existsSync(manifestPath)) {
    try {
      const m = JSON.parse(readFileSync(manifestPath, 'utf8'))
      let pruned = 0
      for (const k of orphans) {
        if (!k.key.startsWith('tts-public/') || !k.key.endsWith('.mp3')) continue
        const key = k.key.slice('tts-public/'.length, -'.mp3'.length)
        if (m[key]) {
          delete m[key]
          pruned++
        }
      }
      writeFileSync(manifestPath, JSON.stringify(m))
      log(`本地同步清理：死文件 ${localRemoved} 个，清单瘦身 ${pruned} 条`)
    } catch (err) {
      log(`清单瘦身失败（不阻塞）：${err.message?.slice(0, 80)}`)
    }
  }
}
log(`结束：删除 ${deleted}/${orphans.length} 个孤儿对象，释放 ${(orphans.reduce((s, k) => s + k.size, 0) / 1048576).toFixed(1)}MB`)
