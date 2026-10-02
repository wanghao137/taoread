/**
 * 桃阅读离机备份 → 显式配置的 B2 桶（同机复制不是完整灾备）。
 *
 * 每次运行：
 *   1. SQLite 一致快照（VACUUM INTO，可在服务运行时执行）；
 *   2. SHA256 原图归档，增量状态绑定目标；历史版本永不自动删除；
 *   3. 上传数据库快照，最后发布引用不可变媒体的完整恢复清单；
 *   4. 只有显式 --prune-mirror 才对账删除旧 media/ 镜像，不影响归档。
 *
 * 可再生产物不进备份（见 isDerivedMedia）：tts-public/、videos/、缩图变体、清单文件。
 *
 * 环境变量（.env → .env.r2 → 可选 .env.backup 逐层覆盖）：
 *   TAO_DATABASE_URL（如 file:./prod.db）
 *   BACKUP_S3_ENDPOINT + BACKUP_ACCESS_KEY_ID + BACKUP_SECRET_ACCESS_KEY
 *   + BACKUP_BUCKET（region 从 B2 endpoint 自动解析，也可 BACKUP_S3_REGION 显式给）。
 * 用法（apps/server 目录）：
 *   node --import tsx scripts/backup-to-r2.mjs [--full] [--dry-run]
 *   --dry-run：只出对账报告，不上传不删除
 *   --full：重传全部原图；切换目标自动使用独立状态清单。
 */
import { createReadStream, existsSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { DeleteObjectsCommand, DeleteObjectCommand, HeadBucketCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'

// 先 .env 再 .env.r2（后者可覆盖），最后可选 .env.backup（离机备份目标）
dotenv.config()
dotenv.config({ path: '.env.r2', override: true })
dotenv.config({ path: '.env.backup', override: true })

const dbUrl = process.env.TAO_DATABASE_URL
if (!dbUrl) throw new Error('TAO_DATABASE_URL 必填')
if (process.argv.includes('--r2-fallback')) throw new Error('R2 备份回退已禁用')
const endpoint = process.env.BACKUP_S3_ENDPOINT
const accessKey = process.env.BACKUP_ACCESS_KEY_ID
const secretKey = process.env.BACKUP_SECRET_ACCESS_KEY
const bucket = process.env.BACKUP_BUCKET
if (!endpoint || !accessKey || !secretKey || !bucket) throw new Error('必须显式配置 BACKUP_* 离机备份目标')
// 离机 DB 快照保留份数（2026-09-28 从 7 降到 3：快照 ~11MB，7 份无必要）
// 本地对账安全水位：walk 出的真值清单低于该数说明 media/ 可能挂错/损坏，拒绝删除
const RECONCILE_MIN_LOCAL = 1000

const full = process.argv.includes('--full')
const serverDir = process.cwd() // apps/server
const prismaDir = join(serverDir, 'prisma')
const mediaDir = join(serverDir, 'media')
const targetId = createHash('sha256').update(`${endpoint}|${bucket}`).digest('hex').slice(0, 16)
const stateFile = join(mediaDir, `.backup-state-${targetId}`)

// B2 的 SigV4 需真实 region（从 endpoint 主机名解析，如 s3.us-west-004 → us-west-004）；R2 用 auto
const region = process.env.BACKUP_S3_REGION
  || /(?:\/\/|\.)s3\.([a-z0-9-]+)\.backblazeb2\.com/.exec(endpoint ?? '')?.[1]
  || 'auto'

const s3 = new S3Client({
  region,
  endpoint,
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
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
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
  return { key, snap }
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
    if (rel.startsWith('.backup-state') || isDerivedMedia(rel)) return
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
    throw new Error('media/ 目录不存在，拒绝发布不完整恢复点')
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
  const next = {}
  // Listing is a bounded request; per-object HEAD exhausts B2's daily Class B cap.
  const remoteArchives = full ? new Map() : new Map((await listKeys('media-archive/')).map(({ key, size }) => [key, size]))
  const pending = new Map()
  walkMedia(mediaDir, (abs, st) => {
    const rel = relative(mediaDir, abs).split(sep).join('/')
    if (rel.startsWith('.backup-state')) return
    if (isDerivedMedia(rel)) return
    const hash = createHash('sha256').update(readFileSync(abs)).digest('hex')
    const archiveKey = `media-archive/${hash}`
    if (!full && manifest[rel]?.hash === hash && remoteArchives.get(archiveKey) === st.size) {
      next[rel] = manifest[rel]
    } else {
      const group = pending.get(hash) ?? { hash, abs, bytes: st.size, paths: [] }
      group.paths.push(rel)
      pending.set(hash, group)
    }
  })
  const groups = [...pending.values()]
  log(`媒体待上传 ${groups.length} 个唯一原图归档${full ? '（--full）' : ''}`)
  let uploaded = 0
  let failed = 0
  async function upload(item) {
    try {
      const bytes = readFileSync(item.abs)
      if (createHash('sha256').update(bytes).digest('hex') !== item.hash || bytes.length !== item.bytes) throw new Error('Media changed during scan; retry backup')
      if (process.argv.includes('--mirror')) {
        for (const rel of item.paths) await s3.send(new PutObjectCommand({ Bucket: bucket, Key: `media/${rel}`, Body: bytes }))
      }
      const archiveKey = `media-archive/${item.hash}`
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: archiveKey, Body: bytes, Metadata: { sha256: item.hash } }))
      for (const rel of item.paths) next[rel] = { hash: item.hash, key: archiveKey, bytes: item.bytes }
      uploaded++
      if (uploaded % 100 === 0) log(`原图归档进度 ${uploaded}/${groups.length}`)
    } catch (err) {
      failed += item.paths.length
      log(`上传失败 ${item.paths[0]}: ${err.message}（清单未记录，下次补传）`)
    }
  }
  for (let offset = 0; offset < groups.length; offset += 64) {
    await Promise.all(groups.slice(offset, offset + 64).map(upload))
    writeFileSync(stateFile, JSON.stringify(next), 'utf8')
  }
  writeFileSync(stateFile, JSON.stringify(next), 'utf8')
  if (failed) throw new Error(`媒体备份 ${failed} 个失败，本次不发布恢复清单`)
  log(`媒体同步完成：本次 ${uploaded} 个上传，${failed} 个失败；清单共 ${Object.keys(next).length} 个文件`)
  return next
}

