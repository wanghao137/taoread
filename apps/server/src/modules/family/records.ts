import type { PrismaClient } from '@prisma/client'
import { createHash, randomUUID } from 'node:crypto'
import { z } from 'zod'
import { AppError, ValidationError } from '../../lib/errors'

const ref = z.string().min(1).max(128)
const date = z.string().datetime()
const count = z.number().int().min(0).max(1000000)
const nullableText = z.string().max(1000).nullable()
const child = z.object({ ref, nickname: z.string().min(1).max(20), stage: z.enum(['3-5', '6-8', '9-12']), createdAt: date })
const owned = z.object({ childRef: ref })
const located = owned.extend({ bookId: ref, chapterOrder: count, blockOrder: count })
const scope = 'family-reading-records-and-imported-text'
export const recordsSchema = z.object({
  app: z.literal('taoread'), schemaVersion: z.literal(2), scope: z.literal(scope), exportedAt: date,
  exclusions: z.array(z.string().max(300)).max(20),
  children: z.array(child).max(20),
  imports: z.array(z.object({ ref, title: z.string().max(300), author: nullableText, lang: z.enum(['zh', 'en']), ageStage: z.enum(['3-5', '6-8', '9-12']), contentVersion: z.number().int().positive(), mediaOmitted: z.boolean().default(false), sha256: z.string().regex(/^[a-f0-9]{64}$/), createdAt: date, chapters: z.array(z.object({ order: z.number().int().positive(), title: z.string().max(300), text: z.string().max(100000) })).min(1).max(2000) })).max(200),
  cosessions: z.array(owned.extend({ ref, bookId: ref.nullable(), paperTitle: nullableText, startedAt: date, endedAt: date.nullable(), durationSec: count.nullable(), progressMark: nullableText, completionVerified: z.boolean().nullable(), mood: nullableText, createdAt: date })).max(100000),
  highlights: z.array(owned.extend({ cosessionRef: ref.nullable(), source: z.string().max(40), text: z.string().max(10000), markCount: count.nullable(), createdAt: date })).max(100000),
  achievements: z.array(owned.extend({ kind: z.string().max(40), value: count, unlockedAt: date })).max(100000),
  progress: z.array(located.extend({ finished: z.boolean(), contentVersion: ref.nullable(), updatedAt: date })).max(100000),
  favorites: z.array(owned.extend({ bookId: ref, createdAt: date })).max(100000),
  quotes: z.array(located.extend({ text: z.string().max(10000), createdAt: date })).max(100000),
  words: z.array(owned.extend({ bookId: ref.nullable(), word: z.string().min(1).max(200), lang: z.enum(['zh', 'en']), context: z.string().max(10000).nullable(), sourceBookId: ref.nullable(), chapterOrder: count.nullable(), blockOrder: count.nullable(), createdAt: date })).max(100000),
  importedProgress: z.array(owned.extend({ bookId: ref, order: count, offset: count, completed: z.boolean(), relocationRequired: z.boolean(), contentVersion: z.number().int().positive(), updatedAt: date })).max(100000),
  bookmarks: z.array(owned.extend({ bookId: ref, source: z.enum(['public', 'import']), version: ref, chapter: count, position: count, anchor: z.string().max(240), deleted: z.boolean(), updatedAt: date })).max(100000),
  plans: z.array(owned.extend({ days: z.string().max(30), note: z.string().max(200), updatedAt: date })).max(20),
})
type Records = z.infer<typeof recordsSchema>

