import { z } from 'zod'
import { ConfigError } from './lib/errors'

/**
 * 配置在应用入口懒加载（测试可注入环境变量），不在模块顶层读取。
 */
const schema = z
  .object({
    PORT: z.coerce.number().int().positive().default(8787),
    TAO_HOST: z.string().default('127.0.0.1').refine((host) => host === '127.0.0.1' || host === '::1' || host === '0.0.0.0', 'TAO_HOST 必须是明确的监听地址'),
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
    // ── 第四轮（docs/13）：AI 生图 + 服务端 TTS + AI 视频 ──
    TAO_IMAGE_BASE: z.string().url().optional(),
    TAO_IMAGE_KEY: z.string().optional(),
    TAO_IMAGE_MODEL: z.string().default('agnes-image-2.5-flash'),
    // agnes-video：异步任务，key 只入 .env
    TAO_VIDEO_BASE: z.string().url().optional(),
    TAO_VIDEO_KEY: z.string().optional(),
    TAO_VIDEO_MODEL: z.string().default('agnes-video-2.5-flash'),
    // 阶跃星辰 stepaudio：限时免费期使用，base/key/model 三件套
    TTS_BASE: z.string().url().optional(),
    TTS_API_KEY: z.string().optional(),
    TTS_MODEL: z.string().default('stepaudio-3-gen-preview'),
    // 审计 T03/F06：是否信任反向代理头（X-Forwarded-For 等）。false=直连部署（默认，
    // 伪造转发头无效）；true=信任一级代理；正整数=信任 N 跳。与 docs/06 部署文档对齐。
    TAO_TRUST_PROXY: z
      .string()
      .default('false')
      .transform((s) => {
        if (s === 'true') return true as const
        if (s === 'false') return false as const
        if (/^\d+$/.test(s)) return Number.parseInt(s, 10)
        throw new Error('TAO_TRUST_PROXY 需为 true / false / 跳数（正整数）')
      }),
    // A3 费用边界：每家庭每日 AI 生成（插画+动画）上限，实际出网计数（幂等命中不计）
    TAO_DAILY_GEN_LIMIT: z.coerce.number().int().positive().max(10_000).default(60),
    // 媒体目录（AI 插画/TTS/视频落地）。缺省=服务进程 cwd 下的 media/；生产部署指向独立卷
    TAO_MEDIA_DIR: z.string().min(1).optional(),
    // 前端构建产物目录（apps/web/dist）。设置后服务端同源托管 SPA；不设置=纯 API（开发态）
    TAO_STATIC_DIR: z.string().min(1).optional(),
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

/** 服务端 TTS 是否可用（缺 base/key 时朗读降级为浏览器 Web Speech，docs/13 P0-B） */
export function ttsAvailable(cfg: AppConfig): boolean {
  return Boolean(cfg.TTS_BASE && cfg.TTS_API_KEY)
}

/** AI 生图是否可用（缺 base/key 时封面回退 SVG 场景，docs/13 P0-A） */
export function imageGenAvailable(cfg: AppConfig): boolean {
  return Boolean(cfg.TAO_IMAGE_BASE && cfg.TAO_IMAGE_KEY)
}

/** AI 视频是否可用（缺 base/key 时「让画面动起来」按钮不展示，docs/13 P0-E） */
export function videoGenAvailable(cfg: AppConfig): boolean {
  return Boolean(cfg.TAO_VIDEO_BASE && cfg.TAO_VIDEO_KEY)
}

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
