import { expect, test, type Page } from '@playwright/test'

async function login(page: Page) {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill('123456')
  await page.getByRole('button', { name: '小朋友', exact: true }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  await page.getByRole('button', { name: /小桃/ }).click()
  await expect(page.getByRole('heading', { name: /今天读点什么/ })).toBeVisible()
}

async function detail(page: Page) {
  await page.getByRole('button', { name: '找故事', exact: true }).first().click()
  await page.locator('#shelf-search').fill('小桃子的月亮船')
  await page.getByRole('button', { name: '打开《小桃子的月亮船》', exact: true }).click()
}

test('升级：移动入口、阅读布局、键盘弹层及本地录音权限降级', async ({ page }) => {
  // Test denial explicitly: Windows can otherwise leave a real permission prompt pending.
  await page.addInitScript(() => {
    if (navigator.mediaDevices) Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      configurable: true,
      value: async () => { throw new DOMException('Permission denied for this regression', 'NotAllowedError') },
    })
  })
  await login(page)
  await expect(page.getByRole('button', { name: /切换小读者/ })).toBeVisible()
  await detail(page)
  for (const width of [320, 390, 820, 1440]) {
    await page.setViewportSize({ width, height: 844 })
    const actions = await page.locator('.detail-actions').boundingBox()
    const book = await page.locator('.book-detail').boundingBox()
    expect(actions!.width).toBeGreaterThan(book!.width - 2)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await expect(page.getByRole('button', { name: /开始读|继续读/, exact: true })).toBeInViewport()
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: /开始读|继续读/, exact: true }).click()
  const conflict = page.getByRole('button', { name: /结束旧书，?改读这本/ })
  await expect.poll(async () => await conflict.isVisible() || await page.locator('.reader-controls').isVisible()).toBe(true)
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
  await dialog.getByRole('button', { name: '夜间', exact: true }).click()
  await expect(dialog.getByRole('button', { name: '夜间', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(dialog).toHaveClass(/reading-theme-night/)
  await dialog.getByRole('button', { name: '清晰字体', exact: true }).click()
  await dialog.getByRole('button', { name: '宽松', exact: true }).click()
  await dialog.getByRole('button', { name: '上下滚动', exact: true }).click()
  await expect(page.locator('.pager-page')).toBeHidden()
  await page.keyboard.press('Shift+Tab')
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('button', { name: '阅读设置', exact: true })).toBeFocused()
  await page.getByRole('button', { name: '阅读设置', exact: true }).click()
  await page.getByRole('button', { name: '更多', exact: true }).click()
  await page.getByRole('button', { name: '跟读录音 · 试点' }).click()
  await page.getByRole('button', { name: '开始录音', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText(/麦克风|浏览器暂不支持/)
})

test('升级：主动保存公共文字后断网重新导航，静态离线书架可读和删除', async ({ page, context }) => {
  await login(page)
  await detail(page)
  await page.getByText('下载与离线阅读', { exact: true }).click()
  await page.getByRole('button', { name: '保存文字到本机 · 试点', exact: true }).click()
  await expect(page.getByText('文字已保存；本机离线书架可读 7 天')).toBeVisible()
  await page.evaluate(async () => { await navigator.serviceWorker.ready })
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true)
  await context.setOffline(true)
  await page.goto('/offline')
  await expect(page.getByRole('heading', { name: '离线书架', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '阅读', exact: true }).click()
  await expect(page.locator('#reader').getByRole('heading', { name: '小桃子的月亮船', exact: true })).toBeVisible()
  await expect(page.locator('#reader p').last()).not.toBeEmpty()
  await page.getByRole('button', { name: '从本机删除', exact: true }).click()
  await expect(page.getByText(/没有可用的离线书/)).toBeVisible()
})

test('家庭阅读：保存状态不改变分页，触摸往返后按钮仍可翻页', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await login(page)
  const id = 'imp:layout-fixture'
  const text = Array.from({ length: 30 }, (_, i) => `第${i + 1}段：小兔沿着小路向前走，看见树叶落在溪水上。朋友正在桥边等她，她慢慢打开书，想知道下一页的故事。`).join('\n\n')
  let holdSave = false
  let releaseSave: (() => void) | undefined
  await page.route('**/api/content/imports/**', async route => {
    const request = route.request()
    const pathname = decodeURIComponent(new URL(request.url()).pathname)
    if (!pathname.includes(id)) return route.continue()
    if (pathname.endsWith('/progress')) {
      if (request.method() === 'GET') return route.fulfill({ json: { progress: null } })
      if (holdSave) await new Promise<void>(resolve => { releaseSave = resolve })
      return route.fulfill({ json: { progress: { ...request.postDataJSON(), contentVersion: 1, relocationRequired: false, updatedAt: new Date().toISOString() } } })
    }
    if (pathname.endsWith('/chapters/1')) return route.fulfill({ json: { chapter: { order: 1, title: '安静的小路', text }, images: {}, artUrl: null } })
    return route.fulfill({ json: { book: { id, title: '一家人的阅读旅程：安静的小路与朋友们', lang: 'zh', contentVersion: 1, chapters: [{ order: 1, title: '安静的小路' }] } } })
  })
  await page.goto(`/child/family-book/${encodeURIComponent(id)}/chapter/1`)
  const status = page.locator('.family-save-status')
  await expect(status).toHaveText('已保存')
  const pager = page.locator('.pager-page')
  await expect(pager).toContainText('第 1 /')
  const total = () => pager.innerText().then(value => Number(value.match(/\/\s*(\d+)/)?.[1]))
  const pages = await total()
  expect(pages).toBeGreaterThan(2)
  const article = page.locator('.family-reader-content article')
  const height = (await article.boundingBox())!.height
  holdSave = true
  await page.locator('.page-forward').click()
  await expect(status).toHaveText('保存中…')
  expect(await total()).toBe(pages)
  expect((await article.boundingBox())!.height).toBe(height)
  await expect.poll(() => typeof releaseSave).toBe('function')
  holdSave = false
  releaseSave?.()
  await expect(status).toHaveText('已保存')
  expect(await total()).toBe(pages)
  const cdp = await context.newCDPSession(page)
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true })
  const box = (await article.boundingBox())!
  const y = box.y + Math.min(180, box.height / 2)
  async function swipe(left: boolean) {
    const start = box.x + box.width * (left ? 0.8 : 0.2)
    const end = box.x + box.width * (left ? 0.2 : 0.8)
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: start, y }] })
    for (let i = 1; i <= 8; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start + (end - start) * i / 8, y }] })
      await page.waitForTimeout(16)
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  }
  await swipe(false)
  await expect(pager).toHaveText(`第 1 / ${pages} 页`)
  await swipe(true)
  await expect(pager).toHaveText(`第 2 / ${pages} 页`)
  await page.locator('.page-forward').click()
  await expect(pager).toHaveText(`第 3 / ${pages} 页`)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('联网离线书架：有清晰标题、范围说明和可操作空态', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto('/offline')
  await expect(page.getByRole('heading', { name: '离线书架', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: '先留一本书在本机' })).toBeVisible()
  await expect(page.getByRole('link', { name: '联网返回桃阅读' })).toBeVisible()
  await page.getByText('查看离线范围与限制', { exact: true }).click()
  await expect(page.getByText(/退出账号不会删除公共下载/)).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
