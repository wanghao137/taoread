// docs/105 方案C-lite：taoread-dist-origin Worker 的 REST 部署（wrangler 在本机网络下 fetch 不稳）。
// 用法：node scripts/deploy-dist-worker.mjs
// 凭据：apps/server/.env.dist（CF_DIST_ACCOUNT_ID / CF_DIST_API_TOKEN）。
import { readFileSync } from 'node:fs'

const env = readFileSync('apps/server/.env.dist', 'utf8')
const acc = env.match(/CF_DIST_ACCOUNT_ID=(.*)/)?.[1]?.trim()
const token = env.match(/CF_DIST_API_TOKEN=(.*)/)?.[1]?.trim()
if (!acc || !token) throw new Error('.env.dist 缺 CF_DIST_ACCOUNT_ID / CF_DIST_API_TOKEN')

const script = readFileSync('workers/dist-origin/src/index.js', 'utf8')
const metadata = {
  main_module: 'index.js',
  compatibility_date: '2026-10-01',
  bindings: [{ type: 'r2_bucket', name: 'DIST', bucket_name: 'taoread-dist' }],
}

const form = new FormData()
form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }), 'metadata.json')
form.append('script', new Blob([script], { type: 'application/javascript+module' }), 'index.js')

const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${acc}/workers/scripts/taoread-dist-origin`, {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}` },
  body: form,
})
const out = await res.json()
if (!res.ok || !out.success) {
  console.error('deploy failed:', res.status, JSON.stringify(out.errors ?? out).slice(0, 400))
  process.exit(1)
}
console.log('worker deployed:', out.result?.id, 'modified:', out.result?.modified_on)
