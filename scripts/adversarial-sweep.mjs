/**
 * 对抗式审查 sweep（docs/24）：以真实用户路径走完整演示流程，
 * 每一步收集 console error / failed request / 坏图 / 横向溢出 / 死按钮。
 * 用法：npm run demo 已在跑 → node scripts/adversarial-sweep.mjs
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'fs'

mkdirSync('test-results/sweep', { recursive: true })
const BASE = 'http://localhost:5173'
const issues = []
let shotIdx = 0

async function audit(page, label) {
  const problems = await page.evaluate(() => {
    const out = []
    // 1) 横向溢出
    const doc = document.documentElement
    if (doc.scrollWidth > doc.clientWidth + 2) out.push(`横向溢出: scrollWidth=${doc.scrollWidth} client=${doc.clientWidth}`)
    // 2) 坏图
    const bad = Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src'))
    if (bad.length) out.push(`坏图 x${bad.length}: ${bad.slice(0, 3).map((i) => i.getAttribute('src').slice(0, 60)).join(' | ')}`)
    // 3) 文字溢出容器（截断的中文标题，offsetWidth 明显小于 scrollWidth 且无 truncate 语义）
    const truncated = Array.from(document.querySelectorAll('button, h1, h2, h3, p')).filter((el) => {
      if (el.closest('[aria-busy="true"]')) return false
      const cs = getComputedStyle(el)
      if (cs.textOverflow === 'ellipsis' || cs.overflow === 'hidden') return false
      return el.scrollWidth > el.clientWidth + 4 && el.clientWidth > 0
    })
    if (truncated.length) out.push(`疑似截断 x${truncated.length}: ${truncated.slice(0, 2).map((e) => (e.textContent || '').slice(0, 20)).join(' | ')}`)
    return out
  })
  for (const p of problems) issues.push(`[${label}] ${p}`)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'zh-CN' })
  const page = await context.newPage()
  const consoleErrors = []
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)) })
  page.on('pageerror', (e) => consoleErrors.push(`PAGEERROR: ${String(e).slice(0, 160)}`))
  page.on('response', (r) => { if (r.status() === 404) consoleErrors.push('404: ' + r.url().slice(0, 120)) })
  page.on('requestfailed', (r) => {
    const url = r.url()
    if (!url.includes('favicon')) consoleErrors.push(`REQFAIL: ${url.slice(0, 100)} ${r.failure()?.errorText?.slice(0, 40)}`)
  })

  const snap = async (label) => {
    shotIdx++
    await page.screenshot({ path: `test-results/sweep/${String(shotIdx).padStart(2, '0')}-${label}.png`, fullPage: true })
    await audit(page, label)
  }
  const go = async (label, fn, timeout = 8000) => {
    try { await fn({ timeout }); await page.waitForTimeout(1200); await snap(label) }
    catch (e) { issues.push(`[${label}] 步骤失败: ${String(e).split('\n')[0].slice(0, 140)}`); await snap(label) }
  }

  await page.goto(BASE, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(2500)
  await snap('01-login')

  // 登录：孩子 + 家庭码
  await go('02-join', async ({ timeout }) => {
    await page.getByRole('button', { name: '小朋友' }).click({ timeout })
    await page.getByRole('button', { name: '输入家庭码加入' }).click({ timeout })
    await page.getByPlaceholder('ABCD2345').fill('PEACH888')
    await page.getByRole('button', { name: '进入桃阅读' }).click({ timeout })
  })
  // 选孩子
  await go('03-picker', async ({ timeout }) => {
    // 小桃（6-8）：新书多为 6-8 适龄，书架按孩子年龄段过滤
    await page.getByRole('button', { name: '小桃' }).click({ timeout: 10_000 })
  })
  // 首次引导：跳过（三步 tour）
  await go('04-tour-skip', async ({ timeout }) => {
    const skip = page.getByRole('button', { name: '跳过' })
    await skip.click({ timeout })
  })
  await go('04b-gate', async () => { await page.waitForTimeout(500) })
  // 门屏 → 底部导航「书架」（自研公版书架；点亮月亮后的选书流是推荐流，流程末尾另测）
  await go('05-shelf', async ({ timeout }) => {
    await page.getByRole('navigation', { name: '孩子端导航' }).getByRole('button', { name: '书架' }).click({ timeout })
  })
  // 打开新书：四季诗选
  await go('06-open-new-book', async ({ timeout }) => {
    await page.getByRole('button', { name: /打开《四季诗选/ }).click({ timeout: 12_000 })
  })
  await go('07-start-reading', async ({ timeout }) => {
    await page.getByRole('button', { name: /开始读|接着读/ }).click({ timeout })
  })
  await snap('08-reader')
  // 翻页
  await go('09-next-page', async ({ timeout }) => {
    await page.getByRole('button', { name: /下一章|继续读/ }).click({ timeout })
  })
  // 退出阅读器（顶部返回）
  await go('10-exit-reader', async ({ timeout }) => {
    await page.locator('header button, [aria-label*="返回" i]').first().click({ timeout: 5000 })
  })
  // 收藏一本书
  await go('11-favorite', async ({ timeout }) => {
    await page.getByRole('button', { name: /喜欢《|收藏《/ }).first().click({ timeout })
  })
  // 试听按钮
  await go('12-preview', async ({ timeout }) => {
    await page.getByRole('button', { name: /试听《/ }).first().click({ timeout })
  })
  // 夜灯墙
  await go('13-wall', async ({ timeout }) => {
    await page.getByRole('navigation', { name: '孩子端导航' }).getByRole('button', { name: '夜灯' }).click({ timeout })
  })
  // 回月亮
  await go('14-moon-tab', async ({ timeout }) => {
    await page.getByRole('navigation', { name: '孩子端导航' }).getByRole('button', { name: '月亮' }).click({ timeout })
  })
  // 选书流（点亮月亮）：推荐流 + 掷骰子可见
  await go('15-picker-flow', async ({ timeout }) => {
    // 门屏三态：全新（点亮月亮）/ 未收尾（继续去读）/ 超时未收尾（再多读一小段）
    await page.getByRole('button', { name: /点亮月亮|继续去读|再多读一小段/ }).click({ timeout })
    await page.getByRole('button', { name: /掷骰子|开始阅读|读完啦/ }).first().waitFor({ timeout })
  })

  writeFileSync('test-results/sweep/console-errors.txt', consoleErrors.join('\n') || '(none)')
  writeFileSync('test-results/sweep/issues.txt', issues.join('\n') || '(none)')
  console.log('=== ISSUES ===')
  console.log(issues.join('\n') || '(none)')
  console.log('=== CONSOLE ERRORS ===')
  console.log(consoleErrors.join('\n') || '(none)')
  await browser.close()
}

main().catch((e) => { console.error('sweep failed:', e); process.exit(1) })
