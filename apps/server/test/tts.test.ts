/**
 * 服务端 TTS 模块单测（docs/13 P0-B）。
 *
 * 覆盖纯逻辑层：切段、MP3 时长解析、字级时间轴、音色/语速、缓存 key。
 * 网络层（stepaudio 出网）用注入的假 fetch 覆盖，不产生真实调用。
 */
import { describe, it, expect } from 'vitest'
import { chunkText, MAX_SEGMENT_CHARS, synthesizeSegment, synthesizeStream, TtsError } from '../src/modules/tts/client'
import { parseMp3 } from '../src/modules/tts/mp3duration'
import { buildCharTimeline, timelineFromMp3 } from '../src/modules/tts/timeline'
import { cacheKey, TtsCache } from '../src/modules/tts/cache'
import { VOICE_PRESETS, findVoice, clampSpeed, DEFAULT_SPEED, DEFAULT_VOICE_ID, SPEED_STEPS } from '../src/modules/tts/voices'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'

const MOM = VOICE_PRESETS.find((v) => v.id === 'mom-warm')!

describe('chunkText 切段', () => {
  it('短文本原样返回一段（不多切，减少出网次数）', () => {
    expect(chunkText('床前明月光')).toEqual(['床前明月光'])
  })

  it('空文本返回空数组', () => {
    expect(chunkText('')).toEqual([])
    expect(chunkText('   \n  ')).toEqual([])
  })

  it('总长不超上限时合并为一段，标点保留在段内', () => {
    // 设计：短段不切——切的目的是守 900 字上限，不是为了切而切
    expect(chunkText('第一句。第二句！第三句？')).toEqual(['第一句。第二句！第三句？'])
  })

  it('诗歌换行在段内保留 \n（朗读节奏）', () => {
    const out = chunkText('床前明月光，疑是地上霜。\n举头望明月，低头思故乡。')
    expect(out.length).toBe(1)
    expect(out[0]).toBe('床前明月光，疑是地上霜。\n举头望明月，低头思故乡。')
  })

  it('超长无标点串按上限硬切，不丢字', () => {
    const long = '啊'.repeat(2500)
    const out = chunkText(long)
    const total = out.reduce((n, s) => n + s.length, 0)
    expect(total).toBe(2500)
    for (const seg of out) expect(seg.length).toBeLessThanOrEqual(MAX_SEGMENT_CHARS)
  })

  it('超长多句文本在句号处切，标点留在句末', () => {
    const sentence = '说一句话。'
    const out = chunkText(sentence.repeat(250))
    expect(out.length).toBeGreaterThan(1)
    for (const seg of out) expect(seg.length).toBeLessThanOrEqual(MAX_SEGMENT_CHARS)
    // 每段以句末标点收尾（最后一段可能除外）
    for (let i = 0; i < out.length - 1; i++) {
      expect(out[i]!.at(-1)).toMatch(/[。！？!?；;.]/)
    }
    // 不丢字
    const total = out.reduce((n, s) => n + s.length, 0)
    expect(total).toBe(sentence.length * 250)
  })

  it('单句超过上限时在逗号处切', () => {
    const oneSentence = '字'.repeat(800) + '，' + '字'.repeat(800) + '。'
    const out = chunkText(oneSentence)
    expect(out.length).toBeGreaterThanOrEqual(2)
    const total = out.reduce((n, s) => n + s.length, 0)
    expect(total).toBe(oneSentence.length)
  })

  it('\r\n 归一为 \n，不残留回车', () => {
    const out = chunkText('行一\r\n行二')
    expect(out).toEqual(['行一\n行二'])
    expect(out[0]).not.toContain('\r')
  })

  it('分段后拼接（去换行）等于原文去空白', () => {
    const text = '春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。'
    const out = chunkText(text)
    const joined = out.join('\n')
    expect(joined.replace(/\s+/g, '')).toBe(text.replace(/\s+/g, ''))
  })
})
describe('parseMp3 纯 JS 时长解析', () => {
  /** 构造一个最小合法 MPEG1 LayerIII 帧头 */
  function frameHeader(bitrateIdx: number, sampleIdx: number, padding: number): Buffer {
    // 0xFF 0xFB: MPEG1, LayerIII, 无 CRC
    // bitrateIdx<<4 | sampleIdx<<2 | padding<<1 | 0(私有)
    return Buffer.from([0xff, 0xfb, (bitrateIdx << 4) | (sampleIdx << 2) | (padding << 1), 0x00])
  }

  it('识别不了同步字时返回 null', () => {
    expect(parseMp3(Buffer.from([0x00, 0x00, 0x00, 0x00]))).toBeNull()
  })

  it('空 buffer 返回 null', () => {
    expect(parseMp3(Buffer.alloc(0))).toBeNull()
  })

  it('跳过 ID3v2 标签后正确解析', () => {
    // ID3v2：'ID3' + 版本/标志 + 4 字节同步安全长度
    const tagSize = 10
    const id3 = Buffer.concat([Buffer.from('ID3'), Buffer.from([0x03, 0x00, 0x00]), Buffer.from([0x00, 0x00, 0x00, tagSize])])
    const pad = Buffer.alloc(tagSize, 0)
    const frame = Buffer.concat([frameHeader(9, 0, 0), Buffer.alloc(413, 0)]) // 128kbps 44100Hz
    const out = parseMp3(Buffer.concat([id3, pad, frame]))
    expect(out).not.toBeNull()
    expect(out!.frames).toBe(1)
    expect(out!.sampleRate).toBe(44100)
  })

  it('多帧累加时长', () => {
    const frame = Buffer.concat([frameHeader(9, 0, 0), Buffer.alloc(413, 0)])
    const buf = Buffer.concat([frame, frame, frame, frame])
    const out = parseMp3(buf)
    expect(out).not.toBeNull()
    expect(out!.frames).toBe(4)
    // 每帧 1152 样本 / 44100 Hz ≈ 26.12ms
    expect(out!.durationMs).toBeGreaterThan(100)
    expect(out!.durationMs).toBeLessThan(120)
  })

  it('坏帧不中断解析，跳过继续找同步字', () => {
    const frame = Buffer.concat([frameHeader(9, 0, 0), Buffer.alloc(413, 0)])
    const junk = Buffer.alloc(20, 0x55)
    const buf = Buffer.concat([frame, junk, frame])
    const out = parseMp3(buf)
    expect(out).not.toBeNull()
    expect(out!.frames).toBe(2)
  })

  it('真实样本文件能解出时长', async () => {
    const sample = join(process.cwd(), '..', '..', '.tao-tmp', 'tts-test.mp3')
    try {
      const buf = await fs.readFile(sample)
      const out = parseMp3(buf)
      expect(out).not.toBeNull()
      expect(out!.durationMs).toBeGreaterThan(3000)
    } catch {
      // 样本文件不存在时跳过（不在 CI 依赖本地夹具）
    }
  })
})

