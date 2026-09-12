/**
 * 交付视觉终扫（v1.0.0）：对演示模式拍摄全部关键页，产出 docs/screenshots/final/。
 * 覆盖：登录 / 孩子选择 / 月亮门 / 选书（搜索+推荐）/ 金句星球 / 出发 / 收尾 / 庆祝 / 夜灯墙
 *      / 家长今晚 / 书架 / 周报 / 设置。
 */
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// 脚本位于 apps/web/scripts/ → 上三级到仓库根
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const WEB_DIR = resolve(ROOT, 'apps/web')
const SERVER_DIR = resolve(ROOT, 'apps/server')
const OUT = resolve(ROOT, 'docs/screenshots/final')
const WEB_PORT = 4199 // 专属端口：4173 曾被其他项目 preview 占用（水合错误假象）
const API_PORT = 8787
const BASE = `http://localhost:${WEB_PORT}`
const API = `http://localhost:${API_PORT}`

const TSX_BIN = resolve(SERVER_DIR, '../../node_modules/tsx/dist/cli.mjs')
const VITE_BIN = resolve(WEB_DIR, '../../node_modules/vite/bin/vite.js')

function spawnServer(cwd, args, extraEnv = {}) {
  // 绕开 shell（该脚本环境下 cmd.exe spawn 间歇 ENOENT）：直接调包内 bin
  const bin = args[0] === 'tsx' ? TSX_BIN : VITE_BIN
  const rest = args[0] === 'tsx' ? args.slice(1) : args.slice(1).filter((a) => a !== '--')
  const child = spawn(process.execPath, [bin, ...rest], {
    cwd,
    stdio: 'ignore',
    env: { ...process.env, ...extraEnv },
  })
  console.error('[spawn debug] cwd=', cwd, 'cwdExists=', existsSync(cwd), 'execPath=', process.execPath, 'execExists=', existsSync(process.execPath))
  child.on('error', (err) => console.error('[spawn error]', err.message, JSON.stringify(err)))
  return child
}
function killTree(child) {
  if (!child.pid) return
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', shell: true })
  } else child.kill()
}
async function waitFor(url, timeoutMs = 150_000) {
  const start = Date.now()
  for (;;) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {}
    if (Date.now() - start > timeoutMs) throw new Error(`等待超时：${url}`)
    await new Promise((r) => setTimeout(r, 600))
  }
}
async function apiPost(path, body, token) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  })
  if (!res.ok && res.status !== 201) throw new Error(`API ${path} → ${res.status}`)
  return res.json()
}
const sessionScript = (childToken, familyId, role) =>
  JSON.stringify({
    state: { token: childToken, familyId, familyCode: 'PEACH888', role, childId: null },
    version: 0,
  })

