import { describe, expect, it } from 'vitest'
import { letterNameText } from '../scripts/lib/phonicsLetterVoice'

describe('letter-name TTS inputs', () => {
  it('uses pronounceable British letter names instead of ambiguous isolated letters', () => {
    const inputs = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letterNameText)
    expect(inputs).toHaveLength(26)
    expect(letterNameText('A')).toBe('ay')
    expect(letterNameText('Q')).toBe('cue')
    expect(letterNameText('W')).toBe('double u')
    expect(letterNameText('Z')).toBe('zed')
    expect(() => letterNameText('a')).toThrow()
  })
})
