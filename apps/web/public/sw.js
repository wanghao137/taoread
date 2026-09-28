/*
 * 桃阅读 SW v2（docs/34 P1-4）：可安装 PWA + 静态外壳轻缓存。
 * 历史 v1 是「纯清理型透传 SW」（F39：不支持离线）——本轮保持同一底线：
 *   1) API 请求与页面导航绝不缓存（家庭数据带会话凭据，文档必须拿最新壳）；
 *   2) 只对同源静态资产（/assets/ /fonts/ /icons/ /brand/）做 cache-first，
 *      命中已缓存的哈希产物/字体/图标，弱网与重复访问更快，断网时外壳可用；
 *   3) activate 清掉旧版本缓存，保持 v1 的「治愈历史预缓存」能力。
 * 仍然不是完整离线应用：书单/正文/朗读永远走网络。
 */
const CACHE = 'taoread-shell-v2'
const SHELL_PREFIXES = ['/assets/', '/fonts/', '/icons/', '/brand/']

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
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
  if (url.pathname.startsWith('/api/') || req.mode === 'navigate') return
  if (!SHELL_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) return
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
