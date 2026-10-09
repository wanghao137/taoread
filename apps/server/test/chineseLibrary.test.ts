import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { ALL_PACKS } from '../src/content/packs'
import { chineseOpenStories } from '../src/content/packs/chinese-open-stories'

describe('Chinese story source integrity and editorial regressions', () => {
  it('retains every source page in order with author/translator/license provenance', () => {
    const sources = JSON.parse(readFileSync(new URL('../scripts/corpus-data/chinese-stories-20261009.json', import.meta.url), 'utf8')) as Array<{ id: string; pages: number; textSha256: string; author: string; translator: string; sourceUrl: string }>
    expect(chineseOpenStories).toHaveLength(20)
    expect(sources.reduce((n, s) => n + s.pages, 0)).toBe(233)
    for (const s of sources) {
      const book = ALL_PACKS.find((b) => b.id === s.id)!
      const pages = book.chapters.flatMap((ch) => ch.blocks.filter((b) => b.kind === 'text').map((b) => b.text))
      expect(pages).toHaveLength(s.pages)
      expect(createHash('sha256').update(pages.join('\n\n')).digest('hex')).toBe(s.textSha256)
      expect(book.rights).toMatchObject({ basis: 'cc-by', author: s.author, translator: s.translator, sourceUrl: s.sourceUrl })
      expect(book.source).toContain('完整')
    }
  })
  it('tells the Monkey King story chronologically and ends at Five Elements Mountain', () => {
    const book = ALL_PACKS.find((b) => b.id === 'xiyou-wukong')!
    expect(book.chapters.map((c) => c.title.split(' · ')[1])).toEqual(['石猴称王', '拜师学艺', '龙宫借宝', '官封弼马温', '大闹蟠桃会', '大战二郎神', '火眼金睛', '五行山下'])
    expect(book.chapters.flatMap((c) => c.blocks.map((b) => b.text)).join('')).not.toContain('第五章已经读过')
  })
  it('keeps all three White Bone Demon encounters and the ending as separate episodes', () => {
    const book = ALL_PACKS.find((b) => b.id === 'xiyou-bonewhite')!
    expect(book.chapters.map((c) => c.title.split(' · ')[1])).toEqual(['白虎岭前', '第一次打', '第二次打', '第三次打', '误会化开的时候'])
    expect(book.chapters[2]!.blocks.map((b) => b.text).join('')).toContain('老奶奶')
    expect(book.chapters[3]!.blocks.map((b) => b.text).join('')).toContain('老爷爷')
  })
  it('does not reuse an illustration key for different Chinese story episodes', () => {
    for (const book of ALL_PACKS.filter((b) => b.lang === 'zh')) {
      const scenes = new Map<string, string | undefined>()
      for (const ch of book.chapters) {
        if (!ch.art) continue
        if (scenes.has(ch.art)) expect(ch.artPrompt, `${book.id}/${ch.art}`).toBe(scenes.get(ch.art))
        scenes.set(ch.art, ch.artPrompt)
      }
    }
  })
  it('labels selections accurately instead of promising complete novels or anthologies', () => {
    for (const id of ['sanguo-journey', 'shuihu-heroes', 'honglou-dream', 'myth-shanhaijing']) expect(ALL_PACKS.find((b) => b.id === id)!.title).toContain('选读')
    const song = ALL_PACKS.find((b) => b.id === 'songci-rivers')!
    expect(song.chapters).toHaveLength(280)
    expect(song.source).not.toContain('全本')
    expect(song.intro).toContain('不代表')
    expect(ALL_PACKS.find((b) => b.id === 'essay-fengzikai')!.rights.basis).toBe('adapted')
  })
})
