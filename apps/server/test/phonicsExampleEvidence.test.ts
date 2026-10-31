import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { exampleEvidenceMatches, exampleWavMatches, sameExampleInput } from '../scripts/lib/phonicsExampleEvidence'

describe('example audio evidence', () => {
  const text = 'The cat sat.'
  const evidence = { audioSha256: 'audio', textSha256: createHash('sha256').update(text).digest('hex'), transcript: 'the cat sat', textMatches: true, peak: 0.5, humanReviewed: false }
  it('only reuses recordings for the identical word and exact example text', () => {
    const entry = { wordId: 'w-cat', word: 'cat', example: { en: text } }
    expect(sameExampleInput(entry, entry)).toBe(true)
    expect(sameExampleInput(entry, undefined)).toBe(false)
    expect(sameExampleInput(entry, { ...entry, wordId: 'w-dog' })).toBe(false)
    expect(sameExampleInput(entry, { ...entry, word: 'dog' })).toBe(false)
    expect(sameExampleInput(entry, { ...entry, example: { en: 'The cat slept.' } })).toBe(false)
  })
  it('accepts only matching text and audio evidence without claiming a human review', () => {
    expect(exampleEvidenceMatches(text, 'audio', evidence)).toBe(true)
    expect(exampleEvidenceMatches('The cat slept.', 'audio', evidence)).toBe(false)
    expect(exampleEvidenceMatches(text, 'other', evidence)).toBe(false)
    expect(exampleEvidenceMatches(text, 'audio', { ...evidence, transcript: 'the cat' })).toBe(false)
    expect(exampleEvidenceMatches(text, 'audio', { ...evidence, peak: 0 })).toBe(false)
    expect(exampleEvidenceMatches(text, 'audio', { ...evidence, humanReviewed: true })).toBe(false)
  })

  it('checks the actual PCM WAV bytes, duration, hash and non-silence', () => {
    const wav = Buffer.alloc(44 + 4800)
    wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16)
    wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(24000, 24); wav.writeUInt32LE(48000, 28)
    wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(4800, 40)
    wav.writeInt16LE(2000, 44)
    const hash = createHash('sha256').update(wav).digest('hex')
    expect(exampleWavMatches(wav, hash, 100, wav.length)).toBe(true)
    expect(exampleWavMatches(wav, hash, 101, wav.length)).toBe(false)
    expect(exampleWavMatches(wav, '0'.repeat(64), 100, wav.length)).toBe(false)
    const silent = Buffer.from(wav); silent.writeInt16LE(0, 44)
    expect(exampleWavMatches(silent, createHash('sha256').update(silent).digest('hex'), 100, silent.length)).toBe(false)
    const truncated = wav.subarray(0, -2)
    expect(exampleWavMatches(truncated, createHash('sha256').update(truncated).digest('hex'), 100, truncated.length)).toBe(false)
  })
})
