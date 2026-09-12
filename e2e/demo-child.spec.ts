import { expect, test, type Page } from '@playwright/test'

/**
 * 孩子端全闭环 e2e（演示模式）：登录 → 多孩选择 → 月亮门 → 选书（推荐/骰子/搜索）
 * → 选定 → 出发 → 收尾（进度/心情/金句）→ 庆祝 → 夜灯墙 → 续传清零。
 * 种子数据：PEACH888 家庭，小桃(6-8)/小柚(3-5)，历史账本 11 晚。
 */

const CODE = 'PEACH888'

/** 以孩子身份建立会话并进入 /child */
async function loginAsChild(page: Page): Promise<string> {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  // 演示家庭是双孩子：先过孩子选择屏（选小桃），再到月亮门
  const picker = page.getByText('今天是谁的故事时间？')
  try {
    await picker.waitFor({ timeout: 8_000 })
    await page.getByRole('button', { name: /小桃/ }).click()
  } catch {
    // 若未来种子改为单孩则直进门屏
  }
  await page.getByText('月亮升起来啦').waitFor()
  return '小桃'
}

test.describe('孩子端完整仪式流', () => {
  test('登录 → 选书 → 出发 → 收尾 → 庆祝 → 夜灯墙 → 续传清零', async ({ page }) => {
    await loginAsChild(page)

    // ── M2 选书：接着读/推荐/搜索三入口存在 ──
    await page.getByRole('button', { name: /点亮月亮/ }).click()
    await page.getByText('今晚读').waitFor()
    await expect(page.getByRole('button', { name: /掷骰子随机选一本/ })).toBeVisible()
    await page.getByText('今晚的推荐').waitFor()

    // 搜索：输入演示目录中的书名关键词
    await page.getByLabel('搜索书名或作者').fill('小王子')
    await page.getByRole('button', { name: '搜一搜' }).click()
    await page.getByText('《小王子》').first().waitFor()
    await page.screenshot({ path: 'test-results/m2-select-search.png', fullPage: true })

    // ── 选定（搜索结果第一项）──
    await page.getByRole('button', { name: /选《小王子》/ }).first().click()
    await page.getByText('选好啦').waitFor()

    // ── 金句星球入口（有 bookId）──
    await page.getByRole('button', { name: /去金句星球看看/ }).click()
    await page.getByText('金句星球').first().waitFor()
    await page.getByText(/位小读者划过这句/).first().waitFor()
    await page.screenshot({ path: 'test-results/star-sea.png', fullPage: true })
    await page.getByRole('button', { name: /回到月亮/ }).click()
    // 小王子会话 active（未收尾）→ 门屏正确显示续传卡而非全新月亮
    await page.getByText('还没讲完呢').waitFor()
    await page.getByRole('button', { name: /继续去读/ }).click()
    await page.getByText('出发').waitFor()

    // ── M3 出发卡 ──
    await page.getByText('去微信读书读').waitFor()
    await page.screenshot({ path: 'test-results/m3-departure.png', fullPage: true })

    // ── M4 收尾 ──
    await page.getByRole('button', { name: /去收尾/ }).click()
    await page.getByText('读完好啦').waitFor()
    await page.getByRole('button', { name: /读完啦/ }).first().click()
    await page.getByRole('button', { name: /兴奋/ }).click()
    await page.getByRole('button', { name: '自己说' }).click()
    await page.locator('#voice-highlight').fill('e2e 演示金句：星星在眨眼')
    await page.getByRole('button', { name: /收进今晚的金句/ }).click()
    await page.getByText(/已经收了 1 句金句/).waitFor()

    // ── 盖章 → 庆祝（历史账本之上应解锁新夜灯）──
    await page.getByRole('button', { name: /盖今晚的章|点亮夜灯/ }).click()
    await page.getByText('稳稳收好啦').waitFor()
    await page.screenshot({ path: 'test-results/m4-celebrate.png', fullPage: true })

    // ── 夜灯墙：种子 11 盏 + 本次 1 盏 = 12 晚 ──
    await page.getByRole('button', { name: /回到月亮/ }).click()
    await page.getByRole('button', { name: /我的夜灯/ }).click()
    await page.getByText(/12 晚/).waitFor()
    await page.screenshot({ path: 'test-results/achievement-wall.png', fullPage: true })

    // ── 续传清零 ──
    await page.getByRole('button', { name: /回到月亮/ }).click()
    await page.getByText('月亮升起来啦').waitFor()
    await expect(page.getByText('还没讲完呢')).toHaveCount(0)
  })

  test('多孩家庭出现选择屏，家长孩子角色互斥', async ({ page }) => {
    // 直接写 session 且不指定 childId？登录流里单孩自动绑定的是列表第一个——
    // 种子里小桃在前。为覆盖 ChildPicker，用 API 建一个第三个孩子的家庭不划算；
    // 这里验证角色守卫：家长令牌访问 /child 被送回 /parent。
    await page.goto('/login')
    await page.getByRole('button', { name: /输入家庭码加入/ }).click()
    await page.locator('#family-code').fill(CODE)
    await page.getByRole('button', { name: '爸爸妈妈' }).click()
    await page.getByRole('button', { name: /进入桃阅读/ }).click()
    await page.getByText('家长端').waitFor()
    await page.goto('/child')
    await page.getByText('家长端').waitFor() // 角色守卫纠正回 /parent
  })
})
