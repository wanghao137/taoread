import { PrismaClient } from '@prisma/client'

/** 数据库工厂：入口创建单例并注入 buildApp；测试可注入独立实例（临时库） */
export function createDb(url: string): PrismaClient {
  return new PrismaClient({
    datasources: { db: { url } },
  })
}

/** 测试辅助：按外键依赖序清空全部表（SQLite 无 TRUNCATE） */
export const WIPE_TABLES_SQL = [
  'DELETE FROM EventLog',
  'DELETE FROM HighlightStar',
  'DELETE FROM Achievement',
  'DELETE FROM Cosession',
  'DELETE FROM ParentPrompt',
  'DELETE FROM WeeklyReport',
  'DELETE FROM ShelfSnapshot',
  'DELETE FROM WereadBinding',
  'DELETE FROM TtsMediaOwner',
  'DELETE FROM PhonicsResponse',
  'DELETE FROM PhonicsAttempt',
  'DELETE FROM PhonicsEnrollment',
  'DELETE FROM ImportedChapter',
  'DELETE FROM ImportedBook',
  'DELETE FROM ChildProfile',
  'DELETE FROM Family',
  'DELETE FROM BookCache',
  // v2 内容域：先清进度/块/章，再清书与台账（外键依赖序）
  'DELETE FROM ReadingProgress',
  'DELETE FROM Block',
  'DELETE FROM Chapter',
  'DELETE FROM RightsLedger',
  'DELETE FROM Book',
] as const

export async function wipeDb(db: PrismaClient): Promise<void> {
  for (const sql of WIPE_TABLES_SQL) {
    await db.$executeRawUnsafe(sql)
  }
}