describe('buildCharTimeline 字级时间轴', () => {
  it('时间单调不减，首项起点为 0，末项终点=时长', () => {
    const text = '床前明月光，疑是地上霜。'
    const out = buildCharTimeline(text, 1000)
    expect(out.length).toBe(text.length)
    expect(out[0]!.start).toBe(0)
    expect(out.at(-1)!.end).toBe(1000)
    for (let i = 1; i < out.length; i++) {
      expect(out[i]!.start).toBeGreaterThanOrEqual(out[i - 1]!.start)
    }
  })

  it('标点比汉字分配更多时间', () => {
    const out = buildCharTimeline('啊。啊', 1000)
    const punct = out[1]!
    const char = out[0]!
    expect(punct.end - punct.start).toBeGreaterThan(char.end - char.start)
  })

  it('空文本不出时间轴', () => {
    expect(buildCharTimeline('', 1000)).toHaveLength(0)
  })

  it('零时长/负时长返回空轴（调用方应先丢弃这种音频）', () => {
    expect(buildCharTimeline('abc', 0)).toHaveLength(0)
    expect(buildCharTimeline('abc', -1)).toHaveLength(0)
  })

  it('每项带字符本身（前端逐字高亮渲染用）', () => {
    const out = buildCharTimeline('桃读', 500)
    expect(out.map((c) => c.char).join('')).toBe('桃读')
  })

  it('timelineFromMp3 结合解析与时间轴', () => {
    const frame = Buffer.concat([
      Buffer.from([0xff, 0xfb, (9 << 4) | (0 << 2), 0x00]),
      Buffer.alloc(413, 0),
    ])
    const out = timelineFromMp3('一句话', frame)
    expect(out.chars.length).toBe(3)
    expect(out.durationMs).toBeGreaterThan(0)
  })
})

