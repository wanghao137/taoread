/** Read-only --freeze, then explicitly --upload; never alters production index or deletes source. */
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises'
import { resolve, join, dirname } from 'node:path'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { AUDIO_KEY, audioSettings, audioClient, listAudio, getAudio, putAudio, sha256 } from './lib/public-audio-store.mjs'
import { authorizeB2, dedicatedAudioAuth, b2Versions } from './lib/b2-audio-inventory.mjs'
import { verificationBatch } from './lib/audio-verification-batch.mjs'
import { guardedR2Upload } from './lib/r2-capacity.mjs'

const arg = name => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3)
const required = name => { const value = arg(name); if (!value) throw Error(`Explicit --${name} required`); return resolve(value) }
const freezePath = required('freeze')
const freezing = process.argv.includes('--prepare')
const uploadOnly = process.argv.includes('--upload-only')
if (uploadOnly && !process.argv.includes('--upload')) throw Error('--upload-only requires --upload')
const concurrency = Number(arg('concurrency') || 4)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) throw Error('Concurrency must be 1..8')
const readEnv = async file => dotenv.parse(await readFile(file))
const atomic = async (path, value) => { await writeFile(`${path}.tmp`, JSON.stringify(value, null, 2)); await rename(`${path}.tmp`, path) }

async function prepare() {
  const media = required('media')
  const settings = audioSettings(await readEnv(required('r2-credentials')))
  if (settings?.target !== 'r2' || settings.bucket !== 'taoread-media') throw Error('Expected original R2 media bucket')
  const client = audioClient(settings)
  try {
    const indexBuffer = await readFile(join(media, '.tts-public-state.json'))
    const index = JSON.parse(indexBuffer)
    const files = await listAudio(client, settings.bucket)
    const frozen = []
    for (const file of files) {
      const buffer = await readFile(join(media, file.key))
      const rec = index[file.key.slice(11, -4)]
      const md5 = createHash('md5').update(buffer).digest('hex')
      if (buffer.length !== file.bytes || !rec?.uploaded || rec.bytes !== buffer.length) throw Error(`Production audio/index mismatch: ${file.key}`)
      // R2 single-part ETag is MD5. If not comparable, verify the complete object.
      if (file.etag !== `"${md5}"`) {
        const remote = await getAudio(client, settings.bucket, file.key)
        if (sha256(remote.bytes) !== sha256(buffer)) throw Error(`R2 source mismatch: ${file.key}`)
      }
      frozen.push({ ...file, sha256: sha256(buffer), md5, durationMs: rec.durationMs })
    }
    const keys = new Set(files.map(file => file.key.slice(11, -4)))
    if (Object.entries(index).some(([key, rec]) => rec.uploaded && !keys.has(key))) throw Error('Uploaded index entry missing from source inventory')
    if (sha256(await readFile(join(media, '.tts-public-state.json'))) !== sha256(indexBuffer)) throw Error('Production index changed during freeze')
    const again = await listAudio(client, settings.bucket)
    if (JSON.stringify(again) !== JSON.stringify(files)) throw Error('R2 audio changed during freeze')
    await mkdir(dirname(freezePath), { recursive: true })
    const result = { frozenAt: new Date().toISOString(), media, source: { bucket: settings.bucket, endpoint: settings.endpoint },
      indexSha256: sha256(indexBuffer), totalBytes: frozen.reduce((sum, file) => sum + file.bytes, 0), files: frozen }
    await writeFile(freezePath, JSON.stringify(result, null, 2), { flag: 'wx' })
    console.log(JSON.stringify({ prepared: true, objects: frozen.length, bytes: result.totalBytes, indexSha256: result.indexSha256 }))
  } finally { client.destroy() }
}

