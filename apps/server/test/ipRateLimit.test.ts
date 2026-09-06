import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import type { PrismaClient } from '@prisma/client'
import { IpRateLimiter } from '../src/lib/ipRateLimit'
import { wipeDb } from '../src/lib/db'
import { makeApp, type TestHarness } from './helper'

const probeOk = async () => 'active' as const

describe('IP 级限流（N2-007：无凭据入口）', () => {
  describe('IpRateLimiter 单元', () => {
    it('同一 IP 超容量后第 N+1 次抛 RateLimitedError（429）', () => {
      let t = 0
      const limiter = new IpRateLimiter({
        capacity: 2,
        refillPerMinute: 60,
        now: () => t,
      })
      expect(() => limiter.take('1.1.1.1')).not.toThrow()
      expect(() => limiter.take('1.1.1.1')).not.toThrow()
      expect(() => limiter.take('1.1.1.1')).toThrow(/频繁/)
      // 其他 IP 不受影响
      expect(() => limiter.take('2.2.2.2')).not.toThrow()
    })

    it('令牌随时间回补，恢复后可再次通过', () => {
      let t = 0
      const limiter = new IpRateLimiter({
        capacity: 1,
        refillPerMinute: 60, // 1/秒
        now: () => t,
      })
      limiter.take('1.1.1.1')
      expect(() => limiter.take('1.1.1.1')).toThrow(/频繁/)
      t += 1000
      expect(() => limiter.take('1.1.1.1')).not.toThrow()
    })

    it('跟踪表有上限：超限逐出最旧 IP 桶，防内存无界增长', () => {
      const limiter = new IpRateLimiter({
        capacity: 1,
        refillPerMinute: 0,
        maxTrack: 2,
      })
      limiter.take('1.1.1.1')
      limiter.take('2.2.2.2')
      limiter.take('3.3.3.3') // 逐出 1.1.1.1
      // 1.1.1.1 重新进入 = 新桶，又可取 1 次（容量 1 且不回补）
      expect(() => limiter.take('1.1.1.1')).not.toThrow()
      expect(() => limiter.take('1.1.1.1')).toThrow(/频繁/)
    })
  })

  describe('路由集成：POST /api/family 与 /join', () => {
    let h: TestHarness
    let db: PrismaClient

    beforeAll(async () => {
      h = await makeApp(probeOk, {
        // 小实例：容量 2、回补 60/分钟（真实时钟，各用例用独立 remoteAddress 隔离桶）
        ipLimiter: new IpRateLimiter({ capacity: 2, refillPerMinute: 60 }),
      })
      db = h.db
      await h.app.ready()
    })
    afterAll(async () => {
      await h.app.close()
      await db.$disconnect()
    })
    beforeEach(async () => {
      await wipeDb(db)
    })

    it('同一 IP 连续创建第 3 次起返回 429 与中文提示；换 IP 不受影响', async () => {
      const create = (ip: string) =>
        h.app.inject({
          method: 'POST',
          url: '/api/family',
          payload: { deviceId: 'p1' },
          remoteAddress: ip,
        })
      expect((await create('10.0.0.1')).statusCode).toBe(201)
      expect((await create('10.0.0.1')).statusCode).toBe(201)
      const blocked = await create('10.0.0.1')
      expect(blocked.statusCode).toBe(429)
      const body = blocked.json()
      expect(body.code).toBe('WEREAD_RATE_LIMITED')
      expect(body.message).toContain('频繁')
      // 其他 IP 独立配额
      expect((await create('10.0.0.2')).statusCode).toBe(201)
    })

    it('join 走同一限流器：配额耗尽后返回 429', async () => {
      const create = () =>
        h.app.inject({ method: 'POST', url: '/api/family', payload: {}, remoteAddress: '10.0.1.1' })
      expect((await create()).statusCode).toBe(201)
      expect((await create()).statusCode).toBe(201)
      const join = await h.app.inject({
        method: 'POST',
        url: '/api/family/join',
        payload: { familyCode: 'AAAA2222', role: 'child' },
        remoteAddress: '10.0.1.1',
      })
      expect(join.statusCode).toBe(429)
      expect(join.json().message).toContain('频繁')
    })
  })
})
