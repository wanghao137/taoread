import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NodeHttpHandler } from '@smithy/node-http-handler'
import { gatewaySettings, gatewayList, gatewayGet, gatewayPut } from './r2-audio-gateway.mjs'
import { guardedR2Upload } from './r2-capacity.mjs'

export const AUDIO_BUCKET = 'taoread-public-audio'
export const AUDIO_KEY = /^tts-public\/[a-f0-9]{64}\.mp3$/
export const sha256 = buffer => createHash('sha256').update(buffer).digest('hex')

export function audioSettings(env) {
  const target = env.TAO_PUBLIC_AUDIO_STORE || 'r2'
  if (env.TAO_TTS_PUBLIC_BASE && !['b2', 'r2-worker'].includes(target)) throw Error('Independent audio origin requires an explicit dedicated upload target')
  if (target === 'r2-worker') return { target, ...gatewaySettings({
    origin: env.TAO_AUDIO_GATEWAY, accountId: env.TAO_AUDIO_ACCOUNT_ID,
    bucket: env.TAO_AUDIO_BUCKET, authorization: env.TAO_AUDIO_AUTHORIZATION,
  }) }
  if (target === 'r2') {
    const configured = env.R2_ACCOUNT_ID && env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY
    return configured ? {
      target, accountId: env.R2_ACCOUNT_ID, bucket: env.TAO_R2_MEDIA_BUCKET || 'taoread-media', region: 'auto',
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
    } : null
  }
  if (target !== 'b2') throw Error('Unsupported public audio store')
  const endpoint = env.TAO_AUDIO_S3_ENDPOINT
  if (!/^https:\/\/s3\.[a-z0-9-]+\.backblazeb2\.com$/.test(endpoint || '') ||
      env.TAO_AUDIO_BUCKET !== AUDIO_BUCKET || !env.TAO_AUDIO_ACCESS_KEY_ID || !env.TAO_AUDIO_SECRET_ACCESS_KEY) {
    throw Error('Explicit dedicated B2 audio credentials required; R2 fallback is disabled')
  }
  return {
    target, bucket: AUDIO_BUCKET, endpoint, region: new URL(endpoint).hostname.split('.')[1],
    credentials: { accessKeyId: env.TAO_AUDIO_ACCESS_KEY_ID, secretAccessKey: env.TAO_AUDIO_SECRET_ACCESS_KEY },
  }
}

/** Load only audio settings; never replace the selected DB or TTS provider. */
export async function loadAudioEnvironment(env, file = '.env.audio') {
  let values
  try { values = dotenv.parse(await readFile(file)) } catch (error) {
    if (error.code === 'ENOENT') return env
    throw error
  }
  for (const key of ['TAO_R2_CAPACITY_DIR', 'TAO_PUBLIC_AUDIO_STORE', 'TAO_AUDIO_S3_ENDPOINT', 'TAO_AUDIO_BUCKET', 'TAO_AUDIO_ACCESS_KEY_ID', 'TAO_AUDIO_SECRET_ACCESS_KEY', 'TAO_AUDIO_GATEWAY', 'TAO_AUDIO_ACCOUNT_ID', 'TAO_AUDIO_AUTHORIZATION']) {
    if (values[key] !== undefined) env[key] = values[key]
  }
  return env
}

export function audioClient(settings) {
  if (settings.target === 'r2-worker') return { gateway: settings, destroy() {} }
  return new S3Client({ ...settings, requestChecksumCalculation: 'WHEN_REQUIRED', maxAttempts: 3,
    requestHandler: new NodeHttpHandler({ connectionTimeout: 15000, requestTimeout: 45000 }) })
}

export async function listAudio(client, bucket) {
  if (client.gateway) return gatewayList(client.gateway)
  const objects = []
  let token
  do {
    const page = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: 'tts-public/', ContinuationToken: token }))
    for (const item of page.Contents || []) {
      if (!AUDIO_KEY.test(item.Key)) throw Error('Unexpected object in public audio prefix')
      objects.push({ key: item.Key, bytes: item.Size, etag: item.ETag })
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined
    if (page.IsTruncated && !token) throw Error('Incomplete audio listing')
  } while (token)
  return objects.sort((a, b) => a.key.localeCompare(b.key))
}

export async function getAudio(client, bucket, key) {
  if (client.gateway) {
    try { return await gatewayGet(client.gateway, key) } catch (error) {
      if (error.status) error.$metadata = { httpStatusCode: error.status }
      throw error
    }
  }
  if (!AUDIO_KEY.test(key)) throw Error('Invalid public audio key')
  const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  const bytes = Buffer.from(await result.Body.transformToByteArray())
  return { bytes, contentType: result.ContentType, cacheControl: result.CacheControl }
}

/** Content keys are immutable. A mismatch requires a new key, never overwrite. */
export async function putAudio(client, settings, key, buffer) {
  if (!AUDIO_KEY.test(key)) throw Error('Invalid public audio key')
  if (client.gateway) {
    return gatewayPut(client.gateway, key, buffer)
  }
  try {
    const existing = await getAudio(client, settings.bucket, key)
    if (existing.bytes.length !== buffer.length || sha256(existing.bytes) !== sha256(buffer)) throw Error('Immutable audio key already has different bytes')
    return existing
  } catch (error) {
    if (error?.$metadata?.httpStatusCode !== 404) throw error
  }
  const upload = () => client.send(new PutObjectCommand({
    Bucket: settings.bucket, Key: key, Body: buffer,
    ContentMD5: createHash('md5').update(buffer).digest('base64'),
    ContentType: 'audio/mpeg', CacheControl: 'public, max-age=31536000, immutable',
    Metadata: { sha256: sha256(buffer) },
  }))
  if (settings.target === 'r2') await guardedR2Upload(client, settings.accountId, buffer.length, upload)
  else await upload()
  const uploaded = await getAudio(client, settings.bucket, key)
  if (uploaded.bytes.length !== buffer.length || sha256(uploaded.bytes) !== sha256(buffer)) throw Error('Uploaded audio verification failed')
  return uploaded
}
