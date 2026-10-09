/**
 * docs/41 修复 3：移动端滑动翻页（公共 hook，公共书 ReaderPage 与家庭书 FamilyReaderPage 共用）。
 *
 * 机制：正文容器 CSS multi-column（column-width=视口宽、gap=PAGE_GAP），内容横向铺成 N 页，
 * track translateX 切页；手势=左右拖动跟手 + 释放吸附 + 点击左/右页边翻页、点中间回调。
 * 分页数由 track.scrollWidth 推出；块→页用 offsetLeft/步长。字号/行距/内容/视口变化由
 * recalcKey 触发重算，并按锚点块保持位置。
 */
import { useCallback, useEffect, useRef, useState } from 'react'

export const PAGE_GAP = 48
/** 翻页判定：拖动超过该距离才算翻页（px） */
const SWIPE_THRESHOLD = 48
/** 点击翻页的页边宽度比例 */
const EDGE_TAP_RATIO = 0.24

export interface PagedReadingHandle {
  page: number
  pageCount: number
  setPage: (p: number) => void
  /** 滚动到某个块元素所在页（朗读跳块/续读定位用） */
  goToElement: (el: HTMLElement | null) => void
  /** 当前页第一个块的序号（进度上报用；外部传块元素列表） */
  firstVisibleIndex: (els: Array<HTMLElement | null>) => number
}

