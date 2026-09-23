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
  // 显式 token 优先；未传时回退会话令牌——调用方不可能「忘记带 token」
  // （tts/voices 等接口曾漏带，触发 401 → 全局登出把孩子踢回登录页，docs/14）
  const bearer = options.token ?? useSession.getState().token
  if (bearer) headers['Authorization'] = `Bearer ${bearer}`

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
  /** 家长码：仅创建家庭 / 凭家长码加入时返回（T02/F01） */
  parentCode?: string
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

export interface ImportedBookDto { id: string; title: string; author: string | null; lang: 'zh' | 'en'; ageStage: string; chapterCount: number; createdAt: string; format?: string }
export interface PhonicsLessonDto {
  id: string
  order: number
  title: string
  status: 'draft'
  audioAvailable: false
  taught: Array<{ grapheme: string; ipa: string; mouthCue: string }>
  items: Array<{ id: string; kind: 'grapheme' | 'blend' | 'segment'; prompt: string; options: Array<{ id: string; label: string }> }>
  reader: { id: string; title: string; text: string } | null
  note: string | null
}
export interface PhonicsActiveAttemptDto { id: string; lessonId: string; status: string; answered: Array<{ itemId: string; correct: boolean }> }
export interface PhonicsSummaryDto { status: 'draft'; attempts: Array<{ id: string; lessonId: string; status: string; startedAt: string; answered: number; correct: number }> }
export interface DeviceSessionDto { id: string; role: 'parent' | 'child'; deviceId: string | null; createdAt: string; revokedAt: string | null; current: boolean }
export interface ImportedProgressDto { order: number; offset: number; completed: boolean; updatedAt: string }

