/** 全局错误类型：均带机器可读 code，便于路由层统一转 HTTP */

export class AppError extends Error {
  /** 映射到 HTTP 状态码（app.ts 统一错误处理器使用） */
  readonly statusCode: number

  constructor(
    message: string,
    readonly code: string,
    statusCode = 500,
  ) {
    super(message)
    this.name = new.target.name
    this.statusCode = statusCode
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = '请先登录') {
    super(message, 'AUTH', 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = '没有权限执行此操作') {
    super(message, 'FORBIDDEN', 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message = '资源不存在') {
    super(message, 'NOT_FOUND', 404)
  }
}

export class ValidationError extends AppError {
  constructor(message = '请求参数不正确') {
    super(message, 'VALIDATION', 400)
  }
}

/** 微信读书网关 HTTP 层错误（4xx/5xx/网络异常，重试耗尽后抛出） */
export class WereadHttpError extends AppError {
  constructor(
    message: string,
    readonly status: number,
    options?: { cause?: unknown },
  ) {
    super(message, 'WEREAD_HTTP')
    if (options?.cause !== undefined) this.cause = options.cause
  }
}

/** 微信读书业务错误（errcode !== 0） */
export class WereadApiError extends AppError {
  constructor(
    readonly errcode: number,
    message: string,
  ) {
    super(message, 'WEREAD_API')
  }
}

/** 网关要求升级 skill 版本（回包 upgrade_info）；调用方必须暂停并按指引升级 */
export class UpgradeRequiredError extends AppError {
  constructor(
    message: string,
    readonly info: unknown,
  ) {
    super(message, 'WEREAD_UPGRADE', 503)
  }
}

/** 出网限流触发（令牌桶耗尽）——统一映射 HTTP 429 */
export class RateLimitedError extends AppError {
  constructor(message = '调用太频繁啦，请稍后再试~') {
    super(message, 'WEREAD_RATE_LIMITED', 429)
  }
}

/** 家庭尚未绑定微信读书 API Key（先到家长端完成绑定） */
export class NotBoundError extends AppError {
  constructor(message = '还没有绑定微信读书，请先在家长端完成绑定') {
    super(message, 'WEREAD_NOT_BOUND', 409)
  }
}

/** 配置错误 */
export class ConfigError extends AppError {
  constructor(message: string) {
    super(message, 'CONFIG')
  }
}

/** 加密/解密失败 */
export class CryptoError extends AppError {
  constructor(message: string) {
    super(message, 'CRYPTO')
  }
}
