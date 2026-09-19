import { PrismaClient } from '@prisma/client'

const p = new PrismaClient()
try {
  const [covers, books, chapters] = await Promise.all([
    p.artAsset.count({ where: { scene: { startsWith: 'cover:' } } }),
    p.book.count(),
    p.chapter.count(),
  ])
  const chapterArt = await p.artAsset.count({ where: { scene: { startsWith: 'chapter:' } } })
  const otherArt = await p.artAsset.count()
  const videos = await p.videoAsset.count({ where: { urlPath: { not: null } } })
  console.log(`covers: ${covers}/${books}  chapter art: ${chapterArt}/${chapters}  total artAsset rows: ${otherArt}  videos: ${videos}`)
} finally {
  await p.$disconnect()
}
