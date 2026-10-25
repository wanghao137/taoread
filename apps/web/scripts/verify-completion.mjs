import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } })
const p = await ctx.newPage()
await p.goto('http://127.0.0.1:8091/', { waitUntil: 'networkidle' })
// 家庭码登录
await p.fill('input', '12345678').catch(() => {})
await p.keyboard.press('Enter').catch(() => {})
await p.waitForTimeout(1500)
// 进孩子端
const child = p.locator('text=找故事').first()
if (await child.isVisible().catch(() => false)) { await child.click(); await p.waitForTimeout(2000) }
// 搜索绿野仙踪
await p.fill('input[type="search"], input[placeholder*="搜"]', 'Wizard of Oz').catch(async () => { await p.fill('input', 'Wizard of Oz') })
await p.waitForTimeout(1500)
const card = p.locator('text=The Wonderful Wizard of Oz').first()
console.log('书架可见 wizard-oz:', await card.isVisible().catch(() => false))
if (await card.isVisible().catch(() => false)) {
  await card.click()
  await p.waitForTimeout(2500)
  const chapters = await p.locator('text=/Chapter \d+/').count()
  console.log('详情/目录 Chapter 字样出现:', chapters, '次')
  const body = await p.textContent('body')
  console.log('含 Chapter 24:', body.includes('Chapter 24'), '| 含 Chapter 15:', body.includes('Chapter 15'))
  await p.screenshot({ path: 'D:/codesolo/taoread/e2e/output/verify-oz-detail.png' })
}
await b.close()
