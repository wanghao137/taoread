/**
 * 按 docs/69 §6.3 基础阶段草案生成 L09–L24 课程内容（docs/90 内容扩充）。
 *
 * 只追加：不改动既有 L01–L08 的任何对象；重复运行先剥离上一轮生成的对象再重建（幂等）。
 * 新音频槽 sha256 留空，由 produce-phonics-audio → apply-phonics-audio-candidates 填充；
 * 新图槽 sha256 留空，由 build-phonics-art 填充。manifest 索引与 contentHash 在此重算。
 *
 * 用法：npx tsx scripts/build-phonics-foundation.mts
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const dir = candidateDirectory
const read = async (name: string) => JSON.parse(await readFile(path.join(dir, `${name}.json`), 'utf8'))
const write = async (name: string, data: unknown) => writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2) + '\n', 'utf8')

const GUIDE = '跟随中文指令即可。先确认词义；孩子可以暂停。口头读出没有自动评分，请只补记自己实际观察到的情况。'
const SHAPES = ['VC', 'CVC']
const HELP = 'shared-help-zh'

// ── 新增 GPC（GB 短元音体系，docs/69 §6.3 排课草案）──────────────────────────
const NEW_MAPPINGS: Array<{ spelling: string; phonemes: Array<{ ipa: string; kind: 'vowel' | 'consonant' }>; position?: 'any' | 'initial' | 'final' }> = [
  { spelling: 'd', phonemes: [{ ipa: 'd', kind: 'consonant' }] }, { spelling: 'g', phonemes: [{ ipa: 'g', kind: 'consonant' }] },
  { spelling: 'o', phonemes: [{ ipa: 'ɒ', kind: 'vowel' }] }, { spelling: 'c', phonemes: [{ ipa: 'k', kind: 'consonant' }] },
  { spelling: 'k', phonemes: [{ ipa: 'k', kind: 'consonant' }] }, { spelling: 'e', phonemes: [{ ipa: 'e', kind: 'vowel' }] },
  { spelling: 'u', phonemes: [{ ipa: 'ʌ', kind: 'vowel' }] }, { spelling: 'r', phonemes: [{ ipa: 'r', kind: 'consonant' }] },
  { spelling: 'h', phonemes: [{ ipa: 'h', kind: 'consonant' }] }, { spelling: 'b', phonemes: [{ ipa: 'b', kind: 'consonant' }] },
  { spelling: 'f', phonemes: [{ ipa: 'f', kind: 'consonant' }] }, { spelling: 'l', phonemes: [{ ipa: 'l', kind: 'consonant' }] },
  // ── 阶段二（docs/69 §6.4）：剩余常见单字母、双写与首字母组合 ──────────────
  // x 一个字素对应两个音素、qu 对应 /kw/——schema 的一字多音能力，不教「一块永远一个音」
  { spelling: 'j', phonemes: [{ ipa: 'dʒ', kind: 'consonant' }] }, { spelling: 'v', phonemes: [{ ipa: 'v', kind: 'consonant' }] },
  { spelling: 'w', phonemes: [{ ipa: 'w', kind: 'consonant' }] }, { spelling: 'y', phonemes: [{ ipa: 'j', kind: 'consonant' }] },
  { spelling: 'z', phonemes: [{ ipa: 'z', kind: 'consonant' }] }, { spelling: 'x', phonemes: [{ ipa: 'k', kind: 'consonant' }, { ipa: 's', kind: 'consonant' }], position: 'final' },
  { spelling: 'qu', phonemes: [{ ipa: 'k', kind: 'consonant' }, { ipa: 'w', kind: 'consonant' }], position: 'initial' },
  { spelling: 'ff', phonemes: [{ ipa: 'f', kind: 'consonant' }], position: 'final' }, { spelling: 'll', phonemes: [{ ipa: 'l', kind: 'consonant' }], position: 'final' },
  { spelling: 'ss', phonemes: [{ ipa: 's', kind: 'consonant' }], position: 'final' }, { spelling: 'ck', phonemes: [{ ipa: 'k', kind: 'consonant' }] },
  { spelling: 'sh', phonemes: [{ ipa: 'ʃ', kind: 'consonant' }] },
  // ── 阶段三：常见辅音组合（docs/69 §6.4「常见辅音字母组合」）─────────────────
  { spelling: 'ch', phonemes: [{ ipa: 'tʃ', kind: 'consonant' }] }, { spelling: 'th', phonemes: [{ ipa: 'θ', kind: 'consonant' }] },
  { spelling: 'ng', phonemes: [{ ipa: 'ŋ', kind: 'consonant' }], position: 'final' },
]
const NEW_LETTERS = NEW_MAPPINGS.map(m => m.spelling)
const LESSON_IDS = Array.from({ length: 33 }, (_, i) => `L${String(9 + i).padStart(2, '0')}`)

// 共享中文指令资产：同一 asset 的全部引用任务共享同一条文案（produce 脚本要求一致）
const INSTRUCTIONS = [
  { id: 'inst-model-zh', text: '看这个字母，听它在单词里的声音。你也可以跟着试一试。' },
  { id: 'inst-hear-zh', text: '听声音，点一个字母。需要时可以再听一遍。' },
  { id: 'inst-meaning-zh', text: '看看图片，听一听这个词。可以跟着说一说。' },
  { id: 'inst-blend-zh', text: '听老师把声音慢慢连起来，跟着一起拼。' },
  { id: 'inst-build-zh', text: '先听完整的词，再点字母，按声音的顺序摆好。' },
  { id: 'inst-oral-zh', text: '试着自己读。读不出来也没关系，可以点“一起读”。' },
  { id: 'inst-read-zh', text: '看看这一页，试着读一读。需要时一起读。' },
]
const INST: Record<string, string> = { model: 'inst-model-zh', hear: 'inst-hear-zh', meaning: 'inst-meaning-zh', blend: 'inst-blend-zh', build: 'inst-build-zh', oral: 'inst-oral-zh', read: 'inst-read-zh' }

// ── 课程定义 ────────────────────────────────────────────────────────────────
interface WordDef { text: string; zh: string; blend?: string; build?: string; oral?: string }
interface LessonDef {
  id: string; title: string; letter?: string
  /** 同课额外新授映射（如 ff/ll/ss 三双写一课） */
  extraLetters?: string[]
  words: WordDef[]
  /** 巩固课：新近音听辨（target+干扰项字母）+ 摆字复习 + 读词卡 */
  reviewHears?: Array<{ target: string; options: string[] }>
  reviewBuilds?: string[]
  reviewCards?: string[]
  /** 毕业课：小书页（全部词必须是词条，含大小写） */
  caption?: Array<{ text: string; words: string[] }>
  hears?: Array<{ target: string; options: string[] }>
  /** 本课词形白名单（不继承祖先——校验按课判定） */
  shapes?: string[]
}

