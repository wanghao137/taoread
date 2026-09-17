import { afterEach, describe, expect, it } from 'vitest'
import {
  acquireWakeLock,
  releaseWakeLock,
  wakeLockSupported,
  type WakeLockDeps,
} from '../src/lib/wakeLock'

afterEach(async () => {
  await releaseWakeLock()
})

const fakeLock = () => {
  const released: boolean[] = []
  return {
    released,
    lock: { release: async () => released.push(true) },
  }
}

describe('wakeLockSupported', () => {
  it('无 wakeLock API 返回 false', () => {
    expect(wakeLockSupported({})).toBe(false)
    expect(wakeLockSupported({ navigator: {} })).toBe(false)
  })
  it('有 wakeLock.request 返回 true', () => {
    expect(wakeLockSupported({ navigator: { wakeLock: { request: async () => {} } } })).toBe(true)
  })
})

describe('acquireWakeLock', () => {
  it('不支持时返回 false 且不抛错', async () => {
    expect(await acquireWakeLock({})).toBe(false)
  })
  it('支持时获取锁并返回 true', async () => {
    const f = fakeLock()
    const deps: WakeLockDeps = {
      navigator: { wakeLock: { request: async () => f.lock } },
    }
    expect(await acquireWakeLock(deps)).toBe(true)
  })
  it('已持有时重复调用空操作（不会重复请求）', async () => {
    let requests = 0
    const f = fakeLock()
    const deps: WakeLockDeps = {
      navigator: { wakeLock: { request: async () => (requests++, f.lock) } },
    }
    await acquireWakeLock(deps)
    await acquireWakeLock(deps)
    expect(requests).toBe(1)
  })
  it('request 抛错时静默返回 false', async () => {
    const deps: WakeLockDeps = {
      navigator: { wakeLock: { request: async () => Promise.reject(new Error('denied')) } },
    }
    await expect(acquireWakeLock(deps)).resolves.toBe(false)
  })
})

describe('releaseWakeLock', () => {
  it('未持有时空操作不抛错', async () => {
    await expect(releaseWakeLock()).resolves.toBeUndefined()
  })
  it('持有时调用 release', async () => {
    const f = fakeLock()
    const deps: WakeLockDeps = {
      navigator: { wakeLock: { request: async () => f.lock } },
    }
    await acquireWakeLock(deps)
    await releaseWakeLock()
    expect(f.released).toEqual([true])
  })
  it('释放后可再次获取（锁已清空）', async () => {
    let requests = 0
    const f = fakeLock()
    const deps: WakeLockDeps = {
      navigator: { wakeLock: { request: async () => (requests++, f.lock) } },
    }
    await acquireWakeLock(deps)
    await releaseWakeLock()
    await acquireWakeLock(deps)
    expect(requests).toBe(2)
  })
})
