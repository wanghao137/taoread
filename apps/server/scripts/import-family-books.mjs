/**
 * 家庭书批量导入（2026-10-20，15 本批量）。
 *
 * 复用 finalizeBinaryImport 的完整管线（结构化提取→图存盘→标记改写→归档→建库），
 * 但走本机直连 DB/磁盘——批量场景下绕过 HTTP 分块上传（外网上行撑不起百 MB 级文件）。
 * 幂等：同 familyId+sha256 已存在时跳过（duplicate=true），重跑安全。
 *
 * 用法（对生产实例，env 用生产 .env 提供 DATABASE_URL 与 TAO_MEDIA_DIR）：
 *   node --env-file=D:\taoread-prod\apps\server\.env --import tsx \
 *     scripts/import-family-books.mjs --manifest=scripts/family-books.manifest.json
 */
import { createHash } from 'node:crypto'
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises'
import { dirname, join, basename, resolve } from 'node:path'
import { PrismaClient } from '@prisma/client'
import { loadConfig } from '../src/config.ts'
import { extractEpubStructured } from '../src/content/extractBook.ts'
import { ValidationError } from '../src/lib/errors.ts'
import { compressImageToWebP } from '../src/modules/media/compress.ts'

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=')
const manifestPath = arg('manifest')
if (!manifestPath) { console.error('缺少 --manifest=<json>'); process.exit(1) }

// 以下常量必须与 importRoutes.ts / extractBook.ts 保持一致（审查 P2-1：漂移会让两条导入路径产出不同正文）
const MAX_CHAPTERS = 800
const MAX_CHAPTER_CHARS = 100_000
const MAX_EXTRACTED_BYTES = 8 * 1024 * 1024
const IMPORT_IMAGE_BUDGET_BYTES = 128 * 1024 * 1024
const IMPORT_MAX_IMAGES = 1000

const db = new PrismaClient()
const config = loadConfig()
// 与 src/index.ts 的 mediaDir 语义逐字对齐（审查 P2-4：未设/相对路径时不能静默错位）
const mediaDir = config.TAO_MEDIA_DIR ? resolve(config.TAO_MEDIA_DIR) : join(process.cwd(), 'media')
const log = (m) => console.log(`[${new Date().toISOString()}] ${m}`)

function deriveBookId(familyId, sha256) {
  return `imp:${createHash('sha256').update(`${familyId}:${sha256}`).digest('hex').slice(0, 28)}`
}
function importDiskName(bookId) {
  // bookId 形如 imp:<28hex>；Windows 路径段冒号会被当盘符，磁盘目录一律用纯 hex
  return bookId.startsWith('imp:') ? bookId.slice(4) : bookId.replace(/[^0-9a-f]/gi, '')
}
function rewriteMarkers(text, keyMap) {
  return text.replace(/\[\[img:([^\]]+)\]\]/g, (marker, path) => {
    const key = keyMap.get(path)
    return key ? `[[img:${key}]]` : ''
  }).replace(/\n{3,}/g, '\n\n').trim()
}
function assertChaptersWithinCaps(chapters) {
  if (chapters.length > MAX_CHAPTERS) throw new ValidationError(`章节超过 ${MAX_CHAPTERS} 章`)
  let total = 0
  for (const chapter of chapters) {
    if (chapter.text.length > MAX_CHAPTER_CHARS) throw new ValidationError(`章节过长`)
    total += Buffer.byteLength(chapter.text, 'utf8')
  }
  if (total > MAX_EXTRACTED_BYTES) throw new ValidationError(`提取文本超过 ${Math.round(MAX_EXTRACTED_BYTES / (1024 * 1024))} MB`)
}

async function storeImportImages(bookId, images) {
  const dir = join(mediaDir, 'fam-import', importDiskName(bookId))
  await mkdir(dir, { recursive: true })
  const keyMap = new Map()
  let total = 0
  let index = 0
  for (const [path, buffer] of images) {
    if (index >= IMPORT_MAX_IMAGES) break
    try {
      const webp = await compressImageToWebP(buffer, 800)
      if (total + webp.length > IMPORT_IMAGE_BUDGET_BYTES) break
      const key = `img-v1-${String(index).padStart(3, '0')}.webp`
      await writeFile(join(dir, key), webp)
      total += webp.length
      keyMap.set(path, key)
      index += 1
    } catch { /* 单图压缩失败只丢这张图 */ }
  }
  return keyMap
}

