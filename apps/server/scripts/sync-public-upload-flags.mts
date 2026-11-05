/**
 * 音频翻旗 runner（2026-11-01 性能传输收口轮 docs/102）。
 *
 * 对生产 manifest 中 uploaded=false 的键做 R2 CDN HEAD 分诊：
 * 200 且 content-length>0 → 翻 uploaded=true（运行时即切 CDN 域，mtime 惰性重载无需重启）。
 * 默认 dry-run 只统计；--apply 才写盘（首次写前备份 + tmp+rename 原子写）。
 * 用法：npx tsx scripts/sync-public-upload-flags.mts [--apply]
 */
import fs from 'node:fs'
import path from 'node:path'
import { resolveAudioFileName, triage } from './lib/upload-flag-triage'

const APPLY = process.argv.includes('--apply')
const MANIFEST = 'D:/taoread-prod/apps/server/media/.tts-public-state.json'
const LOCAL_DIR = 'D:/taoread-prod/apps/server/media/tts-public'
const CDN = 'https://audio.taostudioai.com/tts-public'
const RESULT = 'D:/codesolo/taoread/output/perf-20261101/sync-flags-result.json'

type Rec = { uploaded: boolean } & Record<string, unknown>

const log = (m: string) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${m}`)
const manifest: Record<string, Rec> = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
const candidates = Object.entries(manifest).filter(([, r]) => r && r.uploaded === false)
log(`candidates=${candidates.length} apply=${APPLY}`)

const HEAD_TIMEOUT_MS = 15_000
const RETRIES = 3
const CONC = 8

interface HeadResult {
  ok: boolean
  network: boolean
}

async function head(name: string): Promise<HeadResult> {
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const r = await fetch(`${CDN}/${name}.mp3`, { method: 'HEAD', signal: AbortSignal.timeout(HEAD_TIMEOUT_MS) })
      const cl = Number(r.headers.get('content-length') ?? -1)
      return { ok: r.ok && cl > 0, network: false }
    } catch {
      if (attempt < RETRIES) await new Promise(res => setTimeout(res, 1000 * attempt + Math.random() * 1000))
    }
  }
  return { ok: false, network: true }
}

const buckets: Record<string, string[]> = { flip: [], 'keep-pending-upload': [], 'keep-missing': [], 'keep-network': [] }
const invalidOverrides: string[] = []
let idx = 0

async function worker(): Promise<void> {
  while (idx < candidates.length) {
    const entry = candidates[idx++]!
    const [key, rec] = entry
    const { name, invalidOverride } = resolveAudioFileName(key, rec as { audioKey?: unknown; model?: unknown })
    if (invalidOverride) invalidOverrides.push(key)
    const localExists = fs.existsSync(path.join(LOCAL_DIR, `${name}.mp3`))
    const h = await head(name)
    const action = triage({ headOk: h.ok, network: h.network, localExists })
    buckets[action]!.push(key)
  }
}

await Promise.all(Array.from({ length: CONC }, () => worker()))

const stats = Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length]))
log(`stats ${JSON.stringify(stats)} invalidOverrides=${invalidOverrides.length}`)

fs.mkdirSync(path.dirname(RESULT), { recursive: true })
fs.writeFileSync(RESULT, JSON.stringify({ at: new Date().toISOString(), apply: APPLY, stats, invalidOverrides, ...buckets }, null, 1))
log(`result written: ${RESULT}`)

if (APPLY) {
  if (buckets.flip!.length > 0) {
    const bak = `${MANIFEST}.bak-perf-20261101`
    if (!fs.existsSync(bak)) fs.copyFileSync(MANIFEST, bak)
    const out: Record<string, Rec> = { ...manifest }
    for (const k of buckets.flip!) out[k] = { ...out[k]!, uploaded: true }
    const tmp = `${MANIFEST}.tmp-sync`
    fs.writeFileSync(tmp, JSON.stringify(out))
    fs.renameSync(tmp, MANIFEST)
    log(`APPLIED flip=${buckets.flip!.length} backup=${bak}`)
  } else {
    log('APPLY requested but nothing to flip')
  }
}
log('DONE')
