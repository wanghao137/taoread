/**
 * 阶段四扩充（docs/95 续）：L42–L53 长元音体系，面向中国小学阶段英语（PEP 3-6 年级词表）。
 *
 * 只追加：不改动 L01–L41 的任何对象；重复运行先剥离上一轮生成的对象再重建（幂等）。
 * 拆分字素（magic-e）：cake=c+ae+k，ae 一个映射两段 ranges（元音位+词尾 e），无拼摆题
 * （BUILD_SPELLING 校验决定拆分词只配 听/拼/口头，见 docs/95 评估）。
 * 新音频/图槽 sha256 留空，由 produce-phonics-audio → apply-phonics-audio-candidates /
 * gen-phonics-art-image 填充。manifest 索引与 contentHash 在此重算。
 *
 * 用法：npx tsx scripts/build-phonics-expansion.mts
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const dir = candidateDirectory
const read = async (name: string) => JSON.parse(await readFile(path.join(dir, `${name}.json`), 'utf8'))
const write = async (name: string, data: unknown) => writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2) + '\n', 'utf8')

const GUIDE = '跟随中文指令即可。先确认词义；孩子可以暂停。口头读出没有自动评分，请只补记自己实际观察到的情况。'
const HELP = 'shared-help-zh'

// ── 新增 GPC：长元音（GB 体系）。split: true = 词尾不发音 e 与元音共用一个映射 ──
const NEW_MAPPINGS: Array<{ id?: string; spelling: string; display?: string; ipa: string; kind: 'vowel' | 'consonant'; position?: 'any' | 'initial' | 'final'; split?: boolean }> = [
  { spelling: 'ae', display: 'a_e', ipa: 'eɪ', position: 'final', split: true, kind: 'vowel' },
  { spelling: 'ie', display: 'i_e', ipa: 'aɪ', position: 'final', split: true, kind: 'vowel' },
  { spelling: 'oe', display: 'o_e', ipa: 'əʊ', position: 'final', split: true, kind: 'vowel' },
  { spelling: 'ue', display: 'u_e', ipa: 'juː', position: 'final', split: true, kind: 'vowel' },
  { spelling: 'ai', ipa: 'eɪ', kind: 'vowel' }, { spelling: 'ay', ipa: 'eɪ', position: 'final', kind: 'vowel' },
  { spelling: 'ee', ipa: 'iː', kind: 'vowel' }, { spelling: 'ea', ipa: 'iː', kind: 'vowel' },
  { spelling: 'oa', ipa: 'əʊ', kind: 'vowel' }, { spelling: 'ow', ipa: 'əʊ', position: 'final', kind: 'vowel' },
  { spelling: 'oo', ipa: 'uː', kind: 'vowel' }, { id: 'oo2', spelling: 'oo', display: 'oo', ipa: 'ʊ', kind: 'vowel' },
  { spelling: 'ar', ipa: 'ɑː', kind: 'vowel' }, { spelling: 'or', ipa: 'ɔː', kind: 'vowel' },
  { spelling: 'er', ipa: 'ɜː', kind: 'vowel' }, { spelling: 'ir', ipa: 'ɜː', kind: 'vowel' },
  { spelling: 'wh', ipa: 'w', position: 'initial', kind: 'consonant' },
]

interface WordDef { text: string; zh: string; blend?: string; oral?: string; graphemes?: string[] }
interface LessonDef {
  id: string; title: string
  /** 本课新授映射（spelling 或 display 名） */
  letters: string[]
  words: WordDef[]
  hears?: Array<{ target: string; options: string[] }>
  reviewBuilds?: string[]
  reviewCards?: string[]
  caption?: Array<{ text: string; words: string[] }>
  shapes: string[]
}

