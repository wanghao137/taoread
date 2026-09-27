import { describe, expect, it } from 'vitest'
import { randomBytes } from 'node:crypto'
import AdmZip from 'adm-zip'
import { extractBook, extractEpubStructured } from '../src/content/extractBook'

// 近空页剔除阈值 50 字：夹具正文必须明显长于它
const LONG_TEXT = '这只小猫在花园里追蝴蝶，追了一整个下午，最后累得在向日葵底下睡着了，梦里全是花的香味。它醒来又去追蜻蜓，一直追到月亮出来才回家。'

interface EpubOptions {
  chapters?: Array<{ title: string; section?: string; href: string; html: string }>
  images?: Record<string, Buffer>
  coverId?: string
  withNcx?: boolean
}

function buildEpub(options: EpubOptions): Buffer {
  const zip = new AdmZip()
  zip.addFile('mimetype', Buffer.from('application/epub+zip'))
  zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/content.opf"/></container>'))
  const imageItems = Object.entries(options.images ?? {}).map(([path]) => `<item id="img-${path}" href="${path}" media-type="image/jpeg"/>`).join('')
  for (const [path, buffer] of Object.entries(options.images ?? {})) zip.addFile(`OEBPS/${path}`, buffer)
  const chapterItems = (options.chapters ?? []).map((chapter, index) => `<item id="ch${index}" href="${chapter.href}" media-type="application/xhtml+xml"/>`).join('')
  const spine = (options.chapters ?? []).map((_, index) => `<itemref idref="ch${index}"/>`).join('')
  zip.addFile('OEBPS/content.opf', Buffer.from(`<package><meta name="cover" content="${options.coverId ?? ''}"/><manifest>${chapterItems}${imageItems}${options.withNcx ? '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>' : ''}</manifest><spine${options.withNcx ? ' toc="ncx"' : ''}>${spine}</spine></package>`))
  for (const [, chapter] of (options.chapters ?? []).entries()) {
    zip.addFile(`OEBPS/${chapter.href}`, Buffer.from(`<html><head><title>t</title></head><body>${chapter.html}</body></html>`))
  }
  if (options.withNcx) {
    const points = (options.chapters ?? []).map((chapter, index) => `<navPoint id="n${index}" playOrder="${index}"><navLabel><text>${[chapter.section, chapter.title].filter(Boolean).join(' · ')}</text></navLabel><content src="${chapter.href}"/></navPoint>`).join('')
    zip.addFile('OEBPS/toc.ncx', Buffer.from(`<?xml version="1.0"?><ncx xmlns="http://www.daisy.org/z3986/2005/ncx/"><head/><docTitle><text>t</text></docTitle><navMap>${points}</navMap></ncx>`))
  }
  return zip.toBuffer()
}

