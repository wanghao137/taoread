import { execSync } from 'node:child_process'

/** 测试库：迁移一次，供全部测试文件共享（vitest fileParallelism=false 串行访问） */
export default function globalSetup(): void {
  execSync('npx --no-install prisma migrate deploy', {
    cwd: process.cwd(),
    env: { ...process.env, TAO_DATABASE_URL: process.env.TAO_TEST_DB_URL ?? 'file:./test.db' },
    stdio: 'pipe',
  })
}
