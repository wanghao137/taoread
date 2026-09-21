/**
 * AI 插画生成管线（docs/13 P0-A）。
 *
 * 用途：把书架的 SVG 矢量封面/章节题图升级为 AI 生成的绘本风插画。
 * 流程：prompt 组装 → 调生图接口（OpenAI 兼容 /v1/images/generations）
 *      → PNG → sharp 压缩 WebP（质量 80，约省 90% 体积）→ 落 media 目录
 *      → 权利台账记录「AI 生成 + prompt」。
 *
 * 合规：AI 生成内容在权利台账里单独标注 basis='ai-generated'，
 * 不冒充公版也不冒充人工绘制；prompt 不含任何在世艺术家/品牌名。
 * 缺生图配置时返回 null，调用方回退现有 SVG 场景（不阻断）。
 */
import { createHash } from 'node:crypto'
import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface ImageGenDeps {
  base: string
  apiKey: string
  model: string
  fetch?: typeof fetch
}

export type ArtKind = 'cover' | 'chapter' | 'mascot'

export interface GenerateArtInput {
  kind: ArtKind
  /** 场景标识（与现有 SVG 场景同 key，便于回退与对照） */
  scene: string
  /** 中文画面描述（会被组装进英文 prompt） */
  description: string
  /** 书名/章节名，仅用于文件命名与台账，不进 prompt（避免文字乱码） */
  label: string
  lang: 'zh' | 'en'
}

export interface GeneratedArt {
  /** 前端 URL */
  urlPath: string
  scene: string
  kind: ArtKind
  width: number
  height: number
  bytes: number
  /** 生成所用 prompt（写进权利台账） */
  prompt: string
  model: string
}

/**
 * agnes-image-2.5-flash 的出图参数：size 是清晰度档位（1K/2K/3K/4K），
 * ratio 单独控制画幅。ratio 与前端容器精确一致（3:4 封面 / 16:9 题图 / 1:1 吉祥物），
 * object-cover 不再裁切——上一代模型只给 2:3，要裁掉 11%（docs/13 P0-A）。
 * docs/19 N13-003：提到 2K 档，封面题图清晰度显著提升（864→1536 级）。
 */
const ART_PARAMS: Record<ArtKind, { tier: string; ratio: string }> = {
  cover: { tier: '2K', ratio: '3:4' },
  chapter: { tier: '2K', ratio: '16:9' },
  mascot: { tier: '2K', ratio: '1:1' },
}

/**
 * 统一画风（docs/19 N13-003 重构）。
 *
 * 上一版STYLE 有四个反模式，直接导致出图「丑」：
 *  1. 'peach and indigo night palette' 强制夜景——白天的学堂/山野场景被压暗发闷；
 *     现在只在描述里带「夜晚/月夜」时让场景自身的光影说话，不全局压暗。
 *  2. 'watercolor and colored pencil' 混合媒材——两种纹理指令互相打架，质感发糊；
 *     现在锁定单一媒材（柔和水彩），层次由「湿画法晕染 + 干扫细节」明确分工。
 *  3. 'no text, no letters' 写在正向描述里——反向词走正向通道反而诱导出文字；
 *     现在改用「纯画面、无文字区域」的正向表述（illustration-only, wordless）。
 *  4. 'main subject centered with generous margins'——大片留白构图空洞；
 *     现在要求「饱满构图、前后景层次、主体融入场景」，这才是绘本的视觉语言。
 */
const STYLE = [
  // 媒材与质感：水彩为主，但形体边缘清晰——纯湿画法会发糊，需明确「清晰边线」
  'beautiful children picture book illustration',
  'radiant watercolor painting with clean crisp linework over soft color washes',
  'luminous transparent colors, gentle warm lighting, fresh and bright atmosphere',
  // 构图：饱满、有层次、主体融入场景，不要空洞的中心留白
  'rich layered composition filling the whole frame, foreground middle-ground and background',
  'main characters integrated naturally into the scene',
  // 画风定位：圆润友好、适合 3-8 岁、睡前故事氛围
  'adorable rounded character designs with expressive faces, suitable for ages 3-8',
  'cozy bedtime story mood, gentle and reassuring, nothing scary',
  // 无文字：正向表述（接口无 negative_prompt，反向词只能正向写）
  'wordless illustration, pure image with no text, no writing, no signage, no watermark',
  'professional children book art, highly detailed, sharp focus, masterpiece quality',
].join(', ')

/** 夜景加成：描述里出现夜晚关键词时补一句冷色调氛围，白天场景不压暗 */
const NIGHT_HINT =
  'deep indigo and violet night sky, glowing moonlight and warm lit windows, sparkling stars'

const NIGHT_KEYS = ['夜', '月', '星', '萤火', '晚', '梦', 'moon', 'night', 'star', 'dream']

