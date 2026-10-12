import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { Miniflare, convertV4MiniflareOptions, Response } from 'miniflare'
const { URL } = globalThis

test('cross-account proxy restricts paths, strips client credentials on reads, and relays authorized uploads', async () => {
  let calls = 0
  const mf = new Miniflare(convertV4MiniflareOptions({ modules: true, script: await readFile('src/r2-proxy.mjs', 'utf8'), compatibilityDate: '2026-10-12',
    outboundService: async request => {
      calls++
      assert.equal(new URL(request.url).origin, 'https://taoread-audio-origin.taoread-audio-r2.workers.dev')
      assert.equal(request.headers.get('Cookie'), null)
      if (request.method === 'PUT') {
        assert.equal(request.headers.get('Authorization'), 'Bearer test-upload')
        assert.equal(request.headers.get('X-Audio-Sha256'), 'checksum')
        assert.equal(await request.text(), 'audio')
        return new Response(null, { status: 201 })
      }
      if (request.method === 'POST') {
        assert.equal(request.headers.get('X-Audio-Cursor'), 'next-page')
        return Response.json({ objects: [] })
      }
      assert.equal(request.headers.get('Authorization'), null)
      assert.equal(request.headers.get('If-None-Match'), '"require-origin"')
      return new Response('audio', { headers: { 'Content-Type': 'audio/mpeg', 'X-Audio-Origin': 'r2-new-account' } })
    },
  }))
  try {
    const url = `https://audio.example/tts-public/${'a'.repeat(64)}.mp3`
    const res = await mf.dispatchFetch(url, { headers: { Authorization: 'private-user-token', Cookie: 'private', 'If-None-Match': '"require-origin"' } })
    assert.equal(res.status, 200); assert.equal(await res.text(), 'audio')
    assert.equal((await mf.dispatchFetch(url, { method: 'PUT', body: 'audio', headers: { Authorization: 'Bearer test-upload', 'X-Audio-Sha256': 'checksum' } })).status, 201)
    assert.equal((await mf.dispatchFetch('https://audio.example/_audio-store/list', { method: 'POST', headers: { Authorization: 'Bearer test-upload', 'X-Audio-Cursor': 'next-page' } })).status, 200)
    for (const path of ['/art/x.webp', '/tts-private/x.mp3', '/db/latest.db']) assert.equal((await mf.dispatchFetch('https://audio.example' + path)).status, 404)
    assert.equal((await mf.dispatchFetch(url + '?x=1')).status, 404)
    assert.equal((await mf.dispatchFetch(url, { method: 'DELETE' })).status, 405)
    assert.equal(calls, 3)
  } finally { await mf.dispose() }
})
