import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { gatewayList, gatewayPut, R2_AUDIO_ACCOUNT } from '../lib/r2-audio-gateway.mjs'
const { Response } = globalThis
const settings = { origin: 'https://audio.taostudioai.com', accountId: R2_AUDIO_ACCOUNT, bucket: 'taoread-public-audio', authorization: `Bearer ${'a'.repeat(64)}` }
const key = `tts-public/${'a'.repeat(64)}.mp3`
test('read-only inventory retries a broken response body and retains exact destination validation', async () => {
  const original = globalThis.fetch
  let calls = 0
  try {
    globalThis.fetch = async () => {
      calls++
      if (calls === 1) return { ok: true, json: async () => { throw TypeError('connection reset mid-body') } }
      return Response.json({ accountId: settings.accountId, bucket: settings.bucket, objects: [{ key, bytes: 10 }], truncated: false })
    }
    assert.equal((await gatewayList(settings)).length, 1)
    assert.equal(calls, 2)
    globalThis.fetch = async () => Response.json({ accountId: 'unexpected', bucket: settings.bucket, objects: [] })
    await assert.rejects(gatewayList(settings), /binding mismatch/)
  } finally { globalThis.fetch = original }
})
test('dedicated 5.4 GB gate stops gateway PUT before any object write', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'tao-gateway-capacity-'))
  const original = globalThis.fetch, previousDirectory = process.env.TAO_R2_CAPACITY_DIR
  let puts = 0
  process.env.TAO_R2_CAPACITY_DIR = directory
  try {
    globalThis.fetch = async (url, init) => {
      if (init.method === 'PUT') { puts++; throw Error('Must not write') }
      if (init.method === 'POST') return Response.json({ accountId: settings.accountId, bucket: settings.bucket, objects: [{ key, bytes: 5_399_999_999 }], truncated: false })
      return new Response(null, { status: 404 })
    }
    await assert.rejects(gatewayPut(settings, key, Buffer.from('new')), /capacity stop/)
    assert.equal(puts, 0)
  } finally {
    globalThis.fetch = original
    if (previousDirectory === undefined) delete process.env.TAO_R2_CAPACITY_DIR
    else process.env.TAO_R2_CAPACITY_DIR = previousDirectory
    await rm(directory, { recursive: true })
  }
})
