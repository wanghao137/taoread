import { AwsClient } from 'aws4fetch'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Range, If-Range, If-None-Match, If-Modified-Since',
  'Access-Control-Expose-Headers': 'Content-Range, Accept-Ranges, Content-Length, ETag, Last-Modified',
}

function error(status, message, method) {
  return new Response(method === 'HEAD' ? null : message, {
    status, headers: { ...cors, 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

function publicResponse(upstream, method, cacheStatus) {
  const headers = new Headers(cors)
  for (const name of ['content-type', 'content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified']) {
    const value = upstream.headers.get(name)
    if (value) headers.set(name, value)
  }
  headers.set('Cache-Control', [200, 206, 304].includes(upstream.status) ? 'public, max-age=31536000, immutable' : 'no-store')
  headers.set('X-Audio-Cache', cacheStatus)
  headers.set('X-Content-Type-Options', 'nosniff')
  return new Response(method === 'HEAD' || upstream.status === 304 ? null : upstream.body, { status: upstream.status, headers })
}

/** Dependencies injectable for semantic tests; production uses signed B2 S3 and edge cache. */
export function createHandler({ cache = () => caches.default, upstreamFetch = fetch } = {}) {
  return async (request, env, ctx) => {
    const url = new URL(request.url)
    const method = request.method
    if (!/^\/tts-public\/[a-f0-9]{64}\.mp3$/.test(url.pathname) || url.search) return error(404, 'Not found', method)
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) return error(405, 'Method not allowed', method)
    if (method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Max-Age': '86400' } })
    if (!/^https:\/\/s3\.[a-z0-9-]+\.backblazeb2\.com$/.test(env.B2_ENDPOINT || '') || env.B2_BUCKET !== 'taoread-public-audio' ||
        !env.B2_ACCESS_KEY_ID || !env.B2_SECRET_ACCESS_KEY) return error(503, 'Audio unavailable', method)
    const range = request.headers.get('Range')
    if (range && !/^bytes=(?:\d+-\d*|-\d+)$/.test(range)) return error(400, 'Single byte range required', method)
    const key = new Request(url.origin + url.pathname, { method: 'GET' })
    const publicHeaders = new Headers()
    for (const name of ['Range', 'If-Range', 'If-None-Match', 'If-Modified-Since']) {
      const value = request.headers.get(name)
      if (value) publicHeaders.set(name, value)
    }
    if (method === 'HEAD') publicHeaders.delete('Range')
    try {
      const edgeCache = cache()
      // Cache API handles Range and conditional GET. If-Range needs explicit validation.
      const ifRange = publicHeaders.get('If-Range')
      if (range && ifRange) {
        const full = await edgeCache.match(key)
        if (full) {
          const etag = full.headers.get('ETag')
          const modified = Date.parse(full.headers.get('Last-Modified') || '')
          const valid = ifRange.startsWith('"') ? ifRange === etag : Number.isFinite(modified) && modified <= Date.parse(ifRange)
          if (!valid) publicHeaders.delete('Range')
          await full.body?.cancel()
        }
      }
      publicHeaders.delete('If-Range')
      const cached = await edgeCache.match(new Request(key, { headers: publicHeaders }))
      if (cached) return publicResponse(cached, method, 'HIT')
      // Sign only the approved request headers. Never forward client auth/cookies.
      const originHeaders = new Headers(publicHeaders)
      if (ifRange && range && method === 'GET') originHeaders.set('If-Range', ifRange)
      const signer = new AwsClient({
        accessKeyId: env.B2_ACCESS_KEY_ID, secretAccessKey: env.B2_SECRET_ACCESS_KEY,
        service: 's3', region: new URL(env.B2_ENDPOINT).hostname.split('.')[1],
      })
      const signed = await signer.sign(`${env.B2_ENDPOINT}/${env.B2_BUCKET}${url.pathname}`, { method, headers: originHeaders })
      const origin = await upstreamFetch(signed, { redirect: 'manual' })
      if (![200, 206, 304, 416].includes(origin.status)) {
        await origin.body?.cancel()
        return error(origin.status === 404 ? 404 : 502, 'Audio unavailable', method)
      }
      if ([200, 206].includes(origin.status) && !/^audio\/mpeg(?:;|$)/i.test(origin.headers.get('Content-Type') || '')) {
        await origin.body?.cancel()
        return error(502, 'Audio unavailable', method)
      }
      const response = publicResponse(origin, method, 'MISS')
      if (method === 'GET' && origin.status === 200 && response.headers.has('Content-Length')) {
        // Cache API rejects 206. Only store complete successful audio responses.
        ctx.waitUntil(edgeCache.put(key, response.clone()).catch(() => {}))
      }
      return response
    } catch {
      return error(502, 'Audio unavailable', method)
    }
  }
}

export default { fetch: createHandler() }
