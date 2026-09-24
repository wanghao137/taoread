/**
 * 阶跃星辰 stepaudio-3-gen 客户端（docs/13 P0-B）。
 *
 * 接口：POST {TTS_BASE}/v1/audio/generate，Bearer 鉴权，SSE 流式返回 base64 音频分片。
 * 限制：scripts 合计 ≤1000 字符 → 长章节必须切段。
 * 限时免费期使用；key 只从 config 注入，绝不落源码。
 */
import type { VoicePreset } from './voices'
import { clampSpeed } from './voices'

export interface SynthesizeInput {
  text: string
  voice: VoicePreset
  speed: number
  lang: 'zh' | 'en'
  /** 音频格式：默认 mp3（前端 <audio> 直接播；wav 仅用于时长精确计算的场景） */
  format?: 'mp3' | 'wav' | 'flac' | 'opus' | 'pcm'
}

export interface SynthesizeResult {
  /** 音频字节（mp3 等） */
  audio: Buffer
  format: string
}

export interface TtsClientDeps {
  base: string
  apiKey: string
  model: string
  /** 出网函数注入点（测试用假实现） */
  fetch?: typeof fetch
}

/**
 * 单段合成上限（API scripts 上限 1000 字符，留标点余量）。
 * 上线实测（2026-09-24）：900 字整段合成首响 15-45 秒，孩子等不及。
 * 降到 220 字：首段更快出声、后续段边合成边播（粒度≈一个自然段落）。
 */
export const MAX_SEGMENT_CHARS = 220

/**
 * 把长文本切成 ≤MAX_SEGMENT_CHARS 的段。
 * 优先在句号/感叹号/问号处切，其次逗号/分号，最后才硬切。
 * 诗歌的换行先变成段边界（保留节奏）。
 */
export function chunkText(text: string, maxLen = MAX_SEGMENT_CHARS): string[] {
  const normalized = text.replace(/\r\n/g, '\n')
  const lines = normalized.split('\n').map((l) => l.trim()).filter(Boolean)
  const segments: string[] = []
  let buf = ''

  const flush = () => {
    if (buf.trim()) segments.push(buf.trim())
    buf = ''
  }

  for (const line of lines) {
    // 单行就超长：按句切
    if (line.length > maxLen) {
      flush()
      let rest = line
      while (rest.length > maxLen) {
        // 找 maxLen 之前的最后一个句末标点
        let cut = -1
        for (let i = maxLen; i > maxLen * 0.5; i--) {
          if (/[。！？!?；;.]/.test(rest[i - 1] ?? '')) {
            cut = i
            break
          }
        }
        if (cut <= 0) {
          for (let i = maxLen; i > maxLen * 0.5; i--) {
            if (/[，,、]/.test(rest[i - 1] ?? '')) {
              cut = i
              break
            }
          }
        }
        if (cut <= 0) cut = maxLen
        segments.push(rest.slice(0, cut).trim())
        rest = rest.slice(cut)
      }
      if (rest.trim()) buf = rest
      continue
    }
    // 当前行能并入当前段就并入（加换行保留诗歌节奏）
    const candidate = buf ? `${buf}\n${line}` : line
    if (candidate.length > maxLen) {
      flush()
      buf = line
    } else {
      buf = candidate
    }
  }
  flush()
  return segments.filter((s) => s.length > 0)
}

/**
 * 单段合成（非流式，一次拿完整音频）。
 * 适合短文本与缓存预热；长章节用流式接口。
 */
export async function synthesizeSegment(
  deps: TtsClientDeps,
  input: SynthesizeInput,
): Promise<SynthesizeResult> {
  const fetchFn = deps.fetch ?? fetch
  const format = input.format ?? 'mp3'
  const instruction = [
    input.voice.instruction,
    input.lang === 'en' ? 'Speak clearly in natural English suitable for children.' : '',
  ]
    .filter(Boolean)
    .join(' ')

  let res: Response
  try {
    res = await fetchFn(`${deps.base}/v1/audio/generate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${deps.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: deps.model,
        task: 'text_to_audio',
        roles: [
          {
            name: 'narrator',
            description: input.voice.description,
          },
        ],
        scripts: [{ speaker: 'narrator', text: input.text }],
        instruction,
        response_format: format,
        speed: clampSpeed(input.speed),
        stream_format: 'audio',
      }),
    })
  } catch (err) {
    // 网络层故障统一包成 TtsError，避免原始错误信息（含主机名）泄漏给用户
    throw new TtsError('朗读服务连不上，请稍后再试', err instanceof Error ? err.message.slice(0, 120) : '')
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new TtsError(`stepaudio 返回 ${res.status}`, detail.slice(0, 200))
  }
  // 非流式：content-type 直接是音频
  const arrayBuf = await res.arrayBuffer()
  if (arrayBuf.byteLength === 0) throw new TtsError('stepaudio 返回空音频', '')
  return { audio: Buffer.from(arrayBuf), format }
}

/**
 * 流式合成（SSE）：逐块回调 base64 音频分片，首字节延迟低。
 * @param onChunk 每收到一个 delta 分片就回调（已解码为 Buffer）
 * @returns 完整音频（拼接所有分片）
 */
export async function synthesizeStream(
  deps: TtsClientDeps,
  input: SynthesizeInput,
  onChunk: (chunk: Buffer) => void,
): Promise<SynthesizeResult> {
  const fetchFn = deps.fetch ?? fetch
  const format = input.format ?? 'mp3'
  const instruction = [
    input.voice.instruction,
    input.lang === 'en' ? 'Speak clearly in natural English suitable for children.' : '',
  ]
    .filter(Boolean)
    .join(' ')

  let res: Response
  try {
    res = await fetchFn(`${deps.base}/v1/audio/generate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${deps.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: deps.model,
        task: 'text_to_audio',
        roles: [{ name: 'narrator', description: input.voice.description }],
        scripts: [{ speaker: 'narrator', text: input.text }],
        instruction,
        response_format: format,
        speed: clampSpeed(input.speed),
        stream_format: 'sse',
      }),
    })
  } catch (err) {
    throw new TtsError('朗读服务连不上，请稍后再试', err instanceof Error ? err.message.slice(0, 120) : '')
  }

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '')
    throw new TtsError(`stepaudio 返回 ${res.status}`, detail.slice(0, 200))
  }

  const chunks: Buffer[] = []
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let sseBuf = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    sseBuf += decoder.decode(value, { stream: true })
    const lines = sseBuf.split('\n')
    // 最后一行可能不完整，留着
    sseBuf = lines.pop() ?? ''
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const payload = trimmed.slice(5).trim()
      if (payload === '[DONE]') continue
      try {
        const evt = JSON.parse(payload)
        if (evt.type === 'speech.audio.delta' && typeof evt.audio === 'string') {
          const chunk = Buffer.from(evt.audio, 'base64')
          chunks.push(chunk)
          onChunk(chunk)
        }
      } catch {
        /* 心跳/未知事件：跳过 */
      }
    }
  }

  if (chunks.length === 0) throw new TtsError('stepaudio 未返回音频分片', '')
  return { audio: Buffer.concat(chunks), format }
}

export class TtsError extends Error {
  detail: string
  constructor(message: string, detail: string) {
    super(message)
    this.name = 'TtsError'
    this.detail = detail
  }
}
