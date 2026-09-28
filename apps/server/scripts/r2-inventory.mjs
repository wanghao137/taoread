/**
 * R2 桶 inventory（只读清点，2026-09-28 免费线治理）。
 *
 * 分页 ListObjectsV2 扫桶，按一级/二级前缀聚合对象数与字节数——看总量、找孤儿、
 * 给删除对账提供基线。只读，不改任何对象。
 *
 * 用法（apps/server 目录，需 .env.r2 凭据）：
 *   node scripts/r2-inventory.mjs                      # 清点 taoread 两桶
 *   node scripts/r2-inventory.mjs --bucket=taoread-backup
 */
import dotenv from 'dotenv'
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'

dotenv.config()
dotenv.config({ path: '.env.r2', override: true })

const accountId = process.env.R2_ACCOUNT_ID
const accessKey = process.env.R2_ACCESS_KEY_ID
const secretKey = process.env.R2_SECRET_ACCESS_KEY
if (!accountId || !accessKey || !secretKey) throw new Error('R2 凭据缺失')

const only = process.argv.find((a) => a.startsWith('--bucket='))?.split('=')[1]
const buckets = only
  ? [only]
  : [process.env.R2_BUCKET || 'taoread-backup', process.env.TAO_R2_MEDIA_BUCKET || 'taoread-media']

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
})

function log(msg) {
  console.log(`[inventory ${new Date().toISOString()}] ${msg}`)
}

const mb = (n) => `${(n / 1048576).toFixed(1)}MB`

async function scan(bucket) {
  const agg = new Map()
  let token
  let count = 0
  let bytes = 0
  do {
    const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }))
    for (const o of page.Contents ?? []) {
      const seg = o.Key.split('/')
      const size = o.Size ?? 0
      const bump = (p) => {
        const cur = agg.get(p) ?? { count: 0, bytes: 0 }
        cur.count++
        cur.bytes += size
        agg.set(p, cur)
      }
      bump(seg.length > 1 ? `${seg[0]}/` : '(根)')
      if (seg.length > 2) bump(`${seg[0]}/${seg[1]}/`)
      count++
      bytes += size
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined
  } while (token)
  return { agg, count, bytes }
}

for (const bucket of buckets) {
  log(`清点 ${bucket} …`)
  const t0 = Date.now()
  const { agg, count, bytes } = await scan(bucket)
  log(`${bucket} 合计：${count} 个对象，${mb(bytes)}`)
  const rows = [...agg.entries()].sort((a, b) => b[1].bytes - a[1].bytes)
  for (const [p, v] of rows) {
    console.log(`  ${p.padEnd(28)} ${String(v.count).padStart(7)} 个  ${mb(v.bytes).padStart(12)}`)
  }
  log(`${bucket} 完成，耗时 ${Math.round((Date.now() - t0) / 1000)}s`)
}
