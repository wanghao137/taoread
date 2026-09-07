/**
 * 孩子端仪式流端到端走查（第 6 夜 Gate C）：
 * `npm run shots:child`
 * 起真实服务端（读 apps/server/.env 的 WEREAD_API_KEY 绑定真书架）+ web preview，
 * 走完整流程：建家庭 → 绑定 → 建孩子档案 → 孩子端登录 → M1 门 → M2 选书（真数据）→ 选定确认。
 * 截图产出 docs/screenshots/night-06/（gitignored）。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const WEB_DIR = resolve(ROOT, 'apps/web')
const SERVER_DIR = resolve(ROOT, 'apps/server')
const OUT = resolve(ROOT, 'docs/screenshots/night-06')
const WEB_PORT = 4173
const API_PORT = 8787
const BASE = `http://localhost:${WEB_PORT}`
const API = `http://localhost:${API_PORT}`

function readEnvKey() {
  const env = readFileSync(resolve(SERVER_DIR, '.env'), 'utf8')
  const m = env.match(/^WEREAD_API_KEY=(.+)$/m)
  if (!m) throw new Error('apps/server/.env 缺少 WEREAD_API_KEY（孩子端走查需要真实书架）')
  return m[1].trim()
}

function spawnServer(cwd, args, name) {
  const child = spawn('npx', args, { cwd, stdio: 'ignore', shell: true })
  child.on('error', (err) => console.error(`${name} 启动失败：`, err.message))
  return child
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
  if (!res.ok && res.status !== 201) {
    throw new Error(`API ${path} → ${res.status} ${await res.text()}`)
  }
  return res.json()
}

async function main() {
  mkdirSync(OUT, { recursive: true })
  const apiKey = readEnvKey()
  const server = spawnServer(SERVER_DIR, ['tsx', 'src/index.ts'], 'server')
  const web = spawnServer(WEB_DIR, ['vite', 'preview', '--port', String(WEB_PORT), '--strictPort'], 'web')

  try {
    await waitFor(`${API}/api/health`)
    await waitFor(BASE)

    // ── 种子：家庭 + 真实 key 绑定 + 孩子档案 + 孩子端会话 ──
    const family = await apiPost('/api/family', { deviceId: 'shots-parent' })
    await apiPost(`/api/family/${family.familyId}/bind-weread`, { apiKey }, family.token)
    await apiPost(
      `/api/family/${family.familyId}/children`,
      { nickname: '小桃', stage: '6-8' },
      family.token,
    )
    const child = await apiPost('/api/family/join', {
      familyCode: family.familyCode,
      role: 'child',
      deviceId: 'shots-child',
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

    // ── 阶段 1：孩子档案选择（多孩不出现——单孩自动绑定，这里应直进 M1 门）──
    const t0 = Date.now() // 走查计时：从进入到选定 ≤60s
    await page.goto(`${BASE}/child`, { waitUntil: 'networkidle' })
    await page.getByText('月亮升起来啦').waitFor({ timeout: 30_000 })
    await page.screenshot({ path: resolve(OUT, 'm1-gate.png'), fullPage: true })
    console.log(`✓ M1 月亮门（${Date.now() - t0}ms）`)

    // ── 阶段 2：选书流（真实书架 + 推荐数据）──
    await page.getByRole('button', { name: /点亮月亮/ }).click()
    await page.getByText('今晚读').waitFor({ timeout: 30_000 })
    await page.waitForTimeout(800) // 封面/列表动画稳定
    await page.screenshot({ path: resolve(OUT, 'm2-select.png'), fullPage: true })
    console.log(`✓ M2 选书流`)

    // ── 阶段 3：选定第一本书 → 确认屏 ──
    const firstCard = page.locator('button[aria-label^="选《"]').first()
    await firstCard.click()
    await page.getByText('选好啦').waitFor({ timeout: 30_000 })
    await page.waitForTimeout(500)
    await page.screenshot({ path: resolve(OUT, 'm2-ready.png'), fullPage: true })
    console.log(`✓ 选定确认（入口→选定共 ${Date.now() - t0}ms，要求 ≤60000ms）`)

    // ── 阶段 4：续传检查——回到门屏应显示「还没讲完呢」──
    await page.reload({ waitUntil: 'networkidle' })
    await page.getByText('还没讲完呢').waitFor({ timeout: 30_000 })
    await page.screenshot({ path: resolve(OUT, 'm1-resume.png'), fullPage: true })
    console.log(`✓ M1 续传横幅`)

    await browser.close()
    console.log('孩子端走查完成 ✔')
  } finally {
    killTree(server)
    killTree(web)
  }
}

/** Windows 下 shell:true 的 spawn 产生 cmd→npx→node 进程树，kill() 只杀壳；
 * 用 taskkill /T /F 清整棵树，避免端口占用导致重跑失败 */
function killTree(child) {
  if (!child.pid) return
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', shell: true })
  } else {
    child.kill()
  }
}

main().catch((err) => {
  console.error('走查失败：', err.message)
  process.exit(1)
})
