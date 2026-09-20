import { expect, test } from '@playwright/test'

/**
 * 家长端 e2e（演示模式）：登录 → 今天共读卡 → 书架管理屏蔽 → 设置 → 周报 + 分享卡规格。
 */
const CODE = 'PEACH888'

test.describe('家长端', () => {
  test('登录 → 今天足迹/共读卡 → 书架屏蔽 → 周报 → 设置', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /输入家庭码加入/ }).click()
    await page.locator('#family-code').fill(CODE)
    await page.getByRole('button', { name: '爸爸妈妈' }).click()
    await page.getByRole('button', { name: /进入桃阅读/ }).click()
    await page.getByText('家长端').waitFor()

    // ── 今天：足迹条 + 家庭码 + 孩子状态（种子小桃有历史账本但无 active 会话）──
    await page.getByTestId('footprint-bar').getByText(/本周足迹/).waitFor()
    await page.getByText(/今天还没开始/).first().waitFor()

    // ── 书架：分区与屏蔽切换 ──
    await page.getByRole('button', { name: '书架', exact: true }).click()
    await page.getByText(/屏蔽的书会立刻从孩子的世界里消失/).waitFor()
    const blockBtn = page.getByRole('button', { name: '屏蔽', exact: true }).first()
    await blockBtn.click()
    await page.getByText('已屏蔽').first().waitFor()
    // 再点恢复
    await page.getByRole('button', { name: '取消屏蔽', exact: true }).first().click()
    await page.getByRole('button', { name: '屏蔽', exact: true }).first().waitFor()

    // ── 周报：本周有数据（种子跨两周，本周至少 1 晚）+ 分享卡规格 ──
    await page.getByRole('button', { name: '周报', exact: true }).click()
    await page.getByText('次共读').waitFor()
    const download = page.waitForEvent('download', { timeout: 15_000 })
    await page.getByRole('button', { name: /保存分享卡/ }).click()
    const dl = await download
    expect(dl.suggestedFilename()).toContain('taoread-week-')

    // ── 设置：护眼预设 + 添加孩子 ──
    await page.getByRole('button', { name: '设置', exact: true }).click()
    await page.getByRole('button', { name: '21:00', exact: true }).click()
    // 选中态落盘：preset 按钮变为 primary 赤陶实底（确认 updateSettings 生效）
    await expect(
      page.getByRole('button', { name: '21:00', exact: true }),
    ).toHaveClass(/bg-terra/)
    await page.getByText('小桃（6-8）').waitFor()
    // 还原为「跟随默认」：否则 21:00 后的休息时间会锁住后续孩子端 e2e（workers:1 串行共享同一库）
    await page.getByRole('button', { name: '跟随默认', exact: true }).click()
    await expect(
      page.getByRole('button', { name: '跟随默认', exact: true }),
    ).toHaveClass(/bg-terra/)

    // ── 安静模式（docs/15 P1-C）：开关落盘并立即改变本机 MotionConfig ──
    await page.getByRole('button', { name: '安静模式' }).scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: '安静模式' }).click()
    await expect(
      page.getByRole('button', { name: '安静模式' }),
    ).toHaveClass(/bg-terra/)
    // 开关写入会话 store（孩子端与本机动效立即减速）
    await expect(async () => {
      const stored = await page.evaluate(() => localStorage.getItem('taoread-session'))
      expect(stored).toContain('"calmMode":true')
    }).toPass()
    // 关掉，不把「强制减速」留给后续视觉终扫与孩子端用例
    await page.getByRole('button', { name: '保持活泼' }).click()
    await expect(
      page.getByRole('button', { name: '保持活泼' }),
    ).toHaveClass(/bg-terra/)

  })
})
