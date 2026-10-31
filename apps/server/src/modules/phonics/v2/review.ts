import type { PhonicsNextDto } from '@taoread/shared'
import type { PhonicsCourse, PhonicsTask } from './contracts'
import { taskTarget } from './contracts'

export const REVIEW_RULE_VERSION = 'support-and-1-3-7-v1'
// Pilot families use Asia/Shanghai calendar days; duration intervals remain seconds.
const calendarDay = (seconds: number) => Math.floor((seconds + 8 * 3600) / 86400)
export interface PracticeHistory {
  id: string
  status: string
  kind: string | null
  lessonKey: string | null
  lessonKeys: string[]
  startedAt: number
  finishedAt: number | null
  targetIds?: string[]
}
export interface SupportTarget { targetId: string; receivedAt: number }

export function dueLessonKeys(history: PracticeHistory[], nowSec: number): string[] {
  return [...new Set(history.filter(h => h.kind === 'lesson' && h.status === 'completed' && h.lessonKey && [1, 3, 7].some(interval => {
    const dueAt = (h.finishedAt ?? h.startedAt) + interval * 86400
    return nowSec >= dueAt && !history.some(r => r.kind === 'review' && r.status === 'completed' && r.lessonKeys.includes(h.lessonKey!) && (r.finishedAt ?? r.startedAt) >= dueAt)
  })).map(h => h.lessonKey!))]
}

export function recentSupport(history: PracticeHistory[], support: SupportTarget[], nowSec: number): SupportTarget[] {
  return support.filter(s => {
    const lastReview = Math.max(0, ...history.filter(h => h.kind === 'review' && h.status === 'completed' && h.targetIds?.includes(s.targetId)).map(h => h.finishedAt ?? h.startedAt))
    return s.receivedAt >= nowSec - 7 * 86400 && s.receivedAt > lastReview
  })
}

export function reviewTasks(course: PhonicsCourse, lessonKeys: string[], targetIds: string[] = []): PhonicsTask[] {
  const allowed = new Set(lessonKeys)
  const taskIds = course.lessons.filter(l => allowed.has(l.id)).reverse().flatMap(l => l.taskIds)
  const tasks = taskIds.map(id => course.tasks.find(t => t.id === id)!).filter(t => t && ['choice', 'build', 'oral'].includes(t.kind))
  const selected: PhonicsTask[] = [], seen = new Set<string>()
  for (const task of tasks) {
    const target = taskTarget(task)
    if (seen.has(target) || (targetIds.length && !targetIds.includes(target))) continue
    seen.add(target); selected.push({ ...task, role: 'practice' })
    if (selected.length === 3) break
  }
  return selected
}

export function recommend(course: PhonicsCourse, input: {
  entryMode: string; entryLessonKey: string | null; history: PracticeHistory[]; support: SupportTarget[]; nowSec: number
}): PhonicsNextDto {
  const { history, nowSec } = input
  const versionId = course.manifest.versionId
  const active = history.find(h => ['started', 'paused'].includes(h.status))
  if (active) return { reason: 'continue', label: '接着上次玩', attemptId: active.id, versionId }
  if (input.entryMode === 'entry' && !history.some(h => h.kind === 'entry' && h.status === 'completed')) return { reason: 'entry', label: '先玩一个声音游戏', planKind: 'entry', resourceKey: course.manifest.entryPlanKeys[0], versionId }
  const completed = new Set(history.filter(h => h.kind === 'lesson' && h.status === 'completed').map(h => h.lessonKey!))
  const entry = course.lessons.find(l => l.id === input.entryLessonKey)?.order ?? 1
  // A parent-selected entry does not manufacture prior completions or observed skills.
  const eligible = course.lessons.filter(l => completed.has(l.id) || l.order < entry).map(l => l.id)
  const day = calendarDay(nowSec)
  const reviewedToday = history.some(h => h.kind === 'review' && h.status === 'completed' && calendarDay(h.finishedAt ?? h.startedAt) === day)
  const support = recentSupport(history, input.support, nowSec)
  if (!reviewedToday && support.length && reviewTasks(course, eligible, support.map(s => s.targetId)).length) return { reason: 'support', label: '一起巩固两个声音', planKind: 'review', versionId }
  const due = dueLessonKeys(history, nowSec).filter(key => eligible.includes(key))
  if (!reviewedToday && due.length && reviewTasks(course, due).length) return { reason: 'spaced_review', label: '和老朋友再玩一次', planKind: 'review', versionId }
  const next = course.lessons.find(l => l.order >= entry && !completed.has(l.id))
  if (next) return { reason: 'new_lesson', label: next.titleZh, planKind: 'lesson', resourceKey: next.id, versionId }
  return { reason: 'finished', label: '可以选喜欢的内容再读一次', versionId }
}
