/**
 * 批量生成 AI 插画（docs/13 P0-A/P0-D）。
 *
 * 用法：cd apps/server && node --import tsx scripts/gen-art.mjs [--covers-only] [--book <slug>] [--regenerate]
 *
 * 行为：
 *  - 遍历 ALL_PACKS，为每本书生成封面 + 各章题图
 *  - 幂等：DB 里已有 ArtAsset 的场景跳过（不重复出网、不重复花钱）
 *  - 失败不中断：单个场景失败只记日志，继续下一个
 *  - 顺序生成（不并发），避免压垮生图服务
 *
 * 这是离线脚本，不经 HTTP 路由：演示前跑一次把插画备好，
 * 用户访问时媒体静态服务直接吐 WebP。
 */
import 'dotenv/config'
import { createDb } from '../src/lib/db'
import { ALL_PACKS } from '../src/content/packs'
import { ImageGenerator } from '../src/modules/media/imagegen'
import { compressPngToWebP } from '../src/modules/media/compress'
import { labelWebpImage } from '../src/modules/media/label'
import { loadConfig, imageGenAvailable } from '../src/config'
import { join } from 'node:path'

const args = new Set(process.argv.slice(2))
const coversOnly = args.has('--covers-only')
// docs/19 N13-003：prompt/档位升级后强制重生成已存在场景（默认幂等跳过，只补缺失项）
const regenerate = args.has('--regenerate')
const onlyBook = [...args].find((a) => a.startsWith('--book='))?.slice('--book='.length) ?? null

async function main(): Promise<void> {
  const config = loadConfig()
  if (!imageGenAvailable(config)) {
    console.error('未配置 TAO_IMAGE_BASE / TAO_IMAGE_KEY，无法生成插画')
    process.exit(1)
  }
  const db = createDb(config.TAO_DATABASE_URL)
  const mediaDir = join(process.cwd(), 'media')
  const gen = new ImageGenerator(
    { base: config.TAO_IMAGE_BASE!, apiKey: config.TAO_IMAGE_KEY!, model: config.TAO_IMAGE_MODEL },
    mediaDir,
    compressPngToWebP,
    (webp, scene, kind) =>
      labelWebpImage(webp, { provider: 'taoread', model: config.TAO_IMAGE_MODEL, scene, kind }),
  )

  const packs = ALL_PACKS.filter((p) => onlyBook === null || p.id === onlyBook)
  if (packs.length === 0) {
    console.error(`没有匹配的书：${onlyBook}`)
    process.exit(1)
  }

  let ok = 0
  let skip = 0
  let fail = 0
  const t0 = Date.now()

  for (const pack of packs) {
    console.log(`\n📖 ${pack.title}（${pack.id}）`)
    const scenes: Array<{ kind: 'cover' | 'chapter'; scene: string; description: string; label: string }> = [
      {
        kind: 'cover',
        scene: `cover:${pack.id}`,
        description: pack.coverArtPrompt ?? pack.intro ?? pack.title,
        label: pack.title,
      },
    ]
    if (!coversOnly) {
      for (const ch of pack.chapters) {
        scenes.push({
          kind: 'chapter',
          scene: ch.art ?? `chapter:${pack.id}:${pack.chapters.indexOf(ch) + 1}`,
          description: ch.artPrompt ?? `${pack.title}·${ch.title}：与内容相符的安静优美画面`,
          label: `${pack.title}·${ch.title}`,
        })
        // docs/24：章节内 image 块各自有独立场景键时也生成（共用章节键的天然被上一条覆盖）
        for (const b of ch.blocks) {
          if (b.kind !== 'image' || !b.art) continue
          if (b.art === ch.art) continue // 共用章节题图，不重复
          if (scenes.some((s) => s.scene === b.art)) continue
          scenes.push({
            kind: 'chapter',
            scene: b.art,
            description: `${pack.title}·${ch.title}：${b.text}（与图注相符的安静优美画面）`,
            label: `${pack.title}·${ch.title}·插图`,
          })
        }
      }
    }

    for (const s of scenes) {
      const existing = await db.artAsset.findUnique({ where: { scene: s.scene }, select: { id: true } })
      if (existing && !regenerate) {
        skip++
        console.log(`  ⏭  ${s.scene}（已存在）`)
        continue
      }
      try {
        const art = await gen.generate({
          kind: s.kind,
          scene: s.scene,
          description: s.description,
          label: s.label,
          lang: pack.lang,
        })
        if (!art) {
          fail++
          console.log(`  ✗  ${s.scene}（生成失败）`)
          continue
        }
        await db.artAsset.upsert({
          where: { scene: s.scene },
          create: {
            scene: s.scene,
            kind: s.kind,
            urlPath: art.urlPath,
            width: art.width,
            height: art.height,
            bytes: art.bytes,
            prompt: art.prompt,
            model: art.model,
          },
          update: {},
        })
        ok++
        console.log(`  ✓  ${s.scene}（${(art.bytes / 1024).toFixed(0)}KB ${art.width}x${art.height}）`)
      } catch (err) {
        fail++
        console.log(`  ✗  ${s.scene}（${String((err as Error).message).slice(0, 80)}）`)
      }
    }
  }

  const sec = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`\n完成：成功 ${ok}，跳过 ${skip}，失败 ${fail}（${sec}s）`)
  await db.$disconnect()
}

main().catch((err) => {
  console.error('生成脚本失败：', err)
  process.exit(1)
})
