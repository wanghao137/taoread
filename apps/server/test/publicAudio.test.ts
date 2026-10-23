import { afterEach, describe, expect, it } from 'vitest'
import { publicAudioBase, publicMediaUrl } from '../src/lib/publicMedia'
import { loadConfig } from '../src/config'
import { publicSegmentAudioKey, PublicTtsIndex } from '../src/modules/tts/publicCache'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const oldMedia = process.env.TAO_MEDIA_PUBLIC_BASE
const oldAudio = process.env.TAO_TTS_PUBLIC_BASE
afterEach(() => {
  if (oldMedia === undefined) delete process.env.TAO_MEDIA_PUBLIC_BASE
  else process.env.TAO_MEDIA_PUBLIC_BASE = oldMedia
  if (oldAudio === undefined) delete process.env.TAO_TTS_PUBLIC_BASE
  else process.env.TAO_TTS_PUBLIC_BASE = oldAudio
})

describe('public narration migration', () => {
  it('resolves a prepared provider replacement to its actual immutable audio file', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'tao-audio-alias-'))
    const requested = 'a'.repeat(64), actual = 'b'.repeat(64)
    const info = { durationMs: 1000, bytes: 5, uploaded: false, audioKey: actual, model: 'mimo-v2.5-tts' }
    try {
      await mkdir(join(dir, 'tts-public'))
      await writeFile(join(dir, 'tts-public', actual + '.mp3'), 'audio')
      await writeFile(join(dir, '.tts-public-state.json'), JSON.stringify({ [requested]: info }))
      const index = new PublicTtsIndex(dir)
      expect(await index.get(requested)).toEqual({ durationMs: 1000, uploaded: false, audioKey: actual })
      expect(await index.hasLocalAudio(requested)).toBe(true)
      expect(index.segmentPath(requested)).toBe(join(dir, 'tts-public', actual + '.mp3'))
      expect(publicSegmentAudioKey(requested, info)).toBe(actual)
      expect(() => publicSegmentAudioKey(requested, { ...info, audioKey: '../private' })).toThrow()
      expect(() => publicSegmentAudioKey(requested, { ...info, model: '' })).toThrow()
    } finally { await rm(dir, { recursive: true, force: true }) }
  })
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
