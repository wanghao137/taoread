// taoread-dist origin：按路径读 R2 对象，全部公开（安装包与版本清单无敏感数据）。
// 禁止目录列举；key 校验只放行安装产物与清单，防止误绑整个桶语义。
// mp3/html 供听感对比页（listening/）；Range/206 供手机 <audio> 分段播放（部分 WebView 必需）。
const ALLOWED_EXT = /\.(exe|apk|json|sig|txt|webp|png|mp3|html|apk\.tmp)$/i

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
    let rangeOpt
    const rangeHeader = request.headers.get('range')
    if (rangeHeader) {
      const m = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim())
      if (m && (m[1] !== '' || m[2] !== '')) {
        if (m[1] === '') rangeOpt = { suffix: Number(m[2]) }
        else if (m[2] === '') rangeOpt = { offset: Number(m[1]) }
        else rangeOpt = { offset: Number(m[1]), length: Number(m[2]) - Number(m[1]) + 1 }
      }
    }
    const obj = await env.DIST.get(key, rangeOpt ? { range: rangeOpt } : undefined)
    if (!obj) return new Response('not found', { status: 404 })
    const headers = new Headers()
    obj.writeHttpMetadata(headers)
    headers.set('etag', obj.httpEtag)
    headers.set('cache-control', key.endsWith('.json') ? 'no-cache' : 'public, max-age=300')
    headers.set('access-control-allow-origin', '*')
    headers.set('accept-ranges', 'bytes')
    if (rangeOpt && obj.range) {
      headers.set('content-range', `bytes ${obj.range.offset}-${obj.range.offset + obj.range.length - 1}/${obj.size}`)
      headers.set('content-length', String(obj.range.length))
      if (request.method === 'HEAD') return new Response(null, { status: 206, headers })
      return new Response(obj.body, { status: 206, headers })
    }
    if (request.method === 'HEAD') return new Response(null, { headers })
    return new Response(obj.body, { headers })
  },
}
