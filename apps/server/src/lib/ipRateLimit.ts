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

/** 回环地址判定：仅 Tunnel 形态（cloudflared 本机回源）时 request.ip 恒为回环 */
function isLoopback(ip: string): boolean {
  return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1'
}

/** Fastify preHandler 工厂：按请求来源 IP 限流。
 * 生产拓扑是 Cloudflare Tunnel → 127.0.0.1:8091，request.ip 恒为回环地址，
 * 全站访客会共享同一个桶（2026-09-25 家长码「用不了」事故根因：桶被打空后人人 429）。
 * CF-Connecting-IP 只在 request.ip 为回环时可信（隧道是唯一入口，头由 Cloudflare 设置）；
 * 直连部署下 request.ip 是真实对端地址，此时采信该头等于允许伪造头换桶——一律用 request.ip。 */
export function ipRateLimit(limiter: IpRateLimiter) {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const cfIp = request.headers['cf-connecting-ip']
    const headerIp = Array.isArray(cfIp) ? cfIp[0] : cfIp
    const ip = isLoopback(request.ip) && headerIp ? headerIp : request.ip
    limiter.take(ip)
  }
}
