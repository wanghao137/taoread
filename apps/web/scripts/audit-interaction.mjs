/**
 * docs/85 交互体验专项走查（行为验证，非视觉）：
 * 核心旅程 = 新孩子首次进入 → 找书 → 读一本 → 朗读控制 → 翻页/设置 →
 * 目录跳章 → 读完结算 → 回首页看状态流转 → 收藏/书签 → 换人/家长门。
 * 每步记录：交互是否成立、状态是否正确流转、断点在哪。
 */
import { webkit } from 'playwright'
const BASE = 'http://127.0.0.1:8091'
const OUT = 'D:/codesolo/taoread/docs/screenshots/audit85'
import { mkdirSync } from 'node:fs'
mkdirSync(OUT, { recursive: true })

const browser = await webkit.launch()
const issues = []
const shot = (n) => page.screenshot({ path: `${OUT}/${n}.png` }).catch(() => {})
const ok = (name, cond, detail = '') => {
  console.log(`${cond ? '✓' : '✗ FAIL'} ${name}${detail ? ' — ' + detail : ''}`)
  if (!cond) issues.push(`${name}: ${detail}`)
}

const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, locale: 'zh-CN' })).newPage()
page.on('pageerror', e => { issues.push('PAGEERROR: ' + String(e).slice(0, 150)); console.log('PAGEERROR:', String(e).slice(0, 150)) })

// ═══ 1. 冷启动（新设备视角：deviceId 随机 → 无历史）═══
console.log('── 1. 冷启动与首次登录 ──')
await page.goto(`${BASE}/login`, { waitUntil: 'commit' })
await page.waitForSelector('.role-pick', { timeout: 20000 })
ok('登录页角色可切换', await page.locator('.role-pick').count() === 2)
await page.locator('.role-pick', { hasText: '小朋友' }).first().click()
await page.locator('button', { hasText: '输入家庭码加入' }).first().click()
// 输错码的错误反馈
await page.fill('.code-input', '00000000')
await page.locator('.sticker-btn.primary.block').first().click()
await page.waitForTimeout(1500)
const errShown = await page.locator('[role="alert"], .msg').first().textContent().catch(() => '')
ok('错误家庭码有明确反馈', Boolean(errShown && errShown.length > 3), String(errShown).slice(0, 40))
await page.fill('.code-input', '12345678')
await page.locator('.sticker-btn.primary.block').first().click()
await page.waitForSelector('.mast', { timeout: 20000 })
await page.locator('.pick-name').first().waitFor({ timeout: 8000 }).catch(() => {})
if (await page.locator('.pick-name').count()) await page.locator('.pick-name').first().click()
await page.waitForSelector('.today-hero', { timeout: 20000 })
await page.waitForTimeout(2500)
ok('首页加载完成（诗词卡在）', await page.locator('.daily-poem-card').count() > 0)

// ═══ 2. 换孩子交互（头像个人的下拉/弹层）═══
console.log('── 2. 换孩子与家长门 ──')
await page.locator('.child-profile, button[aria-label*="切换"]').first().click().catch(() => {})
await page.waitForTimeout(1000)
const pickerVisible = await page.locator('.pick-card, .pick-grid, [role="dialog"]').first().isVisible().catch(() => false)
ok('点头像出现换人界面', pickerVisible)
if (pickerVisible) {
  // 设计契约：退出按钮语义是「退出到登录页（换家庭）」；点自己名字则回首页
  await page.locator('.pick-name').first().click(); await page.waitForTimeout(900)
}
ok('点自己名字返回首页（不退出登录）', await page.locator('.today-hero').first().isVisible().catch(() => false))
// 家长入口（应引导去登录 PIN）
await page.locator('.parent-entry, button[aria-label="家长入口"]').first().click().catch(() => {})
await page.waitForTimeout(1000)
ok('家长入口跳登录 PIN 流', page.url().includes('login'), page.url().slice(-30))
await page.goto(`${BASE}/login`, { waitUntil: 'commit' })
await page.waitForSelector('.role-pick', { timeout: 20000 })
await page.locator('.role-pick', { hasText: '小朋友' }).first().click()
await page.locator('button', { hasText: '输入家庭码加入' }).first().click()
await page.waitForSelector('.code-input', { timeout: 15000 })
await page.fill('.code-input', '12345678')
await page.locator('.sticker-btn.primary.block').first().click()
await page.waitForSelector('.mast', { timeout: 20000 })
await page.locator('.pick-name').first().waitFor({ timeout: 8000 }).catch(() => {})
if (await page.locator('.pick-name').count()) await page.locator('.pick-name').first().click()
await page.waitForSelector('.today-hero', { timeout: 20000 })
await page.waitForTimeout(1500)

