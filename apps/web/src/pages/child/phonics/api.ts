import type { PhonicsAtlasDto, PhonicsAttemptDto, PhonicsEnrollmentDto, PhonicsEventRequest, PhonicsNextDto, PhonicsPlanKind, PhonicsWordCardDto } from '@taoread/shared'
import { request } from '../../../lib/api'

const root = '/api/phonics/v2'
const childPath = (id: string) => `${root}/children/${encodeURIComponent(id)}`
const attemptPath = (id: string) => `${root}/attempts/${encodeURIComponent(id)}`
export interface PhonicsCatalog { versions: Array<{ versionId: string; accent: string; selfUse?: boolean; lessons: Array<{ id: string; order: number; titleZh: string }> }> }
export interface PhonicsSummary {
  totalAttempts: number; completedAttempts: number; pausedAttempts: number; cancelledAttempts: number; v1Starts: number
  completedLessonKeys: Array<{ versionId: string; lessonKey: string }>
  caregiverObservedCount: number; unobservedOralTaskCount: number; next: PhonicsNextDto
  recentPractice: Array<{ id: string; versionId: string; planKind: PhonicsPlanKind; lessonKey: string | null; status: string; startedAt: number; hadLearningActions: boolean }>
  practiceCalendar: Array<{ day: string; count: number }>
  pagination: { page: number; limit: number; total: number }
  oralTasks?: Array<{ attemptId: string; taskInstanceId: string; targetId: string; text: string; hadHelp: boolean; pageNumber: number | null; reportedAt: number; versionId: string; report: string }>
  observations?: Array<{ id: string; attemptId: string; taskInstanceId: string; observation: string }>
}
export interface PhonicsEnrollmentInput {
  enabled: boolean; versionId: string; entryMode: 'entry' | 'lesson'; entryLessonKey: string; expectedRevision: number
  closeActive?: { attemptId: string; expectedRevision: number; clientEventId: string }
}
export interface PhonicsReceipt { attempt: PhonicsAttemptDto; result: { assetId?: string; correct?: boolean | null }; repeated: boolean }
export type PracticeMode = 'picture' | 'meaning' | 'listen' | 'spelling' | 'contrast'
export interface PracticeAnswer { clientEventId: string; questionId: string; versionId: string; wordId: string; mode: PracticeMode; track: 'practice' | 'study'; answer: string; elapsedMs?: number; hinted?: boolean }
export interface WordSession {
  id: string; versionId: string; track: 'practice' | 'study'
  questions: Array<{ id: string; wordId: string; mode: PracticeMode; choices: string[]; isNew: boolean; intro?: boolean; retry?: boolean }>
  index: number; showIntro: boolean; firstCorrect: number; feedback: 'correct' | 'incorrect' | null; pending: PracticeAnswer | null
}
export interface WordSessionMutation { clientEventId: string; expectedRevision: number; versionId: string; session: WordSession | null }
export interface WordSessionSnapshot { session: WordSession | null; revision: number }
export interface PracticeSummary { total: number; correct: number; wrongWordIds: string[]; answerDurationSeconds: number; typingDurationSeconds: number }
export interface StudySchedule { dueWordIds: string[]; newWordIds: string[]; learnedWordIds?: string[]; recentWordIds?: string[]; stabilities?: Record<string, number>; newToday?: number; upcoming: Array<{ day: string; count: number }> }
export interface WordSettings { dailyNew: number; retention: number; autoplay: boolean; spelling: boolean; accent?: 'GB' | 'US'; revision: number }
export type TypingMode = 'word' | 'sentence' | 'dictation'
export type TypingSource = 'recent' | 'wrong' | 'favorite' | 'path'
export interface TypingResult { clientSessionId: string; versionId: string; mode: TypingMode; source: TypingSource; items: number; correctCharacters: number; attemptedCharacters: number; acceptedCharacters: number; elapsedMs: number }
export interface TypingRecord { mode: TypingMode; source: TypingSource; items: number; accuracy: number; wpm: number; createdAt: string }
export interface PhonicsReader { versionId: string; id: string; title: string; pages: Array<{ text: string; wordIds: string[]; image: string | null; audio: import('@taoread/shared').PhonicsAssetDto | null }>; progress: { page: number; fontSize: number; revision: number } }
export const phonicsApi = {
  catalog: (token: string) => request<PhonicsCatalog>(`${root}/catalog`, { token }),
  enrollment: (token: string, child: string) => request<{ enrollment: PhonicsEnrollmentDto }>(`${childPath(child)}/enrollment`, { token }),
  setEnrollment: (token: string, child: string, body: PhonicsEnrollmentInput) => request<{ enrollment: PhonicsEnrollmentDto }>(`${childPath(child)}/enrollment`, { token, method: 'PUT', body }),
  next: (token: string, child: string) => request<{ next: PhonicsNextDto }>(`${childPath(child)}/next`, { token }),
  readers: (token: string, child: string) => request<{ readers: Array<{ id: string; titleZh: string; versionId: string }> }>(`${childPath(child)}/readers`, { token }),
  reader: (token: string, child: string, readerId: string) => request<{ reader: PhonicsReader }>(`${childPath(child)}/readers/${encodeURIComponent(readerId)}`, { token }),
  readingProgress: (token: string, child: string, readerId: string, body: { versionId: string; page: number; fontSize: number; expectedRevision: number }) => request<PhonicsReader['progress']>(`${childPath(child)}/readers/${encodeURIComponent(readerId)}/progress`, { token, method: 'PUT', body }),
  words: (token: string, child: string) => request<{ words: PhonicsWordCardDto[] }>(`${childPath(child)}/words`, { token }),
  atlas: (token: string, child: string) => request<{ atlas: PhonicsAtlasDto }>(`${childPath(child)}/atlas`, { token }),
  favorite: (token: string, child: string, word: string, versionId: string, favorite: boolean) => request<{ favorite: boolean }>(`${childPath(child)}/words/${encodeURIComponent(word)}/favorite`, { token, method: 'PUT', body: { versionId, favorite } }),
  practiceSummary: (token: string, child: string) => request<PracticeSummary>(`${childPath(child)}/practice`, { token }),
  studySchedule: (token: string, child: string) => request<StudySchedule>(`${childPath(child)}/study-schedule`, { token }),
  wordSettings: (token: string, child: string) => request<WordSettings>(`${childPath(child)}/word-settings`, { token }),
  wordSession: (token: string, child: string) => request<WordSessionSnapshot>(`${childPath(child)}/word-session`, { token }),
  setWordSession: (token: string, child: string, body: WordSessionMutation) => request<WordSessionSnapshot & { appliedRevision: number; repeated: boolean }>(`${childPath(child)}/word-session`, { token, method: 'PUT', body }),
  setWordSettings: (token: string, child: string, body: Omit<WordSettings, 'revision'> & { expectedRevision: number }) => request<WordSettings>(`${childPath(child)}/word-settings`, { token, method: 'PUT', body }),
  typingResults: (token: string, child: string) => request<{ results: TypingRecord[] }>(`${childPath(child)}/typing`, { token }),
  recordTyping: (token: string, child: string, body: TypingResult) => request<{ repeated: boolean }>(`${childPath(child)}/typing`, { token, method: 'POST', body }),
  wordBackup: (token: string, child: string) => request<{ backup: unknown }>(`${childPath(child)}/word-backup`, { token }),
  restoreWordBackup: (token: string, child: string, body: unknown) => request<{ schedules: number; favorites: number; answers: number; typing: number; reading: number }>(`${childPath(child)}/word-backup`, { token, method: 'POST', body }),
  practiceAnswer: (token: string, child: string, body: PracticeAnswer) => request<{ correct: boolean; firstAttempt: boolean; repeated: boolean }>(`${childPath(child)}/practice`, { token, method: 'POST', body }),
  summary: (token: string, child: string, page = 0) => request<PhonicsSummary>(`${childPath(child)}/summary?page=${page}`, { token }),
  start: (token: string, child: string, body: { clientAttemptId: string; versionId: string; planKind: PhonicsPlanKind; resourceKey?: string }) => request<{ attempt: PhonicsAttemptDto }>(`${childPath(child)}/attempts`, { token, method: 'POST', body }),
  attempt: (token: string, id: string) => request<{ attempt: PhonicsAttemptDto }>(attemptPath(id), { token }),
  event: (token: string, id: string, body: PhonicsEventRequest) => request<PhonicsReceipt>(`${attemptPath(id)}/events`, { token, method: 'POST', body }),
  control: (token: string, id: string, action: 'pause' | 'resume' | 'finish' | 'cancel', body: { clientEventId: string; expectedRevision: number; reason?: string }) => request<PhonicsReceipt>(`${attemptPath(id)}/${action}`, { token, method: 'POST', body }),
  observe: (token: string, id: string, body: { clientEventId: string; expectedRevision: number; taskInstanceId: string; observation: 'independent' | 'with_help' | 'not_observed'; supersedesEventId?: string }) => request<PhonicsReceipt>(`${attemptPath(id)}/observations`, { token, method: 'POST', body }),
}
