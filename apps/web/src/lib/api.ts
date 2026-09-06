import type { DeviceRole } from './roles'

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

/** 统一请求出口：JSON 往返、错误归一为 ApiError（服务端中文 message 直通 UI） */
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
    if (!response.ok) {
      throw new ApiError(response.status, 'BAD_RESPONSE', '服务器开小差了，请稍后再试')
    }
    return undefined as T
  }

  if (!response.ok) {
    const body = data as ErrorBody
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
}

export interface ShelfDto {
  total: number
  books?: ShelfItemDto[]
  albums?: ShelfItemDto[]
  mp?: unknown
  childrenView?: ShelfItemDto[]
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

  shelf: (familyId: string, token: string, view?: 'child') =>
    request<ShelfDto>(
      `/api/shelf?familyId=${encodeURIComponent(familyId)}${view ? `&view=${view}` : ''}`,
      { token },
    ),
}
