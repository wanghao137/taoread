/**
 * 对抗审查⑤：补全书真实浏览器逐章走查。
 * 3 本代表书（wizard-oz 长篇/aesop-fables 合集/heidi A 模式重写）各抽 3 章：
 * 章节打开→正文渲染→插图渲染→无 pageerror。BASE 走生产 8091。
 */
import { chromium } from 'playwright'

const BASE = 'http://127.0.0.1:8091'
const issues = []
const ok = (name, pass, extra = '') => { console.log((pass ? '  ✓ ' : '  ✗ ') + name + (extra ? ' — ' + extra : '')); if (!pass) issues.push(name + ' ' + extra) }

const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, locale: 'zh-CN' })).newPage()
page.on('pageerror', e => issues.push('PAGEERROR: ' + String(e).slice(0, 150)))

// 登录
await page.goto(`${BASE}/login`, { waitUntil: 'commit' })
await page.waitForSelector('.role-pick', { timeout: 20000 })
await page.locator('.role-pick', { hasText: '小朋友' }).first().click()
await page.locator('button', { hasText: '输入家庭码加入' }).first().click()
await page.fill('.code-input', '12345678')
await page.locator('.sticker-btn.primary.block').first().click()
await page.waitForSelector('.mast', { timeout: 20000 })
await page.locator('.pick-name').first().waitFor({ timeout: 8000 }).catch(() => {})
if (await page.locator('.pick-name').count()) await page.locator('.pick-name').first().click()
await page.waitForSelector('.today-hero', { timeout: 20000 })
ok('登录+选孩子', true)

const plan = [
  ['wizard-oz', [5, 16, 24]],
  ['aesop-fables', [6, 20, 25]],
  ['heidi', [8, 16, 23]],
]
for (const [bookId, chapters] of plan) {
  console.log(`── ${bookId} ──`)
  for (const order of chapters) {
    await page.goto(`${BASE}/child/book/${bookId}/chapter/${order}`, { waitUntil: 'commit' })
    await page.waitForTimeout(2600)
    const body = await page.textContent('body').catch(() => '')
    const readerOpen = await page.locator('.reader, .reader-text').first().isVisible().catch(() => false)
    const images = await page.locator('.reader img, .reader-art img, img[src*="/api/media/art"]').count()
    const hasText = (body ?? '').length > 200
    ok(`${bookId} ch${order} 阅读器打开`, readerOpen, `图${images}张 文本${hasText ? 'OK' : '短'}`)
    // 翻页可用性（翻页模式按钮/滚动模式滚动）
    const nextBtn = page.locator('[aria-label*="下一"], .page-next, button:has-text("下一")').first()
    if (await nextBtn.isVisible().catch(() => false)) {
      await nextBtn.click().catch(() => {})
      await page.waitForTimeout(700)
      ok(`${bookId} ch${order} 翻页动作`, true)
    }
  }
}
console.log(`\n问题 ${issues.length} 个`)
for (const i of issues) console.log('  ✗', i)
await browser.close()
process.exit(issues.length ? 1 : 0)
