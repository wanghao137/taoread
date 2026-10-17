import { expect, test, type Page } from '@playwright/test'

async function login(page: Page) {
  await page.goto('/login')
  await page.getByRole('button', { name: '输入家庭码加入', exact: true }).click()
  await page.locator('#family-code').fill('123456')
  await page.getByRole('button', { name: '小朋友', exact: true }).click()
  await page.getByRole('button', { name: '进入桃阅读', exact: true }).click()
  await page.getByRole('button', { name: /小桃/ }).click()
  await expect(page.locator('.today-hero')).toBeVisible()
}

async function familyFixture(page: Page) {
  const book = { id: 'imp:secondary-ui', title: '小朋友和森林伙伴一起寻找藏在星空深处的秘密花园', author: '家庭藏书作者', lang: 'zh', ageStage: '6-8', chapterCount: 46, contentVersion: 1, coverUrl: '/brand/logo-256.png' }
  await page.route('**/api/content/imports?*', route => route.fulfill({ json: { books: Array.from({ length: 12 }, (_, i) => ({ ...book, id: `${book.id}-${i}`, coverUrl: i === 11 ? null : book.coverUrl })) } }))
  await page.route('**/api/content/imports/**', route => {
    const path = decodeURIComponent(new URL(route.request().url()).pathname)
    if (!path.includes(book.id)) return route.continue()
    if (path.endsWith('/progress')) return route.fulfill({ json: { progress: { order: 3, offset: 0, completed: false, contentVersion: 1, revision: 1 } } })
    if (path.includes('/chapters/')) return route.fulfill({ json: { chapter: { order: 3, title: '森林里的第三个故事', text: '小兔打开故事书，看见月亮从树梢升起来。'.repeat(20) }, images: {} } })
    return route.fulfill({ json: { book: { ...book, chapters: Array.from({ length: 46 }, (_, i) => ({ order: i + 1, title: `森林里的第 ${i + 1} 个故事` })) } } })
  })
}

test('家庭书架大屏封面受控；详情保留浏览导航，续读后进入沉浸正文', async ({ page }) => {
  await familyFixture(page)
  await login(page)
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/child/family-books')
  await expect(page.locator('.fam-card')).toHaveCount(12)
  expect((await page.locator('.fam-cover').first().boundingBox())!.height).toBeLessThanOrEqual(220)
  expect((await page.locator('.fam-card').first().boundingBox())!.width).toBeLessThan(300)
  const fallback = page.locator('.fam-cover-fallback')
  await fallback.scrollIntoViewIfNeeded()
  expect((await fallback.locator('.tao-icon').boundingBox())!.width).toBe(44)
  await expect(fallback.locator('span')).toBeVisible()
  await page.locator('.fam-card').first().click()
  await expect(page.getByRole('navigation', { name: '孩子端导航', exact: true })).toBeVisible()
  await expect(page.locator('.family-chapter-row')).toHaveCount(46)
  expect((await page.locator('.family-chapter-row').first().boundingBox())!.height).toBeLessThan(90)
  await page.setViewportSize({ width: 320, height: 844 })
  await expect(page.locator('.family-book-hero')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('button', { name: '从第 3 章续读', exact: true }).click()
  await expect(page).toHaveURL(/\/chapter\/3$/)
  await expect(page.locator('.family-reader-content')).toBeVisible()
  await expect(page.getByRole('navigation', { name: '孩子端导航', exact: true })).toBeHidden()
  expect((await page.locator('.family-reader').boundingBox())!.width).toBe(320)
})

test('首页辅助卡片支持键盘展开；窄屏输入和展开内容保持在视口内', async ({ page }) => {
  await login(page)
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.setViewportSize({ width: 320, height: 844 })
  const paper = page.locator('.paper-entry')
  await paper.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('textbox', { name: '纸质书书名' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await paper.locator('summary').focus()
  await page.keyboard.press('Space')
  await expect(page.getByRole('textbox', { name: '纸质书书名' })).toBeHidden()
  const recent = page.locator('.recent-reading')
  await expect.poll(() => recent.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(43, 42, 48)')
})
