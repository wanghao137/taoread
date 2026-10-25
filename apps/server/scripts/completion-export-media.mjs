/**
 * 补全发布·媒体同步：把本地（dev.db）72 本扩章书的 ArtAsset 台账行 + 图片文件同步到生产。
 *
 * 用法：
 *   导出（本地，cwd=apps/server）：node --import tsx scripts/completion-export-media.mjs --out=../e2e/output/completion-media
 *   导入（生产，cwd=D:/taoread-prod/apps/server）：node --import tsx scripts/completion-export-media.mjs --in=../e2e/output/completion-media --apply
 *
 * 幂等：生产已有同 scene 的 ArtAsset 跳过（不覆盖、不重传文件）。
 * 场景集合来自 ALL_PACKS 的 coverArt + 章节 art + image 块 art（与 gen-art 完全同口径）。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, statSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config()

const args = process.argv.slice(2)
const out = args.find(a => a.startsWith('--out='))?.slice(6)
const inDir = args.find(a => a.startsWith('--in='))?.slice(5)
const apply = args.includes('--apply')
const db = new PrismaClient({ datasources: { db: { url: process.env.TAO_DATABASE_URL ?? 'file:./dev.db' } } })

const specPath = join(__dirname, 'completion', 'spec.tsv')
const bookIds = new Set(readFileSync(specPath, 'utf8').trim().split('\n').slice(1).map(l => l.split('\t')[0]))
const mediaDir = process.env.TAO_MEDIA_DIR ?? join(__dirname, '..', 'media')

const { ALL_PACKS } = await import(pathToFileURL(join(__dirname, '..', 'src', 'content', 'packs', 'index.ts')).href)
const scenes = new Set()
for (const p of ALL_PACKS) {
  if (!bookIds.has(p.id)) continue
  scenes.add(`cover:${p.id}`)
  p.chapters.forEach((ch, i) => {
    scenes.add(ch.art ?? `chapter:${p.id}:${i + 1}`)
    for (const b of ch.blocks) if (b.kind === 'image' && b.art) scenes.add(b.art)
  })
}

if (out) {
  const assets = await db.artAsset.findMany({ where: { scene: { in: [...scenes] } } })
  const rows = []
  const files = new Set()
  let missing = 0
  for (const a of assets) {
    const rel = a.urlPath.replace(/^\/api\/media\//, '')
    const abs = join(mediaDir, rel)
    if (!existsSync(abs) || statSync(abs).size === 0) { console.error('缺文件:', a.scene, rel); missing++; continue }
    files.add(rel)
    // 变体（thumb/reader 档）同目录相邻同基名文件一并带上
    const base = rel.replace(/\.webp$/, '')
    const dir = join(mediaDir, dirname(rel))
    for (const f of readdirSync(dir)) {
      if (f.endsWith('.webp') && f.includes(base.split('/').pop().split('.')[0])) files.add(join(dirname(rel), f))
    }
    rows.push({ scene: a.scene, kind: a.kind, urlPath: a.urlPath, width: a.width, height: a.height, bytes: a.bytes, prompt: a.prompt, model: a.model })
  }
  mkdirSync(out, { recursive: true })
  const fileList = [...files]
  for (const rel of fileList) {
    mkdirSync(join(out, 'files', dirname(rel)), { recursive: true })
    copyFileSync(join(mediaDir, rel), join(out, 'files', rel))
  }
  writeFileSync(join(out, 'art-ledger.json'), JSON.stringify(rows, null, 2))
  writeFileSync(join(out, 'art-files.json'), JSON.stringify(fileList, null, 2))
  console.log(`导出 ${rows.length} 台账行、${fileList.length} 文件（场景 ${scenes.size}、缺文件 ${missing}）→ ${out}`)
  await db.$disconnect()
  process.exit(0)
}

if (!inDir || !apply) { console.error('用法: --out=<dir> 导出 | --in=<dir> --apply 导入'); process.exit(1) }
const ledger = JSON.parse(readFileSync(join(inDir, 'art-ledger.json'), 'utf8'))
const files = JSON.parse(readFileSync(join(inDir, 'art-files.json'), 'utf8'))
let inserted = 0, skipped = 0, copied = 0
for (const rel of files) {
  const src = join(inDir, 'files', rel)
  const dst = join(mediaDir, rel)
  if (!existsSync(dst)) {
    mkdirSync(dirname(dst), { recursive: true })
    copyFileSync(src, dst)
    copied++
  }
}
for (const row of ledger) {
  const existing = await db.artAsset.findUnique({ where: { scene: row.scene } })
  if (existing) { skipped++; continue }
  await db.artAsset.create({ data: row })
  inserted++
}
console.log(`导入完成：新增台账 ${inserted}、已存在跳过 ${skipped}、复制文件 ${copied}`)
await db.$disconnect()
