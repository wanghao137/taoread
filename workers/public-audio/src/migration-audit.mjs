import audio from './index.mjs'

/** Temporary migration build; deploy index.mjs again and remove the token after verification. */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const match = /^\/_migration-audit\/([a-f0-9]{64})\.mp3$/.exec(url.pathname)
    if (!match) return audio.fetch(request, env, ctx)
    const unavailable = () => new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } })
    if (!env.MIGRATION_AUDIT_TOKEN || request.method !== 'POST' || url.search) return unavailable()
    const encoder = new TextEncoder()
    const [provided, expected] = await Promise.all([
      crypto.subtle.digest('SHA-256', encoder.encode(request.headers.get('Authorization') || '')),
      crypto.subtle.digest('SHA-256', encoder.encode(`Bearer ${env.MIGRATION_AUDIT_TOKEN}`)),
    ])
    if (!crypto.subtle.timingSafeEqual(provided, expected)) return unavailable()
    try {
      // Exercise the same public handler, signature, response filtering and Cache API.
      const response = await audio.fetch(new Request(`${url.origin}/tts-public/${match[1]}.mp3`), env, ctx)
      const expectedBytes = Number(response.headers.get('Content-Length'))
      if (response.status !== 200 || !Number.isSafeInteger(expectedBytes) || expectedBytes <= 0 || expectedBytes > 2 * 1024 * 1024) {
        await response.body?.cancel()
        throw Error('Audio unavailable')
      }
      let bytes = 0
      const digest = new crypto.DigestStream('SHA-256')
      const counter = new TransformStream({ transform(chunk, controller) {
        bytes += chunk.byteLength
        if (bytes > expectedBytes) throw Error('Unexpected audio length')
        controller.enqueue(chunk)
      } })
      await response.body.pipeThrough(counter).pipeTo(digest)
      const sha256 = [...new Uint8Array(await digest.digest)].map(value => value.toString(16).padStart(2, '0')).join('')
      if (bytes !== expectedBytes) throw Error('Incomplete audio')
      return Response.json({ key: `tts-public/${match[1]}.mp3`, bytes, sha256,
        contentType: response.headers.get('Content-Type'), cacheControl: response.headers.get('Cache-Control'),
        etag: response.headers.get('ETag'), cache: response.headers.get('X-Audio-Cache') },
      { headers: { 'Cache-Control': 'no-store' } })
    } catch {
      return new Response('Audio verification unavailable', { status: 502, headers: { 'Cache-Control': 'no-store' } })
    }
  },
}
