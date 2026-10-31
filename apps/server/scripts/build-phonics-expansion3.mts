/**
 * 扩课三轮（docs/100）：L80–L89 = FreePEP 教材对照后的 PEP 对齐缺口课。
 * 边界：FreePEP 教材正文/歌谣/插图/音频有版权（人教社），不引入；只把「PEP 词表覆盖」
 * 当事实参照，例句/场景/释义/音频/插画全部为桃阅读原创内容。
 * 纯应用课沿用扩课二轮先例（L60 三连音 letters=[]）：辅音簇拆单字母映射，不造簇映射。
 * 用法：npx tsx scripts/build-phonics-expansion3.mts --course-dir <候选目录>
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: { 'course-dir': { type: 'string' } } })
if (!values['course-dir']) throw new Error('--course-dir is required')
const dir = path.resolve(values['course-dir'])
const read = async (name: string) => JSON.parse(await readFile(path.join(dir, `${name}.json`), 'utf8'))
const write = async (name: string, data: unknown) => writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2) + '\n', 'utf8')

const GUIDE = '跟随中文指令即可。先确认词义；孩子可以暂停。口头读出没有自动评分，请只补记自己实际观察到的情况。'
const HELP = 'shared-help-zh'

const NEW_MAPPINGS: Array<{ id: string; spelling: 'g' | 'ue'; display: string; ipa: string; kind: 'vowel' | 'consonant'; position?: 'any' | 'final' }> = [
  { id: 'g2', spelling: 'g', display: 'g', ipa: 'dʒ', kind: 'consonant' },
  { id: 'ue2', spelling: 'ue', display: 'ue', ipa: 'uː', position: 'final', kind: 'vowel' },
]

interface WordDef { text: string; zh: string; blend?: string; oral?: string; graphemes: string[] }
interface LessonDef {
  id: string; title: string; letters: string[]; shapes: string[]
  words: WordDef[]
  hears?: Array<{ target: string; options: string[] }>
}

const LESSONS: LessonDef[] = [
  { id: 'L80', title: '开头的 bl 和 gl', letters: [], shapes: ['CCVC'], words: [
    { text: 'black', zh: '黑色', blend: 'black', graphemes: ['b', 'l', 'a', 'ck'] },
    { text: 'glad', zh: '高兴的', oral: 'glad', graphemes: ['g', 'l', 'a', 'd'] } ] },
  { id: 'L81', title: '开头的 tr 和 pl', letters: [], shapes: ['CCVC', 'CCV'], words: [
    { text: 'trap', zh: '陷阱', blend: 'trap', graphemes: ['t', 'r', 'a', 'p'] },
    { text: 'plum', zh: '李子', graphemes: ['p', 'l', 'u', 'm'] },
    { text: 'plane', zh: '飞机', oral: 'plane', graphemes: ['p', 'l', 'ae!', 'n'] } ] },
  { id: 'L82', title: '结尾的 sk 和 nd', letters: [], shapes: ['CVC', 'CVCC'], words: [
    { text: 'desk', zh: '课桌', blend: 'desk', graphemes: ['d', 'e', 's', 'k'] },
    { text: 'hand', zh: '手', graphemes: ['h', 'a', 'n', 'd'] },
    { text: 'sand', zh: '沙', oral: 'sand', graphemes: ['s', 'a', 'n', 'd'] } ] },
  { id: 'L83', title: '长音 ue（蓝色的音）', letters: ['ue2'], shapes: ['CCV'], words: [
    { text: 'blue', zh: '蓝色', blend: 'blue', graphemes: ['b', 'l', 'ue2'] },
    { text: 'glue', zh: '胶水', graphemes: ['g', 'l', 'ue2'] },
    { text: 'true', zh: '真的', oral: 'true', graphemes: ['t', 'r', 'ue2'] } ] },
  { id: 'L84', title: '会变声的 g', letters: ['g2'], shapes: ['CVC'], words: [
    { text: 'gem', zh: '宝石', blend: 'gem', graphemes: ['g2', 'e', 'm'] },
    { text: 'page', zh: '页', graphemes: ['p', 'ae!', 'g2'] },
    { text: 'cage', zh: '笼子', oral: 'cage', graphemes: ['c2', 'ae!', 'g2'] } ] },
  { id: 'L85', title: '两个音节的词', letters: [], shapes: ['CVCCVC', 'CVCVC', 'VCCVCC', 'CVCCV'], words: [
    { text: 'pencil', zh: '铅笔', blend: 'pencil', graphemes: ['p', 'e', 'n', 'c2', 'i', 'l'] },
    { text: 'picnic', zh: '野餐', graphemes: ['p', 'i', 'c', 'n', 'i', 'c'] },
    { text: 'pancake', zh: '薄煎饼', oral: 'pancake', graphemes: ['p', 'a', 'n', 'c', 'ae!', 'k'] },
    { text: 'insect', zh: '昆虫', graphemes: ['i', 'n', 's', 'e', 'c2', 't'] } ] },
  { id: 'L86', title: '天气词（-y 结尾）', letters: [], shapes: ['CVCCV', 'CCVCV', 'CVCV'], words: [
    { text: 'windy', zh: '有风的', blend: 'windy', graphemes: ['w', 'i', 'n', 'd', 'y3'] },
    { text: 'cloudy', zh: '多云的', graphemes: ['c', 'l', 'ou', 'd', 'y3'] },
    { text: 'rainy', zh: '下雨的', oral: 'rainy', graphemes: ['r', 'ai', 'n', 'y3'] } ] },
  { id: 'L87', title: '人物词（词尾弱读 er）', letters: [], shapes: ['CVCV'], words: [
    { text: 'farmer', zh: '农民', blend: 'farmer', graphemes: ['f', 'ar', 'm', 'er-weak'] },
    { text: 'father', zh: '爸爸', graphemes: ['f', 'a', 'th2', 'er-weak'] },
    { text: 'cooker', zh: '炊具', oral: 'cooker', graphemes: ['c', 'oo2', 'k', 'er-weak'] } ] },
  { id: 'L88', title: '小应用（ee 与 ow）', letters: [], shapes: ['CVC', 'CVCCV', 'CVCV', 'CCVV'], words: [
    { text: 'sheep', zh: '绵羊', blend: 'sheep', graphemes: ['sh', 'ee', 'p'] },
    { text: 'window', zh: '窗户', graphemes: ['w', 'i', 'n', 'd', 'ow2'] },
    { text: 'snowy', zh: '下雪的', oral: 'snowy', graphemes: ['s', 'n', 'ow2', 'y3'] } ] },
  { id: 'L89', title: '身体词（th 的轻音）', letters: [], shapes: ['CVC'], words: [
    { text: 'mouth', zh: '嘴巴', blend: 'mouth', graphemes: ['m', 'ou', 'th'] },
    { text: 'tooth', zh: '牙齿', oral: 'tooth', graphemes: ['t', 'oo', 'th'] } ] },
]

// ── 幂等剥离 ────────────────────────────────────────────────────────────────
const LESSON_IDS = LESSONS.map(l => l.id)
const newWordIds = new Set(LESSONS.flatMap(l => l.words.map(w => `w-${w.text}`)))
const NEW_GRAPHEMES = NEW_MAPPINGS.map(m => m.id)
const isGenerated = (id: string) =>
  LESSON_IDS.includes(id) || LESSON_IDS.some(lessonId => id.startsWith(lessonId + '-')) || /^r-l(8[0-9])/.test(id) || newWordIds.has(id) ||
  NEW_GRAPHEMES.some(g => id === `sound-${g}` || id === `g-${g}`) ||
  (newWordIds.has(id.replace(/-meaning-image$/, '').replace(/-(segment|blend|word)$/, '')) && /-(segment|blend|word|meaning-image)$/.test(id))

type Row = { id: string } & Record<string, unknown>
const GEN_LESSON = new RegExp('^(' + LESSON_IDS.join('|') + ')$')
const pick = async (name: string): Promise<Row[]> => {
  const list = (await read(name)) as Row[]
  if (name === 'words') return list.filter(w => !isGenerated(w.id) && !GEN_LESSON.test(String(w.decodingIntroducedAt ?? '')))
  if (name === 'assets') {
    const rawWords = (await read('words')) as Array<{ text: string; decodingIntroducedAt?: string }>
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
  id: `g-${m.id}`, spelling: m.spelling, display: m.display,
  phonemes: [{ ipa: m.ipa, kind: m.kind }], accent: 'GB', positionCondition: m.position ?? 'any',
}))]

const outWords = [...words]
const outAssets = [...assets]
const outTasks: Array<Record<string, unknown>> = [], outReaders: Array<Record<string, unknown>> = []
const INSTRUCTIONS = { model: 'inst-model-zh', hear: 'inst-hear-zh', meaning: 'inst-meaning-zh', blend: 'inst-blend-zh', build: 'inst-build-zh', oral: 'inst-oral-zh', read: 'inst-read-zh' }
const assetSlot = (id: string, purpose: string, extension: 'wav' | 'webp') => ({
  id, purpose, accent: purpose === 'instruction_zh' ? 'zh' : 'GB', sha256: null, extension,
  durationMs: null, speakerId: null, revision: 1, sourceLicense: null, reviewStatus: 'pending', fixture: false,
})

const outLessons = [...lessons]
const orderBase = Math.max(...(lessons as unknown as Array<{ order: number }>).map(l => l.order))
let previousId = outLessons[outLessons.length - 1]!.id
for (const [i, def] of LESSONS.entries()) {
  const order = orderBase + 1 + i
  const taskIds: string[] = []
  const readerId = `r-${def.id.toLowerCase()}`
  for (const letter of def.letters) {
    outAssets.push(assetSlot(`sound-${letter}`, 'phoneme', 'wav'))
    taskIds.push(`${def.id}-model-${letter}`)
    outTasks.push({ id: `${def.id}-model-${letter}`, kind: 'listen', skill: 'mapping', role: 'model', instructionZh: '看这个字母，听它在单词里的声音。你也可以跟着试一试。', instructionAssetId: INSTRUCTIONS.model, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${letter}`, displayText: letter === 'g2' ? 'g' : 'ue', stimulusAssetId: `sound-${letter}` })
    taskIds.push(`${def.id}-hear-${letter}`)
    outTasks.push({ id: `${def.id}-hear-${letter}`, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: '听声音，点一个字母。需要时可以再听一遍。', instructionAssetId: INSTRUCTIONS.hear, choices: [{ id: letter, label: letter === 'g2' ? 'g' : 'ue', mappingId: `g-${letter}` }, ...['s', 'a', 't', 'p', 'i', 'n', 'm'].filter(ch => !def.letters.includes(ch)).slice(0, 2).map(ch => ({ id: ch, label: ch, mappingId: `g-${ch}` }))], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${letter}`, stimulusAssetId: `sound-${letter}`, judge: { answerIds: [letter] } })
  }
  for (const w of def.words) {
    const text = w.text, lower = text.toLowerCase(), last = lower.length - 1
    let pos = 0
    const spans: Array<{ ranges: Array<[number, number]>; mappingId: string }> = []
    // 字素记号：'ae!'=拆分字素（元音位+词尾 e）；'-weak/-open' 后缀=映射 id 后缀，拼读长度按真实拼写
    const spellingOf = (g: string) => g.endsWith('!') ? g.slice(0, -1) : g.replace(/[0-9]+$/, '').replace(/-(weak|open)$/, '')
    for (const g of w.graphemes) {
      const spelling = spellingOf(g)
      if (g.endsWith('!')) {
        spans.push({ ranges: [[pos, pos + 1], [last, last + 1]], mappingId: `g-${spelling}` })
        pos += 1
      } else {
        spans.push({ ranges: [[pos, pos + spelling.length]], mappingId: `g-${g}` })
        pos += spelling.length
      }
    }
    const splitCount = w.graphemes.filter(g => g.endsWith('!')).length
    if (pos + splitCount !== lower.length) throw new Error(`字素未覆盖整词: ${text} (${pos}+${splitCount}/${lower.length})`)
    outWords.push({
      id: `w-${text}`, text, meaningZh: w.zh, meaningIntroducedAt: def.id, decodingIntroducedAt: def.id,
      spans, audioIds: { segment: `w-${text}-segment`, blend: `w-${text}-blend`, word: `w-${text}-word` },
    })
    for (const kind of ['segment', 'blend', 'word'] as const) outAssets.push(assetSlot(`w-${text}-${kind}`, kind, 'wav'))
    outAssets.push(assetSlot(`w-${text}-meaning-image`, 'image', 'webp'))
    taskIds.push(`${def.id}-meaning-${text}`)
    outTasks.push({ id: `${def.id}-meaning-${text}`, kind: 'listen', skill: 'meaning', role: 'model', instructionZh: '看看图片，听一听这个词。可以跟着说一说。', instructionAssetId: INSTRUCTIONS.meaning, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], wordId: `w-${text}`, stimulusAssetId: `w-${text}-word`, displayText: text, imageAssetId: `w-${text}-meaning-image` })
  }
  const blendWord = def.words.find(w => w.blend)
  if (blendWord?.blend) {
    taskIds.push(`${def.id}-blend-${blendWord.blend}`)
    outTasks.push({ id: `${def.id}-blend-${blendWord.blend}`, kind: 'listen', skill: 'blend', role: 'model', instructionZh: '听老师把声音慢慢连起来，跟着一起拼。', instructionAssetId: INSTRUCTIONS.blend, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], wordId: `w-${blendWord.blend}`, stimulusAssetId: `w-${blendWord.blend}-blend`, displayText: blendWord.blend })
  }
  const buildable = def.words.filter(w => !w.graphemes.some(g => g.endsWith('!')))
  const tileChoices = (graphemes: string[]) => {
    const used = new Map<string, number>()
    return graphemes.map(g => {
      const n = used.get(g) ?? 0
      used.set(g, n + 1)
      return { id: n === 0 ? g : `${g}-${n}`, label: g.replace(/[0-9]+$/, '').replace(/-(weak|open)$/, ''), mappingId: `g-${g}` }
    })
  }
  for (const w of buildable) {
    const tiles = tileChoices(w.graphemes)
    taskIds.push(`${def.id}-build-${w.text}`)
    outTasks.push({ id: `${def.id}-build-${w.text}`, kind: 'build', skill: 'segment', role: 'practice', instructionZh: '先听完整的词，再点字母，按声音的顺序摆好。', instructionAssetId: INSTRUCTIONS.build, choices: tiles, hintAssetIds: [`w-${w.text}-segment`, `w-${w.text}-blend`], canSkipWithHelp: true, timeline: [], wordId: `w-${w.text}`, stimulusAssetId: `w-${w.text}-word`, judge: { answerIds: tiles.map(c => c.id) } })
  }
  const oralWord = def.words.find(w => w.oral)
  if (oralWord?.oral) {
    taskIds.push(`${def.id}-oral-${oralWord.oral}`)
    outTasks.push({ id: `${def.id}-oral-${oralWord.oral}`, kind: 'oral', skill: 'oral_reading', role: 'practice', instructionZh: '试着自己读。读不出来也没关系，可以点"一起读"。', instructionAssetId: INSTRUCTIONS.oral, choices: [], hintAssetIds: [`w-${oralWord.oral}-segment`, `w-${oralWord.oral}-blend`, `w-${oralWord.oral}-word`], canSkipWithHelp: true, timeline: [], wordId: `w-${oralWord.oral}`, displayText: oralWord.oral })
  }
  const readWords = def.words.map(w => w.text)
  outReaders.push({ id: readerId, kind: 'word_cards', titleZh: '一起读词卡', introducedAt: def.id, pages: readWords.map(text => ({ text, wordIds: [`w-${text}`], audioAssetId: `w-${text}-word`, imageAssetId: `w-${text}-meaning-image` })) })
  taskIds.push(`${def.id}-read`)
  outTasks.push({ id: `${def.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: INSTRUCTIONS.read, choices: [], hintAssetIds: readWords.map(text => `w-${text}-word`), canSkipWithHelp: true, timeline: [], readerId })
  outLessons.push({
    id: def.id, order, titleZh: def.title, prerequisites: [previousId],
    newMappingIds: def.letters.map(l => `g-${l}`),
    capitals: [], exceptions: [], punctuation: [],
    allowedShapes: def.shapes, taskIds, readerIds: [readerId], parentGuideZh: GUIDE,
  })
  previousId = def.id
}

const outManifest = {
  ...manifest,
  lessonKeys: outLessons.map((l: { id: string }) => l.id),
  assetIds: outAssets.map(a => a.id),
  entryPlanKeys: entryPlans.map((e: { id: string }) => e.id),
  contentHash: null,
}
await write('mappings', outMappings)
await write('words', outWords)
await write('tasks', [...tasks, ...outTasks])
await write('lessons', outLessons)
await write('readers', [...readers, ...outReaders])
await write('assets', outAssets)
await write('manifest', outManifest)
const course = await loadCourse(dir)
outManifest.contentHash = courseHash(course)
await write('manifest', outManifest)
console.log(JSON.stringify({ lessons: outLessons.length, words: outWords.length, tasks: outTasks.length, readers: outReaders.length, assets: outAssets.length, contentHash: outManifest.contentHash }))

