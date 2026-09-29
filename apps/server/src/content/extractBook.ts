import { createRequire } from 'node:module'
import AdmZip from 'adm-zip'
import { ValidationError } from '../lib/errors'
const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse/lib/pdf-parse.js') as (input: Buffer, options?: object) => Promise<{ text: string; numpages: number }>
const MAX_EPUB_BYTES = 32 * 1024 * 1024
const MAX_TEXT_ENTRY = 16 * 1024 * 1024
const MAX_TEXT_TOTAL = 32 * 1024 * 1024
const MAX_PAGES = 100
const MAX_RATIO = 100
const MAX_PDF_INPUT = 4 * 1024 * 1024

// ── 结构化 EPUB 提取上限：目录对齐后的章数/章长/插图数。
// 章长超限不再硬拒（对读者来说一刀切报错不如自动分册），按段落边界切成（一）（二）。
export const MAX_STRUCTURED_CHAPTERS = 300
export const MAX_STRUCTURED_CHAPTER_CHARS = 100_000
export const MAX_STRUCTURED_IMAGES = 300
const MIN_CHAPTER_CHARS = 50

/** 实体解码：命名（常用集合）+ 十进制/十六进制数字。逐字面替换，不引入 DOM。 */
const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: '\'', nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’',
  middot: '·', bull: '•', copy: '©', deg: '°', plusmn: '±', times: '×', divide: '÷',
}
function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (raw, body: string) => {
    if (body.startsWith('#')) {
      const code = body[1] === 'x' || body[1] === 'X' ? Number.parseInt(body.slice(2), 16) : Number.parseInt(body.slice(1), 10)
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : raw
    }
    return NAMED_ENTITIES[body] ?? raw
  })
}

