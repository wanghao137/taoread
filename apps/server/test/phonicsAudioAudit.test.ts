import { describe, expect, it } from 'vitest'
import { duplicateWordAudio } from '../scripts/lib/phonicsAudioAudit'
import { candidateDirectory, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

describe('phonics word audio audit', () => {
  it('finds duplicate recordings across word, segment and blend without treating missing hashes as duplicates', async () => {
    const course = await loadCourse(candidateDirectory)
    const word = course.words.find(item => item.id === 'w-cat')!
    const assets = course.assets.filter(asset => Object.values(word.audioIds).includes(asset.id))
    expect(duplicateWordAudio({ words: [word], assets })).toEqual(['w-cat'])
    const distinct = structuredClone(assets)
    distinct.forEach((asset, i) => { asset.sha256 = String(i).repeat(64) })
    expect(duplicateWordAudio({ words: [word], assets: distinct })).toEqual([])
    distinct[0]!.sha256 = null; distinct[1]!.sha256 = null
    expect(duplicateWordAudio({ words: [word], assets: distinct })).toEqual([])
  })
})
