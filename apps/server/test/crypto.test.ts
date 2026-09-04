import { describe, expect, it } from 'vitest'
import { decryptSecret, encryptSecret, maskKey } from '../src/lib/crypto'
import { CryptoError } from '../src/lib/errors'

const MASTER = 'a'.repeat(32)

describe('encryptSecret / decryptSecret', () => {
  it('加解密往返无损', async () => {
    const secret = 'wrk-abcdef1234567890'
    const cipher = await encryptSecret(secret, MASTER)
    expect(cipher).not.toContain(secret)
    await expect(decryptSecret(cipher, MASTER)).resolves.toBe(secret)
  })

  it('密文格式为 v1 五段式', async () => {
    const cipher = await encryptSecret('wrk-abcdef', MASTER)
    const parts = cipher.split('.')
    expect(parts).toHaveLength(5)
    expect(parts[0]).toBe('v1')
  })

  it('相同明文两次加密产生不同密文（随机盐/IV）', async () => {
    const a = await encryptSecret('wrk-same', MASTER)
    const b = await encryptSecret('wrk-same', MASTER)
    expect(a).not.toBe(b)
  })

  it('密文被篡改时解密失败（GCM 完整性校验）', async () => {
    const cipher = await encryptSecret('wrk-abcdef', MASTER)
    const parts = cipher.split('.')
    const tamperedCt = Buffer.from(parts[4]!, 'base64')
    tamperedCt[0] = (tamperedCt[0]! + 1) % 256
    parts[4] = tamperedCt.toString('base64')
    await expect(decryptSecret(parts.join('.'), MASTER)).rejects.toThrow(CryptoError)
  })

  it('主密钥不匹配时解密失败且不泄露原因', async () => {
    const cipher = await encryptSecret('wrk-abcdef', MASTER)
    await expect(decryptSecret(cipher, 'b'.repeat(32))).rejects.toThrow(
      '解密失败：密文损坏或主密钥不匹配',
    )
  })

  it('格式不合法的密文直接拒绝', async () => {
    await expect(decryptSecret('garbage', MASTER)).rejects.toThrow(CryptoError)
    await expect(decryptSecret('v2.a.b.c.d', MASTER)).rejects.toThrow(CryptoError)
    await expect(decryptSecret('v1..b.c.d', MASTER)).rejects.toThrow(CryptoError)
  })

  it('主密钥过短时加密即拒绝', async () => {
    await expect(encryptSecret('x', 'short')).rejects.toThrow(CryptoError)
  })
})

describe('maskKey', () => {
  it('仅显示尾 4 位', () => {
    expect(maskKey('wrk-abcdef1234567890')).toBe('****7890')
    expect(maskKey('abcd')).toBe('****')
  })
})
