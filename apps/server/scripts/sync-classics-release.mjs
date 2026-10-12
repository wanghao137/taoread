/** Upload only an exact nine-book release export and verify every remote byte.
 * Without --upload this is read-only. Never loads DB settings from .env.r2. */
import { readFile, writeFile, rename } from 'node:fs/promises'
import { resolve, join, relative, isAbsolute } from 'node:path'
import { createHash } from 'node:crypto'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import { guardedR2Upload } from './lib/r2-capacity.mjs'
import { loadAudioEnvironment, audioSettings, audioClient, getAudio, putAudio } from './lib/public-audio-store.mjs'

const arg = name => process.argv.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const concurrency = Number(arg('concurrency') ?? '4')
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 16) throw Error('Upload concurrency must be an integer from 1 to 16')
const manifestPath = arg('manifest'), credentialPath = arg('credentials'), receiptPath = arg('receipt')
if (!manifestPath || !credentialPath || !receiptPath) throw Error('Explicit --manifest, --credentials and --receipt required')
const manifestBuffer = await readFile(resolve(manifestPath))
const manifest = JSON.parse(manifestBuffer.toString('utf8'))
const expected = ['andersen', 'grimm', 'aesop', 'willows', 'oz', 'alice', 'garden', 'nils', 'prince'].map(s => `zh-classic-${s}`)
if (!Array.isArray(manifest.books) || manifest.books.length !== 9 || new Set(manifest.books).size !== 9 || manifest.books.some(id => !expected.includes(id)) || !Array.isArray(manifest.files) || !manifest.files.length || new Set(manifest.files.map(f => f.path)).size !== manifest.files.length) throw Error('Unexpected release scope')
const media = resolve(manifest.media)
const digest = buffer => createHash('sha256').update(buffer).digest('hex')
// Validate all local input before any external write.
for (const file of manifest.files) {
  if (typeof file.path !== 'string' || !/^(?:art\/(?:covers|chapters)\/(?:cover-)?zh-classic-[a-z]+(?:-ch\d+)?(?:\.(?:thumb|reader))?\.webp|tts-public\/[a-f0-9]{64}\.mp3)$/.test(file.path) || !Number.isInteger(file.bytes) || file.bytes <= 0 || !/^[a-f0-9]{64}$/.test(file.sha256)) throw Error('Unsafe release media entry')
  const child = relative(media, resolve(media, file.path))
  if (!child || child.startsWith('..') || isAbsolute(child)) throw Error('Export path escapes media directory')
  const buffer = await readFile(join(media, file.path))
  if (buffer.length !== file.bytes || digest(buffer) !== file.sha256) throw Error(`Local export changed: ${file.path}`)
}
const secrets = dotenv.parse(await readFile(resolve(credentialPath)))
if (secrets.TAO_R2_CAPACITY_DIR) process.env.TAO_R2_CAPACITY_DIR = secrets.TAO_R2_CAPACITY_DIR
const account = secrets.R2_ACCOUNT_ID, access = secrets.R2_ACCESS_KEY_ID, secret = secrets.R2_SECRET_ACCESS_KEY
if (!account || !access || !secret) throw Error('R2 credentials missing')
const bucket = secrets.TAO_R2_MEDIA_BUCKET || 'taoread-media'
if (bucket !== 'taoread-media') throw Error('Unexpected media bucket')
const client = new S3Client({ region: 'auto', endpoint: `https://${account}.r2.cloudflarestorage.com`, credentials: { accessKeyId: access, secretAccessKey: secret } })
const audioEnv = { ...process.env, ...secrets }
await loadAudioEnvironment(audioEnv, arg('audio-credentials') || '.env.audio')
const audioStore = audioSettings(audioEnv)
const audio = audioStore?.target !== 'r2' ? audioClient(audioStore) : client
const targetFor = file => file.path.startsWith('tts-public/') ? { client: audio, bucket: audioStore.bucket } : { client, bucket }
const upload = process.argv.includes('--upload')
const receipt = { manifestSha256: digest(manifestBuffer), bucket, audioTarget: { store: audioStore.target, bucket: audioStore.bucket }, verified: [] }
let cursor = 0, halted = false
async function remoteBytes(file) {
  const target = targetFor(file)
  const buffer = file.path.startsWith('tts-public/')
    ? (await getAudio(target.client, target.bucket, file.path)).bytes
    : Buffer.from(await (await target.client.send(new GetObjectCommand({ Bucket: target.bucket, Key: file.path }))).Body.transformToByteArray())
  if (buffer.length !== file.bytes || digest(buffer) !== file.sha256) throw Error('Remote byte mismatch')
}
async function worker() {
  while (cursor < manifest.files.length && !halted) {
    const file = manifest.files[cursor++]
    try {
      let matches = false
      try { await remoteBytes(file); matches = true } catch (error) {
        if (!upload) throw error
        // Authentication and transport errors are not evidence of absence.
        if (error?.$metadata?.httpStatusCode !== 404 && error?.message !== 'Remote byte mismatch') throw error
      }
      if (!matches) {
        if (file.path.startsWith('tts-public/')) {
          await putAudio(audio, audioStore, file.path, await readFile(join(media, file.path)))
        } else {
          const body = await readFile(join(media, file.path))
          await guardedR2Upload(client, account, body.length, () => client.send(new PutObjectCommand({ Bucket: bucket, Key: file.path, Body: body, ContentType: 'image/webp', CacheControl: 'public, max-age=31536000, immutable', Metadata: { sha256: file.sha256 } })))
        }
        await remoteBytes(file)
      }
      receipt.verified.push({ path: file.path, bytes: file.bytes, sha256: file.sha256, bucket: targetFor(file).bucket })
      if (receipt.verified.length % 50 === 0) console.log(`Verified ${receipt.verified.length}/${manifest.files.length} remote objects`)
    } catch {
      halted = true
      // Do not expose raw SDK diagnostics or signed request data.
      throw Error(`Remote media verification failed: ${file.path}`)
    }
  }
}
try {
  const results = await Promise.allSettled(Array.from({ length: concurrency }, worker))
  if (results.some(r => r.status === 'rejected') || receipt.verified.length !== manifest.files.length) throw Error('Remote verification incomplete; no success receipt emitted')
  receipt.verified.sort((a, b) => a.path.localeCompare(b.path))
  const statePath = join(media, '.tts-public-state.json')
  const state = JSON.parse(await readFile(statePath, 'utf8'))
  const keys = manifest.files.filter(f => f.path.startsWith('tts-public/')).map(f => f.path.slice(11, -4))
  if (Object.keys(state).length !== keys.length || keys.some(key => !state[key])) throw Error('Export narration index differs from verified remote files')
  for (const key of keys) { state[key].uploaded = true; state[key].store = audioStore.target }
  await writeFile(`${statePath}.tmp`, JSON.stringify(state, null, 2) + '\n')
  await rename(`${statePath}.tmp`, statePath)
  const path = resolve(receiptPath)
  await writeFile(`${path}.tmp`, JSON.stringify(receipt, null, 2) + '\n')
  await rename(`${path}.tmp`, path)
  console.log(JSON.stringify({ bucket, verified: receipt.verified.length, manifestSha256: receipt.manifestSha256, upload }))
} finally { client.destroy(); if (audio !== client) audio.destroy() }
