import { readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { sha256 } from './lib/public-audio-store.mjs'

const arg = name => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3)
if (!arg('freeze') || !arg('base') || !arg('receipt')) throw Error('Explicit --freeze, --base and --receipt required')
const freezeBuffer = await readFile(resolve(arg('freeze')))
const freeze = JSON.parse(freezeBuffer)
const base = new URL(arg('base'))
if (base.protocol !== 'https:' || base.pathname !== '/' || base.search || base.hash || base.username || base.password) throw Error('HTTPS audio origin required')
const concurrency = Number(arg('concurrency') || 4)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) throw Error('Concurrency must be 1..8')
const receipt = { completed: false, base: base.origin, manifestSha256: sha256(freezeBuffer), verified: [], semantics: [] }
const request = async (url, options = {}) => {
  for (let attempt = 0; ; attempt++) {
    try { return await fetch(url, { ...options, redirect: 'error', signal: globalThis.AbortSignal.timeout(30000) }) }
    catch { if (attempt >= 2) throw Error('CDN network request failed after bounded retries') }
  }
}
let cursor = 0, halted = false
async function job() {
  while (cursor < freeze.files.length && !halted) {
    const file = freeze.files[cursor++]
    try {
      const result = await request(`${base.origin}/${file.key}`)
      if (result.status !== 200 || result.headers.get('Content-Type') !== 'audio/mpeg' || Number(result.headers.get('Content-Length')) !== file.bytes || result.headers.get('Access-Control-Allow-Origin') !== '*') throw Error('CDN response metadata mismatch')
      const bytes = Buffer.from(await result.arrayBuffer())
      if (bytes.length !== file.bytes || sha256(bytes) !== file.sha256) throw Error('CDN full-content mismatch')
      receipt.verified.push({ key: file.key, bytes: file.bytes, sha256: file.sha256 })
      if (receipt.verified.length % 100 === 0) console.log(JSON.stringify({ verified: receipt.verified.length, total: freeze.files.length }))
    } catch (error) { halted = true; throw Error(`CDN verification failed: ${file.key}: ${error.message}`) }
  }
}
try {
  const jobs = await Promise.allSettled(Array.from({ length: concurrency }, job))
  const failed = jobs.find(result => result.status === 'rejected')
  if (failed) throw failed.reason
  const samples = [freeze.files[0], freeze.files[Math.floor(freeze.files.length / 2)], freeze.files.at(-1)]
  for (const file of samples) {
    const url = `${base.origin}/${file.key}`
    const source = await readFile(join(freeze.media, file.key))
    const head = await request(url, { method: 'HEAD' })
    if (head.status !== 200 || Number(head.headers.get('Content-Length')) !== file.bytes || (await head.arrayBuffer()).byteLength !== 0) throw Error('CDN HEAD mismatch')
    const etag = head.headers.get('ETag')
    for (const [range, start, end] of [['bytes=0-63', 0, 63], ['bytes=-64', file.bytes - 64, file.bytes - 1], [`bytes=${file.bytes - 64}-`, file.bytes - 64, file.bytes - 1]]) {
      const response = await request(url, { headers: { Range: range } })
      const body = Buffer.from(await response.arrayBuffer())
      if (response.status !== 206 || response.headers.get('Content-Range') !== `bytes ${start}-${end}/${file.bytes}` || !body.equals(source.subarray(start, end + 1))) throw Error('CDN Range mismatch')
    }
    const invalid = await request(url, { headers: { Range: `bytes=${file.bytes}-` } })
    if (invalid.status !== 416) throw Error('CDN unsatisfiable Range mismatch')
    const unchanged = await request(url, { headers: { 'If-None-Match': etag } })
    if (unchanged.status !== 304) throw Error('CDN conditional GET mismatch')
    const staleRange = await request(url, { headers: { Range: 'bytes=0-63', 'If-Range': '"old-version"' } })
    if (staleRange.status !== 200 || sha256(Buffer.from(await staleRange.arrayBuffer())) !== file.sha256) throw Error('CDN If-Range mismatch')
    receipt.semantics.push({ key: file.key, head: true, ranges: true, conditional: true, ifRange: true })
  }
  for (const path of ['/db/latest.db', '/recovery/manifest.json', '/tts-private/test.mp3', '/art/covers/test.webp']) {
    if ((await request(base.origin + path)).status !== 404) throw Error('CDN path isolation failed')
  }
  receipt.completed = true; receipt.verifiedAt = new Date().toISOString()
} catch (error) { console.error(error.message); process.exitCode = 1 }
receipt.verified.sort((a, b) => a.key.localeCompare(b.key))
await writeFile(resolve(arg('receipt')), JSON.stringify(receipt, null, 2))
console.log(JSON.stringify({ completed: receipt.completed, verified: receipt.verified.length, semanticSamples: receipt.semantics.length }))
