import { Prisma, type PhonicsAttempt, type PrismaClient } from '@prisma/client'
import type { z } from 'zod'
import type { PhonicsAttemptDto, PhonicsEnrollmentDto, PhonicsEventRequest, PhonicsNextDto, PhonicsWordCardDto } from '@taoread/shared'
import type { TokenClaims } from '../../../lib/auth'
import { AppError } from '../../../lib/errors'
import { mediaUrl } from '../../media/access'
import { digest, publicTask, courseHash } from './courseRegistry'
import type { PhonicsCourse } from './contracts'
import { controlSchema, enrollmentSchema, observationSchema, startSchema } from './contracts'
import { applyLearningEvent, initialState, taskAt, type FrozenPlan, type LessonState } from './lessonMachine'
import { PhonicsRuntime } from './runtime'
import { dueLessonKeys, recentSupport, recommend, reviewTasks, REVIEW_RULE_VERSION, type PracticeHistory, type SupportTarget } from './review'

type Tx = Prisma.TransactionClient
type StartInput = z.infer<typeof startSchema>
type EnrollmentInput = z.infer<typeof enrollmentSchema>
type ControlInput = z.infer<typeof controlSchema>
type ObservationInput = z.infer<typeof observationSchema>
const conflict = () => new AppError('进度已变化，请恢复最新进度', 'ATTEMPT_CHANGED', 409)
const planOf = (attempt: PhonicsAttempt): FrozenPlan => JSON.parse(attempt.planJson!) as FrozenPlan
const stateOf = (attempt: PhonicsAttempt): LessonState => JSON.parse(attempt.stateJson!) as LessonState
const seconds = (date: Date) => Math.floor(date.getTime() / 1000)

export class PhonicsService {
  constructor(readonly db: PrismaClient, readonly runtime: PhonicsRuntime, readonly tokenSecret: Buffer) {}

  async ownChild(claims: TokenClaims, childId: string): Promise<void> {
    if (!await this.db.childProfile.findFirst({ where: { id: childId, familyId: claims.fid }, select: { id: true } })) throw new AppError('没有找到孩子档案', 'CHILD_NOT_FOUND', 404)
  }

  async ownAttempt(claims: TokenClaims, id: string): Promise<PhonicsAttempt> {
    const attempt = await this.db.phonicsAttempt.findFirst({ where: { id, protocolVersion: 2, child: { familyId: claims.fid } } })
    if (!attempt) throw new AppError('没有找到这次练习', 'ATTEMPT_NOT_FOUND', 404)
    return attempt
  }

  async enrollment(claims: TokenClaims, childId: string): Promise<PhonicsEnrollmentDto> {
    await this.ownChild(claims, childId)
    const row = await this.db.phonicsEnrollment.findUnique({ where: { childId } })
    return { enabled: row?.v2Enabled ?? false, versionId: row?.courseVersionId ?? null, entryMode: row?.entryMode === 'entry' ? 'entry' : 'lesson', entryLessonKey: row?.entryLessonKey ?? null, revision: row?.revision ?? 0 }
  }

  async enabled(claims: TokenClaims, childId: string, versionId: string, tx: Tx = this.db): Promise<void> {
    const enrollment = await tx.phonicsEnrollment.findUnique({ where: { childId } })
    if (!enrollment?.v2Enabled || enrollment.courseVersionId !== versionId) throw new AppError('请先让家长开启这套英语练习', 'PHONICS_DISABLED', 403)
    await this.runtime.requireCourse(claims.fid, versionId, tx)
  }

