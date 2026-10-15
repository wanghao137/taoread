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
import { mediaUrl, verifyMediaTicket } from '../media/access'
import type { SessionGuard } from '../../lib/sessions'
import { LiveAudioStore } from './liveAudio'
import { requireAuth } from '../../modules/family/routes'
import { AppError, ForbiddenError, UnauthorizedError, ValidationError } from '../../lib/errors'
import { getChapter, assertContentReadable } from '../../content/service'
import { VOICE_PRESETS, findVoice, clampSpeed, DEFAULT_SPEED } from './voices'
import {
  chunkText,
  segmentOffsets,
  synthesizeSegment,
  synthesizeStream,
  TtsError,
  type TtsClientDeps,
} from './client'
import { TtsCache, cacheKey } from './cache'
import { PublicTtsIndex, TTS_PUBLIC_NS, type PublicSegmentHit } from './publicCache'
import { publicAudioBase } from '../../lib/publicMedia'
import { buildCharTimeline, timelineFromMp3, type CharTime } from './timeline'
import { chapterSpeakText, speakVoiceId } from './chapterText'

export interface TtsRoutesDeps {
  db: PrismaClient
  /** 公共预生成音频索引（media/.tts-public-state.json 惰性重载） */
  publicTts: PublicTtsIndex
  tokenSecret: Buffer
  /** stepaudio 客户端依赖；缺 base/key 时整个模块返回 503 */
  ttsDeps: TtsClientDeps | null
  /** 媒体目录（存音频缓存） */
  mediaDir: string
  /** A3：每家庭每日 TTS 段数上限（只计新合成；缺省 = genDailyLimit×10，下限 600） */
  ttsDailyLimit?: number
  sessionGuard?: SessionGuard
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
  const { db, tokenSecret, ttsDeps, mediaDir, publicTts } = deps
  const ttsDailyLimit = Math.max(600, deps.ttsDailyLimit ?? 600)
  const auth = requireAuth(tokenSecret)
  const cache = new TtsCache(mediaDir)
  const liveAudio = new LiveAudioStore()
  app.addHook('onClose', async () => liveAudio.close())

