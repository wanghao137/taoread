import { describe, expect, it } from 'vitest'
import { candidateDirectory, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { dueLessonKeys, recentSupport, recommend, reviewTasks, type PracticeHistory } from '../src/modules/phonics/v2/review'
import { applyLearningEvent, initialState, type FrozenPlan } from '../src/modules/phonics/v2/lessonMachine'

const course = await loadCourse(candidateDirectory)
const day = 86400, now = 20000 * day
const lesson = (key: string, at: number): PracticeHistory => ({ id: key, kind: 'lesson', status: 'completed', lessonKey: key, lessonKeys: [key], startedAt: at, finishedAt: at })
const review = (keys: string[], at: number): PracticeHistory => ({ id: `r${at}`, kind: 'review', status: 'completed', lessonKey: null, lessonKeys: keys, startedAt: at, finishedAt: at })
const recommendAt = (history: PracticeHistory[], extra = {}) => recommend(course, { entryMode: 'lesson', entryLessonKey: 'L01', history, support: [], nowSec: now, ...extra })

describe('phonics recommendation and event rules', () => {
  it('prefers saved activity, then entry, without manufacturing completed lessons', () => {
    expect(recommendAt([{ ...lesson('L01', now), status: 'paused' }], { entryMode: 'entry' }).reason).toBe('continue')
    expect(recommendAt([], { entryMode: 'entry' }).resourceKey).toBe('entry-sounds')
    expect(recommendAt([], { entryLessonKey: 'L07' })).toMatchObject({ reason: 'new_lesson', resourceKey: 'L07' })
  })
  it('reviews after 1/3/7 days and credits only represented lessons', () => {
    const history = [lesson('L01', now - 3 * day), lesson('L02', now - day)]
    expect(dueLessonKeys(history, now)).toEqual(['L01', 'L02'])
    expect(dueLessonKeys([...history, review(['L02'], now)], now)).toEqual(['L01'])
    expect(dueLessonKeys([lesson('L01', now - 7 * day), review(['L01'], now - 4 * day)], now)).toEqual(['L01'])
    expect(recommendAt(history).reason).toBe('spaced_review')
    expect(recommendAt([...history, review(['L02'], now)]).reason).toBe('new_lesson')
  })
  it('uses Shanghai calendar days and does not repeat yesterday support forever', () => {
    const midnight = now - 8 * 3600
    const h = [lesson('L01', midnight - day)]
    expect(recommendAt([...h, review(['L01'], midnight - 1)], { nowSec: midnight + 1 }).reason).toBe('spaced_review')
    expect(recommendAt([...h, review(['L01'], midnight + 1)], { nowSec: midnight + 10 }).reason).toBe('new_lesson')
    const remaining = recentSupport([{ ...review(['L01'], now - day), targetIds: ['g-s'] }], [{ targetId: 'g-s', receivedAt: now - 2 * day }, { targetId: 'g-a', receivedAt: now - 2 * day }], now)
    expect(remaining.map(s => s.targetId)).toEqual(['g-a'])
  })
  it('caps short review at three different targets and always calls them practice', () => {
    const tasks = reviewTasks(course, course.lessons.map(l => l.id))
    expect(tasks).toHaveLength(3)
    expect(tasks.every(t => t.role === 'practice')).toBe(true)
    expect(new Set(tasks.map(t => t.wordId ?? t.mappingId ?? t.id)).size).toBe(3)
  })
  it('rejects late task responses and retains assistance through retries', () => {
    const task = course.tasks.find(t => t.id === 'L07-build-map')!
    const plan: FrozenPlan = { versionId: course.manifest.versionId, kind: 'lesson', courseHash: 'test', ruleVersion: 'test', lessonKeys: ['L07'], stepTaskIds: [task.id], tasks: [task], readers: [] }
    let state = initialState(plan)
    const send = (kind: 'response_submitted' | 'hint_requested' | 'retry_requested', payload: object = {}) => applyLearningEvent(plan, state, { clientEventId: 'x', expectedRevision: 0, taskInstanceId: state.taskInstanceId, kind, payload } as Parameters<typeof applyLearningEvent>[2])
    state = send('response_submitted', { answerIds: ['a'] }).state
    state = send('hint_requested').state
    const old = state.taskInstanceId
    state = send('retry_requested').state
    expect(state.hintLevel).toBe(1)
    expect(() => applyLearningEvent(plan, state, { clientEventId: 'x', expectedRevision: 0, taskInstanceId: old, kind: 'response_submitted', payload: { answerIds: ['m', 'a', 'p'] } })).toThrow()
    const result = send('response_submitted', { answerIds: ['m', 'a', 'p'] })
    expect(result.result).toMatchObject({ correct: true, firstResponse: false, evidenceRole: 'practice', helpLevel: 1 })
  })
})
