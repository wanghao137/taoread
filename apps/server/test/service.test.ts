import { describe, expect, it } from 'vitest'
import { TTLCache } from '../src/services/weread/cache'
import { TokenBucket } from '../src/services/weread/rateLimiter'
import { WereadService, TTL_POLICY } from '../src/services/weread/service'
import { RateLimitedError } from '../src/lib/errors'

function makeService(overrides: Partial<{ apiKey: string; capacity: number }> = {}) {
  const calls: Array<{ apiName: string; params?: Record<string, unknown> }> = []
  const apiKey = overrides.apiKey ?? 'wrk-family-a'
  const callImpl = async <T>(apiName: string, params?: Record<string, unknown>) => {
    calls.push({ apiName, params })
    return { echo: apiName, at: calls.length } as T
  }
  const service = new WereadService({
    apiKey,
    call: callImpl,
    cache: new TTLCache({ maxEntries: 1000 }),
    limiter: new TokenBucket({ capacity: overrides.capacity ?? 100, refillPerMinute: 100 }),
  })
  return { service, calls }
}

describe('WereadService — 缓存策略', () => {
  it('书架类接口按 TTL 缓存，第二次调用不再出网', async () => {
    const { service, calls } = makeService()
    const a = await service.endpoints.shelfSync()
    const b = await service.endpoints.shelfSync()
    expect(a).toEqual(b)
    expect(calls).toHaveLength(1)
    expect(calls[0]!.apiName).toBe('/shelf/sync')
  })

  it('阅读进度实时直通，不缓存', async () => {
    const { service, calls } = makeService()
    await service.endpoints.getProgress('123')
    await service.endpoints.getProgress('123')
    expect(calls).toHaveLength(2)
  })

  it('同接口不同参数使用不同缓存键', async () => {
    const { service, calls } = makeService()
    await service.endpoints.bookInfo('111')
    await service.endpoints.bookInfo('222')
    await service.endpoints.bookInfo('111')
    expect(calls).toHaveLength(2)
  })

  it('搜索缓存键包含全部业务参数（keyword/scope/count/maxIdx）', async () => {
    const { service, calls } = makeService()
    await service.endpoints.storeSearch({ keyword: '三体', scope: 10 })
    await service.endpoints.storeSearch({ keyword: '三体', scope: 10 })
    await service.endpoints.storeSearch({ keyword: '三体', scope: 0 })
    expect(calls).toHaveLength(2)
  })
})

describe('WereadService — 家庭隔离与限流', () => {
  it('不同家庭的缓存键相互隔离（同名接口互不串数据）', async () => {
    const cache = new TTLCache({ maxEntries: 1000 })
    const mk = (apiKey: string) =>
      new WereadService({
        apiKey,
        call: async <T,>(apiName: string) => ({ from: apiKey, apiName }) as T,
        cache,
        limiter: new TokenBucket({ capacity: 100, refillPerMinute: 100 }),
      })
    const a = await mk('wrk-family-a').endpoints.shelfSync()
    const b = await mk('wrk-family-b').endpoints.shelfSync()
    expect(a).toMatchObject({ from: 'wrk-family-a' })
    expect(b).toMatchObject({ from: 'wrk-family-b' })
  })

  it('令牌桶耗尽时抛 RateLimitedError 且不出网', async () => {
    const { service, calls } = makeService({ capacity: 1 })
    await service.endpoints.bookInfo('111') // 消耗唯一令牌
    await expect(service.endpoints.bookInfo('222')).rejects.toThrow(RateLimitedError)
    expect(calls).toHaveLength(1)
  })

  it('并发同键请求合并为一次出网（防缓存击穿，不重复扣令牌）', async () => {
    const calls: string[] = []
    const service = new WereadService({
      apiKey: 'wrk-x',
      call: async <T,>(apiName: string) => {
        calls.push(apiName)
        await new Promise((resolve) => setTimeout(resolve, 20))
        return { n: calls.length } as T
      },
      cache: new TTLCache({ maxEntries: 100 }),
      // 容量 1：若无在途合并，第二个并发请求会因令牌不足直接失败
      limiter: new TokenBucket({ capacity: 1, refillPerMinute: 0 }),
    })
    const [a, b] = await Promise.all([
      service.endpoints.bookInfo('1'),
      service.endpoints.bookInfo('1'),
    ])
    expect(calls).toHaveLength(1)
    expect(a).toEqual(b)
  })

  it('缓存过期后重新出网（TTL 真实生效，而非仅命中测试）', async () => {
    let nowMs = 0
    const cache = new TTLCache({ maxEntries: 100, now: () => nowMs })
    const calls: string[] = []
    const service = new WereadService({
      apiKey: 'k',
      call: async <T,>(apiName: string) => {
        calls.push(apiName)
        return {} as T
      },
      cache,
      limiter: new TokenBucket({ capacity: 100, refillPerMinute: 1000 }),
    })
    await service.endpoints.shelfSync()
    await service.endpoints.shelfSync() // TTL 内命中
    expect(calls).toHaveLength(1)
    nowMs += 10 * 60_000 + 1 // 越过 shelf TTL
    await service.endpoints.shelfSync()
    expect(calls).toHaveLength(2)
  })
})

describe('WereadService — TTL 策略与端点封装', () => {
  it('TTL 策略与 docs/02 附录 A 一致', () => {
    expect(TTL_POLICY.shelf).toBe(10 * 60_000)
    expect(TTL_POLICY.book).toBe(24 * 60 * 60_000)
    expect(TTL_POLICY.stats).toBe(60 * 60_000)
    expect(TTL_POLICY.search).toBe(5 * 60_000)
  })

  it('端点封装按网关约定平铺参数', async () => {
    const { service, calls } = makeService()
    await service.endpoints.bestBookmarks('111')
    await service.endpoints.readDataDetail({ mode: 'weekly' })
    await service.endpoints.userNotebooks(20, 123)
    expect(calls[0]).toEqual({ apiName: '/book/bestbookmarks', params: { bookId: '111', chapterUid: 0 } })
    expect(calls[1]).toEqual({ apiName: '/readdata/detail', params: { mode: 'weekly', baseTime: 0 } })
    expect(calls[2]).toEqual({ apiName: '/user/notebooks', params: { count: 20, lastSort: 123 } })
  })

  it('cacheNamespace 对不同 key 产生不同命名空间', () => {
    expect(WereadService.cacheNamespace('wrk-a')).not.toBe(WereadService.cacheNamespace('wrk-b'))
    expect(WereadService.cacheNamespace('wrk-a')).toHaveLength(12)
  })
})
