import { createHash } from 'node:crypto'
import { TTLCache } from './cache'
import { TokenBucket } from './rateLimiter'
import { createWereadEndpoints, type WereadCall } from './endpoints'

/**
 * WereadService：绑定单个家庭 API Key 的服务对象。
 * 组合三道防线：缓存（家庭隔离键）→ 令牌桶限流 → 网关调用；并发同键请求合并（防缓存击穿）。
 * TTL 策略对齐 docs/02 附录 A。
 */

export const TTL_POLICY = {
  shelf: 10 * 60_000,
  book: 24 * 60 * 60_000,
  stats: 60 * 60_000,
  recommend: 60 * 60_000,
  search: 5 * 60_000,
} as const

export interface WereadServiceDeps {
  apiKey: string
  call: WereadCall
  cache: TTLCache
  limiter: TokenBucket
}

export class WereadService {
  readonly endpoints
  private readonly namespace: string
  /** 在途请求表：并发同键共享同一 Promise，避免击穿缓存并重复扣减令牌 */
  private readonly inflight = new Map<string, Promise<unknown>>()

  constructor(private readonly deps: WereadServiceDeps) {
    this.namespace = WereadService.cacheNamespace(deps.apiKey)
    this.endpoints = createWereadEndpoints((apiName, params) =>
      this.dispatch(apiName, params),
    )
  }

  /** 缓存键前缀 = key 哈希前 12 位：不同家庭绝不共享缓存 */
  static cacheNamespace(apiKey: string): string {
    return createHash('sha256').update(apiKey).digest('hex').slice(0, 12)
  }

  private async dispatch<T>(
    apiName: string,
    params: Record<string, unknown> | undefined,
  ): Promise<T> {
    const policy = WereadService.ttlFor(apiName, params)
    const hasCache = policy.ttlMs > 0 && policy.cacheKey !== null
    if (hasCache) {
      const hit = this.deps.cache.get<T>(this.key(policy.cacheKey!))
      if (hit !== undefined) return hit
    }

    // 直通接口（实时数据）也参与在途合并：同一瞬间的重复请求只出网一次
    const dedupeKey = hasCache
      ? this.key(policy.cacheKey!)
      : `${this.namespace}:passthrough:${apiName}:${JSON.stringify(params ?? {})}`

    const existing = this.inflight.get(dedupeKey)
    if (existing) return existing as Promise<T>

    this.deps.limiter.take()
    const promise = (async () => {
      try {
        const value = await this.deps.call<T>(apiName, params)
        if (hasCache) {
          this.deps.cache.set(this.key(policy.cacheKey!), value, policy.ttlMs)
        }
        return value
      } finally {
        this.inflight.delete(dedupeKey)
      }
    })()
    this.inflight.set(dedupeKey, promise)
    return promise
  }

  private key(cacheKey: string): string {
    return `${this.namespace}:${cacheKey}`
  }

  /** 按 api_name + 关键参数确定缓存键与 TTL（进度类实时数据直通） */
  private static ttlFor(
    apiName: string,
    params: Record<string, unknown> | undefined,
  ): { cacheKey: string | null; ttlMs: number } {
    switch (apiName) {
      case '/shelf/sync':
        return { cacheKey: 'shelf', ttlMs: TTL_POLICY.shelf }
      case '/book/info':
        return { cacheKey: `book-info:${params?.bookId}`, ttlMs: TTL_POLICY.book }
      case '/book/chapterinfo':
        return { cacheKey: `book-chapters:${params?.bookId}`, ttlMs: TTL_POLICY.book }
      case '/book/bestbookmarks':
        return {
          cacheKey: `book-bestmarks:${params?.bookId}:${params?.chapterUid ?? 0}`,
          ttlMs: TTL_POLICY.book,
        }
      case '/readdata/detail':
        return {
          cacheKey: `stats:${params?.mode ?? 'monthly'}:${params?.baseTime ?? 0}`,
          ttlMs: TTL_POLICY.stats,
        }
      case '/book/recommend':
        return {
          cacheKey: `recommend:${params?.count ?? 12}`,
          ttlMs: TTL_POLICY.recommend,
        }
      case '/book/similar':
        return {
          cacheKey: `similar:${params?.bookId}:${params?.count ?? 12}`,
          ttlMs: TTL_POLICY.recommend,
        }
      case '/store/search':
        return {
          cacheKey: `search:${params?.keyword}:${params?.scope ?? 10}:${params?.count ?? ''}:${params?.maxIdx ?? 0}`,
          ttlMs: TTL_POLICY.search,
        }
      case '/user/notebooks':
        return {
          cacheKey: `notebooks:${params?.count ?? 20}:${params?.lastSort ?? ''}`,
          ttlMs: TTL_POLICY.shelf,
        }
      default:
        return { cacheKey: null, ttlMs: 0 }
    }
  }
}
