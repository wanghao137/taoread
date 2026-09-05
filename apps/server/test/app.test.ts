import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeApp, type TestHarness } from './helper'

describe('buildApp', () => {
  let h: TestHarness

  beforeAll(async () => {
    h = await makeApp()
    // 测试专用：抛非 AppError 的未知异常，锁定 500 出口不泄露内部信息
    h.app.post('/api/__boom', async () => {
      throw new Error('internal-secret-detail-should-not-leak')
    })
    await h.app.ready()
  })
  afterAll(async () => {
    await h.app.close()
    await h.db.$disconnect()
  })

  it('健康检查返回 ok 与服务标识', async () => {
    const response = await h.app.inject({ method: 'GET', url: '/api/health' })
    expect(response.statusCode).toBe(200)
    const body = response.json() as { ok: boolean; service: string }
    expect(body.ok).toBe(true)
    expect(body.service).toBe('taoread-server')
  })

  it('未知路由返回 404 且不含堆栈信息', async () => {
    const res = await h.app.inject({ method: 'GET', url: '/api/nothing' })
    expect(res.statusCode).toBe(404)
    expect(res.body).not.toMatch(/stack|Error:/)
  })

  it('未知异常统一 500 且不泄露内部错误细节', async () => {
    const res = await h.app.inject({ method: 'POST', url: '/api/__boom' })
    expect(res.statusCode).toBe(500)
    expect(res.json().code).toBe('INTERNAL')
    expect(res.body).not.toContain('internal-secret-detail-should-not-leak')
  })

  it('畸形 JSON body 走框架级 400 透传（而非 500）', async () => {
    const res = await h.app.inject({
      method: 'POST',
      url: '/api/family',
      payload: '{not-valid-json',
      headers: { 'content-type': 'application/json' },
    })
    expect(res.statusCode).toBe(400)
    expect(res.json().code).toBe('BAD_REQUEST')
  })

  it('空 body + JSON content-type 同样 400 而非 500', async () => {
    const res = await h.app.inject({
      method: 'POST',
      url: '/api/family/join',
      payload: undefined,
      headers: { 'content-type': 'application/json' },
    })
    expect(res.statusCode).toBe(400)
    expect(res.json().code).toBe('BAD_REQUEST')
  })
})
