import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { Miniflare, convertV4MiniflareOptions } from 'miniflare'

test('R2 binding enforces authorization, checksum and immutable creates; streams HTTP audio ranges', async () => {
  const authorization = 'Bearer test-only-token'
  const hash = value => createHash('sha256').update(value).digest('hex')
  const mf = new Miniflare(convertV4MiniflareOptions({ modules: true,
    script: await readFile('src/r2-origin.mjs', 'utf8'), compatibilityDate: '2026-10-12',
    r2Buckets: ['AUDIO'], bindings: { UPLOAD_TOKEN_SHA256: hash(authorization), AUDIO_ACCOUNT_ID: 'test-account' },
  }))
  const url = `https://origin.example/tts-public/${'a'.repeat(64)}.mp3`
  const body = '0123456789'
  const headers = { Authorization: authorization, 'Content-Type': 'audio/mpeg', 'Content-Length': '10', 'X-Audio-Sha256': hash(body) }
  try {
    assert.equal((await mf.dispatchFetch(url, { method: 'PUT', body, headers: { ...headers, Authorization: 'wrong' } })).status, 401)
    assert.equal((await mf.dispatchFetch(url)).status, 404)
    assert.equal((await mf.dispatchFetch(url, { method: 'PUT', body, headers })).status, 201)
    assert.equal((await mf.dispatchFetch(url, { method: 'PUT', body, headers })).status, 412)
    const full = await mf.dispatchFetch(url)
    assert.equal(full.status, 200); assert.equal(await full.text(), body)
    const etag = full.headers.get('ETag')
    for (const [range, expected] of [['bytes=2-5', '2345'], ['bytes=-3', '789'], ['bytes=7-', '789']]) {
      const res = await mf.dispatchFetch(url, { headers: { Range: range } })
      assert.equal(res.status, 206); assert.equal(await res.text(), expected)
    }
    assert.equal((await mf.dispatchFetch(url, { headers: { Range: 'bytes=99-' } })).status, 416)
    assert.equal((await mf.dispatchFetch(url, { headers: { Range: 'bytes=0-1,3-4' } })).status, 400)
    assert.equal((await mf.dispatchFetch(url, { headers: { 'If-None-Match': etag } })).status, 304)
    const changed = await mf.dispatchFetch(url, { headers: { Range: 'bytes=2-5', 'If-Range': '"changed"' } })
    assert.equal(changed.status, 200); assert.equal(await changed.text(), body)
    const same = await mf.dispatchFetch(url, { headers: { Range: 'bytes=2-5', 'If-Range': etag } })
    assert.equal(same.status, 206); assert.equal(await same.text(), '2345')
    const head = await mf.dispatchFetch(url, { method: 'HEAD', headers: { Range: 'bytes=2-5' } })
    assert.equal(head.status, 200); assert.equal(head.headers.get('Content-Length'), '10'); assert.equal(await head.text(), '')
    for (const denied of ['/tts-private/x.mp3', '/db/latest.db', '/art/covers/x.webp']) assert.equal((await mf.dispatchFetch(`https://origin.example${denied}`, { method: 'PUT', body, headers })).status, 404)
    assert.equal((await mf.dispatchFetch(url + '?x=1')).status, 404)
    assert.equal((await mf.dispatchFetch(url, { method: 'DELETE', headers })).status, 405)
    assert.equal((await mf.dispatchFetch(url, { method: 'OPTIONS' })).status, 204)
    const list = await mf.dispatchFetch('https://origin.example/_audio-store/list', { method: 'POST', headers: { Authorization: authorization }, body: '{}' })
    assert.equal(list.status, 200); assert.equal((await list.json()).objects.length, 1)
    const bad = await mf.dispatchFetch(url.replace('a'.repeat(64), 'b'.repeat(64)), { method: 'PUT', body, headers: { ...headers, 'X-Audio-Sha256': hash('different') } })
    assert.equal(bad.status, 502)
    assert.equal((await mf.dispatchFetch(url.replace('a'.repeat(64), 'b'.repeat(64)))).status, 404)
  } finally { await mf.dispose() }
})
