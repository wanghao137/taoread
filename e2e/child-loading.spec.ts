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
  await page.route(/\/api\/family\/[^/?]+$/, async route => { await gate; await route.continue() })
  const catalogue = page.waitForRequest(r => new URL(r.url()).pathname === '/api/content/books')
  try {
    await page.reload({ waitUntil: 'domcontentloaded' })
    await catalogue
    await expect(page.locator('.story-card')).toHaveCount(0)
  } finally { release() }
  await expect(page.locator('.story-card').first()).toBeVisible()
})

test('找故事：首批按需渲染，展开和搜索仍覆盖完整书库', async ({ page }) => {
  await selectChild(page)
  await page.goto('/child/discover')
  await expect(page.locator('.story-card')).toHaveCount(12)
  await page.getByRole('button', { name: '再看 24 本', exact: true }).click()
  await expect(page.locator('.story-card')).toHaveCount(36)
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
