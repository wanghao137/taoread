/**
 * 内容规模巡检：书/章/块/音色/媒体。
 * 源是 .ts，用 tsx 跑：npx tsx scripts/count-content.mjs
 */
import { ALL_PACKS } from '../src/content/packs/index.js'
import { VOICE_PRESETS } from '../src/modules/tts/voices.js'
import { createDb } from '../src/lib/db.js'

const db = createDb('file:./dev.db')
const blocks = ALL_PACKS.reduce(
  (s, p) => s + p.chapters.reduce((c, ch) => c + ch.blocks.length, 0),
  0,
)
console.log('=== 书 ===', ALL_PACKS.length, '本', ALL_PACKS.reduce((s, p) => s + p.chapters.length, 0), '章', blocks, '块')
console.log('=== 音色 ===', VOICE_PRESETS.length, '种')
for (const v of VOICE_PRESETS) console.log('  ', v.label, '|', v.lang, '|', v.id)
console.log('=== 媒体(dev.db) ===')
console.log('AI 插画:', await db.artAsset.count(), '张')
console.log('AI 视频:', await db.videoAsset.count(), '条（completed:', await db.videoAsset.count({ where: { status: 'completed' } }), '）')
await db.$disconnect()
