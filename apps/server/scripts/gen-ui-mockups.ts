/**
 * UI 设计概念图生成（docs/22 重设计）。
 *
 * 用生图模型产出 6 个核心屏幕的设计概念图，作为 UI 重做的视觉基准：
 * 风格 = Vooks 克制美学（docs/20 排行第 1）+ 暖色低亮度睡前板（docs/21 §0，
 * 褪黑素研究：儿童蓝光敏感度是成人 2 倍，睡前应用红/黄/橙长波长）。
 *
 * 用法：cd apps/server && npx tsx scripts/gen-ui-mockups.ts
 * 产物：research/ui-mockups/*.png（仓库根）
 */
import 'dotenv/config'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadConfig, imageGenAvailable } from '../src/config'

const OUT_DIR = resolve(process.cwd(), '../../research/ui-mockups')

/** 共享风格后缀：Vooks 式克制 + 暖色睡前板 */
const STYLE =
  'soft watercolor and gouache children picture book art style, mobile app UI design concept, ' +
  'warm cozy bedtime palette: deep warm dark brown background like a dim candlelit room, ' +
  'glowing amber honey and soft peach accents, warm cream ivory text, gentle rounded shapes, ' +
  'soft diffused moonlight glow, calm soothing low-stimulation design for children ages 3-8, ' +
  'clean professional layout with generous spacing, minimal placeholder text, ' +
  'high fidelity app design mockup, masterpiece quality'

interface ScreenSpec {
  key: string
  prompt: string
}

const SCREENS: ScreenSpec[] = [
  {
    key: '01-login',
    prompt:
      'a cozy bedtime login screen of a children reading app: ' +
      'at top center a large friendly glowing crescent moon with a cute round peach-colored mascot sitting on it, ' +
      'scattered tiny warm stars around, below a soft rounded translucent card with one simple input field glowing gently, ' +
      'two big rounded pill-shaped buttons at the bottom, vertical mobile phone layout',
  },
  {
    key: '02-shelf',
    prompt:
      'a children bedtime bookshelf screen: ' +
      'top area has a small moon mascot and a title bar with soft rounded search pill, ' +
      'one large horizontal continue-reading card showing an open storybook with warm glow, ' +
      'below a grid of six storybook covers with soft watercolor illustrations of animals moon and mountains, ' +
      'each cover rounded corners with subtle warm shadow, a row of rounded filter chips, vertical mobile phone layout',
  },
  {
    key: '03-reader',
    prompt:
      'a bedtime story reader screen: ' +
      'upper half is a soft watercolor illustration of a little rabbit looking at a warm starry night sky, ' +
      'lower half shows large readable storybook text lines in warm cream color on deep warm brown paper, ' +
      'one line of text softly highlighted in amber glow as read-aloud karaoke highlight, ' +
      'a round glowing amber speaker button at bottom center, page turn arrows on sides, vertical mobile phone layout',
  },
  {
    key: '04-detail',
    prompt:
      'a storybook detail screen: ' +
      'a large beautiful storybook cover with watercolor illustration centered at top with soft glow, ' +
      'below it a vertical list of chapter cards, each a soft rounded rectangle with a small round play button, ' +
      'a big warm amber rounded start-reading button at the bottom, a few tiny stars decorating the background, vertical mobile phone layout',
  },
  {
    key: '05-celebration',
    prompt:
      'a gentle celebration screen of a reading app: ' +
      'a wall of glowing night lamps arranged in a grid, each lamp a different cute animal shape glowing warm amber from within, ' +
      'one lamp just lit up with extra sparkle, a big friendly moon mascot smiling in the center top, ' +
      'tiny star confetti drifting, soft warm night atmosphere, joyful but calm, vertical mobile phone layout',
  },
  {
    key: '06-parent',
    prompt:
      'a parent dashboard screen of a children reading app: ' +
      'clean stacked cards showing reading time statistics with simple warm-colored bar charts, ' +
      'small hand-drawn style icons of books and moons, calm muted professional layout for adults, ' +
      'deep warm brown theme with amber accents, vertical mobile phone layout',
  },
]

async function main(): Promise<void> {
  const config = loadConfig()
  if (!imageGenAvailable(config)) {
    console.error('未配置 TAO_IMAGE_BASE / TAO_IMAGE_KEY')
    process.exit(1)
  }
  mkdirSync(OUT_DIR, { recursive: true })

  for (const s of SCREENS) {
    const prompt = `${s.prompt}, ${STYLE}`
    process.stdout.write(`生成 ${s.key} … `)
    try {
      const res = await fetch(`${config.TAO_IMAGE_BASE}/images/generations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.TAO_IMAGE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: config.TAO_IMAGE_MODEL,
          prompt,
          size: '2K',
          ratio: '9:16',
          return_base64: true,
          extra_body: { response_format: 'b64_json' },
        }),
      })
      if (!res.ok) {
        console.log(`✗ HTTP ${res.status}: ${(await res.text()).slice(0, 120)}`)
        continue
      }
      const json = (await res.json()) as { data?: Array<{ b64_json?: string }> }
      const b64 = json.data?.[0]?.b64_json
      if (!b64) {
        console.log('✗ 无 b64 数据')
        continue
      }
      const file = resolve(OUT_DIR, `${s.key}.png`)
      writeFileSync(file, Buffer.from(b64, 'base64'))
      console.log(`✓ ${file}`)
    } catch (err) {
      console.log(`✗ ${(err as Error).message.slice(0, 120)}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
