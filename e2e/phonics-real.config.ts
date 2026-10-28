import { defineConfig } from '@playwright/test'
import path from 'node:path'

const root = path.resolve(process.env.TAO_E2E_OUTPUT_DIR ?? 'output/phonics-refactor-20261027')
const apiPort = Number(process.env.TAO_E2E_API_PORT ?? 8897)
export default defineConfig({
  testDir: '.', testMatch: 'phonics-real.spec.ts', timeout: 120000, workers: 1,
  expect: { timeout: 15000 }, reporter: [['list'], ['json', { outputFile: path.join(root, 'real-results.json') }]], outputDir: path.join(root, 'real-browser'),
  use: { baseURL: `http://127.0.0.1:${apiPort}`, locale: 'zh-CN', trace: 'retain-on-failure' },
  webServer: [{ command: 'node --import tsx e2e/phonics-real-server.mts', cwd: '..', url: `http://127.0.0.1:${apiPort}/api/health`, reuseExistingServer: false, timeout: 180000,
    env: { TAO_E2E_ISOLATION: '1', TAO_E2E_API_PORT: String(apiPort), TAO_E2E_REAL_MEDIA: process.env.TAO_E2E_REAL_MEDIA ?? 'D:/taoread-prod/apps/server/media', TAO_E2E_WEB_DIR: process.env.TAO_E2E_WEB_DIR ?? path.join(root, 'dist-r4') } }],
})
