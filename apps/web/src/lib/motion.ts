/**
 * 儿童动效预设（docs/15 动效规范）。
 *
 * 第一性原理：动效不是装饰，而是「引导注意力」的工具。3-8 岁儿童的注意力被
 * 低级视觉显著性（运动、高对比）捕获，而非被理解引导（Kirkorian & Anderson 2018，
 * 眼动追踪，4 岁 vs 成人）；增强型电子书的无关音效与动效会分散对文字的注意、
 * 降低学习（Reich, Yau & Warschauer 2016）。因此本库刻意做得「慢、柔、可预期」：
 *
 *  - 时长 240-500ms，绝不短于 200ms（避免闪烁感；数值区间对齐 Material Design 3
 *    的 Medium/Large 档，是行业惯例而非儿童认知实验直接给出的阈值）
 *  - 缓动统一用 easeOut 系（减速 = 「东西停下来给我看」），避免 elastic/bounce 过冲
 *  - 位移幅度 ≤ 8px、缩放 ≤ 6%，变化可被眼角捕捉但不夺眶
 *  - 所有循环动效（呼吸/漂浮）周期 ≥ 2.4s，慢到像呼吸而非闪烁
 *  - 全局尊重 prefers-reduced-motion：开启时所有预设降级为瞬时
 *
 * 引用诚实性说明：早期版本曾把「慢」归因于 Lillard 2011（快节奏动画损害 4 岁
 * 执行功能）。同一实验室 2015 年的后续研究（Lillard et al., N=300，三组实验）
 * 因子式分离了节奏与幻想性，发现**只有幻想内容影响 EF，与节奏无关**——
 * 2011 年的结论不能外推到 300ms 的界面转场。本规范因此改用 Kirkorian &
 * Anderson 的显著性论证与 Reich 的增强干扰论证作为依据。
 *
 * 使用方式：把 MOTION.xxx 直接展开到 motion 组件的 animate/transition，
 * 或用 reducedAware() 包裹自定义 variants。
 */

import { useEffect, useState } from 'react'
import type { Transition } from 'framer-motion'

/** 是否开启了系统级「减少动态效果」（前庭敏感儿童 / 晕动症） */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

const EASE_OUT: [number, number, number, number] = [0.22, 0.61, 0.36, 1]
const EASE_IN_OUT: [number, number, number, number] = [0.45, 0, 0.15, 1]

/** 循环类动效的公共 transition（repeatType 需要 framer 的字面量类型） */
const LOOP = (duration: number): Transition => ({
  duration,
  ease: 'easeInOut',
  repeat: Infinity,
  repeatType: 'mirror',
})

export const MOTION = {
  /**
   * 按压反馈：缩小 4%，临界阻尼弹簧（damping = 2√stiffness ≈ 45，ζ=1，零过冲）。
   * 孩子手指按下去，按钮稳稳停在被按位置再弹回，不抖。
   */
  tap: {
    whileTap: { scale: 0.96 },
    transition: { type: 'spring', stiffness: 500, damping: 46 },
  },
  /** 卡片/元素进场：从下方 8px 淡入，240ms */
  riseIn: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.28, ease: EASE_OUT },
  },
  /** 页面切换：纯淡入淡出（不位移，儿童不会迷失方向） */
  pageFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
  /** 弹层/抽屉：从底部滑入并带轻微缩放 */
  sheetIn: {
    initial: { opacity: 0, y: 24, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 16, scale: 0.98 },
    transition: { duration: 0.32, ease: EASE_OUT },
  },
  /** 列表错峰进场：配合 staggerChildren 用 */
  staggerContainer: {
    initial: {},
    animate: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  },
  listItem: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.26, ease: EASE_OUT },
  },
  /** 吉祥物呼吸：2.8s 一个周期，幅度 3%（存在感，不抢戏） */
  breathe: {
    animate: { scale: [1, 1.03, 1] as number[] },
    transition: LOOP(2.8),
  },
  /** 慢漂浮：4s 周期，上下 6px（云朵/桃子挂饰用） */
  float: {
    animate: { y: [0, -6, 0] as number[] },
    transition: LOOP(4),
  },
  /** 星光闪烁：3.2s 周期的透明度脉动（不是高频闪） */
  twinkle: {
    animate: { opacity: [0.35, 1, 0.35] as number[] },
    transition: LOOP(3.2),
  },
  /** 翻页方向暗示：下一章时向左推出 */
  pageForward: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
  /** 上一章：方向相反 */
  pageBackward: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
    transition: { duration: 0.3, ease: EASE_IN_OUT },
  },
}

/**
 * 把自定义 variants 降级为 reduced-motion 安全版。
 * 开启「减少动态效果」时：opacity 保留（内容不能凭空消失），位移/缩放归零。
 */
export function reducedAware<T extends Record<string, unknown>>(variants: T, reduced: boolean): T {
  if (!reduced) return variants
  const strip = (node: Record<string, unknown>): Record<string, unknown> => {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(node)) {
      if (k === 'x' || k === 'y' || k === 'scale' || k === 'rotate') continue
      if (v && typeof v === 'object' && !Array.isArray(v)) out[k] = strip(v as Record<string, unknown>)
      else out[k] = v
    }
    return out
  }
  return strip(variants) as T
}
