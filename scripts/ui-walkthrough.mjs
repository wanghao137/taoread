/**
 * 交付前 UI/UX 走查截图（手动工具，不入 CI）：
 * `npm run demo` 起服务后运行 `node scripts/ui-walkthrough.mjs`。
 * 覆盖登录/孩子端五页/阅读器/结算/家长端四页，桌面 + 移动两种视口，
 * 输出到 docs/screenshots/walkthrough/（gitignore 内，仅本地走查）。
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.env.WALKTHROUGH_BASE ?? 'http://localhost:5173'
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../docs/screenshots/walkthrough')
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
try {
  for (const [label, viewport] of [
    ['mobile', { width: 390, height: 844 }],
    ['desktop', { width: 1280, height: 900 }],
  ]) {
    const ctx = await browser.newContext({ viewport, locale: 'zh-CN' })
    const page = await ctx.newPage()

    // 登录页
    await page.goto(BASE, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: `${OUT}/${label}-01-login.png`, fullPage: true })

    // 孩子登录 → 选人
    await page.getByRole('button', { name: '小朋友' }).click()
    await page.getByRole('button', { name: /输入家庭码加入/ }).click()
    await page.locator('#family-code').fill('123456')
    await page.getByRole('button', { name: /进入桃阅读/ }).click()
    await page.getByText('今天是谁的故事时间？').waitFor({ timeout: 15000 })
    await page.screenshot({ path: `${OUT}/${label}-02-picker.png`, fullPage: true })
    await page.getByRole('button', { name: /小桃/ }).click()

    // 今天（首页）
    await page.getByText('今天想读什么？').waitFor({ timeout: 15000 })
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}/${label}-03-today.png`, fullPage: true })

    // 找故事
    await page.getByRole('button', { name: '找故事' }).first().click()
    await page.getByText('先看封面，再决定要不要打开。').waitFor()
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}/${label}-04-discover.png`, fullPage: true })

    // 详情
    await page.locator('#shelf-search').fill('三字经')
    await page.getByRole('button', { name: /打开《三字经》/ }).first().waitFor()
    await page.getByRole('button', { name: /打开《三字经》/ }).first().click()
    await page.getByText('适合一起读').waitFor()
    await page.screenshot({ path: `${OUT}/${label}-05-detail.png`, fullPage: true })

    // 阅读器
    await page.getByRole('button', { name: /开始读|继续读/ }).first().click()
    await page.getByText(/第 \d+ 章/).first().waitFor()
    await page.waitForTimeout(1000)
    await page.screenshot({ path: `${OUT}/${label}-06-reader.png`, fullPage: false })

    // 排版浮层（dialog 语义 + 焦点圈定走查）
    await page.getByRole('button', { name: '阅读设置' }).click()
    await page.waitForTimeout(400)
    await page.screenshot({ path: `${OUT}/${label}-07-reader-settings.png` })
    await page.keyboard.press('Escape')

    // 读完结算浮层
    await page.getByRole('button', { name: '读完啦' }).click({ force: true })
    const finishShown = await page
      .getByText('这一章读完啦')
      .waitFor({ timeout: 10000 })
      .then(() => true)
      .catch(() => false)
    if (finishShown) await page.screenshot({ path: `${OUT}/${label}-08-finish.png` })

    // 我的（含阅读足迹格子 7×8）
    if (finishShown) {
      await page.getByRole('button', { name: '回到今天' }).click()
    } else {
      await page.goto(`${BASE}/child/my`, { waitUntil: 'domcontentloaded' })
    }
    await page.getByRole('button', { name: '我的' }).first().click()
    await page.getByRole('button', { name: '阅读记忆' }).first().click()
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}/${label}-09-my-memory.png`, fullPage: true })
    await ctx.close()
  }

  // 家长端（移动视口）
  const pctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'zh-CN' })
  const ppage = await pctx.newPage()
  await ppage.goto(BASE, { waitUntil: 'domcontentloaded' })
  await ppage.waitForTimeout(1200)
  await ppage.getByRole('button', { name: '爸爸妈妈' }).click()
  await ppage.getByRole('button', { name: /输入家庭码加入/ }).click()
  await ppage.locator('#family-code').fill('123456')
  await ppage.getByRole('button', { name: /进入桃阅读/ }).click()
  await ppage.getByText('家长端').waitFor({ timeout: 15000 })
  await ppage.waitForTimeout(800)
  await ppage.screenshot({ path: `${OUT}/mobile-10-parent-tonight.png`, fullPage: true })
  await ppage.getByRole('button', { name: '内容', exact: true }).click()
  await ppage.getByRole('button', { name: '桃书库', exact: true }).waitFor()
  await ppage.waitForTimeout(600)
  await ppage.screenshot({ path: `${OUT}/mobile-11-parent-content.png`, fullPage: true })
  await ppage.getByRole('button', { name: '足迹', exact: true }).click()
  await ppage.waitForTimeout(800)
  await ppage.screenshot({ path: `${OUT}/mobile-12-parent-report.png`, fullPage: true })
  await ppage.getByRole('button', { name: '设置', exact: true }).click()
  await ppage.waitForTimeout(600)
  await ppage.screenshot({ path: `${OUT}/mobile-13-parent-settings.png`, fullPage: true })
  await pctx.close()
} finally {
  await browser.close()
}
console.log(`走查截图完成 → ${OUT}`)
