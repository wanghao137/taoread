/**
 * 进程内 TTL 缓存：键需由调用方做命名空间隔离（WereadService 以家庭 key 哈希为前缀）。
 * 逐出策略为近似 LRU（读取会刷新使用顺序）；达到容量上限时先清理过期项，仍满则逐出最久未使用项。
 */
export class TTLCache {
  private map = new Map<string, { value: unknown; expiresAt: number }>()

  constructor(
    private readonly opts: {
      maxEntries: number
      now?: () => number
    },
  ) {}

  private now(): number {
    return this.opts.now?.() ?? Date.now()
  }

  get<T>(key: string): T | undefined {
    const entry = this.map.get(key)
    if (!entry) return undefined
    if (entry.expiresAt <= this.now()) {
      this.map.delete(key)
      return undefined
    }
    // 重新插入以刷新使用顺序（近似 LRU：最近使用的更难被逐出）
    this.map.delete(key)
    this.map.set(key, entry)
    return entry.value as T
  }

  set(key: string, value: unknown, ttlMs: number): void {
    if (ttlMs <= 0) return
    if (!this.map.has(key) && this.map.size >= this.opts.maxEntries) {
      this.purgeExpired()
      while (this.map.size >= this.opts.maxEntries) {
        const oldest = this.map.keys().next().value
        if (oldest === undefined) break
        this.map.delete(oldest)
      }
    }
    this.map.set(key, { value, expiresAt: this.now() + ttlMs })
  }

  delete(key: string): void {
    this.map.delete(key)
  }

  clear(): void {
    this.map.clear()
  }

  get size(): number {
    return this.map.size
  }

  private purgeExpired(): void {
    const t = this.now()
    for (const [key, entry] of this.map) {
      if (entry.expiresAt <= t) this.map.delete(key)
    }
  }
}
