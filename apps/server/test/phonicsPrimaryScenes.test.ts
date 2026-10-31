import { describe, expect, it } from 'vitest'
import { candidateDirectory, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { buildPrimaryCandidate } from '../scripts/lib/phonicsPrimaryExpansion'
import { primaryScenes } from '../scripts/lib/phonicsPrimaryScenes'

describe('primary phonics image candidates', () => {
  it('provides one explicit scene for each newly introduced word', async () => {
    const course = buildPrimaryCandidate(await loadCourse(candidateDirectory))
    const words = course.words.filter(word => word.decodingIntroducedAt >= 'L62').map(word => word.text).sort()
    expect(Object.keys(primaryScenes).sort()).toEqual(words)
    expect(Object.values(primaryScenes).every(scene => scene.length > 8)).toBe(true)
  })
})
