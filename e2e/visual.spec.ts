import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from '@playwright/test'

/** 交付截图输出目录：docs/screenshots/final/ */
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../docs/screenshots/final')

async function loginAs(page: import('@playwright/test').Page, role: 'parent' | 'child'): Promise<void> {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill('PEACH888')
  await page.getByRole('button', { name: role === 'parent' ? '爸爸妈妈' : '小朋友' }).click()
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
}

test.describe('交付视觉终扫', () => {
  test('孩子端全流程截图', async ({ page }) => {
    test.setTimeout(120_000)
    mkdirSync(OUT, { recursive: true })
    await loginAs(page, 'child')

    // 孩子选择屏（双孩演示家庭）
    await page.getByText('今天是谁的故事时间？').waitFor()
    await page.screenshot({ path: `${OUT}/child-picker.png`, fullPage: true })
    await page.getByRole('button', { name: /小桃/ }).click()

    // 月亮门
    await page.getByText('月亮升起来啦').waitFor()
    await page.screenshot({ path: `${OUT}/child-gate.png`, fullPage: true })

    // 选书（推荐 + 搜索）
    await page.getByRole('button', { name: /点亮月亮/ }).click()
    await page.getByText('今晚读').waitFor()
    await page.waitForTimeout(600)
    await page.screenshot({ path: `${OUT}/child-select.png`, fullPage: true })
    await page.getByLabel('搜索书名或作者').fill('小王子')
    await page.getByRole('button', { name: '搜一搜' }).click()
    await page.getByRole('button', { name: /选《小王子》/ }).first().waitFor()
    await page.screenshot({ path: `${OUT}/child-select-search.png`, fullPage: true })

    // 选定 → 金句星球
    await page.getByRole('button', { name: /选《小王子》/ }).first().click()
    await page.getByText('选好啦').waitFor()
    await page.screenshot({ path: `${OUT}/child-ready.png`, fullPage: true })
    await page.getByRole('button', { name: /去金句星球看看/ }).click()
    await page.getByText(/位小读者划过这句/).first().waitFor()
    await page.screenshot({ path: `${OUT}/child-star-sea.png`, fullPage: true })
    await page.getByRole('button', { name: /回到月亮/ }).click()

    // 出发（续传卡 → 继续去读）
    await page.getByText('还没讲完呢').waitFor()
    await page.getByRole('button', { name: /继续去读/ }).click()
    await page.getByText('去微信读书读').waitFor()
    await page.waitForTimeout(2600)
    await page.screenshot({ path: `${OUT}/child-departure.png`, fullPage: true })

    // 收尾 → 庆祝
    await page.getByRole('button', { name: /去收尾/ }).click()
    await page.getByText('读完好啦').waitFor()
    await page.getByRole('button', { name: /读完啦/ }).first().click()
    await page.getByRole('button', { name: /兴奋/ }).click()
    await page.screenshot({ path: `${OUT}/child-finish.png`, fullPage: true })
    await page.getByRole('button', { name: /盖今晚的章|点亮夜灯/ }).click()
    await page.getByText('稳稳收好啦').waitFor()
    await page.screenshot({ path: `${OUT}/child-celebrate.png`, fullPage: true })

    // 夜灯墙（种子 11 盏 + 本次 = 12 晚）
    await page.getByRole('button', { name: /回到月亮/ }).click()
    await page.getByRole('button', { name: /我的夜灯/ }).click()
    await page.getByText(/12 晚/).waitFor()
    await page.screenshot({ path: `${OUT}/child-wall.png`, fullPage: true })
  })

  test('家长端四页截图', async ({ page }) => {
    test.setTimeout(120_000)
    mkdirSync(OUT, { recursive: true })
    await loginAs(page, 'parent')

    await page.getByTestId('footprint-bar').getByText(/本周足迹/).waitFor()
    await page.screenshot({ path: `${OUT}/parent-tonight.png`, fullPage: true })

    await page.getByRole('button', { name: '书架', exact: true }).click()
    await page.getByText(/屏蔽的书会立刻/).waitFor()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${OUT}/parent-shelf.png`, fullPage: true })

    await page.getByRole('button', { name: '周报', exact: true }).click()
    await page.getByText('个共读的夜晚').waitFor()
    await page.screenshot({ path: `${OUT}/parent-report.png`, fullPage: true })

    await page.getByRole('button', { name: '设置', exact: true }).click()
    await page.getByText(/护眼设置/).waitFor()
    await page.screenshot({ path: `${OUT}/parent-settings.png`, fullPage: true })

    // 登录页（独立无会话上下文）
    const loginPage = await page.context().newPage()
    const sessionless = await page.context().browser()!.newContext({ viewport: { width: 390, height: 844 } })
    const lp = await sessionless.newPage()
    await lp.goto('/login')
    await lp.getByRole('button', { name: /输入家庭码加入/ }).waitFor()
    await lp.screenshot({ path: `${OUT}/login.png`, fullPage: true })
    await sessionless.close()
    void loginPage
  })
})
