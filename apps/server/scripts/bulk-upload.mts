/**
 * 批量补传 uploaded=false 公共音频 v3（整批一次容量闸）。
 * - 单次 withR2Capacity(bytes=全部待传字节, stopBytes=R2_STOP_BYTES, inventory=真实清单)：
 *   一次锁+一次清单+一次预留，闸内全部 PUT 不再逐文件过闸（慢路由下逐文件清单必超时）
 * - curl PUT（绕 undici 慢路由连接超时），201/412=成功，并发 4，每 200 检查点
 * - 可重复执行（uploaded=true 跳过）
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import dotenv from 'dotenv'
import { loadAudioEnvironment, audioSettings, audioClient, listAudio } from './lib/public-audio-store.mjs'
import { withR2Capacity, R2_STOP_BYTES } from './lib/r2-capacity.mjs'

dotenv.config()
const before = process.env.TAO_DATABASE_URL
dotenv.config({ path: '.env.audio', override: true })
if (before) process.env.TAO_DATABASE_URL = before
await loadAudioEnvironment(process.env)
const store = audioSettings(process.env)
const client = audioClient(store)
const manifestPath = 'D:/taoread-prod/apps/server/media/.tts-public-state.json'
const outDir = 'D:/taoread-prod/apps/server/media/tts-public'
const log = (m) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${m}`)

function curl(args) {
  return new Promise((resolve) => {
    execFile('curl', args, { timeout: 150000, maxBuffer: 1e8 }, (err, stdout, stderr) => {
      resolve({ code: String(stdout ?? '').trim(), err: err ? String(err?.message ?? err) : null })
    })
  })
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const pending = Object.entries(manifest).filter(([k, r]) => r && r.uploaded === false && fs.existsSync(path.join(outDir, `${k}.mp3`)))
const totalBytes = pending.reduce((s, [k]) => s + fs.statSync(path.join(outDir, `${k}.mp3`)).size, 0)
log(`pending=${pending.length} totalBytes=${(totalBytes / 1e6).toFixed(1)}MB`)
if (pending.length === 0) { log('FINISH nothing-to-do'); process.exit(0) }

// 网络门（curl 探测，200/404 均为连通）
const probe = await curl(['-s', '-m', '25', '-o', '/dev/null', '-w', '%{http_code}', 'https://audio.taostudioai.com/'])
if (!probe.code || probe.code === '000') { log(`network-down (${probe.err?.slice(0, 60) ?? probe.code})`); process.exit(2) }
log(`network ok (probe ${probe.code})`)

let done = 0, failed = 0, idx = 0, netFails = 0
const CONC = 4
const manifestWrite = () => fs.writeFileSync(manifestPath, JSON.stringify(manifest))

let acquired = false
for (let round = 1; round <= 20 && !acquired; round++) {
  if (round > 1) { log(`round ${round}: 60s 后重试抢锁`); await new Promise(r => setTimeout(r, 60000)) }
  try {
await withR2Capacity({
  accountId: store.accountId,
  bytes: totalBytes,
  stopBytes: R2_STOP_BYTES,
  waitMs: 600_000, // 慢路由/其它持锁者并存时多等（默认 120s 不够）
  inventory: async () => {
    log('inventory: listing audio bucket…')
    const objects = await listAudio(client, store.bucket)
    const bytes = objects.reduce((s, o) => s + o.bytes, 0)
    log(`inventory: ${objects.length} objects, ${(bytes / 1e9).toFixed(3)} GB`)
    return { bytes, buckets: [{ bucket: store.bucket, bytes, count: objects.length }] }
  },
  upload: async () => {
    log('uploading…')
    await Promise.all(Array.from({ length: CONC }, async () => {
      while (idx < pending.length) {
        const [key, rec] = pending[idx++]
        const local = path.join(outDir, `${key}.mp3`)
        const buf = fs.readFileSync(local)
        const sha = createHash('sha256').update(buf).digest('hex')
        let ok = false, lastErr = ''
        for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
          const res = await curl([
            '-sS', '-m', '120', '--connect-timeout', '30', '-X', 'PUT',
            '-H', `Authorization: ${store.authorization}`, // 值本身已含 Bearer 前缀
            '-H', 'Content-Type: audio/mpeg',
            '-H', `X-Audio-Sha256: ${sha}`,
            '--data-binary', `@${local}`,
            '-w', '%{http_code}',
            `https://audio.taostudioai.com/tts-public/${key}.mp3`,
          ])
          if (res.code === '201' || res.code === '412') ok = true
          else { lastErr = `HTTP ${res.code || '000'} ${res.err?.slice(0, 40) ?? ''}`; if (attempt < 3) await new Promise(r => setTimeout(r, 3000 * attempt)) }
        }
        if (ok) {
          rec.uploaded = true
          done++
          netFails = 0
          if (done % 200 === 0) { manifestWrite(); log(`checkpoint done=${done}/${pending.length} failed=${failed}`) }
        } else {
          failed++
          if (lastErr.startsWith('HTTP 000')) { netFails++; if (netFails >= 15) { log(`network-down early-abort at done=${done}`); manifestWrite(); process.exit(2) } }
          else netFails = 0
          if (failed <= 12) log(`fail ${key.slice(0, 10)}: ${lastErr}`)
        }
      }
    }))
  },
})
manifestWrite()
log(`FINISH done=${done} failed=${failed}`)
acquired = true
  } catch (err: any) { log(`round ${round} 失败: ${String(err?.message ?? err).slice(0, 80)}`) }
}
if (!acquired) log(`FINISH-FAILED 未抢到锁`)
process.exitCode = failed > 0 ? 1 : 0
