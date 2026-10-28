import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { AppError, ValidationError } from '../../../lib/errors'
import { requireAuth } from '../../family/routes'
import { controlSchema, enrollmentSchema, favoriteSchema, learningEventSchema, observationSchema, practiceAnswerSchema, readingProgressSchema, startSchema, typingResultSchema, wordBackupSchema, wordSessionUpdateSchema, wordSettingsUpdateSchema } from './contracts'
import { publicTask } from './courseRegistry'
import { PhonicsRuntime } from './runtime'
import { PhonicsService } from './service'
import type { FrozenPlan } from './lessonMachine'

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new ValidationError('英语练习参数不正确')
  return parsed.data
}
const prefix = '/api/phonics/v2'
export function registerPhonicsV2Routes(app: FastifyInstance, deps: { db: PrismaClient; tokenSecret: Buffer; runtime: PhonicsRuntime }): void {
  const { db, tokenSecret, runtime } = deps
  const service = new PhonicsService(db, runtime, tokenSecret)
  const auth = requireAuth(tokenSecret), parent = requireAuth(tokenSecret, { roles: ['parent'] })
  const claims = (request: FastifyRequest) => request.auth!

  app.get(`${prefix}/catalog`, { preHandler: auth }, async request => {
    const versions = []
    for (const course of runtime.courses.values()) if (await runtime.available(claims(request).fid, course.manifest.versionId)) versions.push({
      courseId: course.manifest.courseId, versionId: course.manifest.versionId, accent: course.manifest.accent,
      selfUse: runtime.selfUse(claims(request).fid, course.manifest.contentHash ?? ''),
      lessons: course.lessons.map(l => ({ id: l.id, order: l.order, titleZh: l.titleZh, newMappingIds: l.newMappingIds })),
    })
    return { versions }
  })
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/enrollment`, { preHandler: auth }, async request => ({ enrollment: await service.enrollment(claims(request), request.params.childId) }))
  app.put<{ Params: { childId: string } }>(`${prefix}/children/:childId/enrollment`, { preHandler: parent }, async request => ({ enrollment: await service.setEnrollment(claims(request), request.params.childId, parse(enrollmentSchema, request.body)) }))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/next`, { preHandler: auth }, async request => ({ next: await service.next(claims(request), request.params.childId) }))
  app.get<{ Params: { versionId: string; lessonKey: string } }>(`${prefix}/lessons/:versionId/:lessonKey`, { preHandler: auth }, async request => {
    const course = await runtime.requireCourse(claims(request).fid, request.params.versionId)
    const enabled = await db.phonicsEnrollment.findFirst({ where: { v2Enabled: true, courseVersionId: request.params.versionId, child: { familyId: claims(request).fid } } })
    if (!enabled) throw new AppError('请先让家长开启英语练习', 'PHONICS_DISABLED', 403)
    const lesson = course.lessons.find(l => l.id === request.params.lessonKey)
    if (!lesson) throw new AppError('这节练习不存在', 'LESSON_NOT_FOUND', 404)
    return { lesson: { id: lesson.id, titleZh: lesson.titleZh, parentGuideZh: lesson.parentGuideZh, tasks: lesson.taskIds.map(id => publicTask(course.tasks.find(t => t.id === id)!)), words: course.words.filter(w => lesson.taskIds.some(id => course.tasks.find(t => t.id === id)?.wordId === w.id)).map(w => ({ id: w.id, text: w.text, meaningZh: w.meaningZh })) } }
  })
  app.post<{ Params: { childId: string } }>(`${prefix}/children/:childId/attempts`, { preHandler: auth }, async request => {
    const attempt = await service.start(claims(request), request.params.childId, parse(startSchema, request.body))
    return { attempt: await service.dto(claims(request), attempt) }
  })
  app.get<{ Params: { attemptId: string } }>(`${prefix}/attempts/:attemptId`, { preHandler: auth }, async request => ({ attempt: await service.dto(claims(request), await service.ownAttempt(claims(request), request.params.attemptId)) }))
  app.post<{ Params: { attemptId: string } }>(`${prefix}/attempts/:attemptId/events`, { preHandler: auth }, async request => {
    const input = parse(learningEventSchema, request.body)
    const receipt = await service.mutate(claims(request), request.params.attemptId, input, input.kind)
    return { ...receipt, attempt: await service.dto(claims(request), await service.ownAttempt(claims(request), request.params.attemptId)) }
  })
  for (const [route, kind] of [['pause', 'attempt_paused'], ['resume', 'attempt_resumed'], ['finish', 'attempt_finished'], ['cancel', 'attempt_cancelled']] as const) {
    app.post<{ Params: { attemptId: string } }>(`${prefix}/attempts/:attemptId/${route}`, { preHandler: auth }, async request => {
      const receipt = await service.mutate(claims(request), request.params.attemptId, parse(controlSchema, request.body), kind)
      return { ...receipt, attempt: await service.dto(claims(request), await service.ownAttempt(claims(request), request.params.attemptId)) }
    })
  }
  app.post<{ Params: { attemptId: string } }>(`${prefix}/attempts/:attemptId/observations`, { preHandler: parent }, async request => {
    const receipt = await service.mutate(claims(request), request.params.attemptId, parse(observationSchema, request.body), 'caregiver_observation')
    return { ...receipt, attempt: await service.dto(claims(request), await service.ownAttempt(claims(request), request.params.attemptId)) }
  })
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/readers`, { preHandler: auth }, async request => {
    const enrollment = await service.enrollment(claims(request), request.params.childId)
    if (!enrollment.enabled || !enrollment.versionId) return { readers: [] }
    const course = await runtime.requireCourse(claims(request).fid, enrollment.versionId)
    const { history } = await service.practiceHistory(request.params.childId, enrollment.versionId)
    const entryOrder = course.lessons.find(l => l.id === enrollment.entryLessonKey)?.order ?? 1
    const eligible = new Set([...history.filter(h => h.kind === 'lesson' && h.status === 'completed').map(h => h.lessonKey), ...course.lessons.filter(l => l.order < entryOrder).map(l => l.id)])
    return { readers: course.readers.filter(r => eligible.has(r.introducedAt)).map(r => ({ id: r.id, titleZh: r.titleZh, kind: r.kind, versionId: enrollment.versionId })) }
  })
  app.get<{ Params: { childId: string; readerId: string } }>(`${prefix}/children/:childId/readers/:readerId`, { preHandler: auth }, async request => ({ reader: await service.reader(claims(request), request.params.childId, request.params.readerId) }))
  app.put<{ Params: { childId: string; readerId: string } }>(`${prefix}/children/:childId/readers/:readerId/progress`, { preHandler: auth }, async request => service.setReadingProgress(claims(request), request.params.childId, request.params.readerId, parse(readingProgressSchema, request.body)))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/words`, { preHandler: auth }, async request => ({ words: await service.wordCards(claims(request), request.params.childId) }))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/atlas`, { preHandler: auth }, async request => ({ atlas: await service.atlas(claims(request), request.params.childId) }))
  app.put<{ Params: { childId: string; wordId: string } }>(`${prefix}/children/:childId/words/:wordId/favorite`, { preHandler: auth }, async request => service.setFavorite(claims(request), request.params.childId, request.params.wordId, parse(favoriteSchema, request.body)))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/practice`, { preHandler: auth }, async request => service.practiceSummary(claims(request), request.params.childId))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/study-schedule`, { preHandler: auth }, async request => service.studySchedule(claims(request), request.params.childId))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/word-settings`, { preHandler: auth }, async request => service.wordSettings(claims(request), request.params.childId))
  app.put<{ Params: { childId: string } }>(`${prefix}/children/:childId/word-settings`, { preHandler: auth }, async request => service.setWordSettings(claims(request), request.params.childId, parse(wordSettingsUpdateSchema, request.body)))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/word-session`, { preHandler: auth }, async request => service.wordSession(claims(request), request.params.childId))
  app.put<{ Params: { childId: string } }>(`${prefix}/children/:childId/word-session`, { preHandler: auth, bodyLimit: 512 * 1024 }, async request => service.setWordSession(claims(request), request.params.childId, parse(wordSessionUpdateSchema, request.body)))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/typing`, { preHandler: auth }, async request => service.typingResults(claims(request), request.params.childId))
  app.post<{ Params: { childId: string } }>(`${prefix}/children/:childId/typing`, { preHandler: auth }, async request => service.recordTyping(claims(request), request.params.childId, parse(typingResultSchema, request.body)))
  app.get<{ Params: { childId: string } }>(`${prefix}/children/:childId/word-backup`, { preHandler: parent }, async request => ({ backup: await service.wordBackup(claims(request), request.params.childId) }))
  app.post<{ Params: { childId: string } }>(`${prefix}/children/:childId/word-backup`, { preHandler: parent, bodyLimit: 10 * 1024 * 1024 }, async request => service.restoreWordBackup(claims(request), request.params.childId, parse(wordBackupSchema, request.body)))
  app.post<{ Params: { childId: string } }>(`${prefix}/children/:childId/practice`, { preHandler: auth }, async request => service.practiceAnswer(claims(request), request.params.childId, parse(practiceAnswerSchema, request.body)))
  app.get<{ Params: { childId: string }; Querystring: { page?: string } }>(`${prefix}/children/:childId/summary`, { preHandler: auth }, async request => {
    const childId = request.params.childId
    await service.ownChild(claims(request), childId)
    const page = parse(z.coerce.number().int().min(0).max(100000), request.query.page ?? 0)
    const where = { childId, protocolVersion: 2 }
    const [groups, recent, v1Starts, completed, oralEvents, calendarAttempts, calendarAnswers] = await Promise.all([
      db.phonicsAttempt.groupBy({ by: ['courseVersionId', 'planKind', 'status'], where, _count: { id: true } }),
      db.phonicsAttempt.findMany({ where, orderBy: [{ startedAt: 'desc' }, { id: 'desc' }], take: 20, skip: page * 20, select: { id: true, courseVersionId: true, planKind: true, lessonKey: true, status: true, startedAt: true, finishedAt: true, _count: { select: { learningEvents: { where: { kind: { in: ['step_ack', 'response_submitted', 'self_read_reported'] } } } } } } }),
      db.phonicsAttempt.count({ where: { childId, protocolVersion: 1 } }),
      db.phonicsAttempt.findMany({ where: { ...where, planKind: 'lesson', status: 'completed' }, distinct: ['courseVersionId', 'lessonKey'], select: { courseVersionId: true, lessonKey: true } }),
      db.phonicsLearningEvent.findMany({ where: { attempt: where, kind: { in: ['self_read_reported', 'caregiver_observation'] }, receivedAt: { gte: new Date(Date.now() - 90 * 86400_000) } }, include: { attempt: { select: { planJson: true, courseVersionId: true } } }, orderBy: [{ receivedAt: 'desc' }, { serverSequence: 'desc' }], take: 200 }),
      page === 0 ? db.phonicsAttempt.findMany({ where: { ...where, status: 'completed', learningEvents: { some: { kind: { in: ['step_ack', 'response_submitted', 'self_read_reported'] } } }, startedAt: { gte: new Date(Date.now() - 366 * 86400_000) } }, select: { startedAt: true } }) : Promise.resolve([]),
      page === 0 ? db.phonicsPracticeAnswer.findMany({ where: { childId, createdAt: { gte: new Date(Date.now() - 366 * 86400_000) } }, select: { createdAt: true }, take: 20000 }) : Promise.resolve([]),
    ])
    const count = (status?: string) => groups.filter(g => !status || g.status === status).reduce((sum, g) => sum + g._count.id, 0)
    const superseded = new Set(oralEvents.flatMap(e => e.supersedesEventId ? [e.supersedesEventId] : []))
    const observations = oralEvents.filter(e => e.kind === 'caregiver_observation' && !superseded.has(e.id)).map(e => ({ id: e.id, attemptId: e.attemptId, taskInstanceId: e.taskInstanceId!, observation: (JSON.parse(e.resultJson) as { observation: string }).observation, receivedAt: Math.floor(e.receivedAt.getTime() / 1000) }))
    const oralTasks = oralEvents.filter(e => e.kind === 'self_read_reported').map(e => {
      const result = JSON.parse(e.resultJson) as { targetId: string; pageIndex: number; helpLevel: number }
      const plan = JSON.parse(e.attempt.planJson!) as FrozenPlan
      const task = plan.tasks.find(t => t.id === e.stepKey) ?? plan.tasks.find(t => t.wordId === result.targetId || t.readerId === result.targetId)
      const reader = task?.readerId ? plan.readers.find(r => r.id === task.readerId) : null
      return { attemptId: e.attemptId, taskInstanceId: e.taskInstanceId!, targetId: result.targetId, text: reader?.pages[result.pageIndex]?.text ?? task?.displayText ?? result.targetId, hadHelp: result.helpLevel > 0, pageNumber: reader ? result.pageIndex + 1 : null, versionId: e.attempt.courseVersionId!, reportedAt: Math.floor(e.receivedAt.getTime() / 1000), report: (JSON.parse(e.payloadJson) as { report: string }).report, revision: e.serverSequence }
    })
    const observedKeys = new Set(observations.filter(o => o.observation !== 'not_observed').map(o => `${o.attemptId}:${o.taskInstanceId}`))
    const calendar = new Map<string, number>()
    for (const attempt of calendarAttempts) {
      const day = new Date(attempt.startedAt.getTime() + 8 * 3600_000).toISOString().slice(0, 10)
      calendar.set(day, (calendar.get(day) ?? 0) + 1)
    }
    for (const answer of calendarAnswers) {
      const day = new Date(answer.createdAt.getTime() + 8 * 3600_000).toISOString().slice(0, 10)
      calendar.set(day, (calendar.get(day) ?? 0) + 1)
    }
    return {
      totalAttempts: count(), completedAttempts: count('completed'), pausedAttempts: count('paused'), cancelledAttempts: count('cancelled'), v1Starts,
      groups: groups.map(g => ({ versionId: g.courseVersionId!, planKind: g.planKind!, status: g.status, count: g._count.id })),
      completedLessonKeys: completed.map(c => ({ versionId: c.courseVersionId!, lessonKey: c.lessonKey! })),
      recentPractice: recent.map(row => ({ id: row.id, versionId: row.courseVersionId!, planKind: row.planKind!, lessonKey: row.lessonKey, status: row.status, startedAt: Math.floor(row.startedAt.getTime() / 1000), hadLearningActions: row._count.learningEvents > 0 })),
      practiceCalendar: [...calendar].map(([day, count]) => ({ day, count })),
      pagination: { page, limit: 20, total: count() },
      caregiverObservedCount: observedKeys.size, unobservedOralTaskCount: oralTasks.filter(t => !observedKeys.has(`${t.attemptId}:${t.taskInstanceId}`)).length,
      next: await service.next(claims(request), childId),
      ...(claims(request).role === 'parent' ? { oralTasks, observations } : {}),
    }
  })
}
