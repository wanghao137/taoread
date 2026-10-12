import { afterEach, describe, expect, it } from 'vitest'
import { publicAudioBase, publicMediaUrl } from '../src/lib/publicMedia'
import { loadConfig } from '../src/config'

const oldMedia = process.env.TAO_MEDIA_PUBLIC_BASE
const oldAudio = process.env.TAO_TTS_PUBLIC_BASE
afterEach(() => {
  if (oldMedia === undefined) delete process.env.TAO_MEDIA_PUBLIC_BASE
  else process.env.TAO_MEDIA_PUBLIC_BASE = oldMedia
  if (oldAudio === undefined) delete process.env.TAO_TTS_PUBLIC_BASE
  else process.env.TAO_TTS_PUBLIC_BASE = oldAudio
})

describe('public narration migration', () => {
  it('routes narration independently while images retain their original origin', () => {
    process.env.TAO_MEDIA_PUBLIC_BASE = 'https://media.example.com/'
    process.env.TAO_TTS_PUBLIC_BASE = 'https://audio.example.com/'
    expect(publicMediaUrl('tts-public/key.mp3')).toBe('https://audio.example.com/tts-public/key.mp3')
    expect(publicMediaUrl('art/covers/book.webp')).toBe('https://media.example.com/art/covers/book.webp')
  })
  it('supports restoring the original R2 origin and local fallback', () => {
    delete process.env.TAO_TTS_PUBLIC_BASE
    process.env.TAO_MEDIA_PUBLIC_BASE = 'https://media.example.com'
    expect(publicAudioBase()).toBe('https://media.example.com')
    delete process.env.TAO_MEDIA_PUBLIC_BASE
    expect(publicMediaUrl('tts-public/key.mp3')).toBe('/api/media/tts-public/key.mp3')
  })
  it.each(['http://audio.example.com', 'https://user:secret@audio.example.com', 'https://audio.example.com/private', 'https://audio.example.com?key=x', 'https://audio.example.com#part'])('rejects an unsafe narration origin: %s', base => {
    expect(() => loadConfig({ TAO_MASTER_KEY: 'test-key-123456789', TAO_DATABASE_URL: 'file:test.db', TAO_TTS_PUBLIC_BASE: base })).toThrow()
  })
})