// 词素序列：'ae!' 表示拆分映射（元音当前位置 + 词尾 e）；其余按字素顺序拼接
const LESSONS: LessonDef[] = [
  { id: 'L42', title: '会变魔术的 e（a_e）', letters: ['ae'], shapes: ['VC', 'CVC'], words: [
    { text: 'cake', zh: '蛋糕', blend: 'cake', graphemes: ['c', 'ae!', 'k'] },
    { text: 'name', zh: '名字', graphemes: ['n', 'ae!', 'm'] },
    { text: 'game', zh: '游戏', oral: 'game', graphemes: ['g', 'ae!', 'm'] } ] },
  { id: 'L43', title: '会变魔术的 e（i_e）', letters: ['ie'], shapes: ['VC', 'CVC', 'CV', 'CCVC'], words: [
    { text: 'bike', zh: '自行车', blend: 'bike', graphemes: ['b', 'ie!', 'k'] },
    { text: 'kite', zh: '风筝', graphemes: ['k', 'ie!', 't'] },
    { text: 'five', zh: '五', graphemes: ['f', 'ie!', 'v'] } ] },
  { id: 'L44', title: '会变魔术的 e（o_e / u_e）', letters: ['oe', 'ue'], shapes: ['VC', 'CVC', 'V'], words: [
    { text: 'home', zh: '家', blend: 'home', graphemes: ['h', 'oe!', 'm'] },
    { text: 'nose', zh: '鼻子', graphemes: ['n', 'oe!', 's'] },
    { text: 'use', zh: '使用', graphemes: ['ue!', 's'] },
    { text: 'cute', zh: '可爱的', oral: 'cute', graphemes: ['c', 'ue!', 't'] } ] },
  { id: 'L45', title: '下雨的声音（ai / ay）', letters: ['ai', 'ay'], shapes: ['VC', 'CVC', 'CV', 'CCV'], words: [
    { text: 'rain', zh: '雨', blend: 'rain', graphemes: ['r', 'ai', 'n'] },
    { text: 'tail', zh: '尾巴', graphemes: ['t', 'ai', 'l'] },
    { text: 'wait', zh: '等待', graphemes: ['w', 'ai', 't'] },
    { text: 'play', zh: '玩', oral: 'play', graphemes: ['p', 'l', 'ay'] },
    { text: 'day', zh: '一天', graphemes: ['d', 'ay'] } ] },
  { id: 'L46', title: '树上的长音（ee / ea）', letters: ['ee', 'ea'], shapes: ['VC', 'CVC', 'CV', 'CCV', 'CCVC'], words: [
    { text: 'tree', zh: '树', blend: 'tree', graphemes: ['t', 'r', 'ee'] },
    { text: 'green', zh: '绿色', graphemes: ['g', 'r', 'ee', 'n'] },
    { text: 'three', zh: '三', graphemes: ['th', 'r', 'ee'] },
    { text: 'sea', zh: '大海', graphemes: ['s', 'ea'] },
    { text: 'tea', zh: '茶', oral: 'tea', graphemes: ['t', 'ea'] } ] },
  { id: 'L47', title: '小船出门了（oa / ow）', letters: ['oa', 'ow'], shapes: ['VC', 'CVC', 'CCV', 'CCVC'], words: [
    { text: 'boat', zh: '小船', blend: 'boat', graphemes: ['b', 'oa', 't'] },
    { text: 'coat', zh: '外套', graphemes: ['c', 'oa', 't'] },
    { text: 'road', zh: '马路', graphemes: ['r', 'oa', 'd'] },
    { text: 'snow', zh: '雪', oral: 'snow', graphemes: ['s', 'n', 'ow'] } ] },
  { id: 'L48', title: '长长的呜声（oo）', letters: ['oo'], shapes: ['VC', 'CVC', 'CV', 'CCVC', 'CVCC'], words: [
    { text: 'moon', zh: '月亮', blend: 'moon', graphemes: ['m', 'oo', 'n'] },
    { text: 'food', zh: '食物', graphemes: ['f', 'oo', 'd'] },
    { text: 'zoo', zh: '动物园', graphemes: ['z', 'oo'] },
    { text: 'school', zh: '学校', oral: 'school', graphemes: ['s', 'ch', 'oo', 'l'] } ] },
  { id: 'L49', title: '短短的呜声（oo）', letters: ['oo2'], shapes: ['VC', 'CVC'], words: [
    { text: 'book', zh: '书', blend: 'book', graphemes: ['b', 'oo2', 'k'] },
    { text: 'look', zh: '看', graphemes: ['l', 'oo2', 'k'] },
    { text: 'good', zh: '好的', graphemes: ['g', 'oo2', 'd'] },
    { text: 'foot', zh: '脚', oral: 'foot', graphemes: ['f', 'oo2', 't'] } ] },
  { id: 'L50', title: '医生的声音（ar）', letters: ['ar'], shapes: ['VC', 'CVC', 'CV'], words: [
    { text: 'car', zh: '小汽车', blend: 'car', graphemes: ['c', 'ar'] },
    { text: 'park', zh: '公园', graphemes: ['p', 'ar', 'k'] },
    { text: 'farm', zh: '农场', graphemes: ['f', 'ar', 'm'] },
    { text: 'arm', zh: '手臂', graphemes: ['ar', 'm'] },
    { text: 'card', zh: '卡片', oral: 'card', graphemes: ['c', 'ar', 'd'] } ] },
  { id: 'L51', title: '运动场上的音（or）', letters: ['or'], shapes: ['VC', 'CVC', 'CV', 'CCVC'], words: [
    { text: 'fork', zh: '叉子', blend: 'fork', graphemes: ['f', 'or', 'k'] },
    { text: 'short', zh: '短的', graphemes: ['sh', 'or', 't'] },
    { text: 'sport', zh: '运动', oral: 'sport', graphemes: ['s', 'p', 'or', 't'] } ] },
  { id: 'L52', title: '转圈圈的音（er / ir）', letters: ['er', 'ir'], shapes: ['VC', 'CVC', 'CV', 'CVCC'], words: [
    { text: 'her', zh: '她的', blend: 'her', graphemes: ['h', 'er'] },
    { text: 'girl', zh: '女孩', graphemes: ['g', 'ir', 'l'] },
    { text: 'bird', zh: '鸟', graphemes: ['b', 'ir', 'd'] },
    { text: 'shirt', zh: '衬衫', oral: 'shirt', graphemes: ['sh', 'ir', 't'] } ] },
  { id: 'L53', title: '读一本长音小书', letters: ['wh'], shapes: ['VC', 'CVC', 'CV', 'CCVC'], words: [
    { text: 'what', zh: '什么', blend: 'what', graphemes: ['wh', 'a', 't'] },
    { text: 'when', zh: '什么时候', graphemes: ['wh', 'e', 'n'] },
    { text: 'white', zh: '白色的', graphemes: ['wh', 'ie!', 't'] },
    { text: 'wheel', zh: '轮子', oral: 'wheel', graphemes: ['wh', 'ee', 'l'] } ],
    hears: [ { target: 'oo2', options: ['oo2', 'oo', 'a'] } ],
    caption: [
      { text: 'white cake.', words: ['w-white', 'w-cake'] },
      { text: 'green bike.', words: ['w-green', 'w-bike'] },
      { text: 'what when.', words: ['w-what', 'w-when'] } ] },
]

