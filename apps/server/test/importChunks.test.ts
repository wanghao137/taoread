import { beforeAll, describe, expect, it } from 'vitest'
import { randomBytes } from 'node:crypto'
import AdmZip from 'adm-zip'
import { authHeaders, createFamilyAsParent, makeApp, type TestHarness } from './helper'
import { IMPORT_CHUNK_SIZE } from '../src/content/importRoutes'

let h: TestHarness
let token: string
let tokenOther: string
beforeAll(async () => {
  h = await makeApp()
  const family = await createFamilyAsParent(h.app, 'chunk-import-owner')
  token = family.token
  const other = await createFamilyAsParent(h.app, 'chunk-import-other')
  tokenOther = other.token
})

const CHUNK = IMPORT_CHUNK_SIZE
function bigEpub(): Buffer {
  const zip = new AdmZip()
  zip.addFile('mimetype', Buffer.from('application/epub+zip'))
  zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/book.opf"/></container>'))
  zip.addFile('OEBPS/book.opf', Buffer.from('<package><manifest><item id="a" href="one.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="a"/></spine></package>'))
  zip.addFile('OEBPS/one.xhtml', Buffer.from('<html><body><p>chunked book</p><p>the little cat chased butterflies in the garden all afternoon and fell asleep under the sunflower.</p></body></html>'))
  // 随机图片撑到跨多块（约 2.5MB → 3 块）；不解码不参与文本统计
  zip.addFile('OEBPS/pictures.jpg', randomBytes(2.5 * CHUNK))
  return zip.toBuffer()
}

async function initSession(binary: Buffer, sourceName = 'chunk.epub'): Promise<string> {
  const init = await h.app.inject({
    method: 'POST',
    url: '/api/content/imports/chunks/init',
    headers: authHeaders(token),
    payload: { title: '分块 EPUB', lang: 'zh', ageStage: '6-8', sourceName, totalBytes: binary.length, totalChunks: Math.ceil(binary.length / CHUNK), rightsConfirmed: true },
  })
  expect(init.statusCode).toBe(201)
  return init.json().sessionId
}

async function putChunk(sessionId: string, index: number, binary: Buffer, overrideToken = token): Promise<number> {
  const chunk = binary.subarray(index * CHUNK, Math.min((index + 1) * CHUNK, binary.length))
  const put = await h.app.inject({
    method: 'POST',
    url: `/api/content/imports/chunks/${sessionId}/${index}`,
    headers: authHeaders(overrideToken),
    payload: { data: chunk.toString('base64') },
  })
  return put.statusCode
}

describe('分块导入', () => {
  it('分块上传→拼装入库→重复导入去重', async () => {
    const binary = bigEpub()
    expect(Math.ceil(binary.length / CHUNK)).toBeGreaterThanOrEqual(3)
    const sessionId = await initSession(binary)
    for (let index = 0; index < Math.ceil(binary.length / CHUNK); index++) {
      expect(await putChunk(sessionId, index, binary)).toBe(200)
    }
    const complete = await h.app.inject({ method: 'POST', url: `/api/content/imports/chunks/${sessionId}/complete`, headers: authHeaders(token), payload: {} })
    expect(complete.statusCode).toBe(201)
    expect(complete.json().chapterCount).toBe(1)

    // 同一内容再来一轮（complete 已销毁旧会话，重新 init）→ duplicate
    const sessionId2 = await initSession(binary)
    for (let index = 0; index < Math.ceil(binary.length / CHUNK); index++) {
      expect(await putChunk(sessionId2, index, binary)).toBe(200)
    }
    const again = await h.app.inject({ method: 'POST', url: `/api/content/imports/chunks/${sessionId2}/complete`, headers: authHeaders(token), payload: {} })
    expect(again.statusCode).toBe(200)
    expect(again.json()).toMatchObject({ duplicate: true, id: complete.json().id })
  })

  it('缺块时 complete 拒绝且会话保留，补齐后成功', async () => {
    const binary = bigEpub()
    const total = Math.ceil(binary.length / CHUNK)
    const sessionId = await initSession(binary)
    expect(await putChunk(sessionId, 0, binary)).toBe(200)
    const early = await h.app.inject({ method: 'POST', url: `/api/content/imports/chunks/${sessionId}/complete`, headers: authHeaders(token), payload: {} })
    expect(early.statusCode).toBe(400)
    expect(early.json().message).toContain(`还有 ${total - 1} 块`)
    for (let index = 1; index < total; index++) {
      expect(await putChunk(sessionId, index, binary)).toBe(200)
    }
    const complete = await h.app.inject({ method: 'POST', url: `/api/content/imports/chunks/${sessionId}/complete`, headers: authHeaders(token), payload: {} })
    expect(complete.statusCode).toBe(201)
  })

  it('他人家庭的会话不可见', async () => {
    const binary = bigEpub()
    const sessionId = await initSession(binary)
    const foreignPut = await h.app.inject({
      method: 'POST',
      url: `/api/content/imports/chunks/${sessionId}/0`,
      headers: authHeaders(tokenOther),
      payload: { data: binary.subarray(0, 1024).toString('base64') },
    })
    expect(foreignPut.statusCode).toBe(404)
    const foreignComplete = await h.app.inject({ method: 'POST', url: `/api/content/imports/chunks/${sessionId}/complete`, headers: authHeaders(tokenOther), payload: {} })
    expect(foreignComplete.statusCode).toBe(404)
  })

  it('参数与内容校验', async () => {
    // 超过 EPUB 上限（33MB / 256KB = 133 块，块数合法但总量超限）
    const tooBig = await h.app.inject({
      method: 'POST',
      url: '/api/content/imports/chunks/init',
      headers: authHeaders(token),
      payload: { title: '超大', lang: 'zh', ageStage: '6-8', sourceName: 'big.epub', totalBytes: 33 * 1024 * 1024, totalChunks: 133, rightsConfirmed: true },
    })
    expect(tooBig.statusCode).toBe(400)
    // totalChunks 与 totalBytes 不匹配
    const mismatch = await h.app.inject({
      method: 'POST',
      url: '/api/content/imports/chunks/init',
      headers: authHeaders(token),
      payload: { title: '不匹配', lang: 'zh', ageStage: '6-8', sourceName: 'x.epub', totalBytes: 3 * CHUNK, totalChunks: 2, rightsConfirmed: true },
    })
    expect(mismatch.statusCode).toBe(400)
    // 非法序号 / 坏 base64
    const binary = bigEpub()
    const sessionId = await initSession(binary)
    const badIndex = await h.app.inject({ method: 'POST', url: `/api/content/imports/chunks/${sessionId}/99`, headers: authHeaders(token), payload: { data: 'aGk=' } })
    expect(badIndex.statusCode).toBe(400)
    const badData = await h.app.inject({ method: 'POST', url: `/api/content/imports/chunks/${sessionId}/0`, headers: authHeaders(token), payload: { data: 'not-base64!!' } })
    expect(badData.statusCode).toBe(400)
    expect(await putChunk(sessionId, 0, binary)).toBe(200)
  })
})
