import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { selfUseReady, validateCourse } from '../src/modules/phonics/v2/courseRegistry'
import type { CourseSidecars } from '../src/modules/phonics/v2/sidecars'
import { phonicsFixture } from './phonicsV2Fixture'

describe('phonics example-audio availability', () => {
  it('requires a complete lexicon and verifies the exact sidecar files before self-use', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'phonics-sidecar-media-'))
    try {
      const course = await phonicsFixture(root)
      const original = course.assets.find(asset => asset.purpose === 'word')!
      const directory = path.join(root, 'phonics', course.manifest.versionId)
      const wav = Buffer.from(await readFile(path.join(directory, `${original.sha256}.wav`)))
      wav.writeInt16LE(777, 44)
      const sha256 = createHash('sha256').update(wav).digest('hex')
      const file = path.join(directory, `${sha256}.wav`)
      await writeFile(file, wav)
      const entries = course.words.map(word => ({ wordId: word.id, word: word.text, source: 'taoread-original' as const, reviewStatus: 'pending' as const, ukIpa: '/test/', usIpa: '/test/', senses: [{ pos: 'n.', zh: '测试', en: 'Test.' }], example: { en: `${word.text}.`, zh: '测试。', audio: { sha256, extension: 'wav' as const, durationMs: 100, bytes: wav.length, voice: 'Synthetic test tone' } }, collocations: [], family: [], tip: '', cefr: null }))
      const sidecars: CourseSidecars = { lexicon: { schemaVersion: 1, courseVersionId: course.manifest.versionId, courseContentHash: course.manifest.contentHash!, humanReviewed: false, reviewStatus: 'pending', generatedAt: 'test', sources: {}, counts: { entries: entries.length, wordAtlas: 0, taoreadOriginal: entries.length, exampleAudio: entries.length }, entries }, usAudio: null, problems: [] }
      const inspect = () => validateCourse(course, { mode: 'release', mediaRoot: root, sidecars })
      expect(selfUseReady(await inspect())).toBe(true)
      await writeFile(file, Buffer.from('not the declared audio'))
      const invalid = await inspect()
      expect(invalid.issues.map(issue => issue.code)).toContain('SIDECAR_MEDIA_INVALID')
      expect(selfUseReady(invalid)).toBe(false)
      sidecars.lexicon!.entries[0]!.example.audio = null
      sidecars.lexicon!.entries.pop()
      const incomplete = await inspect()
      expect(incomplete.issues.map(issue => issue.code)).toEqual(expect.arrayContaining(['LEXICON_EXAMPLE_MISSING', 'LEXICON_WORD_MISSING']))
      expect(selfUseReady(incomplete)).toBe(false)
      sidecars.lexicon!.entries[0]!.word = 'wrong'
      expect((await inspect()).issues.map(issue => issue.code)).toContain('LEXICON_WORD_INVALID')
    } finally { await rm(root, { recursive: true, force: true }) }
  }, 60000)
})
