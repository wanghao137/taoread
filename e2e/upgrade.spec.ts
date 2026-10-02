import { expect, test, type Page } from '@playwright/test'

async function login(page: Page) {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill('123456')
  await page.getByRole('button', { name: '小朋友', exact: true }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  await page.getByRole('button', { name: /小桃/ }).click()
  await expect(page.getByRole('heading', { name: '今天想读什么？' })).toBeVisible()
}

async function detail(page: Page) {
  await page.getByRole('button', { name: '找故事', exact: true }).first().click()
  await page.locator('#shelf-search').fill('小桃子的月亮船')
  await page.getByRole('button', { name: '打开《小桃子的月亮船》', exact: true }).click()
}

test('升级：移动入口、阅读布局、键盘弹层及本地录音权限降级', async ({ page }) => {
  await login(page)
  await expect(page.getByRole('button', { name: /换人/ })).toBeVisible()
  await detail(page)
  await page.getByRole('button', { name: /开始读|继续读/, exact: true }).click()
  const conflict = page.getByRole('button', { name: /结束旧书，?改读这本/ })
  if (await conflict.isVisible()) await conflict.click()
  await expect(page.locator('.reader-top')).toBeVisible()
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    const top = await page.locator('.reader-top').boundingBox()
    expect(top!.x).toBeGreaterThanOrEqual(0)
    expect(top!.x + top!.width).toBeLessThanOrEqual(width + 1)
    await page.screenshot({ path: `test-results/upgrade-reader-${width}.png`, fullPage: true })
  }
  await page.getByRole('button', { name: '阅读设置', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: '阅读设置' })
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Shift+Tab')
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: '阅读设置', exact: true })).toBeFocused()
  await page.getByRole('button', { name: '阅读设置', exact: true }).click()
  await page.getByRole('button', { name: '跟读录音 · 试点' }).click()
  await page.getByRole('button', { name: '开始录音', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText(/麦克风|浏览器暂不支持/)
})

test('升级：主动保存公共文字后断网重新导航，静态离线书架可读和删除', async ({ page, context }) => {
  await login(page)
  await detail(page)
  await page.getByRole('button', { name: '保存文字到本机 · 试点', exact: true }).click()
  await expect(page.getByText('文字已保存；本机离线书架可读 7 天')).toBeVisible()
  await page.evaluate(async () => { await navigator.serviceWorker.ready })
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true)
  await context.setOffline(true)
  await page.goto('/offline')
  await expect(page.getByRole('heading', { name: /公共书离线试点/ })).toBeVisible()
  await page.getByRole('button', { name: '阅读', exact: true }).click()
  await expect(page.locator('#reader').getByRole('heading', { name: '小桃子的月亮船', exact: true })).toBeVisible()
  await expect(page.locator('#reader p').last()).not.toBeEmpty()
  await page.getByRole('button', { name: '从本机删除', exact: true }).click()
  await expect(page.getByText(/没有可用的离线书/)).toBeVisible()
})
