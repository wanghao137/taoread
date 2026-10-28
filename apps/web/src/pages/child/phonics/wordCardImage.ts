import type { PhonicsAtlasWordDto } from '@taoread/shared'
import { API_BASE } from '../../../lib/api'

export async function createWordCardImage(word: PhonicsAtlasWordDto): Promise<Blob> {
  const canvas = document.createElement('canvas'); canvas.width = 720; canvas.height = 960
  const context = canvas.getContext('2d')
  if (!context) throw new Error('当前设备无法生成图片')
  context.fillStyle = '#f6faf7'; context.fillRect(0, 0, 720, 960)
  context.fillStyle = '#2c6548'; context.font = 'bold 26px sans-serif'; context.fillText('桃阅读 · 单词图鉴', 40, 52)
  if (word.image?.url) {
    const response = await fetch(word.image.url.startsWith('/') ? `${API_BASE}${word.image.url}` : word.image.url, { cache: 'no-store' })
    if (!response.ok) throw new Error('配图暂时没有取到')
    const url = URL.createObjectURL(await response.blob())
    try {
      const image = new Image(); image.src = url; await image.decode()
      const side = Math.min(image.naturalWidth, image.naturalHeight)
      context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 40, 76, 640, 640)
    } finally { URL.revokeObjectURL(url) }
  } else {
    context.fillStyle = '#e7f1e9'; context.fillRect(40, 76, 640, 640)
  }
  const fit = (text: string, size: number, maxWidth: number, weight = '') => {
    do { context.font = `${weight} ${size}px sans-serif`; if (context.measureText(text).width <= maxWidth) break; size-- } while (size > 20)
    return text
  }
  context.fillStyle = '#24372d'; context.fillText(fit(word.text ?? '', 58, 640, 'bold'), 40, 790, 640)
  context.fillStyle = '#4a6656'; context.fillText(fit(word.meaningZh ?? '', 34, 640), 40, 845, 640)
  if (word.examples[0]?.text) { context.fillStyle = '#5f7168'; context.fillText(fit(word.examples[0].text, 26, 640), 40, 900, 640) }
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('图片生成失败')), 'image/png'))
}
