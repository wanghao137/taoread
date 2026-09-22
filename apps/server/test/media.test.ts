/**
 * 媒体静态服务单测（docs/14 §2.1 MIME 修复回归）。
 *
 * 起因：MIME 表曾缺 .mp4，AI 生成的章节动画会以 octet-stream 下发，
 * 浏览器 <video> 拒播或触发下载——视频链路唯一跑通的那一次就翻车。
 * 这里锁定「各扩展名 → 正确 content-type」与路径穿越防护。
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { FastifyInstance } from 'fastify'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { registerMediaRoutes } from '../src/modules/media/routes'

const MEDIA_DIR = join(tmpdir(), `taoread-media-test-${Date.now()}`)

describe('媒体静态服务', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    const Fastify = (await import('fastify')).default
    app = Fastify()
    registerMediaRoutes(app, { mediaDir: MEDIA_DIR })
    await app.ready()
    await mkdir(join(MEDIA_DIR, 'videos'), { recursive: true })
    await mkdir(join(MEDIA_DIR, 'art'), { recursive: true })
    await mkdir(join(MEDIA_DIR, 'tts'), { recursive: true })
    await writeFile(join(MEDIA_DIR, 'videos', 'task_abc.mp4'), Buffer.from('fake mp4 body'))
    await writeFile(join(MEDIA_DIR, 'art', 'scene1.webp'), Buffer.from('fake webp'))
    await writeFile(join(MEDIA_DIR, 'tts', 'hash123.mp3'), Buffer.from('fake mp3'))
  })

  afterAll(async () => {
    await app.close()
    await rm(MEDIA_DIR, { recursive: true, force: true })
  })

  it('mp4 以 video/mp4 下发（N12-003 回归：曾经缺失，浏览器拒播）', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/media/videos/task_abc.mp4' })
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toBe('video/mp4')
  })

  it('webp / mp3 各自正确的 MIME', async () => {
    const webp = await app.inject({ method: 'GET', url: '/api/media/art/scene1.webp' })
    expect(webp.headers['content-type']).toBe('image/webp')
    const mp3 = await app.inject({ method: 'GET', url: '/api/media/tts/hash123.mp3' })
    expect(mp3.headers['content-type']).toBe('audio/mpeg')
  })

  it('永久缓存头：key 即内容哈希', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/media/videos/task_abc.mp4' })
    expect(res.headers['cache-control']).toContain('immutable')
  })

  // 审计 T03/F08：扩展名白名单——不在表内的类型一律 404，不给任意文件当下载源
  it('未知扩展名直接 404（白名单外不服务）', async () => {
    await writeFile(join(MEDIA_DIR, 'art', 'weird.xyz'), Buffer.from('x'))
    const res = await app.inject({ method: 'GET', url: '/api/media/art/weird.xyz' })
    expect(res.statusCode).toBe(404)
  })

  it('Range 分段：视频拖动返回 206 与 Content-Range（F08）', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/media/videos/task_abc.mp4', headers: { range: 'bytes=0-3' } })
    expect(res.statusCode).toBe(206)
    expect(res.headers['content-range']).toContain('bytes 0-3/')
    expect(res.headers['accept-ranges']).toBe('bytes')
  })

  it('路径穿越被拦截（../ 逃不出 mediaDir）', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/media/../../etc/passwd' })
    expect(res.statusCode).toBe(404)
  })

  it('不存在的文件 404', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/media/art/nope.webp' })
    expect(res.statusCode).toBe(404)
  })
})
