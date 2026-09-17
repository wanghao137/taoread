/**
 * 空态出口回归（docs/13 P1-1 范围）。
 *
 * 孩子端「无档案」曾是一处死路：除了顶部「换家庭」没有任何出口（审计报告指出）。
 * EmptyState 增加了 action 槽位，这里锁定「传 action 时回调可用、不传时不报错」。
 *
 * 注意：web 单测环境是 node（无 jsdom），不能真渲染 DOM；这里验组件契约——
 * 用 React.createElement 构造元素，检查 props 透传与回调可调用。
 */
import { describe, expect, it, vi } from 'vitest'
import { createElement } from 'react'
import { EmptyState } from '../src/components/ui/EmptyState'

describe('EmptyState 行动出口（P1-1 死路修复）', () => {
  it('不传 action 时可构造、不抛错', () => {
    expect(() => createElement(EmptyState, { art: 'nursery-window', title: '还没有小读者档案' })).not.toThrow()
  })

  it('传 action 时透传到元素 props（孩子端无档案状态的出口）', () => {
    const onClick = vi.fn()
    const el = createElement(EmptyState, {
      art: 'nursery-window',
      title: '还没有小读者档案',
      action: { label: '回到登录页', onClick },
    })
    expect(el.props.action).toEqual({ label: '回到登录页', onClick })
    el.props.action?.onClick()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
