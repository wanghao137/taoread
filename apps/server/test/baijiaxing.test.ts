import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { Converter } from 'opencc-js'
import { baiJiaXing as book } from '../src/content/packs/primer-baijiaxing'
import { ALL_PACKS } from '../src/content/packs'
import { chapterSpeakText } from '../src/modules/tts/chapterText'
import { chunkText, synthesizeSegment, synthesizeStream } from '../src/modules/tts/client'
import { cacheKey } from '../src/modules/tts/cache'
import { surnameInstruction, surnameSpeech } from '../src/modules/tts/surnamePronunciation'
import { findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices'

describe('reviewed Baijiaxing edition', () => {
  it('preserves all 71 source lines, order and colophon under the existing catalog identity', () => {
    const fixture = JSON.parse(readFileSync(new URL('./fixtures/baijiaxing-source.json', import.meta.url), 'utf8'))
    const simplified = Converter({ from: 't', to: 'cn' })
    const source = fixture.paragraphs.map((line: string) => simplified(line).replace('荀羊于惠，甄曲家封', '荀羊於惠，甄麴家封'))
    const poems = book.chapters.flatMap(ch => ch.blocks.filter(b => b.kind === 'poem'))
    const lines = poems.flatMap(b => b.text.split('\n'))
    expect(lines).toEqual(source)
    expect(lines).toHaveLength(71)
    expect(lines.join('').replace(/[^\p{Script=Han}]/gu, '')).toHaveLength(568)
    expect(book.chapters).toHaveLength(9)
    expect(ALL_PACKS.filter(p => p.id === book.id)).toHaveLength(1)
    expect(new Set(book.chapters.map(c => c.art)).size).toBe(9)
    expect(book.chapters.every(c => !c.artPrompt?.includes('三字经'))).toBe(true)
    for (const b of poems) {
      expect(b.pinyin!.match(/[a-züāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]+/giu)).toHaveLength(b.text.replace(/[^\p{Script=Han}]/gu, '').length)
    }
    expect(poems[6]!.pinyin).toContain('mò qí sī mǎ')
    expect(poems[6]!.pinyin).toContain('yù chí gōng yáng')
    expect(poems[7]!.pinyin).toContain('zǐ jū')
    expect(poems[8]!.translation).toContain('第五、言、福是姓氏。“百家姓终”表示全书结束。')
    expect(poems[8]!.translation).toContain('呼延、归、海、羊舌、微生')
    expect(poems[6]!.translation).toContain('万俟、司马、上官、欧阳')
  })

  it('uses editorial surname readings without changing ordinary speech or legacy cache keys', () => {
    const legacy = (text: string) => createHash('sha256').update(`${text}\u0000mom-warm\u00000.92\u0000mp3\u0000zh\u0000__public__\u0000model`).digest('hex')
    expect(surnameInstruction('我能够快乐地回答问题。')).toBe('')
    expect(surnameSpeech('我查过资料，能够快乐地回答问题。')).toBe('我查过资料，能够快乐地回答问题。')
    expect(surnameSpeech('万俟司马，上官欧阳。')).toBe('莫其司马，上官欧阳。')
    expect(surnameSpeech('亓官司寇，仉督子车。')).toBe('亓官司寇，掌督子居。')
    expect(cacheKey('春眠不觉晓。', 'mom-warm', .92, 'mp3', 'zh', '__public__', 'model')).toBe(legacy('春眠不觉晓。'))
    for (const ch of book.chapters) for (const text of chunkText(chapterSpeakText(ch.blocks))) {
      const hints = surnameInstruction(text)
      expect(hints).not.toBe('')
      expect(surnameSpeech(text).replace(/[^\p{Script=Han}]/gu, '').length).toBe(text.replace(/[^\p{Script=Han}]/gu, '').length)
      expect(surnameSpeech(surnameSpeech(text))).toBe(surnameSpeech(text))
      expect((findVoice('mom-warm').instruction + ' ' + hints).length).toBeLessThanOrEqual(500)
      expect(cacheKey(text, 'mom-warm', .92, 'mp3', 'zh', '__public__', 'model')).not.toBe(legacy(text))
    }
    expect(surnameInstruction('万俟司马，上官欧阳。')).toContain('万俟（mò qí）')
    expect(surnameInstruction('赫连皇甫，尉迟公羊。')).toContain('尉迟（yù chí）')
    expect(surnameInstruction('丁宣贲邓，郁单杭洪。')).toContain('单（shàn）')
    expect(surnameInstruction('淳于单于，太叔申屠。')).toContain('单于（chán yú）')
    expect(surnameInstruction('宁仇栾暴，甘钭厉戎。')).toContain('钭（tǒu）')
    expect(surnameInstruction('冷訾辛阚，那简饶空。')).toContain('訾（zī）')
  })

  it('sends the same surname instructions through both synthesis paths while retaining source scripts', async () => {
    const text = '万俟司马，上官欧阳。'
    const bodies: Array<{ instruction: string; scripts: Array<{ text: string }> }> = []
    const deps = { base: 'https://tts.invalid', apiKey: 'test', model: 'model', fetch: (async (_url, init) => {
      const body = JSON.parse(String(init?.body)); bodies.push(body)
      return body.stream_format === 'audio' ? new Response(new Uint8Array([1, 2, 3]))
        : new Response('data: {"type":"speech.audio.delta","audio":"AQID"}\n\ndata: [DONE]\n\n', { headers: { 'content-type': 'text/event-stream' } })
    }) as typeof fetch }
    const input = { text, voice: findVoice('mom-warm'), speed: DEFAULT_SPEED, lang: 'zh' as const }
    await synthesizeSegment(deps, input)
    await synthesizeStream(deps, input, () => {})
    expect(bodies).toHaveLength(2)
    expect(bodies[0]!.instruction).toBe(bodies[1]!.instruction)
    for (const body of bodies) {
      // 注音层（docs/97）先于姓氏层做声调精确同音替换：默骑=莫其同音（mò qí）
      expect(body.scripts[0]!.text).toBe('默骑司马，上官欧阳。')
      expect(body.instruction).toContain('万俟（mò qí）')
    }
  })
})
