import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { UnauthorizedError } from './errors'

/**
 * 设备令牌：HMAC-SHA256 签名的紧凑 JWT（header.payload.signature）。
 *
 * 无状态（不落库、无会话表）；签名密钥由 TAO_MASTER_KEY 派生，
 * 服务重启后已签发令牌仍然有效（相对原计划的「内存态随机密钥」的刻意偏离：
 * 夜间开发频繁重启，随机密钥会导致全部设备反复重新绑定，日志已记录）。
 * 主密钥更换=全员下线，是预期的失效路径。
 */

export type DeviceRole = 'parent' | 'child'

export interface TokenClaims {
  /** familyId */
  fid: string
  role: DeviceRole
  /** deviceId（客户端生成的设备标识，仅用于展示与统计） */
  did: string
  iat: number
  exp: number
}

export const DEFAULT_TOKEN_TTL_SEC = 30 * 24 * 3600 // 30 天

/** 由主密钥派生令牌签名密钥（HMAC 分离域，避免与未来其他派生用途冲突） */
export function deriveTokenSecret(masterKey: string): Buffer {
  return createHmac('sha256', masterKey).update('taoread-auth-v1').digest()
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url')
}

function sign(data: string, secret: Buffer): string {
  return createHmac('sha256', secret).update(data).digest('base64url')
}

export function signToken(
  claims: Omit<TokenClaims, 'iat' | 'exp'>,
  secret: Buffer,
  options: { ttlSec?: number; nowSec?: number } = {},
): string {
  const nowSec = options.nowSec ?? Math.floor(Date.now() / 1000)
  const full: TokenClaims = {
    ...claims,
    iat: nowSec,
    exp: nowSec + (options.ttlSec ?? DEFAULT_TOKEN_TTL_SEC),
  }
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = b64url(JSON.stringify(full))
  const signature = sign(`${header}.${payload}`, secret)
  return `${header}.${payload}.${signature}`
}

/** 校验并解析令牌；失败一律抛 UnauthorizedError（不泄露失败细节） */
export function verifyToken(token: string, secret: Buffer, nowSec?: number): TokenClaims {
  const parts = token.split('.')
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    throw new UnauthorizedError('登录凭证无效')
  }
  const header = parts[0]
  const payload = parts[1]
  const signature = parts[2]
  const expected = sign(`${header}.${payload}`, secret)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new UnauthorizedError('登录凭证无效')
  }
  let claims: TokenClaims
  try {
    const parsed: unknown = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('not object')
    }
    claims = parsed as TokenClaims
  } catch {
    throw new UnauthorizedError('登录凭证无效')
  }
  if (
    typeof claims.fid !== 'string' ||
    (claims.role !== 'parent' && claims.role !== 'child') ||
    typeof claims.did !== 'string' ||
    typeof claims.exp !== 'number'
  ) {
    throw new UnauthorizedError('登录凭证无效')
  }
  if (claims.exp <= (nowSec ?? Math.floor(Date.now() / 1000))) {
    throw new UnauthorizedError('登录已过期，请使用家庭码重新加入')
  }
  return claims
}

/** 家庭码：8 位大写安全字符（去除易混淆的 0/O/1/I），格式如 K7QM2XPA */
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateFamilyCode(random: (n: number) => Buffer = randomBytes): string {
  const bytes = random(8)
  let code = ''
  for (const byte of bytes) {
    code += CODE_ALPHABET[byte % CODE_ALPHABET.length]
  }
  return code
}

export function isValidFamilyCode(code: string): boolean {
  // 6-8 位（自动生成码仍为 8 位旧字符集；演示家庭码 123456 为 6 位全数字）
  return /^[0-9A-HJ-NP-Z]{6,8}$/.test(code)
}