async function main() {
  mkdirSync(OUT, { recursive: true })
  const server = spawnServer(SERVER_DIR, ['tsx', 'src/demo/main.ts'], { TAO_BEDTIME: 'off' })
  const web = spawnServer(WEB_DIR, ['vite', 'preview', '--port', String(WEB_PORT), '--strictPort'])
  try {
    await waitFor(`${API}/api/health`)
    await waitFor(BASE)

    const family = await apiPost('/api/family/join', { familyCode: 'PEACH888', role: 'parent', deviceId: 'final-p' })
    const child = await apiPost('/api/family/join', { familyCode: 'PEACH888', role: 'child', deviceId: 'final-c' })

    const browser = await chromium.launch()

    // ═══ 家长端（平板视口）═══
    const pctx = await browser.newContext({ viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2 })
    await pctx.addInitScript(([v]) => window.localStorage.setItem('taoread-session', v), [sessionScript(family.token, family.familyId, 'parent')])
    const pp = await pctx.newPage()
    pp.on('pageerror', (err) => console.error('[pageerror]', String(err).slice(0, 250)))
    pp.on('console', (m) => { if (m.type() === 'error') console.error('[console]', m.text().slice(0, 200)) })
    await pp.goto(`${BASE}/parent`, { waitUntil: 'networkidle' })
    await pp.getByTestId('footprint-bar').getByText(/本周足迹/).waitFor({ timeout: 30_000 })
    await pp.screenshot({ path: resolve(OUT, 'parent-tonight.png'), fullPage: true })
    await pp.getByRole('button', { name: '书架', exact: true }).click()
    await pp.getByText(/屏蔽的书会立刻/).waitFor()
    await pp.waitForTimeout(500)
    await pp.screenshot({ path: resolve(OUT, 'parent-shelf.png'), fullPage: true })
    await pp.getByRole('button', { name: '周报', exact: true }).click()
    await pp.getByText('个共读的夜晚').waitFor()
    await pp.screenshot({ path: resolve(OUT, 'parent-report.png'), fullPage: true })
    await pp.getByRole('button', { name: '设置', exact: true }).click()
    await pp.getByText(/护眼设置/).waitFor()
    await pp.screenshot({ path: resolve(OUT, 'parent-settings.png'), fullPage: true })
    await pctx.close()
    console.log('✓ 家长端四页')

    // ═══ 孩子端（手机视口）═══
    const cctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
    await cctx.addInitScript(([v]) => window.localStorage.setItem('taoread-session', v), [sessionScript(child.token, child.familyId, 'child')])
    const cp = await cctx.newPage()

    // 登录页（无会话）
    const lctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
    const lp = await lctx.newPage()
    await lp.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
    await lp.screenshot({ path: resolve(OUT, 'login.png'), fullPage: true })
    await lctx.close()
    console.log('✓ 登录页')

    await cp.goto(`${BASE}/child`, { waitUntil: 'networkidle' })
    await cp.getByText('今天是谁的故事时间？').waitFor({ timeout: 30_000 })
    await cp.screenshot({ path: resolve(OUT, 'child-picker.png'), fullPage: true })
    await cp.getByRole('button', { name: /小桃/ }).click()
    await cp.getByText('月亮升起来啦').waitFor()
    await cp.screenshot({ path: resolve(OUT, 'child-gate.png'), fullPage: true })
    await cp.getByRole('button', { name: /点亮月亮/ }).click()
    await cp.getByText('今晚读').waitFor()
    await cp.waitForTimeout(700)
    await cp.screenshot({ path: resolve(OUT, 'child-select.png'), fullPage: true })
    console.log('✓ 孩子端 选择/门/选书')

    // 金句星球（选书页搜索进入需要开课——直接从搜索选定进入）
    await cp.getByLabel('搜索书名或作者').fill('小王子')
    await cp.getByRole('button', { name: '搜一搜' }).click()
    await cp.getByRole('button', { name: /选《小王子》/ }).first().click()
    await cp.getByText('选好啦').waitFor()
    await cp.getByRole('button', { name: /去金句星球看看/ }).click()
    await cp.getByText(/位小读者划过这句/).first().waitFor()
    await cp.screenshot({ path: resolve(OUT, 'child-star-sea.png'), fullPage: true })
    await cp.getByRole('button', { name: /回到月亮/ }).click()
    await cp.getByText('还没讲完呢').waitFor()
    await cp.getByRole('button', { name: /继续去读/ }).click()
    await cp.getByText('去微信读书读').waitFor()
    await cp.waitForTimeout(2600)
    await cp.screenshot({ path: resolve(OUT, 'child-departure.png'), fullPage: true })
    await cp.getByRole('button', { name: /去收尾/ }).click()
    await cp.getByText('读完好啦').waitFor()
    await cp.screenshot({ path: resolve(OUT, 'child-finish.png'), fullPage: true })
    await cp.getByRole('button', { name: /盖今晚的章|点亮夜灯/ }).click()
    await cp.getByText('稳稳收好啦').waitFor()
    await cp.screenshot({ path: resolve(OUT, 'child-celebrate.png'), fullPage: true })
    await cp.getByRole('button', { name: /回到月亮/ }).click()
    await cp.getByRole('button', { name: /我的夜灯/ }).click()
    await cp.getByText(/晚/).first().waitFor()
    await cp.screenshot({ path: resolve(OUT, 'child-wall.png'), fullPage: true })
    await cctx.close()
    console.log('✓ 孩子端全流程')

    await browser.close()
    console.log('视觉终扫完成 ✔ → docs/screenshots/final/')
  } finally {
    killTree(server)
    killTree(web)
  }
}

main().catch((err) => {
  console.error('终扫失败：', err.message)
  process.exit(1)
})
