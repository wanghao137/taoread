/**
 * 阶段五扩充（二轮）：L54–L61 复合元音与词尾体系，中国小学阶段（44 音素体系收尾）。
 * 只追加不改既有课；幂等重跑。拆分字素/双读音拼写分离模式同阶段四。
 * 音频槽由 produce-phonics-audio-edge 填充；图槽由 gen-phonics-art-image 填充。
 * 用法：npx tsx scripts/build-phonics-expansion2.mts
 */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

const dir = candidateDirectory
const read = async (name: string) => JSON.parse(await readFile(path.join(dir, `${name}.json`), 'utf8'))
const write = async (name: string, data: unknown) => writeFile(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2) + '\n', 'utf8')

const GUIDE = '跟随中文指令即可。先确认词义；孩子可以暂停。口头读出没有自动评分，请只补记自己实际观察到的情况。'
const HELP = 'shared-help-zh'

const NEW_MAPPINGS: Array<{ id?: string; spelling: string; display?: string; ipa: string; kind: 'vowel' | 'consonant'; position?: 'any' | 'initial' | 'final' }> = [
  { spelling: 'ou', display: 'ou', ipa: 'aʊ', kind: 'vowel' },
  { id: 'ow2', spelling: 'ow', display: 'ow', ipa: 'aʊ', kind: 'vowel' },
  { spelling: 'oi', ipa: 'ɔɪ', kind: 'vowel' },
  { spelling: 'oy', ipa: 'ɔɪ', position: 'final', kind: 'vowel' },
  { spelling: 'au', ipa: 'ɔː', kind: 'vowel' },
  { spelling: 'aw', ipa: 'ɔː', position: 'final', kind: 'vowel' },
  { spelling: 'ew', ipa: 'juː', kind: 'vowel' },
  { spelling: 'igh', ipa: 'aɪ', kind: 'vowel' },
  { id: 'y2', spelling: 'y', display: 'y', ipa: 'aɪ', position: 'final', kind: 'vowel' },
  { id: 'c2', spelling: 'c', display: 'c', ipa: 's', kind: 'consonant' },
]

interface WordDef { text: string; zh: string; blend?: string; oral?: string; graphemes: string[] }
interface LessonDef {
  id: string; title: string; letters: string[]; shapes: string[]
  words: WordDef[]
  hears?: Array<{ target: string; options: string[] }>
  caption?: Array<{ text: string; words: string[] }>
}