// ── 幂等剥离上一轮生成对象 ──────────────────────────────────────────────────
const LESSON_IDS = LESSONS.map(l => l.id)
const newWordIds = new Set(LESSONS.flatMap(l => l.words.map(w => `w-${w.text}`)))
const NEW_GRAPHEMES = NEW_MAPPINGS.map(m => m.id ?? m.spelling)
const isGenerated = (id: string) =>
  LESSON_IDS.includes(id) || /^L4[2-9][-.]|^L5[0-3][-./]/.test(id) || /^r-l(4[2-9]|5[0-3])/.test(id) || newWordIds.has(id) ||
  NEW_GRAPHEMES.some(g => id === `sound-${g}` || id === `g-${g}`) ||
  (newWordIds.has(id.replace(/-meaning-image$/, '').replace(/-(segment|blend|word)$/, '')) && /-(segment|blend|word|meaning-image)$/.test(id))

type Row = { id: string } & Record<string, unknown>
const GEN_LESSON = /^L(4[2-9]|5[0-3])$/
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
  id: `g-${m.id ?? m.spelling}`, spelling: m.spelling, display: m.display ?? m.spelling,
  phonemes: [{ ipa: m.ipa, kind: m.kind }], accent: 'GB', positionCondition: m.position ?? 'any',
}))]
const displayOf = new Map(NEW_MAPPINGS.map(m => [m.id ?? m.spelling, m.display ?? m.spelling]))
const splitOf = new Set(NEW_MAPPINGS.filter(m => m.split).map(m => m.id ?? m.spelling))

const outWords = [...words]
const outAssets = [...assets]
const outTasks: Array<Record<string, unknown>> = [], outReaders: Array<Record<string, unknown>> = []
const INSTRUCTIONS = { model: 'inst-model-zh', hear: 'inst-hear-zh', meaning: 'inst-meaning-zh', blend: 'inst-blend-zh', build: 'inst-build-zh', oral: 'inst-oral-zh', read: 'inst-read-zh' }

const assetSlot = (id: string, purpose: string, extension: 'wav' | 'webp') => ({
  id, purpose, accent: purpose === 'instruction_zh' ? 'zh' : 'GB', sha256: null, extension,
  durationMs: null, speakerId: null, revision: 1, sourceLicense: null, reviewStatus: 'pending', fixture: false,
})

