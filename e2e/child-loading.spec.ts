import { expect, test, type Page } from '@playwright/test'

async function selectChild(page: Page) {
  await page.goto('/login')
  await page.getByRole('button', { name: '输入家庭码加入', exact: true }).click()
  await page.getByLabel('家庭码', { exact: true }).fill('123456')
  await page.getByRole('button', { name: '小朋友', exact: true }).click()
  await page.getByRole('button', { name: '进入桃阅读', exact: true }).click()
  await page.getByRole('button', { name: /小柚/ }).click()
  await expect(page.locator('.story-card').first()).toBeVisible()
}

test('孩子端启动：轻量首页与家庭验证并行，验证前不展示档案数据', async ({ page }) => {
  await selectChild(page)
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  let familyReads = 0
  let homeReads = 0
  let catalogueReads = 0
  await page.route(/\/api\/family\/[^/?]+$/, async route => { familyReads++; await gate; await route.continue() })
  await page.route('**/api/content/books?childId=*', route => { catalogueReads++; return route.continue() })
  await page.route('**/api/content/home?childId=*', route => { homeReads++; return route.continue() })
  const home = page.waitForRequest(r => new URL(r.url()).pathname === '/api/content/home')
  try {
    await page.reload({ waitUntil: 'domcontentloaded' })
    await home
    await expect(page.locator('.story-card')).toHaveCount(0)
  } finally { release() }
  await expect(page.locator('.story-card').first()).toBeVisible()
  expect(familyReads).toBe(1)
  expect(homeReads).toBe(1)
  expect(catalogueReads).toBe(0)
})

test('找故事：分页读取首批，下滑自动追加且搜索覆盖完整书库', async ({ page }) => {
  await selectChild(page)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/child/discover')
  await expect(page.locator('.story-card')).toHaveCount(12)
  await expect(page.locator('.library-book').first()).toHaveCSS('content-visibility', 'auto')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  const cards = page.locator('.story-card')
  await expect.poll(() => cards.count()).toBeGreaterThanOrEqual(4)
  const initialCount = await cards.count()
  // A short viewport can already put the sentinel inside the preload margin.
  expect(initialCount).toBeLessThanOrEqual(28)
  await expect(page.getByRole('button', { name: '再看 24 本', exact: true })).toHaveCount(0)
  await page.locator('.library-more').scrollIntoViewIfNeeded()
  await expect.poll(() => cards.count()).toBeGreaterThan(initialCount)
  await page.getByRole('textbox', { name: '搜索书名或作者', exact: true }).fill('三字经')
  await expect(page.getByRole('button', { name: '打开《三字经》', exact: true })).toBeVisible()
})