async function migrate() {
  const buffer = await readFile(freezePath)
  const freeze = JSON.parse(buffer)
  if (!Array.isArray(freeze.files) || !freeze.files.length || new Set(freeze.files.map(file => file.key)).size !== freeze.files.length ||
      freeze.files.some(file => !AUDIO_KEY.test(file.key) || !Number.isSafeInteger(file.bytes) || file.bytes <= 0 || !/^[a-f0-9]{64}$/.test(file.sha256))) throw Error('Invalid frozen audio manifest')
  if (sha256(await readFile(join(freeze.media, '.tts-public-state.json'))) !== freeze.indexSha256) throw Error('Production narration index changed since freeze')
  // Validate the complete local set before remote writes; compressed production files are authoritative.
  for (const file of freeze.files) {
    const bytes = await readFile(join(freeze.media, file.key))
    if (bytes.length !== file.bytes || sha256(bytes) !== file.sha256) throw Error(`Frozen source changed: ${file.key}`)
  }
  const settings = audioSettings(await readEnv(required('audio-credentials')))
  if (settings?.target !== 'b2') throw Error('Dedicated B2 audio target required')
  const audioAuth = await authorizeB2(settings.credentials.accessKeyId, settings.credentials.secretAccessKey)
  const bucketId = dedicatedAudioAuth(audioAuth, process.argv.includes('--upload'))
  const backupEnv = await readEnv(required('backup-credentials'))
  const backupAuth = await authorizeB2(backupEnv.BACKUP_ACCESS_KEY_ID, backupEnv.BACKUP_SECRET_ACCESS_KEY)
  if (backupAuth.accountId !== audioAuth.accountId || backupAuth.allowed.buckets?.length !== 1 || backupAuth.allowed.buckets[0].name !== 'taoread-backup') throw Error('Expected same-account dedicated backup inventory credentials')
  // Full account bucket inventory must be checked in the dashboard immediately before execution.
  const proof = JSON.parse(await readFile(required('account-inventory')))
  const age = Date.now() - Date.parse(proof.checkedAt)
  if (proof.accountId !== audioAuth.accountId || !Number.isFinite(age) || age < 0 || age > 3600000 ||
      JSON.stringify([...proof.bucketNames].sort()) !== JSON.stringify(['taoread-backup', 'taoread-public-audio'])) throw Error('Fresh full-account bucket inventory proof required')
  const client = audioClient(settings)
  try {
    const [audio, backup, current] = await Promise.all([
      b2Versions(audioAuth, bucketId, 'tts-public/'), b2Versions(backupAuth, backupAuth.allowed.buckets[0].id), listAudio(client, settings.bucket),
    ])
    const known = new Map(current.map(file => [file.key, file]))
    if (current.some(file => !freeze.files.some(source => source.key === file.key))) throw Error('Unexpected destination audio; stop for reconciliation')
    const missingBytes = freeze.files.filter(file => !known.has(file.key)).reduce((sum, file) => sum + file.bytes, 0)
    const projectedAccountBytes = audio.bytes + backup.bytes + missingBytes
    if (projectedAccountBytes > 9500000000 || audio.bytes + missingBytes > 5500000000) throw Error('B2 storage budget exceeded; no uploads performed')
    const receiptPath = required('receipt')
    const receipt = { completed: false, manifestSha256: sha256(buffer), target: { endpoint: settings.endpoint, bucket: settings.bucket, accountId: audioAuth.accountId, bucketId },
      projectedAccountBytes, verified: [], staged: [], fullReadVerificationPending: uploadOnly }
    // A receipt is reusable only for this frozen manifest and immutable target objects.
    // Bounded read-only batches permit verification across daily free-quota resets.
    if ((arg('resume') || arg('max-read-objects') || arg('max-read-bytes')) && process.argv.includes('--upload')) {
      throw Error('Quota-bounded resume is read-only; omit --upload')
    }
    const batch = verificationBatch({ files: freeze.files, current, manifestSha256: receipt.manifestSha256, target: receipt.target,
      previous: arg('resume') ? JSON.parse(await readFile(resolve(arg('resume')))) : undefined,
      maxObjects: Number(arg('max-read-objects') || Number.MAX_SAFE_INTEGER), maxBytes: Number(arg('max-read-bytes') || Number.MAX_SAFE_INTEGER) })
    receipt.verified.push(...batch.verified)
    const { queue, bytes: batchBytes } = batch
    let checkpoint = Promise.resolve()
    const saveProgress = () => {
      const snapshot = { ...receipt, verified: [...receipt.verified].sort((a, b) => a.key.localeCompare(b.key)) }
      checkpoint = checkpoint.then(() => atomic(`${receiptPath}.partial`, snapshot))
      return checkpoint
    }
    let cursor = 0, halted = false
    const jobs = async () => {
      while (cursor < queue.length && !halted) {
        const file = queue[cursor++]
        try {
          if (uploadOnly) {
            const source = await readFile(join(freeze.media, file.key))
            if (source.length !== file.bytes || sha256(source) !== file.sha256) throw Error('Frozen source changed during staging')
            const md5 = createHash('md5').update(source).digest('hex')
            const existing = known.get(file.key)
            if (existing && (existing.bytes !== file.bytes || existing.etag !== `"${md5}"`)) throw Error('Existing audio differs; overwrite forbidden')
            if (!existing) {
              const upload = () => client.send(new PutObjectCommand({
              Bucket: settings.bucket, Key: file.key, Body: source,
              ContentMD5: Buffer.from(md5, 'hex').toString('base64'),
              ContentType: 'audio/mpeg', CacheControl: 'public, max-age=31536000, immutable',
              Metadata: { sha256: file.sha256 },
              }))
              if (settings.target === 'r2') await guardedR2Upload(client, settings.accountId, source.length, upload)
              else await upload()
            }
            receipt.staged.push({ key: file.key, bytes: file.bytes, md5, sha256: file.sha256 })
            if (receipt.staged.length % 100 === 0) console.log(JSON.stringify({ staged: receipt.staged.length, total: freeze.files.length, fullReadVerificationPending: true }))
            continue
          }
          const remote = process.argv.includes('--upload')
            ? await putAudio(client, settings, file.key, await readFile(join(freeze.media, file.key)))
            : await getAudio(client, settings.bucket, file.key)
          if (remote.bytes.length !== file.bytes || sha256(remote.bytes) !== file.sha256 || remote.contentType !== 'audio/mpeg' || !remote.cacheControl?.includes('immutable')) throw Error('Destination content/metadata mismatch')
          receipt.verified.push({ key: file.key, bytes: file.bytes, sha256: file.sha256 })
          if (receipt.verified.length % 100 === 0) {
            await saveProgress()
            console.log(JSON.stringify({ verified: receipt.verified.length, total: freeze.files.length }))
          }
        } catch { halted = true; throw Error(`B2 full verification failed: ${file.key}`) }
      }
    }
    const results = await Promise.allSettled(Array.from({ length: concurrency }, jobs))
    await checkpoint
    receipt.verified.sort((a, b) => a.key.localeCompare(b.key))
    receipt.staged.sort((a, b) => a.key.localeCompare(b.key))
    if (results.some(result => result.status === 'rejected')) { await atomic(`${receiptPath}.partial`, receipt); throw Error('Migration incomplete; source untouched; resume from the partial receipt after the read quota resets') }
    if (!uploadOnly && receipt.verified.length !== freeze.files.length) {
      receipt.fullReadVerificationPending = true
      receipt.batchFinishedAt = new Date().toISOString()
      await atomic(`${receiptPath}.partial`, receipt)
      console.log(JSON.stringify({ completed: false, batchComplete: true, verified: receipt.verified.length, total: freeze.files.length, batchBytes }))
      return
    }
    const [final, versions, backupFinal] = await Promise.all([listAudio(client, settings.bucket), b2Versions(audioAuth, bucketId, 'tts-public/'), b2Versions(backupAuth, backupAuth.allowed.buckets[0].id)])
    if (JSON.stringify(final.map(file => ({ key: file.key, bytes: file.bytes }))) !== JSON.stringify(freeze.files.map(file => ({ key: file.key, bytes: file.bytes }))) ||
        (uploadOnly ? receipt.staged.length : receipt.verified.length) !== freeze.files.length) throw Error('Final destination inventory mismatch')
    if (uploadOnly && final.some((file, i) => file.etag !== `"${receipt.staged[i].md5}"`)) throw Error('Staged object ETag/MD5 mismatch')
    receipt.accountBytes = versions.bytes + backupFinal.bytes
    if (receipt.accountBytes > 9500000000) throw Error('Final B2 capacity guard failed')
    if (sha256(await readFile(join(freeze.media, '.tts-public-state.json'))) !== freeze.indexSha256) throw Error('Production narration index changed during migration')
    receipt.completed = !uploadOnly; receipt.stagingComplete = uploadOnly; receipt.versions = versions.versions
    receipt[uploadOnly ? 'stagedAt' : 'completedAt'] = new Date().toISOString()
    await atomic(receiptPath, receipt)
    console.log(JSON.stringify({ completed: receipt.completed, stagingComplete: receipt.stagingComplete, fullReadVerificationPending: uploadOnly, objects: final.length, bytes: freeze.totalBytes, accountBytes: receipt.accountBytes }))
  } finally { client.destroy() }
}

try { await (freezing ? prepare() : migrate()) } catch (error) { console.error(error.message); process.exitCode = 1 }
