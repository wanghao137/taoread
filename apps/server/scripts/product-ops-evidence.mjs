// Read-only provider probes. Explicit config paths; never print configuration or raw errors.
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'
import dotenv from 'dotenv'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NodeHttpHandler } from '@smithy/node-http-handler'
import { inventoryR2Account, R2_WARNING_BYTES, R2_STOP_BYTES } from './lib/r2-capacity.mjs'
import { audioSettings, audioClient, listAudio } from './lib/public-audio-store.mjs'
const directory = process.argv.find(x => x.startsWith('--config-dir='))?.slice(13)
const output = process.argv.find(x => x.startsWith('--output='))?.slice(9)
if (!directory || !output) throw Error('Explicit --config-dir and --output required')
const started = Date.now()
const evidence = { sampledAt: new Date().toISOString(), readOnly: true, accounts: [], recovery: null }
async function config(file) { return dotenv.parse(await readFile(join(directory, file))) }
const handler = () => new NodeHttpHandler({ connectionTimeout: 10000, requestTimeout: 30000 })
try {
  const env = { ...await config('.env'), ...await config('.env.r2') }
  const client = new S3Client({ region: 'auto', endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY }, maxAttempts: 1, requestHandler: handler() })
  try {
    const snapshot = await inventoryR2Account(client)
    let ledger = null
    try { const stored = JSON.parse(await readFile(join(env.TAO_R2_CAPACITY_DIR || join(homedir(), '.taoread', 'r2-capacity'), `${env.R2_ACCOUNT_ID}.json`), 'utf8')); ledger = { measuredAt: new Date(stored.scannedAt).toISOString(), projectedBytes: stored.bytes, unconfirmedBytes: Math.max(0, stored.bytes - snapshot.bytes) } } catch { /* no host reservation snapshot */ }
    evidence.accounts.push({ accountId: env.R2_ACCOUNT_ID, coverage: 'all-buckets-and-multipart', ...snapshot, ledger, warningBytes: R2_WARNING_BYTES, stopBytes: R2_STOP_BYTES, under10GB: snapshot.bytes < 10000000000 })
  } finally { client.destroy() }
} catch { evidence.accounts.push({ coverage: 'all-buckets-and-multipart', verified: false, error: 'Inventory unavailable; do not authorize uploads from this probe' }) }
try {
  const env = await config('.env.audio'); const settings = audioSettings(env); const client = audioClient(settings)
  try { const objects = await listAudio(client, settings.bucket); evidence.accounts.push({ accountId: settings.accountId, bucket: settings.bucket, coverage: 'dedicated-audio-bucket-only', bytes: objects.reduce((sum, x) => sum + (x.bytes ?? 0), 0), count: objects.length, wholeAccountVerified: false, stopBytes: settings.target === 'r2-worker' ? 5400000000 : R2_STOP_BYTES }) } finally { client.destroy() }
} catch { evidence.accounts.push({ coverage: 'dedicated-audio-bucket-only', verified: false, error: 'Audio inventory unavailable' }) }
try {
  const env = await config('.env.backup'); const endpoint = env.BACKUP_S3_ENDPOINT
  const region = env.BACKUP_S3_REGION || /(?:\/\/|\.)s3\.([a-z0-9-]+)\.backblazeb2\.com/.exec(endpoint)?.[1] || 'auto'
  const client = new S3Client({ endpoint, region, credentials: { accessKeyId: env.BACKUP_ACCESS_KEY_ID, secretAccessKey: env.BACKUP_SECRET_ACCESS_KEY }, maxAttempts: 1, requestHandler: handler() })
  try {
    const keys = []; let token
    do { const result = await client.send(new ListObjectsV2Command({ Bucket: env.BACKUP_BUCKET, Prefix: 'recovery/', ContinuationToken: token })); keys.push(...(result.Contents ?? []).map(x => x.Key)); token = result.IsTruncated ? result.NextContinuationToken : undefined } while (token)
    keys.sort(); evidence.recovery = { manifests: keys.length, latest: keys.at(-1), historical: keys.length > 1 ? keys[0] : null, restored: false }
  } finally { client.destroy() }
} catch { evidence.recovery = { restored: false, error: 'Backup manifest listing unavailable' } }
evidence.elapsedMs = Date.now() - started
await mkdir(resolve(output, '..'), { recursive: true }); await writeFile(output, JSON.stringify(evidence, null, 2))
console.log(JSON.stringify(evidence, null, 2))
