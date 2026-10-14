/** Reset only the two explicitly named synthetic audit databases. */
import { PrismaClient } from '@prisma/client'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
const databasePaths = ['before', 'after'].map(name => resolve(`apps/server/prisma/e2e-run-ui-perf-${name}-20261014.db`).replaceAll('\\', '/'))
for (const database of databasePaths) {
  const db = new PrismaClient({ datasources: { db: { url: `file:${database}` } } })
  try {
    const children = await db.childProfile.findMany({ where: { nickname: '小柚' } })
    if (children.length !== 1 || await db.book.count() !== 277) throw Error('Audit fixture differs from the expected synthetic seed')
    const child = children[0]!
    const bookId = 'poetry-song-spring'
    const book = await db.book.findUniqueOrThrow({ where: { id: bookId } })
    await db.$transaction(async tx => {
      await tx.readingProgress.deleteMany({ where: { childId: child.id } })
      await tx.bookFavorite.deleteMany({ where: { childId: child.id } })
      await tx.readingProgress.create({ data: { childId: child.id, bookId, chapterOrder: 1, blockOrder: 1, contentVersion: book.contentVersion, updatedAt: new Date('2026-10-14T00:00:00Z') } })
      const text = Array.from({ length: 35 }, (_, i) => `第${i + 1}段：小兔沿着安静的小路往前走。她看到树叶落在溪水上，也看到朋友正在桥边等她。她慢慢翻开书，想知道下一页会发生什么。`).join('\n\n')
      await tx.importedBook.upsert({ where: { id: 'imp:ui-touch-20261014' }, update: {}, create: { id: 'imp:ui-touch-20261014', familyId: child.familyId, title: '触摸验收合成书', lang: 'zh', ageStage: '3-5', sourceName: '本机隔离验收合成文本', sha256: createHash('sha256').update(text).digest('hex'), chapters: { create: [{ order: 1, title: '安静的小路', text }] } } })
    })
    console.log(JSON.stringify({ fixture: database.split('/').pop(), books: 277, selectedChild: 'synthetic', resumeBook: bookId }))
  } finally { await db.$disconnect() }
}
