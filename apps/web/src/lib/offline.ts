import { api, request } from './api'

export interface OfflineBook {
  id: string; title: string; author: string; savedAt: number; expiresAt: number
  source: string; contentVersion: string
  chapters: Array<{ title: string; paragraphs: string[]; images?: Blob[]; audio?: Blob[]; content?: Array<{ text: string } | { image: number }> }>
  bytes?: number
  mediaComplete?: boolean
}
const TTL = 7 * 86_400_000
const MAX_BYTES = 5 * 1024 * 1024
function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('taoread-public-offline-v1', 1)
    req.onupgradeneeded = () => req.result.createObjectStore('books', { keyPath: 'id' })
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(new Error('本机存储不可用，请检查浏览器设置'))
  })
}
async function transaction<T>(mode: IDBTransactionMode, request: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open()
  try {
    return await new Promise<T>((resolve, reject) => {
      const tx = db.transaction('books', mode)
      const req = request(tx.objectStore('books'))
      tx.oncomplete = () => resolve(req.result)
      tx.onerror = tx.onabort = () => reject(new Error('保存失败，可能空间不足；请先删除一本离线书'))
    })
  } finally { db.close() }
}
export const removeOfflineBook = (id: string) => transaction('readwrite', (s) => s.delete(id))
export async function listOfflineBooks(): Promise<OfflineBook[]> {
  const books = await transaction<OfflineBook[]>('readonly', (s) => s.getAll())
  const expired = books.filter((b) => b.expiresAt <= Date.now())
  for (const b of expired) await removeOfflineBook(b.id)
  return books.filter((b) => b.expiresAt > Date.now())
}
let downloadQueue = Promise.resolve()
export function saveOfflineBook(book: { id: string; title: string; author: string; chapterCount: number }, token: string, withMedia = false, signal?: AbortSignal): Promise<void> {
  const next = downloadQueue.then(() => downloadBook(book, token, withMedia, signal))
  downloadQueue = next.catch(() => undefined)
  return next
}
async function downloadBook(book: { id: string; title: string; author: string; chapterCount: number }, token: string, withMedia: boolean, signal?: AbortSignal): Promise<void> {
  const checkCancelled = () => { if (signal?.aborted) throw new Error('下载已取消；此前保存的离线版本仍然保留') }
  checkCancelled()
  if (book.id.startsWith('imp:') || book.chapterCount > 100) throw new Error('离线试点仅支持不超过 100 章的公共书')
  const existing = await listOfflineBooks()
  if (existing.length >= 5 && !existing.some((b) => b.id === book.id)) throw new Error('最多保存 5 本，请先在离线书架删除一本')
  const chapters: OfflineBook['chapters'] = []
  const provenance = await api.contentProvenance(book.id, token)
  let bytes = 0
  const cap = withMedia ? 100 * 1024 * 1024 : MAX_BYTES
  async function download(url: string, kind: 'image' | 'audio'): Promise<Blob> {
    checkCancelled()
    const controller = new AbortController()
    const cancel = () => controller.abort()
    signal?.addEventListener('abort', cancel, { once: true })
    const timer = setTimeout(cancel, 45000)
    try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok || !response.headers.get('content-type')?.startsWith(`${kind}/`)) throw new Error('离线媒体没有下载完整，请联网重试；原离线版本仍然保留')
    const reader = response.body?.getReader()
    const length = Number(response.headers.get('content-length') ?? 0)
    if (!reader || length > cap - bytes) { await response.body?.cancel(); throw new Error('媒体超过本机限额，请仅保存文字') }
    const parts: ArrayBuffer[] = []
    try {
      while (true) {
        const chunk = await reader.read()
        if (chunk.done) break
        bytes += chunk.value.byteLength
        if (bytes > cap) { await reader.cancel(); throw new Error('图文和音频超过每本 100 MB 限额，请仅保存文字') }
        parts.push(chunk.value.slice().buffer)
      }
    } finally { reader.releaseLock() }
    return new Blob(parts, { type: response.headers.get('content-type')! })
    } finally { clearTimeout(timer); signal?.removeEventListener('abort', cancel) }
  }
  for (let order = 1; order <= book.chapterCount; order++) {
    checkCancelled()
    const { chapter } = await api.contentChapter(book.id, order, token)
    checkCancelled()
    // Explicit allowlist: never persist tokens, progress, family books, media capabilities or API responses.
    const clean: OfflineBook['chapters'][number] = { title: chapter.title, paragraphs: chapter.blocks.filter((b) => b.kind !== 'image').map((b) => b.text) }
    bytes += new Blob([JSON.stringify(clean)]).size
    if (bytes > cap) throw new Error('这本书超过本机离线限额')
    if (withMedia) {
      const imageUrls = [...new Set([chapter.artReaderUrl ?? chapter.artUrl, ...chapter.blocks.map(b => b.artReaderUrl ?? b.artUrl)].filter((url): url is string => Boolean(url)))]
      clean.images = []
      for (const url of imageUrls) clean.images.push(await download(url, 'image'))
      clean.content = []
      const chapterImage = chapter.artReaderUrl ?? chapter.artUrl
      if (chapterImage) clean.content.push({ image: imageUrls.indexOf(chapterImage) })
      for (const block of chapter.blocks) {
        const image = block.artReaderUrl ?? block.artUrl
        if (image) clean.content.push({ image: imageUrls.indexOf(image) })
        if (block.kind !== 'image') clean.content.push({ text: block.text })
      }
      const audio = await request<{ segments: Array<{ index: number; url: string }>; complete: boolean; missing: number; contentVersion: string }>(`/api/tts/offline/${encodeURIComponent(book.id)}/${order}`, { token })
      if (audio.contentVersion !== provenance.contentVersion) throw new Error('朗读与正文版本不一致，请重新保存')
      if (!audio.complete) throw new Error(`第 ${order} 章还有 ${audio.missing} 段朗读未准备好，请先保存文字；不会为下载自动生成音频`)
      clean.audio = []
      for (const segment of [...audio.segments].sort((a, b) => a.index - b.index)) clean.audio.push(await download(segment.url, 'audio'))
    }
    chapters.push(clean)
  }
  const current = await api.contentProvenance(book.id, token)
  checkCancelled()
  if (provenance.contentVersion !== current.contentVersion) throw new Error('内容刚刚更新，请重新保存')
  const source = [provenance.source, provenance.rights?.workTitle, provenance.rights?.translator, provenance.rights?.sourceUrl, provenance.rights?.note].filter(Boolean).join('\n')
  const total = existing.filter(x => x.id !== book.id).reduce((sum, x) => sum + (x.bytes ?? MAX_BYTES), 0) + bytes
  if (total > 250 * 1024 * 1024) throw new Error('本机离线书超过 250 MB，请先删除一本')
  const storage = await navigator.storage?.estimate?.()
  if (storage?.quota && storage.usage && storage.quota - storage.usage < bytes * 1.2) throw new Error('本机剩余空间不足，请先清理离线书')
  const value = { id: book.id, title: book.title, author: book.author, source, contentVersion: provenance.contentVersion, savedAt: Date.now(), expiresAt: Date.now() + TTL, chapters, bytes, mediaComplete: withMedia } satisfies OfflineBook
  // IndexedDB serializes readwrite transactions across tabs. Recheck the total inside the write.
  const db = await open()
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('books', 'readwrite')
      const store = tx.objectStore('books')
      let failure = '保存失败，可能空间不足；原离线版本仍保留'
      const rows = store.getAll()
      rows.onsuccess = () => {
        const live = (rows.result as OfflineBook[]).filter(x => x.expiresAt > Date.now() && x.id !== book.id)
        if (signal?.aborted || live.length >= 5 || live.reduce((sum, x) => sum + (x.bytes ?? MAX_BYTES), bytes) > 250 * 1024 * 1024) { failure = signal?.aborted ? '下载已取消；原离线版本仍保留' : '另一页面已保存书籍，本机离线容量已满，请先清理'; tx.abort(); return }
        store.put(value)
      }
      tx.oncomplete = () => resolve()
      tx.onerror = tx.onabort = () => reject(new Error(failure))
    })
  } finally { db.close() }
}
