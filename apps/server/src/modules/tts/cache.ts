/**
 * TTS 音频缓存（docs/13 P0-B）。
 *
 * stepaudio 每次合成都要出网+生成（秒级），同样的文本+音色+语速不该重复合成。
 * 缓存 key = sha256(text + voiceId + speed + format)，存到 media 目录，元数据进 SQLite。
 * 缓存目录随媒体库统一备份/清理；删除家庭时不清理（缓存不归属任何家庭，无隐私泄露面）。
 */
import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

export interface CacheEntry {
  /** 缓存文件相对路径（相对 mediaDir） */
  relPath: string
  /** 直接给前端的 URL 路径（/api/media/tts/xx/yy.mp3） */
  urlPath: string
  format: string
  durationMs: number
  bytes: number
}

export function cacheKey(
  text: string,
  voiceId: string,
  speed: number,
  format: string,
  /** 审计 F16/T06：语言入键——中英同文本（如 "OK"）缓存必须隔离 */
  lang = 'zh',
): string {
  return createHash('sha256')
    .update(`${text}\u0000${voiceId}\u0000${speed.toFixed(2)}\u0000${format}\u0000${lang}`)
    .digest('hex')
}

export class TtsCache {
  constructor(private mediaDir: string) {}

  private path(key: string, format: string): string {
    // 分片两级目录避免单目录文件过多
    const sub = key.slice(0, 2)
    return join(this.mediaDir, 'tts', sub, `${key}.${format}`)
  }

  async get(key: string, format: string): Promise<CacheEntry | null> {
    const p = this.path(key, format)
    try {
      const st = await stat(p)
      if (!st.isFile()) return null
      // 时长在写入时已经算好，存在同名 .json 里
      const metaP = `${p.slice(0, -(`.${format}`.length))}.json`
      let durationMs = 0
      try {
        durationMs = JSON.parse(await readFile(metaP, 'utf8')).durationMs ?? 0
      } catch {
        /* 元数据缺失时重算（见 set） */
      }
      return { relPath: p, urlPath: this.urlPath(key, format), format, durationMs, bytes: st.size }
    } catch {
      return null
    }
  }

  async set(key: string, format: string, audio: Buffer, durationMs: number): Promise<CacheEntry> {
    const p = this.path(key, format)
    await mkdir(join(p, '..'), { recursive: true })
    await writeFile(p, audio)
    const metaP = `${p.slice(0, -(`.${format}`.length))}.json`
    await writeFile(metaP, JSON.stringify({ durationMs, bytes: audio.length, at: Date.now() }))
    return { relPath: p, urlPath: this.urlPath(key, format), format, durationMs, bytes: audio.length }
  }

  /** 前端可直取的 URL（相对 mediaDir 的 tts 子树） */
  private urlPath(key: string, format: string): string {
    const sub = key.slice(0, 2)
    return `/api/media/tts/${sub}/${key}.${format}`
  }
}