const wordByLesson = new Map<string, WordDef[]>()
for (const def of LESSONS) wordByLesson.set(def.id, def.words)
for (const def of LESSONS) {
  for (const w of def.words) {
    const text = w.text, lower = text.toLowerCase(), last = lower.length - 1
    let pos = 0
    const spans: Array<{ ranges: Array<[number, number]>; mappingId: string }> = []
    for (const g of w.graphemes ?? []) {
      if (g.endsWith('!')) {
        const base = g.slice(0, -1)
        spans.push({ ranges: [[pos, pos + 1], [last, last + 1]], mappingId: `g-${base}` })
        pos += 1
      } else {
        const spelling = g.replace(/[0-9]+$/, '')
        spans.push({ ranges: [[pos, pos + spelling.length]], mappingId: `g-${g}` })
        pos += spelling.length
      }
    }
    const splitCount = (w.graphemes ?? []).filter(g => g.endsWith('!')).length
    if (pos + splitCount !== lower.length) throw new Error(`字素未覆盖整词: ${text} (${pos}+${splitCount}/${lower.length})`)
    outWords.push({
      id: `w-${text}`, text, meaningZh: w.zh, meaningIntroducedAt: def.id, decodingIntroducedAt: def.id,
      spans, audioIds: { segment: `w-${text}-segment`, blend: `w-${text}-blend`, word: `w-${text}-word` },
    })
    for (const kind of ['segment', 'blend', 'word'] as const) outAssets.push(assetSlot(`w-${text}-${kind}`, kind, 'wav'))
    outAssets.push(assetSlot(`w-${text}-meaning-image`, 'image', 'webp'))
  }
  for (const letter of def.letters) outAssets.push(assetSlot(`sound-${letter}`, 'phoneme', 'wav'))
}

