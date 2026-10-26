/**
 * 词光四能力真实课程走查（docs/91 审计轮）。
 *
 * 隔离 app + 真实课程包 + 真实媒体目录，API 级走完整课堂（L09 → L24 链），逐步断言：
 *  - 每个词一幅画：词义任务的 imageAsset 有已绑定 webp 且可取
 *  - 每个词都会读：instruction/stimulus 音频 url 存在、可取、audio/wav
 *  - 每个词都有什么：displayText（课堂大词）+ meaningZh（词卡）+ 小书页文本与配图
 *  - 全应用声音：媒体头校验 + 词卡三读
 * 输出走查报告 JSON；任何断言失败抛错退出。
 *
 * 用法：npx tsx scripts/walkthrough-phonics-course.mts --media-root <dir>
 */
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { parseArgs } from 'node:util'
import { buildApp } from '../src/app'
import { createDb } from '../src/lib/db'
import { tokenSecretFrom } from '../src/modules/family/service'
import { loadCourse, candidateDirectory } from '../src/modules/phonics/v2/courseRegistry'
import { createDemoGateway } from '../src/demo/mock-gateway'
import { IpRateLimiter } from '../src/lib/ipRateLimit'

const { values } = parseArgs({ options: { 'media-root': { type: 'string' }, lessons: { type: 'string' } } })
if (!values['media-root']) throw Error('Explicit --media-root is required')
const mediaRoot = path.resolve(values['media-root'])
const lessonKeys = (values.lessons ?? 'L09,L24').split(',').filter(Boolean)

const root = await mkdtemp(path.join(tmpdir(), 'tao-phonics-walk-'))
const database = `file:${path.join(root, 'walk.db').replaceAll('\\', '/')}`
const { execFileSync } = await import('node:child_process')
await writeFile(path.join(root, 'walk.db'), '')
execFileSync(process.execPath, [path.resolve('../../node_modules/prisma/build/index.js'), 'migrate', 'deploy', '--schema', path.resolve('prisma/schema.prisma')], { cwd: process.cwd(), env: { ...process.env, TAO_DATABASE_URL: database }, stdio: 'pipe' })
const db = createDb(database)
const course = await loadCourse(candidateDirectory)
const key = 'walkthrough-phonics-0123456789'
// runtime.options 持有同一引用：家庭创建后原地开 self-use，绕过待签认的发布门
const phonicsV2: Record<string, unknown> = { rollout: 'off', courses: [course] }
const app = await buildApp({ db, masterKey: key, tokenSecret: tokenSecretFrom(key), mediaDir: mediaRoot, staticDir: path.resolve('../web/dist'),
  phonicsV2: phonicsV2 as never, ttsDeps: null, imageDeps: null, videoDeps: null,
  probeKey: async () => 'active', wereadCall: () => createDemoGateway(), bedTimeMin: null,
  ipLimiter: new IpRateLimiter({ capacity: 10000, refillPerMinute: 10000 }) })
await db.phonicsCourseRelease.create({ data: { versionId: course.manifest.versionId, courseId: course.manifest.courseId, accent: 'GB', contentHash: course.manifest.contentHash!, status: 'self_use' } })

const call = async (method: 'GET' | 'POST' | 'PUT', url: string, token?: string, payload?: unknown) => app.inject({ method, url, headers: token ? { authorization: `Bearer ${token}` } : {}, ...(payload ? { payload } : {}) })

// ── 家庭与孩子 ──────────────────────────────────────────────────────────────
const parentRes = await call('POST', '/api/family', undefined, { deviceId: 'walkthrough-device', agreeVersion: 'v1-2026', parentPin: '135724' })
if (parentRes.statusCode !== 200 && parentRes.statusCode !== 201) throw Error(`family create failed: ${parentRes.body}`)
const parent = parentRes.json<{ token: string; familyId: string; familyCode: string }>()
const childRes = await call('POST', `/api/family/${parent.familyId}/children`, parent.token, { nickname: '走查娃', stage: '6-8' })
if (childRes.statusCode !== 200 && childRes.statusCode !== 201) throw Error(`child create failed: ${childRes.body}`)
const childId = childRes.json<{ id: string }>().id
const joinRes = await call('POST', '/api/family/join', undefined, { familyCode: parent.familyCode, role: 'child', deviceId: 'walkthrough-device-child' })
if (joinRes.statusCode !== 200) throw Error(`child join failed: ${joinRes.body}`)
const childToken = joinRes.json<{ token: string }>().token
// 家庭已建：开启 self-use 通道（内容哈希精确绑定，独立于公开发布门）
phonicsV2.selfUseFamilyId = parent.familyId
phonicsV2.selfUseHash = course.manifest.contentHash