const LESSONS: LessonDef[] = [
  { id: 'L54', title: '惊讶的音（ou / ow）', letters: ['ou', 'ow2'], shapes: ['VC', 'CVC', 'CV', 'CCVC'], words: [
    { text: 'cow', zh: '奶牛', blend: 'cow', graphemes: ['c', 'ow2'] },
    { text: 'how', zh: '怎样', graphemes: ['h', 'ow2'] },
    { text: 'now', zh: '现在', graphemes: ['n', 'ow2'] },
    { text: 'down', zh: '向下', graphemes: ['d', 'ow2', 'n'] },
    { text: 'out', zh: '在外', oral: 'out', graphemes: ['ou', 't'] },
    { text: 'cloud', zh: '云', graphemes: ['c', 'l', 'ou', 'd'] } ] },
  { id: 'L55', title: '好吵的音（oi / oy）', letters: ['oi', 'oy'], shapes: ['VC', 'CVC', 'CV'], words: [
    { text: 'oil', zh: '油', blend: 'oil', graphemes: ['oi', 'l'] },
    { text: 'coin', zh: '硬币', graphemes: ['c', 'oi', 'n'] },
    { text: 'boy', zh: '男孩', graphemes: ['b', 'oy'] },
    { text: 'toy', zh: '玩具', graphemes: ['t', 'oy'] },
    { text: 'joy', zh: '高兴', oral: 'joy', graphemes: ['j', 'oy'] } ] },
  { id: 'L56', title: '看画的音（aw）', letters: ['au', 'aw'], shapes: ['VC', 'CVC', 'CV', 'CCV', 'CCVC'], words: [
    { text: 'saw', zh: '锯子；看见了', blend: 'saw', graphemes: ['s', 'aw'] },
    { text: 'paw', zh: '爪子', graphemes: ['p', 'aw'] },
    { text: 'draw', zh: '画画', oral: 'draw', graphemes: ['d', 'r', 'aw'] } ] },
  { id: 'L57', title: '小雨点的音（ew）', letters: ['ew'], shapes: ['VC', 'CVC', 'CV'], words: [
    { text: 'new', zh: '新的', blend: 'new', graphemes: ['n', 'ew'] },
    { text: 'few', zh: '少许', oral: 'few', graphemes: ['f', 'ew'] } ],
    reviewCards: ['new', 'few', 'moon', 'book'] },
  { id: 'L58', title: '会变声的 c', letters: ['c2'], shapes: ['VC', 'CVC'], words: [
    { text: 'ice', zh: '冰', blend: 'ice', graphemes: ['ie!', 'c2'] },
    { text: 'rice', zh: '米饭', graphemes: ['r', 'ie!', 'c2'] },
    { text: 'nice', zh: '好的', oral: 'nice', graphemes: ['n', 'ie!', 'c2'] } ] },
  { id: 'L59', title: '夜晚的音（igh / y）', letters: ['igh', 'y2'], shapes: ['VC', 'CVC', 'CV', 'CCV'], words: [
    { text: 'light', zh: '灯', blend: 'light', graphemes: ['l', 'igh', 't'] },
    { text: 'night', zh: '夜晚', graphemes: ['n', 'igh', 't'] },
    { text: 'right', zh: '右边；正确', graphemes: ['r', 'igh', 't'] },
    { text: 'high', zh: '高的', graphemes: ['h', 'igh'] },
    { text: 'sky', zh: '天空', graphemes: ['s', 'k', 'y2'] },
    { text: 'fly', zh: '飞', oral: 'fly', graphemes: ['f', 'l', 'y2'] } ] },
  { id: 'L60', title: '三连音（spr / str）', letters: [], shapes: ['VC', 'CVC', 'CCCVC'], words: [
    { text: 'spring', zh: '春天', blend: 'spring', graphemes: ['s', 'p', 'r', 'i', 'ng'] },
    { text: 'string', zh: '线', graphemes: ['s', 't', 'r', 'i', 'ng'] },
    { text: 'street', zh: '街道', oral: 'street', graphemes: ['s', 't', 'r', 'ee', 't'] } ] },
  { id: 'L61', title: '读一本长音小书', letters: [], shapes: ['VC', 'CVC', 'CV', 'CCV', 'CVCC', 'CCCVC'], words: [
    { text: 'my', zh: '我的', blend: 'my', graphemes: ['m', 'y2'] } ],
    hears: [ { target: 'oi', options: ['oi', 'oo', 'a'] }, { target: 'igh', options: ['igh', 'i', 'ee'] } ],
    caption: [
      { text: 'my toy box.', words: ['w-my', 'w-toy', 'w-box'] },
      { text: 'spring street.', words: ['w-spring', 'w-street'] },
      { text: 'my cow.', words: ['w-my', 'w-cow'] } ] },
]

// ── 幂等剥离 ────────────────────────────────────────────────────────────────
const LESSON_IDS = LESSONS.map(l => l.id)
const newWordIds = new Set(LESSONS.flatMap(l => l.words.map(w => `w-${w.text}`)))
const NEW_GRAPHEMES = NEW_MAPPINGS.map(m => m.id ?? m.spelling)
const isGenerated = (id: string) =>
  LESSON_IDS.includes(id) || /^L(5[4-9]|6[01])[-./]/.test(id) || /^r-l(5[4-9]|6[01])/.test(id) || newWordIds.has(id) ||
  NEW_GRAPHEMES.some(g => id === `sound-${g}` || id === `g-${g}`) ||
  (newWordIds.has(id.replace(/-meaning-image$/, '').replace(/-(segment|blend|word)$/, '')) && /-(segment|blend|word|meaning-image)$/.test(id))

