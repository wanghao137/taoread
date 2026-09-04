/** 全局错误类型：均带机器可读 code，便于路由层统一转 HTTP */

export class AppError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message)
    this.name = new.target.name
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
    super(message, 'WEREAD_UPGRADE')
  }
}

/** 出网限流触发（令牌桶耗尽） */
export class RateLimitedError extends AppError {
  constructor(message = '微信读书接口调用过于频繁，请稍后再试') {
    super(message, 'WEREAD_RATE_LIMITED')
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
