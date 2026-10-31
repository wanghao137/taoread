import { courseHash } from '../../src/modules/phonics/v2/courseRegistry'
import { taskSchema, type PhonicsCourse, type PhonicsLesson, type PhonicsTask } from '../../src/modules/phonics/v2/contracts'

type Mapping = PhonicsCourse['mappings'][number]
type Asset = PhonicsCourse['assets'][number]
type Word = PhonicsCourse['words'][number]
type WordDef = { text: string; meaning: string; mappings: string[] }
type LessonDef = { id: string; title: string; mappings: string[]; words: WordDef[] }

const alphabetGroups = ['ABCD', 'EFGH', 'IJKL', 'MNOP', 'QRST', 'UVWX', 'YZ']
const instruction = {
  letterModel: '看看大小写，听一听这个字母的名称。',
  letterUpper: '听字母的名称，选出对应的大写字母。',
  letterLower: '听字母的名称，选出对应的小写字母。',
  bath: '在这个英式单词中，字母 a 发长音。不同口音可能不一样。',
  voicedS: '有些单词里的 s 发和 z 一样的声音，听一听。',
  schoolCh: '在 school 里，ch 发 k 的声音。',
  roundedA: '在 what 里，a 发和短 o 相近的声音。',
  intonation: '听一听，选择声音对应的标点。',
  phonemeContrast: '听声音，选出开头发这个声音的词。',
}

const mappings: Array<{ id: string; spelling: string; ipa: Array<[string, 'vowel' | 'consonant']>; position?: Mapping['positionCondition']; sound?: string }> = [
  { id: 'th2', spelling: 'th', ipa: [['ð', 'consonant']] },
  { id: 'ur', spelling: 'ur', ipa: [['ɜː', 'vowel']] },
  { id: 'air', spelling: 'air', ipa: [['eə', 'vowel']] },
  { id: 'ear', spelling: 'ear', ipa: [['ɪə', 'vowel']] },
  { id: 'y3', spelling: 'y', ipa: [['i', 'vowel']], position: 'final' },
  { id: 'pp', spelling: 'pp', ipa: [['p', 'consonant']], sound: 'sound-p' },
  { id: 'a-open', spelling: 'a', ipa: [['eɪ', 'vowel']], sound: 'sound-ae' },
  { id: 'e-open', spelling: 'e', ipa: [['iː', 'vowel']], position: 'final', sound: 'sound-ee' },
  { id: 'ph', spelling: 'ph', ipa: [['f', 'consonant']], sound: 'sound-f' },
  { id: 'kn', spelling: 'kn', ipa: [['n', 'consonant']], position: 'initial', sound: 'sound-n' },
  { id: 'wr', spelling: 'wr', ipa: [['r', 'consonant']], position: 'initial', sound: 'sound-r' },
  { id: 'nk', spelling: 'nk', ipa: [['ŋ', 'consonant'], ['k', 'consonant']] },
  { id: 'le', spelling: 'le', ipa: [['ə', 'vowel'], ['l', 'consonant']], position: 'final' },
  { id: 'tt', spelling: 'tt', ipa: [['t', 'consonant']], sound: 'sound-t' },
  { id: 'a-all', spelling: 'a', ipa: [['ɔː', 'vowel']], sound: 'sound-aw' },
  { id: 'er-weak', spelling: 'er', ipa: [['ə', 'vowel']], position: 'final' },
  { id: 'o2', spelling: 'o', ipa: [['ʌ', 'vowel']], sound: 'sound-u' },
]

