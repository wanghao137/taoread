/**
 * 书单图标生成（docs/34 后续优化 2026-09-28）：6 个主题书单的贴纸风小图标。
 * 复用生产 imagegen 配置（读 D:/taoread-prod/apps/server/.env），一次性出图，
 * sharp 压 webp 128px → apps/web/public/icons/collections/<id>.webp。
 * 用法：node gen-collection-icons.mjs [--only <id>]
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const envText = readFileSync('D:/taoread-prod/apps/server/.env', 'utf8')
const env = Object.fromEntries(
  envText.split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#')).map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
)
const BASE = env.TAO_IMAGE_BASE
const KEY = env.TAO_IMAGE_KEY
const MODEL = env.TAO_IMAGE_MODEL || 'agnes-image-2.5-flash'
if (!BASE || !KEY) throw new Error('missing TAO_IMAGE_* in prod .env')

const STYLE =
  'Soft watercolor children picture-book sticker illustration, rounded cute shapes, warm cream background, peach and honey and mint palette, clean thick outlines, single object centered with generous margin, cozy bedtime story mood, no text, no words, no letters'

const ICONS = [
  { id: 'bedtime-poems', label: '睡前轻轻读', prompt: 'A crescent moon with a small sleeping star and a tiny cloud, night sky' },
  { id: 'quick-stories', label: '十分钟小故事', prompt: 'A small open storybook with a tiny alarm clock beside it' },
  { id: 'classic-tales', label: '经典童话', prompt: 'A fairytale castle with two small towers and a little flag' },
  { id: 'wonder-why', label: '十万个为什么', prompt: 'A glowing lightbulb with question-mark shaped sparkles around it' },
  { id: 'first-steps', label: '刚开始识字', prompt: 'Three colorful wooden toy building blocks stacked in a small pyramid' },
  { id: 'mengxue', label: '蒙学经典', prompt: 'A rolled bamboo scroll tied with a red ribbon and a small ink brush' },
]

const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null
const outDir = 'apps/web/public/icons/collections'
mkdirSync(outDir, { recursive: true })

for (const icon of only ? ICONS.filter((i) => i.id === only) : ICONS) {
  const prompt = `${icon.prompt}. ${STYLE}`
  process.stdout.write(`gen ${icon.id} (${icon.label}) … `)
  const res = await fetch(`${BASE}/images/generations`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      n: 1,
      size: '1024x1024',
      extra_body: { response_format: 'b64_json' },
    }),
  })
  if (!res.ok) {
    console.log(`HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`)
    continue
  }
  const json = await res.json()
  const b64 = json?.data?.[0]?.b64_json
  if (!b64) {
    console.log('no b64_json:', JSON.stringify(json).slice(0, 160))
    continue
  }
  const sharp = (await import('sharp')).default
  const webp = await sharp(Buffer.from(b64, 'base64')).resize(128, 128).webp({ quality: 82 }).toBuffer()
  writeFileSync(join(outDir, `${icon.id}.webp`), webp)
  console.log(`ok ${(webp.length / 1024).toFixed(1)}KB`)
}
console.log('done')
