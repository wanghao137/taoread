/**
 * 服务端朗读播放器（docs/13 P0-C）。
 *
 * 优先用 stepaudio 服务端合成（拟人化、音色可选），浏览器 Web Speech 兜底。
 * 两条路径共用同一套外部接口（speak/stop/onProgress），ReaderScreen 无需感知差异。
 *
 * 关键能力：
 *  - HTML5 Audio 播放服务端返回的 mp3 段，段内按时间轴做字级高亮
 *  - MediaSession：锁屏/控制中心显示曲目信息与播放控制
 *  - 缓存优先：同文本同音色命中服务端缓存，秒回
 *  - 短文本走 preview 接口；整章走 SSE 流式接口逐段播放
 */
import { api } from './api'
import { sanitizeForSpeech } from './tts'

export interface AudioSegment {
  index: number
  text: string
  audioUrl: string
  durationMs: number
  /** 字级时间轴：每项 {char, startMs, endMs} */
  chars: Array<{ char: string; start: number; end: number }>
  cached: boolean
}

export interface VoiceOption {
  id: string
  label: string
  lang: string
  description: string
}

export interface AudioProgress {
  /** 当前段在队列中的下标 */
  index: number
  total: number
  /** 当前段文本 */
  text: string
  /** 段内高亮到的字符下标（-1 = 未开始） */
  charIndex: number
}

type ProgressListener = (p: AudioProgress) => void
type EndListener = () => void
type ErrorListener = (message: string) => void

export interface PlayerOptions {
  voiceId?: string
  speed?: number
  lang?: 'zh' | 'en'
}

class ServerAudioPlayer {
  /** 服务端 TTS 是否可用；null=尚未探测 */
  private available: boolean | null = null
  private voices: VoiceOption[] = []

  private audio: HTMLAudioElement | null = null
  private queue: AudioSegment[] = []
  /** 已静默重试过的段（index:url）——每段只自动重试一次 */
  private retriedKeys = new Set<string>()
  /** 播放会话代号：stop() 递增，旧重试定时器据此自我作废（P1-3） */
  private session = 0
  private retryTimer: number | null = null
  private currentIndex = 0
  private playing = false
  /** 被自动播放策略拦截时置 true：队列保留，等用户手势恢复 */
  private paused = false
  private cancelled = false
  private rafId: number | null = null

  private progressListeners = new Set<ProgressListener>()
  private endListeners = new Set<EndListener>()
  private errorListeners = new Set<ErrorListener>()

  /** 探测服务端 TTS 可用性 + 拉取音色列表（页面进入时调一次） */
  async probe(): Promise<boolean> {
    try {
      const res = await api.ttsVoices()
      this.available = res.available
      this.voices = res.voices
    } catch {
      this.available = false
      this.voices = []
    }
    return this.available === true
  }

  get isAvailable(): boolean {
    return this.available === true
  }

  get voiceList(): VoiceOption[] {
    return this.voices
  }

  get isPlaying(): boolean {
    return this.playing && !this.cancelled
  }

  onProgress(fn: ProgressListener): () => void {
    this.progressListeners.add(fn)
    return () => this.progressListeners.delete(fn)
  }
  onEnd(fn: EndListener): () => void {
    this.endListeners.add(fn)
    return () => this.endListeners.delete(fn)
  }
  onError(fn: ErrorListener): () => void {
    this.errorListeners.add(fn)
    return () => this.errorListeners.delete(fn)
  }

  /**
   * 朗读一段文本（短文本直接 preview 接口）。
   * 返回是否由服务端引擎接管；false 表示调用方应回退 Web Speech。
   */
  async speak(text: string, options: PlayerOptions = {}): Promise<boolean> {
    if (this.available === null) await this.probe()
    if (!this.available) return false

    this.stop()
    const clean = sanitizeForSpeech(text).trim()
    if (clean.length === 0) return false

    try {
      const seg = await api.ttsPreview({
        text: clean,
        ...(options.voiceId ? { voiceId: options.voiceId } : {}),
        ...(options.speed !== undefined ? { speed: options.speed } : {}),
        lang: options.lang ?? 'zh',
      })
      this.queue = [
        {
          index: 0,
          text: clean,
          audioUrl: seg.audioUrl,
          durationMs: seg.durationMs,
          chars: seg.chars,
          cached: seg.cached,
        },
      ]
      this.currentIndex = 0
      this.playing = true
      this.cancelled = false
      this.emitProgress(-1)
      await this.playSegment(0)
      return true
    } catch {
      this.emitError('朗读暂时开小差了，请稍后再试')
      return false
    }
  }

