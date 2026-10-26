/**
 * 家长端取证：桌面 1440 + 手机 390 双视口走四个 tab，抓网络/性能指标+截图。
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:5181'
const OUT = 'D:/codesolo/taoread/e2e/output/parent-audit'
mkdirSync(OUT, { recursive: true })

async function audit(viewport, tag) {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport, locale: 'zh-CN' })
  const page = await context.newPage()
  const requests = []
  let imgBytes = 0, imgCount = 0
  page.on('response', async (res) => {
    const url = res.url()
    if (url.includes('/api/media/art')) {
      imgCount++
      try { imgBytes += (await res.body()).length } catch { /* body unavailable */ }
    }
    if (url.includes('/api/')) requests.push({ url: url.replace(BASE, ''), ms: null, status: res.status() })
  })
  const t0 = Date.now()
  await page.goto(BASE + '/login', { waitUntil: 'commit' })
  await page.waitForSelector('.role-pick', { timeout: 20000 })
  await page.locator('.role-pick', { hasText: '爸爸妈妈' }).first().click()
  await page.locator('button', { hasText: '输入家庭码加入' }).first().click()
  await page.fill('.code-input', 'XUA6GNHY')
  await page.getByLabel('家长 PIN', { exact: true }).fill('864209').catch(() => {})
  const pinField = page.locator('input[type="password"], input[inputmode="numeric"]').first()
  if (await pinField.isVisible().catch(() => false)) await pinField.fill('864209')
  await page.locator('.sticker-btn.primary.block').first().click()
  await page.waitForURL(/parent/, { timeout: 20000 })
  const loginMs = Date.now() - t0
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${OUT}/${tag}-today.png`, fullPage: false })

  const results = { tag, loginMs, tabs: {} }
  for (const tab of ['内容', '足迹', '设置']) {
    const before = imgCount
    const t = Date.now()
    await page.getByRole('button', { name: tab, exact: true }).first().click()
    await page.waitForTimeout(3500)
    const ms = Date.now() - t
    await page.screenshot({ path: `${OUT}/${tag}-${tab}.png`, fullPage: false })
    // 手机端额外全页截图看布局全貌
    if (tag === 'mobile') await page.screenshot({ path: `${OUT}/${tag}-${tab}-full.png`, fullPage: true })
    results.tabs[tab] = { ms, newImages: imgCount - before }
  }
  results.totalApiCalls = requests.length
  results.totalImageCount = imgCount
  results.totalImageBytesMB = (imgBytes / 1024 / 1024).toFixed(1)
  console.log(JSON.stringify(results, null, 2))
  await browser.close()
}

// desktop done
await audit({ width: 390, height: 844 }, 'mobile')
