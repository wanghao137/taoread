import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { inventoryR2Account, withR2Capacity } from '../lib/r2-capacity.mjs'
const accountId = 'a'.repeat(32)
test('counts other projects and multipart parts; refuses incomplete listings', async () => {
  const client = { send: async command => {
    const { Bucket } = command.input
    switch (command.constructor.name) {
      case 'ListBucketsCommand': return { Buckets: [{ Name: 'media' }, { Name: 'other-project' }] }
      case 'ListObjectsV2Command': return { Contents: [{ Size: Bucket === 'media' ? 1_000_000_000 : 7_500_000_000 }] }
      case 'ListMultipartUploadsCommand': return { Uploads: Bucket === 'media' ? [{ Key: 'upload', UploadId: 'id' }] : [] }
      case 'ListPartsCommand': return { Parts: [{ Size: 100_000_000 }] }
      default: throw Error('Unexpected command')
    }
  } }
  assert.equal((await inventoryR2Account(client)).bytes, 8_600_000_000)
  const bad = { send: async command => command.constructor.name === 'ListBucketsCommand' ? { Buckets: [{ Name: 'media' }] } : { IsTruncated: true } }
  await assert.rejects(inventoryR2Account(bad), /Incomplete/)
})
test('warns at 8 GB, refuses 9 GB, preserves uncertain write reservations', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'tao-capacity-'))
  try {
    let writes = 0, warnings = 0
    const args = { directory, accountId, inventory: async () => ({ bytes: 7_900_000_000 }), warn: () => warnings++ }
    await assert.rejects(withR2Capacity({ ...args, bytes: 500_000_000, upload: async () => { writes++; throw Error('transport timeout') } }), /timeout/)
    assert.equal(warnings, 1)
    await assert.rejects(withR2Capacity({ ...args, bytes: 600_000_000, upload: async () => writes++ }), /capacity stop/)
    assert.equal(writes, 1)
    await assert.rejects(withR2Capacity({ ...args, maxAgeMs: 0, bytes: 1, inventory: async () => { throw Error('scan denied') }, upload: async () => writes++ }), /scan denied/)
    assert.equal(writes, 1)
  } finally { await rm(directory, { recursive: true }) }
})
test('independent concurrent processes cannot both reserve the last free space', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'tao-capacity-'))
  try {
    const module = new URL('../lib/r2-capacity.mjs', import.meta.url).href
    const script = `import {withR2Capacity} from ${JSON.stringify(module)}; try {await withR2Capacity({directory:process.argv[1],accountId:'${accountId}',bytes:600000000,inventory:async()=>({bytes:8000000000}),upload:async()=>new Promise(r=>setTimeout(r,200)),warn:()=>{}});console.log('uploaded')} catch(e){console.log('stopped')}`
    const run = () => new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['--input-type=module', '-e', script, directory])
      let result = ''; child.stdout.on('data', value => { result += value }); child.on('error', reject); child.on('close', code => code === 0 ? resolve(result.trim()) : reject(Error('Process failed')))
    })
    assert.deepEqual((await Promise.all([run(), run()])).sort(), ['stopped', 'uploaded'])
  } finally { await rm(directory, { recursive: true }) }
})
