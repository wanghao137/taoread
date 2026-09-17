import { describe, expect, it } from 'vitest'
import sharp from 'sharp'
import {
  AIGC_LABEL_PREFIX,
  buildAigcLabelJson,
  labelWebpImage,
  readAigcLabel,
  type AigcLabel,
} from '../src/modules/media/label'

const sampleLabel: AigcLabel = {
  provider: 'taoread',
  model: 'agnes-image-2.5-flash',
  scene: 'cover:peter-rabbit',
  kind: 'cover',
}

async function makeWebp(w = 32, h = 32): Promise<Buffer> {
  return sharp({ create: { width: w, height: h, channels: 3, background: '#7E57C2' } })
    .png()
    .toBuffer()
    .then((png) => sharp(png).webp({ quality: 80 }).toBuffer())
}

describe('buildAigcLabelJson（隐式标识载荷）', () => {
  it('包含法规要求的制作要素：属性 / 提供者 / 编号', () => {
    const j = JSON.parse(buildAigcLabelJson(sampleLabel))
    expect(j.aigc).toBe(true)
    expect(j.provider).toBe('taoread')
    expect(j.contentId).toBe('cover:peter-rabbit')
    expect(j.model).toBe('agnes-image-2.5-flash')
  })
  it('含依据标准名与打标时间', () => {
    const j = JSON.parse(buildAigcLabelJson(sampleLabel))
    expect(j.standard).toContain('人工智能生成合成内容标识办法')
    expect(typeof j.labeledAt).toBe('string')
    expect(() => new Date(j.labeledAt).toISOString()).not.toThrow()
  })
  it('kind 缺省时不出现该字段', () => {
    const j = JSON.parse(buildAigcLabelJson({ provider: 'p', model: 'm', scene: 's' }))
    expect('kind' in j).toBe(false)
  })
  it('前缀常量与载荷可拼接', () => {
    expect(`${AIGC_LABEL_PREFIX}${buildAigcLabelJson(sampleLabel)}`).toContain('"aigc":true')
  })
})

describe('labelWebpImage + readAigcLabel（EXIF 往返）', () => {
  it('打标后能读回完整载荷', async () => {
    const webp = await makeWebp()
    const labeled = await labelWebpImage(webp, sampleLabel)
    const read = await readAigcLabel(labeled)
    expect(read).not.toBeNull()
    expect(read?.provider).toBe('taoread')
    expect(read?.model).toBe('agnes-image-2.5-flash')
    expect(read?.scene).toBe('cover:peter-rabbit')
  })
  it('打标不破坏图像尺寸与可解码性', async () => {
    const webp = await makeWebp(48, 36)
    const labeled = await labelWebpImage(webp, sampleLabel)
    const meta = await sharp(labeled).metadata()
    expect(meta.width).toBe(48)
    expect(meta.height).toBe(36)
    expect(meta.format).toBe('webp')
  })
  it('未打标的 WebP 读取返回 null', async () => {
    const webp = await makeWebp()
    expect(await readAigcLabel(webp)).toBeNull()
  })
  it('损坏 buffer 读取返回 null 而非抛错', async () => {
    expect(await readAigcLabel(Buffer.from('not-an-image'))).toBeNull()
  })
  it('空 buffer 打标不抛错（降级返回原 buffer）', async () => {
    const empty = Buffer.alloc(0)
    const out = await labelWebpImage(empty, sampleLabel)
    expect(out.length).toBe(0)
  })
})
