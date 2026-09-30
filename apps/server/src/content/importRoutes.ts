import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { FastifyInstance } from 'fastify'
import { Prisma, type PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../modules/family/routes'
import { AppError, UnauthorizedError, ValidationError } from '../lib/errors'
import { extractBook, extractEpubStructured } from './extractBook'
import { compressImageToWebP } from '../modules/media/compress'
import { mediaUrl } from '../modules/media/access'

const MAX_BYTES = 4 * 1024 * 1024
const MAX_CHAPTERS = 800
const MAX_CHAPTER_CHARS = 100_000
const MAX_PDF_BYTES = 4 * 1024 * 1024
const MAX_EPUB_BYTES = 32 * 1024 * 1024
const MAX_EPUB_B64_CHARS = Math.ceil(MAX_EPUB_BYTES / 3) * 4
// EPUB 解出的纯文本上限（图片不占体积、文本比原文件小，8 MB 足够容纳 32 MB 图文混排书）
const MAX_EXTRACTED_BYTES = 8 * 1024 * 1024
const ALLOWED_ENGLISH_BOOKS = [
  { id: 'gutenberg-11', title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', ebookId: 11 },
] as const

export function parsePlainTextBook(input: string, maxBytes: number = MAX_BYTES): Array<{ title: string; text: string }> {
  const normalized = input.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim()
  if (!normalized || Buffer.byteLength(normalized, 'utf8') > maxBytes || normalized.includes('\0')) {
    throw new ValidationError(`文本为空、包含非法字符或超过 ${Math.round(maxBytes / (1024 * 1024))} MB`)
  }
  const lines = normalized.split('\n')
  const chapters: Array<{ title: string; text: string }> = []
  let title = '正文'
  let paragraphs: string[] = []
  const heading = /^(?:第[一二三四五六七八九十百千零〇\d]+[章节回篇]|chapter\s+(?:[ivxlcdm]+|\d+)\b).{0,90}$/i
  const flush = () => {
    const text = paragraphs.join('\n').trim()
    if (text) {
      if (text.length > MAX_CHAPTER_CHARS || chapters.length >= MAX_CHAPTERS) throw new ValidationError(`章节过长或超过 ${MAX_CHAPTERS} 章`)
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
  fileBase64: z.string().max(MAX_EPUB_B64_CHARS).optional(),
  rightsConfirmed: z.literal(true),
})

// ── 分块导入：家庭上行实测低至 ~13KB/s（1MB 块要 100-112s，120s 超时赌命必挂），
// 切 256KB 块逐块上传（慢链路 ~26s/块），每块独立可重试。会话存内存（生产单进程即完整边界），
// TTL 2 小时（慢链路整本要 30 分钟上下，30min 会话会被中途清掉）。
export const IMPORT_CHUNK_SIZE = 256 * 1024
const CHUNK_SIZE = IMPORT_CHUNK_SIZE
const MAX_CHUNKS = 160
const CHUNK_SESSION_TTL_MS = 2 * 60 * 60 * 1000
interface ImportMeta { title: string; author?: string; lang: 'zh' | 'en'; ageStage: '3-5' | '6-8' | '9-12'; sourceName: string }
interface ChunkSession {
  familyId: string
  meta: ImportMeta
  totalBytes: number
  totalChunks: number
  chunks: Map<number, Buffer>
  createdAt: number
}
const chunkSessions = new Map<string, ChunkSession>()

function sweepChunkSessions(): void {
  const cutoff = Date.now() - CHUNK_SESSION_TTL_MS
  for (const [id, session] of chunkSessions) if (session.createdAt < cutoff) chunkSessions.delete(id)
}

const chunkInitSchema = importSchema.omit({ text: true, fileBase64: true }).extend({
  totalBytes: z.number().int().min(1),
  totalChunks: z.number().int().min(1).max(MAX_CHUNKS),
})

/** 解析并入库（单发与分块 complete 共用）：提取正文→分章→内容哈希去重→创建。duplicate=true 返回既有 id。 */
function deriveBookId(familyId: string, sha256: string): string {
  return `imp:${createHash('sha256').update(`${familyId}:${sha256}`).digest('hex').slice(0, 28)}`
}

// ── 导入书私有媒体（插图/封面/原文）：磁盘 fam-import/<bookId>/ 下，
// 经 /api/media/* 票据访问；R2 同步已排除 fam- 前缀，不会出网。
const IMPORT_MEDIA_DIR = 'fam-import'
const IMPORT_IMAGE_BUDGET_BYTES = 24 * 1024 * 1024
const IMPORT_MAX_IMAGES = 300

function assertChaptersWithinCaps(chapters: Array<{ title: string; text: string }>): void {
  if (chapters.length > MAX_CHAPTERS) throw new ValidationError(`章节超过 ${MAX_CHAPTERS} 章`)
  let total = 0
  for (const chapter of chapters) {
    if (chapter.text.length > MAX_CHAPTER_CHARS) throw new ValidationError(`章节过长或超过 ${MAX_CHAPTERS} 章`)
    total += Buffer.byteLength(chapter.text, 'utf8')
  }
  if (total > MAX_EXTRACTED_BYTES) throw new ValidationError(`提取文本超过 ${Math.round(MAX_EXTRACTED_BYTES / (1024 * 1024))} MB`)
}

function rewriteMarkers(text: string, keyMap: Map<string, string>): string {
  return text.replace(/\[\[img:([^\]]+)\]\]/g, (marker, path: string) => {
    const key = keyMap.get(path)
    return key ? `[[img:${key}]]` : ''
  }).replace(/\n{3,}/g, '\n\n').trim()
}

/** 解析并入库（单发与分块 complete 共用）：提取正文→分章→内容哈希去重→创建。duplicate=true 返回既有 id。 */
async function createImportedBook(
  db: PrismaClient,
  familyId: string,
  meta: ImportMeta,
  content: { binary?: Buffer; text?: string; chapters?: Array<{ title: string; text: string }> },
): Promise<{ id: string; chapterCount: number; duplicate: boolean }> {
  let chapters: Array<{ title: string; text: string }>
  if (content.chapters) {
    assertChaptersWithinCaps(content.chapters)
    chapters = content.chapters
  } else if (content.binary) {
    const text = await extractBook(meta.sourceName, content.binary)
    chapters = parsePlainTextBook(text, MAX_EXTRACTED_BYTES)
  } else {
    chapters = parsePlainTextBook(content.text!)
  }
  const sha256 = createHash('sha256').update(content.binary ?? Buffer.from((content.text ?? '').replace(/\r\n?/g, '\n'))).digest('hex')
  const existing = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId, sha256 } }, select: { id: true } })
  if (existing) return { id: existing.id, chapterCount: chapters.length, duplicate: true }
  try {
    const created = await db.importedBook.create({
      data: {
        id: deriveBookId(familyId, sha256),
        familyId,
        title: meta.title,
        author: meta.author ?? null,
        lang: meta.lang,
        ageStage: meta.ageStage,
        sourceName: meta.sourceName,
        format: meta.sourceName.split('.').at(-1)!.toLowerCase(),
        sha256,
        chapters: { create: chapters.map((chapter, index) => ({ order: index + 1, title: chapter.title, text: chapter.text })) },
      },
      select: { id: true },
    })
    return { id: created.id, chapterCount: chapters.length, duplicate: false }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const duplicate = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId, sha256 } }, select: { id: true } })
      if (duplicate) return { id: duplicate.id, chapterCount: chapters.length, duplicate: true }
    }
    throw error
  }
}


