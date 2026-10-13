import type { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { AppError, ValidationError } from '../lib/errors'
const versioned = z.object({ version: z.string().min(1).max(128), reviewer: z.string().trim().min(2).max(80), reason: z.string().trim().min(3).max(1000) })
export const correctionSchema = versioned.extend({ chapter: z.number().int().positive(), block: z.number().int().positive(), text: z.string().trim().min(1).max(100000), pinyin: z.string().trim().max(100000).nullable(), translation: z.string().trim().max(100000).nullable() })
export const revisionRestoreSchema = versioned.extend({ revisionId: z.string().min(1).max(64) })
const snapshotSchema = z.array(z.object({ chapter: z.number().int().positive(), block: z.number().int().positive(), text: z.string(), pinyin: z.string().nullable(), translation: z.string().nullable() }))
const include = { chapters: { orderBy: { order: 'asc' as const }, include: { blocks: { orderBy: { order: 'asc' as const } } } } }
type EditableBook = Awaited<ReturnType<PrismaClient['book']['findUniqueOrThrow']>> & { chapters: Array<{ order: number; blocks: Array<{ order: number; text: string; pinyin: string | null; translation: string | null }> }> }
function snapshot(book: EditableBook) { return book.chapters.flatMap(ch => ch.blocks.map(b => ({ chapter: ch.order, block: b.order, text: b.text, pinyin: b.pinyin, translation: b.translation }))) }
export async function correctBlock(db: PrismaClient, id: string, input: z.infer<typeof correctionSchema>) {
  const b = correctionSchema.parse(input)
  return db.$transaction(async tx => {
    const book = await tx.book.findUniqueOrThrow({ where: { id }, include })
    if (book.contentVersion !== b.version) throw new AppError('正文版本已变化，请重新核查', 'CONTENT_STALE', 409)
    const chapter = book.chapters.find(ch => ch.order === b.chapter)
    const block = chapter?.blocks.find(block => block.order === b.block)
    if (!block || block.kind === 'image') throw new ValidationError('只能修订存在的文字块')
    if (b.pinyin && b.pinyin.split(/\s+/).length !== (b.text.match(/[\u3400-\u9fff]/g)?.length ?? 0)) throw new ValidationError('拼音数量与汉字数量不一致')
    const before = snapshot(book)
    const after = before.map(row => row.chapter === b.chapter && row.block === b.block ? { ...row, text: b.text, pinyin: b.pinyin || null, translation: b.translation || null } : row)
    if (JSON.stringify(before) === JSON.stringify(after)) throw new ValidationError('没有正文变化，无需生成修订')
    await tx.block.update({ where: { id: block.id }, data: { text: b.text, pinyin: b.pinyin || null, translation: b.translation || null } })
    const version = `edit-${randomUUID()}`
    const words = book.chapters.flatMap(ch => ch.blocks).filter(x => !['image', 'note'].includes(x.kind)).reduce((sum, row) => { const text = row.id === block.id ? b.text : row.text; return sum + (book.lang === 'en' ? text.trim().split(/\s+/).filter(Boolean).length : text.replace(/[^\p{L}\p{N}]/gu, '').length) }, 0)
    const updated = await tx.book.update({ where: { id }, data: { contentVersion: version, words, publicationStatus: 'draft', reviewStatus: 'pending', reviewEvidence: null, readingGuidance: null } })
    const revision = await tx.bookTextRevision.create({ data: { bookId: id, fromVersion: b.version, toVersion: version, beforeText: JSON.stringify(before), afterText: JSON.stringify(after), reviewer: b.reviewer, reason: b.reason } })
    return { book: updated, revision }
  })
}
export async function restoreTextRevision(db: PrismaClient, id: string, input: z.infer<typeof revisionRestoreSchema>) {
  const b = revisionRestoreSchema.parse(input)
  return db.$transaction(async tx => {
    const book = await tx.book.findUniqueOrThrow({ where: { id }, include })
    const latest = await tx.bookTextRevision.findFirst({ where: { bookId: id }, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] })
    const before = snapshot(book)
    if (!latest || latest.id !== b.revisionId || book.contentVersion !== b.version || latest.toVersion !== b.version || latest.afterText !== JSON.stringify(before)) throw new AppError('只能恢复当前正文最近一次修订；后续正文已变化', 'REVISION_STALE', 409)
    const previous = snapshotSchema.parse(JSON.parse(latest.beforeText))
    for (const row of previous) {
      const ch = book.chapters.find(x => x.order === row.chapter)
      const block = ch?.blocks.find(x => x.order === row.block)
      if (!block) throw new ValidationError('章节结构已变化，不能恢复此次文字修订')
      await tx.block.update({ where: { id: block.id }, data: { text: row.text, pinyin: row.pinyin, translation: row.translation } })
    }
    const version = `edit-${randomUUID()}`
    const words = previous.reduce((sum, row) => { const block = book.chapters.find(x => x.order === row.chapter)?.blocks.find(x => x.order === row.block); return sum + (block && !['image', 'note'].includes(block.kind) ? (book.lang === 'en' ? row.text.trim().split(/\s+/).filter(Boolean).length : row.text.replace(/[^\p{L}\p{N}]/gu, '').length) : 0) }, 0)
    const updated = await tx.book.update({ where: { id }, data: { contentVersion: version, words, publicationStatus: 'draft', reviewStatus: 'pending', reviewEvidence: null, readingGuidance: null } })
    const revision = await tx.bookTextRevision.create({ data: { bookId: id, fromVersion: b.version, toVersion: version, beforeText: JSON.stringify(before), afterText: JSON.stringify(previous), reviewer: b.reviewer, reason: `恢复 ${latest.id}：${b.reason}` } })
    return { book: updated, revision }
  })
}
