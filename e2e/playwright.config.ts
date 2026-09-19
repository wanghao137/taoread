import { defineConfig } from '@playwright/test'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 桃阅读 e2e（第 11 夜 M-C）：对【演示模式】跑全闭环——
 * demo 服务端（mock 网关 + PEACH888 种子）+ vite dev（/api 代理已配）。
 * 全程零真实出网、零真实 key，任意环境可重放。
 */
const API_PORT = 8787
const WEB_PORT = 5173

const here = dirname(fileURLToPath(import.meta.url))
const serverDir = resolve(here, '../apps/server')
const webDir = resolve(here, '../apps/web')

export default defineConfig({
  testDir: here,
  testMatch: '**/*.spec.ts',
  timeout: 180_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    viewport: { width: 390, height: 844 },
    locale: 'zh-CN',
  },
  webServer: [
    {
      command: 'npx tsx src/demo/main.ts',
      cwd: serverDir,
      port: API_PORT,
      reuseExistingServer: false,
      timeout: 180_000,
      env: {
        ...process.env,
        // 每次运行唯一库：零清理、零跨运行状态污染
        TAO_DATABASE_URL: `file:./e2e-run-${Date.now()}.db`,
        // N13-002：e2e 库也要播种媒体台账，否则插画/视频/TTS 断言全走 SVG 回退
        TAO_BEDTIME: 'off',
        TAO_MASTER_KEY: process.env.TAO_MASTER_KEY ?? 'e2e-master-key-0123456789abcdef',
      },
    },
    {
      command: 'npm run dev -- --port 5173 --strictPort',
      cwd: webDir,
      port: WEB_PORT,
      reuseExistingServer: false,
      timeout: 60_000,
    },
  ],
})
