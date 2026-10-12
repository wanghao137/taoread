import { test } from 'node:test'
import assert from 'node:assert/strict'
import worker from '../src/legacy-redirect.mjs'
const { Request } = globalThis

test('legacy audio points to a fixed public origin and preserves read methods', async () => {
  const key = `/tts-public/${'a'.repeat(64)}.mp3`
  for (const method of ['GET', 'HEAD']) {
    const response = await worker.fetch(new Request('https://media.taostudioai.com' + key + '?redirect=https://untrusted.example', { method, headers: { Range: 'bytes=100-', Authorization: 'private', Cookie: 'private' } }))
    assert.equal(response.status, 307)
    assert.equal(response.headers.get('Location'), 'https://audio.taostudioai.com' + key)
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), '*')
    assert.equal(response.headers.get('Cache-Control'), 'no-store')
    assert.equal(await response.text(), '')
  }
  const options = await worker.fetch(new Request('https://media.taostudioai.com' + key, { method: 'OPTIONS' }))
  assert.equal(options.status, 204)
  assert.match(options.headers.get('Access-Control-Allow-Headers'), /Range/)
})

test('legacy route never redirects images, private files, invalid keys or write methods', async () => {
  for (const pathname of ['/art/covers/test.webp', '/tts-private/test.mp3', '/tts-public/not-a-key.mp3', '/tts-public/' + 'a'.repeat(64) + '.mp3/extra']) {
    const response = await worker.fetch(new Request('https://media.taostudioai.com' + pathname))
    assert.equal(response.status, 404)
    assert.equal(response.headers.get('Location'), null)
  }
  for (const method of ['PUT', 'POST', 'DELETE']) {
    const response = await worker.fetch(new Request('https://media.taostudioai.com/tts-public/' + 'b'.repeat(64) + '.mp3', { method }))
    assert.equal(response.status, 405)
    assert.equal(response.headers.get('Location'), null)
  }
})
