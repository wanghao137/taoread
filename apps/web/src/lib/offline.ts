import { api } from './api'

export interface OfflineBook {
  id: string; title: string; author: string; savedAt: number; expiresAt: number
  source: string; contentVersion: string
  chapters: Array<{ title: string; paragraphs: string[] }>
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
export async function saveOfflineBook(book: { id: string; title: string; author: string; chapterCount: number }, token: string): Promise<void> {
  if (book.id.startsWith('imp:') || book.chapterCount > 100) throw new Error('离线试点仅支持不超过 100 章的公共书')
  const existing = await listOfflineBooks()
  if (existing.length >= 5 && !existing.some((b) => b.id === book.id)) throw new Error('最多保存 5 本，请先在离线书架删除一本')
  const chapters: OfflineBook['chapters'] = []
  const provenance = await api.contentProvenance(book.id, token)
  let bytes = 0
  for (let order = 1; order <= book.chapterCount; order++) {
    const { chapter } = await api.contentChapter(book.id, order, token)
    // Explicit allowlist: never persist tokens, progress, family books, media capabilities or API responses.
    const clean = { title: chapter.title, paragraphs: chapter.blocks.filter((b) => b.kind !== 'image').map((b) => b.text) }
    bytes += new Blob([JSON.stringify(clean)]).size
    if (bytes > MAX_BYTES) throw new Error('这本书超过 5 MB 离线限额')
    chapters.push(clean)
  }
  const current = await api.contentProvenance(book.id, token)
  if (provenance.contentVersion !== current.contentVersion) throw new Error('内容刚刚更新，请重新保存')
  const source = [provenance.source, provenance.rights?.workTitle, provenance.rights?.translator, provenance.rights?.sourceUrl, provenance.rights?.note].filter(Boolean).join('\n')
  await transaction('readwrite', (s) => s.put({ id: book.id, title: book.title, author: book.author, source, contentVersion: provenance.contentVersion, savedAt: Date.now(), expiresAt: Date.now() + TTL, chapters } satisfies OfflineBook))
}
