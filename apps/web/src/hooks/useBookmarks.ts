import { useCallback, useEffect, useRef, useState } from 'react'
import { api, ApiError, type BookmarkDto } from '../lib/api'
type Store = { rows: BookmarkDto[]; pending: Record<string, { row: BookmarkDto; base: string | null }> }
export function useBookmarks({ token, familyId, childId, bookId, source, version }: { token: string | null; familyId: string | null; childId: string | null; bookId: string; source: 'public' | 'import'; version: string }) {
  const key = `taoread-bookmark-sync:${familyId}:${childId}:${source}:${bookId}`
  const store = useRef<Store>({ rows: [], pending: {} })
  const generation = useRef(0)
  const busy = useRef<number | null>(null)
  const edits = useRef(0)
  const adopting = useRef(false)
  const [conflict, setConflict] = useState(false)
  const [rows, setRows] = useState<BookmarkDto[]>([])
  const [status, setStatus] = useState('')
  const publish = useCallback(() => {
    setRows([...store.current.rows])
    try { localStorage.setItem(key, JSON.stringify(store.current)) } catch { setStatus('设备存储不足，书签暂时只保留在当前页面，请联网同步') }
  }, [key])
  const sync = useCallback(async () => {
    if (!token || !childId || adopting.current || busy.current === generation.current) return
    const epoch = generation.current
    busy.current = epoch
    try {
      for (const id of Object.keys(store.current.pending)) {
        const item = store.current.pending[id]!
        const result = await api.saveBookmark(childId, item.row, item.base, token)
        if (epoch !== generation.current) return
        const next = store.current.pending[id]
        if (next === item) {
          delete store.current.pending[id]
          store.current.rows = store.current.rows.map(row => row.id === id ? result.bookmark : row)
        } else if (next) next.base = result.bookmark.updatedAt
        publish()
      }
      const result = await api.bookmarks(childId, bookId, token)
      if (epoch !== generation.current || adopting.current) return
      const merged = new Map(result.bookmarks.map(row => [row.id, row]))
      for (const item of Object.values(store.current.pending)) merged.set(item.row.id, item.row)
      store.current.rows = [...merged.values()]
      publish(); setStatus(Object.keys(store.current.pending).length ? '有书签等待同步' : '书签已同步到家庭')
    } catch (err) {
      if (epoch === generation.current) {
        if (err instanceof ApiError && err.status === 409) setConflict(true)
        setStatus(err instanceof Error ? `${err.message}；本机书签保留` : '暂未同步，本机书签保留')
      }
    } finally { if (busy.current === epoch) busy.current = null }
  }, [token, childId, bookId, publish])
  useEffect(() => {
    const lifecycle = generation
    lifecycle.current++
    adopting.current = false
    edits.current++
    store.current = { rows: [], pending: {} }
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? 'null') as Store | null
      if (saved && Array.isArray(saved.rows) && saved.pending) store.current = saved
      // Migrate only the scoped v2 store; never attribute old unscoped bookmarks to a child.
      if (!saved) {
        const old = JSON.parse(localStorage.getItem(`taoread-bookmarks-v2:${familyId}:${childId}:${source}:${bookId}:${version}`) ?? '[]') as Array<{ chapter: number; block: number }>
        for (const item of old) {
          if (!Number.isInteger(item.chapter) || !Number.isInteger(item.block)) continue
          const row: BookmarkDto = { id: crypto.randomUUID(), bookId, source, version, chapter: item.chapter, position: item.block, anchor: '', deleted: false, updatedAt: '' }
          store.current.rows.push(row); store.current.pending[row.id] = { row, base: null }
        }
      }
    } catch { /* Malformed data stays outside the active profile. */ }
    setRows(store.current.rows); setConflict(false); setStatus('正在同步书签'); void sync()
    const onFocus = () => { void sync() }
    window.addEventListener('online', onFocus); window.addEventListener('focus', onFocus)
    const timer = window.setInterval(onFocus, 20_000)
    return () => { lifecycle.current++; window.clearInterval(timer); window.removeEventListener('online', onFocus); window.removeEventListener('focus', onFocus) }
  }, [key, sync, familyId, childId, source, bookId, version])
  const toggle = (chapter: number, position: number, anchor: string) => {
    edits.current++
    const existing = store.current.rows.find(row => row.version === version && row.chapter === chapter && row.position === position)
    const row: BookmarkDto = existing ? { ...existing, deleted: !existing.deleted } : { id: crypto.randomUUID(), bookId, source, version, chapter, position, anchor: anchor.slice(0, 240), deleted: false, updatedAt: '' }
    const pending = store.current.pending[row.id]
    store.current.pending[row.id] = { row, base: pending?.base ?? (existing?.updatedAt || null) }
    store.current.rows = existing ? store.current.rows.map(x => x.id === row.id ? row : x) : [...store.current.rows, row]
    publish(); setStatus('已在本机保存，正在同步'); void sync()
  }
  const adoptServer = async () => {
    if (!token || !childId || busy.current === generation.current || adopting.current) { setStatus('书签请求仍在处理，请稍后再采用服务器版本'); return }
    const epoch = generation.current
    const revision = edits.current
    adopting.current = true
    try {
      const result = await api.bookmarks(childId, bookId, token)
      if (epoch !== generation.current) return
      if (revision !== edits.current) { setStatus('你刚刚修改了书签，本机修改已保留；请重新确认是否采用服务器版本'); return }
      store.current = { rows: result.bookmarks, pending: {} }
      publish(); setConflict(false); setStatus('已采用服务器书签，未同步的本机修改已舍弃')
    } catch { if (epoch === generation.current) setStatus('服务器书签未加载，请重试；本机修改仍保留') }
    finally { if (epoch === generation.current) adopting.current = false }
  }
  const remove = (id: string) => {
    const existing = store.current.rows.find(row => row.id === id)
    if (!existing) return
    edits.current++
    const row = { ...existing, deleted: true }
    store.current.pending[id] = { row, base: store.current.pending[id]?.base ?? (existing.updatedAt || null) }
    store.current.rows = store.current.rows.map(x => x.id === id ? row : x)
    publish(); setStatus('已在本机移除，正在同步'); void sync()
  }
  return { bookmarks: rows.filter(row => !row.deleted), status, conflict, adoptServer, sync, toggle, remove }
}
