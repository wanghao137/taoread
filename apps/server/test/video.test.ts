/**
 * AI 视频模块单测（docs/13 P0-E）。
 *
 * 覆盖：建任务、状态轮询（含 429 限流降级、metadata.url 取址、错误对象形态）、
 * 文件名安全、下载流式写盘与体积上限、路由层轮询容错与本地回放。
 * 云端真实渲染慢，出网层一律用注入的假 fetch。
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  createVideoTask,
  downloadVideo,
  queryVideoTask,
  VideoError,
  type VideoGenDeps,
} from '../src/modules/media/video'
import { authHeaders, createFamilyAsParent, makeApp } from './helper'

const DEPS: VideoGenDeps = {
  base: 'https://apihub.example.test/v1',
  apiKey: 'k',
  model: 'agnes-video-2.5-flash',
}

function fakeOk(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('createVideoTask 建任务', () => {
  it('从 video_id 取任务号', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ video_id: 'task_abc', task_id: 'task_abc' }))) as unknown as typeof fetch
    const id = await createVideoTask({ ...DEPS, fetch: fetchFn }, { prompt: '月光下的竹林' })
    expect(id).toBe('task_abc')
  })

  it('video_id 缺失时回退 task_id / id', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ id: 'task_xyz' }))) as unknown as typeof fetch
    const id = await createVideoTask({ ...DEPS, fetch: fetchFn }, { prompt: 'x' })
    expect(id).toBe('task_xyz')
  })

  it('三种 id 字段都没有时抛 VideoError', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ status: 'queued' }))) as unknown as typeof fetch
    await expect(createVideoTask({ ...DEPS, fetch: fetchFn }, { prompt: 'x' })).rejects.toBeInstanceOf(VideoError)
  })

  it('HTTP 错误抛 VideoError，状态码进消息', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ detail: 'size must be 720P' }, 400))) as unknown as typeof fetch
    await expect(createVideoTask({ ...DEPS, fetch: fetchFn }, { prompt: 'x' })).rejects.toBeInstanceOf(VideoError)
  })

  it('网络异常抛 VideoError（不泄漏原始错误）', async () => {
    const fetchFn = (() => Promise.reject(new Error('ECONNRESET')) ) as unknown as typeof fetch
    await expect(createVideoTask({ ...DEPS, fetch: fetchFn }, { prompt: 'x' })).rejects.toBeInstanceOf(VideoError)
  })

  it('时长被钳到 4-12 秒区间', async () => {
    let sent: unknown
    const fetchFn = ((url: string, init: RequestInit) => {
      sent = JSON.parse(String(init.body))
      return Promise.resolve(fakeOk({ video_id: 't' }))
    }) as unknown as typeof fetch
    await createVideoTask({ ...DEPS, fetch: fetchFn }, { prompt: 'x', seconds: 99 })
    expect((sent as { seconds: string }).seconds).toBe('12')
    await createVideoTask({ ...DEPS, fetch: fetchFn }, { prompt: 'x', seconds: 1 })
    expect((sent as { seconds: string }).seconds).toBe('4')
  })

  it('队列满（503）时退避重试，最终成功（2026-09-17 探针实证：第 4 次重试建成）', async () => {
    let calls = 0
    const delays: number[] = []
    const fetchFn = (() => {
      calls += 1
      if (calls < 4) {
        return Promise.resolve(
          new Response(JSON.stringify({ code: 'video_queue_full', message: 'queue is full' }), { status: 503 }),
        )
      }
      return Promise.resolve(fakeOk({ video_id: 'task_after_retry' }))
    }) as unknown as typeof fetch
    const id = await createVideoTask(
      { ...DEPS, fetch: fetchFn, sleep: (ms) => { delays.push(ms); return Promise.resolve() } },
      { prompt: 'x' },
    )
    expect(id).toBe('task_after_retry')
    expect(calls).toBe(4)
    // 退避递增：12s → 24s → 36s
    expect(delays).toEqual([12_000, 24_000, 36_000])
  })

  it('队列满重试 5 次仍失败 → 抛 VideoError（温柔文案，不泄漏内部码）', async () => {
    let calls = 0
    const fetchFn = (() => {
      calls += 1
      return Promise.resolve(new Response(JSON.stringify({ code: 'video_queue_full' }), { status: 503 }))
    }) as unknown as typeof fetch
    await expect(
      createVideoTask({ ...DEPS, fetch: fetchFn, sleep: () => Promise.resolve() }, { prompt: 'x' }),
    ).rejects.toThrow('视频排队太满了，请稍后再试一次')
    expect(calls).toBe(5)
  })

  it('参数错误（400）不重试，立即抛出（重试无用）', async () => {
    let calls = 0
    const fetchFn = (() => {
      calls += 1
      return Promise.resolve(fakeOk({ detail: 'size must be 720P' }, 400))
    }) as unknown as typeof fetch
    await expect(
      createVideoTask({ ...DEPS, fetch: fetchFn, sleep: () => Promise.resolve() }, { prompt: 'x' }),
    ).rejects.toThrow('视频服务返回 400')
    expect(calls).toBe(1)
  })
})

describe('queryVideoTask 状态查询', () => {
  it('正确解析 completed + metadata.url', async () => {
    const fetchFn = (() =>
      Promise.resolve(
        fakeOk({
          status: 'completed',
          progress: 100,
          metadata: { url: 'https://cdn.example.test/v.mp4' },
        }),
      )) as unknown as typeof fetch
    const info = await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(info.status).toBe('completed')
    expect(info.url).toBe('https://cdn.example.test/v.mp4')
    expect(info.progress).toBe(100)
  })

  it('顶层 url 兜底（旧版响应形态）', async () => {
    const fetchFn = (() =>
      Promise.resolve(fakeOk({ status: 'completed', url: 'https://cdn.example.test/v2.mp4' }))) as unknown as typeof fetch
    const info = await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(info.url).toBe('https://cdn.example.test/v2.mp4')
  })

  it('中间态 in_progress 原样识别（不是 rendering）', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ status: 'in_progress', progress: 42 }))) as unknown as typeof fetch
    const info = await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(info.status).toBe('in_progress')
    expect(info.progress).toBe(42)
  })

  it('未知状态回落 pending（不崩）', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ status: 'something_new' }))) as unknown as typeof fetch
    const info = await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(info.status).toBe('pending')
  })

  it('429 限流时返回 pending 而非抛错（限流≠失败）', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ error: { message: 'too many queries' } }, 429))) as unknown as typeof fetch
    const info = await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(info.status).toBe('pending')
    expect(info.url).toBeNull()
  })

  it('failed 时错误消息支持字符串与对象两种形态', async () => {
    const fetchFn = (() =>
      Promise.resolve(fakeOk({ status: 'failed', progress: 100, error: { message: '内容不合规' } }))) as unknown as typeof fetch
    const info = await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(info.status).toBe('failed')
    expect(info.error).toBe('内容不合规')
  })

  it('failed 时 error 为字符串原样透传', async () => {
    const fetchFn = (() => Promise.resolve(fakeOk({ status: 'failed', error: 'timeout' }))) as unknown as typeof fetch
    const info = await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(info.error).toBe('timeout')
  })

  it('查询 URL 去掉 /v1 后缀拼 agnesapi', async () => {
    let called: string | undefined
    const fetchFn = ((u: string) => {
      called = u
      return Promise.resolve(fakeOk({ status: 'pending' }))
    }) as unknown as typeof fetch
    await queryVideoTask({ ...DEPS, fetch: fetchFn }, 'task_abc')
    expect(called).toContain('/agnesapi?video_id=task_abc')
    expect(called).toContain('model_name=agnes-video-2.5-flash')
    expect(called).not.toContain('/v1/agnesapi')
  })
})

/** 分块字节流 Response（模拟 mp4 分片下发） */
function streamResponse(chunks: Buffer[], status = 200): Response {
  const encoder = new TransformStream<Uint8Array, Uint8Array>()
  const writer = encoder.writable.getWriter()
  for (const chunk of chunks) void writer.write(chunk)
  void writer.close()
  return new Response(encoder.readable, { status })
}

