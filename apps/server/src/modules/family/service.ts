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
  AppError,
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

/** 每家庭活跃设备会话软上限：防家庭码被批量转手刷出无限设备（软上限=家长可撤销腾位）。
 *  TAO_DEVICE_SESSION_CAP 供 e2e 调高——测试每个用例都是新浏览器上下文=新设备，
 *  一轮全套用例会创建 20+ 会话，生产默认 20 不变。 */
const MAX_ACTIVE_DEVICE_SESSIONS = (() => {
  const parsed = Number(process.env.TAO_DEVICE_SESSION_CAP)
  return Number.isInteger(parsed) && parsed >= 1 ? parsed : 20
})()

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
  let activeSessions = await db.deviceSession.count({
    where: { familyId: family.id, revokedAt: null },
  })
  if (activeSessions >= MAX_ACTIVE_DEVICE_SESSIONS) {
    // 满员先自动腾位再放行：优先撤销最旧的「孩子」会话（家长设备承担管理入口，
    // 尽量不动；孩子设备重新输入家庭码即可回来），不足时才轮到家长。固定家庭码
    // 形态下若只 429，「移除设备」的撤销入口在登录后的设备列表里——所有设备都
    // 被挡在登录外时就是死锁（2026-09-27 生产实测锁死）。会话无过期时间，积压必然发生。
    const need = activeSessions - MAX_ACTIVE_DEVICE_SESSIONS + 1
    const alive = { familyId: family.id, revokedAt: null }
    let stale = await db.deviceSession.findMany({
      where: { ...alive, role: 'child' },
      orderBy: { createdAt: 'asc' },
      take: need,
      select: { id: true },
    })
    if (stale.length < need) {
      const extra = await db.deviceSession.findMany({
        where: { ...alive, id: { notIn: stale.map((s) => s.id) } },
        orderBy: { createdAt: 'asc' },
        take: need - stale.length,
        select: { id: true },
      })
      stale = [...stale, ...extra]
    }
    if (stale.length > 0) {
      await db.deviceSession.updateMany({
        where: { id: { in: stale.map((s) => s.id) } },
        data: { revokedAt: new Date() },
      })
    }
    activeSessions = await db.deviceSession.count({
      where: { familyId: family.id, revokedAt: null },
    })
    if (activeSessions >= MAX_ACTIVE_DEVICE_SESSIONS) {
      throw new AppError('这个家庭的设备达到上限了，请家长先移除不用的设备再登录', 'DEVICE_SESSION_LIMIT', 429)
    }
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

/** 家庭设置：null=回落服务端默认。
 * 就寝时刻/软封顶已随阅读时间限制取消（2026-09-25）停用——DB 列保留不动，
 * 读写路径不再暴露，防旧客户端继续依赖已失效的配置项。
 * dailyReadingLimitMin（docs/34 P1-2）：家长可选的每日阅读时长提醒上限（分钟），
 * null=不限；语义是「温柔收尾」不是强制锁定（服务端不阻断任何请求）。 */
export interface FamilySettings {
  /** 安静模式（docs/15 P1-C）：null/false=跟随系统 reduced-motion */
  calmMode: boolean | null
  /** 每日阅读时长提醒上限（分钟）；null=不限 */
  dailyReadingLimitMin: number | null
}

export async function getSettings(db: FamilyDb, familyId: string): Promise<FamilySettings> {
  const family = await assertFamilyExists(db, familyId)
  return {
    calmMode: family.calmMode,
    dailyReadingLimitMin: family.dailyReadingLimitMin,
  }
}

export async function updateSettings(
  db: FamilyDb,
  familyId: string,
  input: Partial<FamilySettings>,
): Promise<FamilySettings> {
  await assertFamilyExists(db, familyId)
  const data: {
    calmMode?: boolean | null
    dailyReadingLimitMin?: number | null
  } = {}
  if (input.calmMode !== undefined) {
    data.calmMode = input.calmMode
  }
  if (input.dailyReadingLimitMin !== undefined) {
    // 0 视为「不限」——设置页数字输入允许清零表达关闭，落库统一 null
    data.dailyReadingLimitMin =
      input.dailyReadingLimitMin === 0 ? null : input.dailyReadingLimitMin
  }
  await db.family.update({ where: { id: familyId }, data })
  return getSettings(db, familyId)
}

/** 解绑微信读书（docs/34 P0-9）：删除绑定行，key 密文随之销毁；
 * 进程内的服务实例/同步指纹由 app 层 onWereadUnbound 回调逐出。 */
export async function unbindWeread(db: FamilyDb, familyId: string): Promise<void> {
  await assertFamilyExists(db, familyId)
  const binding = await db.wereadBinding.findUnique({ where: { familyId } })
  if (!binding) {
    throw new NotFoundError('还没有绑定微信读书')
  }
  await db.wereadBinding.delete({ where: { familyId } })
}

/** 家庭数据导出（docs/34 P2-9）：孩子阅读足迹的「数据可携带」。
 * 只含阅读行为数据，绝不含令牌/密文/家庭码（导出文件本身会离开设备）。
 * 昵称映射在导出内完成，孩子档案删除后旧记录仍可读。 */
export async function exportFamilyData(db: PrismaClient, familyId: string) {
  await assertFamilyExists(db, familyId)
  const children = await db.childProfile.findMany({
    where: { familyId },
    select: { id: true, nickname: true, stage: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
  const childIds = children.map((c) => c.id)
  const [cosessions, highlights, achievements, wordCards, readingProgress, favorites, bookHighlights, importedBooks] =
    await Promise.all([
      db.cosession.findMany({
        where: { familyId },
        select: { childId: true, bookId: true, paperTitle: true, startedAt: true, durationSec: true, progressMark: true, mood: true },
        orderBy: { startedAt: 'asc' },
      }),
      db.highlightStar.findMany({
        where: { familyId },
        select: { childId: true, source: true, text: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
      db.achievement.findMany({
        where: { familyId },
        select: { childId: true, kind: true, value: true, unlockedAt: true },
        orderBy: { unlockedAt: 'asc' },
      }),
      childIds.length > 0
        ? db.wordCard.findMany({
            where: { childId: { in: childIds } },
            select: { childId: true, word: true, lang: true, context: true, createdAt: true },
            orderBy: { createdAt: 'asc' },
          })
        : Promise.resolve([]),
      childIds.length > 0
        ? db.readingProgress.findMany({
            where: { childId: { in: childIds } },
            select: { childId: true, bookId: true, chapterOrder: true, finished: true, updatedAt: true },
            orderBy: { updatedAt: 'asc' },
          })
        : Promise.resolve([]),
      childIds.length > 0
        ? db.bookFavorite.findMany({
            where: { childId: { in: childIds } },
            select: { childId: true, bookId: true, createdAt: true },
            orderBy: { createdAt: 'asc' },
          })
        : Promise.resolve([]),
      childIds.length > 0
        ? db.bookHighlight.findMany({
            where: { childId: { in: childIds } },
            select: { childId: true, bookId: true, chapterOrder: true, text: true, createdAt: true },
            orderBy: { createdAt: 'asc' },
          })
        : Promise.resolve([]),
      db.importedBook.findMany({
        where: { familyId },
        select: { title: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
    ])
  const childName = new Map(children.map((c) => [c.id, c.nickname]))
  return {
    exportedAt: new Date().toISOString(),
    app: 'taoread' as const,
    schemaVersion: 1 as const,
    children: children.map((c) => ({ nickname: c.nickname, stage: c.stage, createdAt: c.createdAt })),
    reading: {
      cosessions: cosessions.map((s) => ({
        child: childName.get(s.childId) ?? '',
        bookId: s.bookId,
        paperTitle: s.paperTitle,
        startedAt: s.startedAt,
        durationSec: s.durationSec,
        progressMark: s.progressMark,
        mood: s.mood,
      })),
      bookProgress: readingProgress.map((p) => ({
        child: childName.get(p.childId) ?? '',
        bookId: p.bookId,
        chapterOrder: p.chapterOrder,
        finished: p.finished,
        updatedAt: p.updatedAt,
      })),
      importedBooks: importedBooks.map((b) => ({ title: b.title, createdAt: b.createdAt })),
      favorites: favorites.map((f) => ({ child: childName.get(f.childId) ?? '', bookId: f.bookId })),
    },
    keepsakes: {
      highlights: highlights.map((h) => ({ child: childName.get(h.childId) ?? '', text: h.text, source: h.source, createdAt: h.createdAt })),
      bookHighlights: bookHighlights.map((h) => ({ child: childName.get(h.childId) ?? '', bookId: h.bookId, chapterOrder: h.chapterOrder, text: h.text })),
      words: wordCards.map((w) => ({ child: childName.get(w.childId) ?? '', word: w.word, lang: w.lang, context: w.context })),
      achievements: achievements.map((a) => ({ child: childName.get(a.childId) ?? '', kind: a.kind, value: a.value, unlockedAt: a.unlockedAt })),
    },
  }
}

/** 注销家庭（第 9 夜）：物理删除全部数据（外键级联覆盖 9 张家庭域表），不可恢复。
 * confirmCode 必须等于家庭码——注销不可恢复，要求持有凭据本体确认，防误触。
 * onFamilyDeleted（N9-205）：注销后逐出进程内该家庭的缓存/服务实例（含解密 key），由 app 层注入。 */
export async function deleteFamilyCompletely(
  db: FamilyDb,
  familyId: string,
  confirmCode: string,
  onFamilyDeleted?: (familyId: string) => void,
): Promise<void> {
  const family = await assertFamilyExists(db, familyId)
  if (confirmCode !== family.code) {
    throw new ValidationError('请输入家庭码确认注销')
  }
  await db.family.delete({ where: { id: familyId } })
  onFamilyDeleted?.(familyId)
}

async function assertFamilyExists(db: FamilyDb, familyId: string) {
  const family = await db.family.findUnique({ where: { id: familyId } })
  if (!family) throw new ForbiddenError('家庭不存在或无权访问')
  return family
}
