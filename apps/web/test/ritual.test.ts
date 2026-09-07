import { describe, expect, it } from 'vitest'
import {
  friendlyLastRead,
  pickContinueReading,
  pickRandom,
  topRecommendations,
} from '../src/lib/ritual'
import type { ShelfItemDto } from '../src/lib/api'

const book = (id: string, readUpdateTime?: number): ShelfItemDto => ({
  bookId: id,
  title: `书${id}`,
  ...(readUpdateTime !== undefined ? { readUpdateTime } : {}),
})

describe('pickContinueReading（继续读口径）', () => {
  it('取 readUpdateTime 最新的一本', () => {
    const items = [book('a', 100), book('b', 300), book('c', 200)]
    expect(pickContinueReading(items)?.bookId).toBe('b')
  })

  it('缺时间戳的书排在最后，不会当选', () => {
    const items = [book('a'), book('b', 1)]
    expect(pickContinueReading(items)?.bookId).toBe('b')
  })

  it('全部缺时间戳时取第一本（列表顺序即回包顺序）', () => {
    const items = [book('x'), book('y')]
    expect(pickContinueReading(items)?.bookId).toBe('x')
  })

  it('空书架返回 null', () => {
    expect(pickContinueReading([])).toBeNull()
  })
})

describe('pickRandom（骰子）', () => {
  it('rng 注入下结果确定', () => {
    const items = [book('a'), book('b'), book('c'), book('d')]
    expect(pickRandom(items, () => 0)?.bookId).toBe('a')
    expect(pickRandom(items, () => 0.999)?.bookId).toBe('d')
    expect(pickRandom(items, () => 0.5)?.bookId).toBe('c') // floor(0.5*4)=2
  })

  it('rng 边界值 1.0 不会越界（防御性钳制）', () => {
    const items = [book('a'), book('b')]
    expect(pickRandom(items, () => 1)?.bookId).toBe('b')
  })

  it('空数组返回 null', () => {
    expect(pickRandom([], () => 0.5)).toBeNull()
  })
})

describe('friendlyLastRead（上次翻开文案；只陈述事实无催促）', () => {
  const now = 1_800_000_000

  it('今天翻开过', () => {
    expect(friendlyLastRead(now - 3600, now)).toBe('今天已经翻开过啦')
  })

  it('昨天', () => {
    expect(friendlyLastRead(now - 86_400 * 1.2, now)).toBe('上次翻开是昨天')
  })

  it('N 天前', () => {
    expect(friendlyLastRead(now - 86_400 * 5, now)).toBe('上次翻开是 5 天前')
  })

  it('很久以前/老朋友（不制造愧疚）', () => {
    expect(friendlyLastRead(now - 86_400 * 120, now)).toBe('上次翻开是很久以前')
    expect(friendlyLastRead(now - 86_400 * 500, now)).toBe('这是一本很久没见的老朋友')
  })

  it('无时间戳/非法值返回 null', () => {
    expect(friendlyLastRead(undefined, now)).toBeNull()
    expect(friendlyLastRead(0, now)).toBeNull()
    expect(friendlyLastRead(-5, now)).toBeNull()
  })

  it('毫秒单位自动折算（skill 文档未锁单位，防御网关回包为毫秒）', () => {
    expect(friendlyLastRead((now - 86_400 * 1.2) * 1000, now)).toBe('上次翻开是昨天')
  })
})

describe('topRecommendations', () => {
  it('裁剪到前 N 本', () => {
    const items = [book('a'), book('b'), book('c'), book('d')]
    expect(topRecommendations(items, 3)).toHaveLength(3)
    expect(topRecommendations(items, 3)[2]?.bookId).toBe('c')
  })

  it('不足 N 本时原样返回', () => {
    expect(topRecommendations([book('a')], 3)).toHaveLength(1)
  })
})
