import { mkdir, realpath, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { candidateDirectory, loadCourse, validateCourse } from '../src/modules/phonics/v2/courseRegistry'
import { buildPrimaryCandidate } from './lib/phonicsPrimaryExpansion'

const { values } = parseArgs({ options: { out: { type: 'string' } } })
if (!values.out) throw new Error('Provide a new --out directory inside output')
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const outputRoot = await realpath(path.join(repo, 'output'))
const out = path.resolve(values.out)
const parent = await realpath(path.dirname(out))
const relative = path.relative(outputRoot, parent)
if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Candidate must be inside output')
await mkdir(out)
const actual = await realpath(out)
const actualRelative = path.relative(outputRoot, actual)
if (actualRelative.startsWith('..') || path.isAbsolute(actualRelative)) throw new Error('Candidate resolves outside output')
const course = buildPrimaryCandidate(await loadCourse(candidateDirectory))
const report = await validateCourse(course, { mode: 'development' })
const errors = report.issues.filter(issue => issue.severity === 'error')
if (errors.length) throw new Error(`Candidate validation failed: ${JSON.stringify(errors)}`)
for (const [name, data] of Object.entries(course)) {
  await writeFile(path.join(actual, `${name}.json`), JSON.stringify(data, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
}
console.log(JSON.stringify({ versionId: course.manifest.versionId, contentHash: course.manifest.contentHash, counts: report.counts, releaseReady: report.releaseReady, output: actual }))
