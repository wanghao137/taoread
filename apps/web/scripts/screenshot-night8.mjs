/**
 * 第 8 夜走查（Gate C）：护眼限制 + 夜灯成就墙。
 * `npm run shots:night8`
 * 阶段一：默认配置（真实时钟 23:xx 处于就寝窗口）→ 门屏应为「月亮睡觉啦」；
 * 阶段二：TAO_BEDTIME=off 重启 → 完整闭环（选书→出发→收尾→庆祝）→ 夜灯成就墙（1 晚）。
 * 截图产出 docs/screenshots/night-08/（gitignored）。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const WEB_DIR = resolve(ROOT, 'apps/web')
const SERVER_DIR = resolve(ROOT, 'apps/server')
const OUT = resolve(ROOT, 'docs/screenshots/night-08')
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

function spawnServer(cwd, args, extraEnv = {}) {
  return spawn('npx', args, {
    cwd,
    stdio: 'ignore',
    shell: true,
    env: { ...process.env, ...extraEnv },
  })
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

async function seed() {
  const apiKey = readEnvKey()
  const family = await apiPost('/api/family', { deviceId: 'shots8-parent' })
  await apiPost(`/api/family/${family.familyId}/bind-weread`, { apiKey }, family.token)
  await apiPost(
    `/api/family/${family.familyId}/children`,
    { nickname: '小桃', stage: '6-8' },
    family.token,
  )
  const child = await apiPost('/api/family/join', {
    familyCode: family.familyCode,
    role: 'child',
    deviceId: 'shots8-child',
  })
  return { family, child }
}

function sessionInitScript(child, family) {
  return JSON.stringify({
    state: {
      token: child.token,
      familyId: child.familyId,
      familyCode: family.familyCode,
      role: 'child',
      childId: null,
    },
    version: 0,
  })
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  const apiKey = readEnvKey()

  // ── 阶段一：默认配置（当前真实时钟 23:xx > 21:30）→ 月亮睡了 ──
  let server = spawnServer(SERVER_DIR, ['tsx', 'src/index.ts'])
  let web = spawnServer(WEB_DIR, ['vite', 'preview', '--port', String(WEB_PORT), '--strictPort'])
  try {
    await waitFor(`${API}/api/health`)
    await waitFor(BASE)
    const seeded = await seed()
    const browser = await chromium.launch()
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
    await context.addInitScript(
      ([v]) => window.localStorage.setItem('taoread-session', v),
      [sessionInitScript(seeded.child, seeded.family)],
    )
    const page = await context.newPage()
    await page.goto(`${BASE}/child`, { waitUntil: 'networkidle' })
    await page.getByText('月亮睡觉啦').waitFor({ timeout: 20_000 })
    await page.screenshot({ path: resolve(OUT, 'bedtime-mode.png'), fullPage: true })
    console.log('✓ 阶段一：就寝模式（真实时钟命中 21:30 后窗口）')
    await browser.close()
  } finally {
    killTree(server)
    killTree(web)
  }
  await new Promise((r) => setTimeout(r, 1500)) // 端口释放

  // ── 阶段二：TAO_BEDTIME=off → 完整闭环 + 成就墙 ──
  server = spawnServer(SERVER_DIR, ['tsx', 'src/index.ts'], { TAO_BEDTIME: 'off' })
  web = spawnServer(WEB_DIR, ['vite', 'preview', '--port', String(WEB_PORT), '--strictPort'])
  try {
    await waitFor(`${API}/api/health`)
    await waitFor(BASE)
    const seeded = await seed()
    const browser = await chromium.launch()
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
    await context.addInitScript(
      ([v]) => window.localStorage.setItem('taoread-session', v),
      [sessionInitScript(seeded.child, seeded.family)],
    )
    const page = await context.newPage()

    await page.goto(`${BASE}/child`, { waitUntil: 'networkidle' })
    await page.getByText('月亮升起来啦').waitFor({ timeout: 20_000 })
    console.log('✓ 阶段二：就寝关闭 → 正常月亮门')

    // 走一遍完整闭环（选第一本 → 出发 → 收尾：进度+心情+口述金句 → 盖章）
    await page.getByRole('button', { name: /点亮月亮/ }).click()
    await page.getByText('今晚读').waitFor({ timeout: 20_000 })
    await page.locator('button[aria-label^="选《"]').first().click()
    await page.getByText('选好啦').waitFor({ timeout: 20_000 })
    await page.getByRole('button', { name: /出发去读/ }).click()
    await page.getByText('去微信读书读').waitFor({ timeout: 15_000 })
    await page.waitForTimeout(2600)
    await page.getByRole('button', { name: /去收尾/ }).click()
    await page.getByText('读完好啦').waitFor({ timeout: 15_000 })
    await page.getByRole('button', { name: /读完啦/ }).first().click()
    await page.getByRole('button', { name: /开心/ }).click()
    await page.getByRole('button', { name: '自己说' }).click()
    await page.locator('#voice-highlight').fill('小桃今晚自己读完了一整章')
    await page.getByRole('button', { name: /收进今晚的金句/ }).click()
    await page.getByText(/已经收了 1 句金句/).waitFor({ timeout: 15_000 })
    await page.getByRole('button', { name: /盖今晚的章|点亮夜灯/ }).click()
    await page.getByText('稳稳收好啦').waitFor({ timeout: 15_000 })
    console.log('✓ 完整闭环（就寝关闭）')

    // ── 夜灯成就墙（应显示 1 晚）──
    await page.getByRole('button', { name: /回到月亮/ }).click()
    await page.getByText('月亮升起来啦').waitFor({ timeout: 15_000 })
    await page.getByRole('button', { name: /我的夜灯/ }).click()
    await page.getByText('夜灯').first().waitFor({ timeout: 15_000 })
    await page.getByText(/第 2 盏夜灯/).waitFor({ timeout: 15_000 })
    await page.screenshot({ path: resolve(OUT, 'achievement-wall.png'), fullPage: true })
    console.log('✓ 夜灯成就墙（1 晚 + 正向下一步提示）')

    await browser.close()
    console.log('第 8 夜走查 ✔')
  } finally {
    killTree(server)
    killTree(web)
  }
}

main().catch((err) => {
  console.error('走查失败：', err.message)
  process.exit(1)
})
