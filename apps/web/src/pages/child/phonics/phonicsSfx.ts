/**
 * 课堂界面音效：对/再试/完成/翻步的短反馈音（docs/90）。
 *
 * 与教学音频分通道：教学音频走 PhonicsAudio 单音源，音效是独立短 Audio，
 * 不进入课堂的「一次只有一个声源」约束，也不进课程发布门槛。
 * 开关尊重两个来源：家长的安静模式（calmMode，无显式偏好时默认关）、
 * 课堂里的喇叭按钮（显式偏好，存本设备）。默认（无偏好、非安静模式）开启。
 */

export type SfxKind = 'tap' | 'correct' | 'try' | 'finish'

const PREF_KEY = 'taoread-phonics-sfx'
const VOLUME = 0.45
const cache = new Map<SfxKind, string>()
let calmMode = false
let preference: boolean | null = null
let current: HTMLAudioElement | null = null
const listeners = new Set<() => void>()

const urlOf = (kind: SfxKind) => `${import.meta.env.BASE_URL}phonics/sfx/${kind}.wav`

function readPreference(): boolean | null {
  try {
    const value = localStorage.getItem(PREF_KEY)
    return value === 'on' ? true : value === 'off' ? false : null
  } catch { return null }
}

function writePreference(value: boolean | null) {
  try {
    if (value === null) localStorage.removeItem(PREF_KEY)
    else localStorage.setItem(PREF_KEY, value ? 'on' : 'off')
  } catch { /* 本设备记不住就只用本次会话 */ }
}

const emit = () => listeners.forEach(l => l())

export const phonicsSfx = {
  init() {
    preference = readPreference()
    emit()
  },
  setCalmMode(value: boolean) {
    if (calmMode !== value) {
      calmMode = value
      emit()
    }
  },
  get enabled() {
    return preference ?? !calmMode
  },
  /** 显式偏好；null 回到跟随安静模式的默认 */
  setPreference(value: boolean | null) {
    preference = value
    writePreference(value)
    if (value === false && current) {
      current.pause()
      current = null
    }
    emit()
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  play(kind: SfxKind) {
    if (!this.enabled) return
    try {
      // 短反馈音允许打断上一条：每次新建实例，失败静默（音效从不出错误浮层）
      current?.pause()
      const audio = new Audio(cache.get(kind) ?? urlOf(kind))
      cache.set(kind, audio.src)
      audio.volume = VOLUME
      current = audio
      void audio.play().catch(() => undefined)
    } catch { /* 音效永不打扰课堂 */ }
  },
}
