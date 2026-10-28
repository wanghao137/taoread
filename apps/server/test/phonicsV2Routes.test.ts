import { randomUUID } from 'node:crypto'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PhonicsAttemptDto, PhonicsEventRequest } from '@taoread/shared'
import { authHeaders, createChild, createFamilyAsParent, joinFamily, makeApp, type TestHarness } from './helper'
import { phonicsFixture } from './phonicsV2Fixture'
import type { PhonicsV2Options } from '../src/modules/phonics/v2/runtime'

let h: TestHarness, root: string, versionId: string, childId: string, childToken: string
let parent: Awaited<ReturnType<typeof createFamilyAsParent>>, other: typeof parent
let rolloutOptions: PhonicsV2Options
type Receipt = { attempt: PhonicsAttemptDto; result: Record<string, unknown>; eventId: string; repeated: boolean }
const base = '/api/phonics/v2'
const call = (method: 'GET' | 'POST' | 'PUT', url: string, token: string, payload?: unknown) => h.app.inject({ method, url, headers: authHeaders(token), ...(payload ? { payload } : {}) })
const childPath = (suffix: string) => `${base}/children/${childId}/${suffix}`
const enrollmentBody = (expectedRevision = 0) => ({ enabled: true, versionId, entryMode: 'lesson', entryLessonKey: 'L07', expectedRevision })
async function enroll() { expect((await call('PUT', childPath('enrollment'), parent.token, enrollmentBody())).statusCode).toBe(200) }
async function start(key = randomUUID()) {
  const body = { clientAttemptId: key, versionId, planKind: 'lesson', resourceKey: 'L07' }
  const res = await call('POST', childPath('attempts'), childToken, body)
  expect(res.statusCode, res.body).toBe(200)
  return { attempt: res.json<{ attempt: PhonicsAttemptDto }>().attempt, body }
}
async function send(a: PhonicsAttemptDto, kind: PhonicsEventRequest['kind'], payload: unknown = {}) {
  const res = await call('POST', `${base}/attempts/${a.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: a.revision, taskInstanceId: a.state.taskInstanceId, kind, payload })
  expect(res.statusCode, res.body).toBe(200)
  return res.json<Receipt>()
}
async function control(a: PhonicsAttemptDto, action: string, extra: object = {}, token = childToken) {
  const res = await call('POST', `${base}/attempts/${a.id}/${action}`, token, { clientEventId: randomUUID(), expectedRevision: a.revision, ...extra })
  expect(res.statusCode, res.body).toBe(200)
  return res.json<Receipt>()
}
async function finishAll(initial: PhonicsAttemptDto, oralReport: 'tried' | 'needs_help' = 'tried') {
  let a = initial
  const oral: Array<{ taskInstanceId: string }> = []
  for (let guard = 0; a.task && guard < 30; guard++) {
    if (a.task.kind === 'listen') a = (await send(a, 'step_ack')).attempt
    else if (a.task.kind === 'choice') a = (await send(a, 'response_submitted', { answerIds: ['m'] })).attempt
    else if (a.task.kind === 'build') a = (await send(a, 'response_submitted', { answerIds: ['m', 'a', 'p'] })).attempt
    else { oral.push({ taskInstanceId: a.state.taskInstanceId }); a = (await send(a, 'self_read_reported', { report: oralReport })).attempt }
    a = (await send(a, a.reader && a.state.pageIndex < a.reader.pages.length - 1 ? 'reader_page_advanced' : 'step_advanced')).attempt
  }
  expect(a.task).toBeNull()
  a = (await control(a, 'finish')).attempt
  return { attempt: a, oral }
}

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), 'tao-phonics-routes-'))
  const course = await phonicsFixture(root); versionId = course.manifest.versionId
  rolloutOptions = { rollout: 'all', courses: [course] }
  h = await makeApp(undefined, { mediaDir: root, phonicsV2: rolloutOptions })
  parent = await createFamilyAsParent(h.app, 'phonics-v2-parent')
  other = await createFamilyAsParent(h.app, 'phonics-v2-other')
  childId = await createChild(h.app, parent.token, parent.familyId, '拼读测试', '6-8')
  childToken = (await joinFamily(h.app, parent.familyCode, 'child', 'phonics-v2-child')).token
  await h.db.phonicsCourseRelease.create({ data: { versionId, courseId: course.manifest.courseId, accent: 'GB', status: 'published', contentHash: course.manifest.contentHash! } })
})
beforeEach(async () => {
  rolloutOptions.rollout = 'all'; rolloutOptions.pilotFamilyIds = []
  rolloutOptions.selfUseFamilyId = ''; rolloutOptions.selfUseHash = ''
  await h.db.phonicsAttempt.deleteMany({ where: { childId } })
  await h.db.phonicsPracticeAnswer.deleteMany({ where: { childId } })
  await h.db.phonicsWordFavorite.deleteMany({ where: { childId } })
  await h.db.phonicsWordSchedule.deleteMany({ where: { childId } })
  await h.db.phonicsTypingResult.deleteMany({ where: { childId } })
  await h.db.phonicsReadingProgress.deleteMany({ where: { childId } })
  await h.db.phonicsWordSessionMutation.deleteMany({ where: { childId } })
  await h.db.phonicsWordSession.deleteMany({ where: { childId } })
  await h.db.phonicsEnrollment.deleteMany({ where: { childId } })
  await h.db.phonicsCourseRelease.update({ where: { versionId }, data: { status: 'published' } })
})
afterAll(async () => {
  if (h) {
    for (const family of [parent, other]) if (family) await h.db.family.delete({ where: { id: family.familyId } })
    await h.db.phonicsCourseRelease.deleteMany({ where: { versionId } })
    await h.app.close(); await h.db.$disconnect()
  }
  if (root) await rm(root, { recursive: true, force: true })
})

describe('phonics v2 persistence and authorization', () => {
  it('lets an enrolled child browse the atlas without changing lesson progress or exposing it to another family', async () => {
    await enroll()
    const response = await call('GET', childPath('atlas'), childToken)
    expect(response.statusCode).toBe(200)
    const atlas = response.json().atlas
    expect(atlas.words).toHaveLength(4)
    expect(atlas.words.every((word: { unlocked: boolean; text: string; audios: unknown[]; examples: unknown[] }) =>
      !word.unlocked && Boolean(word.text) && word.audios.length === 3 && Array.isArray(word.examples))).toBe(true)
    expect(atlas.lessons[0].completed).toBe(false)
    expect((await call('GET', childPath('atlas'), other.token)).statusCode).toBe(404)
    expect((await call('GET', atlas.words[0].audios[0].url, childToken)).statusCode).toBe(200)
  })
  it('only uses examples from readers the child has unlocked', async () => {
    await enroll()
    const before = (await call('GET', childPath('atlas'), childToken)).json().atlas
    expect(before.words.every((word: { examples: unknown[] }) => word.examples.length === 0)).toBe(true)
    await finishAll((await start()).attempt)
    const after = (await call('GET', childPath('atlas'), childToken)).json().atlas
    expect(after.words.find((word: { id: string }) => word.id === 'w-sam').examples).toEqual([expect.objectContaining({ text: 'Sam sat.' })])
  })
  it('grades independent practice on the server, preserves first answers and isolates households', async () => {
    await enroll()
    const questionId = randomUUID(), clientEventId = randomUUID()
    const answer = { questionId, clientEventId, versionId, wordId: 'w-map', mode: 'picture', track: 'practice', answer: 'w-mat' }
    // 词光式模型：词的认记与练习从入学即开放（不再被课次完成度锁死）——未上课的词也能作答
    const openAnswer = { ...answer, questionId: randomUUID(), clientEventId: randomUUID() }
    expect((await call('POST', childPath('practice'), childToken, openAnswer)).json()).toMatchObject({ correct: false, firstAttempt: true })
    await finishAll((await start()).attempt)
    expect((await call('GET', childPath('summary'), childToken)).json().practiceCalendar).toEqual([expect.objectContaining({ count: 2 })])
    const wrong = await call('POST', childPath('practice'), childToken, answer)
    expect(wrong.json()).toMatchObject({ correct: false, firstAttempt: true, repeated: false })
    expect((await call('GET', childPath('summary'), childToken)).json().practiceCalendar).toEqual([expect.objectContaining({ count: 3 })])
    expect((await call('GET', childPath('practice'), childToken)).json()).toMatchObject({ total: 2, correct: 0, wrongWordIds: ['w-map'] })
    expect((await call('POST', childPath('practice'), childToken, answer)).json().repeated).toBe(true)
    expect((await call('POST', childPath('practice'), childToken, { ...answer, answer: 'w-map' })).statusCode).toBe(409)
    const fixed = { ...answer, clientEventId: randomUUID(), answer: 'w-map' }
    expect((await call('POST', childPath('practice'), childToken, fixed)).json()).toMatchObject({ correct: true, firstAttempt: false })
    expect((await call('GET', childPath('practice'), childToken)).json()).toMatchObject({ total: 2, correct: 0, wrongWordIds: [] })
    expect((await call('POST', childPath('practice'), childToken, { ...fixed, clientEventId: randomUUID(), wordId: 'w-mat' })).statusCode).toBe(409)
    expect((await call('GET', childPath('practice'), other.token)).statusCode).toBe(404)
    const contrast = { ...answer, questionId: randomUUID(), clientEventId: randomUUID(), mode: 'contrast', answer: 'w-map' }
    expect((await call('POST', childPath('practice'), childToken, contrast)).json()).toMatchObject({ correct: true, firstAttempt: true })
    expect(await h.db.phonicsWordSchedule.count({ where: { childId } })).toBe(0)
    expect(await h.db.phonicsAttempt.count({ where: { childId } })).toBe(1)
  })
  it('persists favorites for the enrolled child without granting another family access', async () => {
    await enroll()
    const url = childPath('words/w-map/favorite')
    expect((await call('PUT', url, other.token, { versionId, favorite: true })).statusCode).toBe(404)
    expect((await call('PUT', url, childToken, { versionId, favorite: true })).json()).toEqual({ favorite: true })
    expect((await call('PUT', url, childToken, { versionId, favorite: true })).statusCode).toBe(200)
    expect((await call('GET', childPath('atlas'), childToken)).json().atlas.words.find((w: { id: string }) => w.id === 'w-map').favorite).toBe(true)
    expect(await h.db.phonicsWordFavorite.count({ where: { childId } })).toBe(1)
    expect((await call('PUT', url, childToken, { versionId, favorite: false })).statusCode).toBe(200)
    expect(await h.db.phonicsWordFavorite.count({ where: { childId } })).toBe(0)
  })
  it('schedules only the first study answer with FSRS and keeps practice separate', async () => {
    await enroll()
    await finishAll((await start()).attempt)
    const schedule = (await call('GET', childPath('study-schedule'), childToken)).json()
    expect(schedule.newWordIds).toHaveLength(4)
    const body = { questionId: randomUUID(), clientEventId: randomUUID(), versionId, wordId: 'w-map', mode: 'meaning', track: 'study', answer: 'w-mat' }
    expect((await call('POST', childPath('practice'), childToken, body)).json()).toMatchObject({ correct: false, firstAttempt: true })
    const row = await h.db.phonicsWordSchedule.findFirstOrThrow({ where: { childId, wordId: 'w-map' } })
    expect(row.algorithm).toBe('ts-fsrs-5.4.2-short-v2')
    expect((await call('GET', childPath('atlas'), childToken)).json().atlas.words.find((word: { id: string }) => word.id === 'w-map').studyState).toBe('learning')
    expect(row.dueAt.getTime()).toBeGreaterThan(Date.now())
    expect(JSON.parse(row.cardJson).reps).toBe(1)
    expect((await call('POST', childPath('practice'), childToken, body)).json().repeated).toBe(true)
    expect((await call('POST', childPath('practice'), childToken, { ...body, clientEventId: randomUUID(), mode: 'listen', answer: 'w-map' })).json()).toMatchObject({ correct: true, firstAttempt: false })
    expect(JSON.parse((await h.db.phonicsWordSchedule.findUniqueOrThrow({ where: { id: row.id } })).cardJson).reps).toBe(1)
    expect((await call('POST', childPath('practice'), childToken, { ...body, clientEventId: randomUUID(), questionId: randomUUID(), answer: 'w-map' })).statusCode).toBe(409)
    expect((await call('GET', childPath('practice'), childToken)).json()).toMatchObject({ total: 0, correct: 0 })
    expect((await call('GET', childPath('study-schedule'), childToken)).json().newWordIds).toHaveLength(3)
    expect((await call('GET', childPath('study-schedule'), other.token)).statusCode).toBe(404)
  })
  it('persists bounded study settings, detects stale updates and enforces the daily new-word limit', async () => {
    await enroll()
    await finishAll((await start()).attempt)
    const url = childPath('word-settings')
    const defaults = (await call('GET', url, childToken)).json()
    expect(defaults).toMatchObject({ dailyNew: 5, retention: 0.9, autoplay: false, spelling: true, revision: 0 })
    const body = { dailyNew: 1, retention: 0.94, autoplay: true, spelling: false, expectedRevision: 0 }
    expect((await call('PUT', url, other.token, body)).statusCode).toBe(404)
    expect((await call('PUT', url, childToken, { ...body, retention: 1 })).statusCode).toBe(400)
    expect((await call('PUT', url, childToken, body)).json()).toEqual({ dailyNew: 1, retention: 0.94, autoplay: true, spelling: false, revision: 1 })
    expect((await call('PUT', url, childToken, body)).statusCode).toBe(409)
    expect((await call('GET', url, parent.token)).json()).toMatchObject({ dailyNew: 1, retention: 0.94, revision: 1 })
    expect((await call('GET', childPath('study-schedule'), childToken)).json().newWordIds).toHaveLength(1)
    const answer = { questionId: randomUUID(), clientEventId: randomUUID(), versionId, wordId: 'w-map', mode: 'meaning', track: 'study', answer: 'w-map', elapsedMs: 11000, hinted: false }
    expect((await call('POST', childPath('practice'), childToken, answer)).statusCode).toBe(200)
    const row = await h.db.phonicsWordSchedule.findFirstOrThrow({ where: { childId, wordId: 'w-map' } })
    expect(JSON.parse((await h.db.phonicsPracticeAnswer.findFirstOrThrow({ where: { childId, questionId: answer.questionId } })).reviewLogJson!).log.rating).toBe(2)
    expect((await call('GET', childPath('study-schedule'), childToken)).json()).toMatchObject({ newToday: 1, newWordIds: [] })
    expect((await call('POST', childPath('practice'), childToken, { ...answer, questionId: randomUUID(), clientEventId: randomUUID(), wordId: 'w-mat', answer: 'w-mat' })).statusCode).toBe(409)
    const card = JSON.parse(row.cardJson); card.due = new Date(Date.now() - 60000).toISOString()
    await h.db.phonicsWordSchedule.update({ where: { id: row.id }, data: { algorithm: 'ts-fsrs-5.4.2-daily-v1', cardJson: JSON.stringify(card), dueAt: new Date(Date.now() - 60000) } })
    expect((await call('POST', childPath('practice'), childToken, { ...answer, questionId: randomUUID(), clientEventId: randomUUID() })).statusCode).toBe(200)
    expect((await h.db.phonicsWordSchedule.findUniqueOrThrow({ where: { id: row.id } })).algorithm).toBe('ts-fsrs-5.4.2-short-v2')
  })
  it('does not exceed the new-word limit when two devices submit concurrently', async () => {
    await enroll()
    await finishAll((await start()).attempt)
    expect((await call('PUT', childPath('word-settings'), childToken, { dailyNew: 1, retention: 0.9, autoplay: false, spelling: true, expectedRevision: 0 })).statusCode).toBe(200)
    const makeAnswer = (wordId: string) => ({ questionId: randomUUID(), clientEventId: randomUUID(), versionId, wordId, mode: 'meaning', track: 'study', answer: wordId })
    const results = await Promise.all([call('POST', childPath('practice'), childToken, makeAnswer('w-map')), call('POST', childPath('practice'), childToken, makeAnswer('w-mat'))])
    expect(results.map(result => result.statusCode).sort()).toEqual([200, 409])
    expect(await h.db.phonicsWordSchedule.count({ where: { childId } })).toBe(1)
  })
  it('synchronizes a word session with idempotent writes, conflict detection and family isolation', async () => {
    await enroll()
    const url = childPath('word-session')
    const questionId = randomUUID()
    const session = { id: randomUUID(), versionId, track: 'study', questions: [{ id: questionId, wordId: 'w-map', mode: 'meaning', choices: ['w-map', 'w-mat'], isNew: true }], index: 0, showIntro: false, firstCorrect: 0, feedback: null, pending: null }
    const first = { clientEventId: randomUUID(), expectedRevision: 0, versionId, session }
    expect((await call('GET', url, other.token)).statusCode).toBe(404)
    expect((await call('GET', url, childToken)).json()).toEqual({ session: null, revision: 0 })
    expect((await call('PUT', url, other.token, first)).statusCode).toBe(404)
    expect((await call('PUT', url, childToken, { ...first, session: { ...session, questions: [{ ...session.questions[0], wordId: 'w-unknown' }] } })).statusCode).toBe(400)
    expect((await call('PUT', url, childToken, first)).json()).toMatchObject({ revision: 1, appliedRevision: 1, repeated: false, session })
    expect((await call('PUT', url, childToken, first)).json()).toMatchObject({ revision: 1, appliedRevision: 1, repeated: true })
    expect((await call('PUT', url, childToken, { ...first, session: null })).statusCode).toBe(409)
    const next = { clientEventId: randomUUID(), expectedRevision: 1, versionId, session: { ...session, index: 1 } }
    const concurrent = await Promise.all([call('PUT', url, childToken, next), call('PUT', url, childToken, { ...next, clientEventId: randomUUID(), session: null })])
    expect(concurrent.map(item => item.statusCode).sort()).toEqual([200, 409])
    const current = (await call('GET', url, childToken)).json()
    expect(current.revision).toBe(2)
    expect((await call('PUT', url, childToken, first)).json()).toMatchObject({ revision: 2, appliedRevision: 1, repeated: true, session: current.session })
    const pending = { clientEventId: randomUUID(), questionId: randomUUID(), versionId, wordId: 'w-map', mode: 'meaning', track: 'study', answer: 'w-map' }
    expect((await call('PUT', url, childToken, { clientEventId: randomUUID(), expectedRevision: 2, versionId, session: { ...session, pending } })).statusCode).toBe(400)
    expect((await call('PUT', url, childToken, { clientEventId: randomUUID(), expectedRevision: 2, versionId, session: null })).json()).toMatchObject({ revision: 3, session: null })
  })
  it('stores idempotent typing results without changing spaced-repetition cards', async () => {
    await enroll()
    const url = childPath('typing')
    const body = { clientSessionId: randomUUID(), versionId, mode: 'sentence', source: 'path', items: 2, correctCharacters: 25, attemptedCharacters: 30, acceptedCharacters: 25, elapsedMs: 60000 }
    expect((await call('POST', url, other.token, body)).statusCode).toBe(404)
    expect((await call('POST', url, childToken, { ...body, correctCharacters: 31 })).statusCode).toBe(400)
    expect((await call('POST', url, childToken, body)).json()).toEqual({ repeated: false })
    expect((await call('POST', url, childToken, body)).json()).toEqual({ repeated: true })
    expect((await call('POST', url, childToken, { ...body, items: 3 })).statusCode).toBe(409)
    expect((await call('GET', url, childToken)).json().results).toEqual([expect.objectContaining({ mode: 'sentence', items: 2, wpm: 5, accuracy: 83 })])
    expect((await call('GET', url, other.token)).statusCode).toBe(404)
    expect(await h.db.phonicsWordSchedule.count({ where: { childId } })).toBe(0)
  })
  it('opens only unlocked readers and preserves family-isolated reading position with revision checks', async () => {
    await enroll()
    const url = childPath('readers/r-l07')
    expect((await call('GET', url, childToken)).statusCode).toBe(409)
    await finishAll((await start()).attempt)
    const response = await call('GET', url, childToken)
    expect(response.statusCode).toBe(200)
    const reader = response.json().reader
    expect(reader.pages).toHaveLength(2)
    expect(reader.progress).toEqual({ page: 0, fontSize: 24, revision: 0 })
    expect((await call('GET', url, other.token)).statusCode).toBe(404)
    expect((await call('GET', reader.pages[0].audio.url, childToken)).statusCode).toBe(200)
    const update = { versionId, page: 1, fontSize: 28, expectedRevision: 0 }
    expect((await call('PUT', `${url}/progress`, other.token, update)).statusCode).toBe(404)
    expect((await call('PUT', `${url}/progress`, childToken, { ...update, page: 2 })).statusCode).toBe(409)
    expect((await call('PUT', `${url}/progress`, childToken, update)).json()).toEqual({ page: 1, fontSize: 28, revision: 1 })
    expect((await call('PUT', `${url}/progress`, childToken, update)).statusCode).toBe(409)
    expect((await call('GET', url, childToken)).json().reader.progress).toEqual({ page: 1, fontSize: 28, revision: 1 })
  })
  it('exports parent-only word backups and restores missing records without overwriting current data', async () => {
    await enroll()
    await finishAll((await start()).attempt)
    await call('PUT', childPath('words/w-map/favorite'), childToken, { versionId, favorite: true })
    const answer = { questionId: randomUUID(), clientEventId: randomUUID(), versionId, wordId: 'w-map', mode: 'meaning', track: 'study', answer: 'w-map', elapsedMs: 1500 }
    expect((await call('POST', childPath('practice'), childToken, answer)).statusCode).toBe(200)
    const typing = { clientSessionId: randomUUID(), versionId, mode: 'word', source: 'path', items: 1, correctCharacters: 3, attemptedCharacters: 3, acceptedCharacters: 3, elapsedMs: 3000 }
    expect((await call('POST', childPath('typing'), childToken, typing)).statusCode).toBe(200)
    expect((await call('PUT', childPath('readers/r-l07/progress'), childToken, { versionId, page: 1, fontSize: 26, expectedRevision: 0 })).statusCode).toBe(200)
    const url = childPath('word-backup')
    expect((await call('GET', url, childToken)).statusCode).toBe(403)
    expect((await call('GET', url, other.token)).statusCode).toBe(404)
    const exported = await call('GET', url, parent.token)
    expect(exported.statusCode, exported.body).toBe(200)
    const backup = exported.json().backup
    expect(backup).toMatchObject({ app: 'taoread-phonics-word-backup', childId, courseVersionId: versionId })
    await h.db.phonicsWordSchedule.deleteMany({ where: { childId } })
    await h.db.phonicsPracticeAnswer.deleteMany({ where: { childId } })
    await h.db.phonicsTypingResult.deleteMany({ where: { childId } })
    await h.db.phonicsReadingProgress.deleteMany({ where: { childId } })
    expect((await call('PUT', childPath('word-settings'), childToken, { dailyNew: 2, retention: 0.9, autoplay: false, spelling: true, expectedRevision: 0 })).statusCode).toBe(200)
    expect((await call('POST', url, childToken, backup)).statusCode).toBe(403)
    expect((await call('POST', url, parent.token, { ...backup, contentHash: 'a'.repeat(64) })).statusCode).toBe(409)
    expect((await call('POST', url, parent.token, { ...backup, exportedAt: '2999-01-01T00:00:00.000Z' })).statusCode).toBe(400)
    expect((await call('POST', url, parent.token, { ...backup, schedules: [{ ...backup.schedules[0], card: { ...backup.schedules[0].card, stability: -1 } }] })).statusCode).toBe(400)
    expect((await call('POST', url, parent.token, { ...backup, favorites: ['w-map', 'w-map'] })).statusCode).toBe(400)
    expect((await call('POST', url, parent.token, backup)).json()).toEqual({ schedules: 1, favorites: 0, answers: 1, typing: 1, reading: 1 })
    expect((await call('POST', url, parent.token, backup)).json()).toEqual({ schedules: 0, favorites: 0, answers: 0, typing: 0, reading: 0 })
    expect((await call('GET', childPath('word-settings'), childToken)).json().dailyNew).toBe(2)
    expect((await call('GET', childPath('readers/r-l07'), childToken)).json().reader.progress).toMatchObject({ page: 1, fontSize: 26 })
    expect((await call('GET', childPath('practice'), childToken)).json()).toMatchObject({ answerDurationSeconds: 2, typingDurationSeconds: 3 })
  })
  it('isolates self-use catalog, enrollment, learning and signed media and revokes immediately', async () => {
    const row = await h.db.phonicsCourseRelease.update({ where: { versionId }, data: { status: 'self_use' } })
    rolloutOptions.rollout = 'off'
    rolloutOptions.selfUseFamilyId = parent.familyId; rolloutOptions.selfUseHash = row.contentHash
    expect((await call('GET', `${base}/catalog`, parent.token)).json().versions[0].selfUse).toBe(true)
    expect((await call('GET', `${base}/catalog`, other.token)).json().versions).toHaveLength(0)
    expect((await call('GET', `${base}/lessons/${versionId}/L07`, other.token)).statusCode).toBe(409)
    await enroll()
    const { attempt } = await start()
    const media = attempt.assets[0]!.url!
    expect((await call('GET', media, childToken)).statusCode).toBe(200)
    // A signed URL from the owner cannot authorize another household's bearer token.
    expect((await call('GET', media.split('?')[0]!, other.token)).statusCode).toBe(409)
    const advanced = await send(attempt, 'step_ack')
    rolloutOptions.selfUseFamilyId = ''
    expect((await call('GET', media, childToken)).statusCode).toBe(409)
    expect((await call('POST', `${base}/attempts/${attempt.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: advanced.attempt.revision, taskInstanceId: advanced.attempt.state.taskInstanceId, kind: 'step_advanced', payload: {} })).statusCode).toBe(409)
  })
  it('supports pilot enrollment, learning and media only for the selected families', async () => {
    await h.db.phonicsCourseRelease.update({ where: { versionId }, data: { status: 'pilot' } })
    rolloutOptions.rollout = 'pilot'; rolloutOptions.pilotFamilyIds = [parent.familyId]
    expect((await call('GET', `${base}/catalog`, other.token)).json().versions).toHaveLength(0)
    await enroll()
    const { attempt } = await start()
    const media = attempt.assets[0]!
    expect(media.url).toBeTruthy()
    expect((await call('GET', media.url!, childToken)).statusCode).toBe(200)
    const advanced = await send(attempt, 'step_ack')
    expect(advanced.attempt.revision).toBe(1)
    rolloutOptions.rollout = 'all'
    expect((await call('GET', `${base}/catalog`, parent.token)).json().versions).toHaveLength(0)
    expect((await call('GET', media.url!, childToken)).statusCode).toBe(409)
    expect((await call('POST', `${base}/attempts/${attempt.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: 1, taskInstanceId: advanced.attempt.state.taskInstanceId, kind: 'step_advanced', payload: {} })).statusCode).toBe(409)
  })
  it('isolates legacy draft toggles from explicit formal enrollment', async () => {
    const legacy = `/api/children/${childId}/phonics/enrollment`
    expect((await call('PUT', legacy, parent.token, { enabled: true })).statusCode).toBe(200)
    expect((await call('GET', childPath('enrollment'), parent.token)).json().enrollment.enabled).toBe(false)
    const revision = (await call('GET', childPath('enrollment'), parent.token)).json().enrollment.revision
    expect((await call('PUT', childPath('enrollment'), parent.token, enrollmentBody(revision))).statusCode).toBe(200)
    expect((await call('PUT', legacy, parent.token, { enabled: false })).statusCode).toBe(200)
    expect((await call('GET', childPath('enrollment'), parent.token)).json().enrollment.enabled).toBe(true)
    const current = (await call('GET', childPath('enrollment'), parent.token)).json().enrollment
    expect((await call('PUT', childPath('enrollment'), parent.token, { ...enrollmentBody(current.revision), enabled: false })).statusCode).toBe(200)
    expect((await call('PUT', legacy, parent.token, { enabled: true })).statusCode).toBe(200)
    expect((await call('GET', childPath('enrollment'), parent.token)).json().enrollment.enabled).toBe(false)
  })
  it('requires explicit version binding, parent role and family ownership', async () => {
    expect((await call('GET', `${base}/catalog`, childToken)).json().versions).toHaveLength(1)
    expect((await call('POST', childPath('attempts'), childToken, { clientAttemptId: randomUUID(), versionId, planKind: 'lesson', resourceKey: 'L07' })).statusCode).toBe(403)
    expect((await call('PUT', childPath('enrollment'), childToken, enrollmentBody())).statusCode).toBe(403)
    expect((await call('PUT', childPath('enrollment'), other.token, enrollmentBody())).statusCode).toBe(404)
    await enroll()
    expect((await call('PUT', childPath('enrollment'), parent.token, enrollmentBody())).statusCode).toBe(409)
  })
  it('does not expose judge fields or future hints', async () => {
    await enroll(); const { attempt } = await start()
    expect(attempt.available).toBe(true)
    expect(attempt.task).not.toHaveProperty('judge')
    expect(attempt.task).not.toHaveProperty('hintAssetIds')
    const lesson = (await call('GET', `${base}/lessons/${versionId}/L07`, childToken)).json()
    expect(JSON.stringify(lesson)).not.toContain('answerIds')
    expect((await call('GET', `${base}/attempts/${attempt.id}`, other.token)).statusCode).toBe(404)
  })
  it('replays start keys after completion, without creating a new attempt', async () => {
    await enroll(); const { attempt, body } = await start()
    await finishAll(attempt)
    const repeated = await call('POST', childPath('attempts'), childToken, body)
    expect(repeated.json().attempt).toMatchObject({ id: attempt.id, status: 'completed' })
    expect(await h.db.phonicsAttempt.count({ where: { childId } })).toBe(1)
    expect((await call('POST', childPath('attempts'), childToken, { ...body, planKind: 'review', resourceKey: undefined })).statusCode).toBe(409)
  })
  it('allows only one active plan and does not create an idempotency alias', async () => {
    await enroll(); const { attempt } = await start()
    const alternate = { clientAttemptId: randomUUID(), versionId, planKind: 'review' }
    expect((await call('POST', childPath('attempts'), childToken, alternate)).statusCode).toBe(409)
    expect((await call('GET', childPath('next'), childToken)).json().next.attemptId).toBe(attempt.id)
    expect(await h.db.phonicsAttempt.count({ where: { childId, activeKey: { not: null } } })).toBe(1)
  })
  it('preserves first errors and help across retry, pause and recovery', async () => {
    await enroll(); let { attempt: a } = await start()
    for (let i = 0; i < 2; i++) { a = (await send(a, 'step_ack')).attempt; a = (await send(a, 'step_advanced')).attempt }
    a = (await send(a, 'response_submitted', { answerIds: ['s'] })).attempt
    expect(a.state).toMatchObject({ correct: false, responseCount: 1 })
    a = (await send(a, 'hint_requested')).attempt
    a = (await control(a, 'pause')).attempt
    a = (await control(a, 'resume')).attempt
    expect(a.state).toMatchObject({ hintLevel: 1, correct: false, responseCount: 1 })
    a = (await send(a, 'retry_requested')).attempt
    const corrected = await send(a, 'response_submitted', { answerIds: ['m'] }); a = corrected.attempt
    expect(corrected.result).toMatchObject({ correct: true, firstResponse: false, evidenceRole: 'practice' })
    const responses = await h.db.phonicsLearningEvent.findMany({ where: { attemptId: a.id, kind: 'response_submitted' }, orderBy: { serverSequence: 'asc' } })
    expect(responses.map(r => JSON.parse(r.resultJson).correct)).toEqual([false, true])
  })
  it('handles lost receipts, changed payloads and stale device revisions', async () => {
    await enroll(); const { attempt: a } = await start()
    const body = { clientEventId: randomUUID(), expectedRevision: a.revision, taskInstanceId: a.state.taskInstanceId, kind: 'step_ack', payload: {} }
    const url = `${base}/attempts/${a.id}/events`
    const results = await Promise.all([call('POST', url, childToken, body), call('POST', url, childToken, body)])
    expect(results.map(r => r.statusCode)).toEqual([200, 200])
    expect(results[0]!.json().eventId).toBe(results[1]!.json().eventId)
    expect(await h.db.phonicsLearningEvent.count({ where: { attemptId: a.id } })).toBe(1)
    expect((await call('POST', url, childToken, { ...body, kind: 'hint_requested' })).statusCode).toBe(409)
    expect((await call('POST', url, childToken, { ...body, clientEventId: randomUUID() })).statusCode).toBe(409)
  })
  it('rejects forged observations/scores, v1 access and premature completion', async () => {
    await enroll(); const { attempt: a, body } = await start()
    expect((await call('POST', `${base}/attempts/${a.id}/finish`, childToken, { clientEventId: randomUUID(), expectedRevision: 0 })).statusCode).toBe(409)
    expect((await call('POST', `${base}/attempts/${a.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: 0, taskInstanceId: a.state.taskInstanceId, kind: 'caregiver_observation', payload: { correct: true } })).statusCode).toBe(400)
    expect((await call('POST', `/api/phonics/attempts/${a.id}/resume`, childToken)).statusCode).toBe(404)
    expect((await call('POST', `/api/phonics/attempts/${a.id}/finish`, childToken, { status: 'completed' })).statusCode).toBe(404)
    expect((await call('POST', `/api/phonics/attempts/${a.id}/responses`, childToken, { itemId: 'x', answerId: 'x' })).statusCode).toBe(404)
    expect((await call('PUT', `/api/children/${childId}/phonics/enrollment`, parent.token, { enabled: true })).statusCode).toBe(200)
    expect((await call('POST', `/api/children/${childId}/phonics/attempts`, childToken, { clientAttemptId: body.clientAttemptId, lessonId: 'draft-en-l01' })).statusCode).toBe(409)
    expect((await call('GET', `/api/children/${childId}/phonics/summary`, parent.token)).json().attempts).toHaveLength(0)
  })
  it('keeps oral reports unknown and appends parent corrections after completion', async () => {
    await enroll(); const finished = await finishAll((await start()).attempt)
    let a = finished.attempt
    const target = finished.oral[0]!
    const body = { clientEventId: randomUUID(), expectedRevision: a.revision, taskInstanceId: target.taskInstanceId, observation: 'independent' }
    expect((await call('POST', `${base}/attempts/${a.id}/observations`, childToken, body)).statusCode).toBe(403)
    const added = await call('POST', `${base}/attempts/${a.id}/observations`, parent.token, body)
    expect(added.statusCode, added.body).toBe(200)
    a = added.json<Receipt>().attempt
    expect(added.json<Receipt>().result.correct).toBeNull()
    const corrected = await call('POST', `${base}/attempts/${a.id}/observations`, parent.token, { ...body, clientEventId: randomUUID(), expectedRevision: a.revision, observation: 'not_observed', supersedesEventId: added.json<Receipt>().eventId })
    expect(corrected.statusCode, corrected.body).toBe(200)
    const summary = (await call('GET', childPath('summary'), parent.token)).json()
    expect(summary).toMatchObject({ caregiverObservedCount: 0, unobservedOralTaskCount: 3 })
    expect(summary.observations).toHaveLength(1)
    expect(summary.oralTasks.find((t: { targetId: string }) => t.targetId === 'w-mat')).toMatchObject({ text: 'mat', pageNumber: null })
    expect(summary.oralTasks.filter((t: { pageNumber: number | null }) => t.pageNumber !== null).map((t: { pageNumber: number }) => t.pageNumber).sort()).toEqual([1, 2])
    expect((await call('GET', childPath('summary'), childToken)).json()).not.toHaveProperty('observations')
    expect((await call('GET', childPath('summary'), childToken)).json()).not.toHaveProperty('oralTasks')
    expect((await h.db.phonicsLearningEvent.findMany({ where: { attemptId: a.id, kind: 'self_read_reported' } })).every(e => JSON.parse(e.resultJson).correct === null)).toBe(true)
  })
  it('cannot relabel an assisted oral attempt as independently read', async () => {
    await enroll(); const finished = await finishAll((await start()).attempt, 'needs_help')
    const body = { clientEventId: randomUUID(), expectedRevision: finished.attempt.revision, taskInstanceId: finished.oral[0]!.taskInstanceId, observation: 'independent' }
    expect((await call('POST', `${base}/attempts/${finished.attempt.id}/observations`, parent.token, body)).statusCode).toBe(400)
    expect((await call('POST', `${base}/attempts/${finished.attempt.id}/observations`, parent.token, { ...body, clientEventId: randomUUID(), observation: 'with_help' })).statusCode).toBe(200)
    const summary = (await call('GET', childPath('summary'), parent.token)).json()
    expect(summary.oralTasks.every((t: { hadHelp: boolean }) => t.hadHelp)).toBe(true)
  })
  it('remembers the reader page and refuses skipping unread pages', async () => {
    await enroll(); let { attempt: a } = await start()
    while (a.task?.kind !== 'read') {
      if (a.task!.kind === 'listen') a = (await send(a, 'step_ack')).attempt
      else if (a.task!.kind === 'choice') a = (await send(a, 'response_submitted', { answerIds: ['m'] })).attempt
      else if (a.task!.kind === 'build') a = (await send(a, 'response_submitted', { answerIds: ['m', 'a', 'p'] })).attempt
      else a = (await send(a, 'self_read_reported', { report: 'tried' })).attempt
      a = (await send(a, 'step_advanced')).attempt
    }
    a = (await send(a, 'self_read_reported', { report: 'tried' })).attempt
    expect((await call('POST', `${base}/attempts/${a.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: a.revision, taskInstanceId: a.state.taskInstanceId, kind: 'step_advanced', payload: {} })).statusCode).toBe(409)
    a = (await send(a, 'reader_page_advanced')).attempt
    a = (await control(a, 'pause')).attempt
    expect((await call('GET', `${base}/attempts/${a.id}`, childToken)).json().attempt.state.pageIndex).toBe(1)
  })
  it('withdraws content without destroying receipts and safely closes the old active plan', async () => {
    await enroll(); let { attempt: a } = await start()
    const body = { clientEventId: randomUUID(), expectedRevision: a.revision, taskInstanceId: a.state.taskInstanceId, kind: 'step_ack', payload: {} }
    const accepted = await call('POST', `${base}/attempts/${a.id}/events`, childToken, body); a = accepted.json<Receipt>().attempt
    await h.db.phonicsCourseRelease.update({ where: { versionId }, data: { status: 'withdrawn' } })
    expect((await call('POST', `${base}/attempts/${a.id}/events`, childToken, body)).json()).toMatchObject({ repeated: true, attempt: { available: false, assets: [] } })
    expect((await call('POST', `${base}/attempts/${a.id}/resume`, childToken, { clientEventId: randomUUID(), expectedRevision: a.revision })).statusCode).toBe(409)
    a = (await control(a, 'cancel', { reason: 'content_unavailable' })).attempt
    expect(a.status).toBe('cancelled')
    expect((await h.db.phonicsAttempt.findUniqueOrThrow({ where: { id: a.id } })).activeKey).toBeNull()
    expect((await call('PUT', childPath('enrollment'), parent.token, { ...enrollmentBody(1), enabled: false })).statusCode).toBe(200)
  })
  it('counts all starts with pagination, separating rereads from unique lessons', async () => {
    await enroll(); const finished = await finishAll((await start()).attempt)
    const source = await h.db.phonicsAttempt.findUniqueOrThrow({ where: { id: finished.attempt.id } })
    for (let i = 0; i < 31; i++) await h.db.phonicsAttempt.create({ data: { childId, clientAttemptId: randomUUID(), lessonId: 'v2:reread:r-l07', protocolVersion: 2, courseVersionId: versionId, planKind: 'reread', status: 'cancelled', planJson: source.planJson, planHash: source.planHash, stateJson: source.stateJson } })
    const summary = (await call('GET', childPath('summary'), parent.token)).json()
    expect(summary).toMatchObject({ totalAttempts: 32, cancelledAttempts: 31, completedAttempts: 1, pagination: { total: 32, limit: 20 } })
    expect(summary.recentPractice).toHaveLength(20)
    expect(summary.completedLessonKeys).toHaveLength(1)
    expect((await call('GET', childPath('summary?page=1'), parent.token)).json().recentPractice).toHaveLength(12)
    const reread = await call('POST', childPath('attempts'), childToken, { clientAttemptId: randomUUID(), versionId, planKind: 'reread', resourceKey: 'r-l07' })
    expect(reread.json().attempt).toMatchObject({ planKind: 'reread', stepCount: 1, state: { pageIndex: 0 } })
  })
  it('opens word cards only after the introducing lesson completes, with image, three readings and meaning', async () => {
    expect((await call('GET', childPath('words'), childToken)).json().words).toEqual([])
    await enroll()
    expect((await call('GET', childPath('words'), childToken)).json().words).toHaveLength(0)
    await finishAll((await start()).attempt)
    const words = (await call('GET', childPath('words'), childToken)).json().words
    expect(words.map((w: { id: string }) => w.id)).toEqual(['w-sat', 'w-mat', 'w-map', 'w-sam'])
    for (const word of words) {
      expect(word.meaningZh).toBeTruthy()
      expect(word.audios.map((a: { purpose: string }) => a.purpose)).toEqual(['segment', 'blend', 'word'])
      for (const audio of word.audios) {
        expect(audio.url).toContain(`/api/media/phonics/${versionId}/`)
        expect(audio.durationMs).toBeGreaterThan(0)
      }
    }
    // w-sam has no task image; the card falls back to the reader page illustration instead of failing.
    const sam = words.find((w: { id: string }) => w.id === 'w-sam')
    expect(sam.image?.url).toContain('/api/media/phonics/')
    // Enrollment is the gate: another household's child gets an empty list, not another family's cards.
    const otherChild = await createChild(h.app, other.token, other.familyId, '邻家孩子', '6-8')
    expect((await call('GET', `${base}/children/${otherChild}/words`, other.token)).json().words).toEqual([])
    expect((await call('GET', childPath('words'), other.token)).statusCode).toBe(404)
  })
  it('protects whitelisted media, Range responses and withdrawn URLs', async () => {
    await enroll(); const { attempt: a } = await start()
    const url = a.assets.find(x => x.purpose === 'instruction_zh')!.url!
    const audio = await h.app.inject({ method: 'GET', url, headers: { range: 'bytes=0-9' } })
    expect(audio.statusCode, audio.body).toBe(206)
    expect(audio.headers['cache-control']).toBe('private, no-store')
    expect(audio.headers['content-type']).toContain('audio/wav')
    expect(audio.rawPayload.length).toBe(10)
    expect((await h.app.inject({ method: 'GET', url: url.split('?')[0]! })).statusCode).toBe(401)
    expect((await call('GET', url.split('?')[0]!, other.token)).statusCode).toBe(403)
    expect((await call('GET', `/api/media/phonics/${versionId}/${'0'.repeat(64)}.wav`, parent.token)).statusCode).toBe(404)
    await h.db.phonicsCourseRelease.update({ where: { versionId }, data: { status: 'withdrawn' } })
    expect((await h.app.inject({ method: 'GET', url })).statusCode).toBe(409)
  })
})

describe('phonics v2 sidecar lexicon and US audio pack', () => {
  const runtimeOf = () => (h.app as unknown as { phonicsRuntime: { sidecars: Map<string, unknown> } }).phonicsRuntime
  const fixturePcm = async () => {
    // 与 phonicsFixture 相同参数的短 PCM 容器，哈希一致即可复用已写入 media 的物理文件
    const { createHash } = await import('node:crypto')
    const pcmLength = 1600, wav = Buffer.alloc(44 + pcmLength * 2)
    wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8)
    wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22)
    wav.writeUInt32LE(16000, 24); wav.writeUInt32LE(32000, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34)
    wav.write('data', 36); wav.writeUInt32LE(pcmLength * 2, 40)
    for (let i = 0; i < pcmLength; i++) wav.writeInt16LE(Math.round(300 * Math.sin(2 * Math.PI * 220 * i / 16000)), 44 + i * 2)
    return { wav, sha: createHash('sha256').update(wav).digest('hex') }
  }
  it('serves lexicon entries and US whole-word audio for the self-use family only', async () => {
    const { writeFile } = await import('node:fs/promises')
    const { wav, sha: wavSha } = await fixturePcm()
    const mp3 = Buffer.from('ID3 Synthetic test tone - not speech')
    await writeFile(path.join(root, 'phonics', versionId, `${wavSha}.wav`), wav).catch(() => undefined)
    const mp3Sha = (await import('node:crypto')).createHash('sha256').update(mp3).digest('hex')
    await writeFile(path.join(root, 'phonics', versionId, `${mp3Sha}.mp3`), mp3)
    runtimeOf().sidecars.set(versionId, {
      lexicon: {
        schemaVersion: 1, courseVersionId: versionId, courseContentHash: versionId, humanReviewed: false, reviewStatus: 'pending', generatedAt: new Date().toISOString(),
        sources: {}, counts: { entries: 1, wordAtlas: 1, taoreadOriginal: 0, exampleAudio: 1 },
        entries: [{ wordId: 'w-map', word: 'map', source: 'word-atlas', reviewStatus: 'pending', ukIpa: '/mæp/', usIpa: '/mæp/', senses: [{ pos: 'n.', zh: '地图', en: 'A drawing of places.' }], example: { en: 'The map fell on the mat.', zh: '地图掉到了垫子上。', audio: { sha256: mp3Sha, durationMs: 100, bytes: mp3.length, voice: 'Synthetic test tone' } }, collocations: [], family: [], tip: '测试用', cefr: null }],
      },
      usAudio: {
        schemaVersion: 1, courseVersionId: versionId, courseHash: versionId, requestedAccent: 'US', actualAccent: null,
        provider: 'test', model: 'test', voice: 'test', humanReviewed: false, rightsReviewed: false, publicationApproved: false, source: 'test',
        counts: { assets: 1 }, assets: [{ wordId: 'w-map', word: 'map', sha256: wavSha, durationMs: 100, bytes: wav.length }],
      },
      problems: [],
    })
    // 旁挂媒体按政策仅自用家庭可用：打开自用开关（哈希用已安装课程的真实内容哈希）
    const runtime = runtimeOf() as unknown as { courses: Map<string, { manifest: { contentHash: string } }> }
    rolloutOptions.selfUseFamilyId = parent.familyId
    rolloutOptions.selfUseHash = runtime.courses.get(versionId)!.manifest.contentHash
    await enroll()
    // 注意：sidecar 的哈希锁定字段填的是 versionId 占位；真实清单在 loadSidecars 里校验 courseHash。
    expect((await call('PUT', childPath('word-settings'), parent.token, { dailyNew: 3, retention: 0.9, autoplay: false, spelling: true, accent: 'US', expectedRevision: 0 })).statusCode).toBe(200)
    const atlas = (await call('GET', childPath('atlas'), childToken)).json<{ atlas: { words: Array<{ id: string; lexicon: unknown; wordAudioAccent?: string; audios: Array<{ id: string; purpose: string; url: string | null }> }> } }>().atlas
    const map = atlas.words.find(w => w.id === 'w-map')!
    expect(map.wordAudioAccent).toBe('US')
    expect(map.audios.find(a => a.purpose === 'word')?.id).toBe(`us-word:w-map`)
    expect((map.lexicon as { example: { en: string; audio: { url: string } | null } }).example.en).toContain('map')
    expect((map.lexicon as { example: { audio: { url: string } | null } }).example.audio?.url).toContain(`${mp3Sha}.mp3`)
    const mat = atlas.words.find(w => w.id === 'w-mat')!
    expect(mat.wordAudioAccent).toBe('GB')
    // 旁挂媒体对自用家庭放行：用 DTO 下发的带票 URL 直接取流
    const lexUrl = (map.lexicon as { example: { audio: { url: string } | null } }).example.audio!.url!
    const usUrl = map.audios.find(a => a.purpose === 'word')!.url!
    const lexRes = await h.app.inject({ method: 'GET', url: lexUrl, headers: authHeaders(childToken) })
    expect(lexRes.statusCode, lexRes.body).toBe(200)
    const usRes = await h.app.inject({ method: 'GET', url: usUrl, headers: authHeaders(childToken) })
    expect(usRes.statusCode, usRes.body).toBe(200)
    const otherChild = await createChild(h.app, other.token, other.familyId, '邻家孩子', '6-8')
    await call('PUT', `${base}/children/${otherChild}/enrollment`, other.token, { enabled: true, versionId, entryMode: 'lesson', entryLessonKey: 'L07', expectedRevision: 0 })
    // 非自用家庭拿不到旁挂媒体：404 不暴露存在性（与「媒体不存在」同一口径）
    expect((await h.app.inject({ method: 'GET', url: lexUrl, headers: authHeaders(other.token) })).statusCode).toBe(404)
    // 词卡列表按进度开放：走完 L07 后再取，整词音频同样按口音下发
    const { attempt } = await start()
    await finishAll(attempt)
    const cards = (await call('GET', childPath('words'), childToken)).json<{ words: Array<{ id: string; wordAudioAccent?: string; audios: Array<{ purpose: string; id: string }> }> }>().words
    const cardMap = cards.find(w => w.id === 'w-map')!
    expect(cardMap.wordAudioAccent).toBe('US')
    expect(cardMap.audios.find(a => a.purpose === 'word')?.id).toBe('us-word:w-map')
    // 换回英音：回落 GB 资产
    await call('PUT', childPath('word-settings'), parent.token, { dailyNew: 3, retention: 0.9, autoplay: false, spelling: true, accent: 'GB', expectedRevision: 1 })
    const atlasGb = (await call('GET', childPath('atlas'), childToken)).json<{ atlas: { words: Array<{ id: string; wordAudioAccent?: string }> } }>().atlas
    expect(atlasGb.words.find(w => w.id === 'w-map')?.wordAudioAccent).toBe('GB')
    runtimeOf().sidecars.delete(versionId)
    // 口音非法值被拒绝
    expect((await call('PUT', childPath('word-settings'), parent.token, { dailyNew: 3, retention: 0.9, autoplay: false, spelling: true, accent: 'XX', expectedRevision: 2 })).statusCode).toBe(400)
  })
})
