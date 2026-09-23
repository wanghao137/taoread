import { createHash } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import { Prisma, type PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../modules/family/routes'
import { AppError, UnauthorizedError, ValidationError } from '../lib/errors'
import { extractBook } from './extractBook'

const MAX_BYTES = 4 * 1024 * 1024
const MAX_CHAPTERS = 160
const MAX_CHAPTER_CHARS = 100_000
const MAX_PDF_BYTES = 4 * 1024 * 1024
const ALLOWED_ENGLISH_BOOKS = [
  { id: 'gutenberg-11', title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', ebookId: 11 },
] as const

export function parsePlainTextBook(input: string): Array<{ title: string; text: string }> {
  const normalized = input.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim()
  if (!normalized || Buffer.byteLength(normalized, 'utf8') > MAX_BYTES || normalized.includes('\0')) {
    throw new ValidationError('文本为空、包含非法字符或超过 4 MB')
  }
  const lines = normalized.split('\n')
  const chapters: Array<{ title: string; text: string }> = []
  let title = '正文'
  let paragraphs: string[] = []
  const heading = /^(?:第[一二三四五六七八九十百千零〇\d]+[章节回篇]|chapter\s+(?:[ivxlcdm]+|\d+)\b).{0,90}$/i
  const flush = () => {
    const text = paragraphs.join('\n').trim()
    if (text) {
      if (text.length > MAX_CHAPTER_CHARS || chapters.length >= MAX_CHAPTERS) throw new ValidationError('章节过长或超过 160 章')
      chapters.push({ title, text })
    }
    paragraphs = []
  }
  for (const line of lines) {
    const trimmed = line.trim()
    if (heading.test(trimmed)) {
      flush()
      title = trimmed.slice(0, 100)
    } else {
      paragraphs.push(line)
    }
  }
  flush()
  if (chapters.length === 0) throw new ValidationError('没有可阅读的正文')
  return chapters
}

const importSchema = z.object({
  title: z.string().trim().min(1).max(120),
  author: z.string().trim().max(100).optional(),
  lang: z.enum(['zh', 'en']),
  ageStage: z.enum(['3-5', '6-8', '9-12']),
  sourceName: z.string().trim().min(1).max(160).regex(/\.(?:txt|pdf|epub)$/i, '仅支持 TXT、PDF、EPUB'),
  text: z.string().min(1).max(MAX_BYTES).optional(),
  fileBase64: z.string().max(12 * 1024 * 1024).optional(),
  rightsConfirmed: z.literal(true),
})

export function registerImportRoutes(app: FastifyInstance, deps: { db: PrismaClient; tokenSecret: Buffer }): void {
  const { db, tokenSecret } = deps
  const parent = requireAuth(tokenSecret, { roles: ['parent'] })
  const auth = requireAuth(tokenSecret)

  async function childStage(claims: { role: string; fid: string } | undefined, childId: string | undefined): Promise<string | null> {
    if (claims?.role !== 'child') return null
    if (!childId) throw new ValidationError('请选择孩子档案')
    const profile = await db.childProfile.findFirst({ where: { id: childId, familyId: claims.fid }, select: { stage: true } })
    if (!profile) throw new AppError('没有找到孩子档案', 'CHILD_NOT_FOUND', 404)
    return profile.stage
  }

  app.get('/api/content/imports/public-domain', { preHandler: parent }, async () => ({ books: ALLOWED_ENGLISH_BOOKS.map(({ id, title, author }) => ({ id, title, author })) }))

  app.post('/api/content/imports/public-domain/:id', { preHandler: parent, bodyLimit: 2048 }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const id = (request.params as { id: string }).id
    const source = ALLOWED_ENGLISH_BOOKS.find((book) => book.id === id)
    if (!source) throw new AppError('没有找到这本公版书', 'BOOK_NOT_FOUND', 404)
    const input = z.object({ ageStage: z.enum(['6-8', '9-12']) }).safeParse(request.body)
    if (!input.success) throw new ValidationError('请选择年龄段')
    const url = `https://www.gutenberg.org/cache/epub/${source.ebookId}/pg${source.ebookId}.txt`
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    let text: string
    try {
      const response = await fetch(url, { signal: controller.signal, redirect: 'error', headers: { accept: 'text/plain' } })
      if (!response.ok || Number(response.headers.get('content-length') ?? 0) > MAX_BYTES) throw new Error('source unavailable')
      const reader = response.body?.getReader()
      if (!reader) throw new Error('source unavailable')
      const chunks: Uint8Array[] = []
      let size = 0
      while (true) { const next = await reader.read(); if (next.done) break; size += next.value.length; if (size > MAX_BYTES) throw new ValidationError('公版书正文超过大小限制'); chunks.push(next.value) }
      text = new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks))
    } catch (error) { if (error instanceof ValidationError) throw error; throw new AppError('公版书源暂不可用', 'SOURCE_UNAVAILABLE', 502) } finally { clearTimeout(timeout) }
    const trimmed = text.replace(/\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*\*\*/i, '').split(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK/i)[0] ?? text
    const chapters = parsePlainTextBook(trimmed)
    const sha256 = createHash('sha256').update(trimmed).digest('hex')
    const existing = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId: request.auth.fid, sha256 } }, select: { id: true } })
    if (existing) return { id: existing.id, chapterCount: chapters.length, duplicate: true }
    let created: { id: string }
    try {
      created = await db.importedBook.create({ data: { familyId: request.auth.fid, title: source.title, author: source.author, lang: 'en', ageStage: input.data.ageStage, sourceName: url, format: 'txt', sha256, chapters: { create: chapters.map((chapter, index) => ({ order: index + 1, title: chapter.title, text: chapter.text })) } }, select: { id: true } })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') { const duplicate = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId: request.auth.fid, sha256 } }, select: { id: true } }); if (duplicate) return { id: duplicate.id, chapterCount: chapters.length, duplicate: true } }
      throw error
    }
    return reply.code(201).send({ id: created.id, chapterCount: chapters.length, duplicate: false })
  })

  app.post('/api/content/imports', { preHandler: parent, bodyLimit: 12 * 1024 * 1024 }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const parsed = importSchema.safeParse(request.body)
    if (!parsed.success) throw new ValidationError('请填写书名、年龄段、电子书并确认家庭阅读使用权')
    const input = parsed.data
    if (Boolean(input.text) === Boolean(input.fileBase64)) throw new ValidationError('仅允许一种文件内容')
    if (input.text && !/\.txt$/i.test(input.sourceName)) throw new ValidationError('TXT 文件名不匹配')
    if (input.fileBase64 && !/\.(?:pdf|epub)$/i.test(input.sourceName)) throw new ValidationError('电子书文件名不匹配')
    if (input.fileBase64 && input.fileBase64.length > Math.ceil((/\.pdf$/i.test(input.sourceName) ? MAX_PDF_BYTES : 8 * 1024 * 1024) / 3) * 4) throw new ValidationError('文件超过格式限制')
    const binary = input.fileBase64 ? Buffer.from(input.fileBase64, 'base64') : null
    if (binary && binary.toString('base64') !== input.fileBase64) throw new ValidationError('文件编码错误')
    const text = binary ? await extractBook(input.sourceName, binary) : input.text!
    const chapters = parsePlainTextBook(text)
    const sha256 = createHash('sha256').update(binary ?? Buffer.from(text.replace(/\r\n?/g, '\n'))).digest('hex')
    const existing = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId: request.auth.fid, sha256 } }, select: { id: true } })
    if (existing) return reply.send({ id: existing.id, chapterCount: chapters.length, duplicate: true })
    let created: { id: string }
    try {
      created = await db.importedBook.create({
        data: {
          id: `imp:${createHash('sha256').update(`${request.auth.fid}:${sha256}`).digest('hex').slice(0, 28)}`,
          familyId: request.auth.fid,
          title: input.title,
          author: input.author ?? null,
          lang: input.lang,
          ageStage: input.ageStage,
          sourceName: input.sourceName,
          format: input.sourceName.split('.').at(-1)!.toLowerCase(),
          sha256,
          chapters: { create: chapters.map((chapter, index) => ({ order: index + 1, title: chapter.title, text: chapter.text })) },
        },
        select: { id: true },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const duplicate = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId: request.auth.fid, sha256 } }, select: { id: true } })
        if (duplicate) return reply.send({ id: duplicate.id, chapterCount: chapters.length, duplicate: true })
      }
      throw error
    }
    return reply.code(201).send({ id: created.id, chapterCount: chapters.length, duplicate: false })
  })

  app.get('/api/content/imports', { preHandler: auth }, async (request) => {
    const stage = await childStage(request.auth, (request.query as { childId?: string }).childId)
    if (!request.auth) throw new UnauthorizedError()
    const books = await db.importedBook.findMany({
      where: { familyId: request.auth.fid, ...(stage ? { ageStage: stage } : {}) },
      select: { id: true, title: true, author: true, lang: true, ageStage: true, format: true, createdAt: true, chapters: { select: { id: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return { books: books.map(({ chapters, ...book }) => ({ ...book, chapterCount: chapters.length })) }
  })

  app.get<{ Params: { id: string }; Querystring: { childId?: string } }>('/api/content/imports/:id', { preHandler: auth }, async (request) => {
    const stage = await childStage(request.auth, request.query.childId)
    if (!request.auth) throw new UnauthorizedError()
    const book = await db.importedBook.findFirst({ where: { id: request.params.id, familyId: request.auth.fid, ...(stage ? { ageStage: stage } : {}) }, select: { id: true, title: true, author: true, lang: true, ageStage: true, format: true, createdAt: true, chapters: { select: { order: true, title: true }, orderBy: { order: 'asc' } } } })
    if (!book) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    return { book }
  })

  app.get<{ Params: { id: string; order: string }; Querystring: { childId?: string } }>('/api/content/imports/:id/chapters/:order', { preHandler: auth }, async (request) => {
    const stage = await childStage(request.auth, request.query.childId)
    if (!request.auth) throw new UnauthorizedError()
    const order = Number(request.params.order)
    if (!Number.isInteger(order) || order < 1 || order > MAX_CHAPTERS) throw new ValidationError('章节序号不正确')
    const book = await db.importedBook.findFirst({ where: { id: request.params.id, familyId: request.auth.fid, ...(stage ? { ageStage: stage } : {}) }, select: { id: true } })
    if (!book) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    const chapter = await db.importedChapter.findUnique({ where: { bookId_order: { bookId: book.id, order } }, select: { order: true, title: true, text: true } })
    if (!chapter) throw new AppError('没有找到这一章', 'CHAPTER_NOT_FOUND', 404)
    return { chapter }
  })

  app.get<{ Params: { id: string }; Querystring: { childId?: string } }>('/api/content/imports/:id/progress', { preHandler: auth }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const childId = request.query.childId
    if (!childId) throw new ValidationError('请选择孩子档案')
    const child = await db.childProfile.findFirst({ where: { id: childId, familyId: request.auth.fid }, select: { stage: true } })
    const book = await db.importedBook.findFirst({ where: { id: request.params.id, familyId: request.auth.fid, ageStage: child?.stage ?? '' }, select: { id: true } })
    if (!book) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    const progress = await db.importedReadingProgress.findUnique({ where: { childId_bookId: { childId, bookId: book.id } } })
    return { progress: progress ? { order: progress.order, offset: progress.offset, completed: progress.completed, updatedAt: progress.updatedAt } : null }
  })

  app.put<{ Params: { id: string }; Querystring: { childId?: string } }>('/api/content/imports/:id/progress', { preHandler: auth }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const childId = request.query.childId
    if (!childId) throw new ValidationError('请选择孩子档案')
    const child = await db.childProfile.findFirst({ where: { id: childId, familyId: request.auth.fid }, select: { stage: true } })
    const book = await db.importedBook.findFirst({ where: { id: request.params.id, familyId: request.auth.fid, ageStage: child?.stage ?? '' }, select: { id: true } })
    if (!book) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    // B3（交接文档）：baseUpdatedAt=客户端所基于的服务器版本；缺省视为最新（兼容旧客户端）
    const parsed = z.object({
      order: z.number().int().min(1).max(MAX_CHAPTERS),
      offset: z.number().int().min(0).max(MAX_CHAPTER_CHARS),
      completed: z.boolean(),
      baseUpdatedAt: z.string().datetime({ offset: true }).optional(),
    }).safeParse(request.body)
    if (!parsed.success) throw new ValidationError('阅读位置不正确')
    const { order, offset, completed, baseUpdatedAt } = parsed.data
    const chapter = await db.importedChapter.findUnique({ where: { bookId_order: { bookId: book.id, order } }, select: { text: true } })
    if (!chapter || offset > chapter.text.length) throw new ValidationError('阅读位置不正确')
    // 「读完本章」只在末章成立：非末章的 completed=true 直接拒绝，防止伪造完成
    const chapterCount = await db.importedChapter.count({ where: { bookId: book.id } })
    if (completed && order !== chapterCount) throw new ValidationError('只有最后一章才能标记读完')
    const current = await db.importedReadingProgress.findUnique({ where: { childId_bookId: { childId, bookId: book.id } } })
    if (current) {
      const stale = Boolean(baseUpdatedAt && current.updatedAt.getTime() > new Date(baseUpdatedAt).getTime())
      // 完成态不可回退（与正文域 T04 口径一致）：回看不清完成，静默保持 true
      const nextCompleted = current.completed || completed
      // 陈旧写入且光标倒退（换设备乱序）：拒绝并返回服务器最新进度，客户端据此收敛
      const regressed = order < current.order || (order === current.order && offset < current.offset)
      if (baseUpdatedAt && stale && regressed && !completed) {
        return reply.code(409).send({ code: 'PROGRESS_STALE', message: '阅读进度已在其他设备更新', progress: { order: current.order, offset: current.offset, completed: current.completed, updatedAt: current.updatedAt } })
      }
      const progress = await db.importedReadingProgress.update({ where: { childId_bookId: { childId, bookId: book.id } }, data: { order, offset, completed: nextCompleted } })
      return { progress: { order: progress.order, offset: progress.offset, completed: progress.completed, updatedAt: progress.updatedAt } }
    }
    const progress = await db.importedReadingProgress.create({ data: { childId, bookId: book.id, order, offset, completed } })
    return { progress: { order: progress.order, offset: progress.offset, completed: progress.completed, updatedAt: progress.updatedAt } }
  })

  app.delete<{ Params: { id: string } }>('/api/content/imports/:id', { preHandler: parent }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const removed = await db.importedBook.deleteMany({ where: { id: request.params.id, familyId: request.auth.fid } })
    if (!removed.count) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    return reply.code(204).send()
  })
}



