// Domain stays in the original account; only public audio reaches the new R2 binding.
const origin = 'https://taoread-audio-origin.taoread-audio-r2.workers.dev'
const pathPattern = /^\/tts-public\/[a-f0-9]{64}\.mp3$/
export default { async fetch(request, env, ctx) {
  const url = new URL(request.url)
  if (url.search) return new Response(null, { status: 404 })
  const inventory = url.pathname === '/_audio-store/list' && request.method === 'POST'
  if (!inventory && !pathPattern.test(url.pathname)) return new Response(null, { status: 404 })
  if (!inventory && !['GET', 'HEAD', 'OPTIONS', 'PUT'].includes(request.method)) return new Response(null, { status: 405 })
  const upload = request.method === 'PUT' || inventory
  const headers = new Headers()
  const allowed = upload ? ['Authorization', 'Content-Type', 'Content-Length', 'X-Audio-Sha256', 'X-Audio-Cursor'] : ['Range', 'If-Range', 'If-None-Match', 'If-Modified-Since']
  for (const name of allowed) { const value = request.headers.get(name); if (value) headers.set(name, value) }
  try {
    const cacheKey = new Request(url.origin + url.pathname)
    const conditional = headers.has('Range') || headers.has('If-Range') || headers.has('If-None-Match') || headers.has('If-Modified-Since')
    // Forward all conditional requests to native R2 semantics; cache only complete audio.
    if (request.method === 'GET' && !conditional) {
      const cached = await caches.default.match(cacheKey)
      if (cached?.headers.get('X-Audio-Origin') === 'r2-new-account') return cached
      await cached?.body?.cancel()
    }
    const response = await fetch(origin + url.pathname, { method: request.method, headers, body: upload ? request.body : undefined, redirect: 'manual' })
    if (response.status >= 300 && response.status < 400 && response.status !== 304) { await response.body?.cancel(); return new Response(null, { status: 502 }) }
    if (request.method === 'GET' && response.status === 200 && !conditional) ctx.waitUntil(caches.default.put(cacheKey, response.clone()).catch(() => {}))
    return response
  } catch {
    console.error(JSON.stringify({ event: 'audio-r2-origin-unreachable', method: request.method }))
    return new Response(null, { status: 502, headers: { 'Cache-Control': 'no-store' } })
  }
} }
