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
    // 用例本身是亚秒级，但每个家庭都跑真实 argon2 哈希 + SQLite 落盘；
    // 机器高负载（e2e 与单测并行）时偶发 4-6s，默认 5s 会误报超时（2026-09-16 复现）
    testTimeout: 20_000,
  },
})
