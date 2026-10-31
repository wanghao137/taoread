/**
 * 找故事第四轮·新书组装器（2026-10-31）。
 *
 * 用法：node --import tsx scripts/expand-assemble.mts --book=<id>[,<id2>] | --all
 * 输入：scripts/expand-20261031/<id>/meta.json + <id>/parts/part-*.json
 * 输出：src/content/packs/<packFile>（JSON-in-TS）+ packs/index.ts 自动注册（幂等）。
 *
 * 契约（代理产 parts 前必读）：
 *  - 每章 blocks 3-9 个：恰 1 个 image（art=本章场景键）、1-2 个 note（art=lamp-hint）、≥2 个 text；
 *  - zh 每 ≥140 字 / en 每 ≥180 words（text 块合计）；
 *  - 章题与 meta.plan[i].title 逐字一致，顺序一致；
 *  - 场景键全库唯一（本脚本对全库 pack 扫描，冲突自动 -2/-3 重命名）。
 * parts 落盘即成果有效（docs/86 口径）：文件在即可组装，无需代理完成收尾。
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PACKS_DIR = join(__dirname, '..', 'src', 'content', 'packs')
const ROUND_DIR = join(__dirname, 'expand-20261031')

const args = process.argv.slice(2)
const bookArg = args.find((a) => a.startsWith('--book='))?.slice('--book='.length)
const all = args.includes('--all')
if (!bookArg && !all) throw new Error('用法: --book=<id>[,<id2>] | --all')
const ids: string[] = all
  ? readdirSync(ROUND_DIR).filter((d) => existsSync(join(ROUND_DIR, d, 'meta.json')))
  : (bookArg as string).split(',')

interface BlockJson { kind: string; text: string; art?: string }
interface ChapterJson { title: string; art?: string; artPrompt?: string; blocks: BlockJson[] }
interface PlanItem { title: string; beats?: string[]; sourceRef?: string }
interface Meta {
  id: string
  packFile: string
  target: number
  book: {
    title: string
    author?: string
    lang: 'zh' | 'en'
    category: 'poetry' | 'primer' | 'story' | 'tale'
    ageStage: '3-5' | '6-8' | '9-12'
    intro?: string
    coverArt: string
    coverArtPrompt?: string
    coverFrom?: string
    coverTo?: string
    source: string
    rights: {
      workTitle: string
      author?: string
      authorDeathYear?: number
      jurisdiction: 'CN' | 'US' | 'EU'
      basis: 'pd-70' | 'pd-us' | 'original' | 'adapted' | 'cc-by'
      sourceUrl?: string
      note?: string
    }
  }
  plan: PlanItem[]
}

const errors: string[] = []

/** 收集全库已有场景键（art: '...' / art: "..."）。 */
function collectExistingScenes(): Set<string> {
  const scenes = new Set<string>()
  for (const f of readdirSync(PACKS_DIR)) {
    if (!f.endsWith('.ts')) continue
    const src = readFileSync(join(PACKS_DIR, f), 'utf8')
    const re = /art: '([^']+)'|art: "([^"]+)"/g
    let m: RegExpExecArray | null
    while ((m = re.exec(src)) !== null) {
      const key = m[1] ?? m[2]
      if (key) scenes.add(key)
    }
  }
  return scenes
}

function toCamel(id: string): string {
  const parts = id.split('-')
  return parts[0] + parts.slice(1).map((p) => (p ? p[0]!.toUpperCase() + p.slice(1) : p)).join('')
}

function validateChapter(ch: ChapterJson, bookId: string, lang: 'zh' | 'en', tag: string): void {
  if (!ch || !ch.title || typeof ch.title !== 'string') { errors.push(`${bookId} ${tag}: missing title`); return }
  if (!Array.isArray(ch.blocks) || ch.blocks.length < 3 || ch.blocks.length > 9) {
    errors.push(`${bookId} ${tag}: blocks ${ch.blocks?.length} out of range 3-9`)
  }
  const kinds = (ch.blocks ?? []).map((b) => b.kind)
  const imageCount = kinds.filter((k) => k === 'image').length
  const noteCount = kinds.filter((k) => k === 'note').length
  const textCount = kinds.filter((k) => k === 'text').length
  if (imageCount !== 1) errors.push(`${bookId} ${tag}: ${imageCount} image blocks (need exactly 1)`)
  if (noteCount < 1 || noteCount > 2) errors.push(`${bookId} ${tag}: ${noteCount} note blocks (need 1-2)`)
  if (textCount < 2) errors.push(`${bookId} ${tag}: only ${textCount} text blocks`)
  for (const b of ch.blocks ?? []) {
    if (!['text', 'note', 'image'].includes(b.kind)) errors.push(`${bookId} ${tag}: bad kind ${b.kind}`)
    if (!b.text || b.text.trim().length < 10) errors.push(`${bookId} ${tag}: empty/short block text`)
  }
  const len = (ch.blocks ?? [])
    .filter((b) => b.kind === 'text' && b.text)
    .reduce((n, b) => n + (lang === 'en'
      ? (b.text as string).trim().split(/\s+/).filter(Boolean).length
      : (b.text as string).replace(/[^\p{L}\p{N}]/gu, '').length), 0)
  const floor = lang === 'en' ? 180 : 140
  if (len < floor) errors.push(`${bookId} ${tag}: ${lang} 长度 ${len} < ${floor}`)
  if (!ch.art || !ch.artPrompt) errors.push(`${bookId} ${tag}: missing art or artPrompt`)
}

