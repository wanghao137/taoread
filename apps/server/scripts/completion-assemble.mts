/**
 * 找故事全量补全——pack 组装器。
 * 用法：npx tsx scripts/completion-assemble.mts --book=<id>[,<id2>...] | --all
 *
 * 读 scripts/completion/<id>/parts/part-<start>.json（代理产出的章节 JSON），
 * 校验结构后与现有 pack 合并（A 类重写末章、B 类纯追加），重新生成 pack TS 文件。
 * 产出可被 tsc 直接校验；组装后运行 seed-dev.mjs 入库。
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const PACKS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'packs')
const ROOT = join(dirname(fileURLToPath(import.meta.url)), 'completion')

const args = process.argv.slice(2)
const bookArg = args.find(a => a.startsWith('--book='))?.slice('--book='.length)
const all = args.includes('--all')
if (!bookArg && !all) throw new Error('用法: --book=<id> | --all')
const ids: string[] = all ? readdirSync(ROOT).filter(d => existsSync(join(ROOT, d, 'meta.json'))) : (bookArg as string).split(',')

interface BlockJson { kind: string; text: string; art?: string }
interface ChapterJson { title: string; art?: string; artPrompt?: string; blocks: BlockJson[] }
interface PartJson { chapters: ChapterJson[]; rewriteLast?: ChapterJson; newIntro?: string }

const errors: string[] = []

function validateChapter(ch: ChapterJson, bookId: string, tag: string): void {
  if (!ch.title || typeof ch.title !== 'string') errors.push(`${bookId} ${tag}: missing title`)
  if (!Array.isArray(ch.blocks) || ch.blocks.length < 3 || ch.blocks.length > 9) errors.push(`${bookId} ${tag}: blocks ${ch.blocks?.length} out of range 3-9`)
  const kinds = ch.blocks.map(b => b.kind)
  const imageCount = kinds.filter(k => k === 'image').length
  const noteCount = kinds.filter(k => k === 'note').length
  const textCount = kinds.filter(k => k === 'text').length
  if (imageCount !== 1) errors.push(`${bookId} ${tag}: ${imageCount} image blocks (need exactly 1)`)
  if (noteCount < 1 || noteCount > 2) errors.push(`${bookId} ${tag}: ${noteCount} note blocks (need 1-2)`)
  if (textCount < 2) errors.push(`${bookId} ${tag}: only ${textCount} text blocks`)
  for (const b of ch.blocks ?? []) {
    if (!['text', 'note', 'image'].includes(b.kind)) errors.push(`${bookId} ${tag}: bad kind ${b.kind}`)
    if (!b.text || b.text.length < 10) errors.push(`${bookId} ${tag}: empty block text`)
  }
  const words = (ch.blocks ?? []).filter(b => b.kind === 'text').reduce((n, b) => n + b.text.trim().split(/\s+/).length, 0)
  if (words < 180) errors.push(`${bookId} ${tag}: only ${words} words (need ≥180)`)
  if (!ch.art || !ch.artPrompt) errors.push(`${bookId} ${tag}: missing art or artPrompt`)
}

for (const id of ids) {
  const baseErrors = errors.length
  const metaPath = join(ROOT, id, 'meta.json')
  if (!existsSync(metaPath)) { errors.push(`${id}: no meta.json`); continue }
  const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as { id: string; packFile: string; cur: number; target: number; mode: 'A' | 'B'; parts: string[] }
  const partsDir = join(ROOT, id, 'parts')
  if (!existsSync(partsDir)) { errors.push(`${id}: no parts dir`); continue }
  const partFiles = readdirSync(partsDir).filter(f => f.endsWith('.json')).sort()
  if (partFiles.length === 0) { errors.push(`${id}: no part files`); continue }

  const parts: PartJson[] = partFiles.map(f => JSON.parse(readFileSync(join(partsDir, f), 'utf8')) as PartJson)
  // 校验章数与结构（允许代理合并输出为更少的 part 文件：只验追加总章数）
  const expectNew = meta.mode === 'A' ? meta.target - meta.cur : meta.target - meta.cur
  const gotNew = parts.reduce((n, p) => n + (p.chapters?.length ?? 0), 0)
  if (gotNew !== expectNew) { errors.push(`${id}: appended ${gotNew}, expected ${expectNew} (${partFiles.length} files)`); continue }
  const first = parts[0] as PartJson
  if (meta.mode === 'A' && !first.rewriteLast) { errors.push(`${id}: mode A needs rewriteLast in first part`); continue }

  const allNew = [...(meta.mode === 'A' ? [first.rewriteLast!] : []), ...parts.flatMap(p => p.chapters)]
  allNew.forEach((ch, i) => validateChapter(ch, id, `new-ch${(meta.mode === 'A' ? meta.cur : meta.cur + 1) + i}`))

  // 场景键唯一性（章 art + image 块 art；note 的共享 lamp-hint 除外）——重复自动重命名 -2/-3
  const packSource = readFileSync(join(PACKS_DIR, meta.packFile), 'utf8')
  const existingScenes = new Set<string>()
  const sceneRe = /art: '([^']+)'/g
  let m: RegExpExecArray | null
  while ((m = sceneRe.exec(packSource)) !== null) { if (m[1]) existingScenes.add(m[1]) }
  let renamed = 0
  for (const ch of allNew) {
    const rename = (key: string): string => {
      if (!key || key === 'lamp-hint') return key
      if (!existingScenes.has(key)) { existingScenes.add(key); return key }
      let n = 2
      while (existingScenes.has(`${key}-${n}`)) n++
      const next = `${key}-${n}`
      existingScenes.add(next)
      renamed++
      return next
    }
    ch.art = rename(ch.art ?? "")
    for (const b of ch.blocks) if (b.kind === 'image' && b.art) b.art = ch.art
  }

  // 读现有 pack 的导出对象（不 import，直接从源码提取元数据行——文件会被重写，用源码切 chapters 前的部分）
  const exportMatch = packSource.match(/export const (\w+): PackBook = \{/)
  if (!exportMatch) { errors.push(`${id}: cannot find export in ${meta.packFile}`); continue }
  const exportName = exportMatch[1]

  // 从源码提取现有 pack 对象（用 Node 直接 import 编译产物不可行——改为内嵌提取：
  // 用 tsx 运行时 import 该 pack 文件拿对象（重写发生在 import 之后，安全）
  const before = await import(pathToFileURL(join(PACKS_DIR, meta.packFile)).href).catch(e => { errors.push(`${id}: import failed ${e.message}`); return null })
  if (!before) continue
  const packObj = Object.values(before).find(v => typeof v === 'object' && v !== null && (v as { id?: string }).id === id) as Record<string, unknown> | undefined
  if (!packObj) { errors.push(`${id}: exported object not found`); continue }
  const oldChapters = packObj.chapters as ChapterJson[]
  if (oldChapters.length !== meta.cur) { errors.push(`${id}: pack has ${oldChapters.length} chapters, spec says cur=${meta.cur}`); continue }

  const finalChapters = meta.mode === 'A' ? [...oldChapters.slice(0, meta.cur - 1), first.rewriteLast!, ...parts.flatMap(p => p.chapters)] : [...oldChapters, ...parts.flatMap(p => p.chapters)]
  if (finalChapters.length !== meta.target) errors.push(`${id}: final ${finalChapters.length} != target ${meta.target}`)

  const bookErrors = baseErrors
  const newIntro = first.newIntro || (packObj.intro as string)
  const headComment = `/**\n * ${(packObj.title as string)} — complete ${meta.target}-chapter edition, retold in simple English from the original public-domain text.\n * Existing chapters retained; missing chapters completed 2026-10-25 (找故事全量补全).\n */`

  const out = `${headComment}\nimport type { PackBook } from '../types'\n\nexport const ${exportName}: PackBook = ${JSON.stringify({ ...packObj, intro: newIntro, chapters: finalChapters }, null, 2)}\n`
  if (bookErrors === errors.length) {
    writeFileSync(join(PACKS_DIR, meta.packFile), out)
    console.log(`✓ ${id}: ${meta.mode} ${meta.cur}→${finalChapters.length} 章${renamed ? `（自动重命名 ${renamed} 个场景键）` : ''} (${relative(process.cwd(), join(PACKS_DIR, meta.packFile))})`)
  } else {
    console.log(`✗ ${id}: ${errors.length - bookErrors} 个结构错误，未写入`)
  }
}

if (errors.length) {
  console.error(`\n${errors.length} 个校验错误：`)
  for (const e of errors) console.error('  ✗ ' + e)
  process.exit(1)
}