// 家长开启课程（lesson 模式，从 L09 起，验证后续课的内容走查）
const enr = await call('GET', `/api/phonics/v2/children/${childId}/enrollment`, parent.token)
const rev = enr.json<{ enrollment: { revision: number } }>().enrollment.revision
const setEnr = await call('PUT', `/api/phonics/v2/children/${childId}/enrollment`, parent.token, { enabled: true, versionId: course.manifest.versionId, entryMode: 'lesson', entryLessonKey: lessonKeys[0]!, expectedRevision: rev })
if (setEnr.statusCode !== 200) throw Error(`enroll failed: ${setEnr.body}`)

const issues: string[] = []
const checked = { audioUrls: 0, imageUrls: 0, displayWords: 0, mediaFetched: 0, captionPages: 0 }
const seenUrls = new Set<string>()
async function verifyAssets(attempt: { assets: Array<{ id: string; purpose: string; url: string | null }> }, expectImage: boolean) {
  for (const asset of attempt.assets) {
    if (!asset.url) issues.push(`asset ${asset.id} (${asset.purpose}) has no url`)
    else if (!seenUrls.has(asset.url)) {
      seenUrls.add(asset.url)
      const media = await call('GET', asset.url, childToken)
      checked.mediaFetched++
      if (media.statusCode !== 200) { issues.push(`media ${asset.url} -> ${media.statusCode}`); continue }
      const type = String(media.headers['content-type'] ?? '')
      if (asset.purpose === 'image' && !type.includes('image/')) issues.push(`image ${asset.id} type ${type}`)
      if (asset.purpose !== 'image' && !type.includes('audio/')) issues.push(`audio ${asset.id} type ${type}`)
      if (media.rawPayload.length < 500) issues.push(`media ${asset.id} suspiciously small (${media.rawPayload.length}B)`)
      if (asset.purpose === 'image') checked.imageUrls++; else checked.audioUrls++
    }
  }
  if (expectImage && !attempt.assets.some(a => a.purpose === 'image')) issues.push(`task has no image asset`)
}

interface AttemptResponse { attempt: {
  id: string; revision: number; stepCount: number; status: string
  task: { id: string; kind: string; skill: string; instructionAssetId: string; stimulusAssetId?: string; displayText?: string; imageAssetId?: string; readerId?: string } | null
  assets: Array<{ id: string; purpose: string; url: string | null }>
  reader: { pages: Array<{ text: string; imageAssetId?: string; audioAssetId: string }> } | null
  state: { pageIndex: number; stepIndex: number; taskInstanceId: string }
} }

