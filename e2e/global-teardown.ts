import { rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { E2E_DB_FILE } from './playwright.config'

/** 运行结束删掉本运行的 e2e 库（含 SQLite journal/wal/shm 伴生文件）；
 *  文件名含 pid+时间戳，并发运行互不影响。清理失败不影响测试结论。 */
export default async function globalTeardown(): Promise<void> {
  const base = E2E_DB_FILE.replace(/^file:/, '')
  const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../apps/server/prisma')
  for (const suffix of ['', '-journal', '-wal', '-shm']) {
    await rm(resolve(dir, `${base}${suffix}`), { force: true }).catch(() => undefined)
  }
}
