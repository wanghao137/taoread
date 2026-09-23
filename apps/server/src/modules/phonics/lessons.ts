/**
 * 英语自然拼读 · 首批 8 课草稿（内测）。
 *
 * 依据：docs/audit-2026-09-22/02-英语自然拼读方案.md 第 5 节草案 + 英国 Letters and
 * Sounds Phase 2 字素顺序（Set 1: s,a,t,p；Set 2: i,n,m,d）。口音锁定 GB（英式音标）。
 *
 * 内容门槛（发布前必须满足，当前均未满足）：
 *  - 每课每词只使用「截至该课已教 GPC」拼写（test/phonicsContent.test.ts 机器校验）
 *  - 纯音素音频未制作：audioAvailable=false，不提供字母名朗读冒充音素（audit F 门槛）
 *  - 教学编辑/语音审校未签认：status 恒为 draft，默认不开启
 *  - 例外词（a/the/is 弱读等）首版一律不引入；专名 Sam 的大写在 L07 显式教学
 */

export interface PhonicsGpc {
  grapheme: string
  ipa: string
  /** 口型/发音提示（给读题家长的中文说明，不是音频替代） */
  mouthCue: string
}

export interface PhonicsWord {
  text: string
  /** 字素切分（与 text 逐字母对应；首版全部单字母 GPC） */
  graphemes: string[]
  /** 该词最早可用于第几课 */
  lesson: number
  /** 中文词义提示（家长读题用） */
  meaning: string
  /** 专名（首字母大写需显式教学，见 L07） */
  proper?: boolean
}

export type PhonicsItemKind = 'grapheme' | 'blend' | 'segment'

export interface PhonicsItem {
  id: string
  kind: PhonicsItemKind
  prompt: string
  options: Array<{ id: string; label: string }>
  answer: string
}

export interface PhonicsLesson {
  id: string
  order: number
  title: string
  /** 本课新授 GPC */
  taught: PhonicsGpc[]
  status: 'draft'
  words: PhonicsWord[]
  items: PhonicsItem[]
  /** 本课解码短文（标题 + 正文）；正文逐词必须可解码 */
  reader?: { id: string; title: string; text: string }
  /** 教学注意（草稿阶段给审校者/读题家长的说明） */
  note?: string
}

const G_S: PhonicsGpc = { grapheme: 's', ipa: '/s/', mouthCue: '舌尖靠近上齿，送出长长的“嘶——”，像小蛇的声音' }
const G_A: PhonicsGpc = { grapheme: 'a', ipa: '/æ/', mouthCue: '嘴巴张大，短促地发“啊”，像医生压舌头时那样' }
const G_T: PhonicsGpc = { grapheme: 't', ipa: '/t/', mouthCue: '舌尖抵住上齿龈再弹开，又轻又短，不要拖出“特——”的音' }
const G_P: PhonicsGpc = { grapheme: 'p', ipa: '/p/', mouthCue: '双唇先闭紧，再突然打开送气，像吹灭小蜡烛，不要拖出“普——”的音' }
const G_I: PhonicsGpc = { grapheme: 'i', ipa: '/ɪ/', mouthCue: '嘴角微微展开，短促地发“衣”，比中文“衣”更松更短' }
const G_N: PhonicsGpc = { grapheme: 'n', ipa: '/n/', mouthCue: '舌尖抵上齿龈，声音从鼻子里出来，能感觉到鼻子在震动' }
const G_M: PhonicsGpc = { grapheme: 'm', ipa: '/m/', mouthCue: '双唇闭合，声音从鼻子里出来，像吃饱后满足的“嗯——”' }

