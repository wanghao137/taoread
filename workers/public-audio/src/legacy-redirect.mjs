const audioPath = /^\/tts-public\/[a-f0-9]{64}\.mp3$/
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Range, If-Range, If-None-Match, If-Modified-Since',
  'Cache-Control': 'no-store',
  'X-Audio-Legacy': 'redirect-new-r2',
}

export default {
  fetch(request) {
    const url = new URL(request.url)
    if (!audioPath.test(url.pathname)) return new Response(null, { status: 404, headers: cors })
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
      return new Response(null, { status: 405, headers: { ...cors, Allow: 'GET, HEAD, OPTIONS' } })
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    // A fixed destination preserves byte-range reads without exposing other media paths.
    return new Response(null, {
      status: 307,
      headers: { ...cors, Location: 'https://audio.taostudioai.com' + url.pathname },
    })
  },
}
