import { describe, expect, it } from 'vitest'
import { PHONICS_TOPICS, phonicsTopic } from '../src/pages/child/phonics/phonicsTopics'

describe('phonics atlas topics', () => {
  it('assigns words to at most one topic and leaves unknown words in other', () => {
    const words = PHONICS_TOPICS.flatMap(topic => [...topic.words])
    expect(new Set(words).size).toBe(words.length)
    expect(phonicsTopic('w-cat')).toBe('animals')
    expect(phonicsTopic('w-sam')).toBe('people')
    expect(phonicsTopic('w-future')).toBe('other')
  })
})
