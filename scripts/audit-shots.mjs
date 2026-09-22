/** 全站 UI 复盘截图：PC 1920×1080 + 移动 390×844 */
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
mkdirSync('test-results/audit', { recursive: true })

async function login(page) {
  await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2200)
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: '输入家庭码加入' }).click()
  await page.getByPlaceholder('ABCD2345').fill('123456')
  await page.getByRole('button', { name: '进入桃阅读' }).click()
  await page.waitForTimeout(1200)
  await page.getByRole('button', { name: '小柚' }).click({ timeout: 10000 })
  await page.waitForTimeout(1200)
  try { await page.getByRole('button', { name: '跳过' }).click({ timeout: 2500 }) } catch { /* 可选引导，缺席属正常路径 */ }
  await page.waitForTimeout(600)
}
async function settle(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), { timeout: 15000 }).catch(() => {})
  await page.evaluate(async () => { await Promise.all(Array.from(document.images).map((i) => i.decode().catch(() => {}))) })
  await page.waitForTimeout(400)
}

const browser = await chromium.launch()
// PC 全站
const pc = await browser.newPage({ viewport: { width: 1920, height: 1080 }, locale: 'zh-CN' })
await login(pc)
await settle(pc)
await pc.screenshot({ path: 'test-results/audit/pc-01-gate.png' })
await pc.getByRole('navigation', { name: '孩子端导航' }).getByRole('button', { name: '书架' }).click()
await pc.waitForTimeout(1500); await settle(pc)
await pc.screenshot({ path: 'test-results/audit/pc-02-shelf-top.png' })
await pc.getByRole('button', { name: '打开《唐诗三百首·星星篇》' }).click({ timeout: 8000 })
await pc.waitForTimeout(1200); await settle(pc)
await pc.screenshot({ path: 'test-results/audit/pc-03-detail.png' })
await pc.getByRole('button', { name: /开始读/ }).click()
await pc.waitForTimeout(1800); await settle(pc)
await pc.screenshot({ path: 'test-results/audit/pc-04-reader.png' })
// 桃子墙
await pc.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' }); await pc.waitForTimeout(1800)
try { await pc.getByRole('button', { name: '小柚' }).click({ timeout: 4000 }); await pc.waitForTimeout(800) } catch { /* 可能已处于选中态，直接继续 */ }
try { await pc.getByRole('button', { name: '跳过' }).click({ timeout: 2000 }) } catch { /* 可选引导，缺席属正常路径 */ }
try {
  await pc.getByRole('navigation', { name: '孩子端导航' }).getByRole('button', { name: '桃子' }).click({ timeout: 4000 })
  await pc.waitForTimeout(1200); await settle(pc)
  await pc.screenshot({ path: 'test-results/audit/pc-05-wall.png' })
} catch (e) { console.log('wall skip', String(e).slice(0, 80)) }
await pc.close()

// 移动端关键页
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, locale: 'zh-CN', hasTouch: true })
await login(m)
await settle(m)
await m.screenshot({ path: 'test-results/audit/m-01-gate.png' })
await m.getByRole('navigation', { name: '孩子端导航' }).getByRole('button', { name: '书架' }).click()
await m.waitForTimeout(1200); await settle(m)
await m.screenshot({ path: 'test-results/audit/m-02-shelf.png' })
await m.close()

// PC 登录页
const l = await browser.newPage({ viewport: { width: 1920, height: 1080 }, locale: 'zh-CN' })
await l.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' })
await l.waitForTimeout(2200); await settle(l)
await l.screenshot({ path: 'test-results/audit/pc-00-login.png' })
await l.close()

await browser.close()
console.log('audit shots done')
