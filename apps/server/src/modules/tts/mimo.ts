/**
 * 小米 MiMo TTS 客户端（docs/90：自然拼读音频生产换用 MiMo）。
 *
 * 接口：POST {MIMO_BASE}/chat/completions（OpenAI 兼容 chat 协议），Bearer 鉴权。
 * 约定：教学文本放 assistant 角色，user 角色只放风格指令；audio.voice 用预置音色名。
 * 限制：仅输出 24kHz/16bit 单声道 WAV（无 mp3），无数值语速参数（语速走指令措辞）。
 * key 只从 config/env 注入，绝不落源码。
 */
import { TtsError } from './client'

export interface MimoClientDeps {
  base: string
  apiKey: string
  model: string
  /** 出网函数注入点（测试用假实现） */
  fetch?: typeof fetch
}

export interface MimoSynthesizeInput {
  text: string
  /** 风格/约束指令（用户角色内容），如「只准确朗读原文，不加音乐音效」 */
  instruction: string
  /** MiMo 预置音色名（中文：茉莉/冰糖/苏打/白桦；英文：Mia/Chloe/Milo/Dean） */
  voice: string
}

export interface MimoSynthesizeResult {
  audio: Buffer
  format: 'wav'
  /** 响应 usage（token 计量），供生产台账记录 */
  usage?: { promptTokens?: number; completionTokens?: number }
}

/** 单段合成超时：MiMo 实测短样本 3-10s，90s 稳妥上限 */
const MIMO_FETCH_TIMEOUT_MS = 90_000

interface MimoChatResponse {
  choices?: Array<{ message?: { audio?: { data?: string } } }>
  usage?: { prompt_tokens?: number; completion_tokens?: number }
}

/**
 * 单段合成（非流式）。返回 MiMo 原生 WAV 字节（audio.data base64）。
 * 校验 RIFF/WAVE 签名：模型偶尔只回文本不回音频时，这里立即失败而不是落盘坏文件。
 */
export async function synthesizeSegmentMimo(
  deps: MimoClientDeps,
  input: MimoSynthesizeInput,
): Promise<MimoSynthesizeResult> {
  const fetchFn = deps.fetch ?? fetch
  let res: Response
  try {
    res = await fetchFn(`${deps.base.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${deps.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: deps.model,
        messages: [
          { role: 'user', content: input.instruction },
          { role: 'assistant', content: input.text },
        ],
        audio: { format: 'wav', voice: input.voice },
      }),
      signal: AbortSignal.timeout(MIMO_FETCH_TIMEOUT_MS),
    })
  } catch (err) {
    throw new TtsError('朗读服务连不上，请稍后再试', err instanceof Error ? err.message.slice(0, 120) : '')
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new TtsError(`mimo 返回 ${res.status}`, detail.slice(0, 200))
  }
  let payload: MimoChatResponse
  try {
    payload = (await res.json()) as MimoChatResponse
  } catch {
    throw new TtsError('mimo 返回不是 JSON', '')
  }
  const data = payload.choices?.[0]?.message?.audio?.data
  if (typeof data !== 'string' || !data) throw new TtsError('mimo 未返回音频', '')
  const audio = Buffer.from(data, 'base64')
  if (!isWav(audio)) throw new TtsError('mimo 返回的不是 WAV 音频', '')
  return {
    audio,
    format: 'wav',
    usage: { promptTokens: payload.usage?.prompt_tokens, completionTokens: payload.usage?.completion_tokens },
  }
}

export function isWav(buf: Buffer): boolean {
  return buf.length > 44 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WAVE'
}

export interface WavInfo {
  durationMs: number
  sampleRate: number
  channels: number
}

/**
 * 解析 PCM WAV 时长（data 块字节数 / 字节率）。返回 null 表示不是有效 WAV。
 * 只找 fmt 块参数，然后按声明定位 data 块，不遍历采样数据。
 */
export function parseWav(buf: Buffer): WavInfo | null {
  if (!isWav(buf)) return null
  let offset = 12
  let sampleRate = 0
  let byteRate = 0
  let channels = 0
  while (offset + 8 <= buf.length) {
    const id = buf.toString('ascii', offset, offset + 4)
    const size = buf.readUInt32LE(offset + 4)
    if (id === 'fmt ') {
      if (size < 16 || offset + 8 + size > buf.length) return null
      channels = buf.readUInt16LE(offset + 10)
      sampleRate = buf.readUInt32LE(offset + 12)
      byteRate = buf.readUInt32LE(offset + 16)
    } else if (id === 'data') {
      if (!sampleRate || !byteRate || channels < 1) return null
      const dataBytes = Math.min(size, buf.length - offset - 8)
      if (dataBytes <= 0) return null
      return { durationMs: Math.round((dataBytes / byteRate) * 1000), sampleRate, channels }
    }
    offset += 8 + size + (size % 2)
  }
  return null
}
