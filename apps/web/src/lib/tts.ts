/**
 * TTS 朗读引擎（v2）。
 *
 * 设计要点（需求：语音拟人化，不能像机器人）：
 *  1. 语音选择：优先浏览器自带的在线神经网络语音（Chrome/Edge 的 "Google 普通话（中国大陆）"
 *     /Edge 的 "Microsoft 晓晓 Xiaoxiao" 等），这些是云端神经语音，音质远超本地合成。
 *     降级链：在线神经 → 本地高质量 → 任意可用。
 *  2. 语速与音高：中文默认 rate 0.92（比正常略慢，适合孩子跟读），英文 0.95；
 *     pitch 1.05 让童声更明亮。
 *  3. 分句播放：长文本按标点切成短句依次入队，句间自然停顿（神经语音自带语调起伏），
 *     避免一次性长文本被截断或语调平淡。
 *  4. 卡拉OK高亮：边界事件回调当前句，阅读器同步高亮。
 *  5. 全局单例：同一时刻只允许一段朗读，新朗读先取消旧的。
 */

export interface TtsVoiceInfo {
  voiceURI: string
  name: string
  lang: string
  /** 神经/在线语音标记（用于 UI 展示「自然语音」徽标） */
  neural: boolean
  /** 引擎质量排序分：越高越优先 */
  score: number
}

export interface TtsProgress {
  /** 当前句在队列中的下标 */
  index: number
  /** 总句数 */
  total: number
  /** 当前句文本 */
  text: string
}

export interface TtsOptions {
  voiceURI?: string
  rate?: number
  pitch?: number
}

/** 神经语音名特征（命中即视为在线神经语音） */
const NEURAL_PATTERNS = [
  /google/i,
  /microsoft/i,
  /xiaoxiao|晓晓|yunxi|云希|yunyang|云扬|xiaoyi|晓伊/i,
  /natural|neural|online/i,
  /siri/i,
]

/** 中文语音名特征 */
const ZH_PATTERNS = [/zh(-|_)?cn/i, /cmn/i, /普通话|中文/i]

/** 英文语音名特征 */
const EN_PATTERNS = [/en(-|_)?us/i, /eng/i, /english/i]

function isNeural(name: string, voiceURI: string): boolean {
  return NEURAL_PATTERNS.some((re) => re.test(name) || re.test(voiceURI))
}

/**
 * 语音打分：为指定语言挑出最自然的语音。
 * 在线神经（+100）> 本地高质量（+40）> 任意匹配语言（+10）。
 */
function scoreVoice(voice: SpeechSynthesisVoice, lang: string): number {
  let score = 0
  const neural = isNeural(voice.name, voice.voiceURI)
  if (neural) score += 100
  if (lang === 'zh') {
    if (ZH_PATTERNS.some((re) => re.test(voice.lang) || re.test(voice.name))) score += 50
  } else {
    if (EN_PATTERNS.some((re) => re.test(voice.lang) || re.test(voice.name))) score += 50
  }
  // 本地合成语音降权（name 里通常带 local/standard 字样）
  if (/local|standard|default/i.test(voice.name)) score -= 20
  return score
}

export function listVoices(lang: string): TtsVoiceInfo[] {
  if (typeof speechSynthesis === 'undefined') return []
  const voices = speechSynthesis.getVoices()
  return voices
    .map((v) => {
      const neural = isNeural(v.name, v.voiceURI)
      return {
        voiceURI: v.voiceURI,
        name: v.name,
        lang: v.lang,
        neural,
        score: scoreVoice(v, lang),
      }
    })
    .sort((a, b) => b.score - a.score)
}

/** 挑默认语音：分数最高的；都没有时返回 undefined（朗读降级为不可用） */
export function pickVoice(lang: string, preferred?: string | null): TtsVoiceInfo | null {
  const voices = listVoices(lang)
  if (voices.length === 0) return null
  if (preferred) {
    const hit = voices.find((v) => v.voiceURI === preferred || v.name === preferred)
    if (hit) return hit
  }
  return voices[0] ?? null
}

/**
 * 文本分句：按中文标点（。！？；）与英文句点/问号/感叹号切分，保留标点。
 * 诗歌/儿歌的换行先切成行再逐行处理（唐诗块用 \n 排版，折叠成空格会连读）。
 * 超长无标点串（如拼音行）按词数兜底切分，避免一句话念不完。
 */
export function splitSentences(text: string, maxLen = 40): string[] {
  // 先按换行切段（保留诗歌节奏），段内空白再折叠
  const lines = text.split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter((l) => l.length > 0)
  const parts: string[] = []
  for (const line of lines) {
    // 命中标点即切（标点留在当前句末）；含 ASCII 句点（docs/09 C5：原正则漏了 .，英文不切分）
    let buf = ''
    for (const ch of line) {
      buf += ch
      if (/[。！？!?；;.]/.test(ch)) {
        parts.push(buf.trim())
        buf = ''
      }
      // 超长无标点：在逗号或空格处兜底切
      else if (buf.length >= maxLen) {
        const cutAt = Math.max(buf.lastIndexOf('，'), buf.lastIndexOf(' '), buf.lastIndexOf('、'))
        if (cutAt > 8) {
          parts.push(buf.slice(0, cutAt + 1).trim())
          buf = buf.slice(cutAt + 1)
        } else {
          parts.push(buf.trim())
          buf = ''
        }
      }
    }
    if (buf.trim()) parts.push(buf.trim())
  }
  return parts.filter((p) => p.length > 0)
}