async function main() {
  if (process.argv.includes('--prune-db')) throw new Error('禁止独立删除恢复清单引用的数据库；请制定完整恢复点保留策略')
  const dryRun = process.argv.includes('--dry-run')
  const archiveOnly = process.argv.includes('--archive-only')
  if (!dryRun && !archiveOnly) {
    if (!process.argv.includes('--quiescent')) throw new Error('完整恢复点要求停写；先停止 API/生成任务，再传 --quiescent。在线预传用 --archive-only')
    if (process.platform === 'win32') {
      if (process.env.TAO_BACKUP_COORDINATED !== '1') throw new Error('请通过持有全程互斥锁的 backup-consistent.ps1 或发布协调器执行')
      const status = execFileSync('powershell.exe', ['-NoProfile', '-Command', '(Get-Service taoread-api -ErrorAction Stop).Status.ToString()'], { encoding: 'utf8' }).trim()
      if (status !== 'Stopped') throw new Error('taoread-api 尚未停止，拒绝声明一致恢复点')
    }
  }
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
  if (archiveOnly) { await syncMedia(); log('在线媒体预传完成，尚未发布恢复点'); return }
  // A mirror is not recovery history. Deletion is explicit; immutable archives are never reconciled.
  if (process.argv.includes('--prune-mirror')) await reconcileRemoteMedia(false)
  const snapshot = await uploadDbSnapshot()
  const media = await syncMedia()
  await verifyReferences(snapshot.snap, media)
  await s3.send(new PutObjectCommand({
    Bucket: bucket, Key: `recovery/${snapshot.key.split('/').pop()}.json`,
    Body: JSON.stringify({ version: 1, consistency: 'quiescent', createdAt: new Date().toISOString(), database: snapshot.key, databaseSha256: createHash('sha256').update(readFileSync(snapshot.snap)).digest('hex'), databaseBytes: statSync(snapshot.snap).size, media: media ?? {} }),
    ContentType: 'application/json',
  }))
  // Old complete recovery points remain immutable; retention is an explicit operator policy.
  log('备份全部完成')
}

async function verifyReferences(path, media) {
  const db = new PrismaClient({ datasources: { db: { url: `file:${path.replace(/\\/g, '/')}` } } })
  try {
    const assets = await db.artAsset.findMany({ select: { urlPath: true, bytes: true } })
    let metadataByteDifferences = 0
    for (const asset of assets) {
      if (!asset.urlPath.startsWith('/api/media/')) throw new Error('Unsupported original media reference')
      const rel = asset.urlPath.slice('/api/media/'.length)
      if (!media[rel]) throw new Error('Database original media reference missing')
      if (media[rel].bytes !== asset.bytes) metadataByteDifferences++
    }
    log(`数据库原图引用核验 ${assets.length} 项通过；历史台账字节差异 ${metadataByteDifferences} 项，以归档实际 SHA256/字节为准；音频/视频/变体明确排除`)
  } finally { await db.$disconnect() }
}

main().catch((err) => {
  console.error('[backup] 失败：', err.message)
  process.exit(1)
})
