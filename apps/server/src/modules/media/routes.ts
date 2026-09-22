/**
 * 媒体静态服务（docs/13 P0-A/P0-B/P0-E）：
 *   GET /api/media/tts/<key>.mp3       TTS 音频缓存
 *   GET /api/media/art/<key>.webp      AI 生成的插画（封面/章节题图）
 *   GET /api/media/videos/<id>.mp4     AI 生成的章节动画
 *
 * 这些文件不入库（只在磁盘），key 是内容哈希，无家庭归属。
 * 不做鉴权：内容是公版书朗读与生成插画，不含家庭私有数据。
 * 长缓存：key 即内容， immutable。
 * 路径边界（审计 T03/F08）：realpath 解析符号链接后必须仍在媒体根目录内；
 * 扩展名白名单限制可服务类型；支持 Range（音频/视频拖动进度条）。
 */
import type { FastifyInstance } from 'fastify'
import { createReadStream } from 'node:fs'
import { realpath, stat } from 'node:fs/promises'
import { join, normalize, sep } from 'node:path'

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
  const rootReal = realpath(deps.mediaDir).catch(() => normalize(deps.mediaDir))

  app.get<{ Params: { '*': string } }>(
    '/api/media/*',
    async (request, reply) => {
      const raw = request.params['*']
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
      // key 即内容哈希：可以永久缓存
      reply.header('Cache-Control', 'public, max-age=31536000, immutable')
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
