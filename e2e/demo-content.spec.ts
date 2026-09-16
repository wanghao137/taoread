import { expect, test, type Page } from '@playwright/test'

/**
 * v2 内容域 e2e（演示模式）：孩子端书架 → 自研阅读器（正文/插图/拼音）
 * → 朗读控制（TTS 支持探测，不可用时不阻塞）→ 章节切换 → 读完收尾。
 * 种子：PEACH888 家庭，小桃(6-8)/小柚(3-5)；内容域 7 本公版书。
 */

const CODE = 'PEACH888'

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
    /* 单孩直进门屏 */
  }
  // 门屏：等主按钮或夜灯入口出现即视为登录成功（文案细节不绑定）
  await page
    .getByRole('button', { name: /点亮月亮|继续去读|我的夜灯/ })
    .first()
    .waitFor({ timeout: 15_000 })
}

test.describe('v2 桃书架 + 自研阅读器', () => {
  test('书架列出公版书，含古诗/蒙学/故事/童话四类与进度条', async ({ page }) => {
    await loginAsChild(page, '小桃')

    await page.getByRole('button', { name: /桃书架/ }).click()
    await page.getByRole('button', { name: '打开《三字经·人之初》' }).waitFor()
    // 每张书卡都必须带封面插画（图文并茂，不得有空白封面）
    const covers = page.getByRole('button', { name: /^打开《/ }).locator('svg[data-art]')
    await expect(covers.first()).toBeVisible()
    expect(await covers.count()).toBeGreaterThan(0)
    // 分类筛选
    await page.getByRole('button', { name: '古诗', exact: true }).click()
    await expect(page.getByText('唐诗三百首·星星篇')).toBeVisible()
    await page.screenshot({ path: 'test-results/v2-shelf-poetry.png', fullPage: true })
    await page.getByRole('button', { name: '全部', exact: true }).click()
    // 中文/英文筛选
    await page.getByRole('button', { name: 'English', exact: true }).click()
    await expect(page.getByText('Alice in Wonderland')).toBeVisible()
    // P0-8（docs/09 §4.2）：英文公版书扩容后新书《Peter Rabbit》必须在架
    await expect(page.getByText('The Tale of Peter Rabbit')).toBeVisible()
    await page.screenshot({ path: 'test-results/v2-shelf-en.png', fullPage: true })
  })

  test('打开《静夜思》章节：正文/拼音/译文/插图渲染', async ({ page }) => {
    await loginAsChild(page, '小柚')
    await page.getByRole('button', { name: /桃书架/ }).click()
    await page.getByRole('button', { name: '打开《唐诗三百首·星星篇》' }).waitFor()
    await page.getByRole('button', { name: '打开《唐诗三百首·星星篇》' }).click()

    // 详情页（A2）：适龄标签、难度星级、目录、「开始读」
    await expect(page.getByRole('heading', { name: '书籍详情' })).toBeVisible()
    await expect(page.getByText('3-5 岁')).toBeVisible()
    await expect(page.getByText(/★/)).toBeVisible()
    await page.screenshot({ path: 'test-results/v2-detail.png', fullPage: true })
    await page.getByRole('button', { name: /开始读/ }).click()

    // 阅读器顶栏
    await page.getByText('第 1 / 6 章').waitFor()
    await expect(page.getByRole('heading', { name: '静夜思 · 李白' })).toBeVisible()
    // 拼音与译文
    await expect(page.getByText(/chuáng qián míng yuè guāng/)).toBeVisible()
    await expect(page.getByText(/床前洒满明亮的月光/)).toBeVisible()
    // 章节题图必须真实渲染（SVG 落地，防“图文并茂”退化为纯文字）
    await expect(page.locator('svg[data-art="moon-window"]')).toBeVisible()
    await page.screenshot({ path: 'test-results/v2-reader-poem.png', fullPage: true })

    // 设置：字号 + 主题
    await page.getByRole('button', { name: '阅读设置' }).click()
    await page.getByText('护眼').click()
    await page.screenshot({ path: 'test-results/v2-reader-sepia.png', fullPage: true })
    await page.getByRole('button', { name: '关闭' }).click()

    // 目录
    await page.getByRole('button', { name: '章节目录' }).click()
    await page.getByRole('button', { name: /春晓 · 孟浩然/ }).waitFor()
    await page.getByRole('button', { name: /春晓 · 孟浩然/ }).click()
    await expect(page.getByText(/chūn mián bù jué xiǎo/)).toBeVisible()
    await page.screenshot({ path: 'test-results/v2-reader-chapter2.png', fullPage: true })
  })

  test('西游记章节：连续正文与插图，末章显示「读完啦」', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await page.getByRole('button', { name: /桃书架/ }).click()
    await page.getByRole('button', { name: '打开《西游记·美猴王出世》' }).waitFor()
    await page.getByRole('button', { name: '打开《西游记·美猴王出世》' }).click()

    // 详情页 → 开始读
    await expect(page.getByRole('heading', { name: '书籍详情' })).toBeVisible()
    await page.getByRole('button', { name: /开始读/ }).click()

    await page.getByRole('heading', { name: '第一章 · 石头里蹦出的猴子' }).waitFor()
    await expect(page.getByText('从前，东海边有一座花果山')).toBeVisible()
    // 插图真实渲染（章节题图 + 正文插图，非空 SVG）
    const arts = page.locator('svg[data-art]')
    await expect(arts.first()).toBeVisible()
    expect(await arts.count()).toBeGreaterThanOrEqual(2)
    // 底部朗读栏不遮挡末行：阅读器滚动容器的底部留白 ≥ 朗读栏高度
    const geometry = await page.evaluate(() => {
      const main = Array.from(document.querySelectorAll('main')).find(
        (m) => getComputedStyle(m).overflowY === 'auto',
      )
      const bar = document.querySelector('footer')
      if (!main || !bar) return { ok: false }
      return {
        ok: true,
        pad: parseFloat(getComputedStyle(main).paddingBottom),
        bar: bar.getBoundingClientRect().height,
      }
    })
    expect(geometry.ok).toBe(true)
    expect(geometry.pad).toBeGreaterThanOrEqual(geometry.bar - 1)
    await page.screenshot({ path: 'test-results/v2-reader-xiyou.png', fullPage: true })

    // 下一章
    await page.getByRole('button', { name: '下一章' }).click()
    await page.getByRole('heading', { name: '第二章 · 水帘洞探宝' }).waitFor()
    await page.getByRole('button', { name: '下一章' }).click()
    await page.getByRole('heading', { name: '第三章 · 拜师学本领' }).waitFor()
    // 末章：按钮变「读完啦」
    await expect(page.getByRole('button', { name: /读完啦/ })).toBeVisible()

    // 读完 → 进入收尾流
    await page.getByRole('button', { name: /读完啦/ }).click()
    await page.getByText('今晚读到哪儿啦？').waitFor()
    await page.screenshot({ path: 'test-results/v2-reader-finish.png', fullPage: true })

    // 收尾闭环：进度 + 心情 + 盖章 → 庆祝（走完才关闭会话，避免遗留未收尾会话污染后续用例）
    await page.getByRole('button', { name: '读完啦', exact: true }).click()
    await page.getByRole('button', { name: '兴奋', exact: true }).click()
    await page.getByRole('button', { name: /点亮夜灯/ }).click()
    await page.getByText('稳稳收好啦').waitFor()
  })

  test('朗读按钮存在且不报错（TTS 不可用时降级提示）', async ({ page }) => {
    await loginAsChild(page, '小柚')
    await page.getByRole('button', { name: /桃书架/ }).click()
    await page.getByRole('button', { name: '打开《三字经·人之初》' }).click()
    await expect(page.getByRole('heading', { name: '书籍详情' })).toBeVisible()
    await page.getByRole('button', { name: /开始读/ }).click()
    await expect(page.getByRole('heading', { name: '第一课 · 人之初' })).toBeVisible()

    const speakBtn = page.getByRole('button', { name: /朗读本章/ })
    await expect(speakBtn).toBeVisible()
    await speakBtn.click()
    // 无语音环境：给出友好提示而非崩溃；有语音环境：进入播放态
    await page.waitForTimeout(1200)
    await page.screenshot({ path: 'test-results/v2-reader-tts.png', fullPage: true })
    // 无论哪种结果，页面都应仍在阅读器内
    await expect(page.getByRole('heading', { name: '第一课 · 人之初' })).toBeVisible()
  })

  test('阅读进度跨章节持久：再进书架显示进度条', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await page.getByRole('button', { name: /桃书架/ }).click()
    await page.getByRole('button', { name: '打开《唐诗三百首·星星篇》' }).click()
    await expect(page.getByRole('heading', { name: '书籍详情' })).toBeVisible()
    await page.getByRole('button', { name: /开始读/ }).click()
    await page.getByRole('heading', { name: '静夜思 · 李白' }).waitFor()
    await page.getByRole('button', { name: '下一章' }).click()
    await page.getByRole('heading', { name: '春晓 · 孟浩然' }).waitFor()
    // 回书架（顶栏左侧按钮）
    await page.locator('header button').first().click()
    await page.getByRole('button', { name: '打开《唐诗三百首·星星篇》' }).waitFor()
    // 该书卡片显示进度（上一章已上报）
    const tangshiCard = page.getByRole('button', { name: '打开《唐诗三百首·星星篇》' })
    await expect(tangshiCard.getByText(/读到 \d+%|已读完/)).toBeVisible()
    await page.screenshot({ path: 'test-results/v2-shelf-progress.png', fullPage: true })

    // 收尾活动会话（C2 后进入阅读器即开会话；不收尾会污染后续用例的门屏）
    await tangshiCard.click()
    await expect(page.getByRole('heading', { name: '书籍详情' })).toBeVisible()
    await page.getByRole('button', { name: /接着读|开始读/ }).click()
    // 唐诗 6 章，直接用目录跳到末章再收尾
    await page.getByRole('button', { name: '章节目录' }).click()
    await page.getByRole('button', { name: /第 6 章/ }).click()
    await page.getByRole('button', { name: /读完啦/ }).click()
    await page.getByRole('button', { name: '读完啦', exact: true }).click()
    await page.getByRole('button', { name: '兴奋', exact: true }).click()
    await page.getByRole('button', { name: /点亮夜灯/ }).click()
    await page.getByText('稳稳收好啦').waitFor()
  })

  // docs/11 P0-1：书架搜索（书名/作者/章节标题）
  test('书架搜索：输入「静夜」命中唐诗集，乱词给正向空态', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await page.getByRole('button', { name: /桃书架/ }).click()
    await page.getByRole('button', { name: '打开《三字经·人之初》' }).waitFor()

    const search = page.locator('#shelf-search')
    // 孩子记的是诗名而非集子名：搜「静夜」必须命中《唐诗三百首·星星篇》
    await search.fill('静夜')
    await expect(page.getByText('唐诗三百首·星星篇')).toBeVisible({ timeout: 8_000 })
    await expect(page.getByText('三字经·人之初')).not.toBeVisible()
    await page.screenshot({ path: 'test-results/v3-search-hit.png', fullPage: true })

    // 无结果：正向引导 + 一键清空
    await search.fill('zzzz')
    await expect(page.getByText('小桃没找到这本书')).toBeVisible({ timeout: 8_000 })
    await page.getByRole('button', { name: '清空搜索' }).click()
    await expect(page.getByText('三字经·人之初')).toBeVisible()
  })

  // docs/11 P0-6：阅读器专注模式
  test('阅读器专注模式：点正文收起工具栏，再点恢复', async ({ page }) => {
    await loginAsChild(page, '小柚')
    await page.getByRole('button', { name: /桃书架/ }).click()
    await page.getByRole('button', { name: '打开《三字经·人之初》' }).click()
    // 前序用例可能已留下进度，按钮文案为「接着读」
    await page.getByRole('button', { name: /开始读|接着读/ }).click()
    await page.getByRole('heading', { name: '第一课 · 人之初' }).waitFor()

    // 朗读栏先可见
    const speakBtn = page.getByRole('button', { name: /朗读本章|停止朗读/ })
    await expect(speakBtn).toBeVisible()

    // 点正文区留白（段落文字本身）：进入专注模式
    await page.getByText('人之初，性本善').click()
    await expect(speakBtn).not.toBeVisible()
    // 顶栏目录按钮也一起藏起来
    await expect(page.getByRole('button', { name: '章节目录' })).not.toBeVisible()
    await page.screenshot({ path: 'test-results/v3-focus-mode.png', fullPage: true })

    // 再点一次正文：工具栏回来
    await page.getByText('人之初，性本善').click()
    await expect(speakBtn).toBeVisible()
  })

  // docs/11 P0-8：孩子端「换家庭」误触防护
  test('换家庭需二次确认：取消后仍在孩子端', async ({ page }) => {
    await loginAsChild(page, '小桃')
    await page.getByRole('button', { name: '换家庭' }).click()
    await expect(page.getByText('要换一个家庭吗？')).toBeVisible()
    await page.getByRole('button', { name: '我按错啦' }).click()
    // 取消后仍在孩子端：桃书架入口还在
    await expect(page.getByRole('button', { name: /桃书架/ })).toBeVisible()
    await page.screenshot({ path: 'test-results/v3-switch-confirm.png', fullPage: true })
  })
})
