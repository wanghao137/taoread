import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { parseDeletionLedger, isDeletedFamily } from '../lib/deletion-ledger.mjs'
test('current deletion ledger excludes only the deleted family and rejects stale or corrupt evidence', () => {
  const now = Date.parse('2026-10-13T05:00:00Z')
  const ledger = { version: 1, generatedAt: new Date(now).toISOString(), deleted: [{ familyHash: createHash('sha256').update('deleted-family').digest('hex'), deletedAt: new Date(now - 1000).toISOString() }] }
  const hashes = parseDeletionLedger(ledger, now)
  assert.equal(isDeletedFamily('deleted-family', hashes), true)
  assert.equal(isDeletedFamily('kept-family', hashes), false)
  assert.throws(() => parseDeletionLedger(ledger, now + 25 * 3600000), /24 hours/)
  assert.throws(() => parseDeletionLedger({ ...ledger, deleted: [{ familyHash: 'raw-id', deletedAt: ledger.generatedAt }] }, now), /Invalid deletion/)
})
