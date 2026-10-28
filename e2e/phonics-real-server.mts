import { execFileSync } from 'node:child_process'
import { randomInt, randomUUID } from 'node:crypto'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildApp } from '../apps/server/src/app'
import { createDb } from '../apps/server/src/lib/db'
import { tokenSecretFrom } from '../apps/server/src/modules/family/service'
import { candidateDirectory, loadCourse } from '../apps/server/src/modules/phonics/v2/courseRegistry'
import type { PhonicsV2Options } from '../apps/server/src/modules/phonics/v2/runtime'
import { createDemoGateway } from '../apps/server/src/demo/mock-gateway'
import { IpRateLimiter } from '../apps/server/src/lib/ipRateLimit'

if (process.env.TAO_E2E_ISOLATION !== '1' || !process.env.TAO_E2E_REAL_MEDIA || !process.env.TAO_E2E_WEB_DIR) throw new Error('Explicit test isolation, media and web paths are required')
const repo = fileURLToPath(new URL('../', import.meta.url))
const temporary = await mkdtemp(path.join(tmpdir(), 'tao-phonics-real-'))
const database = `file:${path.join(temporary, 'isolated.db').replaceAll('\\', '/')}`
await writeFile(path.join(temporary, 'isolated.db'), '')
execFileSync(process.execPath, [path.join(repo, 'node_modules/prisma/build/index.js'), 'migrate', 'deploy', '--schema', path.join(repo, 'apps/server/prisma/schema.prisma')], { cwd: path.join(repo, 'apps/server'), env: { ...process.env, TAO_DATABASE_URL: database }, stdio: 'pipe' })
const db = createDb(database)
const course = await loadCourse(candidateDirectory)
// 旁挂词典/美音包与生产同源加载（app.ts 同款），保证浏览器走查覆盖新能力
const { loadSidecars } = await import('../apps/server/src/modules/phonics/v2/sidecars')
const { courseHash } = await import('../apps/server/src/modules/phonics/v2/courseRegistry')
const sidecars = await loadSidecars(candidateDirectory.replace(/[\\/]+$/, ''), course.manifest.versionId, courseHash(course))
if (sidecars.problems.length) throw new Error(`Sidecar problems: ${sidecars.problems.join('; ')}`)
const options: PhonicsV2Options = { rollout: 'off', courses: [course], sidecars: [sidecars] }
const key = 'isolated-phonics-real-media-0123456789'
const app = await buildApp({ db, masterKey: key, tokenSecret: tokenSecretFrom(key), mediaDir: path.resolve(process.env.TAO_E2E_REAL_MEDIA), staticDir: path.resolve(process.env.TAO_E2E_WEB_DIR),
  phonicsV2: options, ttsDeps: null, imageDeps: null, videoDeps: null, probeKey: async () => 'active', wereadCall: () => createDemoGateway(), bedTimeMin: null,
  ipLimiter: new IpRateLimiter({ capacity: 10000, refillPerMinute: 10000 }),
})
let session: object | null = null
app.get('/__test/session', async () => session)
app.get('/__test/open', async (_request, reply) => {
  const state = JSON.stringify({ state: session, version: 1 }).replaceAll('<', '\\u003c')
  return reply.header('Cache-Control', 'no-store').type('text/html; charset=utf-8').send(`<!doctype html><meta charset="utf-8"><title>桃阅读体验</title><script>localStorage.setItem('taoread-session', ${JSON.stringify(state)});location.replace('/child/phonics')</script>`)
})
await db.phonicsCourseRelease.create({ data: { versionId: course.manifest.versionId, courseId: course.manifest.courseId, accent: 'GB', contentHash: course.manifest.contentHash!, status: 'self_use' } })
const familyResponse = await app.inject({ method: 'POST', url: '/api/family', payload: { deviceId: randomUUID(), agreeVersion: '2026-09-28-test', parentPin: String(randomInt(100000, 1000000)) } })
if (familyResponse.statusCode !== 201) throw new Error('Test family creation failed')
const family = familyResponse.json<{ token: string; familyId: string; familyCode: string }>()
options.selfUseFamilyId = family.familyId; options.selfUseHash = course.manifest.contentHash!
const headers = { authorization: `Bearer ${family.token}` }
const childResponse = await app.inject({ method: 'POST', url: `/api/family/${family.familyId}/children`, headers, payload: { nickname: '课程体验', stage: '6-8' } })
if (childResponse.statusCode !== 201) throw new Error('Test child creation failed')
const child = childResponse.json<{ id: string }>()
const enrolled = await app.inject({ method: 'PUT', url: `/api/phonics/v2/children/${child.id}/enrollment`, headers, payload: { enabled: true, versionId: course.manifest.versionId, entryMode: 'lesson', entryLessonKey: 'L09', expectedRevision: 0 } })
if (enrolled.statusCode !== 200) throw new Error('Test enrollment failed')
const joined = await app.inject({ method: 'POST', url: '/api/family/join', payload: { familyCode: family.familyCode, role: 'child', deviceId: randomUUID() } })
if (joined.statusCode !== 200) throw new Error('Test child session failed')
session = { token: joined.json<{ token: string }>().token, familyId: family.familyId, familyCode: family.familyCode, role: 'child', childId: child.id, childStage: '6-8', calmMode: false }
await app.listen({ port: Number(process.env.TAO_E2E_API_PORT ?? 8897), host: '127.0.0.1' })
console.log('Isolated real-media phonics fixture ready')
let closing = false
async function close() {
  if (closing) return
  closing = true
  await app.close(); await db.$disconnect()
  if (path.dirname(temporary) !== tmpdir()) throw new Error('Unexpected temporary directory')
  await rm(temporary, { recursive: true, force: true })
  process.exit(0)
}
process.on('SIGINT', () => void close()); process.on('SIGTERM', () => void close())