  app.get<{ Params: { id: string }; Querystring: { ticket?: string } }>('/api/media/tts-live/:id', async (request, reply) => {
    const ticket = request.query.ticket
    if (typeof ticket !== 'string' || !deps.sessionGuard) throw new UnauthorizedError()
    const claims = verifyMediaTicket(ticket, `tts-live/${request.params.id}`, tokenSecret)
    await deps.sessionGuard.assertActive(claims.fid, claims.sid, claims.role, claims.pv)
    const entry = liveAudio.get(request.params.id)
    if (!entry) return reply.code(404).send({ code: 'NOT_FOUND', message: '朗读已过期，请重新播放' })
    if (claims.fid !== entry.familyId || claims.sid !== entry.sessionId) throw new ForbiddenError()
    const stream = entry.open()
    if (!stream) return reply.code(410).send({ code: 'TTS_EXPIRED', message: '请重新播放' })
    reply.header('Content-Type', 'audio/mpeg')
      .header('Cache-Control', 'private, no-store, no-transform')
      .header('Accept-Ranges', 'none')
      .header('X-Accel-Buffering', 'no')
    reply.raw.once('close', () => stream.destroy())
    return reply.send(stream)
  })

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
    return reply.send({ voices, defaultSpeed: DEFAULT_SPEED, available: Boolean(ttsDeps) || await publicTts.hasAudio() })
  })

  // Download only existing public narrations; this endpoint never synthesizes or spends quota.
  app.get<{ Params: { id: string; order: string } }>('/api/tts/offline/:id/:order', { preHandler: auth }, async request => {
    const order = Number(request.params.order)
    if (!Number.isInteger(order) || order < 1 || request.params.id.startsWith('imp:')) throw new ValidationError('离线朗读仅支持公共书')
    await assertContentReadable(db, request.auth!.fid, request.params.id, { role: request.auth!.role })
    const book = await db.book.findUniqueOrThrow({ where: { id: request.params.id }, select: { lang: true, contentVersion: true } })
    const chapter = await getChapter(db, request.params.id, order)
    if (!chapter) throw new AppError('没有找到这一章', 'CHAPTER_NOT_FOUND', 404)
    const lang = book.lang === 'en' ? 'en' : 'zh'
    const chunks = chunkText(chapterSpeakText(chapter.blocks))
    const segments: Array<{ index: number; url: string; durationMs: number }> = []
    for (const [index, text] of chunks.entries()) {
      const key = cacheKey(text, speakVoiceId(lang), DEFAULT_SPEED, 'mp3', lang, TTS_PUBLIC_NS, ttsDeps?.model ?? process.env.TTS_MODEL ?? 'stepaudio-3-gen-preview')
      const hit = await publicTts.get(key)
      if (hit) segments.push({ index, url: hit.uploaded && publicAudioBase() ? `${publicAudioBase()}/tts-public/${key}.mp3` : `/api/media/tts-public/${key}.mp3`, durationMs: hit.durationMs })
    }
    return { segments, complete: segments.length === chunks.length && chunks.length > 0, missing: chunks.length - segments.length, contentVersion: book.contentVersion }
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
      // 2026-09-26 音色优化：未选音色时按语言取默认——英文试听用英语母播音色
      const voice = findVoice(body.voiceId ?? (body.lang === 'en' ? 'en-storyteller' : undefined))
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

      // A3：试听未命中缓存就是一次真实出网合成，与整章路径共用每日配额；
      // 缓存命中不计数（幂等命中不限制）。配额检查在合成前，防超限后仍出网计费。
      const dayStart = new Date()
      dayStart.setHours(0, 0, 0, 0)
      const usedToday = await db.ttsMediaOwner.count({
        where: { familyId: request.auth.fid, createdAt: { gte: dayStart } },
      })
      if (usedToday >= ttsDailyLimit) {
        throw new AppError('今天的朗读次数用完了，明天再来吧', 'TTS_QUOTA_EXCEEDED', 429)
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
          streamAudio: z.boolean().default(false),
        }),
        request.body ?? {},
      )

      let fullText: string
      let chapterTitle: string
      let lang: 'zh' | 'en'
      if (params.contentId.startsWith('imp:')) {
        // 家庭导入书（2026-09-27 解锁）：仅本家庭可读；正文剔除插图标记后走同一条合成管线
        const importedBook = await db.importedBook.findFirst({ where: { id: params.contentId, familyId: request.auth.fid }, select: { lang: true } })
        const importedChapter = importedBook
          ? await db.importedChapter.findUnique({ where: { bookId_order: { bookId: params.contentId, order: params.order } }, select: { title: true, text: true } })
          : null
        if (!importedChapter) throw new AppError('这一章还藏在云朵后面', 'CHAPTER_NOT_FOUND', 404)
        fullText = importedChapter.text.replace(/\[\[img:[^\]]+\]\]/g, '')
        chapterTitle = importedChapter.title
        lang = importedBook!.lang === 'en' ? 'en' : 'zh'
      } else {
        const chapter = await getChapter(db, params.contentId, params.order)
        if (!chapter) throw new AppError('这一章还藏在云朵后面', 'CHAPTER_NOT_FOUND', 404)
        // 审计 T03/F02：屏蔽书的整章 TTS 同策略拒绝（家长保留管理预览）
        await assertContentReadable(db, request.auth.fid, params.contentId, {
          role: request.auth.role,
          allowParentPreview: true,
        })
        // 审计 F16：语言从书目推导——英文书整章合成必须带 en，不再写死 zh
        const bookRow = await db.book.findUnique({ where: { id: params.contentId }, select: { lang: true } })
        lang = bookRow?.lang === 'en' ? 'en' : 'zh'
        // 拼接可朗读文本：键空间单一事实源（chapterText.ts）——只取 text+poem，
        // 与预生成/清理/覆盖率验收同源。生词卡（note）不入朗读文本（客户端兜底口径亦然）
        fullText = chapterSpeakText(chapter.blocks)
        chapterTitle = chapter.title
      }
      // 2026-09-26 音色优化：未选音色时按书语言取默认——英文书用英语母播音色，
      // 不再让中文「温柔妈妈」硬读英文（用户反馈怪腔调的主要来源）
      // 默认音色必须与预生成键空间同源（chapterText.speakVoiceId），否则公共缓存永不命中
      const voice = findVoice(body.voiceId ?? speakVoiceId(lang))
      const speed = clampSpeed(body.speed)
      const segments = chunkText(fullText)
      // Locate each segment in the actual source; hard cuts introduce no
      // newline, while omitted layout-only segments still occupy source space.
      const segmentStarts = segmentOffsets(fullText, segments)
      const model = ttsDeps?.model ?? process.env.TTS_MODEL ?? 'stepaudio-3-gen-preview'

      reply.raw.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      })

      // Cancel the provider HTTP request when SSE disconnects; billing follows provider policy.
      // Wait for drain when the SSE socket applies backpressure.
      let aborted = false
      const synthesis = new AbortController()
      reply.raw.once('close', () => {
        aborted = true
        synthesis.abort()
      })

      const send = async (event: string, data: unknown) => {
        if (aborted) return
        const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
        if (!reply.raw.write(payload)) {
          // socket 缓冲已满（慢客户端）：最多等 10s drain，超时按断开处理
          await new Promise<void>((resolve) => {
            const timer = setTimeout(resolve, 10_000)
            reply.raw.once('drain', () => {
              clearTimeout(timer)
              resolve()
            })
          })
        }
      }

      await send('meta', {
        chapterOrder: params.order,
        title: chapterTitle,
        voiceId: voice.id,
        speed,
        segmentCount: segments.length,
      })

      // 心跳：长段合成期间（可达 30-60s）线上链路（Cloudflare Tunnel/反代）会掐断
      // 空闲连接。每 5s 写一行 SSE 注释保活；客户端解析器对无 data 的事件直接跳过。
      const heartbeat = setInterval(() => {
        try {
          reply.raw.write(': hb\n\n')
        } catch {
          /* 连接已断：下一段写入时统一收尾 */
        }
      }, 5000)
      try {
        for (let i = 0; i < segments.length; i++) {
          if (aborted) break
        const seg = segments[i]
        if (!seg) continue
        // 公共预生成命中（2026-09-25 性能方案）：秒回、不计配额、不写归属。
        // 已上传 R2 → 外发域名；仅本地 → 源站公共分支兜底。
        const pubKey = cacheKey(seg, voice.id, speed, 'mp3', lang, TTS_PUBLIC_NS, model)
        const pub: PublicSegmentHit | null = await publicTts.get(pubKey)
        if (pub) {
          const base = publicAudioBase()
          const audioUrl =
            pub.uploaded && base
              ? `${base}/tts-public/${pubKey}.mp3`
              : `/api/media/tts-public/${pubKey}.mp3`
          await send('segment', {
            index: i,
            start: segmentStarts[i],
            text: seg,
            audioUrl,
            ...(pub.uploaded && base && await publicTts.hasLocalAudio(pubKey) ? { fallbackAudioUrl: `/api/media/tts-public/${pubKey}.mp3` } : {}),
            durationMs: pub.durationMs,
            chars: buildCharTimeline(seg, pub.durationMs),
            cached: true,
          })
          continue
        }
        const key = cacheKey(seg, voice.id, speed, 'mp3', lang, request.auth.fid, model)
        try {
          const hit = await cache.get(key, 'mp3')
          if (hit) {
            await ownAudio(hit.urlPath.slice('/api/media/'.length), request.auth.fid)
            await send('segment', {
              index: i,
              start: segmentStarts[i],
              text: seg,
              audioUrl: mediaUrl(hit.urlPath, request.auth!, tokenSecret),
              durationMs: hit.durationMs,
              chars: buildCharTimeline(seg, hit.durationMs),
              cached: true,
            })
            continue
          }
          if (!ttsDeps) {
            await send('error', { index: i, message: '这一段还没有缓存，先用浏览器语音哦' })
            break
          }
          // Only new synthesis spends quota; both public and family cache hits
          // remain available after the daily allowance has been exhausted.
          const dayStart = new Date()
          dayStart.setHours(0, 0, 0, 0)
          const usedToday = await db.ttsMediaOwner.count({
            where: { familyId: request.auth.fid, createdAt: { gte: dayStart } },
          })
          if (usedToday >= ttsDailyLimit) {
            await send('error', { index: i, message: '今天的朗读次数用完了，明天再来吧' })
            break
          }
          // Keep canonical segment/cache keys; only new clients opt into progressive media.
          const live = body.streamAudio && deps.sessionGuard ? liveAudio.create(request.auth.fid, request.auth.sid) : undefined
          let announced = false
          try {
          const out = await synthesizeStream(
            ttsDeps,
            { text: seg, voice, speed, lang, format: 'mp3' },
            async chunk => {
              live?.append(chunk)
              if (live && !announced && chunk.length) {
                announced = true
                await send('segment', {
                  index: i, start: segmentStarts[i], text: seg,
                  audioUrl: mediaUrl(`/api/media/tts-live/${live.id}`, request.auth!, tokenSecret),
                  durationMs: 0, chars: [], cached: false,
                })
              }
            },
            synthesis.signal,
          )
          if (aborted) { live?.dispose(); break }
          const { durationMs, chars } = timelineFromMp3(seg, out.audio)
          const entry = await cache.set(key, 'mp3', out.audio, durationMs)
          await ownAudio(entry.urlPath.slice('/api/media/'.length), request.auth.fid)
          live?.complete()
          await send(announced ? 'segment-update' : 'segment', {
            index: i,
            start: segmentStarts[i],
            text: seg,
            audioUrl: mediaUrl(entry.urlPath, request.auth!, tokenSecret),
            durationMs,
            chars,
            cached: false,
          })
          } catch (error) { live?.dispose(); throw error }
        } catch (err) {
          if (aborted) break
          if (err instanceof TtsError) {
            await send('error', { index: i, message: '这一段朗读没成功，可以跳过继续' })
            continue
          }
          throw err
        }
        }
      } finally {
        clearInterval(heartbeat)
      }

      await send('done', { chapterOrder: params.order, segments: segments.length })
      reply.raw.end()
    },
  )
}
