import { expect, test, type Page } from '@playwright/test'

async function child(page: Page) {
  await page.goto('/login')
  await page.getByRole('button', { name: '输入家庭码加入', exact: true }).click()
  await page.locator('#family-code').fill('123456')
  await page.getByRole('button', { name: '小朋友', exact: true }).click()
  await page.getByRole('button', { name: '进入桃阅读', exact: true }).click()
  await page.getByRole('button', { name: /小桃/ }).click()
  await expect(page.locator('.today-hero')).toBeVisible()
}

async function expectDark(page: Page, selector: string) {
  await expect.poll(() => page.locator(selector).first().evaluate(el => {
    const [r, g, b] = getComputedStyle(el).backgroundColor.match(/\d+/g)!.map(Number)
    return Math.max(r!, g!, b!)
  })).toBeLessThan(100)
}

test('系统深色覆盖登录、原生输入、首页和 portal；动态切回亮色', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await child(page)
  await expectDark(page, '.app')
  await page.goto('/child/discover')
  await page.getByRole('button', { name: '书单 ▾', exact: true }).click()
  await expectDark(page, '[role="dialog"]')
  await expect(page.getByRole('dialog').getByRole('button', { name: '关闭主题书单' })).toBeVisible()
  await page.keyboard.press('Escape')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect.poll(() => page.locator('.app').evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(254, 249, 234)')
})

test('桌面首页字号与信息密度；窄屏保持可操作', async ({ page }) => {
  await page.setViewportSize({ width: 1448, height: 910 })
  await child(page)
  await expect.poll(() => page.locator('.today-heading h2').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeLessThanOrEqual(34)
  await expect(page.locator('.today-picks .story-row')).toBeVisible()
  const row = await page.locator('.today-picks .story-row').boundingBox()
  expect(row!.y + row!.height).toBeLessThan(910)
  for (const width of [320, 390, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 910 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(page.locator('.continue-action')).toBeInViewport()
  }
})

test('显式夜间设置、目录与刷新保留主题；纸白可独立于系统深色', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await child(page)
  const sessionStarted = page.waitForResponse(response => response.url().endsWith('/api/cosession') && response.request().method() === 'POST')
  await page.goto('/child/book/zh-classic-prince/chapter/1')
  const conflict = page.getByRole('button', { name: '结束旧书，改读这本', exact: true })
  const sessionResponse = await sessionStarted
  expect([200, 201, 409]).toContain(sessionResponse.status())
  if (sessionResponse.status() === 409) {
    await conflict.click()
    await expect(page.getByRole('dialog', { name: '上一本还没收尾' })).toBeHidden()
  }
  await page.getByRole('button', { name: '阅读设置', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: '阅读设置' })
  await dialog.getByRole('button', { name: '夜间', exact: true }).click()
  await expectDark(page, '.reading-dialog')
  await page.keyboard.press('Escape')
  await page.reload()
  await expect(page.locator('.reader.night .reader-chapter-title')).toBeVisible()
  await page.setViewportSize({ width: 1448, height: 910 })
  await expect.poll(async () => {
    const bounds = await page.locator('.reader.night').boundingBox()
    return bounds?.x === 0 && bounds.width === 1448
  }).toBe(true)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: '目录', exact: true }).click()
  await expectDark(page, '.reading-dialog')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: '阅读设置', exact: true }).click()
  await dialog.getByRole('button', { name: '纸白', exact: true }).click()
  await page.keyboard.press('Escape')
  await expect(page.locator('.reader.paper')).toBeVisible()
  await expect.poll(() => page.locator('.reader').evaluate(el => getComputedStyle(el).color)).toBe('rgb(43, 38, 31)')
  await page.evaluate(() => localStorage.setItem('taoread-reader-theme', JSON.stringify('night')))
  await page.route('**/api/content/books/zh-classic-prince/chapters/1', route => route.fulfill({ status: 503, json: { message: '章节连接失败' } }))
  await page.reload()
  await expect(page.getByRole('button', { name: '再试一次', exact: true })).toBeVisible()
  await expectDark(page, '.reader.night')
  await page.unroute('**/api/content/books/zh-classic-prince/chapters/1')
  await page.getByRole('button', { name: '再试一次', exact: true }).click()
  await expect(page.locator('.reader.night .reader-chapter-title')).toBeVisible()
})
