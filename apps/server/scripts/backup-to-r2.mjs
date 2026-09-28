/**
 * 桃阅读离机备份 → Cloudflare R2（交接文档 G2/F38：同机复制不是完整灾备）。
 *
 * 每次运行：
 *   1. SQLite 一致快照（VACUUM INTO，可在服务运行时执行）；
 *   2. 上传快照到 r2://<bucket>/db/（保留最近 3 份，其余删除）；
 *   3. 增量同步 media/：media/.backup-state 是 JSON 清单（相对路径 → 上次上传时 mtimeMs），
 *      mtime 与清单一致的上传过即跳过——断点续传，网络闪断后只补漏；
 *   4. 以本地 media/ 为唯一真值对账远端：孤儿对象（本地已删/历史误传/可再生产物）删除，
 *      治理「只增不删」的桶膨胀（2026-09-28 二次治理）。
 *
 * 可再生产物不进备份（见 isDerivedMedia）：tts-public/、videos/、缩图变体、清单文件。
 *
 * 环境变量（.env.r2，绝不提交）：
 *   TAO_DATABASE_URL（如 file:./prod.db）、R2_ACCOUNT_ID、R2_ACCESS_KEY_ID、
 *   R2_SECRET_ACCESS_KEY、R2_BUCKET（默认 taoread-backup）
 * 用法（apps/server 目录）：
 *   node --import tsx scripts/backup-to-r2.mjs [--full] [--dry-run]
 *   --dry-run：只出孤儿对账报告，不上传不删除
 */
import { createReadStream, existsSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { DeleteObjectsCommand, DeleteObjectCommand, HeadBucketCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

// 先 .env 再 .env.r2（后者可覆盖）
dotenv.config()
dotenv.config({ path: '.env.r2', override: true })

const dbUrl = process.env.TAO_DATABASE_URL
if (!dbUrl) throw new Error('TAO_DATABASE_URL 必填')
const accountId = process.env.R2_ACCOUNT_ID
const accessKey = process.env.R2_ACCESS_KEY_ID
const secretKey = process.env.R2_SECRET_ACCESS_KEY
if (!accountId || !accessKey || !secretKey) throw new Error('R2 凭据缺失（R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY）')
const bucket = process.env.R2_BUCKET || 'taoread-backup'
// 离机 DB 快照保留份数（2026-09-28 从 7 降到 3：快照 ~11MB，7 份无必要）
const DB_KEEP = 3
// 本地对账安全水位：walk 出的真值清单低于该数说明 media/ 可能挂错/损坏，拒绝删除
const RECONCILE_MIN_LOCAL = 1000

const full = process.argv.includes('--full')
const serverDir = process.cwd() // apps/server
const prismaDir = join(serverDir, 'prisma')
const mediaDir = join(serverDir, 'media')
const stateFile = join(mediaDir, '.backup-state')

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
})

function log(msg) {
  console.log(`[backup ${new Date().toISOString()}] ${msg}`)
}

async function putFile(key, absPath) {
  await s3.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: createReadStream(absPath) }))
}

/** SQLite 一致快照：VACUUM INTO（SQLite ≥3.27），服务运行中也可安全执行 */
async function snapshotDb() {
  const stamp = new Date().toISOString().slice(0, 10)
  const snapshotPath = join(prismaDir, `backup-${stamp}.db`)
  const tmpPath = `${snapshotPath}.${Math.random().toString(36).slice(2, 8)}.tmp`
  const db = new PrismaClient({ datasources: { db: { url: dbUrl } } })
  try {
    // 文件名里的单引号转义；路径统一正斜杠
    const target = tmpPath.replace(/\\/g, '/').replace(/'/g, "''")
    await db.$executeRawUnsafe(`VACUUM INTO '${target}'`)
  } finally {
    await db.$disconnect()
  }
  renameSync(tmpPath, snapshotPath)
  return snapshotPath
}

async function listKeys(prefix) {
  const keys = []
  let token
  do {
    const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: token }))
    for (const obj of page.Contents ?? []) keys.push({ key: obj.Key, size: obj.Size ?? 0 })
    token = page.IsTruncated ? page.NextContinuationToken : undefined
  } while (token)
  return keys
}

async function uploadDbSnapshot() {
  const snap = await snapshotDb()
  const key = `db/${snap.split(sep).pop()}`
  await putFile(key, snap)
  log(`数据库快照已上传：${key} (${statSync(snap).size} bytes)`)
  const all = (await listKeys('db/')).sort((a, b) => a.key.localeCompare(b.key))
  for (const old of all.slice(0, Math.max(0, all.length - DB_KEEP))) {
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: old.key }))
    log(`清理过期快照：${old.key}`)
  }
}

/**
 * 可再生产物不进备份（2026-09-26 R2 超免费线治理，2026-09-28 扩充）：
 *   tts-public/ 公共预生成音频——media 桶是服务正本；
 *   tts/ 家庭 TTS 缓存——纯缓存，未命中自动重新合成，正文数据在 DB 已备份；
 *   videos/ mp4——gen-video.ts 可确定性地重新生成，不值得异地副本；
 *   .thumb/.reader.webp 变体——可由原图确定性派生；
 *   三个清单/状态文件——运行状态，非数据。
 */
function isDerivedMedia(rel) {
  if (rel.startsWith('tts-public/')) return true
  if (rel.startsWith('tts/')) return true
  if (rel.startsWith('videos/')) return true
  if (rel === '.tts-public-state.json' || rel === '.r2-sync-state') return true
  if (/\.(thumb|reader)\.webp$/.test(rel)) return true
  return false
}

