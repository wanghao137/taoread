import { describe, expect, it } from 'vitest'
import { buildApp } from '../src/app'

describe('buildApp', () => {
  it('健康检查返回 ok 与服务标识', async () => {
    const app = await buildApp()
    const response = await app.inject({ method: 'GET', url: '/api/health' })
    expect(response.statusCode).toBe(200)
    const body = response.json() as { ok: boolean; service: string }
    expect(body.ok).toBe(true)
    expect(body.service).toBe('taoread-server')
    await app.close()
  })
})
