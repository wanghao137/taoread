import { describe, expect, it, vi } from 'vitest'
import {
  callWereadApi,
  type SleepFn,
} from '../src/services/weread/gateway'
import {
  UpgradeRequiredError,
  WereadApiError,
  WereadHttpError,
} from '../src/lib/errors'
import { SKILL_VERSION, WEREAD_GATEWAY_URL } from '@taoread/shared'

/** 手造最小 Response 形状，避免依赖真实 Response 构造细节 */
interface MockResponse {
  ok: boolean
  status: number
  json: () => Promise<unknown>
}

function res(status: number, body: unknown): MockResponse {
  return { ok: status >= 200 && status < 300, status, json: async () => body }
}

function resWithBadJson(status: number): MockResponse {
  return { ok: status >= 200 && status < 300, status, json: async () => { throw new Error('not json') } }
}

/** 按序返回预设响应；记录每次请求的 url / headers / body */
function mockFetch(responses: Array<MockResponse>) {
  const calls: Array<{ url: string; headers: Record<string, string>; body: string }> = []
  let index = 0
  const fetchImpl = (async (url: unknown, init?: RequestInit) => {
    calls.push({
      url: String(url),
      headers: (init?.headers ?? {}) as Record<string, string>,
      body: String(init?.body ?? ''),
    })
    const preset = responses[index]
    index += 1
    if (!preset) throw new Error(`mock fetch: 未预设第 ${index} 次响应`)
    return preset
  }) as unknown as typeof fetch
  return { fetchImpl, calls }
}

const noSleep: SleepFn = async () => {}
const warn = vi.fn()

describe('callWereadApi — 请求构造', () => {
  it('业务参数平铺在顶层并携带 skill_version（禁止 params 嵌套）', async () => {
    const { fetchImpl, calls } = mockFetch([res(200, { errcode: 0, data: 'ok' })])
    await callWereadApi({
      apiKey: 'wrk-test',
      apiName: '/store/search',
      params: { keyword: '三体', count: 3, scope: 10 },
      fetchImpl,
      sleep: noSleep,
    })
    const sent = JSON.parse(calls[0]!.body) as Record<string, unknown>
    expect(sent.api_name).toBe('/store/search')
    expect(sent.skill_version).toBe(SKILL_VERSION)
    expect(sent.keyword).toBe('三体')
    expect(sent.count).toBe(3)
    expect(sent.scope).toBe(10)
    expect(sent.params).toBeUndefined()
  })

  it('中文关键词按 UTF-8 原文往返无损', async () => {
    const { fetchImpl, calls } = mockFetch([res(200, { errcode: 0 })])
    await callWereadApi({
      apiKey: 'wrk-test',
      apiName: '/store/search',
      params: { keyword: '三体' },
      fetchImpl,
      sleep: noSleep,
    })
    const sent = JSON.parse(calls[0]!.body) as { keyword: string }
    expect(sent.keyword).toBe('三体')
  })

  it('URL、方法、鉴权头、Content-Type 正确', async () => {
    const { fetchImpl, calls } = mockFetch([res(200, { errcode: 0 })])
    await callWereadApi({
      apiKey: 'wrk-test',
      apiName: '/_list',
      fetchImpl,
      sleep: noSleep,
    })
    expect(calls[0]!.url).toBe(WEREAD_GATEWAY_URL)
    expect(calls[0]!.headers.Authorization).toBe('Bearer wrk-test')
    expect(calls[0]!.headers['Content-Type']).toBe('application/json')
  })
})

