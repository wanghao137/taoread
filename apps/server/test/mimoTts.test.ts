import { describe, expect, it } from 'vitest'
import { TtsError } from '../src/modules/tts/client'
import { isWav, parseWav, synthesizeSegmentMimo } from '../src/modules/tts/mimo'

/** 构造最小合法 PCM WAV（44 字节头 + data），24kHz 16bit 单声道 */
function makeWav(dataBytes: number, opts: { sampleRate?: number; channels?: number } = {}): Buffer {
  const sampleRate = opts.sampleRate ?? 24000
  const channels = opts.channels ?? 1
  const byteRate = sampleRate * channels * 2
  const buf = Buffer.alloc(44 + dataBytes)
  buf.write('RIFF', 0, 'ascii')
  buf.writeUInt32LE(36 + dataBytes, 4)
  buf.write('WAVE', 8, 'ascii')
  buf.write('fmt ', 12, 'ascii')
  buf.writeUInt32LE(16, 16)
  buf.writeUInt16LE(1, 20) // PCM
  buf.writeUInt16LE(channels, 22)
  buf.writeUInt32LE(sampleRate, 24)
  buf.writeUInt32LE(byteRate, 28)
  buf.writeUInt16LE(channels * 2, 32)
  buf.writeUInt16LE(16, 34)
  buf.write('data', 36, 'ascii')
  buf.writeUInt32LE(dataBytes, 40)
  return buf
}

describe('parseWav', () => {
  it('按 data 块字节数/字节率计算时长（0.5 秒样本）', () => {
    const info = parseWav(makeWav(24000 * 2 / 2)) // 半秒 24kHz 单声道 16bit
    expect(info).not.toBeNull()
    expect(info!.durationMs).toBe(500)
    expect(info!.sampleRate).toBe(24000)
    expect(info!.channels).toBe(1)
  })

  it('容忍 data 块声明与实际字节不一致（取较小者）', () => {
    const wav = makeWav(48000)
    wav.writeUInt32LE(24000, 40) // 头里声明 data 只有 24000 字节（0.5s），实际尾部还有更多
    expect(parseWav(wav)!.durationMs).toBe(500)
  })

  it('非 WAV / 截断头 / 缺 fmt 块返回 null', () => {
    expect(parseWav(Buffer.from('not a wav file at all'))).toBeNull()
    expect(parseWav(makeWav(100).subarray(0, 20))).toBeNull()
    const broken = makeWav(100)
    broken.write('xxx ', 12, 'ascii') // fmt 块被破坏
    expect(parseWav(broken)).toBeNull()
  })

  it('isWav 与 courseRegistry 的 RIFF/WAVE 签名口径一致', () => {
    expect(isWav(makeWav(44))).toBe(true)
    expect(isWav(Buffer.alloc(40))).toBe(false)
  })
})

describe('synthesizeSegmentMimo', () => {
  const deps = { base: 'https://mimo.test/v1', apiKey: 'k', model: 'mimo-v2.5-tts' }
  const wavB64 = (bytes: number) => makeWav(bytes).toString('base64')

  it('请求体走 chat.completions 约定：assistant 放文本、user 放指令、audio.voice 用音色名', async () => {
    let captured: { url: string; headers: Record<string, string>; body: string } | null = null
    const result = await synthesizeSegmentMimo(
      { ...deps, fetch: (async (url: string, init?: RequestInit) => {
        captured = { url, headers: init?.headers as Record<string, string>, body: String(init?.body) }
        return new Response(JSON.stringify({ choices: [{ message: { audio: { data: wavB64(24000) } } }], usage: { prompt_tokens: 10, completion_tokens: 5 } }), { status: 200 })
      }) as typeof fetch },
      { text: 'sat', instruction: 'Read only the word once.', voice: 'Mia' },
    )
    expect(result.format).toBe('wav')
    expect(isWav(result.audio)).toBe(true)
    expect(result.usage?.completionTokens).toBe(5)
    const sent = captured as unknown as { url: string; headers: Record<string, string>; body: string }
    expect(sent.url).toBe('https://mimo.test/v1/chat/completions')
    expect(sent.headers.Authorization).toBe('Bearer k')
    const body = JSON.parse(sent.body)
    expect(body.model).toBe('mimo-v2.5-tts')
    expect(body.audio).toEqual({ format: 'wav', voice: 'Mia' })
    expect(body.messages).toEqual([
      { role: 'user', content: 'Read only the word once.' },
      { role: 'assistant', content: 'sat' },
    ])
  })

  it('非 200 抛 TtsError（带状态码），模型只回文本（缺 audio.data）抛 TtsError', async () => {
    const fail = (status: number, payload: string) => (async () => new Response(payload, { status })) as typeof fetch
    await expect(synthesizeSegmentMimo({ ...deps, fetch: fail(429, '{"error":"rate"}') }, { text: 'x', instruction: 'y', voice: 'Mia' })).rejects.toMatchObject({ name: 'TtsError', message: expect.stringContaining('429') })
    await expect(synthesizeSegmentMimo({ ...deps, fetch: (async () => new Response(JSON.stringify({ choices: [{ message: { content: 'I cannot sing.' } }] }), { status: 200 })) as typeof fetch }, { text: 'x', instruction: 'y', voice: 'Mia' })).rejects.toBeInstanceOf(TtsError)
    // 返回了 base64 但不是 WAV（防坏文件落盘）
    const notWav = Buffer.from('this is plain text, not audio').toString('base64')
    await expect(synthesizeSegmentMimo({ ...deps, fetch: (async () => new Response(JSON.stringify({ choices: [{ message: { audio: { data: notWav } } }] }), { status: 200 })) as typeof fetch }, { text: 'x', instruction: 'y', voice: 'Mia' })).rejects.toBeInstanceOf(TtsError)
  })

  it('网络层异常统一包成 TtsError，不泄漏主机名之外的信息给调用方', async () => {
    const boom = (async () => { throw new Error('getaddrinfo ENOTFOUND mimo.internal') }) as typeof fetch
    await expect(synthesizeSegmentMimo({ ...deps, fetch: boom }, { text: 'x', instruction: 'y', voice: 'Mia' })).rejects.toMatchObject({ name: 'TtsError' })
  })
})
