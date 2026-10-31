/**
 * curl-based R2 audio bucket inventory warmer (2026-10-31).
 * node fetch to audio.taostudioai.com wedges on this network; curl has been reliable.
 * Paginates POST /_audio-store/list until complete, sums bytes, writes the shared
 * capacity ledger JSON (same format as withR2Capacity) with scannedAt=now.
 * Usage: node scripts/expand-ledger-warm.mjs   (no args, safe to re-run)
 */
import { readFileSync, writeFileSync, renameSync, unlinkSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const env = {}
for (const line of readFileSync('D:/codesolo/taoread/apps/server/.env.audio', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].replace(/^"(.*)"$/, '$1')
}
const GW = env.TAO_AUDIO_GATEWAY
const AUTH = env.TAO_AUDIO_AUTHORIZATION
const LEDGER = 'D:/taoread-prod/.r2-capacity/b39a61b902f00682c734676cbe147934.json'
const ACCOUNT = 'b39a61b902f00682c734676cbe147934'
const BUCKET = 'taoread-public-audio'

function listPage(cursor) {
  const args = ['-s', '--max-time', '60', '--retry', '3', '--retry-delay', '3', '-X', 'POST',
    GW + '/_audio-store/list', '-H', 'Authorization: ' + AUTH]
  if (cursor) args.push('-H', 'X-Audio-Cursor: ' + cursor)
  const out = execFileSync('curl', args, { encoding: 'utf8', timeout: 90000, windowsHide: true })
  const page = JSON.parse(out)
  if (page.accountId !== ACCOUNT || page.bucket !== BUCKET || !Array.isArray(page.objects)) {
    throw new Error('gateway binding mismatch')
  }
  return page
}

let objects = 0
let bytes = 0
let cursor
let pages = 0
for (;;) {
  const page = listPage(cursor)
  pages++
  for (const o of page.objects) {
    objects++
    bytes += o.bytes
  }
  if (!page.truncated) break
  cursor = page.cursor
  if (pages % 10 === 0) console.log('page ' + pages + ', objects ' + objects + ', bytes ' + bytes)
}
console.log('inventory complete: pages=' + pages + ' objects=' + objects + ' bytes=' + bytes + ' (' + (bytes / 1e9).toFixed(2) + ' GB)')
const ledger = {
  accountId: ACCOUNT,
  bytes,
  scannedAt: Date.now(),
  buckets: [{ bucket: BUCKET, bytes, count: objects }],
}
const tmp = LEDGER + '.warm-tmp'
writeFileSync(tmp, JSON.stringify(ledger))
renameSync(tmp, LEDGER)
console.log('ledger written: ' + LEDGER)
