import { expect, it } from 'vitest'
import { SPRING_POEMS, songSpringPacks } from '../src/content/packs/poetry-song-spring'
import { ALL_PACKS } from '../src/content/packs'
import { DAILY_POEM_POOL } from '../src/content/daily-poem-pool'

it('publishes twenty distinct additions without duplicating an existing poem', () => {
  const normalized = (text: string) => text.replace(/\\n/g, '\n').replace(/[^\p{Script=Han}]/gu, '')
  const old = new Set(ALL_PACKS.filter(p => !songSpringPacks.some(s => s.id === p.id)).flatMap(p => p.chapters.flatMap(c => c.blocks.filter(b => b.kind === 'poem').map(b => normalized(b.text)))))
  expect(SPRING_POEMS).toHaveLength(20)
  expect(new Set(SPRING_POEMS.map(p => p.sourceId)).size).toBe(20)
  expect(new Set(SPRING_POEMS.map(p => normalized(p.text))).size).toBe(20)
  for (const p of SPRING_POEMS) expect(old.has(normalized(p.text)), p.title).toBe(false)
  expect(songSpringPacks.map(p => [p.ageStage, p.chapters.length])).toEqual([['6-8', 9], ['9-12', 11]])
})
it('renders every Han character with a valid syllable and records complete provenance', () => {
  for (const p of SPRING_POEMS) {
    expect(p.dynasty).toBe('宋')
    expect(p.translation.length).toBeGreaterThan(35)
    expect(p.sourceUrl).toMatch(/^https:\/\//)
    expect(p.editionNote.length).toBeGreaterThan(15)
    const lines = p.text.split('\n')
    expect(p.pinyin.split('\n').length).toBe(lines.length)
    lines.forEach((line, i) => expect(p.pinyin.split('\n')[i]!.split(' ').length, p.title).toBe([...line].filter(c => /\p{Script=Han}/u.test(c)).length))
    expect(p.pinyin.split(/\s+/).every(py => /^[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+$/.test(py)), p.title).toBe(true)
  }
})
it('keeps corrected polyphones and selected editions and includes all additions in age appropriate daily rotation', () => {
  const get = (id: number) => SPRING_POEMS.find(p => p.sourceId === id)!
  expect(get(42266).pinyin).toContain('mò shāo hén')
  expect(get(86357).pinyin).toMatch(/^zhòng tián/)
  expect(get(97496).pinyin).toContain('chóng mén')
  expect(get(86362).pinyin).toContain('shàn wéi zhì')
  expect(get(29724).pinyin).toMatch(/^tí jué/)
  expect(get(29724).pinyin).toContain('yǐ pàn')
  expect(get(125755).text).toContain('尽日如年')
  expect(get(132483).text).toContain('溪绕')
  const newEntries = DAILY_POEM_POOL.filter(e => songSpringPacks.some(p => p.id === e.bookId))
  expect(newEntries).toHaveLength(20)
  expect(newEntries.some(e => e.minStage === '3-5')).toBe(false)
  expect(newEntries.filter(e => e.minStage === '6-8')).toHaveLength(9)
})
