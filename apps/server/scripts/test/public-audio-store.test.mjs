import { test } from 'node:test'
import assert from 'node:assert/strict'
import { audioSettings, putAudio } from '../lib/public-audio-store.mjs'
import { dedicatedAudioAuth } from '../lib/b2-audio-inventory.mjs'

test('B2 configuration fails closed and worker origin cannot silently upload to R2', () => {
  assert.throws(() => audioSettings({ TAO_PUBLIC_AUDIO_STORE: 'b2' }))
  assert.throws(() => audioSettings({ TAO_TTS_PUBLIC_BASE: 'https://audio.example.com' }))
  assert.throws(() => audioSettings({ TAO_PUBLIC_AUDIO_STORE: 'unexpected' }))
  assert.equal(audioSettings({}), null)
})

test('new R2 gateway is isolated from image credentials and rejects account or origin drift', () => {
  const values = { TAO_PUBLIC_AUDIO_STORE: 'r2-worker', TAO_TTS_PUBLIC_BASE: 'https://audio.taostudioai.com',
    TAO_AUDIO_GATEWAY: 'https://audio.taostudioai.com', TAO_AUDIO_ACCOUNT_ID: 'b39a61b902f00682c734676cbe147934',
    TAO_AUDIO_BUCKET: 'taoread-public-audio', TAO_AUDIO_AUTHORIZATION: `Bearer ${'a'.repeat(64)}`,
    R2_ACCOUNT_ID: 'original-account', R2_ACCESS_KEY_ID: 'images-only', R2_SECRET_ACCESS_KEY: 'images-only' }
  const store = audioSettings(values)
  assert.equal(store.accountId, values.TAO_AUDIO_ACCOUNT_ID)
  assert.equal(store.bucket, 'taoread-public-audio')
  for (const changed of [{ TAO_AUDIO_ACCOUNT_ID: values.R2_ACCOUNT_ID }, { TAO_AUDIO_GATEWAY: 'https://unexpected.example' }, { TAO_AUDIO_AUTHORIZATION: undefined }, { TAO_AUDIO_BUCKET: 'taoread-media' }]) assert.throws(() => audioSettings({ ...values, ...changed }))
})

test('audio credentials cannot include backup buckets, global access or broader prefixes', () => {
  const allowed = { buckets: [{ id: 'audio', name: 'taoread-public-audio' }], namePrefix: 'tts-public/', capabilities: ['readFiles', 'listFiles', 'writeFiles'] }
  assert.equal(dedicatedAudioAuth({ allowed }, true), 'audio')
  for (const bad of [{ ...allowed, buckets: null }, { ...allowed, namePrefix: null }, { ...allowed, buckets: [{ id: 'backup', name: 'taoread-backup' }] }, { ...allowed, capabilities: ['readFiles', 'listFiles'] }]) {
    assert.throws(() => dedicatedAudioAuth({ allowed: bad }, true))
  }
})

test('immutable keys reject old export bytes and transport failures never trigger writes', async () => {
  const key = `tts-public/${'a'.repeat(64)}.mp3`
  let writes = 0
  const mismatchClient = { send: async command => {
    if (command.constructor.name !== 'GetObjectCommand') writes++
    return { Body: { transformToByteArray: async () => Buffer.from('new compressed audio') } }
  } }
  await assert.rejects(putAudio(mismatchClient, { bucket: 'taoread-public-audio' }, key, Buffer.from('old export')), /different bytes/)
  const unavailableClient = { send: async command => {
    if (command.constructor.name !== 'GetObjectCommand') writes++
    throw Object.assign(Error('Temporary unavailable'), { $metadata: { httpStatusCode: 503 } })
  } }
  await assert.rejects(putAudio(unavailableClient, { bucket: 'taoread-public-audio' }, key, Buffer.from('audio')), /Temporary unavailable/)
  assert.equal(writes, 0)
})
