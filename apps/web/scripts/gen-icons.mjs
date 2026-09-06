/**
 * PWA 图标生成（npm run icons）——零依赖，逐像素渲染 + 手写 PNG 编码。
 * 产出：public/icons/icon-192.png、icon-512.png（any）、icon-maskable-512.png（maskable）。
 * 设计：夜空渐变圆角底 + 蜜桃新月 + 两颗星（与 design-system.md 一致的色板）。
 */
import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../public/icons')

// ── PNG 编码（真彩 RGBA，filter 0）──
const CRC_TABLE = (() => {
  const t = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4)
  out.writeUInt32BE(data.length, 0)
  out.write(type, 4, 'ascii')
  data.copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length)
  return out
}

function encodePNG(width, height, rgba) {
  const stride = width * 4
  const raw = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0 // filter: none
    Buffer.from(rgba.buffer, y * stride, stride).copy(raw, y * (stride + 1) + 1)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ── 绘制 ──
const lerp = (a, b, t) => a + (b - a) * t
const inCircle = (x, y, cx, cy, r) => (x - cx) ** 2 + (y - cy) ** 2 <= r * r

function drawIcon(S, { maskable }) {
  const px = new Uint8Array(S * S * 4)
  const pad = maskable ? S * 0.12 : 0 // 安全区
  const cx = S / 2
  const cy = S / 2
  const R = maskable ? S * 0.3 : S * 0.4
  const bgTop = [16, 28, 60]
  const bgBot = [30, 46, 92]
  const peachTop = [255, 179, 160]
  const peachBot = [255, 142, 117]
  const stars = [
    [cx + S * 0.2, cy - S * 0.22, S * 0.035],
    [cx - S * 0.24, cy + S * 0.18, S * 0.028],
  ]
  const cornerR = S * (maskable ? 0 : 0.18)

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4
      // 圆角矩形遮罩（抗锯齿：1px 边缘过渡）
      let alpha = 255
      if (!maskable) {
        const nx = Math.min(x, S - 1 - x)
        const ny = Math.min(y, S - 1 - y)
        if (nx < cornerR && ny < cornerR) {
          const dx = cornerR - nx
          const dy = cornerR - ny
          const d = Math.sqrt(dx * dx + dy * dy)
          alpha = Math.max(0, Math.min(255, Math.round((cornerR - d + 0.5) * 255)))
          if (alpha === 0) continue
        }
      }
      const t = y / S
      let r = Math.round(lerp(bgTop[0], bgBot[0], t))
      let g = Math.round(lerp(bgTop[1], bgBot[1], t))
      let b = Math.round(lerp(bgTop[2], bgBot[2], t))
      // 新月：大圆减去偏移圆
      const inMoon = inCircle(x, y, cx, cy + pad * 0.1, R)
      const inCut = inCircle(x, y, cx + R * 0.42, cy - R * 0.22 + pad * 0.1, R * 0.86)
      if (inMoon && !inCut) {
        const mt = Math.min(1, Math.max(0, (y - (cy - R)) / (2 * R)))
        r = Math.round(lerp(peachTop[0], peachBot[0], mt))
        g = Math.round(lerp(peachTop[1], peachBot[1], mt))
        b = Math.round(lerp(peachTop[2], peachBot[2], mt))
      } else {
        for (const [sx, sy, sr] of stars) {
          if (inCircle(x, y, sx + pad * 0.3, sy + pad * 0.3, sr)) {
            r = 255; g = 233; b = 184
          }
        }
      }
      px[i] = r
      px[i + 1] = g
      px[i + 2] = b
      px[i + 3] = alpha
    }
  }
  return encodePNG(S, S, px)
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(resolve(OUT_DIR, 'icon-192.png'), drawIcon(192, { maskable: false }))
writeFileSync(resolve(OUT_DIR, 'icon-512.png'), drawIcon(512, { maskable: false }))
writeFileSync(resolve(OUT_DIR, 'icon-maskable-512.png'), drawIcon(512, { maskable: true }))
console.log(`图标已生成 → ${OUT_DIR}`)
