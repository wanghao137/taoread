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
