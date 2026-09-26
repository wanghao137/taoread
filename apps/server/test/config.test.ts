import { describe, expect, it } from 'vitest'
import { loadConfig } from '../src/config'
import { ConfigError } from '../src/lib/errors'

const BASE = {
  TAO_MASTER_KEY: 'x'.repeat(32),
  TAO_DATABASE_URL: 'file:./test.db',
}

describe('loadConfig', () => {
  it('默认值正确（PORT 8787 / dev / CORS *）', () => {
    const cfg = loadConfig({ ...BASE })
    expect(cfg.PORT).toBe(8787)
    expect(cfg.TAO_HOST).toBe('127.0.0.1')
    expect(cfg.NODE_ENV).toBe('dev')
    expect(cfg.TAO_ALLOWED_ORIGIN).toBe('*')
  })

  it('缺少 TAO_MASTER_KEY 时拒绝启动并给出中文提示', () => {
    expect(() => loadConfig({ TAO_DATABASE_URL: BASE.TAO_DATABASE_URL })).toThrow(ConfigError)
    expect(() => loadConfig({ TAO_DATABASE_URL: BASE.TAO_DATABASE_URL })).toThrow(/TAO_MASTER_KEY/)
  })

  it('主密钥过短时拒绝', () => {
    expect(() => loadConfig({ TAO_MASTER_KEY: 'short' })).toThrow(ConfigError)
  })

  it('生产环境禁止 CORS 全开（防危险默认）', () => {
    expect(() =>
      loadConfig({ ...BASE, NODE_ENV: 'prod', TAO_ALLOWED_ORIGIN: '*' }),
    ).toThrow(/CORS/)
  })

  it('生产环境显式配置来源后放行', () => {
    const cfg = loadConfig({ ...BASE, NODE_ENV: 'prod', TAO_ALLOWED_ORIGIN: 'https://taoread.example' })
    expect(cfg.TAO_ALLOWED_ORIGIN).toBe('https://taoread.example')
  })
})

describe('TAO_HOST 监听范围', () => {
  it('显式地址可以配置，非法地址拒绝', () => {
    expect(loadConfig({ ...BASE, TAO_HOST: '0.0.0.0' }).TAO_HOST).toBe('0.0.0.0')
    expect(() => loadConfig({ ...BASE, TAO_HOST: 'example.com' })).toThrow(ConfigError)
  })
})

describe('TAO_BEDTIME 残留配置（阅读时间限制已于 2026-09-25 取消）', () => {
  it('配置项已移除，残留环境变量被忽略且不报错', () => {
    const cfg = loadConfig({ ...BASE, TAO_BEDTIME: '1290' })
    expect((cfg as Record<string, unknown>).TAO_BEDTIME).toBeUndefined()
  })
})
