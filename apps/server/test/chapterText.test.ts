import { describe, expect, it } from 'vitest'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'
import { chunkText } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'

/**
 * 键空间单一事实源回归（2026-09-28 事故）：预生成与运行时口径分叉
 * （客户端语速 1 vs 预生成 0.92；运行时混入 note 块 vs 预生成仅 text+poem）
 * 导致公共预生成缓存运行时命中率 0/6665。本测试锁住四管线共用的口径契约。
 */
describe('chapterSpeakText 朗读取文口径', () => {
  it('只保留 text/poem 块，按序 \\n 相连；note/image 不入朗读文本', () => {
    const blocks = [
      { kind: 'poem', text: '床前明月光，疑是地上霜。' },
      { kind: 'image', text: '' },
      { kind: 'note', text: 'New word: moon 月亮' },
      { kind: 'text', text: '李白抬头望着月亮，想起了家乡。' },
    ]
    expect(chapterSpeakText(blocks)).toBe('床前明月光，疑是地上霜。\n李白抬头望着月亮，想起了家乡。')
  })

  it('与 chunkText 拼接的段落边界一致（切段可回对齐到全文）', () => {
    const blocks = [
      { kind: 'text', text: '第一段。'.repeat(40) },
      { kind: 'note', text: 'New word: sky' },
      { kind: 'text', text: '第二段。'.repeat(40) },
    ]
    const full = chapterSpeakText(blocks)
    for (const seg of chunkText(full)) {
      expect(full.includes(seg)).toBe(true)
    }
  })

  it('英文书默认音色 en-storyteller，中文书默认音色与预生成同源', () => {
    expect(speakVoiceId('en')).toBe('en-storyteller')
    expect(speakVoiceId('zh')).toBe('mom-warm')
    // 语速默认 0.92 是预生成键的一部分，改动即大面积缓存失效——变动须重跑预生成
    expect(DEFAULT_SPEED).toBe(0.92)
  })

  it('缓存键含语速位：0.92 与 1 的键必然不同（本次事故的根）', () => {
    const seg = '同一段文本'
    expect(cacheKey(seg, 'mom-warm', 0.92, 'mp3', 'zh', '__public__', 'm')).not.toBe(
      cacheKey(seg, 'mom-warm', 1, 'mp3', 'zh', '__public__', 'm'),
    )
  })
})
