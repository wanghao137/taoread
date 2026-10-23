import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomBytes } from 'node:crypto'
import { LiveAudioStore } from '../src/modules/tts/liveAudio'
import { synthesizeStream } from '../src/modules/tts/client'
import { findVoice } from '../src/modules/tts/voices'
import { mediaUrl } from '../src/modules/media/access'
import { verifyToken } from '../src/lib/auth'
import { createFamilyAsParent, joinFamily, makeApp, tokenSecret, type TestHarness } from './helper'

describe('bounded progressive audio', () => {
  it('replays existing bytes and waits for new data without duplicating synthesis', async () => {
    const store = new LiveAudioStore(1, 1000, 8)
    try {
      const entry = store.create('family', 'session')!
      expect(store.create('other', 'other')).toBeUndefined()
      entry.append(Buffer.from('one'))
      const stream = entry.open()!
      const first = stream[Symbol.asyncIterator]()
      expect((await first.next()).value.toString()).toBe('one')
      entry.append(Buffer.from('two'))
      entry.complete()
      expect((await first.next()).value.toString()).toBe('two')
      expect((await first.next()).done).toBe(true)
      const replay: Buffer[] = []
      for await (const chunk of entry.open()!) replay.push(chunk)
      expect(Buffer.concat(replay).toString()).toBe('onetwo')
    } finally { store.close() }
  })

  it('rejects oversized buffers and destroys failed audio', () => {
    const store = new LiveAudioStore(1, 1000, 2)
    const entry = store.create('f', 's')!
    expect(() => entry.append(Buffer.from('large'))).toThrow()
    entry.dispose()
    expect(store.get(entry.id)).toBeUndefined()
    expect(entry.open()).toBeNull()
  })

  it('propagates consumer errors and cancels the provider response body', async () => {
    let cancelled = false
    const body = new ReadableStream({
      start(c) { c.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: 'speech.audio.delta', audio: 'YQ==' })}\n\n`)) },
      cancel() { cancelled = true },
    })
    await expect(synthesizeStream({ base: 'https://example.test', apiKey: 'test', model: 'test', fetch: async () => new Response(body) },
      { text: '原创', voice: findVoice(undefined), speed: 1, lang: 'zh' }, () => { throw Error('consumer stopped') })).rejects.toThrow('consumer stopped')
    expect(cancelled).toBe(true)
  })
})

describe('progressive chapter HTTP authorization and cancellation', () => {
  let h: TestHarness
  let origin: string
  let family: Awaited<ReturnType<typeof createFamilyAsParent>>
  let calls = 0
  let release: () => void
  let providerAborted = false
  let autoComplete = false
  const bytes = Buffer.from('test-audio-'.repeat(500))
  const openResponses = new Map<import('node:http').ServerResponse, string>()

  beforeAll(async () => {
    const mediaDir = await mkdtemp(join(tmpdir(), 'taoread-live-test-'))
    h = await makeApp(undefined, { mediaDir, ttsDeps: {
      base: 'https://example.test', apiKey: 'test-only', model: 'live-test',
      fetch: async (_input, init) => {
        calls += 1
        providerAborted = false
        const delta = () => new TextEncoder().encode(`data: ${JSON.stringify({ type: 'speech.audio.delta', audio: bytes.toString('base64') })}\n\n`)
        return new Response(new ReadableStream({ start(c) {
          let closed = false
          c.enqueue(delta())
          release = () => { if (!closed) { closed = true; c.enqueue(delta()); c.close() } }
          init?.signal?.addEventListener('abort', () => { providerAborted = true; if (!closed) { closed = true; c.error(new DOMException('Cancelled', 'AbortError')) } }, { once: true })
          if (autoComplete) queueMicrotask(release)
        } }), { headers: { 'Content-Type': 'text/event-stream' } })
      },
    } })
    h.app.addHook('onRequest', (req, reply, done) => {
      openResponses.set(reply.raw, req.url.split('?')[0]!)
      reply.raw.once('close', () => openResponses.delete(reply.raw))
      done()
    })
    origin = await h.app.listen({ port: 0, host: '127.0.0.1' })
    family = await createFamilyAsParent(h.app, 'progressive-test')
  })
  afterAll(async () => {
    expect(openResponses.size).toBe(0)
    // Real fetch tests leave Undici keepalive sockets; all responses above are closed.
    h.app.server.closeAllConnections()
    await h.app.close()
    await h.db.$disconnect()
  })

  async function chapter() {
    const id = `imp:${randomBytes(14).toString('hex')}`
    await h.db.importedBook.create({ data: { id, familyId: family.familyId, title: 'Synthetic test', lang: 'zh', ageStage: '3-5', sourceName: 'test', sha256: id,
      chapters: { create: { order: 1, title: 'Synthetic', text: `原创测试${id}。` } } } })
    return `/api/tts/chapter/${id}/1`
  }

  function events(reader: ReadableStreamDefaultReader<Uint8Array>) {
    let pending = ''
    return async () => {
      for (;;) {
        const end = pending.indexOf('\n\n')
        if (end >= 0) {
          const raw = pending.slice(0, end); pending = pending.slice(end + 2)
          if (!raw.startsWith('event:')) continue
          return { name: raw.split('\n')[0]!.slice(7), data: JSON.parse(raw.split('\ndata: ')[1]!) }
        }
        const next = await reader.read()
        if (next.done) throw Error('unexpected EOF')
        pending += new TextDecoder().decode(next.value)
      }
    }
  }

  it('plays before provider completion; rejects invalid, cross-family and revoked tickets; cache replay makes no provider call', async () => {
    autoComplete = false
    const url = await chapter()
    const res = await fetch(origin + url, { method: 'POST', headers: { authorization: `Bearer ${family.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ streamAudio: true }) })
    const reader = res.body!.getReader(), next = events(reader)
    expect((await next()).name).toBe('meta')
    const segment = await next()
    expect(segment.name).toBe('segment')
    const path = segment.data.audioUrl.split('?')[0]
    expect((await fetch(origin + path)).status).toBe(401)
    const other = await createFamilyAsParent(h.app, 'other-live-test')
    const otherClaims = verifyToken(other.token, tokenSecret)
    expect((await fetch(origin + mediaUrl(path, otherClaims, tokenSecret))).status).toBe(403)
    const audio = await fetch(origin + segment.data.audioUrl)
    expect(audio.headers.get('cache-control')).toContain('no-store')
    const audioReader = audio.body!.getReader()
    expect(Buffer.from((await audioReader.read()).value!).equals(bytes)).toBe(true)
    await audioReader.cancel()
    release()
    const update = await next()
    expect(update.name).toBe('segment-update')
    expect(update.data.index).toBe(segment.data.index)
    expect(update.data.audioUrl).toContain('/api/media/tts/')
    expect((await next()).name).toBe('done')
    await reader.cancel()
    const before = calls
    const replay = await h.app.inject({ method: 'POST', url, headers: { authorization: `Bearer ${family.token}` }, payload: { streamAudio: true } })
    expect(replay.body).toContain('"cached":true')
    expect(replay.body).not.toContain('/tts-live/')
    expect(calls).toBe(before)
    const claims = verifyToken(family.token, tokenSecret)
    const secondParent = await joinFamily(h.app, family.familyCode, 'parent', 'second-live-parent')
    const revoked = await h.app.inject({ method: 'POST', url: `/api/family/${family.familyId}/sessions/${claims.sid}/revoke`, headers: { authorization: `Bearer ${secondParent.token}` } })
    expect(revoked.statusCode).toBe(200)
    expect((await fetch(origin + segment.data.audioUrl)).status).toBe(401)
    family = await createFamilyAsParent(h.app, 'live-after-revoke')
  })

  it('aborting SSE cancels provider and does not cache partial audio', async () => {
    autoComplete = false
    const url = await chapter(), abort = new AbortController()
    const before = await h.db.ttsMediaOwner.count({ where: { familyId: family.familyId } })
    const res = await fetch(origin + url, { method: 'POST', headers: { authorization: `Bearer ${family.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ streamAudio: true }), signal: abort.signal })
    const next = events(res.body!.getReader())
    await next(); expect((await next()).name).toBe('segment')
    abort.abort()
    await vi.waitFor(() => expect(providerAborted).toBe(true))
    expect(await h.db.ttsMediaOwner.count({ where: { familyId: family.familyId } })).toBe(before)
  })

  it('legacy requests still receive exactly one completed segment', async () => {
    autoComplete = true
    const response = await h.app.inject({ method: 'POST', url: await chapter(), headers: { authorization: `Bearer ${family.token}` }, payload: {} })
    expect(response.statusCode).toBe(200)
    expect(response.body.match(/event: segment\n/g)).toHaveLength(1)
    expect(response.body).not.toContain('segment-update')
    expect(response.body).not.toContain('tts-live')
  })

  it('preserves CORS and security headers for APK-origin cold and cached chapter streams', async () => {
    autoComplete = true
    const url = await chapter()
    const headers = { authorization: `Bearer ${family.token}`, origin: 'https://localhost' }
    const preflight = await h.app.inject({ method: 'OPTIONS', url, headers: {
      origin: headers.origin, 'access-control-request-method': 'POST',
      'access-control-request-headers': 'authorization,content-type',
    } })
    expect(preflight.statusCode).toBe(204)
    expect(preflight.headers['access-control-allow-origin']).toBe(headers.origin)
    for (const cached of [false, true]) {
      const response = await h.app.inject({ method: 'POST', url, headers, payload: { streamAudio: true } })
      expect(response.headers['access-control-allow-origin']).toBe(headers.origin)
      expect(response.headers['x-content-type-options']).toBe('nosniff')
      expect(response.headers['vary']).toContain('Origin')
      expect(response.body).toContain(`"cached":${cached}`)
      expect(response.body).toContain('event: done')
    }
  })
})
