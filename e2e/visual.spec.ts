import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from '@playwright/test'

/** 交付截图输出目录：docs/screenshots/final/ */
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../docs/screenshots/final')

async function loginAs(page: import('@playwright/test').Page, role: 'parent' | 'child'): Promise<void> {
  await page.goto('/login')
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill('123456')
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

    // 门屏（若有未收尾会话，先收尾再重新登录，保证截图是干净的门屏）
    // 有未收尾会话（普通/超时两种卡）都先收尾，保证截图是干净的门屏。
    // 门屏 checking 期间卡片未渲染：先等「干净门屏文案」或「收尾按钮」二者其一出现（20s）
    await page
      .getByRole('button', { name: /继续去读|去收尾|再多读一小段|读完啦，去收尾|下一步|跳过/ })
      .first()
      .or(page.getByText(/今天读什么故事/))
      .first()
      .waitFor({ timeout: 20_000 })
    const resumeBtn = page.getByRole('button', { name: /继续去读|去收尾|读完啦，去收尾/ }).first()
    if (await resumeBtn.isVisible({ timeout: 4_000 }).catch(() => false)) {
      await resumeBtn.click()
      await page.getByText(/读到哪儿啦？/).waitFor({ timeout: 10_000 })
      await page.getByRole('button', { name: '读完啦', exact: true }).click()
      await page.getByRole('button', { name: '兴奋', exact: true }).click()
      await page.getByRole('button', { name: /盖这次的章|宣布读完/ }).click()
      await page.getByText('稳稳收好啦').waitFor()
      // 收尾庆祝页「回到首页」重回门屏（会话已结束，门屏是干净的一次）
      await page.getByRole('button', { name: /回到首页/ }).click()
    }
    // 首次运行引导（P1-1）：先走完三步，再截干净的门屏
    const tourBtn = page.getByRole('button', { name: /出发，去听故事|下一步/ })
    if (await tourBtn.first().isVisible({ timeout: 6_000 }).catch(() => false)) {
      await page.screenshot({ path: `${OUT}/child-onboarding.png`, fullPage: true })
      for (let i = 0; i < 3; i++) {
        await page
          .getByRole('button', { name: /出发，去听故事|下一步|跳过/ })
          .first()
          .click({ timeout: 5_000 })
          .catch(() => {
            /* 已走完 */
          })
      }
    }
    await page.getByText(/今天读什么故事/).waitFor()
    await page.screenshot({ path: `${OUT}/child-gate.png`, fullPage: true })

    // 选书（推荐 + 搜索）
    await page.getByRole('button', { name: /去选书/ }).click()
    await page.getByText(/今[晚天]读什么/).waitFor()
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
    await page.getByRole('button', { name: /回到首页/ }).click()

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
    await page.getByRole('button', { name: /盖这次的章|宣布读完/ }).click()
    await page.getByText('稳稳收好啦').waitFor()
    await page.screenshot({ path: `${OUT}/child-celebrate.png`, fullPage: true })

    // 桃子墙（种子 11 颗 + 本次 = 12 颗）
    await page.getByRole('button', { name: /回到首页/ }).click()
    await page.getByRole('button', { name: /我的桃子/ }).click()
    await page.getByText(/12 晚|12 颗/).waitFor()
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
    await page.getByText(/次共读/).waitFor()
    await page.screenshot({ path: `${OUT}/parent-report.png`, fullPage: true })

    await page.getByRole('button', { name: '设置', exact: true }).click()
    await page.getByText(/休息时间/).waitFor()
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
