/**
 * 视觉走查截图基线（design-system §10）：
 * `npm run shots` —— 以 vite preview（生产构建）为对象，三档视口截取关键页。
 * 产出 docs/screenshots/night-05/*.png（gitignored，仅本地走查与审查参考）。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const OUT = resolve(ROOT, 'docs/screenshots/night-05')
const PORT = 4173
const BASE = `http://localhost:${PORT}`

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
]

const PAGES = [
  { name: 'kitchen-sink', path: '/dev/kitchen-sink' },
  { name: 'login', path: '/login' },
]

function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now()
  return new Promise((resolvePromise, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url)
        if (res.ok) return resolvePromise()
      } catch {
        /* not ready yet */
      }
      if (Date.now() - start > timeoutMs) return reject(new Error('preview server 启动超时'))
      setTimeout(tick, 400)
    }
    tick()
  })
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: resolve(dirname(fileURLToPath(import.meta.url)), '..'),
    stdio: 'ignore',
    shell: true,
  })
  try {
    await waitForServer(BASE)
    const browser = await chromium.launch()
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      })
      const page = await context.newPage()
      for (const p of PAGES) {
        await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' })
        await page.waitForTimeout(600) // 动画稳定
        const file = resolve(OUT, `${p.name}-${vp.name}.png`)
        await page.screenshot({ path: file, fullPage: true })
        console.log(`✓ ${p.name} @ ${vp.name} → ${file}`)
      }
      await context.close()
    }
    await browser.close()
  } finally {
    server.kill()
  }
}

main().catch((err) => {
  console.error('截图失败：', err.message)
  process.exit(1)
})
