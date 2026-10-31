import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { loadSidecars } from '../src/modules/phonics/v2/sidecars'

describe('phonics sidecar counts', () => {
  it('rejects example-audio and source counts that do not describe the entries', async () => {
    const course = await loadCourse(candidateDirectory), hash = courseHash(course)
    const original = await loadSidecars(candidateDirectory, course.manifest.versionId, hash)
    expect(original.problems).toEqual([])
    const dir = await mkdtemp(path.join(tmpdir(), 'phonics-sidecars-'))
    try {
      const lexicon = structuredClone(original.lexicon!)
      lexicon.counts.exampleAudio++
      await writeFile(path.join(dir, 'lexicon.json'), JSON.stringify(lexicon))
      await writeFile(path.join(dir, 'usAudio.json'), JSON.stringify(original.usAudio))
      expect((await loadSidecars(dir, course.manifest.versionId, hash)).problems).toContain('lexicon.json counts 与实际内容不一致')
    } finally { await rm(dir, { recursive: true, force: true }) }
  })
})
