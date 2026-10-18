// taoread-dist origin：按路径读 R2 对象，全部公开（安装包与版本清单无敏感数据）。
// 禁止目录列举；key 校验只放行安装产物与清单，防止误绑整个桶语义。
const ALLOWED_EXT = /\.(exe|apk|json|sig|txt|webp|png|apk\.tmp)$/i

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('method not allowed', { status: 405 })
    }
    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ''))
    if (!key || key.includes('..') || !ALLOWED_EXT.test(key)) {
      return new Response('not found', { status: 404 })
    }
    const obj = await env.DIST.get(key)
    if (!obj) return new Response('not found', { status: 404 })
    const headers = new Headers()
    obj.writeHttpMetadata(headers)
    headers.set('etag', obj.httpEtag)
    headers.set('cache-control', key.endsWith('.json') ? 'no-cache' : 'public, max-age=300')
    headers.set('access-control-allow-origin', '*')
    if (request.method === 'HEAD') return new Response(null, { headers })
    return new Response(obj.body, { headers })
  },
}
