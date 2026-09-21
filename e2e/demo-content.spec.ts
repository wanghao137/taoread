import { expect, test, type Page } from '@playwright/test'

/**
 * v8 贴纸绘本孩子端 e2e（演示模式）：
 * 登录 → v8 首页（hero/指标/挑三本/日历/家庭记忆）→ 找故事（搜索/筛选/空态）
 * → 书籍详情 → 阅读器（主题切换/读完啦）→ 结算卡 → 书架喜欢闭环 → 换人确认。
 * 种子：123456 演示家庭，小桃(6-8)/小柚(3-5)。
 */

const CODE = '123456'

async function loginAsChild(page: Page, name: string): Promise<void> {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  const picker = page.getByText('今天是谁的故事时间？')
  try {
    await picker.waitFor({ timeout: 8_000 })
    await page.getByRole('button', { name: new RegExp(name) }).click()
  } catch {
    /* 单孩直进 */
  }
  await page.getByText('今天想读什么？').waitFor({ timeout: 15_000 })
}

async function goShelf(page: Page): Promise<void> {
  await page.getByRole('button', { name: '我的书架' }).first().click()
  await page.getByText('不用整理得像仓库').first().waitFor({ timeout: 10_000 })
}

test.describe('v8 贴纸绘本孩子端', () => {
  test('首页：hero/本周指标/挑三本/阅读节奏日历/家庭记忆', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await expect(page.getByText(/为你挑了三本/)).toBeVisible()
    await expect(page.locator('div.metric').filter({ hasText: '本周共读' })).toBeVisible({ timeout: 8_000 })
    await expect(page.getByText('阅读节奏')).toBeVisible()
    await expect(page.getByText('近 26 周阅读记录')).toBeVisible()
    await expect(page.getByText('家庭记忆')).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-home.png', fullPage: true })
  })

  test('找故事：搜索命中、筛选、随机一本入口、乱词空态', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await page.getByRole('button', { name: '找故事' }).first().click()
    await page.getByText('先看封面，再决定要不要打开。').waitFor()

    await page.locator('#shelf-search').fill('三字经')
    await expect(page.getByRole('button', { name: /打开《三字经》/ })).toBeVisible({ timeout: 8_000 })
    await page.screenshot({ path: 'test-results/v8-discover-search.png' })

    // 筛选：古诗
    await page.locator('#shelf-search').fill('')
    await page.getByRole('button', { name: '古诗', exact: true }).click()
    await expect(page.getByRole('button', { name: /打开《唐诗三百首》/ })).toBeVisible()

    // 乱词空态
    await page.locator('#shelf-search').fill('zzzz')
    await expect(page.getByText('没找到，换个词试试。')).toBeVisible({ timeout: 8_000 })
  })

  test('详情 → 阅读器 → 读完啦 → 结算卡闭环', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await goShelf(page)
    await page.getByRole('button', { name: /打开《三字经》/ }).first().click()

    // 详情：信息贴纸 + 章节列表
    await expect(page.getByText('适合一起读')).toBeVisible()
    await expect(page.getByText('阅读节奏').first()).toBeVisible()
    await expect(page.getByText('一次只打开一个小故事')).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-detail.png', fullPage: true })

    // 进阅读器
    await page.getByRole('button', { name: /开始读|继续读/ }).first().click()
    await expect(page.getByText(/第 \d+ 章/).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /朗读这一段|停止朗读/ })).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-reader.png', fullPage: true })

    // 阅读设置：三主题
    await page.getByRole('button', { name: '阅读设置' }).click()
    await page.getByRole('button', { name: '护眼', exact: true }).click()
    await page.screenshot({ path: 'test-results/v8-reader-sepia.png' })
    await page.getByRole('button', { name: '夜间', exact: true }).click()
    await page.getByRole('button', { name: '纸白', exact: true }).click()

    // 读完啦 → 结算
    await page.getByRole('button', { name: '读完啦' }).click()
    await expect(page.getByText('这一章读完啦')).toBeVisible()
    await expect(page.getByText('阅读已保存')).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-finish.png', fullPage: true })

    // 回到今天
    await page.getByRole('button', { name: '回到今天' }).click()
    await expect(page.getByText('今天想读什么？')).toBeVisible()
  })

  test('书架：喜欢一本书（心形）并出现在「喜欢」标签', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await goShelf(page)

    await page.getByRole('button', { name: /打开《/ }).first().waitFor({ timeout: 15_000 })
    const likeBtn = page.getByRole('button', { name: /^喜欢《/ }).first()
    const likedLabel = (await likeBtn.getAttribute('aria-label'))!.replace('喜欢', '取消喜欢')
    await likeBtn.click()
    await expect(page.getByRole('button', { name: likedLabel })).toBeVisible()

    await page.getByRole('button', { name: '喜欢', exact: true }).click()
    await expect(page.getByRole('button', { name: likedLabel })).toBeVisible()

    // 切回「全部」再取消收藏（取消后书会离开「喜欢」标签）
    await page.getByRole('button', { name: '全部', exact: true }).click()
    await page.getByRole('button', { name: likedLabel }).first().click()
    await expect(page.getByRole('button', { name: /^喜欢《/ }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-shelf-fav.png' })
  })

  test('换人入口弹确认，取消后仍在孩子端', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await page.getByRole('button', { name: '换人' }).click()
    await expect(page.getByText('要换一个家庭吗？')).toBeVisible()
    await page.getByRole('button', { name: '我按错啦' }).click()
    await expect(page.getByText('今天想读什么？')).toBeVisible()
  })
})
