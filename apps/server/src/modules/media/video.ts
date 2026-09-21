/**
 * AI 视频生成客户端（docs/13 P0-E）。
 *
 * agnes-video-2.5-flash 是异步任务：POST /v1/videos 建任务，
 * GET /agnesapi?video_id=...&model_name=... 轮询，完成后 url 里有 mp4。
 * 720P 目前免费（官方促销），失败不扣费。
 *
 * 轮询频率：官方对状态查询有 429 限流，间隔至少 5 秒。
 * 本模块只做「建任务 + 查一次」；轮询节奏由调用方（路由）控制。
 */
export interface VideoGenDeps {
  base: string
  apiKey: string
  model: string
  /** 出网注入点（测试假实现） */
  fetch?: typeof fetch
  /** 退避睡眠注入点（测试里传 no-op，避免真睡 12-60s） */
  sleep?: (ms: number) => Promise<void>
}

export type VideoStatus = 'queued' | 'in_progress' | 'completed' | 'failed' | 'pending'

export interface VideoTaskInfo {
  taskId: string
  status: VideoStatus
  progress: number
  url: string | null
  error: string | null
}

export class VideoError extends Error {
  constructor(message: string, readonly detail: string = '') {
    super(message)
    this.name = 'VideoError'
  }
}

export interface CreateVideoInput {
  prompt: string
  /** 时长 4-12 秒（API 收字符串） */
  seconds?: number
  /** 16:9 | 9:16 | 1:1 | 3:4 | 4:3 | 21:9 */
  aspectRatio?: string
}

/**
 * 建任务。成功返回 taskId，不等待渲染（渲染在云端排队，数十秒到数分钟）。
 *
 * 免费档偶发 503 video_queue_full（排队满），实测重试可成——
 * 之前误判成「45 分钟超时是免费档上限」，实为队列满未重试（2026-09-17 探针证实：
 * 第 4 次重试建任务成功，5 分钟内渲染完成）。
 * 这里做有界退避重试，把队列满从「孩子看到失败」变成「多等一会儿」。
 */
const CREATE_MAX_ATTEMPTS = 5
const CREATE_BACKOFF_MS = 12_000

export async function createVideoTask(deps: VideoGenDeps, input: CreateVideoInput): Promise<string> {
  const fetchFn = deps.fetch ?? fetch
  const sleep = deps.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)))
  const seconds = Math.max(4, Math.min(12, input.seconds ?? 5))
  const payload = {
    model: deps.model,
    prompt: input.prompt,
    mode: 'text',
    seconds: String(seconds),
    size: '720P',
    aspect_ratio: input.aspectRatio ?? '16:9',
  }

  let lastStatus = 0
  let lastDetail = ''
  for (let attempt = 1; attempt <= CREATE_MAX_ATTEMPTS; attempt++) {
    let res: Response
    try {
      res = await fetchFn(`${deps.base}/videos`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${deps.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      throw new VideoError('视频服务连不上，请稍后再试', err instanceof Error ? err.message.slice(0, 120) : '')
    }
    if (res.ok) {
      const json = (await res.json()) as { video_id?: string; task_id?: string; id?: string }
      const taskId = json.video_id ?? json.task_id ?? json.id
      if (!taskId) throw new VideoError('视频服务没有返回任务编号', '')
      return taskId
    }
    lastStatus = res.status
    lastDetail = (await res.text().catch(() => '')).slice(0, 200)
    // 仅队列满/限流可重试；参数错误（400）重试无用
    if (res.status !== 503 && res.status !== 429) break
    if (attempt < CREATE_MAX_ATTEMPTS) {
      await sleep(CREATE_BACKOFF_MS * attempt)
    }
  }
  throw new VideoError(
    lastStatus === 503 ? '视频排队太满了，请稍后再试一次' : `视频服务返回 ${lastStatus}`,
    lastDetail,
  )
}

/**
 * 查一次任务状态。调用方控制轮询间隔（≥5 秒，否则触发 429）。
 * 429 限流时返回 'pending' 而非抛错——限流不代表失败，下一轮再查即可。
 */
export async function queryVideoTask(deps: VideoGenDeps, taskId: string): Promise<VideoTaskInfo> {
  const fetchFn = deps.fetch ?? fetch
  const queryUrl = `${deps.base.replace(/\/v1$/, '')}/agnesapi?video_id=${encodeURIComponent(taskId)}&model_name=${encodeURIComponent(deps.model)}`
  let res: Response
  try {
    res = await fetchFn(queryUrl, {
      headers: { Authorization: `Bearer ${deps.apiKey}` },
    })
  } catch (err) {
    throw new VideoError('查询视频状态失败', err instanceof Error ? err.message.slice(0, 120) : '')
  }
  if (res.status === 429) {
    // 限流：当作仍在处理，下一轮再查
    return { taskId, status: 'pending', progress: 0, url: null, error: null }
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new VideoError(`查询视频状态返回 ${res.status}`, detail.slice(0, 200))
  }
  const json = (await res.json()) as {
    status?: string
    progress?: number
    url?: string | null
    metadata?: { url?: string | null } | null
    error?: string | { message?: string } | null
  }
  const raw = json.status ?? 'pending'
  // 文档：中间态叫 in_progress（不是 rendering）；完成后视频地址在 metadata.url
  const status: VideoStatus = ['completed', 'failed', 'in_progress', 'queued', 'pending'].includes(raw)
    ? (raw as VideoStatus)
    : 'pending'
  const url = json.metadata?.url ?? json.url ?? null
  const error =
    typeof json.error === 'string' ? json.error : json.error?.message ?? null
  return {
    taskId,
    status,
    progress: typeof json.progress === 'number' ? json.progress : 0,
    url,
    error,
  }
}

/**
 * 下载远程 mp4 到本地媒体目录。
 * 完成后前端走 /api/media/videos/... 直取，不再依赖外链（外链可能过期）。
 */
export async function downloadVideo(
  remoteUrl: string,
  destPath: string,
  fetchFn: typeof fetch = fetch,
): Promise<{ bytes: number }> {
  const res = await fetchFn(remoteUrl)
  if (!res.ok) throw new VideoError(`下载视频失败：${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1000) throw new VideoError('下载到的视频太小，可能损坏')
  const { writeFile, mkdir } = await import('node:fs/promises')
  const { join } = await import('node:path')
  await mkdir(join(destPath, '..'), { recursive: true })
  await writeFile(destPath, buf)
  return { bytes: buf.length }
}
