/**
 * 公共音频桶死键清理（docs/109，2026-11-07）。
 *
 * 背景：发音修正/音色/语速等参数轮换会整体更换预生成段键，旧文件滞留桶里
 * （本轮清理前：29,277 对象 8.26GB，其中 11,405 个/2.86GB 是死键）。
 *
 * 真值口径：期望键集纯由清单推导——media/.tts-public-state.json 每个条目的
 * `audioKey ?? cacheKey` 即对象文件名（与 publicCache.segmentPath 同构，
 * 运行时只会外链这些键）。桶 − 期望集 = 死键；期望集 − 桶 = 缺失（应走源站兜底）。
 *
 * 安全护栏：
 *   1. 只处理 tts-public/ 前缀，桶里其他前缀只报告不动；
 *   2. 形状守卫：死键必须匹配 ^tts-public/[0-9a-f]{64}(-model)?\.mp3$，否则保留并报告；
 *   3. 默认 DRY-RUN（只打印将删数量与字节），--apply 才真删；
 *   4. 404 计为已删（幂等，可重跑）。
 *
 * 凭据：apps/server/.env.dist 的 CF_DIST_ACCOUNT_ID / CF_DIST_API_TOKEN（需 R2 编辑权限）。
 * 用法（仓库根目录）：node scripts/clean-public-audio-dead-keys.mjs [--apply]
 */
import { readFileSync } from 'node:fs'

const MANIFEST = process.env.TAO_MEDIA_DIR
  ? `${process.env.TAO_MEDIA_DIR}/.tts-public-state.json`
  : 'D:/taoread-prod/apps/server/media/.tts-public-state.json'
const BUCKET = process.env.TAO_AUDIO_BUCKET ?? 'taoread-public-audio'
const PREFIX = 'tts-public/'

const env = readFileSync('apps/server/.env.dist', 'utf8')
const acc = env.match(/CF_DIST_ACCOUNT_ID=(.*)/)[1].trim()
const token = env.match(/CF_DIST_API_TOKEN=(.*)/)[1].trim()
const H = { authorization: `Bearer ${token}` }

// 1) manifest-derived expected set
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
const expected = new Set()
for (const [k, v] of Object.entries(manifest)) expected.add(`${v.audioKey ?? k}.mp3`)
console.log(`manifest entries: ${Object.keys(manifest).length} -> expected objects: ${expected.size}`)

// 2) full bucket listing (paginated)
const all = []
let cursor = ''
for (;;) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${acc}/r2/buckets/${BUCKET}/objects?per_page=1000${cursor ? `&cursor=${cursor}` : ''}`
  const res = await fetch(url, { headers: H, signal: AbortSignal.timeout(30000) })
  const j = await res.json()
  if (!res.ok || !j.success) throw new Error(`list failed: ${res.status} ${JSON.stringify(j).slice(0, 120)}`)
  all.push(...(j.result ?? []))
  cursor = j.result_info?.cursor
  if (!j.result_info?.is_truncated || !cursor) break
}
console.log(`bucket objects: ${all.length}, total ${(all.reduce((s, o) => s + (o.size ?? 0), 0) / 1e9).toFixed(2)}GB`)

// 3) diff with guards
const dead = [], outside = []
let liveCount = 0, liveBytes = 0
for (const o of all) {
  if (!o.key.startsWith(PREFIX)) { outside.push(o.key); continue }
  const name = o.key.slice(PREFIX.length)
  if (expected.has(name)) { liveCount += 1; liveBytes += o.size ?? 0 }
  else dead.push(o.key)
}
const bad = dead.filter((k) => !/^tts-public\/[0-9a-f]{64}(-[A-Za-z0-9]+)?\.mp3$/.test(k))
console.log(`live: ${liveCount} (${(liveBytes / 1e9).toFixed(2)}GB) | dead: ${dead.length} objs | outside-prefix: ${outside.length}`)
if (bad.length) {
  console.log(`!! ${bad.length} dead keys fail the shape guard — keeping them, inspect manually:`)
  bad.slice(0, 5).forEach((k) => console.log('  ', k))
}
const deletable = dead.filter((k) => !bad.includes(k))
console.log(`deletable: ${deletable.length}`)
if (!process.argv.includes('--apply')) {
  console.log('DRY-RUN — rerun with --apply to delete')
  process.exit(0)
}

// 4) delete (idempotent; 404 = already gone)
let ok = 0, missing = 0, fail = 0
const failures = []
const queue = [...deletable]
async function worker() {
  for (;;) {
    const key = queue.shift()
    if (!key) return
    const url = `https://api.cloudflare.com/client/v4/accounts/${acc}/r2/buckets/${BUCKET}/objects/${encodeURIComponent(key)}`
    let settled = false
    for (let a = 1; a <= 3 && !settled; a++) {
      try {
        const res = await fetch(url, { method: 'DELETE', headers: H, signal: AbortSignal.timeout(30000) })
        if (res.status === 200) { ok += 1; settled = true }
        else if (res.status === 404) { missing += 1; settled = true }
        else if (a === 3) { fail += 1; failures.push(`HTTP ${res.status} ${key.slice(11, 44)}`) }
      } catch {
        if (a === 3) { fail += 1; failures.push(`NET ${key.slice(11, 44)}`) }
      }
      if (!settled && a < 3) await new Promise((r) => setTimeout(r, 1500))
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker))
console.log(`DONE ok=${ok} missing(404)=${missing} fail=${fail}`)
failures.slice(0, 8).forEach((f) => console.log('  F>', f))
if (fail > 0) process.exit(2)