  async setEnrollment(claims: TokenClaims, childId: string, input: EnrollmentInput) {
    await this.ownChild(claims, childId)
    const current = await this.enrollment(claims, childId)
    const onlyDisabling = !input.enabled && current.versionId === input.versionId && current.entryMode === input.entryMode && current.entryLessonKey === input.entryLessonKey
    const course = onlyDisabling ? this.runtime.courses.get(input.versionId) : await this.runtime.requireCourse(claims.fid, input.versionId)
    if (course && !course.lessons.some(l => l.id === input.entryLessonKey)) throw new AppError('起点不存在', 'LESSON_NOT_FOUND', 400)
    await this.transaction(async tx => {
      const existing = await tx.phonicsEnrollment.findUnique({ where: { childId } })
      if ((existing?.revision ?? 0) !== input.expectedRevision) throw conflict()
      const active = await tx.phonicsAttempt.findUnique({ where: { activeKey: `v2:${childId}` } })
      const changingPlan = existing?.courseVersionId !== input.versionId || existing.entryMode !== input.entryMode || existing.entryLessonKey !== input.entryLessonKey
      if (active && changingPlan) {
        const close = input.closeActive
        if (!close || close.attemptId !== active.id || close.expectedRevision !== active.revision) throw new AppError('请先确认关闭原来的练习，再调整起点', 'ACTIVE_ATTEMPT_EXISTS', 409)
        const state = stateOf(active)
        const result = { status: 'cancelled', reason: 'version_change' }
        const updated = await tx.phonicsAttempt.updateMany({ where: { id: active.id, revision: active.revision }, data: { status: 'cancelled', activeKey: null, closeReason: 'version_change', finishedAt: new Date(), revision: { increment: 1 } } })
        if (updated.count !== 1) throw conflict()
        await tx.phonicsLearningEvent.create({ data: { attemptId: active.id, clientEventId: close.clientEventId, requestHash: digest({ kind: 'version_change', childId, input }), serverSequence: active.revision + 1, taskInstanceId: state.taskInstanceId, stepKey: planOf(active).stepTaskIds[state.stepIndex], kind: 'attempt_cancelled', actorRole: claims.role, payloadJson: JSON.stringify({ reason: 'version_change' }), resultJson: JSON.stringify(result) } })
      }
      if (existing) {
        const changed = await tx.phonicsEnrollment.updateMany({ where: { childId, revision: input.expectedRevision }, data: { v2Enabled: input.enabled, courseVersionId: input.versionId, entryMode: input.entryMode, entryLessonKey: input.entryLessonKey, revision: { increment: 1 } } })
        if (changed.count !== 1) throw conflict()
      } else await tx.phonicsEnrollment.create({ data: { childId, v2Enabled: input.enabled, courseVersionId: input.versionId, entryMode: input.entryMode, entryLessonKey: input.entryLessonKey, revision: 1 } })
    })
    return this.enrollment(claims, childId)
  }

  async practiceHistory(childId: string, versionId: string) {
    const rows = await this.db.phonicsAttempt.findMany({ where: { childId, protocolVersion: 2, courseVersionId: versionId }, orderBy: [{ startedAt: 'desc' }, { id: 'desc' }] })
    const history: PracticeHistory[] = rows.map(row => {
      const plan = planOf(row)
      return { id: row.id, status: row.status, kind: row.planKind, lessonKey: row.lessonKey, lessonKeys: plan.lessonKeys, targetIds: plan.tasks.filter(t => plan.stepTaskIds.includes(t.id)).map(t => t.wordId ?? t.mappingId ?? t.readerId ?? t.id), startedAt: seconds(row.startedAt), finishedAt: row.finishedAt ? seconds(row.finishedAt) : null }
    })
    const events = await this.db.phonicsLearningEvent.findMany({ where: { attempt: { childId, protocolVersion: 2, courseVersionId: versionId }, receivedAt: { gte: new Date(Date.now() - 7 * 86400_000) }, kind: { in: ['hint_requested', 'response_submitted', 'self_read_reported', 'task_skipped_with_help'] } }, orderBy: { receivedAt: 'desc' } })
    const support: SupportTarget[] = []
    for (const event of events) {
      const result = JSON.parse(event.resultJson) as { targetId?: string; correct?: boolean | null; helpLevel?: number; report?: string }
      if (result.targetId && (result.correct === false || (result.helpLevel ?? 0) > 0 || result.report === 'needs_help') && !support.some(t => t.targetId === result.targetId)) support.push({ targetId: result.targetId, receivedAt: seconds(event.receivedAt) })
    }
    return { history, support }
  }