const lessons: LessonDef[] = [
  { id: 'L62', title: 'th 的两个声音', mappings: ['th2'], words: [
    { text: 'this', meaning: '这个', mappings: ['th2', 'i', 's'] },
    { text: 'that', meaning: '那个', mappings: ['th2', 'a', 't'] },
    { text: 'them', meaning: '他们；它们', mappings: ['th2', 'e', 'm'] },
  ] },
  { id: 'L63', title: '转圈圈的音（ur）', mappings: ['ur'], words: [
    { text: 'fur', meaning: '毛皮', mappings: ['f', 'ur'] },
    { text: 'turn', meaning: '转动', mappings: ['t', 'ur', 'n'] },
  ] },
  { id: 'L64', title: '空气里的音（air）', mappings: ['air'], words: [
    { text: 'air', meaning: '空气', mappings: ['air'] },
    { text: 'hair', meaning: '头发', mappings: ['h', 'air'] },
    { text: 'chair', meaning: '椅子', mappings: ['ch', 'air'] },
  ] },
  { id: 'L65', title: '听见的音（ear）', mappings: ['ear'], words: [
    { text: 'ear', meaning: '耳朵', mappings: ['ear'] },
    { text: 'near', meaning: '在附近', mappings: ['n', 'ear'] },
    { text: 'hear', meaning: '听见', mappings: ['h', 'ear'] },
  ] },
  { id: 'L66', title: '词尾轻轻的 y', mappings: ['y3', 'pp', 'a-open'], words: [
    { text: 'happy', meaning: '高兴的', mappings: ['h', 'a', 'pp', 'y3'] },
    { text: 'puppy', meaning: '小狗', mappings: ['p', 'u', 'pp', 'y3'] },
    { text: 'baby', meaning: '婴儿', mappings: ['b', 'a-open', 'b', 'y3'] },
  ] },
  { id: 'L67', title: '词尾长音 e', mappings: ['e-open'], words: [
    { text: 'he', meaning: '他', mappings: ['h', 'e-open'] },
    { text: 'she', meaning: '她', mappings: ['sh', 'e-open'] },
    { text: 'we', meaning: '我们', mappings: ['w', 'e-open'] },
    { text: 'me', meaning: '我', mappings: ['m', 'e-open'] },
  ] },
  { id: 'L68', title: 'ph 的声音', mappings: ['ph'], words: [
    { text: 'phone', meaning: '电话', mappings: ['ph', 'oe', 'n'] },
    { text: 'dolphin', meaning: '海豚', mappings: ['d', 'o', 'l', 'ph', 'i', 'n'] },
  ] },
  { id: 'L69', title: '开头的 kn', mappings: ['kn'], words: [
    { text: 'knee', meaning: '膝盖', mappings: ['kn', 'ee'] },
    { text: 'knock', meaning: '敲', mappings: ['kn', 'o', 'ck'] },
  ] },
  { id: 'L70', title: '开头的 wr', mappings: ['wr'], words: [
    { text: 'write', meaning: '写', mappings: ['wr', 'ie', 't'] },
    { text: 'wrist', meaning: '手腕', mappings: ['wr', 'i', 's', 't'] },
  ] },
  { id: 'L71', title: '连在一起的 nk', mappings: ['nk'], words: [
    { text: 'pink', meaning: '粉红色', mappings: ['p', 'i', 'nk'] },
    { text: 'sink', meaning: '水槽', mappings: ['s', 'i', 'nk'] },
  ] },
  { id: 'L72', title: '词尾的 le', mappings: ['le', 'tt'], words: [
    { text: 'apple', meaning: '苹果', mappings: ['a', 'pp', 'le'] },
    { text: 'little', meaning: '小的', mappings: ['l', 'i', 'tt', 'le'] },
  ] },
  { id: 'L73', title: '开头两个辅音连起来', mappings: [], words: [
    { text: 'brown', meaning: '棕色', mappings: ['b', 'r', 'ow2', 'n'] },
    { text: 'brush', meaning: '刷子', mappings: ['b', 'r', 'u', 'sh'] },
  ] },
  { id: 'L74', title: 'all 里的长音', mappings: ['a-all'], words: [
    { text: 'all', meaning: '全部', mappings: ['a-all', 'll'] },
    { text: 'tall', meaning: '高的', mappings: ['t', 'a-all', 'll'] },
    { text: 'small', meaning: '小的', mappings: ['s', 'm', 'a-all', 'll'] },
  ] },
  { id: 'L75', title: '词尾轻轻的 er', mappings: ['er-weak', 'o2'], words: [
    { text: 'sister', meaning: '姐姐；妹妹', mappings: ['s', 'i', 's', 't', 'er-weak'] },
    { text: 'mother', meaning: '妈妈', mappings: ['m', 'o2', 'th2', 'er-weak'] },
    { text: 'brother', meaning: '哥哥；弟弟', mappings: ['b', 'r', 'o2', 'th2', 'er-weak'] },
    { text: 'teacher', meaning: '老师', mappings: ['t', 'ea', 'ch', 'er-weak'] },
  ] },
]

