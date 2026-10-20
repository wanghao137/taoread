import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import type { PrismaClient } from '@prisma/client'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { phonicsFixture } from './phonicsV2Fixture'
import { PhonicsRuntime } from '../src/modules/phonics/v2/runtime'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

let root: string, course: Awaited<ReturnType<typeof phonicsFixture>>
beforeAll(async () => { root = await mkdtemp(path.join(tmpdir(), 'tao-phonics-runtime-')); course = await phonicsFixture(root) })
afterAll(async () => { await rm(root, { recursive: true, force: true }) })
function database(release: object | null) { return { phonicsCourseRelease: { findUnique: async () => release } } as unknown as PrismaClient }
describe('phonics release and rollout gates', () => {
  it('opens unreviewed self-use only to the pinned household and supports immediate revocation', async () => {
    const pending = structuredClone(course)
    pending.manifest.status = 'draft'
    pending.reviews = []
    pending.assets.forEach(a => { a.reviewStatus = 'pending' })
    const hash = courseHash(pending)
    expect(hash).toBe(pending.manifest.contentHash)
    const db = database({ status: 'self_use', contentHash: hash })
    const options = { rollout: 'off' as 'off' | 'all', selfUseFamilyId: 'owner', selfUseHash: hash }
    const runtime = new PhonicsRuntime(db, options, root)
    await runtime.install([pending])
    expect(runtime.ready.size).toBe(0)
    expect(await runtime.available('owner', pending.manifest.versionId)).toBe(true)
    expect(await runtime.available('other', pending.manifest.versionId)).toBe(false)
    options.rollout = 'all'
    expect(await runtime.available('other', pending.manifest.versionId)).toBe(false)
    expect(await runtime.available('owner', pending.manifest.versionId, database({ status: 'withdrawn', contentHash: hash }))).toBe(false)
    options.selfUseHash = '0'.repeat(64)
    expect(await runtime.available('owner', pending.manifest.versionId)).toBe(false)
    options.selfUseHash = hash
    options.selfUseFamilyId = ''
    expect(await runtime.available('owner', pending.manifest.versionId)).toBe(false)
  })
  it('rejects fixtures, stale manifests and missing physical media for self-use', async () => {
    for (const problem of ['fixture', 'hash', 'missing'] as const) {
      const input = structuredClone(course)
      if (problem === 'fixture') input.manifest.fixture = true
      if (problem === 'missing') input.assets[0]!.sha256 = '0'.repeat(64)
      input.manifest.contentHash = problem === 'hash' ? '0'.repeat(64) : courseHash(input)
      const hash = courseHash(input)
      const runtime = new PhonicsRuntime(database({ status: 'self_use', contentHash: hash }), { selfUseFamilyId: 'owner', selfUseHash: hash }, root)
      await runtime.install([input])
      expect(await runtime.available('owner', input.manifest.versionId)).toBe(false)
    }
  })
  it('stays off by default and requires explicit pilot membership', async () => {
    const db = database({ status: 'published', contentHash: course.manifest.contentHash })
    const off = new PhonicsRuntime(db, {}, root)
    await off.install([course]); expect(off.ready.has(course.manifest.versionId)).toBe(true)
    expect(await off.available('family-a', course.manifest.versionId)).toBe(false)
    const pilot = new PhonicsRuntime(db, { rollout: 'pilot', pilotFamilyIds: ['family-a'] }, root)
    await pilot.install([course])
    expect(await pilot.available('family-a', course.manifest.versionId)).toBe(true)
    expect(await pilot.available('family-b', course.manifest.versionId)).toBe(false)
  })
  it('does not serve a pending course even if a database row says published', async () => {
    const candidate = await loadCourse(candidateDirectory)
    const runtime = new PhonicsRuntime(database({ status: 'published', contentHash: candidate.manifest.contentHash }), { rollout: 'all' }, root)
    await runtime.install([candidate])
    expect(runtime.ready.size).toBe(0)
    expect(await runtime.available('family-a', candidate.manifest.versionId)).toBe(false)
  })
  it('keeps a pilot release restricted even if rollout is accidentally changed to all', async () => {
    const db = database({ status: 'pilot', contentHash: course.manifest.contentHash })
    const options = { rollout: 'pilot' as 'off' | 'pilot' | 'all', pilotFamilyIds: ['family-a'] }
    const runtime = new PhonicsRuntime(db, options, root)
    await runtime.install([course])
    expect(await runtime.available('family-a', course.manifest.versionId)).toBe(true)
    expect(await runtime.available('family-b', course.manifest.versionId)).toBe(false)
    options.rollout = 'all'
    expect(await runtime.available('family-a', course.manifest.versionId)).toBe(false)
    expect(await runtime.available('family-b', course.manifest.versionId)).toBe(false)
    options.rollout = 'pilot'
    expect(await runtime.available('family-a', course.manifest.versionId, database({ status: 'withdrawn', contentHash: course.manifest.contentHash }))).toBe(false)
    expect(await runtime.available('family-a', course.manifest.versionId, database({ status: 'pilot', contentHash: 'b'.repeat(64) }))).toBe(false)
  })
  it('requires a matching published hash on every access, including transactional calls', async () => {
    const runtime = new PhonicsRuntime(database({ status: 'published', contentHash: course.manifest.contentHash }), { rollout: 'all' }, root)
    await runtime.install([course])
    expect(await runtime.available('family-a', course.manifest.versionId)).toBe(true)
    const withdrawn = database({ status: 'withdrawn', contentHash: course.manifest.contentHash })
    expect(await runtime.available('family-a', course.manifest.versionId, withdrawn)).toBe(false)
    expect(await runtime.available('family-a', course.manifest.versionId, database({ status: 'published', contentHash: 'b'.repeat(64) }))).toBe(false)
  })
})
