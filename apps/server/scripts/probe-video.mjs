/**
 * 真实视频链路探针（docs/14 §1 视频模块重测）。
 *
 * 用法：cd apps/server && npx tsx scripts/probe-video.mjs
 * 读 .env 里的 TAO_VIDEO_BASE/KEY/MODEL，建一个最短（4 秒）任务，
 * 然后按官方建议间隔轮询，把每次返回原样打印，便于看清真实状态机。
 */
import { config as loadEnv } from 'dotenv'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { URL } from 'node:url'

loadEnv({ path: resolve(fileURLToPath(new URL('.', import.meta.url)), '..', '.env') })

const BASE = process.env.TAO_VIDEO_BASE
const KEY = process.env.TAO_VIDEO_KEY
const MODEL = process.env.TAO_VIDEO_MODEL

if (!BASE || !KEY || !MODEL) {
  console.error('缺少 TAO_VIDEO_BASE/KEY/MODEL，无法测试')
  process.exit(1)
}

const log = (m) => console.log(`[${new Date().toLocaleTimeString('zh-CN', { hour12: false })}] ${m}`)

async function main() {
  log(`base=${BASE} model=${MODEL}`)
  // 免费档队列偶发 503 video_queue_full，重试若干次再放弃
  let created = null
  let createText = ''
  for (let attempt = 1; attempt <= 10; attempt++) {
    log(`建任务第 ${attempt} 次（4 秒、16:9、text 模式）…`)
    const create = await fetch(`${BASE}/videos`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt: '一只小猴子从石头里蹦出来，在花果山上欢快地跳跃，阳光明媚，卡通风格',
        mode: 'text',
        seconds: '4',
        size: '720P',
        aspect_ratio: '16:9',
      }),
    })
    createText = await create.text()
    log(`建任务 HTTP ${create.status}: ${createText.slice(0, 400)}`)
    if (create.ok) {
      created = JSON.parse(createText)
      break
    }
    // 队列满：退避后重试（30s 起，逐次加长）
    if (create.status === 503 || create.status === 429) {
      const backoff = 30_000 * attempt
      log(`队列满/限流，${backoff / 1000}s 后重试`)
      await new Promise((r) => setTimeout(r, backoff))
      continue
    }
    // 其它错误（400 参数错等）重试无用
    process.exit(1)
  }
  if (!created) {
    log('建任务 10 次均失败，放弃')
    process.exit(1)
  }

  const taskId = created.video_id ?? created.task_id ?? created.id
  if (!taskId) {
    log('返回里没有 video_id/task_id/id，无法轮询')
    process.exit(1)
  }
  log(`任务编号 = ${taskId}`)

  const queryBase = BASE.replace(/\/v1$/, '')
  let elapsed = 0
  // 官方建议 1-2 秒查一次；此前观察到 429 限流，这里用 6 秒稳一点
  const intervalMs = 6000
  for (let i = 1; i <= 120; i++) {
    await new Promise((r) => setTimeout(r, intervalMs))
    elapsed += intervalMs / 1000
    let res
    try {
      res = await fetch(
        `${queryBase}/agnesapi?video_id=${encodeURIComponent(taskId)}&model_name=${encodeURIComponent(MODEL)}`,
        { headers: { Authorization: `Bearer ${KEY}` } },
      )
    } catch (err) {
      log(`第 ${i} 轮网络错误：${err instanceof Error ? err.message : err}`)
      continue
    }
    const body = await res.text()
    log(`第 ${i} 轮（${elapsed}s）HTTP ${res.status}: ${body.slice(0, 500)}`)

    if (res.status === 429) continue
    if (!res.ok) {
      log('查询返回非 2xx/429，终止')
      process.exit(1)
    }
    let json
    try {
      json = JSON.parse(body)
    } catch {
      log('返回体不是 JSON，终止')
      process.exit(1)
    }
    if (json.status === 'completed') {
      const url = json.metadata?.url ?? json.url
      log(`✅ 完成！视频地址：${url}`)
      if (url) {
        const head = await fetch(url, { method: 'HEAD' }).catch(() => ({
          ok: false,
          status: 0,
          headers: new Map(),
        }))
        const ct = head.headers?.get('content-type') ?? '?'
        const cl = head.headers?.get('content-length') ?? '?'
        log(`视频 HEAD：${head.status} content-type=${ct} content-length=${cl}`)
      }
      process.exit(0)
    }
    if (json.status === 'failed') {
      log(`❌ 云端返回 failed：${JSON.stringify(json.error ?? json).slice(0, 300)}`)
      process.exit(1)
    }
  }
  log('轮询 120 轮（12 分钟）仍未完成，放弃')
  process.exit(1)
}

void main().catch((err) => {
  console.error('探针异常：', err)
  process.exit(1)
})