export function buildPrimaryCandidate(source: PhonicsCourse): PhonicsCourse {
  const course = structuredClone(source)
  if (course.manifest.versionId !== 'taoread-phonics-gb-v1' || course.lessons.length !== 61 || course.words.length !== 166) throw new Error('Unexpected source course; inspect it before rebuilding the primary candidate')
  course.manifest.versionId = 'taoread-phonics-gb-v2'
  course.manifest.status = 'draft'
  course.manifest.contentHash = null
  course.reviews = []

  const addAsset = (id: string, purpose: Asset['purpose']) => {
    if (course.assets.some(asset => asset.id === id)) throw new Error(`Duplicate asset ${id}`)
    course.assets.push({ id, purpose, accent: purpose === 'instruction_zh' ? 'zh' : 'GB', sha256: null, extension: purpose === 'image' ? 'webp' : 'wav', durationMs: null, speakerId: null, revision: 1, sourceLicense: null, reviewStatus: 'pending', fixture: false })
  }
  const addTask = (task: Partial<PhonicsTask> & Pick<PhonicsTask, 'id' | 'kind' | 'skill' | 'role' | 'instructionZh' | 'instructionAssetId'>) => {
    const parsed = taskSchema.parse({ choices: [], hintAssetIds: ['shared-help-zh'], canSkipWithHelp: true, timeline: [], ...task })
    course.tasks.push(parsed)
    return parsed.id
  }
  const addMapping = (id: string, spelling: string, ipa: Array<[string, 'vowel' | 'consonant']>, positionCondition: Mapping['positionCondition'] = 'any') => {
    const mapping: Mapping = { id: `g-${id}`, spelling, display: spelling, phonemes: ipa.map(([phone, kind]) => ({ ipa: phone, kind })), accent: 'GB', positionCondition }
    if (course.mappings.some(item => item.id === mapping.id)) throw new Error(`Duplicate mapping ${mapping.id}`)
    course.mappings.push(mapping)
  }
  const getLesson = (id: string) => {
    const lesson = course.lessons.find(item => item.id === id)
    if (!lesson) throw new Error(`Missing lesson ${id}`)
    return lesson
  }

  for (const key of Object.keys(instruction)) addAsset(`primary-inst-${key}`, 'instruction_zh')
  const alphabet: PhonicsLesson[] = []
  let seenLetters = ''
  for (const [index, group] of alphabetGroups.entries()) {
    const id = `A${String(index + 1).padStart(2, '0')}`
    const taskIds: string[] = []
    for (const letter of group) {
      const lower = letter.toLowerCase(), sound = `letter-name-${lower}`
      addAsset(sound, 'letter_name')
      taskIds.push(addTask({ id: `${id}-model-${lower}`, kind: 'listen', skill: 'letter_name', role: 'model', instructionZh: instruction.letterModel, instructionAssetId: 'primary-inst-letterModel', stimulusAssetId: sound, displayText: `${letter} ${lower}`, letterName: letter, teachesCapitals: [letter] }))
    }
    const available = seenLetters + group
    for (const [letterIndex, letter] of [...group].entries()) {
      const lower = letter.toLowerCase(), distractors = [...available].filter(item => item !== letter).slice(-2)
      for (const mode of ['Upper', 'Lower'] as const) {
        const items = [letter, ...distractors]
        const rotate = letterIndex % items.length
        const choices = [...items.slice(rotate), ...items.slice(0, rotate)].map(item => ({ id: item.toLowerCase(), label: mode === 'Upper' ? item : item.toLowerCase() }))
        taskIds.push(addTask({ id: `${id}-${mode.toLowerCase()}-${lower}`, kind: 'choice', skill: 'letter_name', role: 'practice', instructionZh: mode === 'Upper' ? instruction.letterUpper : instruction.letterLower, instructionAssetId: `primary-inst-letter${mode}`, stimulusAssetId: `letter-name-${lower}`, letterName: letter, choices, judge: { answerIds: [lower] } }))
      }
    }
    alphabet.push({ id, order: index + 1, titleZh: `字母 ${[...group].join(' ')}`, prerequisites: index ? [alphabet[index - 1]!.id] : [], newMappingIds: [], capitals: [...group], exceptions: [], punctuation: [], allowedShapes: [], taskIds, readerIds: [], parentGuideZh: '字母名称和字母在单词里的声音是不同的。孩子可以先听，再按自己的节奏尝试。' })
    seenLetters = available
  }
  for (const lesson of course.lessons) lesson.order += alphabet.length
  getLesson('L01').prerequisites = [alphabet[alphabet.length - 1]!.id]
  course.lessons.unshift(...alphabet)

  const corrections = [
    { lesson: 'L39', id: 'a-bath', spelling: 'a', ipa: 'ɑː', kind: 'vowel' as const, sound: 'sound-ar', word: 'bath', index: 1, text: instruction.bath, instruction: 'bath' },
    { lesson: 'L44', id: 's-voiced', spelling: 's', ipa: 'z', kind: 'consonant' as const, sound: 'sound-z', word: 'nose', index: 2, text: instruction.voicedS, instruction: 'voicedS' },
    { lesson: 'L48', id: 'ch-k', spelling: 'ch', ipa: 'k', kind: 'consonant' as const, sound: 'sound-c', word: 'school', index: 1, text: instruction.schoolCh, instruction: 'schoolCh' },
    { lesson: 'L53', id: 'a-rounded', spelling: 'a', ipa: 'ɒ', kind: 'vowel' as const, sound: 'sound-o', word: 'what', index: 1, text: instruction.roundedA, instruction: 'roundedA' },
  ]
  for (const correction of corrections) {
    const lesson = getLesson(correction.lesson), mappingId = `g-${correction.id}`
    addMapping(correction.id, correction.spelling, [[correction.ipa, correction.kind]])
    lesson.newMappingIds.push(mappingId)
    const model = addTask({ id: `${correction.lesson}-primary-${correction.id}`, kind: 'listen', skill: 'mapping', role: 'model', instructionZh: correction.text, instructionAssetId: `primary-inst-${correction.instruction}`, stimulusAssetId: correction.sound, mappingId, displayText: correction.spelling })
    lesson.taskIds.unshift(model)
    const word = course.words.find(item => item.text.toLowerCase() === correction.word)
    if (!word) throw new Error(`Missing word ${correction.word}`)
    word.spans[correction.index]!.mappingId = mappingId
  }
  course.words.find(word => word.text === 'use')!.spans[1]!.mappingId = 'g-s-voiced'
  for (const [taskId, label, mappingId] of [['L48-build-school', 'ch', 'g-ch-k'], ['L53-build-what', 'a', 'g-a-rounded']] as const) {
    const choice = course.tasks.find(task => task.id === taskId)?.choices.find(item => item.label === label)
    if (!choice) throw new Error(`Missing choice ${taskId}`)
    choice.mappingId = mappingId
  }
  const ooChoices = course.tasks.find(task => task.id === 'L53-hear-oo2')?.choices
  if (!ooChoices) throw new Error('Missing oo contrast')
  for (const choice of ooChoices) {
    if (choice.id === 'oo2') choice.label = 'oo (book)'
    if (choice.id === 'oo') choice.label = 'oo (moon)'
  }

  const definitions = new Map(mappings.map(mapping => [mapping.id, mapping]))
  const addLesson = (definition: LessonDef) => {
    const taskIds: string[] = [], newMappingIds: string[] = []
    for (const id of definition.mappings) {
      const mapping = definitions.get(id)!
      addMapping(mapping.id, mapping.spelling, mapping.ipa, mapping.position)
      const mappingId = `g-${id}`, sound = mapping.sound ?? `sound-${id}`
      if (!mapping.sound) addAsset(sound, 'phoneme')
      newMappingIds.push(mappingId)
      taskIds.push(addTask({ id: `${definition.id}-model-${id}`, kind: 'listen', skill: 'mapping', role: 'model', instructionZh: '看这个字母，听它在单词里的声音。你也可以跟着试一试。', instructionAssetId: 'inst-model-zh', stimulusAssetId: sound, mappingId, displayText: mapping.spelling }))
      const distractors = ['s', 'a', 't'].filter(item => item !== mapping.spelling).slice(0, 2)
      taskIds.push(addTask({ id: `${definition.id}-hear-${id}`, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: '听声音，点一个字母。需要时可以再听一遍。', instructionAssetId: 'inst-hear-zh', stimulusAssetId: sound, mappingId, choices: [{ id, label: mapping.spelling, mappingId }, ...distractors.map(item => ({ id: item, label: item, mappingId: `g-${item}` }))], judge: { answerIds: [id] } }))
    }
    const readerId = `r-${definition.id.toLowerCase()}`, shapes = new Set<string>()
    for (const wordDef of definition.words) {
      if (course.words.some(word => word.text.toLowerCase() === wordDef.text)) throw new Error(`Duplicate word ${wordDef.text}`)
      const wordId = `w-${wordDef.text}`, spans: Word['spans'] = []
      let position = 0, splitCount = 0
      for (const key of wordDef.mappings) {
        const mapping = course.mappings.find(item => item.id === `g-${key}`)
        if (!mapping) throw new Error(`Unknown mapping ${key}`)
        if (['ae', 'ie', 'oe', 'ue'].includes(key)) {
          if (wordDef.text[position] !== mapping.spelling[0] || wordDef.text.at(-1) !== mapping.spelling[1]) throw new Error(`Invalid split spelling ${wordDef.text}`)
          spans.push({ mappingId: mapping.id, ranges: [[position, position + 1], [wordDef.text.length - 1, wordDef.text.length]] })
          position++; splitCount++
        } else {
          if (wordDef.text.slice(position, position + mapping.spelling.length) !== mapping.spelling) throw new Error(`Invalid spelling ${wordDef.text}: ${key}`)
          spans.push({ mappingId: mapping.id, ranges: [[position, position + mapping.spelling.length]] })
          position += mapping.spelling.length
        }
      }
      if (position + splitCount !== wordDef.text.length) throw new Error(`Incomplete spelling ${wordDef.text}`)
      const shape = spans.map(span => course.mappings.find(mapping => mapping.id === span.mappingId)!.phonemes.map(phone => phone.kind === 'vowel' ? 'V' : 'C').join('')).join('')
      shapes.add(shape)
      course.words.push({ id: wordId, text: wordDef.text, meaningZh: wordDef.meaning, meaningIntroducedAt: definition.id, decodingIntroducedAt: definition.id, spans, audioIds: { segment: `${wordId}-segment`, blend: `${wordId}-blend`, word: `${wordId}-word` } })
      for (const kind of ['segment', 'blend', 'word'] as const) addAsset(`${wordId}-${kind}`, kind)
      addAsset(`${wordId}-meaning-image`, 'image')
      taskIds.push(addTask({ id: `${definition.id}-meaning-${wordDef.text}`, kind: 'listen', skill: 'meaning', role: 'model', instructionZh: '看看图片，听一听这个词。可以跟着说一说。', instructionAssetId: 'inst-meaning-zh', stimulusAssetId: `${wordId}-word`, wordId, displayText: wordDef.text, imageAssetId: `${wordId}-meaning-image` }))
      if (!wordDef.mappings.some(key => ['ae', 'ie', 'oe', 'ue'].includes(key))) {
        const used = new Map<string, number>()
        const choices = wordDef.mappings.map(key => {
          const count = used.get(key) ?? 0; used.set(key, count + 1)
          return { id: count ? `${key}-${count}` : key, label: course.mappings.find(mapping => mapping.id === `g-${key}`)!.spelling, mappingId: `g-${key}` }
        })
        taskIds.push(addTask({ id: `${definition.id}-build-${wordDef.text}`, kind: 'build', skill: 'segment', role: 'practice', instructionZh: '先听完整的词，再点字母，按声音的顺序摆好。', instructionAssetId: 'inst-build-zh', stimulusAssetId: `${wordId}-word`, hintAssetIds: [`${wordId}-segment`, `${wordId}-blend`], wordId, choices, judge: { answerIds: choices.map(choice => choice.id) } }))
      }
    }
    if (definition.id === 'L62') {
      for (const [suffix, mappingId, stimulusAssetId, answer] of [['voiced', 'g-th2', 'sound-th2', 'this'], ['unvoiced', 'g-th', 'sound-th', 'thin']] as const) {
        taskIds.push(addTask({ id: `${definition.id}-contrast-${suffix}`, kind: 'choice', skill: 'mapping', role: 'practice', instructionZh: instruction.phonemeContrast, instructionAssetId: 'primary-inst-phonemeContrast', stimulusAssetId, mappingId, choices: [{ id: 'this', label: 'this' }, { id: 'thin', label: 'thin' }], judge: { answerIds: [answer] } }))
      }
    }
    const first = definition.words[0]!
    taskIds.push(addTask({ id: `${definition.id}-blend-${first.text}`, kind: 'listen', skill: 'blend', role: 'model', instructionZh: '听老师把声音慢慢连起来，跟着一起拼。', instructionAssetId: 'inst-blend-zh', stimulusAssetId: `w-${first.text}-blend`, wordId: `w-${first.text}`, displayText: first.text }))
    course.readers.push({ id: readerId, kind: 'word_cards', titleZh: '一起读词卡', introducedAt: definition.id, pages: definition.words.map(word => ({ text: word.text, wordIds: [`w-${word.text}`], audioAssetId: `w-${word.text}-word`, imageAssetId: `w-${word.text}-meaning-image` })) })
    taskIds.push(addTask({ id: `${definition.id}-read`, kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: 'inst-read-zh', hintAssetIds: definition.words.map(word => `w-${word.text}-word`), readerId }))
    course.lessons.push({ id: definition.id, order: course.lessons.length + 1, titleZh: definition.title, prerequisites: [course.lessons[course.lessons.length - 1]!.id], newMappingIds, capitals: [], exceptions: [], punctuation: [], allowedShapes: [...shapes], taskIds, readerIds: [readerId], parentGuideZh: '先听声音，再看词义和拼写。口头尝试不自动评分，孩子可以随时暂停。' })
  }
  for (const definition of lessons) addLesson(definition)

  const readerId = 'r-l76'
  addAsset(`${readerId}-statement`, 'passage'); addAsset(`${readerId}-question`, 'passage')
  course.readers.push({ id: readerId, kind: 'caption', titleZh: '听听语气', introducedAt: 'L76', pages: [
    { text: 'Sam can run.', wordIds: ['w-sam', 'w-can', 'w-run'], audioAssetId: `${readerId}-statement` },
    { text: 'Sam can run?', wordIds: ['w-sam', 'w-can', 'w-run'], audioAssetId: `${readerId}-question` },
  ] })
  const question = addTask({ id: 'L76-hear-question', kind: 'choice', skill: 'oral_reading', role: 'practice', instructionZh: instruction.intonation, instructionAssetId: 'primary-inst-intonation', stimulusAssetId: `${readerId}-question`, choices: [{ id: 'question', label: '?' }, { id: 'statement', label: '.' }], judge: { answerIds: ['question'] } })
  const read = addTask({ id: 'L76-read', kind: 'read', skill: 'oral_reading', role: 'practice', instructionZh: '看看这一页，试着读一读。需要时一起读。', instructionAssetId: 'inst-read-zh', hintAssetIds: ['w-sam-word', 'w-can-word', 'w-run-word'], readerId })
  course.lessons.push({ id: 'L76', order: course.lessons.length + 1, titleZh: '听一听句子的语气', prerequisites: ['L75'], newMappingIds: [], capitals: [], exceptions: [], punctuation: ['?'], allowedShapes: ['CVC'], taskIds: [question, read], readerIds: [readerId], parentGuideZh: '先听陈述和提问的语气，再鼓励孩子自然模仿；口头尝试不自动评分。' })

  for (const definition of [
    { id: 'L77', title: '熟悉的短元音词（1）', mappings: [], words: [
      { text: 'hot', meaning: '热的', mappings: ['h', 'o', 't'] },
      { text: 'mum', meaning: '妈妈', mappings: ['m', 'u', 'm'] },
      { text: 'up', meaning: '向上', mappings: ['u', 'p'] },
    ] },
    { id: 'L78', title: '熟悉的短元音词（2）', mappings: [], words: [
      { text: 'job', meaning: '工作', mappings: ['j', 'o', 'b'] },
      { text: 'win', meaning: '赢', mappings: ['w', 'i', 'n'] },
      { text: 'ill', meaning: '生病的', mappings: ['i', 'll'] },
      { text: 'nest', meaning: '鸟巢', mappings: ['n', 'e', 's', 't'] },
    ] },
    { id: 'L79', title: '再听长音 ee', mappings: [], words: [
      { text: 'beef', meaning: '牛肉', mappings: ['b', 'ee', 'f'] },
      { text: 'see', meaning: '看见', mappings: ['s', 'ee'] },
    ] },
  ] satisfies LessonDef[]) addLesson(definition)

  course.manifest.lessonKeys = course.lessons.map(lesson => lesson.id)
  course.manifest.assetIds = course.assets.map(asset => asset.id)
  course.manifest.contentHash = courseHash(course)
  return course
}
