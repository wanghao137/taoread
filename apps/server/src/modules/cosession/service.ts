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
import { generateReadingCard, type ReadingCard } from './readingCard'
import { nightKeyOf } from './nights'
import { asRecord, asString } from '../weread/shelf'
import type { WereadServiceRegistry } from '../../services/weread/registry'
import { isContentBookId, toContentId } from '../../content/service'

export interface CosessionDb {
  cosession: PrismaClient['cosession']
  highlightStar: PrismaClient['highlightStar']
  achievement: PrismaClient['achievement']
  childProfile: PrismaClient['childProfile']
  parentPrompt: PrismaClient['parentPrompt']
  eventLog: PrismaClient['eventLog']
  book: PrismaClient['book']
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
  // 事件日志失败不影响主流程（观测数据，非账本）；但要有最低限度的可发现性
  try {
    await db.eventLog.create({
      data: { familyId, role, event, props: JSON.stringify(props) },
    })
  } catch (err) {
    console.warn(`[event-log] 写入失败 event=${event}：`, err instanceof Error ? err.message : err)
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
  // 书源互斥（N4-005）：微信读书书与纸质书二选一，避免共读卡书名优先级歧义
  if (bookId && paperTitle) {
    throw new ValidationError('微信读书的书和纸质书二选一就好啦')
  }
  const child = await assertOwnedChild(db, familyId, input.childId)

  // 幂等守卫（第 6 夜）：该孩子已有未收尾会话时直接复用，绝不开出第二场。
  // 三道防线：① 先查复用（快路径）；② SQLite 部分唯一索引（并发原子闸，见迁移
  // 20260907003000）；③ create 捕获 P2002 后重读复用——与成就解锁（N4-002）同款模式。
  const active = await db.cosession.findFirst({
    where: { familyId, childId: child.id, endedAt: null },
    orderBy: { startedAt: 'desc' },
  })
  if (active) {
    return {
      id: active.id,
      startedAt: active.startedAt,
      bookId: active.bookId,
      paperTitle: active.paperTitle,
      reused: true,
    }
  }

  try {
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
    return { ...session, reused: false }
  } catch (err) {
    // 并发竞态：另一请求先建了会话触发唯一索引 → 重读复用，绝不向孩子暴露错误
    const code = typeof err === 'object' && err !== null && 'code' in err ? (err as { code?: string }).code : undefined
    if (code === 'P2002') {
      const raced = await db.cosession.findFirst({
        where: { familyId, childId: child.id, endedAt: null },
        orderBy: { startedAt: 'desc' },
      })
      if (raced) {
        return {
          id: raced.id,
          startedAt: raced.startedAt,
          bookId: raced.bookId,
          paperTitle: raced.paperTitle,
          reused: true,
        }
      }
    }
    throw err
  }
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

  // 幂等收尾（断线续传/重复点击）：已收尾 → 补偿评估成就（N4-002：若首次收尾后、成就落库前
  // 发生异常，重试时在此补齐缺页；planUnlocks 幂等 + P2002 兜底，正常重试重放无新增）
  if (session.endedAt !== null) {
    const unlocked = await evaluateAchievements(db, familyId, session.childId, session.id, {
      endedAtSec: Math.floor(session.endedAt.getTime() / 1000),
      bookId: session.bookId,
      progressMark: session.progressMark,
    })
    return {
      id: session.id,
      alreadyFinished: true,
      durationSec: session.durationSec,
      progressMark: session.progressMark,
      mood: session.mood,
      unlocked,
    }
  }

  const endedAtSec = nowSec()
  // 时长上限保护：会话开了忘记收尾（隔夜/换设备）时，按真实时差会记出「24 小时阅读」
  // 污染周报。睡前共读单次不会超过 2 小时，超出部分视为会话搁置，不计入时长。
  const DURATION_CAP_SEC = 2 * 60 * 60
  const durationSec = Math.min(
    DURATION_CAP_SEC,
    Math.max(0, endedAtSec - Math.floor(session.startedAt.getTime() / 1000)),
  )
  // 原子收尾（N4-001）：where 带 endedAt: null，并发双收尾只有先到者生效，后到者 count=0 重读走幂等分支
  const updated = await db.cosession.updateMany({
    where: { id: session.id, endedAt: null },
    data: {
      endedAt: new Date(endedAtSec * 1000),
      durationSec,
      progressMark: input.progressMark ?? null,
      mood: input.mood ?? null,
    },
  })
  if (updated.count === 0) {
    // 并发窗口内已被另一请求收尾：按已收尾语义返回（progressMark/mood 保留先到者的值）
    const fresh = await db.cosession.findUnique({ where: { id: session.id } })
    const unlocked = await evaluateAchievements(db, familyId, session.childId, session.id, {
      endedAtSec: Math.floor((fresh?.endedAt ?? session.startedAt).getTime() / 1000),
      bookId: session.bookId,
      progressMark: fresh?.progressMark ?? null,
    })
    return {
      id: session.id,
      alreadyFinished: true,
      durationSec: fresh?.durationSec ?? null,
      progressMark: fresh?.progressMark ?? null,
      mood: fresh?.mood ?? null,
      unlocked,
    }
  }

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
  try {
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
  } catch (err) {
    // N7-002 去重（第 9 夜）：同会话同来源同文本唯一索引命中 → 返回已有行（幂等，前端可重试）
    const code = typeof err === 'object' && err !== null && 'code' in err ? (err as { code?: string }).code : undefined
    if (code === 'P2002') {
      const existing = await db.highlightStar.findFirst({
        where: { cosessionId: session.id, source: input.source, text },
        select: { id: true },
      })
      if (existing) return existing
    }
    throw err
  }
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
  nowSec: () => number = () => Math.floor(Date.now() / 1000),
): Promise<ReadingCardResult> {
  const session = await assertOwnedSession(db, familyId, sessionId)
  const child = await db.childProfile.findUnique({ where: { id: session.childId } })
  if (!child) throw new NotFoundError('没有找到这个孩子档案')

  let title = session.paperTitle ?? ''
  let intro: string | null = null
  let topBookmarks: string[] = []
  if (isContentBookId(session.bookId)) {
    // v2 内容域书籍：书名/简介来自本地公版库，绝不出网（docs/07 §3）
    const contentBook = await db.book.findUnique({
      where: { id: toContentId(session.bookId) },
      select: { title: true, intro: true },
    })
    if (contentBook) {
      title = contentBook.title
      intro = contentBook.intro
    } else {
      title = session.bookId
    }
  } else if (session.bookId) {
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
  // N4-007（第 9 夜）：共读卡按（家庭, 书, 阶段, 夜键）唯一化——同一晚重复调用返回同一张卡，
  // 消费方不再读到重复行；卡内容确定性生成，命中旧行时直接回放存储的 JSON。
  const bookKey = session.bookId ?? title
  const nightKey = nightKeyOf(nowSec())
  const existingPrompt = await db.parentPrompt.findFirst({
    where: { familyId, bookId: bookKey, stage: child.stage, nightKey },
    select: { id: true, tellPoints: true, questions: true, hook: true },
  })
  if (existingPrompt) {
    try {
      const card: ReadingCard = {
        bookTitle: title,
        stage: child.stage,
        tellPoints: JSON.parse(existingPrompt.tellPoints) as string[],
        questions: JSON.parse(existingPrompt.questions) as string[],
        hook: existingPrompt.hook ?? '',
        genType: 'template',
      }
      return { card, promptId: existingPrompt.id }
    } catch {
      // 存储行损坏（不应发生）：走重建路径
    }
  }
  try {
    const prompt = await db.parentPrompt.create({
      data: {
        familyId,
        bookId: bookKey,
        stage: child.stage,
        tellPoints: JSON.stringify(card.tellPoints),
        questions: JSON.stringify(card.questions),
        hook: card.hook,
        genType: 'template',
        nightKey,
      },
      select: { id: true },
    })
    return { card, promptId: prompt.id }
  } catch (err) {
    const code = typeof err === 'object' && err !== null && 'code' in err ? (err as { code?: string }).code : undefined
    if (code === 'P2002') {
      const raced = await db.parentPrompt.findFirst({
        where: { familyId, bookId: bookKey, stage: child.stage, nightKey },
        select: { id: true, tellPoints: true, questions: true, hook: true },
      })
      if (raced) {
        const racedCard: ReadingCard = {
          bookTitle: title,
          stage: child.stage,
          tellPoints: JSON.parse(raced.tellPoints) as string[],
          questions: JSON.parse(raced.questions) as string[],
          hook: raced.hook ?? '',
          genType: 'template',
        }
        return { card: racedCard, promptId: raced.id }
      }
    }
    throw err
  }
}
