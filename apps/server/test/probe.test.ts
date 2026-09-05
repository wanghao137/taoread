import { describe, expect, it } from 'vitest'
import {
  ValidationError,
  WereadApiError,
  WereadHttpError,
} from '../src/lib/errors'
import { makeDefaultProbe } from '../src/modules/family/routes'

function fetchOnce(status: number, body: unknown): typeof fetch {
  return (async () =>
    ({ ok: status >= 200 && status < 300, status, json: async () => body })) as unknown as typeof fetch
}

function fetchThrows(): typeof fetch {
  return (async () => {
    throw new Error('ECONNRESET')
  }) as unknown as typeof fetch
}

describe('makeDefaultProbe（绑定探针的网关错误映射）', () => {
  it('网关验证通过 → active', async () => {
    const probe = makeDefaultProbe(fetchOnce(200, { errcode: 0, apis: [] }))
    await expect(probe('wrk-validkey0001')).resolves.toBe('active')
  })

  it('网关明确拒绝（errcode!=0）→ 抛 ValidationError（绑定失败不落库）', async () => {
    const probe = makeDefaultProbe(fetchOnce(200, { errcode: -2012, errmsg: '登录态失效' }))
    await expect(probe('wrk-badkey0000001')).rejects.toThrow(ValidationError)
    await expect(probe('wrk-badkey0000001')).rejects.toThrow(/验证/)
  })

  it('网络层失败 → unverified（允许绑定但标记未验证）', async () => {
    const probe = makeDefaultProbe(fetchThrows())
    await expect(probe('wrk-anykey0000001')).resolves.toBe('unverified')
  })

  it('网关 5xx 重试耗尽 → 同样视为 unverified 而非崩溃', async () => {
    const probe = makeDefaultProbe(fetchOnce(503, {}))
    await expect(probe('wrk-anykey0000001')).resolves.toBe('unverified')
  })

  it('HTTP 4xx 拒绝（如 401/403）→ ValidationError 而非伪装成网络原因', async () => {
    const probe = makeDefaultProbe(fetchOnce(401, {}))
    await expect(probe('wrk-badkey0000001')).rejects.toThrow(ValidationError)
  })

  it('升级信号（回包 upgrade_info）必须原样上抛，绝不允许标记为 unverified', async () => {
    // fetch 层抛错会被 callWereadApi 包装成网络错误（status=0），
    // 因此升级信号必须通过 200 + upgrade_info 回包触发，才能穿过网关适配层到达探针
    const probeImpl = makeDefaultProbe(fetchOnce(200, {
      errcode: 0,
      upgrade_info: { message: '请升级到 1.0.5' },
    }))
    await expect(probeImpl('wrk-anykey0000001')).rejects.toMatchObject({
      name: 'UpgradeRequiredError',
      statusCode: 503,
    })
  })

  it('类型导出完整（WereadHttpError/WereadApiError 参与映射语义）', () => {
    expect(new WereadApiError(-1, 'x')).toBeInstanceOf(WereadApiError)
    expect(new WereadHttpError('y', 500)).toBeInstanceOf(WereadHttpError)
  })
})
