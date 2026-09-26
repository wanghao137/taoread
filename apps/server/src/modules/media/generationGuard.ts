import type { PrismaClient } from '@prisma/client'
import { AppError } from '../../lib/errors'

/**
 * A3（交接文档 F05/F03 剩余）：付费生成（AI 插画 / AI 动画）的费用边界。
 *
 * 1. 每家庭每日配额：按「今天实际新建的生成资产行数」计数（幂等命中不计数、
 *    不受配额限制——已生成的素材永远免费可见）。DB 计数跨重启有效，单进程部署
 *    即生产形态；多进程部署各查同一 DB，同样收敛。
 * 2. 并发去重：按域拆分在途键（gen:art:<fid> / gen:video:<fid>）——同域（家庭+域）
 *    的在途请求共享同一个 Promise；跨域请求不 join（结果形态不同），以 409 拒绝。
 *    进程内实现；跨进程由 ArtAsset/VideoAsset 的 scene 唯一键兜底（先落库者赢，后到者命中幂等）。
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

/**
 * 家庭级生成互斥（docs/31 R-03：全家同时只允许一个生成任务，防重复计费）。
 * 生成键按域拆分（gen:art:<fid> / gen:video:<fid>）：
 *  - 同域并发（同为插画/同为动画）：共享在途 Promise（dedupeInFlight 语义）；
 *  - 跨域并发：不 join 对方的 Promise——两边任务形态不同，且共享 Promise 曾把
 *    Fastify reply 泄漏给另一条链路（第二个请求拿到别人的 reply/字符串结果），
 *    直接以 409 业务错误拒绝，前端提示稍后再试。
 * has(other) 与 set(key) 之间无 await，事件循环内原子，不会出现「检查后双入」。
 */
export async function runGeneration<T>(
  familyId: string,
  domain: 'art' | 'video',
  task: () => Promise<T>,
): Promise<T> {
  const key = `gen:${domain}:${familyId}`
  const otherKey = `gen:${domain === 'art' ? 'video' : 'art'}:${familyId}`
  if (inFlight.has(otherKey)) {
    throw new AppError('已有生成任务进行中，请稍候', 'GENERATION_BUSY', 409)
  }
  return dedupeInFlight(key, task)
}
