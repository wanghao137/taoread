import { describe, expect, it } from 'vitest'
import { typingDelta, typingMatches, typingMetrics } from '../src/pages/child/phonics/typingMetrics'

describe('typing metrics', () => {
  it('counts insertions and corrections without rewarding deletions', () => {
    expect(typingDelta('', 'cxt', 'cat')).toEqual({ attempted: 3, correct: 2 })
    expect(typingDelta('cxt', 'ct', 'cat')).toEqual({ attempted: 0, correct: 0 })
    expect(typingDelta('ct', 'cat', 'cat')).toEqual({ attempted: 1, correct: 1 })
  })
  it('normalizes common keyboard punctuation and calculates five-character WPM', () => {
    expect(typingMatches('It\u2019s a cat.', "it's a cat.")).toBe(true)
    expect(typingMetrics(9, 10, 25, 60000)).toEqual({ accuracy: 90, wpm: 5 })
    expect(typingMetrics(2, 2, 2, 999).wpm).toBe(0)
  })
})
