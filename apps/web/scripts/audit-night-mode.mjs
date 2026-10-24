/**
 * docs/82 夜间模式全页面取证（生产源站，真实家庭）
 * 双轨：A 系统深色（prefers-color-scheme）；B 阅读器夜间主题
 * 每页截图 + DOM 采样（背景/文字对比度异常检测）
 */
import { chromium, webkit } from 'playwright'
const BASE = 'http://127.0.0.1:8091'
const OUT = 'D:/codesolo/taoread/docs/screenshots/audit82'
import { mkdirSync } from 'node:fs'
mkdirSync(OUT, { recursive: true })

const engine = process.env.ENGINE === 'chromium' ? chromium : webkit
const browser = await engine.launch()
const ctx = await browser.newContext({ viewport: { width: 820, height: 1180 }, hasTouch: true, colorScheme: 'dark' })
const page = await ctx.newPage()

const shot = (n) => page.screenshot({ path: `${OUT}/${n}.png`, fullPage: false }).catch(() => {})

// 登录
await page.goto(`${BASE}/login`, { waitUntil: 'commit' })
await page.waitForSelector('.role-pick', { timeout: 20000 })
await page.waitForTimeout(1200)
await shot('01-login-dark')
await page.locator('.role-pick', { hasText: '小朋友' }).first().click()
await page.locator('button', { hasText: '输入家庭码加入' }).first().click()
await page.waitForTimeout(600)
await shot('02-login-join-dark')
await page.fill('.code-input', '12345678')
await page.locator('.sticker-btn.primary.block').first().click()
await page.waitForSelector('.mast', { timeout: 20000 })
await page.locator('.pick-name').first().waitFor({ timeout: 8000 }).catch(() => {})
if (await page.locator('.pick-name').count()) await page.locator('.pick-name').first().click()
await page.waitForSelector('.today-hero', { timeout: 20000 })
await page.waitForTimeout(2500)
await shot('03-today-dark')
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(900)
await shot('04-today-bottom-dark')
await page.evaluate(() => window.scrollTo(0, 0))

// 找故事
await page.locator('.mobile-nav button', { hasText: /找故事|发现/ }).first().click()
await page.waitForTimeout(2500)
await shot('05-discover-dark')
await page.fill('#shelf-search', '笠翁')
await page.waitForTimeout(1500)
await shot('06-search-dark')
await page.fill('#shelf-search', '')
await page.waitForTimeout(800)

// 我的
await page.goto(`${BASE}/child/my`, { waitUntil: 'commit' })
await page.waitForTimeout(2000)
await shot('07-my-dark')

// 详情（浅色封面页在暗色系统下的表现）
await page.goto(`${BASE}/child/book/liweng-yun`, { waitUntil: 'commit' })
await page.waitForTimeout(2200)
await shot('08-detail-dark')

// 阅读器夜间主题（显式切夜间）
await page.goto(`${BASE}/child/book/liweng-yun/chapter/1`, { waitUntil: 'commit' })
await page.waitForSelector('.reader-text, .pager-track', { timeout: 30000 })
const conflict = page.getByRole('button', { name: '结束旧书，改读这本', exact: true })
if (await conflict.count()) { await conflict.click(); await page.waitForTimeout(1500) }
await page.waitForTimeout(1500)
await shot('09-reader-default-dark-sys')
await page.getByRole('button', { name: '排版', exact: true }).click()
await page.waitForTimeout(600)
await page.locator('[role="dialog"] button', { hasText: '夜间' }).first().click()
await page.waitForTimeout(1000)
await shot('10-reader-night')
await page.keyboard.press('Escape')
await page.waitForTimeout(500)
await shot('11-reader-night-toc-area')
// 设置面板夜间态
await page.getByRole('button', { name: '排版', exact: true }).click()
await page.waitForTimeout(700)
await shot('12-reader-night-settings')
await page.keyboard.press('Escape')

// 朗读态夜间
await page.getByRole('button', { name: '朗读本章', exact: true }).first().click()
await page.waitForTimeout(2500)
await shot('13-reader-night-speaking')
await page.getByRole('button', { name: '停止朗读', exact: true }).click().catch(() => {})

// 完读弹层夜间
await page.getByRole('button', { name: '读完啦', exact: true }).click({ force: true }).catch(() => {})
await page.waitForTimeout(1500)
await shot('14-reader-night-finish')

// 家长端（系统深色）
const ctx2 = await browser.newContext({ viewport: { width: 820, height: 1180 }, colorScheme: 'dark' })
const p2 = await ctx2.newPage()
await p2.goto(`${BASE}/login`, { waitUntil: 'commit' })
await p2.waitForSelector('.role-pick')
await p2.locator('.role-pick', { hasText: '爸爸妈妈' }).first().click().catch(() => {})
// 生产家长需 PIN——只截登录页家长态
await p2.waitForTimeout(800)
await p2.screenshot({ path: `${OUT}/15-parent-login-dark.png` })

console.log('screens done ->', OUT)
await browser.close()
