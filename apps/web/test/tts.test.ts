/**
 * TTS 引擎单元测试（docs/09 C5）。
 * 纯逻辑层：分句、语音打分、降级链。speechSynthesis 在 node 环境不存在，
 * tts 单例的浏览器分支由 isSupported 守卫，不在此测；测的是可复用的纯函数。
 */
import { describe, expect, it } from 'vitest'
import { splitSentences, listVoices, pickVoice } from '../src/lib/tts'

describe('splitSentences（分句）', () => {
  it('空串与纯空白返回空数组', () => {
    expect(splitSentences('')).toEqual([])
    expect(splitSentences('   \n\t ')).toEqual([])
  })

  it('中文句号/问号/感叹号切分并保留标点', () => {
    const out = splitSentences('床前明月光。疑是地上霜。举头望明月？低头思故乡！')
    expect(out).toEqual([
      '床前明月光。',
      '疑是地上霜。',
      '举头望明月？',
      '低头思故乡！',
    ])
  })

  it('英文句号/问号/感叹号切分', () => {
    const out = splitSentences('Hello world. How are you? Fine!')
    expect(out).toEqual(['Hello world.', 'How are you?', 'Fine!'])
  })

  it('分号也切分（中文分号与英文分号）', () => {
    expect(splitSentences('春；夏；秋；冬；')).toEqual(['春；', '夏；', '秋；', '冬；'])
  })

  it('超长无标点串在逗号/空格/顿号处兜底切分', () => {
    const long = '一二三四五六七八九十，一二三四五六七八九十，一二三四五六七八九十，一二三四五六七八九十'
    const out = splitSentences(long, 20)
    expect(out.length).toBeGreaterThan(1)
    // 每段不超过 maxLen + 一个标点的容差
    for (const p of out) expect(p.length).toBeLessThanOrEqual(21)
  })

  it('超长且无任何切分点时整段保留', () => {
    const long = '桃'.repeat(60)
    const out = splitSentences(long, 40)
    expect(out.length).toBeGreaterThanOrEqual(1)
    expect(out.join('')).toBe(long)
  })

  it('换行符切分（诗歌排版）', () => {
    expect(splitSentences('白日依山尽\n黄河入海流')).toEqual(['白日依山尽', '黄河入海流'])
  })

  it('多个连续标点不产生空段', () => {
    const src = '说完了。。\n。然后呢？'
    const out = splitSentences(src)
    expect(out.every((p) => p.length > 0)).toBe(true)
    // 换行被切分后自然消失：join 后应等于去掉换行与空白的原文
    expect(out.join('')).toBe(src.replace(/\s+/g, ''))
  })
})

describe('listVoices / pickVoice（无 speechSynthesis 时的降级）', () => {
  it('node 环境无 speechSynthesis：listVoices 返回空数组', () => {
    expect(typeof globalThis.speechSynthesis).toBe('undefined')
    expect(listVoices('zh')).toEqual([])
    expect(listVoices('en')).toEqual([])
  })

  it('无语音时 pickVoice 返回 null（调用方应给 UI 降级提示）', () => {
    expect(pickVoice('zh')).toBeNull()
    expect(pickVoice('zh', 'Microsoft 晓晓')).toBeNull()
    expect(pickVoice('en', 'Google US English')).toBeNull()
  })
})
