import { test } from 'node:test'
import assert from 'node:assert/strict'
import { verificationBatch } from '../lib/audio-verification-batch.mjs'

const files = [100, 200, 300].map((bytes, i) => ({ key: `key${i}`, bytes, sha256: `sha${i}`, etag: `etag${i}` }))
const target = { endpoint: 'https://s3.us-east-005.backblazeb2.com', bucket: 'taoread-public-audio', accountId: 'account', bucketId: 'bucket' }
const previous = { manifestSha256: 'manifest', target, verified: [{ key: files[0].key, bytes: files[0].bytes, sha256: files[0].sha256 }] }
const options = { files, current: files, manifestSha256: 'manifest', target, previous }

test('daily batch resumes without rereading verified audio and obeys both request and byte budgets', () => {
  const batch = verificationBatch({ ...options, maxObjects: 2, maxBytes: 499 })
  assert.deepEqual(batch.queue, [files[1]])
  assert.equal(batch.bytes, 200)
  assert.equal(batch.verified.length, 1)
  assert.deepEqual(verificationBatch({ ...options, maxObjects: 1 }).queue, [files[1]])
  assert.throws(() => verificationBatch({ ...options, maxBytes: 199 }), /cannot fit/)
})

test('wrong target, changed content and duplicate or foreign proofs cannot be reused', () => {
  for (const previousBad of [
    { ...previous, manifestSha256: 'other' },
    { ...previous, target: { ...target, bucket: 'taoread-backup' } },
    { ...previous, verified: [...previous.verified, ...previous.verified] },
    { ...previous, verified: [{ ...previous.verified[0], key: 'unknown' }] },
    { ...previous, verified: [{ ...previous.verified[0], sha256: 'wrong' }] },
  ]) assert.throws(() => verificationBatch({ ...options, previous: previousBad }))
  assert.throws(() => verificationBatch({ ...options, current: [{ ...files[0], etag: 'overwritten' }, ...files.slice(1)] }), /immutable object changed/)
})

test('complete receipts have no remaining reads; invalid quota limits fail closed', () => {
  assert.equal(verificationBatch({ ...options, previous: { ...previous, verified: files } }).queue.length, 0)
  for (const limit of [0, -1, NaN, Infinity, 1.1]) assert.throws(() => verificationBatch({ ...options, maxObjects: limit }))
})
