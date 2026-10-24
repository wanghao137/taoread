/**
 * docs/79 最严格全产品实测 · 孩子端全流程
 * 对象：生产源站 8091（真实家庭 12345678）
 * 记录：console 错误 / 失败请求 / 每步时延 / 交互结果 / 截图
 * 用法：node scripts/audit-full-walkthrough.mjs [mobile|desktop]
 */
import { chromium } from 'playwright'
const BASE = process.env.TAO_AUDIT_BASE ?? 'http://127.0.0.1:8091'
const MODE = process.argv[2] ?? 'mobile'
const OUT = 'D:/codesolo/taoread/docs/screenshots/audit79'
import { mkdirSync } from 'node:fs'
mkdirSync(OUT, { recursive: true })

const findings = []
const consoleErrors = []
const failedReqs = []

const browser = await chromium.launch()
const vp = MODE === 'desktop' ? { width: 1280, height: 900 } : { width: 390, height: 844 }
const ctx = await browser.newContext({ viewport: vp, hasTouch: true, locale: 'zh-CN' })
const page = await ctx.newPage()
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 300)) })
page.on('pageerror', e => consoleErrors.push('PAGEERROR: ' + String(e).slice(0, 300)))
page.on('requestfailed', r => failedReqs.push(`${r.failure()?.errorText} ${r.url().slice(0, 120)}`))
page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/api/tts')) failedReqs.push(`HTTP ${r.status()} ${r.url().slice(0, 120)}`) })

const shot = (n) => page.screenshot({ path: `${OUT}/${n}-${MODE}.png`, fullPage: false }).catch(() => {})
const step = async (name, fn) => {
  const t = Date.now()
  try { await fn(); console.log(`OK  ${name} (${Date.now() - t}ms)`) }
  catch (e) { findings.push(`[流程] ${name}: ${String(e).split('\n')[0].slice(0, 200)}`); console.log(`FAIL ${name}: ${String(e).split('\n')[0].slice(0, 150)}`) }
}

// 1. 登录
await step('登录页打开', async () => {
  await page.goto(`${BASE}/login`, { waitUntil: 'load' })
  await page.waitForSelector('.role-pick', { timeout: 15000 })
  await shot('01-login')
})
await step('选择小朋友角色', async () => {
  await page.locator('.role-pick', { hasText: '小朋友' }).first().click()
})
await step('输入家庭码进入', async () => {
  await page.locator('button', { hasText: '输入家庭码加入' }).first().click()
  await page.fill('.code-input', '12345678')
  await page.locator('.sticker-btn.primary.block').first().click()
  await page.waitForSelector('.mast', { timeout: 20000 })
})
await step('选小桃', async () => {
  await page.locator('.pick-name').first().waitFor({ timeout: 8000 }).catch(() => {})
  if (await page.locator('.pick-name').count()) await page.locator('.pick-name').first().click()
  await page.waitForSelector('.today-hero', { timeout: 20000 })
  await page.waitForTimeout(2500)
  await shot('02-today-top')
})

// 2. 首页各区块
await step('首页滚动全貌', async () => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(800)
  await shot('03-today-bottom')
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
})
await step('每日诗词卡内容', async () => {
  const poem = page.locator('.daily-poem-card')
  if (await poem.count()) {
    const txt = (await poem.first().innerText()).slice(0, 120)
    console.log('    诗词卡:', txt.replace(/\n/g, '/'))
  } else findings.push('[首页] 未找到每日诗词卡')
})
await step('继续阅读 CTA 可见性', async () => {
  const cta = page.locator('.continue-action')
  if (!(await cta.count())) console.log('    (无在读书籍，CTA 不存在——正常空态)')
  else if (!(await cta.first().isVisible())) findings.push('[首页] 继续阅读 CTA 不可见')
})

// 3. 书架/找故事
await step('找故事页打开', async () => {
  await page.locator('.mobile-nav button', { hasText: /找故事|发现/ }).first().click()
  await page.waitForTimeout(2500)
  await shot('04-discover')
})
await step('书架书籍计数与裂图检查', async () => {
  await page.waitForTimeout(1000)
  const info = await page.evaluate(() => {
    const covers = [...document.querySelectorAll('.book-cover img.cover-art')]
    const broken = covers.filter(i => i.complete && i.naturalWidth === 0).length
    const fallbacks = document.querySelectorAll('.cover-fallback-art').length
    return { covers: covers.length, broken, fallbacks }
  })
  console.log('    书架封面:', JSON.stringify(info))
  if (info.broken > 0) findings.push(`[书架] ${info.broken} 张裂图`)
  if (info.covers === 0) findings.push('[书架] 无封面渲染')
})
await step('搜索三字经', async () => {
  await page.fill('#shelf-search', '三字经')
  await page.waitForTimeout(1500)
  await shot('05-search')
  const has = await page.getByRole('button', { name: /打开《三字经》/ }).count().catch(() => 0)
  if (!has) findings.push('[搜索] 搜「三字经」无结果按钮')
})
await step('清空搜索回书架', async () => {
  await page.fill('#shelf-search', '')
  await page.waitForTimeout(1000)
})
await step('筛选 chips 点击', async () => {
  const chip = page.locator('.filter, .tab').filter({ hasText: /古诗|诗词/ }).first()
  if (await chip.count()) {
    await chip.click()
    await page.waitForTimeout(1200)
    await shot('06-filter')
    await chip.click().catch(() => {})
    await page.waitForTimeout(600)
  } else console.log('    (无筛选 chip)')
})

