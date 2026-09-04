import { describe, expect, it } from 'vitest'
import { TTLCache } from '../src/services/weread/cache'

function makeCache(nowMs: number, maxEntries = 100) {
  let t = nowMs
  const cache = new TTLCache({ maxEntries, now: () => t })
  return {
    cache,
    advance: (ms: number) => { t += ms },
    setNow: (ms: number) => { t = ms },
  }
}

describe('TTLCache', () => {
  it('TTL 内命中，过期后未命中', () => {
    const { cache, advance } = makeCache(0)
    cache.set('k', { v: 1 }, 1000)
    expect(cache.get<{ v: number }>('k')).toEqual({ v: 1 })
    advance(999)
    expect(cache.get('k')).toEqual({ v: 1 })
    advance(1)
    expect(cache.get('k')).toBeUndefined()
  })

  it('ttl<=0 视为不缓存', () => {
    const { cache } = makeCache(0)
    cache.set('k', 1, 0)
    expect(cache.get('k')).toBeUndefined()
  })

  it('容量满时先清过期项，仍满则 FIFO 逐出', () => {
    const { cache, advance } = makeCache(0, 2)
    cache.set('a', 1, 100)
    advance(50)
    cache.set('b', 2, 10_000)
    advance(60) // a(100ms) 已过期，b 未过期
    cache.set('c', 3, 10_000) // 触发清理 a，无需逐出 b
    expect(cache.get('a')).toBeUndefined()
    expect(cache.get('b')).toBe(2)
    expect(cache.get('c')).toBe(3)

    cache.set('d', 4, 10_000) // 已满（b,c），FIFO 逐出 b
    expect(cache.get('b')).toBeUndefined()
    expect(cache.get('c')).toBe(3)
    expect(cache.get('d')).toBe(4)
  })

  it('读取会刷新 FIFO 顺序（热数据不易被逐出）', () => {
    const { cache } = makeCache(0, 2)
    cache.set('a', 1, 10_000)
    cache.set('b', 2, 10_000)
    cache.get('a') // a 变为最近使用
    cache.set('c', 3, 10_000) // 逐出的是 b
    expect(cache.get('a')).toBe(1)
    expect(cache.get('b')).toBeUndefined()
  })

  it('delete 与 clear 生效', () => {
    const { cache } = makeCache(0)
    cache.set('a', 1, 1000)
    cache.delete('a')
    expect(cache.get('a')).toBeUndefined()
    cache.set('b', 2, 1000)
    cache.clear()
    expect(cache.size).toBe(0)
  })
})
