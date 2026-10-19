/** Explicit operational tool. Never called from app startup; no automatic publication. */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { z } from 'zod'
import { createDb } from '../src/lib/db'
import { candidateDirectory, courseHash, loadCourse, validateCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values, positionals } = parseArgs({ allowPositionals: true, options: {
  version: { type: 'string', default: 'taoread-phonics-gb-v1' }, database: { type: 'string' },
  'media-root': { type: 'string' }, 'expect-hash': { type: 'string' }, acceptance: { type: 'string' },
} })
const action = positionals[0] ?? 'inspect'
if (!['inspect', 'publish', 'withdraw', 'set-default'].includes(action) || values.version !== 'taoread-phonics-gb-v1') throw new Error('Unsupported action or uninstalled version')
// An explicit path prevents this tool silently selecting a production .env database.
const database = values.database
if (database && !database.startsWith('file:')) throw new Error('An explicit SQLite file URL is required')
const db = database ? createDb(database) : null
try {
  const course = await loadCourse(candidateDirectory)
  const contentHash = courseHash(course)
  const report = await validateCourse(course, { mode: 'release', mediaRoot: values['media-root'] ? path.resolve(values['media-root']) : undefined })
  const release = db ? await db.phonicsCourseRelease.findUnique({ where: { versionId: values.version } }) : null
  if (action === 'inspect') {
    const published = db ? await db.phonicsCourseRelease.findMany({ where: { courseId: course.manifest.courseId, status: 'published' }, select: { versionId: true, contentHash: true, defaultForCourse: true } }) : []
    console.log(JSON.stringify({ action, complete: report.complete, versionId: values.version, contentHash, releaseReady: report.releaseReady, counts: report.counts, blockers: report.issues.filter(i => i.severity === 'error'), databaseInspected: Boolean(db), release, rollbackCandidates: published.filter(v => v.versionId !== values.version), rolloutNote: 'Runtime rollout and family enrollment are separate gates; inspect does not change either.' }, null, 2))
  } else {
    const expectedHash = action === 'withdraw' ? release?.contentHash : contentHash
    if (!db || !expectedHash || values['expect-hash'] !== expectedHash) throw new Error('Mutations require --database and a matching --expect-hash')
    if (action !== 'withdraw' && !report.releaseReady) throw new Error('Content release validation has blockers; no release state changed')
    if (action === 'publish') {
      if (!values.acceptance) throw new Error('Publication requires a hash-bound acceptance receipt')
      const gate = z.object({ complete: z.literal(true), versionId: z.literal(values.version!), contentHash: z.literal(contentHash),
        technical: z.string().min(1), realDevices: z.string().min(1), teachingAndSpeech: z.string().min(1), familyPilot: z.string().min(1), backupRestore: z.string().min(1), approvedBy: z.string().min(1), approvedAt: z.number().int().positive(),
      }).strict().parse(JSON.parse(await readFile(path.resolve(values.acceptance), 'utf8')))
      // Receipt references are evidence files, not unchecked labels or remote URLs.
      for (const name of ['technical', 'realDevices', 'teachingAndSpeech', 'familyPilot', 'backupRestore'] as const) await readFile(path.resolve(path.dirname(values.acceptance), gate[name]))
      if (release && release.contentHash !== contentHash) throw new Error('Version IDs are immutable; create a new version for changed content')
      await db.phonicsCourseRelease.upsert({ where: { versionId: values.version }, create: { versionId: values.version!, courseId: course.manifest.courseId, accent: course.manifest.accent, contentHash, status: 'published', publishedAt: new Date() }, update: { status: 'published', publishedAt: new Date(), withdrawnAt: null } })
    } else if (action === 'withdraw') {
      if (!release) throw new Error('No installed database release exists')
      await db.phonicsCourseRelease.update({ where: { versionId: values.version }, data: { status: 'withdrawn', withdrawnAt: new Date(), defaultForCourse: null } })
    } else {
      if (release?.status !== 'published' || release.contentHash !== contentHash) throw new Error('Only a matching published version can become the default')
      await db.$transaction(async tx => {
        await tx.phonicsCourseRelease.updateMany({ where: { defaultForCourse: course.manifest.courseId }, data: { defaultForCourse: null } })
        await tx.phonicsCourseRelease.update({ where: { versionId: values.version }, data: { defaultForCourse: course.manifest.courseId } })
      })
    }
    console.log(JSON.stringify({ action, complete: true, versionId: values.version, contentHash, changed: true }))
  }
} catch (error) {
  // Do not echo database connection strings or engine diagnostics containing paths/secrets.
  console.error(JSON.stringify({ action, complete: false, changed: false, code: 'RELEASE_GATE_FAILED', message: error instanceof z.ZodError ? 'Invalid acceptance receipt' : error instanceof Error && !('code' in error) ? error.message : 'Release operation failed' }))
  process.exitCode = 1
} finally { await db?.$disconnect() }
