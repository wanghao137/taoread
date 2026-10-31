import { candidateDirectory, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { duplicateWordAudio } from './lib/phonicsAudioAudit'

const course = await loadCourse(candidateDirectory)
const duplicates = duplicateWordAudio(course)
console.log(JSON.stringify({ words: course.words.length, duplicateWords: duplicates.length, wordIds: duplicates }))
if (duplicates.length) process.exitCode = 1
