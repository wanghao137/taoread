/**
 * 令牌桶限流：限制每个家庭对微信读书网关的出网频率（docs/03 风险 R7：单 key 高频调用触发封禁）。
 * 采用「立即失败」语义：拿不到令牌直接抛 RateLimitedError，由上层缓存兜底，不排队等待。
 */
import { RateLimitedError } from '../../lib/errors'

export class TokenBucket {
  private tokens: number
  private lastRefillMs: number

  constructor(
    private readonly opts: {
      capacity: number
      refillPerMinute: number
      now?: () => number
    },
  ) {
    this.tokens = opts.capacity
    this.lastRefillMs = this.now()
  }

  private now(): number {
    return this.opts.now?.() ?? Date.now()
  }

  private refill(): void {
    const t = this.now()
    const elapsedMs = t - this.lastRefillMs
    if (elapsedMs <= 0) return
    this.tokens = Math.min(
      this.opts.capacity,
      this.tokens + (elapsedMs * this.opts.refillPerMinute) / 60_000,
    )
    this.lastRefillMs = t
  }

  /** 尝试取 1 个令牌；成功返回 true，失败抛 RateLimitedError */
  take(): boolean {
    this.refill()
    if (this.tokens >= 1) {
      this.tokens -= 1
      return true
    }
    throw new RateLimitedError()
  }
}
