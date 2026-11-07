// docs/105 方案C-lite：web 静态资产上传 taoread-dist 桶 web/ 前缀（dl.taostudioai.com/web/*）。
// 传输层=CF REST API（wrangler spawn 在本机网络下挂死过一次——docs/102 已知坑，REST 全程可靠）。
// 幂等（同名覆盖）；上传集=dist 除 index.html/sw.js/offline*/download.html/art 外全部。
// 用法：node scripts/publish-web-assets.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const env = readFileSync('apps/server/.env.dist', 'utf8')
const acc = env.match(/CF_DIST_ACCOUNT_ID=(.*)/)?.[1]?.trim()
const token = env.match(/CF_DIST_API_TOKEN=(.*)/)?.[1]?.trim()
if (!acc || !token) throw new Error('.env.dist 缺凭据')
const BASE = readFileSync('apps/web/.env.cdn', 'utf8').match(/VITE_ASSET_BASE=(.*)/)?.[1]?.trim()
if (!BASE) throw new Error('.env.cdn 缺 VITE_ASSET_BASE')
const DIST = 'apps/web/dist'
const SKIP_FILES = new Set(['index.html', 'sw.js', 'offline.html', 'offline-reader.js', 'download.html'])

const CT = {
  '.js': 'application/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain',
  '.wav': 'audio/wav', '.html': 'text/html; charset=utf-8',
}

function* walk(dir, prefix = '') {
  for (const name of readdirSync(dir)) {
    if (prefix === '' && SKIP_FILES.has(name)) continue
    const full = join(dir, name)
    const rel = prefix ? `${prefix}/${name}` : name
    if (statSync(full).isDirectory()) yield* walk(full, rel)
    else yield { full, rel }
  }
}

const files = [...walk(DIST)]
const bytes = files.reduce((s, f) => s + statSync(f.full).size, 0)
console.log(`upload ${files.length} files, ${(bytes / 1e6).toFixed(1)}MB → ${BASE}`)

let ok = 0
const failures = []
const queue = [...files]

async function put(f) {
  const ct = CT[extname(f.full)] ?? 'application/octet-stream'
  const body = readFileSync(f.full)
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${acc}/r2/buckets/taoread-dist/objects/web%2F${f.rel.split('/').map(encodeURIComponent).join('%2F')}`,
        { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': ct }, body },
      )
      if (res.ok) { ok += 1; return }
      const text = await res.text()
      if (attempt === 3) throw new Error(`HTTP ${res.status} ${text.slice(0, 120)}`)
    } catch (e) {
      if (attempt === 3) { failures.push(`${f.rel}: ${String(e.message).slice(0, 100)}`); return }
      await new Promise(r => setTimeout(r, 1500 * attempt))
    }
  }
}

await Promise.all(Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const f = queue.shift()
    if (!f) return
    await put(f)
  }
}))
console.log(`done ok=${ok} fail=${failures.length}`)
for (const f of failures.slice(0, 10)) console.error('FAIL', f)
if (failures.length > 0) process.exit(2)
