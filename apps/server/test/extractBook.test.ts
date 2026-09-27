import { describe, expect, it } from 'vitest'
import { randomBytes } from 'node:crypto'
import AdmZip from 'adm-zip'
import { extractBook } from '../src/content/extractBook'

describe('电子书文字提取', () => {
  it('读取 EPUB 正文且不渲染脚本', async () => {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/content.opf"/></container>'))
    zip.addFile('OEBPS/content.opf', Buffer.from('<package><manifest><item id="a" href="one.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="a"/></spine></package>'))
    zip.addFile('OEBPS/one.xhtml', Buffer.from('<html><body><p>cat &amp; sun</p><script>alert(1)</script></body></html>'))
    expect(await extractBook('a.epub', zip.toBuffer())).toContain('cat & sun')
    expect(await extractBook('a.epub', zip.toBuffer())).not.toContain('alert')
  })
  it('阻止路径逃逸和伪造 PDF', async () => {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<rootfile full-path="content.opf"/>'))
    zip.addFile('content.opf', Buffer.from('<manifest><item id="a" href="../secret.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="a"/></spine>'))
    await expect(extractBook('a.epub', zip.toBuffer())).rejects.toThrow()
    await expect(extractBook('a.pdf', Buffer.from('not pdf'))).rejects.toThrow()
  })
  it('图片为主的 EPUB 不计入文本解压上限', async () => {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/content.opf"/></container>'))
    zip.addFile('OEBPS/content.opf', Buffer.from('<package><manifest><item id="a" href="one.xhtml" media-type="application/xhtml+xml"/></manifest><spine><itemref idref="a"/></spine></package>'))
    zip.addFile('OEBPS/one.xhtml', Buffer.from('<html><body><p>cat &amp; sun</p></body></html>'))
    zip.addFile('OEBPS/cover.jpg', randomBytes(6 * 1024 * 1024))
    expect(await extractBook('a.epub', zip.toBuffer())).toContain('cat & sun')
  })
  it('超过 32 MB 的 EPUB 拒绝', async () => {
    const fake = Buffer.concat([Buffer.from('PK\x03\x04'), randomBytes(33 * 1024 * 1024)])
    await expect(extractBook('a.epub', fake)).rejects.toThrow('32 MB')
  })
  it('引用正文解压总量超限拒绝', async () => {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/content.opf"/></container>'))
    const ids = Array.from({ length: 33 }, (_, i) => `c${i}`)
    const manifest = ids.map((id) => `<item id="${id}" href="${id}.xhtml" media-type="application/xhtml+xml"/>`).join('')
    const spine = ids.map((id) => `<itemref idref="${id}"/>`).join('')
    zip.addFile('OEBPS/content.opf', Buffer.from(`<package><manifest>${manifest}</manifest><spine>${spine}</spine></package>`))
    // 随机中文正文：可压缩约 5 倍（不触发压缩比炸弹守卫），33 章解压总量超 32 MB 而 raw 包不超
    const pool = '之一到他在有和大与人文上传来回下地个中说到时要就出手'
    const chapterHtml = () => {
      const bytes = randomBytes(1024 * 341)
      let body = ''
      for (const b of bytes) body += pool[b % pool.length]
      return `<html><body><p>${body}</p></body></html>`
    }
    for (const id of ids) zip.addFile(`OEBPS/${id}.xhtml`, Buffer.from(chapterHtml()))
    expect(zip.toBuffer().length).toBeLessThan(32 * 1024 * 1024)
    await expect(extractBook('a.epub', zip.toBuffer())).rejects.toThrow('解压内容过大')
  })
})