describe('downloadVideo 流式下载（内存与磁盘防护）', () => {
  let dir: string

  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), 'taoread-video-dl-'))
  })
  afterAll(async () => {
    await rm(dir, { recursive: true, force: true })
  })

  it('分块流式写盘：文件完整落盘，不留 .part 半成品', async () => {
    const dest = join(dir, 'videos', 'task_ok.mp4')
    const chunk = Buffer.alloc(2048, 0x61)
    const out = await downloadVideo(
      'https://cdn.example.test/v.mp4',
      dest,
      (() => Promise.resolve(streamResponse([chunk, chunk, chunk]))) as unknown as typeof fetch,
    )
    expect(out.bytes).toBe(6144)
    const saved = await readFile(dest)
    expect(saved.length).toBe(6144)
    const files = await readdir(join(dir, 'videos'))
    expect(files).toEqual(['task_ok.mp4'])
  })

  it('超过 50MB 上限中止下载，半成品被清理', async () => {
    const dest = join(dir, 'videos', 'task_big.mp4')
    const megabyte = Buffer.alloc(1024 * 1024, 0x62)
    // 51 个 1MB 分块 = 51MB > 上限
    await expect(
      downloadVideo(
        'https://cdn.example.test/big.mp4',
        dest,
        (() => Promise.resolve(streamResponse(Array.from({ length: 51 }, () => megabyte)))) as unknown as typeof fetch,
      ),
    ).rejects.toBeInstanceOf(VideoError)
    await expect(readFile(dest)).rejects.toThrow()
    const files = await readdir(join(dir, 'videos'))
    expect(files).toEqual(['task_ok.mp4'])
  })

  it('响应过小（<1KB）视为损坏：拒绝落盘并清理', async () => {
    const dest = join(dir, 'videos', 'task_tiny.mp4')
    await expect(
      downloadVideo(
        'https://cdn.example.test/tiny.mp4',
        dest,
        (() => Promise.resolve(streamResponse([Buffer.from('tiny')]))) as unknown as typeof fetch,
      ),
    ).rejects.toBeInstanceOf(VideoError)
    const files = await readdir(join(dir, 'videos'))
    expect(files).toEqual(['task_ok.mp4'])
  })

  it('上游非 2xx 抛 VideoError', async () => {
    await expect(
      downloadVideo(
        'https://cdn.example.test/gone.mp4',
        join(dir, 'videos', 'task_gone.mp4'),
        (() => Promise.resolve(new Response('expired', { status: 403 }))) as unknown as typeof fetch,
      ),
    ).rejects.toBeInstanceOf(VideoError)
  })
})