export async function exportRecords(db: PrismaClient, familyId: string): Promise<Records> {
  // A consistent database snapshot; explicit fields exclude credentials and device identifiers.
  return db.$transaction(async tx => {
    const children = await tx.childProfile.findMany({ where: { familyId }, orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] })
    const childIds = children.map(c => c.id)
    const childRefs = new Map(children.map((c, i) => [c.id, `child-${i + 1}`]))
    const byChild = { childId: { in: childIds } }
    const [imports, sessions, highlights, achievements, progress, favorites, quotes, words, importedProgress, bookmarks, plans] = await Promise.all([
      tx.importedBook.findMany({ where: { familyId }, include: { chapters: { orderBy: { order: 'asc' } } } }),
      tx.cosession.findMany({ where: { familyId } }), tx.highlightStar.findMany({ where: { familyId } }),
      tx.achievement.findMany({ where: { familyId } }), tx.readingProgress.findMany({ where: byChild }),
      tx.bookFavorite.findMany({ where: byChild }), tx.bookHighlight.findMany({ where: byChild }),
      tx.wordCard.findMany({ where: byChild }), tx.importedReadingProgress.findMany({ where: byChild }),
      tx.readingBookmark.findMany({ where: byChild }), tx.readingPlan.findMany({ where: byChild }),
    ])
    const result = {
      app: 'taoread', schemaVersion: 2, scope, exportedAt: new Date().toISOString(),
      exclusions: ['登录凭据、家庭码、设备会话与微信读书密钥', '原始上传文件、插图、音视频、历史正文版本与本机未同步数据', '微信读书书架缓存、运营反馈、草稿拼读练习和服务日志；公共书正文由目标服务器提供'],
      children: children.map(c => ({ ref: childRefs.get(c.id)!, nickname: c.nickname, stage: c.stage, createdAt: c.createdAt.toISOString() })),
      imports: imports.map(b => ({ ref: b.id, title: b.title, author: b.author, lang: b.lang, ageStage: b.ageStage, contentVersion: b.contentVersion, mediaOmitted: b.chapters.some(c => /\[\[img:/.test(c.text)), sha256: b.sha256, createdAt: b.createdAt.toISOString(), chapters: b.chapters.map(c => ({ order: c.order, title: c.title, text: c.text.replace(/\[\[img:[^\]]+\]\]/g, '[原书插图未包含在记录导出中]') })) })),
      cosessions: sessions.map(s => ({ ref: s.id, childRef: childRefs.get(s.childId)!, bookId: s.bookId, paperTitle: s.paperTitle, startedAt: s.startedAt.toISOString(), endedAt: s.endedAt?.toISOString() ?? null, durationSec: s.durationSec, progressMark: s.progressMark, completionVerified: s.completionVerified, mood: s.mood, createdAt: s.createdAt.toISOString() })),
      highlights: highlights.map(h => ({ childRef: childRefs.get(h.childId)!, cosessionRef: h.cosessionId, text: h.text, source: h.source, markCount: h.markCount, createdAt: h.createdAt.toISOString() })),
      achievements: achievements.map(a => ({ childRef: childRefs.get(a.childId)!, kind: a.kind, value: a.value, unlockedAt: a.unlockedAt.toISOString() })),
      progress: progress.map(p => ({ childRef: childRefs.get(p.childId)!, bookId: p.bookId, chapterOrder: p.chapterOrder, blockOrder: p.blockOrder, finished: p.finished, contentVersion: p.contentVersion, updatedAt: p.updatedAt.toISOString() })),
      favorites: favorites.map(f => ({ childRef: childRefs.get(f.childId)!, bookId: f.bookId, createdAt: f.createdAt.toISOString() })),
      quotes: quotes.map(h => ({ childRef: childRefs.get(h.childId)!, bookId: h.bookId, chapterOrder: h.chapterOrder, blockOrder: h.blockOrder, text: h.text, createdAt: h.createdAt.toISOString() })),
      words: words.map(w => ({ childRef: childRefs.get(w.childId)!, bookId: w.bookId, word: w.word, lang: w.lang, context: w.context, sourceBookId: w.sourceBookId, chapterOrder: w.chapterOrder, blockOrder: w.blockOrder, createdAt: w.createdAt.toISOString() })),
      importedProgress: importedProgress.map(p => ({ childRef: childRefs.get(p.childId)!, bookId: p.bookId, order: p.order, offset: p.offset, completed: p.completed, relocationRequired: p.relocationRequired, contentVersion: p.contentVersion, updatedAt: p.updatedAt.toISOString() })),
      bookmarks: bookmarks.map(b => ({ childRef: childRefs.get(b.childId)!, bookId: b.bookId, source: b.source, version: b.version, chapter: b.chapter, position: b.position, anchor: b.anchor, deleted: b.deleted, updatedAt: b.updatedAt.toISOString() })),
      plans: plans.map(p => ({ childRef: childRefs.get(p.childId)!, days: p.days, note: p.note, updatedAt: p.updatedAt.toISOString() })),
    }
    return recordsSchema.parse(result)
  })
}

