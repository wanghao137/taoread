import { describe, expect, it } from 'vitest'
import { TokenBucket } from '../src/services/weread/rateLimiter'
import { RateLimitedError } from '../src/lib/errors'

function makeBucket(startMs = 0, capacity = 2, refillPerMinute = 60) {
  let t = startMs
  const bucket = new TokenBucket({ capacity, refillPerMinute, now: () => t })
  return { bucket, advance: (ms: number) => { t += ms } }
}

describe('TokenBucket', () => {
  it('容量内连续取用成功，超容量抛 RateLimitedError', () => {
    const { bucket } = makeBucket(0, 2)
    expect(bucket.take()).toBe(true)
    expect(bucket.take()).toBe(true)
    expect(() => bucket.take()).toThrow(RateLimitedError)
  })

  it('令牌按速率随时间回补', () => {
    const { bucket, advance } = makeBucket(0, 2, 60) // 60/分钟 = 1/秒
    bucket.take()
    bucket.take()
    expect(() => bucket.take()).toThrow(RateLimitedError)
    advance(1000) // 回补 1 个
    expect(bucket.take()).toBe(true)
    expect(() => bucket.take()).toThrow(RateLimitedError)
  })

  it('回补不超过容量上限', () => {
    const { bucket, advance } = makeBucket(0, 2, 6000)
    bucket.take()
    bucket.take()
    advance(60_000)
    expect(bucket.take()).toBe(true)
    expect(bucket.take()).toBe(true)
    expect(() => bucket.take()).toThrow(RateLimitedError)
  })
})
