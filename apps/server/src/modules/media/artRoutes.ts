/**
 * AI 插画路由（docs/13 P0-A）：
 *   POST /api/art/generate  家长触发：为指定场景生成插画（幂等，已有则跳过）
 *   GET  /api/art/:scene    取某场景的插画 URL（无则 404，前端回退 SVG）
 *   POST /api/art/book/:bookId  一次性为一本书生成封面 + 各章题图
 *
 * 设计要点：
 *  - 幂等：scene 唯一，已存在 ArtAsset 直接返回，不重复出网
 *  - 安全：生图走服务端，key 不下发前端；家长身份才可触发生成
 *  - 回退：任何失败都返回 null（前端继续用 SVG 场景），不报错给用户
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../../modules/family/routes'
import { AppError, UnauthorizedError, ValidationError } from '../../lib/errors'
import { ImageGenerator, type ArtKind, type GenerateArtInput, type ImageGenDeps } from './imagegen'
import { compressPngToWebP } from './compress'
import { labelWebpImage } from './label'

export interface ArtRoutesDeps {
  db: PrismaClient
  tokenSecret: Buffer
  mediaDir: string
  /** 生图依赖；缺 base/key 时整个模块 503 */
  imageDeps: ImageGenDeps | null
}

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const detail = result.error.issues.map((issue) => issue.message).join('；')
    throw new ValidationError(detail || '请求参数不正确')
  }
  return result.data as T
}

export function registerArtRoutes(app: FastifyInstance, deps: ArtRoutesDeps): void {
  const { db, tokenSecret, mediaDir, imageDeps } = deps
  const auth = requireAuth(tokenSecret)

  function requireImage(): ImageGenDeps {
    if (!imageDeps) throw new AppError('插画功能还没准备好', 'IMAGE_UNAVAILABLE', 503)
    return imageDeps
  }

  /** 落库（upsert 保证幂等：同 scene 重试只更新） */
  async function upsertAsset(input: GenerateArtInput, art: { urlPath: string; width: number; height: number; bytes: number; prompt: string; model: string }): Promise<void> {
    await db.artAsset.upsert({
      where: { scene: input.scene },
      create: {
        scene: input.scene,
        kind: input.kind,
        urlPath: art.urlPath,
        width: art.width,
        height: art.height,
        bytes: art.bytes,
        prompt: art.prompt,
        model: art.model,
      },
      update: {
        urlPath: art.urlPath,
        width: art.width,
        height: art.height,
        bytes: art.bytes,
        prompt: art.prompt,
        model: art.model,
      },
    })
  }

  /**
   * 为单个场景生成插画。已存在则直接返回（幂等，不重复出网）。
   * 任何失败返回 null——调用方继续用 SVG，不阻断用户。
   */
  async function ensureArt(input: GenerateArtInput): Promise<string | null> {
    const existing = await db.artAsset.findUnique({
      where: { scene: input.scene },
      select: { urlPath: true },
    })
    if (existing) return existing.urlPath

    const gen = new ImageGenerator(
      requireImage(),
      mediaDir,
      compressPngToWebP,
      // P0-8：隐式标识——provider 用服务名、contentId 用场景键（法规要求的制作要素）
      (webp, scene, kind) =>
        labelWebpImage(webp, {
          provider: 'taoread',
          model: requireImage().model,
          scene,
          kind,
        }),
    )
    const art = await gen.generate(input)
    if (!art) return null
    await upsertAsset(input, art)
    return art.urlPath
  }

  // 审计 T03/F03：生成是付费出网动作——孩子角色一律 403；家长生成的素材强制
  // 写入家庭命名空间（scene 前缀 fam:<familyId>:），不得抢占公共书库场景键
  const generateAuth = requireAuth(tokenSecret, { roles: ['parent'] })

  /** 家庭命名空间：API 生成的 scene 一律收进 fam:<familyId>: 前缀，公共键（cover:/chapter:）不可经 API 写 */
  function familyScene(familyId: string, scene: string): string {
    return scene.startsWith('fam:') ? scene : `fam:${familyId}:${scene}`
  }

  app.post('/api/art/generate', { preHandler: generateAuth }, async (request: FastifyRequest, reply: FastifyReply) => {
    requireImage()
    if (!request.auth) throw new UnauthorizedError()
    const body = parse(
      z.object({
        kind: z.enum(['cover', 'chapter', 'mascot']),
        scene: z.string().min(1).max(128),
        description: z.string().trim().min(2).max(500),
        label: z.string().trim().min(1).max(120),
        lang: z.enum(['zh', 'en']).default('zh'),
      }),
      request.body,
    )
    const input: GenerateArtInput = {
      kind: body.kind,
      scene: familyScene(request.auth.fid, body.scene),
      description: body.description,
      label: body.label,
      lang: body.lang ?? 'zh',
    }
    const urlPath = await ensureArt(input)
    return reply.send({ scene: input.scene, urlPath, ok: urlPath !== null })
  })

  app.get<{ Params: { scene: string } }>(
    '/api/art/:scene',
    { preHandler: auth },
    async (request: FastifyRequest<{ Params: { scene: string } }>, reply: FastifyReply) => {
      if (!request.auth) throw new UnauthorizedError()
      const asset = await db.artAsset.findUnique({
        where: { scene: request.params.scene },
        select: { urlPath: true, width: true, height: true },
      })
      if (!asset) throw new AppError('这个场景还没有插画', 'ART_NOT_FOUND', 404)
      return reply.send(asset)
    },
  )

  /**
   * 批量为一本书生成封面 + 全部章节题图。
   * 章节描述由章节标题派生（题图是氛围图，不需要逐句正文）。
   */
  app.post<{ Params: { bookId: string } }>(
    '/api/art/book/:bookId',
    { preHandler: generateAuth },
    async (request: FastifyRequest<{ Params: { bookId: string } }>, reply: FastifyReply) => {
      requireImage()
      if (!request.auth) throw new UnauthorizedError()
      const book = await db.book.findUnique({
        where: { id: request.params.bookId },
        include: { chapters: { orderBy: { order: 'asc' }, select: { order: true, title: true, art: true } } },
      })
      if (!book) throw new AppError('没有这本书', 'BOOK_NOT_FOUND', 404)

      const results: Array<{ scene: string; kind: ArtKind; ok: boolean }> = []
      // 封面（家庭命名空间，公共书库封面只能由平台脚本离线生成）
      const coverScene = familyScene(request.auth.fid, `cover:${book.id}`)
      const coverUrl = await ensureArt({
        kind: 'cover',
        scene: coverScene,
        description: book.intro && book.intro.length > 8 ? book.intro : `${book.title}的封面插画`,
        label: book.title,
        lang: book.lang as 'zh' | 'en',
      }).catch(() => null)
      results.push({ scene: coverScene, kind: 'cover', ok: coverUrl !== null })

      // 章节题图（并发 2，避免压垮生图服务）
      for (const ch of book.chapters) {
        const scene = familyScene(request.auth.fid, ch.art ?? `chapter:${book.id}:${ch.order}`)
        const url = await ensureArt({
          kind: 'chapter',
          scene,
          description: `${book.title}·${ch.title}：与诗句内容相符的安静优美画面`,
          label: `${book.title}·${ch.title}`,
          lang: book.lang as 'zh' | 'en',
        }).catch(() => null)
        results.push({ scene, kind: 'chapter', ok: url !== null })
      }

      const ok = results.filter((r) => r.ok).length
      return reply.send({ bookId: book.id, total: results.length, ok, results })
    },
  )
}
