import { beforeAll, describe, expect, it } from 'vitest'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { candidateDirectory, canonicalJson, courseHash, loadCourse, publicTask, validateCourse } from '../src/modules/phonics/v2/courseRegistry'
import type { PhonicsCourse } from '../src/modules/phonics/v2/contracts'

let original: PhonicsCourse
beforeAll(async () => { original = await loadCourse(candidateDirectory) })
const copy = () => structuredClone(original)
const inspect = (c: unknown) => validateCourse(c, { mode: 'development' })
const codes = async (c: unknown) => (await inspect(c)).issues.filter(i => i.severity === 'error').map(i => i.code)

describe('phonics v2 content gates', () => {
  it('has the full foundation candidate course while truthfully refusing release', async () => {
    const report = await inspect(original)
    expect(report).toMatchObject({ complete: true, ok: true, releaseReady: false, counts: { lessons: 61, words: 166, tasks: 588, verifiedAssets: 0 } })
    const release = await validateCourse(original, { mode: 'release' })
    expect(release.ok).toBe(false)
    expect(release.issues.map(i => i.code)).toEqual(expect.arrayContaining(['NOT_REVIEWED', 'TEACHING_REVIEW', 'ASSET_PENDING', 'ASSET_NOT_VERIFIED']))
  })
  it('rejects unknown schema fields instead of dropping private/unsupported data', async () => {
    expect(await codes({ ...copy(), hiddenField: true })).toContain('SCHEMA')
  })
  it('hashes canonical content independently of key order and approval timestamps', () => {
    expect(canonicalJson({ z: 1, a: [2, 3] })).toBe(canonicalJson({ a: [2, 3], z: 1 }))
    const c = copy(); c.manifest.contentHash = 'a'.repeat(64); c.manifest.status = 'reviewed'
    expect(courseHash(c)).toBe(courseHash(original))
    c.tasks[0]!.instructionZh += 'Changed'
    expect(courseHash(c)).not.toBe(courseHash(original))
  })
  it('strips answers, future hints and internal choices metadata from the public DTO', () => {
    const task = original.tasks.find(t => t.judge)!
    const dto = publicTask(task)
    expect(dto).not.toHaveProperty('judge')
    expect(dto).not.toHaveProperty('hintAssetIds')
    expect(dto.choices[0]).not.toHaveProperty('mappingId')
  })
  it('rejects duplicate IDs, missing manifest entries and cyclic prerequisites', async () => {
    const c = copy(); c.tasks.push(c.tasks[0]!); c.manifest.assetIds.pop(); c.lessons[0]!.prerequisites = ['L08']
    expect(await codes(c)).toEqual(expect.arrayContaining(['DUPLICATE_ID', 'MANIFEST_INDEX', 'PREREQUISITE_CYCLE']))
  })
  it('rejects the historical untaught m distractor in L06', async () => {
    const c = copy(); c.tasks.find(t => t.id === 'L06-hear-n')!.choices.push({ id: 'm', label: 'm', mappingId: 'g-m' })
    expect(await codes(c)).toContain('UNTAUGHT_DISTRACTOR')
  })
  it('requires capital instruction before use, including within a lesson', async () => {
    const c = copy(); const lesson = c.lessons[6]!; const capital = lesson.taskIds.indexOf('L07-capital-S')
    lesson.taskIds.splice(capital, 1); lesson.taskIds.push('L07-capital-S')
    expect(await codes(c)).toContain('CAPITAL_STEP_ORDER')
    c.lessons[6]!.capitals = []
    expect(await codes(c)).toContain('UNTAUGHT_CAPITAL')
  })
  it('requires exact reader tokens, case and introduced punctuation', async () => {
    const c = copy(); c.readers[0]!.pages[0]!.text = 'At!'
    expect(await codes(c)).toEqual(expect.arrayContaining(['READER_TOKENS', 'UNTAUGHT_PUNCTUATION']))
  })
  it('detects uncovered, overlapping and incorrect grapheme spans', async () => {
    const c = copy(); c.words[0]!.spans[0]!.ranges = [[0, 2]]
    expect(await codes(c)).toEqual(expect.arrayContaining(['WORD_COVERAGE', 'SPELLING_MISMATCH']))
  })
  it('allows a split digraph structure without equating letters and sounds', async () => {
    const c = copy(); c.mappings.push({ id: 'g-ae', spelling: 'ae', display: 'a_e', phonemes: [{ ipa: 'eɪ', kind: 'vowel' }], accent: 'GB', positionCondition: 'any' })
    c.lessons[7]!.newMappingIds.push('g-ae')
    c.words[15] = { ...c.words[15]!, text: 'tape', decodingIntroducedAt: 'L08', spans: [{ ranges: [[0, 1]], mappingId: 'g-t' }, { ranges: [[1, 2], [3, 4]], mappingId: 'g-ae' }, { ranges: [[2, 3]], mappingId: 'g-p' }] }
    c.tasks.find(t => t.id === 'L08-oral-tip')!.displayText = 'tape'
    expect(await codes(c)).not.toEqual(expect.arrayContaining(['WORD_COVERAGE', 'SPELLING_MISMATCH', 'UNTREATED_WORD_SHAPE']))
  })
  it('treats x as multiple phonemes and checks consonant-cluster readiness', async () => {
    const c = copy(); c.mappings.push({ id: 'g-x', spelling: 'x', display: 'x', phonemes: [{ ipa: 'k', kind: 'consonant' }, { ipa: 's', kind: 'consonant' }], accent: 'GB', positionCondition: 'any' })
    c.lessons[7]!.newMappingIds.push('g-x')
    c.words[15] = { ...c.words[15]!, text: 'six', decodingIntroducedAt: 'L08', spans: [{ ranges: [[0, 1]], mappingId: 'g-s' }, { ranges: [[1, 2]], mappingId: 'g-i' }, { ranges: [[2, 3]], mappingId: 'g-x' }] }
    c.tasks.find(t => t.id === 'L08-oral-tip')!.displayText = 'six'
    expect(await codes(c)).toContain('UNTREATED_WORD_SHAPE')
    c.lessons[7]!.allowedShapes.push('CVCC')
    expect(await codes(c)).not.toContain('UNTREATED_WORD_SHAPE')
  })
  it('does not waive unknown spelling with an unintroduced exception', async () => {
    const c = copy(); c.words[0]!.spans[0] = { ranges: [[0, 1]], exception: { id: 'ex-a', taughtAt: 'L07', phonemeShape: 'V' } }
    expect(await codes(c)).toContain('UNTAUGHT_EXCEPTION')
  })
  it('refuses answer exposure and rehearsed words described as independent', async () => {
    const c = copy(); const task = c.tasks.find(t => t.id === 'L07-oral-mat')!; task.role = 'independent'
    task.stimulusAssetId = 'w-mat-word'
    expect(await codes(c)).toEqual(expect.arrayContaining(['ANSWER_EXPOSURE', 'REHEARSED_INDEPENDENT_WORD']))
  })
  it('checks judge answers, spelling tiles, audio purpose and timelines', async () => {
    const c = copy(); const task = c.tasks.find(t => t.kind === 'build')!
    task.judge!.answerIds = ['unknown']; task.instructionAssetId = 'sound-s'
    task.timeline = [{ atMs: 20, endMs: 10, text: 's' }]
    expect(await codes(c)).toEqual(expect.arrayContaining(['INVALID_ANSWER', 'BUILD_SPELLING', 'ASSET_PURPOSE', 'TIMELINE']))
  })
  it('blocks publication of duplicate word, segmentation and blending recordings', async () => {
    const c = copy()
    const originalReport = await inspect(c)
    expect(originalReport.issues).toContainEqual(expect.objectContaining({ code: 'AUDIO_DUPLICATE', location: 'w-cat', severity: 'warning' }))
    const word = c.words.find(item => item.id === 'w-cat')!
    c.assets.find(asset => asset.id === word.audioIds.segment)!.sha256 = 'a'.repeat(64)
    c.assets.find(asset => asset.id === word.audioIds.blend)!.sha256 = 'b'.repeat(64)
    expect((await inspect(c)).issues).not.toContainEqual(expect.objectContaining({ code: 'AUDIO_DUPLICATE', location: 'w-cat' }))
    expect((await validateCourse(original, { mode: 'release' })).issues).toContainEqual(expect.objectContaining({ code: 'AUDIO_DUPLICATE', location: 'w-cat', severity: 'error' }))
  })
  it('requires same-target easier tasks and prevents correction loops', async () => {
    const c = copy(); const task = c.tasks[0]!; task.easierTaskId = task.id
    expect(await codes(c)).toContain('EASIER_CYCLE')
    task.easierTaskId = 'unknown'
    expect(await codes(c)).toContain('EASIER_TARGET')
  })
  it('fixture flags and stale approval hashes cannot pass release', async () => {
    const c = copy(); c.manifest.fixture = true; c.manifest.status = 'reviewed'; c.manifest.contentHash = courseHash(c)
    c.reviews.push({ id: 'teaching-test', targetId: c.manifest.versionId, targetHash: '0'.repeat(64), scope: 'teaching', decision: 'approved', reviewer: 'Synthetic test only', reviewedAt: 1 })
    const report = await validateCourse(c, { mode: 'release' })
    expect(report.issues.map(i => i.code)).toEqual(expect.arrayContaining(['FIXTURE', 'TEACHING_REVIEW']))
  })
  it('checks actual files and rejects same-name tampering without trusting metadata', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'tao-phonics-media-'))
    try {
      const c = copy(), asset = c.assets[0]!
      const wav = Buffer.alloc(60); wav.write('RIFF', 0); wav.write('WAVE', 8)
      asset.extension = 'wav'
      asset.sha256 = createHash('sha256').update(wav).digest('hex')
      const dir = path.join(root, 'phonics', c.manifest.versionId); await mkdir(dir, { recursive: true })
      const file = path.join(dir, `${asset.sha256}.wav`); await writeFile(file, wav)
      expect((await validateCourse(c, { mode: 'development', mediaRoot: root })).counts.verifiedAssets).toBe(1)
      await writeFile(file, 'not audio')
      expect((await validateCourse(c, { mode: 'development', mediaRoot: root })).issues.map(i => i.code)).toContain('ASSET_HASH')
    } finally { await rm(root, { recursive: true, force: true }) }
  })
})
