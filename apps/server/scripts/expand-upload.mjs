/**
 * 公共 TTS 音频患者式单线程补传器（story-expand 2026-10-31）。
 *
 * 读本地清单 media/.tts-public-state.json，取「∈ live set（与 expand-cleanup.mjs 同口径，
 * import 同款模块）且 uploaded=false 且本地文件在盘（tts-public/<audioKey ?? key>.mp3）」
 * 的条目，单线程顺序逐个经 R2 网关 PUT 上传。
 *
 * 与 scripts/lib/r2-audio-gateway.mjs gatewayPut 的唯一差别：gatewayPut 不透传容量锁
 * options，故把其内部实现拷贝到本脚本 patientGatewayPut——
 *   - withR2Capacity 容量锁等待 waitMs=15 分钟、账本最大新鲜度 maxAgeMs=15 分钟；
 *   - 「账本 60s 过期即全量 gatewayList」改为「每 25 次上传后主动刷新账本一次」
 *     （下一次调用 maxAgeMs=0 → withR2Capacity 强制全量 gatewayList）。
 * 协议行为与 gatewayPut 一致：knownAbsent 语义=先 GET 幂等核对（同字节即成功），
 * PUT 接受 201/412（412=已存在即成功）后全量校验字节/Content-Type/Cache-Control。
 *
 * 重试：每键失败重试 4 次（指数退避 5s/15s/45s/135s），仅对 fetch failed/timeout/
 * HTTP 429/5xx 重试；HTTP 412 视为已存在即成功（upload() 内放行）；其余错误直接失败。
 * 中断安全：每成功 1 个内存标记 uploaded=true（含 audioKey 镜像条目），攒 20 个原子落盘
 * 一次（SIGINT/SIGTERM 先落盘再退出）；重跑自动跳过 uploaded=true 的键，PUT 前的 GET
 * 幂等核对使「传成功但标记丢失」的键零成本补账。
 *
 * receipt：D:/codesolo/taoread/output/story-expand-20261031/upload-receipt.json
 *
 * 用法（apps/server 目录）：
 *   node --import tsx scripts/expand-upload.mjs
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import dotenv from 'dotenv'
import { loadConfig } from '../src/config.ts'
import { chunkText } from '../src/modules/tts/client.ts'
import { cacheKey } from '../src/modules/tts/cache.ts'
import { DEFAULT_VOICE_ID, findVoice, DEFAULT_SPEED } from '../src/modules/tts/voices.ts'
import { TTS_PUBLIC_NS, publicSegmentAudioKey } from '../src/modules/tts/publicCache.ts'
import { chapterSpeakText, speakVoiceId } from '../src/modules/tts/chapterText.ts'
import { ALL_PACKS } from '../src/content/packs/index.ts'
import { loadAudioEnvironment, audioSettings } from './lib/public-audio-store.mjs'
import { gatewaySettings, gatewayGet, gatewayList } from './lib/r2-audio-gateway.mjs'
import { withR2Capacity, R2_STOP_BYTES, R2_WARNING_BYTES } from './lib/r2-capacity.mjs'

dotenv.config()
// .env.audio → 只注入音频配置键（loadAudioEnvironment），再走 gatewaySettings 严格校验
await loadAudioEnvironment(process.env)

const config = loadConfig()
const model = config.TTS_MODEL || 'stepaudio-3-gen-preview'
const mediaDir = config.TAO_MEDIA_DIR || join(process.cwd(), 'media')
const outDir = join(mediaDir, 'tts-public')
const manifestPath = join(mediaDir, '.tts-public-state.json')
const RECEIPT_DIR = 'D:/codesolo/taoread/output/story-expand-20261031'

const store = audioSettings(process.env)
if (store?.target !== 'r2-worker') {
  throw Error('需要专用 R2 网关配置（.env.audio：TAO_PUBLIC_AUDIO_STORE=r2-worker + TAO_AUDIO_*）')
}
const settings = gatewaySettings(store)

// 患者参数：锁等待 15 分钟；账本最大新鲜度 15 分钟；每 25 次上传后主动刷新账本
const LOCK_WAIT_MS = 900_000
const LEDGER_MAX_AGE_MS = 900_000
const REFRESH_EVERY = 25
const RETRY_BACKOFFS_MS = [5_000, 15_000, 45_000, 135_000] // 4 次重试
const FLUSH_EVERY = 20
const PROGRESS_EVERY = 10
const LIVE_MIN = 5000

function log(msg) {
  console.log(`[upload ${new Date().toISOString()}] ${msg}`)
}
const describeErr = (err) => String(err?.message || err).slice(0, 160)
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex')

/** live set：与 expand-cleanup.mjs 完全同款（键空间单一事实源） */
function computeLiveKeys() {
  const live = new Set()
  for (const book of ALL_PACKS) {
    const lang = book.lang === 'en' ? 'en' : 'zh'
    const voiceId = lang === 'en' ? findVoice(speakVoiceId('en')).id : findVoice(DEFAULT_VOICE_ID).id
    for (const ch of book.chapters) {
      const fullText = chapterSpeakText(ch.blocks)
      if (!fullText.trim()) continue
      for (const seg of chunkText(fullText)) {
        live.add(cacheKey(seg, voiceId, DEFAULT_SPEED, 'mp3', lang, TTS_PUBLIC_NS, model))
      }
    }
  }
  return live
}

