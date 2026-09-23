import { describe, expect, it } from 'vitest'
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
})
