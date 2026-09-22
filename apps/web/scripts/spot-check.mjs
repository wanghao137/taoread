import { chromium } from 'playwright'
const browser = await chromium.launch()
const pc = await browser.newPage({ viewport: { width: 1920, height: 1080 }, locale: 'zh-CN' })
await pc.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' })
await pc.waitForTimeout(2200)
await pc.getByRole('button', { name: '小朋友' }).click()
await pc.getByRole('button', { name: '输入家庭码加入' }).click()
await pc.getByPlaceholder('ABCD2345').fill('123456')
await pc.getByRole('button', { name: '进入桃阅读' }).click()
await pc.waitForTimeout(1200)
await pc.getByRole('button', { name: '小柚' }).click({ timeout: 10000 })
await pc.waitForTimeout(1500)
try { await pc.getByRole('button', { name: '跳过' }).click({ timeout: 2500 }) } catch { /* 可选引导，缺席属正常路径 */ }
await pc.waitForTimeout(600)
await pc.screenshot({ path: 'test-results/audit/v2-gate.png' })
await pc.getByRole('navigation', { name: '孩子端导航' }).getByRole('button', { name: '书架' }).click()
await pc.waitForTimeout(1200)
await pc.evaluate(async () => {
  const step = window.innerHeight
  for (let y = 0; y < 4000; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)) }
  window.scrollTo(0, 0)
})
await pc.waitForTimeout(1500)
await pc.screenshot({ path: 'test-results/audit/v2-shelf.png' })
await browser.close()
console.log('spot done')