describe('结构化 EPUB 提取', () => {
  it('目录章题 + 两级结构 + 分段 + 插图标记', async () => {
    const image = randomBytes(64 * 1024)
    const epub = buildEpub({
      withNcx: true,
      images: { 'pic.jpg': image },
      coverId: 'img-pic.jpg',
      chapters: [
        { title: '焦大和刘姥姥', href: 'text/c1.xhtml', html: `<p>${LONG_TEXT}</p><img src="pic.jpg"/><p>第二段结尾。</p>` },
        { title: '公主的保镖', section: '红楼梦', href: 'text/c2.xhtml', html: `<p>${LONG_TEXT}又一页。</p>` },
      ],
    })
    const result = await extractEpubStructured('book.epub', epub)
    expect(result.chapters).toHaveLength(2)
    expect(result.chapters[0]!.title).toBe('焦大和刘姥姥')
    expect(result.chapters[1]!.title).toBe('红楼梦 · 公主的保镖')
    // 段落保真：两个 <p> 之间是空行分段
    expect(result.chapters[0]!.text).toContain(`\n\n第二段结尾。`)
    // 插图标记 + 图片缓冲都在；封面来自 meta cover 指向的同一张图
    expect(result.chapters[0]!.text).toContain('[[img:OEBPS/pic.jpg]]')
    expect(result.images.get('OEBPS/pic.jpg')).toStrictEqual(image)
    expect(result.cover).toStrictEqual(image)
  })

  it('近空页（封面/版权）剔除，不产生空章', async () => {
    const epub = buildEpub({
      withNcx: true,
      chapters: [
        { title: '总封面', href: 'text/cover.xhtml', html: '<img src="c.jpg"/>' },
        { title: '版权页', href: 'text/colophon.xhtml', html: '<p>Copyright 2023</p>' },
        { title: '真正的故事', href: 'text/story.xhtml', html: `<p>${LONG_TEXT}</p>` },
      ],
    })
    const result = await extractEpubStructured('book.epub', epub)
    expect(result.chapters).toHaveLength(1)
    expect(result.chapters[0]!.title).toBe('真正的故事')
  })

  it('无目录 EPUB 回退单章，脚本能跑通', async () => {
    const epub = buildEpub({
      chapters: [{ title: 'x', href: 'one.xhtml', html: `<p>${LONG_TEXT}</p>` }],
    })
    const result = await extractEpubStructured('book.epub', epub)
    expect(result.chapters).toHaveLength(1)
    expect(result.chapters[0]!.title).toBe('第 1 节')
  })

  it('NCX 嵌套：容器点为「篇」，叶子为「章」', async () => {
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/content.opf"/></container>'))
    zip.addFile('OEBPS/content.opf', Buffer.from('<package><manifest><item id="c1" href="c1.xhtml" media-type="application/xhtml+xml"/><item id="c2" href="c2.xhtml" media-type="application/xhtml+xml"/><item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/></manifest><spine toc="ncx"><itemref idref="c1"/><itemref idref="c2"/></spine></package>'))
    zip.addFile('OEBPS/c1.xhtml', Buffer.from(`<html><body><p>${LONG_TEXT}</p></body></html>`))
    zip.addFile('OEBPS/c2.xhtml', Buffer.from(`<html><body><p>${LONG_TEXT}又一句。</p></body></html>`))
    zip.addFile('OEBPS/toc.ncx', Buffer.from(`<ncx><navMap><navPoint id="a"><navLabel><text>三国</text></navLabel><content src="c1.xhtml"/><navPoint id="a1"><navLabel><text>故事一</text></navLabel><content src="c1.xhtml"/></navPoint></navPoint><navPoint id="b"><navLabel><text>故事二</text></navLabel><content src="c2.xhtml"/></navPoint></navMap></ncx>`))
    const result = await extractEpubStructured('book.epub', zip.toBuffer())
    expect(result.chapters).toHaveLength(2)
    expect(result.chapters[0]!.title).toBe('三国 · 故事一')
    expect(result.chapters[1]!.title).toBe('故事二')
  })

  it('守卫保留：伪造文件、超限、炸弹', async () => {
    await expect(extractBook('a.pdf', Buffer.from('not pdf'))).rejects.toThrow()
    const fake = Buffer.concat([Buffer.from('PK\x03\x04'), randomBytes(33 * 1024 * 1024)])
    await expect(extractEpubStructured('a.epub', fake)).rejects.toThrow('32 MB')
    // 压缩比炸弹：64KB 以上条目压缩比超 100 倍拒绝
    const zip = new AdmZip()
    zip.addFile('mimetype', Buffer.from('application/epub+zip'))
    zip.addFile('bomb.bin', Buffer.alloc(8 * 1024 * 1024))
    zip.addFile('META-INF/container.xml', Buffer.from('<container><rootfile full-path="OEBPS/content.opf"/></container>'))
    await expect(extractEpubStructured('a.epub', zip.toBuffer())).rejects.toThrow('解压内容过大')
  })
})

describe('PDF 纯文本提取（既有行为）', () => {
  it('非 PDF 内容拒绝', async () => {
    await expect(extractBook('a.pdf', Buffer.from('%PDF-broken'))).rejects.toThrow()
  })
})
