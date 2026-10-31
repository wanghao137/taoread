import { beforeAll, describe, expect, it } from 'vitest'
import { candidateDirectory, loadCourse, publicTask, validateCourse } from '../src/modules/phonics/v2/courseRegistry'
import { taskTarget, type PhonicsCourse } from '../src/modules/phonics/v2/contracts'
import { reviewTasks } from '../src/modules/phonics/v2/review'

let original: PhonicsCourse
beforeAll(async () => { original = await loadCourse(candidateDirectory) })

function courseWithLetter() {
  const course = structuredClone(original)
  const sample = course.tasks[0]!
  const audio = { ...course.assets[0]!, id: 'letter-name-s', purpose: 'letter_name' as const }
  const model = { ...sample, id: 'letter-s-model', skill: 'letter_name' as const, letterName: 'S', mappingId: undefined, displayText: 'S s', stimulusAssetId: audio.id, teachesCapitals: ['S'] }
  const choice = { ...model, id: 'letter-s-choice', kind: 'choice' as const, role: 'practice' as const, displayText: undefined, teachesCapitals: [], choices: [{ id: 's', label: 'S' }, { id: 'a', label: 'A' }], judge: { answerIds: ['s'] } }
  course.assets.push(audio); course.manifest.assetIds.push(audio.id)
  course.tasks.push(model, choice)
  course.lessons[0]!.capitals.push('S')
  course.lessons[0]!.taskIds.unshift(model.id, choice.id)
  return { course, model, choice }
}

describe('letter names are distinct from phonics sounds', () => {
  it('records and reviews letter-name practice separately from the sound mapping', async () => {
    const { course, choice } = courseWithLetter()
    const report = await validateCourse(course, { mode: 'development' })
    expect(report.issues.filter(issue => issue.severity === 'error')).toEqual([])
    expect(taskTarget(choice)).toBe('letter-s')
    expect(taskTarget(course.tasks.find(task => task.id === 'L01-hear-s')!)).toBe('g-s')
    expect(reviewTasks(course, ['L01'], ['letter-s']).map(task => task.id)).toEqual([choice.id])
    expect(publicTask(choice)).not.toHaveProperty('letterName')
  })

  it('rejects a sound recording or a wrong choice used as a letter name', async () => {
    const { course, model, choice } = courseWithLetter()
    model.stimulusAssetId = 'sound-s'
    choice.judge!.answerIds = ['a']
    const codes = (await validateCourse(course, { mode: 'development' })).issues.map(issue => issue.code)
    expect(codes).toEqual(expect.arrayContaining(['LETTER_AUDIO', 'LETTER_CHOICE']))
  })
})
