import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { seedMediaLedger } from '../src/demo/seed-media'

/**
 * CI e2e 全红根因回归（2026-09-28）：
 * seedMediaLedger 默认从开发库 file:./dev.db 播种媒体台账。CI/全新 checkout
 * 没有 dev.db，Prisma 对 sqlite 连接自动建空文件 → artAsset.findMany() 撞
 * P2021（表不存在）→ 演示服务启动失败 → e2e job 全挂。本地有 dev.db 恒绿，
 * 故 23 次 CI run 0 次成功且本地复现不了。
 * 契约：源库文件不存在 = 没什么可播种，优雅返回 {0,0,0}，绝不抛。
 */
const dir = mkdtempSync(join(tmpdir(), 'seed-media-'))
afterAll(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('seedMediaLedger 源库缺失优雅降级', () => {
  it('sourceUrl 指向不存在的 sqlite 文件：返回零计数，不抛 P2021', async () => {
    const { PrismaClient } = await import('@prisma/client')
    const db = new PrismaClient({ datasources: { db: { url: 'file:./seed-media-test-empty.db' } } })
    try {
      // 每轮唯一名：Prisma 对 sqlite 连接会自动建空文件，固定名会让下一轮误判「文件存在」
      const missing = `file:./no-such-dev-${process.pid}-${Date.now()}.db`
      const result = await seedMediaLedger(db, dir, missing)
      expect(result).toEqual({ art: 0, video: 0, skipped: 0 })
    } finally {
      await db.$disconnect()
    }
  })

  it('自连守卫：sourceUrl 与当前库相同直接跳过', async () => {
    const { PrismaClient } = await import('@prisma/client')
    const db = new PrismaClient({ datasources: { db: { url: 'file:./seed-media-test-empty.db' } } })
    try {
      process.env.TAO_DATABASE_URL = 'file:./same.db'
      const result = await seedMediaLedger(db, dir, 'file:./same.db')
      expect(result).toEqual({ art: 0, video: 0, skipped: 0 })
    } finally {
      delete process.env.TAO_DATABASE_URL
      await db.$disconnect()
    }
  })
})
