/** Restore to a NEW directory only. --sample verifies DB plus one archived original. */
import dotenv from 'dotenv'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { dirname, resolve, join, relative, isAbsolute } from 'node:path'
import { createHash } from 'node:crypto'
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import { NodeHttpHandler } from '@smithy/node-http-handler'
import { parseDeletionLedger, isDeletedFamily } from './lib/deletion-ledger.mjs'
import { createBackupReader } from './lib/backup-read.mjs'
dotenv.config()
dotenv.config({ path: '.env.r2', override: true })
dotenv.config({ path: '.env.backup', override: true })
const targetArg = process.argv.find((v) => v.startsWith('--target='))?.slice(9)
if (!targetArg) throw new Error('A new --target=ABSOLUTE_DIRECTORY is required')
const target = resolve(targetArg)
let restoreStage = 'configuration'
const auditOnly = process.argv.includes('--audit-only')
const ledgerPath = process.argv.find(v => v.startsWith('--deletion-ledger='))?.slice(18)
if (!auditOnly && (!ledgerPath || !isAbsolute(ledgerPath))) throw new Error('Recovery requires a fresh absolute --deletion-ledger; --audit-only is for isolated verification and cannot be promoted')
const deleted = ledgerPath ? parseDeletionLedger(JSON.parse(readFileSync(ledgerPath, 'utf8'))) : null
const cacheArg = process.argv.find(v => v.startsWith('--archive-cache='))?.slice(16)
if (cacheArg && !isAbsolute(cacheArg)) throw new Error('Archive cache must be absolute')
const maxDownloadsArg = process.argv.find(v => v.startsWith('--max-downloads='))?.slice(16)
const maxDownloads = maxDownloadsArg ? Number(maxDownloadsArg) : Infinity
if (!(maxDownloads >= 1) || (maxDownloadsArg && !Number.isInteger(maxDownloads))) throw new Error('Invalid archive download budget')
let archiveDownloads = 0, reusedArchives = 0
if (existsSync(target) || !isAbsolute(targetArg)) throw new Error('Restore destination must be a new absolute directory')
if (process.argv.includes('--r2-fallback')) throw new Error('R2 备份回退已禁用')
const endpoint = process.env.BACKUP_S3_ENDPOINT
const bucket = process.env.BACKUP_BUCKET
const accessKeyId = process.env.BACKUP_ACCESS_KEY_ID
const secretAccessKey = process.env.BACKUP_SECRET_ACCESS_KEY
if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) throw new Error('必须显式配置 BACKUP_* 离机恢复目标')
const region = process.env.BACKUP_S3_REGION || /(?:\/\/|\.)s3\.([a-z0-9-]+)\.backblazeb2\.com/.exec(endpoint)?.[1] || 'auto'
const reader = createBackupReader(() => new S3Client({ endpoint, region, credentials: { accessKeyId, secretAccessKey }, maxAttempts: 1, requestHandler: new NodeHttpHandler({ connectionTimeout: 10000, requestTimeout: 45000 }) }), bucket)
const get = key => reader.get(key)
function destination(path) {
  const abs = resolve(target, path)
  const rel = relative(target, abs)
  if (!rel || rel.startsWith('..') || isAbsolute(rel)) throw new Error('Manifest path escapes destination')
  return abs
}
async function main() {
  const startedAt = Date.now()
  restoreStage = 'list-manifests'
  let keys = [], token
  do {
    const r = await reader.client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: 'recovery/', ContinuationToken: token }))
    keys.push(...(r.Contents ?? []).map((o) => o.Key).filter(Boolean))
    token = r.IsTruncated ? r.NextContinuationToken : undefined
  } while (token)
  const key = process.argv.find((v) => v.startsWith('--manifest='))?.slice(11) || keys.sort().at(-1)
  if (!key || !key.startsWith('recovery/')) throw new Error('No immutable recovery manifest found')
  restoreStage = 'read-manifest'
  const manifest = JSON.parse((await get(key)).toString('utf8'))
  restoreStage = 'validate-manifest'
  if (manifest.version !== 1 || manifest.consistency !== 'quiescent' || !/^db\/backup-[\w-]+\.db$/.test(manifest.database)) throw new Error('Invalid or unverified recovery manifest')
  mkdirSync(target)
  writeFileSync(join(target, 'verified-recovery-manifest.json'), JSON.stringify(manifest, null, 2), { flag: 'wx' })
  const database = join(target, 'restored.db')
  restoreStage = 'read-database'
  const databaseBuffer = await get(manifest.database)
  restoreStage = 'verify-database'
  if (databaseBuffer.length !== manifest.databaseBytes || createHash('sha256').update(databaseBuffer).digest('hex') !== manifest.databaseSha256) throw new Error('Database hash verification failed')
  writeFileSync(database, databaseBuffer, { flag: 'wx' })
  const db = new PrismaClient({ datasources: { db: { url: `file:${database.replace(/\\/g, '/')}` } } })
  let counts, suppressedFamilies = 0
  restoreStage = 'database-integrity-and-media-references'
  try {
    const integrity = await db.$queryRawUnsafe('PRAGMA integrity_check')
    if (integrity.length !== 1 || Object.values(integrity[0])[0] !== 'ok') throw new Error('SQLite integrity check failed')
    if (deleted) {
      const excluded = (await db.family.findMany({ select: { id: true } })).filter(row => isDeletedFamily(row.id, deleted)).map(row => row.id)
      suppressedFamilies = (await db.family.deleteMany({ where: { id: { in: excluded } } })).count
    }
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
  if (cacheArg) mkdirSync(cacheArg, { recursive: true })
  for (const [path, info] of entries) {
    restoreStage = 'read-and-verify-media'
    if (!/^media-archive\/[a-f0-9]{64}$/.test(info.key)) throw new Error('Invalid archive key')
    let bytes
    const cached = cacheArg ? join(cacheArg, info.hash) : null
    if (cached && existsSync(cached)) {
      const candidate = readFileSync(cached)
      if (candidate.length === info.bytes && createHash('sha256').update(candidate).digest('hex') === info.hash) { bytes = candidate; reusedArchives++ }
      else throw Object.assign(new Error('Previously downloaded archive cache is corrupt'), { restoreCode: 'CACHE_INTEGRITY_FAILED' })
    }
    if (!bytes) {
      if (archiveDownloads >= maxDownloads) { writeFileSync(join(target, 'restore-incomplete.json'), JSON.stringify({ complete: false, reason: 'Explicit provider read budget reached', archiveDownloads, attemptedReads: reader.attemptedReads, reusedArchives, requiredUniqueArchives: new Set(entries.map(([, v]) => v.hash)).size }, null, 2)); throw Object.assign(new Error('Archive read budget reached'), { restoreCode:'READ_BUDGET_REACHED' }) }
      bytes = await get(info.key); archiveDownloads++
    }
    if (createHash('sha256').update(bytes).digest('hex') !== info.hash || bytes.length !== info.bytes) throw Object.assign(new Error('Media hash verification failed'), { restoreCode: 'MEDIA_INTEGRITY_FAILED' })
    if (cached && !existsSync(cached)) writeFileSync(cached, bytes, { flag: 'wx' })
    const dest = destination(`media/${path}`)
    mkdirSync(dirname(dest), { recursive: true })
    writeFileSync(dest, bytes, { flag: 'wx' })
  }
  const report = { integrity: 'ok', counts, mediaVerified: entries.length, archiveDownloads, attemptedReads: reader.attemptedReads, reusedArchives, mode: process.argv.includes('--sample') ? 'sample' : 'full', auditOnly, deletionProtectionChecked: Boolean(deleted), promotionRequiresReadingAndListeningAcceptance: true, suppressedFamilies, recoverySeconds: Math.round((Date.now() - startedAt) / 1000), recoveryPoint: manifest.createdAt ?? key, target }
  writeFileSync(join(target, 'restore-verification.json'), JSON.stringify(report, null, 2), { flag: 'wx' })
  console.log(JSON.stringify(report))
}
main().catch(error => { console.error(JSON.stringify({ restore: 'failed', stage: restoreStage, errorType: /^[A-Za-z][A-Za-z0-9_]{0,60}$/.test(error?.name ?? '') ? error.name : 'ProviderOrVerificationError', reasonCode: error.restoreCode ?? (/^E[A-Z_]+$/.test(error.code ?? '') ? error.code : null), attemptedReads: reader.attemptedReads, httpStatus: error?.$metadata?.httpStatusCode ?? null, sourceModified: false })); process.exitCode = 1 }).finally(() => reader.destroy())