export function usePagedReading(options: {
  enabled: boolean
  viewportRef: React.RefObject<HTMLElement | null>
  trackRef: React.RefObject<HTMLElement | null>
  /** 重算分页的依赖键（字号/行距/章节内容/主题等） */
  recalcKey: string
  /** 末页继续右滑 / 首页继续左滑 */
  onNext?: () => void
  onPrev?: () => void
  /** 点击页面中间（呼出控制条等） */
  onCenterTap?: () => void
  /** 翻页后回调（页变化；用于进度上报） */
  onPageSettled?: (page: number) => void
  /** 初始锚点元素（续读定位）；recalcKey 变化时也可由外部重设 */
  anchorRef?: React.RefObject<HTMLElement | null>
}): PagedReadingHandle {
  const { enabled, viewportRef, trackRef, recalcKey, onNext, onPrev, onCenterTap, onPageSettled, anchorRef } = options
  const [page, setPageState] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const pageRef = useRef(0)
  const draggingRef = useRef<{ x: number; y: number; base: number; moved: boolean; pointerId: number } | null>(null)
  const stepRef = useRef(0)

  const applyTransform = useCallback((offset: number, animate: boolean) => {
    const track = trackRef.current
    if (!track) return
    track.style.transition = animate ? 'transform .28s cubic-bezier(.22,.61,.36,1)' : 'none'
    track.style.transform = `translateX(${offset}px)`
  }, [trackRef])

  const measure = useCallback(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const w = viewport.clientWidth
    if (w <= 0) return
    // 列宽=视口宽（columns 分页的关键）：内容溢出成 N 列，每列即一页。
    // 高度由使用方控制（ReaderPage track height:100%；家庭书 track flex:1），
    // 这里不写 height——避免与 flex 布局冲突
    track.style.columnWidth = `${w}px`
    track.style.columnGap = `${PAGE_GAP}px`
    const step = w + PAGE_GAP
    stepRef.current = step
    const total = Math.max(1, Math.round((track.scrollWidth + PAGE_GAP) / step))
    setPageCount(total)
    // 锚点保持：重排后把锚点块（或当前页首块）带回视野
    const anchor = anchorRef?.current
    const anchorPage = anchor ? Math.max(0, Math.min(total - 1, Math.round(anchor.offsetLeft / step))) : pageRef.current
    const target = Math.max(0, Math.min(total - 1, anchorPage))
    pageRef.current = target
    setPageState(target)
    applyTransform(-target * step, false)
  }, [viewportRef, trackRef, anchorRef, applyTransform])

  useEffect(() => {
    if (!enabled) return
    measure()
    const ro = new ResizeObserver(() => measure())
    if (viewportRef.current) ro.observe(viewportRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    // 对抗审查 P1：禁用（切回滚动模式）时必须复位命令式写入的样式——
    // React 只清自己设的 style 键，transform/columns 残留会让滚动模式正文横向错位
    return () => {
      ro.disconnect()
      const t = trackRef.current
      if (t) {
        t.style.transform = ''
        t.style.transition = ''
        t.style.columnWidth = ''
        t.style.columnGap = ''
      }
      const v = viewportRef.current
      if (v) v.scrollLeft = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, recalcKey, measure])

  const setPage = useCallback((p: number) => {
    const total = pageCount
    const target = Math.max(0, Math.min(total - 1, p))
    pageRef.current = target
    setPageState(target)
    applyTransform(-target * stepRef.current, true)
    onPageSettled?.(target)
  }, [pageCount, applyTransform, onPageSettled])

  // 章节切换/重挂载回到第 1 页
  useEffect(() => {
    if (!enabled) return
    pageRef.current = 0
    setPageState(0)
  }, [enabled, recalcKey])

  useEffect(() => {
    if (!enabled) return
    const viewport = viewportRef.current
    if (!viewport) return
    const onPointerDown = (e: PointerEvent) => {
      if (draggingRef.current) return
      // 对抗审查 P1：显式指针捕获——鼠标拖出视口释放也能收到 pointerup（触控本有隐式捕获）
      try {
        viewport.setPointerCapture(e.pointerId)
      } catch {
        /* 已释放等边缘，忽略 */
      }
      draggingRef.current = { x: e.clientX, y: e.clientY, base: -pageRef.current * stepRef.current, moved: false, pointerId: e.pointerId }
    }
    const onPointerMove = (e: PointerEvent) => {
      const d = draggingRef.current
      if (!d || e.pointerId !== d.pointerId) return
      const dx = e.clientX - d.x
      const dy = e.clientY - d.y
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) d.moved = true
      // 纵向意图明显时不劫持（比如系统下拉刷新），横向才跟手
      if (!d.moved || Math.abs(dx) < Math.abs(dy)) return
      e.preventDefault()
      const min = -(pageCount - 1) * stepRef.current
      const max = 0
      applyTransform(Math.max(min - PAGE_GAP * 0.4, Math.min(max + PAGE_GAP * 0.4, d.base + dx)), false)
    }
    const onPointerUp = (e: PointerEvent) => {
      const d = draggingRef.current
      draggingRef.current = null
      if (!d || e.pointerId !== d.pointerId) return
      const dx = e.clientX - d.x
      const dy = e.clientY - d.y
      if (!d.moved) {
        // 点击：左右页边=翻页；中间仅当不在正文内容上才回调（正文上的短点留给
        // 点段跳读/长按划线/图片灯箱，不与工具条呼出抢手势）
        const target = e.target as HTMLElement | null
        const inContent = Boolean(target?.closest('.reader-text, .reader-art, figure, [data-no-focus]'))
        const rect = viewport.getBoundingClientRect()
        const rx = (e.clientX - rect.left) / rect.width
        if (rx < EDGE_TAP_RATIO) setPage(pageRef.current - 1)
        else if (rx > 1 - EDGE_TAP_RATIO) setPage(pageRef.current + 1)
        else if (!inContent) onCenterTap?.()
        return
      }
      if (Math.abs(dx) < Math.abs(dy)) {
        setPage(pageRef.current)
        return
      }
      if (dx < -SWIPE_THRESHOLD) {
        if (pageRef.current >= pageCount - 1) {
          onNext?.()
          // 对抗审查 P2：末页无下一章时也要回弹，不能停在拖拽偏移
          applyTransform(-pageRef.current * stepRef.current, true)
        } else setPage(pageRef.current + 1)
      } else if (dx > SWIPE_THRESHOLD) {
        if (pageRef.current <= 0) {
          onPrev?.()
          applyTransform(-pageRef.current * stepRef.current, true)
        } else setPage(pageRef.current - 1)
      } else setPage(pageRef.current)
    }
    viewport.addEventListener('pointerdown', onPointerDown, { passive: true })
    viewport.addEventListener('pointermove', onPointerMove, { passive: false })
    viewport.addEventListener('pointerup', onPointerUp)
    viewport.addEventListener('pointercancel', onPointerUp)
    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', onPointerUp)
      viewport.removeEventListener('pointercancel', onPointerUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, pageCount, setPage, onNext, onPrev, onCenterTap, viewportRef])

  const goToElement = useCallback((el: HTMLElement | null) => {
    if (!el) return
    const target = Math.max(0, Math.min(pageCount - 1, Math.round(el.offsetLeft / stepRef.current)))
    if (target !== pageRef.current) setPage(target)
  }, [pageCount, setPage])

  const firstVisibleIndex = useCallback((els: Array<HTMLElement | null>) => {
    const leftEdge = pageRef.current * stepRef.current
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      if (el && el.offsetLeft + el.offsetWidth > leftEdge) return i
    }
    return Math.max(0, els.length - 1)
  }, [])

  return { page, pageCount, setPage, goToElement, firstVisibleIndex }
}
