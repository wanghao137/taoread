import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, api, request } from '../src/lib/api'

function mockFetch(impl: (url: string, init: RequestInit | undefined) => Promise<Response>) {
  const calls: Array<{ url: string; init?: RequestInit }> = []
  const fn = vi.fn(async (url: unknown, init?: RequestInit) => {
    calls.push({ url: String(url), init })
    return impl(String(url), init)
  })
  vi.stubGlobal('fetch', fn)
  return { fn, calls }
}

function jsonResponse(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as unknown as Response
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('request / api 客户端', () => {
  it('GET 携带 Bearer 头并解析 JSON', async () => {
    const { calls } = mockFetch(async () => jsonResponse(200, { ok: true, children: [] }))
    const data = await api.familyView('fam-1', 'tok-1')
    expect(data).toMatchObject({ ok: true })
    expect(calls[0]!.init?.headers).toMatchObject({ Authorization: 'Bearer tok-1' })
    expect(calls[0]!.url).toBe('/api/family/fam-1')
  })

  it('POST 序列化 body 且 Content-Type 正确（api 客户端对家庭码原样直通）', async () => {
    const { calls } = mockFetch(async () =>
      jsonResponse(200, { familyId: 'f', familyCode: 'ABCD2345', token: 't' }),
    )
    await api.joinFamily('abcd2345', 'child', 'web-dev-1')
    expect(calls[0]!.init?.method).toBe('POST')
    expect(calls[0]!.init?.headers).toMatchObject({ 'Content-Type': 'application/json' })
    // 大写归一是 UI 层职责（LoginPage 输入框 toUpperCase），api 客户端只做透明管道
    expect(JSON.parse(String(calls[0]!.init?.body))).toMatchObject({
      familyCode: 'abcd2345',
      role: 'child',
    })
  })

  it('服务端错误归一为 ApiError（code/message 直通中文）', async () => {
    mockFetch(async () => jsonResponse(404, { code: 'NOT_FOUND', message: '没有找到这个家庭码，请核对后再试' }))
    const err = await api.joinFamily('AAAA2222', 'child', 'd').catch((e: unknown) => e)
    expect(err).toBeInstanceOf(ApiError)
    expect((err as ApiError).status).toBe(404)
    expect((err as ApiError).code).toBe('NOT_FOUND')
    expect((err as ApiError).message).toContain('家庭码')
  })

  it('网络层失败 → ApiError(NETWORK) 且文案无指责', async () => {
    mockFetch(async () => {
      throw new Error('ECONNRESET')
    })
    const err = await request('/api/x').catch((e: unknown) => e)
    expect((err as ApiError).code).toBe('NETWORK')
    expect((err as ApiError).message).toContain('网络')
  })

  it('204 无 body 不抛错', async () => {
    mockFetch(async () => ({ ok: true, status: 204, json: async () => { throw new Error('no body') } } as unknown as Response))
    await expect(request('/api/x', { method: 'DELETE' })).resolves.toBeUndefined()
  })

  it('2xx 但 body 非 JSON → 抛 ApiError(BAD_RESPONSE)，下游永不收到 undefined', async () => {
    mockFetch(async () => ({ ok: true, status: 200, json: async () => { throw new Error('bad') } } as unknown as Response))
    const err = await request('/api/x').catch((e: unknown) => e)
    expect(err).toBeInstanceOf(ApiError)
    expect((err as ApiError).code).toBe('BAD_RESPONSE')
  })

  it('401 → 清会话 + 抛 UNAUTHORIZED（design-system §9 单点处理）', async () => {
    const { useSession } = await import('../src/stores/session')
    useSession.getState().signIn({ token: 't', familyId: 'f', familyCode: 'ABCD2345', role: 'child' })
    mockFetch(async () => jsonResponse(401, { code: 'AUTH', message: '登录状态过期啦' }))
    await expect(request('/api/shell', { token: 't' })).rejects.toMatchObject({
      status: 401,
      code: 'UNAUTHORIZED',
    })
    expect(useSession.getState().token).toBeNull()
    expect(useSession.getState().role).toBeNull()
  })

  it('孩子书架视图归一化：服务端 books 字段映射为 childrenView（N6-002）', async () => {
    const { calls } = mockFetch(async () =>
      jsonResponse(200, {
        view: 'child',
        total: 2,
        books: [
          { bookId: 'B1', title: '脑筋急转弯', category: '童书-幼儿启蒙' },
          { bookId: 'B2', title: '十万个为什么', category: '童书-幼儿启蒙' },
        ],
        albums: [],
        mp: {},
      }),
    )
    const dto = await api.shelf('fam-1', 'tok-1', 'child')
    expect(calls[0]!.url).toContain('view=child')
    expect(dto.childrenView).toHaveLength(2)
    expect(dto.childrenView![0]!.title).toBe('脑筋急转弯')
  })

  it('家庭码输入大写归一后发出（UI 层已 toUpperCase，此处防回归）', async () => {
    const { calls } = mockFetch(async () => jsonResponse(200, { familyId: 'f', familyCode: 'X', token: 't' }))
    await api.joinFamily('  ab12cd34  '.trim().toUpperCase(), 'parent', 'd')
    expect(JSON.parse(String(calls[0]!.init?.body)).familyCode).toBe('AB12CD34')
  })
})
