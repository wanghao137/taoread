import { defineConfig } from '@playwright/test'
import path from 'node:path'

const apiPort = Number(process.env.TAO_E2E_API_PORT ?? 8896)
const root = path.resolve(process.env.TAO_E2E_OUTPUT_DIR ?? 'output/phonics-refactor-20261027')
export default defineConfig({
  testDir: '.', testMatch: ['phonics-refactor.spec.ts', 'phonics-v2.spec.ts'], timeout: 180000, workers: 1, retries: 0,
  expect: { timeout: 15000 }, reporter: [['list'], ['json', { outputFile: path.join(root, 'results.json') }]],
  outputDir: path.join(root, 'browser'),
  use: { baseURL: `http://127.0.0.1:${apiPort}`, locale: 'zh-CN', trace: 'retain-on-failure' },
  webServer: [{
    command: 'node --import tsx e2e/phonics-server.mts', cwd: '..', url: `http://127.0.0.1:${apiPort}/api/health`, reuseExistingServer: false, timeout: 180000,
    env: { TAO_E2E_ISOLATION: '1', TAO_E2E_API_PORT: String(apiPort), TAO_E2E_WEB_DIR: process.env.TAO_E2E_WEB_DIR ?? path.join(root, 'dist-r4') },
  }],
})
