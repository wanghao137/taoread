// Dedicated new-account R2 origin. No delete or overwrite operations are exposed.
const keyPattern = /^tts-public\/[a-f0-9]{64}\.mp3$/
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Range, If-Range, If-None-Match, If-Modified-Since',
  'Access-Control-Expose-Headers': 'Content-Range, Accept-Ranges, Content-Length, ETag, Last-Modified',
}
const reply = (status, method, headers = {}) => new Response(null, { status, headers: { ...cors, 'Cache-Control': 'no-store', ...headers } })

async function authorized(request, env) {
  if (!/^[a-f0-9]{64}$/.test(env.UPLOAD_TOKEN_SHA256 || '')) return false
  const supplied = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(request.headers.get('Authorization') || ''))
  const expected = Uint8Array.from(env.UPLOAD_TOKEN_SHA256.match(/../g), value => parseInt(value, 16))
  return crypto.subtle.timingSafeEqual(supplied, expected)
}

async function handle(request, env) {
  const url = new URL(request.url)
  const method = request.method
  if (url.search) return reply(404, method)
  if (url.pathname === '/_audio-store/list' && method === 'POST') {
    if (!await authorized(request, env)) return reply(401, method)
    const cursor = request.headers.get('X-Audio-Cursor') || undefined
    if (cursor !== undefined && (typeof cursor !== 'string' || cursor.length > 2048)) return reply(400, method)
    const page = await env.AUDIO.list({ cursor, limit: 1000 })
    return Response.json({ accountId: env.AUDIO_ACCOUNT_ID, bucket: 'taoread-public-audio',
      objects: page.objects.map(obj => ({ key: obj.key, bytes: obj.size, etag: obj.httpEtag })),
      truncated: page.truncated, cursor: page.truncated ? page.cursor : undefined }, { headers: { 'Cache-Control': 'no-store' } })
  }
  const key = url.pathname.slice(1)
  if (!keyPattern.test(key)) return reply(404, method)
  if (method === 'PUT') {
    if (!await authorized(request, env)) return reply(401, method)
    const length = Number(request.headers.get('Content-Length'))
    const checksum = request.headers.get('X-Audio-Sha256')
    if (!Number.isSafeInteger(length) || length < 1 || length > 16 * 1024 * 1024 || !/^[a-f0-9]{64}$/.test(checksum || '') || request.headers.get('Content-Type') !== 'audio/mpeg') return reply(400, method)
    // R2 validates the streamed SHA-256; conditional create prevents concurrent overwrites.
    const object = await env.AUDIO.put(key, request.body, {
      onlyIf: { etagDoesNotMatch: '*' }, sha256: checksum,
      httpMetadata: { contentType: 'audio/mpeg', cacheControl: 'public, max-age=31536000, immutable' },
      customMetadata: { sha256: checksum },
    })
    if (!object) return reply(412, method)
    return Response.json({ key, bytes: object.size, etag: object.httpEtag }, { status: 201, headers: { 'Cache-Control': 'no-store' } })
  }
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) return reply(405, method)
  if (method === 'OPTIONS') return reply(204, method, { 'Access-Control-Max-Age': '86400' })
  const object = await env.AUDIO.head(key)
  if (!object) return reply(404, method)
  if (object.httpMetadata?.contentType !== 'audio/mpeg') return reply(502, method)
  const headers = new Headers(cors)
  object.writeHttpMetadata(headers)
  headers.set('ETag', object.httpEtag)
  headers.set('Last-Modified', object.uploaded.toUTCString())
  headers.set('Accept-Ranges', 'bytes')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Audio-Origin', 'r2-new-account')
  const noneMatch = request.headers.get('If-None-Match')
  const modifiedSince = request.headers.get('If-Modified-Since')
  if (noneMatch ? noneMatch.split(',').some(value => value.trim() === '*' || value.trim().replace(/^W\//, '') === object.httpEtag)
    : modifiedSince && Math.floor(object.uploaded.getTime() / 1000) <= Math.floor(Date.parse(modifiedSince) / 1000)) return new Response(null, { status: 304, headers })
  let range = method === 'GET' ? request.headers.get('Range') : null
  const ifRange = request.headers.get('If-Range')
  if (range && ifRange && !(ifRange === object.httpEtag || (!ifRange.startsWith('"') && Math.floor(object.uploaded.getTime() / 1000) <= Math.floor(Date.parse(ifRange) / 1000)))) range = null
  let offset = 0, length = object.size
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range)
    if (!match || (!match[1] && !match[2])) return reply(400, method)
    const start = match[1] ? Number(match[1]) : Math.max(0, object.size - Number(match[2]))
    const end = match[1] && match[2] ? Math.min(Number(match[2]), object.size - 1) : object.size - 1
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= object.size || end < start || (!match[1] && Number(match[2]) === 0)) return reply(416, method, { 'Content-Range': `bytes */${object.size}` })
    offset = start; length = end - start + 1
    headers.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${object.size}`)
  }
  headers.set('Content-Length', String(length))
  if (method === 'HEAD') return new Response(null, { headers })
  const data = await env.AUDIO.get(key, { onlyIf: { etagMatches: object.etag }, ...(range ? { range: { offset, length } } : {}) })
  if (!data || !('body' in data)) return reply(502, method)
  return new Response(data.body, { status: range ? 206 : 200, headers })
}

export default { async fetch(request, env) {
  try { return await handle(request, env) } catch {
    console.error(JSON.stringify({ event: 'audio-r2-operation-failed', method: request.method }))
    return reply(502, request.method)
  }
} }
