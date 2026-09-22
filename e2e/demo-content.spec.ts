import { expect, test, type Page } from '@playwright/test'

/**
 * v8 贴纸绘本孩子端 e2e（演示模式）：
 * 登录 → v8 首页（hero/挑三本/心情/家庭阅读记忆；日历在「我的 → 阅读记忆」）
 * → 找故事（搜索/心情筛选/乱词空态）→ 书籍详情 → 阅读器（主题切换/读完啦）
 * → 结算卡 → 我的页喜欢闭环 → 换人（A4：换人=选小读者，不弹换家庭确认）。
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

async function goDiscover(page: Page): Promise<void> {
  await page.getByRole('button', { name: '找故事' }).first().click()
  await page.getByText('先看封面，再决定要不要打开。').waitFor()
}

async function goMy(page: Page): Promise<void> {
  // 移动端入口：底部导航「我的」（桌面侧栏同名单匹配，移动端侧栏 display:none 不参与）
  await page.getByRole('button', { name: '我的', exact: true }).click()
  await page.getByText('正在读、喜欢、读完，还有收下来的词').waitFor({ timeout: 10_000 })
}

test.describe('v8 贴纸绘本孩子端', () => {
  test('首页：hero/挑三本/心情/家庭阅读记忆；我的页含阅读节奏日历', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await expect(page.getByText(/为你挑了三本/)).toBeVisible()
    await expect(page.getByText('今天想读哪种感觉？')).toBeVisible()
    await expect(page.getByText('最近的家庭阅读记忆')).toBeVisible()
    // 阅读节奏（近 8 周阅读足迹日历）在「我的 → 阅读记忆」页签
    await goMy(page)
    await page.getByRole('button', { name: '阅读记忆' }).click()
    await expect(page.getByText('近 8 周阅读足迹')).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-home.png', fullPage: true })
  })

  test('找故事：搜索命中、心情筛选、乱词空态', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await goDiscover(page)

    await page.locator('#shelf-search').fill('三字经')
    await expect(page.getByRole('button', { name: /打开《三字经》/ })).toBeVisible({ timeout: 8_000 })
    await page.screenshot({ path: 'test-results/v8-discover-search.png' })

    // 心情筛选：想知道为什么 → 蒙学类（三字经为 primer，小集合必在首屏）
    await page.locator('#shelf-search').fill('')
    await page.getByRole('button', { name: '想知道为什么', exact: true }).click()
    await expect(page.getByRole('button', { name: /打开《三字经》/ })).toBeVisible({ timeout: 8_000 })

    // 乱词空态
    await page.locator('#shelf-search').fill('zzzz')
    await expect(page.getByText('没找到，换个词试试。')).toBeVisible({ timeout: 8_000 })
  })

  test('详情 → 阅读器 → 读完啦 → 结算卡闭环', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await goDiscover(page)
    await page.locator('#shelf-search').fill('三字经')
    await page.getByRole('button', { name: /打开《三字经》/ }).first().click()

    // 详情：信息贴纸 + 章节列表
    await expect(page.getByText('适合一起读')).toBeVisible()
    await expect(page.getByText('一次只打开一个小故事')).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-detail.png', fullPage: true })

    // 进阅读器
    await page.getByRole('button', { name: /开始读|继续读/ }).first().click()
    await expect(page.getByText(/第 \d+ 章/).first()).toBeVisible()
    await expect(page.getByRole('button', { name: /朗读本章|停止朗读/ })).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-reader.png', fullPage: true })

    // 阅读设置：三主题
    await page.getByRole('button', { name: '阅读设置' }).click()
    await page.getByRole('button', { name: '护眼', exact: true }).click()
    await page.screenshot({ path: 'test-results/v8-reader-sepia.png' })
    await page.getByRole('button', { name: '夜间', exact: true }).click()
    await page.getByRole('button', { name: '纸白', exact: true }).click()
    // 设置浮层为遮罩点击收起（Overlay onClose）：选完主题先关面板再点读完啦
    await page.mouse.click(195, 100)

    // 读完啦 → 结算
    await page.getByRole('button', { name: '读完啦' }).click()
    await expect(page.getByText('这一章读完啦')).toBeVisible()
    await expect(page.getByText(/被好好保存/)).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-finish.png', fullPage: true })

    // 回到今天
    await page.getByRole('button', { name: '回到今天' }).click()
    await expect(page.getByText('今天想读什么？')).toBeVisible()
  })

  test('我的页：喜欢一本书（心形）并出现在「喜欢」页签', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await goMy(page)

    await page.getByRole('button', { name: /打开《/ }).first().waitFor({ timeout: 15_000 })
    // 进入我的页即触发书架重拉（审计 A10.5）：等重拉渲染稳定再点喜欢，避免节点替换竞态
    await page.waitForTimeout(1_200)
    const likeBtn = page.locator('.story-card .fav').first()
    const likedLabel = (await likeBtn.getAttribute('aria-label'))!.replace('喜欢', '取消喜欢')
    await likeBtn.click()
    await expect(page.getByRole('button', { name: likedLabel })).toBeVisible()

    await page.getByRole('button', { name: '喜欢', exact: true }).click()
    await expect(page.getByRole('button', { name: likedLabel })).toBeVisible()

    // 切回「正在读」再取消收藏（取消后书会离开「喜欢」页签）
    await page.getByRole('button', { name: '正在读', exact: true }).click()
    await page.getByRole('button', { name: likedLabel }).first().click()
    await expect(page.getByRole('button', { name: /^喜欢《/ }).first()).toBeVisible()
    await page.screenshot({ path: 'test-results/v8-shelf-fav.png' })
  })

  test('换人入口打开选人页，重选后仍在孩子端', async ({ page }) => {
    await loginAsChild(page, '小桃')
    // A4（审计）：换人=选小读者（不再弹换家庭确认；换家庭=登录页退出）
    await page.getByRole('button', { name: '换人' }).click()
    await expect(page.getByText('今天是谁的故事时间？')).toBeVisible()
    await page.getByRole('button', { name: /小桃/ }).click()
    await expect(page.getByText('今天想读什么？')).toBeVisible()
  })
})
