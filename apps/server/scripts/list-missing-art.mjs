import { PrismaClient } from '@prisma/client'

const p = new PrismaClient()
try {
  const chapters = await p.chapter.findMany({ select: { bookId: true, order: true, title: true, art: true } })
  const scenes = chapters.map((c) => (c.art && c.art.length > 0 ? c.art : `chapter:${c.bookId}:${c.order}`))
  const rows = await p.artAsset.findMany({ where: { scene: { in: scenes } }, select: { scene: true } })
  const have = new Set(rows.map((r) => r.scene))
  const missing = chapters.filter((c) => !have.has(c.art && c.art.length > 0 ? c.art : `chapter:${c.bookId}:${c.order}`))
  console.log(`missing chapter art: ${missing.length}/${chapters.length}`)
  for (const c of missing) {
    console.log(`  ${c.bookId} ch${c.order} ${c.title} (art=${c.art ?? 'null'})`)
  }
} finally {
  await p.$disconnect()
}
