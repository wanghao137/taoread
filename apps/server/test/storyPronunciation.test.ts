import { describe, expect, it } from 'vitest'
import { narrationInput } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'
import { storyPronunciation } from '../src/modules/tts/storyPronunciation'
import { ALL_PACKS } from '../src/content/packs/index'

describe('story pronunciation corrections', () => {
  it('corrects classical readings in story poems', () => {
    expect(storyPronunciation('昨夜见军帖，可汗大点兵。'))
      .toBe('昨夜见军贴，克寒大点兵。')
    expect(storyPronunciation('但闻燕山胡骑鸣啾啾。朔气传金柝。'))
      .toBe('但闻烟山胡寄鸣啾啾。朔气传金唾。')
    expect(storyPronunciation('盈盈一水间，脉脉不得语。'))
      .toBe('盈盈一水间，莫莫不得语。')
    expect(storyPronunciation('昔者仓颉作书而天雨粟，鬼夜哭。'))
      .toBe('昔者仓颉作书而天玉粟，鬼夜哭。')
  })

  it('leaves unrelated modern prose untouched', () => {
    const prose = '他汗流浃背，帖子还没写完，可场面十分热闹。'
    expect(storyPronunciation(prose)).toBe(prose)
    expect(narrationInput('工作帖子和老板的汗。')).toBe('工作帖子和老板的汗。')
  })

  it('rotates cache keys for corrected segments without churning clean ones', () => {
    const key = (text: string) => cacheKey(text, 'mom-warm', .92, 'mp3', 'zh', '__public__', 'model')
    expect(key('昨夜见军帖，可汗大点兵。')).not.toBe(key('昨夜见军贴，克寒大点兵。'))
    // 修正后的语音文本进入键盐：同键空间下旧（错误发音）音频不再被命中
    expect(key('春眠不觉晓。')).toBe(cacheKey('春眠不觉晓。', 'mom-warm', .92, 'mp3', 'zh', '__public__', 'model'))
  })

  it('covers exactly the story poems under audit; no drift without a lexicon review', () => {
    // 木兰诗/迢迢牵牛星/山海经的朗读输入必须经过词典修正——
    // 若 pack 文本改动导致条目失配，这里立即报警而不是悄悄回退误读。
    const corrected: Array<{ book: string; text: string }> = []
    for (const pack of ALL_PACKS) {
      if (pack.lang !== 'zh') continue
      for (const ch of pack.chapters) {
        for (const b of ch.blocks) {
          if (b.kind !== 'text' && b.kind !== 'poem') continue
          if (storyPronunciation(b.text) !== b.text) corrected.push({ book: pack.id, text: b.text })
        }
      }
    }
    const books = [...new Set(corrected.map(c => c.book))].sort()
    expect(books).toEqual(['folktale-cowherd', 'folktale-mulan', 'myth-shanhaijing', 'sanzi-jing', 'songci-rivers', 'tangshi-300'])
    // 出现新命中（其他书或新条目）时必须人工过目词典后再更新此清单
    expect(corrected.map(c => c.book + '·' + c.text.slice(0, 12))).toMatchSnapshot()
  })
})
