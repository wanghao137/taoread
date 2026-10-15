import { createHmac, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import type { PrismaClient } from '@prisma/client'
import { AppError, ValidationError } from './errors'

export const PARENT_PIN_PATTERN = /^\d{6,12}$/
const WINDOW_MS = 15 * 60_000
const MAX_ATTEMPTS = 5

export function validateParentPin(pin: string): void {
  if (!PARENT_PIN_PATTERN.test(pin)) throw new ValidationError('家长 PIN 需要 6–12 位数字')
}

function derive(pin: string, salt: Buffer, secret: Buffer): Promise<Buffer> {
  // PIN 熵较低，pepper 与数据库分开保存，避免仅凭数据库离线枚举数字 PIN。
  const input = createHmac('sha256', secret).update('taoread-parent-pin-v1\0').update(pin).digest()
  return new Promise((resolve, reject) => {
    scrypt(input, salt, 32, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (err, key) => {
      if (err) reject(err)
      else resolve(key)
    })
  })
}

export async function hashParentPin(pin: string, secret: Buffer): Promise<string> {
  validateParentPin(pin)
  const salt = randomBytes(16)
  const key = await derive(pin, salt, secret)
  return `scrypt-v1$${salt.toString('hex')}$${key.toString('hex')}`
}

export async function matchesParentPin(pin: string, hash: string, secret: Buffer): Promise<boolean> {
  if (!PARENT_PIN_PATTERN.test(pin)) return false
  const [version, saltHex, keyHex, extra] = hash.split('$')
  if (version !== 'scrypt-v1' || !/^[a-f0-9]{32}$/.test(saltHex ?? '') || !/^[a-f0-9]{64}$/.test(keyHex ?? '') || extra !== undefined) return false
  return timingSafeEqual(await derive(pin, Buffer.from(saltHex!, 'hex'), secret), Buffer.from(keyHex!, 'hex'))
}

/** 持久化家庭限速：在执行哈希前原子占用名额，换 IP、重启和并发请求都不能绕过。 */
export async function verifyParentPin(
  db: Pick<PrismaClient, 'family'>,
  family: { id: string; parentPinHash: string | null },
  pin: string | undefined,
  secret: Buffer,
): Promise<void> {
  if (!family.parentPinHash) {
    throw new AppError('旧家庭尚未设置家长 PIN，请联系家庭管理员在服务主机完成迁移；家庭码仍可供孩子加入', 'PARENT_PIN_SETUP_REQUIRED', 403)
  }
  const now = new Date()
  const cutoff = new Date(now.getTime() - WINDOW_MS)
  const sameHash = { id: family.id, parentPinHash: family.parentPinHash }
  await db.family.updateMany({
    where: { ...sameHash, OR: [{ parentPinWindowStart: null }, { parentPinWindowStart: { lte: cutoff } }] },
    data: { parentPinAttempts: 0, parentPinWindowStart: now },
  })
  const reserved = await db.family.updateMany({
    where: { ...sameHash, parentPinAttempts: { lt: MAX_ATTEMPTS }, parentPinWindowStart: { gt: cutoff } },
    data: { parentPinAttempts: { increment: 1 } },
  })
  if (!reserved.count) throw new AppError('家长 PIN 尝试过多，请 15 分钟后重试', 'PARENT_PIN_RATE_LIMIT', 429)
  if (!pin || !await matchesParentPin(pin, family.parentPinHash, secret)) {
    throw new AppError('家长 PIN 不正确，请核对后重试', 'PARENT_PIN_INVALID', 403)
  }
  await db.family.updateMany({ where: sameHash, data: { parentPinAttempts: 0, parentPinWindowStart: null } })
}

/** 仅供主机管理员迁移/恢复：不接受旧家长令牌作为身份凭据。 */
export async function recoverParentPin(db: PrismaClient, familyCode: string, pin: string, secret: Buffer): Promise<void> {
  if (familyCode.trim().toUpperCase() === pin) throw new ValidationError('家长 PIN 不能与家庭码相同')
  const hash = await hashParentPin(pin, secret)
  await db.$transaction(async tx => {
    const family = await tx.family.update({
      where: { code: familyCode.trim().toUpperCase() },
      data: { parentPinHash: hash, parentPinVersion: { increment: 1 }, parentPinAttempts: 0, parentPinWindowStart: null },
    })
    await tx.deviceSession.updateMany({ where: { familyId: family.id, role: 'parent', revokedAt: null }, data: { revokedAt: new Date() } })
  })
}
