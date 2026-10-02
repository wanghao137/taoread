/** Restore to a NEW directory only. --sample verifies DB plus one archived original. */
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve, join, relative, isAbsolute } from 'node:path'
import { createHash } from 'node:crypto'
import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
dotenv.config()
dotenv.config({ path: '.env.r2', override: true })
dotenv.config({ path: '.env.backup', override: true })
const targetArg = process.argv.find((v) => v.startsWith('--target='))?.slice(9)
if (!targetArg) throw new Error('A new --target=ABSOLUTE_DIRECTORY is required')
const target = resolve(targetArg)
if (existsSync(target) || !isAbsolute(targetArg)) throw new Error('Restore destination must be a new absolute directory')
const r2Fallback = process.argv.includes('--r2-fallback')
const endpoint = (r2Fallback ? null : process.env.BACKUP_S3_ENDPOINT) || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
const bucket = r2Fallback ? 'taoread-backup' : process.env.BACKUP_BUCKET || process.env.R2_BUCKET || 'taoread-backup'
const region = (r2Fallback ? null : process.env.BACKUP_S3_REGION) || /(?:\/\/|\.)s3\.([a-z0-9-]+)\.backblazeb2\.com/.exec(endpoint)?.[1] || 'auto'
const s3 = new S3Client({ endpoint, region, credentials: { accessKeyId: (r2Fallback ? null : process.env.BACKUP_ACCESS_KEY_ID) || process.env.R2_ACCESS_KEY_ID, secretAccessKey: (r2Fallback ? null : process.env.BACKUP_SECRET_ACCESS_KEY) || process.env.R2_SECRET_ACCESS_KEY } })
async function get(key) {
  const r = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  if (!r.Body || (r.ContentLength ?? 0) > 100 * 1024 * 1024) throw new Error('Backup object missing or too large')
  return Buffer.from(await r.Body.transformToByteArray())
}
function destination(path) {
  const abs = resolve(target, path)
  const rel = relative(target, abs)
  if (!rel || rel.startsWith('..') || isAbsolute(rel)) throw new Error('Manifest path escapes destination')
  return abs
}
async function main() {
  let keys = [], token
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: 'recovery/', ContinuationToken: token }))
    keys.push(...(r.Contents ?? []).map((o) => o.Key).filter(Boolean))
    token = r.IsTruncated ? r.NextContinuationToken : undefined
  } while (token)
  const key = process.argv.find((v) => v.startsWith('--manifest='))?.slice(11) || keys.sort().at(-1)
  if (!key || !key.startsWith('recovery/')) throw new Error('No immutable recovery manifest found')
  const manifest = JSON.parse((await get(key)).toString('utf8'))
  if (manifest.version !== 1 || manifest.consistency !== 'quiescent' || !/^db\/backup-[\w-]+\.db$/.test(manifest.database)) throw new Error('Invalid or unverified recovery manifest')
  mkdirSync(target)
  const database = join(target, 'restored.db')
  const databaseBuffer = await get(manifest.database)
  if (databaseBuffer.length !== manifest.databaseBytes || createHash('sha256').update(databaseBuffer).digest('hex') !== manifest.databaseSha256) throw new Error('Database hash verification failed')
  writeFileSync(database, databaseBuffer, { flag: 'wx' })
  const db = new PrismaClient({ datasources: { db: { url: `file:${database.replace(/\\/g, '/')}` } } })
  let counts
  try {
    const integrity = await db.$queryRawUnsafe('PRAGMA integrity_check')
    if (integrity.length !== 1 || Object.values(integrity[0])[0] !== 'ok') throw new Error('SQLite integrity check failed')
    counts = { families: await db.family.count(), books: await db.book.count(), sessions: await db.cosession.count() }
    const assets = await db.artAsset.findMany({ select: { urlPath: true, bytes: true } })
    for (const asset of assets) {
      if (!asset.urlPath.startsWith('/api/media/')) throw new Error('Unsupported media reference')
      const info = manifest.media?.[asset.urlPath.slice('/api/media/'.length)]
      if (!info || info.key !== `media-archive/${info.hash}`) throw new Error('Database media reference absent from recovery manifest')
    }
  } finally { await db.$disconnect() }
  let entries = Object.entries(manifest.media ?? {})
  if (process.argv.includes('--sample')) entries = entries.slice(0, 1)
  for (const [path, info] of entries) {
    if (!/^media-archive\/[a-f0-9]{64}$/.test(info.key)) throw new Error('Invalid archive key')
    const bytes = await get(info.key)
    if (createHash('sha256').update(bytes).digest('hex') !== info.hash || bytes.length !== info.bytes) throw new Error('Media hash verification failed')
    const dest = destination(`media/${path}`)
    mkdirSync(dirname(dest), { recursive: true })
    writeFileSync(dest, bytes, { flag: 'wx' })
  }
  console.log(JSON.stringify({ integrity: 'ok', counts, mediaVerified: entries.length, mode: process.argv.includes('--sample') ? 'sample' : 'full', target }))
}
main().catch(() => { console.error('Restore verification failed; source and original runtime were not modified.'); process.exitCode = 1 })
