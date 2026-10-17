import { describe, expect, it } from 'vitest'
import { currentAppVersion, isNewerVersion } from '../src/lib/appUpdate'

describe('isNewerVersion', () => {
  it('按数值逐段比较：1.10.0 > 1.9.1（不能按字符串比较）', () => {
    expect(isNewerVersion('1.10.0', '1.9.1')).toBe(true)
    expect(isNewerVersion('1.9.1', '1.10.0')).toBe(false)
  })

  it('相同版本不算新版本', () => {
    expect(isNewerVersion('0.1.0', '0.1.0')).toBe(false)
    expect(isNewerVersion('v0.1.0', '0.1.0')).toBe(false)
  })

  it('兼容 v 前缀与缺省 patch 位（缺位按 0）', () => {
    expect(isNewerVersion('v0.2.0', '0.1.9')).toBe(true)
    expect(isNewerVersion('0.2', '0.1.9')).toBe(true)
    expect(isNewerVersion('v0.1', '0.1.0')).toBe(false)
  })
})

describe('currentAppVersion', () => {
  it('单测（node）环境没有 .env.mobile 注入时回退 0.0.0', () => {
    expect(currentAppVersion()).toBe('0.0.0')
  })
})
