import { expect, test } from '@playwright/test'

/**
 * 注销家庭流（字母序最后执行——注销会删除共享演示家庭，必须放在全部 spec 之后）。
 */
const CODE = '123456'

test('注销：二次确认 → 数据物理删除 → 旧凭据失效', async ({ page }) => {
  test.setTimeout(120_000)
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '爸爸妈妈' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  await page.getByText('家长端').waitFor()

  await page.getByRole('button', { name: '设置', exact: true }).click()
  await page.getByRole('button', { name: /注销家庭/ }).click()
  await page.getByRole('button', { name: /再点一次确认注销/ }).click()
  await page.getByText('输入家庭码').waitFor()

  // 注销后旧家庭码不可再加入（数据已删除）
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  await expect(page.getByText(/没有找到这个家庭码/)).toBeVisible()
})
