/**
 * IP 级轻量限流（N2-007）：保护无凭据入口（创建家庭/凭码加入——家庭码即完整身份）。
 * 每 IP 一个令牌桶（复用 TokenBucket），立即失败语义；跟踪表有上限防内存膨胀。
 * 参数对齐第 1 夜限频摸底的安全结论：capacity 5、refill 10/分钟。
 */
import type { FastifyReply, FastifyRequest } from 'fastify'
import { TokenBucket } from '../services/weread/rateLimiter'

export const IP_LIMIT_DEFAULTS = {
  capacity: 5,
  refillPerMinute: 10,
} as const

export class IpRateLimiter {
  private readonly buckets = new Map<string, TokenBucket>()

  constructor(
    private readonly opts: {
      capacity: number
      refillPerMinute: number
      /** 最多跟踪的 IP 数（防映射无界增长）；超出逐出最旧桶 */
      maxTrack?: number
      now?: () => number
    },
  ) {}

  /** 尝试为该 IP 取 1 个令牌；失败抛 RateLimitedError（HTTP 429） */
  take(ip: string): void {
    let bucket = this.buckets.get(ip)
    if (!bucket) {
      const maxTrack = this.opts.maxTrack ?? 4096
      if (this.buckets.size >= maxTrack) {
        const oldest = this.buckets.keys().next().value
        if (oldest !== undefined) this.buckets.delete(oldest)
      }
      bucket = new TokenBucket({
        capacity: this.opts.capacity,
        refillPerMinute: this.opts.refillPerMinute,
        now: this.opts.now,
      })
      this.buckets.set(ip, bucket)
    }
    bucket.take()
  }
}

/** Fastify preHandler 工厂：按请求来源 IP 限流 */
export function ipRateLimit(limiter: IpRateLimiter) {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    limiter.take(request.ip)
  }
}
