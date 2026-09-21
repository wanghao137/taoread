/**
 * 演示媒体链路验证（docs/19 N13-002）。
 * 直接打已运行的 demo（5173+8787），确认 AI 插画/视频/TTS 真实渲染，非 SVG 回退。
 * 用法：先 npm run demo，再 node scripts/verify-demo-media.mjs
 */
import { chromium } from 'playwright'
import { expect } from '@playwright/test'
import { mkdirSync } from 'fs'

mkdirSync('test-results', { recursive: true })
const BASE = 'http://localhost:5173'
const results = []

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, locale: 'zh-CN' })
  const step = async (name, fn) => {
    try { await fn(); results.push(`  ✓ ${name}`) }
    catch (e) { results.push(`  ✗ ${name}: ${e.message.split('\n')[0].slice(0, 140)}`) }
  }

  await page.goto(BASE, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2000)
  // choose 模式 → 选小朋友角色 → 进 join 模式
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: '输入家庭码加入' }).click()
  await page.getByPlaceholder('ABCD2345').fill('123456')
  await page.getByRole('button', { name: '进入桃阅读' }).click()
  await page.waitForTimeout(2500)
  // 多孩家庭：选小柚（空账本，书架无进度污染）
  await page.getByRole('button', { name: '小柚' }).click()
  await page.waitForTimeout(2500)
  // BookPicker 默认在推荐流，切到「书架」tab
  await page.getByRole('button', { name: '书架' }).click()
  await page.waitForTimeout(3000)
  console.log('after login url:', page.url())
  await page.screenshot({ path: 'test-results/demo-1-shelf.png', fullPage: true })

  await step('书架封面是 AI 插画（img src 含 /api/media/art）', async () => {
    await expect(page.locator('main')).toBeVisible({ timeout: 12_000 })
    const srcs = await page.locator('img').evaluateAll(els => els.map(e => e.getAttribute('src')).filter(Boolean))
    if (!srcs.some(s => s.includes('/api/media/art/'))) throw new Error(`art imgs=${srcs.length}, sample=${JSON.stringify(srcs.slice(0,3))}`)
  })

  await page.getByRole('button', { name: /打开《三字经/ }).click()
  await page.getByRole('button', { name: /开始读|接着读/ }).click()
  await page.waitForTimeout(3000)
  await page.screenshot({ path: 'test-results/demo-2-reader.png', fullPage: true })

  await step('章节题图是 AI 插画或已就绪视频（视频就绪时题图被 <video> 替代，属正常）', async () => {
    const srcs = await page.locator('img').evaluateAll(els => els.map(e => e.getAttribute('src')).filter(Boolean))
    const hasArt = srcs.some(s => s.includes('/api/media/art/chapters'))
    const hasVideo = (await page.locator('video').count()) > 0
    if (!hasArt && !hasVideo) throw new Error(`无题图 img 也无 video: ${JSON.stringify(srcs.slice(0,4))}`)
  })

  await step('视频播放器渲染（<video> src 含 /api/media/videos）', async () => {
    const v = page.locator('video').first()
    await expect(v).toBeVisible({ timeout: 15_000 })
    const src = await v.getAttribute('src')
    if (!src || !src.includes('/api/media/videos/')) throw new Error(`video src=${src}`)
    await page.screenshot({ path: 'test-results/demo-3-video.png' })
  })

  await step('TTS 朗读按钮可点且无 503 降级文案', async () => {
    const speak = page.getByRole('button', { name: /朗读/ }).first()
    await expect(speak).toBeVisible({ timeout: 10_000 })
    await speak.click()
    await page.waitForTimeout(3500)
    const degrade = await page.getByText(/服务暂不可用|降级|浏览器语音/).count()
    if (degrade > 0) throw new Error('出现降级文案')
    await page.screenshot({ path: 'test-results/demo-4-tts.png' })
  })

  console.log('\n=== 演示媒体链路验证 ===')
  console.log(results.join('\n'))
  await browser.close()
}
main().catch(e => { console.error('FATAL', e.message); process.exit(1) })
