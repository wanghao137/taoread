import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { copyVerifiedMedia } from '../scripts/lib/installPhonicsMedia'

describe('phonics sidecar media installation', () => {
  it('checks both source and existing target without overwriting a conflict', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'phonics-install-'))
    try {
      const source = path.join(dir, 'source'), target = path.join(dir, 'target')
      const bytes = Buffer.from('candidate media'), hash = createHash('sha256').update(bytes).digest('hex')
      writeFileSync(source, bytes)
      expect(copyVerifiedMedia(source, target, hash)).toBe('copy')
      expect(copyVerifiedMedia(source, target, hash)).toBe('skip')
      writeFileSync(target, 'different')
      expect(() => copyVerifiedMedia(source, target, hash)).toThrow('Existing target hash mismatch')
      expect(readFileSync(target, 'utf8')).toBe('different')
      writeFileSync(source, 'wrong')
      expect(() => copyVerifiedMedia(source, target, hash)).toThrow('Source hash mismatch')
    } finally { rmSync(dir, { recursive: true, force: true }) }
  })
})
