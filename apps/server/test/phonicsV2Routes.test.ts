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