const LESSONS: LessonDef[] = [
  { id: 'L09', title: '认识 d', letter: 'd', words: [
    { text: 'dad', zh: '爸爸', blend: 'dad' }, { text: 'sad', zh: '难过的', build: 'sad' }, { text: 'dip', zh: '蘸一蘸', oral: 'dip' } ] },
  { id: 'L10', title: '认识 g', letter: 'g', words: [
    { text: 'dig', zh: '挖土', blend: 'dig' }, { text: 'pig', zh: '小猪', build: 'pig' }, { text: 'gap', zh: '缺口', oral: 'gap' } ] },
  { id: 'L11', title: '认识 o', letter: 'o', words: [
    { text: 'dog', zh: '小狗', blend: 'dog' }, { text: 'dot', zh: '圆点', build: 'dot' }, { text: 'pot', zh: '锅' }, { text: 'top', zh: '顶端', oral: 'top' } ] },
  { id: 'L12', title: '把声音连起来', words: [], reviewHears: [ { target: 'o', options: ['o', 'a', 'i'] }, { target: 'g', options: ['g', 'd', 'p'] } ], reviewBuilds: ['nap', 'dig'], reviewCards: ['pig', 'dig', 'dot'] },
  { id: 'L13', title: '认识 c', letter: 'c', words: [
    { text: 'cat', zh: '猫', blend: 'cat' }, { text: 'cap', zh: '鸭舌帽', build: 'cap' }, { text: 'can', zh: '罐头', oral: 'can' } ] },
  { id: 'L14', title: '认识 k', letter: 'k', words: [
    { text: 'kid', zh: '小孩', blend: 'kid', build: 'kid' }, { text: 'kit', zh: '工具箱', oral: 'kit' } ] },
  { id: 'L15', title: '认识 e', letter: 'e', words: [
    { text: 'pen', zh: '笔', blend: 'pen' }, { text: 'pet', zh: '宠物', build: 'pet' }, { text: 'net', zh: '网', oral: 'net' } ] },
  { id: 'L16', title: '把声音连起来', words: [], reviewHears: [ { target: 'c', options: ['c', 'k', 's'] }, { target: 'e', options: ['e', 'a', 'i'] } ], reviewBuilds: ['pen', 'cat'], reviewCards: ['cat', 'kid', 'pen'] },
  { id: 'L17', title: '认识 u', letter: 'u', words: [
    { text: 'sun', zh: '太阳', blend: 'sun' }, { text: 'cup', zh: '杯子', build: 'cup' }, { text: 'mud', zh: '泥巴', oral: 'mud' } ] },
  { id: 'L18', title: '认识 r', letter: 'r', words: [
    { text: 'run', zh: '跑', blend: 'run' }, { text: 'rat', zh: '老鼠', build: 'rat' }, { text: 'red', zh: '红色', oral: 'red' } ] },
  { id: 'L19', title: '认识 h', letter: 'h', words: [
    { text: 'hat', zh: '帽子', blend: 'hat' }, { text: 'hen', zh: '母鸡', build: 'hen' }, { text: 'hop', zh: '单脚跳', oral: 'hop' }, { text: 'hid', zh: '躲好了' } ] },
  { id: 'L20', title: '把声音连起来', words: [], reviewHears: [ { target: 'u', options: ['u', 'a', 'o'] }, { target: 'h', options: ['h', 'n', 'r'] } ], reviewBuilds: ['run', 'hat'], reviewCards: ['sun', 'run', 'hat'] },
  { id: 'L21', title: '认识 b', letter: 'b', words: [
    { text: 'bag', zh: '书包', blend: 'bag' }, { text: 'bed', zh: '床', build: 'bed' }, { text: 'bus', zh: '公交车', oral: 'bus' } ] },
  { id: 'L22', title: '认识 f', letter: 'f', words: [
    { text: 'fan', zh: '电风扇', blend: 'fan' }, { text: 'fin', zh: '鱼鳍', build: 'fin' }, { text: 'fun', zh: '开心', oral: 'fun' } ] },
  { id: 'L23', title: '认识 l', letter: 'l', words: [
    { text: 'leg', zh: '腿', blend: 'leg' }, { text: 'lip', zh: '嘴唇', build: 'lip' }, { text: 'log', zh: '圆木', oral: 'log' } ] },
  { id: 'L24', title: '读一本小书', words: [], hears: [ { target: 'b', options: ['b', 'd', 'p'] }, { target: 'l', options: ['l', 't', 'f'] } ], reviewBuilds: ['bag', 'log'],
    caption: [ { text: 'Sam ran.', words: ['w-sam', 'w-ran'] }, { text: 'Sam hid.', words: ['w-sam', 'w-hid'] }, { text: 'sad dad.', words: ['w-sad', 'w-dad'] } ] },
  // ── 阶段二（docs/69 §6.4）：剩余常见单字母、双写与首字母组合 ─────────────
  { id: 'L25', title: '认识 j', letter: 'j', words: [
    { text: 'jam', zh: '果酱', blend: 'jam' }, { text: 'jet', zh: '喷气式飞机', build: 'jet' }, { text: 'jog', zh: '慢跑', oral: 'jog' } ] },
  { id: 'L26', title: '认识 v', letter: 'v', words: [
    { text: 'van', zh: '小货车', blend: 'van', build: 'van' }, { text: 'vet', zh: '兽医', oral: 'vet' } ] },
  { id: 'L27', title: '认识 w', letter: 'w', words: [
    { text: 'wet', zh: '湿的', blend: 'wet' }, { text: 'web', zh: '蜘蛛网', build: 'web' }, { text: 'wig', zh: '假发', oral: 'wig' } ] },
  { id: 'L28', title: '把声音连起来', words: [], reviewHears: [ { target: 'j', options: ['j', 'g', 'd'] }, { target: 'w', options: ['w', 'v', 'r'] } ], reviewBuilds: ['jam', 'web'], reviewCards: ['jet', 'van', 'wet'] },
  { id: 'L29', title: '认识 y', letter: 'y', words: [
    { text: 'yak', zh: '牦牛', blend: 'yak', build: 'yak' }, { text: 'yes', zh: '是的', oral: 'yes' } ] },
  { id: 'L30', title: '认识 z', letter: 'z', words: [
    { text: 'zip', zh: '拉链', blend: 'zip', build: 'zip' }, { text: 'zap', zh: '咔嚓闪一下', oral: 'zap' } ] },
  { id: 'L31', title: '认识 x', letter: 'x', words: [
    { text: 'box', zh: '箱子', blend: 'box' }, { text: 'fox', zh: '狐狸', build: 'fox' }, { text: 'six', zh: '六', oral: 'six' } ],
    shapes: ['VC', 'CVC', 'CVCC'] },
  { id: 'L32', title: '认识 qu', letter: 'qu', words: [
    { text: 'quiz', zh: '问答游戏', blend: 'quiz', build: 'quiz' }, { text: 'quit', zh: '停下来了', oral: 'quit' } ],
    shapes: ['VC', 'CVC', 'CCVC'] },
  { id: 'L33', title: '把声音连起来', words: [], reviewHears: [ { target: 'x', options: ['x', 'k', 's'] }, { target: 'qu', options: ['qu', 'k', 'w'] } ], reviewBuilds: ['yak', 'zip'], reviewCards: ['box', 'yak', 'zip'], shapes: ['VC', 'CVC', 'CVCC'] },
  { id: 'L34', title: '双写也好听', words: [
    { text: 'off', zh: '关掉', blend: 'off' }, { text: 'bell', zh: '铃铛', build: 'bell' }, { text: 'doll', zh: '布娃娃', oral: 'doll' } ],
    letter: 'ff', extraLetters: ['ll', 'ss'] },
  { id: 'L35', title: '认识 ck', letter: 'ck', words: [
    { text: 'sock', zh: '袜子', blend: 'sock' }, { text: 'duck', zh: '鸭子', build: 'duck' }, { text: 'kick', zh: '踢', oral: 'kick' } ] },
  { id: 'L36', title: '认识 sh', letter: 'sh', words: [
    { text: 'ship', zh: '轮船', blend: 'ship' }, { text: 'shop', zh: '商店', build: 'shop' }, { text: 'fish', zh: '鱼', oral: 'fish' } ] },
  { id: 'L37', title: '再读一本小书', words: [], hears: [ { target: 'sh', options: ['sh', 's', 'c'] }, { target: 'ck', options: ['ck', 'k', 'c'] } ], reviewBuilds: ['kick', 'fish'],
    caption: [ { text: 'fox ran.', words: ['w-fox', 'w-ran'] }, { text: 'fox hid.', words: ['w-fox', 'w-hid'] }, { text: 'six fish.', words: ['w-six', 'w-fish'] } ],
    shapes: ['VC', 'CVC', 'CVCC'] },
  // ── 阶段三：常见辅音组合 ────────────────────────────────────────────────────
  { id: 'L38', title: '认识 ch', letter: 'ch', words: [
    { text: 'chip', zh: '炸薯条', blend: 'chip' }, { text: 'chin', zh: '下巴', build: 'chin' }, { text: 'chat', zh: '聊天', oral: 'chat' } ] },
  { id: 'L39', title: '认识 th', letter: 'th', words: [
    { text: 'thin', zh: '细的', blend: 'thin' }, { text: 'moth', zh: '飞蛾', build: 'moth' }, { text: 'bath', zh: '洗澡', oral: 'bath' } ],
    shapes: ['VC', 'CVC', 'CVCC'] },
  { id: 'L40', title: '认识 ng', letter: 'ng', words: [
    { text: 'ring', zh: '戒指', blend: 'ring' }, { text: 'wing', zh: '翅膀', build: 'wing' }, { text: 'sing', zh: '唱歌', oral: 'sing' } ],
    shapes: ['VC', 'CVC', 'CVCC'] },
  { id: 'L41', title: '声音捉迷藏', words: [], hears: [ { target: 'ch', options: ['ch', 'sh', 'c'] }, { target: 'th', options: ['th', 't', 'f'] } ], reviewBuilds: ['ring', 'chin'], reviewCards: ['ship', 'ring', 'moth'],
    caption: [ { text: 'sing sing.', words: ['w-sing', 'w-sing'] }, { text: 'ring ring.', words: ['w-ring', 'w-ring'] }, { text: 'chat chat.', words: ['w-chat', 'w-chat'] } ],
    shapes: ['VC', 'CVC', 'CVCC'] },
]
// ran 服务于 L24 小书；r/a/n 在 L18 全部已授
const EXTRA_WORDS: Array<{ text: string; zh: string; lesson: string }> = [ { text: 'ran', zh: '跑过了', lesson: 'L18' } ]

