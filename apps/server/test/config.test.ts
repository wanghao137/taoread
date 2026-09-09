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

describe('TAO_BEDTIME 配置（N8-006）', () => {
  it('默认 1290（21:30）', () => {
    expect(loadConfig({ ...BASE }).TAO_BEDTIME).toBe(1290)
  })

  it('off 关闭 / 数字字符串解析', () => {
    expect(loadConfig({ ...BASE, TAO_BEDTIME: 'off' }).TAO_BEDTIME).toBe('off')
    expect(loadConfig({ ...BASE, TAO_BEDTIME: '1260' }).TAO_BEDTIME).toBe(1260)
  })

  it('空串显式拒绝（防 dotenv 残留静默变成 0 点就寝=全天关闭）', () => {
    expect(() => loadConfig({ ...BASE, TAO_BEDTIME: '' })).toThrow(ConfigError)
    expect(() => loadConfig({ ...BASE, TAO_BEDTIME: '' })).toThrow(/TAO_BEDTIME/)
  })

  it('非法值拒绝：非数字/超 1439', () => {
    expect(() => loadConfig({ ...BASE, TAO_BEDTIME: 'abc' })).toThrow(ConfigError)
    expect(() => loadConfig({ ...BASE, TAO_BEDTIME: '1440' })).toThrow(ConfigError)
  })
})
