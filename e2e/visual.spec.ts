import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'

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
  test('孩子端全流程截图（v8 贴纸绘本）', async ({ page }) => {
    test.setTimeout(120_000)
    mkdirSync(OUT, { recursive: true })
    await loginAs(page, 'child')

    // 孩子选择屏（双孩演示家庭）
    await page.getByText('今天是谁的故事时间？').waitFor()
    await page.screenshot({ path: `${OUT}/child-picker.png`, fullPage: true })
    await page.getByRole('button', { name: /小桃/ }).click()

    // v8 首页
    await page.getByText('今天想读什么？').waitFor()
    await page.screenshot({ path: `${OUT}/child-home.png`, fullPage: true })

    // 找故事（搜索）
    await page.getByRole('button', { name: '找故事' }).first().click()
    await page.getByText('先看封面，再决定要不要打开。').waitFor()
    await page.screenshot({ path: `${OUT}/child-discover.png`, fullPage: true })
    await page.locator('#shelf-search').fill('三字经')
    await page.getByRole('button', { name: /打开《三字经》/ }).waitFor()
    await page.screenshot({ path: `${OUT}/child-discover-search.png` })

    // 详情
    await page.getByRole('button', { name: /打开《三字经》/ }).first().click()
    await page.getByText('一次只打开一个小故事').waitFor()
    await page.screenshot({ path: `${OUT}/child-detail.png`, fullPage: true })

    // 阅读器（题图 + 正文 + 朗读胶囊）
    await page.getByRole('button', { name: /开始读|继续读/ }).first().click()
    await expect(page.getByText(/第 \d+ 章/).first()).toBeVisible()
    await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}/child-reader.png`, fullPage: true })

    // 读完啦 → 结算卡
    await page.getByRole('button', { name: '读完啦' }).click()
    await page.getByText('这一章读完啦').waitFor()
    await page.screenshot({ path: `${OUT}/child-finish.png`, fullPage: true })
    await page.getByRole('button', { name: '回到今天' }).click()
    await expect(page.getByText('今天想读什么？')).toBeVisible()
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