test('找故事：连续下滑到末尾、回滚和改变屏宽均不会撑宽书卡', async ({ page }) => {
  await selectChild(page)
  await page.setViewportSize({ width: 1920, height: 910 })
  await page.goto('/child/discover')
  const cards = page.locator('.library-book')
  await expect(cards).toHaveCount(12)
  const firstWidth = await cards.first().evaluate(el => el.getBoundingClientRect().width)
  const total = Number((await page.getByText(/^当前找到 \d+ 本。$/).textContent())?.match(/\d+/)?.[0])
  expect(total).toBeGreaterThan(36)
  for (let count = 12; count < total;) {
    await page.locator('.library-more').scrollIntoViewIfNeeded()
    await expect.poll(() => cards.count()).toBeGreaterThan(count)
    const next = await cards.count()
    expect(next).toBeLessThanOrEqual(total)
    expect(await cards.first().evaluate(el => el.getBoundingClientRect().width)).toBeCloseTo(firstWidth, 0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    count = next
  }
  await expect(page.getByRole('status').filter({ hasText: `已经看到全部 ${total} 本故事` })).toBeVisible()
  await page.getByRole('textbox', { name: '搜索书名或作者', exact: true }).scrollIntoViewIfNeeded()
  for (const width of [320, 390, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 910 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const overflow = await cards.evaluateAll(els => els.some(el => el.getBoundingClientRect().right > innerWidth))
    expect(overflow).toBe(false)
  }
  await page.getByRole('textbox', { name: '搜索书名或作者', exact: true }).fill('根本没有这本书xyz')
  await expect(page.getByText('没找到，换个词试试。', { exact: true })).toBeVisible()
  await expect(page.locator('.library-more')).toHaveCount(0)
  await page.getByRole('button', { name: '看看全部故事', exact: true }).click()
  await expect(cards).toHaveCount(12)
})

test('找故事：不支持 IntersectionObserver 时下滑仍能继续加载', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, 'IntersectionObserver', { value: undefined, configurable: true }) })
  await selectChild(page)
  await page.goto('/child/discover')
  const cards = page.locator('.library-book')
  await expect.poll(() => cards.count()).toBeGreaterThanOrEqual(4)
  const initialCount = await cards.count()
  expect(initialCount).toBeLessThanOrEqual(28)
  await page.locator('.library-more').scrollIntoViewIfNeeded()
  await expect.poll(() => cards.count()).toBeGreaterThan(initialCount)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('找故事：返回书库遇到请求失败，重试后仍能自动追加', async ({ page }) => {
  await selectChild(page)
  await page.goto('/child/discover')
  await expect(page.locator('.library-book').first()).toBeVisible()
  let fail = true
  await page.route('**/api/content/books?childId=*', route => fail
    ? route.fulfill({ status: 503, json: { code: 'NETWORK', message: '书库测试暂不可用' } })
    : route.continue())
  await page.getByRole('button', { name: /^打开《/ }).first().click()
  await expect(page.locator('.book-detail')).toBeVisible()
  await page.locator('.mobile-nav').getByRole('button', { name: '找故事', exact: true }).last().click()
  await expect(page.getByText('书库测试暂不可用', { exact: true })).toBeVisible()
  fail = false
  await page.getByRole('button', { name: '再试一次', exact: true }).click()
  await expect(page.getByText('书库测试暂不可用', { exact: true })).toHaveCount(0)
  const cards = page.locator('.library-book')
  const initialCount = await cards.count()
  await page.locator('.library-more').scrollIntoViewIfNeeded()
  await expect.poll(() => cards.count()).toBeGreaterThan(initialCount)
})

test('孩子端：从列表下方打开详情，书名与开始读回到首屏', async ({ page }) => {
  await selectChild(page)
  await page.goto('/child/discover')
  await expect(page.locator('.library-book').first()).toBeVisible()
  await page.locator('.library-more').scrollIntoViewIfNeeded()
  await expect.poll(() => page.locator('.library-book').count()).toBeGreaterThanOrEqual(28)
  const book = page.locator('.library-book').nth(20).getByRole('button', { name: /^打开《/ })
  await book.scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0)
  await book.click()
  await expect(page.locator('.book-detail h1')).toBeInViewport()
  await expect(page.getByRole('button', { name: /开始读|继续读/, exact: true })).toBeInViewport()
  await expect(page.getByRole('button', { name: '← 返回找故事', exact: true })).toBeInViewport()
})

test('孩子端启动：失效的已选档案不能把预取书库显示给新档案', async ({ page }) => {
  await selectChild(page)
  await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('taoread-session')!)
    state.state.childId = 'deleted-or-other-family-child'
    localStorage.setItem('taoread-session', JSON.stringify(state))
  })
  await page.reload()
  await expect(page.getByText('今天是谁的故事时间？')).toBeVisible()
  await expect(page.locator('.story-card')).toHaveCount(0)
  await page.getByRole('button', { name: /小柚/ }).click()
  await expect(page.locator('.story-card').first()).toBeVisible()
})

test('单书深链：元数据与家庭验证并行，验证前不显示正文，完成后不重复读取', async ({ page }) => {
  await selectChild(page)
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  let reads = 0
  await page.route(/\/api\/family\/[^/?]+$/, async route => { await gate; await route.continue() })
  await page.route('**/api/content/books/poetry-song-spring?childId=*', route => { reads++; return route.continue() })
  const metadata = page.waitForRequest(r => new URL(r.url()).pathname === '/api/content/books/poetry-song-spring')
  try {
    await page.goto('/child/book/poetry-song-spring/chapter/1', { waitUntil: 'domcontentloaded' })
    await metadata
    await expect(page.locator('.reader-text')).toHaveCount(0)
    await expect(page.locator('.reader-chapter-title')).toHaveCount(0)
  } finally { release() }
  await expect(page.locator('.reader-text')).toBeVisible()
  expect(reads).toBe(1)
})