// ── 幂等剥离上一轮生成对象 ──────────────────────────────────────────────────
const newWordIds = new Set([...LESSONS.flatMap(l => l.words.map(w => `w-${w.text}`)), ...EXTRA_WORDS.map(w => `w-${w.text}`)])
const isGenerated = (id: string) =>
  LESSON_IDS.includes(id) || /^L(09|1[0-9]|2[0-9]|3[0-9]|4[01])[-.]/.test(id) || /^r-l(09|1[0-9]|2[0-9]|3[0-9]|4[01])/.test(id) || newWordIds.has(id) ||
  NEW_LETTERS.some(l => id === `sound-${l}` || id === `g-${l}`) || Object.values(INST).includes(id) ||
  (newWordIds.has(id.replace(/-meaning-image$/, '').replace(/-(segment|blend|word)$/, '')) && /-(segment|blend|word|meaning-image)$/.test(id))

// 词按解码引入课剥离（生成词全部引入于 L09+）——白名单会漏掉被删词的孤儿残留（vest/yell 教训）
type Row = { id: string } & Record<string, unknown>
const GEN_LESSON = /^L(09|1[0-9]|2[0-9]|3[0-9]|4[01])$/
const pick = async (name: string): Promise<Row[]> => {
  const list = (await read(name)) as Row[]
  if (name === 'words') return list.filter(w => !isGenerated(w.id) && !GEN_LESSON.test(String(w.decodingIntroducedAt ?? '')))
  if (name === 'assets') {
    const rawWords = (await read('words')) as Array<{ text: string; decodingIntroducedAt?: string }>
    // Sam 词条 text 带大写而资产 id 全小写——两种形式都保留
    const keep = new Set(rawWords.filter(w => !GEN_LESSON.test(w.decodingIntroducedAt ?? '')).flatMap(w => [`w-${w.text}`, `w-${w.text.toLowerCase()}`]))
    return list.filter(a => !isGenerated(a.id) && !(/^w-[a-z]+-(segment|blend|word|meaning-image)$/.test(a.id) && !keep.has(a.id.replace(/-(segment|blend|word|meaning-image)$/, ''))))
  }
  return list.filter(x => !isGenerated(x.id))
}
const mappings = await pick('mappings'), words = await pick('words'), tasks = await pick('tasks')
const lessons = await pick('lessons'), readers = await pick('readers'), assets = await pick('assets')
const entryPlans = await read('entryPlans'), manifest = await read('manifest')

