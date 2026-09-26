/**
 * 内容域服务：书库列表、章节正文、阅读进度。
 * 内容域 bookId 在共读会话中以 cbf: 前缀引用（weread/routes 与 cosession 已对齐）。
 */
import type { PrismaClient, Book, Block } from '@prisma/client'
import { AppError } from '../lib/errors'
import { publicMediaUrl } from '../lib/publicMedia'

export const CBF_PREFIX = 'cbf:'

export function isContentBookId(bookId: string | null | undefined): bookId is string {
  return typeof bookId === 'string' && bookId.startsWith(CBF_PREFIX)
}

export function toContentId(bookId: string): string {
  return bookId.slice(CBF_PREFIX.length)
}

export function toCbfBookId(contentId: string): string {
  return CBF_PREFIX + contentId
}

export interface BookSummaryDto {
  id: string
  /** 带 cbf: 前缀的会话引用 id，UI 直接拿去开共读 */
  bookId: string
  title: string
  author: string | null
  lang: string
  category: string
  ageStage: string
  intro: string | null
  coverArt: string
  coverFrom: string | null
  coverTo: string | null
  words: number
  chapterCount: number
  progress: number // 0-100，当前孩子在此书上的百分比
  finished: boolean
  /** 家长是否屏蔽了这本内容域书（docs/09 C9） */
  blocked: boolean
  /** AI 插画 URL（docs/13 P0-A）；无则 null，前端回退 SceneArt SVG */
  coverArtUrl: string | null
  /** 公共书库缩图外链（R2/边缘）；家庭私有或非 webp 为 null */
  coverThumbUrl: string | null
  /** 孩子是否收藏了这本书（docs/15 P1-A） */
  favorite: boolean
}

export interface ChapterDto {
  id: string
  order: number
  title: string
  art: string | null
  /** AI 题图 URL（docs/13 P0-A）；无则 null，前端回退 SceneArt SVG */
  artUrl: string | null
  /** 阅读器档题图（800px）；null 回退 artUrl */
  artReaderUrl: string | null
  blocks: Array<{
    id: string
    order: number
    kind: string
    text: string
    pinyin: string | null
    translation: string | null
    art: string | null
    /** 图片/笔记块解析出的 AI 插画 URL（getChapter 实际返回；占位键 lamp-hint 为 null） */
    artUrl: string | null
  }>
}

/**
 * 批量取场景→AI 插画 URL 的映射（docs/13 P0-A）。
 * 一次查询覆盖一本书的封面+各章题图，避免 N+1。
 * 值携带 isPublic：家庭私有（fam:）素材不发缩图外链（variants 仅对公共书库生成）。
 */
async function artUrlMap(db: PrismaClient, scenes: string[]): Promise<Map<string, { urlPath: string; isPublic: boolean }>> {
  if (scenes.length === 0) return new Map()
  const rows = await db.artAsset.findMany({
    where: { scene: { in: scenes } },
    select: { scene: true, urlPath: true },
  })
  return new Map(rows.map((r) => [r.scene, { urlPath: r.urlPath, isPublic: !r.scene.startsWith('fam:') }]))
}

/** 公共插画的缩图/阅读器档外链；私有或非 webp 一律 null（前端回退原图/SVG） */
function variantUrl(entry: { urlPath: string; isPublic: boolean } | undefined, suffix: 'thumb' | 'reader'): string | null {
  if (!entry || !entry.isPublic || !entry.urlPath.endsWith('.webp')) return null
  return publicMediaUrl(entry.urlPath.slice('/api/media/'.length).replace(/\.webp$/, `.${suffix}.webp`))
}

type ArtMap = Map<string, { urlPath: string; isPublic: boolean }>

/** 封面主图 URL（原档）；未生成 AI 插画时 null，前端回退 SceneArt SVG */
function artUrlFor(artMap: ArtMap, bookId: string): string | null {
  return artMap.get(coverScene(bookId))?.urlPath ?? null
}

/** 场景主图 URL（原档）；lamp-hint 等占位键一律 null */
function artUrlEntry(artMap: ArtMap, scene: string | null | undefined): string | null {
  if (!scene || scene === 'lamp-hint') return null
  return artMap.get(scene)?.urlPath ?? null
}

/** 封面场景键约定（与 artRoutes 生成时一致） */
export function coverScene(bookId: string): string {
  return `cover:${bookId}`
}

/** 章节题图场景键约定：优先用章节自带的 art 键，否则按 book:order 派生 */
export function chapterScene(bookId: string, order: number, art: string | null | undefined): string {
  return art && art.length > 0 ? art : `chapter:${bookId}:${order}`
}

