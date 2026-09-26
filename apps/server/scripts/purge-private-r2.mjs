/**
 * R2 公共桶隐私清理（docs/32 遗留 #4，2026-09-27）。
 *
 * sync-media-r2.mjs 的 fam- 过滤是后补的：此前已同步上公共桶 taoread-media
 * 的家庭私有插画（fam- 前缀 / DB fam: 场景）需要一次清单比对后删除。
 * 备份桶 taoread-backup 为私有访问、本就是本地 media 的灾备副本，不在清理范围。
 *
 * 用法（apps/server 目录）：
 *   node scripts/purge-private-r2.mjs            # 只清点（DRY-RUN），打印将删对象
 *   node scripts/purge-private-r2.mjs --delete   # 真删（每批 1000，DeleteObjects）
 *
 * 安全护栏：
 *   - 只处理 taoread-media 桶 art/ 前缀下的对象，tts-public/ 等一律不碰；
 *   - 判定与同步脚本同一套规则（文件名 fam- 前缀 ∪ DB ArtAsset fam: 场景文件名），
 *     两套依据里命中任一即视为私有；判定为私有的本地源文件不受影响。
 */
import dotenv from 'dotenv'
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3'

dotenv.config()
dotenv.config({ path: '.env.r2', override: true })

const accountId = process.env.R2_ACCOUNT_ID
const accessKey = process.env.R2_ACCESS_KEY_ID
const secretKey = process.env.R2_SECRET_ACCESS_KEY
if (!accountId || !accessKey || !secretKey) throw new Error('R2 凭据缺失')
const bucket = process.env.TAO_R2_MEDIA_BUCKET || 'taoread-media'
const doDelete = process.argv.includes('--delete')

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
})

function log(msg) {
  console.log(`[purge ${new Date().toISOString()}] ${msg}`)
}

// ── 私有文件名集合（与 sync-media-r2.mjs 同口径）──
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

const isPrivateBase = (n) => n.replace(/\.webp$/, '').startsWith('fam-') || privateDbNames.has(n.replace(/\.webp$/, ''))

// ── 清点 art/ 下全部对象 ──
const privateKeys = []
let scanned = 0
let totalBytes = 0
let continuationToken
do {
  const page = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: 'art/',
      MaxKeys: 1000,
      ...(continuationToken ? { ContinuationToken: continuationToken } : {}),
    }),
  )
  for (const obj of page.Contents ?? []) {
    scanned++
    totalBytes += obj.Size ?? 0
    const base = obj.Key.split('/').pop()
    if (base && isPrivateBase(base)) privateKeys.push({ Key: obj.Key, Size: obj.Size ?? 0 })
  }
  continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined
} while (continuationToken)

log(`扫描 ${scanned} 个对象（art/ 共 ${(totalBytes / 1048576).toFixed(1)}MB），命中私有 ${privateKeys.length} 个（${(privateKeys.reduce((s, o) => s + o.Size, 0) / 1048576).toFixed(2)}MB）`)
for (const o of privateKeys.slice(0, 20)) log(`  ${doDelete ? '待删' : '示例'} ${o.Key}`)
if (privateKeys.length > 20) log(`  …等共 ${privateKeys.length} 个`)

if (!doDelete) {
  log('DRY-RUN 结束：确认无误后加 --delete 执行删除')
  process.exit(0)
}

if (privateKeys.length === 0) {
  log('无需要删除的对象')
  process.exit(0)
}

let deleted = 0
for (let i = 0; i < privateKeys.length; i += 1000) {
  const batch = privateKeys.slice(i, i + 1000).map((o) => ({ Key: o.Key }))
  const res = await s3.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: batch, Quiet: true } }))
  deleted += batch.length - (res.Errors?.length ?? 0)
  if (res.Errors?.length) for (const e of res.Errors.slice(0, 5)) log(`删除失败 ${e.Key}: ${e.Message}`)
  log(`进度 ${deleted}/${privateKeys.length}`)
}
log(`结束：删除 ${deleted}/${privateKeys.length} 个私有对象`)

if (!process.env.TAO_R2_MEDIA_BUCKET) {
  log('提示：清理的是公共桶 taoread-media；本地源文件未动。')
}