/** XHTML → 分段纯文本：块级标签出段落（\n\n），br 出换行，img 出独立标记行 [[img:解析后的路径]]。 */
function htmlToBlocks(html: string, resolveImage: (rawSrc: string) => string | null): string {
  const withImages = html
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(?:img|image)\b[^>]*>/gi, (tag) => {
      const src = tag.match(/\b(?:src|xlink:href|href)=["']([^"']+)["']/i)?.[1]
      const key = src ? resolveImage(src) : null
      return key ? `\n[[img:${key}]]\n` : ' '
    })
  const text = withImages
    .replace(/<br\b[^>]*\/?>/gi, '\n')
    .replace(/<\/?(?:p|div|h[1-6]|li|blockquote|tr|section|article|header|footer|figcaption|table|ul|ol|dl)\b[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
  return decodeEntities(text)
    .split('\n')
    .map((line) => line.replace(/[ \t\u00a0]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function extractBook(fileName: string, data: Buffer): Promise<string> {
  if (data.length === 0) throw new ValidationError('电子书为空')
  if (!/\.pdf$/i.test(fileName)) throw new ValidationError('请选择有效 EPUB 或 PDF')
  if (data.length > MAX_PDF_INPUT) throw new ValidationError('PDF 超过 4 MB')
  if (data.subarray(0, 5).toString() !== '%PDF-') throw new ValidationError('不是有效的 PDF')
  try {
    const result = await pdfParse(data, { max: MAX_PAGES + 1 })
    if (result.numpages > MAX_PAGES) throw new ValidationError('PDF 超过 100 页')
    if (!result.text.trim()) throw new ValidationError('扫描版 PDF 没有可提取的文字，请先自行 OCR')
    return result.text
  } catch (error) { if (error instanceof ValidationError) throw error; throw new ValidationError('PDF 无法解析或受密码保护') }
}

export interface StructuredChapter { title: string; text: string }
export interface StructuredEpub { chapters: StructuredChapter[]; images: Map<string, Buffer>; cover: Buffer | null }

interface TocEntry { title: string; href: string; section?: string }

/** NCX（EPUB2 toc.ncx）目录：navPoint 可嵌套，含子点的容器视为「篇」，叶子为「章」。 */
function parseNcxToc(xml: string): TocEntry[] {
  const out: TocEntry[] = []
  const stack: Array<{ label: string; href: string; children: number }> = []
  const tokenRe = /<navPoint\b[^>]*>|<\/navPoint>|<text[^>]*>([\s\S]*?)<\/text>|<content\b[^>]*src="([^"]*)"[^>]*>/gi
  for (const match of xml.matchAll(tokenRe)) {
    const token = match[0]
    if (/^<navPoint\b/i.test(token)) {
      stack.push({ label: '', href: '', children: 0 })
    } else if (/^<\/navPoint/i.test(token)) {
      const frame = stack.pop()
      if (!frame) continue
      const parent = stack[stack.length - 1]
      if (parent) parent.children += 1
      // 容器点（还有子节点）只贡献「篇名」，自身不成章；叶子点才生成目录条目
      if (frame.children > 0 || !frame.href) continue
      const title = decodeEntities(frame.label).replace(/\s+/g, ' ').trim()
      if (!title) continue
      const section = parent?.label ? decodeEntities(parent.label).replace(/\s+/g, ' ').trim() : undefined
      out.push({ title, href: frame.href, section })
    } else if (match[1] !== undefined) {
      const top = stack[stack.length - 1]
      if (top) top.label += match[1]
    } else if (match[2] !== undefined) {
      const top = stack[stack.length - 1]
      if (top) top.href = match[2]
    }
  }
  return out
}

/** EPUB3 nav 文档目录：取 toc nav 内全部 <a>，扁平解析（层级信息书商输出不统一，不赌）。 */
function parseNavToc(html: string): TocEntry[] {
  const navMatch = html.match(/<nav\b[^>]*epub:type=["'][^"']*toc[^"']*["'][^>]*>([\s\S]*?)<\/nav>/i) ?? html.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/i)
  if (!navMatch) return []
  const out: TocEntry[] = []
  for (const anchor of navMatch[1]!.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const title = decodeEntities(anchor[2]!.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
    if (title) out.push({ title, href: anchor[1]! })
  }
  return out
}

function decodeUriSafe(raw: string): string {
  try { return decodeURIComponent(raw) } catch { return raw }
}

/** 封面可能来自未被正文引用的图片：单独读取，带大小守卫。 */
function readCoverEntry(entry: { header: { size: number }; getData: () => Buffer } | undefined): Buffer | null {
  if (!entry || entry.header.size > 12 * 1024 * 1024) return null
  try { return entry.getData() } catch { return null }
}

function joinPath(baseDir: string, relative: string): string {
  const clean = relative.split('#')[0]!
  const parts = [...baseDir.split('/').filter(Boolean), ...decodeUriSafe(clean).split('/')]
  const stack: string[] = []
  for (const part of parts) {
    if (!part || part === '.') continue
    if (part === '..') stack.pop()
    else stack.push(part)
  }
  return stack.join('/')
}

export async function extractEpubStructured(fileName: string, data: Buffer): Promise<StructuredEpub> {
  if (data.length === 0) throw new ValidationError('电子书为空')
  if (!/\.epub$/i.test(fileName) || data.subarray(0, 2).toString() !== 'PK') throw new ValidationError('请选择有效 EPUB')
  if (data.length > MAX_EPUB_BYTES) throw new ValidationError('EPUB 超过 32 MB')
  try {
    const zip = new AdmZip(data)
    const entries = zip.getEntries()
    // 入口数与压缩比守卫（只读 header，不解压）：拦条目泛滥与 zip 炸弹。
    // 大图片条目合法且从不解码，不计入文本上限；文本上限在真正解码处按需把守。
    if (entries.length > 500 || entries.some((entry) => entry.header.size > 64 * 1024 && entry.header.size / Math.max(1, entry.header.compressedSize) > MAX_RATIO)) throw new ValidationError('EPUB 解压内容过大')
    const byName = new Map(entries.map((entry) => [entry.entryName, entry] as const))
    let decodedTotal = 0
    const readText = (name: string): string => {
      const entry = byName.get(name)
      if (!entry) return ''
      decodedTotal += entry.header.size
      if (entry.header.size > MAX_TEXT_ENTRY || decodedTotal > MAX_TEXT_TOTAL) throw new ValidationError('EPUB 解压内容过大')
      return entry.getData().toString('utf8')
    }
    if (readText('mimetype').trim() !== 'application/epub+zip') throw new ValidationError('不是有效 EPUB')
    const container = readText('META-INF/container.xml')
    const opfPath = container.match(/full-path=["']([^"']+)["']/)?.[1]
    if (!opfPath || /(?:^|\/)\.\.(?:\/|$)|^[a-z]+:|^\//i.test(opfPath) || !byName.has(opfPath)) throw new ValidationError('EPUB 缺少目录')
    const opf = readText(opfPath)
    const base = opfPath.split('/').slice(0, -1).join('/')

    // manifest：id → {href, type, properties}
    const manifest = new Map([...opf.matchAll(/<item\b[^>]*>/gi)].map((tag) => [
      tag[0].match(/\bid=["']([^"']+)["']/i)?.[1] ?? '',
      {
        href: tag[0].match(/\bhref=["']([^"']+)["']/i)?.[1] ?? '',
        type: tag[0].match(/\bmedia-type=["']([^"']+)["']/i)?.[1] ?? '',
        properties: tag[0].match(/\bproperties=["']([^"']+)["']/i)?.[1] ?? '',
      },
    ]))
    const resolveManifest = (href: string): string => joinPath(base, href)
    const spineRefs = [...opf.matchAll(/<itemref\b[^>]*idref=["']([^"']+)["']/gi)].map((match) => match[1]!)

    // 图片清单：仅保留被正文引用的（解码放到收集后，未引用的大图永不解压）
    const imagePaths = new Set<string>()
    for (const [, item] of manifest) {
      if (item.type.startsWith('image/') && item.href) {
        const path = resolveManifest(item.href)
        if (/(?:^|\/)\.\.(?:\/|$)|^[a-z]+:|^\//i.test(path)) continue
        imagePaths.add(path)
      }
    }
    // 页面内的相对 src 必须相对「页面所在目录」解析（不是 OPF 目录——目录层级不同的书会全部落空）
    const dirnameOf = (path: string): string => path.split('/').slice(0, -1).join('/')
    const resolveImageFrom = (pagePath: string) => (rawSrc: string): string | null => {
      const path = joinPath(dirnameOf(pagePath), rawSrc)
      return imagePaths.has(path) ? path : null
    }

    // 封面：OPF meta cover → id 带 cover 的图片项 → 兜底 null
    let coverPath: string | null = null
    const coverMetaId = opf.match(/<meta\b[^>]*name=["']cover["'][^>]*content=["']([^"']+)["']/i)?.[1] ?? opf.match(/<meta\b[^>]*content=["']([^"']+)["'][^>]*name=["']cover["']/i)?.[1]
    if (coverMetaId && manifest.get(coverMetaId)?.href) coverPath = resolveManifest(manifest.get(coverMetaId)!.href)
    if (!coverPath) {
      for (const [, item] of manifest) {
        if (item.type.startsWith('image/') && /cover/i.test(item.href)) { coverPath = resolveManifest(item.href); break }
      }
    }

    // 目录：NCX 优先（层级规范），EPUB3 nav 兜底
    const tocItem = [...manifest.values()].find((item) => item.properties.split(/\s+/).includes('nav') && item.href)
    let toc: TocEntry[] = []
    const ncxId = opf.match(/<spine\b[^>]*toc=["']([^"']+)["']/i)?.[1]
    const ncxItem = ncxId ? manifest.get(ncxId) : undefined
    if (ncxItem?.href) toc = parseNcxToc(readText(resolveManifest(ncxItem.href)))
    if (toc.length === 0 && tocItem?.href) toc = parseNavToc(readText(resolveManifest(tocItem.href)))
    const tocByPath = new Map<string, TocEntry>()
    for (const entry of toc) {
      if (/^[a-z]+:/i.test(entry.href)) continue
      const path = resolveManifest(entry.href)
      if (!tocByPath.has(path)) tocByPath.set(path, entry)
    }

    const chapters: StructuredChapter[] = []
    const referenced = new Set<string>()
    const pushChapter = (title: string, text: string): void => {
      for (const marker of text.matchAll(/\[\[img:([^\]]+)\]\]/g)) referenced.add(marker[1]!)
      chapters.push({ title, text })
    }
    // calibre 等工具会产出不在 spine 里的孤儿页（其插图因此丢失）：按文件名顺序穿插进遍历序列。
    // 跳过目录文档；孤儿页复用下方同一套近空页规则，孤儿页上的新图一律保留——零遗漏。
    const navPath = tocItem?.href ? resolveManifest(tocItem.href) : null
    const spinePaths = new Set<string>()
    for (const ref of spineRefs) {
      const item = manifest.get(ref)
      if (!item?.href || item.type !== 'application/xhtml+xml') continue
      spinePaths.add(resolveManifest(item.href))
    }
    const orphanPaths = [...byName.keys()]
      .filter((name) => /\.(?:xhtml|html)$/i.test(name) && !spinePaths.has(name) && name !== navPath)
      .sort()
    const traversal: string[] = []
    {
      let orphanCursor = 0
      for (const ref of spineRefs) {
        const item = manifest.get(ref)
        if (!item?.href || item.type !== 'application/xhtml+xml') continue
        const spinePath = resolveManifest(item.href)
        while (orphanCursor < orphanPaths.length && orphanPaths[orphanCursor]! < spinePath) {
          traversal.push(orphanPaths[orphanCursor++]!)
        }
        if (byName.has(spinePath)) traversal.push(spinePath)
      }
      while (orphanCursor < orphanPaths.length) traversal.push(orphanPaths[orphanCursor++]!)
    }
    for (const path of traversal) {
      const text = htmlToBlocks(readText(path), resolveImageFrom(path))
      const entry = tocByPath.get(path)
      const last = chapters[chapters.length - 1]
      const textLength = text.replace(/\[\[img:[^\]]+\]\]/g, '').trim().length
      const hasImages = /\[\[img:[^\]]+\]\]/.test(text)
      // 合并进上一章：必须同样登记图片引用（referenced 漏记会让 cleanDropped 把标记洗掉）
      const mergeIntoLast = (): void => {
        if (!last) return
        last.text = `${last.text}\n\n${text}`.trim()
        for (const marker of text.matchAll(/\[\[img:([^\]]+)\]\]/g)) referenced.add(marker[1]!)
      }
      // 近空页：纯文字近空页剔除；含图近空页保留为图片章节（绘本页/扉页/封面页，零遗漏）
      if (textLength < MIN_CHAPTER_CHARS) {
        if (!hasImages) continue
        if (entry) { pushChapter(entry.section ? `${entry.section} · ${entry.title}` : entry.title, text); continue }
        if (last) { mergeIntoLast(); continue }
        pushChapter('封面', text)
        continue
      }
      if (!entry) {
        if (last) mergeIntoLast()
        else pushChapter('第 1 节', text)
        continue
      }
      const title = entry.section ? `${entry.section} · ${entry.title}` : entry.title
      // 章长超限：按段落边界自动分册，不硬拒；只有一册时不加序号
      if (text.length > MAX_STRUCTURED_CHAPTER_CHARS) {
        const paragraphs = text.split('\n\n')
        const groups: string[][] = [[]]
        let filled = 0
        for (const paragraph of paragraphs) {
          if (filled > 0 && filled + paragraph.length + 2 > MAX_STRUCTURED_CHAPTER_CHARS) {
            groups.push([])
            filled = 0
          }
          groups[groups.length - 1]!.push(paragraph)
          filled += paragraph.length + 2
        }
        const marks = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        groups.forEach((group, index) => {
          const suffix = groups.length > 1 ? `（${marks[index] ?? index + 1}）` : ''
          pushChapter(`${title}${suffix}`, group.join('\n\n'))
        })
      } else {
        pushChapter(title, text)
      }
    }
    if (chapters.length === 0) throw new ValidationError('EPUB 没有可提取文字')
    if (chapters.length > MAX_STRUCTURED_CHAPTERS) throw new ValidationError(`章节超过 ${MAX_STRUCTURED_CHAPTERS} 章`)

    // 未被引用的图片不参与存储（省空间）；标记指向被剔除图片的清空。
    // 聚合预算：对抗输入可把 32MB 包塞满 12MB×300 的高压缩比条目，解码聚合必须自封顶
    const images = new Map<string, Buffer>()
    let imageBytes = 0
    for (const path of referenced) {
      if (images.size >= MAX_STRUCTURED_IMAGES) break
      const entry = byName.get(path)
      if (!entry || entry.header.size > 12 * 1024 * 1024) continue
      if (imageBytes + entry.header.size > 64 * 1024 * 1024) break
      try {
        const buffer = entry.getData()
        imageBytes += buffer.length
        images.set(path, buffer)
      } catch { /* 单图损坏不阻断整本 */ }
    }
    const cleanDropped = (text: string): string => text.replace(/\[\[img:[^\]]+\]\]/g, (marker) => {
      const key = marker.slice(6, -2)
      return images.has(key) ? marker : ''
    })
    for (const chapter of chapters) chapter.text = cleanDropped(chapter.text).replace(/\n{3,}/g, '\n\n').trim()

    const cover = coverPath ? images.get(coverPath) ?? readCoverEntry(byName.get(coverPath)) : null
    return { chapters, images, cover: cover && cover.length > 0 ? cover : null }
  } catch (error) { if (error instanceof ValidationError) throw error; throw new ValidationError('EPUB 无法解析或已损坏') }
}