/**
 * 以本地 media/ 为唯一真值对账备份桶（2026-09-28）：
 * 远端 media/ 下凡本地没有的对象——历史误传残留、本地已删文件、全部可再生产物——
 * 一律删除。幂等：每次备份例行执行，桶不会再只增不删。
 * 护栏：media/ 不存在或本地真值低于 RECONCILE_MIN_LOCAL 时拒绝对账，
 * 防止目录挂错/损坏导致整桶被当孤儿清空。
 */
async function reconcileRemoteMedia(dryRun) {
  if (!existsSync(mediaDir)) {
    log('media/ 不存在，拒绝对账删除')
    return
  }
  const desired = new Set()
  walkMedia(mediaDir, (abs) => {
    const rel = relative(mediaDir, abs).split(sep).join('/')
    if (rel === '.backup-state' || isDerivedMedia(rel)) return
    desired.add(`media/${rel}`)
  })
  if (desired.size < RECONCILE_MIN_LOCAL) {
    log(`本地真值仅 ${desired.size} 个（< ${RECONCILE_MIN_LOCAL}），拒绝对账删除`)
    return
  }
  const remote = await listKeys('media/')
  const orphans = remote.filter((k) => !desired.has(k.key))
  const orphanBytes = orphans.reduce((s, k) => s + k.size, 0)
  log(`对账：远端 ${remote.length} / 本地真值 ${desired.size} / 孤儿 ${orphans.length} 个（${(orphanBytes / 1048576).toFixed(1)}MB）`)
  for (const k of orphans.slice(0, 20)) log(`  ${dryRun ? '将删' : '待删'} ${k.key} (${(k.size / 1048576).toFixed(2)}MB)`)
  if (orphans.length > 20) log(`  …等共 ${orphans.length} 个`)
  if (dryRun) {
    log('DRY-RUN 结束：例行运行（无 --dry-run）时将删除上述孤儿')
    return
  }
  if (orphans.length === 0) return
  for (let i = 0; i < orphans.length; i += 1000) {
    const batch = orphans.slice(i, i + 1000).map((k) => ({ Key: k.key }))
    try {
      await s3.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: batch, Quiet: true } }))
    } catch (err) {
      log(`批量删除失败，退回逐个：${err.message?.slice(0, 80)}`)
      for (const k of orphans.slice(i, i + 1000)) {
        await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: k.key })).catch(() => {})
      }
    }
  }
  if (existsSync(stateFile)) {
    try {
      const m = JSON.parse(readFileSync(stateFile, 'utf8'))
      for (const k of orphans) delete m[k.key.replace(/^media\//, '')]
      writeFileSync(stateFile, JSON.stringify(m))
    } catch { /* 清单瘦身失败不阻塞备份 */ }
  }
  log(`孤儿清理完成：${orphans.length} 个（${(orphanBytes / 1048576).toFixed(1)}MB）`)
}

function walkMedia(dir, cb) {
  if (!existsSync(dir)) return
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) walkMedia(abs, cb)
    else cb(abs, st)
  }
}

async function syncMedia() {
  if (!existsSync(mediaDir)) {
    log('media/ 目录不存在，跳过媒体同步')
    return
  }
  // 清单：相对路径 → 上次成功上传时的 mtimeMs；mtime 一致即已上过
  let manifest = {}
  if (!full && existsSync(stateFile)) {
    try {
      manifest = JSON.parse(readFileSync(stateFile, 'utf8'))
    } catch {
      manifest = {}
    }
  }
  const next = { ...manifest }
  const pending = []
  walkMedia(mediaDir, (abs, st) => {
    const rel = relative(mediaDir, abs).split(sep).join('/')
    if (rel === '.backup-state') return
    if (isDerivedMedia(rel)) return
    if (full || manifest[rel] !== st.mtimeMs) pending.push({ rel, abs, mtimeMs: st.mtimeMs })
  })
  log(`媒体待上传 ${pending.length} 个${full ? '（--full）' : ''}`)
  let uploaded = 0
  let failed = 0
  for (const item of pending) {
    try {
      await putFile(`media/${item.rel}`, item.abs)
      next[item.rel] = item.mtimeMs
      uploaded++
    } catch (err) {
      failed++
      log(`上传失败 ${item.rel}: ${err.message}（清单未记录，下次补传）`)
    }
  }
  writeFileSync(stateFile, JSON.stringify(next), 'utf8')
  log(`媒体同步完成：本次 ${uploaded} 个上传，${failed} 个失败；清单共 ${Object.keys(next).length} 个文件`)
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  if (!dryRun) {
    try {
      await s3.send(new HeadBucketCommand({ Bucket: bucket }))
      log(`bucket 就绪：${bucket}`)
    } catch (err) {
      // R2 对不存在的桶 HeadBucket 返回 404/NotFound
      if (err?.$metadata?.httpStatusCode === 404 || err.name === 'NotFound') {
        const { CreateBucketCommand } = await import('@aws-sdk/client-s3')
        await s3.send(new CreateBucketCommand({ Bucket: bucket }))
        log(`已创建 bucket：${bucket}`)
      } else {
        throw err
      }
    }
  }
  if (dryRun) {
    log('--dry-run：只出对账报告，不上传不删除')
    await reconcileRemoteMedia(true)
    return
  }
  await uploadDbSnapshot()
  await reconcileRemoteMedia(false)
  await syncMedia()
  log('备份全部完成')
}

main().catch((err) => {
  console.error('[backup] 失败：', err.message)
  process.exit(1)
})
