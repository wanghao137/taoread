/**
 * 运营摘要（docs/34 P2-10）：自部署环境的轻量体检面板数据源。
 * 只读、家长角色、不进孩子端任何导航；数据全部来自 DB 聚合，
 * 不做文件系统遍历（媒体体量治理走 scripts/ 的 R2 工具链）。
 */
import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { requireAuth } from '../family/routes'
import { startOfLocalDay } from '../ritual/routes'

export interface OpsRoutesDeps {
  db: PrismaClient
  tokenSecret: Buffer
}

export function registerOpsRoutes(app: FastifyInstance, deps: OpsRoutesDeps): void {
  const { db, tokenSecret } = deps
  const parentAuth = requireAuth(tokenSecret, { roles: ['parent'] })

  app.get('/api/ops/summary', { preHandler: parentAuth }, async (request) => {
    if (!request.auth) return null
    const fid = request.auth.fid
    const dayStart = startOfLocalDay()
    const weekAgo = new Date(Date.now() - 7 * 86_400_000)
    // 本家庭孩子 id 集：生词/划线表以孩子为归属，按家庭口径过滤（对抗审查 P2-4：
    // 此前 words/bookHighlights 是全库计数，却渲染在「本家庭阅读」面板）
    const childRows = await db.childProfile.findMany({ where: { familyId: fid }, select: { id: true } })
    const childIds = childRows.map((c) => c.id)
    const [
      families,
      children,
      booksTotal,
      booksZh,
      booksEn,
      importedBooks,
      chapters,
      cosessionsTotal,
      cosessionsMine,
      cosessionsToday,
      words,
      highlights,
      bookHighlights,
      achievements,
      ttsToday,
      artAssets,
      videos,
      eventsByKind,
    ] = await Promise.all([
      db.family.count(),
      db.childProfile.count(),
      db.book.count(),
      db.book.count({ where: { lang: 'zh' } }),
      db.book.count({ where: { lang: 'en' } }),
      db.importedBook.count(),
      db.chapter.count(),
      db.cosession.count(),
      db.cosession.count({ where: { familyId: fid } }),
      db.cosession.count({ where: { familyId: fid, startedAt: { gte: dayStart } } }),
      db.wordCard.count({ where: { childId: { in: childIds } } }),
      db.highlightStar.count({ where: { familyId: fid } }),
      db.bookHighlight.count({ where: { childId: { in: childIds } } }),
      db.achievement.count({ where: { familyId: fid } }),
      db.ttsMediaOwner.count({ where: { familyId: fid, createdAt: { gte: dayStart } } }),
      db.artAsset.count(),
      db.videoAsset.count(),
      db.eventLog.groupBy({
        by: ['event'],
        where: { familyId: fid, ts: { gte: weekAgo } },
        _count: { event: true },
      }),
    ])
    return {
      generatedAt: new Date().toISOString(),
      library: { booksTotal, booksZh, booksEn, chapters, importedBooks },
      household: { families, children },
      reading: { cosessionsTotal, cosessionsMine, cosessionsToday, words, highlights, bookHighlights, achievements },
      costGuards: { ttsSegmentsToday: ttsToday, artAssetsTotal: artAssets, videosTotal: videos },
      eventsLast7d: eventsByKind
        .map((row) => ({ event: row.event, count: row._count.event }))
        .sort((a, b) => b.count - a.count),
    }
  })
}
