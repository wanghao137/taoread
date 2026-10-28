import { describe, expect, it } from 'vitest'
import type { PhonicsAtlasWordDto } from '@taoread/shared'
import { buildStudySteps, gapSentence, makeStudyRetry } from '../src/pages/child/phonics/phonicsStudy'

const words: PhonicsAtlasWordDto[] = Array.from({ length: 10 }, (_, i) => ({
  id: `w${i}`, text: `word${i}`, meaningZh: `意思${i}`, unlocked: true, favorite: false,
  image: { url: '/image.webp' }, audios: [{ id: 'voice', purpose: 'word', url: '/voice.mp3', durationMs: 100 }], examples: [],
}))
const reverse = <T,>(items: T[]) => [...items].reverse()

describe('word study queue', () => {
  it('blanks complete target words without exposing repeats or matching parts of words', () => {
    expect(gapSentence('Sam sat. Sam ran.', 'sam')).toBe('____ sat. ____ ran.')
    expect(gapSentence('A cat sat.', 'at')).toBeNull()
    expect(gapSentence('Sam sat.', 's.m')).toBeNull()
  })
  it('reviews first and introduces new words in groups of five before shuffled recall', () => {
    let id = 0
    const steps = buildStudySteps(words, { dueWordIds: ['w0', 'w1'], newWordIds: ['w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8'], upcoming: [] }, true, () => String(++id), reverse)
    expect(steps.slice(0, 2).map(step => step.wordId)).toEqual(['w0', 'w1'])
    expect(steps.slice(2, 7).every(step => step.intro)).toBe(true)
    expect(steps.slice(7, 12).map(step => step.wordId)).toEqual(['w6', 'w5', 'w4', 'w3', 'w2'])
    expect(steps.slice(12, 14).every(step => step.intro)).toBe(true)
    expect(steps.slice(14).map(step => step.wordId)).toEqual(['w8', 'w7'])
  })
  it('retries the same question in another available mode without introducing it again', () => {
    const [question] = buildStudySteps(words, { dueWordIds: ['w0'], newWordIds: [], upcoming: [] }, true, () => 'q1', reverse)
    const retry = makeStudyRetry(question!, words, true, 5, reverse)!
    expect(retry).toMatchObject({ id: 'q1', wordId: 'w0', retry: true })
    expect(retry.mode).not.toBe(question!.mode)
    expect(retry.intro).toBeUndefined()
  })
  it('avoids spelling for weak memories when other question types are available', () => {
    const steps = buildStudySteps(words, { dueWordIds: ['w0', 'w1', 'w2', 'w3'], newWordIds: [], stabilities: { w0: 1, w1: 1, w2: 1, w3: 1 }, upcoming: [] }, true, () => 'q', reverse)
    expect(steps.every(step => step.mode !== 'spelling')).toBe(true)
  })
  it('weights question types by stability and respects unavailable media and spelling settings', () => {
    const sample = (stability: number, pool = words, spelling = true) => Array.from({ length: 1000 }, (_, i) =>
      buildStudySteps(pool, { dueWordIds: ['w0'], newWordIds: [], stabilities: { w0: stability }, upcoming: [] }, spelling, () => `question-${i}`, reverse)[0]!.mode)
    const weak = sample(1)
    expect(weak.filter(mode => mode === 'picture').length).toBeGreaterThan(400)
    expect(weak.filter(mode => mode === 'picture').length).toBeLessThan(500)
    expect(weak.filter(mode => mode === 'meaning').length).toBeGreaterThan(300)
    expect(weak.filter(mode => mode === 'listen').length).toBeGreaterThan(150)
    const strong = sample(5)
    expect(strong.filter(mode => mode === 'spelling').length).toBeGreaterThan(700)
    expect(sample(5, words, false)).not.toContain('spelling')
    const withoutMedia = words.map(word => ({ ...word, image: null, audios: [] }))
    expect(sample(1, withoutMedia)).not.toContain('picture')
    expect(sample(1, withoutMedia)).not.toContain('listen')
  })
})
