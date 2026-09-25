import type { PrismaClient } from '@prisma/client'
import {
  decryptSecret,
  encryptSecret,
  maskKey,
} from '../../lib/crypto'
import {
  deriveTokenSecret,
  generateFamilyCode,
  isValidFamilyCode,
  signToken,
  type DeviceRole,
} from '../../lib/auth'
import { createDeviceSession } from '../../lib/sessions'
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from '../../lib/errors'

/**
 * 家庭域服务：家庭创建/加入、微信读书绑定、孩子档案。
 * 越权防线：所有按 id 操作的方法都先校验归属（familyId / child.familyId）。
 * 身份模型（2026-09-25 简化）：单一家庭码凭据，家长/孩子角色由登录页选择；
 * schema.parentCode 列仅为历史数据保留，不再参与任何鉴权路径。
 */

export interface FamilySession {
  familyId: string
  familyCode: string
  token: string
}

export interface FamilyDb {
  family: PrismaClient['family']
  childProfile: PrismaClient['childProfile']
  wereadBinding: PrismaClient['wereadBinding']
  deviceSession: PrismaClient['deviceSession']
}

export function tokenSecretFrom(masterKey: string): Buffer {
  return deriveTokenSecret(masterKey)
}

export async function createFamily(
  db: FamilyDb,
  tokenSecret: Buffer,
  deviceId: string | undefined,
): Promise<FamilySession> {
  // 家庭码唯一约束碰撞时重试（32^8 空间，碰撞概率极低；防御性上限 3 次）。
  // 2026-09-25 产品决策：单一凭据——一个家庭码通吃家长/孩子，不再有第二凭据家长码。
  for (let attempt = 0; ; attempt++) {
    const code = generateFamilyCode()
    try {
      const family = await db.family.create({ data: { code } })
      const session = await createDeviceSession(db, {
        familyId: family.id,
        role: 'parent',
        deviceId,
      })
      return {
        familyId: family.id,
        familyCode: family.code,
        token: signToken(
          { fid: family.id, role: 'parent', did: deviceId ?? 'unknown-device', sid: session.id },
          tokenSecret,
        ),
      }
    } catch (err) {
      const isUniqueViolation =
        typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === 'P2002'
      if (!isUniqueViolation || attempt >= 2) throw err
    }
  }
}

export async function joinFamily(
  db: FamilyDb,
  tokenSecret: Buffer,
  input: { familyCode: string; role: DeviceRole; deviceId?: string; parentCode?: string },
): Promise<FamilySession> {
  const code = input.familyCode.trim().toUpperCase()
  if (!isValidFamilyCode(code)) {
    throw new ValidationError('家庭码格式不正确，请输入 6-8 位家庭码')
  }
  const family = await db.family.findUnique({ where: { code } })
  if (!family) {
    throw new NotFoundError('没有找到这个家庭码，请核对后再试')
  }
  // 2026-09-25 产品决策：单一凭据。家长/孩子共用家庭码，身份由登录页角色选择决定；
  // input.parentCode 仅为旧客户端兼容保留，服务端不再校验。
  const session = await createDeviceSession(db, {
    familyId: family.id,
    role: input.role,
    deviceId: input.deviceId,
  })
  return {
    familyId: family.id,
    familyCode: family.code,
    token: signToken(
      { fid: family.id, role: input.role, did: input.deviceId ?? 'unknown-device', sid: session.id },
      tokenSecret,
    ),
  }
}

/** 绑定探活结果：active=key 有效；unverified=网络原因未能验证（仍可绑定） */
export type KeyProbe = (apiKey: string) => Promise<'active' | 'unverified'>

export interface BindResult {
  maskedTail: string
  status: 'active' | 'unverified'
}

export async function bindWeread(
  db: FamilyDb,
  masterKey: string,
  familyId: string,
  apiKey: string,
  probe: KeyProbe,
): Promise<BindResult> {
  const trimmed = apiKey.trim()
  if (!/^wrk-[\w-]{8,}$/.test(trimmed)) {
    throw new ValidationError('API Key 格式不正确，应以 wrk- 开头')
  }
  await assertFamilyExists(db, familyId)
  const status = await probe(trimmed)
  const ciphertext = await encryptSecret(trimmed, masterKey)
  await db.wereadBinding.upsert({
    where: { familyId },
    create: { familyId, ciphertext, maskedTail: maskKey(trimmed), status },
    update: { ciphertext, maskedTail: maskKey(trimmed), status },
  })
  return { maskedTail: maskKey(trimmed), status }
}

/** 解密家庭绑定的 key（仅网关适配层场景使用；不存在返回 null） */
export async function getBoundKey(
  db: FamilyDb,
  masterKey: string,
  familyId: string,
): Promise<string | null> {
  const binding = await db.wereadBinding.findUnique({ where: { familyId } })
  if (!binding) return null
  return decryptSecret(binding.ciphertext, masterKey)
}

export interface FamilyView {
  familyId: string
  createdAt: Date
  binding: { maskedTail: string; status: string } | null
  children: Array<{
    id: string
    nickname: string
    stage: string
    avatar: string | null
  }>
}

export async function getFamilyView(
  db: FamilyDb,
  familyId: string,
): Promise<FamilyView> {
  const family = await assertFamilyExists(db, familyId)
  const [binding, children] = await Promise.all([
    db.wereadBinding.findUnique({ where: { familyId } }),
    db.childProfile.findMany({
      where: { familyId },
      select: { id: true, nickname: true, stage: true, avatar: true },
      orderBy: { createdAt: 'asc' },
    }),
  ])
  return {
    familyId: family.id,
    createdAt: family.createdAt,
    binding: binding
      ? { maskedTail: binding.maskedTail, status: binding.status }
      : null,
    children,
  }
}

