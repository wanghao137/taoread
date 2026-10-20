import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { validateReleaseAcceptance } from '../src/modules/phonics/v2/releasePolicy'

// Synthetic receipts test validation only; they are never course approval records.
const roots: string[] = []
afterEach(async () => { for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true }) })
async function receipt(includePilot: boolean) {
  const root = await mkdtemp(path.join(tmpdir(), 'tao-phonics-acceptance-')); roots.push(root)
  const kinds = ['technical', 'realDevices', 'teachingAndSpeech', 'backupRestore', ...(includePilot ? ['familyPilot'] : [])]
  const gate = { complete: true, versionId: 'test-only', contentHash: 'a'.repeat(64), approvedBy: 'Synthetic test only', approvedAt: 100,
    ...Object.fromEntries(kinds.map(kind => [kind, `${kind}.json`])) }
  for (const kind of kinds) await writeFile(path.join(root, `${kind}.json`), JSON.stringify({ complete: true, versionId: gate.versionId, contentHash: gate.contentHash, kind, result: 'passed' }))
  const file = path.join(root, 'receipt.json')
  await writeFile(file, JSON.stringify(gate))
  return { root, file, gate }
}
describe('phonics staged release evidence', () => {
  it('allows a content-reviewed pilot receipt without inventing prior family observations', async () => {
    const { file, gate } = await receipt(false)
    await expect(validateReleaseAcceptance(file, gate.versionId, gate.contentHash, 'pilot')).resolves.toBeUndefined()
    await expect(validateReleaseAcceptance(file, gate.versionId, gate.contentHash, 'published')).rejects.toThrow()
  })
  it('requires family evidence for public release', async () => {
    const { file, gate } = await receipt(true)
    await expect(validateReleaseAcceptance(file, gate.versionId, gate.contentHash, 'published')).resolves.toBeUndefined()
  })
  for (const invalid of [
    { complete: false }, { contentHash: 'b'.repeat(64) }, { versionId: 'old-version' }, { result: 'pending' }, { kind: 'technical' },
  ]) it(`rejects invalid real-device evidence ${JSON.stringify(invalid)}`, async () => {
    const { root, file, gate } = await receipt(false)
    await writeFile(path.join(root, 'realDevices.json'), JSON.stringify({ complete: true, versionId: gate.versionId, contentHash: gate.contentHash, kind: 'realDevices', result: 'passed', ...invalid }))
    await expect(validateReleaseAcceptance(file, gate.versionId, gate.contentHash, 'pilot')).rejects.toThrow()
  })
  it('rejects an empty evidence file even when the receipt says complete', async () => {
    const { root, file, gate } = await receipt(true)
    await writeFile(path.join(root, 'familyPilot.json'), '')
    await expect(validateReleaseAcceptance(file, gate.versionId, gate.contentHash, 'published')).rejects.toThrow()
  })
})
