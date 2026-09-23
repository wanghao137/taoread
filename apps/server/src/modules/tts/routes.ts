/**
 * 服务端 TTS 路由（docs/13 P0-B）：
 *   GET  /api/tts/voices              音色列表（前端选择器）
 *   POST /api/tts/preview             单段试听（短文本，直接返回 mp3 + 时间轴）
 *   POST /api/tts/chapter/:contentId/:order  整章合成（SSE 流式，逐段下推）
 *
 * 鉴权：需登录（家长/孩子均可听）。内容域章节走 cbf 校验。
 * 缓存：同文本+音色+语速命中磁盘缓存，秒回。
 * 降级：TTS_BASE/TTS_API_KEY 未配置时返回 503，前端回退浏览器 Web Speech。
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { mediaUrl } from '../media/access'
import { requireAuth } from '../../modules/family/routes'
import { AppError, UnauthorizedError, ValidationError } from '../../lib/errors'
import { getChapter, assertContentReadable } from '../../content/service'
import { VOICE_PRESETS, findVoice, clampSpeed, DEFAULT_SPEED } from './voices'
import {
  chunkText,
  synthesizeSegment,
  synthesizeStream,
  TtsError,
  type TtsClientDeps,
} from './client'
import { TtsCache, cacheKey } from './cache'
import { buildCharTimeline, timelineFromMp3, type CharTime } from './timeline'

export interface TtsRoutesDeps {
  db: PrismaClient
  tokenSecret: Buffer
  /** stepaudio 客户端依赖；缺 base/key 时整个模块返回 503 */
  ttsDeps: TtsClientDeps | null
  /** 媒体目录（存音频缓存） */
  mediaDir: string
}

interface VoiceDto {
  id: string
  label: string
  lang: string
  description: string
}

interface PreviewResponse {
  audioUrl: string
  format: string
  durationMs: number
  chars: CharTime[]
  cached: boolean
}

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const detail = result.error.issues.map((issue) => issue.message).join('；')
    throw new ValidationError(detail || '请求参数不正确')
  }
  return result.data
}