function summarize(
  book: Pick<Book, 'id' | 'title' | 'author' | 'lang' | 'category' | 'ageStage' | 'intro' | 'coverArt' | 'coverFrom' | 'coverTo' | 'words'> & {
    chapters: unknown[]
  },
  progressPct: number,
  finished: boolean,
  blocked: boolean,
  coverArtUrl: string | null,
  coverThumbUrl: string | null,
  favorite: boolean,
): BookSummaryDto {
  return {
    id: book.id,
    bookId: toCbfBookId(book.id),
    title: book.title,
    author: book.author,
    lang: book.lang,
    category: book.category,
    ageStage: book.ageStage,
    intro: book.intro,
    coverArt: book.coverArt,
    coverFrom: book.coverFrom,
    coverTo: book.coverTo,
    words: book.words,
    chapterCount: book.chapters.length,
    progress: progressPct,
    finished,
    blocked,
    coverArtUrl,
    coverThumbUrl,
    favorite,
  }
}

/**
 * 书库列表。stage 为孩子年龄段时做适龄过滤：
 * 3-5 只收 3-5；6-8 收 3-5+6-8；9-12 全收（含 9-12）。
 */
/**
 * 归一化匹配键：大小写折叠 + 去空白。中文不做拼音转换（v3 只做子串匹配，
 * 拼音索引留 P1——需要全量拼音表，且孩子更可能直接念出书名而非打字）。
 */
function matchKey(s: string | null | undefined): string {
  return (s ?? '').toLowerCase().replace(/\s+/g, '')
}

/**
 * 内容可见性策略（审计 T03/F02）：家庭屏蔽的 cbf 书，**一切读取路径**统一拒绝——
 * 详情、目录、正文、进度上报、TTS、生词、共读会话。屏蔽不能只在列表查询生效。
 *
 * @param role 令牌角色：孩子一律拒绝；家长保留管理预览例外（allowParentPreview，
 *             仅限详情/目录/正文元信息，家长需要确认屏蔽对象是否选对）
 * @throws AppError 403 BOOK_BLOCKED
 */
export async function assertContentReadable(
  db: PrismaClient,
  familyId: string,
  contentId: string,
  opts: { role?: 'parent' | 'child'; allowParentPreview?: boolean } = {},
): Promise<void> {
  if (contentId.startsWith('imp:')) {
    const owner = await db.importedBook.findUnique({ where: { id: contentId }, select: { familyId: true } })
    if (!owner || owner.familyId !== familyId) throw new AppError('没有找到这本家庭书', 'BOOK_NOT_FOUND', 404)
    return
  }
  const snap = await db.shelfSnapshot.findUnique({
    where: { familyId_bookId_kind: { familyId, bookId: contentId, kind: 'cbf' } },
    select: { blocked: true },
  })
  if (!snap?.blocked) return
  if (opts.allowParentPreview && opts.role === 'parent') return
  throw new AppError('这本书已经被家长收起来啦', 'BOOK_BLOCKED', 403)
}

