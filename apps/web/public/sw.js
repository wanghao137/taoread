/*
 * 桃阅读 SW：仅做「清理历史预缓存」的透传 SW（F39：本产品明确不支持离线）。
 * 历史 vite-plugin-pwa 预缓存外壳在部署后会让老访客拿到已删除资源的旧壳 → 白屏。
 * 本 SW：1) skipWaiting 立即接管；2) 删除全部 Cache Storage；3) 不拦截任何请求
 * （无 fetch 处理器 = 永远走网络），从根源消灭「旧壳引用已删除产物」这一故障类。
 */
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.clients.claim()
    })(),
  )
})
