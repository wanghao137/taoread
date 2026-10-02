/*
 * 桃阅读 SW v3：静态资产缓存与主动公共文字离线试点。
 * 历史 v1 是「纯清理型透传 SW」（F39：不支持离线）——本轮保持同一底线：
 *   1) API 请求与页面导航绝不缓存（家庭数据带会话凭据，文档必须拿最新壳）；
 *   2) 只对同源静态资产（/assets/ /fonts/ /icons/ /brand/）做 cache-first，
 *      命中已缓存的哈希产物/字体/图标，弱网与重复访问更快，断网时外壳可用；
 *   3) activate 清掉旧版本缓存，保持 v1 的「治愈历史预缓存」能力。
 * 私有书单/正文/朗读仍走网络；断网导航转入独立公共文字书架。
 */
const CACHE = 'taoread-shell-v3'
const SHELL_PREFIXES = ['/assets/', '/fonts/', '/icons/', '/brand/']

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    // Dedicated static reader: never cache the application's index or its hashed dependency graph.
    await cache.addAll(['/offline.html', '/offline-reader.js'])
    await self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((key) => key.startsWith('taoread-shell-') && key !== CACHE).map((key) => caches.delete(key)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  // API（家庭数据/会话/SSE）与页面导航绝不缓存
  if (url.pathname.startsWith('/api/')) return
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(async () => {
      if (url.pathname !== '/offline') return Response.redirect(`${self.location.origin}/offline`, 302)
      return (await caches.match('/offline.html')) ?? new Response('请先联网打开桃阅读并保存公共书。', { status: 503, headers: { 'Content-Type': 'text/plain;charset=utf-8' } })
    }))
    return
  }
  if (url.pathname !== '/offline-reader.js' && !SHELL_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) return
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      const hit = await cache.match(req)
      if (hit) return hit
      try {
        const res = await fetch(req)
        if (res.ok) cache.put(req, res.clone())
        return res
      } catch {
        return new Response('', { status: 504 })
      }
    })(),
  )
})
