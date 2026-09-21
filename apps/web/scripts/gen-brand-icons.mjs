/**
 * 品牌图标生成（任务5：旧月牙 logo 全部更换）。
 * 用 Playwright 把品牌桃子（/brand/logo-256.png，RGBA）栅格化为 PWA 图标：
 *  - icon-192.png / icon-512.png：暖纸底 + 居中桃子（普通图标）
 *  - icon-maskable-512.png：安全区 66% 内缩（maskable 规范）
 *  - favicon.svg：内嵌 192px 位图的轻量 SVG（323KB → ~40KB）
 * 用法：node scripts/gen-brand-icons.mjs
 */
import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(HERE, '../public')
const LOGO = resolve(PUBLIC, 'brand/logo-256.png')
const logoB64 = readFileSync(LOGO).toString('base64')

async function renderIcon(browser, { size, peachRatio, bg, out }) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  })
  const peach = Math.round(size * peachRatio)
  await page.setContent(`<!doctype html><html><body style="margin:0">
    <div id="icon" style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;background:${bg}">
      <img src="data:image/png;base64,${logoB64}" style="width:${peach}px;height:${peach}px;object-fit:contain" />
    </div>
  </body></html>`)
  await page.waitForTimeout(300)
  const el = page.locator('#icon')
  await el.screenshot({ path: out })
  await page.close()
  console.log(`✓ ${out}`)
}

async function main() {
  const browser = await chromium.launch()
  // 普通图标：暖纸底 + 蜜桃（桃子占 82%）
  const normalBg = 'radial-gradient(circle at 32% 28%, #FFF7E6 0%, #FFEFD2 62%, #FFE3B8 100%)'
  await renderIcon(browser, { size: 192, peachRatio: 0.82, bg: normalBg, out: resolve(PUBLIC, 'icons/icon-192.png') })
  await renderIcon(browser, { size: 512, peachRatio: 0.82, bg: normalBg, out: resolve(PUBLIC, 'icons/icon-512.png') })
  // maskable：安全区为直径 80% 的圆，桃子缩到 66%
  await renderIcon(browser, { size: 512, peachRatio: 0.66, bg: normalBg, out: resolve(PUBLIC, 'icons/icon-maskable-512.png') })

  // favicon.svg：内嵌 192 位图的轻量包装（原文件是 512 位图内嵌，323KB → ~40KB）
  const page = await browser.newPage({ viewport: { width: 192, height: 192 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html><body style="margin:0">
    <img id="f" src="data:image/png;base64,${logoB64}" style="width:192px;height:192px;object-fit:contain" />
  </body></html>`)
  await page.waitForTimeout(300)
  // 用 icon-192 作为 favicon 位图源（已带品牌底）
  const icon192 = readFileSync(resolve(PUBLIC, 'icons/icon-192.png')).toString('base64')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <title>桃阅读</title>
  <image href="data:image/png;base64,${icon192}" width="192" height="192" />
</svg>
`
  writeFileSync(resolve(PUBLIC, 'brand/favicon.svg'), svg, 'utf8')
  console.log('✓ favicon.svg 轻量化')
  await page.close()
  await browser.close()
}

main().catch((err) => {
  console.error('图标生成失败：', err)
  process.exit(1)
})
