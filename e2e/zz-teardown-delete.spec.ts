import { expect, test } from '@playwright/test'

/**
 * 注销家庭流。
 * docs/87：不再依赖「文件名字母序排最后」的执行顺序（CI/Linux 的调度顺序与
 * 本地不一致，曾提前删除共享演示家庭导致后续全部 spec 连锁失败）——改为
 * 自建家庭、自注销、断言自己的码失效，对执行顺序完全无假设。
 */
test('注销：重输家庭码确认 → 数据删除 → 旧凭据失效', async ({ page, request }) => {
  test.setTimeout(120_000)
  // 自建一个专用家庭（随机码），注销只影响自己
  const deviceId = 'zz-delete-' + Date.now()
  const created = await (await request.post('/api/family', { data: { deviceId, agreeVersion: 'e2e-zz-v1', parentPin: '864209' } })).json()
  const CODE = created.familyCode
  expect(CODE).toBeTruthy()

  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '爸爸妈妈' }).click()
  await page.getByLabel('家长 PIN', { exact: true }).fill('864209')
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  await page.getByText('家长端').waitFor()

  await page.getByRole('button', { name: '设置', exact: true }).click()
  await page.getByRole('button', { name: '注销家庭' }).click()
  // 二次确认升级为重输家庭码：知道码的人才能删库（防孩子/访客误触）
  await page.getByLabel('输入家庭码确认注销').fill(CODE)
  await page.getByRole('button', { name: /确认注销/ }).click()

  // 注销后旧家庭码不可再加入（数据已删除）
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(CODE)
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  await expect(page.getByText(/没有找到这个家庭码/)).toBeVisible()
})