for (const id of ids) {
  const base = errors.length
  const metaPath = join(ROUND_DIR, id, 'meta.json')
  if (!existsSync(metaPath)) { errors.push(`${id}: no meta.json`); continue }
  const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as Meta

  const partsDir = join(ROUND_DIR, id, 'parts')
  const partFiles = existsSync(partsDir) ? readdirSync(partsDir).filter((f) => f.endsWith('.json')).sort() : []
  if (partFiles.length === 0) { errors.push(`${id}: no parts files`); continue }
  const chapters = partFiles.flatMap((f) => (JSON.parse(readFileSync(join(partsDir, f), 'utf8')) as { chapters?: ChapterJson[] }).chapters ?? [])

  if (chapters.length !== meta.target) { errors.push(`${id}: ${chapters.length} 章, expected ${meta.target}`); continue }
  chapters.forEach((ch, i) => validateChapter(ch, id, meta.book.lang, `ch${i + 1}`))
  meta.plan.forEach((p, i) => {
    const ch = chapters[i]
    // en 书章题由代理从底本目录生成：plan.title 作前缀校验（zh 为完整题，天然匹配）
    if (ch && !ch.title.startsWith(p.title)) errors.push(`${id} ch${i + 1}: 章题漂移「${ch.title}」 vs plan「${p.title}」`)
  })
  if (errors.length > base) continue

  // 场景键全库唯一：先章内键，后封面键（封面不应与本章场景同名——不同画）
  const scenes = collectExistingScenes()
  let renamed = 0
  const rename = (key: string): string => {
    if (!key || key === 'lamp-hint') return key
    if (!scenes.has(key)) { scenes.add(key); return key }
    let n = 2
    while (scenes.has(`${key}-${n}`)) n++
    const next = `${key}-${n}`
    scenes.add(next)
    renamed++
    return next
  }
  for (const ch of chapters) {
    const chArt = rename(ch.art ?? '')
    ch.art = chArt
    for (const b of ch.blocks) {
      // image 块 art 与章 art 同键属同一场景（读者端同一张图两处引用），不得二次改名
      if (b.kind === 'image' && b.art) b.art = (b.art === (ch.art ?? '') ? chArt : rename(b.art))
      if (b.kind === 'note' && b.art && b.art !== 'lamp-hint') delete b.art
    }
  }
  const coverKey = rename(meta.book.coverArt)
  if (coverKey !== meta.book.coverArt) console.log(`  ~ ${id}: 封面键冲突 → ${coverKey}`)
  meta.book.coverArt = coverKey

  if (errors.length > base) continue
  if (renamed > 0) console.log(`  ~ ${id}: ${renamed} 个场景键冲突重命名`)

  const packObj = { id: meta.id, ...meta.book, chapters } as Record<string, unknown>
  const header = `/**
 * 《${meta.book.title}》——找故事内容扩充第四轮（2026-10-31）。
 * 底本：${meta.book.source}
 */`
  const camel = toCamel(meta.id)
  const ts = `${header}
import type { PackBook } from '../types'

export const ${camel}: PackBook = ${JSON.stringify(packObj, null, 2)}
`

  writeFileSync(join(PACKS_DIR, meta.packFile), ts)
  const indexPath = join(PACKS_DIR, 'index.ts')
  const indexSrc = readFileSync(indexPath, 'utf8')
  const importPath = `./${meta.packFile.replace(/\.ts$/, '')}`
  const already = indexSrc.includes(`from '${importPath}'`) || new RegExp(`\n  ${camel},`).test(indexSrc)
  if (!already) {
    let next = indexSrc.replace(/(\n)(export const ALL_PACKS)/, `$1import { ${camel} } from '${importPath}'$1$2`)
    next = next.replace(/\n]\.map\(correctChineseEditions\)/, `\n  ${camel},\n].map(correctChineseEditions)`)
    writeFileSync(indexPath, next)
    console.log(`  ✓ ${id} → ${meta.packFile}（新注册 index）`)
  } else {
    console.log(`  ✓ ${id} → ${meta.packFile}（index 已注册）`)
  }
  console.log(`  ✓ ${id}: ${chapters.length} 章 / ${chapters.reduce((n, c) => n + c.blocks.length, 0)} 块 组装完成`)
}

if (errors.length > 0) {
  console.error(`\n${errors.length} 个错误：`)
  for (const e of errors) console.error('  ✗ ' + e)
  process.exit(1)
}
console.log('组装完成')
