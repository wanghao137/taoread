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
    fallbackAudioUrl?: string
    durationMs: number
    chars: Array<{ char: string; start: number; end: number }>
    cached: boolean
  }) => void
  onSegmentUpdate?: (seg: { index: number; audioUrl: string; durationMs: number; chars: Array<{ char: string; start: number; end: number }> }) => void
  onError: (message: string) => void
  onDone: () => void
}

const handlerCapture: Array<StreamHandlers> = []
const streamSignals: Array<AbortSignal | undefined> = []
const streamControl: { reject: Error | null } = { reject: null }
vi.mock('../src/lib/api', () => ({
  api: {
    ttsVoices: async () => ({ voices: [], defaultSpeed: 1, available: true }),
    ttsChapterStream: (
      _contentId: string,
      _order: number,
      _body: Record<string, unknown>,
      handlers: StreamHandlers,
      options?: { signal?: AbortSignal },
    ) => {
      handlerCapture.push(handlers)
      streamSignals.push(options?.signal)
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
  emit(type: string): void { for (const fn of this.listeners.get(type) ?? []) fn() }
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
  streamSignals.length = 0
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
  it('notifies highlights when a character changes without rendering identical frames repeatedly', async () => {
    let frame: FrameRequestCallback = () => undefined
    vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => { frame = fn; return 1 })
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const listener = vi.fn(), off = audioPlayer.onProgress(listener)
    const promise = audioPlayer.speakChapter('highlight', 1, { title: '一章', bookTitle: '原创' })
    handlerCapture[0]!.onSegment({ index: 0, text: '原创', audioUrl: '/audio', durationMs: 2000, chars: [{ char: '原', start: 0, end: 1000 }, { char: '创', start: 1000, end: 2000 }], cached: true })
    expect(await promise).toBe(true)
    frame(0)
    const initial = listener.mock.calls.length
    for (let i = 0; i < 60; i++) frame(i * 10)
    expect(listener.mock.calls).toHaveLength(initial)
    FakeAudio.instances[0]!.currentTime = 1.1
    frame(1000)
    expect(listener.mock.calls).toHaveLength(initial + 1)
    expect(listener.mock.calls.at(-1)![0].charIndex).toBe(1)
    off(); audioPlayer.stop()
  })

  it('updates progressive timeline and future source without restarting current audio', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const promise = audioPlayer.speakChapter('progressive', 1, { title: '一章', bookTitle: '原创' })
    handlerCapture[0]!.onSegment({ index: 0, text: '原创', audioUrl: '/live', durationMs: 0, chars: [], cached: false })
    expect(await promise).toBe(true)
    const audio = FakeAudio.instances[0]!
    audio.currentTime = 2
    handlerCapture[0]!.onSegmentUpdate!({ index: 0, audioUrl: '/complete', durationMs: 5000, chars: [{ char: '原', start: 0, end: 2500 }] })
    expect(audio.src).toBe('/live')
    expect(audio.currentTime).toBe(2)
    expect(audioPlayer.segmentCount).toBe(1)
    expect(audioPlayer.jumpToSegment(0)).toBe(true)
    expect(audio.src).toBe('/complete')
    handlerCapture[0]!.onSegment({ index: 1, text: '后段', audioUrl: '/second', durationMs: 1000, chars: [], cached: true })
    expect(audioPlayer.segmentCount).toBe(2)
    audioPlayer.stop()
    expect(streamSignals[0]?.aborted).toBe(true)
  })

  it('keeps waiting for a new segment until SSE has finished', async () => {
    vi.useFakeTimers()
    try {
      const { audioPlayer } = await import('../src/lib/audioPlayer')
      const promise = audioPlayer.speakChapter('slow-next', 1, { title: '一章', bookTitle: '原创' })
      handlerCapture[0]!.onSegment({ index: 0, text: '首段', audioUrl: '/first', durationMs: 1, chars: [], cached: false })
      expect(await promise).toBe(true)
      FakeAudio.instances[0]!.emit('ended')
      await vi.advanceTimersByTimeAsync(2400)
      expect(audioPlayer.segmentCount).toBe(1)
      handlerCapture[0]!.onSegment({ index: 1, text: '次段', audioUrl: '/second', durationMs: 1, chars: [], cached: false })
      await vi.advanceTimersByTimeAsync(800)
      expect(FakeAudio.instances[0]!.src).toBe('/second')
      handlerCapture[0]!.onDone()
      audioPlayer.stop()
    } finally { vi.useRealTimers() }
  })

  it('正常 CDN 开播后清除等待定时器，不会中途切换来源', async () => {
    vi.useFakeTimers()
    const play = vi.spyOn(FakeAudio.prototype, 'play').mockImplementationOnce(() => new Promise<void>(resolve => { setTimeout(resolve, 800) }))
    try {
      const { audioPlayer } = await import('../src/lib/audioPlayer')
      const promise = audioPlayer.speakChapter('fast-cdn', 1, { title: '一章', bookTitle: '合成书' })
      handlerCapture[0]!.onSegment({ index: 0, text: '缓存', audioUrl: 'https://cdn.example.test/cache.mp3', fallbackAudioUrl: '/cache.mp3', durationMs: 1000, chars: [], cached: true })
      await vi.advanceTimersByTimeAsync(800)
      expect(await promise).toBe(true)
      await vi.advanceTimersByTimeAsync(3000)
      expect(FakeAudio.instances.at(-1)!.src).toBe('https://cdn.example.test/cache.mp3')
      expect(play).toHaveBeenCalledTimes(1)
      audioPlayer.stop()
    } finally { play.mockRestore(); vi.useRealTimers() }
  })

  it('CDN 网络拒绝时立即切换本地副本', async () => {
    const play = vi.spyOn(FakeAudio.prototype, 'play').mockRejectedValueOnce(new DOMException('network failed', 'NotSupportedError'))
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const promise = audioPlayer.speakChapter('broken-cdn', 1, { title: '一章', bookTitle: '合成书' })
    handlerCapture[0]!.onSegment({ index: 0, text: '缓存', audioUrl: 'https://cdn.example.test/cache.mp3', fallbackAudioUrl: '/cache.mp3', durationMs: 1000, chars: [], cached: true })
    expect(await promise).toBe(true)
    expect(FakeAudio.instances.at(-1)!.src).toBe('/cache.mp3')
    audioPlayer.stop()
    play.mockRestore()
  })
  it('CDN 一直不响应时在 1.5s 内启动已验证的本地副本，首段只结清一次', async () => {
    vi.useFakeTimers()
    const play = vi.spyOn(FakeAudio.prototype, 'play').mockImplementationOnce(() => new Promise<void>(() => undefined))
    try {
      const { audioPlayer } = await import('../src/lib/audioPlayer')
      const promise = audioPlayer.speakChapter('fallback', 1, { title: '一章', bookTitle: '合成书' })
      handlerCapture[0]!.onSegment({ index: 0, text: '缓存', audioUrl: 'https://cdn.example.test/cache.mp3', fallbackAudioUrl: '/api/media/tts-public/cache.mp3', durationMs: 1000, chars: [], cached: true })
      await vi.advanceTimersByTimeAsync(900)
      expect(FakeAudio.instances.at(-1)!.src).toBe('https://cdn.example.test/cache.mp3')
      await vi.advanceTimersByTimeAsync(600)
      expect(await promise).toBe(true)
      expect(FakeAudio.instances.at(-1)!.src).toBe('/api/media/tts-public/cache.mp3')
      expect(play).toHaveBeenCalledTimes(2)
      audioPlayer.stop()
    } finally { play.mockRestore(); vi.useRealTimers() }
  })

  it('停止旧播放后，兜底定时器不能启动旧音频或打断新音频', async () => {
    vi.useFakeTimers()
    const play = vi.spyOn(FakeAudio.prototype, 'play').mockImplementationOnce(() => new Promise<void>(() => undefined))
    try {
      const { audioPlayer } = await import('../src/lib/audioPlayer')
      const old = audioPlayer.speakChapter('old-fallback', 1, { title: '旧章', bookTitle: '合成书' })
      handlerCapture[0]!.onSegment({ index: 0, text: '旧', audioUrl: 'https://cdn.example.test/old.mp3', fallbackAudioUrl: '/old.mp3', durationMs: 1000, chars: [], cached: true })
      const next = audioPlayer.speakChapter('new-fallback', 1, { title: '新章', bookTitle: '合成书' })
      handlerCapture[1]!.onSegment({ index: 0, text: '新', audioUrl: '/new.mp3', durationMs: 1000, chars: [], cached: true })
      expect(await next).toBe(true)
      await vi.advanceTimersByTimeAsync(2500)
      expect(await old).toBe(false)
      expect(FakeAudio.instances.at(-1)!.src).toBe('/new.mp3')
      expect(play).toHaveBeenCalledTimes(2)
      audioPlayer.stop()
    } finally { play.mockRestore(); vi.useRealTimers() }
  })

  it('自动播放策略拒绝时保留队列，不能绕开手势改播本地副本', async () => {
    const play = vi.spyOn(FakeAudio.prototype, 'play').mockRejectedValueOnce(new DOMException('gesture required', 'NotAllowedError'))
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const promise = audioPlayer.speakChapter('gesture-fallback', 1, { title: '一章', bookTitle: '合成书' })
    handlerCapture[0]!.onSegment({ index: 0, text: '缓存', audioUrl: 'https://cdn.example.test/cache.mp3', fallbackAudioUrl: '/cache.mp3', durationMs: 1000, chars: [], cached: true })
    expect(await promise).toBe(false)
    expect(audioPlayer.isPaused).toBe(true)
    expect(play).toHaveBeenCalledTimes(1)
    audioPlayer.stop()
    play.mockRestore()
  })
  it('音色探测失败时仍直接请求章节缓存，首段不等待探测请求', async () => {
    const { api } = await import('../src/lib/api')
    const probe = vi.spyOn(api, 'ttsVoices').mockRejectedValueOnce(new Error('temporary network failure'))
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    expect(await audioPlayer.probe()).toBe(false)
    const promise = audioPlayer.speakChapter('cached', 1, { title: '一章', bookTitle: '合成书' })
    expect(handlerCapture).toHaveLength(1)
    handlerCapture[0]!.onSegment({ index: 0, text: '缓存', audioUrl: 'cache.mp3', durationMs: 1000, chars: [], cached: true })
    expect(await promise).toBe(true)
    expect(probe).toHaveBeenCalledTimes(1)
    audioPlayer.pause()
    expect(await audioPlayer.resumeQueue()).toBe(true)
    probe.mockRestore()
  })
  it('旧章节的迟到数据和完成事件不能混入新播放', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const first = audioPlayer.speakChapter('old', 1, { title: '旧章', bookTitle: '合成书' })
    await tick()
    const second = audioPlayer.speakChapter('new', 2, { title: '新章', bookTitle: '合成书' })
    await tick()
    const seg = { index: 0, text: '新数据', audioUrl: 'new.mp3', durationMs: 900, chars: [], cached: true }
    handlerCapture[0]!.onSegment({ ...seg, audioUrl: 'old.mp3' })
    handlerCapture[0]!.onDone()
    expect(audioPlayer.segmentCount).toBe(0)
    handlerCapture[1]!.onSegment(seg)
    expect(await second).toBe(true)
    expect(await first).toBe(false)
    expect(FakeAudio.instances.at(-1)!.src).toBe('new.mp3')
  })
  it('续播跳过此前段落，暂停恢复保留当前段的播放时间', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const progress: number[] = []
    audioPlayer.onProgress(p => progress.push(p.segmentIndex ?? p.index))
    const promise = audioPlayer.speakChapter('resume', 1, { title: '一章', bookTitle: '合成书' }, { startSegment: 2 })
    await tick()
    for (let index = 0; index <= 2; index++) handlerCapture[0]!.onSegment({ index, text: `段${index}`, audioUrl: `seg${index}.mp3`, durationMs: 900, chars: [], cached: true })
    expect(await promise).toBe(true)
    expect(audioPlayer.segmentCount).toBe(1)
    expect(progress).toContain(2)
    const audio = FakeAudio.instances.at(-1)!
    audio.currentTime = 0.4
    audioPlayer.pause()
    expect(audio.paused).toBe(true)
    audioPlayer.prime()
    expect(audio.src).toBe('seg2.mp3')
    expect(await audioPlayer.resumeQueue()).toBe(true)
    expect(audio.paused).toBe(false)
    expect(audio.currentTime).toBe(0.4)
  })
  it('静音激活的迟到承诺不会暂停已经开播的真实段', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    let finishPrime!: () => void
    const play = vi.spyOn(FakeAudio.prototype, 'play').mockImplementationOnce(function (this: FakeAudio) {
      this.paused = false
      return new Promise<void>(resolve => { finishPrime = resolve })
    })
    audioPlayer.prime()
    const promise = audioPlayer.speakChapter('fast-cache', 1, { title: '缓存章', bookTitle: '合成书' })
    await tick()
    handlerCapture[0]!.onSegment({ index: 0, text: '缓存段', audioUrl: 'real.mp3', durationMs: 900, chars: [], cached: true })
    expect(await promise).toBe(true)
    finishPrime()
    await tick()
    const audio = FakeAudio.instances.at(-1)!
    expect(audio.src).toBe('real.mp3')
    expect(audio.paused).toBe(false)
    play.mockRestore()
  })
  it('停止时挂起的play失败不能重新发出错误或暂停新播放', async () => {
    const { audioPlayer } = await import('../src/lib/audioPlayer')
    const errors: string[] = []
    audioPlayer.onError(message => errors.push(message))
    let rejectPlay!: (error: Error) => void
    const play = vi.spyOn(FakeAudio.prototype, 'play').mockImplementationOnce(() => new Promise<void>((_, reject) => { rejectPlay = reject }))
    const old = audioPlayer.speakChapter('old-play', 1, { title: '旧章', bookTitle: '合成书' })
    await tick()
    handlerCapture[0]!.onSegment({ index: 0, text: '旧段', audioUrl: 'old.mp3', durationMs: 900, chars: [], cached: true })
    const next = audioPlayer.speakChapter('new-play', 1, { title: '新章', bookTitle: '合成书' })
    await tick()
    rejectPlay(new Error('Interrupted by stop'))
    await tick()
    let settled = false
    void next.then(() => { settled = true })
    await tick()
    expect(settled).toBe(false)
    handlerCapture[1]!.onSegment({ index: 0, text: '新段', audioUrl: 'new.mp3', durationMs: 900, chars: [], cached: true })
    expect(await next).toBe(true)
    expect(await old).toBe(false)
    expect(errors).toEqual([])
    expect(audioPlayer.isPaused).toBe(false)
    expect(FakeAudio.instances.at(-1)!.src).toBe('new.mp3')
    play.mockRestore()
  })
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
