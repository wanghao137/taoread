/**
 * 把 ALL_PACKS 幂等写入 dev.db（开发库）。
 * demo.db 由 demo 入口自动 seed；dev.db 给 gen-art / probe 等脚本用，需要手动灌一次。
 */
import { ALL_PACKS } from '../src/content/packs/index.js'
import { seedAllPacks } from '../src/content/seed.js'
import { createDb } from '../src/lib/db.js'

const db = createDb('file:./dev.db')
const result = await seedAllPacks(db, ALL_PACKS)
console.log('seed 完成：', ALL_PACKS.length, '本书')
console.log('  Book:', await db.book.count(), '条')
console.log('  Chapter:', await db.chapter.count(), '条')
console.log('  Block:', await db.block.count(), '条')
console.log('  RightsLedger:', await db.rightsLedger.count(), '条')
await db.$disconnect()
void result
