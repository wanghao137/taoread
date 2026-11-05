/**
 * 原生朗读桥（docs/104 路线B M2b）。
 *
 * 仅 VITE_TAO_NATIVE=1 且运行在 APK 壳内时激活；apps/web 不依赖 @capacitor/core，
 * 全部经壳注入的 window.Capacitor.Plugins 全局访问，浏览器构建零成本。
 *
 * 第一性约束：息屏后 WebView JS 挂起，段级衔接必须在原生层——
 * 本桥把整条播放队列交给原生 ExoPlayer 链式播放，web 只订事件刷 UI。
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type NativePos = { index: number; positionMs: number; playing: boolean; count: number }

const PLUGIN = (): any =>
  typeof window !== 'undefined' ? (window as any).Capacitor?.Plugins?.Narration : undefined

/** 每次调用即时判定（对抗审查 F）：Capacitor 桥由壳在页面早期注入，
 * 模块求值时全局未必已就位——常量会在 APK 里静默回退浏览器引擎（息屏断播 bug 复活）。
 * VITE_TAO_NATIVE 是构建期常量，浏览器构建短路为 false 零成本。 */
export function nativeNarrationActive(): boolean {
  return import.meta.env.VITE_TAO_NATIVE === '1' && !!PLUGIN()
}

type Handler = (data: any) => void
const handlers: Record<string, Set<Handler>> = {}
const registered: Record<string, boolean> = {}

function ensureListener(event: string): void {
  if (registered[event]) return
  registered[event] = true
  const p = PLUGIN()
  if (!p) return
  void p.addListener(event, (data: any) => {
    handlers[event]?.forEach((fn) => fn(data ?? {}))
  })
}

function on(event: string, fn: Handler): () => void {
  ensureListener(event)
  if (!handlers[event]) handlers[event] = new Set()
  handlers[event].add(fn)
  return () => { handlers[event]?.delete(fn) }
}

export function onNativeSegmentStart(fn: Handler): () => void { return on('segmentStart', fn) }
export function onNativeState(fn: Handler): () => void { return on('state', fn) }
export function onNativeEnded(fn: Handler): () => void { return on('ended', fn) }
export function onNativeSegmentError(fn: Handler): () => void { return on('segmentError', fn) }

export async function nativeAppend(url: string): Promise<void> {
  const p = PLUGIN()
  if (p) await p.appendSegment({ url })
}

export async function nativePlay(): Promise<void> {
  const p = PLUGIN()
  if (p) await p.play()
}

export async function nativePause(): Promise<void> {
  const p = PLUGIN()
  if (p) await p.pause()
}

export async function nativeStop(): Promise<void> {
  const p = PLUGIN()
  if (p) await p.stop()
}

export async function nativeJumpTo(index: number): Promise<void> {
  const p = PLUGIN()
  if (p) await p.jumpTo({ index })
}

export async function nativeFadeStop(ms: number): Promise<void> {
  const p = PLUGIN()
  if (p) await p.fadeStop({ durationMs: ms })
}

export async function nativeGetPosition(): Promise<NativePos> {
  const q = PLUGIN()
  if (!q) return { index: 0, positionMs: 0, playing: false, count: 0 }
  return await q.getPosition()
}