export const api = {
  importedBooks: (token: string, childId?: string) => request<{ books: ImportedBookDto[] }>(`/api/content/imports${childId ? `?childId=${encodeURIComponent(childId)}` : ''}`, { token }),
  importTextBook: (token: string, body: { title: string; author?: string; lang: 'zh' | 'en'; ageStage: '3-5' | '6-8' | '9-12'; sourceName: string; text?: string; fileBase64?: string; rightsConfirmed: true }) => request<{ id: string; duplicate: boolean; chapterCount: number }>('/api/content/imports', { method: 'POST', token, body }),
  importedBook: (token: string, id: string, childId?: string) => request<{ book: ImportedBookDto & { chapters: Array<{ order: number; title: string }> } }>(`/api/content/imports/${encodeURIComponent(id)}${childId ? `?childId=${encodeURIComponent(childId)}` : ''}`, { token }),
  importedChapter: (token: string, id: string, order: number, childId?: string) => request<{ chapter: { order: number; title: string; text: string } }>(`/api/content/imports/${encodeURIComponent(id)}/chapters/${order}${childId ? `?childId=${encodeURIComponent(childId)}` : ''}`, { token }),
  publicDomainBooks: (token: string) => request<{ books: Array<{ id: string; title: string; author: string }> }>('/api/content/imports/public-domain', { token }),
  importPublicDomain: (token: string, id: string, ageStage: '6-8' | '9-12') => request<{ id: string; chapterCount: number; duplicate: boolean }>(`/api/content/imports/public-domain/${encodeURIComponent(id)}`, { method: 'POST', token, body: { ageStage } }),
  importedProgress: (token: string, id: string, childId: string) => request<{ progress: ImportedProgressDto | null }>(`/api/content/imports/${encodeURIComponent(id)}/progress?childId=${encodeURIComponent(childId)}`, { token }),
  saveImportedProgress: (token: string, id: string, childId: string, body: { order: number; offset: number; completed: boolean }) => request<{ progress: { order: number; offset: number; completed: boolean } }>(`/api/content/imports/${encodeURIComponent(id)}/progress?childId=${encodeURIComponent(childId)}`, { method: 'PUT', token, body }),
  removeImportedBook: (token: string, id: string) => request<void>(`/api/content/imports/${encodeURIComponent(id)}`, { method: 'DELETE', token }),
  phonicsEnrollment: (token: string, childId: string) => request<{ enabled: boolean; status: 'draft' }>(`/api/children/${encodeURIComponent(childId)}/phonics/enrollment`, { token }),
  setPhonicsEnrollment: (token: string, childId: string, enabled: boolean) => request<{ enabled: boolean }>(`/api/children/${encodeURIComponent(childId)}/phonics/enrollment`, { method: 'PUT', token, body: { enabled } }),
  phonicsReaders: (token: string) => request<{ status: 'draft'; readers: Array<{ id: string; title: string; lessonId: string; text: string; note: string }> }>('/api/phonics/readers', { token }),
  phonicsCatalog: (token: string) => request<{ status: 'draft'; lessons: PhonicsLessonDto[] }>('/api/phonics/catalog', { token }),
  /** 续做：某课最近一次未结束的尝试（无则 null），D3 中断恢复 */
  phonicsActiveAttempt: (token: string, childId: string, lessonId: string) =>
    request<{ attempt: PhonicsActiveAttemptDto | null }>(`/api/children/${encodeURIComponent(childId)}/phonics/attempts/active?lessonId=${encodeURIComponent(lessonId)}`, { token }),
  /** 家长查看练习记录（区分练习与评估，非能力评分） */
  phonicsSummary: (token: string, childId: string) =>
    request<PhonicsSummaryDto>(`/api/children/${encodeURIComponent(childId)}/phonics/summary`, { token }),
  startPhonicsAttempt: (token: string, childId: string, lessonId: string, clientAttemptId: string) => request<{ attempt: { id: string; status: string } }>(`/api/children/${encodeURIComponent(childId)}/phonics/attempts`, { method: 'POST', token, body: { lessonId, clientAttemptId } }),
  answerPhonics: (token: string, attemptId: string, itemId: string, answerId: string) => request<{ correct: boolean; repeated: boolean }>(`/api/phonics/attempts/${encodeURIComponent(attemptId)}/responses`, { method: 'POST', token, body: { itemId, answerId } }),
  finishPhonics: (token: string, attemptId: string, status: 'completed' | 'paused') => request<{ id: string; status: string }>(`/api/phonics/attempts/${encodeURIComponent(attemptId)}/finish`, { method: 'POST', token, body: { status } }),

  createFamily: (deviceId: string) =>
    request<FamilySessionDto>('/api/family', { method: 'POST', body: { deviceId } }),

  joinFamily: (familyCode: string, role: DeviceRole, deviceId: string, parentCode?: string) =>
    request<FamilySessionDto>('/api/family/join', {
      method: 'POST',
      body: { familyCode, role, deviceId, ...(role === 'parent' && parentCode ? { parentCode } : {}) },
    }),

  /** 家长码查看（仅家长会话；旧家庭首次访问由服务端懒生成） */
  getParentCode: (familyId: string, token: string) =>
    request<{ parentCode: string }>(`/api/family/${familyId}/parent-code`, { token }),

  /** 家长码轮换（仅家长会话）：旧家长码立即作废 */
  rotateParentCode: (familyId: string, token: string) =>
    request<{ parentCode: string }>(`/api/family/${familyId}/parent-code/rotate`, { method: 'POST', token }),

  /** 设备会话列表（仅家长，A1）：含已撤销，current 标记本机 */
  listSessions: (familyId: string, token: string) =>
    request<{ sessions: DeviceSessionDto[] }>(`/api/family/${familyId}/sessions`, { token }),

  /** 撤销单台设备（仅家长）：被撤销设备令牌即时失效 */
  revokeSession: (familyId: string, sid: string, token: string) =>
    request<{ ok: boolean }>(`/api/family/${familyId}/sessions/${encodeURIComponent(sid)}/revoke`, { method: 'POST', token }),

  /** 保存家庭导入书进度：baseUpdatedAt=本机所基于的服务器版本，409=已在别处更新 */
  saveImportedProgressV2: (token: string, id: string, childId: string, body: { order: number; offset: number; completed: boolean; baseUpdatedAt?: string }) =>
    request<{ progress: ImportedProgressDto }>(`/api/content/imports/${encodeURIComponent(id)}/progress?childId=${encodeURIComponent(childId)}`, { method: 'PUT', token, body }),

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

  /** 搜索选书（孩子端，服务端适龄过滤后返回） */
  search: (keyword: string, token: string, count = 6) =>
    request<{ hits: ShelfItemDto[] }>(
      `/api/search?keyword=${encodeURIComponent(keyword)}&count=${count}`,
      { token },
    ),

  /** 仪式时段窗口（服务端权威）：bedtime=休息时间；overtime=温和引导收尾 */
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

  /** 这次共读卡（按活跃/最近会话生成，讲什么/问什么/聊什么） */
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

  // ── v2 内容域：公版书库 + 自研阅读器正文 ──

  /** 单书概览（cbf: 会话解析书名/封面用；对抗审查修复：不再错走微信书 info 接口） */
  contentBook: async (contentId: string, token: string) => {
    const res = await request<{ book: ContentBookDto }>(
      `/api/content/books/${encodeURIComponent(contentId)}`,
      { token },
    )
    return res.book
  },

  contentBooks: async (
    token: string,
    params: { stage?: string; childId?: string; lang?: string; q?: string } = {},
  ) => {
    const qs = new URLSearchParams()
    if (params.stage) qs.set('stage', params.stage)
    if (params.childId) qs.set('childId', params.childId)
    if (params.lang) qs.set('lang', params.lang)
    if (params.q && params.q.trim()) qs.set('q', params.q.trim())
    const q = qs.toString()
    return request<{ total: number; books: ContentBookDto[] }>(
      `/api/content/books${q ? `?${q}` : ''}`,
      { token },
    )
  },

  contentChapter: (contentId: string, order: number, token: string) =>
    request<{ chapter: ContentChapterDto }>(
      `/api/content/books/${encodeURIComponent(contentId)}/chapters/${order}`,
      { token },
    ),

  contentChapterList: (contentId: string, token: string) =>
    request<{ total: number; chapters: Array<{ order: number; title: string; art: string | null }> }>(
      `/api/content/books/${encodeURIComponent(contentId)}/chapters`,
      { token },
    ),

  contentProgress: (contentId: string, childId: string, token: string) =>
    request<{ progress: { chapterOrder: number; blockOrder: number; finished: boolean } }>(
      `/api/content/books/${encodeURIComponent(contentId)}/progress?childId=${encodeURIComponent(childId)}`,
      { token },
    ),

  reportContentProgress: (
    contentId: string,
    childId: string,
    body: { chapterOrder: number; blockOrder?: number; completed?: boolean },
    token: string,
  ) =>
    request<{ chapterOrder: number; finished: boolean }>(
      `/api/content/books/${encodeURIComponent(contentId)}/progress`,
      { method: 'POST', body: { childId, chapterOrder: body.chapterOrder, blockOrder: body.blockOrder ?? 0, completed: body.completed ?? false }, token },
    ),

  /** 收藏 / 取消收藏（docs/15 P1-A） */
  setFavorite: (
    contentId: string,
    childId: string,
    favorite: boolean,
    token: string,
  ) =>
    request<{ ok: boolean; favorite: boolean }>(
      `/api/content/books/${encodeURIComponent(contentId)}/favorite`,
      { method: 'PUT', body: { childId, favorite }, token },
    ),

  /** 生词本：收录一个词（docs/15 P1-B） */
  addWord: (
    childId: string,
    body: { word: string; lang: 'zh' | 'en'; bookId?: string; context?: string },
    token: string,
  ) =>
    request<{ card: WordCardDto }>(
      '/api/content/words',
      { method: 'POST', body: { childId, ...body }, token },
    ),

  /** 生词本：列表 */
  listWords: (childId: string, token: string) =>
    request<{ total: number; cards: WordCardDto[] }>(
      `/api/content/words?childId=${encodeURIComponent(childId)}`,
      { token },
    ),

  /** 生词本：删除一个词 */
  removeWord: (wordId: string, childId: string, token: string) =>
    request<{ ok: boolean }>(
      `/api/content/words/${encodeURIComponent(wordId)}?childId=${encodeURIComponent(childId)}`,
      { method: 'DELETE', token },
    ),

  /** 家长端内容域视图：桃书库进度汇总 + 屏蔽状态（docs/09 C4） */
  contentFamily: (token: string) =>
    request<{ children: Array<{ id: string; nickname: string; stage: string }>; books: ContentFamilyBookDto[] }>(
      '/api/content/family',
      { token },
    ),

  /** 内容域单书屏蔽（docs/09 C9） */
  setContentBlocked: (contentId: string, blocked: boolean, token: string) =>
    request<{ ok: boolean; bookId: string; blocked: boolean }>(
      `/api/content/books/${encodeURIComponent(contentId)}/blocked`,
      { method: 'PUT', body: { blocked }, token },
    ),

  /** 阅读中共读脚手架（docs/09 B1）：本章的讲什么/问什么 */
  contentScaffold: (contentId: string, chapterOrder: number, token: string) =>
    request<{
      card: {
        bookTitle: string
        stage: string
        tellPoints: string[]
        questions: string[]
        hook: string
        genType: 'template'
      }
      chapterOrder: number | null
    }>(
      `/api/content/books/${encodeURIComponent(contentId)}/scaffold?chapterOrder=${chapterOrder}`,
      { token },
    ),

  // ── 第四轮（docs/13 P0-B）：服务端 TTS ──

  ttsVoices: () =>
    request<{
      voices: Array<{ id: string; label: string; lang: string; description: string }>
      defaultSpeed: number
      available: boolean
    }>('/api/tts/voices'),

  ttsPreview: (body: { text: string; voiceId?: string; speed?: number; lang: 'zh' | 'en' }) =>
    request<{
      audioUrl: string
      format: string
      durationMs: number
      chars: Array<{ char: string; start: number; end: number }>
      cached: boolean
    }>('/api/tts/preview', { method: 'POST', body }),

  /**
   * 整章流式合成：SSE 逐段下推。收到一段播一段，不等情况。
   * 不走通用 request()（那是 JSON 往返），这里直接解 ReadableStream。
   */
  ttsChapterStream: (
    contentId: string,
    chapterOrder: number,
    body: { voiceId?: string; speed?: number; lang: 'zh' | 'en' },
    handlers: {
      onSegment: (seg: {
        index: number
        text: string
        audioUrl: string
        durationMs: number
        chars: Array<{ char: string; start: number; end: number }>
        cached: boolean
      }) => void
      onError: (message: string) => void
      onDone: () => void
    },
  ) => fetchSseChapter(contentId, chapterOrder, body, handlers),

  // ── 第四轮（docs/13 P0-E）：AI 视频 ──

  videoGenerate: (body: {
    scene: string
    description: string
    seconds?: number
    aspectRatio?: '16:9' | '9:16' | '1:1' | '3:4' | '4:3' | '21:9'
  }) =>
    request<{
      scene: string
      status: 'queued' | 'pending' | 'completed'
      taskId?: string
      videoUrl?: string
      cached: boolean
    }>('/api/video/generate', { method: 'POST', body }),

  videoStatus: (scene: string) =>
    request<{
      scene: string
      status: 'queued' | 'pending' | 'in_progress' | 'completed' | 'failed'
      progress?: number
      videoUrl?: string | null
      error?: string | null
    }>(`/api/video/${encodeURIComponent(scene)}`),
}

