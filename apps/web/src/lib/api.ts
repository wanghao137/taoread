import type { DeviceRole } from './roles'
import { useSession } from '../stores/session'

/** API 基址：开发走 Vite 代理（/api → :8787），构建期可用 VITE_API_BASE 覆盖 */
export const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string | null
}

interface ErrorBody {
  code?: unknown
  message?: unknown
}

/** 统一请求出口：JSON 往返、错误归一为 ApiError（服务端中文 message 直通 UI）。
 * 401 单点处理（design-system §9）：清会话并回登录页——会话失效绝不留死锁。 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  if (options.token) headers['Authorization'] = `Bearer ${options.token}`

  let response: Response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'NETWORK', '网络好像睡着了，请检查连接后再试')
  }

  if (response.status === 204) return undefined as T

  let data: unknown
  try {
    data = await response.json()
  } catch {
    // 无论成败，body 不合法都单点归一为 BAD_RESPONSE（下游绝不负责任何解析）
    throw new ApiError(response.status, 'BAD_RESPONSE', '服务器开小差了，请稍后再试')
  }

  if (!response.ok) {
    const body = data as ErrorBody
    if (response.status === 401) {
      useSession.getState().signOut()
      if (typeof location !== 'undefined' && !location.pathname.startsWith('/login')) {
        location.assign('/login')
      }
      throw new ApiError(401, 'UNAUTHORIZED', '登录状态过期啦，请用家庭码重新加入')
    }
    throw new ApiError(
      response.status,
      typeof body.code === 'string' ? body.code : 'UNKNOWN',
      typeof body.message === 'string' ? body.message : '请求没有成功，请稍后再试',
    )
  }
  return data as T
}

// ── 领域接口（与后端回包对齐；仅声明 UI 消费的字段）──

export interface FamilySessionDto {
  familyId: string
  familyCode: string
  token: string
}

export interface ChildDto {
  id: string
  nickname: string
  stage: string
  avatar: string | null
}

export interface FamilyViewDto {
  familyId: string
  createdAt: string
  binding: { maskedTail: string; status: string } | null
  children: ChildDto[]
}

export interface ShelfItemDto {
  bookId: string
  title: string
  author?: string
  cover?: string
  category?: string
  blocked?: boolean
  kind?: string
  /** Unix 秒（微信读书回包原值）；继续读排序依据 */
  readUpdateTime?: number
  /** 网关回包原值，只透传不拼接 */
  deepLink?: string
}

export interface ShelfDto {
  total: number
  books?: ShelfItemDto[]
  albums?: ShelfItemDto[]
  mp?: unknown
  childrenView?: ShelfItemDto[]
  /** 仅全量视图返回："kind:bookId" 串集合（家长书架屏蔽状态来源） */
  blockedBookIds?: string[]
}

