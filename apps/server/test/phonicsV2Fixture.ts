/** Synthetic tones/approval metadata exercise protocol gates, never English quality. */
import { createHash, randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { candidateDirectory, courseHash, loadCourse } from '../src/modules/phonics/v2/courseRegistry'

export async function phonicsFixture(mediaRoot: string) {
  const course = await loadCourse(candidateDirectory)
  const version = `test-phonics-${randomUUID().slice(0, 8)}`
  const taskIds = ['L07-capital-S', 'L07-model-m', 'L07-hear-m', 'L07-build-map', 'L07-oral-mat', 'L07-read']
  course.lessons = [{ ...course.lessons[6]!, order: 1, prerequisites: [], newMappingIds: course.mappings.map(m => m.id), taskIds }]
  course.words = course.words.filter(w => ['w-map', 'w-mat', 'w-sam', 'w-sat'].includes(w.id)).map(w => ({ ...w, meaningIntroducedAt: 'L07', decodingIntroducedAt: 'L07' }))
  course.tasks = course.tasks.filter(t => taskIds.includes(t.id))
  course.readers = course.readers.filter(r => r.id === 'r-l07')
  course.readers[0]!.pages.push(structuredClone(course.readers[0]!.pages[0]!))
  course.entryPlans = []
  const needed = new Set([
    ...course.tasks.flatMap(t => [t.instructionAssetId, ...(t.stimulusAssetId ? [t.stimulusAssetId] : []), ...t.hintAssetIds]),
    ...course.words.flatMap(w => Object.values(w.audioIds)),
    ...course.readers.flatMap(r => r.pages.flatMap(p => [p.audioAssetId, ...(p.imageAssetId ? [p.imageAssetId] : [])])),
  ])
  course.assets = course.assets.filter(a => needed.has(a.id))
  // A short real PCM container for browser/Range tests. It does not contain speech.
  const pcmLength = 1600, wav = Buffer.alloc(44 + pcmLength * 2)
  wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8)
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22)
  wav.writeUInt32LE(16000, 24); wav.writeUInt32LE(32000, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34)
  wav.write('data', 36); wav.writeUInt32LE(pcmLength * 2, 40)
  for (let i = 0; i < pcmLength; i++) wav.writeInt16LE(Math.round(300 * Math.sin(2 * Math.PI * 220 * i / 16000)), 44 + i * 2)
  const image = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j8ioAAAAASUVORK5CYII=', 'base64')
  const dir = path.join(mediaRoot, 'phonics', version)
  await mkdir(dir, { recursive: true })
  for (const asset of course.assets) {
    const bytes = asset.purpose === 'image' ? image : wav
    asset.sha256 = createHash('sha256').update(bytes).digest('hex')
    asset.extension = asset.purpose === 'image' ? 'png' : 'wav'
    asset.durationMs = asset.purpose === 'image' ? null : 100
    asset.speakerId = asset.purpose === 'image' ? null : 'synthetic-test-tone'
    asset.sourceLicense = 'Test-generated data only'
    asset.reviewStatus = 'approved'
    await writeFile(path.join(dir, `${asset.sha256}.${asset.extension}`), bytes)
  }
  course.manifest = { ...course.manifest, courseId: version, versionId: version, status: 'reviewed', fixture: false, contentHash: null, lessonKeys: ['L07'], entryPlanKeys: [], assetIds: course.assets.map(a => a.id) }
  const stamp = 100
  course.reviews = course.assets.flatMap(asset => (asset.purpose === 'image' ? ['rights'] as const : ['rights', 'speech'] as const).map(scope => ({ id: `${scope}-${asset.id}`, scope, targetId: asset.id, targetHash: asset.sha256!, decision: 'approved' as const, reviewer: 'Synthetic test approval - not production signoff', reviewedAt: stamp })))
  course.manifest.contentHash = courseHash(course)
  course.reviews.push({ id: 'teaching-test', scope: 'teaching', targetId: version, targetHash: course.manifest.contentHash, decision: 'approved', reviewer: 'Synthetic test approval - not production signoff', reviewedAt: stamp })
  return course
}
