/**
 * 内容域服务：书库列表、章节正文、阅读进度。
 * 内容域 bookId 在共读会话中以 cbf: 前缀引用（weread/routes 与 cosession 已对齐）。
 */
import type { PrismaClient, Book, Block } from '@prisma/client'

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
  blocks: Array<{
    id: string
    order: number
    kind: string
    text: string
    pinyin: string | null
    translation: string | null
    art: string | null
  }>
}

/**
 * 批量取场景→AI 插画 URL 的映射（docs/13 P0-A）。
 * 一次查询覆盖一本书的封面+各章题图，避免 N+1。
 */
async function artUrlMap(db: PrismaClient, scenes: string[]): Promise<Map<string, string>> {
  if (scenes.length === 0) return new Map()
  const rows = await db.artAsset.findMany({
    where: { scene: { in: scenes } },
    select: { scene: true, urlPath: true },
  })
  return new Map(rows.map((r) => [r.scene, r.urlPath]))
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
    orderBy: [{ lang: 'asc' }, { category: 'asc' }, { title: 'asc' }],
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
      const pct = total > 0 ? Math.min(100, Math.round((row.chapterOrder / total) * 100)) : 0
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
    return summarize(b, p.pct, p.finished, false, artMap.get(coverScene(b.id)) ?? null, favIds.has(b.id))
  })
}

export async function getBook(db: PrismaClient, contentId: string): Promise<BookSummaryDto | null> {
  const book = await db.book.findUnique({
    where: { id: contentId },
    include: { chapters: { select: { id: true }, orderBy: { order: 'asc' } } },
  })
  if (!book) return null
  const artMap = await artUrlMap(db, [coverScene(book.id)])
  return summarize(book, 0, false, false, artMap.get(coverScene(book.id)) ?? null, false)
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
    orderBy: [{ lang: 'asc' }, { category: 'asc' }, { title: 'asc' }],
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
        const pct = total > 0 ? Math.min(100, Math.round((r.chapterOrder / total) * 100)) : 0
        return { childId: r.childId, progress: r.finished ? 100 : pct, finished: r.finished }
      })
    return {
      ...summarize(
        b,
        readers.length > 0 ? Math.max(...readers.map((r) => r.progress)) : 0,
        readers.some((r) => r.finished),
        blockedMap.get(b.id) ?? false,
        artMap.get(coverScene(b.id)) ?? null,
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
    artUrl: artMap.get(scene) ?? null,
    blocks: chapter.blocks.map((b: Block) => ({
      id: b.id,
      order: b.order,
      kind: b.kind,
      text: b.text,
      pinyin: b.pinyin,
      translation: b.translation,
      art: b.art,
      artUrl: b.art && b.art !== 'lamp-hint' ? (artMap.get(b.art) ?? null) : null,
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
export async function reportProgress(
  db: PrismaClient,
  childId: string,
  contentId: string,
  chapterOrder: number,
  blockOrder: number,
): Promise<{ chapterOrder: number; finished: boolean }> {
  const book = await db.book.findUnique({
    where: { id: contentId },
    select: { id: true, chapters: { select: { order: true }, orderBy: { order: 'asc' }, take: 1 } },
  })
  if (!book) throw new Error('BOOK_NOT_FOUND')
  const last = await db.chapter.count({ where: { bookId: contentId } })
  const clamped = Math.max(1, Math.min(chapterOrder, Math.max(last, 1)))
  const finished = last > 0 && clamped >= last
  await db.readingProgress.upsert({
    where: { childId_bookId: { childId, bookId: contentId } },
    create: { childId, bookId: contentId, chapterOrder: clamped, blockOrder, finished },
    update: { chapterOrder: clamped, blockOrder, finished },
  })
  return { chapterOrder: clamped, finished }
}

export async function getProgress(
  db: PrismaClient,
  childId: string,
  contentId: string,
): Promise<{ chapterOrder: number; blockOrder: number; finished: boolean } | null> {
  const row = await db.readingProgress.findUnique({
    where: { childId_bookId: { childId, bookId: contentId } },
    select: { chapterOrder: true, blockOrder: true, finished: true },
  })
  return row ?? null
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
