/**
 * List-page cache (docs/107 W-1/W-2 + docs/108 M-2).
 *
 * SWR semantics: hit renders instantly; stale entries revalidate in background.
 * docs/108 M-2 adds a localStorage persistence layer for the home scope
 * (~3KB/child): memory cache does not survive process death (APK cold start),
 * persisted home data lets warm boot render today-page with zero network.
 * Keys include token+childId; discover/search keys stay memory-only.
 */
const caches = new Map<string, { data: unknown; at: number }>()

const MAX_KEYS = 16
const PERSIST_PREFIX = 'taoread-lc:'
/** cap: home (current + previous child) is plenty; prevents unbounded growth */
const PERSIST_MAX = 4

function lsRead(key: string): { data: unknown; at: number } | null {
  try {
    const raw = globalThis.localStorage?.getItem(PERSIST_PREFIX + key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { data: unknown; at: number }
    return typeof parsed?.at === 'number' ? parsed : null
  } catch { return null }
}

function lsWrite(key: string, entry: { data: unknown; at: number }): void {
  try {
    const store = globalThis.localStorage
    if (!store) return
    store.setItem(PERSIST_PREFIX + key, JSON.stringify(entry))
    let keys = Object.keys(store).filter((k) => k.startsWith(PERSIST_PREFIX))
    while (keys.length > PERSIST_MAX) {
      store.removeItem(keys[0]!)
      keys = Object.keys(store).filter((k) => k.startsWith(PERSIST_PREFIX))
    }
  } catch { /* quota/privacy mode: silent, memory cache still works */ }
}

export function getCachedList<T>(key: string): { data: T; at: number } | null {
  const hit = caches.get(key)
  if (hit) {
    caches.delete(key)
    caches.set(key, hit)
    return hit as { data: T; at: number }
  }
  // memory miss -> localStorage fallback (APK cold start), re-inject into memory
  const persisted = lsRead(key)
  if (!persisted) return null
  caches.set(key, persisted)
  return persisted as { data: T; at: number }
}

export function setCachedList(key: string, data: unknown): void {
  const entry = { data, at: Date.now() }
  const hit = caches.get(key)
  if (hit) caches.delete(key)
  caches.set(key, entry)
  // home scope = today-page first-screen data; write through to localStorage
  if (/:home$/.test(key)) lsWrite(key, entry)
  if (caches.size > MAX_KEYS) {
    const oldest = caches.keys().next().value
    if (oldest !== undefined) caches.delete(oldest)
  }
}

export function clearCachedList(key: string): void {
  caches.delete(key)
  try { globalThis.localStorage?.removeItem(PERSIST_PREFIX + key) } catch { /* noop */ }
}
