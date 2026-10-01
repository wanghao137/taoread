/**
 * docs/35 升级迭代专项测试（2026-10-01）：
 *   B1 gzip（JSON 压缩 / 媒体流豁免）
 *   B4 ETag + 304 短路 + Cache-Control
 *   A1 块级 artReaderUrl 契约
 *   B3 目录缓存 + seedPack 失效钩子
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import type { FastifyInstance } from 'fastify'
import type { PrismaClient } from '@prisma/client'
import {
  makeApp,
  createChild,
  authHeaders,
  createFamilyAsParent,
} from './helper'
import { seedPack } from '../src/content/seed'
import { getChapter, invalidateBookCatalog, listBooks } from '../src/content/service'

let app: FastifyInstance
let db: PrismaClient
let token: string
let familyId: string
let childId: string
let mediaDir: string

const GZIP = { 'accept-encoding': 'gzip, deflate' }

/** 探针书：长 intro 保证书架 JSON >1KB 压缩阈值；带 art 键的 image 块验 A1 */
const PROBE = {
  id: 'docs35-probe',
  title: 'docs35 性能探针书',
  author: '探针',
  lang: 'zh' as const,
  category: 'story' as const,
  ageStage: '6-8' as const,
  intro: '探针简介。'.repeat(120),
  coverArt: 'docs35-scene',
  coverFrom: '#ffd84d',
  coverTo: '#ff8e75',
  source: 'test',
  rights: { workTitle: 'docs35 性能探针书', jurisdiction: 'CN' as const, basis: 'original' as const },
  chapters: [
    {
      title: '第一章 探针',
      art: 'docs35-scene',
      blocks: [
        { kind: 'image' as const, text: '探针插图', art: 'docs35-scene' },
        { kind: 'text' as const, text: '探针正文，月亮升起来了。' },
      ],
    },
    { title: '第二章 探针', blocks: [{ kind: 'text' as const, text: '第二章正文。' }] },
  ],
}

beforeAll(async () => {
  mediaDir = join(tmpdir(), `taoread-docs35-${Date.now()}`)
  mkdirSync(join(mediaDir, 'art'), { recursive: true })
  // 假 webp（内容无关紧要，验证的是 Content-Type 驱动的压缩豁免）+ 对应 ArtAsset 行
  writeFileSync(join(mediaDir, 'art/docs35-scene.webp'), Buffer.from([0x52, 0x49, 0x46, 0x46, 1, 2, 3, 4]))
  const h = await makeApp(undefined, { mediaDir })
  app = h.app
  db = h.db
  await db.artAsset.upsert({
    where: { scene: 'docs35-scene' },
    create: {
      scene: 'docs35-scene',
      kind: 'chapter',
      urlPath: '/api/media/art/docs35-scene.webp',
      width: 1536,
      height: 864,
      bytes: 8,
      prompt: 'probe',
      model: 'probe',
    },
    update: { urlPath: '/api/media/art/docs35-scene.webp' },
  })
  await seedPack(db, PROBE)
  const parent = await createFamilyAsParent(app)
  token = parent.token
  familyId = parent.familyId
  childId = await createChild(app, token, familyId, '小测', '6-8')
})

afterAll(async () => {
  rmSync(mediaDir, { recursive: true, force: true })
})

describe('B1 gzip 压缩', () => {
  it('书架 JSON 带 accept-encoding 时 gzip 压缩回包', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: { ...authHeaders(token), ...GZIP },
    })
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-encoding']).toBe('gzip')
  })

  it('不带 accept-encoding 时不压缩（旧客户端行为不变）', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-encoding']).toBeUndefined()
  })

  it('媒体 webp 豁免压缩（mime 不可压缩；Range/流式安全）', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/media/art/docs35-scene.webp',
      headers: { ...authHeaders(token), ...GZIP },
    })
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toContain('image/webp')
    expect(res.headers['content-encoding']).toBeUndefined()
  })
})

describe('B4 ETag 协商', () => {
  it('回 ETag + Cache-Control；If-None-Match 命中 304；进度变化后失效', async () => {
    const first = await app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: authHeaders(token),
    })
    expect(first.statusCode).toBe(200)
    expect(first.headers['cache-control']).toContain('private')
    const etag = first.headers.etag as string
    expect(etag).toMatch(/^W\//)

    const second = await app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: { ...authHeaders(token), 'if-none-match': etag },
    })
    expect(second.statusCode).toBe(304)
    expect(second.headers.etag).toBe(etag)

    // 进度变化 → 指纹变 → 不再 304
    await db.readingProgress.create({
      data: { childId, bookId: PROBE.id, chapterOrder: 2, blockOrder: 0 },
    })
    const third = await app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: { ...authHeaders(token), 'if-none-match': etag },
    })
    expect(third.statusCode).toBe(200)

    // 对抗审查 P0-1 回归：同长度变化（updatedAt 前移，ISO 定长）不得 304；
    // 收藏翻转（不进 lastReadAt）也必须击穿缓存
    const etag2 = third.headers.etag as string
    await db.readingProgress.updateMany({
      where: { childId, bookId: PROBE.id },
      data: { updatedAt: new Date(Date.now() + 5000) },
    })
    const fourth = await app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: { ...authHeaders(token), 'if-none-match': etag2 },
    })
    expect(fourth.statusCode).toBe(200)

    const etag3 = fourth.headers.etag as string
    await db.bookFavorite.create({ data: { childId, bookId: PROBE.id } })
    const fifth = await app.inject({
      method: 'GET',
      url: `/api/content/books?childId=${childId}`,
      headers: { ...authHeaders(token), 'if-none-match': etag3 },
    })
    expect(fifth.statusCode).toBe(200)
  })
})

describe('A1 块级 artReaderUrl 契约', () => {
  it('有场景键的图片块返回 reader 变体路径；无场景键为 null', async () => {
    const chapter = await getChapter(db, PROBE.id, 1)
    expect(chapter).not.toBeNull()
    const imgBlock = chapter!.blocks.find((b) => b.kind === 'image' && b.art)
    expect(imgBlock).toBeDefined()
    // 测试环境未配 TAO_MEDIA_PUBLIC_BASE → 回落 /api/media 相对路径，但变体后缀必须存在
    expect(imgBlock!.artReaderUrl).toMatch(/\.reader\.webp$/)
    expect(chapter!.blocks.find((b) => b.kind === 'text')?.artReaderUrl ?? null).toBeNull()
  })
})

describe('B3 目录缓存', () => {
  it('目录缓存命中后 seedPack 更新立即可见（失效钩子生效，无 TTL 陈旧窗口）', async () => {
    // 先预热缓存
    expect((await listBooks(db, { familyId, childId })).find((b) => b.id === PROBE.id)).toBeDefined()
    // 更新书名（upsert 同 id）——缓存若未失效将读到旧标题
    await seedPack(db, { ...PROBE, title: 'docs35 性能探针书·改名' })
    const books = await listBooks(db, { familyId, childId })
    const hit = books.find((b) => b.id === PROBE.id)
    expect(hit!.title).toBe('docs35 性能探针书·改名')
    // 显式失效幂等无害
    invalidateBookCatalog()
    expect((await listBooks(db, { familyId, childId })).find((b) => b.id === PROBE.id)).toBeDefined()
  })
})
