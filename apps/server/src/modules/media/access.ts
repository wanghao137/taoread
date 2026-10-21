import { createHmac, timingSafeEqual } from 'node:crypto'
import { ForbiddenError, UnauthorizedError } from '../../lib/errors'
import type { DeviceRole } from '../../lib/auth'

export interface MediaClaims { fid: string; sid: string; role?: DeviceRole; pv?: number }

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
 * 性能（2026-09-24）：票据过期时间「分桶取整」——同一桶窗口内同一
 * (family, sid, path) 生成的 URL 完全一致，浏览器/Cloudflare 边缘缓存才能命中
 * （此前每次请求都生成新票据 → URL 每次都变 → 所有缓存永远 miss，图片极慢）。
 *
 * 分桶按路径类区分（2026-10-21 国内链路优化）：图片类（art/fam-import/videos）
 * 4 小时桶——媒体请求在 routes.ts 里仍逐次过 sessionGuard.assertActive（注销/撤权
 * 即刻失效），拉长桶只延长「同一有效会话内」的 URL 稳定窗口，让浏览器缓存跨小时
 * 命中、重复进书架零图片流量；泄漏影响面受会话有效性约束。TTS/phonics 维持短桶。
 */
const TICKET_BUCKET_SEC = 1800
const IMAGE_TICKET_BUCKET_SEC = 14400

function bucketFor(pathInMedia: string): number {
  return pathInMedia.startsWith('art/') || pathInMedia.startsWith('fam-import/') || pathInMedia.startsWith('videos/')
    ? IMAGE_TICKET_BUCKET_SEC
    : TICKET_BUCKET_SEC
}

export function mediaUrl(path: string, claims: MediaClaims, secret: Buffer, nowSec = Math.floor(Date.now() / 1000)): string {
  if (!path.startsWith('/api/media/')) throw new Error('invalid media path')
  const bucket = bucketFor(path.slice('/api/media/'.length))
  const e = nowSec - (nowSec % bucket) + bucket * 2
  const payload = Buffer.from(JSON.stringify({ p: path.slice('/api/media/'.length), f: claims.fid, s: claims.sid, e, r: claims.role, v: claims.pv })).toString('base64url')
  const signature = createHmac('sha256', secret).update(`taoread-media-v1:${payload}`).digest('base64url')
  return `${path}?ticket=${payload}.${signature}`
}

export function verifyMediaTicket(ticket: string, path: string, secret: Buffer, nowSec = Math.floor(Date.now() / 1000)): MediaClaims {
  const parts = ticket.split('.')
  if (parts.length !== 2 || !parts[0] || !parts[1] || parts[0].length > 2048) throw new UnauthorizedError()
  const expected = createHmac('sha256', secret).update(`taoread-media-v1:${parts[0]}`).digest()
  let signature: Buffer
  try { signature = Buffer.from(parts[1], 'base64url') } catch { throw new UnauthorizedError() }
  if (signature.length !== expected.length || !timingSafeEqual(signature, expected)) throw new UnauthorizedError()
  let payload: unknown
  try { payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8')) } catch { throw new UnauthorizedError() }
  if (!payload || typeof payload !== 'object') throw new UnauthorizedError()
  const { p, f, s, e, r, v } = payload as Record<string, unknown>
  const maxAgeSec = bucketFor(path) * 2
  if (p !== path || typeof f !== 'string' || typeof s !== 'string' || s.length < 8 || typeof e !== 'number' || !Number.isInteger(e) || e <= nowSec || e > nowSec + maxAgeSec) throw new UnauthorizedError()
  if (r !== undefined && r !== 'parent' && r !== 'child') throw new UnauthorizedError()
  if (v !== undefined && (typeof v !== 'number' || !Number.isSafeInteger(v) || v < 1)) throw new UnauthorizedError()
  return { fid: f, sid: s, ...(r === undefined ? {} : { role: r }), ...(v === undefined ? {} : { pv: v as number }) }
}
