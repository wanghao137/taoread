/**
 * 公共预生成 TTS 音频索引（2026-09-25 性能方案阶段 2）。
 *
 * pregen 脚本离线合成公共书库音频 → media/tts-public/<key>.mp3 +
 * 清单 media/.tts-public-state.json（key → { durationMs, bytes, uploaded }）。
 * 命中时整章合成直接返回公共 URL（R2 域或源站公共分支）：不计家庭配额、
 * 不写 TtsMediaOwner——公共音频与公版插图同权限级别，无家庭归属。
 * uploaded 语义：配置了 R2 外发基址时必须已上传（uploaded=true）才给外链；
 * 未配置时源站文件在即可用。清单由脚本原子改写，这里按 mtime 惰性重载。
 */
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

/** 公共缓存命名空间：cacheKey 的 familyId 位。与任何真实家庭 ID 都不会碰撞。 */
export const TTS_PUBLIC_NS = '__public__'

export interface PublicSegmentInfo {
  durationMs: number
  bytes: number
  /** R2 外发是否已就绪（未上传时源站文件可直接服务） */
  uploaded: boolean
}

export interface PublicSegmentHit {
  durationMs: number
  /** true=R2 外发可用；false=源站本地文件可服务 */
  uploaded: boolean
}

export class PublicTtsIndex {
  private map = new Map<string, PublicSegmentInfo>()
  private mtimeMs = 0
  private loaded = false
  /** 本地文件存在性缓存（脚本只增不删，命中一次即可记忆） */
  private localOk = new Set<string>()
  private localBad = new Set<string>()

  constructor(private readonly mediaDir: string) {}

  manifestPath(): string {
    return join(this.mediaDir, '.tts-public-state.json')
  }

  segmentPath(key: string): string {
    return join(this.mediaDir, 'tts-public', `${key}.mp3`)
  }

  private async ensure(): Promise<void> {
    try {
      const st = await stat(this.manifestPath())
      if (this.loaded && st.mtimeMs === this.mtimeMs) return
      this.mtimeMs = st.mtimeMs
      const raw = JSON.parse(await readFile(this.manifestPath(), 'utf8')) as Record<string, PublicSegmentInfo>
      this.map = new Map(Object.entries(raw))
      this.loaded = true
    } catch {
      // 无清单 = 尚无预生成内容
      this.map = new Map()
      this.loaded = true
    }
  }

  /** 清单命中且（已上传 R2 或 本地文件在盘）才算可用；本地性只 stat 一次 */
  async get(key: string): Promise<PublicSegmentHit | null> {
    await this.ensure()
    const info = this.map.get(key)
    if (!info) return null
    if (info.uploaded) return { durationMs: info.durationMs, uploaded: true }
    if (this.localOk.has(key)) return { durationMs: info.durationMs, uploaded: false }
    if (this.localBad.has(key)) return null
    try {
      const st = await stat(this.segmentPath(key))
      if (st.isFile() && st.size > 0) {
        this.localOk.add(key)
        return { durationMs: info.durationMs || 0, uploaded: false }
      }
    } catch {
      /* 不在盘 */
    }
    this.localBad.add(key)
    return null
  }
}
