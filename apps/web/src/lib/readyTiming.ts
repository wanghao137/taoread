import { useEffect, useRef } from 'react'

export function recordLocalDuration(name: 'home' | 'reader' | 'family-reader' | 'audio-playing', start: number) {
  try {
    const label = `taoread:${name}:interactive`
    performance.clearMeasures(label)
    performance.measure(label, { start, end: performance.now() })
  } catch { /* Older WebViews may not support User Timing level 3. */ }
}

/** Local browser timings only: fixed labels, no identity/content and no upload. */
export function useReadyTiming(ready: boolean, name: 'home' | 'reader' | 'family-reader') {
  const started = useRef(performance.now())
  useEffect(() => {
    if (!ready) { started.current = performance.now(); return }
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        recordLocalDuration(name, started.current)
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [ready, name])
}
