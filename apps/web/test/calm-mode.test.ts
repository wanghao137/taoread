/**
 * 安静模式测试（docs/15 P1-C）。
 *
 * 学龄前儿童找不到操作系统的「减少动态效果」开关，因此动效可关闭性
 * （WCAG 2.3.3）在儿童产品里只能通过应用内的家庭级开关落地。
 * 这里测的是开关的数据契约：会话 store 能存能清，MotionConfig 的取值正确。
 * web 测试环境是 node（无 jsdom），不渲染组件，只验纯逻辑。
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { useSession } from '../src/stores/session'
import type { FamilySettingsDto } from '../src/lib/api'

/** App.tsx 里 MotionConfig 的取值逻辑（保持与源码同一表达式） */
function reducedMotionFor(calm: boolean): 'always' | 'user' {
  return calm ? 'always' : 'user'
}

describe('安静模式（docs/15 P1-C）', () => {
  beforeEach(() => {
    useSession.getState().signOut()
  })

  it('默认关闭：MotionConfig 跟随系统设置（reducedMotion="user"）', () => {
    expect(useSession.getState().calmMode).toBe(false)
    expect(reducedMotionFor(useSession.getState().calmMode)).toBe('user')
  })

  it('setCalmMode(true) 后 MotionConfig 强制 "always"，覆盖系统值', () => {
    useSession.getState().setCalmMode(true)
    expect(useSession.getState().calmMode).toBe(true)
    expect(reducedMotionFor(useSession.getState().calmMode)).toBe('always')
  })

  it('家长端回包 calmMode===true 才开启（null/false 都视为关闭）', () => {
    const dtos: Partial<FamilySettingsDto>[] = [{ calmMode: null }, { calmMode: false }]
    for (const dto of dtos) {
      useSession.getState().setCalmMode(dto.calmMode === true)
      expect(useSession.getState().calmMode).toBe(false)
    }
    useSession.getState().setCalmMode((({ calmMode: true }) as FamilySettingsDto).calmMode === true)
    expect(useSession.getState().calmMode).toBe(true)
  })

  it('注销时安静模式一并清空，不留跨家庭残留', () => {
    useSession.getState().setCalmMode(true)
    useSession.getState().signOut()
    expect(useSession.getState().calmMode).toBe(false)
  })
})
