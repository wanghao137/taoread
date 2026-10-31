/**
 * 补全发布：生产库上 seedPack 幂等入库 72 本扩章书并显式发布。
 *
 * 用法（cwd=D:/taoread-prod/apps/server，须先 git reset 到发布 commit）：
 *   node --import tsx scripts/completion-publish.mjs --apply        # 实际执行
 *   node --import tsx scripts/completion-publish.mjs                # dry-run：只打印差异
 *
 * 流程：逐本 seedPack（保留章节 id 与阅读进度；contentVersion 变化自动回 draft）
 *       → 全部完成后对 72 本显式 publicationStatus='published'。
 * 前置：媒体已由 completion-export-media.mjs 同步；TTS 已在公共音频桶。
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config()

const apply = process.argv.includes('--apply')
const db = new PrismaClient({ datasources: { db: { url: process.env.TAO_DATABASE_URL ?? 'file:./prod.db' } } })

// --list=<文件> 可覆盖书单（如 scripts/expand-20261031/round.tsv）；默认仍是补全轮 spec.tsv
const listArg = process.argv.find(a => a.startsWith('--list='))?.slice('--list='.length)
const bookIds = readFileSync(listArg ?? join(__dirname, 'completion', 'spec.tsv'), 'utf8').trim().split('\n').slice(1).map(l => l.split('\t')[0])
console.log(`发布 ${bookIds.length} 本扩章书${apply ? '' : '（dry-run）'}`)

const { ALL_PACKS } = await import(pathToFileURL(join(__dirname, '..', 'src', 'content', 'packs', 'index.ts')).href)
const { seedPackTransaction, packContentVersion } = await import(pathToFileURL(join(__dirname, '..', 'src', 'content', 'seed.ts')).href)

let changed = 0
for (const pack of ALL_PACKS) {
  if (!bookIds.includes(pack.id)) continue
  const before = await db.book.findUnique({ where: { id: pack.id }, select: { contentVersion: true, publicationStatus: true } })
  const currentVersion = await db.chapter.count({ where: { bookId: pack.id } })
  if (before && before.contentVersion === packContentVersion(pack)) {
    console.log(`  = ${pack.id} 已是最新（${currentVersion} 章，${before.publicationStatus}）`)
    continue
  }
  if (!apply) {
    console.log(`  ~ ${pack.id} ${currentVersion}→${pack.chapters.length} 章（将入库）`)
    changed++
    continue
  }
  await db.$transaction(async tx => { await seedPackTransaction(tx, pack) }, { timeout: 120_000 })
  changed++
  console.log(`  ✓ ${pack.id} ${currentVersion}→${pack.chapters.length} 章入库`)
}

if (apply) {
  const res = await db.book.updateMany({ where: { id: { in: bookIds } }, data: { publicationStatus: 'published' } })
  console.log(`\n已发布 ${res.count} 本`)
} else {
  console.log(`\ndry-run：${changed} 本将变更。加 --apply 执行。`)
}
await db.$disconnect()