const CHILD_STAGES = new Set(['3-5', '6-8', '9-12'])

export async function createChild(
  db: FamilyDb,
  familyId: string,
  input: { nickname: string; stage: string; avatar?: string },
): Promise<{ id: string }> {
  await assertFamilyExists(db, familyId)
  const nickname = input.nickname.trim()
  if (nickname.length < 1 || nickname.length > 20) {
    throw new ValidationError('昵称需要 1-20 个字符')
  }
  if (!CHILD_STAGES.has(input.stage)) {
    throw new ValidationError('阶段必须是 3-5 / 6-8 / 9-12 之一')
  }
  const child = await db.childProfile.create({
    data: {
      familyId,
      nickname,
      stage: input.stage,
      avatar: input.avatar,
    },
    select: { id: true },
  })
  return child
}

async function assertOwnedChild(db: FamilyDb, familyId: string, childId: string) {
  const child = await db.childProfile.findUnique({ where: { id: childId } })
  if (!child || child.familyId !== familyId) {
    // 不存在与越权统一返回 404，避免向调用方泄露他人资源的存在性
    throw new NotFoundError('没有找到这个孩子档案')
  }
  return child
}

export async function updateChild(
  db: FamilyDb,
  familyId: string,
  childId: string,
  input: { nickname?: string; stage?: string; avatar?: string | null },
): Promise<void> {
  await assertOwnedChild(db, familyId, childId)
  const data: Record<string, string | null> = {}
  if (input.nickname !== undefined) {
    const nickname = input.nickname.trim()
    if (nickname.length < 1 || nickname.length > 20) {
      throw new ValidationError('昵称需要 1-20 个字符')
    }
    data.nickname = nickname
  }
  if (input.stage !== undefined) {
    if (!CHILD_STAGES.has(input.stage)) {
      throw new ValidationError('阶段必须是 3-5 / 6-8 / 9-12 之一')
    }
    data.stage = input.stage
  }
  if (input.avatar !== undefined) data.avatar = input.avatar
  await db.childProfile.update({ where: { id: childId }, data })
}

export async function deleteChild(
  db: FamilyDb,
  familyId: string,
  childId: string,
): Promise<void> {
  await assertOwnedChild(db, familyId, childId)
  await db.childProfile.delete({ where: { id: childId } })
}

/** 家庭设置（第 9 夜）：null=回落服务端默认（TAO_BEDTIME / 300s） */
export interface FamilySettings {
  bedtimeMin: number | null
  overtimeCapSec: number | null
  /** 安静模式（docs/15 P1-C）：null/false=跟随系统 reduced-motion */
  calmMode: boolean | null
}

const BEDTIME_RANGE = { min: 0, max: 1439 } as const
const CAP_RANGE = { min: 60, max: 3600 } as const

export async function getSettings(db: FamilyDb, familyId: string): Promise<FamilySettings> {
  const family = await assertFamilyExists(db, familyId)
  return {
    bedtimeMin: family.bedtimeMin,
    overtimeCapSec: family.overtimeCapSec,
    calmMode: family.calmMode,
  }
}

export async function updateSettings(
  db: FamilyDb,
  familyId: string,
  input: Partial<FamilySettings>,
): Promise<FamilySettings> {
  await assertFamilyExists(db, familyId)
  const data: {
    bedtimeMin?: number | null
    overtimeCapSec?: number | null
    calmMode?: boolean | null
  } = {}
  if (input.bedtimeMin !== undefined) {
    if (input.bedtimeMin !== null && (input.bedtimeMin < BEDTIME_RANGE.min || input.bedtimeMin > BEDTIME_RANGE.max)) {
      throw new ValidationError('睡前时刻需要在 0-1439 分钟之间')
    }
    data.bedtimeMin = input.bedtimeMin
  }
  if (input.overtimeCapSec !== undefined) {
    if (input.overtimeCapSec !== null && (input.overtimeCapSec < CAP_RANGE.min || input.overtimeCapSec > CAP_RANGE.max)) {
      throw new ValidationError('单次共读时长需要在 1-60 分钟之间')
    }
    data.overtimeCapSec = input.overtimeCapSec
  }
  if (input.calmMode !== undefined) {
    data.calmMode = input.calmMode
  }
  await db.family.update({ where: { id: familyId }, data })
  return getSettings(db, familyId)
}

/** 注销家庭（第 9 夜）：物理删除全部数据（外键级联覆盖 9 张家庭域表），不可恢复。
 * onFamilyDeleted（N9-205）：注销后逐出进程内该家庭的缓存/服务实例（含解密 key），由 app 层注入。 */
export async function deleteFamilyCompletely(
  db: FamilyDb,
  familyId: string,
  onFamilyDeleted?: (familyId: string) => void,
): Promise<void> {
  await assertFamilyExists(db, familyId)
  await db.family.delete({ where: { id: familyId } })
  onFamilyDeleted?.(familyId)
}

async function assertFamilyExists(db: FamilyDb, familyId: string) {
  const family = await db.family.findUnique({ where: { id: familyId } })
  if (!family) throw new ForbiddenError('家庭不存在或无权访问')
  return family
}
