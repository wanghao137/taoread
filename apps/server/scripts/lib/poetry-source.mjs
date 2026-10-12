import { createHash } from 'node:crypto'
import { URLSearchParams } from 'node:url'
export const normalizedPoem = text => text.replace(/\\n/g, '\n').normalize('NFC').replace(/[^\p{L}\p{N}]/gu, '')
export const poemHash = text => createHash('sha256').update(text).digest('hex')
/** The live service is a candidate source only. Do not copy API server code or trust metadata as review. */
export async function searchPoetry(query, { mode = 'online', origin = 'https://poetry.palemoky.com', page = 1, pageSize = 50, fetcher = fetch } = {}) {
  if (!['online', 'self-hosted'].includes(mode) || !query.trim() || query.length > 64 || !Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) throw Error('Invalid poetry source request')
  if (mode === 'online' && [...query.trim()].length < 3) throw Error('Online poetry search requires at least three characters')
  const url = new URL(mode === 'online' ? '/api/search' : '/api/v1/poems/search', origin)
  url.search = new URLSearchParams({ q: query, page: String(page), [mode === 'online' ? 'pageSize' : 'page_size']: String(pageSize), lang: 'zh-Hans', ...(mode === 'self-hosted' ? { type: 'title' } : {}) }).toString()
  const res = await fetcher(url, { signal: AbortSignal.timeout(30000), redirect: 'error' })
  if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) throw Error(`Poetry source unavailable: HTTP ${res.status}`)
  const raw = await res.text()
  if (raw.length > 2_000_000) throw Error('Poetry source response too large')
  const payload = JSON.parse(raw)
  if (!Array.isArray(payload.data) || payload.data.length > pageSize) throw Error('Poetry source schema mismatch')
  const candidates = payload.data.map(p => {
    if (!Number.isSafeInteger(p.id) || typeof p.title !== 'string' || !p.title || p.title.length > 256 || typeof p.author?.name !== 'string' || !p.author.name || !Array.isArray(p.content) || !p.content.length || p.content.some(line => typeof line !== 'string' || line.length > 2000)) throw Error('Invalid poetry candidate')
    const text = p.content.join('\n')
    return { sourceId: p.id, title: p.title, author: p.author.name, unverifiedDynasty: p.dynasty?.name || null, text, sha256: poemHash(text), normalizedSha256: poemHash(normalizedPoem(text)) }
  })
  return { url: url.href, fetchedAt: new Date().toISOString(), rawSha256: poemHash(raw), raw, candidates }
}
