import { realpath, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { loadSidecars } from '../src/modules/phonics/v2/sidecars'
import { buildPrimarySidecars } from './lib/phonicsPrimarySidecars'

const { values } = parseArgs({ options: { 'course-dir': { type: 'string' } } })
if (!values['course-dir']) throw new Error('Provide --course-dir')
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const outputRoot = await realpath(path.join(repo, 'output'))
const directory = await realpath(path.resolve(values['course-dir']))
const relative = path.relative(outputRoot, directory)
if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Candidate must be inside output')
const source = await loadCourse(candidateDirectory)
const sidecars = await loadSidecars(candidateDirectory, source.manifest.versionId, courseHash(source))
const course = await loadCourse(directory)
const result = buildPrimarySidecars(course, sidecars)
await writeFile(path.join(directory, 'lexicon.json'), JSON.stringify(result.lexicon, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
await writeFile(path.join(directory, 'usAudio.json'), JSON.stringify(result.usAudio, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' })
console.log(JSON.stringify({ versionId: course.manifest.versionId, courseHash: courseHash(course), entries: result.lexicon.entries.length, missingExampleAudio: result.lexicon.entries.filter(entry => !entry.example.audio).length, humanReviewed: false }))
