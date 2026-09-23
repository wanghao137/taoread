import type { PrismaClient } from '@prisma/client'
import { AppError } from '../../lib/errors'

/**
 * A3（交接文档 F05/F03 剩余）：付费生成（AI 插画 / AI 动画）的费用边界。
 *
 * 1. 每家庭每日配额：按「今天实际新建的生成资产行数」计数（幂等命中不计数、
 *    不受配额限制——已生成的素材永远免费可见）。DB 计数跨重启有效，单进程部署
 *    即生产形态；多进程部署各查同一 DB，同样收敛。
 * 2. 并发去重：同一 (域, 家庭, 场景) 的在途请求共享同一个 Promise，
 *    模拟 N 个并发同场景请求只触发一次上游调用。进程内实现；跨进程由
 *    ArtAsset/VideoAsset 的 scene 唯一键兜底（先落库者赢，后到者命中幂等）。
 */

export interface GenQuotaDb {
  artAsset: PrismaClient['artAsset']
  videoAsset: PrismaClient['videoAsset']
}

export async function assertDailyGenQuota(
  db: GenQuotaDb,
  familyId: string,
  limit: number,
  now = new Date(),
): Promise<void> {
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const prefix = `fam:${familyId}:`
  const [art, video] = await Promise.all([
    db.artAsset.count({ where: { scene: { startsWith: prefix }, createdAt: { gte: dayStart } } }),
    db.videoAsset.count({ where: { scene: { startsWith: prefix }, createdAt: { gte: dayStart } } }),
  ])
  if (art + video >= limit) {
    throw new AppError('今天的生成次数用完了，明天再来吧', 'GEN_QUOTA_EXCEEDED', 429)
  }
}

const inFlight = new Map<string, Promise<unknown>>()

export function dedupeInFlight<T>(key: string, task: () => Promise<T>): Promise<T> {
  const existing = inFlight.get(key)
  if (existing) return existing as Promise<T>
  const promise = task().finally(() => {
    inFlight.delete(key)
  })
  inFlight.set(key, promise)
  return promise
}

/** 测试隔离用：清空在途表 */
export function clearInFlight(): void {
  inFlight.clear()
}
