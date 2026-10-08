/** Device preferences must remain optional in private/blocked storage environments. */
export function readStorage(key: string, fallback = ''): string {
  try { return localStorage.getItem(key) ?? fallback } catch { return fallback }
}
export function writeStorage(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch { /* keep the in-memory preference */ }
}

export function readPreference<T>(key: string, fallback: T): T {
  try { const raw = readStorage(key); return raw ? JSON.parse(raw) as T : fallback } catch { return fallback }
}
export function writePreference(key: string, value: unknown): void { writeStorage(key, JSON.stringify(value)) }
export function readerTheme(fallback: 'paper' | 'sepia' | 'night'): 'paper' | 'sepia' | 'night' {
  const theme: unknown = readPreference('taoread-reader-theme', fallback)
  return theme === 'paper' || theme === 'sepia' || theme === 'night' ? theme : fallback
}
export function readerFont(): number {
  // docs/39 E2：PC 视口默认 24px + 640px 正文列 ≈ 26 字/行（儿童舒适区）；移动保持 22px。
  // 仅影响未手动调过字号的用户，已有偏好照旧。
  const fallback = typeof window !== 'undefined' && window.innerWidth >= 760 ? 24 : 22
  const size: unknown = readPreference('taoread-reader-font', fallback)
  return typeof size === 'number' && Number.isFinite(size) ? Math.max(18, Math.min(30, size)) : fallback
}
