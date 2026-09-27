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

/** 导入书插图/封面入库压缩：限宽缩放（小图不放大幅度）+ WebP q80。
 *  sharp 失败时仅在字节确为已知图片格式时回退原图，否则抛错让调用方丢弃（防非图片字节顶着 .webp 名落盘）。 */
export async function compressImageToWebP(image: Buffer, width: number): Promise<Buffer> {
  try {
    return await sharp(image).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
  } catch {
    const looksLikeImage = (image[0] === 0xff && image[1] === 0xd8)
      || (image[0] === 0x89 && image[1] === 0x50)
      || image.subarray(0, 4).toString('latin1') === 'RIFF'
    if (!looksLikeImage) throw new Error('not a recognized image')
    return image
  }
}
