/**
 * AI 生成内容隐式标识（docs/13 P0-8 / 合规）。
 *
 * 《人工智能生成合成内容标识办法》（2025-09-01 施行）第五条：
 *   「在生成合成内容的文件元数据中添加隐式标识，隐式标识包含生成合成内容
 *    属性信息、服务提供者名称或者编码、内容编号等制作要素信息」
 *
 * 落地方式：写入 WebP 的 EXIF ImageDescription（实测 sharp 的 WebP 写入器
 * 会丢弃 UserComment，只保留 IFD0 字段，因此统一塞进 ImageDescription）。
 * 显式标识（角标 + 家长设置页披露）在前端，见 AiBadge.tsx。
 *
 * 打标失败不阻断分发：隐式标识是义务，但图片本身对孩子的可用性优先。
 */
import sharp from 'sharp'

export interface AigcLabel {
  /** 服务提供者名称 */
  provider: string
  /** 生成模型 */
  model: string
  /** 内容编号（场景键，如 cover:peter-rabbit） */
  scene: string
  /** 内容类别：图片 / 视频 */
  kind?: string
}

export const AIGC_LABEL_PREFIX = 'AIGC_LABEL:'

/** 组装隐式标识载荷（法规要求的制作要素：属性 / 提供者 / 编号） */
export function buildAigcLabelJson(label: AigcLabel): string {
  return JSON.stringify({
    aigc: true,
    standard: '人工智能生成合成内容标识办法',
    provider: label.provider,
    model: label.model,
    contentId: label.scene,
    ...(label.kind ? { kind: label.kind } : {}),
    labeledAt: new Date().toISOString(),
  })
}

/**
 * 给已编码的 WebP 打上隐式标识（重写 EXIF，不重压画面）。
 * 返回（可能带标识的）buffer；sharp 不可用或写入失败时原样返回。
 */
export async function labelWebpImage(webp: Buffer, label: AigcLabel): Promise<Buffer> {
  const payload = `${AIGC_LABEL_PREFIX}${buildAigcLabelJson(label)}`
  try {
    return await sharp(webp)
      .withMetadata({ exif: { IFD0: { ImageDescription: payload } } })
      .webp({ quality: 80 })
      .toBuffer()
  } catch {
    return webp
  }
}

/** 读取并校验隐式标识是否存在且可解析（供自检/巡检脚本使用） */
export async function readAigcLabel(webp: Buffer): Promise<AigcLabel | null> {
  try {
    const meta = await sharp(webp).metadata()
    if (!meta.exif) return null
    const raw = Buffer.from(meta.exif).toString('latin1')
    const i = raw.indexOf(AIGC_LABEL_PREFIX)
    if (i < 0) return null
    const slice = raw.slice(i + AIGC_LABEL_PREFIX.length)
    const end = slice.indexOf('}')
    if (end < 0) return null
    const parsed = JSON.parse(slice.slice(0, end + 1)) as {
      aigc?: boolean
      provider?: string
      model?: string
      contentId?: string
      scene?: string
      kind?: string
    }
    if (!parsed.aigc || !parsed.provider) return null
    return {
      provider: parsed.provider,
      model: parsed.model ?? '',
      scene: parsed.contentId ?? parsed.scene ?? '',
      ...(parsed.kind ? { kind: parsed.kind } : {}),
    }
  } catch {
    return null
  }
}
