import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomBytes } from 'node:crypto'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import AdmZip from 'adm-zip'
import { authHeaders, createChild, createFamilyAsParent, makeApp, type TestHarness } from './helper'
let h: TestHarness
let token: string
let childId: string
let mediaDir: string
beforeAll(async () => { mediaDir = await mkdtemp(join(tmpdir(), 'taoread-import-contract-')); h = await makeApp(undefined, { mediaDir }); const family = await createFamilyAsParent(h.app, 'binary-import-owner'); token = family.token; childId = await createChild(h.app, token, family.familyId, '读者', '6-8') })
afterAll(async () => { await h.app.close(); await h.db.$disconnect(); await rm(mediaDir, { recursive: true, force: true }) })
  function epub(note = ''): Buffer {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/book.opf"/></container>'))
    zip.addFile('OEBPS/book.opf', Buffer.from('<package><manifest><item id="a" href="one.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="a"/></spine></package>'))
    zip.addFile('OEBPS/one.xhtml', Buffer.from(`<html><body><p>sun and cat</p><p>the little cat chased butterflies in the garden all afternoon and fell asleep under the sunflower. ${note}</p></body></html>`))
    return zip.toBuffer()
  }
describe('EPUB 家庭导入链路', () => {
  it('重解析先预览，陈旧确认拒绝，历史正文可以事务恢复', async () => {
    const payload = { title: '重解析合成样本', lang: 'en', ageStage: '6-8', sourceName: 'revision.epub', fileBase64: epub('Revision-only sample').toString('base64'), rightsConfirmed: true }
    const created = await h.app.inject({ method: 'POST', url: '/api/content/imports', headers: authHeaders(token), payload })
    expect(created.statusCode).toBe(201)
    const id = created.json().id as string
    await h.db.importedReadingProgress.create({ data: { childId, bookId: id, order: 1, offset: 2, contentVersion: 1 } })
    const path = `/api/content/imports/${encodeURIComponent(id)}/refresh`
    const preview = await h.app.inject({ method: 'POST', url: path, headers: authHeaders(token), payload: { preview: true } })
    expect(preview.statusCode).toBe(200)
    expect(preview.json()).toMatchObject({ preview: true, baseVersion: 1, relocationRequired: 0 })
    expect((await h.db.importedBook.findUniqueOrThrow({ where: { id } })).contentVersion).toBe(1)
    const old = await h.app.inject({ method: 'POST', url: path, headers: authHeaders(token), payload: { preview: false, baseVersion: 1, digest: '0'.repeat(64) } })
    expect(old.statusCode).toBe(409)
    const body = preview.json()
    const saved = await h.app.inject({ method: 'POST', url: path, headers: authHeaders(token), payload: { preview: false, baseVersion: body.baseVersion, digest: body.digest } })
    expect(saved.statusCode).toBe(200)
    expect((await h.db.importedReadingProgress.findFirstOrThrow({ where: { bookId: id } })).contentVersion).toBe(2)
    expect((await h.app.inject({ method: 'POST', url: path, headers: authHeaders(token), payload: { preview: false, baseVersion: body.baseVersion, digest: body.digest } })).statusCode).toBe(409)
    // Change only this synthetic book to prove restoration uses the snapshot, not current text.
    await h.db.importedChapter.updateMany({ where: { bookId: id }, data: { text: 'changed synthetic text' } })
    const restore = await h.app.inject({ method: 'POST', url: `/api/content/imports/${encodeURIComponent(id)}/revisions/1/restore`, headers: authHeaders(token), payload: { baseVersion: 2 } })
    expect(restore.statusCode).toBe(200)
    expect(restore.json().contentVersion).toBe(3)
    expect((await h.db.importedChapter.findFirstOrThrow({ where: { bookId: id } })).text).toContain('sun and cat')
    const progress = await h.db.importedReadingProgress.findFirstOrThrow({ where: { bookId: id } })
    expect(progress.relocationRequired).toBe(true)
    // A malformed archived original must leave the current version intact.
    await writeFile(join(mediaDir, 'fam-import', id.slice(4), 'source.epub'), Buffer.from('invalid epub'))
    const broken = await h.app.inject({ method: 'POST', url: path, headers: authHeaders(token), payload: { preview: true } })
    expect(broken.statusCode).toBe(400)
    expect((await h.db.importedBook.findUniqueOrThrow({ where: { id } })).contentVersion).toBe(3)
  })
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