  async next(claims: TokenClaims, childId: string): Promise<PhonicsNextDto> {
    const enrollment = await this.enrollment(claims, childId)
    const active = await this.db.phonicsAttempt.findUnique({ where: { activeKey: `v2:${childId}` } })
    if (!enrollment.enabled || !enrollment.versionId) return { reason: 'disabled', label: '请家长帮忙开启英语练习', ...(active ? { attemptId: active.id } : {}) }
    if (!await this.runtime.available(claims.fid, enrollment.versionId)) return { reason: 'unavailable', label: '这份英语内容暂时不能使用', ...(active ? { attemptId: active.id, versionId: active.courseVersionId! } : {}) }
    if (active) return await this.runtime.available(claims.fid, active.courseVersionId!) ? { reason: 'continue', label: '接着上次玩', attemptId: active.id, versionId: active.courseVersionId! } : { reason: 'unavailable', label: '请家长关闭原来的进度，再选择可用内容' }
    const { history, support } = await this.practiceHistory(childId, enrollment.versionId)
    return recommend(this.runtime.courses.get(enrollment.versionId)!, { ...enrollment, history, support, nowSec: Math.floor(Date.now() / 1000) })
  }

  async makePlan(claims: TokenClaims, childId: string, course: PhonicsCourse, input: StartInput): Promise<FrozenPlan> {
    const enrollment = await this.enrollment(claims, childId)
    const { history, support } = await this.practiceHistory(childId, input.versionId)
    const completed = new Set(history.filter(h => h.kind === 'lesson' && h.status === 'completed').map(h => h.lessonKey!))
    const startOrder = course.lessons.find(l => l.id === enrollment.entryLessonKey)?.order ?? 1
    const eligible = course.lessons.filter(l => completed.has(l.id) || l.order < startOrder).map(l => l.id)
    const next = recommend(course, { ...enrollment, history: history.filter(h => !['started', 'paused'].includes(h.status)), support, nowSec: Math.floor(Date.now() / 1000) })
    let taskIds: string[] = [], lessonKeys: string[] = []
    let overrides = new Map<string, typeof course.tasks[number]>()
    if (input.planKind === 'entry') {
      taskIds = course.entryPlans.find(e => e.id === input.resourceKey)?.taskIds ?? []
    } else if (input.planKind === 'lesson') {
      const lesson = course.lessons.find(l => l.id === input.resourceKey)
      if (!lesson) throw new AppError('没有这节练习', 'LESSON_NOT_FOUND', 404)
      if (!completed.has(lesson.id) && (next.planKind !== 'lesson' || next.resourceKey !== lesson.id)) throw new AppError('先完成当前准备或复习，再认识新声音', 'PREREQUISITE_REQUIRED', 409)
      taskIds = [...lesson.taskIds]; lessonKeys = [lesson.id]
      // Explicit bridge for a parent-selected later entry; never fabricates prior completions.
      if (lesson.order === startOrder && startOrder > 1 && !completed.has(lesson.id)) {
        const bridge = course.lessons.filter(l => l.order < startOrder).flatMap(l => l.taskIds).filter(id => {
          const task = course.tasks.find(t => t.id === id)!
          return task.kind === 'listen' && (task.skill === 'meaning' || (task.skill === 'mapping' && task.role === 'model'))
        })
        taskIds = [...new Set([...bridge, ...taskIds])]
      }
    } else if (input.planKind === 'review') {
      const due = dueLessonKeys(history, Math.floor(Date.now() / 1000)).filter(key => eligible.includes(key))
      const chosen = reviewTasks(course, next.reason === 'spaced_review' ? due : eligible, next.reason === 'support' ? recentSupport(history, support, Math.floor(Date.now() / 1000)).map(s => s.targetId) : [])
      // Only credit the source lessons actually represented in this short plan.
      lessonKeys = course.lessons.filter(l => chosen.some(t => l.taskIds.includes(t.id))).map(l => l.id)
      taskIds = chosen.map(t => t.id); overrides = new Map(chosen.map(t => [t.id, t]))
    } else {
      const reader = course.readers.find(r => r.id === input.resourceKey)
      if (!reader || !eligible.includes(reader.introducedAt)) throw new AppError('这份阅读材料还没有开放', 'READER_NOT_READY', 409)
      const task = course.tasks.find(t => t.readerId === reader.id)
      if (task) taskIds = [task.id]
      lessonKeys = [reader.introducedAt]
    }
    if (!taskIds.length) throw new AppError('目前没有可开始的活动', 'PLAN_UNAVAILABLE', 409)
    const allTaskIds = new Set(taskIds)
    const includeEasier = (id: string) => {
      const easier = course.tasks.find(t => t.id === id)?.easierTaskId
      if (easier && !allTaskIds.has(easier)) { allTaskIds.add(easier); includeEasier(easier) }
    }
    taskIds.forEach(includeEasier)
    return { versionId: input.versionId, kind: input.planKind, resourceKey: input.resourceKey, courseHash: courseHash(course), ruleVersion: REVIEW_RULE_VERSION, lessonKeys, stepTaskIds: taskIds, tasks: [...allTaskIds].map(id => overrides.get(id) ?? course.tasks.find(t => t.id === id)!), readers: course.readers.filter(r => [...allTaskIds].some(id => course.tasks.find(t => t.id === id)?.readerId === r.id)) }
  }