const W_AT: PhonicsWord = { text: 'at', graphemes: ['a', 't'], lesson: 2, meaning: '在（某处）' }
const W_SAT: PhonicsWord = { text: 'sat', graphemes: ['s', 'a', 't'], lesson: 2, meaning: '坐（sat，sit 的过去式）' }
const W_PAT: PhonicsWord = { text: 'pat', graphemes: ['p', 'a', 't'], lesson: 3, meaning: '轻轻拍' }
const W_TAP: PhonicsWord = { text: 'tap', graphemes: ['t', 'a', 'p'], lesson: 3, meaning: '轻敲' }
const W_SAP: PhonicsWord = { text: 'sap', graphemes: ['s', 'a', 'p'], lesson: 3, meaning: '树液' }
const W_IT: PhonicsWord = { text: 'it', graphemes: ['i', 't'], lesson: 5, meaning: '它' }
const W_SIT: PhonicsWord = { text: 'sit', graphemes: ['s', 'i', 't'], lesson: 5, meaning: '坐' }
const W_SIP: PhonicsWord = { text: 'sip', graphemes: ['s', 'i', 'p'], lesson: 5, meaning: '小口喝' }
const W_TIP: PhonicsWord = { text: 'tip', graphemes: ['t', 'i', 'p'], lesson: 5, meaning: '轻碰；尖端' }
const W_PIT: PhonicsWord = { text: 'pit', graphemes: ['p', 'i', 't'], lesson: 5, meaning: '坑；果核' }
const W_IN: PhonicsWord = { text: 'in', graphemes: ['i', 'n'], lesson: 6, meaning: '在……里面' }
const W_PIN: PhonicsWord = { text: 'pin', graphemes: ['p', 'i', 'n'], lesson: 6, meaning: '别针' }
const W_TIN: PhonicsWord = { text: 'tin', graphemes: ['t', 'i', 'n'], lesson: 6, meaning: '锡罐' }
const W_NAP: PhonicsWord = { text: 'nap', graphemes: ['n', 'a', 'p'], lesson: 6, meaning: '小睡' }
const W_PAN: PhonicsWord = { text: 'pan', graphemes: ['p', 'a', 'n'], lesson: 6, meaning: '平底锅' }
const W_NIP: PhonicsWord = { text: 'nip', graphemes: ['n', 'i', 'p'], lesson: 6, meaning: '轻夹一下' }
const W_MAT: PhonicsWord = { text: 'mat', graphemes: ['m', 'a', 't'], lesson: 7, meaning: '垫子' }
const W_MAP: PhonicsWord = { text: 'map', graphemes: ['m', 'a', 'p'], lesson: 7, meaning: '地图' }
const W_MAN: PhonicsWord = { text: 'man', graphemes: ['m', 'a', 'n'], lesson: 7, meaning: '男人' }
const W_SAM: PhonicsWord = { text: 'Sam', graphemes: ['S', 'a', 'm'], lesson: 7, meaning: '人名萨姆（第一个字母要大写）', proper: true }

const opt = (id: string, label: string) => ({ id, label })

export const PHONICS_COURSE = {
  id: 'taoread-phonics-gb-draft1',
  locale: 'en',
  accent: 'GB',
  version: 'draft-1',
  status: 'draft' as const,
}