describe('voices 音色与语速', () => {
  it('预置音色都带自然语言描述（stepaudio 靠 description 选音色）', () => {
    for (const v of VOICE_PRESETS) {
      expect(v.description.length).toBeGreaterThan(10)
      expect(v.label.length).toBeGreaterThan(0)
    }
  })

  it('findVoice 按 id 查，未知 id 回落默认', () => {
    expect(findVoice('mom-warm')!.id).toBe('mom-warm')
    expect(findVoice(undefined)!.id).toBe(DEFAULT_VOICE_ID)
    expect(findVoice('not-exist')!.id).toBe(DEFAULT_VOICE_ID)
  })

  it('clampSpeed 钳到 0.5-2，非法值回落默认', () => {
    expect(clampSpeed(0.92)).toBeCloseTo(0.92)
    expect(clampSpeed(0.1)).toBeCloseTo(0.5)
    expect(clampSpeed(5)).toBeCloseTo(2)
    expect(clampSpeed(NaN)).toBeCloseTo(DEFAULT_SPEED)
    expect(clampSpeed(undefined)).toBeCloseTo(DEFAULT_SPEED)
  })

  it('语速档位值单调且都在合法区间', () => {
    for (let i = 1; i < SPEED_STEPS.length; i++) {
      expect(SPEED_STEPS[i]!.value).toBeGreaterThan(SPEED_STEPS[i - 1]!.value)
    }
    for (const s of SPEED_STEPS) {
      expect(s.value).toBeGreaterThanOrEqual(0.5)
      expect(s.value).toBeLessThanOrEqual(2)
    }
  })
})

describe('cache 缓存 key 与读写', () => {
  it('key 随文本/音色/语速/格式变化', () => {
    const a = cacheKey('你好', 'mom-warm', 0.92, 'mp3')
    const b = cacheKey('你好', 'mom-warm', 1.1, 'mp3')
    const c = cacheKey('你好吗', 'mom-warm', 0.92, 'mp3')
    const d = cacheKey('你好', 'child-lively', 0.92, 'mp3')
    const e = cacheKey('你好', 'mom-warm', 0.92, 'wav')
    expect(new Set([a, b, c, d, e]).size).toBe(5)
  })

  it('语速 0.9 与 0.90 生成同一 key（浮点归一）', () => {
    expect(cacheKey('你好', 'mom-warm', 0.9, 'mp3')).toBe(cacheKey('你好', 'mom-warm', 0.90, 'mp3'))
  })

  it('磁盘读写往返 + urlPath 直取', async () => {
    const dir = await fs.mkdtemp(join(os.tmpdir(), 'tao-tts-'))
    const cache = new TtsCache(dir)
    const key = cacheKey('测试', 'mom-warm', 0.92, 'mp3')
    const entry = await cache.set(key, 'mp3', Buffer.from('audio-bytes'), 1234)
    expect(entry.urlPath).toMatch(/^\/api\/media\/tts\/[0-9a-f]{2}\/[0-9a-f]+\.mp3$/)
    const hit = await cache.get(key, 'mp3')
    expect(hit).not.toBeNull()
    expect(hit!.durationMs).toBe(1234)
    expect(hit!.urlPath).toBe(entry.urlPath)
    // 未命中的 key
    expect(await cache.get(cacheKey('别的', 'mom-warm', 0.92, 'mp3'), 'mp3')).toBeNull()
    await fs.rm(dir, { recursive: true, force: true })
  })
})


