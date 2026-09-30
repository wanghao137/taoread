/**
 * 家庭导入书 AI 插画生成（2026-09-30）。
 *
 * 与公共书库 gen-art.ts 同一条生图链路（ImageGenerator → webp → ArtAsset），
 * 差异在场景键与私有性：场景 = fam:<familyId>:imp:<hex>:cover|ch:<order>，
 * 以 fam: 前缀走媒体路由的家庭私有分支（票据/令牌 + 家庭归属校验），
 * R2 同步自动排除（私有素材不出网）。
 *
 * 提示词从章节标题 + 正文摘录自动推导，无需人工逐章写 artPrompt。
 * 幂等：已有 ArtAsset 的场景跳过（--regenerate 强制重生成）。
 *
 * 用法（对生产实例，env 用生产 .env 提供 TAO_IMAGE_* 与 TAO_MEDIA_DIR）：
 *   node --env-file=D:\taoread-prod\apps\server\.env --import tsx \
 *     scripts/gen-family-art.mjs --book=imp:<hex> [--covers-only] [--regenerate]
 */
import { PrismaClient } from '@prisma/client'
import { loadConfig, imageGenAvailable } from '../src/config.ts'
import { ImageGenerator } from '../src/modules/media/imagegen.ts'
import { compressPngToWebP } from '../src/modules/media/compress.ts'
import { labelWebpImage } from '../src/modules/media/label.ts'

const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=')
const bookId = arg('book')
const coversOnly = process.argv.includes('--covers-only')
const regenerate = process.argv.includes('--regenerate')
if (!bookId || !bookId.startsWith('imp:')) { console.error('缺少 --book=imp:<id>'); process.exit(1) }

const p = new PrismaClient()
const config = loadConfig()
if (!imageGenAvailable(config)) { console.error('未配置 TAO_IMAGE_BASE / TAO_IMAGE_KEY，无法生成插画'); process.exit(1) }

const book = await p.importedBook.findUnique({ where: { id: bookId }, select: { id: true, title: true, author: true, lang: true, familyId: true } })
if (!book) { console.error('没有找到这本家庭书'); process.exit(1) }
const familyId = book.familyId
const hex = book.id.startsWith('imp:') ? book.id.slice(4) : book.id
const scenePrefix = `fam:${familyId}:imp:${hex}`

const gen = new ImageGenerator(
  { base: config.TAO_IMAGE_BASE!, apiKey: config.TAO_IMAGE_KEY!, model: config.TAO_IMAGE_MODEL },
  config.TAO_MEDIA_DIR,
  compressPngToWebP,
  (webp, scene, kind) => labelWebpImage(webp, { provider: 'taoread', model: config.TAO_IMAGE_MODEL, scene, kind }),
)

const scenes = [{
  kind: 'cover',
  scene: `${scenePrefix}:cover`,
  description: `儿童绘本封面插画，温馨明快、充满想象力：《${book.title}》${book.author ? `（${book.author}）` : ''}`,
  label: book.title,
  lang: book.lang === 'en' ? 'en' : 'zh',
}]
if (!coversOnly) {
  const chapters = await p.importedChapter.findMany({ where: { bookId: book.id }, orderBy: { order: 'asc' }, select: { order: true, title: true, text: true } })
  for (const chapter of chapters) {
    const clean = chapter.text.replace(/\[\[img:[^\]]+\]\]/g, '').replace(/\s+/g, ' ').trim()
    const excerpt = clean.slice(0, 160)
    scenes.push({
      kind: 'chapter',
      scene: `${scenePrefix}:ch:${chapter.order}`,
      description: `儿童故事插画，安静优美、与故事内容相符：《${chapter.title}》。${excerpt}`,
      label: `${book.title}·${chapter.title}`,
      lang: book.lang === 'en' ? 'en' : 'zh',
    })
  }
}

let ok = 0, skip = 0, fail = 0
const t0 = Date.now()
console.log(`📖 ${book.title}（${book.id}，家庭 ${familyId}）——场景 ${scenes.length} 个`)
for (const s of scenes) {
  const existing = await p.artAsset.findUnique({ where: { scene: s.scene }, select: { id: true } })
  if (existing && !regenerate) { skip += 1; continue }
  try {
    const art = await gen.generate({ kind: s.kind, scene: s.scene, description: s.description, label: s.label, lang: s.lang })
    if (!art) { fail += 1; console.log(`  ✗  ${s.scene}（生成失败）`); continue }
    await p.artAsset.upsert({ where: { scene: s.scene }, create: { scene: s.scene, kind: s.kind, urlPath: art.urlPath, width: art.width, height: art.height, bytes: art.bytes, prompt: art.prompt, model: art.model }, update: {} })
    ok += 1
    if (ok % 10 === 0) console.log(`  进度：成功 ${ok} / 失败 ${fail}（${Math.round((Date.now() - t0) / 60000)} 分钟）`)
  } catch (err) {
    fail += 1
    console.log(`  ✗  ${s.scene}（${String(err.message ?? err).slice(0, 80)}）`)
  }
}
console.log(`完成：成功 ${ok}，跳过 ${skip}，失败 ${fail}，耗时 ${Math.round((Date.now() - t0) / 60000)} 分钟`)
console.log(fail === 0 ? 'FAMILY_ART_CLEAN' : `FAMILY_ART_WITH_FAILURES:${fail}`)
await p.$disconnect()
