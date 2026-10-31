import type { PhonicsCourse, PhonicsTask } from './contracts'

type Word = PhonicsCourse['words'][number]

export function duplicateTeachingAudio(course: PhonicsCourse, word: Word, kind: 'segment' | 'blend'): boolean {
  const id = word.audioIds[kind]
  const hash = course.assets.find(asset => asset.id === id)?.sha256
  if (!hash) return false
  return Object.values(word.audioIds).some(otherId => otherId !== id && course.assets.find(asset => asset.id === otherId)?.sha256 === hash)
}

export function usableTeachingAudio(course: PhonicsCourse, word: Word, kind: 'segment' | 'blend'): boolean {
  const asset = course.assets.find(item => item.id === word.audioIds[kind])
  if (!asset?.sha256 || asset.reviewStatus !== 'approved' || duplicateTeachingAudio(course, word, kind)) return false
  const reviews = course.reviews.filter(review => review.scope === 'speech' && review.targetId === asset.id && review.targetHash === asset.sha256)
  const latest = Math.max(0, ...reviews.map(review => review.reviewedAt))
  return latest > 0 && reviews.filter(review => review.reviewedAt === latest).every(review => review.decision === 'approved')
}

export function presentableTask(course: PhonicsCourse | undefined, task: PhonicsTask): PhonicsTask {
  const word = course?.words.find(item => item.id === task.wordId)
  if (!course || !word) return task
  if (task.kind === 'listen' && task.skill === 'blend' && task.stimulusAssetId === word.audioIds.blend && !usableTeachingAudio(course, word, 'blend')) {
    return { ...task, skill: 'operation', role: 'practice', instructionZh: '这次先听完整单词，再一起读。', instructionAssetId: word.audioIds.word, stimulusAssetId: undefined, hintAssetIds: [word.audioIds.word], timeline: [] }
  }
  const hints = task.hintAssetIds.map(id => {
    const kind = (['segment', 'blend'] as const).find(item => word.audioIds[item] === id)
    return kind && !usableTeachingAudio(course, word, kind) ? word.audioIds.word : id
  })
  const unique = [...new Set(hints)]
  return unique.length === task.hintAssetIds.length && unique.every((id, index) => id === task.hintAssetIds[index]) ? task : { ...task, hintAssetIds: unique }
}
