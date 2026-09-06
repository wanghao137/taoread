/**
 * WereadServiceRegistry：familyId → WereadService 的进程内注册表。
 *
 * 为什么必须是「每家庭单例」：WereadService 内持有令牌桶与缓存命名空间——
 * 若每次请求新建实例，令牌桶形同虚设（每个桶都满格），缓存也永远不命中。
 *
 * 重新绑定自愈：每次 get 都比对 key 哈希（cacheNamespace），key 变化即重建服务；
 * 旧缓存键因 namespace 不同自然失效，不会跨 key 串数据。
 */
import { TTLCache } from './cache'
import { TokenBucket } from './rateLimiter'
import { WereadService } from './service'
import type { WereadCall } from './endpoints'
import { NotBoundError } from '../../lib/errors'

/** 出网限流参数：第 1 夜 50 连发摸底的安全结论（499 节流阈值远高于此） */
export const WEREAD_BUCKET_DEFAULTS = {
  capacity: 5,
  refillPerMinute: 10,
} as const

export interface WereadServiceRegistryDeps {
  /** 取家庭绑定的明文 key（未绑定返回 null）；由 app 层接线 getBoundKey */
  getKey: (familyId: string) => Promise<string | null>
  /** 由明文 key 构造出网函数（生产绑定真实网关；测试注入 mock） */
  makeCall: (apiKey: string) => WereadCall
  now?: () => number
  bucket?: { capacity: number; refillPerMinute: number }
  /** 共享 TTL 缓存容量上限（键已含家庭命名空间） */
  cacheMaxEntries?: number
}

export class WereadServiceRegistry {
  private readonly entries = new Map<
    string,
    { namespace: string; service: WereadService }
  >()
  private readonly cache: TTLCache

  constructor(private readonly deps: WereadServiceRegistryDeps) {
    this.cache = new TTLCache({
      maxEntries: deps.cacheMaxEntries ?? 512,
      now: deps.now,
    })
  }

  async get(familyId: string): Promise<WereadService> {
    const apiKey = await this.deps.getKey(familyId)
    if (!apiKey) throw new NotBoundError()
    const namespace = WereadService.cacheNamespace(apiKey)
    const hit = this.entries.get(familyId)
    if (hit && hit.namespace === namespace) return hit.service

    const service = new WereadService({
      apiKey,
      call: this.deps.makeCall(apiKey),
      cache: this.cache,
      limiter: new TokenBucket({
        capacity: this.deps.bucket?.capacity ?? WEREAD_BUCKET_DEFAULTS.capacity,
        refillPerMinute:
          this.deps.bucket?.refillPerMinute ?? WEREAD_BUCKET_DEFAULTS.refillPerMinute,
        now: this.deps.now,
      }),
    })
    this.entries.set(familyId, { namespace, service })
    return service
  }

  /** 测试辅助：清空服务与缓存状态 */
  reset(): void {
    this.entries.clear()
    this.cache.clear()
  }
}
