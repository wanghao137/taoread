import { mkdir, readFile, writeFile, rename, rmdir } from 'node:fs/promises'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { setTimeout as delay } from 'node:timers/promises'
import { ListBucketsCommand, ListObjectsV2Command, ListMultipartUploadsCommand, ListPartsCommand } from '@aws-sdk/client-s3'

export const R2_WARNING_BYTES = 8_000_000_000
export const R2_STOP_BYTES = 9_000_000_000
const safeBytes = n => Number.isSafeInteger(n) && n >= 0

/** Complete account inventory, including unfinished multipart parts. Any missing page fails closed. */
export async function inventoryR2Account(client) {
  const listing = await client.send(new ListBucketsCommand({}))
  if (!Array.isArray(listing.Buckets) || listing.ContinuationToken) throw Error('Complete R2 bucket inventory required')
  const buckets = []
  for (const bucket of listing.Buckets) {
    if (!bucket.Name) throw Error('Invalid R2 bucket inventory')
    let bytes = 0, count = 0, token
    do {
      const page = await client.send(new ListObjectsV2Command({ Bucket: bucket.Name, ContinuationToken: token }))
      for (const obj of page.Contents || []) {
        if (!safeBytes(obj.Size)) throw Error('Invalid R2 object size')
        bytes += obj.Size; count++
      }
      const previous = token
      token = page.IsTruncated ? page.NextContinuationToken : undefined
      if (page.IsTruncated && (!token || token === previous)) throw Error('Incomplete R2 object inventory')
    } while (token)
    let keyMarker, uploadIdMarker
    do {
      const page = await client.send(new ListMultipartUploadsCommand({ Bucket: bucket.Name, KeyMarker: keyMarker, UploadIdMarker: uploadIdMarker }))
      for (const upload of page.Uploads || []) {
        let marker
        do {
          const parts = await client.send(new ListPartsCommand({ Bucket: bucket.Name, Key: upload.Key, UploadId: upload.UploadId, PartNumberMarker: marker }))
          for (const part of parts.Parts || []) {
            if (!safeBytes(part.Size)) throw Error('Invalid R2 multipart size')
            bytes += part.Size
          }
          const previous = marker
          marker = parts.IsTruncated ? parts.NextPartNumberMarker : undefined
          if (parts.IsTruncated && (marker === undefined || marker === previous)) throw Error('Incomplete R2 multipart parts')
        } while (marker !== undefined)
      }
      const previous = `${keyMarker}:${uploadIdMarker}`
      keyMarker = page.IsTruncated ? page.NextKeyMarker : undefined
      uploadIdMarker = page.IsTruncated ? page.NextUploadIdMarker : undefined
      if (page.IsTruncated && (!keyMarker || `${keyMarker}:${uploadIdMarker}` === previous)) throw Error('Incomplete R2 multipart inventory')
    } while (keyMarker)
    buckets.push({ bucket: bucket.Name, bytes, count })
  }
  return { bytes: buckets.reduce((sum, b) => sum + b.bytes, 0), buckets }
}

/** Shared local lock serializes reservations across the API and CLI processes on this host.
 * Reserve the full upload, including overwrites. Uncertain failed writes retain their reservation.
 * An orphaned lock is never automatically broken; inventory failures never permit an upload.
 */
export async function withR2Capacity({ accountId, bytes, inventory, upload, stopBytes = R2_STOP_BYTES,
  directory = process.env.TAO_R2_CAPACITY_DIR || join(homedir(), '.taoread', 'r2-capacity'),
  maxAgeMs = 60_000, waitMs = 120_000, warn = console.warn }) {
  if (!/^[a-f0-9]{32}$/.test(accountId || '') || !safeBytes(bytes) || !safeBytes(stopBytes) || stopBytes > R2_STOP_BYTES) throw Error('Invalid R2 capacity configuration')
  await mkdir(directory, { recursive: true })
  const lock = join(directory, `${accountId}.lock`), statePath = join(directory, `${accountId}.json`)
  const deadline = Date.now() + waitMs
  for (;;) {
    try { await mkdir(lock); break } catch (error) {
      if (error.code !== 'EEXIST') throw error
      if (Date.now() >= deadline) throw Error('R2 capacity lock unavailable; upload stopped')
      await delay(100)
    }
  }
  try {
    let state
    try { state = JSON.parse(await readFile(statePath, 'utf8')) } catch (error) { if (error.code !== 'ENOENT') throw Error('Invalid R2 capacity ledger; upload stopped') }
    if (!state || state.accountId !== accountId || !safeBytes(state.bytes) || !safeBytes(state.scannedAt) || Date.now() < state.scannedAt || Date.now() - state.scannedAt >= maxAgeMs) {
      const snapshot = await inventory()
      if (!safeBytes(snapshot.bytes)) throw Error('Invalid R2 account inventory')
      state = { accountId, bytes: snapshot.bytes, scannedAt: Date.now(), buckets: snapshot.buckets }
    }
    const projected = state.bytes + bytes
    if (!safeBytes(projected) || projected >= stopBytes) throw Error(`R2 capacity stop: projected ${projected} bytes, limit ${stopBytes}`)
    if (projected >= R2_WARNING_BYTES) warn(JSON.stringify({ r2Capacity: 'warning', accountId, projectedBytes: projected, warningBytes: R2_WARNING_BYTES, stopBytes }))
    state.bytes = projected
    await writeFile(`${statePath}.tmp`, JSON.stringify(state))
    await rename(`${statePath}.tmp`, statePath)
    return await upload()
  } finally { await rmdir(lock) }
}

export const guardedR2Upload = (client, accountId, bytes, upload) => withR2Capacity({ accountId, bytes, inventory: () => inventoryR2Account(client), upload })
