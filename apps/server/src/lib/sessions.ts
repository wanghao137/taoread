import { randomBytes } from 'node:crypto'
import type { PrismaClient } from '@prisma/client'
import { UnauthorizedError } from './errors'

/**
 * 可撤销设备会话（审计 T02/F04）。
 *
 * 令牌携带 sid（DeviceSession.id）；requireAuth 前的守卫校验：
 *   1. 会话存在且未撤销；
 *   2. 所属家庭仍存在（家庭注销级联删除会话）。
 * 进程内 TTL 缓存（默认 30s）避免每个请求查库；撤销/注销同进程立即逐出缓存，
 * 多进程部署下其他实例最长 TTL 内感知——这是本实现声明的撤销时效。
 * 单实例部署（当前形态）撤销即时生效。
 */

const CACHE_TTL_MS = 30_000

export interface SessionGuard {
  /** 断言会话可用：存在、未撤销、家庭仍存在；否则 UnauthorizedError */
  assertActive: (fid: string, sid: string) => Promise<void>
  /** 立即逐出某家庭全部会话缓存（家庭注销/全员撤销时调用） */
  evictFamily: (familyId: string) => void
  /** 立即逐出单个会话缓存（单设备撤销时调用） */
  evictSession: (sid: string) => void
  /** 撤销家庭全部会话（写库 + 逐出缓存） */
  revokeFamilySessions: (familyId: string) => Promise<void>
  /** 撤销单个会话（写库 + 逐出缓存） */
  revokeSession: (sid: string) => Promise<void>
}

export interface SessionDb {
  deviceSession: PrismaClient['deviceSession']
  family: PrismaClient['family']
}

export function createDeviceSession(
  db: SessionDb,
  input: { familyId: string; role: 'parent' | 'child'; deviceId?: string },
): Promise<{ id: string }> {
  return db.deviceSession.create({
    data: {
      id: `ses_${randomBytes(16).toString('hex')}`,
      familyId: input.familyId,
      role: input.role,
      deviceId: input.deviceId ?? null,
    },
    select: { id: true },
  })
}

export function createSessionGuard(db: SessionDb, now = Date.now): SessionGuard {
  // sid → { ok, expires }；ok=false 的负缓存同样 TTL，防爆破反复查库
  const cache = new Map<string, { ok: boolean; expires: number }>()
  const familySids = new Map<string, Set<string>>()

  function remember(fid: string, sid: string, ok: boolean): void {
    cache.set(sid, { ok, expires: now() + CACHE_TTL_MS })
    let set = familySids.get(fid)
    if (!set) {
      set = new Set()
      familySids.set(fid, set)
    }
    set.add(sid)
  }

  const guard: SessionGuard = {
    async assertActive(fid, sid) {
      const hit = cache.get(sid)
      if (hit && hit.expires > now()) {
        if (!hit.ok) throw new UnauthorizedError('登录已失效，请重新加入家庭')
        return
      }
      const session = await db.deviceSession.findUnique({
        where: { id: sid },
        select: { familyId: true, revokedAt: true },
      })
      let ok = false
      if (session && !session.revokedAt && session.familyId === fid) {
        // 家庭存在性：注销后 family 行删除，findUnique 返回 null → 会话失效
        const family = await db.family.findUnique({ where: { id: fid }, select: { id: true } })
        ok = family !== null
      }
      remember(fid, sid, ok)
      if (!ok) throw new UnauthorizedError('登录已失效，请重新加入家庭')
    },
    evictFamily(familyId) {
      const set = familySids.get(familyId)
      if (!set) return
      for (const sid of set) cache.delete(sid)
      familySids.delete(familyId)
    },
    evictSession(sid) {
      cache.delete(sid)
    },
    async revokeFamilySessions(familyId) {
      await db.deviceSession.updateMany({
        where: { familyId, revokedAt: null },
        data: { revokedAt: new Date() },
      })
      guard.evictFamily(familyId)
    },
    async revokeSession(sid) {
      await db.deviceSession.updateMany({
        where: { id: sid, revokedAt: null },
        data: { revokedAt: new Date() },
      })
      guard.evictSession(sid)
    },
  }
  return guard
}
