/**
 * UI 复盘走查截图（2026-09-20 全面复盘）：
 * 桌面 1440x900 / 手机 390x844 两档，覆盖登录、门屏、书架、详情、阅读器、家长端。
 * 用法：node scripts/ui-audit.mjs [baseUrl]（默认 http://localhost:5173，需先 npm run demo）
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const BASE = process.argv[2] ?? 'http://localhost:5173'
const OUT = resolve(ROOT, 'docs/screenshots/ui-audit')
mkdirSync(OUT, { recursive: true })

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

async function loginAsChild(page) {
  await page.goto(`${BASE}/login`)
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill('123456')
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  // 双孩家庭先选小桃
  try {
    await page.getByText('今天是谁的故事时间？').waitFor({ timeout: 8000 })
    await page.getByRole('button', { name: /小桃/ }).click()
  } catch { /* 多孩家庭才出选人屏，单孩直进 */ }
  // 三步引导（只第一次弹）
  try {
    await page
      .getByRole('button', { name: /出发，去听故事|下一步/ })
      .first()
      .waitFor({ timeout: 8000 })
    for (let i = 0; i < 4; i++) {
      await page
        .getByRole('button', { name: /出发，去听故事|下一步|跳过|知道啦/ })
        .first()
        .click({ timeout: 4000 })
        .catch(() => {})
    }
  } catch { /* 引导弹不出现属正常路径 */ }
  await page
    .getByText(/今天读什么故事|还没讲完呢|故事讲完啦/)
    .first()
    .waitFor({ timeout: 12000 })
}

async function shot(page, name) {
  await page.waitForTimeout(700)
  await page.screenshot({ path: resolve(OUT, `${name}.png`), fullPage: true })
  console.log(`✓ ${name}`)
}

async function run() {
  const browser = await chromium.launch()
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    })
    const page = await ctx.newPage()
    await page.goto(`${BASE}/login`)
    await shot(page, `${vp.name}-01-login`)

    await loginAsChild(page)
    await shot(page, `${vp.name}-02-gate`)

    // 书架（底部导航直达；有未收尾会话时门屏没有「去选书」按钮）
    await page.getByRole('button', { name: '书架' }).click()
    await page.getByText('桃书架').waitFor({ timeout: 10000 })
    await page.waitForTimeout(1200)
    await shot(page, `${vp.name}-03-shelf`)

    // 详情：唐诗三百首（搜索进入）
    await page.getByLabel('搜索书名或作者').fill('唐诗')
    await page.waitForTimeout(1500)
    await shot(page, `${vp.name}-04-shelf-search`)
    const tangBook = page.getByText(/唐诗三百首/).first()
    try {
      await tangBook.click({ timeout: 5000 })
      await page.waitForTimeout(1200)
      await shot(page, `${vp.name}-05-detail-tangshi`)
    } catch (e) {
      console.log(`! detail-tangshi 失败：${e.message.split('\n')[0]}`)
    }

    // 阅读器（试读）
    try {
      await page.getByRole('button', { name: /试读|开始读/ }).first().click({ timeout: 5000 })
      await page.waitForTimeout(1500)
      await shot(page, `${vp.name}-06-reader`)
    } catch (e) {
      console.log(`! reader 失败：${e.message.split('\n')[0]}`)
    }

    // 家长端
    const page2 = await ctx.newPage()
    await page2.goto(`${BASE}/login`)
    await page2.getByRole('button', { name: /输入家庭码加入/ }).click()
    await page2.locator('#family-code').fill('123456')
    await page2.getByRole('button', { name: '爸爸妈妈' }).click()
    await page2.getByRole('button', { name: /进入桃阅读/ }).click()
    await page2.waitForTimeout(2000)
    await shot(page2, `${vp.name}-07-parent`)

    await ctx.close()
  }
  await browser.close()
  console.log(`完成 → ${OUT}`)
}

run().catch((err) => {
  console.error('截图失败：', err)
  process.exit(1)
})