export async function listBooks(
  db: PrismaClient,
  options: {
    childId?: string
    familyId?: string
    stage?: string | null
    lang?: string | null
    /**
     * 搜索（docs/11 P0-1）：匹配书名、作者，以及**章节标题**。
     * 孩子脑子里记的是「静夜思」这首诗，而不是它收在哪本集子里——
     * 只搜书名会让孩子搜不到自己真正想读的东西。
     */
    q?: string | null
  } = {},
): Promise<BookSummaryDto[]> {
  const where: { lang?: string } = {}
  if (options.lang) where.lang = options.lang
  const needle = matchKey(options.q)
  const books = await db.book.findMany({
    where,
    // q 非空时需要章节标题参与匹配；否则只取 id 计数，省掉多余字段
    include: {
      chapters: { select: { id: true, ...(needle ? { title: true } : {}) }, orderBy: { order: 'asc' } },
    },
    // 中文排前（'zh'>'en'，desc 即 zh 在前）、同类按标题稳定排序
    orderBy: [{ lang: 'desc' }, { category: 'asc' }, { title: 'asc' }],
  })

  const stageRank: Record<string, number> = { '3-5': 1, '6-8': 2, '9-12': 3 }
  const maxRank = options.stage ? (stageRank[options.stage] ?? 3) : 3
  const filtered = books.filter((b) => {
    if ((stageRank[b.ageStage] ?? 3) > maxRank) return false
    if (needle.length > 0) {
      const inChapters = b.chapters.some((c) => matchKey(c.title).includes(needle))
      return matchKey(b.title).includes(needle) || matchKey(b.author).includes(needle) || inChapters
    }
    return true
  })

  // 进度批量查询（无 childId 时一律 0）
  const progressMap: Map<string, { pct: number; finished: boolean }> = new Map()
  if (options.childId) {
    const rows = await db.readingProgress.findMany({
      where: { childId: options.childId },
      select: { bookId: true, chapterOrder: true, finished: true },
    })
    for (const row of rows) {
      const book = books.find((b) => b.id === row.bookId)
      if (!book) continue
      const total = book.chapters.length
      const pct = total > 0 ? Math.min(99, Math.round((row.chapterOrder / total) * 100)) : 0
      progressMap.set(row.bookId, { pct: row.finished ? 100 : pct, finished: row.finished })
    }
  }

  // 家长屏蔽（docs/09 C9）：屏蔽行存 ShelfSnapshot(kind='cbf')，孩子端书架不展示
  const blockedRows = await db.shelfSnapshot.findMany({
    where: { familyId: options.familyId, kind: 'cbf', blocked: true },
    select: { bookId: true },
  })
  const blockedIds = new Set(blockedRows.map((r) => r.bookId))
  const visible = filtered.filter((b) => !blockedIds.has(b.id))

  const artMap = await artUrlMap(db, visible.map((b) => coverScene(b.id)))
  const favIds = options.childId ? await listFavoriteIds(db, options.childId) : new Set<string>()
  return visible.map((b) => {
    const p = progressMap.get(b.id) ?? { pct: 0, finished: false }
    return summarize(b, p.pct, p.finished, false, artUrlFor(artMap, b.id), variantUrl(artMap.get(coverScene(b.id)), 'thumb'), favIds.has(b.id))
  })
}

/**
 * 书籍概览。familyId 传入时返回真实的屏蔽/收藏状态——家长管理预览被屏蔽书时
 * 需要看到 blocked=true 才能确认屏蔽对象（详情路由走 allowParentPreview 例外放行，
 * 若此处仍硬编码 false，家长会误以为书没被屏蔽）。
 */
export async function getBook(
  db: PrismaClient,
  contentId: string,
  opts: { familyId?: string; childId?: string } = {},
): Promise<BookSummaryDto | null> {
  const book = await db.book.findUnique({
    where: { id: contentId },
    include: { chapters: { select: { id: true }, orderBy: { order: 'asc' } } },
  })
  if (!book) return null
  const artMap = await artUrlMap(db, [coverScene(book.id)])
  const [blocked, favorite] = await Promise.all([
    opts.familyId
      ? db.shelfSnapshot
          .findUnique({
            where: { familyId_bookId_kind: { familyId: opts.familyId, bookId: contentId, kind: 'cbf' } },
            select: { blocked: true },
          })
          .then((r) => r?.blocked ?? false)
      : Promise.resolve(false),
    opts.childId ? listFavoriteIds(db, opts.childId).then((ids) => ids.has(contentId)) : Promise.resolve(false),
  ])
  return summarize(book, 0, false, blocked, artUrlFor(artMap, book.id), variantUrl(artMap.get(coverScene(book.id)), 'thumb'), favorite)
}

/**
 * 家长端内容域视图（docs/09 C4）：全家孩子在公版库上的进度汇总，
 * 附带屏蔽状态。家长看得见孩子在桃书库里读了什么。
 */
export async function listBooksForParent(
  db: PrismaClient,
  familyId: string,
  childrenIds: string[],
): Promise<Array<BookSummaryDto & { readers: Array<{ childId: string; progress: number; finished: boolean }> }>> {
  const books = await db.book.findMany({
    include: { chapters: { select: { id: true }, orderBy: { order: 'asc' } } },
    // 中文排前（'zh'>'en'，desc 即 zh 在前）、同类按标题稳定排序
    orderBy: [{ lang: 'desc' }, { category: 'asc' }, { title: 'asc' }],
  })
  const blockedRows = await db.shelfSnapshot.findMany({
    where: { familyId, kind: 'cbf' },
    select: { bookId: true, blocked: true },
  })
  const blockedMap = new Map(blockedRows.map((r) => [r.bookId, r.blocked]))
  const progressRows = await db.readingProgress.findMany({
    where: { childId: { in: childrenIds } },
    select: { childId: true, bookId: true, chapterOrder: true, finished: true },
  })
  const artMap = await artUrlMap(db, books.map((b) => coverScene(b.id)))
  return books.map((b) => {
    const total = b.chapters.length
    const readers = progressRows
      .filter((r) => r.bookId === b.id)
      .map((r) => {
        const pct = total > 0 ? Math.min(99, Math.round((r.chapterOrder / total) * 100)) : 0
        return { childId: r.childId, progress: r.finished ? 100 : pct, finished: r.finished }
      })
    return {
      ...summarize(
        b,
        readers.length > 0 ? Math.max(...readers.map((r) => r.progress)) : 0,
        readers.some((r) => r.finished),
        blockedMap.get(b.id) ?? false,
        artUrlFor(artMap, b.id),
        variantUrl(artMap.get(coverScene(b.id)), 'thumb'),
        false,
      ),
      readers,
    }
  })
}