describe('视频路由（轮询容错与本地回放）', () => {
  const DEPS: VideoGenDeps = { base: 'https://apihub.example.test/v1', apiKey: 'k', model: 'm' }

  it('未配置 videoDeps 时已完成视频仍可本地回放（不再 503）', async () => {
    const h = await makeApp() // videoDeps 缺省 null
    try {
      const family = await createFamilyAsParent(h.app)
      const scene = `fam:${family.familyId}:chapter:done:1`
      await h.db.videoAsset.create({
        data: { scene, kind: 'chapter', taskId: 'task_done', status: 'completed', prompt: 'p', model: 'm', urlPath: '/api/media/videos/task_done.mp4' },
      })
      const res = await h.app.inject({ method: 'GET', url: `/api/video/${encodeURIComponent(scene)}`, headers: authHeaders(family.token) })
      expect(res.statusCode).toBe(200)
      expect(res.json().status).toBe('completed')
      expect(res.json().videoUrl).toContain('/api/media/videos/task_done.mp4')
    } finally {
      await h.app.close()
      await h.db.$disconnect()
    }
  })

  it('轮询上游瞬时网络错误：任务保持 pending，不置永久 failed', async () => {
    const h = await makeApp(undefined, {
      videoDeps: { ...DEPS, fetch: (() => Promise.reject(new Error('ECONNRESET'))) as unknown as typeof fetch },
    })
    try {
      const family = await createFamilyAsParent(h.app)
      const scene = `fam:${family.familyId}:chapter:flaky:1`
      await h.db.videoAsset.create({
        data: { scene, kind: 'chapter', taskId: 'task_flaky', status: 'pending', prompt: 'p', model: 'm' },
      })
      // @updatedAt 由 Prisma 托管：用原始 SQL 把行拨旧，绕过 5 秒轮询节流
      await h.db.$executeRawUnsafe(
        `UPDATE "VideoAsset" SET "updatedAt" = ? WHERE "scene" = ?`,
        new Date(Date.now() - 60_000),
        scene,
      )
      const res = await h.app.inject({ method: 'GET', url: `/api/video/${encodeURIComponent(scene)}`, headers: authHeaders(family.token) })
      expect(res.statusCode).toBe(200)
      expect(res.json().status).toBe('pending')
      const row = await h.db.videoAsset.findUnique({ where: { scene } })
      expect(row?.status).toBe('pending')
      expect(row?.error).toBeNull()
    } finally {
      await h.app.close()
      await h.db.$disconnect()
    }
  })

  it('上游明确失败：DB 置 failed，对外只回通用文案（不泄漏上游错误体）', async () => {
    const h = await makeApp(undefined, {
      videoDeps: {
        ...DEPS,
        fetch: (() =>
          Promise.resolve(new Response(JSON.stringify({ status: 'failed', error: { message: 'internal quota blast radius xyz' } }), { status: 200 }))) as unknown as typeof fetch,
      },
    })
    try {
      const family = await createFamilyAsParent(h.app)
      const scene = `fam:${family.familyId}:chapter:dead:1`
      await h.db.videoAsset.create({
        data: { scene, kind: 'chapter', taskId: 'task_dead', status: 'in_progress', prompt: 'p', model: 'm' },
      })
      await h.db.$executeRawUnsafe(
        `UPDATE "VideoAsset" SET "updatedAt" = ? WHERE "scene" = ?`,
        new Date(Date.now() - 60_000),
        scene,
      )
      const res = await h.app.inject({ method: 'GET', url: `/api/video/${encodeURIComponent(scene)}`, headers: authHeaders(family.token) })
      expect(res.statusCode).toBe(200)
      expect(res.json().status).toBe('failed')
      expect(res.json().error).toBe('动画生成失败，可以再试一次')
      expect(JSON.stringify(res.json())).not.toContain('internal quota')
      const row = await h.db.videoAsset.findUnique({ where: { scene } })
      expect(row?.status).toBe('failed')
      expect(row?.error).toBe('动画生成失败，可以再试一次')
    } finally {
      await h.app.close()
      await h.db.$disconnect()
    }
  })
})
