import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { AppError, ValidationError } from '../lib/errors'
export const reviewInput = z.object({ version: z.string().min(1).max(128), publicationStatus: z.enum(['draft', 'validated', 'reviewed', 'published', 'withdrawn']), reviewer: z.string().trim().min(2).max(80), evidence: z.object({ approved: z.boolean(), source: z.string().trim().min(3).max(500), scope: z.string().trim().min(3).max(1000), reviewedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(x => !Number.isNaN(Date.parse(x)) && new Date(x).toISOString().slice(0, 10) === x && x <= new Date().toISOString().slice(0, 10)), notes: z.string().max(2000) }) })
const state = z.object({ publicationStatus: z.string(), reviewStatus: z.string(), reviewEvidence: z.string().nullable(), readingGuidance: z.string().nullable().optional() })
export async function changeReview(db: PrismaClient, id: string, input: z.infer<typeof reviewInput>) {
  const b = reviewInput.parse(input)
  return db.$transaction(async tx => {
    const book = await tx.book.findUniqueOrThrow({ where: { id }, include: { chapters: { orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } } } })
    if (book.contentVersion !== b.version) throw new AppError('正文版本已变化，请重新核查', 'CONTENT_STALE', 409)
    if (['validated', 'reviewed', 'published'].includes(b.publicationStatus)) {
      const rights = await tx.rightsLedger.findUnique({ where: { bookId: id } })
      if (!rights?.workTitle || !rights.basis || !rights.jurisdiction || !book.source) throw new ValidationError('底本与权利台账不完整')
      if (!book.chapters.length || book.chapters.some((ch, i) => ch.order !== i + 1 || !ch.blocks.length || ch.blocks.some((block, n) => block.order !== n + 1 || (!block.text.trim() && block.kind !== 'image') || (block.pinyin && block.pinyin.trim().split(/\s+/).length !== (block.text.match(/[\u3400-\u9fff]/g)?.length ?? 0))))) throw new ValidationError('章节、正文或拼音结构检查未通过；机器检查不代替人工审校')
    }
    const approval = ['reviewed', 'published'].includes(b.publicationStatus)
    if (approval && !b.evidence.approved) throw new ValidationError('审校或发布需要明确的人工批准，不接受机器校验代替')
    const beforeState = JSON.stringify(state.parse(book))
    const reviewEvidence = JSON.stringify({ ...b.evidence, reviewer: b.reviewer, contentVersion: b.version })
    const after = await tx.book.update({ where: { id }, data: { publicationStatus: b.publicationStatus, ...(approval ? { reviewStatus: 'reviewed', reviewEvidence } : {}) } })
    await tx.bookReviewEvent.create({ data: { bookId: id, version: b.version, reviewer: b.reviewer, action: b.publicationStatus, evidence: reviewEvidence, beforeState, afterState: JSON.stringify(state.parse(after)) } })
    return { book: after }
  })
}
export async function rollbackReview(db: PrismaClient, id: string, eventId: string, reviewer: string) {
  return db.$transaction(async tx => {
    const event = await tx.bookReviewEvent.findFirst({ where: { id: eventId, bookId: id } })
    const book = await tx.book.findUniqueOrThrow({ where: { id } })
    const latest = await tx.bookReviewEvent.findFirst({ where: { bookId: id }, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] })
    if (!event || latest?.id !== eventId || book.contentVersion !== event.version || JSON.stringify(state.parse(book)) !== event.afterState) throw new AppError('只能撤销当前版本最近一次状态操作；正文或后续状态已变化', 'REVIEW_ROLLBACK_STALE', 409)
    const data = state.parse(JSON.parse(event.beforeState))
    const after = await tx.book.update({ where: { id }, data })
    await tx.bookReviewEvent.create({ data: { bookId: id, version: book.contentVersion, reviewer, action: 'rollback', evidence: JSON.stringify({ eventId, note: '撤销状态操作，不修改正文' }), beforeState: event.afterState, afterState: event.beforeState } })
    return { book: after }
  })
}
