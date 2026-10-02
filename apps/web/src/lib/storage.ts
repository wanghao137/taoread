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
  const size: unknown = readPreference('taoread-reader-font', 22)
  return typeof size === 'number' && Number.isFinite(size) ? Math.max(18, Math.min(30, size)) : 22
}