/**
 * 章节正文。progress 行决定起点章节：无记录从第 1 章；
 * 有记录且未读完则从记录章起（读到最后一章视为已读完，从头再读也允许）。
 */
export async function getChapter(
  db: PrismaClient,
  contentId: string,
  order: number,
): Promise<ChapterDto | null> {
  const chapter = await db.chapter.findFirst({
    where: { bookId: contentId, order },
    include: { blocks: { orderBy: { order: 'asc' } } },
  })
  if (!chapter) return null
  const scene = chapterScene(contentId, order, chapter.art)
  // 图片块也用 AI 插画：收集所有 image/note 块的场景键批量解析（docs/24 图片严格对齐）
  const blockScenes = chapter.blocks
    .map((b: Block) => b.art)
    .filter((a: string | null): a is string => Boolean(a) && a !== 'lamp-hint')
  const artMap = await artUrlMap(db, [scene, ...new Set(blockScenes)])
  return {
    id: chapter.id,
    order: chapter.order,
    title: chapter.title,
    art: chapter.art,
    artUrl: artUrlEntry(artMap, scene),
    artReaderUrl: variantUrl(artMap.get(scene), 'reader'),
    blocks: chapter.blocks.map((b: Block) => ({
      id: b.id,
      order: b.order,
      kind: b.kind,
      text: b.text,
      pinyin: b.pinyin,
      translation: b.translation,
      art: b.art,
      artUrl: artUrlEntry(artMap, b.art),
    })),
  }
}

export async function listChapterTitles(
  db: PrismaClient,
  contentId: string,
): Promise<Array<{ order: number; title: string; art: string | null }>> {
  const rows = await db.chapter.findMany({
    where: { bookId: contentId },
    orderBy: { order: 'asc' },
    select: { order: true, title: true, art: true },
  })
  return rows
}

/** 进度上报：chapterOrder 越界时钳到末章；末章打 finished=true */
export interface ProgressReportResult {
  chapterOrder: number
  blockOrder: number
  finished: boolean
  /** 写入后（或 stale 时的服务器现有行）的 updatedAt，客户端作为下次上报的版本 */
  updatedAt: string
  /** true=检测到乱序覆盖：请求基于旧版本，服务器保留了更新的进度 */
  stale: boolean
}

/** 进度上报：chapterOrder 越界时钳到末章；末章打 finished=true。
 * R-04（docs/31）：baseUpdatedAt 是客户端读到的行版本——服务器行比它新（>1.5s 容差）
 * 说明有更新的设备已写过，本次旧写拒绝覆盖，返回服务器现状（stale=true）。
 * baseUpdatedAt 缺省 = 旧客户端，退回无条件 upsert（向后兼容）。 */
