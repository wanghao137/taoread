import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { makeApp, createFamilyAsParent, createChild, authHeaders, joinFamily, type TestHarness } from './helper'
import { seedPack } from '../src/content/seed'
import { cacheKey, TtsCache } from '../src/modules/tts/cache'
import { TTS_PUBLIC_NS } from '../src/modules/tts/publicCache'
import { DEFAULT_SPEED } from '../src/modules/tts/voices'
import { speakVoiceId } from '../src/modules/tts/chapterText'
import type { PackBook } from '../src/content/types'

const text = '小兔翻开书，朋友在桥边等她。'
const pack: PackBook = { id: 'reader-perf', title: '阅读性能隔离书', lang: 'zh', category: 'story', ageStage: '3-5', coverArt: 'test', source: 'Synthetic test', rights: { workTitle: '阅读性能隔离书', basis: 'original', jurisdiction: 'CN' }, chapters: [{ title: '一章', blocks: [{ kind: 'text', text }] }, { title: '二章', blocks: [{ kind: 'text', text: '下一章。' }] }] }
const model = process.env.TTS_MODEL ?? 'stepaudio-3-gen-preview'

describe('阅读深链与缓存首音频', () => {
  let h: TestHarness
  let media: string
  let parent: Awaited<ReturnType<typeof createFamilyAsParent>>
  let child: string
  let childToken: string
  const chapter = (token: string, order = 1) => h.app.inject({ method: 'POST', url: `/api/tts/chapter/${pack.id}/${order}`, headers: authHeaders(token), payload: {} })
  beforeAll(async () => {
    media = await mkdtemp(join(tmpdir(), 'taoread-r24-test-'))
    const key = cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', TTS_PUBLIC_NS, model)
    await mkdir(join(media, 'tts-public'))
    await writeFile(join(media, 'tts-public', `${key}.mp3`), 'test-audio')
    await writeFile(join(media, '.tts-public-state.json'), JSON.stringify({ [key]: { bytes: 10, durationMs: 1500, uploaded: false } }))
    h = await makeApp(undefined, { mediaDir: media, ttsDeps: null })
    await seedPack(h.db, pack)
    parent = await createFamilyAsParent(h.app)
    child = await createChild(h.app, parent.token, parent.familyId)
    childToken = (await joinFamily(h.app, parent.familyCode, 'child')).token
  }, 60000)
  afterAll(async () => { await h?.app.close(); await h?.db.$disconnect(); if (media) await rm(media, { recursive: true, force: true }) })

  it('单书详情保留孩子的进度、收藏和当前内容版本，拒绝跨家庭档案', async () => {
    const row = await h.db.book.findUniqueOrThrow({ where: { id: pack.id } })
    await h.db.readingProgress.create({ data: { childId: child, bookId: pack.id, chapterOrder: 1, blockOrder: 0, contentVersion: row.contentVersion } })
    await h.db.bookFavorite.create({ data: { childId: child, bookId: pack.id } })
    const detail = await h.app.inject({ method: 'GET', url: `/api/content/books/${pack.id}?childId=${child}`, headers: authHeaders(childToken) })
    expect(detail.statusCode).toBe(200)
    expect(detail.json().book).toMatchObject({ progress: 50, resumeChapter: 1, favorite: true, contentVersion: row.contentVersion, finished: false })
    expect(detail.json().book.lastReadAt).toBeTruthy()
    const other = await createFamilyAsParent(h.app, 'r24-other')
    const denied = await h.app.inject({ method: 'GET', url: `/api/content/books/${pack.id}?childId=${child}`, headers: authHeaders(other.token) })
    expect(denied.statusCode).toBe(404)
  })

  it('无合成配置仍能通过鉴权和章节 SSE 命中公共缓存，且不写家庭配额', async () => {
    const voices = await h.app.inject({ method: 'GET', url: '/api/tts/voices', headers: authHeaders(childToken) })
    expect(voices.json().available).toBe(true)
    const result = await chapter(childToken)
    expect(result.statusCode).toBe(200)
    expect(result.body).toContain('event: segment')
    expect(result.body).toContain('"cached":true')
    expect(result.body).toContain('/api/media/tts-public/')
    expect(result.body).toContain('event: done')
    expect(await h.db.ttsMediaOwner.count({ where: { familyId: parent.familyId } })).toBe(0)
    expect((await chapter('invalid')).statusCode).toBe(401)
  })

  it('无合成配置且无缓存时明确结束，不返回不可播放的音频地址', async () => {
    const result = await chapter(childToken, 2)
    expect(result.body).toContain('event: error')
    expect(result.body).toContain('event: done')
    expect(result.body).not.toContain('event: segment')
  })

  it('家庭缓存已命中时不受新合成配额影响，也不依赖合成配置', async () => {
    const key = cacheKey('下一章。', speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', parent.familyId, model)
    await new TtsCache(media).set(key, 'mp3', Buffer.from('test-private-audio'), 1000)
    await h.db.ttsMediaOwner.createMany({ data: Array.from({ length: 600 }, (_, i) => ({ path: `tts/r24-${parent.familyId}-${i}.mp3`, familyId: parent.familyId })) })
    const result = await chapter(childToken, 2)
    expect(result.body).toContain('event: segment')
    expect(result.body).toContain('"cached":true')
    expect(result.body).not.toContain('event: error')
  })

  it('缓存命中仍拒绝已屏蔽的书，家长管理预览保留', async () => {
    await h.app.inject({ method: 'PUT', url: `/api/content/books/${pack.id}/blocked`, headers: authHeaders(parent.token), payload: { blocked: true } })
    expect((await chapter(childToken)).statusCode).toBe(403)
    expect((await chapter(parent.token)).body).toContain('event: segment')
  })

  it('CDN 命中只为实际存在的本地公共副本提供兜底地址', async () => {
    const oldBase = process.env.TAO_TTS_PUBLIC_BASE
    process.env.TAO_TTS_PUBLIC_BASE = 'https://audio.example.test'
    try {
      const key = cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', TTS_PUBLIC_NS, model)
      const missing = cacheKey('下一章。', speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', TTS_PUBLIC_NS, model)
      await writeFile(join(media, '.tts-public-state.json'), JSON.stringify({
        [key]: { bytes: 10, durationMs: 1500, uploaded: true },
        [missing]: { bytes: 10, durationMs: 1500, uploaded: true },
      }))
      const hit = await chapter(parent.token)
      expect(hit.body).toContain('"fallbackAudioUrl":"/api/media/tts-public/')
      const absent = await chapter(parent.token, 2)
      expect(absent.body).toContain('https://audio.example.test/tts-public/')
      expect(absent.body).not.toContain('fallbackAudioUrl')
    } finally {
      if (oldBase === undefined) delete process.env.TAO_TTS_PUBLIC_BASE
      else process.env.TAO_TTS_PUBLIC_BASE = oldBase
    }
  })

  it('补充提供商音频在章节、离线下载和实际媒体请求中使用同一文件', async () => {
    await h.app.inject({ method: 'PUT', url: `/api/content/books/${pack.id}/blocked`, headers: authHeaders(parent.token), payload: { blocked: false } })
    const key = cacheKey(text, speakVoiceId('zh'), DEFAULT_SPEED, 'mp3', 'zh', TTS_PUBLIC_NS, model)
    const actual = 'b'.repeat(64)
    await writeFile(join(media, 'tts-public', `${actual}.mp3`), 'replacement-audio')
    await writeFile(join(media, '.tts-public-state.json'), JSON.stringify({
      [key]: { bytes: 17, durationMs: 2200, uploaded: false, audioKey: actual, model: 'mimo-v2.5-tts' },
    }))
    const result = await chapter(parent.token)
    expect(result.body).toContain(`"audioUrl":"/api/media/tts-public/${actual}.mp3"`)
    expect(result.body).not.toContain(`${key}.mp3`)
    const offline = await h.app.inject({ method: 'GET', url: `/api/tts/offline/${pack.id}/1`, headers: authHeaders(parent.token) })
    expect(offline.json()).toMatchObject({ complete: true, missing: 0, segments: [{ index: 0, url: `/api/media/tts-public/${actual}.mp3`, durationMs: 2200 }] })
    const audio = await h.app.inject({ method: 'GET', url: offline.json().segments[0].url })
    expect(audio.statusCode).toBe(200)
    expect(audio.body).toBe('replacement-audio')
  })
})
