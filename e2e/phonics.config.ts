import { defineConfig } from '@playwright/test'

const apiPort = Number(process.env.TAO_E2E_API_PORT ?? 8798)
export default defineConfig({
  testDir: '.', testMatch: 'phonics-v2.spec.ts', timeout: 180000, workers: 1, retries: 0,
  expect: { timeout: 15000 },
  reporter: [['list'], ['json', { outputFile: '../output/phonics-v1/20261019/browser-tests.json' }]], outputDir: '../output/phonics-v1/20261019/browser',
  use: { baseURL: `http://127.0.0.1:${apiPort}`, viewport: { width: 390, height: 844 }, locale: 'zh-CN', trace: 'retain-on-failure' },
  webServer: [
    { command: 'node --import tsx e2e/phonics-server.mts', cwd: '..', url: `http://127.0.0.1:${apiPort}/api/health`, reuseExistingServer: false, timeout: 180000, env: { TAO_E2E_ISOLATION: '1', TAO_E2E_API_PORT: String(apiPort) } },
  ],
})
