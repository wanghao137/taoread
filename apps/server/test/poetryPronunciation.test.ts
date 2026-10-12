import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { narrationInput, synthesizeSegment } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'
import { findVoice } from '../src/modules/tts/voices'

describe('poetry pronunciation corrections', () => {
  it('corrects only evidenced contexts, preserving unrelated meanings', () => {
    expect(narrationInput('远草青青没烧痕。鶗鴂鸣时春事空，已拚江草无情绿。失喜漫占鸦，着物春犹浅。'))
      .toBe('远草青青墨烧痕。提决鸣时春事空，已盼江草无情绿。失喜漫瞻鸦，浊物春犹浅。')
    expect(narrationInput('没有烧痕。占领土地，着急，拚命。')).toBe('没有烧痕。占领土地，着急，拚命。')
    expect(narrationInput('尽日重门不启关。澹磨明镜照檐楹。何苦生厌薄。'))
      .toBe('尽日崇门不启关。淡磨明镜照檐楹。何苦生厌博。')
  })
  it('retains existing keys but separates corrected narration from cached errors', () => {
    const legacy = (text: string) => createHash('sha256').update(`${text}\u0000mom-warm\u00000.92\u0000mp3\u0000zh\u0000__public__\u0000model`).digest('hex')
    const key = (text: string) => cacheKey(text, 'mom-warm', .92, 'mp3', 'zh', '__public__', 'model')
    expect(key('春眠不觉晓。')).toBe(legacy('春眠不觉晓。'))
    expect(key('远草青青没烧痕。')).not.toBe(legacy('远草青青没烧痕。'))
    expect(key('远草青青没烧痕。')).not.toBe(key('远草青青墨烧痕。'))
  })
  it('sends corrected speech while keeping the caller edition intact', async () => {
    const text = '鶗鴂鸣时春事空，已拚江草无情绿。'
    let body: any
    await synthesizeSegment({ base: 'https://tts.invalid', apiKey: 'test', model: 'model', fetch: (async (_url, init) => {
      body = JSON.parse(String(init?.body))
      return new Response(new Uint8Array([1, 2, 3]))
    }) as typeof fetch }, { text, voice: findVoice('mom-warm'), speed: .92, lang: 'zh' })
    expect(body.scripts[0].text).toBe('提决鸣时春事空，已盼江草无情绿。')
    expect(text).toBe('鶗鴂鸣时春事空，已拚江草无情绿。')
  })
})
