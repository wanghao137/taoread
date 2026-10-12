import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import { Miniflare, convertV4MiniflareOptions, Response } from 'miniflare'

test('temporary audit authenticates, streams real public response and never reveals upstream errors', async () => {
  const key = 'a'.repeat(64), body = '0123456789'
  let calls = 0
  const mf = new Miniflare(convertV4MiniflareOptions({ modules: true,
    script: await readFile(resolve('../../output/b2-audio-migration-20261012/.wrangler/audit-check/migration-audit.js'), 'utf8'), compatibilityDate: '2026-10-12',
    bindings: { B2_ENDPOINT: 'https://s3.us-east-005.backblazeb2.com', B2_BUCKET: 'taoread-public-audio',
      B2_ACCESS_KEY_ID: 'test-key', B2_SECRET_ACCESS_KEY: 'test-secret', MIGRATION_AUDIT_TOKEN: 'test-audit-token' },
    outboundService: request => {
      calls++
      assert.ok(request.headers.get('Authorization')?.startsWith('AWS4-HMAC-SHA256'))
      assert.equal(request.headers.get('Cookie'), null)
      if (request.url.endsWith(`${'b'.repeat(64)}.mp3`)) return new Response('private origin error', { status: 403 })
      return new Response(body, { headers: { 'Content-Type': 'audio/mpeg', 'Content-Length': '10', ETag: '"v1"' } })
    },
  }))
  try {
    const url = `https://audio.example.com/_migration-audit/${key}.mp3`
    assert.equal((await mf.dispatchFetch(url, { method: 'POST' })).status, 404)
    assert.equal((await mf.dispatchFetch(url, { method: 'POST', headers: { Authorization: 'Bearer wrong' } })).status, 404)
    assert.equal(calls, 0)
    const result = await mf.dispatchFetch(url, { method: 'POST', headers: { Authorization: 'Bearer test-audit-token', Cookie: 'private' } })
    assert.equal(result.status, 200)
    const proof = await result.json()
    assert.equal(proof.sha256, createHash('sha256').update(body).digest('hex'))
    assert.equal(proof.bytes, 10); assert.equal(proof.cache, 'MISS')
    assert.equal(result.headers.get('Cache-Control'), 'no-store')
    assert.equal((await mf.dispatchFetch(url, { method: 'GET' })).status, 404)
    const rejected = await mf.dispatchFetch(`https://audio.example.com/_migration-audit/${'b'.repeat(64)}.mp3`, {
      method: 'POST', headers: { Authorization: 'Bearer test-audit-token' },
    })
    assert.equal(rejected.status, 502); assert.equal(await rejected.text(), 'Audio verification unavailable')
  } finally { await mf.dispose() }
})