const outLessons = [...lessons]
const orderBase = Math.max(...(lessons as unknown as Array<{ order: number }>).map(l => l.order))
for (const [i, def] of LESSONS.entries()) {
  const order = orderBase + 1 + i
  const taskIds: string[] = []
  const readerId = `r-${def.id.toLowerCase()}`

  // 新音示范 + 听音辨字母/组合
  for (const letter of def.letters) {
    taskIds.push(`${def.id}-model-${letter}`)
    outTasks.push({ id: `${def.id}-model-${letter}`, kind: 'listen', skill: 'mapping', role: 'model', instructionZh: '看这个字母，听它在单词里的声音。你也可以跟着试一试。', instructionAssetId: INSTRUCTIONS.model, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${letter}`, displayText: displayOf.get(letter) ?? letter, stimulusAssetId: `sound-${letter}` })
    const target = displayOf.get(letter) ?? letter
    taskIds.push(`${def.id}-hear-${letter}`)
    outTasks.push({ id: `${def.id}-hear-${letter}`, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: '听声音，点一个字母。需要时可以再听一遍。', instructionAssetId: INSTRUCTIONS.hear, choices: [{ id: letter, label: target, mappingId: `g-${letter}` }, ...['s', 'a', 't', 'p', 'i', 'n', 'm'].filter(ch => !def.letters.includes(ch)).slice(0, 2).map(ch => ({ id: ch, label: ch, mappingId: `g-${ch}` }))], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${letter}`, stimulusAssetId: `sound-${letter}`, judge: { answerIds: [letter] } })
  }
  for (const hear of def.hears ?? []) {
    taskIds.push(`${def.id}-hear-${hear.target}`)
    outTasks.push({ id: `${def.id}-hear-${hear.target}`, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: '听声音，点一个字母。需要时可以再听一遍。', instructionAssetId: INSTRUCTIONS.hear, choices: hear.options.map(ch => ({ id: ch, label: displayOf.get(ch) ?? ch, mappingId: `g-${ch}` })), hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${hear.target}`, stimulusAssetId: `sound-${hear.target}`, judge: { answerIds: [hear.target] } })
  }
  for (const w of def.words) {
    taskIds.push(`${def.id}-meaning-${w.text}`)
    outTasks.push({ id: `${def.id}-meaning-${w.text}`, kind: 'listen', skill: 'meaning', role: 'model', instructionZh: '看看图片，听一听这个词。可以跟着说一说。', instructionAssetId: INSTRUCTIONS.meaning, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], wordId: `w-${w.text}`, stimulusAssetId: `w-${w.text}-word`, displayText: w.text, imageAssetId: `w-${w.text}-meaning-image` })
  }
  const blendWord = def.words.find(w => w.blend)
  if (blendWord?.blend) {
    taskIds.push(`${def.id}-blend-${blendWord.blend}`)
    outTasks.push({ id: `${def.id}-blend-${blendWord.blend}`, kind: 'listen', skill: 'blend', role: 'model', instructionZh: '听老师把声音慢慢连起来，跟着一起拼。', instructionAssetId: INSTRUCTIONS.blend, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], wordId: `w-${blendWord.blend}`, stimulusAssetId: `w-${blendWord.blend}-blend`, displayText: blendWord.blend })
  }
  // 拼摆题：只用非拆分映射词（BUILD_SPELLING 校验：字素标签连拼必须等于整词）
  const buildable = def.words.filter(w => !(w.graphemes ?? []).some(g => g.endsWith('!')))
  for (const w of buildable) {
    const graphemes = w.graphemes ?? []
    taskIds.push(`${def.id}-build-${w.text}`)
    outTasks.push({ id: `${def.id}-build-${w.text}`, kind: 'build', skill: 'segment', role: 'practice', instructionZh: '先听完整的词，再点字母，按声音的顺序摆好。', instructionAssetId: INSTRUCTIONS.build, choices: graphemes.map(g => ({ id: g, label: displayOf.get(g) ?? g, mappingId: `g-${g}` })), hintAssetIds: [`w-${w.text}-segment`, `w-${w.text}-blend`], canSkipWithHelp: true, timeline: [], wordId: `w-${w.text}`, stimulusAssetId: `w-${w.text}-word`, judge: { answerIds: graphemes } })
  }
  const oralWord = def.words.find(w => w.oral)
  if (oralWord?.oral) {
    taskIds.push(`${def.id}-oral-${oralWord.oral}`)
    outTasks.push({ id: `${def.id}-oral-${oralWord.oral}`, kind: 'oral', skill: 'oral_reading', role: 'practice', instructionZh: '试着自己读。读不出来也没关系，可以点“一起读”。', instructionAssetId: INSTRUCTIONS.oral, choices: [], hintAssetIds: [`w-${oralWord.oral}-segment`, `w-${oralWord.oral}-blend`, `w-${oralWord.oral}-word`], canSkipWithHelp: true, timeline: [], wordId: `w-${oralWord.oral}`, displayText: oralWord.oral })
  }
  if (def.caption) {
    for (const [i] of def.caption.entries()) outAssets.push(assetSlot(`${readerId}-page-${i + 1}`, 'passage', 'wav'))
    outReaders.push({ id: readerId, kind: 'caption', titleZh: '长音小故事', introducedAt: def.id, pages: def.caption.map((page, i) => ({ text: page.text, wordIds: page.words, audioAssetId: `${readerId}-page-${i + 1}` })) })
    taskIds.push(`${def.id}-read`)
    outTasks.push({ id: `${def.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: INSTRUCTIONS.read, choices: [], hintAssetIds: [...new Set(def.caption.flatMap(p => p.words))].map(id => `${id}-word`), canSkipWithHelp: true, timeline: [], readerId })
  } else {
    const readWords = def.reviewCards ?? def.words.map(w => w.text)
    outReaders.push({ id: readerId, kind: 'word_cards', titleZh: '一起读词卡', introducedAt: def.id, pages: readWords.map(text => ({ text, wordIds: [`w-${text}`], audioAssetId: `w-${text}-word`, imageAssetId: `w-${text}-meaning-image` })) })
    taskIds.push(`${def.id}-read`)
    outTasks.push({ id: `${def.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: INSTRUCTIONS.read, choices: [], hintAssetIds: readWords.map(text => `w-${text}-word`), canSkipWithHelp: true, timeline: [], readerId })
  }

  outLessons.push({
    id: def.id, order, titleZh: def.title, prerequisites: [orderBase === 0 ? 'L01' : `L${String(order - 1).padStart(2, '0')}`],
    newMappingIds: def.letters.map(l => `g-${l}`),
    capitals: [], exceptions: [], punctuation: def.caption ? ['.'] : [],
    allowedShapes: def.shapes, taskIds, readerIds: [readerId], parentGuideZh: GUIDE,
  })
}

const outTasksAll = [...tasks, ...outTasks]
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
const course = await loadCourse(dir)
outManifest.contentHash = courseHash(course)
await write('manifest', outManifest)
console.log(JSON.stringify({ lessons: outLessons.length, words: outWords.length, tasks: outTasksAll.length, readers: outReadersAll.length, assets: outAssets.length, contentHash: outManifest.contentHash }))
