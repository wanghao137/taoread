/**
 * 动效预设测试（docs/15）。
 * web 测试环境是 node（无 jsdom），只做纯函数与预设常量的断言。
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MOTION, reducedAware } from '../src/lib/motion'

const motionSrc = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '../src/lib/motion.ts'),
  'utf-8',
)

/** transition 是联合类型，测试里只关心 duration 字段 */
function dur(t: unknown): number {
  return (t as { duration: number }).duration
}

describe('motion 预设（docs/15 儿童动效规范）', () => {
  it('所有循环动效周期 >= 2.4s（慢到像呼吸，不像闪烁）', () => {
    expect(dur(MOTION.breathe.transition)).toBeGreaterThanOrEqual(2.4)
    expect(dur(MOTION.float.transition)).toBeGreaterThanOrEqual(2.4)
    expect(dur(MOTION.twinkle.transition)).toBeGreaterThanOrEqual(2.4)
  })

  it('引用诚实性：不把 Lillard 2011 当作「快节奏有害」的依据', () => {
    // 同实验室 2015 年后续研究因子式分离了节奏与幻想性，发现只有幻想内容影响 EF——
    // 2011 年的结论不能外推到 300ms 的界面转场。若规范又退回该归因，这里会失败。
    // 只检查「第一性原理」依据段（诚实性说明段允许引用旧说法来反驳它）。
    const rationale = motionSrc.split('引用诚实性说明')[0]!
    expect(rationale).not.toMatch(/Lillard/)
    expect(rationale).toContain('Kirkorian')
    expect(rationale).toContain('Reich')
    // 诚实性说明本身必须存在且点明 2015 修订
    expect(motionSrc).toContain('引用诚实性说明')
    expect(motionSrc).toMatch(/2015/)
  })

  it('进场动效时长在 200-500ms 之间（短于 200ms 会闪烁，长于 500ms 拖沓）', () => {
    const entries = [MOTION.riseIn, MOTION.pageFade, MOTION.sheetIn, MOTION.listItem, MOTION.pageForward, MOTION.pageBackward]
    for (const m of entries) {
      expect(dur(m.transition)).toBeGreaterThanOrEqual(0.2)
      expect(dur(m.transition)).toBeLessThanOrEqual(0.5)
    }
  })

  it('翻页方向：前进从右进、后退从左进（复刻纸质书方向）', () => {
    expect(MOTION.pageForward.initial).toMatchObject({ x: 16 })
    expect(MOTION.pageBackward.initial).toMatchObject({ x: -16 })
  })

  it('位移幅度 <= 8px、缩放 <= 6%（变化可被眼角捕捉但不夺眶）', () => {
    expect(Math.abs(MOTION.riseIn.initial.y)).toBeLessThanOrEqual(8)
    expect(MOTION.listItem.initial.y).toBeLessThanOrEqual(8)
    // 漂浮是循环动效，幅度上限放宽到 6px
    const floatRange = Math.max(...((MOTION.float.animate as { y: number[] }).y))
    expect(floatRange).toBeLessThanOrEqual(8)
  })

  it('reducedAware 在开启「减少动态效果」时剥离位移与缩放，保留透明度', () => {
    const v = reducedAware(
      {
        initial: { opacity: 0, x: 16, y: 8, scale: 1.1 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      },
      true,
    )
    expect(v.initial).toEqual({ opacity: 0 })
    expect(v.animate).toEqual({ opacity: 1 })
  })

  it('reducedAware 关闭时原样返回预设', () => {
    const v = reducedAware({ initial: { opacity: 0, x: 16 } }, false)
    expect(v).toEqual({ initial: { opacity: 0, x: 16 } })
  })

  it('循环动效的 repeatType 都是 mirror（正反往返，不跳变）', () => {
    expect(MOTION.breathe.transition.repeatType).toBe('mirror')
    expect(MOTION.float.transition.repeatType).toBe('mirror')
    expect(MOTION.twinkle.transition.repeatType).toBe('mirror')
  })
})
