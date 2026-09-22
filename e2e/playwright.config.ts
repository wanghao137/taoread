import { defineConfig } from '@playwright/test'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 桃阅读 e2e（第 11 夜 M-C）：对【演示模式】跑全闭环——
 * demo 服务端（mock 网关 + 123456 种子）+ vite dev（/api 代理已配）。
 * 全程零真实出网、零真实 key，任意环境可重放。
 */
// 端口可覆盖（审计 T01/T02：任务书要求测试用空闲端口；用户 5173/8787 实例
// 运行时不劫持——设 TAO_E2E_API_PORT/TAO_E2E_WEB_PORT 走隔离端口）
const API_PORT = Number(process.env.TAO_E2E_API_PORT ?? 8787)
const WEB_PORT = Number(process.env.TAO_E2E_WEB_PORT ?? 5173)

// 审计 F35（T01）：测试默认禁止外网/付费依赖——从继承环境中剥离全部真实供应商
// 变量，e2e 的生成/朗读永远走降级路径，上游请求数恒为 0（缺失即 optional，校验通过）
const {
  TTS_BASE: _ttsBase,
  TTS_API_KEY: _ttsKey,
  TAO_IMAGE_BASE: _imageBase,
  TAO_IMAGE_KEY: _imageKey,
  TAO_VIDEO_BASE: _videoBase,
  TAO_VIDEO_KEY: _videoKey,
  ...INHERITED_ENV
} = process.env
void [_ttsBase, _ttsKey, _imageBase, _imageKey, _videoBase, _videoKey]

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
        ...INHERITED_ENV,
        // demo 读 config.PORT 决定监听端口：必须与探测端口一致
        PORT: String(API_PORT),
        // 审计 F35（T01）：TAO_E2E_ISOLATION=1 → demo/main.ts 跳过 .env 并强制
        // 全部真实供应商为 null——测试零外网/零付费是代码级保证，不依赖 env 卫生
        TAO_E2E_ISOLATION: '1',
        // 每次运行唯一库：零清理、零跨运行状态污染
        TAO_DATABASE_URL: `file:./e2e-run-${Date.now()}.db`,
        // N13-002：e2e 库也要播种媒体台账，否则插画/视频/TTS 断言全走 SVG 回退
        TAO_BEDTIME: 'off',
        TAO_MASTER_KEY: process.env.TAO_MASTER_KEY ?? 'e2e-master-key-0123456789abcdef',
      },
    },
    {
      command: `npm run dev -- --port ${WEB_PORT} --strictPort`,
      cwd: webDir,
      port: WEB_PORT,
      reuseExistingServer: false,
      timeout: 60_000,
      // vite 的 /api 代理目标读 TAO_API_PORT（审计教训：不透传时代理打到默认 8787——
      // 那是用户实例，e2e 会误读写用户的演示库）
      env: { ...process.env, TAO_API_PORT: String(API_PORT) },
    },
  ],
})