export function registerTtsRoutes(app: FastifyInstance, deps: TtsRoutesDeps): void {
  const { db, tokenSecret, ttsDeps, mediaDir } = deps
  const auth = requireAuth(tokenSecret)
  const cache = new TtsCache(mediaDir)

  async function ownAudio(path: string, familyId: string): Promise<void> {
    await db.ttsMediaOwner.upsert({
      where: { path },
      create: { path, familyId },
      update: {},
    })
  }

  /** 无 stepaudio 配置时给出明确的 503，前端据此降级 */
  function requireTts(): TtsClientDeps {
    if (!ttsDeps) throw new AppError('服务端朗读还没准备好，先用浏览器语音哦', 'TTS_UNAVAILABLE', 503)
    return ttsDeps
  }

  app.get('/api/tts/voices', { preHandler: auth }, async (_request, reply) => {
    const voices: VoiceDto[] = VOICE_PRESETS.map((v) => ({
      id: v.id,
      label: v.label,
      lang: v.lang,
      description: v.description,
    }))
    return reply.send({ voices, defaultSpeed: DEFAULT_SPEED, available: Boolean(ttsDeps) })
  })

  /** 单段试听：正文不超过 900 字，非流式直回 */
  app.post(
    '/api/tts/preview',
    { preHandler: auth },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const client = requireTts()
      if (!request.auth) throw new UnauthorizedError()
      const body = parse(
        z.object({
          text: z.string().trim().min(1).max(900),
          voiceId: z.string().max(32).optional(),
          speed: z.number().min(0.5).max(2).optional(),
          lang: z.enum(['zh', 'en']).default('zh'),
        }),
        request.body,
      )
      const voice = findVoice(body.voiceId)
      const speed = clampSpeed(body.speed)
      const format = 'mp3'
      const key = cacheKey(body.text, voice.id, speed, format, body.lang, request.auth.fid, client.model)

      const hit = await cache.get(key, format)
      if (hit) {
        await ownAudio(hit.urlPath.slice('/api/media/'.length), request.auth.fid)
        const chars = buildCharTimeline(body.text, hit.durationMs)
        const res: PreviewResponse = {
          audioUrl: mediaUrl(hit.urlPath, request.auth!, tokenSecret),
          format,
          durationMs: hit.durationMs,
          chars,
          cached: true,
        }
        return reply.send(res)
      }

      let audio: Buffer
      try {
        const out = await synthesizeSegment(client, {
          text: body.text,
          voice,
          speed,
          lang: body.lang ?? 'zh',
          format,
        })
        audio = out.audio
      } catch (err) {
        if (err instanceof TtsError) {
          throw new AppError('朗读暂时开小差了，请稍后再试', 'TTS_FAILED', 502)
        }
        throw err
      }
      const { durationMs, chars } = timelineFromMp3(body.text, audio)
      const entry = await cache.set(key, format, audio, durationMs)
      await ownAudio(entry.urlPath.slice('/api/media/'.length), request.auth.fid)
      const res: PreviewResponse = {
        audioUrl: mediaUrl(entry.urlPath, request.auth!, tokenSecret),
        format,
        durationMs,
        chars,
        cached: false,
      }
      return reply.send(res)
    },
  )

  /**
   * 整章合成：SSE 流式。每段一个 JSON 事件（含音频 base64 + 时间轴），
   * 前端收到即可播放当前段并预取下一段。
   */
  app.post<{ Params: { contentId: string; order: string } }>(
    '/api/tts/chapter/:contentId/:order',
    { preHandler: auth },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const client = requireTts()
      if (!request.auth) throw new UnauthorizedError()
      const params = parse(
        z.object({
          contentId: z.string().min(1).max(128),
          order: z.coerce.number().int().min(1).max(999),
        }),
        request.params,
      )
      const body = parse(
        z.object({
          voiceId: z.string().max(32).optional(),
          speed: z.number().min(0.5).max(2).optional(),
        }),
        request.body ?? {},
      )

      if (params.contentId.startsWith('imp:')) throw new AppError('家庭导入书暂不支持服务端朗读', 'TTS_UNAVAILABLE', 503)
      const chapter = await getChapter(db, params.contentId, params.order)
      if (!chapter) throw new AppError('这一章还藏在云朵后面', 'CHAPTER_NOT_FOUND', 404)
      // 审计 T03/F02：屏蔽书的整章 TTS 同策略拒绝（家长保留管理预览）
      await assertContentReadable(db, request.auth.fid, params.contentId, {
        role: request.auth.role,
        allowParentPreview: true,
      })

      const voice = findVoice(body.voiceId)
      const speed = clampSpeed(body.speed)
      // 审计 F16：语言从书目推导——英文书整章合成必须带 en，不再写死 zh
      const bookRow = await db.book.findUnique({ where: { id: params.contentId }, select: { lang: true } })
      const lang = bookRow?.lang === 'en' ? 'en' : 'zh'
      // 拼接可朗读文本（跳过图片块）
      const fullText = chapter.blocks
        .filter((b) => b.kind !== 'image')
        .map((b) => b.text)
        .join('\n')
      const segments = chunkText(fullText)

      reply.raw.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      })

      const send = (event: string, data: unknown) => {
        reply.raw.write(`event: ${event}\n`)
        reply.raw.write(`data: ${JSON.stringify(data)}\n\n`)
      }

      send('meta', {
        chapterOrder: chapter.order,
        title: chapter.title,
        voiceId: voice.id,
        speed,
        segmentCount: segments.length,
      })

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i]
        if (!seg) continue
        const key = cacheKey(seg, voice.id, speed, 'mp3', lang, request.auth.fid, client.model)
        try {
          const hit = await cache.get(key, 'mp3')
          if (hit) {
            await ownAudio(hit.urlPath.slice('/api/media/'.length), request.auth.fid)
            send('segment', {
              index: i,
              text: seg,
              audioUrl: mediaUrl(hit.urlPath, request.auth!, tokenSecret),
              durationMs: hit.durationMs,
              chars: buildCharTimeline(seg, hit.durationMs),
              cached: true,
            })
            continue
          }
          // 未命中：流式合成，分片边收边推（前端可边下边播）
          const out = await synthesizeStream(
            client,
            { text: seg, voice, speed, lang, format: 'mp3' },
            () => {
              /* 分片回调：这里不做前推（保持事件粒度=段），缓冲在合成内完成 */
            },
          )
          const { durationMs, chars } = timelineFromMp3(seg, out.audio)
          const entry = await cache.set(key, 'mp3', out.audio, durationMs)
          await ownAudio(entry.urlPath.slice('/api/media/'.length), request.auth.fid)
          send('segment', {
            index: i,
            text: seg,
            audioUrl: mediaUrl(entry.urlPath, request.auth!, tokenSecret),
            durationMs,
            chars,
            cached: false,
          })
        } catch (err) {
          if (err instanceof TtsError) {
            send('error', { index: i, message: '这一段朗读没成功，可以跳过继续' })
            continue
          }
          throw err
        }
      }

      send('done', { chapterOrder: chapter.order, segments: segments.length })
      reply.raw.end()
    },
  )
}
