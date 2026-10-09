/**
 * docs/41 修复 3：移动端滑动翻页（公共 hook，公共书 ReaderPage 与家庭书 FamilyReaderPage 共用）。
 *
 * 机制：正文容器 CSS multi-column（column-width=视口宽、gap=PAGE_GAP），内容横向铺成 N 页，
 * track translateX 切页；手势=左右拖动跟手 + 释放吸附 + 点击左/右页边翻页、点中间回调。
 * 分页数由 track.scrollWidth 推出；块→页用列片段矩形/步长。字号/行距/内容/视口变化由
 * recalcKey 触发重算，并按锚点块保持位置。
 */
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

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
  /** 只有章节变化归零；字号、主题和尺寸变化保持当前位置。 */
  contentKey: string
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
  const { enabled, viewportRef, trackRef, recalcKey, contentKey, anchorRef } = options
  const callbacks = useRef(options)
  callbacks.current = options
  const [page, setPageState] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const pageRef = useRef(0)
  const draggingRef = useRef<{ x: number; y: number; base: number; moved: boolean; pointerId: number; axis: 'x' | 'y' | null; target: HTMLElement | null; startedAt: number } | null>(null)
  const stepRef = useRef(0)
  const countRef = useRef(1)
  const contentRef = useRef(contentKey)
  const suppressClickRef = useRef(false)

  // offsetLeft 属于 offsetParent；带定位的图框、注释和跨列段落必须用实际片段坐标。
  const rectsInTrack = useCallback((el: HTMLElement) => {
    const origin = trackRef.current?.getBoundingClientRect().left ?? 0
    return Array.from(el.getClientRects(), (r) => ({ left: r.left - origin, right: r.right - origin }))
  }, [trackRef])

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
    const w = track.getBoundingClientRect().width
    if (w <= 0 || track.clientHeight <= 0) return
    const oldStep = stepRef.current
    const anchor = anchorRef?.current
    const oldStart = anchor && track.contains(anchor) && oldStep > 0 ? Math.floor((rectsInTrack(anchor)[0]?.left ?? 0) / oldStep + 0.01) : pageRef.current
    const withinBlock = Math.max(0, pageRef.current - oldStart)
    // 列宽=视口宽（columns 分页的关键）：内容溢出成 N 列，每列即一页。
    // 高度由使用方控制（ReaderPage track height:100%；家庭书 track flex:1），
    // 这里不写 height——避免与 flex 布局冲突
    track.style.columnWidth = `${w}px`
    track.style.columnGap = `${PAGE_GAP}px`
    track.style.setProperty('--reading-page-height', `${track.clientHeight}px`)
    const step = w + PAGE_GAP
    stepRef.current = step
    // Ink, rotated illustrations and rounding can extend a few pixels past the last
    // column. Rounding to the column stride avoids inventing a blank extra page.
    const total = Math.max(1, Math.round((track.scrollWidth + PAGE_GAP) / step))
    countRef.current = total
    setPageCount(total)
    // 锚点保持：重排后把锚点块（或当前页首块）带回视野
    const newChapter = contentRef.current !== contentKey
    contentRef.current = contentKey
    const anchorRects = anchor && track.contains(anchor) ? rectsInTrack(anchor) : []
    const anchorPage = anchorRects.length ? Math.min(Math.floor(anchorRects[anchorRects.length - 1]!.left / step + 0.01), Math.floor(anchorRects[0]!.left / step + 0.01) + withinBlock) : pageRef.current
    const target = Math.max(0, Math.min(total - 1, newChapter ? 0 : anchorPage))
    pageRef.current = target
    setPageState(target)
    viewport.scrollLeft = 0
    applyTransform(-target * step, false)
  }, [viewportRef, trackRef, anchorRef, applyTransform, contentKey, rectsInTrack])

  useLayoutEffect(() => {
    const t = trackRef.current
    const v = viewportRef.current
    if (!t || !v) return
    if (!enabled) {
      t.style.transform = ''
      t.style.transition = ''
      t.style.columnWidth = ''
      t.style.columnGap = ''
      t.style.removeProperty('--reading-page-height')
      v.scrollLeft = 0
      return
    }
    measure()
    const ro = new ResizeObserver(() => measure())
    if (viewportRef.current) ro.observe(viewportRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    t.addEventListener('load', measure, true)
    document.fonts?.addEventListener('loadingdone', measure)
    // 对抗审查 P1：禁用（切回滚动模式）时必须复位命令式写入的样式——
    // React 只清自己设的 style 键，transform/columns 残留会让滚动模式正文横向错位
    return () => {
      ro.disconnect()
      t.removeEventListener('load', measure, true)
      document.fonts?.removeEventListener('loadingdone', measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, recalcKey, measure])

  const setPage = useCallback((p: number) => {
    if (!Number.isFinite(p)) return
    const target = Math.max(0, Math.min(countRef.current - 1, Math.floor(p)))
    const changed = target !== pageRef.current
    pageRef.current = target
    setPageState(target)
    applyTransform(-target * stepRef.current, true)
    if (changed) callbacks.current.onPageSettled?.(target)
  }, [applyTransform])

  useLayoutEffect(() => {
    if (!enabled) return
    const viewport = viewportRef.current
    if (!viewport) return
    const onPointerDown = (e: PointerEvent) => {
      if (draggingRef.current || !e.isPrimary || e.button !== 0) return
      const target = e.target instanceof HTMLElement ? e.target : null
      // A drag may produce no compatibility click. A new tap must not inherit
      // its suppression flag, including taps on the page/chapter controls.
      suppressClickRef.current = false
      if (target?.closest('button, a, input, textarea, select')) return
      draggingRef.current = { x: e.clientX, y: e.clientY, base: -pageRef.current * stepRef.current, moved: false, pointerId: e.pointerId, axis: null, target, startedAt: Date.now() }
    }
    const onPointerMove = (e: PointerEvent) => {
      const d = draggingRef.current
      if (!d || e.pointerId !== d.pointerId) return
      const dx = e.clientX - d.x
      const dy = e.clientY - d.y
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) d.moved = true
      // 纵向意图明显时不劫持（比如系统下拉刷新），横向才跟手
      if (!d.moved) return
      d.axis ??= Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (d.axis !== 'x') return
      // 只捕获真正的拖动，保留短点的原目标与长按段落动作。
      if (!viewport.hasPointerCapture(e.pointerId)) viewport.setPointerCapture(e.pointerId)
      e.preventDefault()
      const min = -(countRef.current - 1) * stepRef.current
      const max = 0
      applyTransform(Math.max(min - PAGE_GAP * 0.4, Math.min(max + PAGE_GAP * 0.4, d.base + dx)), false)
    }
    const onPointerUp = (e: PointerEvent) => {
      const d = draggingRef.current
      if (!d || e.pointerId !== d.pointerId) return
      draggingRef.current = null
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId)
      const dx = e.clientX - d.x
      if (!d.moved) {
        // 点击：左右页边=翻页；中间仅当不在正文内容上才回调（正文上的短点留给
        // 点段跳读/长按划线/图片灯箱，不与工具条呼出抢手势）
        if (Date.now() - d.startedAt >= 450 || window.getSelection()?.toString()) return
        const inContent = Boolean(d.target?.closest('.reader-text, .reader-art, figure, [data-no-focus], [data-block]'))
        if (inContent) return
        const rect = viewport.getBoundingClientRect()
        const rx = (e.clientX - rect.left) / rect.width
        if (rx < EDGE_TAP_RATIO) setPage(pageRef.current - 1)
        else if (rx > 1 - EDGE_TAP_RATIO) setPage(pageRef.current + 1)
        else callbacks.current.onCenterTap?.()
        suppressClickRef.current = true
        return
      }
      suppressClickRef.current = true
      if (d.axis !== 'x') {
        setPage(pageRef.current)
        return
      }
      if (dx < -SWIPE_THRESHOLD) {
        if (pageRef.current >= countRef.current - 1) {
          callbacks.current.onNext?.()
          // 对抗审查 P2：末页无下一章时也要回弹，不能停在拖拽偏移
          applyTransform(-pageRef.current * stepRef.current, true)
        } else setPage(pageRef.current + 1)
      } else if (dx > SWIPE_THRESHOLD) {
        if (pageRef.current <= 0) {
          callbacks.current.onPrev?.()
          applyTransform(-pageRef.current * stepRef.current, true)
        } else setPage(pageRef.current - 1)
      } else setPage(pageRef.current)
    }
    const onCancel = (e: PointerEvent) => {
      // Touch starts with implicit capture on the paragraph/image. Transferring
      // capture to the viewport emits a bubbled loss from that child, not a cancel.
      if (e.type === 'lostpointercapture' && e.target !== viewport) return
      const d = draggingRef.current
      if (!d || e.pointerId !== d.pointerId) return
      draggingRef.current = null
      suppressClickRef.current = d.moved
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId)
      applyTransform(-pageRef.current * stepRef.current, true)
    }
    const onClick = (e: MouseEvent) => {
      if (!suppressClickRef.current) return
      suppressClickRef.current = false
      if (e.detail === 0) return
      e.preventDefault()
      e.stopPropagation()
    }
    viewport.addEventListener('pointerdown', onPointerDown, { passive: true })
    viewport.addEventListener('pointermove', onPointerMove, { passive: false })
    viewport.addEventListener('pointerup', onPointerUp)
    viewport.addEventListener('pointercancel', onCancel)
    viewport.addEventListener('lostpointercapture', onCancel)
    viewport.addEventListener('click', onClick, true)
    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', onPointerUp)
      viewport.removeEventListener('pointercancel', onCancel)
      viewport.removeEventListener('lostpointercapture', onCancel)
      viewport.removeEventListener('click', onClick, true)
      const d = draggingRef.current
      draggingRef.current = null
      if (d && viewport.hasPointerCapture(d.pointerId)) viewport.releasePointerCapture(d.pointerId)
    }
  }, [enabled, recalcKey, setPage, applyTransform, viewportRef])

  const goToElement = useCallback((el: HTMLElement | null) => {
    if (!el || !trackRef.current?.contains(el) || stepRef.current <= 0) return
    const target = Math.max(0, Math.min(countRef.current - 1, Math.floor((rectsInTrack(el)[0]?.left ?? 0) / stepRef.current + 0.01)))
    if (target !== pageRef.current) setPage(target)
  }, [trackRef, rectsInTrack, setPage])

  const firstVisibleIndex = useCallback((els: Array<HTMLElement | null>) => {
    const leftEdge = pageRef.current * stepRef.current
    let nextIndex = -1
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      if (!el) continue
      const rects = rectsInTrack(el)
      if (rects.some((rect) => rect.right > leftEdge + 1 && rect.left < leftEdge + stepRef.current - PAGE_GAP - 1)) return i
      if (nextIndex < 0 && rects.some((rect) => rect.left >= leftEdge + stepRef.current - PAGE_GAP - 1)) nextIndex = i
    }
    // A title/illustration-only page precedes the next paragraph. It must not
    // report the last paragraph and make a newly opened book look almost read.
    return nextIndex >= 0 ? nextIndex : Math.max(0, els.length - 1)
  }, [rectsInTrack])

  return { page, pageCount, setPage, goToElement, firstVisibleIndex }
}