export const api = {
  createFamily: (deviceId: string) =>
    request<FamilySessionDto>('/api/family', { method: 'POST', body: { deviceId } }),

  joinFamily: (familyCode: string, role: DeviceRole, deviceId: string) =>
    request<FamilySessionDto>('/api/family/join', {
      method: 'POST',
      body: { familyCode, role, deviceId },
    }),

  familyView: (familyId: string, token: string) =>
    request<FamilyViewDto>(`/api/family/${familyId}`, { token }),

  shelf: async (familyId: string, token: string, view?: 'child') => {
    const dto = await request<ShelfDto>(
      `/api/shelf?familyId=${encodeURIComponent(familyId)}${view ? `&view=${view}` : ''}`,
      { token },
    )
    // 服务端孩子视图把过滤结果放在 books 字段（与全量视图同名）；归一化为 childrenView 供孩子端统一消费
    if (view === 'child') return { ...dto, childrenView: dto.books ?? [] }
    return dto
  },

  /** 个性化推荐（服务端已做童书白名单 + 家长屏蔽过滤） */
  recommend: (token: string, count = 6) =>
    request<RecommendDto>(`/api/book/recommend?count=${count}`, { token }),

  /** 书籍详情（服务端直通微信读书 /book/info，字段以 skill 文档为准） */
  bookInfo: (bookId: string, token: string) =>
    request<BookInfoDto>(`/api/book/${encodeURIComponent(bookId)}/info`, { token }),

  /** 开启共读（服务端幂等：已有未收尾会话时返回同一场，reused=true） */
  startCosession: (childId: string, bookId: string, token: string) =>
    request<CosessionDto>('/api/cosession', {
      method: 'POST',
      body: { childId, bookId },
      token,
    }),

  /** 当前未收尾会话（断线续传）；无则 session 为 null */
  activeCosession: (childId: string, token: string) =>
    request<{ session: CosessionDto | null }>(
      `/api/cosession/active?childId=${encodeURIComponent(childId)}`,
      { token },
    ),

  /** 全书热门划线 Top20（含原文与「N 人划过」人数） */
  bestBookmarks: (bookId: string, token: string) =>
    request<BestBookmarksDto>(`/api/book/${encodeURIComponent(bookId)}/bestbookmarks`, { token }),

  /** 收尾：进度三档 + 心情（幂等，重复收尾返回首次结果） */
  finishCosession: (
    id: string,
    body: { progressMark?: string; mood?: string },
    token: string,
  ) =>
    request<FinishResultDto>(`/api/cosession/${encodeURIComponent(id)}/finish`, {
      method: 'POST',
      body,
      token,
    }),

  /** 金句两来源：weread=热门划线点选（带 markCount），voice=孩子口述 */
  addHighlight: (
    id: string,
    body: { source: 'weread' | 'voice' | 'manual'; text: string; markCount?: number },
    token: string,
  ) =>
    request<HighlightDto>(`/api/cosession/${encodeURIComponent(id)}/highlights`, {
      method: 'POST',
      body,
      token,
    }),

  /** 绑定微信读书（仅家长）：探针校验 + 密文落库 */
  bindWeread: (familyId: string, token: string, apiKey: string) =>
    request<{ maskedTail: string; status: string }>(
      `/api/family/${encodeURIComponent(familyId)}/bind-weread`,
      { method: 'POST', body: { apiKey }, token },
    ),

  /** 仪式时段窗口（服务端权威）：bedtime=月亮睡了；overtime=温和引导收尾 */
  ritualWindow: (childId: string, token: string) =>
    request<RitualWindowDto>(`/api/ritual/window?childId=${encodeURIComponent(childId)}`, {
      token,
    }),

  /** 成就墙数据（纪念式只读） */
  achievements: (childId: string, token: string) =>
    request<AchievementsDto>(`/api/achievements?childId=${encodeURIComponent(childId)}`, {
      token,
    }),

  /** 家庭设置读取/更新（仅家长；null=回落服务端默认） */
  getSettings: (familyId: string, token: string) =>
    request<FamilySettingsDto>(`/api/family/${encodeURIComponent(familyId)}/settings`, { token }),
  updateSettings: (familyId: string, token: string, body: Partial<FamilySettingsDto>) =>
    request<FamilySettingsDto>(`/api/family/${encodeURIComponent(familyId)}/settings`, {
      method: 'PATCH',
      body,
      token,
    }),

  /** 注销家庭（仅家长）：物理删除全部数据，不可恢复 */
  deleteFamily: (familyId: string, token: string) =>
    request<void>(`/api/family/${encodeURIComponent(familyId)}`, { method: 'DELETE', token }),

  /** 家长单书/专辑屏蔽（书架管理） */
  setBlocked: (familyId: string, bookId: string, token: string, body: { kind: string; blocked: boolean; title?: string }) =>
    request<{ ok: boolean }>(
      `/api/family/${encodeURIComponent(familyId)}/shelf/${encodeURIComponent(bookId)}/blocked`,
      { method: 'PUT', body, token },
    ),

  /** 添加小读者档案（设置页） */
  addChild: (familyId: string, token: string, nickname: string, stage: string) =>
    request<{ id: string }>(`/api/family/${encodeURIComponent(familyId)}/children`, {
      method: 'POST',
      body: { nickname, stage },
      token,
    }),

  /** 移除小读者档案（级联清理其共读记录） */
  deleteChildDoc: (familyId: string, token: string, childId: string) =>
    request<void>(`/api/children/${encodeURIComponent(childId)}`, { method: 'DELETE', token }),

  /** 今晚共读卡（按活跃/最近会话生成，讲什么/问什么/聊什么） */
  readingCard: (sessionId: string, token: string) =>
    request<ReadingCardDto>(`/api/cosession/${encodeURIComponent(sessionId)}/reading-card`, {
      method: 'POST',
      token,
    }),

  /** 周报（任意历史周可重生成；start 缺省=本周） */
  weeklyReport: (familyId: string, token: string, start?: string) =>
    request<{ report: WeeklyReportDataDto }>(
      `/api/reports/weekly?familyId=${encodeURIComponent(familyId)}${start ? `&start=${start}` : ''}`,
      { token },
    ),

  /** 分享卡 SVG 文本（服务端渲染，系统字体） */
  shareCardSvg: async (familyId: string, token: string, start?: string): Promise<string> => {
    const headers: Record<string, string> = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(
      `${API_BASE}/api/reports/weekly/share-card?familyId=${encodeURIComponent(familyId)}${start ? `&start=${start}` : ''}`,
      { headers },
    )
    if (!res.ok) throw new ApiError(res.status, 'BAD_RESPONSE', '分享卡生成失败，请稍后再试')
    return res.text()
  },
}

export interface WeeklyReportDataDto {
  weekStart: string
  nights: number
  totalMinutes: number
  books: Array<{ key: string; title: string }>
  highlights: Array<{ text: string; source: string }>
  highlightsTotal: number
  achievementsUnlocked: number
  nextWeekHint: string
}

export interface FamilySettingsDto {
  bedtimeMin: number | null
  overtimeCapSec: number | null
}

export interface ReadingCardDto {
  promptId: string
  card: {
    bookTitle: string
    stage?: string
    tellPoints: string[]
    questions: string[]
    hook: string
    genType?: string
  }
}

export interface RitualWindowDto {
  mode: 'open' | 'bedtime' | 'overtime'
  hasActive: boolean
}

export interface AchievementItemDto {
  kind: string
  value: number
  unlockedAt: string
}

export interface AchievementsDto {
  nightLamps: AchievementItemDto[]
  streakBest: AchievementItemDto[]
  booksDone: AchievementItemDto[]
}

export interface BestBookmarksDto {
  totalCount?: number
  items?: Array<{ markText?: string; totalCount?: number; chapterUid?: number }>
}

export interface UnlockDto {
  kind: string
  value: number
}

export interface FinishResultDto {
  id: string
  alreadyFinished: boolean
  durationSec: number | null
  unlocked: UnlockDto[]
}

export interface HighlightDto {
  /** 服务端 addHighlight 回包仅含 id（与 server select 对齐） */
  id: string
}

export interface RecommendDto {
  books: ShelfItemDto[]
  rawCount: number
}

export interface BookInfoDto {
  bookId: string
  title: string
  author?: string
  cover?: string
  intro?: string
  deepLink?: string
}

export interface CosessionDto {
  id: string
  startedAt: string
  bookId: string | null
  paperTitle: string | null
  reused?: boolean
}
