/**
 * 孩子端完整闭环走查（第 7 夜 Gate C）：
 * `npm run shots:night7`
 * 真实服务端 + 真实书架：选书 → M3 出发卡 → M4 收尾流（进度/心情/金句两来源）→ 庆祝屏 → 续传清零。
 * 附：deepLink 链路 headless 验证（系统浏览器链路；微信内置/真机链路无法无设备验证，风险见日志）。
 * 截图产出 docs/screenshots/night-07/（gitignored）。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const WEB_DIR = resolve(ROOT, 'apps/web')
const SERVER_DIR = resolve(ROOT, 'apps/server')
const OUT = resolve(ROOT, 'docs/screenshots/night-07')
const WEB_PORT = 4173
const API_PORT = 8787
const BASE = `http://localhost:${WEB_PORT}`
const API = `http://localhost:${API_PORT}`

function readEnvKey() {
  const env = readFileSync(resolve(SERVER_DIR, '.env'), 'utf8')
  const m = env.match(/^WEREAD_API_KEY=(.+)$/m)
  if (!m) throw new Error('apps/server/.env 缺少 WEREAD_API_KEY')
  return m[1].trim()
}

function spawnServer(cwd, args) {
  return spawn('npx', args, { cwd, stdio: 'ignore', shell: true })
}

function killTree(child) {
  if (!child.pid) return
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', shell: true })
  } else {
    child.kill()
  }
}

async function waitFor(url, timeoutMs = 45_000) {
  const start = Date.now()
  for (;;) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      /* not ready */
    }
    if (Date.now() - start > timeoutMs) throw new Error(`等待超时：${url}`)
    await new Promise((r) => setTimeout(r, 500))
  }
}

async function apiPost(path, body, token) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok && res.status !== 201) throw new Error(`API ${path} → ${res.status} ${await res.text()}`)
  return res.json()
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  const apiKey = readEnvKey()
  const server = spawnServer(SERVER_DIR, ['tsx', 'src/index.ts'])
  const web = spawnServer(WEB_DIR, ['vite', 'preview', '--port', String(WEB_PORT), '--strictPort'])

  try {
    await waitFor(`${API}/api/health`)
    await waitFor(BASE)

    // ── 种子 ──
    const family = await apiPost('/api/family', { deviceId: 'shots7-parent' })
    await apiPost(`/api/family/${family.familyId}/bind-weread`, { apiKey }, family.token)
    await apiPost(
      `/api/family/${family.familyId}/children`,
      { nickname: '小桃', stage: '6-8' },
      family.token,
    )
    const child = await apiPost('/api/family/join', {
      familyCode: family.familyCode,
      role: 'child',
      deviceId: 'shots7-child',
    })
    console.log(`✓ 种子完成 familyCode=${family.familyCode}`)

    const browser = await chromium.launch()
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    })
    await context.addInitScript(
      ([sessionValue]) => {
        window.localStorage.setItem('taoread-session', sessionValue)
      },
      [
        JSON.stringify({
          state: {
            token: child.token,
            familyId: child.familyId,
            familyCode: family.familyCode,
            role: 'child',
            childId: null,
          },
          version: 0,
        }),
      ],
    )
    const page = await context.newPage()
    const t0 = Date.now()

    // ── M1 门 → M2 选书 → 选定 ──
    await page.goto(`${BASE}/child`, { waitUntil: 'networkidle' })
    await page.getByText('月亮升起来啦').waitFor({ timeout: 30_000 })
    await page.getByRole('button', { name: /点亮月亮/ }).click()
    await page.getByText('今晚读').waitFor({ timeout: 30_000 })
    const firstCard = page.locator('button[aria-label^="选《"]').first()
    await firstCard.click()
    await page.getByText('选好啦').waitFor({ timeout: 30_000 })
    console.log(`✓ M1→M2 选定（${Date.now() - t0}ms）`)

    // ── M3 出发卡：倒计时结束 → 通道呈现 ──
    await page.getByRole('button', { name: /出发去读/ }).click()
    await page.getByText('去微信读书读').waitFor({ timeout: 15_000 })
    await page.waitForTimeout(2600) // 3-2-1 倒计时播完（3×700ms）+ 动画余量
    await page.screenshot({ path: resolve(OUT, 'm3-departure.png'), fullPage: true })
    console.log('✓ M3 出发卡（倒计时+通道）')

    // deepLink 链路 headless 验证（系统浏览器链路）：href 为回包原值且可达
    const deepLink = await page.locator('a[href*="weread.qq.com"]').first().getAttribute('href')
    if (deepLink) {
      const res = await fetch(deepLink, { redirect: 'follow' })
      console.log(`✓ deepLink 系统浏览器链路：HTTP ${res.status}（原值 ${deepLink.slice(0, 48)}…）`)
    } else {
      console.log('⚠️ 该书无 deepLink（跳过链路验证）')
    }

    // ── M4 收尾流 ──
    await page.getByRole('button', { name: /去收尾/ }).click()
    await page.getByText('读完好啦').waitFor({ timeout: 15_000 })
    // 进度三档 + 心情
    await page.getByRole('button', { name: /读了好多/ }).click()
    await page.getByRole('button', { name: /开心/ }).click()
    // 金句来源 A：挑一句（真实热门划线；无则自动走来源 B）
    const pickItem = page.getByRole('button', { name: /人划过这句/ }).first()
    const hasBookmarks = await pickItem.isVisible().catch(() => false)
    if (hasBookmarks) {
      await pickItem.click()
      await page.getByText(/已经收了 1 句金句/).waitFor({ timeout: 15_000 })
      console.log('✓ 金句来源 A：热门划线点选落库')
    }
    // 金句来源 B：自己说
    await page.getByRole('button', { name: '自己说' }).click()
    await page.locator('#voice-highlight').fill('今晚的月亮特别亮')
    await page.getByRole('button', { name: /收进今晚的金句/ }).click()
    await page.getByText(/已经收了 \d 句金句/).waitFor({ timeout: 15_000 })
    await page.screenshot({ path: resolve(OUT, 'm4-finish.png'), fullPage: true })
    console.log(`✓ M4 收尾流（金句来源 A=${hasBookmarks ? '有' : '无'}，来源 B 落库）`)

    // ── 盖章 → 庆祝屏（夜灯成就） ──
    await page.getByRole('button', { name: /盖今晚的章|点亮夜灯/ }).click()
    await page.getByText('稳稳收好啦').waitFor({ timeout: 15_000 })
    await page.screenshot({ path: resolve(OUT, 'm4-celebrate.png'), fullPage: true })
    console.log('✓ 庆祝屏（成就解锁）')

    // ── 续传清零：回到门屏应为全新的一晚 ──
    await page.getByRole('button', { name: /回到月亮/ }).click()
    await page.getByText('月亮升起来啦').waitFor({ timeout: 15_000 })
    const gone = await page.getByText('还没讲完呢').isVisible().catch(() => false)
    if (gone) throw new Error('收尾后仍显示未收尾会话——续传状态未清零')
    console.log('✓ 收尾后续传清零（全新一晚）')

    await browser.close()
    console.log('第 7 夜完整闭环走查 ✔')
  } finally {
    killTree(server)
    killTree(web)
  }
}

main().catch((err) => {
  console.error('走查失败：', err.message)
  process.exit(1)
})