// 4. 书详情 + 阅读器
await step('打开《三字经》详情', async () => {
  await page.fill('#shelf-search', '三字经')
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: /打开《三字经》/ }).first().click()
  await page.waitForTimeout(2000)
  await shot('07-detail')
})
await step('详情页章节列表', async () => {
  const n = await page.locator('.chapter').count()
  console.log(`    章节数: ${n}`)
  if (n === 0) findings.push('[详情] 章节列表为空')
})
await step('进入第一章', async () => {
  await page.locator('.chapter').first().click()
  await page.waitForSelector('.reader-text, .pager-track', { timeout: 20000 })
  // cosession 409 冲突弹层：旧书未收尾时按设计弹出，处理后才能继续
  const conflict = page.getByRole('button', { name: '结束旧书，改读这本', exact: true })
  if (await conflict.count()) {
    await conflict.click()
    console.log('    (处理了 cosession 冲突弹层)')
    await page.waitForTimeout(1500)
  }
  await page.waitForTimeout(2500)
  await shot('08-reader')
})
await step('阅读器正文检查（文字+注音）', async () => {
  const info = await page.evaluate(() => {
    const t = document.querySelector('.reader-text, .pager-track')
    return { len: t?.textContent.length ?? 0, ruby: t?.querySelectorAll('ruby').length ?? 0 }
  })
  console.log('    正文:', JSON.stringify(info))
  if (info.len < 20) findings.push('[阅读器] 正文过短或为空')
})
await step('目录弹层', async () => {
  await page.getByRole('button', { name: '目录', exact: true }).click()
  await page.waitForTimeout(800)
  await shot('09-toc')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
})
await step('排版设置（字号+主题）', async () => {
  await page.getByRole('button', { name: '排版', exact: true }).click()
  await page.waitForTimeout(800)
  await shot('10-typography')
  const plus = page.locator('[aria-label*="大"], button', { hasText: /大/ }).first()
  if (await plus.count()) { await plus.click().catch(() => {}); await page.waitForTimeout(500) }
  const night = page.locator('button', { hasText: /夜间|夜晚/ }).first()
  if (await night.count()) {
    await night.click()
    await page.waitForTimeout(900)
    await shot('11-night')
    const bg = await page.evaluate(() => {
      const el = document.querySelector('.reader') ?? document.body
      return getComputedStyle(el).backgroundColor
    })
    console.log('    夜间背景:', bg)
  }
  await page.keyboard.press('Escape')
  await page.waitForTimeout(500)
})
await step('翻页模式切换+翻页', async () => {
  await page.getByRole('button', { name: '排版', exact: true }).click().catch(() => {})
  await page.waitForTimeout(600)
  const day = page.locator('button', { hasText: /日间|白天|纸白/ }).first()
  if (await day.count()) await day.click().catch(() => {})
  const pageMode = page.locator('button', { hasText: /翻页/ }).first()
  if (await pageMode.count()) {
    await pageMode.click()
    await page.waitForTimeout(1200)
    await shot('12-pagemode')
    const next = page.locator('.pager-navigation button').last()
    if (await next.count()) {
      for (let i = 0; i < 3; i++) { await next.click().catch(() => {}); await page.waitForTimeout(500) }
      await shot('13-pageturn')
    }
  } else console.log('    (无翻页模式按钮——检查设置面板控件名)')
})
await step('返回书架', async () => {
  await page.getByRole('button', { hasText: /返回/ }).first().click()
  await page.waitForTimeout(1500)
})


// 5. 我的页
await step('我的页检查', async () => {
  await page.locator('.mobile-nav button', { hasText: /我的/ }).first().click()
  await page.waitForTimeout(2000)
  await shot('14-my')
  const txt = await page.evaluate(() => document.body.innerText.slice(0, 400))
  console.log('    我的页摘要:', txt.replace(/\n+/g, '/').slice(0, 150))
})
console.log('')
console.log('═══ 汇总 ═══')
console.log('发现:', findings.length)
findings.forEach(f => console.log(' -', f))
console.log('Console错误:', consoleErrors.length)
consoleErrors.slice(0, 10).forEach(e => console.log(' -', e))
console.log('失败请求:', failedReqs.length)
failedReqs.slice(0, 10).forEach(e => console.log(' -', e))
await browser.close()
