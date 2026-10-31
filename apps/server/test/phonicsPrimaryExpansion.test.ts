import { beforeAll, describe, expect, it } from 'vitest'
import { candidateDirectory, courseHash, loadCourse, selfUseReady, validateCourse } from '../src/modules/phonics/v2/courseRegistry'
import { buildPrimaryCandidate } from '../scripts/lib/phonicsPrimaryExpansion'
import type { PhonicsCourse } from '../src/modules/phonics/v2/contracts'

let source: PhonicsCourse
let candidate: PhonicsCourse
beforeAll(async () => {
  source = await loadCourse(candidateDirectory)
  candidate = buildPrimaryCandidate(source)
})

describe('primary phonics candidate', () => {
  it('adds a separate alphabet course and elementary spelling patterns without mutating the installed course', () => {
    expect(source.manifest.versionId).toBe('taoread-phonics-gb-v1')
    expect(source.lessons).toHaveLength(61)
    expect(candidate.manifest.versionId).toBe('taoread-phonics-gb-v2')
    expect(candidate.manifest.contentHash).toBe(courseHash(candidate))
    expect(candidate.lessons).toHaveLength(86)
    expect(candidate.words).toHaveLength(212)
    expect(candidate.tasks.filter(task => task.skill === 'letter_name' && task.kind === 'listen').map(task => task.letterName).join('')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    expect(candidate.words.map(word => word.text)).toEqual(expect.arrayContaining(['them', 'ear', 'air', 'baby', 'pink', 'apple', 'tall', 'mother', 'sister', 'hot', 'mum', 'up', 'job', 'win', 'ill', 'nest', 'beef', 'see']))
    expect(candidate.lessons.filter(lesson => ['L77', 'L78', 'L79'].includes(lesson.id)).map(lesson => lesson.prerequisites[0])).toEqual(['L76', 'L77', 'L78'])
    expect(candidate.tasks.find(task => task.id === 'L62-contrast-voiced')?.judge?.answerIds).toEqual(['this'])
    expect(candidate.tasks.find(task => task.id === 'L62-contrast-unvoiced')?.judge?.answerIds).toEqual(['thin'])
  })

  it('fixes the matching grapheme and spelling-tile references in context', () => {
    for (const [word, index, mapping] of [['bath', 1, 'g-a-bath'], ['nose', 2, 'g-s-voiced'], ['use', 1, 'g-s-voiced'], ['school', 1, 'g-ch-k'], ['what', 1, 'g-a-rounded']] as const) {
      expect(candidate.words.find(item => item.text === word)?.spans[index]?.mappingId).toBe(mapping)
    }
    expect(candidate.tasks.find(task => task.id === 'L48-build-school')?.choices.find(choice => choice.label === 'ch')?.mappingId).toBe('g-ch-k')
    expect(candidate.tasks.find(task => task.id === 'L53-build-what')?.choices.find(choice => choice.label === 'a')?.mappingId).toBe('g-a-rounded')
  })

  it('is structurally valid but cannot be opened with missing and unreviewed media', async () => {
    const report = await validateCourse(candidate, { mode: 'development' })
    expect(report.issues.filter(issue => issue.severity === 'error')).toEqual([])
    expect(report.releaseReady).toBe(false)
    expect(selfUseReady(report)).toBe(false)
    for (const task of candidate.tasks.filter(task => task.kind === 'choice')) {
      expect(new Set(task.choices.map(choice => choice.label)).size).toBe(task.choices.length)
    }
  }, 60000)
})
