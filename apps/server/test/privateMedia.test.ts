import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { authHeaders, createFamilyAsParent, makeApp, tokenSecret, type TestHarness } from './helper'
import { mediaUrl } from '../src/modules/media/access'
import { verifyToken } from '../src/lib/auth'

const fixtureId = `${process.pid}-${Date.now()}`
const mediaDir = join(tmpdir(), `taoread-private-media-${fixtureId}`)

describe('private media ownership and revocation', () => {
  let h: TestHarness
  let a: Awaited<ReturnType<typeof createFamilyAsParent>>
  let b: Awaited<ReturnType<typeof createFamilyAsParent>>
  const artPath = `/api/media/art/${fixtureId}-owned.webp`
  const publicPath = `/api/media/art/${fixtureId}-public.webp`
  const audioPath = `/api/media/tts/ab/${fixtureId}-owned.mp3`

  beforeAll(async () => {
    await mkdir(join(mediaDir, 'art'), { recursive: true })
    await mkdir(join(mediaDir, 'tts', 'ab'), { recursive: true })
    await writeFile(join(mediaDir, 'art', `${fixtureId}-owned.webp`), Buffer.from('private image'))
    await writeFile(join(mediaDir, 'art', `${fixtureId}-public.webp`), Buffer.from('public image'))
    await writeFile(join(mediaDir, 'tts', 'ab', `${fixtureId}-owned.mp3`), Buffer.from('private audio'))
    h = await makeApp(undefined, { mediaDir })
    await h.app.ready()
    a = await createFamilyAsParent(h.app, 'a')
    b = await createFamilyAsParent(h.app, 'b')
    await h.db.artAsset.create({ data: { scene: `fam:${a.familyId}:chapter:1`, kind: 'chapter', urlPath: artPath, width: 1, height: 1, bytes: 13, prompt: 'test', model: 'test' } })
    await h.db.artAsset.upsert({ where: { scene: `cover:private-media-fixture-${fixtureId}` }, create: { scene: `cover:private-media-fixture-${fixtureId}`, kind: 'cover', urlPath: publicPath, width: 1, height: 1, bytes: 12, prompt: 'test', model: 'test' }, update: { urlPath: publicPath } })
    await h.db.ttsMediaOwner.create({ data: { path: audioPath.slice('/api/media/'.length), familyId: a.familyId } })
  })

  afterAll(async () => {
    await h.db.ttsMediaOwner.deleteMany({ where: { path: audioPath.slice('/api/media/'.length) } })
    await h.db.artAsset.deleteMany({ where: { urlPath: { in: [artPath, publicPath] } } })
    await h.db.family.deleteMany({ where: { id: { in: [a.familyId, b.familyId] } } })
    await h.app.close()
    await rm(mediaDir, { recursive: true, force: true })
  })

  it('rejects cross-family scene reads and preserves public catalog reads', async () => {
    const scene = `fam:${a.familyId}:chapter:1`
    const other = await h.app.inject({ method: 'GET', url: `/api/art/${encodeURIComponent(scene)}`, headers: authHeaders(b.token) })
    expect(other.statusCode).toBe(403)
    const own = await h.app.inject({ method: 'GET', url: `/api/art/${encodeURIComponent(scene)}`, headers: authHeaders(a.token) })
    expect(own.statusCode).toBe(200)
    expect(own.json().urlPath).toContain('ticket=')
    expect(own.json().urlPath).not.toContain(a.token)
    const publicArt = await h.app.inject({ method: 'GET', url: `/api/art/cover%3Aprivate-media-fixture-${fixtureId}`, headers: authHeaders(b.token) })
    expect(publicArt.statusCode).toBe(200)
    expect(publicArt.json().urlPath).toBe(publicPath)
  })

  it('requires a file-scoped ticket or owner bearer, and rejects other-family bearer', async () => {
    const claims = verifyToken(a.token, tokenSecret)
    const ticket = mediaUrl(artPath, claims, tokenSecret)
    // Authorization is checked before reading the requested file.
    const unauth = await h.app.inject({ method: 'GET', url: artPath })
    expect(unauth.statusCode).toBe(401)
    const cross = await h.app.inject({ method: 'GET', url: artPath, headers: authHeaders(b.token) })
    expect(cross.statusCode).toBe(403)
    const wrongPath = await h.app.inject({ method: 'GET', url: mediaUrl(audioPath, claims, tokenSecret).replace(audioPath, artPath) })
    expect(wrongPath.statusCode).toBe(401)
    const audioCross = await h.app.inject({ method: 'GET', url: audioPath, headers: authHeaders(b.token) })
    expect(audioCross.statusCode).toBe(403)
    const valid = await h.app.inject({ method: 'GET', url: ticket })
    expect(valid.statusCode, valid.body).toBe(200)
    expect(valid.headers['cache-control']).toBe('private, no-store')
    const publicArt = await h.app.inject({ method: 'GET', url: publicPath })
    expect(publicArt.statusCode).toBe(200)
    expect(publicArt.headers['cache-control']).toContain('public')
  })

  it('a revoked session can no longer use its previously issued ticket', async () => {
    const child = await h.app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: a.familyCode, role: 'child', deviceId: 'revoke-target' } })
    expect(child.statusCode).toBe(200)
    const childClaims = verifyToken(child.json().token, tokenSecret)
    const childTicket = mediaUrl(artPath, childClaims, tokenSecret)
    expect((await h.app.inject({ method: 'GET', url: childTicket })).statusCode).toBe(200)
    const revoked = await h.app.inject({ method: 'POST', url: `/api/family/${a.familyId}/sessions/${childClaims.sid}/revoke`, headers: authHeaders(a.token) })
    expect(revoked.statusCode).toBe(200)
    expect((await h.app.inject({ method: 'GET', url: childTicket })).statusCode).toBe(401)
  })
})