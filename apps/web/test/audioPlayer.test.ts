import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'

/**
 * 双重朗读回归（2026-09-28 用户报告）：
 * 点击朗读后服务端音频正常播完整章，按钮却一直停在「正在准备朗读…」，
 * 整章播完后 speakChapter 才经 finish() 以 false 结清 → 调用方回退
 * Web Speech → 机械音把整章再读一遍。
 * 根因：onSegment 里首段结清被 `if (!gotSegment)` 死守卫拦住
 * （gotSegment 在同一同步块里已置 true），承诺只能等 finish() 兜底。
 * 契约：首段音频开播即 resolve(true)，零段/失败才 resolve(false)。
 */

interface StreamHandlers {
  onSegment: (seg: {
    index: number
    text: string
    audioUrl: string
    durationMs: number
    chars: Array<{ char: string; start: number; end: number }>
    cached: boolean
  }) => void
  onError: (message: string) => void
  onDone: () => void
}

const handlerCapture: Array<StreamHandlers> = []
const streamControl: { reject: Error | null } = { reject: null }
vi.mock('../src/lib/api', () => ({
  api: {
    ttsVoices: async () => ({ voices: [], defaultSpeed: 1, available: true }),
    ttsChapterStream: (
      _contentId: string,
      _order: number,
      _body: Record<string, unknown>,
      handlers: StreamHandlers,
    ) => {
      handlerCapture.push(handlers)
      if (streamControl.reject) return Promise.reject(streamControl.reject)
      // 真 SSE 在整章推送期间保持打开：这里用永不 resolve 的流模拟长连接
      return new Promise<void>(() => undefined)
    },
  },
}))

class FakeAudio {
  static instances: FakeAudio[] = []
  src = ''
  paused = true
  ended = false
  currentTime = 0
  playbackRate = 1
  preload = ''
  private listeners = new Map<string, Array<() => void>>()
  constructor() {
    FakeAudio.instances.push(this)
  }
  addEventListener(type: string, fn: () => void): void {
    const list = this.listeners.get(type) ?? []
    list.push(fn)
    this.listeners.set(type, list)
  }
  removeEventListener(): void {}
  play(): Promise<void> {
    this.paused = false
    return Promise.resolve()
  }
  pause(): void {
    this.paused = true
  }
  load(): void {}
  removeAttribute(name: string): void {
    if (name === 'src') this.src = ''
  }
}

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0))

afterEach(() => {
  vi.resetModules()
  handlerCapture.length = 0
  streamControl.reject = null
  FakeAudio.instances = []
  vi.unstubAllGlobals()
})

beforeEach(() => {
  FakeAudio.instances = []
  vi.stubGlobal('Audio', FakeAudio)
  vi.stubGlobal('requestAnimationFrame', () => 0)
  vi.stubGlobal('cancelAnimationFrame', () => {})
})

describe('speakChapter 首段结清（双重朗读回归）', () => {
  it('首段开播即 resolve(true)，不等整章合成完', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const promise = audioPlayer.speakChapter('book-1', 1, { title: '第一章', bookTitle: '测试书' }, { lang: 'zh' })
    await tick()
    const handlers = handlerCapture[0]
    expect(handlers).toBeTruthy()
    handlers!.onSegment({ index: 0, text: '第一段。', audioUrl: 'seg-0.mp3', durationMs: 900, chars: [], cached: false })
    await tick()
    const verdict = await Promise.race([promise.then(() => 'settled' as const), tick().then(() => 'pending' as const)])
    expect(verdict).toBe('settled')
    expect(await promise).toBe(true)
    expect(FakeAudio.instances[0]?.src).toBe('seg-0.mp3')
    audioPlayer.stop()
  })

  it('整章零段（纯图章/全段被拦）仍 resolve(false)，调用方合法回退', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const promise = audioPlayer.speakChapter('book-1', 2, { title: '第二章', bookTitle: '测试书' }, { lang: 'zh' })
    await tick()
    handlerCapture[0]!.onDone()
    expect(await promise).toBe(false)
    // P0 回归锁：零段结清必须复位播放状态——否则 toggleSpeak 的
    // 「服务端在播/等恢复则不回退」守卫会误杀 Web Speech 兜底（配额/纯图章场景变哑）
    expect(audioPlayer.isPlaying).toBe(false)
    expect(audioPlayer.isPaused).toBe(false)
  })

  it('SSE 直接失败（503/网络错）resolve(false) 且播放状态复位，回退通道畅通', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    streamControl.reject = new Error('TTS_UNAVAILABLE')
    const promise = audioPlayer.speakChapter('book-1', 4, { title: '第四章', bookTitle: '测试书' }, { lang: 'zh' })
    expect(await promise).toBe(false)
    expect(audioPlayer.isPlaying).toBe(false)
    expect(audioPlayer.isPaused).toBe(false)
  })

  it('准备期 stop()（停止/离开页面）立即结清为 false，不悬挂', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const promise = audioPlayer.speakChapter('book-1', 3, { title: '第三章', bookTitle: '测试书' }, { lang: 'zh' })
    await tick()
    audioPlayer.stop()
    const verdict = await Promise.race([promise.then(() => 'settled' as const), tick().then(() => 'pending' as const)])
    expect(verdict).toBe('settled')
    expect(await promise).toBe(false)
  })
})
