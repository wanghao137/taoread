import { describe, expect, it } from 'vitest'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { loadSidecars } from '../src/modules/phonics/v2/sidecars'
import { buildPrimaryCandidate } from '../scripts/lib/phonicsPrimaryExpansion'
import { buildPrimarySidecars } from '../scripts/lib/phonicsPrimarySidecars'

describe('primary phonics lexicon candidate', () => {
  it('adds original examples for each new word without claiming their audio is ready', async () => {
    const source = await loadCourse(candidateDirectory)
    const original = await loadSidecars(candidateDirectory, source.manifest.versionId, courseHash(source))
    const course = buildPrimaryCandidate(source)
    const { lexicon, usAudio } = buildPrimarySidecars(course, original)
    expect(lexicon.entries).toHaveLength(course.words.length)
    expect(lexicon.entries.filter(entry => !entry.example.audio)).toHaveLength(46)
    expect(lexicon.courseContentHash).toBe(courseHash(course))
    expect(usAudio.courseHash).toBe(courseHash(course))
    expect(lexicon.humanReviewed).toBe(false)
    expect(original.lexicon?.entries).toHaveLength(source.words.length)
  })
})
