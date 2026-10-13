import { createHash } from 'node:crypto'
export function parseDeletionLedger(input, now = Date.now()) {
  if (input?.version !== 1 || !Array.isArray(input.deleted) || typeof input.generatedAt !== 'string') throw new Error('Invalid current deletion ledger')
  const generated = Date.parse(input.generatedAt)
  if (!Number.isFinite(generated) || generated > now + 60000 || now - generated > 24 * 3600000) throw new Error('Deletion ledger must be exported from current state within 24 hours')
  const hashes = new Set()
  for (const row of input.deleted) {
    if (!/^[a-f0-9]{64}$/.test(row?.familyHash ?? '') || !Number.isFinite(Date.parse(row?.deletedAt)) || Date.parse(row.deletedAt) > generated) throw new Error('Invalid deletion ledger entry')
    hashes.add(row.familyHash)
  }
  return hashes
}
export function isDeletedFamily(id, hashes) { return hashes.has(createHash('sha256').update(id).digest('hex')) }
