import type { PhonicsAttemptDto, PhonicsEnrollmentDto, PhonicsEventRequest, PhonicsNextDto, PhonicsPlanKind } from '@taoread/shared'
import { request } from '../../../lib/api'

const root = '/api/phonics/v2'
const childPath = (id: string) => `${root}/children/${encodeURIComponent(id)}`
const attemptPath = (id: string) => `${root}/attempts/${encodeURIComponent(id)}`
export interface PhonicsCatalog { versions: Array<{ versionId: string; accent: string; lessons: Array<{ id: string; order: number; titleZh: string }> }> }
export interface PhonicsSummary {
  totalAttempts: number; completedAttempts: number; pausedAttempts: number; cancelledAttempts: number; v1Starts: number
  completedLessonKeys: Array<{ versionId: string; lessonKey: string }>
  caregiverObservedCount: number; unobservedOralTaskCount: number; next: PhonicsNextDto
  recentPractice: Array<{ id: string; versionId: string; planKind: PhonicsPlanKind; lessonKey: string | null; status: string; startedAt: number; hadLearningActions: boolean }>
  pagination: { page: number; limit: number; total: number }
  oralTasks?: Array<{ attemptId: string; taskInstanceId: string; targetId: string; text: string; hadHelp: boolean; pageNumber: number | null; reportedAt: number; versionId: string; report: string }>
  observations?: Array<{ id: string; attemptId: string; taskInstanceId: string; observation: string }>
}
export interface PhonicsEnrollmentInput {
  enabled: boolean; versionId: string; entryMode: 'entry' | 'lesson'; entryLessonKey: string; expectedRevision: number
  closeActive?: { attemptId: string; expectedRevision: number; clientEventId: string }
}
export interface PhonicsReceipt { attempt: PhonicsAttemptDto; result: { assetId?: string; correct?: boolean | null }; repeated: boolean }
export const phonicsApi = {
  catalog: (token: string) => request<PhonicsCatalog>(`${root}/catalog`, { token }),
  enrollment: (token: string, child: string) => request<{ enrollment: PhonicsEnrollmentDto }>(`${childPath(child)}/enrollment`, { token }),
  setEnrollment: (token: string, child: string, body: PhonicsEnrollmentInput) => request<{ enrollment: PhonicsEnrollmentDto }>(`${childPath(child)}/enrollment`, { token, method: 'PUT', body }),
  next: (token: string, child: string) => request<{ next: PhonicsNextDto }>(`${childPath(child)}/next`, { token }),
  readers: (token: string, child: string) => request<{ readers: Array<{ id: string; titleZh: string; versionId: string }> }>(`${childPath(child)}/readers`, { token }),
  summary: (token: string, child: string, page = 0) => request<PhonicsSummary>(`${childPath(child)}/summary?page=${page}`, { token }),
  start: (token: string, child: string, body: { clientAttemptId: string; versionId: string; planKind: PhonicsPlanKind; resourceKey?: string }) => request<{ attempt: PhonicsAttemptDto }>(`${childPath(child)}/attempts`, { token, method: 'POST', body }),
  attempt: (token: string, id: string) => request<{ attempt: PhonicsAttemptDto }>(attemptPath(id), { token }),
  event: (token: string, id: string, body: PhonicsEventRequest) => request<PhonicsReceipt>(`${attemptPath(id)}/events`, { token, method: 'POST', body }),
  control: (token: string, id: string, action: 'pause' | 'resume' | 'finish' | 'cancel', body: { clientEventId: string; expectedRevision: number; reason?: string }) => request<PhonicsReceipt>(`${attemptPath(id)}/${action}`, { token, method: 'POST', body }),
  observe: (token: string, id: string, body: { clientEventId: string; expectedRevision: number; taskInstanceId: string; observation: 'independent' | 'with_help' | 'not_observed'; supersedesEventId?: string }) => request<PhonicsReceipt>(`${attemptPath(id)}/observations`, { token, method: 'POST', body }),
}