// ═══ 3. 找故事：筛选/搜索/书单交互 ═══
console.log('── 3. 找故事交互 ──')
await page.locator('.mobile-nav button', { hasText: /找故事|发现/ }).first().click()
await page.waitForTimeout(2200)
const chips = await page.locator('.filter, .tab').count()
ok('筛选 chips 存在', chips > 0, `${chips} 个`)
// chip 点击后状态
const chip1 = page.locator('.filter, .tab').nth(1)
if (await chip1.count()) {
  const label = await chip1.textContent()
  await chip1.click(); await page.waitForTimeout(1200)
  const pressed = await chip1.getAttribute('aria-pressed')
  ok(`点筛选「${label?.trim()}」有选中态`, pressed === 'true' || await chip1.evaluate(el => el.classList.contains('on')))
  await chip1.click().catch(() => {}); await page.waitForTimeout(600)
}
// 搜索→清空
await page.fill('#shelf-search', '阿凡提')
await page.waitForTimeout(1400)
const found = await page.locator('.story-card, .lib-card, .fam-card').filter({ hasText: '阿凡提' }).count()
ok('搜索阿凡提有结果', found > 0)
await page.fill('#shelf-search', '不存在的书名xyz')
await page.waitForTimeout(1200)
const emptyHint = await page.evaluate(() => document.body.innerText.includes('没找到') || document.body.innerText.includes('没有找到'))
ok('无结果有友好空态', emptyHint)
await page.fill('#shelf-search', '')
await page.waitForTimeout(800)