/** SSE 解码：读 /api/tts/chapter 的流，按事件名分派（docs/13 P0-C） */
async function fetchSseChapter(
  contentId: string,
  chapterOrder: number,
  body: { voiceId?: string; speed?: number; lang: 'zh' | 'en' },
  handlers: {
    onSegment: (seg: {
      index: number
      text: string
      audioUrl: string
      durationMs: number
      chars: Array<{ char: string; start: number; end: number }>
      cached: boolean
    }) => void
    onError: (message: string) => void
    onDone: () => void
  },
): Promise<void> {
  const session = useSession.getState()
  const res = await fetch(
    `${API_BASE}/api/tts/chapter/${encodeURIComponent(contentId)}/${chapterOrder}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(session.token ? { Authorization: `Bearer ${session.token}` } : {}),
      },
      body: JSON.stringify(body),
    },
  )
  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => '')
    throw new ApiError(res.status, 'TTS_FAILED', text || '整章朗读没准备好，可以一段一段听')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    // SSE 事件以空行分隔
    const events = buf.split('\n\n')
    buf = events.pop() ?? ''
    for (const ev of events) {
      const lines = ev.split('\n')
      let eventName = 'message'
      let data = ''
      for (const line of lines) {
        if (line.startsWith('event:')) eventName = line.slice(6).trim()
        else if (line.startsWith('data:')) data += line.slice(5).trim()
      }
      if (!data) continue
      if (eventName === 'segment') {
        try {
          handlers.onSegment(JSON.parse(data))
        } catch {
          /* 单段解析失败跳过，不中断整章 */
        }
      } else if (eventName === 'error') {
        try {
          handlers.onError((JSON.parse(data) as { message?: string }).message ?? '这一段朗读没成功')
        } catch {
          handlers.onError('这一段朗读没成功')
        }
      } else if (eventName === 'done') {
        handlers.onDone()
      }
    }
  }
  handlers.onDone()
}

export interface ContentBookDto {
  id: string
  bookId: string
  title: string
  author: string | null
  lang: string
  category: string
  ageStage: string
  intro: string | null
  coverArt: string
  /** AI 封面插画 URL（docs/13 P0-A）；无则 null，前端回退 SceneArt SVG */
  coverArtUrl: string | null
  coverFrom: string | null
  coverTo: string | null
  words: number
  chapterCount: number
  progress: number
  finished: boolean
  /** 家长是否屏蔽（docs/09 C9；孩子端列表里被屏蔽的书不返回） */
  blocked: boolean
  /** 孩子是否收藏（docs/15 P1-A） */
  favorite: boolean
}

/** 生词本卡片（docs/15 P1-B） */
export interface WordCardDto {
  id: string
  word: string
  lang: string
  bookId: string | null
  bookTitle: string | null
  context: string | null
  createdAt: string
}

/** 家长端内容域视图（docs/09 C4） */
export interface ContentFamilyBookDto extends ContentBookDto {
  readers: Array<{ childId: string; progress: number; finished: boolean }>
}

export interface ContentChapterDto {
  id: string
  order: number
  title: string
  art: string | null
  /** AI 题图 URL（docs/13 P0-A）；无则 null */
  artUrl: string | null
  blocks: Array<{
    id: string
    order: number
    kind: string
    text: string
    pinyin: string | null
    translation: string | null
    art: string | null
    /** 图片块的 AI 插画 URL（docs/24）；无则 null，前端回退 SVG 场景 */
    artUrl: string | null
  }>
}

export interface WeeklyReportDataDto {
  weekStart: string
  nights: number
  totalMinutes: number
  books: Array<{ key: string; title: string }>
  booksCompleted: number
  highlights: Array<{ text: string; source: string }>
  highlightsTotal: number
  achievementsUnlocked: number
  nextWeekHint: string
}

export interface FamilySettingsDto {
  bedtimeMin: number | null
  overtimeCapSec: number | null
  /** 安静模式（docs/15 P1-C）：开启即应用内强制 reducedMotion，覆盖系统设置 */
  calmMode: boolean | null
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
