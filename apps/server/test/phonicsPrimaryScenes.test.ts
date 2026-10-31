import { describe, expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { candidateDirectory, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { buildPrimaryCandidate } from '../scripts/lib/phonicsPrimaryExpansion'
import { primaryScenes } from '../scripts/lib/phonicsPrimaryScenes'

describe('primary phonics image candidates', () => {
  it('provides one explicit scene for each newly introduced word (含扩课三轮 L80+)', async () => {
    const course = buildPrimaryCandidate(await loadCourse(candidateDirectory))
    const installed = await loadCourse(fileURLToPath(new URL('../src/modules/phonics/courses/taoread-phonics-gb-v2/', import.meta.url)))
    const fromCandidate = course.words.filter(word => word.decodingIntroducedAt >= 'L62').map(word => word.text)
    const fromInstalled = installed.words.filter(word => word.decodingIntroducedAt >= 'L62').map(word => word.text)
    const words = [...new Set([...fromCandidate, ...fromInstalled])].sort()
    expect(Object.keys(primaryScenes).sort()).toEqual(words)
    expect(Object.values(primaryScenes).every(scene => scene.length > 8)).toBe(true)
  })
})
