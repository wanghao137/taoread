/**
 * 共读域服务：会话开/收尾（幂等）、金句两来源录入、成就解锁、模板共读卡。
 * 一致性约定：时间一律 Unix 秒出入、DB 层 DateTime；成就防重复解锁的最后防线是
 * 数据库唯一约束（P2002 捕获跳过）；重复收尾幂等（第二次起只读不写不重评成就）。
 */
import type { PrismaClient } from '@prisma/client'
import {
  NotFoundError,
  NotBoundError,
  RateLimitedError,
  ValidationError,
  WereadApiError,
  WereadHttpError,
} from '../../lib/errors'
import { planUnlocks, type UnlockPlanItem } from './achievements'
import { generateReadingCard } from './readingCard'
import { asRecord, asString } from '../weread/shelf'
import type { WereadServiceRegistry } from '../../services/weread/registry'

export interface CosessionDb {
  cosession: PrismaClient['cosession']
  highlightStar: PrismaClient['highlightStar']
  achievement: PrismaClient['achievement']
  childProfile: PrismaClient['childProfile']
  parentPrompt: PrismaClient['parentPrompt']
  eventLog: PrismaClient['eventLog']
}

const PROGRESS_MARKS = new Set(['little', 'lot', 'done'])
const MOODS = new Set(['happy', 'excited', 'calm', 'sleepy', 'thinking'])
const HIGHLIGHT_SOURCES = new Set(['weread', 'voice', 'manual'])

function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: string }).code === 'P2002'
  )
}

async function assertOwnedChild(db: CosessionDb, familyId: string, childId: string) {
  const child = await db.childProfile.findUnique({ where: { id: childId } })
  // 不存在与越权统一 404，不泄露他人资源存在性（与家庭域同口径）
  if (!child || child.familyId !== familyId) {
    throw new NotFoundError('没有找到这个孩子档案')
  }
  return child
}

async function assertOwnedSession(db: CosessionDb, familyId: string, sessionId: string) {
  const session = await db.cosession.findUnique({ where: { id: sessionId } })
  if (!session || session.familyId !== familyId) {
    throw new NotFoundError('没有找到这次共读')
  }
  return session
}

async function logEvent(
  db: CosessionDb,
  familyId: string,
  role: string,
  event: string,
  props: Record<string, unknown>,
): Promise<void> {
  // 事件日志失败不影响主流程（观测数据，非账本）
  try {
    await db.eventLog.create({
      data: { familyId, role, event, props: JSON.stringify(props) },
    })
  } catch {
    /* 吞掉：见上 */
  }
}

export interface StartSessionInput {
  childId: string
  bookId?: string | null
  paperTitle?: string | null
}

export async function startSession(
  db: CosessionDb,
  familyId: string,
  role: string,
  input: StartSessionInput,
  nowSec: () => number,
) {
  const bookId = input.bookId?.trim() || null
  const paperTitle = input.paperTitle?.trim() || null
  if (!bookId && !paperTitle) {
    throw new ValidationError('请选择一本书，或填一下纸质书的书名')
  }
  const child = await assertOwnedChild(db, familyId, input.childId)
  const session = await db.cosession.create({
    data: {
      familyId,
      childId: child.id,
      bookId,
      paperTitle,
      startedAt: new Date(nowSec() * 1000),
    },
    select: { id: true, startedAt: true, bookId: true, paperTitle: true },
  })
  await logEvent(db, familyId, role, 'ritual_started', {
    childId: child.id,
    source: bookId ? 'weread' : 'paper',
  })
  return session
}

export async function getActiveSession(
  db: CosessionDb,
  familyId: string,
  childId: string,
) {
  await assertOwnedChild(db, familyId, childId)
  const session = await db.cosession.findFirst({
    where: { familyId, childId, endedAt: null },
    orderBy: { startedAt: 'desc' },
  })
  return session
}

export interface FinishResult {
  id: string
  alreadyFinished: boolean
  durationSec: number | null
  progressMark: string | null
  mood: string | null
  unlocked: UnlockPlanItem[]
}

export async function finishSession(
  db: CosessionDb,
  familyId: string,
  role: string,
  sessionId: string,
  input: { progressMark?: string; mood?: string },
  nowSec: () => number,
): Promise<FinishResult> {
  if (input.progressMark !== undefined && !PROGRESS_MARKS.has(input.progressMark)) {
    throw new ValidationError('进度档只能是 little / lot / done')
  }
  if (input.mood !== undefined && !MOODS.has(input.mood)) {
    throw new ValidationError('心情贴纸不认识呀，换一个试试')
  }
  const session = await assertOwnedSession(db, familyId, sessionId)

  // 幂等收尾（断线续传/重复点击）：已收尾 → 只读返回，不再写库、不再评估成就
  if (session.endedAt !== null) {
    return {
      id: session.id,
      alreadyFinished: true,
      durationSec: session.durationSec,
      progressMark: session.progressMark,
      mood: session.mood,
      unlocked: [],
    }
  }

  const endedAtSec = nowSec()
  const durationSec = Math.max(0, endedAtSec - Math.floor(session.startedAt.getTime() / 1000))
  await db.cosession.update({
    where: { id: session.id },
    data: {
      endedAt: new Date(endedAtSec * 1000),
      durationSec,
      progressMark: input.progressMark ?? null,
      mood: input.mood ?? null,
    },
  })

  const unlocked = await evaluateAchievements(db, session.familyId, session.childId, session.id, {
    endedAtSec,
    bookId: session.bookId,
    progressMark: input.progressMark ?? null,
  })
  await logEvent(db, familyId, role, 'cosession_finished', {
    sessionId: session.id,
    progressMark: input.progressMark ?? null,
    unlocked: unlocked.map((u) => `${u.kind}:${u.value}`),
  })

  return {
    id: session.id,
    alreadyFinished: false,
    durationSec,
    progressMark: input.progressMark ?? null,
    mood: input.mood ?? null,
    unlocked,
  }
}