export const PHONICS_DRAFT: PhonicsLesson[] = [
  {
    id: 'draft-en-l01',
    order: 1,
    title: '认识 s 和 a',
    taught: [G_S, G_A],
    status: 'draft',
    words: [],
    items: [
      { id: 'l01-s-find', kind: 'grapheme', prompt: '找一找字母 s', options: [opt('s', 's'), opt('a', 'a')], answer: 's' },
      { id: 'l01-a-find', kind: 'grapheme', prompt: '找一找字母 a', options: [opt('a', 'a'), opt('s', 's')], answer: 'a' },
      { id: 'l01-s-again', kind: 'grapheme', prompt: '哪个是 s？', options: [opt('a', 'a'), opt('s', 's')], answer: 's' },
      { id: 'l01-a-again', kind: 'grapheme', prompt: '哪个是 a？', options: [opt('s', 's'), opt('a', 'a')], answer: 'a' },
    ],
    note: '只认字形，不出合成词。请家长按口型提示读字母音（不是字母名）。',
  },
  {
    id: 'draft-en-l02',
    order: 2,
    title: '新朋友 t：拼出 at 和 sat',
    taught: [G_T],
    status: 'draft',
    words: [W_AT, W_SAT],
    items: [
      { id: 'l02-t-find', kind: 'grapheme', prompt: '找一找字母 t', options: [opt('t', 't'), opt('s', 's')], answer: 't' },
      { id: 'l02-at-blend', kind: 'blend', prompt: 'a — t 连起来读，是哪个词？', options: [opt('at', 'at'), opt('sat', 'sat')], answer: 'at' },
      { id: 'l02-sat-blend', kind: 'blend', prompt: 's — a — t 连起来读，是哪个词？', options: [opt('sat', 'sat'), opt('at', 'at')], answer: 'sat' },
      { id: 'l02-sat-segment', kind: 'segment', prompt: 'sat 里有哪三个音？', options: [opt('sat', 's-a-t'), opt('at', 'a-t')], answer: 'sat' },
    ],
    reader: { id: 'reader-l02', title: 'Sat', text: 'sat. at.' },
    note: '爆破音 /t/ 短促，不带元音。合成示范请家长把三个音连着读，不加“呃”。',
  },
  {
    id: 'draft-en-l03',
    order: 3,
    title: '新朋友 p：pat、tap、sap',
    taught: [G_P],
    status: 'draft',
    words: [W_PAT, W_TAP, W_SAP],
    items: [
      { id: 'l03-p-find', kind: 'grapheme', prompt: '找一找字母 p', options: [opt('p', 'p'), opt('t', 't')], answer: 'p' },
      { id: 'l03-pat-blend', kind: 'blend', prompt: 'p — a — t 连起来读，是哪个词？', options: [opt('pat', 'pat'), opt('tap', 'tap')], answer: 'pat' },
      { id: 'l03-tap-blend', kind: 'blend', prompt: 't — a — p 连起来读，是哪个词？', options: [opt('tap', 'tap'), opt('pat', 'pat')], answer: 'tap' },
      { id: 'l03-sap-segment', kind: 'segment', prompt: 'sap 里有哪三个音？', options: [opt('sap', 's-a-p'), opt('tap', 't-a-p')], answer: 'sap' },
    ],
    note: '/p/ 与 /t/ 对比：一个用嘴唇，一个用舌尖。',
  },
  {
    id: 'draft-en-l04',
    order: 4,
    title: '复习 s a t p：自己拼一拼',
    taught: [],
    status: 'draft',
    words: [W_SAT, W_PAT, W_TAP, W_SAP],
    items: [
      { id: 'l04-tap-blend', kind: 'blend', prompt: 't — a — p，连起来是？', options: [opt('tap', 'tap'), opt('sap', 'sap')], answer: 'tap' },
      { id: 'l04-pat-segment', kind: 'segment', prompt: 'pat 里有哪三个音？', options: [opt('pat', 'p-a-t'), opt('tap', 't-a-p')], answer: 'pat' },
      { id: 'l04-sat-blend', kind: 'blend', prompt: 's — a — t，连起来是？', options: [opt('sat', 'sat'), opt('pat', 'pat')], answer: 'sat' },
      { id: 'l04-sap-segment', kind: 'segment', prompt: 'sap 里有哪三个音？', options: [opt('sap', 's-a-p'), opt('sat', 's-a-t')], answer: 'sap' },
    ],
    reader: { id: 'reader-l04', title: 'Pat Sat', text: 'Pat sat. Pat, tap, tap.' },
    note: '复习课：不按背过的顺序，用新组合检查是否真的会拼。',
  },
  {
    id: 'draft-en-l05',
    order: 5,
    title: '新朋友 i：sit、sip、tip',
    taught: [G_I],
    status: 'draft',
    words: [W_IT, W_SIT, W_SIP, W_TIP, W_PIT],
    items: [
      { id: 'l05-i-find', kind: 'grapheme', prompt: '找一找字母 i', options: [opt('i', 'i'), opt('a', 'a')], answer: 'i' },
      { id: 'l05-sit-blend', kind: 'blend', prompt: 's — i — t，连起来是？', options: [opt('sit', 'sit'), opt('sip', 'sip')], answer: 'sit' },
      { id: 'l05-tip-blend', kind: 'blend', prompt: 't — i — p，连起来是？', options: [opt('tip', 'tip'), opt('pit', 'pit')], answer: 'tip' },
      { id: 'l05-pit-segment', kind: 'segment', prompt: 'pit 里有哪三个音？', options: [opt('pit', 'p-i-t'), opt('tip', 't-i-p')], answer: 'pit' },
    ],
    reader: { id: 'reader-l05', title: 'Sit, Pat', text: 'Sit, Pat, sit. Tip it. Sip, sip.' },
    note: '/ɪ/ 与 /æ/ 对比：sit 不是 sat。短文逐词可解码（it/sit/sat）。',
  },
  {
    id: 'draft-en-l06',
    order: 6,
    title: '新朋友 n：pin、in、nap',
    taught: [G_N],
    status: 'draft',
    words: [W_IN, W_PIN, W_TIN, W_NAP, W_PAN, W_NIP],
    items: [
      { id: 'l06-n-find', kind: 'grapheme', prompt: '找一找字母 n', options: [opt('n', 'n'), opt('m', 'm')], answer: 'n' },
      { id: 'l06-pin-blend', kind: 'blend', prompt: 'p — i — n，连起来是？', options: [opt('pin', 'pin'), opt('tin', 'tin')], answer: 'pin' },
      { id: 'l06-nap-blend', kind: 'blend', prompt: 'n — a — p，连起来是？', options: [opt('nap', 'nap'), opt('pan', 'pan')], answer: 'nap' },
      { id: 'l06-pan-segment', kind: 'segment', prompt: 'pan 里有哪三个音？', options: [opt('pan', 'p-a-n'), opt('nap', 'n-a-p')], answer: 'pan' },
    ],
    reader: { id: 'reader-l06', title: 'Pin in Tin', text: 'Pin in tin. Sit in it.' },
    note: '/n/ 与 /m/ 预告：都是鼻音，L07 会见 m。',
  },
  {
    id: 'draft-en-l07',
    order: 7,
    title: '新朋友 m：mat、map 和 Sam',
    taught: [G_M],
    status: 'draft',
    words: [W_MAT, W_MAP, W_MAN, W_SAM],
    items: [
      { id: 'l07-m-find', kind: 'grapheme', prompt: '找一找字母 m', options: [opt('m', 'm'), opt('n', 'n')], answer: 'm' },
      { id: 'l07-mat-blend', kind: 'blend', prompt: 'm — a — t，连起来是？', options: [opt('mat', 'mat'), opt('map', 'map')], answer: 'mat' },
      { id: 'l07-map-segment', kind: 'segment', prompt: 'map 里有哪三个音？', options: [opt('map', 'm-a-p'), opt('mat', 'm-a-t')], answer: 'map' },
      { id: 'l07-sam-proper', kind: 'grapheme', prompt: 'Sam 是人名：第一个字母要大写。哪个写法是对的？', options: [opt('Sam', 'Sam'), opt('sam', 'sam')], answer: 'Sam' },
    ],
    reader: { id: 'reader-l07', title: 'Sam Sat', text: 'Sam sat. Sit, Sam, sit.' },
    note: '专名大写在本课显式教学；man/map 词义请家长先确认孩子理解。',
  },
  {
    id: 'draft-en-l08',
    order: 8,
    title: '复习全部：Sam 的下午',
    taught: [],
    status: 'draft',
    words: [W_SAM, W_SAT, W_IN, W_IT, W_PIN, W_TIN, W_NAP, W_TIP],
    items: [
      { id: 'l08-sam-segment', kind: 'segment', prompt: 'Sam 里有哪三个音？', options: [opt('sam', 'S-a-m'), opt('map', 'm-a-p')], answer: 'sam' },
      { id: 'l08-nap-blend', kind: 'blend', prompt: 'n — a — p，连起来是？', options: [opt('nap', 'nap'), opt('pan', 'pan')], answer: 'nap' },
      { id: 'l08-tin-blend', kind: 'blend', prompt: 't — i — n，连起来是？', options: [opt('tin', 'tin'), opt('pin', 'pin')], answer: 'tin' },
      { id: 'l08-pit-segment', kind: 'segment', prompt: 'pit 里有哪三个音？', options: [opt('pit', 'p-i-t'), opt('sip', 's-i-p')], answer: 'pit' },
    ],
    reader: { id: 'reader-l08', title: 'Sam Sat in It', text: 'Sam sat in it. Sit, Pat, sit. Pin in tin. Tap, tap, tap. Nap, Sam, nap.' },
    note: '累积迁移课：只用已学词造句。冠词 a/the 的弱读是例外词，本版一律不引入。',
  },
]

