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

test('孩子端启动：书库与家庭验证并行，验证前不展示档案数据', async ({ page }) => {
  await selectChild(page)
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  let familyReads = 0
  let catalogueReads = 0
  await page.route(/\/api\/family\/[^/?]+$/, async route => { familyReads++; await gate; await route.continue() })
  await page.route('**/api/content/books?childId=*', route => { catalogueReads++; return route.continue() })
  const catalogue = page.waitForRequest(r => new URL(r.url()).pathname === '/api/content/books')
  try {
    await page.reload({ waitUntil: 'domcontentloaded' })
    await catalogue
    await expect(page.locator('.story-card')).toHaveCount(0)
  } finally { release() }
  await expect(page.locator('.story-card').first()).toBeVisible()
  expect(familyReads).toBe(1)
  expect(catalogueReads).toBe(1)
})

test('找故事：按屏宽渲染首批，展开和搜索仍覆盖完整书库', async ({ page }) => {
  await selectChild(page)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/child/discover')
  await expect(page.locator('.story-card')).toHaveCount(12)
  await expect(page.locator('.library-book').first()).toHaveCSS('content-visibility', 'auto')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await expect(page.locator('.story-card')).toHaveCount(4)
  await page.getByRole('button', { name: '再看 24 本', exact: true }).click()
  await expect(page.locator('.story-card')).toHaveCount(28)
  await page.getByRole('textbox', { name: '搜索书名或作者', exact: true }).fill('三字经')
  await expect(page.getByRole('button', { name: '打开《三字经》', exact: true })).toBeVisible()
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
  await expect(page.locator('.story-card')).toHaveCount(4)
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
