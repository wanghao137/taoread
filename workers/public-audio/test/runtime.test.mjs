import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Miniflare, convertV4MiniflareOptions, Response } from 'miniflare'
import { resolve } from 'node:path'
import { URL } from 'node:url'

test('real Workers cache, HTTP ranges, signing and path isolation', async () => {
  const body = '0123456789'
  const key = 'a'.repeat(64)
  const path = `/taoread-public-audio/tts-public/${key}.mp3`
  const headers = { 'Content-Type': 'audio/mpeg', 'Content-Length': '10', 'Accept-Ranges': 'bytes', ETag: '"audio-v1"', 'Last-Modified': 'Mon, 12 Oct 2026 00:00:00 GMT' }
  let originCalls = 0
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: true, scriptPath: resolve('.wrangler/check/index.js'), compatibilityDate: '2026-10-12',
    bindings: { B2_ENDPOINT: 'https://s3.us-east-005.backblazeb2.com', B2_BUCKET: 'taoread-public-audio', B2_ACCESS_KEY_ID: 'test-key', B2_SECRET_ACCESS_KEY: 'test-secret' },
    outboundService: request => {
      originCalls++
      if (new URL(request.url).pathname.endsWith(`${'c'.repeat(64)}.mp3`)) return new Response('<Error>private upstream error</Error>', { status: 403 })
      if (new URL(request.url).pathname.endsWith(`${'d'.repeat(64)}.mp3`)) return new Response(null, { status: 302, headers: { Location: 'https://other.example.com/' } })
      assert.equal(new URL(request.url).pathname, path)
      assert.ok(request.headers.get('Authorization')?.startsWith('AWS4-HMAC-SHA256'))
      assert.equal(request.headers.get('Cookie'), null)
      assert.equal(request.headers.get('X-Client-Secret'), null)
      if (request.headers.get('Range') === 'bytes=2-5') return new Response('2345', { status: 206, headers: { ...headers, 'Content-Length': '4', 'Content-Range': 'bytes 2-5/10' } })
      return new Response(body, { headers })
    },
  }))
  try {
    const url = `https://audio.example.com/tts-public/${key}.mp3`
    const coldRange = await mf.dispatchFetch(url, { headers: { Range: 'bytes=2-5' } })
    assert.equal(coldRange.status, 206); assert.equal(await coldRange.text(), '2345')
    const cold = await mf.dispatchFetch(url, { headers: { Authorization: 'client-secret', Cookie: 'session=private', 'X-Client-Secret': 'private' } })
    assert.equal(cold.status, 200, `cold GET with ${originCalls} origin calls`); assert.equal(await cold.text(), body)
    assert.equal(cold.headers.get('X-Audio-Cache'), 'MISS')
    const warm = await mf.dispatchFetch(url)
    assert.equal(warm.headers.get('X-Audio-Cache'), 'HIT'); assert.equal(await warm.text(), body)
    for (const [range, expected] of [['bytes=2-5', '2345'], ['bytes=-3', '789'], ['bytes=7-', '789']]) {
      const response = await mf.dispatchFetch(url, { headers: { Range: range } })
      assert.equal(response.status, 206); assert.equal(await response.text(), expected)
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*')
    }
    const head = await mf.dispatchFetch(url, { method: 'HEAD', headers: { Range: 'bytes=2-5' } })
    assert.equal(head.status, 200); assert.equal(head.headers.get('Content-Length'), '10'); assert.equal(await head.text(), '')
    const conditional = await mf.dispatchFetch(url, { headers: { 'If-None-Match': '"audio-v1"' } })
    assert.equal(conditional.status, 304); assert.equal(await conditional.text(), '')
    const changed = await mf.dispatchFetch(url, { headers: { Range: 'bytes=2-5', 'If-Range': '"older"' } })
    assert.equal(changed.status, 200); assert.equal(await changed.text(), body)
    const same = await mf.dispatchFetch(url, { headers: { Range: 'bytes=2-5', 'If-Range': '"audio-v1"' } })
    assert.equal(same.status, 206); assert.equal(await same.text(), '2345')
    const invalid = await mf.dispatchFetch(url, { headers: { Range: 'bytes=99-' } })
    assert.equal(invalid.status, 416)
    assert.equal((await mf.dispatchFetch(url, { method: 'POST' })).status, 405)
    assert.equal((await mf.dispatchFetch(url, { method: 'OPTIONS' })).status, 204)
    for (const denied of ['/db/latest.db', '/recovery/manifest.json', '/tts-private/key.mp3', '/art/covers/a.webp', `/tts-public/${key}.mp3?origin=secret`]) {
      assert.equal((await mf.dispatchFetch(`https://audio.example.com${denied}`)).status, 404)
    }
    for (const rejected of ['c', 'd']) {
      const response = await mf.dispatchFetch(`https://audio.example.com/tts-public/${rejected.repeat(64)}.mp3`)
      assert.equal(response.status, 502); assert.equal(await response.text(), 'Audio unavailable')
      assert.equal(response.headers.get('Location'), null)
    }
  } finally { await mf.dispose() }
})
