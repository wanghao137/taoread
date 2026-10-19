import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { candidateDirectory, loadCourse, validateCourse } from '../src/modules/phonics/v2/courseRegistry'

const { values } = parseArgs({ options: {
  version: { type: 'string', default: 'taoread-phonics-gb-v1' },
  mode: { type: 'string', default: 'development' },
  'media-root': { type: 'string' }, out: { type: 'string' },
} })
if (!['development', 'release'].includes(values.mode!) || values.version !== 'taoread-phonics-gb-v1') throw new Error('Unsupported mode or uninstalled version')
try {
  const course = await loadCourse(candidateDirectory)
  const report = await validateCourse(course, { mode: values.mode as 'development' | 'release', mediaRoot: values['media-root'] })
  if (values.out) {
    await mkdir(path.dirname(path.resolve(values.out)), { recursive: true })
    await writeFile(values.out, JSON.stringify(report, null, 2) + '\n', 'utf8')
  }
  console.log(JSON.stringify(values.out ? { complete: report.complete, ok: report.ok, releaseReady: report.releaseReady, contentHash: report.contentHash, counts: report.counts, errors: report.issues.filter(i => i.severity === 'error'), warningCount: report.issues.filter(i => i.severity === 'warning').length, reportPath: values.out } : report, null, 2))
  if (!report.ok) process.exitCode = 1
} catch (error) {
  console.error(JSON.stringify({ complete: false, ok: false, code: 'CONTENT_LOAD_FAILED', message: error instanceof Error ? error.message : 'Unknown error' }))
  process.exitCode = 1
}
