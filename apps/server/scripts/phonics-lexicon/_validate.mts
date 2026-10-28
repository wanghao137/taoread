import { loadCourse, candidateDirectory, validateCourse } from '../../src/modules/phonics/v2/courseRegistry'
const course = await loadCourse(candidateDirectory)
const report = await validateCourse(course, { mode: 'development' })
console.log('complete:', report.complete, 'ok:', report.ok)
const codes: Record<string, number> = {}
for (const i of report.issues) codes[i.code] = (codes[i.code] ?? 0) + 1
console.log('issues:', JSON.stringify(codes))
for (const i of report.issues.filter(i => !['ASSET_PENDING','ASSET_MISSING','ASSET_NOT_VERIFIED','RIGHTS_REVIEW','SPEECH_REVIEW','NOT_REVIEWED','TEACHING_REVIEW','COURSE_HASH'].includes(i.code)).slice(0, 10)) console.log(i.code, i.location, i.message)
