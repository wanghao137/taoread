/**
 * 桃阅读离机备份 → Cloudflare R2（交接文档 G2/F38：同机复制不是完整灾备）。
 *
 * 每次运行：
 *   1. SQLite 一致快照（VACUUM INTO，可在服务运行时执行）；
 *   2. 上传快照到 r2://<bucket>/db/（保留最近 7 份，其余删除）；
 *   3. 增量同步 media/：只上传「水位之后有修改」的文件到 r2://<bucket>/media/；
 *      首次运行（或加 --full）全量上传。
 * 完成后写 media/.backup-state（增量水位），失败不写——下次自动重传窗口内容。
 *
 * 环境变量（.env.r2，绝不提交）：
 *   TAO_DATABASE_URL（如 file:./prod.db）、R2_ACCOUNT_ID、R2_ACCESS_KEY_ID、
 *   R2_SECRET_ACCESS_KEY、R2_BUCKET（默认 taoread-backup）
 * 用法（apps/server 目录）：
 *   node --import tsx scripts/backup-to-r2.mjs [--full]
 */
import { createReadStream, existsSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { DeleteObjectCommand, HeadBucketCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
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
    for (const obj of page.Contents ?? []) keys.push({ key: obj.Key, lastModified: obj.LastModified })
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
  for (const old of all.slice(0, Math.max(0, all.length - 7))) {
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: old.key }))
    log(`清理过期快照：${old.key}`)
  }
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
  let watermark = 0
  if (!full && existsSync(stateFile)) watermark = Number(readFileSync(stateFile, 'utf8').trim()) || 0
  const now = Date.now()
  const candidates = []
  walkMedia(mediaDir, (abs, st) => {
    const rel = relative(mediaDir, abs).split(sep).join('/')
    if (rel === '.backup-state') return
    if (full || st.mtimeMs > watermark) candidates.push({ abs, rel, mtimeMs: st.mtimeMs })
  })
  let uploaded = 0
  let failed = 0
  let maxMtime = watermark
  for (const item of candidates) {
    try {
      await putFile(`media/${item.rel}`, item.abs)
      uploaded++
      maxMtime = Math.max(maxMtime, item.mtimeMs)
    } catch (err) {
      failed++
      log(`上传失败 ${item.rel}: ${err.message}`)
    }
  }
  if (failed === 0) {
    writeFileSync(stateFile, String(Math.min(maxMtime, now)), 'utf8')
  }
  log(`媒体同步完成：${uploaded} 个上传${full ? '（全量）' : '（增量）'}${failed ? `，${failed} 个失败（水位未推进）` : ''}`)
}

async function main() {
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
  await uploadDbSnapshot()
  await syncMedia()
  log('备份全部完成')
}

main().catch((err) => {
  console.error('[backup] 失败：', err.message)
  process.exit(1)
})
