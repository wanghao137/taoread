/**
 * 媒体静态服务（docs/13 P0-A/P0-B/P0-E）：
 *   GET /api/media/tts/<key>.mp3       TTS 音频缓存
 *   GET /api/media/art/<key>.webp      AI 生成的插画（封面/章节题图）
 *   GET /api/media/videos/<id>.mp4     AI 生成的章节动画
 *
 * 这些文件不入库（只在磁盘），key 是内容哈希，无家庭归属。
 * 不做鉴权：内容是公版书朗读与生成插画，不含家庭私有数据。
 * 长缓存：key 即内容， immutable。
 */
import type { FastifyInstance } from 'fastify'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join, normalize } from 'node:path'

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
}

export function registerMediaRoutes(app: FastifyInstance, deps: MediaRoutesDeps): void {
  app.get<{ Params: { '*': string } }>(
    '/api/media/*',
    async (request, reply) => {
      const raw = request.params['*']
      // 防穿越：归一化后必须还在 mediaDir 下
      const safe = normalize(raw).replace(/^(\.\.[/\\])+/, '')
      const abs = join(deps.mediaDir, safe)
      if (!abs.startsWith(normalize(deps.mediaDir))) {
        return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      }
      try {
        const st = await stat(abs)
        if (!st.isFile()) return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      } catch {
        return reply.code(404).send({ code: 'NOT_FOUND', message: '媒体不存在' })
      }
      const ext = abs.slice(abs.lastIndexOf('.')).toLowerCase()
      const mime = MIME[ext] ?? 'application/octet-stream'
      reply.header('Content-Type', mime)
      // key 即内容哈希：可以永久缓存
      reply.header('Cache-Control', 'public, max-age=31536000, immutable')
      return reply.send(createReadStream(abs))
    },
  )
}