export function registerImportRoutes(app: FastifyInstance, deps: { db: PrismaClient; tokenSecret: Buffer; mediaDir: string }): void {
  const { db, tokenSecret, mediaDir } = deps

function importDiskName(bookId: string): string {
  // bookId 形如 imp:<28 位十六进制>；Windows 路径段带冒号会被当盘符（mkdir ENOENT），
  // 磁盘目录与媒体 URL 一律用纯十六进制部分
  return bookId.startsWith('imp:') ? bookId.slice(4) : bookId.replace(/[^0-9a-f]/gi, '')
}

function importMediaDirFor(bookId: string): string {
  return join(mediaDir, IMPORT_MEDIA_DIR, importDiskName(bookId))
}

  /** 压缩并落盘插图（确定性键 img-NNN.webp），返回 原路径→键 的映射；超预算的图丢弃（标记由 rewrite 清掉）。 */
  async function storeImportImages(bookId: string, images: Map<string, Buffer>): Promise<Map<string, string>> {
    const dir = importMediaDirFor(bookId)
    await mkdir(dir, { recursive: true })
    const keyMap = new Map<string, string>()
    let total = 0
    let index = 0
    for (const [path, buffer] of images) {
      if (index >= IMPORT_MAX_IMAGES) break
      try {
        const webp = await compressImageToWebP(buffer, 800)
        if (total + webp.length > IMPORT_IMAGE_BUDGET_BYTES) break
        const key = `img-${String(index).padStart(3, '0')}.webp`
        await writeFile(join(dir, key), webp)
        total += webp.length
        keyMap.set(path, key)
        index += 1
      } catch { /* 单图压缩失败只丢这张图 */ }
    }
    return keyMap
  }

  /** 封面与原文归档：封面压缩 480w；原文保留支撑「重新解析」（管线升级后可无损重建章节数据）。 */
  async function archiveImportBook(bookId: string, cover: Buffer | null, source: Buffer, sourceName: string): Promise<void> {
    const dir = importMediaDirFor(bookId)
    await mkdir(dir, { recursive: true })
    if (cover) {
      try { await writeFile(join(dir, 'cover.webp'), await compressImageToWebP(cover, 480)) } catch { /* 封面失败不阻断 */ }
    }
    const ext = sourceName.split('.').at(-1)?.toLowerCase() ?? 'epub'
    try { await writeFile(join(dir, `source.${ext}`), source) } catch { /* 归档失败不阻断入库 */ }
  }

  async function coverUrlFor(bookId: string, claims: { fid: string; sid: string }): Promise<string | null> {
    try {
      await stat(join(importMediaDirFor(bookId), 'cover.webp'))
      return mediaUrl(`/api/media/${IMPORT_MEDIA_DIR}/${importDiskName(bookId)}/cover.webp`, claims, tokenSecret)
    } catch {
      return null
    }
  }

  /** 二进制导入统一出口：EPUB 走结构化提取（章题/分段/插图），PDF 走纯文本管线。 */
  async function finalizeBinaryImport(familyId: string, meta: ImportMeta, binary: Buffer): Promise<{ id: string; chapterCount: number; duplicate: boolean }> {
    if (/\.epub$/i.test(meta.sourceName)) {
      const structured = await extractEpubStructured(meta.sourceName, binary)
      // 容量校验前置：被拒导入不能留下几十 MB 的孤儿媒体目录（P2-1）
      assertChaptersWithinCaps(structured.chapters)
      const bookId = deriveBookId(familyId, createHash('sha256').update(binary).digest('hex'))
      const keyMap = await storeImportImages(bookId, structured.images)
      const chapters = structured.chapters.map((chapter) => ({ title: chapter.title, text: rewriteMarkers(chapter.text, keyMap) }))
      await archiveImportBook(bookId, structured.cover, binary, meta.sourceName)
      return createImportedBook(db, familyId, meta, { chapters, binary })
    }
    return createImportedBook(db, familyId, meta, { binary })
  }
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
      created = await db.importedBook.create({
        data: {
          // 与手工导入同构（imp: 前缀 + 家庭+内容哈希派生）：assertContentReadable、
          // 生词本、共读等消费方只认 imp: 前缀的导入书 id；裸 cuid 属历史数据，
          // 读取路径均按 id 全值匹配，无需迁移
          id: `imp:${createHash('sha256').update(`${request.auth.fid}:${sha256}`).digest('hex').slice(0, 28)}`,
          familyId: request.auth.fid,
          title: source.title,
          author: source.author,
          lang: 'en',
          ageStage: input.data.ageStage,
          sourceName: url,
          format: 'txt',
          sha256,
          chapters: { create: chapters.map((chapter, index) => ({ order: index + 1, title: chapter.title, text: chapter.text })) },
        },
        select: { id: true },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') { const duplicate = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId: request.auth.fid, sha256 } }, select: { id: true } }); if (duplicate) return { id: duplicate.id, chapterCount: chapters.length, duplicate: true } }
      throw error
    }
    return reply.code(201).send({ id: created.id, chapterCount: chapters.length, duplicate: false })
  })

  app.post('/api/content/imports', { preHandler: parent, bodyLimit: MAX_EPUB_B64_CHARS + 1024 * 1024 }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const parsed = importSchema.safeParse(request.body)
    if (!parsed.success) throw new ValidationError('请填写书名、年龄段、电子书并确认家庭阅读使用权')
    const input = parsed.data
    if (Boolean(input.text) === Boolean(input.fileBase64)) throw new ValidationError('仅允许一种文件内容')
    if (input.text && !/\.txt$/i.test(input.sourceName)) throw new ValidationError('TXT 文件名不匹配')
    if (input.fileBase64 && !/\.(?:pdf|epub)$/i.test(input.sourceName)) throw new ValidationError('电子书文件名不匹配')
    if (input.fileBase64 && input.fileBase64.length > Math.ceil((/\.pdf$/i.test(input.sourceName) ? MAX_PDF_BYTES : MAX_EPUB_BYTES) / 3) * 4) throw new ValidationError(input.sourceName.toLowerCase().endsWith('.pdf') ? 'PDF 超过 4 MB' : 'EPUB 超过 32 MB')
    const binary = input.fileBase64 ? Buffer.from(input.fileBase64, 'base64') : null
    if (binary && binary.toString('base64') !== input.fileBase64) throw new ValidationError('文件编码错误')
    const result = binary
      ? await finalizeBinaryImport(request.auth.fid, input, binary)
      : await createImportedBook(db, request.auth.fid, input, { text: input.text! })
    return reply.code(result.duplicate ? 200 : 201).send(result)
  })

  // ── 分块导入（大文件防断流）：init 建会话 → 逐块上传（可乱序/可重传）→ complete 拼装入库 ──
  app.post('/api/content/imports/chunks/init', { preHandler: parent, bodyLimit: 4096 }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    sweepChunkSessions()
    const parsed = chunkInitSchema.safeParse(request.body)
    if (!parsed.success) throw new ValidationError('请填写书名、年龄段并确认家庭阅读使用权')
    const meta = parsed.data
    const isPdf = /\.pdf$/i.test(meta.sourceName)
    if (meta.totalBytes > (isPdf ? MAX_PDF_BYTES : MAX_EPUB_BYTES)) throw new ValidationError(isPdf ? 'PDF 超过 4 MB' : 'EPUB 超过 32 MB')
    if (meta.totalChunks !== Math.ceil(meta.totalBytes / CHUNK_SIZE)) throw new ValidationError('分块参数不正确')
    // 每家庭最多 2 个进行中会话，超出腾最旧
    const mine: Array<{ id: string; createdAt: number }> = []
    for (const [id, session] of chunkSessions) if (session.familyId === request.auth.fid) mine.push({ id, createdAt: session.createdAt })
    if (mine.length >= 2) {
      mine.sort((a, b) => a.createdAt - b.createdAt)
      chunkSessions.delete(mine[0]!.id)
    }
    const sessionId = randomUUID()
    chunkSessions.set(sessionId, {
      familyId: request.auth.fid,
      meta: { title: meta.title, author: meta.author, lang: meta.lang, ageStage: meta.ageStage, sourceName: meta.sourceName },
      totalBytes: meta.totalBytes,
      totalChunks: meta.totalChunks,
      chunks: new Map(),
      createdAt: Date.now(),
    })
    return reply.code(201).send({ sessionId, chunkSize: CHUNK_SIZE })
  })

  app.post<{ Params: { sessionId: string; index: string } }>('/api/content/imports/chunks/:sessionId/:index', { preHandler: parent, bodyLimit: 4 * 1024 * 1024 }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const session = chunkSessions.get(request.params.sessionId)
    if (!session || session.familyId !== request.auth.fid) throw new AppError('导入会话不存在或已过期，请重新开始上传', 'IMPORT_SESSION_NOT_FOUND', 404)
    const index = Number(request.params.index)
    if (!Number.isInteger(index) || index < 0 || index >= session.totalChunks) throw new ValidationError('分块序号不正确')
    const parsed = z.object({ data: z.string().min(1) }).safeParse(request.body ?? {})
    if (!parsed.success) throw new ValidationError('分块内容不正确')
    const chunk = Buffer.from(parsed.data.data, 'base64')
    if (chunk.length === 0 || chunk.length > CHUNK_SIZE || chunk.toString('base64') !== parsed.data.data) throw new ValidationError('分块内容不正确')
    session.chunks.set(index, chunk)
    return { received: session.chunks.size }
  })

  app.post<{ Params: { sessionId: string } }>('/api/content/imports/chunks/:sessionId/complete', { preHandler: parent, bodyLimit: 4096 }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const session = chunkSessions.get(request.params.sessionId)
    if (!session || session.familyId !== request.auth.fid) throw new AppError('导入会话不存在或已过期，请重新开始上传', 'IMPORT_SESSION_NOT_FOUND', 404)
    if (session.chunks.size !== session.totalChunks) throw new ValidationError(`还有 ${session.totalChunks - session.chunks.size} 块没有上传`)
    const binary = Buffer.concat(Array.from({ length: session.totalChunks }, (_, index) => session.chunks.get(index)!))
    if (binary.length !== session.totalBytes) throw new ValidationError('文件大小与声明不一致')
    const result = await finalizeBinaryImport(session.familyId, session.meta, binary)
    chunkSessions.delete(request.params.sessionId)
    return reply.code(result.duplicate ? 200 : 201).send(result)
  })

  app.get('/api/content/imports', { preHandler: auth }, async (request) => {
    const stage = await childStage(request.auth, (request.query as { childId?: string }).childId)
    if (!request.auth) throw new UnauthorizedError()
    const books = await db.importedBook.findMany({
      where: { familyId: request.auth.fid, ...(stage ? { ageStage: stage } : {}) },
      select: { id: true, title: true, author: true, lang: true, ageStage: true, format: true, createdAt: true, chapters: { select: { id: true } } },
      orderBy: { createdAt: 'desc' },
    })
    const claims = request.auth
    return { books: await Promise.all(books.map(async ({ chapters, ...book }) => ({ ...book, chapterCount: chapters.length, coverUrl: await coverUrlFor(book.id, claims) }))) }
  })

  // 重新解析（P0-5）：用归档的原始 EPUB 以当前管线重建章节与插图。管线升级后旧导入可无损跟进。
  app.post<{ Params: { id: string } }>('/api/content/imports/:id/refresh', { preHandler: parent, bodyLimit: 1024 }, async (request) => {
    if (!request.auth) throw new UnauthorizedError()
    const book = await db.importedBook.findFirst({ where: { id: request.params.id, familyId: request.auth.fid }, select: { id: true, format: true, sourceName: true } })
    if (!book) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    if (!/^epub$/i.test(book.format)) throw new ValidationError('只有 EPUB 支持重新解析')
    const source = await readFile(join(importMediaDirFor(book.id), 'source.epub')).catch(() => null)
    if (!source) throw new ValidationError('找不到原始文件，请删除后重新导入')
    const structured = await extractEpubStructured(book.sourceName, source)
    const keyMap = await storeImportImages(book.id, structured.images)
    // 覆写后不再被引用的旧插图清掉（img-NNN 键确定性强，可直接比对）
    const keep = new Set(keyMap.values())
    for (const file of await readdir(importMediaDirFor(book.id)).catch(() => [])) {
      if (/^img-\d+\.webp$/.test(file) && !keep.has(file)) await rm(join(importMediaDirFor(book.id), file), { force: true }).catch(() => {})
    }
    const chapters = structured.chapters.map((chapter) => ({ title: chapter.title, text: rewriteMarkers(chapter.text, keyMap) }))
    assertChaptersWithinCaps(chapters)
    await db.$transaction([
      db.importedChapter.deleteMany({ where: { bookId: book.id } }),
      db.importedChapter.createMany({ data: chapters.map((chapter, index) => ({ bookId: book.id, order: index + 1, title: chapter.title, text: chapter.text })) }),
    ])
    return { chapterCount: chapters.length }
  })

  app.get<{ Params: { id: string }; Querystring: { childId?: string } }>('/api/content/imports/:id', { preHandler: auth }, async (request) => {
    const stage = await childStage(request.auth, request.query.childId)
    if (!request.auth) throw new UnauthorizedError()
    const book = await db.importedBook.findFirst({ where: { id: request.params.id, familyId: request.auth.fid, ...(stage ? { ageStage: stage } : {}) }, select: { id: true, title: true, author: true, lang: true, ageStage: true, format: true, createdAt: true, chapters: { select: { order: true, title: true }, orderBy: { order: 'asc' } } } })
    if (!book) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    const claims = request.auth
    return { book: { ...book, coverUrl: await coverUrlFor(book.id, claims) } }
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
    // 插图标记 → 短时票据 URL（<img> 带不了 Authorization 头；票据绑定家庭+会话，30-60 分钟分桶）
    const images: Record<string, string> = {}
    for (const match of chapter.text.matchAll(/\[\[img:([^\]]+)\]\]/g)) {
      const key = match[1]!
      if (!images[key]) images[key] = mediaUrl(`/api/media/${IMPORT_MEDIA_DIR}/${importDiskName(book.id)}/${key}`, request.auth, tokenSecret)
    }
    return { chapter, images }
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

    // 对抗审查 P2-5/P2-6：读-判-写在事务内重读当前值，消除并发窗口；
    // 双设备并发首写由唯一键冲突兜底（P2002 → 重读返回既有进度）
    const outcome = await db.$transaction(async (tx) => {
      const current = await tx.importedReadingProgress.findUnique({ where: { childId_bookId: { childId, bookId: book.id } } })
      if (current) {
        const stale = Boolean(baseUpdatedAt && current.updatedAt.getTime() > new Date(baseUpdatedAt).getTime())
        // 完成态不可回退（与正文域 T04 口径一致）：回看不清完成，静默保持 true
        const nextCompleted = current.completed || completed
        // 陈旧写入且光标倒退（换设备乱序）：拒绝并返回服务器最新进度，客户端据此收敛
        const regressed = order < current.order || (order === current.order && offset < current.offset)
        if (baseUpdatedAt && stale && regressed && !completed) {
          return { conflict: true as const, progress: current }
        }
        const progress = await tx.importedReadingProgress.update({ where: { childId_bookId: { childId, bookId: book.id } }, data: { order, offset, completed: nextCompleted } })
        return { conflict: false as const, progress }
      }
      try {
        return { conflict: false as const, progress: await tx.importedReadingProgress.create({ data: { childId, bookId: book.id, order, offset, completed } }) }
      } catch (err) {
        // 并发首写撞唯一键：返回既有进度（以库内为准）
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          const existing = await tx.importedReadingProgress.findUnique({ where: { childId_bookId: { childId, bookId: book.id } } })
          if (existing) return { conflict: false as const, progress: existing }
        }
        throw err
      }
    })
    if (outcome.conflict) {
      return reply.code(409).send({ code: 'PROGRESS_STALE', message: '阅读进度已在其他设备更新', progress: outcome.progress })
    }
    const progress = outcome.progress
    return { progress: { order: progress.order, offset: progress.offset, completed: progress.completed, updatedAt: progress.updatedAt } }
  })

  app.delete<{ Params: { id: string } }>('/api/content/imports/:id', { preHandler: parent }, async (request, reply) => {
    if (!request.auth) throw new UnauthorizedError()
    const removed = await db.importedBook.deleteMany({ where: { id: request.params.id, familyId: request.auth.fid } })
    if (!removed.count) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    // 私有媒体（插图/封面/原文，最多 ~56MB/本）随书销毁，防磁盘无界泄漏
    await rm(importMediaDirFor(request.params.id), { recursive: true, force: true }).catch(() => {})
    return reply.code(204).send()
  })
}