// ── 构造 ────────────────────────────────────────────────────────────────────
const outMappings = [...mappings, ...NEW_MAPPINGS.map(m => ({
  id: `g-${m.spelling}`, spelling: m.spelling, display: m.spelling,
  phonemes: m.phonemes, accent: 'GB', positionCondition: m.position ?? 'any',
}))]

const wordDefs = [
  ...EXTRA_WORDS, ...LESSONS.flatMap(l => l.words.map(w => ({ text: w.text, zh: w.zh, lesson: l.id }))),
]
const GRAPHEMES = new Set(NEW_MAPPINGS.map(m => m.spelling))
/** 按映射表最长匹配切字素：quiz → qu,i,z；bell → b,e,ll（逐字符会把双字素词切错） */
const splitGraphemes = (text: string): string[] => {
  const out: string[] = []
  for (let i = 0; i < text.length;) {
    const pair = text.slice(i, i + 2)
    if (GRAPHEMES.has(pair)) { out.push(pair); i += 2 } else { out.push(text[i]!); i += 1 }
  }
  return out
}
const outWords = [...words, ...wordDefs.map(({ text, zh, lesson }) => ({
  id: `w-${text}`, text, meaningZh: zh, meaningIntroducedAt: lesson, decodingIntroducedAt: lesson,
  spans: splitGraphemes(text.toLowerCase()).reduce<Array<{ ranges: [number, number][]; mappingId: string }>>((acc, g) => {
    const start = acc.length === 0 ? 0 : (acc[acc.length - 1]!.ranges[0]![1] as number)
    acc.push({ ranges: [[start, start + g.length]], mappingId: `g-${g}` })
    return acc
  }, []),
  audioIds: { segment: `w-${text}-segment`, blend: `w-${text}-blend`, word: `w-${text}-word` },
}))]