/** gatewayPut 内部实现拷贝（scripts/lib/r2-audio-gateway.mjs），差异仅容量锁参数：
 *  waitMs/maxAgeMs 放宽到 15 分钟；forceInventory=true 时 maxAgeMs=0 强制本次全量
 *  gatewayList 刷新账本。协议（GET 幂等核对 / PUT 201+412 / 全量校验）与 gatewayPut 一致。 */
async function patientGatewayPut(objectKey, bytes, forceInventory = false) {
  if (!/^tts-public\/[a-f0-9]{64}\.mp3$/.test(objectKey)) throw Error('Invalid public audio key')
  try {
    const current = await gatewayGet(settings, objectKey)
    if (digest(current.bytes) !== digest(bytes)) throw Error('Immutable audio key already has different bytes')
    return current
  } catch (error) { if (error.status !== 404) throw error }
  return withR2Capacity({ accountId: settings.accountId, bytes: bytes.length, stopBytes: R2_STOP_BYTES,
    waitMs: LOCK_WAIT_MS, maxAgeMs: forceInventory ? 0 : LEDGER_MAX_AGE_MS,
    warn: (info) => console.warn(JSON.stringify({ ...info, channel: 'audio-gateway', warningBytes: R2_WARNING_BYTES })),
    inventory: async () => ({ bytes: (await gatewayList(settings)).reduce((sum, obj) => sum + obj.bytes, 0) }),
    upload: async () => {
      const res = await fetch(settings.origin + '/' + objectKey, { method: 'PUT', redirect: 'error',
        signal: AbortSignal.timeout(120000),
        headers: { Authorization: settings.authorization, 'Content-Type': 'audio/mpeg',
          'Content-Length': String(bytes.length), 'X-Audio-Sha256': digest(bytes) }, body: bytes })
      // 201=新写入；412=已存在（视为成功，随后全量校验确认字节一致）
      if (![201, 412].includes(res.status)) { await res.body?.cancel(); throw Object.assign(Error(`R2 upload HTTP ${res.status}`), { status: res.status }) }
      await res.body?.cancel()
      const uploaded = await gatewayGet(settings, objectKey)
      if (uploaded.bytes.length !== bytes.length || digest(uploaded.bytes) !== digest(bytes) ||
          uploaded.contentType !== 'audio/mpeg' || !uploaded.cacheControl?.includes('immutable')) {
        throw Error('R2 full upload verification failed')
      }
      return uploaded
    } })
}

const TRANSPORT_CODES = new Set(['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'EPIPE', 'EAI_AGAIN',
  'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_SOCKET', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT', 'UND_ERR_FETCH_FAILED'])
/** 仅传输层故障/超时/HTTP 429/5xx 可重试；412 在 upload() 内已按「已存在」放行 */
function isRetryable(err) {
  if (err?.status === 429 || (Number(err?.status) >= 500 && Number(err?.status) < 600)) return true
  if (err?.name === 'TimeoutError' || err?.name === 'AbortError') return true
  if ([err?.code, err?.cause?.code].some((code) => code && TRANSPORT_CODES.has(code))) return true
  return /fetch failed/i.test(String(err?.message || ''))
}
const isCapacityStop = (err) => String(err?.message || '').startsWith('R2 capacity stop')

async function putWithRetry(objectKey, bytes, forceInventory) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await patientGatewayPut(objectKey, bytes, attempt === 0 && forceInventory)
    } catch (err) {
      if (isCapacityStop(err) || attempt >= RETRY_BACKOFFS_MS.length || !isRetryable(err)) throw err
      log(`PUT 失败（第 ${attempt + 1} 次）${objectKey.slice(11, 19)}: ${describeErr(err)}，${RETRY_BACKOFFS_MS[attempt] / 1000}s 后重试`)
      await delay(RETRY_BACKOFFS_MS[attempt])
    }
  }
}

// ── 主流程 ──
const live = computeLiveKeys()
if (live.size < LIVE_MIN) {
  log(`护栏拒跑：live 键集仅 ${live.size}（<${LIVE_MIN}），取文/切分/参数口径疑似漂移`)
  process.exit(1)
}
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
// 待传集：∈ live set 且 uploaded=false 且本地文件在盘；重跑自动跳过已传键（中断安全）
const pending = Object.keys(manifest)
  .filter((k) => live.has(k) && manifest[k] && !manifest[k].uploaded)
  .map((k) => ({ key: k, audioKey: publicSegmentAudioKey(k, manifest[k]) }))
  .filter((job) => existsSync(join(outDir, `${job.audioKey}.mp3`)))
  .sort((a, b) => a.key.localeCompare(b.key))
