/**
 * UI 走查取证：截取参考站 codex-resets.com 与桃阅读本地页面（docs/77）。
 * 用法：node scripts/screenshot-ui-audit.mjs
 * 端口可用 TAO_UI_AUDIT_PORT 覆盖（默认 5173；本机 5173 常被其他项目占用）。
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = process.env.TAO_UI_AUDIT_PORT ?? '5173'
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../docs/screenshots/ui-upgrade')
mkdirSync(OUT, { recursive: true })

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 900 },
]

const TARGETS = [
  { name: 'ref-codexresets', url: 'https://codex-resets.com/zh-CN' },
  { name: 'tao-kitchen-sink', url: `http://localhost:${PORT}/dev/kitchen-sink` },
  { name: 'tao-login', url: 'http://localhost:${PORT}/login' },
]

const browser = await chromium.launch()
for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  for (const t of TARGETS) {
    try {
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 45000 })
    } catch {
      await page.goto(t.url, { waitUntil: 'load', timeout: 45000 }).catch(() => {})
    }
    await page.waitForTimeout(1200)
    await page.screenshot({ path: resolve(OUT, `${t.name}-${vp.name}.png`), fullPage: true })
    console.log(`OK ${t.name}@${vp.name}`)
  }
  await context.close()
}
await browser.close()
console.log('done ->', OUT)
