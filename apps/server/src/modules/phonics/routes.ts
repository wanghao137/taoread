import type { FastifyInstance, FastifyRequest } from 'fastify'
import { Prisma, type PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { AppError, UnauthorizedError, ValidationError } from '../../lib/errors'
import { requireAuth } from '../family/routes'
import { lessonById, PHONICS_DRAFT, PHONICS_READERS, publicLesson } from './lessons'

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) throw new ValidationError('练习参数不正确')
  return result.data
}

export function registerPhonicsRoutes(app: FastifyInstance, deps: { db: PrismaClient; tokenSecret: Buffer }): void {
  const { db, tokenSecret } = deps
  const auth = requireAuth(tokenSecret)
  const parent = requireAuth(tokenSecret, { roles: ['parent'] })
  async function ownChild(request: FastifyRequest, childId: string): Promise<void> {
    if (!request.auth) throw new UnauthorizedError()
    const child = await db.childProfile.findUnique({ where: { id: childId }, select: { familyId: true } })
    if (!child || child.familyId !== request.auth.fid) throw new AppError('没有找到孩子档案', 'CHILD_NOT_FOUND', 404)
  }
  async function enabled(childId: string): Promise<void> {
    const enrollment = await db.phonicsEnrollment.findUnique({ where: { childId }, select: { enabled: true } })
    if (!enrollment?.enabled) throw new AppError('请先让家长开启英语练习', 'PHONICS_DISABLED', 403)
  }

  app.get('/api/phonics/readers', { preHandler: auth }, async () => ({ status: 'draft', readers: PHONICS_READERS }))
  app.get('/api/phonics/catalog', { preHandler: auth }, async () => ({
    status: 'draft', audioAvailable: false,
    lessons: PHONICS_DRAFT.map(({ id }) => publicLesson(id)),
  }))
  app.get<{ Params: { id: string } }>('/api/phonics/lessons/:id', { preHandler: auth }, async (request) => {
    const lesson = publicLesson(request.params.id)
    if (!lesson) throw new AppError('没有找到这节练习', 'LESSON_NOT_FOUND', 404)
    return { lesson }
  })
  app.get<{ Params: { childId: string } }>('/api/children/:childId/phonics/enrollment', { preHandler: auth }, async (request) => {
    await ownChild(request, request.params.childId)
    const enrollment = await db.phonicsEnrollment.findUnique({ where: { childId: request.params.childId } })
    return { enabled: enrollment?.enabled ?? false, status: 'draft' }
  })
  app.put<{ Params: { childId: string } }>('/api/children/:childId/phonics/enrollment', { preHandler: parent }, async (request) => {
    await ownChild(request, request.params.childId)
    const { enabled } = parse(z.object({ enabled: z.boolean() }), request.body)
    const enrollment = await db.phonicsEnrollment.upsert({ where: { childId: request.params.childId }, create: { childId: request.params.childId, enabled }, update: { enabled } })
    return { enabled: enrollment.enabled, status: 'draft' }
  })
  // ── 续做（D3）：该孩子某课最近一次未结束的尝试 + 已答题目，支持中断恢复 ──
  app.get<{ Params: { childId: string }; Querystring: { lessonId?: string } }>('/api/children/:childId/phonics/attempts/active', { preHandler: auth }, async (request) => {
    await ownChild(request, request.params.childId)
    await enabled(request.params.childId)
    const lessonId = request.query.lessonId
    if (!lessonId) throw new ValidationError('请指定课程')
    if (!lessonById(lessonId)) throw new AppError('没有找到这节练习', 'LESSON_NOT_FOUND', 404)
    const attempt = await db.phonicsAttempt.findFirst({
      where: { childId: request.params.childId, lessonId, status: 'started' },
      orderBy: { startedAt: 'desc' },
      include: { responses: { select: { itemId: true, correct: true } } },
    })
    if (!attempt) return { attempt: null }
    return {
      attempt: {
        id: attempt.id,
        lessonId: attempt.lessonId,
        status: attempt.status,
        answered: attempt.responses.map((response) => ({ itemId: response.itemId, correct: response.correct })),
      },
    }
  })
  app.post<{ Params: { childId: string } }>('/api/children/:childId/phonics/attempts', { preHandler: auth }, async (request) => {
    await ownChild(request, request.params.childId)
    await enabled(request.params.childId)
    const { clientAttemptId, lessonId } = parse(z.object({ clientAttemptId: z.string().uuid(), lessonId: z.string().min(1).max(60) }), request.body)
    if (!lessonById(lessonId)) throw new AppError('没有找到这节练习', 'LESSON_NOT_FOUND', 404)
    const attempt = await db.phonicsAttempt.upsert({
      where: { childId_clientAttemptId: { childId: request.params.childId, clientAttemptId } },
      create: { childId: request.params.childId, clientAttemptId, lessonId }, update: {},
    })
    if (attempt.lessonId !== lessonId) throw new AppError('练习编号已用于另一节课', 'ATTEMPT_CONFLICT', 409)
    return { attempt: { id: attempt.id, lessonId: attempt.lessonId, status: attempt.status } }
  })
  app.post<{ Params: { id: string } }>('/api/phonics/attempts/:id/responses', { preHandler: auth }, async (request) => {
    const { itemId, answerId } = parse(z.object({ itemId: z.string().min(1).max(60), answerId: z.string().min(1).max(60) }), request.body)
    const attempt = await db.phonicsAttempt.findUnique({ where: { id: request.params.id }, include: { child: { select: { familyId: true } } } })
    if (!attempt || attempt.child.familyId !== request.auth?.fid) throw new AppError('没有找到这次练习', 'ATTEMPT_NOT_FOUND', 404)
    await enabled(attempt.childId)
    if (attempt.status !== 'started') throw new AppError('练习已结束', 'ATTEMPT_CLOSED', 409)
    const lesson = lessonById(attempt.lessonId)!
    const item = lesson.items.find((candidate) => candidate.id === itemId)
    if (!item || !item.options.some((option) => option.id === answerId)) throw new ValidationError('答案不属于本题')
    const existing = await db.phonicsResponse.findUnique({ where: { attemptId_itemId: { attemptId: attempt.id, itemId } } })
    if (existing) {
      if (existing.answerId !== answerId) throw new AppError('本题已经作答', 'RESPONSE_CONFLICT', 409)
      return { correct: existing.correct, repeated: true }
    }
    try {
      const response = await db.phonicsResponse.create({ data: { attemptId: attempt.id, itemId, answerId, correct: item.answer === answerId } })
      return { correct: response.correct, repeated: false }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const saved = await db.phonicsResponse.findUnique({ where: { attemptId_itemId: { attemptId: attempt.id, itemId } } })
        if (saved && saved.answerId === answerId) return { correct: saved.correct, repeated: true }
        if (saved) throw new AppError('本题已经作答', 'RESPONSE_CONFLICT', 409)
      }
      throw error
    }
  })
  app.post<{ Params: { id: string } }>('/api/phonics/attempts/:id/finish', { preHandler: auth }, async (request) => {
    const { status } = parse(z.object({ status: z.enum(['completed', 'paused']) }), request.body)
    const attempt = await db.phonicsAttempt.findUnique({ where: { id: request.params.id }, include: { child: { select: { familyId: true } } } })
    if (!attempt || attempt.child.familyId !== request.auth?.fid) throw new AppError('没有找到这次练习', 'ATTEMPT_NOT_FOUND', 404)
    await enabled(attempt.childId)
    if (attempt.status !== 'started' && attempt.status !== status) throw new AppError('练习已按另一状态结束', 'ATTEMPT_CONFLICT', 409)
    const updated = attempt.status === 'started' ? await db.phonicsAttempt.update({ where: { id: attempt.id }, data: { status, finishedAt: new Date() } }) : attempt
    return { id: updated.id, status: updated.status }
  })
  app.get<{ Params: { childId: string } }>('/api/children/:childId/phonics/summary', { preHandler: auth }, async (request) => {
    await ownChild(request, request.params.childId)
    const attempts = await db.phonicsAttempt.findMany({ where: { childId: request.params.childId }, include: { responses: { select: { correct: true } } }, orderBy: { startedAt: 'desc' }, take: 30 })
    return { status: 'draft', attempts: attempts.map(({ id, lessonId, status, startedAt, responses }) => ({ id, lessonId, status, startedAt, answered: responses.length, correct: responses.filter((response) => response.correct).length })) }
  })
}