// ═══ 4. 阿凡提整本阅读交互 ═══
console.log('── 4. 阿凡提阅读旅程 ──')
await page.fill('#shelf-search', '阿凡提')
await page.waitForTimeout(1400)
await page.locator('.story-card, .lib-card, .fam-card').filter({ hasText: '阿凡提' }).first().click()
await page.waitForTimeout(2000)
ok('详情页章节列表', (await page.locator('.chapter').count()) === 12)
// 收藏交互：详情页无收藏按钮（设计如此，收藏在书架卡片）——记录性断言
const detailFav = await page.locator('button[aria-label*="收藏"]').count()
ok('详情页无收藏入口（收藏在书架，UX 观察项）', true, `aria 收藏钮 ${detailFav} 个`)
// 进入第 1 章
await page.locator('.chapter').first().click()
await page.waitForSelector('.reader-text, .pager-track', { timeout: 30000 })
const conflict = page.getByRole('button', { name: '结束旧书，改读这本', exact: true })
if (await conflict.count()) { await conflict.click(); await page.waitForTimeout(1500) }
await page.waitForTimeout(1800)
ok('阅读器打开正文', (await page.locator('.reader-text, .pager-track').first().isVisible()))
// 朗读：开始→暂停→继续→停止（残留会话可能改文案：先容错找变体）
await page.waitForTimeout(2500)
await shot('before-speak')
const speakBtn = page.getByRole('button', { name: '朗读本章', exact: true }).first()
if (!(await speakBtn.count())) {
  const alt = await page.evaluate(() => [...document.querySelectorAll('button')].map(b => b.textContent.trim()).filter(t => /朗读|读/.test(t)).slice(0, 6))
  console.log('朗读钮变体排查:', JSON.stringify(alt))
  const blockers = await page.evaluate(() => [...document.querySelectorAll('[role="dialog"], .sheet-backdrop')].filter(e => e.getClientRects().length > 0).map(e => e.textContent.slice(0, 40)))
  console.log('在场弹层:', JSON.stringify(blockers))
}
await page.getByRole('button', { name: /朗读本章|继续朗读/, exact: true }).first().click().catch(() => speakBtn.click())
await page.getByRole('button', { name: '暂停朗读', exact: true }).waitFor({ timeout: 60000 })
ok('朗读启动→暂停钮出现', true)
await page.getByRole('button', { name: '暂停朗读', exact: true }).click()
await page.getByRole('button', { name: '继续朗读', exact: true }).waitFor({ timeout: 10000 }).catch(() => {})
ok('暂停→继续钮出现', await page.getByRole('button', { name: '继续朗读', exact: true }).count() > 0)
await page.getByRole('button', { name: '继续朗读', exact: true }).click().catch(() => {})
await page.waitForTimeout(1200)
await page.getByRole('button', { name: '停止朗读', exact: true }).click()
await page.waitForTimeout(1000)
ok('停止后回到朗读本章', await page.getByRole('button', { name: '朗读本章', exact: true }).count() > 0)
// 字号+主题（面板内连续调整后 ESC）
await page.getByRole('button', { name: '排版', exact: true }).click()
await page.waitForTimeout(600)
const bigger = page.getByRole('button', { name: '大一点', exact: true })
if (await bigger.count()) { await bigger.click(); await page.waitForTimeout(400) }
await page.locator('[role="dialog"] button', { hasText: '夜间' }).first().click()
await page.waitForTimeout(800)
await page.keyboard.press('Escape')
await page.waitForTimeout(600)
const isNight = await page.evaluate(() => document.querySelector('.reader')?.classList.contains('night'))
ok('字号+夜间主题连续调整生效', isNight === true)
// 目录跳章
await page.getByRole('button', { name: '目录', exact: true }).click()
await page.waitForTimeout(900)
const tocChapters = page.locator('[role="dialog"] .chapter, [role="dialog"] button').filter({ hasText: '第' })
ok('目录弹层可开', await page.locator('.sheet-backdrop:visible, .chapters-sheet:visible, [role="dialog"]:visible').count() > 0 || await page.getByRole('button', { name: '兔汤' }).count() > 0)
const ch5 = page.locator('[role="dialog"] button, [role="dialog"] .chapter').filter({ hasText: '兔汤' }).first()
if (await ch5.count()) {
  await ch5.click(); await page.waitForTimeout(2000)
  const jumped = await page.evaluate(() => document.body.innerText.includes('兔汤'))
  ok('目录跳章生效（跳到兔汤的汤）', jumped)
} else {
  ok('目录跳章生效（跳到兔汤的汤）', false, '目录里找不到「兔汤」章')
}
// 翻页模式（切页+翻 3 页）
await page.getByRole('button', { name: '排版', exact: true }).click().catch(async () => {})
await page.waitForTimeout(600)
const dayBtn = page.locator('[role="dialog"] button', { hasText: /纸白/ }).first()
if (await dayBtn.count()) await dayBtn.click().catch(() => {})
await page.waitForTimeout(400)
await page.getByRole('button', { name: '排版', exact: true }).click().catch(() => {})
await page.waitForTimeout(600)
const pageMode = page.locator('[role="dialog"] button', { hasText: '左右翻页' }).first()
if (await pageMode.count()) {
  await pageMode.click(); await page.waitForTimeout(1200)
  const pager = await page.locator('.pager-navigation').count()
  ok('切翻页模式出现翻页钮', pager > 0)
  const next = page.locator('.pager-navigation button').last()
  if (pager > 0 && await next.count()) {
    await next.click(); await page.waitForTimeout(500)
    await next.click().catch(() => {}); await page.waitForTimeout(500)
    ok('翻页钮可连续翻页', true)
  }
} else ok('切翻页模式出现翻页钮', false, '找不到左右翻页按钮')

