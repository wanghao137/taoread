import 'dotenv/config'
import { loadConfig } from '../src/config'
const config = loadConfig()
const prompt = 'A cozy night sky corner illustration in soft watercolor picture book style: deep blue gradient night sky, a warm yellow crescent moon, several tiny twinkling stars, rounded dark green hills silhouette at the bottom, gentle and cute, soft edges that blend into the card, child-friendly'
const res = await fetch(`${config.TAO_IMAGE_BASE}/images/generations`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${config.TAO_IMAGE_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: config.TAO_IMAGE_MODEL, prompt, size: '2K', ratio: '1:1', return_base64: true, extra_body: { response_format: 'b64_json' } }),
})
console.log('HTTP', res.status)
if (!res.ok) { console.log((await res.text()).slice(0, 300)); process.exit(1) }
const json = await res.json() as { data?: Array<{ b64_json?: string; url?: string }> }
const b64 = json.data?.[0]?.b64_json
console.log('b64 length:', b64?.length ?? 0)
if (b64) {
  const { writeFileSync } = await import('node:fs')
  writeFileSync('D:/codesolo/taoread/apps/server/media/art/misc/poem-scenery-night.png', Buffer.from(b64, 'base64'))
  console.log('saved raw png')
}
