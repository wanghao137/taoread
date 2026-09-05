import { z } from 'zod'
import { ConfigError } from './lib/errors'

/**
 * 配置在应用入口懒加载（测试可注入环境变量），不在模块顶层读取。
 */
const schema = z
  .object({
    PORT: z.coerce.number().int().positive().default(8787),
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    TAO_MASTER_KEY: z.string().min(16, 'TAO_MASTER_KEY 至少 16 个字符'),
    TAO_ALLOWED_ORIGIN: z.string().default('*'),
    TAO_DATABASE_URL: z.string().min(1, 'TAO_DATABASE_URL 不能为空'),
    WEREAD_API_KEY: z.string().optional(),
  })
  .superRefine((cfg, ctx) => {
    if (cfg.NODE_ENV === 'prod' && cfg.TAO_ALLOWED_ORIGIN === '*') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '生产环境（NODE_ENV=prod）禁止 CORS 全开，请显式配置 TAO_ALLOWED_ORIGIN',
      })
    }
  })

export type AppConfig = z.infer<typeof schema>

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const result = schema.safeParse(env)
  if (!result.success) {
    const detail = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ')
    throw new ConfigError(`环境变量配置错误：${detail}`)
  }
  return result.data
}
