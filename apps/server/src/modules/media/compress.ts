/**
 * PNG → WebP 压缩（docs/13 P0-A）。
 *
 * 实测：1024x1536 PNG 约 3.0MB → WebP 质量 80 约 278KB，省 91%。
 * 没有这一步，AI 插画在移动端流量/内存上不可用。
 * sharp 按需 import：测试环境/无 sharp 时调用方拿到回退的 PNG（不阻断）。
 */
import sharp from 'sharp'

export async function compressPngToWebP(png: Buffer): Promise<Buffer> {
  return sharp(png).webp({ quality: 80 }).toBuffer()
}