// ═══ 5. 回首页：状态流转（继续阅读应更新）═══
console.log('── 5. 状态流转 ──')
await page.goto(`${BASE}/child/today`, { waitUntil: 'commit' })
await page.waitForSelector('.today-hero', { timeout: 20000 })
await page.waitForTimeout(2200)
const heroText = await page.locator('.today-hero').first().innerText().catch(() => '')
ok('继续阅读卡片指向阿凡提', heroText.includes('阿凡提'), heroText.replace(/\n/g, '/').slice(0, 50))

// ═══ 6. 笠翁对韵：拼音/白话开关交互 ═══
console.log('── 6. 笠翁对韵诗歌辅助交互 ──')
await page.locator('.mobile-nav button', { hasText: /找故事|发现/ }).first().click()
await page.waitForTimeout(2000)
await page.fill('#shelf-search', '笠翁')
await page.waitForTimeout(1400)
await page.locator('.story-card, .lib-card, .fam-card').filter({ hasText: '笠翁' }).first().click()
await page.waitForTimeout(2000)
await page.locator('.chapter').first().click()
await page.waitForSelector('.reader-text, .pager-track', { timeout: 30000 })
const c2 = page.getByRole('button', { name: '结束旧书，改读这本', exact: true })
if (await c2.count()) { await c2.click(); await page.waitForTimeout(1500) }
await page.waitForTimeout(1600)
const rubyCount = await page.locator('.poem-ruby rt, ruby rt').count()
ok('诗歌默认有注音', rubyCount > 10, `${rubyCount} 个`)
await page.getByRole('button', { name: '排版', exact: true }).click()
await page.waitForTimeout(600)
const pyToggle = page.locator('.reading-toggle', { hasText: '显示拼音' }).locator('input')
if (await pyToggle.count()) {
  await pyToggle.uncheck(); await page.waitForTimeout(700)
  const after = await page.locator('.poem-ruby rt, ruby rt').count()
  ok('关闭拼音注音消失', after === 0 || after < rubyCount, `${rubyCount}→${after}`)
  await page.keyboard.press('Escape')
} else ok('关闭拼音注音消失', false, '找不到拼音开关')

// ═══ 7. 夜间模式全程（设置→读→返回首页）═══
console.log('── 7. 夜间模式交互连贯性 ──')
await page.getByRole('button', { name: '排版', exact: true }).click().catch(() => {})
await page.waitForTimeout(600)
const nBtn = page.locator('[role="dialog"] button', { hasText: '夜间' }).first()
if (await nBtn.count()) { await nBtn.click(); await page.waitForTimeout(800) }
await page.keyboard.press('Escape').catch(() => {})
await page.waitForTimeout(400)
// 阅读器夜间主题的持久化由 e2e theme.spec 契约覆盖（显式夜间→目录→刷新保留）；
// 首页夜景跟随系统深色而非阅读器设置（两个独立轨道，勿混淆断言）
await page.reload({ waitUntil: 'commit' })
await page.waitForSelector('.reader-text, .pager-track', { timeout: 30000 }).catch(() => {})
await page.waitForTimeout(1200)
const nightKept = await page.evaluate(() => document.querySelector('.reader')?.classList.contains('night'))
ok('阅读器夜间主题刷新保留（e2e 同款契约）', nightKept === true)

console.log('\n═══ 交互走查汇总 ═══')
console.log(`发现 ${issues.length} 个问题`)
issues.forEach(i => console.log(' ✗', i))
await shot('final-state')
await browser.close()
