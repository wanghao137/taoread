import { createHmac, timingSafeEqual } from 'node:crypto'
import type { TokenClaims } from '../../lib/auth'
import { ForbiddenError, UnauthorizedError } from '../../lib/errors'

/** Public catalog keys are written by offline tooling; family keys stay private. */
export function familyScene(familyId: string, scene: string): string {
  if (scene.startsWith('fam:')) {
    assertSceneReadable(familyId, scene)
    return scene
  }
  return `fam:${familyId}:${scene}`
}

export function assertSceneReadable(familyId: string, scene: string): void {
  if (scene.startsWith('fam:') && !scene.startsWith(`fam:${familyId}:`)) {
    throw new ForbiddenError('不能访问其他家庭的素材')
  }
}

/**
 * 短时效、路径绑定的媒体访问票据（不能用于认证 API 请求）。
 *
 * 性能（2026-09-24）：票据过期时间按 30 分钟「分桶取整」——同一小时窗口内
 * 同一 (family, sid, path) 生成的 URL 完全一致，浏览器/Cloudflare 边缘缓存才能命中
 * （此前每次请求都生成新票据 → URL 每次都变 → 所有缓存永远 miss，图片极慢）。
 * 有效期 30~60 分钟，仍绑定家庭与会话，泄漏影响面有限。
 */
const TICKET_BUCKET_SEC = 1800

export function mediaUrl(path: string, claims: TokenClaims, secret: Buffer, nowSec = Math.floor(Date.now() / 1000)): string {
  if (!path.startsWith('/api/media/')) throw new Error('invalid media path')
  const e = nowSec - (nowSec % TICKET_BUCKET_SEC) + TICKET_BUCKET_SEC * 2
  const payload = Buffer.from(JSON.stringify({ p: path.slice('/api/media/'.length), f: claims.fid, s: claims.sid, e })).toString('base64url')
  const signature = createHmac('sha256', secret).update(`taoread-media-v1:${payload}`).digest('base64url')
  return `${path}?ticket=${payload}.${signature}`
}

export function verifyMediaTicket(ticket: string, path: string, secret: Buffer, nowSec = Math.floor(Date.now() / 1000)): { fid: string; sid: string } {
  const parts = ticket.split('.')
  if (parts.length !== 2 || !parts[0] || !parts[1] || parts[0].length > 2048) throw new UnauthorizedError()
  const expected = createHmac('sha256', secret).update(`taoread-media-v1:${parts[0]}`).digest()
  let signature: Buffer
  try { signature = Buffer.from(parts[1], 'base64url') } catch { throw new UnauthorizedError() }
  if (signature.length !== expected.length || !timingSafeEqual(signature, expected)) throw new UnauthorizedError()
  let payload: unknown
  try { payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8')) } catch { throw new UnauthorizedError() }
  if (!payload || typeof payload !== 'object') throw new UnauthorizedError()
  const { p, f, s, e } = payload as Record<string, unknown>
  const maxAgeSec = TICKET_BUCKET_SEC * 2
  if (p !== path || typeof f !== 'string' || typeof s !== 'string' || s.length < 8 || typeof e !== 'number' || !Number.isInteger(e) || e <= nowSec || e > nowSec + maxAgeSec) throw new UnauthorizedError()
  return { fid: f, sid: s }
}
