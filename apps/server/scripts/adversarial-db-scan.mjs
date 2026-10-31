/**
 * 对抗审查②：生产库 72 本补全书数据完整性扫描。
 * 攻击面：章数漂移/空块/空章/块序断裂/image 块缺 art/场景缺台账/rights 缺失/words 失真/contentVersion 漂移/pinyin 对齐。
 * 用法（cwd=D:/taoread-prod/apps/server）：node --import tsx scripts/adversarial-db-scan.mjs
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config()
const db = new PrismaClient({ datasources: { db: { url: process.env.TAO_DATABASE_URL ?? 'file:./prod.db' } } })

// --list=<文件> 可覆盖书单（如本轮 expand-20261031/round.tsv）；默认仍是补全轮 spec.tsv
const listArg = process.argv.find(a => a.startsWith('--list='))?.slice('--list='.length)
const bookIds = readFileSync(listArg ?? join(__dirname, 'completion', 'spec.tsv'), 'utf8').trim().split('\n').slice(1).map(l => l.split('\t')[0])
const { ALL_PACKS } = await import(pathToFileURL(join(__dirname, '..', 'src', 'content', 'packs', 'index.ts')).href)
const { packContentVersion, countWords } = await import(pathToFileURL(join(__dirname, '..', 'src', 'content', 'seed.ts')).href)
const packs = new Map(ALL_PACKS.filter(p => bookIds.includes(p.id)).map(p => [p.id, p]))

const issues = []
let checked = 0

for (const id of bookIds) {
  const pack = packs.get(id)
  if (!pack) { issues.push(`${id}: pack 缺失`); continue }
  const dbBook = await db.book.findUnique({
    where: { id },
    include: { chapters: { orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } } },
  })
  if (!dbBook) { issues.push(`${id}: 生产库无书`); continue }
  checked++

  // 1 章数漂移
  if (dbBook.chapters.length !== pack.chapters.length) issues.push(`${id}: 章数漂移 DB=${dbBook.chapters.length} pack=${pack.chapters.length}`)
  // 8 contentVersion 漂移
  if (dbBook.contentVersion !== packContentVersion(pack)) issues.push(`${id}: contentVersion 漂移`)
  // 9 words 失真
  const expectedWords = countWords(pack)
  if (Math.abs(dbBook.words - expectedWords) > expectedWords * 0.01 + 5) issues.push(`${id}: words 失真 DB=${dbBook.words} 期望=${expectedWords}`)
  if (dbBook.publicationStatus !== 'published') issues.push(`${id}: 状态=${dbBook.publicationStatus}`)

  const arts = new Set((await db.artAsset.findMany({
    where: { OR: [{ scene: `cover:${id}` }, { scene: { in: collectScenes(pack) } }] }, select: { scene: true },
  })).map(a => a.scene))
  if (!arts.has(`cover:${id}`)) issues.push(`${id}: 封面场景缺台账`)

  dbBook.chapters.forEach((ch, ci) => {
    const pch = pack.chapters[ci]
    // 2 章序断裂
    if (ch.order !== ci + 1) issues.push(`${id} ch${ch.order}: order 断裂`)
    if (pch && ch.title !== pch.title) issues.push(`${id} ch${ch.order}: 标题漂移「${ch.title}」vs「${pch.title}」`)
    if (ch.blocks.length === 0) { issues.push(`${id} ch${ch.order}: 空章`); return }
    // 3 空块/短文本
    for (const b of ch.blocks) {
      if (!b.text || b.text.trim().length < 10) issues.push(`${id} ch${ch.order} b${b.order}: 空短块「${(b.text ?? '').slice(0, 20)}」`)
      // 5 image 块缺 art
      if (b.kind === 'image' && !b.art) issues.push(`${id} ch${ch.order} b${b.order}: image 块无 art`)
      if (b.kind === 'image' && b.art && !arts.has(b.art)) issues.push(`${id} ch${ch.order}: image 场景 ${b.art} 缺台账`)
      // 10 pinyin 对齐（仅中文书 poem 块）
      if (b.kind === 'poem' && b.pinyin && pack.lang === 'zh') {
        const hanzi = (b.text.match(/\p{Script=Han}/gu) ?? []).length
        const py = b.pinyin.trim().split(/\s+/).filter(Boolean).length
        if (Math.abs(hanzi - py) > 2) issues.push(`${id} ch${ch.order} b${b.order}: 拼音对齐差 汉字${hanzi} vs 音节${py}`)
      }
    }
    // 6 章 art 缺台账
    const chArt = ch.art ?? `chapter:${id}:${ch.order}`
    if (!arts.has(chArt)) issues.push(`${id} ch${ch.order}: 章场景 ${chArt} 缺台账`)
  })
  // 7 rights 台账
  const rights = await db.rightsLedger.findUnique({ where: { bookId: id } })
  if (!rights) issues.push(`${id}: rights 台账缺失`)
}

function collectScenes(p) {
  const s = []
  p.chapters.forEach((ch, i) => {
    s.push(ch.art ?? `chapter:${p.id}:${i + 1}`)
    for (const b of ch.blocks) if (b.kind === 'image' && b.art) s.push(b.art)
  })
  return s
}

console.log(`扫描 ${checked}/${bookIds.length} 本，发现 ${issues.length} 个问题`)
for (const i of issues.slice(0, 60)) console.log('  ✗', i)
if (issues.length > 60) console.log(`  …另 ${issues.length - 60} 条`)
await db.$disconnect()
