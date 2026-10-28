/** Phonics v2 public protocol. Business timestamps are Unix seconds. */
export type PhonicsPlanKind = 'entry' | 'lesson' | 'review' | 'reread'
export type PhonicsTaskKind = 'listen' | 'choice' | 'build' | 'oral' | 'read'
export type PhonicsEvidenceRole = 'model' | 'guided' | 'practice' | 'independent'
export type PhonicsAttemptStatus = 'started' | 'paused' | 'completed' | 'cancelled'
export type PhonicsSkill = 'operation' | 'meaning' | 'mapping' | 'blend' | 'segment' | 'oral_reading'

export interface PhonicsAssetDto {
  id: string
  purpose: 'instruction_zh' | 'phoneme' | 'segment' | 'blend' | 'word' | 'passage' | 'image'
  url: string | null
  durationMs: number | null
  /** 发音口音标记：词卡英美双按钮按此渲染（缺省跟随课程口音） */
  accent?: 'GB' | 'US'
}

export interface PhonicsTaskDto {
  id: string
  kind: PhonicsTaskKind
  skill: PhonicsSkill
  role: PhonicsEvidenceRole
  instructionZh: string
  instructionAssetId: string
  stimulusAssetId?: string
  displayText?: string
  wordId?: string
  mappingId?: string
  imageAssetId?: string
  choices: Array<{ id: string; label: string }>
  timeline: Array<{ atMs: number; endMs: number; text: string }>
  canSkipWithHelp: boolean
}

export interface PhonicsStepState {
  stepIndex: number
  pageIndex: number
  taskInstanceId: string
  hintLevel: number
  responseCount: number
  resolved: boolean
  correct: boolean | null
  resolution: 'ack' | 'response' | 'self_report' | 'helped_skip' | null
}

export interface PhonicsAttemptDto {
  id: string
  childId: string
  versionId: string
  planKind: PhonicsPlanKind
  planHash: string
  status: PhonicsAttemptStatus
  revision: number
  state: PhonicsStepState
  stepCount: number
  task: PhonicsTaskDto | null
  assets: PhonicsAssetDto[]
  helpAssetId: string | null
  available: boolean
  reader: { id: string; titleZh: string; pages: Array<{ text: string; imageAssetId?: string; audioAssetId: string }> } | null
}

export type PhonicsLearningInput =
  | { kind: 'step_ack'; payload: Record<string, never> }
  | { kind: 'stimulus_replayed'; payload: Record<string, never> }
  | { kind: 'hint_requested'; payload: Record<string, never> }
  | { kind: 'response_submitted'; payload: { answerIds: string[] } }
  | { kind: 'retry_requested'; payload: Record<string, never> }
  | { kind: 'self_read_reported'; payload: { report: 'tried' | 'needs_help' } }
  | { kind: 'step_advanced'; payload: Record<string, never> }
  | { kind: 'task_skipped_with_help'; payload: Record<string, never> }
  | { kind: 'reader_page_advanced'; payload: Record<string, never> }

export type PhonicsEventRequest = PhonicsLearningInput & {
  clientEventId: string
  expectedRevision: number
  taskInstanceId: string
}

export interface PhonicsEnrollmentDto {
  enabled: boolean
  versionId: string | null
  entryMode: 'entry' | 'lesson'
  entryLessonKey: string | null
  revision: number
}

export interface PhonicsNextDto {
  reason: 'continue' | 'support' | 'spaced_review' | 'new_lesson' | 'entry' | 'finished' | 'disabled' | 'unavailable'
  label: string
  attemptId?: string
  versionId?: string
  planKind?: PhonicsPlanKind
  resourceKey?: string
}

/** 词典旁挂条目（词光 CC BY 4.0 导入 + 桃阅读自备），全部待人工审校后才会进入公开发布。 */
export interface PhonicsLexiconDto {
  source: 'word-atlas' | 'taoread-original'
  ukIpa: string
  usIpa: string
  senses: Array<{ pos: string; zh: string; en: string }>
  example: { en: string; zh: string; audio: PhonicsAssetDto | null }
  collocations: string[]
  family: string[]
  tip: string
}

/** 词卡：一词一图、三种读法（分音/拼读/整词）与中文释义。音频仅在资产可取时给 url。 */
export interface PhonicsWordCardDto {
  id: string
  text: string
  meaningZh: string
  image: { url: string } | null
  audios: PhonicsAssetDto[]
  /** 整词音频实际下发的口音；美音包未安装或未选美音时为 GB。 */
  wordAudioAccent?: 'GB' | 'US'
}

/** 图鉴词条：所有词可浏览，unlocked 表示已开放练习而非熟练掌握。 */
export interface PhonicsAtlasWordDto {
  id: string
  unlocked: boolean
  favorite: boolean
  studyState?: 'unseen' | 'learning' | 'familiar'
  text?: string
  meaningZh?: string
  lessonKey?: string
  image: { url: string } | null
  audios: PhonicsAssetDto[]
  examples: Array<{ text: string; audio: PhonicsAssetDto | null }>
  lexicon?: PhonicsLexiconDto | null
  wordAudioAccent?: 'GB' | 'US'
}

export interface PhonicsAtlasReaderDto {
  id: string
  titleZh: string
  lessonKey: string | null
  unlocked: boolean
  pages: number
  cover: { url: string } | null
}

export interface PhonicsAtlasLessonDto {
  id: string
  order: number
  titleZh: string
  completed: boolean
  wordCount: number
  readerCount: number
}

/** 图鉴全量：词（含锁定占位）/ 小书架 / 课次路线，一次性供孩子端图鉴、书房与学习路线渲染。 */
export interface PhonicsAtlasDto {
  versionId: string | null
  words: PhonicsAtlasWordDto[]
  readers: PhonicsAtlasReaderDto[]
  lessons: PhonicsAtlasLessonDto[]
}
