import type { PhonicsCourse } from '../../src/modules/phonics/v2/contracts'

export function duplicateWordAudio(course: Pick<PhonicsCourse, 'assets' | 'words'>): string[] {
  const assets = new Map(course.assets.map(asset => [asset.id, asset]))
  return course.words.filter(word => {
    const hashes = Object.values(word.audioIds).map(id => assets.get(id)?.sha256).filter((hash): hash is string => Boolean(hash))
    return new Set(hashes).size !== hashes.length
  }).map(word => word.id)
}