  async start(claims: TokenClaims, childId: string, input: StartInput): Promise<PhonicsAttempt> {
    await this.ownChild(claims, childId)
    const requestHash = digest(input)
    const key = { childId_clientAttemptId: { childId, clientAttemptId: input.clientAttemptId } }
    const repeated = await this.db.phonicsAttempt.findUnique({ where: key })
    if (repeated) {
      if (repeated.protocolVersion !== 2 || repeated.startRequestHash !== requestHash) throw new AppError('开始编号已用于其他活动', 'IDEMPOTENCY_CONFLICT', 409)
      return repeated
    }
    await this.enabled(claims, childId, input.versionId)
    const course = await this.runtime.requireCourse(claims.fid, input.versionId)
    const enrollmentRevision = (await this.enrollment(claims, childId)).revision
    const plan = await this.makePlan(claims, childId, course, input)
    return this.transaction(async tx => {
      const saved = await tx.phonicsAttempt.findUnique({ where: key })
      if (saved) {
        if (saved.protocolVersion !== 2 || saved.startRequestHash !== requestHash) throw new AppError('开始编号已用于其他活动', 'IDEMPOTENCY_CONFLICT', 409)
        return saved
      }
      const active = await tx.phonicsAttempt.findUnique({ where: { activeKey: `v2:${childId}` } })
      if (active) {
        // A new start key cannot alias an old attempt without durable idempotency storage.
        // Return a conflict; /next supplies the single resumable attempt instead.
        throw new AppError('已有一段练习，先接着玩或请家长调整', 'ACTIVE_ATTEMPT_EXISTS', 409)
      }
      const enrollment = await tx.phonicsEnrollment.findUnique({ where: { childId } })
      if (!enrollment?.v2Enabled || enrollment.revision !== enrollmentRevision || enrollment.courseVersionId !== input.versionId) throw conflict()
      const release = await tx.phonicsCourseRelease.findUnique({ where: { versionId: input.versionId } })
      if (!this.runtime.releaseAllowed(claims.fid, release, plan.courseHash)) throw new AppError('课程已变化', 'COURSE_UNAVAILABLE', 409)
      return tx.phonicsAttempt.create({ data: { childId, clientAttemptId: input.clientAttemptId, protocolVersion: 2, lessonId: `v2:${input.planKind}:${input.resourceKey ?? 'review'}`, courseVersionId: input.versionId, lessonKey: input.planKind === 'lesson' ? input.resourceKey : null, lessonHash: input.planKind === 'lesson' ? digest(course.lessons.find(l => l.id === input.resourceKey)) : null, planKind: input.planKind, planJson: JSON.stringify(plan), planHash: digest(plan), startRequestHash: requestHash, stateJson: JSON.stringify(initialState(plan)), currentStepKey: plan.stepTaskIds[0], activeKey: `v2:${childId}` } })
    })
  }

