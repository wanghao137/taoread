import { beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import { authHeaders, createFamilyAsParent, makeApp, type TestHarness } from './helper'
import { clearInFlight } from '../src/modules/media/generationGuard'
import { ImageGenerator } from '../src/modules/media/imagegen'

let h: TestHarness
let token: string
let mediaDir: string
let pngB64: string

/** 假生图上游：延迟 60ms 返回小 PNG，统计出网次数 */
function fakeUpstream() {
  let calls = 0
  const fetchFn = (async () => {
    calls++
    await new Promise((resolve) => setTimeout(resolve, 60))
    return new Response(JSON.stringify({ data: [{ b64_json: pngB64 }] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }) as unknown as typeof fetch
  return { fetchFn, calls: () => calls }
}

/** 假视频上游：延迟 60ms 返回任务号，统计出网次数（只覆盖建任务接口） */
function fakeVideoUpstream() {
  let calls = 0
  const fetchFn = (async () => {
    calls++
    await new Promise((resolve) => setTimeout(resolve, 60))
    return new Response(JSON.stringify({ video_id: `task-${calls}` }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }) as unknown as typeof fetch
  return { fetchFn, calls: () => calls }
}

beforeAll(async () => {
  mediaDir = await mkdtemp(join(tmpdir(), 'taoread-genquota-'))
  pngB64 = (await sharp({ create: { width: 512, height: 512, channels: 3, background: { r: 255, g: 236, b: 179 } } }).png().toBuffer()).toString('base64')
})

async function generate(scene: string) {
  return h.app.inject({
    method: 'POST',
    url: '/api/art/generate',
    headers: authHeaders(token),
    payload: { kind: 'cover', scene, description: '温暖的睡前画面', label: '测试场景', lang: 'zh' },
  })
}

describe('A3 生成并发去重与每日配额', () => {
  it('同一场景 20 个并发请求只出网一次（共享同一在途 Promise）', async () => {
    clearInFlight()
    const upstream = fakeUpstream()
    h = await makeApp(undefined, {
      mediaDir,
      genDailyLimit: 100,
      imageDeps: { base: 'https://fake.example/v1', apiKey: 'k', model: 'm', fetch: upstream.fetchFn },
    })
    const family = await createFamilyAsParent(h.app, 'gen-dedupe-parent')
    token = family.token
    const responses = await Promise.all(Array.from({ length: 20 }, () => generate(`poster:dedupe`)))
    expect(responses.every((r) => r.statusCode === 200)).toBe(true)
    expect(responses.every((r) => r.json().ok === true)).toBe(true)
    expect(upstream.calls()).toBe(1)
  })

  it('超过每家庭每日上限后新场景 429，幂等命中不受限，动画任务同样计数', async () => {
    clearInFlight()
    const upstream = fakeUpstream()
    h = await makeApp(undefined, {
      mediaDir,
      genDailyLimit: 2,
      imageDeps: { base: 'https://fake.example/v1', apiKey: 'k', model: 'm', fetch: upstream.fetchFn },
    })
    const family = await createFamilyAsParent(h.app, 'gen-quota-parent')
    token = family.token
    const first = await generate('poster:q1')
    expect(first.statusCode).toBe(200)
    const second = await generate('poster:q2')
    expect(second.statusCode).toBe(200)

    // 直接落一条今日动画任务：跨域合计计数
    await h.db.videoAsset.create({ data: { scene: `fam:${family.familyId}:chapter:anim:1`, kind: 'chapter', taskId: 'task-1', status: 'queued', prompt: 'p', model: 'm' } })
    const third = await generate('poster:q3')
    expect(third.statusCode).toBe(429)
    expect(third.json().code).toBe('GEN_QUOTA_EXCEEDED')

    // 已生成的场景幂等命中：不再出网、不受配额限制
    const cached = await generate('poster:q1')
    expect(cached.statusCode).toBe(200)
    expect(cached.json().ok).toBe(true)
  })

  it('插画在途时视频跨域请求 409（家庭级互斥，不 join 别人的 Promise/reply）', async () => {
    clearInFlight()
    const art = fakeUpstream()
    const video = fakeVideoUpstream()
    h = await makeApp(undefined, {
      mediaDir,
      genDailyLimit: 100,
      imageDeps: { base: 'https://fake.example/v1', apiKey: 'k', model: 'm', fetch: art.fetchFn },
      videoDeps: { base: 'https://fake.example/v1', apiKey: 'k', model: 'm', fetch: video.fetchFn },
    })
    const family = await createFamilyAsParent(h.app, 'gen-cross-parent')
    token = family.token
    const artReq = generate('poster:cross')
    await new Promise((resolve) => setTimeout(resolve, 15)) // 确保插画先进入家庭临界区
    const videoRes = await h.app.inject({
      method: 'POST',
      url: '/api/video/generate',
      headers: authHeaders(token),
      payload: { scene: 'chapter:cross:1', description: '会动的睡前画面' },
    })
    expect(videoRes.statusCode).toBe(409)
    expect(videoRes.json().code).toBe('GENERATION_BUSY')
    // 插画请求本身不受影响，正常完成
    const artRes = await artReq
    expect(artRes.statusCode).toBe(200)
    expect(artRes.json().ok).toBe(true)
    expect(video.calls()).toBe(0) // 跨域等待者没有触发视频出网
  })

  it('视频同域并发共享在途任务：同场景 N 个并发只建一个上游任务', async () => {
    clearInFlight()
    const video = fakeVideoUpstream()
    h = await makeApp(undefined, {
      mediaDir,
      genDailyLimit: 100,
      videoDeps: { base: 'https://fake.example/v1', apiKey: 'k', model: 'm', fetch: video.fetchFn },
    })
    const family = await createFamilyAsParent(h.app, 'gen-video-parent')
    token = family.token
    const videoGenerate = (scene: string) =>
      h.app.inject({
        method: 'POST',
        url: '/api/video/generate',
        headers: authHeaders(token),
        payload: { scene, description: '会动的睡前画面' },
      })
    const responses = await Promise.all(Array.from({ length: 5 }, () => videoGenerate('chapter:vd:1')))
    expect(responses.every((r) => r.statusCode === 200)).toBe(true)
    expect(responses.every((r) => r.json().status === 'queued')).toBe(true)
    expect(video.calls()).toBe(1)
  })
})

describe('imagegen 供应商回包容错', () => {
  it('200 + 坏 JSON：generate 返回 null 走失败路径，不抛错（路由不 500）', async () => {
    const gen = new ImageGenerator(
      {
        base: 'https://fake.example/v1',
        apiKey: 'k',
        model: 'm',
        fetch: (() =>
          Promise.resolve(new Response('<html>gateway error page</html>', { status: 200 }))) as unknown as typeof fetch,
      },
      mediaDir,
    )
    const out = await gen.generate({ kind: 'cover', scene: 'bad:json', description: '描述', label: '标签', lang: 'zh' })
    expect(out).toBeNull()
  })
})