export const PHONICS_READERS = PHONICS_DRAFT.filter((l) => l.reader).map((l) => ({
  id: l.reader!.id,
  title: l.reader!.title,
  lessonId: l.id,
  text: l.reader!.text,
  note: '原创解码练习草稿；仅使用已教 GPC；需教学编辑与语音审校签认后才能发布',
}))

/** 截至第 N 课（含）累计已教字素集合 */
export function taughtGraphemes(upToLesson: number): Set<string> {
  const set = new Set<string>()
  for (const lesson of PHONICS_DRAFT) {
    if (lesson.order > upToLesson) continue
    for (const gpc of lesson.taught) set.add(gpc.grapheme)
  }
  return set
}

export function lessonById(id: string) {
  return PHONICS_DRAFT.find((lesson) => lesson.id === id)
}

export function publicLesson(id: string) {
  const lesson = lessonById(id)
  if (!lesson) return null
  return {
    id: lesson.id,
    order: lesson.order,
    title: lesson.title,
    status: 'draft' as const,
    audioAvailable: false as const,
    taught: lesson.taught.map(({ grapheme, ipa, mouthCue }) => ({ grapheme, ipa, mouthCue })),
    items: lesson.items.map(({ id: itemId, kind, prompt, options }) => ({ id: itemId, kind, prompt, options })),
    reader: lesson.reader ? { id: lesson.reader.id, title: lesson.reader.title, text: lesson.reader.text } : null,
    note: lesson.note ?? null,
  }
}
