/** Reference material for review only; never changes an installed course or release gate. */
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFile, realpath, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs, promisify } from 'node:util'
import { candidateDirectory, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { buildWordCandidates, referenceWordsSchema } from './lib/phonicsWordCandidates'

const sourceUrl = 'https://raw.githubusercontent.com/designfuchen/word-atlas/99c007673d38f02c418d8e4cd2e9ec90b5d40be5/data/word-atlas.json'
const expectedHash = 'e4e3410809047711cd2a25fccafcebb46124ce1eeb98829dc12de0335de71234'
const { values } = parseArgs({ options: { source: { type: 'string' }, download: { type: 'boolean' }, out: { type: 'string' } } })
if (!values.out || Boolean(values.source) === Boolean(values.download)) throw new Error('Provide --out and exactly one of --source or --download')
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const outputRoot = await realpath(path.join(repo, 'output'))
const outputPath = path.resolve(values.out)
const parent = await realpath(path.dirname(outputPath))
const relative = path.relative(outputRoot, parent)
if (relative.startsWith('..') || path.isAbsolute(relative) || path.extname(outputPath).toLowerCase() !== '.json') throw new Error('Output must be a JSON file under the workspace output directory')
const bytes = values.source ? await readFile(path.resolve(values.source)) : (await promisify(execFile)('curl', ['-L', '--fail', '--silent', '--show-error', '--max-time', '90', sourceUrl], { encoding: 'buffer', maxBuffer: 12 * 1024 * 1024 })).stdout
if (createHash('sha256').update(bytes).digest('hex') !== expectedHash) throw new Error('Reference dataset hash differs from the pinned version')
const references = referenceWordsSchema.parse(JSON.parse(bytes.toString('utf8')))
const course = await loadCourse(candidateDirectory)
const candidates = buildWordCandidates(course.words, references)
const matched = candidates.filter(item => item.source).length
const firstExampleWithinCourseVocabulary = candidates.filter(item => item.source?.examples[0] && item.source.examples[0].unlistedCourseWords.length === 0).length
const output = {
  schemaVersion: 1, generatedAt: new Date().toISOString(), courseVersionId: course.manifest.versionId, courseContentHash: course.manifest.contentHash,
  source: { url: sourceUrl, sha256: expectedHash, attribution: 'Word Atlas contributors', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', changes: 'Selected exact headword matches and extracted fields for review.' },
  publicationApproved: false, reviewStatus: 'pending', vocabularyCoverageNote: 'Exact headword comparison only; it is not a phonics decodability or quality review.',
  counts: { words: candidates.length, matched, missing: candidates.length - matched, firstExampleWithinCourseVocabulary }, candidates,
}
await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
console.log(JSON.stringify({ output: outputPath, ...output.counts, publicationApproved: false }))