test('单书深链：失效档案的预取结果不能展示，重新选人后可正常打开', async ({ page }) => {
  await selectChild(page)
  await page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('taoread-session')!)
    state.state.childId = 'deleted-or-other-family-child'
    localStorage.setItem('taoread-session', JSON.stringify(state))
  })
  await page.goto('/child/book/poetry-song-spring/chapter/1')
  await expect(page.getByText('今天是谁的故事时间？')).toBeVisible()
  await expect(page.locator('.reader-text')).toHaveCount(0)
  await page.getByRole('button', { name: /小柚/ }).click()
  await expect(page.locator('.reader-text')).toBeVisible()
})

test('预备设置弹层：关闭时不隔离正文、不进入焦点顺序，重复开关恢复焦点', async ({ page }) => {
  await selectChild(page)
  await page.goto('/child/book/poetry-song-spring/chapter/1')
  await expect(page.locator('.reader-text')).toBeVisible()
  const settings = page.getByRole('button', { name: '阅读设置', exact: true })
  const panel = page.getByRole('dialog', { name: '阅读设置', exact: true })
  for (let i = 0; i < 3; i++) {
    await expect(panel).toHaveCount(0)
    expect(await page.locator('#root').evaluate(el => el.inert)).toBe(false)
    await settings.focus()
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => !document.activeElement?.closest('[aria-hidden="true"]'))).toBe(true)
    await settings.click()
    await expect(panel).toBeVisible()
    expect(await panel.evaluate(el => el.contains(document.activeElement))).toBe(true)
    expect(await page.locator('#root').evaluate(el => el.inert)).toBe(true)
    await page.keyboard.press('Escape')
    await expect(settings).toBeFocused()
    expect(await page.locator('#root').evaluate(el => el.inert)).toBe(false)
  }
})

test('阅读器启动：正文与进度并行，进度就绪前不能写入新位置', async ({ page }) => {
  await selectChild(page)
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  let writes = 0
  await page.route('**/api/content/books/poetry-song-spring/progress**', async route => {
    if (route.request().method() === 'GET') await gate
    else writes++
    await route.continue()
  })
  const chapter = page.waitForRequest(r => new URL(r.url()).pathname === '/api/content/books/poetry-song-spring/chapters/1')
  try {
    await page.goto('/child/book/poetry-song-spring/chapter/1')
    await chapter
    expect(writes).toBe(0)
    await expect(page.locator('.reader-chapter-title')).toHaveCount(0)
  } finally { release() }
  await expect(page.locator('.reader-chapter-title')).toBeVisible()
  await expect.poll(() => writes).toBeGreaterThan(0)
})

test('阅读深链不读取全量书单、周报或成就，返回找故事仍展示完整目录', async ({ page }) => {
  await selectChild(page)
  const unwanted: string[] = []
  page.on('request', request => {
    const path = new URL(request.url()).pathname
    if (path === '/api/content/books' || path === '/api/reports/weekly' || path === '/api/achievements') unwanted.push(path)
  })
  await page.goto('/child/book/poetry-song-spring/chapter/1')
  await expect(page.locator('.reader-text')).toBeVisible()
  await page.getByRole('button', { name: '阅读设置', exact: true }).click()
  await expect(page.getByRole('dialog', { name: '阅读设置', exact: true })).toBeVisible()
  expect(unwanted).toEqual([])
  await page.goto('/child/discover')
  await expect.poll(() => page.locator('.story-card').count()).toBeGreaterThanOrEqual(4)
  await expect.poll(() => unwanted.filter(p => p === '/api/content/books').length).toBeGreaterThan(0)
  await page.getByRole('textbox', { name: '搜索书名或作者', exact: true }).fill('三字经')
  await expect(page.getByRole('button', { name: '打开《三字经》', exact: true })).toBeVisible()
})

