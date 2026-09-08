import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    globalSetup: ['./test/global-setup.ts'],
    // SQLite 单写者：测试文件串行执行，避免跨 worker 并发写锁
    fileParallelism: false,
    // Windows 下 threads 池偶发 0xC0000005 原生崩溃（第 6/7 夜各复发一次），
    // 切换 forks 进程池根治（2026-09-08）
    pool: 'forks',
  },
})
