/** Dedicated loopback-only fixture server. No production config/.env/provider is read. */
import { execFileSync } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildApp } from '../apps/server/src/app'
import { createDb } from '../apps/server/src/lib/db'
import { tokenSecretFrom } from '../apps/server/src/modules/family/service'
import { phonicsFixture } from '../apps/server/test/phonicsV2Fixture'
import { createDemoGateway } from '../apps/server/src/demo/mock-gateway'
import { IpRateLimiter } from '../apps/server/src/lib/ipRateLimit'

if (process.env.TAO_E2E_ISOLATION !== '1') throw new Error('This fixture server requires explicit test isolation')
const repo = fileURLToPath(new URL('../', import.meta.url))
const root = await mkdtemp(path.join(tmpdir(), 'tao-phonics-browser-'))
const database = `file:${path.join(root, 'isolated.db').replaceAll('\\', '/')}`
await writeFile(path.join(root, 'isolated.db'), '')
execFileSync(process.execPath, [path.join(repo, 'node_modules/prisma/build/index.js'), 'migrate', 'deploy', '--schema', path.join(repo, 'apps/server/prisma/schema.prisma')], { cwd: path.join(repo, 'apps/server'), env: { ...process.env, TAO_DATABASE_URL: database }, stdio: 'pipe' })
const db = createDb(database)
const course = await phonicsFixture(root)
const key = 'isolated-phonics-browser-0123456789'
const app = await buildApp({ db, masterKey: key, tokenSecret: tokenSecretFrom(key), mediaDir: root, staticDir: path.join(repo, 'apps/web/dist'),
  phonicsV2: { rollout: 'all', courses: [course] }, ttsDeps: null, imageDeps: null, videoDeps: null,
  probeKey: async () => 'active', wereadCall: () => createDemoGateway(), bedTimeMin: null,
  ipLimiter: new IpRateLimiter({ capacity: 10000, refillPerMinute: 10000 }),
})
await db.phonicsCourseRelease.create({ data: { versionId: course.manifest.versionId, courseId: course.manifest.courseId, accent: 'GB', contentHash: course.manifest.contentHash!, status: 'published' } })
const port = Number(process.env.TAO_E2E_API_PORT ?? 8798)
await app.listen({ port, host: '127.0.0.1' })
console.log(`Isolated phonics fixture ready on loopback:${port}; audio is synthetic test tones`)
let closing = false
async function close() {
  if (closing) return
  closing = true
  await app.close(); await db.$disconnect()
  await rm(root, { recursive: true, force: true })
  process.exit(0)
}
process.on('SIGINT', () => void close()); process.on('SIGTERM', () => void close())
