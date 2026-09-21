/**
 * `npm run demo` 一键演示：拉起演示服务端（mock 网关 + 123456 种子）与前端 dev server。
 * Ctrl+C 一并退出。端口占用时先清理提示。
 */
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SERVER_DIR = resolve(ROOT, 'apps/server')
const WEB_DIR = resolve(ROOT, 'apps/web')
const API_PORT = 8787
const WEB_PORT = 5173

const TSX_BIN = resolve(SERVER_DIR, '../../node_modules/tsx/dist/cli.mjs')
const VITE_BIN = resolve(WEB_DIR, '../../node_modules/vite/bin/vite.js')

// 该环境下 shell spawn cmd.exe 间歇 ENOENT：直接用 node 调包内 bin（绕开 shell）
function spawnNpm(cwd, bin, args, label, color, extraEnv = {}) {
  const child = spawn(process.execPath, [bin, ...args], {
    cwd,
    env: { ...process.env, FORCE_COLOR: '1', ...extraEnv },
  })
  const pipe = (stream, out) => {
    let buffered = ''
    stream.on('data', (chunk) => {
      buffered += chunk.toString()
      const lines = buffered.split('\n')
      buffered = lines.pop() ?? ''
      for (const line of lines) {
        if (line.trim()) out(`[${label}] ${line}`)
      }
    })
  }
  pipe(child.stdout, (l) => console.log(`\x1b[${color}m${l}\x1b[0m`))
  pipe(child.stderr, (l) => console.log(`\x1b[${color}m${l}\x1b[0m`))
  child.on('error', (err) => console.error(`[${label}] 启动失败：`, err.message))
  return child
}

function killTree(child) {
  if (!child.pid) return
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', shell: true })
  } else {
    child.kill()
  }
}

console.log('🍑 桃阅读 演示启动中…')

const server = spawnNpm(
  SERVER_DIR,
  TSX_BIN,
  ['src/demo/main.ts'],
  'server',
  '36',
  { TAO_DATABASE_URL: 'file:./demo.db' }, // N11-001：demo 专属库（隔离守卫要求）
) // cyan
const web = spawnNpm(WEB_DIR, VITE_BIN, [WEB_DIR, '--port', String(WEB_PORT), '--strictPort'], 'web', '35') // magenta

const shutdown = () => {
  killTree(server)
  killTree(web)
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

// 后台轮询等待两端就绪后打印访问指引（不阻塞）
const started = Date.now()
const timer = setInterval(async () => {
  try {
    const res = await fetch(`http://localhost:${API_PORT}/api/health`)
    if (res.ok) {
      clearInterval(timer)
      console.log('')
      console.log('✅ 演示已就绪（首次启动 vite 需要几秒编译）')
      console.log(`   👉 浏览器打开  http://localhost:${WEB_PORT}`)
      console.log('   👉 登录页输入家庭码  123456')
      console.log('      · 选「爸爸妈妈」看 共读卡/书架管理/周报/设置')
      console.log('      · 选「小朋友」走 选书→出发→收尾→夜灯 完整仪式流')
      console.log('   Ctrl+C 退出演示')
      console.log('')
      void started
    }
  } catch {
    /* server not ready */
  }
}, 1000)
timer.unref?.()