  async dto(claims: TokenClaims, attempt: PhonicsAttempt): Promise<PhonicsAttemptDto> {
    const plan = planOf(attempt), state = stateOf(attempt)
    const available = await this.runtime.available(claims.fid, attempt.courseVersionId!) && Boolean(await this.db.phonicsEnrollment.findFirst({ where: { childId: attempt.childId, v2Enabled: true, courseVersionId: attempt.courseVersionId } }))
    const task = available ? taskAt(plan, state) : null
    const course = this.runtime.courses.get(attempt.courseVersionId!)
    const reader = task?.readerId ? plan.readers.find(r => r.id === task.readerId) ?? null : null
    const readerPage = reader?.pages[state.pageIndex]
    const activeHints = reader ? (state.hintLevel > 0 && readerPage ? [readerPage.audioAssetId] : []) : task?.hintAssetIds.slice(0, state.hintLevel) ?? []
    const assetIds = new Set<string>(task ? [task.instructionAssetId, ...(task.stimulusAssetId ? [task.stimulusAssetId] : []), ...(task.imageAssetId ? [task.imageAssetId] : []), ...activeHints, ...(readerPage?.imageAssetId ? [readerPage.imageAssetId] : [])] : [])
    return {
      id: attempt.id, childId: attempt.childId, versionId: attempt.courseVersionId!, planKind: plan.kind, planHash: attempt.planHash!, status: attempt.status as PhonicsAttemptDto['status'], revision: attempt.revision,
      state, stepCount: plan.stepTaskIds.length, task: task ? publicTask(task) : null, available,
      reader: reader ? { id: reader.id, titleZh: reader.titleZh, pages: reader.pages.map(({ text, imageAssetId, audioAssetId }) => ({ text, imageAssetId, audioAssetId })) } : null,
      helpAssetId: activeHints.at(-1) ?? null,
      assets: [...assetIds].flatMap(id => {
        const asset = course?.assets.find(a => a.id === id)
        return asset ? [{ id, purpose: asset.purpose, durationMs: asset.durationMs, url: asset.sha256 ? mediaUrl(`/api/media/phonics/${plan.versionId}/${asset.sha256}.${asset.extension}`, claims, this.tokenSecret) : null }] : []
      }),
    }
  }

