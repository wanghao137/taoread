import { createHash } from 'node:crypto'
import { withR2Capacity } from './r2-capacity.mjs'
import { setTimeout as delay } from 'node:timers/promises'

export const R2_AUDIO_ACCOUNT = 'b39a61b902f00682c734676cbe147934'
export const R2_AUDIO_ORIGIN = 'https://audio.taostudioai.com'
const pattern = /^tts-public\/[a-f0-9]{64}\.mp3$/
const digest = bytes => createHash('sha256').update(bytes).digest('hex')

export function gatewaySettings(values) {
  if (values.origin !== R2_AUDIO_ORIGIN || values.accountId !== R2_AUDIO_ACCOUNT || values.bucket !== 'taoread-public-audio' || !/^Bearer [a-f0-9]{64}$/.test(values.authorization || '')) throw Error('Dedicated new-account R2 gateway configuration required')
  return values
}

async function request(settings, path, init = {}) {
  const res = await fetch(settings.origin + path, { ...init, redirect: 'error', signal: AbortSignal.timeout(120000) })
  return res
}

export async function gatewayList(settings) {
  const objects = []
  let cursor
  do {
    let page
    // Inventory requests are read-only; retry transport/temporary errors without retrying writes.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await request(settings, '/_audio-store/list', { method: 'POST', headers: { Authorization: settings.authorization, ...(cursor ? { 'X-Audio-Cursor': cursor } : {}) } })
        if (!res.ok) { await res.body?.cancel(); throw Object.assign(Error(`Audio inventory HTTP ${res.status}`), { status: res.status }) }
        page = await res.json()
        break
      } catch (error) {
        if (attempt === 2 || (error.status && ![429, 502, 503, 504].includes(error.status))) throw error
        await delay(500 * (attempt + 1))
      }
    }
    if (page.accountId !== settings.accountId || page.bucket !== settings.bucket || !Array.isArray(page.objects)) throw Error('R2 destination binding mismatch')
    for (const obj of page.objects) {
      if (!pattern.test(obj.key) || !Number.isSafeInteger(obj.bytes) || obj.bytes < 1) throw Error('Unexpected object in dedicated R2 bucket')
      objects.push(obj)
    }
    const previous = cursor
    cursor = page.truncated ? page.cursor : undefined
    if (page.truncated && (!cursor || cursor === previous)) throw Error('R2 listing incomplete')
  } while (cursor)
  return objects.sort((a, b) => a.key.localeCompare(b.key))
}

export async function gatewayGet(settings, key) {
  if (!pattern.test(key)) throw Error('Invalid public audio key')
  // Force the proxy to read the R2 binding, never satisfy verification from an edge cache.
  const res = await request(settings, '/' + key, { headers: { 'If-None-Match': '"migration-require-origin"' } })
  if (!res.ok) { await res.body?.cancel(); throw Object.assign(Error(`R2 audio HTTP ${res.status}`), { status: res.status }) }
  if (res.headers.get('X-Audio-Origin') !== 'r2-new-account') { await res.body?.cancel(); throw Error('Unverified R2 origin') }
  return { bytes: Buffer.from(await res.arrayBuffer()), contentType: res.headers.get('Content-Type'), cacheControl: res.headers.get('Cache-Control') }
}

export async function gatewayPut(settings, key, bytes, { knownAbsent = false } = {}) {
  if (!pattern.test(key)) throw Error('Invalid public audio key')
  if (!knownAbsent) {
    try {
      const current = await gatewayGet(settings, key)
      if (digest(current.bytes) !== digest(bytes)) throw Error('Immutable audio key already has different bytes')
      return current
    } catch (error) { if (error.status !== 404) throw error }
  }
  return withR2Capacity({ accountId: settings.accountId, bytes: bytes.length, stopBytes: 5_400_000_000,
    inventory: async () => ({ bytes: (await gatewayList(settings)).reduce((sum, obj) => sum + obj.bytes, 0) }),
    upload: async () => {
  const res = await request(settings, '/' + key, { method: 'PUT',
    headers: { Authorization: settings.authorization, 'Content-Type': 'audio/mpeg', 'Content-Length': String(bytes.length), 'X-Audio-Sha256': digest(bytes) }, body: bytes })
  if (![201, 412].includes(res.status)) { await res.body?.cancel(); throw Error(`R2 upload HTTP ${res.status}`) }
  await res.body?.cancel()
  const uploaded = await gatewayGet(settings, key)
  if (uploaded.bytes.length !== bytes.length || digest(uploaded.bytes) !== digest(bytes) || uploaded.contentType !== 'audio/mpeg' || !uploaded.cacheControl?.includes('immutable')) throw Error('R2 full upload verification failed')
  return uploaded
    } })
}
