import { beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import { authHeaders, createFamilyAsParent, makeApp, type TestHarness } from './helper'
import { clearInFlight } from '../src/modules/media/generationGuard'

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
})
