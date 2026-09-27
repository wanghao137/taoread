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
function plain(input: string): string {
  return input.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|#160);/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/[ \t]+/g, ' ').trim()
}
export async function extractBook(fileName: string, data: Buffer): Promise<string> {
  if (data.length === 0) throw new ValidationError('电子书为空')
  if (/\.pdf$/i.test(fileName)) {
    if (data.length > MAX_PDF_INPUT) throw new ValidationError('PDF 超过 4 MB')
    if (data.subarray(0, 5).toString() !== '%PDF-') throw new ValidationError('不是有效的 PDF')
    try {
      const result = await pdfParse(data, { max: MAX_PAGES + 1 })
      if (result.numpages > MAX_PAGES) throw new ValidationError('PDF 超过 100 页')
      if (!result.text.trim()) throw new ValidationError('扫描版 PDF 没有可提取的文字，请先自行 OCR')
      return result.text
    } catch (error) { if (error instanceof ValidationError) throw error; throw new ValidationError('PDF 无法解析或受密码保护') }
  }
  if (!/\.epub$/i.test(fileName) || data.subarray(0, 2).toString() !== 'PK') throw new ValidationError('请选择有效 EPUB 或 PDF')
  if (data.length > MAX_EPUB_BYTES) throw new ValidationError('EPUB 超过 32 MB')
  try {
    const zip = new AdmZip(data)
    const entries = zip.getEntries()
    // 入口数与压缩比守卫（只读 header，不解压）：拦条目泛滥与 zip 炸弹。
    // 大图片条目合法且从不解码，不计入文本上限；文本上限在真正解码处按需把守。
    if (entries.length > 500 || entries.some((entry) => entry.header.size > 64 * 1024 && entry.header.size / Math.max(1, entry.header.compressedSize) > MAX_RATIO)) throw new ValidationError('EPUB 解压内容过大')
    let decodedTotal = 0
    const readText = (name: string): string => {
      const entry = byName.get(name)
      if (!entry) return ''
      decodedTotal += entry.header.size
      if (entry.header.size > MAX_TEXT_ENTRY || decodedTotal > MAX_TEXT_TOTAL) throw new ValidationError('EPUB 解压内容过大')
      return entry.getData().toString('utf8')
    }
    const byName = new Map(entries.map((entry) => [entry.entryName, entry]))
    if (readText('mimetype').trim() !== 'application/epub+zip') throw new ValidationError('不是有效 EPUB')
    const container = readText('META-INF/container.xml')
    const opfPath = container.match(/full-path=["']([^"']+)["']/)?.[1]
    if (!opfPath || /(?:^|\/)\.\.(?:\/|$)|^[a-z]+:|^\//i.test(opfPath) || !byName.has(opfPath)) throw new ValidationError('EPUB 缺少目录')
    const opf = readText(opfPath)
    const manifest = new Map([...opf.matchAll(/<item\b[^>]*>/gi)].map(([tag]) => [tag.match(/\bid=["']([^"']+)["']/)?.[1], { href: tag.match(/\bhref=["']([^"']+)["']/)?.[1], type: tag.match(/\bmedia-type=["']([^"']+)["']/)?.[1] }]))
    const refs = [...opf.matchAll(/<itemref\b[^>]*idref=["']([^"']+)["']/gi)].map((match) => match[1])
    const base = opfPath.split('/').slice(0, -1).join('/')
    const chapters = refs.map((ref, index) => {
      const item = manifest.get(ref ?? "")
      if (!item?.href || item.type !== 'application/xhtml+xml' || /(?:^|\/)\.\.(?:\/|$)|^[a-z]+:|^\//i.test(item.href)) throw new ValidationError('EPUB 包含不受支持的章节路径')
      const decoded = decodeURIComponent(item.href.split('#')[0]!)
      if (/(?:^|\/)\.\.(?:\/|$)|^[a-z]+:|^\//i.test(decoded)) throw new ValidationError('EPUB 包含不受支持的章节路径')
      const path = [base, decoded].filter(Boolean).join('/')
      const entry = byName.get(path)
      if (!entry) throw new ValidationError('EPUB 缺少章节')
      const text = plain(readText(path))
      return text ? `Chapter ${index + 1}\n${text}` : ''
    }).filter(Boolean)
    if (!chapters.length) throw new ValidationError('EPUB 没有可提取文字')
    return chapters.join('\n\n')
  } catch (error) { if (error instanceof ValidationError) throw error; throw new ValidationError('EPUB 无法解析或已损坏') }
}
