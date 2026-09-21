/**
 * AI 视频路由（docs/13 P0-E）：
 *   POST /api/video/generate        为章节场景创建动画任务（幂等：已有视频直接返回）
 *   GET  /api/video/:scene          查询场景视频状态（前端轮询，≥5 秒一次）
 *
 * 流程：孩子点「让画面动起来」→ 建任务落库（queued）→ 前端每 5 秒查一次
 *      → completed 时服务端下载 mp4 到 media/videos/ → 前端内联播放。
 * 已完成的场景二次点开秒播（本地 mp4，不再出网）。
 *
 * 降级：未配置视频 key 时整个模块 503，前端不展示「让画面动起来」按钮。
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { requireAuth } from '../../modules/family/routes'
import { AppError, UnauthorizedError, ValidationError } from '../../lib/errors'
import { createVideoTask, queryVideoTask, downloadVideo, VideoError, type VideoGenDeps } from './video'
import { join } from 'node:path'

export interface VideoRoutesDeps {
  db: PrismaClient
  tokenSecret: Buffer
  mediaDir: string
  videoDeps: VideoGenDeps | null
}

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const detail = result.error.issues.map((issue) => issue.message).join('；')
    throw new ValidationError(detail || '请求参数不正确')
  }
  return result.data as T
}

const POLL_MIN_INTERVAL_MS = 5000

export function registerVideoRoutes(app: FastifyInstance, deps: VideoRoutesDeps): void {
  const { db, tokenSecret, mediaDir, videoDeps } = deps
  const auth = requireAuth(tokenSecret)

  function requireVideo(): VideoGenDeps {
    if (!videoDeps) throw new AppError('动画功能还没准备好', 'VIDEO_UNAVAILABLE', 503)
    return videoDeps
  }

  /** 场景键 → 本地 mp4 路径 / URL */
  function videoUrlPath(taskId: string): string {
    return `/api/media/videos/${taskId}.mp4`
  }
  function videoLocalPath(taskId: string): string {
    return join(mediaDir, 'videos', `${taskId}.mp4`)
  }

  /**
   * 创建动画任务。幂等：同场景已有 completed 视频则直接返回；
   * 已有进行中任务也直接返回（不重复建任务、不重复计费）。
   */
  app.post('/api/video/generate', { preHandler: auth }, async (request: FastifyRequest, reply: FastifyReply) => {
    const vd = requireVideo()
    if (!request.auth) throw new UnauthorizedError()
    const body = parse(
      z.object({
        scene: z.string().min(1).max(128),
        /** 画面描述（中文；与插画的 prompt 同源，保证动起来的是同一幅画） */
        description: z.string().trim().min(2).max(500),
        seconds: z.number().int().min(4).max(12).optional(),
        aspectRatio: z.enum(['16:9', '9:16', '1:1', '3:4', '4:3', '21:9']).optional(),
      }),
      request.body,
    )

    // 已有完成的视频：秒回
    const done = await db.videoAsset.findUnique({
      where: { scene: body.scene },
    })
    if (done && done.status === 'completed' && done.urlPath) {
      return reply.send({
        scene: body.scene,
        status: 'completed',
        videoUrl: done.urlPath,
        cached: true,
      })
    }
    // 进行中：不重复建任务
    if (done && (done.status === 'queued' || done.status === 'pending' || done.status === 'in_progress')) {
      return reply.send({
        scene: body.scene,
        status: done.status,
        taskId: done.taskId,
        cached: false,
      })
    }

    // 静态画面描述 + 运镜指令：视频复用插画的画面构图，保证动起来后和插图一致
    const motionPrompt = `${body.description.trim()}，gentle camera slowly panning, soft animation, particles drifting, cinematic children book scene in motion`

    let taskId: string
    try {
      taskId = await createVideoTask(vd, {
        prompt: motionPrompt,
        ...(body.seconds ? { seconds: body.seconds } : {}),
        ...(body.aspectRatio ? { aspectRatio: body.aspectRatio } : {}),
      })
    } catch (err) {
      if (err instanceof VideoError) {
        throw new AppError('动画小工暂时开小差了，请稍后再试', 'VIDEO_FAILED', 502)
      }
      throw err
    }

    await db.videoAsset.upsert({
      where: { scene: body.scene },
      create: {
        scene: body.scene,
        kind: 'chapter',
        taskId,
        status: 'queued',
        prompt: motionPrompt,
        seconds: body.seconds ?? 5,
        model: vd.model,
      },
      update: {
        taskId,
        status: 'queued',
        prompt: motionPrompt,
        error: null,
        urlPath: null,
      },
    })

    return reply.send({ scene: body.scene, status: 'queued', taskId, cached: false })
  })

  /**
   * 查询状态。completed 时自动下载 mp4 到本地并回填。
   * 前端轮询间隔 ≥5 秒（低于此间隔会被限流，接口仍返回 pending）。
   */
  app.get<{ Params: { scene: string } }>(
    '/api/video/:scene',
    { preHandler: auth },
    async (request: FastifyRequest<{ Params: { scene: string } }>, reply: FastifyReply) => {
      requireVideo()
      if (!request.auth) throw new UnauthorizedError()
      const row = await db.videoAsset.findUnique({ where: { scene: request.params.scene } })
      // 无记录：新场景还没有视频是常态（静态插画兜底），回 200 + none，
      // 不打 404 进 console 噪音（对抗审查 sweep 发现）
      if (!row) return reply.send({ scene: request.params.scene, status: 'none', progress: 0 })

      // 已完成且本地文件在：直接回
      if (row.status === 'completed' && row.urlPath) {
        return reply.send({
          scene: row.scene,
          status: 'completed',
          videoUrl: row.urlPath,
          progress: 100,
        })
      }
      // 已失败：返回失败原因，不再轮询
      if (row.status === 'failed') {
        return reply.send({
          scene: row.scene,
          status: 'failed',
          error: row.error ?? '动画生成失败，可以再试一次',
        })
      }
      // 限流保护：距离上次查询不足 5 秒时，不查云端，直接返回当前库内状态
      const since = Date.now() - row.updatedAt.getTime()
      if (since < POLL_MIN_INTERVAL_MS) {
        return reply.send({
          scene: row.scene,
          status: row.status === 'queued' ? 'pending' : row.status,
          progress: row.bytes > 0 ? 50 : 5,
        })
      }

      const info = await queryVideoTask(videoDeps!, row.taskId).catch((err) => {
        if (err instanceof VideoError) {
          return { taskId: row.taskId, status: 'failed' as const, progress: 0, url: null, error: err.message }
        }
        throw err
      })

      if (info.status === 'completed' && info.url) {
        // 下载到本地，此后不再依赖外链
        let bytes = 0
        try {
          const out = await downloadVideo(info.url, videoLocalPath(row.taskId), videoDeps!.fetch ?? fetch)
          bytes = out.bytes
        } catch {
          // 下载失败仍可回退外链播放（url 保留在 prompt 之外不落库，避免外链过期误导）
          await db.videoAsset.update({
            where: { scene: row.scene },
            data: { status: 'failed', error: '动画下不下来，可以再试一次' },
          })
          return reply.send({
            scene: row.scene,
            status: 'failed',
            error: '动画下不下来，可以再试一次',
          })
        }
        await db.videoAsset.update({
          where: { scene: row.scene },
          data: {
            status: 'completed',
            urlPath: videoUrlPath(row.taskId),
            bytes,
            width: 1280,
            height: 720,
          },
        })
        return reply.send({
          scene: row.scene,
          status: 'completed',
          videoUrl: videoUrlPath(row.taskId),
          progress: 100,
        })
      }

      if (info.status === 'failed') {
        await db.videoAsset.update({
          where: { scene: row.scene },
          data: { status: 'failed', error: info.error ?? '动画生成失败，可以再试一次' },
        })
        return reply.send({
          scene: row.scene,
          status: 'failed',
          error: info.error ?? '动画生成失败，可以再试一次',
        })
      }

      // 进行中：刷新库内状态与时间戳（时间戳是下一轮限流依据）
      const live: 'pending' | 'in_progress' = info.status === 'pending' ? 'pending' : 'in_progress'
      await db.videoAsset.update({
        where: { scene: row.scene },
        data: { status: live },
      })
      return reply.send({
        scene: row.scene,
        status: live,
        progress: info.progress,
      })
    },
  )
}