export async function restoreRecords(db: PrismaClient, familyId: string, input: unknown, preview: boolean) {
  const parsed = recordsSchema.safeParse(input)
  if (!parsed.success) throw new ValidationError('仅支持结构完整的版本 2 阅读记录导出，旧版或损坏文件不能恢复')
  const data = parsed.data
  const childRefs = new Set(data.children.map(c => c.ref))
  const imports = new Set(data.imports.map(b => b.ref))
  if (childRefs.size !== data.children.length || imports.size !== data.imports.length) throw new ValidationError('导出标识重复')
  for (const rows of [data.cosessions, data.highlights, data.achievements, data.progress, data.favorites, data.quotes, data.words, data.importedProgress, data.bookmarks, data.plans]) for (const row of rows) if (!childRefs.has(row.childRef)) throw new ValidationError('记录对应的孩子档案缺失')
  function unique<T>(rows: T[], key: (row: T) => string) {
    if (new Set(rows.map(key)).size !== rows.length) throw new ValidationError('导出包含重复记录，未恢复任何数据')
  }
  unique(data.cosessions, r => r.ref)
  unique(data.progress, r => `${r.childRef}:${r.bookId}`)
  unique(data.favorites, r => `${r.childRef}:${r.bookId}`)
  unique(data.importedProgress, r => `${r.childRef}:${r.bookId}`)
  unique(data.words, r => `${r.childRef}:${r.word}`)
  unique(data.achievements, r => `${r.childRef}:${r.kind}:${r.value}`)
  unique(data.plans, r => r.childRef)
  const sessionOwners = new Map(data.cosessions.map(s => [s.ref, s.childRef]))
  for (const h of data.highlights) if (h.cosessionRef && sessionOwners.get(h.cosessionRef) !== h.childRef) throw new ValidationError('金句对应的共读记录缺失或属于另一位孩子')
  for (const b of data.imports) {
    if (b.chapters.some((c, i) => c.order !== i + 1 || !c.text.trim())) throw new ValidationError('家庭书章节序号或正文不完整')
  }
  for (const p of data.importedProgress) {
    const book = data.imports.find(b => b.ref === p.bookId)
    if (!book || p.contentVersion !== book.contentVersion || (!p.relocationRequired && !book.chapters.some(c => c.order === p.order))) throw new ValidationError('家庭书进度版本或章节不一致')
  }
  for (const p of data.plans) {
    let days: unknown
    try { days = JSON.parse(p.days) } catch { throw new ValidationError('共读安排格式错误') }
    if (!Array.isArray(days) || days.length > 7 || days.some(d => !Number.isInteger(d) || d < 0 || d > 6) || new Set(days).size !== days.length) throw new ValidationError('共读安排格式错误')
  }
  const publicBookmarks = data.bookmarks.filter(b => b.source === 'public')
  for (const b of data.bookmarks) if ((b.source === 'import' && !imports.has(b.bookId)) || (b.source === 'public' && (imports.has(b.bookId) || b.bookId.startsWith('imp:')))) throw new ValidationError('书签对应的书目或来源不一致')
  for (const w of data.words) if (w.sourceBookId?.startsWith('imp:') && !imports.has(w.sourceBookId)) throw new ValidationError('生词对应的家庭书缺失')
  for (const s of data.cosessions) if (s.bookId?.startsWith('imp:') && !imports.has(s.bookId)) throw new ValidationError('共读对应的家庭书缺失')
  const publicIds = [...new Set([
    ...[...data.progress, ...data.favorites, ...data.quotes, ...data.words, ...publicBookmarks].map(r => r.bookId),
    ...data.words.map(w => w.sourceBookId && !imports.has(w.sourceBookId) ? w.sourceBookId : null),
    ...data.cosessions.map(s => s.bookId?.startsWith('cbf:') ? s.bookId.slice(4) : null),
  ].filter((id): id is string => id !== null))]
  const books = await db.book.findMany({ where: { id: { in: publicIds } }, select: { id: true, contentVersion: true } })
  if (books.length !== publicIds.length) throw new ValidationError('目标服务器缺少所引用的公共书，未恢复任何数据')
  for (const p of data.importedProgress) if (!imports.has(p.bookId)) throw new ValidationError('家庭书正文缺失')
  const summary = { children: data.children.map(c => ({ ref: c.ref, nickname: c.nickname })), imports: data.imports.length, records: data.cosessions.length + data.highlights.length + data.progress.length + data.importedProgress.length + data.quotes.length + data.words.length + data.bookmarks.length, exclusions: data.exclusions }
  return db.$transaction(async tx => {
    if (await tx.childProfile.count({ where: { familyId } }) || await tx.importedBook.count({ where: { familyId } })) throw new AppError('只允许恢复到空家庭；现有家庭不会覆盖或合并', 'RESTORE_TARGET_NOT_EMPTY', 409)
    if (preview) return { preview: true, summary }
    const children = new Map<string, string>()
    const imported = new Map<string, string>()
    const sessions = new Map<string, string>()
    for (const c of data.children) children.set(c.ref, (await tx.childProfile.create({ data: { familyId, nickname: c.nickname, stage: c.stage, createdAt: new Date(c.createdAt) } })).id)
    for (const b of data.imports) {
      const id = `imp:${randomUUID()}`
      const { ref: _ref, chapters, mediaOmitted, ...meta } = b
      // The restored text differs when image placeholders were removed. Use its own hash.
      await tx.importedBook.create({ data: { ...meta, contentVersion: b.contentVersion + (mediaOmitted ? 1 : 0), id, familyId, createdAt: new Date(b.createdAt), sourceName: 'restored-records.txt', format: 'txt', sha256: createHash('sha256').update(JSON.stringify(chapters)).digest('hex'), chapters: { create: chapters } } })
      imported.set(b.ref, id)
    }
    const mapBook = (id: string | null) => id ? imported.get(id) ?? id : null
    for (const s of data.cosessions) {
      const { ref: _ref, childRef, ...row } = s
      sessions.set(s.ref, (await tx.cosession.create({ data: { ...row, familyId, childId: children.get(childRef)!, bookId: mapBook(s.bookId), startedAt: new Date(s.startedAt), endedAt: s.endedAt ? new Date(s.endedAt) : null, createdAt: new Date(s.createdAt) } })).id)
    }
    for (const h of data.highlights) { const { childRef, cosessionRef, ...row } = h; await tx.highlightStar.create({ data: { ...row, familyId, childId: children.get(childRef)!, cosessionId: cosessionRef ? sessions.get(cosessionRef) ?? null : null, createdAt: new Date(h.createdAt) } }) }
    for (const a of data.achievements) { const { childRef, ...row } = a; await tx.achievement.create({ data: { ...row, familyId, childId: children.get(childRef)!, unlockedAt: new Date(a.unlockedAt) } }) }
    const versions = new Map(books.map(b => [b.id, b.contentVersion]))
    for (const p of data.progress) { const { childRef, ...row } = p; const same = p.contentVersion === versions.get(p.bookId); await tx.readingProgress.create({ data: { ...row, childId: children.get(childRef)!, ...(same ? {} : { chapterOrder: 1, blockOrder: 0, finished: false }), updatedAt: new Date(p.updatedAt) } }) }
    for (const f of data.favorites) { const { childRef, ...row } = f; await tx.bookFavorite.create({ data: { ...row, childId: children.get(childRef)!, createdAt: new Date(f.createdAt) } }) }
    for (const q of data.quotes) { const { childRef, ...row } = q; await tx.bookHighlight.create({ data: { ...row, childId: children.get(childRef)!, createdAt: new Date(q.createdAt) } }) }
    for (const w of data.words) { const { childRef, ...row } = w; await tx.wordCard.create({ data: { ...row, sourceBookId: mapBook(w.sourceBookId), childId: children.get(childRef)!, createdAt: new Date(w.createdAt) } }) }
    for (const p of data.importedProgress) { const { childRef, ...row } = p; await tx.importedReadingProgress.create({ data: { ...row, bookId: imported.get(p.bookId)!, childId: children.get(childRef)!, contentVersion: p.contentVersion + (data.imports.find(b => b.ref === p.bookId)!.mediaOmitted ? 1 : 0), relocationRequired: p.relocationRequired || data.imports.find(b => b.ref === p.bookId)!.mediaOmitted, completed: p.completed && !data.imports.find(b => b.ref === p.bookId)!.mediaOmitted, updatedAt: new Date(p.updatedAt) } }) }
    for (const b of data.bookmarks) { const { childRef, ...row } = b; await tx.readingBookmark.create({ data: { ...row, id: randomUUID(), bookId: mapBook(b.bookId)!, childId: children.get(childRef)!, updatedAt: new Date(b.updatedAt) } }) }
    for (const p of data.plans) { const { childRef, ...row } = p; await tx.readingPlan.create({ data: { ...row, childId: children.get(childRef)!, updatedAt: new Date(p.updatedAt) } }) }
    return { preview: false, summary }
  }, { timeout: 60000 })
}
