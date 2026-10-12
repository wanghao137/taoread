import { AUDIO_BUCKET } from './public-audio-store.mjs'

async function jsonRequest(url, options) {
  const result = await fetch(url, { ...options, signal: globalThis.AbortSignal.timeout(30000) })
  if (!result.ok) throw Error(`B2 inventory request failed (${result.status})`)
  return result.json()
}

export async function authorizeB2(keyId, key) {
  const auth = await jsonRequest('https://api.backblazeb2.com/b2api/v4/b2_authorize_account', {
    headers: { Authorization: `Basic ${Buffer.from(`${keyId}:${key}`).toString('base64')}` },
  })
  const api = auth.apiInfo.storageApi
  if (!/^https:\/\/api[0-9]+\.backblazeb2\.com$/.test(api.apiUrl)) throw Error('Unexpected B2 inventory API endpoint')
  return { accountId: auth.accountId, token: auth.authorizationToken, apiUrl: api.apiUrl, allowed: api.allowed }
}

export function dedicatedAudioAuth(auth, write = false) {
  const allowed = auth.allowed
  if (allowed.buckets?.length !== 1 || allowed.buckets[0].name !== AUDIO_BUCKET ||
      allowed.namePrefix !== 'tts-public/' || !allowed.capabilities.includes('readFiles') ||
      !allowed.capabilities.includes('listFiles') || (write && !allowed.capabilities.includes('writeFiles'))) {
    throw Error('B2 key must be restricted to the audio bucket and tts-public/ with required capabilities')
  }
  return allowed.buckets[0].id
}

/** Count all billable versions, including superseded files; no HEAD-per-object scans. */
export async function b2Versions(auth, bucketId, prefix = '') {
  let nextFileName, nextFileId
  const files = []
  do {
    const page = await jsonRequest(`${auth.apiUrl}/b2api/v4/b2_list_file_versions`, {
      method: 'POST', headers: { Authorization: auth.token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ bucketId, prefix, maxFileCount: 10000, startFileName: nextFileName, startFileId: nextFileId }),
    })
    files.push(...page.files.map(file => ({ key: file.fileName, bytes: file.contentLength || 0, action: file.action, id: file.fileId })))
    nextFileName = page.nextFileName; nextFileId = page.nextFileId
  } while (nextFileName)
  return { bytes: files.reduce((sum, file) => sum + file.bytes, 0), versions: files.length, files }
}
