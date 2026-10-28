import { describe, expect, it } from 'vitest'
import { buildWordCandidates, referenceWordsSchema } from '../scripts/lib/phonicsWordCandidates'

describe('phonics reference candidates', () => {
  const source = referenceWordsSchema.parse([{ id: 'can', w: 'can', uk: '/kæn/', us: '/kæn/', senses: [{ pos: 'v.', zh: '可以', en: 'be able to' }, { pos: 'n.', zh: '罐头', en: 'a container' }], ex: [{ en: 'I can run.', zh: '我会跑。' }], col: [], fam: [], syn: [], ant: [], tip: '' }])
  it('matches headwords without choosing an unrelated sense or approving content', () => {
    const candidates = buildWordCandidates([{ id: 'w-can', text: 'can', meaningZh: '罐头' }, { id: 'w-sam', text: 'Sam', meaningZh: '萨姆' }], source)
    expect(candidates[0]).toMatchObject({ reviewStatus: 'pending', selectedSense: null, selectedExample: null, source: { id: 'can', senses: [{ zh: '可以' }, { zh: '罐头' }], examples: [{ unlistedCourseWords: ['i', 'run'] }] } })
    expect(candidates[1]).toMatchObject({ reviewStatus: 'pending', source: null })
  })
  it('rejects ambiguous duplicate headwords', () => {
    expect(() => buildWordCandidates([], [...source, { ...source[0]!, w: 'CAN' }])).toThrow('Duplicate reference headword')
  })
})