describe('callWereadApi — 回包语义', () => {
  it('errcode=0 或缺失 errcode 均视为成功并透传数据', async () => {
    const a = mockFetch([res(200, { errcode: 0, value: 1 })])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl: a.fetchImpl, sleep: noSleep }),
    ).resolves.toEqual({ errcode: 0, value: 1 })

    const b = mockFetch([res(200, { books: [] })])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl: b.fetchImpl, sleep: noSleep }),
    ).resolves.toEqual({ books: [] })
  })

  it('errcode 非 0 抛 WereadApiError 且携带中文 errmsg', async () => {
    const { fetchImpl } = mockFetch([res(200, { errcode: -2012, errmsg: '登录态失效' })])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'WereadApiError', errcode: -2012, message: '登录态失效' })
  })

  it('errcode 非 0 且无 errmsg 时使用兜底文案', async () => {
    const { fetchImpl } = mockFetch([res(200, { errcode: 1 })])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'WereadApiError', message: '微信读书接口返回错误' })
  })

  it('回包含 upgrade_info 时抛 UpgradeRequiredError 并透传信息', async () => {
    const info = { message: '请升级到 1.0.5' }
    const { fetchImpl } = mockFetch([res(200, { errcode: 0, upgrade_info: info })])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({
      name: 'UpgradeRequiredError',
      message: '请升级到 1.0.5',
      info,
    })
  })

  it('回包同时含 errcode!=0 与 upgrade_info 时，升级信息优先于业务错误', async () => {
    const { fetchImpl } = mockFetch([
      res(200, { errcode: -2012, errmsg: '登录态失效', upgrade_info: { message: '请升级' } }),
    ])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'UpgradeRequiredError', message: '请升级' })
  })

  it('200 回包为 null / 数组 / 标量等非对象时按无法解析处理（契约检查不可被绕过）', async () => {
    const nullCase = mockFetch([res(200, null)])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl: nullCase.fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'WereadApiError', errcode: -1 })

    const arrayCase = mockFetch([res(200, [1, 2])])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl: arrayCase.fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'WereadApiError', errcode: -1 })

    const scalarCase = mockFetch([res(200, 'ok')])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl: scalarCase.fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'WereadApiError', errcode: -1 })
  })

  it('200 但响应体不是合法 JSON 时抛 WereadApiError', async () => {
    const { fetchImpl } = mockFetch([resWithBadJson(200)])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'WereadApiError', errcode: -1 })
  })
})

describe('callWereadApi — 重试与失败', () => {
  it('429 后重试成功（共 2 次调用）', async () => {
    const { fetchImpl, calls } = mockFetch([
      res(429, {}),
      res(200, { errcode: 0, ok: true }),
    ])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).resolves.toMatchObject({ ok: true })
    expect(calls).toHaveLength(2)
  })

  it('5xx 连续失败超过重试上限后抛 WereadHttpError（默认共 3 次尝试）', async () => {
    const { fetchImpl, calls } = mockFetch([
      res(503, {}),
      res(502, {}),
      res(500, {}),
    ])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep, logger: { warn } }),
    ).rejects.toMatchObject({ name: 'WereadHttpError', status: 500 })
    expect(calls).toHaveLength(3)
  })

  it('非 429 的 4xx 不重试，立即失败', async () => {
    const { fetchImpl, calls } = mockFetch([res(403, {})])
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({ name: 'WereadHttpError', status: 403 })
    expect(calls).toHaveLength(1)
  })

  it('网络错误 cause 为非 Error 值时错误消息仍可读', async () => {
    const fetchImpl = (async () => {
      throw 'ECONNRESET-as-string'
    }) as unknown as typeof fetch
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep }),
    ).rejects.toMatchObject({
      name: 'WereadHttpError',
      status: 0,
      message: expect.stringContaining('ECONNRESET-as-string'),
    })
  })

  it('网络异常（fetch 抛错）可重试，耗尽后抛错', async () => {
    let index = 0
    const calls: number[] = []
    const fetchImpl = (async () => {
      index += 1
      calls.push(index)
      throw new Error('ECONNRESET')
    }) as unknown as typeof fetch
    await expect(
      callWereadApi({ apiKey: 'k', apiName: '/x', fetchImpl, sleep: noSleep, logger: { warn } }),
    ).rejects.toMatchObject({ name: 'WereadHttpError', status: 0 })
    expect(calls).toHaveLength(3)
  })

  it('退避延时随尝试次数指数递增', async () => {
    const delays: number[] = []
    const sleep: SleepFn = async (ms) => { delays.push(ms) }
    const { fetchImpl } = mockFetch([res(503, {}), res(503, {}), res(200, { errcode: 0 })])
    await callWereadApi({
      apiKey: 'k', apiName: '/x', fetchImpl, sleep, retryBaseDelayMs: 100, logger: { warn },
    })
    expect(delays).toHaveLength(2)
    expect(delays[0]).toBeGreaterThanOrEqual(100)
    expect(delays[0]).toBeLessThan(200) // 100 + jitter(0-99)
    expect(delays[1]).toBeGreaterThanOrEqual(200)
    expect(delays[1]).toBeLessThan(300)
  })

  it('429 带 Retry-After 头时退避延时不低于其指示值', async () => {
    const delays: number[] = []
    const sleep: SleepFn = async (ms) => { delays.push(ms) }
    const retryResponse: MockResponse & { headers: { get: (n: string) => string | null } } = {
      ...res(429, {}),
      headers: { get: (name: string) => (name === 'retry-after' ? '5' : null) },
    }
    const { fetchImpl } = mockFetch([retryResponse, res(200, { errcode: 0 })])
    await callWereadApi({
      apiKey: 'k', apiName: '/x', fetchImpl, sleep, retryBaseDelayMs: 100, logger: { warn },
    })
    expect(delays[0]).toBeGreaterThanOrEqual(5000)
  })
})
