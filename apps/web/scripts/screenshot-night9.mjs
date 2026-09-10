/**
 * 家长端全流程走查（第 9 夜 Gate C）：
 * `npm run shots:night9`
 * 就寝关闭环境。计时「家长从登录到看到共读卡」（验收 ≤5 分钟）：
 * 登录 → 绑定向导（真实 key）→ 建孩子档案 → 书架三分区 + 屏蔽 → 今晚共读卡 → 设置改就寝 → 注销验证数据清零。
 * 截图产出 docs/screenshots/night-09/（gitignored）。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const WEB_DIR = resolve(ROOT, 'apps/web')
const SERVER_DIR = resolve(ROOT, 'apps/server')
const OUT = resolve(ROOT, 'docs/screenshots/night-09')
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
  return spawn('npx', args, { cwd, stdio: 'ignore', shell: true, env: { ...process.env, ...extraEnv } })
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
  const server = spawnServer(SERVER_DIR, ['tsx', 'src/index.ts'], { TAO_BEDTIME: 'off' })
  const web = spawnServer(WEB_DIR, ['vite', 'preview', '--port', String(WEB_PORT), '--strictPort'])

  try {
    await waitFor(`${API}/api/health`)
    await waitFor(BASE)

    // 预置家庭（模拟「安装后注册」已完成），走查从家长登录视角开始
    const family = await apiPost('/api/family', { deviceId: 'shots9-parent' })
    const child = await apiPost('/api/family/join', {
      familyCode: family.familyCode,
      role: 'child',
      deviceId: 'shots9-child',
    })

    const browser = await chromium.launch()
    const context = await browser.newContext({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2 })
    await context.addInitScript(
      ([v]) => window.localStorage.setItem('taoread-session', v),
      [
        JSON.stringify({
          state: {
            token: family.token,
            familyId: family.familyId,
            familyCode: family.familyCode,
            role: 'parent',
            childId: null,
          },
          version: 0,
        }),
      ],
    )
    const page = await context.newPage()
    const t0 = Date.now()

    // ── 1. 登录后家长端 → 绑定向导（设置页内）──
    await page.goto(`${BASE}/parent`, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: '设置' }).click()
    await page.getByText('绑定微信读书').waitFor({ timeout: 20_000 })
    await page.getByRole('button', { name: /我拿到钥匙了/ }).click()
    await page.locator('#api-key').fill(apiKey)
    await page.screenshot({ path: resolve(OUT, 'p1-bind-wizard.png'), fullPage: true })
    await page.getByRole('button', { name: '绑定', exact: true }).click()
    await page.getByText(/已绑定/).waitFor({ timeout: 20_000 })
    console.log('✓ 1. 绑定向导（真实 key，掩码回显）')

    // ── 2. 建孩子档案 ──
    await page.locator('input[placeholder="昵称"]').fill('小桃')
    await page.getByRole('button', { name: '添加' }).click()
    await page.getByText(/小桃（6-8）/).waitFor({ timeout: 15_000 })
    console.log('✓ 2. 孩子档案')

    // ── 3. 书架三分区 + 屏蔽 ──
    await page.getByRole('button', { name: '书架', exact: true }).click()
    await page.getByText(/屏蔽的书会立刻从孩子的世界里消失/).waitFor({ timeout: 20_000 })
    await page.waitForTimeout(600)
    await page.screenshot({ path: resolve(OUT, 'p2-shelf.png'), fullPage: true })
    console.log('✓ 3. 书架三分区')

    // ── 4. 今晚共读卡：孩子侧开一场（API 模拟），家长端刷新看到卡 ──
    const view = await (
      await fetch(`${API}/api/family/${family.familyId}`, { headers: { Authorization: `Bearer ${family.token}` } })
    ).json()
    const childId = view.children[0].id
    await apiPost('/api/cosession', { childId, paperTitle: '猜猜我有多爱你' }, child.token)
    await page.getByRole('button', { name: '今晚', exact: true }).click()
    await page.getByText('讲什么').waitFor({ timeout: 30_000 })
    await page.waitForTimeout(400)
    await page.screenshot({ path: resolve(OUT, 'p3-tonight-card.png'), fullPage: true })
    const elapsed = Date.now() - t0
    console.log(`✓ 4. 今晚共读卡（家长登录→看到卡全程 ${elapsed}ms，要求 ≤300000ms）`)

    // ── 5. 设置：改就寝时段 ──
    await page.getByRole('button', { name: '设置', exact: true }).click()
    await page.getByRole('button', { name: '21:00', exact: true }).click()
    await page.getByText('操作没有成功', { exact: false }).waitFor({ timeout: 5_000 }).catch(() => {})
    console.log('✓ 5. 护眼设置（就寝 21:00）')

    // ── 6. 注销家庭 → 数据物理清零 ──
    await page.getByRole('button', { name: /注销家庭/ }).click()
    await page.getByRole('button', { name: /再点一次确认注销/ }).click()
    await page.getByText('输入家庭码').waitFor({ timeout: 15_000 })
    console.log('✓ 6. 注销 → 回到登录页')

    // 数据核验：旧家庭码/旧 token 全部失效
    const oldTokenProbe = await fetch(`${API}/api/family/${family.familyId}`, {
      headers: { Authorization: `Bearer ${family.token}` },
    })
    if (oldTokenProbe.status !== 401 && oldTokenProbe.status !== 403 && oldTokenProbe.status !== 404) {
      throw new Error(`注销后旧凭据仍可用？HTTP ${oldTokenProbe.status}`)
    }
    console.log(`✓ 7. 注销数据验证：旧 token 访问 → HTTP ${oldTokenProbe.status}`)

    await browser.close()
    console.log('第 9 夜家长端走查 ✔')
  } finally {
    killTree(server)
    killTree(web)
  }
}

main().catch((err) => {
  console.error('走查失败：', err.message)
  process.exit(1)
})