async function archiveImportBook(bookId, cover, source, sourceName) {
  const dir = join(mediaDir, 'fam-import', importDiskName(bookId))
  await mkdir(dir, { recursive: true })
  if (cover) {
    try { await writeFile(join(dir, 'cover.webp'), await compressImageToWebP(cover, 480)) } catch { /* 封面失败不阻断 */ }
  }
  const ext = sourceName.split('.').at(-1)?.toLowerCase() ?? 'epub'
  try { await writeFile(join(dir, `source.${ext}`), source) } catch { /* 归档失败不阻断入库 */ }
}

async function importOne(familyId, entry) {
  const sourceName = basename(entry.file)
  const meta = { title: entry.title, author: entry.author || undefined, lang: 'zh', ageStage: entry.ageStage, sourceName }
  const binary = await readFile(entry.file)
  const structured = await extractEpubStructured(meta.sourceName, binary)
  assertChaptersWithinCaps(structured.chapters)
  const sha256 = createHash('sha256').update(binary).digest('hex')
  const existing = await db.importedBook.findUnique({ where: { familyId_sha256: { familyId, sha256 } }, select: { id: true } })
  if (existing) {
    log(`↷ 已存在，跳过：${meta.title}（${existing.id}）`)
    return { id: existing.id, chapters: 0, images: 0, duplicate: true }
  }
  const bookId = deriveBookId(familyId, sha256)
  const keyMap = await storeImportImages(bookId, structured.images)
  const chapters = structured.chapters.map((chapter) => ({ title: chapter.title, text: rewriteMarkers(chapter.text, keyMap) }))
  // rewrite 后标记可能变长（短 src → img-v1-NNN.webp），章长上限需复验（审查 P2-2，与路由二次断言对齐）
  assertChaptersWithinCaps(chapters)
  await archiveImportBook(bookId, structured.cover, binary, meta.sourceName)
  const created = await db.importedBook.create({
    data: {
      id: bookId,
      familyId,
      title: meta.title,
      author: meta.author ?? null,
      lang: meta.lang,
      ageStage: meta.ageStage,
      sourceName: meta.sourceName,
      format: meta.sourceName.split('.').at(-1).toLowerCase(),
      sha256,
      chapters: { create: chapters.map((chapter, index) => ({ order: index + 1, title: chapter.title, text: chapter.text })) },
    },
    select: { id: true },
  })
  return { id: created.id, chapters: chapters.length, images: keyMap.size, duplicate: false }
}

const manifestRaw = JSON.parse(await readFile(manifestPath, 'utf8'))
const books = manifestRaw.books
// familyId 锚定：家庭是自助注册的，库里可能不止一个（审查 P2-3）——多家庭时拒绝猜测，可用 --family= 指定
const impFamilies = await db.importedBook.findMany({ where: { id: { startsWith: 'imp:' } }, select: { familyId: true }, distinct: ['familyId'] })
const override = arg('family')
let familyId
if (override) {
  familyId = override
} else if (impFamilies.length === 1) {
  familyId = impFamilies[0].familyId
} else {
  console.error(`库中存在 ${impFamilies.length} 个持有家庭书的家庭（${impFamilies.map((f) => f.familyId).join(', ')}），无法确定导入目标；请用 --family=<familyId> 指定`)
  process.exit(1)
}
if (!books?.length) { console.error('manifest.books 为空'); process.exit(1) }
log(`家庭 ${familyId}：共 ${books.length} 本待导入`)

let ok = 0
let fail = 0
for (const entry of books) {
  if (typeof entry?.file !== 'string' || typeof entry?.title !== 'string') {
    log(`✗ manifest 条目缺 title/file：${JSON.stringify(entry)?.slice(0, 100)}`)
    fail += 1
    continue
  }
  const file = join(dirname(manifestPath), entry.file)
  try {
    await stat(file)
  } catch {
    log(`✗ 文件缺失：${entry.title} → ${file}`)
    fail += 1
    continue
  }
  try {
    const r = await importOne(familyId, { ...entry, file })
    log(`✓ ${entry.title} → ${r.id}（${r.chapters} 章 / ${r.images} 图${r.duplicate ? ' / 重复' : ''}）`)
    ok += 1
  } catch (error) {
    log(`✗ ${entry.title}：${error?.message?.slice(0, 200) ?? error}`)
    fail += 1
  }
}
log(`完成：成功 ${ok} / 失败 ${fail}`)
process.exit(fail > 0 ? 2 : 0)