type Row = { id: string } & Record<string, unknown>
const GEN_LESSON = /^L(5[4-9]|6[01])$/
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
for (const [i, def] of LESSONS.entries()) {
  const order = orderBase + 1 + i
  const taskIds: string[] = []
  const readerId = `r-${def.id.toLowerCase()}`
  for (const letter of def.letters) {
    outAssets.push(assetSlot(`sound-${letter}`, 'phoneme', 'wav'))
    const label = displayOf.get(letter) ?? letter
    taskIds.push(`${def.id}-model-${letter}`)
    outTasks.push({ id: `${def.id}-model-${letter}`, kind: 'listen', skill: 'mapping', role: 'model', instructionZh: '看这个字母，听它在单词里的声音。你也可以跟着试一试。', instructionAssetId: INSTRUCTIONS.model, choices: [], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${letter}`, displayText: label, stimulusAssetId: `sound-${letter}` })
    taskIds.push(`${def.id}-hear-${letter}`)
    outTasks.push({ id: `${def.id}-hear-${letter}`, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: '听声音，点一个字母。需要时可以再听一遍。', instructionAssetId: INSTRUCTIONS.hear, choices: [{ id: letter, label, mappingId: `g-${letter}` }, ...['s', 'a', 't', 'p', 'i', 'n', 'm'].filter(ch => !def.letters.includes(ch)).slice(0, 2).map(ch => ({ id: ch, label: ch, mappingId: `g-${ch}` }))], hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${letter}`, stimulusAssetId: `sound-${letter}`, judge: { answerIds: [letter] } })
  }
  for (const hear of def.hears ?? []) {
    taskIds.push(`${def.id}-hear-${hear.target}`)
    outTasks.push({ id: `${def.id}-hear-${hear.target}`, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: '听声音，点一个字母。需要时可以再听一遍。', instructionAssetId: INSTRUCTIONS.hear, choices: hear.options.map(ch => ({ id: ch, label: displayOf.get(ch) ?? ch, mappingId: `g-${ch}` })), hintAssetIds: [HELP], canSkipWithHelp: true, timeline: [], mappingId: `g-${hear.target}`, stimulusAssetId: `sound-${hear.target}`, judge: { answerIds: [hear.target] } })
  }
  for (const w of def.words) {
    const text = w.text, lower = text.toLowerCase(), last = lower.length - 1
    let pos = 0
    const spans: Array<{ ranges: Array<[number, number]>; mappingId: string }> = []
    for (const g of w.graphemes) {
      const spelling = g.endsWith('!') ? g.slice(0, -1) : g.replace(/[0-9]+$/, '')
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
  // 重复字母（street 的 t×2）：拼摆块 id 位置化去重，label 保持字母（连拼仍等于整词）
  const tileChoices = (graphemes: string[]) => {
    const used = new Map<string, number>()
    return graphemes.map(g => {
      const n = used.get(g) ?? 0
      used.set(g, n + 1)
      return { id: n === 0 ? g : `${g}-${n}`, label: displayOf.get(g) ?? g.replace(/[0-9]+$/, ''), mappingId: `g-${g}` }
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
    outTasks.push({ id: `${def.id}-oral-${oralWord.oral}`, kind: 'oral', skill: 'oral_reading', role: 'practice', instructionZh: '试着自己读。读不出来也没关系，可以点“一起读”。', instructionAssetId: INSTRUCTIONS.oral, choices: [], hintAssetIds: [`w-${oralWord.oral}-segment`, `w-${oralWord.oral}-blend`, `w-${oralWord.oral}-word`], canSkipWithHelp: true, timeline: [], wordId: `w-${oralWord.oral}`, displayText: oralWord.oral })
  }
  if (def.caption) {
    for (const [i] of def.caption.entries()) outAssets.push(assetSlot(`${readerId}-page-${i + 1}`, 'passage', 'wav'))
    outReaders.push({ id: readerId, kind: 'caption', titleZh: '长音小故事二', introducedAt: def.id, pages: def.caption.map((page, i) => ({ text: page.text, wordIds: page.words, audioAssetId: `${readerId}-page-${i + 1}` })) })
    taskIds.push(`${def.id}-read`)
    outTasks.push({ id: `${def.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: INSTRUCTIONS.read, choices: [], hintAssetIds: [...new Set(def.caption.flatMap(p => p.words))].map(id => `${id}-word`), canSkipWithHelp: true, timeline: [], readerId })
  } else {
    const readWords = def.words.map(w => w.text)
    outReaders.push({ id: readerId, kind: 'word_cards', titleZh: '一起读词卡', introducedAt: def.id, pages: readWords.map(text => ({ text, wordIds: [`w-${text}`], audioAssetId: `w-${text}-word`, imageAssetId: `w-${text}-meaning-image` })) })
    taskIds.push(`${def.id}-read`)
    outTasks.push({ id: `${def.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: INSTRUCTIONS.read, choices: [], hintAssetIds: readWords.map(text => `w-${text}-word`), canSkipWithHelp: true, timeline: [], readerId })
  }
  outLessons.push({
    id: def.id, order, titleZh: def.title, prerequisites: [`L${String(order - 1).padStart(2, '0')}`],
    newMappingIds: def.letters.map(l => `g-${l}`),
    capitals: [], exceptions: [], punctuation: def.caption ? ['.'] : [],
    allowedShapes: def.shapes, taskIds, readerIds: [readerId], parentGuideZh: GUIDE,
  })
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
console.log(JSON.stringify({ lessons: outLessons.length, words: outWords.length, tasks: (await read('tasks')).length, readers: (await read('readers')).length, assets: outAssets.length, contentHash: outManifest.contentHash }))
