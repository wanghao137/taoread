/**
 * 媒体静态服务（docs/13 P0-A/P0-B/P0-E）：
 *   GET /api/media/tts/<key>.mp3       TTS 音频缓存
 *   GET /api/media/art/<key>.webp      AI 生成的插画（封面/章节题图）
 *   GET /api/media/videos/<id>.mp4     AI 生成的章节动画
 *
 * 文件在磁盘；TTS/家庭素材用会话令牌校验归属，公版素材保持可公开读取。
 * 浏览器媒体标签使用短时路径限定票据；私有响应禁止缓存。
 * 路径边界（审计 T03/F08）：realpath 解析符号链接后必须仍在媒体根目录内；
 * 扩展名白名单限制可服务类型；支持 Range（音频/视频拖动进度条）。
 */
import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import { createReadStream } from 'node:fs'
import { realpath, stat } from 'node:fs/promises'
import { join, normalize, sep } from 'node:path'
import { verifyToken } from '../../lib/auth'
import type { SessionGuard } from '../../lib/sessions'
import { assertSceneReadable, verifyMediaTicket } from './access'
import { ForbiddenError, UnauthorizedError } from '../../lib/errors'

const MIME: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.json': 'application/json',
  // 浏览器 <video> 拿到 octet-stream 时会拒绝播放或触发下载，视频链路就废了
  '.mp4': 'video/mp4',
}

export interface MediaRoutesDeps {
  mediaDir: string
  db?: PrismaClient
  tokenSecret?: Buffer
  sessionGuard?: SessionGuard
}

export function registerMediaRoutes(app: FastifyInstance, deps: MediaRoutesDeps): void {
  const rootReal = realpath(deps.mediaDir).catch(() => normalize(deps.mediaDir))

  app.get<{ Params: { '*': string } }>(
    '/api/media/*',
    async (request, reply) => {
      const raw = request.params['*']
      const path = normalize(raw).replaceAll('\\', '/')
      if (raw.includes('\\') || raw.includes('..') || raw !== path || path.startsWith('/')) {
        return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      }
      let rowIsPrivate = false
      async function authorize(familyId: string): Promise<void> {
        const header = request.headers.authorization
        let claims: { fid: string; sid: string }
        if (header?.startsWith('Bearer ')) {
          claims = verifyToken(header.slice(7).trim(), deps.tokenSecret!)
        } else {
          const ticket = (request.query as { ticket?: unknown }).ticket
          if (typeof ticket !== 'string') throw new UnauthorizedError()
          claims = verifyMediaTicket(ticket, path, deps.tokenSecret!)
        }
        if (claims.fid !== familyId) throw new ForbiddenError('不能访问其他家庭的素材')
        await deps.sessionGuard!.assertActive(claims.fid, claims.sid)
      }
      if (deps.db && path.startsWith('tts/')) {
        rowIsPrivate = true
        const row = await deps.db.ttsMediaOwner.findUnique({ where: { path }, select: { familyId: true } })
        if (!row) throw new ForbiddenError('没有可访问的音频记录')
        await authorize(row.familyId)
      } else if (deps.db && (path.startsWith('art/') || path.startsWith('videos/'))) {
        const urlPath = `/api/media/${path}`
        const row = path.startsWith('art/')
          ? await deps.db.artAsset.findFirst({ where: { urlPath }, select: { scene: true } })
          : await deps.db.videoAsset.findFirst({ where: { urlPath }, select: { scene: true } })
        if (!row) throw new ForbiddenError('没有可访问的素材记录')
        if (row.scene.startsWith('fam:')) {
          rowIsPrivate = true
          const familyId = row.scene.slice(4).split(':')[0]!
          await authorize(familyId)
          assertSceneReadable(familyId, row.scene)
        }
      } else if (deps.db) {
        throw new ForbiddenError('不能访问此文件')
      }
      // 防穿越第一层：归一化 + 去掉前导 ..
      const safe = normalize(raw).replace(/^(\.\.[/\\])+/, '')
      const abs = join(deps.mediaDir, safe)
      // 防穿越第二层（审计 F08）：realpath 解析符号链接后必须仍在媒体根目录内，
      // 字符串前缀比较可被符号链接绕过
      let real: string
      try {
        real = await realpath(abs)
      } catch {
        return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      }
      const root = await rootReal
      if (real !== root && !real.startsWith(root + sep)) {
        return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      }
      const st = await stat(real).catch(() => null)
      if (!st || !st.isFile()) return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      const ext = real.slice(real.lastIndexOf('.')).toLowerCase()
      const mime = MIME[ext]
      // 扩展名白名单：不在表内的类型一律 404，不给任意文件当下载源
      if (!mime) return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      reply.header('Content-Type', mime)
      // 公共素材可长期缓存；家庭素材与 TTS 明确禁止缓存。
      reply.header('Referrer-Policy', 'no-referrer')
      reply.header('Cache-Control', deps.db && rowIsPrivate ? 'private, no-store' : 'public, max-age=31536000, immutable')
      reply.header('Accept-Ranges', 'bytes')

      // Range（审计 F08）：音频/视频拖动进度条需要 206 分段
      const range = request.headers.range
      if (range) {
        const m = /^bytes=(\d*)-(\d*)$/.exec(range)
        if (m && (m[1] || m[2])) {
          let start: number
          let end: number
          if (m[1] === '') {
            // 后缀范围：bytes=-N 取末 N 字节
            const suffix = Number(m[2])
            start = Math.max(0, st.size - suffix)
            end = st.size - 1
          } else {
            start = Number(m[1])
            end = m[2] === '' ? st.size - 1 : Math.min(Number(m[2]), st.size - 1)
          }
          if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= st.size) {
            reply.header('Content-Range', `bytes */${st.size}`)
            return reply.code(416).send()
          }
          reply.header('Content-Range', `bytes ${start}-${end}/${st.size}`)
          reply.header('Content-Length', String(end - start + 1))
          reply.code(206)
          return reply.send(createReadStream(real, { start, end }))
        }
      }

      reply.header('Content-Length', String(st.size))
      return reply.send(createReadStream(real))
    },
  )
}
