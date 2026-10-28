import type { PhonicsAssetDto } from '@taoread/shared'
import { API_BASE } from '../../../lib/api'

/** One source, reviewed recordings only. Every asynchronous callback belongs to an epoch. */
export class PhonicsAudio {
  private epoch = 0
  private abort = new AbortController()
  private urls = new Map<string, string>()
  private audio: HTMLAudioElement | null = null
  private settle: (() => void) | null = null
  private frame = 0

  stop(): void {
    this.epoch++
    cancelAnimationFrame(this.frame)
    if (this.audio) {
      this.audio.pause()
      this.audio.removeAttribute('src')
      this.audio.load()
      this.audio = null
    }
    this.settle?.()
    this.settle = null
  }

  dispose(): void {
    this.stop()
    this.abort.abort()
    for (const url of this.urls.values()) URL.revokeObjectURL(url)
    this.urls.clear()
  }

  async prepare(assets: PhonicsAssetDto[]): Promise<void> {
    await Promise.all(assets.filter(a => a.purpose !== 'image').map(async asset => {
      if (this.urls.has(asset.id)) return
      if (!asset.url) throw new Error('声音还没准备好，请重试')
      const response = await fetch(asset.url.startsWith('/') ? `${API_BASE}${asset.url}` : asset.url, { signal: this.abort.signal, cache: 'no-store' })
      if (!response.ok) throw new Error('声音暂时没有取到，请重试')
      const blob = await response.blob()
      if (this.abort.signal.aborted) return
      const old = this.urls.get(asset.id)
      if (old) URL.revokeObjectURL(old)
      this.urls.set(asset.id, URL.createObjectURL(blob))
    }))
  }

  async play(ids: string[], onTime?: (assetId: string, ms: number) => void, opts?: { rate?: number }): Promise<boolean> {
    this.stop()
    const epoch = this.epoch
    for (const id of ids) {
      if (epoch !== this.epoch) return false
      const url = this.urls.get(id)
      if (!url) throw new Error('声音还没准备好，请重试')
      const audio = new Audio(url)
      if (opts?.rate && opts.rate !== 1) {
        audio.playbackRate = opts.rate
        audio.preservesPitch = true
      }
      this.audio = audio
      const ended = new Promise<void>((resolve, reject) => {
        this.settle = resolve
        audio.onended = () => resolve()
        audio.onerror = () => reject(new Error('声音没有播出来，请再点一次'))
      })
      const tick = () => {
        if (epoch !== this.epoch) return
        onTime?.(id, audio.currentTime * 1000)
        this.frame = requestAnimationFrame(tick)
      }
      try {
        const starting = audio.play()
        tick()
        await Promise.all([starting, ended])
      } catch (error) {
        if (epoch !== this.epoch) return false
        this.stop()
        throw error instanceof DOMException && error.name === 'NotAllowedError' ? new Error('请点一下喇叭，让声音开始') : error
      } finally {
        cancelAnimationFrame(this.frame)
        audio.onended = null
        audio.onerror = null
        audio.pause()
      }
    }
    if (epoch !== this.epoch) return false
    this.audio = null
    this.settle = null
    return true
  }
}
