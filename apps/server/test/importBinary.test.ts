import { beforeAll, describe, expect, it } from 'vitest'
import { randomBytes } from 'node:crypto'
import AdmZip from 'adm-zip'
import { authHeaders, createChild, createFamilyAsParent, makeApp, type TestHarness } from './helper'
let h: TestHarness
let token: string
beforeAll(async () => { h = await makeApp(); const family = await createFamilyAsParent(h.app, 'binary-import-owner'); token = family.token; await createChild(h.app, token, family.familyId, '读者', '6-8') })
  function epub(): Buffer {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/book.opf"/></container>'))
    zip.addFile('OEBPS/book.opf', Buffer.from('<package><manifest><item id="a" href="one.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="a"/></spine></package>'))
    zip.addFile('OEBPS/one.xhtml', Buffer.from('<html><body><p>sun and cat</p><p>the little cat chased butterflies in the garden all afternoon and fell asleep under the sunflower.</p></body></html>'))
    return zip.toBuffer()
  }
describe('EPUB 家庭导入链路', () => {
  it('正文入库、去重与伪造文件拒绝', async () => {
    const payload = { title: '自有 EPUB', lang: 'en', ageStage: '6-8', sourceName: 'book.epub', fileBase64: epub().toString('base64'), rightsConfirmed: true }
    const create = await h.app.inject({ method: 'POST', url: '/api/content/imports', headers: authHeaders(token), payload })
    expect(create.statusCode).toBe(201)
    const id = create.json().id
    const chapter = await h.app.inject({ method: 'GET', url: `/api/content/imports/${encodeURIComponent(id)}/chapters/1`, headers: authHeaders(token) })
    expect(chapter.json().chapter.text).toContain('sun and cat')
    const again = await h.app.inject({ method: 'POST', url: '/api/content/imports', headers: authHeaders(token), payload })
    expect(again.json()).toMatchObject({ duplicate: true, id })
    const fake = await h.app.inject({ method: 'POST', url: '/api/content/imports', headers: authHeaders(token), payload: { ...payload, fileBase64: Buffer.from('fake').toString('base64') } })
    expect(fake.statusCode).toBe(400)
  })
  it('图片为主的大体积 EPUB（约 9 MB）可入库', async () => {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/book.opf"/></container>'))
    zip.addFile('OEBPS/book.opf', Buffer.from('<package><manifest><item id="a" href="one.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="a"/></spine></package>'))
    zip.addFile("OEBPS/one.xhtml", Buffer.from("<html><body><p>big picture book</p><p>the little cat chased butterflies in the garden all afternoon and fell asleep under the sunflower.</p></body></html>"))
    zip.addFile('OEBPS/pictures.jpg', randomBytes(9 * 1024 * 1024))
    expect(zip.toBuffer().length).toBeGreaterThan(8 * 1024 * 1024)
    const payload = { title: '大图 EPUB', lang: 'zh', ageStage: '6-8', sourceName: 'big.epub', fileBase64: zip.toBuffer().toString('base64'), rightsConfirmed: true }
    const create = await h.app.inject({ method: 'POST', url: '/api/content/imports', headers: authHeaders(token), payload })
    expect(create.statusCode).toBe(201)
    expect(create.json().chapterCount).toBe(1)
  })
})
