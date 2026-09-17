/**
 * 首次运行引导回归（docs/13 P1-1）。
 *
 * 孩子第一次进入应用要看三步引导，但绝不能每次都弹（烦死）。
 * 标记存 localStorage；隐私模式/禁用存储时静默降级为「已看过」，
 * 引导不展示也不报错——不能因为存储不可用就卡住孩子。
 *
 * web 单测环境是 node（无 localStorage），这里注入假的存储验证三种情形。
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { onboardingSeen, resetOnboarding } from '../src/pages/child/OnboardingTour'

describe('首次运行引导标记（P1-1）', () => {
  beforeEach(() => {
    // 每个用例给一个干净的假 localStorage
    let store: Record<string, string> = {}
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => (k in store ? store[k]! : null),
      setItem: (k: string, v: string) => {
        store[k] = v
      },
      removeItem: (k: string) => {
        delete store[k]
      },
    })
    return () => {
      store = {}
      vi.unstubAllGlobals()
    }
  })

  it('没看过时 onboardingSeen 返回 false', () => {
    expect(onboardingSeen()).toBe(false)
  })

  it('resetOnboarding 后再查仍为 false（幂等，清空空键不报错）', () => {
    resetOnboarding()
    expect(onboardingSeen()).toBe(false)
    resetOnboarding()
    expect(onboardingSeen()).toBe(false)
  })

  it('存入标记后 onboardingSeen 返回 true', () => {
    localStorage.setItem('taoread:onboarding-seen', '1')
    expect(onboardingSeen()).toBe(true)
  })

  it('存储抛异常时静默降级为「已看过」，不卡住孩子', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('SecurityError: localStorage disabled')
      },
      setItem: () => {
        throw new Error('SecurityError')
      },
      removeItem: () => {
        throw new Error('SecurityError')
      },
    })
    expect(() => onboardingSeen()).not.toThrow()
    expect(() => resetOnboarding()).not.toThrow()
    // 隐私模式：当作已看过，不弹引导（宁可少弹，不可卡死）
    expect(onboardingSeen()).toBe(true)
  })

  it('标记键名稳定（重装/换设备不串）', () => {
    expect(() => localStorage.setItem('taoread:onboarding-seen', '1')).not.toThrow()
    expect(onboardingSeen()).toBe(true)
  })
})
