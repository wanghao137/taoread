import { describe, expect, it } from 'vitest'
import { Rating } from 'ts-fsrs'
import { readWordSettings, wordGrade, wordScheduler } from '../src/modules/phonics/v2/wordStudy'

describe('word study settings and grading', () => {
  it('uses validated defaults for malformed settings', () => {
    expect(readWordSettings('{')).toMatchObject({ dailyNew: 5, retention: 0.9 })
    expect(readWordSettings('{"dailyNew":-1}')).toMatchObject({ dailyNew: 5 })
  })
  it('grades the first answer using correctness, time and hints', () => {
    expect(wordGrade('meaning', false, 1000)).toBe(Rating.Again)
    expect(wordGrade('meaning', true, 9001)).toBe(Rating.Hard)
    expect(wordGrade('spelling', true, 1000, true)).toBe(Rating.Hard)
    expect(wordGrade('spelling', true, 1000)).toBe(Rating.Easy)
    expect(wordGrade('meaning', true, 2000)).toBe(Rating.Good)
    expect(wordScheduler(0.9).parameters.enable_short_term).toBe(true)
  })
})
