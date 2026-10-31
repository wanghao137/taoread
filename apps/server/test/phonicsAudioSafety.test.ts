import { describe, expect, it } from 'vitest'
import { duplicateTeachingAudio, presentableTask, usableTeachingAudio } from '../src/modules/phonics/v2/audioSafety'
import { candidateDirectory, loadCourse } from '../src/modules/phonics/v2/courseRegistry'
import { applyLearningEvent, initialState, type FrozenPlan } from '../src/modules/phonics/v2/lessonMachine'

describe('phonics misleading audio protection', () => {
  it('suppresses duplicate teaching recordings and presents a whole-word fallback without changing the frozen task', async () => {
    const course = await loadCourse(candidateDirectory)
    const word = course.words.find(item => item.id === 'w-at')!
    const task = course.tasks.find(item => item.id === 'L02-blend-at')!
    expect(duplicateTeachingAudio(course, word, 'segment')).toBe(true)
    expect(duplicateTeachingAudio(course, word, 'blend')).toBe(true)
    const shown = presentableTask(course, task)
    expect(shown).toMatchObject({ skill: 'operation', role: 'practice', instructionZh: '这次先听完整单词，再一起读。', instructionAssetId: word.audioIds.word, stimulusAssetId: undefined, hintAssetIds: [word.audioIds.word], timeline: [] })
    const plan: FrozenPlan = { versionId: course.manifest.versionId, kind: 'lesson', courseHash: 'test', ruleVersion: 'test', lessonKeys: ['L02'], stepTaskIds: [shown.id], tasks: [shown], readers: [] }
    const state = initialState(plan)
    const event = applyLearningEvent(plan, state, { clientEventId: 'test', expectedRevision: 0, taskInstanceId: state.taskInstanceId, kind: 'stimulus_replayed', payload: {} })
    expect(event.result).toMatchObject({ skill: 'operation', evidenceRole: 'practice', assetId: word.audioIds.word })
    expect(task.stimulusAssetId).toBe(word.audioIds.blend)
    const changed = structuredClone(course)
    const asset = changed.assets.find(item => item.id === word.audioIds.blend)!
    asset.sha256 = '0'.repeat(64)
    expect(duplicateTeachingAudio(changed, word, 'blend')).toBe(false)
    expect(usableTeachingAudio(changed, word, 'blend')).toBe(false)
    expect(presentableTask(changed, task).skill).toBe('operation')
    asset.reviewStatus = 'approved'
    changed.reviews.push({ id: 'speech-check', scope: 'speech', targetId: asset.id, targetHash: asset.sha256, decision: 'approved', reviewer: 'test', reviewedAt: 1 })
    expect(usableTeachingAudio(changed, word, 'blend')).toBe(true)
    expect(presentableTask(changed, task)).toBe(task)
    changed.reviews.push({ id: 'speech-reject', scope: 'speech', targetId: asset.id, targetHash: asset.sha256, decision: 'rejected', reviewer: 'test', reviewedAt: 1 })
    expect(usableTeachingAudio(changed, word, 'blend')).toBe(false)
  })

  it('replaces unreviewed segmentation and blending hints with the whole word', async () => {
    const course = await loadCourse(candidateDirectory)
    const word = course.words.find(item => item.id === 'w-mat')!
    const task = course.tasks.find(item => item.id === 'L07-oral-mat')!
    expect(task.hintAssetIds).toContain(word.audioIds.segment)
    expect(presentableTask(course, task).hintAssetIds).toEqual([word.audioIds.word])
  })
})
