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
    // 就寝时刻（本地日内分钟数，默认 21:30=1290）；'off' 关闭（测试/走查）。
    // 空串显式拒绝（N8-006）：TAO_BEDTIME= 会被 dotenv 注入空串，coerce 成 0 等于全天就寝
    TAO_BEDTIME: z
      .string()
      .default('1290')
      .transform((s, ctx) => {
        if (s === 'off') return 'off' as const
        if (!/^\d{1,4}$/.test(s)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'TAO_BEDTIME 需为 0-1439 的数字或 off',
          })
          return z.NEVER
        }
        const n = Number.parseInt(s, 10)
        if (n > 1439) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'TAO_BEDTIME 不能超过 1439' })
          return z.NEVER
        }
        return n
      }),
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
