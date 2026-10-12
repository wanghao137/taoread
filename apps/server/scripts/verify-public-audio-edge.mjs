/** Full public-response SHA-256 verification inside the temporary authenticated Worker build. */
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import dotenv from 'dotenv'
import { sha256 } from './lib/public-audio-store.mjs'

const arg = name => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3)
if (!arg('freeze') || !arg('base') || !arg('credentials') || !arg('receipt')) throw Error('Explicit manifest, origin, credentials and receipt required')
const source = await readFile(resolve(arg('freeze')))
const freeze = JSON.parse(source), base = new URL(arg('base'))
if (base.protocol !== 'https:' || base.pathname !== '/' || base.username || base.password || base.search || base.hash) throw Error('HTTPS origin required')
const token = dotenv.parse(await readFile(resolve(arg('credentials')))).MIGRATION_AUDIT_TOKEN
if (!token) throw Error('Temporary audit credential missing')
const receipt = { completed: false, mode: 'worker-full-public-response-sha256', base: base.origin, manifestSha256: sha256(source), verified: [] }
const concurrency = Number(arg('concurrency') || 8)
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 8) throw Error('Concurrency must be 1..8')
let cursor = 0, halted = false
async function job() {
  while (!halted && cursor < freeze.files.length) {
    const file = freeze.files[cursor++]
    try {
      let proof
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const result = await fetch(`${base.origin}/_migration-audit/${file.key.slice(11)}`, {
            method: 'POST', headers: { Authorization: `Bearer ${token}` }, redirect: 'error', signal: AbortSignal.timeout(45000),
          })
          if (result.status !== 200) throw Error(`Audio audit HTTP ${result.status}`)
          proof = await result.json()
          break
        } catch (error) { if (attempt === 2) throw Error(`Audio audit failed after bounded retries: ${error.name}: ${error.message}`) }
      }
      if (proof.key !== file.key || proof.bytes !== file.bytes || proof.sha256 !== file.sha256 || proof.etag !== file.etag ||
          proof.contentType !== 'audio/mpeg' || !proof.cacheControl?.includes('immutable')) throw Error('Public audio content/metadata differs')
      receipt.verified.push(proof)
      if (receipt.verified.length % 100 === 0) console.log(JSON.stringify({ verified: receipt.verified.length, total: freeze.files.length }))
    } catch (error) { halted = true; throw Error(`${file.key}: ${error.message}`) }
  }
}
const jobs = await Promise.allSettled(Array.from({ length: concurrency }, job))
const failed = jobs.find(result => result.status === 'rejected')
if (failed) { console.error(failed.reason.message); process.exitCode = 1 }
else { receipt.completed = receipt.verified.length === freeze.files.length; receipt.verifiedAt = new Date().toISOString() }
receipt.verified.sort((a, b) => a.key.localeCompare(b.key))
await writeFile(resolve(arg('receipt')), JSON.stringify(receipt, null, 2))
console.log(JSON.stringify({ completed: receipt.completed, verified: receipt.verified.length }))