const assetSlot = (id: string, purpose: string, extension: 'wav' | 'webp') => ({
  id, purpose, accent: purpose === 'instruction_zh' ? 'zh' : 'GB', sha256: null, extension,
  durationMs: null, speakerId: null, revision: 1, sourceLicense: null, reviewStatus: 'pending', fixture: false,
})
const outAssets = [...assets]
for (const inst of INSTRUCTIONS) outAssets.push(assetSlot(inst.id, 'instruction_zh', 'wav'))
for (const m of NEW_MAPPINGS) outAssets.push(assetSlot(`sound-${m.spelling}`, 'phoneme', 'wav'))
for (const w of wordDefs) for (const kind of ['segment', 'blend', 'word'] as const) outAssets.push(assetSlot(`w-${w.text}-${kind}`, kind, 'wav'))

/** 拼摆块按词条 spans 取字素（bell → b,e,ll；quiz → qu,i,z），不是逐字母 */
const tileChoices = (text: string) => {
  const word = outWords.find(w => w.text === text)! as unknown as { spans: Array<{ mappingId: string }> }
  return word.spans.map(span => {
    const spelling = outMappings.find(m => m.id === span.mappingId)!.spelling
    return { id: spelling, label: spelling, mappingId: span.mappingId }
  })
}
const outTasks: Array<Record<string, unknown>> = [], outReaders: Array<Record<string, unknown>> = []
const orderById = new Map(LESSONS.map((l, i) => [l.id, 9 + i]))
const hearTask = (id: string, target: string, options: string[]) => ({ id, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: '听声音，点一个字母。需要时可以再听一遍。', instructionAssetId: INST.hear, choices: options.map(ch => ({ id: ch, label: ch, mappingId: `g-${ch}` })), hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${target}`, stimulusAssetId: `sound-${target}`, judge: { answerIds: [target] } })

for (const def of LESSONS) {
  const order = orderById.get(def.id)!
  const taskIds: string[] = []
  const readerId = `r-${def.id.toLowerCase()}`

  if (def.letter) {
    const letter = def.letter
    taskIds.push(`${def.id}-model-${letter}`)
    outTasks.push({ id: `${def.id}-model-${letter}`, kind: 'listen', skill: 'mapping', role: 'model', instructionZh: '看这个字母，听它在单词里的声音。你也可以跟着试一试。', instructionAssetId: INST.model, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${letter}`, displayText: letter, stimulusAssetId: `sound-${letter}` })
    const hearOptions = [letter, ...['s', 'a', 't', 'p', 'i', 'n', 'm'].filter(l => l !== letter).slice(-2)]
    taskIds.push(`${def.id}-hear-${letter}`)
    outTasks.push(hearTask(`${def.id}-hear-${letter}`, letter, hearOptions))
  }
  for (const hear of [...def.reviewHears ?? [], ...def.hears ?? []]) {
    taskIds.push(`${def.id}-hear-${hear.target}`)
    outTasks.push(hearTask(`${def.id}-hear-${hear.target}`, hear.target, hear.options))
  }
  for (const w of def.words) {
    taskIds.push(`${def.id}-meaning-${w.text}`)
    outTasks.push({ id: `${def.id}-meaning-${w.text}`, kind: 'listen', skill: 'meaning', role: 'model', instructionZh: '看看图片，听一听这个词。可以跟着说一说。', instructionAssetId: INST.meaning, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], wordId: `w-${w.text}`, stimulusAssetId: `w-${w.text}-word`, displayText: w.text, imageAssetId: `w-${w.text}-meaning-image` })
  }
  const blendWord = def.words.find(w => w.blend)
  if (blendWord?.blend) {
    taskIds.push(`${def.id}-blend-${blendWord.blend}`)
    outTasks.push({ id: `${def.id}-blend-${blendWord.blend}`, kind: 'listen', skill: 'blend', role: 'model', instructionZh: '听老师把声音慢慢连起来，跟着一起拼。', instructionAssetId: INST.blend, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], wordId: `w-${blendWord.blend}`, stimulusAssetId: `w-${blendWord.blend}-blend`, displayText: blendWord.blend })
  }
  for (const text of def.reviewBuilds ?? def.words.map(w => w.build).filter((x): x is string => Boolean(x))) {
    taskIds.push(`${def.id}-build-${text}`)
    outTasks.push({ id: `${def.id}-build-${text}`, kind: 'build', skill: 'segment', role: 'practice', instructionZh: '先听完整的词，再点字母，按声音的顺序摆好。', instructionAssetId: INST.build, choices: tileChoices(text), hintAssetIds: [`w-${text}-segment`, `w-${text}-blend`], canSkipWithHelp: true, timeline: [], wordId: `w-${text}`, stimulusAssetId: `w-${text}-word`, judge: { answerIds: tileChoices(text).map(c => c.id) } })
  }
  const oralWord = def.words.find(w => w.oral)
  if (oralWord?.oral) {
    taskIds.push(`${def.id}-oral-${oralWord.oral}`)
    outTasks.push({ id: `${def.id}-oral-${oralWord.oral}`, kind: 'oral', skill: 'oral_reading', role: 'practice', instructionZh: '试着自己读。读不出来也没关系，可以点“一起读”。', instructionAssetId: INST.oral, choices: [], hintAssetIds: [`w-${oralWord.oral}-segment`, `w-${oralWord.oral}-blend`, `w-${oralWord.oral}-word`], canSkipWithHelp: true, timeline: [], wordId: `w-${oralWord.oral}`, displayText: oralWord.oral })
  }
  if (def.caption) {
    for (const [i] of def.caption.entries()) outAssets.push(assetSlot(`${readerId}-page-${i + 1}`, 'passage', 'wav'))
    outReaders.push({ id: readerId, kind: 'caption', titleZh: '萨姆的小片段', introducedAt: def.id, pages: def.caption.map((page, i) => ({ text: page.text, wordIds: page.words, audioAssetId: `${readerId}-page-${i + 1}` })) })
    taskIds.push(`${def.id}-read`)
    outTasks.push({ id: `${def.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: INST.read, choices: [], hintAssetIds: [...new Set(def.caption.flatMap(p => p.words))].map(id => `${id}-word`), canSkipWithHelp: true, timeline: [], readerId })
  } else {
    const readWords = def.reviewCards ?? def.words.map(w => w.text)
    outReaders.push({ id: readerId, kind: 'word_cards', titleZh: '一起读词卡', introducedAt: def.id, pages: readWords.map(text => ({ text, wordIds: [`w-${text}`], audioAssetId: `w-${text}-word`, imageAssetId: `w-${text}-meaning-image` })) })
    taskIds.push(`${def.id}-read`)
    outTasks.push({ id: `${def.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: INST.read, choices: [], hintAssetIds: readWords.map(text => `w-${text}-word`), canSkipWithHelp: true, timeline: [], readerId })
  }

  lessons.push({
    id: def.id, order, titleZh: def.title, prerequisites: [`L${String(order - 1).padStart(2, '0')}`],
    newMappingIds: def.letter ? [`g-${def.letter}`, ...(def.extraLetters ?? []).map(l => `g-${l}`)] : [],
    capitals: [], exceptions: [], punctuation: [],
    allowedShapes: def.shapes ?? SHAPES, taskIds, readerIds: [readerId], parentGuideZh: GUIDE,
  })
}