  /**
   * 朗读整章：SSE 流式逐段合成，收到一段播一段（边合成边播，不等全章）。
   */
  async speakChapter(
    contentId: string,
    chapterOrder: number,
    meta: { title: string; bookTitle: string },
    options: PlayerOptions = {},
  ): Promise<boolean> {
    if (this.available === null) await this.probe()
    if (!this.available) return false

    this.stop()
    this.queue = []
    this.currentIndex = 0
    this.playing = true
    this.cancelled = false

    // 锁屏控制中心：显示正在读的书与章节
    this.setMediaSession(meta.bookTitle, meta.title)

    try {
      await api.ttsChapterStream(
        contentId,
        chapterOrder,
        {
          ...(options.voiceId ? { voiceId: options.voiceId } : {}),
          ...(options.speed !== undefined ? { speed: options.speed } : {}),
          lang: options.lang ?? 'zh',
        },
        {
          onSegment: (seg) => {
            if (this.cancelled) return
            this.queue.push(seg)
            // 第一段到了立刻开播；后续段在 onEnded 里自动衔接
            if (this.queue.length === 1) {
              this.currentIndex = 0
              this.emitProgress(-1)
              void this.playSegment(0)
            }
          },
          onError: (msg) => {
            // 单段失败不中断整章：跳过继续（服务端已给出友好文案）
            this.emitError(msg)
          },
          onDone: () => {
            /* 队列已在 onSegment 补齐；播完自然结束 */
          },
        },
      )
      return true
    } catch {
      this.emitError('整章朗读没准备好，可以一段一段听')
      return false
    }
  }

