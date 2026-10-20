/**
 * 插图缩图档（2026-09-25 性能方案阶段 1）。
 *
 * 书架/找故事网格只显示 100-180px 宽，却加载 1024px 原图（中位 364KB）——
 * 320px thumb（约 20KB）给列表与详情格，800px reader（约 120KB）给阅读器题图。
 * 文件约定：<name>.thumb.webp / <name>.reader.webp，与原图同目录；
 * 服务按「基准 ArtAsset 行存在且非家庭私有」放行（见 media/routes.ts）。
 * 生成失败不阻断主图——前端对变体 404 有回退原图逻辑。
 */
import { rename } from 'node:fs/promises'
import sharp from 'sharp'

export const ART_VARIANTS = [
  { suffix: 'thumb', width: 320 },
  { suffix: 'reader', width: 800 },
] as const

export type ArtVariantSuffix = (typeof ART_VARIANTS)[number]['suffix']

export function artVariantPath(urlPath: string, suffix: ArtVariantSuffix): string {
  return urlPath.replace(/\.webp$/, `.${suffix}.webp`)
}

/** 为一张已落盘的 webp 生成全部变体；输入须是绝对路径。
 *  非 .webp 基底直接跳过（ImageGenerator 压缩失败回退 png 时，按文件名替换会原地覆盖原图——对抗审查 P2-1）。
 *  写入走临时文件 + rename 原子落盘：半档/坏档不会因「存在即跳过」被永久固化（对抗审查 P2-2）。 */
export async function writeArtVariants(absWebp: string): Promise<void> {
  if (!absWebp.endsWith('.webp')) return
  await Promise.all(
    ART_VARIANTS.map(async ({ suffix, width }) => {
      const target = absWebp.replace(/\.webp$/, `.${suffix}.webp`)
      const tmp = `${target}.tmp-${process.pid}`
      await sharp(absWebp)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(tmp)
      await rename(tmp, target)
    }),
  )
}