/** 收尾后评估并落库成就（竞态兜底：唯一约束 P2002 跳过） */
async function evaluateAchievements(
  db: CosessionDb,
  familyId: string,
  childId: string,
  currentSessionId: string,
  current: { endedAtSec: number; bookId: string | null; progressMark: string | null },
): Promise<UnlockPlanItem[]> {
  const [pastSessions, existing] = await Promise.all([
    db.cosession.findMany({
      // 排除当前会话：它已先行落库，若混入 past 会把「本次读完」误判为「重读」
      where: { childId, endedAt: { not: null }, id: { not: currentSessionId } },
      select: { endedAt: true, bookId: true, progressMark: true },
    }),
    db.achievement.findMany({
      where: { childId },
      select: { kind: true, value: true },
    }),
  ])
  const plan = planUnlocks({
    past: pastSessions
      .filter((s) => s.endedAt !== null)
      .map((s) => ({
        endedAtSec: Math.floor(s.endedAt!.getTime() / 1000),
        bookId: s.bookId,
        progressMark: s.progressMark,
      })),
    current,
    existing,
  })
  const unlocked: UnlockPlanItem[] = []
  for (const item of plan) {
    try {
      await db.achievement.create({
        data: { familyId, childId, kind: item.kind, value: item.value },
      })
      unlocked.push(item)
    } catch (err) {
      if (!isUniqueViolation(err)) throw err
      // 已解锁过（同晚重复收尾/并发竞态）——唯一约束拦截，静默跳过
    }
  }
  return unlocked
}

export interface HighlightInput {
  source: string
  text: string
  markCount?: number | null
}

export async function addHighlight(
  db: CosessionDb,
  familyId: string,
  role: string,
  sessionId: string,
  input: HighlightInput,
) {
  if (!HIGHLIGHT_SOURCES.has(input.source)) {
    throw new ValidationError('金句来源不正确')
  }
  const text = input.text.trim()
  if (text.length < 1 || text.length > 500) {
    throw new ValidationError('金句长度需要在 1-500 字之间')
  }
  const session = await assertOwnedSession(db, familyId, sessionId)
  const highlight = await db.highlightStar.create({
    data: {
      familyId,
      childId: session.childId,
      cosessionId: session.id,
      source: input.source,
      text,
      markCount: input.source === 'weread' ? (input.markCount ?? null) : null,
    },
    select: { id: true },
  })
  await logEvent(db, familyId, role, 'highlight_added', {
    sessionId: session.id,
    source: input.source,
  })
  return highlight
}

export async function getSessionDetail(db: CosessionDb, familyId: string, sessionId: string) {
  const session = await assertOwnedSession(db, familyId, sessionId)
  const highlights = await db.highlightStar.findMany({
    where: { cosessionId: session.id },
    orderBy: { createdAt: 'asc' },
    select: { id: true, source: true, text: true, markCount: true },
  })
  return { session, highlights }
}

export interface ReadingCardResult {
  card: ReturnType<typeof generateReadingCard>
  promptId: string
}

export async function generateCardForSession(
  db: CosessionDb,
  registry: WereadServiceRegistry,
  familyId: string,
  sessionId: string,
): Promise<ReadingCardResult> {
  const session = await assertOwnedSession(db, familyId, sessionId)
  const child = await db.childProfile.findUnique({ where: { id: session.childId } })
  if (!child) throw new NotFoundError('没有找到这个孩子档案')

  let title = session.paperTitle ?? ''
  let intro: string | null = null
  let topBookmarks: string[] = []
  if (session.bookId) {
    // 书信息与热门划线走 WereadService（缓存 + 家庭隔离 + 限流）；
    // 预期内的失败（未绑定/网关/限流）退化为纯模板——共读卡永不因出网失败而不可用。
    // 非预期错误（编程缺陷）照常上抛，不做静默吞错（N2-002 教训）。
    try {
      const service = await registry.get(familyId)
      const [info, bookmarks] = await Promise.all([
        service.endpoints.bookInfo(session.bookId),
        service.endpoints.bestBookmarks(session.bookId),
      ])
      const infoRec = asRecord(info)
      title = asString(infoRec?.title) ?? session.bookId
      intro = asString(infoRec?.intro)
      const items = Array.isArray(asRecord(bookmarks)?.items)
        ? ((asRecord(bookmarks)?.items as unknown[]) ?? [])
        : []
      topBookmarks = items
        .map((it) => asString(asRecord(it)?.markText))
        .filter((t): t is string => t !== null)
        .slice(0, 5)
    } catch (err) {
      const degradable =
        err instanceof NotBoundError ||
        err instanceof WereadHttpError ||
        err instanceof WereadApiError ||
        err instanceof RateLimitedError
      if (!degradable) throw err
      if (title === '') title = session.bookId
    }
  }
  if (!title) throw new ValidationError('缺少书名，无法生成共读卡')

  const card = generateReadingCard({
    bookTitle: title,
    childStage: child.stage,
    childId: child.id,
    intro,
    topBookmarks,
  })
  const prompt = await db.parentPrompt.create({
    data: {
      familyId,
      bookId: session.bookId ?? title,
      stage: child.stage,
      tellPoints: JSON.stringify(card.tellPoints),
      questions: JSON.stringify(card.questions),
      hook: card.hook,
      genType: 'template',
    },
    select: { id: true },
  })
  return { card, promptId: prompt.id }
}