type Listener = (progress: TtsProgress) => void
type EndListener = () => void
type ErrorListener = (message: string) => void

class TtsEngine {
  private synth: SpeechSynthesis | null = null
  private queue: string[] = []
  private currentIndex = 0
  private lang = 'zh'
  private voiceURI: string | null = null
  private rate = 0.92
  private pitch = 1.05
  private speaking = false
  private cancelled = false
  private progressListeners = new Set<Listener>()
  private endListeners = new Set<EndListener>()
  private errorListeners = new Set<ErrorListener>()

  constructor() {
    if (typeof speechSynthesis !== 'undefined') {
      this.synth = speechSynthesis
      // 语音列表异步加载（Chrome 首次为空，onvoiceschanged 后才有）
      this.synth.onvoiceschanged = () => {
        /* 列表已就绪，下次 pickVoice 即可拿到 */
      }
    }
  }

  get isSupported(): boolean {
    return this.synth !== null
  }

  get isSpeaking(): boolean {
    return this.speaking && !this.cancelled
  }

  onProgress(fn: Listener): () => void {
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

  /** 配置语音/语速/音高（朗读中修改对下一句生效） */
  configure(options: TtsOptions & { lang?: string }): void {
    if (options.lang) this.lang = options.lang
    if (options.voiceURI) this.voiceURI = options.voiceURI
    if (typeof options.rate === 'number') this.rate = options.rate
    if (typeof options.pitch === 'number') this.pitch = options.pitch
  }

  get config() {
    return { lang: this.lang, voiceURI: this.voiceURI, rate: this.rate, pitch: this.pitch }
  }

  /**
   * 开始朗读。全局单例：先 stop 再开始。
   * @returns 是否成功开始（无语音或不可用时返回 false，调用方应给 UI 降级提示）
   */
  speak(text: string, options: TtsOptions & { lang?: string } = {}): boolean {
    if (!this.synth) return false
    this.stop()
    this.configure(options)
    const sentences = splitSentences(text, this.lang === 'zh' ? 40 : 60)
    if (sentences.length === 0) return false

    // 无可用语音时直接告退，不留半秒空转
    if (this.voiceURI === null) {
      const picked = pickVoice(this.lang)
      if (!picked) {
        this.emitError('当前浏览器没有可用的语音包，试试用 Chrome 或 Edge 打开哦')
        return false
      }
      this.voiceURI = picked.voiceURI
    }

    this.queue = sentences
    this.currentIndex = 0
    this.speaking = true
    this.cancelled = false
    this.emitProgress()
    this.speakCurrent()
    return true
  }

  private speakCurrent(): void {
    if (!this.synth || this.cancelled) return
    const sentence = this.queue[this.currentIndex]
    if (sentence === undefined) {
      this.finish()
      return
    }
    const utter = new SpeechSynthesisUtterance(sentence)
    utter.lang = this.lang === 'zh' ? 'zh-CN' : 'en-US'
    utter.rate = this.rate
    utter.pitch = this.pitch
    utter.volume = 1
    const voices = this.synth.getVoices()
    const voice = voices.find((v) => v.voiceURI === this.voiceURI || v.name === this.voiceURI)
    if (voice) utter.voice = voice

    utter.onboundary = (event: SpeechSynthesisEvent) => {
      // 句内边界：推进高亮位置（阅读器按字符偏移细化）
      if (this.cancelled) return
      this.progressListeners.forEach((fn) =>
        fn({
          index: this.currentIndex,
          total: this.queue.length,
          text: this.queue[this.currentIndex] ?? '',
          ...(typeof event.charIndex === 'number' ? { charIndex: event.charIndex } : {}),
        }),
      )
    }
    utter.onend = () => {
      if (this.cancelled) return
      this.currentIndex += 1
      if (this.currentIndex >= this.queue.length) {
        this.finish()
        return
      }
      this.emitProgress()
      // 句间微停顿：让标点处的语气有呼吸感
      setTimeout(() => this.speakCurrent(), 90)
    }
    utter.onerror = (event: SpeechSynthesisErrorEvent) => {
      if (this.cancelled) return
      // interrupted/canceled 是主动停止的正常结果，不上报
      if (event.error === 'interrupted' || event.error === 'canceled') return
      this.emitError('朗读开小差了，请稍后再试')
      this.reset()
    }
    this.synth.speak(utter)
  }

  private finish(): void {
    this.reset()
    this.endListeners.forEach((fn) => fn())
  }

  private reset(): void {
    this.speaking = false
    this.queue = []
    this.currentIndex = 0
  }

  private emitProgress(): void {
    this.progressListeners.forEach((fn) =>
      fn({
        index: this.currentIndex,
        total: this.queue.length,
        text: this.queue[this.currentIndex] ?? '',
      }),
    )
  }

  private emitError(message: string): void {
    this.errorListeners.forEach((fn) => fn(message))
  }

  /** 停止当前朗读（不触发 onEnd，只静默复位） */
  stop(): void {
    if (this.synth) this.synth.cancel()
    this.cancelled = true
    this.reset()
  }

  /** 暂停（可 resume 继续） */
  pause(): void {
    if (this.synth && this.speaking) this.synth.pause()
  }
  resume(): void {
    if (this.synth && this.speaking) this.synth.resume()
  }
}

/** 全局单例：保证同一时刻只有一段朗读 */
export const tts = new TtsEngine()
