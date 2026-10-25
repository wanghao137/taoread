import { expect, it } from 'vitest'
import { ALL_PACKS } from '../src/content/packs'
import { SEASON_POEMS, songSeasonsPacks } from '../src/content/packs/poetry-song-seasons'
import { songSpringPacks } from '../src/content/packs/poetry-song-spring'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { chunkText } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'

it('adds two distinct eight-poem books without duplicating existing editions', () => {
  const normalized = (text: string) => text.replace(/[^\p{Script=Han}]/gu, '')
  const old = new Set(ALL_PACKS.filter(p => !songSeasonsPacks.some(s => s.id === p.id)).flatMap(p => p.chapters.flatMap(c => c.blocks.filter(b => b.kind === 'poem').map(b => normalized(b.text)))))
  expect(SEASON_POEMS).toHaveLength(16)
  expect(new Set(SEASON_POEMS.map(p => p.sourceId)).size).toBe(16)
  expect(new Set(SEASON_POEMS.map(p => normalized(p.text))).size).toBe(16)
  expect(songSeasonsPacks.map(p => p.chapters.length)).toEqual([8, 8])
  for (const p of SEASON_POEMS) expect(old.has(normalized(p.text)), String(p.sourceId)).toBe(false)
})

it('aligns every poem character with pinyin and keeps complete original reading aids', () => {
  for (const p of SEASON_POEMS) {
    expect(p.translation.length).toBeGreaterThan(40)
    expect(p.note.length).toBeGreaterThan(35)
    const lines = p.text.split('\n'), py = p.pinyin.split('\n')
    expect(py.length).toBe(lines.length)
    lines.forEach((line, i) => expect(py[i]!.split(' ').length, String(p.sourceId)).toBe([...line.matchAll(/\p{Script=Han}/gu)].length))
    expect(p.pinyin.split(/\s+/).every(s => /^[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+$/.test(s))).toBe(true)
  }
})

it('gives all four books independent cover and chapter directions and runtime TTS jobs', () => {
  const scenes: string[] = [], keys: string[] = []
  for (const p of [...songSpringPacks, ...songSeasonsPacks]) {
    expect(p.coverArtPrompt!.length).toBeGreaterThan(30)
    scenes.push(`cover:${p.id}`)
    for (const c of p.chapters) {
      expect(c.art).toMatch(new RegExp(`^chapter:${p.id}:\\d+$`))
      expect(c.artPrompt!.length).toBeGreaterThan(30)
      scenes.push(c.art!)
      const jobs = chunkText(chapterSpeakText(c.blocks))
      expect(jobs).toHaveLength(1)
      expect(jobs[0]).toBe(c.blocks.find(b => b.kind === 'poem')!.text)
      keys.push(cacheKey(jobs[0]!, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', '__public__', 'stepaudio-3-gen-preview'))
    }
  }
  expect(new Set(scenes).size).toBe(40)
  expect(new Set(keys).size).toBe(36)
})
