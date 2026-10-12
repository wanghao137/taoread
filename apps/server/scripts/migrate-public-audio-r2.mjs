/** Copy only the frozen compressed public audio to the dedicated new-account R2. */
import { readFile, writeFile, rename } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { gatewaySettings, gatewayList, gatewayGet, gatewayPut } from './lib/r2-audio-gateway.mjs'
import { verificationBatch } from './lib/audio-verification-batch.mjs'

const arg = name => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3)
const required = name => { const value = arg(name); if (!value) throw Error(`Explicit --${name} required`); return resolve(value) }
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const atomic = async (file, value) => { await writeFile(file + '.tmp', JSON.stringify(value, null, 2)); await rename(file + '.tmp', file) }

async function main() {
  const manifest = await readFile(required('freeze'))
  const frozen = JSON.parse(manifest)
  const credentials = gatewaySettings(JSON.parse(await readFile(required('credentials'), 'utf8')))
  const receiptPath = required('receipt')
  const concurrency = Number(arg('concurrency') || 4)
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 32) throw Error('Concurrency must be 1..32')
  if (hash(manifest) !== '4cc7d05272d79b148d9f7e8ca85bb567f730e652e446525e80337ef7b490db89' || frozen.files.length !== 9681 || frozen.totalBytes !== 3319223631) throw Error('Expected verified compressed production manifest')
  const checkIndex = async () => {
    if (hash(await readFile(join(frozen.media, '.tts-public-state.json'))) !== frozen.indexSha256) throw Error('Production index changed since freeze')
  }
  await checkIndex()
  let checked = 0
  for (const file of frozen.files) {
    const bytes = await readFile(join(frozen.media, file.key))
    if (bytes.length !== file.bytes || hash(bytes) !== file.sha256) throw Error(`Frozen source changed: ${file.key}`)
    if (++checked % 2000 === 0) console.log(JSON.stringify({ sourceChecked: checked, total: frozen.files.length }))
  }
  const inventory = await gatewayList(credentials)
  const expected = new Map(frozen.files.map(file => [file.key, file]))
  for (const obj of inventory) {
    const file = expected.get(obj.key)
    if (!file || file.bytes !== obj.bytes || `"${file.md5}"` !== obj.etag) throw Error('Existing destination differs; overwrite forbidden')
  }
  // Dedicated account inventory is externally rechecked before and after the job.
  const proof = JSON.parse(await readFile(required('account-inventory')))
  if (proof.accountId !== credentials.accountId || JSON.stringify(proof.bucketNames) !== JSON.stringify([credentials.bucket]) ||
      Date.now() - Date.parse(proof.checkedAt) > 3600000 || !Number.isFinite(Date.parse(proof.checkedAt))) throw Error('Fresh single-bucket account inventory required')
  if (frozen.totalBytes > 5500000000) throw Error('R2 audio budget exceeded')
  const receipt = { completed: false, startedAt: new Date().toISOString(), manifestSha256: hash(manifest),
    target: { origin: credentials.origin, accountId: credentials.accountId, bucket: credentials.bucket }, verified: [] }
  const existing = new Set(inventory.map(obj => obj.key))
  const limit = Number(arg('limit') || frozen.files.length)
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > frozen.files.length) throw Error('Invalid pilot limit')
  if (arg('resume') && limit !== frozen.files.length) throw Error('Resume is only available for a full migration')
  const batch = verificationBatch({ files: frozen.files.slice(0, limit), current: inventory, manifestSha256: receipt.manifestSha256, target: receipt.target,
    previous: arg('resume') ? JSON.parse(await readFile(resolve(arg('resume')))) : undefined })
  receipt.verified.push(...batch.verified)
  const queue = batch.queue
  if (batch.verified.length) console.log(JSON.stringify({ reusedFullReadProofs: batch.verified.length, remaining: queue.length }))
  let cursor = 0, halted = false, checkpoint = Promise.resolve()
  const save = () => {
    const snapshot = { ...receipt, verified: [...receipt.verified].sort((a, b) => a.key.localeCompare(b.key)) }
    checkpoint = checkpoint.then(() => atomic(receiptPath + '.partial', snapshot))
    return checkpoint
  }
  const worker = async () => {
    while (cursor < queue.length && !halted) {
      const file = queue[cursor++]
      try {
        const bytes = await readFile(join(frozen.media, file.key))
        if (bytes.length !== file.bytes || hash(bytes) !== file.sha256) throw Error('Source changed during migration')
        let result
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            result = process.argv.includes('--upload') && !existing.has(file.key)
              ? await gatewayPut(credentials, file.key, bytes, { knownAbsent: attempt === 1 })
              : await gatewayGet(credentials, file.key)
            break
          } catch (error) { if (attempt === 3 || /different bytes|Invalid|configuration/.test(error.message)) throw error }
        }
        if (result.bytes.length !== file.bytes || hash(result.bytes) !== file.sha256 || result.contentType !== 'audio/mpeg' || !result.cacheControl?.includes('immutable')) throw Error('Destination content or metadata mismatch')
        receipt.verified.push({ key: file.key, bytes: file.bytes, sha256: file.sha256 })
        if (receipt.verified.length % 100 === 0) { await save(); console.log(JSON.stringify({ verified: receipt.verified.length, total: limit })) }
      } catch (error) { halted = true; throw Error(`${file.key}: ${error.message}`) }
    }
  }
  const results = await Promise.allSettled(Array.from({ length: concurrency }, worker))
  await checkpoint
  receipt.verified.sort((a, b) => a.key.localeCompare(b.key))
  const failure = results.find(result => result.status === 'rejected')
  if (failure) { await atomic(receiptPath + '.partial', receipt); throw failure.reason }
  const final = await gatewayList(credentials)
  for (const obj of final) {
    const file = expected.get(obj.key)
    if (!file || file.bytes !== obj.bytes || obj.etag !== `"${file.md5}"`) throw Error('Final inventory mismatch')
  }
  await checkIndex()
  receipt.objects = final.length; receipt.bytes = final.reduce((sum, obj) => sum + obj.bytes, 0)
  receipt.completed = limit === frozen.files.length && final.length === frozen.files.length && receipt.bytes === frozen.totalBytes && receipt.verified.length === frozen.files.length
  receipt.pilotComplete = limit < frozen.files.length && receipt.verified.length === limit
  receipt.finishedAt = new Date().toISOString()
  await atomic(receiptPath, receipt)
  console.log(JSON.stringify({ completed: receipt.completed, pilotComplete: receipt.pilotComplete, objects: receipt.objects, bytes: receipt.bytes, verified: receipt.verified.length }))
}
main().catch(error => { console.error(error.message); process.exitCode = 1 })
