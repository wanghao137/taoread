/**
 * 音色预设（docs/13 P0-B）。
 *
 * stepaudio-3-gen 用自然语言描述音色而非枚举，这里把「拟人化」需求落成可复用描述词。
 * 每条 description 控制 ≤120 字（API instruction 上限 500 字，留余量给全局风格句）。
 * 描述词原则：只描述声音特质，不指定具体人名/品牌，避免合规风险。
 */
export interface VoicePreset {
  id: string
  label: string
  /** 适合的语言：zh / en / both */
  lang: 'zh' | 'en' | 'both'
  description: string
  /** 朗读儿童内容的全局风格句（拼到 instruction） */
  instruction: string
}

export const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'mom-warm',
    label: '温柔妈妈',
    lang: 'both',
    description:
      '青年女性，音色温柔柔和，语速偏慢，像在床头轻声给孩子讲故事，带一点笑意和耐心',
    instruction: '用讲睡前故事的语气，句子之间有自然停顿，语气温暖包容',
  },
  {
    id: 'child-lively',
    label: '活泼童声',
    lang: 'both',
    description: '六到八岁小女孩的童声，音调明亮清脆，活泼自然，带好奇心和情绪起伏',
    instruction: '像小朋友自己讲故事一样，情绪跟着内容变化，句子短而清晰',
  },
  {
    id: 'dad-calm',
    label: '沉稳爸爸',
    lang: 'both',
    description: '青年男性，音色低沉温和，语速平稳，像爸爸在睡前从容地讲故事',
    instruction: '语气沉稳安心，节奏不疾不徐，让孩子慢慢放松下来',
  },
  {
    id: 'grandpa-story',
    label: '故事爷爷',
    lang: 'zh',
    description: '老年男性，声音慈祥浑厚，带着讲了一辈子故事的味道，语速慢而有韵味',
    instruction: '像老爷爷摇着蒲扇讲故事，长句拖一点韵味，关键词加重',
  },
  {
    id: 'sister-bright',
    label: '开朗姐姐',
    lang: 'both',
    description: '青年女性，声音明亮清透，像幼儿园老师早晨问好，带着笑意和活力，吐字干净',
    instruction: '像亲切的姐姐带小朋友读书，重点字词稍微夸张一点，保持欢快',
  },
  {
    id: 'brother-sunshine',
    label: '阳光哥哥',
    lang: 'both',
    description: '青年男性，声音干净爽朗不低沉，像户外活动老师，语速轻快有节奏感',
    instruction: '像大哥哥讲冒险故事，节奏轻快，遇到动作描写稍微加快',
  },
  {
    id: 'grandma-kind',
    label: '慈祥奶奶',
    lang: 'zh',
    description: '老年女性，声音温柔沙软，语速很慢，像奶奶在灯下慢慢摇着蒲扇哄睡觉',
    instruction: '极慢极柔，像哄入睡，每句结尾轻轻落下，没有大起伏',
  },
  {
    id: 'teacher-clear',
    label: '朗诵老师',
    lang: 'zh',
    description: '青年女性，播音科班出身，字正腔圆，吐字清晰有力，适合古诗朗诵',
    instruction: '按朗诵腔处理：韵脚拖长，句读分明，庄重但不生硬',
  },
  {
    id: 'en-storyteller',
    label: 'English Storyteller',
    lang: 'en',
    description: 'Adult female native English speaker, warm and expressive storytelling voice, clear diction, gentle steady rhythm',
    instruction: 'Read as a bedtime story for a young child: steady pace, stress on content words, warm tone',
  },
  {
    id: 'en-kid',
    label: 'English Kid',
    lang: 'en',
    description: 'Seven-year-old child voice, bright and curious, slightly higher pitch, natural pauses between short sentences',
    instruction: 'Sound like a child reading aloud to a friend: short phrases, playful, rising intonation on questions',
  },
]

export const DEFAULT_VOICE_ID = 'mom-warm'

export function findVoice(id: string | null | undefined): VoicePreset {
  return VOICE_PRESETS.find((v) => v.id === id) ?? VOICE_PRESETS[0] ?? VOICE_FALLBACK
}

const VOICE_FALLBACK: VoicePreset = {
  id: 'mom-warm',
  label: '温柔妈妈',
  lang: 'both',
  description: '青年女性，音色温柔柔和，语速偏慢，像在床头轻声给孩子讲故事',
  instruction: '用讲睡前故事的语气，句子之间有自然停顿，语气温暖包容',
}

/**
 * 语速档位（与前端 RD-5 档位对齐，docs/11 P0-2）。
 * stepaudio speed 范围 0.5-2，中文童声 0.92 是上轮 Web Speech 的默认值，保持一致。
 */
export const SPEED_STEPS: Array<{ label: string; value: number }> = [
  { label: '慢一点', value: 0.8 },
  { label: '刚好', value: 0.92 },
  { label: '稍快', value: 1.1 },
  { label: '快一点', value: 1.25 },
]

export const DEFAULT_SPEED = 0.92

export function clampSpeed(n: number | null | undefined): number {
  if (typeof n !== 'number' || !Number.isFinite(n)) return DEFAULT_SPEED
  return Math.min(2, Math.max(0.5, n))
}
