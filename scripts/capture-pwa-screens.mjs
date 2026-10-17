/**
 * PWA 安装截图（手动工具，不入 CI）：
 * 先 `npm run demo` 起演示栈（mock 网关 + 123456 种子），再 `node scripts/capture-pwa-screens.mjs`。
 * 用演示家庭码登录孩子端，截「今天」页两种视口，输出 apps/web/public/screenshots/。
 * 只截演示种子的虚构内容——不要把 TAO_SCREEN_BASE 指向生产环境。
 * 注意：本机 8787 可能常驻生产 taoread-api 服务（nssm）——vite /api 代理默认指向它；
 * 演示栈务必确认「演示模式已启动」横幅里的端口，并用 TAO_API_PORT 对齐 vite 代理。
 */
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.env.TAO_SCREEN_BASE ?? 'http://localhost:5173'
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../apps/web/public/screenshots')
mkdirSync(OUT, { recursive: true })

// 演示家庭码（npm run demo 的 123456 种子），仅用于本地演示栈
const DEMO_FAMILY_CODE = '123456'
// 种子里有历史共读账本的孩子，「今天」页的接着读/足迹内容最完整
const DEMO_CHILD = '小桃'

/** 登录演示家庭并打开孩子端「今天」页（多孩家庭先选人，单孩自动绑定直接进） */
async function openTodayPage(browser, viewport) {
  const page = await browser.newPage({ viewport, locale: 'zh-CN' })
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  // 防误指：端口被别的项目占用时会打开别人的页面，先确认这是桃阅读登录页
  try {
    await page.getByText('选择这次的故事从谁开始').waitFor({ timeout: 15000 })
  } catch {
    throw new Error(`TAO_SCREEN_BASE（${BASE}）打开的不是桃阅读登录页，请确认演示栈端口后重试`)
  }
  await page.getByRole('button', { name: '小朋友' }).click()
  await page.getByRole('button', { name: /输入家庭码加入/ }).click()
  await page.locator('#family-code').fill(DEMO_FAMILY_CODE)
  await page.getByRole('button', { name: /进入桃阅读/ }).click()
  // 选人页与今天页谁先到都算登录成功（视演示数据的孩子数而定）
  const arrived = await Promise.race([
    page.getByText('今天是谁的故事时间？').waitFor({ timeout: 20000 }).then(() => 'picker').catch(() => 'none'),
    page.getByText('今天读点什么').waitFor({ timeout: 20000 }).then(() => 'today').catch(() => 'none'),
  ])
  if (arrived === 'picker') {
    await page.getByRole('button', { name: new RegExp(DEMO_CHILD) }).click()
    await page.getByText('今天读点什么').waitFor({ timeout: 20000 })
  } else if (arrived !== 'today') {
    throw new Error('演示栈登录后没有到达「今天」页，请确认 `npm run demo` 已就绪')
  }
  await page.waitForTimeout(1500) // 等封面插画与字体稳定，避免截到加载态
  return page
}

const browser = await chromium.launch()
try {
  for (const [name, width, height] of [
    ['child-390', 390, 844],
    ['child-1280', 1280, 720],
  ]) {
    const page = await openTodayPage(browser, { width, height })
    await page.screenshot({ path: `${OUT}/${name}.png` })
    await page.close()
    console.log(`已生成 ${name}.png（${width}x${height}）`)
  }
} finally {
  await browser.close()
}