export async function reportProgress(
  db: PrismaClient,
  childId: string,
  contentId: string,
  chapterOrder: number,
  blockOrder: number,
  completed = false,
  baseUpdatedAt?: string,
): Promise<ProgressReportResult> {
  const book = await db.book.findUnique({
    where: { id: contentId },
    select: { id: true, chapters: { select: { order: true }, orderBy: { order: 'asc' }, take: 1 } },
  })
  if (!book) throw new Error('BOOK_NOT_FOUND')
  const last = await db.chapter.count({ where: { bookId: contentId } })
  const clamped = Math.max(1, Math.min(chapterOrder, Math.max(last, 1)))
  // P0（V8 审计 A3.4）：位置上报 ≠ 完成动作。打开最后一章只表示「读到这里」；
  // finished 仅由客户端在真实完成末章时的显式 completed=true 写入；完成后不因回看前章清除。
  const atLast = last > 0 && clamped >= last
  const finished = atLast && completed
  const existing = await db.readingProgress.findUnique({
    where: { childId_bookId: { childId, bookId: contentId } },
    select: { chapterOrder: true, blockOrder: true, finished: true, updatedAt: true },
  })
  if (existing && baseUpdatedAt) {
    const base = new Date(baseUpdatedAt)
    if (!Number.isNaN(base.getTime()) && existing.updatedAt.getTime() - base.getTime() > 1500) {
      return {
        chapterOrder: existing.chapterOrder,
        blockOrder: existing.blockOrder,
        finished: existing.finished,
        updatedAt: existing.updatedAt.toISOString(),
        stale: true,
      }
    }
  }
  await db.readingProgress.upsert({
    where: { childId_bookId: { childId, bookId: contentId } },
    create: { childId, bookId: contentId, chapterOrder: clamped, blockOrder, finished },
    update: { chapterOrder: clamped, blockOrder, ...(finished ? { finished: true } : {}) },
  })
  const persisted = await db.readingProgress.findUniqueOrThrow({
    where: { childId_bookId: { childId, bookId: contentId } },
    select: { finished: true, updatedAt: true },
  })
  return {
    chapterOrder: clamped,
    blockOrder,
    finished: persisted.finished,
    updatedAt: persisted.updatedAt.toISOString(),
    stale: false,
  }
}

export async function getProgress(
  db: PrismaClient,
  childId: string,
  contentId: string,
): Promise<{ chapterOrder: number; blockOrder: number; finished: boolean; updatedAt: string } | null> {
  const row = await db.readingProgress.findUnique({
    where: { childId_bookId: { childId, bookId: contentId } },
    select: { chapterOrder: true, blockOrder: true, finished: true, updatedAt: true },
  })
  if (!row) return null
  return { ...row, updatedAt: row.updatedAt.toISOString() }
}

// ── 收藏（docs/15 P1-A）──

export async function setFavorite(
  db: PrismaClient,
  childId: string,
  contentId: string,
  favorite: boolean,
): Promise<{ favorite: boolean }> {
  if (favorite) {
    await db.bookFavorite.upsert({
      where: { childId_bookId: { childId, bookId: contentId } },
      create: { childId, bookId: contentId },
      update: {},
    })
  } else {
    await db.bookFavorite
      .deleteMany({ where: { childId, bookId: contentId } })
      .catch(() => {})
  }
  return { favorite }
}

export async function listFavoriteIds(db: PrismaClient, childId: string): Promise<Set<string>> {
  const rows = await db.bookFavorite.findMany({ where: { childId }, select: { bookId: true } })
  return new Set(rows.map((r) => r.bookId))
}

// ── 生词本（docs/15 P1-B）──

export interface WordCardDto {
  id: string
  word: string
  lang: string
  bookId: string | null
  bookTitle: string | null
  context: string | null
  createdAt: string
}

export async function addWord(
  db: PrismaClient,
  childId: string,
  params: { word: string; lang: string; bookId?: string | null; context?: string | null },
): Promise<WordCardDto> {
  const word = params.word.trim()
  if (word.length === 0 || word.length > 64) throw new Error('WORD_INVALID')
  const lang: 'zh' | 'en' = params.lang === 'en' ? 'en' : 'zh'
  const row = await db.wordCard.upsert({
    where: { childId_word: { childId, word } },
    create: {
      childId,
      word,
      lang,
      ...(params.bookId ? { bookId: params.bookId } : {}),
      ...(params.context ? { context: params.context.slice(0, 200) } : {}),
    },
    // 已收录过：不覆盖原出处（第一次遇见的地方最有记忆价值）
    update: {},
    include: { book: { select: { title: true } } },
  })
  return {
    id: row.id,
    word: row.word,
    lang: row.lang,
    bookId: row.bookId,
    bookTitle: row.book?.title ?? null,
    context: row.context,
    createdAt: row.createdAt.toISOString(),
  }
}

export async function listWords(db: PrismaClient, childId: string): Promise<WordCardDto[]> {
  const rows = await db.wordCard.findMany({
    where: { childId },
    orderBy: { createdAt: 'desc' },
    include: { book: { select: { title: true } } },
  })
  return rows.map((row) => ({
    id: row.id,
    word: row.word,
    lang: row.lang,
    bookId: row.bookId,
    bookTitle: row.book?.title ?? null,
    context: row.context,
    createdAt: row.createdAt.toISOString(),
  }))
}

export async function removeWord(db: PrismaClient, childId: string, wordId: string): Promise<void> {
  await db.wordCard.deleteMany({ where: { id: wordId, childId } })
}