async function runLesson(label: string, initial: AttemptResponse['attempt']) {
  let attempt = initial
  let guard = 0
  while (attempt.task && guard++ < 200) {
    const task = attempt.task
    if (!task.displayText && !['build', 'choice', 'read'].includes(task.kind)) issues.push(`${label}/${task.id} (${task.kind}/${task.skill}) has no displayText`)
    await verifyAssets(attempt, task.skill === 'meaning')
    const instance = attempt.state.taskInstanceId
    // choice/build 服务端不公开答案：走帮助通路（先要提示再带着帮助跳过），其余按题型上报
    let event: Record<string, unknown>
    if (['choice', 'build'].includes(task.kind)) {
      const hint = await call('POST', `/api/phonics/v2/attempts/${attempt.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: attempt.revision, taskInstanceId: instance, kind: 'hint_requested', payload: {} })
      if (hint.statusCode !== 200) { issues.push(`${label}/${task.id} hint -> ${hint.statusCode} ${hint.body.slice(0, 120)}`); break }
      attempt = hint.json<{ attempt: AttemptResponse['attempt'] }>().attempt
      event = { kind: 'task_skipped_with_help', payload: {} }
    } else if (['oral', 'read'].includes(task.kind)) {
      event = { kind: 'self_read_reported', payload: { report: 'tried' } }
    } else {
      event = { kind: 'step_ack', payload: {} }
    }
    const ev = await call('POST', `/api/phonics/v2/attempts/${attempt.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: attempt.revision, taskInstanceId: instance, ...event })
    if (ev.statusCode !== 200) { issues.push(`${label}/${task.id} event ${String(event.kind)} -> ${ev.statusCode} ${ev.body.slice(0, 120)}`); break }
    attempt = ev.json<{ attempt: AttemptResponse['attempt'] }>().attempt
    const instance2 = attempt.state.taskInstanceId
    if (attempt.reader && attempt.state.pageIndex < attempt.reader.pages.length - 1) {
      checked.captionPages++
      const page = attempt.reader.pages[attempt.state.pageIndex]!
      if (!page.imageAssetId) issues.push(`${label} reader page ${attempt.state.pageIndex} has no image`)
      const adv = await call('POST', `/api/phonics/v2/attempts/${attempt.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: attempt.revision, taskInstanceId: instance2, kind: 'reader_page_advanced', payload: {} })
      if (adv.statusCode !== 200) { issues.push(`page advance -> ${adv.statusCode} ${adv.body.slice(0, 120)}`); break }
      attempt = adv.json<{ attempt: AttemptResponse['attempt'] }>().attempt
      continue
    }
    const adv = await call('POST', `/api/phonics/v2/attempts/${attempt.id}/events`, childToken, { clientEventId: randomUUID(), expectedRevision: attempt.revision, taskInstanceId: instance2, kind: 'step_advanced', payload: {} })
    if (adv.statusCode !== 200) { issues.push(`step advance -> ${adv.statusCode} ${adv.body.slice(0, 120)}`); break }
    attempt = adv.json<{ attempt: AttemptResponse['attempt'] }>().attempt
  }
  if (attempt.status === 'started') {
    const fin = await call('POST', `/api/phonics/v2/attempts/${attempt.id}/finish`, childToken, { clientEventId: randomUUID(), expectedRevision: attempt.revision })
    if (fin.statusCode !== 200) issues.push(`${label} finish -> ${fin.statusCode} ${fin.body.slice(0, 160)} | stepIndex=${attempt.state.stepIndex}/${attempt.stepCount} task=${attempt.task?.id ?? 'null'}`)
  }
}

async function startLesson(lessonKey: string): Promise<boolean> {
  for (let round = 0; round < 12; round++) {
    const start = await call('POST', `/api/phonics/v2/children/${childId}/attempts`, childToken, { clientAttemptId: randomUUID(), versionId: course.manifest.versionId, planKind: 'lesson', resourceKey: lessonKey })
    if (start.statusCode === 200) { await runLesson(lessonKey, start.json<AttemptResponse>().attempt); return true }
    if (!/PREREQUISITE_REQUIRED/.test(start.body)) { issues.push(`${lessonKey} start failed: ${start.body.slice(0, 140)}`); return false }
    // 推荐链：先完成系统当前推荐（复习/巩固），再回来试新课
    const nextRes = await call('GET', `/api/phonics/v2/children/${childId}/next`, childToken)
    const next = nextRes.json<{ next: { reason: string; attemptId?: string; planKind?: string; resourceKey?: string } }>().next
    if (next.reason === 'continue' && next.attemptId) {
      const got = await call('GET', `/api/phonics/v2/attempts/${next.attemptId}`, childToken)
      await runLesson(next.planKind ?? 'review', got.json<{ attempt: AttemptResponse['attempt'] }>().attempt)
      continue
    }
    if (!next.planKind) { issues.push(`${lessonKey} blocked by next=${next.reason}`); return false }
    const plan = await call('POST', `/api/phonics/v2/children/${childId}/attempts`, childToken, { clientAttemptId: randomUUID(), versionId: course.manifest.versionId, planKind: next.planKind, ...(next.resourceKey ? { resourceKey: next.resourceKey } : {}) })
    if (plan.statusCode !== 200) { issues.push(`${lessonKey} detour ${next.planKind} -> ${plan.statusCode}`); return false }
    await runLesson(next.planKind, plan.json<AttemptResponse>().attempt)
  }
  issues.push(`${lessonKey} never unlocked after 12 detours`)
  return false
}

for (const lessonKey of lessonKeys) {
  await startLesson(lessonKey)
  // 小书页音频/图完整性（reader 全量）
  const lesson = course.lessons.find(l => l.id === lessonKey)
  for (const readerId of lesson?.readerIds ?? []) {
    const reader = course.readers.find(r => r.id === readerId)
    for (const [i, page] of (reader?.pages ?? []).entries()) {
      if (!page.imageAssetId) issues.push(`${readerId} page ${i} (${page.text}) has no image`)
      else if (!course.assets.find(a => a.id === page.imageAssetId && a.sha256)) issues.push(`${readerId} page ${i} image unbound`)
      const pageAudio = course.assets.find(a => a.id === page.audioAssetId)
      if (!pageAudio?.sha256) issues.push(`${readerId} page ${i} audio unbound`)
    }
  }
}

// 词卡走查：完成课后词应出现，带图、三读、释义
const wordsRes = await call('GET', `/api/phonics/v2/children/${childId}/words`, childToken)
const words = wordsRes.json<{ words: Array<{ id: string; text: string; meaningZh: string; image: { url: string } | null; audios: Array<{ purpose: string; url: string | null }> }> }>().words
checked.displayWords = words.length
if (words.length === 0) issues.push('no word cards after completed lessons')
for (const word of words) {
  if (!word.meaningZh) issues.push(`word ${word.text} missing meaning`)
  if (!word.image?.url) issues.push(`word ${word.text} missing image`)
  if (word.audios.map(a => a.purpose).join() !== 'segment,blend,word') issues.push(`word ${word.text} audios ${word.audios.map(a => a.purpose).join()}`)
  if (word.image?.url && !seenUrls.has(word.image.url)) {
    const media = await call('GET', word.image.url, childToken)
    if (media.statusCode !== 200) issues.push(`word ${word.text} image -> ${media.statusCode}`)
    checked.mediaFetched++
  }
}

console.log(JSON.stringify({ checked, issues, wordsOpened: words.map(w => w.text).slice(0, 12) }, null, 1))
await app.close(); await db.$disconnect()
await rm(root, { recursive: true, force: true })
if (issues.length) process.exitCode = 1