test('单书详情深链在元数据弱网失败后可重试，且收藏状态可正常修改', async ({ page }) => {
  await selectChild(page)
  let fail = true
  let catalogue = 0
  page.on('request', request => { if (new URL(request.url()).pathname === '/api/content/books') catalogue++ })
  await page.route('**/api/content/books/poetry-song-spring?childId=*', route => fail
    ? route.fulfill({ status: 503, json: { code: 'NETWORK', message: '单书测试暂不可用' } })
    : route.continue())
  await page.goto('/child/book/poetry-song-spring')
  await expect(page.getByText('单书测试暂不可用', { exact: true })).toBeVisible()
  fail = false
  await page.getByRole('button', { name: '再试一次', exact: true }).click()
  await expect(page.locator('.book-detail h1')).toBeVisible()
  expect(catalogue).toBe(0)
  const favorite = page.getByRole('button', { name: /放进喜欢|已喜欢|取消喜欢|喜欢/ }).first()
  const before = await favorite.textContent()
  await favorite.click()
  await expect(favorite).not.toHaveText(before ?? '')
})

test('听书深链：书目和目录与家庭验证并行，验证前不展示且只读取一次', async ({ page }) => {
  await selectChild(page)
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  let books = 0
  let chapters = 0
  await page.route(/\/api\/family\/[^/?]+$/, async route => { await gate; await route.continue() })
  await page.route('**/api/content/books/poetry-song-spring?childId=*', route => { books++; return route.continue() })
  await page.route('**/api/content/books/poetry-song-spring/chapters', route => { chapters++; return route.continue() })
  const metadata = page.waitForRequest(r => new URL(r.url()).pathname === '/api/content/books/poetry-song-spring')
  const directory = page.waitForRequest(r => new URL(r.url()).pathname === '/api/content/books/poetry-song-spring/chapters')
  try {
    await page.goto('/child/listen/public/poetry-song-spring', { waitUntil: 'domcontentloaded' })
    await Promise.all([metadata, directory])
    await expect(page.locator('.listening-page')).toHaveCount(0)
  } finally { release() }
  await expect(page.locator('.listening-page .primary')).toBeEnabled()
  await expect(page.locator('.listening-page h1')).not.toHaveText('正在准备听读…')
  expect(books).toBe(1)
  expect(chapters).toBe(1)
})

test('听书深链：失效档案不能展示预取，重新选人后可打开', async ({ page }) => {
  await selectChild(page)
  await page.evaluate(() => {
    const session = JSON.parse(localStorage.getItem('taoread-session')!)
    session.state.childId = 'deleted-or-other-family-child'
    localStorage.setItem('taoread-session', JSON.stringify(session))
  })
  await page.goto('/child/listen/public/poetry-song-spring')
  await expect(page.getByText('今天是谁的故事时间？')).toBeVisible()
  await expect(page.locator('.listening-page')).toHaveCount(0)
  await page.getByRole('button', { name: /小柚/ }).click()
  await expect(page.locator('.listening-page .primary')).toBeEnabled()
})

test('听书深链：书目弱网失败可重试，重试发送新请求', async ({ page }) => {
  await selectChild(page)
  let fail = true
  let reads = 0
  await page.route('**/api/content/books/poetry-song-spring?childId=*', route => {
    reads++
    return fail ? route.fulfill({ status: 503, json: { code: 'NETWORK', message: '听读书目测试暂不可用' } }) : route.continue()
  })
  await page.goto('/child/listen/public/poetry-song-spring')
  await expect(page.getByRole('alert')).toHaveText('听读书目测试暂不可用')
  const beforeRetry = reads
  fail = false
  await page.getByRole('button', { name: '重新加载书目', exact: true }).click()
  await expect(page.locator('.listening-page .primary')).toBeEnabled()
  expect(reads).toBe(beforeRetry + 1)
})

test('离开听书后重新进入会读取最新书目，不长期复用启动预取', async ({ page }) => {
  await selectChild(page)
  let reads = 0
  await page.route('**/api/content/books/poetry-song-spring?childId=*', async route => {
    reads++
    const response = await route.fetch()
    const data = await response.json()
    if (reads > 1) data.book.title = '听读书目新版本'
    await route.fulfill({ response, json: data })
  })
  await page.goto('/child/listen/public/poetry-song-spring')
  await expect(page.locator('.listening-page .primary')).toBeEnabled()
  expect(reads).toBe(1)
  await page.getByRole('button', { name: '返回这本书', exact: true }).click()
  await expect(page.locator('.book-detail')).toBeVisible()
  const beforeReentry = reads
  await page.getByRole('button', { name: '连续听读', exact: true }).click()
  await expect(page.locator('.listening-page h1')).toHaveText('听读书目新版本')
  expect(reads).toBe(beforeReentry + 1)
})
