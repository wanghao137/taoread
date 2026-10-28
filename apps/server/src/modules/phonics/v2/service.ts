import { Prisma, type PhonicsAttempt, type PrismaClient } from '@prisma/client'
import type { z } from 'zod'
import { createEmptyCard, type CardInput } from 'ts-fsrs'
import type { PhonicsAssetDto, PhonicsAtlasDto, PhonicsAttemptDto, PhonicsEnrollmentDto, PhonicsEventRequest, PhonicsNextDto, PhonicsWordCardDto } from '@taoread/shared'
import type { TokenClaims } from '../../../lib/auth'
import { AppError } from '../../../lib/errors'
import { mediaUrl } from '../../media/access'
import { digest, publicTask, courseHash } from './courseRegistry'
import type { PhonicsCourse } from './contracts'
import { controlSchema, enrollmentSchema, favoriteSchema, observationSchema, practiceAnswerSchema, readingProgressSchema, startSchema, typingResultSchema, wordBackupSchema, wordSessionStateSchema, wordSessionUpdateSchema, wordSettingsUpdateSchema } from './contracts'
import { applyLearningEvent, initialState, taskAt, type FrozenPlan, type LessonState } from './lessonMachine'
import { PhonicsRuntime } from './runtime'
import { dueLessonKeys, recentSupport, recommend, reviewTasks, REVIEW_RULE_VERSION, type PracticeHistory, type SupportTarget } from './review'
import { PREVIOUS_WORD_SCHEDULE_VERSION, readWordSettings, WORD_SCHEDULE_VERSION, wordGrade, wordScheduler } from './wordStudy'

type Tx = Prisma.TransactionClient
type StartInput = z.infer<typeof startSchema>
type EnrollmentInput = z.infer<typeof enrollmentSchema>
type ControlInput = z.infer<typeof controlSchema>
type ObservationInput = z.infer<typeof observationSchema>
type PracticeInput = z.infer<typeof practiceAnswerSchema>
type FavoriteInput = z.infer<typeof favoriteSchema>
type WordSettingsInput = z.infer<typeof wordSettingsUpdateSchema>
type TypingInput = z.infer<typeof typingResultSchema>
type ReadingInput = z.infer<typeof readingProgressSchema>
type WordBackup = z.infer<typeof wordBackupSchema>
type WordSessionInput = z.infer<typeof wordSessionUpdateSchema>
const conflict = () => new AppError('进度已变化，请恢复最新进度', 'ATTEMPT_CHANGED', 409)
const planOf = (attempt: PhonicsAttempt): FrozenPlan => JSON.parse(attempt.planJson!) as FrozenPlan
const stateOf = (attempt: PhonicsAttempt): LessonState => JSON.parse(attempt.stateJson!) as LessonState
const seconds = (date: Date) => Math.floor(date.getTime() / 1000)
const chinaDay = (date: Date) => new Date(date.getTime() + 8 * 3600_000).toISOString().slice(0, 10)

async function newWordsToday(tx: Tx, childId: string, courseVersionId: string, now: Date) {
  const start = new Date(`${chinaDay(now)}T00:00:00+08:00`)
  const rows = await tx.phonicsPracticeAnswer.findMany({
    where: { childId, courseVersionId, track: 'study', firstAttempt: true, createdAt: { gte: start, lt: new Date(start.getTime() + 86400_000) }, reviewLogJson: { not: null } },
    select: { reviewLogJson: true },
  })
  return rows.filter(row => {
    try { return JSON.parse(row.reviewLogJson!).before?.reps === 0 } catch { return false }
  }).length
}

