import { courseHash } from '../../src/modules/phonics/v2/courseRegistry'
import { lexiconSchema, usAudioSchema, type CourseSidecars } from '../../src/modules/phonics/v2/sidecars'
import type { PhonicsCourse } from '../../src/modules/phonics/v2/contracts'
import { primaryLexicon } from './phonicsPrimaryLexicon'

export function buildPrimarySidecars(course: PhonicsCourse, source: CourseSidecars) {
  if (!source.lexicon || !source.usAudio || source.problems.length) throw new Error('Source sidecars are incomplete')
  const previous = new Set(source.lexicon.entries.map(entry => entry.wordId))
  if (previous.size !== source.lexicon.entries.length || source.lexicon.entries.some(entry => !course.words.some(word => word.id === entry.wordId && word.text === entry.word))) throw new Error('Source lexicon does not match the candidate')
  const additions = course.words.filter(word => !previous.has(word.id))
  if (additions.length !== Object.keys(primaryLexicon).length || additions.some(word => !primaryLexicon[word.text])) throw new Error('Primary lexicon does not match the new words')
  const entries = [...structuredClone(source.lexicon.entries), ...additions.map(word => {
    const item = primaryLexicon[word.text]!
    if (!new RegExp(`\\b${word.text}\\b`, 'i').test(item.en)) throw new Error(`Example does not contain ${word.text}`)
    return { wordId: word.id, word: word.text, source: 'taoread-original' as const, reviewStatus: 'pending' as const, ukIpa: item.ukIpa, usIpa: item.usIpa, senses: [{ pos: item.pos, zh: word.meaningZh, en: item.definition }], example: { en: item.en, zh: item.zh, audio: null }, collocations: [], family: [], tip: '', cefr: null }
  })]
  const hash = courseHash(course)
  const lexicon = lexiconSchema.parse({ ...source.lexicon, courseVersionId: course.manifest.versionId, courseContentHash: hash, generatedAt: new Date().toISOString(), sources: { ...source.lexicon.sources, primary: 'Original examples for the primary phonics candidate; review pending.' }, entries, counts: { entries: entries.length, wordAtlas: entries.filter(entry => entry.source === 'word-atlas').length, taoreadOriginal: entries.filter(entry => entry.source === 'taoread-original').length, exampleAudio: entries.filter(entry => entry.example.audio).length } })
  const usAudio = usAudioSchema.parse({ ...source.usAudio, courseVersionId: course.manifest.versionId, courseHash: hash })
  return { lexicon, usAudio }
}
