import { SKILL_VERSION, WEREAD_GATEWAY_URL } from '@taoread/shared'
import {
  UpgradeRequiredError,
  WereadApiError,
  WereadHttpError,
} from '../../lib/errors'

/**
 * 微信读书 Agent 网关适配层（全部出网流量唯一出口）。
 *
 * 固化实测得到的网关约定（weread skill SKILL.md）：
 * 1. POST JSON；业务参数与 api_name/skill_version 平铺在同一层（禁止 params 嵌套）；
 * 2. 每次请求必须带 skill_version；回包出现 upgrade_info 必须暂停并升级；
 * 3. errcode 非 0 表示业务错误（errmsg 为中文提示）；
 * 4. 请求体必须 UTF-8（Node fetch + JSON.stringify 天然满足）；
 * 5. deepLink 只使用回包原值，永不自行拼接。
 */

export type SleepFn = (ms: number) => Promise<void>
export const defaultSleep: SleepFn = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** 可重试状态：网关限流与瞬时服务错误 */
function isRetryableStatus(status: number): boolean {
  return status === 429 || status >= 500
}

/** 读取 Retry-After 头（秒）转毫秒；缺失或非法返回 0 */
function parseRetryAfterMs(response: Response): number {
  const headers = (response as { headers?: { get?: (name: string) => string | null } }).headers
  const value = headers?.get?.('retry-after')
  if (!value) return 0
  const seconds = Number.parseInt(value, 10)
  return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : 0
}

/** 丢弃响应体，避免未读 body 占住连接 */
async function discardBody(response: Response): Promise<void> {
  try {
    await (response as { body?: { cancel?: () => Promise<unknown> } }).body?.cancel?.()
  } catch {
    // 丢弃失败不影响重试流程
  }
}

function errorMessage(cause: unknown): string {
  return cause instanceof Error ? cause.message : String(cause)
}

export interface CallWereadApiOptions {
  apiKey: string
  apiName: string
  params?: Record<string, unknown>
  baseUrl?: string
  fetchImpl?: typeof fetch
  /** 额外重试次数（总尝试次数 = maxRetries + 1），默认 2 */
  maxRetries?: number
  /** 退避基础延时（毫秒），指数递增 + 抖动，默认 300 */
  retryBaseDelayMs?: number
  sleep?: SleepFn
  /** 单次请求超时（毫秒），默认 15000 */
  timeoutMs?: number
  logger?: { warn: (message: string) => void }
}

interface GatewayEnvelope {
  errcode?: unknown
  errmsg?: unknown
  upgrade_info?: { message?: unknown } | null
  [key: string]: unknown
}

export async function callWereadApi<T = GatewayEnvelope>(
  options: CallWereadApiOptions,
): Promise<T> {
  const {
    apiKey,
    apiName,
    params = {},
    baseUrl = WEREAD_GATEWAY_URL,
    fetchImpl = fetch,
    maxRetries = 2,
    retryBaseDelayMs = 300,
    sleep = defaultSleep,
    timeoutMs = 15_000,
    logger = console,
  } = options

  const body = JSON.stringify({
    api_name: apiName,
    skill_version: SKILL_VERSION,
    ...params,
  })

  let attempt = 0
  for (;;) {
    // 退避延时不低于 Retry-After 指示，随尝试次数指数递增并加抖动
    const backoff = async (floorMs = 0) => {
      const delay = Math.max(
        floorMs,
        retryBaseDelayMs * 2 ** attempt + Math.floor(Math.random() * 100),
      )
      logger.warn(
        `weread gateway retry api=${apiName} attempt=${attempt + 1}/${maxRetries} delay=${delay}ms`,
      )
      await sleep(delay)
      attempt += 1
    }

    let response: Response
    try {
      response = await fetchImpl(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body,
        signal: AbortSignal.timeout(timeoutMs),
      })
    } catch (cause) {
      if (attempt < maxRetries) {
        await backoff()
        continue
      }
      throw new WereadHttpError(
        `微信读书网关网络错误：${errorMessage(cause)}`,
        0,
        { cause },
      )
    }

    if (isRetryableStatus(response.status)) {
      if (attempt < maxRetries) {
        const retryAfterMs = parseRetryAfterMs(response)
        await discardBody(response)
        await backoff(retryAfterMs)
        continue
      }
      throw new WereadHttpError(
        `微信读书网关 HTTP ${response.status}（已重试 ${maxRetries} 次）`,
        response.status,
      )
    }

    if (!response.ok) {
      // 4xx（非 429）不具备重试价值，立即失败
      throw new WereadHttpError(`微信读书网关 HTTP ${response.status}`, response.status)
    }

    let data: unknown
    try {
      data = await response.json()
    } catch {
      throw new WereadApiError(-1, '微信读书网关返回了无法解析的响应')
    }

    // 回包必须是 JSON 对象：null / 数组 / 标量均视为非法（防止契约检查被绕过）
    if (data === null || typeof data !== 'object' || Array.isArray(data)) {
      throw new WereadApiError(-1, '微信读书网关返回了无法解析的响应')
    }

    const envelope = data as GatewayEnvelope

    // 网关约定：upgrade_info 出现即中断，优先级高于 errcode
    if (envelope.upgrade_info) {
      const message =
        typeof envelope.upgrade_info.message === 'string'
          ? envelope.upgrade_info.message
          : '微信读书 skill 版本需要升级，请按照 weread-skills 的 SKILL.md 完成升级后重试'
      throw new UpgradeRequiredError(message, envelope.upgrade_info)
    }

    if (typeof envelope.errcode === 'number' && envelope.errcode !== 0) {
      throw new WereadApiError(
        envelope.errcode,
        typeof envelope.errmsg === 'string' && envelope.errmsg
          ? envelope.errmsg
          : '微信读书接口返回错误',
      )
    }

    return envelope as T
  }
}