  private async playSegment(index: number): Promise<void> {
    if (this.cancelled) return
    const seg = this.queue[index]
    if (!seg) {
      this.finish()
      return
    }
    if (typeof globalThis.Audio === 'undefined') {
      this.emitError('当前浏览器不支持音频播放')
      return
    }
    if (!this.audio) {
      this.audio = new Audio()
      this.audio.preload = 'auto'
      this.audio.addEventListener('ended', () => {
        if (this.cancelled) return
        const next = this.currentIndex + 1
        if (next < this.queue.length) {
          this.currentIndex = next
          this.emitProgress(-1)
          void this.playSegment(next)
        } else if (this.queue.length > 0) {
          // 队列还有可能正在流式补齐；短暂等待新段
          this.waitForNext(index)
        } else {
          this.finish()
        }
      })
      this.audio.addEventListener('error', () => {
        if (this.cancelled) return
        // 网络抖动/边缘瞬断：同一段先静默重拉一次，仍失败才提示。
        // 定时器绑定当前会话代号：stop()/新一轮播放会使其自动作废（P1-3 竞态）。
        const sess = this.session
        const retryKey = `${index}:${this.queue[index]?.audioUrl ?? ''}`
        if (this.retriedKeys && !this.retriedKeys.has(retryKey)) {
          this.retriedKeys.add(retryKey)
          const src = this.queue[index]?.audioUrl
          if (src) {
            this.retryTimer = window.setTimeout(() => {
              if (this.cancelled || this.session !== sess) return
              this.audio!.src = ''
              this.audio!.src = src
              this.audio!.load()
              void this.audio!.play().catch(() => undefined)
            }, 1200)
            return
          }
        }
        this.emitError('音频加载失败，请稍后再试')
      })
    }
    this.audio.src = seg.audioUrl
    this.audio.playbackRate = 1
    try {
      await this.audio.play()
    } catch (err) {
      // 自动播放策略拦截（iOS 尤其严格：ended 触发的连续 play() 不算用户手势链，
      // 下一段自动开播会被拒——research/iter4-report-audio-player SO 73152620）。
      // 队列保留，标记为「暂停」而非「结束」：用户再点一下播放按钮即可从当前段继续。
      this.playing = false
      this.paused = true
      this.stopTimelineLoop()
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        this.emitError('接着听请再点一下播放按钮')
      } else {
        this.emitError('音频加载失败，请稍后再试')
      }
      return
    }
    this.paused = false
    this.startTimelineLoop(seg)
  }

  /**
   * 用户手势恢复：从队列当前段继续播放（自动播放被拦截后由此恢复）。
   * 必须在点击事件回调里调用，才能进入用户手势链。
   */
  async resumeQueue(): Promise<boolean> {
    if (!this.available || this.queue.length === 0) return false
    if (this.playing) return true
    this.cancelled = false
    this.playing = true
    this.paused = false
    await this.playSegment(this.currentIndex)
    return this.playing
  }

  /** 段还在流式合成时，等 0.8s 再看有没有下一段 */
  private waitForNext(fromIndex: number): void {
    if (this.cancelled) return
    globalThis.setTimeout(() => {
      if (this.cancelled) return
      const next = this.queue[fromIndex + 1]
      if (next) {
        this.currentIndex = fromIndex + 1
        this.emitProgress(-1)
        void this.playSegment(fromIndex + 1)
      } else {
        this.finish()
      }
    }, 800)
  }

  /** requestAnimationFrame 驱动字级高亮（比 timeupdate 事件更平滑） */
  private startTimelineLoop(seg: AudioSegment): void {
    this.stopTimelineLoop()
    const tick = () => {
      if (this.cancelled || !this.audio) return
      const t = this.audio.currentTime * 1000
      // 二分找当前字符；时间轴单调递增
      let lo = 0
      let hi = seg.chars.length - 1
      let idx = -1
      while (lo <= hi) {
        const mid = (lo + hi) >> 1
        const c = seg.chars[mid]
        if (!c) break
        if (t < c.start) hi = mid - 1
        else if (t >= c.end) {
          idx = mid
          lo = mid + 1
        } else {
          idx = mid
          break
        }
      }
      this.emitProgress(idx)
      if (!this.audio.ended) this.rafId = globalThis.requestAnimationFrame(tick)
    }
    this.rafId = globalThis.requestAnimationFrame(tick)
  }

  private stopTimelineLoop(): void {
    if (this.rafId !== null) {
      globalThis.cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  private emitProgress(charIndex: number): void {
    const seg = this.queue[this.currentIndex]
    this.progressListeners.forEach((fn) =>
      fn({
        index: this.currentIndex,
        total: this.queue.length,
        text: seg?.text ?? '',
        charIndex,
      }),
    )
  }

  private emitError(message: string): void {
    this.errorListeners.forEach((fn) => fn(message))
  }

  private finish(): void {
    this.stopTimelineLoop()
    this.playing = false
    this.queue = []
    this.currentIndex = 0
    this.endListeners.forEach((fn) => fn())
  }

  /** 停止（不触发 onEnd） */
  stop(): void {
    // 对抗审查 P1-3：作废当前会话——未触发的重试定时器全部失效，防旧定时器劫持新队列
    this.session += 1
    if (this.retryTimer !== null) {
      window.clearTimeout(this.retryTimer)
      this.retryTimer = null
    }
    this.retriedKeys.clear()
    this.cancelled = true
    this.stopTimelineLoop()
    if (this.audio) {
      this.audio.pause()
      this.audio.src = ''
    }
    this.playing = false
    this.queue = []
    this.currentIndex = 0
  }

  pause(): void {
    if (this.audio && this.playing) {
      this.audio.pause()
      this.stopTimelineLoop()
    }
  }

  resume(): void {
    if (this.audio && this.playing) {
      void this.audio.play()
      const seg = this.queue[this.currentIndex]
      if (seg) this.startTimelineLoop(seg)
    }
  }

  /**
   * 哄睡渐弱停止（docs/13 P0-C / research/iter4-report-audio-player §Tonies）：
   * 6 秒内音量从当前值平滑降到 0 再停止，没有突然的安静。
   * 用户在入睡边缘时，硬切会惊醒；渐弱是这一品类的既定范式。
   */
  fadeOutAndStop(durationMs = 6000): void {
    if (!this.audio || !this.playing) {
      this.stop()
      return
    }
    const audio = this.audio
    const from = audio.volume > 0 ? audio.volume : 1
    const steps = 12
    const stepMs = durationMs / steps
    let i = 0
    const timer = globalThis.setInterval(() => {
      i += 1
      if (i >= steps || !this.playing) {
        globalThis.clearInterval(timer)
        audio.volume = from
        this.stop()
        return
      }
      audio.volume = Math.max(0, from * (1 - i / steps))
    }, stepMs)
  }

  /** 锁屏媒体控制（MediaSession API；不支持时静默跳过） */
  private setMediaSession(bookTitle: string, chapterTitle: string): void {
    if (typeof globalThis.navigator === 'undefined' || !('mediaSession' in navigator)) return
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: chapterTitle,
        artist: bookTitle,
        album: '桃阅读',
      })
      navigator.mediaSession.setActionHandler('play', () => this.resume())
      navigator.mediaSession.setActionHandler('pause', () => this.pause())
      navigator.mediaSession.setActionHandler('stop', () => this.stop())
    } catch {
      /* 部分浏览器 setActionHandler 抛异常，忽略 */
    }
  }
}

/** 全局单例：与服务端 TTS 状态同步，同 Web Speech 引擎互斥 */
export const audioPlayer = new ServerAudioPlayer()
