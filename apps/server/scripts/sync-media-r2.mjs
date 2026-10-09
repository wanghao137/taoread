/**
 * 媒体 → R2 增量同步（性能方案阶段 1/3，2026-09-25）。
 *
 * 把公共插图（含 thumb/reader 变体）同步到 R2 桶（缺桶自动建），
 * 键 = 媒体目录相对路径；断点续传清单 media/.r2-sync-state.json（相对路径 → mtimeMs+size）。
 * 上传顺序：变体优先（书架即时收益最大）→ 封面原图 → 章节原图。
 * TTS 预生成音频由 pregen-tts.mjs 自带上传，本脚本不重复处理。
 *
 * 用法（apps/server 目录）：
 *   node --import tsx scripts/sync-media-r2.mjs [--only=thumbs|covers|chapters|all]
 */
import { createReadStream, existsSync, readdirSync, readFileSync, statSync, writeFileSync, renameSync } from 'node:fs'
import { join, sep } from 'node:path'
import dotenv from 'dotenv'
import { CreateBucketCommand, HeadBucketCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

dotenv.config()
const databaseUrl = process.env.TAO_DATABASE_URL
dotenv.config({ path: '.env.r2', override: true })
if (databaseUrl) process.env.TAO_DATABASE_URL = databaseUrl

const accountId = process.env.R2_ACCOUNT_ID
const accessKey = process.env.R2_ACCESS_KEY_ID
const secretKey = process.env.R2_SECRET_ACCESS_KEY
if (!accountId || !accessKey || !secretKey) throw new Error('R2 凭据缺失')
const bucket = process.env.TAO_R2_MEDIA_BUCKET || 'taoread-media'
const mediaDir = process.env.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const stateFile = join(mediaDir, '.r2-sync-state')
const only = (process.argv.find((a) => a.startsWith('--only=')) ?? '--only=all').split('=')[1]

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
})

function log(msg) {
  console.log(`[r2sync ${new Date().toISOString()}] ${msg}`)
}

// 桶不存在则建（幂等）
try {
  await s3.send(new HeadBucketCommand({ Bucket: bucket }))
} catch {
  log(`桶 ${bucket} 不存在，尝试创建`)
  try {
    await s3.send(new CreateBucketCommand({ Bucket: bucket }))
  } catch (err) {
    if (!String(err?.name ?? '').includes('BucketAlready')) throw err
  }
}

const state = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, 'utf8')) : {}

const MIME = { '.webp': 'image/webp', '.mp3': 'audio/mpeg' }

function listFiles(relDir, filter) {
  const abs = join(mediaDir, relDir)
  if (!existsSync(abs)) return []
  return readdirSync(abs)
    .filter(filter)
    .map((name) => join(relDir, name).replaceAll(sep, '/'))
}

const isVariant = (n) => /\.(thumb|reader)\.webp$/.test(n)

// 隐私边界（不可越过）：文件名含 fam- 前缀的插画是家庭私有素材（scene 键 fam:<fid>:...
// 落盘时按 fsSafe() 把 ':' 转成 '-'），公共桶对全网可读，一旦同步等于泄露家庭专属内容。
const isPrivate = (n) => n.startsWith('fam-')

// 双保险：再按 DB ArtAsset.scene 的 fam: 前缀建一份私有文件名集合（thumb/reader 变体
// 没有独立行，天然随主图命中文件名规则）。DB 查询失败时停止同步，
// 两条路径都判定为公共才会上传。
const privateDbNames = new Set()
try {
  const dbUrl = process.env.TAO_DATABASE_URL
  if (!dbUrl) throw new Error('Database required for private-media exclusion')
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
    log(`DB 私有场景 ${privateDbNames.size} 条已并入过滤集合`)
  }
} catch (err) {
  void err
  throw new Error('Private-media database check failed; no media may be uploaded')
}

const isPublicName = (n) => !isPrivate(n) && !privateDbNames.has(n.replace(/\.webp$/, ''))
const isPublicBase = (n) => n.endsWith('.webp') && !isVariant(n) && isPublicName(n)
const isPublicVariant = (n) => isVariant(n) && isPublicName(n)

// 上传优先级：变体 → 封面 → 章节
let files = []
if (only === 'thumbs') {
  files = [...listFiles('art/covers', isPublicVariant), ...listFiles('art/chapters', isPublicVariant)]
} else if (only === 'covers') {
  files = [...listFiles('art/covers', isPublicBase)]
} else if (only === 'chapters') {
  files = [...listFiles('art/chapters', isPublicBase)]
} else {
  files = [
    ...listFiles('art/covers', isPublicVariant),
    ...listFiles('art/chapters', isPublicVariant),
    ...listFiles('art/covers', isPublicBase),
    ...listFiles('art/chapters', isPublicBase),
  ]
}

let uploaded = 0
let skipped = 0
let failed = 0
let bytes = 0
const t0 = Date.now()

for (const rel of files) {
  const abs = join(mediaDir, ...rel.split('/'))
  const st = statSync(abs)
  const prev = state[rel]
  if (prev && prev.mtimeMs === st.mtimeMs && prev.size === st.size) {
    skipped++
    continue
  }
  try {
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: rel,
      Body: createReadStream(abs),
      ContentType: MIME[rel.slice(rel.lastIndexOf('.'))] ?? 'application/octet-stream',
      CacheControl: 'public, max-age=31536000, immutable',
    }))
    state[rel] = { mtimeMs: st.mtimeMs, size: st.size }
    uploaded++
    bytes += st.size
    if (uploaded % 50 === 0) {
      writeFileSync(stateFile, JSON.stringify(state))
      log(`进度 ${uploaded + skipped}/${files.length}（已传 ${(bytes / 1048576).toFixed(1)}MB）`)
    }
  } catch (err) {
    failed++
    log(`失败 ${rel}: ${err.message?.slice(0, 100)}`)
  }
}
const tmp = `${stateFile}.tmp`
writeFileSync(tmp, JSON.stringify(state))
renameSync(tmp, stateFile)
log(`结束：上传 ${uploaded}（${(bytes / 1048576).toFixed(1)}MB），跳过 ${skipped}，失败 ${failed}，耗时 ${Math.round((Date.now() - t0) / 60000)} 分钟`)
if (failed > 0) process.exitCode = 1
