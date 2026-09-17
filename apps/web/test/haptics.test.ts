import { describe, expect, it, vi } from 'vitest'
import { haptic, type HapticDeps } from '../src/lib/haptics'

const deps = (overrides: Partial<HapticDeps> = {}): HapticDeps => ({
  vibrate: vi.fn(() => true),
  matchMedia: () => ({ matches: false }),
  ...overrides,
})

describe('haptic（触觉反馈）', () => {
  it('支持时按场景时长振动', () => {
    const d = deps()
    expect(haptic('chapter', d)).toBe(true)
    expect(d.vibrate).toHaveBeenCalledWith(15)
    expect(haptic('achievement', d)).toBe(true)
    expect(d.vibrate).toHaveBeenLastCalledWith(35)
  })
  it('三种场景时长单调递增（翻章 < 盖章 < 成就）', () => {
    const calls: number[] = []
    const d = deps({ vibrate: (ms) => (calls.push(ms), true) })
    haptic('chapter', d)
    haptic('stamp', d)
    haptic('achievement', d)
    expect(calls).toEqual([15, 25, 35])
  })
  it('reduced-motion 开启时静默不振动（前庭敏感儿童）', () => {
    const d = deps({ matchMedia: () => ({ matches: true }) })
    expect(haptic('stamp', d)).toBe(false)
    expect(d.vibrate).not.toHaveBeenCalled()
  })
  it('无 vibrate API（iOS Safari）静默降级返回 false', () => {
    expect(haptic('chapter', deps({ vibrate: undefined }))).toBe(false)
  })
  it('vibrate 返回 false 时透传 false', () => {
    expect(haptic('chapter', deps({ vibrate: () => false }))).toBe(false)
  })
  it('reduced-motion 查询使用正确的媒体查询字符串', () => {
    const d = deps({ matchMedia: vi.fn(() => ({ matches: false })) as HapticDeps['matchMedia'] })
    haptic('chapter', d)
    expect(d.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })
  it('vibrate 抛错时静默降级，绝不中断调用方（Illegal invocation 回归）', () => {
    const bomb = () => {
      throw new TypeError('Illegal invocation')
    }
    expect(() => haptic('chapter', deps({ vibrate: bomb }))).not.toThrow()
    expect(haptic('chapter', deps({ vibrate: bomb }))).toBe(false)
  })
})