log(`live ${live.size}，清单 ${Object.keys(manifest).length}，待传 ${pending.length}（未上传且本地文件在盘）`)

let uploadedCount = 0
let failedCount = 0
let doneCount = 0
let dirtyCount = 0
let sinceRefresh = 0
let refreshCount = 0
let interrupted = false
let capacityAborted = false
const failures = []
const t0 = Date.now()

// 批量原子落盘：内存攒 FLUSH_EVERY 个成功标记写一次盘（EPERM 退避重试，pregen 同款）
async function flushManifest() {
  if (dirtyCount === 0) return
  const data = JSON.stringify(manifest)
  const tmp = `${manifestPath}.${Math.random().toString(36).slice(2, 8)}.tmp`
  for (let attempt = 0; ; attempt++) {
    try {
      await writeFile(tmp, data)
      await rename(tmp, manifestPath)
      break
    } catch (err) {
      if (err?.code !== 'EPERM' || attempt >= 6) {
        try { await writeFile(manifestPath, data); break } catch { if (attempt >= 8) throw err }
      }
      await new Promise((r) => setTimeout(r, 250 * (attempt + 1)))
    }
  }
  dirtyCount = 0
  log(`清单已落盘（累计成功 ${uploadedCount}）`)
}

// 中断安全：SIGINT/SIGTERM 先把已成功的 uploaded 标记落盘再退出
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.once(sig, () => {
    interrupted = true
    log(`收到 ${sig}，先落盘清单再退出……`)
    flushManifest().catch(() => {}).finally(() => process.exit(130))
  })
}

for (const job of pending) {
  if (interrupted || capacityAborted) break
  const objectKey = `tts-public/${job.audioKey}.mp3`
  try {
    const bytes = await readFile(join(outDir, `${job.audioKey}.mp3`))
    // 每 25 次上传后主动 gatewayList 刷新账本一次（下一次 withR2Capacity 走 maxAgeMs=0）
    const forceRefresh = sinceRefresh >= REFRESH_EVERY
    if (forceRefresh) {
      sinceRefresh = 0
      refreshCount++
      log(`已传 ${uploadedCount} 个，主动 gatewayList 刷新容量账本`)
    }
    await putWithRetry(objectKey, bytes, forceRefresh)
    const info = manifest[job.key]
    info.uploaded = true
    info.store = settings.target
    // audioKey 镜像条目同标记（与 pregen-tts.mjs retryUploadOnly 同款）
    if (job.audioKey !== job.key && manifest[job.audioKey]) {
      manifest[job.audioKey].uploaded = true
      manifest[job.audioKey].store = settings.target
    }
    uploadedCount++
    dirtyCount++
    sinceRefresh++
    if (dirtyCount >= FLUSH_EVERY) await flushManifest()
  } catch (err) {
    failedCount++
    failures.push({ key: job.key, audioKey: job.audioKey, error: describeErr(err) })
    log(`失败（放弃）${job.key.slice(0, 8)}: ${describeErr(err)}`)
    // 容量护栏触发：后续全部必失败，立即中止（已成功标记照常落盘）
    if (isCapacityStop(err)) capacityAborted = true
  }
  doneCount++
  if (doneCount % PROGRESS_EVERY === 0) {
    const rate = doneCount / ((Date.now() - t0) / 60000)
    log(`进度 ${doneCount}/${pending.length}（${rate.toFixed(1)} 个/分钟）剩余 ${pending.length - doneCount}，成功 ${uploadedCount} 失败 ${failedCount}`)
  }
}

await flushManifest()

const receipt = {
  generatedAt: new Date().toISOString(),
  durationMs: Date.now() - t0,
  liveCount: live.size,
  manifestPath,
  pending: pending.length,
  processed: doneCount,
  uploaded: uploadedCount,
  failed: failedCount,
  ledgerRefreshes: refreshCount,
  ...(interrupted ? { interrupted: true } : {}),
  ...(capacityAborted ? { capacityAborted: true } : {}),
  failedKeys: failures,
}
await mkdir(RECEIPT_DIR, { recursive: true })
const receiptPath = join(RECEIPT_DIR, 'upload-receipt.json')
await writeFile(receiptPath, JSON.stringify(receipt, null, 2))
log(`结束：成功 ${uploadedCount}，失败 ${failedCount}，耗时 ${Math.round((Date.now() - t0) / 60000)} 分钟；receipt → ${receiptPath}`)
for (const f of failures) log(`仍失败 ${f.key}: ${f.error}`)
if (failedCount > 0 || interrupted || capacityAborted) process.exitCode = 1
