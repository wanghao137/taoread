import { createDb } from '../src/lib/db'
async function main() {
  for (const url of ['file:./demo.db', 'file:./dev.db']) {
    const db = createDb(url)
    console.log(`--- ${url} ---`)
    console.log('  artAsset:', await db.artAsset.count())
    console.log('  videoAsset:', await db.videoAsset.count(), '(completed:', await db.videoAsset.count({ where: { status: 'completed' } }), ')')
    console.log('  book:', await db.book.count(), 'chapter:', await db.chapter.count())
    await db.$disconnect()
  }
}
main()