function wordSessionDto(row: { courseVersionId: string; stateJson: string | null; revision: number } | null, versionId: string) {
  if (!row || row.courseVersionId !== versionId || !row.stateJson) return { session: null, revision: row?.revision ?? 0 }
  try {
    const session = wordSessionStateSchema.parse(JSON.parse(row.stateJson))
    if (session.versionId !== versionId) throw new Error('Wrong version')
    return { session, revision: row.revision }
  } catch { throw new AppError('学习进度暂时无法读取', 'SESSION_INVALID', 409) }
}

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
      // 每个前置课只补一个新音示范（~8s）：后起点的最小声音唤醒；词义由已开放的词卡承担，
      // 否则补偿任务随课程规模线性膨胀（41 课时后起点要先过 75+ 个任务，课堂不可用）。
      if (lesson.order === startOrder && startOrder > 1 && !completed.has(lesson.id)) {
        const bridge = course.lessons.filter(l => l.order < startOrder).flatMap(l => {
          const firstModel = l.taskIds.find(id => {
            const task = course.tasks.find(t => t.id === id)!
            return task.kind === 'listen' && task.skill === 'mapping' && task.role === 'model'
          })
          return firstModel ? [firstModel] : []
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
   * 整词音频按孩子设置取口音：选美音且美音包含该词时下发美音候选，否则回落 GB。
   */
  async wordCards(claims: TokenClaims, childId: string): Promise<PhonicsWordCardDto[]> {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) return []
    const versionId = enrollment.versionId
    const course = await this.runtime.requireCourse(claims.fid, versionId)
    const { history } = await this.practiceHistory(childId, versionId)
    const eligible = new Set([
      ...history.filter(h => h.kind === 'lesson' && h.status === 'completed').map(h => h.lessonKey!),
      ...course.lessons.filter(l => l.order < (course.lessons.find(x => x.id === enrollment.entryLessonKey)?.order ?? 1)).map(l => l.id),
    ])
    const lessonOrder = new Map(course.lessons.map(l => [l.id, l.order]))
    const assetOf = (id?: string) => (id ? course.assets.find(a => a.id === id) : undefined)
    const signed = (asset: { sha256: string | null; extension: string }) =>
      asset.sha256 ? mediaUrl(`/api/media/phonics/${versionId}/${asset.sha256}.${asset.extension}`, claims, this.tokenSecret) : null
    const row = await this.db.phonicsEnrollment.findUniqueOrThrow({ where: { childId }, select: { wordSettingsJson: true } })
    const settings = readWordSettings(row.wordSettingsJson)
    // 旁挂媒体（美音整词/词典例句）只对自用家庭签发 URL——发布审校通过前，
    // 授权媒体层对其他家庭一律 404，DTO 不能先发一个必然失败的地址。
    const selfUseMedia = this.runtime.selfUse(claims.fid, courseHash(course))
    const usAssets = new Map((selfUseMedia ? this.runtime.sidecars.get(versionId)?.usAudio?.assets ?? [] : []).map(a => [a.wordId, a]))
    const opened = course.words
      .filter(w => Boolean(w.meaningIntroducedAt) && eligible.has(w.meaningIntroducedAt!))
      .sort((a, b) => (lessonOrder.get(a.meaningIntroducedAt!) ?? 99) - (lessonOrder.get(b.meaningIntroducedAt!) ?? 99))
    return opened.map(w => {
      const us = usAssets.get(w.id)
      const useUs = settings.accent === 'US' && Boolean(us)
      const audios = (['segment', 'blend', 'word'] as const).flatMap(kind => {
        if (kind === 'word' && useUs && us) {
          return [{ id: `us-word:${w.id}`, purpose: 'word' as const, durationMs: us.durationMs, url: mediaUrl(`/api/media/phonics/${versionId}/${us.sha256}.wav`, claims, this.tokenSecret) }]
        }
        const asset = assetOf(w.audioIds?.[kind])
        return asset?.sha256 ? [{ id: asset.id, purpose: asset.purpose, durationMs: asset.durationMs, url: signed(asset) }] : []
      })
      const taskImage = course.tasks.find(t => t.wordId === w.id && assetOf(t.imageAssetId)?.sha256)?.imageAssetId
      const readerImage = course.readers.flatMap(r => r.pages).find(p => p.wordIds.includes(w.id) && assetOf(p.imageAssetId)?.sha256)?.imageAssetId
      const imageAsset = assetOf(taskImage ?? readerImage)
      const imageUrl = imageAsset?.sha256 ? signed(imageAsset) : null
      return {
        id: w.id, text: w.text, meaningZh: w.meaningZh,
        image: imageUrl ? { url: imageUrl } : null,
        audios,
        wordAudioAccent: useUs ? 'US' as const : 'GB' as const,
      }
    })
  }

  /**
   * 图鉴全量：已授权家庭可浏览词卡，练习开放状态仍按课程进度计算。
   * 解锁口径与 wordCards 一致：词义引入课完成，或课序早于家长选择起点。
   * 整词音频按孩子设置取口音（美音包待审、自用开放）；词典旁挂条目一并下发。
   */
  async atlas(claims: TokenClaims, childId: string): Promise<PhonicsAtlasDto> {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) return { versionId: null, words: [], readers: [], lessons: [] }
    const versionId = enrollment.versionId
    const course = await this.runtime.requireCourse(claims.fid, versionId)
    const { history } = await this.practiceHistory(childId, versionId)
    const favorites = new Set((await this.db.phonicsWordFavorite.findMany({ where: { childId, courseVersionId: versionId }, select: { wordId: true } })).map(item => item.wordId))
    const schedules = await this.db.phonicsWordSchedule.findMany({ where: { childId, courseVersionId: versionId }, select: { wordId: true, cardJson: true } })
    const studyStates = new Map<string, 'learning' | 'familiar'>(schedules.map(row => {
      try { const card = JSON.parse(row.cardJson) as { state?: number; stability?: number }; return [row.wordId, card.state === 2 && (card.stability ?? 0) >= 21 ? 'familiar' : 'learning'] as const }
      catch { return [row.wordId, 'learning'] as const }
    }))
    const row = await this.db.phonicsEnrollment.findUniqueOrThrow({ where: { childId }, select: { wordSettingsJson: true } })
    const settings = readWordSettings(row.wordSettingsJson)
    // 旁挂内容与自用门绑定（与 authorizeMedia 同一政策）：非自用家庭不签发必然 404 的旁挂媒体，
    // 词典文本也仅自用展示（审校通过随发布一起放开）。
    const selfUseMedia = this.runtime.selfUse(claims.fid, courseHash(course))
    const sidecar = selfUseMedia ? this.runtime.sidecars.get(versionId) ?? null : null
    const lexiconByWord = new Map((sidecar?.lexicon?.entries ?? []).map(entry => [entry.wordId, entry]))
    const usAssets = new Map((sidecar?.usAudio?.assets ?? []).map(a => [a.wordId, a]))
    const completed = new Set(history.filter(h => h.kind === 'lesson' && h.status === 'completed').map(h => h.lessonKey!))
    const entryOrder = course.lessons.find(l => l.id === enrollment.entryLessonKey)?.order ?? 1
    const beforeEntry = new Set(course.lessons.filter(l => l.order < entryOrder).map(l => l.id))
    const unlockedLesson = (lessonKey: string | undefined) => Boolean(lessonKey && (completed.has(lessonKey) || beforeEntry.has(lessonKey)))
    const lessonOrder = new Map(course.lessons.map(l => [l.id, l.order]))
    const assetOf = (id?: string) => (id ? course.assets.find(a => a.id === id) : undefined)
    const signed = (asset: { sha256: string | null; extension: string }) =>
      asset.sha256 ? mediaUrl(`/api/media/phonics/${versionId}/${asset.sha256}.${asset.extension}`, claims, this.tokenSecret) : null
    const signedHash = (sha256: string, extension: string, durationMs: number | null, purpose: PhonicsAssetDto['purpose'], id: string, accent?: 'GB' | 'US'): PhonicsAssetDto =>
      ({ id, purpose, durationMs, url: mediaUrl(`/api/media/phonics/${versionId}/${sha256}.${extension}`, claims, this.tokenSecret), ...(accent ? { accent } : {}) })

    const words = course.words
      .filter(w => Boolean(w.meaningIntroducedAt))
      .sort((a, b) => (lessonOrder.get(a.meaningIntroducedAt!) ?? 99) - (lessonOrder.get(b.meaningIntroducedAt!) ?? 99))
      .map(w => {
        const lessonKey = w.meaningIntroducedAt!
        const us = usAssets.get(w.id)
        const useUs = settings.accent === 'US' && Boolean(us)
        const audios = (['segment', 'blend', 'word'] as const).flatMap(kind => {
          if (kind === 'word' && useUs && us) return [{ id: `us-word:${w.id}`, purpose: 'word' as const, durationMs: us.durationMs, url: mediaUrl(`/api/media/phonics/${versionId}/${us.sha256}.wav`, claims, this.tokenSecret), accent: 'US' as const }]
          const asset = assetOf(w.audioIds?.[kind])
          return asset?.sha256 ? [{ id: asset.id, purpose: asset.purpose, durationMs: asset.durationMs, url: signed(asset) }] : []
        })
        // 词光专业录音（英 Alice/美 Sarah）：英美双按钮，MiMo 只作缺省兜底
        const lexEntry = lexiconByWord.get(w.id)
        if (lexEntry?.wordAudio?.uk) audios.push(signedHash(lexEntry.wordAudio.uk.sha256, 'mp3', lexEntry.wordAudio.uk.durationMs, 'word', `lex-uk:${w.id}`, 'GB'))
        if (lexEntry?.wordAudio?.us) audios.push(signedHash(lexEntry.wordAudio.us.sha256, 'mp3', lexEntry.wordAudio.us.durationMs, 'word', `lex-us:${w.id}`, 'US'))
        const taskImage = course.tasks.find(t => t.wordId === w.id && assetOf(t.imageAssetId)?.sha256)?.imageAssetId
        const readerImage = course.readers.flatMap(r => r.pages).find(p => p.wordIds.includes(w.id) && assetOf(p.imageAssetId)?.sha256)?.imageAssetId
        const imageAsset = assetOf(taskImage ?? readerImage)
        const imageUrl = imageAsset?.sha256 ? signed(imageAsset) : null
        const examples = course.readers.filter(r => unlockedLesson(r.introducedAt)).flatMap(r => r.pages)
          .filter(p => p.wordIds.includes(w.id) && p.text.trim().toLowerCase() !== w.text.toLowerCase())
          .filter((p, i, pages) => pages.findIndex(other => other.text === p.text) === i)
          .slice(0, 2).map(p => {
            const asset = assetOf(p.audioAssetId)
            return { text: p.text, audio: asset?.sha256 ? { id: asset.id, purpose: asset.purpose, durationMs: asset.durationMs, url: signed(asset) } : null }
          })
        const entry = lexiconByWord.get(w.id)
        const lexicon = entry ? {
          source: entry.source, ukIpa: entry.ukIpa, usIpa: entry.usIpa,
          senses: entry.senses.map(s => ({ ...s })),
          example: { en: entry.example.en, zh: entry.example.zh, audio: entry.example.audio ? signedHash(entry.example.audio.sha256, 'mp3', entry.example.audio.durationMs, 'passage' as const, `lex-example:${w.id}`) : null },
          collocations: [...entry.collocations], family: [...entry.family], tip: entry.tip,
        } : null
        return {
          id: w.id, unlocked: unlockedLesson(lessonKey), favorite: favorites.has(w.id), studyState: studyStates.get(w.id) ?? ('unseen' as const), text: w.text, meaningZh: w.meaningZh, lessonKey,
          image: imageUrl ? { url: imageUrl } : null,
          audios, examples, lexicon,
          wordAudioAccent: useUs ? 'US' as const : 'GB' as const,
        }
      })

    const readers = course.readers.map(r => {
      const lessonKey = course.lessons.find(l => l.readerIds.includes(r.id))?.id ?? null
      const cover = assetOf(r.pages.find(p => p.imageAssetId)?.imageAssetId)
      const coverUrl = cover?.sha256 ? signed(cover) : null
      return {
        id: r.id, titleZh: r.titleZh, lessonKey,
        unlocked: unlockedLesson(lessonKey ?? undefined),
        pages: r.pages.length,
        cover: coverUrl ? { url: coverUrl } : null,
      }
    })

    const lessons = course.lessons.map(l => ({
      id: l.id, order: l.order, titleZh: l.titleZh,
      completed: completed.has(l.id),
      wordCount: course.words.filter(w => w.meaningIntroducedAt === l.id).length,
      readerCount: l.readerIds.length,
    }))

    return { versionId, words, readers, lessons }
  }

  async setFavorite(claims: TokenClaims, childId: string, wordId: string, input: FavoriteInput) {
    await this.ownChild(claims, childId)
    const course = await this.runtime.requireCourse(claims.fid, input.versionId)
    if (!course.words.some(word => word.id === wordId && word.meaningIntroducedAt)) throw new AppError('这个单词不存在', 'WORD_NOT_FOUND', 404)
    await this.transaction(async tx => {
      await this.enabled(claims, childId, input.versionId, tx)
      const key = { childId_courseVersionId_wordId: { childId, courseVersionId: input.versionId, wordId } }
      if (input.favorite) await tx.phonicsWordFavorite.upsert({ where: key, create: key.childId_courseVersionId_wordId, update: {} })
      else await tx.phonicsWordFavorite.deleteMany({ where: key.childId_courseVersionId_wordId })
    })
    return { favorite: input.favorite }
  }

  async practiceSummary(claims: TokenClaims, childId: string) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) return { total: 0, correct: 0, wrongWordIds: [], answerDurationSeconds: 0, typingDurationSeconds: 0 }
    await this.runtime.requireCourse(claims.fid, enrollment.versionId)
    const where = { childId, courseVersionId: enrollment.versionId }
    const [total, correct, latest, answerDuration, typingDuration] = await Promise.all([
      this.db.phonicsPracticeAnswer.count({ where: { ...where, track: 'practice', firstAttempt: true } }),
      this.db.phonicsPracticeAnswer.count({ where: { ...where, track: 'practice', firstAttempt: true, correct: true } }),
      this.db.phonicsPracticeAnswer.findMany({ where, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], distinct: ['wordId'], select: { wordId: true, correct: true } }),
      this.db.phonicsPracticeAnswer.aggregate({ where: { ...where, firstAttempt: true }, _sum: { elapsedMs: true } }),
      this.db.phonicsTypingResult.aggregate({ where, _sum: { elapsedMs: true } }),
    ])
    return { total, correct, wrongWordIds: latest.filter(row => !row.correct).map(row => row.wordId), answerDurationSeconds: Math.round((answerDuration._sum.elapsedMs ?? 0) / 1000), typingDurationSeconds: Math.round((typingDuration._sum.elapsedMs ?? 0) / 1000) }
  }

  async wordSettings(claims: TokenClaims, childId: string) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) throw new AppError('请先让家长开启这套英语练习', 'PHONICS_DISABLED', 403)
    await this.runtime.requireCourse(claims.fid, enrollment.versionId)
    const row = await this.db.phonicsEnrollment.findUniqueOrThrow({ where: { childId } })
    return { ...readWordSettings(row.wordSettingsJson), revision: row.wordSettingsRevision }
  }

  async wordSession(claims: TokenClaims, childId: string) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) throw new AppError('请先让家长开启这套英语练习', 'PHONICS_DISABLED', 403)
    await this.runtime.requireCourse(claims.fid, enrollment.versionId)
    const row = await this.db.phonicsWordSession.findUnique({ where: { childId } })
    return wordSessionDto(row, enrollment.versionId)
  }

  async setWordSession(claims: TokenClaims, childId: string, input: WordSessionInput) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || enrollment.versionId !== input.versionId) throw new AppError('课程已变化，请重新开始练习', 'COURSE_CHANGED', 409)
    const course = await this.runtime.requireCourse(claims.fid, input.versionId)
    const words = new Set(course.words.map(word => word.id))
    if (input.session?.questions.some(question => !words.has(question.wordId) || question.choices.some(choice => !words.has(choice)))) throw new AppError('学习进度包含未知单词', 'SESSION_INVALID', 400)
    const requestHash = digest(input)
    return this.transaction(async tx => {
      await this.enabled(claims, childId, input.versionId, tx)
      const key = { childId_clientEventId: { childId, clientEventId: input.clientEventId } }
      const previous = await tx.phonicsWordSessionMutation.findUnique({ where: key })
      const row = await tx.phonicsWordSession.findUnique({ where: { childId } })
      if (previous) {
        if (previous.requestHash !== requestHash) throw new AppError('保存编号已用于其他进度', 'IDEMPOTENCY_CONFLICT', 409)
        return { ...wordSessionDto(row, input.versionId), appliedRevision: previous.revision, repeated: true }
      }
      if ((row?.revision ?? 0) !== input.expectedRevision) throw conflict()
      const revision = input.expectedRevision + 1
      const data = { courseVersionId: input.versionId, stateJson: input.session ? JSON.stringify(input.session) : null, revision }
      if (row) {
        const changed = await tx.phonicsWordSession.updateMany({ where: { id: row.id, revision: input.expectedRevision }, data })
        if (changed.count !== 1) throw conflict()
      } else await tx.phonicsWordSession.create({ data: { childId, ...data } })
      await tx.phonicsWordSessionMutation.create({ data: { childId, clientEventId: input.clientEventId, requestHash, revision } })
      return { session: input.session, revision, appliedRevision: revision, repeated: false }
    })
  }

  async setWordSettings(claims: TokenClaims, childId: string, input: WordSettingsInput) {
    const current = await this.enrollment(claims, childId)
    if (!current.enabled || !current.versionId) throw new AppError('请先让家长开启这套英语练习', 'PHONICS_DISABLED', 403)
    const { expectedRevision, ...settings } = input
    // 美音包待审：仅自用家庭可切美音；其他家庭静默归位 GB（与媒体门同一政策）
    if (settings.accent === 'US') {
      const course = await this.runtime.requireCourse(claims.fid, current.versionId!)
      if (!this.runtime.selfUse(claims.fid, courseHash(course))) settings.accent = 'GB'
    }
    await this.transaction(async tx => {
      await this.enabled(claims, childId, current.versionId!, tx)
      const updated = await tx.phonicsEnrollment.updateMany({ where: { childId, wordSettingsRevision: expectedRevision }, data: { wordSettingsJson: JSON.stringify(settings), wordSettingsRevision: { increment: 1 } } })
      if (updated.count !== 1) throw conflict()
    })
    return { ...settings, revision: expectedRevision + 1 }
  }

  async studySchedule(claims: TokenClaims, childId: string) {
    const atlas = await this.atlas(claims, childId)
    if (!atlas.versionId) return { dueWordIds: [], newWordIds: [], upcoming: [] }
    // 学习路线 = 全部课程词按课序（atlas 已按 meaningIntroducedAt 课序排序），不再按解锁过滤
    const words = atlas.words.filter(word => word.text)
    const eligible = new Set(words.map(word => word.id))
    const rows = (await this.db.phonicsWordSchedule.findMany({ where: { childId, courseVersionId: atlas.versionId }, orderBy: [{ dueAt: 'asc' }, { wordId: 'asc' }] })).filter(row => eligible.has(row.wordId))
    const scheduled = new Set(rows.map(row => row.wordId))
    const now = new Date(), today = chinaDay(now)
    const settings = await this.wordSettings(claims, childId)
    const newToday = await newWordsToday(this.db, childId, atlas.versionId, now)
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(`${today}T00:00:00Z`); day.setUTCDate(day.getUTCDate() + i)
      return { day: day.toISOString().slice(0, 10), count: 0 }
    })
    for (const row of rows) {
      const dueDay = chinaDay(row.dueAt)
      const slot = days.find(day => day.day === (dueDay < today ? today : dueDay))
      if (slot) slot.count++
    }
    return {
      dueWordIds: rows.filter(row => row.dueAt <= now).map(row => row.wordId),
      newWordIds: words.filter(word => !scheduled.has(word.id)).slice(0, Math.max(0, settings.dailyNew - newToday)).map(word => word.id),
      learnedWordIds: rows.map(row => row.wordId), recentWordIds: [...rows].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).map(row => row.wordId),
      stabilities: Object.fromEntries(rows.map(row => { try { const value = JSON.parse(row.cardJson).stability; return [row.wordId, typeof value === 'number' && Number.isFinite(value) ? value : 0] } catch { return [row.wordId, 0] } })),
      newToday, upcoming: days,
    }
  }

  async typingResults(claims: TokenClaims, childId: string) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) return { results: [] }
    await this.runtime.requireCourse(claims.fid, enrollment.versionId)
    const rows = await this.db.phonicsTypingResult.findMany({ where: { childId, courseVersionId: enrollment.versionId }, orderBy: { createdAt: 'desc' }, take: 20 })
    return { results: rows.map(row => ({ mode: row.mode, source: row.source, items: row.items, accuracy: Math.round(row.correctCharacters / row.attemptedCharacters * 100), wpm: row.elapsedMs >= 1000 ? Math.round(row.acceptedCharacters / 5 / (row.elapsedMs / 60000)) : 0, createdAt: row.createdAt.toISOString() })) }
  }

  async recordTyping(claims: TokenClaims, childId: string, input: TypingInput) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || enrollment.versionId !== input.versionId) throw new AppError('请先让家长开启这套英语练习', 'PHONICS_DISABLED', 403)
    const requestHash = digest(input)
    return this.transaction(async tx => {
      await this.enabled(claims, childId, input.versionId, tx)
      const key = { childId_clientSessionId: { childId, clientSessionId: input.clientSessionId } }
      const prior = await tx.phonicsTypingResult.findUnique({ where: key })
      if (prior) {
        if (prior.requestHash !== requestHash) throw new AppError('练习编号已用于其他内容', 'IDEMPOTENCY_CONFLICT', 409)
        return { repeated: true }
      }
      const { versionId, ...data } = input
      await tx.phonicsTypingResult.create({ data: { ...data, childId, courseVersionId: versionId, requestHash } })
      return { repeated: false }
    })
  }

  async reader(claims: TokenClaims, childId: string, readerId: string) {
    const atlas = await this.atlas(claims, childId)
    if (!atlas.versionId || !atlas.readers.some(item => item.id === readerId && item.unlocked)) throw new AppError('这本小书还没有开放', 'READER_NOT_READY', 409)
    const course = await this.runtime.requireCourse(claims.fid, atlas.versionId)
    const reader = course.readers.find(item => item.id === readerId)!
    const progress = await this.db.phonicsReadingProgress.findUnique({ where: { childId_courseVersionId_readerId: { childId, courseVersionId: atlas.versionId, readerId } } })
    const assetOf = (id?: string) => course.assets.find(item => item.id === id && item.sha256)
    return {
      versionId: atlas.versionId, id: reader.id, title: reader.titleZh,
      pages: reader.pages.map(page => {
        const image = assetOf(page.imageAssetId), audio = assetOf(page.audioAssetId)
        const signed = (asset: NonNullable<typeof image>) => mediaUrl(`/api/media/phonics/${atlas.versionId}/${asset.sha256}.${asset.extension}`, claims, this.tokenSecret)
        return { text: page.text, wordIds: page.wordIds, image: image ? signed(image) : null, audio: audio ? { id: audio.id, purpose: audio.purpose, durationMs: audio.durationMs, url: signed(audio) } : null }
      }),
      progress: { page: Math.min(progress?.page ?? 0, reader.pages.length - 1), fontSize: progress?.fontSize ?? 24, revision: progress?.revision ?? 0 },
    }
  }

  async setReadingProgress(claims: TokenClaims, childId: string, readerId: string, input: ReadingInput) {
    const reader = await this.reader(claims, childId, readerId)
    if (reader.versionId !== input.versionId || input.page >= reader.pages.length) throw new AppError('阅读内容已变化', 'READER_CHANGED', 409)
    const course = this.runtime.courses.get(input.versionId)!
    const source = course.readers.find(item => item.id === readerId)!
    await this.transaction(async tx => {
      await this.enabled(claims, childId, input.versionId, tx)
      const enrollment = await tx.phonicsEnrollment.findUniqueOrThrow({ where: { childId } })
      const introduced = course.lessons.find(item => item.id === source.introducedAt)
      const entryOrder = course.lessons.find(item => item.id === enrollment.entryLessonKey)?.order ?? 1
      const completed = await tx.phonicsAttempt.findFirst({ where: { childId, protocolVersion: 2, courseVersionId: input.versionId, planKind: 'lesson', lessonKey: source.introducedAt, status: 'completed' }, select: { id: true } })
      if (!introduced || (!completed && introduced.order >= entryOrder)) throw new AppError('这本小书还没有开放', 'READER_NOT_READY', 409)
      const key = { childId_courseVersionId_readerId: { childId, courseVersionId: input.versionId, readerId } }
      const existing = await tx.phonicsReadingProgress.findUnique({ where: key })
      if ((existing?.revision ?? 0) !== input.expectedRevision) throw conflict()
      if (!existing) await tx.phonicsReadingProgress.create({ data: { ...key.childId_courseVersionId_readerId, page: input.page, fontSize: input.fontSize, revision: 1 } })
      else {
        const updated = await tx.phonicsReadingProgress.updateMany({ where: { id: existing.id, revision: input.expectedRevision }, data: { page: input.page, fontSize: input.fontSize, revision: { increment: 1 } } })
        if (updated.count !== 1) throw conflict()
      }
    })
    return { page: input.page, fontSize: input.fontSize, revision: input.expectedRevision + 1 }
  }

  async wordBackup(claims: TokenClaims, childId: string) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) throw new AppError('请先开启英语练习', 'PHONICS_DISABLED', 403)
    const versionId = enrollment.versionId
    const course = await this.runtime.requireCourse(claims.fid, versionId)
    const where = { childId, courseVersionId: versionId }
    const [settings, schedules, favorites, answers, typing, reading] = await this.transaction(async tx => {
      await this.enabled(claims, childId, versionId, tx)
      return Promise.all([
        tx.phonicsEnrollment.findUniqueOrThrow({ where: { childId } }),
        tx.phonicsWordSchedule.findMany({ where }), tx.phonicsWordFavorite.findMany({ where }),
        tx.phonicsPracticeAnswer.findMany({ where }), tx.phonicsTypingResult.findMany({ where }), tx.phonicsReadingProgress.findMany({ where }),
      ])
    })
    let value: unknown
    try {
      value = {
        app: 'taoread-phonics-word-backup', version: 1, childId, courseVersionId: versionId, contentHash: courseHash(course), exportedAt: new Date().toISOString(), settings: readWordSettings(settings.wordSettingsJson),
        schedules: schedules.map(row => ({ wordId: row.wordId, algorithm: row.algorithm, card: JSON.parse(row.cardJson), updatedAt: row.updatedAt.toISOString() })),
        favorites: favorites.map(row => row.wordId),
        answers: answers.map(row => ({ clientEventId: row.clientEventId, questionId: row.questionId, wordId: row.wordId, mode: row.mode, track: row.track, requestHash: row.requestHash, correct: row.correct, firstAttempt: row.firstAttempt, elapsedMs: row.elapsedMs, reviewLogJson: row.reviewLogJson, createdAt: row.createdAt.toISOString() })),
        typing: typing.map(row => ({ clientSessionId: row.clientSessionId, requestHash: row.requestHash, mode: row.mode, source: row.source, items: row.items, correctCharacters: row.correctCharacters, attemptedCharacters: row.attemptedCharacters, acceptedCharacters: row.acceptedCharacters, elapsedMs: row.elapsedMs, createdAt: row.createdAt.toISOString() })),
        reading: reading.map(row => ({ readerId: row.readerId, page: row.page, fontSize: row.fontSize, updatedAt: row.updatedAt.toISOString() })),
      }
    } catch { throw new AppError('学习记录中有无法导出的数据', 'BACKUP_INVALID', 409) }
    const parsed = wordBackupSchema.safeParse(value)
    if (!parsed.success || Buffer.byteLength(JSON.stringify(value), 'utf8') > 10 * 1024 * 1024) throw new AppError('学习记录超过备份限制或格式异常', 'BACKUP_INVALID', 409)
    return parsed.data
  }

  async restoreWordBackup(claims: TokenClaims, childId: string, backup: WordBackup) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) throw new AppError('请先开启英语练习', 'PHONICS_DISABLED', 403)
    const course = await this.runtime.requireCourse(claims.fid, enrollment.versionId)
    if (backup.childId !== childId || backup.courseVersionId !== enrollment.versionId || backup.contentHash !== courseHash(course)) throw new AppError('备份与当前孩子或课程版本不一致', 'BACKUP_MISMATCH', 409)
    const words = new Set(course.words.map(word => word.id))
    const readers = new Map(course.readers.map(reader => [reader.id, reader.pages.length]))
    const unique = (values: string[]) => new Set(values).size === values.length
    if (!unique(backup.schedules.map(item => item.wordId)) || !unique(backup.favorites) || !unique(backup.answers.map(item => item.clientEventId)) || !unique(backup.typing.map(item => item.clientSessionId)) || !unique(backup.reading.map(item => item.readerId)) ||
      backup.schedules.some(item => !words.has(item.wordId)) || backup.favorites.some(item => !words.has(item)) || backup.answers.some(item => !words.has(item.wordId)) || backup.reading.some(item => !readers.has(item.readerId) || item.page >= readers.get(item.readerId)!)) throw new AppError('备份包含重复或未知的课程内容', 'BACKUP_INVALID', 400)
    const latest = Date.parse(backup.exportedAt) + 300_000
    if (latest > Date.now() + 600_000 || backup.schedules.some(item => Date.parse(item.updatedAt) > latest || (item.card.last_review && Date.parse(item.card.last_review) > latest)) || backup.answers.some(item => Date.parse(item.createdAt) > latest) || backup.typing.some(item => Date.parse(item.createdAt) > latest) || backup.reading.some(item => Date.parse(item.updatedAt) > latest)) throw new AppError('备份中的记录时间不正确', 'BACKUP_INVALID', 400)
    const questions = new Map<string, { wordId: string; track: string; mode: string; first: number }>()
    for (const answer of backup.answers) {
      const prior = questions.get(answer.questionId)
      if (prior && (prior.wordId !== answer.wordId || prior.track !== answer.track || (answer.track === 'practice' && prior.mode !== answer.mode))) throw new AppError('备份中的题目记录不一致', 'BACKUP_INVALID', 400)
      const first = (prior?.first ?? 0) + Number(answer.firstAttempt)
      if (first > 1) throw new AppError('备份中的首答记录不一致', 'BACKUP_INVALID', 400)
      questions.set(answer.questionId, { wordId: answer.wordId, track: answer.track, mode: answer.mode, first })
      if (answer.reviewLogJson) { try { JSON.parse(answer.reviewLogJson) } catch { throw new AppError('备份中的复习记录格式错误', 'BACKUP_INVALID', 400) } }
    }
    if ([...questions.values()].some(question => question.first !== 1)) throw new AppError('备份中的题目缺少首答记录', 'BACKUP_INVALID', 400)
    return this.transaction(async tx => {
      await this.enabled(claims, childId, enrollment.versionId!, tx)
      const where = { childId, courseVersionId: enrollment.versionId! }
      const [existingSchedules, existingFavorites, existingAnswers, existingTyping, existingReading, current] = await Promise.all([
        tx.phonicsWordSchedule.findMany({ where, select: { wordId: true } }), tx.phonicsWordFavorite.findMany({ where, select: { wordId: true } }),
        tx.phonicsPracticeAnswer.findMany({ where, select: { questionId: true } }), tx.phonicsTypingResult.findMany({ where, select: { clientSessionId: true } }),
        tx.phonicsReadingProgress.findMany({ where, select: { readerId: true } }), tx.phonicsEnrollment.findUniqueOrThrow({ where: { childId } }),
      ])
      const scheduled = new Set(existingSchedules.map(item => item.wordId)), saved = new Set(existingFavorites.map(item => item.wordId))
      const answered = new Set(existingAnswers.map(item => item.questionId)), typed = new Set(existingTyping.map(item => item.clientSessionId)), read = new Set(existingReading.map(item => item.readerId))
      // 恢复钳制：备份里的 FSRS 卡片不整单照收——到期时间夹进 [现在-30 天, 现在+60 天]，
      // 稳定度封顶 365 天，防止手改备份伪造「已掌握」或把词砖死在遥远的未来。
      const nowMs = Date.now(), dueFloor = nowMs - 30 * 86400_000, dueCeil = nowMs + 60 * 86400_000
      const schedules = backup.schedules.filter(item => !scheduled.has(item.wordId)).map(item => {
        const card = { ...item.card, stability: Math.min(item.card.stability, 365), scheduled_days: Math.min(item.card.scheduled_days, 365), elapsed_days: Math.min(item.card.elapsed_days, 3650) }
        const due = Math.min(Math.max(Date.parse(card.due), dueFloor), dueCeil)
        return { ...where, wordId: item.wordId, algorithm: item.algorithm, cardJson: JSON.stringify({ ...card, due: new Date(due).toISOString() }), dueAt: new Date(due), updatedAt: new Date(item.updatedAt) }
      })
      const favorites = backup.favorites.filter(item => !saved.has(item)).map(wordId => ({ ...where, wordId }))
      const answers = backup.answers.filter(item => !answered.has(item.questionId)).map(item => ({ ...item, ...where, createdAt: new Date(item.createdAt) }))
      const typing = backup.typing.filter(item => !typed.has(item.clientSessionId)).map(item => ({ ...item, ...where, createdAt: new Date(item.createdAt) }))
      const reading = backup.reading.filter(item => !read.has(item.readerId)).map(item => ({ ...item, ...where, updatedAt: new Date(item.updatedAt), revision: 1 }))
      if (schedules.length) await tx.phonicsWordSchedule.createMany({ data: schedules })
      if (favorites.length) await tx.phonicsWordFavorite.createMany({ data: favorites })
      if (answers.length) await tx.phonicsPracticeAnswer.createMany({ data: answers })
      if (typing.length) await tx.phonicsTypingResult.createMany({ data: typing })
      if (reading.length) await tx.phonicsReadingProgress.createMany({ data: reading })
      if (current.wordSettingsRevision === 0) await tx.phonicsEnrollment.update({ where: { childId }, data: { wordSettingsJson: JSON.stringify(backup.settings), wordSettingsRevision: 1 } })
      return { schedules: schedules.length, favorites: favorites.length, answers: answers.length, typing: typing.length, reading: reading.length }
    })
  }

  async practiceAnswer(claims: TokenClaims, childId: string, input: PracticeInput) {
    const enrollment = await this.enrollment(claims, childId)
    if (!enrollment.enabled || !enrollment.versionId) throw new AppError('请先让家长开启这套英语练习', 'PHONICS_DISABLED', 403)
    if (enrollment.versionId !== input.versionId) throw new AppError('课程已变化，请重新开始练习', 'COURSE_CHANGED', 409)
    const versionId = enrollment.versionId
    const course = await this.runtime.requireCourse(claims.fid, versionId)
    const word = course.words.find(item => item.id === input.wordId)
    if (!word || !word.meaningIntroducedAt) throw new AppError('这个单词不存在', 'WORD_NOT_FOUND', 404)
    if (input.mode !== 'spelling' && !course.words.some(item => item.id === input.answer)) throw new AppError('选项不存在', 'INVALID_ANSWER', 400)
    const requestHash = digest(input)
    return this.transaction(async tx => {
      await this.enabled(claims, childId, versionId, tx)
      const previous = await tx.phonicsPracticeAnswer.findUnique({ where: { childId_clientEventId: { childId, clientEventId: input.clientEventId } } })
      if (previous) {
        if (previous.requestHash !== requestHash) throw new AppError('请求编号已用于其他内容', 'IDEMPOTENCY_CONFLICT', 409)
        return { correct: previous.correct, firstAttempt: previous.firstAttempt, repeated: true }
      }
      const prior = await tx.phonicsPracticeAnswer.findFirst({ where: { childId, questionId: input.questionId } })
      if (prior && (prior.wordId !== input.wordId || prior.track !== input.track || prior.courseVersionId !== versionId || (input.track !== 'study' && prior.mode !== input.mode))) throw new AppError('题目编号已用于其他题目', 'IDEMPOTENCY_CONFLICT', 409)
      // 词光式学习模型：词汇的认记与复习从入学第一天就按学习路线开放，
      // 不再被拼读课次完成度锁死（课次教的是「拼读解码」，与词卡记忆并行）。
      const current = await tx.phonicsEnrollment.findUniqueOrThrow({ where: { childId } })
      const correct = input.mode === 'spelling' ? input.answer.toLocaleLowerCase('en') === word.text.toLocaleLowerCase('en') : input.answer === word.id
      let reviewLogJson: string | null = null
      if (input.track === 'study' && !prior) {
        const key = { childId_courseVersionId_wordId: { childId, courseVersionId: versionId, wordId: word.id } }
        const previous = await tx.phonicsWordSchedule.findUnique({ where: key })
        const now = new Date()
        if (previous && ![WORD_SCHEDULE_VERSION, PREVIOUS_WORD_SCHEDULE_VERSION].includes(previous.algorithm)) throw new AppError('复习安排版本不兼容', 'SCHEDULE_VERSION', 409)
        if (previous && previous.dueAt > now) throw new AppError('这个词还没到复习时间', 'REVIEW_NOT_DUE', 409)
        const settings = readWordSettings(current.wordSettingsJson)
        if (!previous && await newWordsToday(tx, childId, versionId, now) >= settings.dailyNew) throw new AppError('今天的新词已经学完了', 'DAILY_NEW_LIMIT', 409)
        const before = previous ? JSON.parse(previous.cardJson) as CardInput : createEmptyCard(now)
        const grade = wordGrade(input.mode, correct, input.elapsedMs, input.hinted)
        const result = wordScheduler(settings.retention).next(before, now, grade)
        reviewLogJson = JSON.stringify({ algorithm: WORD_SCHEDULE_VERSION, before, log: result.log, after: result.card, elapsedMs: input.elapsedMs ?? null, hinted: input.hinted ?? false })
        const data = { algorithm: WORD_SCHEDULE_VERSION, cardJson: JSON.stringify(result.card), dueAt: result.card.due }
        await tx.phonicsWordSchedule.upsert({ where: key, create: { ...key.childId_courseVersionId_wordId, ...data }, update: data })
      }
      const saved = await tx.phonicsPracticeAnswer.create({ data: { childId, courseVersionId: versionId, clientEventId: input.clientEventId, questionId: input.questionId, wordId: word.id, mode: input.mode, track: input.track, requestHash, correct, firstAttempt: !prior, elapsedMs: input.elapsedMs, reviewLogJson } })
      return { correct: saved.correct, firstAttempt: saved.firstAttempt, repeated: false }
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
