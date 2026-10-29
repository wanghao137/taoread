import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { narrationInput } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'
import { rubyInstruction, rubyPronunciation } from '../src/modules/tts/rubyPronunciation'
import { rubySubEntries } from '../src/modules/tts/rubyPronunciation.generated'

describe('ruby pronunciation layer (docs/97 注音驱动)', () => {
  it('reads annotated characters per pack pinyin — the user-reported baijiaxing case', () => {
    expect(rubyPronunciation('丁宣贲邓，郁单杭洪。')).toBe('丁宣贲邓，郁善杭洪。')
    expect(narrationInput('丁宣贲邓，郁单杭洪。')).toContain('郁善杭洪')
    // 经典蒙学多音字全部按注音
    expect(rubyPronunciation('凡训蒙，须讲究，详训故，明句读。')).toContain('句豆')
    expect(rubyPronunciation('周道衰，王纳坠，逞士戈，尚游说。')).toContain('游睡')
    expect(rubyPronunciation('礼乐射，御书数，古六艺，今不具。')).toContain('礼月')
  })

  it('does not substitute where annotation equals default (五行已修正为 xíng)', () => {
    expect(rubyPronunciation('曰水火，木金土，此五行，本乎数。')).toBe('曰水火，木金土，此五行，本乎数。')
    expect(rubyPronunciation('路遥知马力，日久见人心。')).toBe('路遥知马力，日久见人心。')
  })

  it('position-verified replacement stays idempotent against other correction layers', () => {
    const once = rubyPronunciation('丁宣贲邓，郁单杭洪。')
    expect(rubyPronunciation(once)).toBe(once)
    // 与姓氏层叠加：结果一致，不重复替换
    expect(narrationInput('郁单杭洪。')).toBe(narrationInput(narrationInput('郁单杭洪。')))
  })

  it('v2 revision salt rotates corrected segments; clean keys are stable', () => {
    const key = (text: string) => cacheKey(text, 'mom-warm', .92, 'mp3', 'zh', '__public__', 'model')
    const legacy = (text: string) => createHash('sha256').update(`${text}\u0000mom-warm\u00000.92\u0000mp3\u0000zh\u0000__public__\u0000model`).digest('hex')
    // 修正段：新键 ≠ 旧无盐键（旧键下存在键-内容脱节的历史音频，必须失活）
    expect(key('丁宣贲邓，郁单杭洪。')).not.toBe(legacy('丁宣贲邓，郁单杭洪。'))
    // 干净段：键保持稳定不扰动
    expect(key('春眠不觉晓。')).toBe(legacy('春眠不觉晓。'))
  })

  it('generated data integrity: UTF-16 positions match the line, to differs from from', () => {
    expect(rubySubEntries.length).toBeGreaterThan(500)
    for (const entry of rubySubEntries) {
      for (const sub of entry.subs) {
        expect(entry.line.substr(sub.pos, sub.from.length), `${entry.line}@${sub.pos}`).toBe(sub.from)
        expect(sub.to).not.toBe(sub.from)
      }
    }
  })

  it('hint entries exist for characters without clean homophones', () => {
    expect(rubyInstruction('自言本是京城女，家在虾蟆陵下住。')).toContain('虾（há）')
    expect(rubyInstruction('路遥知马力，日久见人心。')).toBe('')
  })
})
