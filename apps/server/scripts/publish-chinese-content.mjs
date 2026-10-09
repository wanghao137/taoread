/** Atomic, compare-and-swap content publication. Run against an offline snapshot first, then with the production API stopped. */
import { readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { PrismaClient } from '@prisma/client'
import { ALL_PACKS } from '../src/content/packs/index.ts'
import { packContentVersion, seedPackTransaction } from '../src/content/seed.ts'

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3)
for (const name of ['database', 'staging', 'baseline', 'media']) if (!arg(name)) throw new Error(`Missing --${name}`)
if (!process.argv.includes('--quiescent')) throw new Error('Requires --quiescent: stop the API or use an isolated snapshot')
const baseline = new Map(JSON.parse(readFileSync(arg('baseline'), 'utf8')).map((b) => [b.id, b]))
const packs = ALL_PACKS.filter((p) => p.lang === 'zh' && baseline.get(p.id)?.version !== packContentVersion(p))
if (packs.length !== 33 || packs.filter((p) => !baseline.has(p.id)).length !== 20) throw new Error('Unexpected release scope')
const db = new PrismaClient({ datasources: { db: { url: arg('database') } } })
const staging = new PrismaClient({ datasources: { db: { url: arg('staging') } } })
try {
  const scenes = [...new Set(packs.flatMap((p) => [`cover:${p.id}`, ...p.chapters.flatMap((c, i) => [c.art || `chapter:${p.id}:${i + 1}`, ...c.blocks.filter((b) => b.kind === 'image' && b.art).map((b) => b.art)])]))]
  const assets = await staging.artAsset.findMany({ where: { scene: { in: scenes } } })
  if (assets.length !== scenes.length) throw new Error('Incomplete illustration ledger')
  for (const a of assets) {
    const file = join(arg('media'), a.urlPath.replace(/^\/api\/media\//, ''))
    if (!existsSync(file) || statSync(file).size === 0) throw new Error(`Missing image ${a.scene}`)
  }
  await db.$transaction(async (tx) => {
    for (const p of packs) {
      const current = await tx.book.findUnique({ where: { id: p.id } })
      const before = baseline.get(p.id)
      if (before ? current?.contentVersion !== before.stored.contentVersion : current !== null) throw new Error(`Concurrent content change: ${p.id}`)
    }
    // Reorder semantic chapters without exchanging their stable ids.
    const wukong = await tx.chapter.findMany({ where: { bookId: 'xiyou-wukong' }, orderBy: { order: 'asc' } })
    if (wukong.length !== 8) throw new Error('Unexpected Wukong chapter structure')
    for (const c of wukong) await tx.chapter.update({ where: { id: c.id }, data: { order: c.order + 9000 } })
    for (const [i, old] of [0, 7, 1, 2, 3, 5, 6, 4].entries()) await tx.chapter.update({ where: { id: wukong[old].id }, data: { order: i + 1 } })
    const bone = await tx.chapter.findMany({ where: { bookId: 'xiyou-bonewhite' }, orderBy: { order: 'asc' }, include: { blocks: { orderBy: { order: 'asc' } } } })
    if (bone.length !== 4 || bone[2].blocks.length < 3) throw new Error('Unexpected White Bone chapter structure')
    await tx.chapter.update({ where: { id: bone[3].id }, data: { order: 5 } })
    await tx.chapter.update({ where: { id: bone[2].id }, data: { order: 4 } })
    const second = await tx.chapter.create({ data: { bookId: 'xiyou-bonewhite', order: 3, title: '第三章 · 第二次打', art: 'gujing-second-encounter' } })
    for (const b of bone[2].blocks.slice(0, 2)) await tx.block.update({ where: { id: b.id }, data: { chapterId: second.id } })
    for (const b of bone[2].blocks.slice(2)) await tx.block.update({ where: { id: b.id }, data: { order: b.order + 1000 } })
    for (const [i, b] of bone[2].blocks.slice(2).entries()) await tx.block.update({ where: { id: b.id }, data: { order: i + 1 } })
    // Progress and highlights store numeric positions, so migrate those too.
    const position = (bookId, chapterOrder, blockOrder) => {
      if (bookId === 'xiyou-wukong') return { chapterOrder: [1, 3, 4, 5, 8, 6, 7, 2][chapterOrder - 1] || chapterOrder, blockOrder }
      if (chapterOrder === 4) return { chapterOrder: 5, blockOrder }
      if (chapterOrder === 3 && blockOrder > 2) return { chapterOrder: 4, blockOrder: blockOrder - 2 }
      return { chapterOrder, blockOrder }
    }
    for (const bookId of ['xiyou-wukong', 'xiyou-bonewhite']) {
      for (const r of await tx.readingProgress.findMany({ where: { bookId } })) await tx.readingProgress.update({ where: { id: r.id }, data: { ...position(bookId, r.chapterOrder, r.blockOrder), updatedAt: r.updatedAt } })
      const highlights = await tx.bookHighlight.findMany({ where: { bookId } })
      for (const h of highlights) await tx.bookHighlight.update({ where: { id: h.id }, data: { chapterOrder: h.chapterOrder + 9000 } })
      for (const h of highlights) await tx.bookHighlight.update({ where: { id: h.id }, data: position(bookId, h.chapterOrder, h.blockOrder) })
    }
    for (const p of packs) await seedPackTransaction(tx, p)
    for (const a of assets) {
      const { id, createdAt, ...data } = a
      void [id, createdAt]
      await tx.artAsset.upsert({ where: { scene: a.scene }, create: data, update: data })
    }
  }, { timeout: 300_000 })
  const integrity = await db.$queryRawUnsafe('PRAGMA integrity_check')
  if (integrity[0]?.integrity_check !== 'ok') throw new Error('SQLite integrity check failed')
  console.log(JSON.stringify({ updated: 13, added: 20, chinese: await db.book.count({ where: { lang: 'zh' } }), integrity: 'ok' }))
} finally { await db.$disconnect(); await staging.$disconnect() }