/**
 * 组装英文 prompt：画面主体 + 风格。
 * description 是中文画面描述，直接拼入（模型能理解中文画面语义），
 * 风格句固定英文保证画风一致——这是同本书内视觉统一性的关键。
 * 夜景场景额外补冷色调氛围句，白天场景保持明亮（docs/19 N13-003）。
 */
export function buildPrompt(input: GenerateArtInput): string {
  const subject = input.description.trim()
  const isNight = NIGHT_KEYS.some((k) => subject.includes(k))
  return isNight ? `${subject}, ${NIGHT_HINT}, ${STYLE}` : `${subject}, ${STYLE}`
}

/**
 * 场景键含 ':'（cover:slug），Windows 文件系统禁止冒号也禁止路径分隔符；
 * 统一替换为 '-'。DB 里仍存原始场景键，只在落盘/取 URL 时转义。
 */
export function fsSafe(scene: string): string {
  return scene.replace(/[^a-zA-Z0-9._-]/g, '-')
}

function subDir(kind: ArtKind): string {
  return kind === 'cover' ? 'covers' : kind === 'chapter' ? 'chapters' : 'mascots'
}

export class ImageGenerator {
  constructor(
    private deps: ImageGenDeps,
    private mediaDir: string,
    private compress?: (png: Buffer, width: number, height: number) => Promise<Buffer>,
    /** 隐式标识打标（docs/13 P0-8）；不传则不打标，不阻断生成 */
    private labeler?: (webp: Buffer, scene: string, kind: ArtKind) => Promise<Buffer>,
  ) {}

  private path(scene: string, kind: ArtKind, ext: 'webp' | 'png'): string {
    return join(this.mediaDir, 'art', subDir(kind), `${fsSafe(scene)}.${ext}`)
  }

  private url(scene: string, kind: ArtKind, ext: 'webp' | 'png'): string {
    return `/api/media/art/${subDir(kind)}/${fsSafe(scene)}.${ext}`
  }

  async generate(input: GenerateArtInput): Promise<GeneratedArt | null> {
    const fetchFn = this.deps.fetch ?? fetch
    const params = ART_PARAMS[input.kind]
    const prompt = buildPrompt(input)

    let res: Response
    // base 已含 /v1 前缀（配置项 TAO_IMAGE_BASE），直接拼 images/generations
    // agnes-image 的 response_format 必须放进 extra_body，放顶层会被忽略（官方文档明确警告）
    try {
      res = await fetchFn(`${this.deps.base}/images/generations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.deps.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.deps.model,
          prompt,
          size: params.tier,
          ratio: params.ratio,
          return_base64: true,
          extra_body: { response_format: 'b64_json' },
        }),
      })
    } catch {
      return null
    }
    if (!res.ok) return null

    const json = (await res.json()) as {
      data?: Array<{ b64_json?: string; url?: string }>
    }
    const item = json.data?.[0]
    const b64 = item?.b64_json
    if (!b64 || b64.length === 0) return null

    const png = Buffer.from(b64, 'base64')
    if (png.length < 1000) return null
    const width = png.readUInt32BE(16)
    const height = png.readUInt32BE(20)

    // 压缩为 WebP（无 sharp 时退回 PNG，体积大但可用）
    let webp: Buffer = png
    let compressed = false
    if (this.compress) {
      try {
        webp = await this.compress(png, width, height)
        compressed = true
      } catch {
        webp = png
        compressed = false
      }
    }
    const ext: 'webp' | 'png' = compressed ? 'webp' : 'png'
    // P0-8：WebP 隐式标识（EXIF 元数据写入「AI 生成 + 提供者 + 内容编号」）
    if (compressed && this.labeler) {
      try {
        webp = await this.labeler(webp, input.scene, input.kind)
      } catch {
        /* 打标失败不阻断分发 */
      }
    }
    const p = this.path(input.scene, input.kind, ext)
    await mkdir(join(p, '..'), { recursive: true })
    await writeFile(p, webp)

    return {
      urlPath: this.url(input.scene, input.kind, ext),
      scene: input.scene,
      kind: input.kind,
      width,
      height,
      bytes: webp.length,
      prompt,
      model: this.deps.model,
    }
  }

  /** 已生成过则直接读元数据返回（不重复出网） */
  async existing(scene: string, kind: ArtKind): Promise<string | null> {
    for (const ext of ['webp', 'png'] as const) {
      try {
        const p = this.path(scene, kind, ext)
        const buf = await readFile(p)
        if (buf.length > 0) return this.url(scene, kind, ext)
      } catch {
        /* 未生成 */
      }
    }
    return null
  }
}

export function artCacheKey(scene: string, kind: ArtKind, description: string): string {
  return createHash('sha256').update(`${kind}\u0000${scene}\u0000${description}`).digest('hex').slice(0, 16)
}
