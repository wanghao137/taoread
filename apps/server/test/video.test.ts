/**
 * AI 视频模块单测（docs/13 P0-E）。
 *
 * 覆盖：建任务、状态轮询（含 429 限流降级、metadata.url 取址、错误对象形态）、
 * 文件名安全。云端真实渲染慢，出网层一律用注入的假 fetch。
 */
import { describe, it, expect } from 'vitest'
import {
  createVideoTask,
  queryVideoTask,
  VideoError,
  type VideoGenDeps,
} from '../src/modules/media/video'

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
