import { timingSafeEqual } from 'node:crypto'
import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../modules/family/routes'
import { AppError, ForbiddenError, ValidationError } from '../lib/errors'
import { assertContentReadable, invalidateBookCatalog } from './service'
import { anchorText } from './anchors'
import { cspSummary } from '../lib/csp'
import { restoreRecords } from '../modules/family/records'
import { changeReview, reviewInput, rollbackReview } from './review'
import { guidanceSchema } from './guidance'
import { operationEvidence } from '../lib/operations'
import { correctBlock, correctionSchema, restoreTextRevision, revisionRestoreSchema } from './corrections'

const childQuery = z.object({ childId: z.string().min(1).max(64) })
function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input)
  if (!result.success) throw new ValidationError('请求参数不正确')
  return result.data
}

export function registerImprovementRoutes(app: FastifyInstance, { db, tokenSecret }: { db: PrismaClient; tokenSecret: Buffer }): void {
  const auth = requireAuth(tokenSecret)
  const parent = requireAuth(tokenSecret, { roles: ['parent'] })
  app.post('/api/reading/restore', { preHandler: parent, bodyLimit: 20 * 1024 * 1024 }, async request => {
    const b = parse(z.object({ preview: z.boolean(), records: z.unknown(), confirm: z.literal('RESTORE_TO_EMPTY_FAMILY').optional() }), request.body)
    if (!b.preview && b.confirm !== 'RESTORE_TO_EMPTY_FAMILY') throw new ValidationError('请先预览并确认恢复到空家庭')
    return restoreRecords(db, request.auth!.fid, b.records, b.preview)
  })
  app.get('/api/content/trial', async (_request, reply) => {
    reply.header('Cache-Control', 'public, max-age=300')
    const books = await db.book.findMany({
      where: { id: { in: ['poetry-song-spring', 'sanzi-jing', 'original-goodnightforest'] }, publicationStatus: 'published' },
      select: {
        id: true, title: true, author: true, source: true, contentVersion: true, reviewStatus: true,
        chapters: { orderBy: { order: 'asc' }, take: 1, select: {
          title: true,
          blocks: { orderBy: { order: 'asc' }, where: { kind: { in: ['poem', 'text'] } }, take: 4, select: { text: true, pinyin: true, translation: true, kind: true } },
        } },
      },
    })
    return { books }
  })
  async function ownChild(request: FastifyRequest, childId: string) {
    if (!await db.childProfile.findFirst({ where: { id: childId, familyId: request.auth!.fid } })) throw new ForbiddenError('请选择本家庭的小读者')
  }
  app.get('/api/reading/bookmarks', { preHandler: auth }, async request => {
    const q = parse(childQuery.extend({ bookId: z.string().max(128).optional() }), request.query)
    await ownChild(request, q.childId)
    const rows = await db.readingBookmark.findMany({ where: { childId: q.childId, ...(q.bookId ? { bookId: q.bookId } : {}) }, orderBy: { updatedAt: 'desc' } })
    if (q.bookId) {
      await assertContentReadable(db, request.auth!.fid, q.bookId, { role: request.auth!.role })
      const isImport = q.bookId.startsWith('imp:')
      const book = isImport ? await db.importedBook.findUnique({ where: { id: q.bookId }, include: { chapters: true } }) : await db.book.findUnique({ where: { id: q.bookId }, include: { chapters: { include: { blocks: true } } } })
      if (book) for (let i = 0; i < rows.length; i++) {
        const row = rows[i]!
        if (row.deleted || row.version === String(book.contentVersion) || !row.anchor) continue
        const matches: Array<{ chapter: number; position: number }> = []
        if (isImport) {
          const imported = await db.importedChapter.findMany({ where: { bookId: q.bookId } })
           for (const ch of imported) { const text = anchorText(ch.text); const anchor = anchorText(row.anchor); let at = text.indexOf(anchor); while (at >= 0) { matches.push({ chapter: ch.order, position: at }); at = text.indexOf(anchor, at + 1) } }
        } else {
          const blocks = await db.block.findMany({ where: { chapter: { bookId: q.bookId } }, include: { chapter: { select: { order: true } } } })
           for (const block of blocks) if (anchorText(block.text).startsWith(anchorText(row.anchor))) matches.push({ chapter: block.chapter.order, position: block.order - 1 })
        }
        if (matches.length === 1) {
          await db.readingBookmark.updateMany({ where: { id: row.id, updatedAt: row.updatedAt }, data: { ...matches[0], version: String(book.contentVersion) } })
          rows[i] = await db.readingBookmark.findUniqueOrThrow({ where: { id: row.id } })
        }
      }
    }
    return { bookmarks: rows }
  })
  app.put('/api/reading/bookmarks', { preHandler: auth }, async request => {
    const b = parse(z.object({ id: z.string().uuid(), childId: z.string().max(64), bookId: z.string().max(128), source: z.enum(['public', 'import']), version: z.string().max(128), chapter: z.number().int().min(1).max(10000), position: z.number().int().min(0).max(100000), anchor: z.string().max(240), deleted: z.boolean(), baseUpdatedAt: z.string().datetime().nullable() }), request.body)
    await ownChild(request, b.childId)
    await assertContentReadable(db, request.auth!.fid, b.bookId, { role: request.auth!.role })
    if ((b.source === 'import') !== b.bookId.startsWith('imp:')) throw new ValidationError('书签来源与书目不一致')
    return db.$transaction(async tx => {
      const current = await tx.readingBookmark.findUnique({ where: { id: b.id } })
      if (current && (current.childId !== b.childId || current.bookId !== b.bookId)) throw new ForbiddenError()
      if (current && current.updatedAt.toISOString() !== b.baseUpdatedAt) throw new AppError('书签已在另一台设备更新，请刷新后再试', 'BOOKMARK_STALE', 409)
      if (!current && b.baseUpdatedAt !== null) throw new AppError('原书签已不存在，请刷新后再试', 'BOOKMARK_STALE', 409)
      const { baseUpdatedAt: _base, ...data } = b
      return { bookmark: await tx.readingBookmark.upsert({ where: { id: b.id }, create: data, update: data }) }
    })
  })
  app.get('/api/reading/recent', { preHandler: auth }, async request => {
    const q = parse(childQuery, request.query)
    await ownChild(request, q.childId)
    const [publicRows, imports, sessions] = await Promise.all([
      db.readingProgress.findMany({ where: { childId: q.childId, book: { publicationStatus: 'published' } }, include: { book: { select: { title: true } } }, orderBy: { updatedAt: 'desc' }, take: 30 }),
      db.importedReadingProgress.findMany({ where: { childId: q.childId }, include: { book: { select: { title: true } } }, orderBy: { updatedAt: 'desc' }, take: 30 }),
      db.cosession.findMany({ where: { childId: q.childId }, orderBy: { startedAt: 'desc' }, take: 30 }),
    ])
    const blocked = new Set((await db.shelfSnapshot.findMany({ where: { familyId: request.auth!.fid, blocked: true }, select: { bookId: true } })).map(x => x.bookId.replace(/^cbf:/, '')))
    const items = [
      ...publicRows.filter(x => !blocked.has(x.bookId)).map(x => ({ source: 'public', bookId: x.bookId, title: x.book.title, chapter: x.chapterOrder, updatedAt: x.updatedAt.toISOString(), available: true })),
      ...imports.map(x => ({ source: 'import', bookId: x.bookId, title: x.book.title, chapter: x.order, updatedAt: x.updatedAt.toISOString(), available: !x.relocationRequired })),
      ...sessions.filter(x => !x.bookId?.startsWith('cbf:') && !x.bookId?.startsWith('imp:')).map(x => ({ source: x.paperTitle ? 'paper' : 'weread', bookId: x.bookId, title: x.paperTitle ?? '微信读书共读记录', chapter: null, updatedAt: x.startedAt.toISOString(), available: false })),
      ...sessions.filter(x => x.bookId?.startsWith('imp:') && !imports.some(p => p.bookId === x.bookId)).map(x => ({ source: 'import', bookId: x.bookId, title: '家庭书共读记录（原书已删除或暂无阅读位置）', chapter: null, updatedAt: x.startedAt.toISOString(), available: false })),
    ].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    const seen = new Set<string>()
    return { items: items.filter(x => { const key = `${x.source}:${x.bookId ?? x.title}`; if (seen.has(key)) return false; seen.add(key); return true }).slice(0, 30) }
  })
  app.get('/api/reading/archive', { preHandler: auth }, async request => {
    const q = parse(childQuery.extend({ before: z.string().min(1).max(64).optional() }), request.query)
    await ownChild(request, q.childId)
    const cursor = q.before ? await db.highlightStar.findFirst({ where: { id: q.before, childId: q.childId } }) : null
    if (q.before && !cursor) throw new ValidationError('记忆分页位置已失效，请重新加载')
    const rows = await db.highlightStar.findMany({ where: { childId: q.childId, ...(cursor ? { OR: [{ createdAt: { lt: cursor.createdAt } }, { createdAt: cursor.createdAt, id: { lt: cursor.id } }] } : {}) }, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], take: 51 })
    return { highlights: rows.slice(0, 50), next: rows.length > 50 ? rows[49]!.id : null }
  })
  app.get('/api/reading/plan', { preHandler: auth }, async request => {
    const q = parse(childQuery, request.query); await ownChild(request, q.childId)
    return { plan: await db.readingPlan.findUnique({ where: { childId: q.childId } }) }
  })
  app.put('/api/reading/plan', { preHandler: parent }, async request => {
    const b = parse(childQuery.extend({ days: z.array(z.number().int().min(0).max(6)).max(7), note: z.string().trim().max(200) }), request.body)
    await ownChild(request, b.childId)
    if (!b.days.length) { await db.readingPlan.deleteMany({ where: { childId: b.childId } }); return { plan: null } }
    const data = { days: JSON.stringify([...new Set(b.days)].sort()), note: b.note }
    return { plan: await db.readingPlan.upsert({ where: { childId: b.childId }, create: { childId: b.childId, ...data }, update: data }) }
  })
  app.post('/api/content/feedback', { preHandler: auth }, async request => {
    const b = parse(z.object({ bookId: z.string().max(128).optional(), version: z.string().max(128).optional(), chapter: z.number().int().min(1).optional(), position: z.number().int().min(0).optional(), category: z.enum(['text', 'pronunciation', 'translation', 'technical', 'other']), message: z.string().trim().min(3).max(1000) }), request.body)
    if (b.bookId) await assertContentReadable(db, request.auth!.fid, b.bookId, { role: request.auth!.role })
    const duplicate = await db.contentFeedback.findFirst({ where: { familyId: request.auth!.fid, bookId: b.bookId ?? null, chapter: b.chapter ?? null, position: b.position ?? null, category: b.category, version: b.version ?? null, message: b.message, status: 'open' } })
    return { feedback: duplicate ?? await db.contentFeedback.create({ data: { familyId: request.auth!.fid, ...b } }) }
  })
  app.get('/api/content/feedback', { preHandler: parent }, async request => ({ feedback: await db.contentFeedback.findMany({ where: { familyId: request.auth!.fid }, orderBy: { createdAt: 'desc' }, take: 100 }) }))

  // Operator credentials are separate from every family token; disabled unless configured.
  async function editor(request: FastifyRequest) {
    const expected = process.env.TAO_EDITOR_TOKEN ?? ''
    const supplied = request.headers['x-tao-editor-token']
    if (expected.length < 32 || typeof supplied !== 'string' || Buffer.byteLength(supplied) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) throw new ForbiddenError('需要独立的内容运营凭据')
  }
  app.get('/api/editor/queue', { preHandler: editor }, async () => ({ books: await db.book.findMany({ select: { id: true, title: true, publicationStatus: true, reviewStatus: true, reviewEvidence: true, contentVersion: true }, orderBy: { reviewStatus: 'asc' } }), feedback: await db.contentFeedback.findMany({ where: { status: 'open' }, take: 100, orderBy: { createdAt: 'asc' } }) }))
  app.get('/api/editor/csp', { preHandler: editor }, async () => ({ mode: process.env.TAO_CSP_ENFORCE === '1' ? 'enforced' : 'report-only', reports: cspSummary() }))
  app.get('/api/editor/operations', { preHandler: editor }, async () => operationEvidence())
  app.get<{ Params: { id: string } }>('/api/editor/books/:id', { preHandler: editor }, async request => {
    const book = await db.book.findUnique({ where: { id: request.params.id }, include: { chapters: { orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } } } })
    if (!book) throw new AppError('没有找到书目', 'BOOK_NOT_FOUND', 404)
    const rights = await db.rightsLedger.findUnique({ where: { bookId: book.id } })
    const history = await db.bookReviewEvent.findMany({ where: { bookId: book.id }, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], take: 50 })
    const poems = book.chapters.flatMap(ch => ch.blocks.filter(b => b.kind === 'poem').map(b => ({ chapter: ch.order, block: b.order, missingPinyin: book.lang === 'zh' && !b.pinyin, missingTranslation: !b.translation })))
    const revisions = await db.bookTextRevision.findMany({ where: { bookId: book.id }, select: { id: true, fromVersion: true, toVersion: true, reviewer: true, reason: true, createdAt: true }, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], take: 50 })
    return { book, rights, history, revisions, auxiliaryFields: poems }
  })
  app.patch<{ Params: { id: string } }>('/api/editor/books/:id/correction', { preHandler: editor }, async request => {
    const result = await correctBlock(db, request.params.id, parse(correctionSchema, request.body))
    invalidateBookCatalog(); return result
  })
  app.patch<{ Params: { id: string } }>('/api/editor/books/:id/restore-text', { preHandler: editor }, async request => {
    const result = await restoreTextRevision(db, request.params.id, parse(revisionRestoreSchema, request.body))
    invalidateBookCatalog(); return result
  })
  app.patch<{ Params: { id: string } }>('/api/editor/books/:id', { preHandler: editor }, async request => {
    const b = parse(reviewInput, request.body)
    const result = await changeReview(db, request.params.id, b)
    invalidateBookCatalog(); return result
  })
  app.patch<{ Params: { id: string } }>('/api/editor/feedback/:id', { preHandler: editor }, async request => {
    const b = parse(z.object({ status: z.enum(['open', 'triaged', 'resolved', 'duplicate']), resolution: z.string().trim().min(3).max(1000), duplicateOf: z.string().max(64).optional() }), request.body)
    const current = await db.contentFeedback.findUnique({ where: { id: request.params.id } })
    if (!current) throw new AppError('反馈不存在', 'FEEDBACK_NOT_FOUND', 404)
    if (b.status === 'duplicate') {
      const original = b.duplicateOf ? await db.contentFeedback.findUnique({ where: { id: b.duplicateOf } }) : null
      if (!original || original.id === current.id || original.status === 'duplicate' || original.bookId !== current.bookId || original.version !== current.version || original.chapter !== current.chapter || original.position !== current.position || original.category !== current.category) throw new ValidationError('仅能合并同书、同版本、同位置和类别的有效原反馈')
    }
    return { feedback: await db.contentFeedback.update({ where: { id: request.params.id }, data: { ...b, duplicateOf: b.status === 'duplicate' ? b.duplicateOf : null } }) }
  })
  app.patch<{ Params: { id: string } }>('/api/editor/books/:id/rollback', { preHandler: editor }, async request => {
    const b = parse(z.object({ eventId: z.string().min(1).max(64), reviewer: z.string().trim().min(2).max(80) }), request.body)
    const result = await rollbackReview(db, request.params.id, b.eventId, b.reviewer)
    invalidateBookCatalog(); return result
  })
  app.patch<{ Params: { id: string } }>('/api/editor/books/:id/guidance', { preHandler: editor }, async request => {
    const b = parse(guidanceSchema, request.body)
    const book = await db.$transaction(async tx => {
      const current = await tx.book.findUniqueOrThrow({ where: { id: request.params.id } })
      if (current.contentVersion !== b.version) throw new AppError('正文版本已变化，请重新核查', 'CONTENT_STALE', 409)
      const after = await tx.book.update({ where: { id: current.id }, data: { readingGuidance: JSON.stringify(b) } })
      const snapshot = (row: typeof current) => JSON.stringify({ publicationStatus: row.publicationStatus, reviewStatus: row.reviewStatus, reviewEvidence: row.reviewEvidence, readingGuidance: row.readingGuidance })
      await tx.bookReviewEvent.create({ data: { bookId: current.id, version: b.version, reviewer: b.reviewer, action: 'reading-guidance', evidence: JSON.stringify(b), beforeState: snapshot(current), afterState: snapshot(after) } })
      return after
    })
    invalidateBookCatalog(); return { book }
  })
}
