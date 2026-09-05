import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    globalSetup: ['./test/global-setup.ts'],
    // SQLite 单写者：测试文件串行执行，避免跨 worker 并发写锁
    fileParallelism: false,
  },
})