// 自愈：保留词（如 w-sam）的音频槽若因历史误删而缺失，补空槽由 produce 重新生成
for (const w of outWords) {
  const slots = w.audioIds as Record<string, string>
  for (const kind of ['segment', 'blend', 'word'] as const) {
    const slotId = slots[kind]
    if (!slotId || !outAssets.some(a => a.id === slotId)) outAssets.push(assetSlot(slotId ?? `w-${String(w.text)}-${kind}`, kind, 'wav'))
  }
}

// 词义图槽（一词一画）
for (const w of wordDefs) outAssets.push(assetSlot(`w-${w.text}-meaning-image`, 'image', 'webp'))

const outLessons = lessons, outTasksAll = [...tasks, ...outTasks]
const outReadersAll = [...readers, ...outReaders]
const outManifest = {
  ...manifest,
  lessonKeys: outLessons.map((l: { id: string }) => l.id),
  assetIds: outAssets.map(a => a.id),
  entryPlanKeys: entryPlans.map((e: { id: string }) => e.id),
  contentHash: null,
}
await write('mappings', outMappings)
await write('words', outWords)
await write('tasks', outTasksAll)
await write('lessons', outLessons)
await write('readers', outReadersAll)
await write('assets', outAssets)
await write('manifest', outManifest)
// 哈希基于通过 zod 的完整课程（空 sha256 槽合法）
const course = await loadCourse(dir)
outManifest.contentHash = courseHash(course)
await write('manifest', outManifest)
console.log(JSON.stringify({ lessons: outLessons.length, words: outWords.length, tasks: outTasksAll.length, readers: outReadersAll.length, assets: outAssets.length, contentHash: outManifest.contentHash }))