  /**
   * 已开放词的词卡（一词一图、三种读法、中文释义）。开放口径与 readers 一致：
   * 词义引入课已完成，或课序早于家长选择的起点。仅返回已绑定真实文件的资产。
   */
  async wordCards(claims: TokenClaims, childId: string): Promise<PhonicsWordCardDto[]> {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) return []
    const course = await this.runtime.requireCourse(claims.fid, enrollment.versionId)
    const { history } = await this.practiceHistory(childId, enrollment.versionId)
    const eligible = new Set([
      ...history.filter(h => h.kind === 'lesson' && h.status === 'completed').map(h => h.lessonKey!),
      ...course.lessons.filter(l => l.order < (course.lessons.find(x => x.id === enrollment.entryLessonKey)?.order ?? 1)).map(l => l.id),
    ])
    const lessonOrder = new Map(course.lessons.map(l => [l.id, l.order]))
    const assetOf = (id?: string) => (id ? course.assets.find(a => a.id === id) : undefined)
    const signed = (versionId: string, asset: { sha256: string | null; extension: string }) =>
      asset.sha256 ? mediaUrl(`/api/media/phonics/${versionId}/${asset.sha256}.${asset.extension}`, claims, this.tokenSecret) : null
    const opened = course.words
      .filter(w => Boolean(w.meaningIntroducedAt) && eligible.has(w.meaningIntroducedAt!))
      .sort((a, b) => (lessonOrder.get(a.meaningIntroducedAt!) ?? 99) - (lessonOrder.get(b.meaningIntroducedAt!) ?? 99))
    return opened.map(w => {
      const audios = (['segment', 'blend', 'word'] as const)
        .map(kind => assetOf(w.audioIds?.[kind]))
        .filter((a): a is NonNullable<ReturnType<typeof assetOf>> => Boolean(a?.sha256))
        .map(a => ({ id: a.id, purpose: a.purpose, durationMs: a.durationMs, url: signed(enrollment.versionId!, a) }))
      const taskImage = course.tasks.find(t => t.wordId === w.id && assetOf(t.imageAssetId)?.sha256)?.imageAssetId
      const readerImage = course.readers.flatMap(r => r.pages).find(p => p.wordIds.includes(w.id) && assetOf(p.imageAssetId)?.sha256)?.imageAssetId
      const imageAsset = assetOf(taskImage ?? readerImage)
      const imageUrl = imageAsset?.sha256 ? signed(enrollment.versionId!, imageAsset) : null
      return {
        id: w.id, text: w.text, meaningZh: w.meaningZh,
        image: imageUrl ? { url: imageUrl } : null,
        audios,
      }
    })
  }

  async mutate(claims: TokenClaims, id: string, input: PhonicsEventRequest | ControlInput | ObservationInput, kind: string) {
    await this.ownAttempt(claims, id)
    const requestHash = digest({ kind, input })
    return this.transaction(async tx => {
      const attempt = await tx.phonicsAttempt.findUniqueOrThrow({ where: { id } })
      const previousReceipt = await tx.phonicsLearningEvent.findUnique({ where: { attemptId_clientEventId: { attemptId: id, clientEventId: input.clientEventId } } })
      if (previousReceipt) {
        if (previousReceipt.requestHash !== requestHash) throw new AppError('请求编号已用于其他内容', 'IDEMPOTENCY_CONFLICT', 409)
        return { eventId: previousReceipt.id, repeated: true, revision: previousReceipt.serverSequence, result: JSON.parse(previousReceipt.resultJson) as Record<string, unknown> }
      }
      if (attempt.revision !== input.expectedRevision) throw conflict()
      const plan = planOf(attempt), previous = stateOf(attempt)
      let state = previous, status = attempt.status, closeReason = attempt.closeReason
      let result: Record<string, unknown>, supersedesEventId: string | null = null
      if (kind === 'caregiver_observation') {
        if (claims.role !== 'parent') throw new AppError('只有家长可以补记', 'FORBIDDEN', 403)
        const observation = input as ObservationInput
        const source = await tx.phonicsLearningEvent.findFirst({ where: { attemptId: id, taskInstanceId: observation.taskInstanceId, kind: 'self_read_reported' } })
        if (!source) throw new AppError('没有可补记的口头任务', 'OBSERVATION_TARGET', 400)
        const sourceResult = JSON.parse(source.resultJson) as { helpLevel?: number }
        if (observation.observation === 'independent' && (sourceResult.helpLevel ?? 0) > 0) throw new AppError('这次尝试已用过帮助，请如实补记；下次可以再独立尝试', 'OBSERVATION_HELPED', 400)
        if (observation.supersedesEventId) {
          const old = await tx.phonicsLearningEvent.findFirst({ where: { id: observation.supersedesEventId, attemptId: id, taskInstanceId: observation.taskInstanceId, kind } })
          if (!old || await tx.phonicsLearningEvent.findFirst({ where: { supersedesEventId: old.id } })) throw new AppError('请基于最新的家长观察更正', 'OBSERVATION_CHANGED', 409)
          supersedesEventId = old.id
        } else if (await tx.phonicsLearningEvent.findFirst({ where: { attemptId: id, taskInstanceId: observation.taskInstanceId, kind } })) throw new AppError('已有观察，请选择更正', 'OBSERVATION_CHANGED', 409)
        result = { correct: null, observation: observation.observation, source: 'caregiver', taskInstanceId: observation.taskInstanceId }
      } else if (kind === 'attempt_paused' || kind === 'attempt_cancelled') {
        if (!['started', 'paused'].includes(attempt.status)) throw new AppError('这段练习已结束', 'ATTEMPT_CLOSED', 409)
        status = kind === 'attempt_paused' ? 'paused' : 'cancelled'
        const reason = (input as ControlInput).reason ?? 'restart_requested'
        if (kind === 'attempt_cancelled') {
          if (reason !== 'content_unavailable' && claims.role !== 'parent') throw new AppError('请家长帮忙调整练习', 'FORBIDDEN', 403)
          if (reason === 'content_unavailable' && await this.runtime.available(claims.fid, attempt.courseVersionId!, tx) && (await tx.phonicsEnrollment.findUnique({ where: { childId: attempt.childId } }))?.v2Enabled) throw new AppError('内容仍可使用，请暂停或找家长调整', 'CANCEL_REASON', 409)
          closeReason = reason
        }
        result = { status, reason: status === 'cancelled' ? closeReason : null }
      } else {
        await this.enabled(claims, attempt.childId, attempt.courseVersionId!, tx)
        const release = await tx.phonicsCourseRelease.findUnique({ where: { versionId: attempt.courseVersionId! } })
        if (!this.runtime.releaseAllowed(claims.fid, release, plan.courseHash)) throw new AppError('课程暂不可用', 'COURSE_UNAVAILABLE', 409)
        if (kind === 'attempt_resumed') {
          if (!['started', 'paused'].includes(status)) throw new AppError('这段练习已结束', 'ATTEMPT_CLOSED', 409)
          status = 'started'; result = { status }
        } else if (kind === 'attempt_finished') {
          if (status !== 'started' || state.stepIndex !== plan.stepTaskIds.length) throw new AppError('当前活动尚未完成，可以先暂停', 'PLAN_INCOMPLETE', 409)
          status = 'completed'; result = { status, correct: null }
        } else {
          if (status !== 'started') throw new AppError('请先恢复这段练习', 'ATTEMPT_CLOSED', 409)
          const applied = applyLearningEvent(plan, previous, input as PhonicsEventRequest)
          state = applied.state; result = applied.result
        }
      }
      const revision = attempt.revision + 1
      const changed = await tx.phonicsAttempt.updateMany({ where: { id, revision: attempt.revision }, data: { status, closeReason, stateJson: JSON.stringify(state), currentStepKey: plan.stepTaskIds[state.stepIndex] ?? null, revision, activeKey: ['completed', 'cancelled'].includes(status) ? null : attempt.activeKey, finishedAt: ['completed', 'cancelled'].includes(status) ? (attempt.finishedAt ?? new Date()) : null } })
      if (changed.count !== 1) throw conflict()
      const event = await tx.phonicsLearningEvent.create({ data: { attemptId: id, clientEventId: input.clientEventId, requestHash, serverSequence: revision, stepKey: plan.stepTaskIds[previous.stepIndex] ?? null, taskInstanceId: 'taskInstanceId' in input ? input.taskInstanceId : previous.taskInstanceId, kind, payloadJson: JSON.stringify('payload' in input ? input.payload : input), resultJson: JSON.stringify(result), actorRole: claims.role, supersedesEventId } })
      return { eventId: event.id, repeated: false, revision, result }
    })
  }

  private async transaction<T>(work: (tx: Tx) => Promise<T>): Promise<T> {
    for (let retry = 0; ; retry++) {
      try { return await this.db.$transaction(work, { timeout: 5000, maxWait: 5000 }) }
      catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (['P1008', 'P2034', 'P2028', 'P2002'].includes(error.code)) {
            if (retry < 2) continue
            throw conflict()
          }
        }
        throw error
      }
    }
  }
}
