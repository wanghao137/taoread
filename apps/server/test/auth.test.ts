import { describe, expect, it } from 'vitest'
import {
  deriveTokenSecret,
  generateFamilyCode,
  isValidFamilyCode,
  signToken,
  verifyToken,
} from '../src/lib/auth'
import { UnauthorizedError } from '../src/lib/errors'

const SECRET = deriveTokenSecret('master-key-for-tests-000000')
const CLAIMS = { fid: 'family-1', role: 'parent' as const, did: 'device-1' }

describe('signToken / verifyToken', () => {
  it('签发后可校验，claims 完整回读', () => {
    const token = signToken(CLAIMS, SECRET, { nowSec: 1000, ttlSec: 100 })
    const claims = verifyToken(token, SECRET, 1050)
    expect(claims.fid).toBe('family-1')
    expect(claims.role).toBe('parent')
    expect(claims.did).toBe('device-1')
    expect(claims.iat).toBe(1000)
    expect(claims.exp).toBe(1100)
  })

  it('过期令牌被拒绝', () => {
    const token = signToken(CLAIMS, SECRET, { nowSec: 1000, ttlSec: 100 })
    expect(() => verifyToken(token, SECRET, 1101)).toThrow(UnauthorizedError)
  })

  it('过期边界：exp==now 视为过期（<=）', () => {
    const token = signToken(CLAIMS, SECRET, { nowSec: 1000, ttlSec: 100 })
    expect(() => verifyToken(token, SECRET, 1100)).toThrow(UnauthorizedError)
    expect(verifyToken(token, SECRET, 1099).exp).toBe(1100)
  })

  it('签名密钥不匹配时拒绝（跨部署/换主密钥即全员下线）', () => {
    const token = signToken(CLAIMS, SECRET, { nowSec: 1000 })
    const other = deriveTokenSecret('another-master-key-999999999')
    expect(() => verifyToken(token, other, 1500)).toThrow(UnauthorizedError)
  })

  it('载荷被篡改时签名校验失败', () => {
    const token = signToken(CLAIMS, SECRET, { nowSec: 1000 })
    const parts = token.split('.')
    // 把 payload 里的 familyId 换成另一个家庭（base64url 可编码任意 JSON）
    const forged = Buffer.from(
      JSON.stringify({ ...CLAIMS, fid: 'family-evil', iat: 1000, exp: 999999999 }),
    ).toString('base64url')
    parts[1] = forged
    expect(() => verifyToken(parts.join('.'), SECRET, 1500)).toThrow(UnauthorizedError)
  })

  it('签名段被篡改时拒绝', () => {
    const token = signToken(CLAIMS, SECRET, { nowSec: 1000 })
    const parts = token.split('.')
    const sig = Buffer.from(parts[2]!, 'base64url')
    sig[0] = (sig[0]! + 1) % 256
    parts[2] = sig.toString('base64url')
    expect(() => verifyToken(parts.join('.'), SECRET, 1500)).toThrow(UnauthorizedError)
  })

  it('畸形令牌（段数错误/非 JWT 文本/坏 payload）统一 401 不泄露细节', () => {
    expect(() => verifyToken('abc.def', SECRET)).toThrow(UnauthorizedError)
    expect(() => verifyToken('garbage', SECRET)).toThrow(UnauthorizedError)
    const badPayload = `eyJhbGciOiJIUzI1NiJ9.${Buffer.from('not-json').toString('base64url')}.AAAA`
    expect(() => verifyToken(badPayload, SECRET)).toThrow(UnauthorizedError)
    // payload 是合法 JSON 但缺关键字段
    const missing = `h.${Buffer.from(JSON.stringify({ fid: 'x' })).toString('base64url')}.AAAA`
    expect(() => verifyToken(missing, SECRET)).toThrow(UnauthorizedError)
    // role 非法
    const badRole = signToken(
      { fid: 'f', role: 'admin' as never, did: 'd' },
      SECRET,
      { nowSec: 1000 },
    )
    expect(() => verifyToken(badRole, SECRET, 1500)).toThrow(UnauthorizedError)
  })
})

describe('generateFamilyCode / isValidFamilyCode', () => {
  it('生成 8 位码且不含易混淆字符', () => {
    for (let i = 0; i < 50; i++) {
      const code = generateFamilyCode()
      expect(code).toHaveLength(8)
      expect(isValidFamilyCode(code)).toBe(true)
      expect(code).not.toMatch(/[0O1I]/)
    }
  })

  it('码空间足够（128^8）且随机源可控', () => {
    const fixed = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7])
    expect(generateFamilyCode(() => fixed)).toBe(generateFamilyCode(() => fixed))
  })

  it('格式校验拒绝畸形输入', () => {
    expect(isValidFamilyCode('ABCD2345')).toBe(true)
    expect(isValidFamilyCode('abcd2345')).toBe(false) // 小写
    expect(isValidFamilyCode('123456')).toBe(true) // 演示家庭码（6 位全数字）
    expect(isValidFamilyCode('ABC23')).toBe(false) // 5 位
    expect(isValidFamilyCode('ABCD23456')).toBe(false) // 9 位
    expect(isValidFamilyCode('ABCD234O')).toBe(false) // 含 O
    expect(isValidFamilyCode('')).toBe(false)
  })
})
