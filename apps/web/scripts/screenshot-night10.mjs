/**
 * 第 10 夜走查（Gate C，M-B 收官）：周报 + 分享卡 + 本周足迹。
 * `npm run shots:night10`
 * 真实服务端：种子本周两晚共读 + 金句；家长端走查 今晚足迹条 → 周报页 → 分享卡服务端规格；
 * 历史周（上周）重生成空态。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const WEB_DIR = resolve(ROOT, 'apps/web')
const SERVER_DIR = resolve(ROOT, 'apps/server')
const OUT = resolve(ROOT, 'docs/screenshots/night-10')
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

    // ── 种子：家庭 + 绑定 + 孩子 + 本周两晚共读与金句（直接 API）──
    // 口径说明：startSession 由服务端落 startedAt（不可回填），两次种子同日 →
    // 足迹/周报应为「1 晚」；金句对已收尾会话补录（addHighlight 不要求活跃）。
    const family = await apiPost('/api/family', { deviceId: 'shots10-parent' })
    await apiPost(`/api/family/${family.familyId}/bind-weread`, { apiKey }, family.token)
    await apiPost(
      `/api/family/${family.familyId}/children`,
      { nickname: '小桃', stage: '6-8' },
      family.token,
    )
    const view = await (
      await fetch(`${API}/api/family/${family.familyId}`, { headers: { Authorization: `Bearer ${family.token}` } })
    ).json()
    const childId = view.children[0].id
    const sessionIds = []
    for (const bookId of ['B1', 'B2']) {
      const s = await apiPost('/api/cosession', { childId, bookId }, family.token)
      sessionIds.push(s.id)
      await fetch(`${API}/api/cosession/${s.id}/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${family.token}` },
        body: JSON.stringify({ progressMark: 'lot', mood: 'happy' }),
      })
    }
    // 金句真实落库（来源 A voice）：断言周报「收金句 1 句」
    await apiPost(`/api/cosession/${sessionIds[0]}/highlights`, { source: 'voice', text: '今晚的月亮特别亮' }, family.token)
    console.log('✓ 种子完成（本周两场共读 → 1 晚，金句 1 句）')

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
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.log('[browser error]', msg.text().slice(0, 200))
    })
    page.on('pageerror', (err) => console.log('[pageerror]', String(err).slice(0, 300)))
    page.on('response', (res) => {
      if (res.status() >= 400) console.log('[HTTP', res.status() + ']', res.url())
      if (res.url().includes('/api/reports')) console.log('[reports]', res.status(), res.url().slice(0, 100))
    })

    // ── 今晚足迹条 ──
    await page.goto(`${BASE}/parent`, { waitUntil: 'networkidle' })
    await page.getByTestId('footprint-bar').getByText(/本周足迹/).waitFor({ timeout: 20_000 })
    const footprint = await page.getByTestId('footprint-bar').innerText()
    if (!/共读 1 晚/.test(footprint)) throw new Error(`足迹条口径异常（应为 1 晚）：`)
    console.log(`✓ 本周足迹条：${footprint.replace(/\n/g, ' ')}`)

    // ── 周报页（本周）──
    await page.getByRole('button', { name: '周报', exact: true }).click()
    await page.getByText('个共读的夜晚').waitFor({ timeout: 20_000 })
    await page.getByText('收金句 1 句').waitFor({ timeout: 10_000 })
    await page.getByText('收进来的金句').waitFor({ timeout: 10_000 })
    await page.screenshot({ path: resolve(OUT, 'weekly-report.png'), fullPage: true })
    console.log('✓ 周报页（本周）')

    // ── 分享卡服务端规格 + 隐私核验 ──
    const cardRes = await fetch(
      `${API}/api/reports/weekly/share-card?familyId=${family.familyId}`,
      { headers: { Authorization: `Bearer ${family.token}` } },
    )
    const svg = await cardRes.text()
    if (!svg.includes('width="1080"') || !svg.includes('height="1440"')) {
      throw new Error('分享卡规格不是 1080×1440')
    }
    if (svg.includes(family.familyCode) || svg.includes('wrk-')) {
      throw new Error('分享卡泄漏隐私字段')
    }
    console.log('✓ 分享卡 SVG 1080×1440，无家庭码/key')

    // ── 历史周重生成（上周空态）──
    await page.getByRole('button', { name: '上周' }).click()
    await page.getByText('新的一周，第一页故事在等你').waitFor({ timeout: 20_000 })
    console.log('✓ 历史周重生成（上周空态正向提示）')

    await browser.close()
    console.log('第 10 夜走查 ✔')
  } finally {
    killTree(server)
    killTree(web)
  }
}

main().catch((err) => {
  console.error('走查失败：', err.message)
  process.exit(1)
})