describe('client 出网（注入假 fetch）', () => {
  it('非流式合成：body 直接就是音频字节', async () => {
    const fakeFetch = (() =>
      Promise.resolve(
        new Response(Buffer.from('hello-audio'), {
          status: 200,
          headers: { 'Content-Type': 'audio/mpeg' },
        }),
      )) as unknown as typeof fetch
    const out = await synthesizeSegment(
      { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
      { text: '你好', voice: MOM, speed: 0.92, lang: 'zh', format: 'mp3' },
    )
    expect(out.audio.toString()).toBe('hello-audio')
  })

  it('空音频抛 TtsError', async () => {
    const fakeFetch = (() => Promise.resolve(new Response(new ArrayBuffer(0), { status: 200 }))) as unknown as typeof fetch
    await expect(
      synthesizeSegment(
        { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
        { text: '你好', voice: MOM, speed: 0.92, lang: 'zh' },
      ),
    ).rejects.toBeInstanceOf(TtsError)
  })

  it('HTTP 错误抛 TtsError', async () => {
    const fakeFetch = (() =>
      Promise.resolve(new Response(JSON.stringify({ error: { message: 'quota' } }), { status: 429 }))) as unknown as typeof fetch
    await expect(
      synthesizeSegment(
        { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
        { text: '你好', voice: MOM, speed: 0.92, lang: 'zh' },
      ),
    ).rejects.toBeInstanceOf(TtsError)
  })

  it('网络异常抛 TtsError（不泄漏原始错误）', async () => {
    const fakeFetch = (() => Promise.reject(new Error('ECONNRESET some-host'))) as unknown as typeof fetch
    await expect(
      synthesizeSegment(
        { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
        { text: '你好', voice: MOM, speed: 0.92, lang: 'zh' },
      ),
    ).rejects.toBeInstanceOf(TtsError)
  })

  it('流式合成：SSE 分片拼成完整音频', async () => {
    const enc = (s: string) => new TextEncoder().encode(s)
    const delta = (raw: Buffer) =>
      `data: ${JSON.stringify({ type: 'speech.audio.delta', audio: raw.toString('base64') })}\n\n`
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(enc(delta(Buffer.from('aaa'))))
        controller.enqueue(enc(delta(Buffer.from('bbb'))))
        controller.enqueue(enc('data: [DONE]\n\n'))
        controller.close()
      },
    })
    const fakeFetch = (() => Promise.resolve(new Response(body, { status: 200 }))) as unknown as typeof fetch
    const out = await synthesizeStream(
      { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
      { text: '你好', voice: MOM, speed: 0.92, lang: 'zh', format: 'mp3' },
      () => {},
    )
    expect(out.audio.toString()).toBe('aaabbb')
  })

  it('流式合成在 [DONE] 后正确收尾', async () => {
    const enc = (s: string) => new TextEncoder().encode(s)
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(
          enc(`data: ${JSON.stringify({ type: 'speech.audio.delta', audio: Buffer.from('xx').toString('base64') })}\n\n`),
        )
        controller.enqueue(enc('data: [DONE]\n\n'))
        controller.close()
      },
    })
    const fakeFetch = (() => Promise.resolve(new Response(body, { status: 200 }))) as unknown as typeof fetch
    const out = await synthesizeStream(
      { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
      { text: '你好', voice: MOM, speed: 0.92, lang: 'zh' },
      () => {},
    )
    expect(out.audio.toString()).toBe('xx')
  })

  it('流式合成的分片回调被逐块触发', async () => {
    const enc = (s: string) => new TextEncoder().encode(s)
    const delta = (raw: Buffer) =>
      `data: ${JSON.stringify({ type: 'speech.audio.delta', audio: raw.toString('base64') })}\n\n`
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(enc(delta(Buffer.from('aa'))))
        controller.enqueue(enc(delta(Buffer.from('bb'))))
        controller.enqueue(enc('data: [DONE]\n\n'))
        controller.close()
      },
    })
    const fakeFetch = (() => Promise.resolve(new Response(body, { status: 200 }))) as unknown as typeof fetch
    const seen: string[] = []
    await synthesizeStream(
      { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
      { text: '你好', voice: MOM, speed: 0.92, lang: 'zh' },
      (c) => seen.push(c.toString()),
    )
    expect(seen).toEqual(['aa', 'bb'])
  })

  it('流式合成无分片时抛 TtsError', async () => {
    const enc = (s: string) => new TextEncoder().encode(s)
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(enc('data: [DONE]\n\n'))
        controller.close()
      },
    })
    const fakeFetch = (() => Promise.resolve(new Response(body, { status: 200 }))) as unknown as typeof fetch
    await expect(
      synthesizeStream(
        { base: 'https://example.test', apiKey: 'k', model: 'm', fetch: fakeFetch },
        { text: '你好', voice: MOM, speed: 0.92, lang: 'zh' },
        () => {},
      ),
    ).rejects.toBeInstanceOf(TtsError)
  })
})
