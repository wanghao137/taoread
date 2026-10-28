import { z } from 'zod'

const referenceEntrySchema = z.object({
  id: z.string().min(1), w: z.string().min(1), uk: z.string(), us: z.string(),
  senses: z.array(z.object({ pos: z.string(), zh: z.string(), en: z.string() }).strict()),
  ex: z.array(z.object({ en: z.string(), zh: z.string() }).strict()),
  col: z.array(z.string()), fam: z.array(z.string()), syn: z.array(z.string()), ant: z.array(z.string()), tip: z.string(),
}).passthrough()
export const referenceWordsSchema = z.array(referenceEntrySchema)
type ReferenceEntry = z.infer<typeof referenceEntrySchema>

export function buildWordCandidates(words: Array<{ id: string; text: string; meaningZh: string }>, references: ReferenceEntry[]) {
  const index = new Map<string, ReferenceEntry>()
  const courseWords = new Set(words.map(word => word.text.toLocaleLowerCase('en')))
  for (const entry of references) {
    const key = entry.w.toLocaleLowerCase('en')
    if (index.has(key)) throw new Error(`Duplicate reference headword: ${entry.w}`)
    index.set(key, entry)
  }
  return words.map(word => {
    const source = index.get(word.text.toLocaleLowerCase('en'))
    return {
      id: word.id, word: word.text, courseMeaningZh: word.meaningZh, reviewStatus: 'pending' as const,
      source: source ? { id: source.id, word: source.w, uk: source.uk, us: source.us, senses: source.senses, examples: source.ex.map(example => ({
        ...example, unlistedCourseWords: [...new Set((example.en.match(/[A-Za-z]+(?:['\u2019][A-Za-z]+)*/g) ?? []).map(token => token.toLocaleLowerCase('en')).filter(token => !courseWords.has(token)))],
      })), collocations: source.col, family: source.fam, synonyms: source.syn, antonyms: source.ant, tip: source.tip } : null,
      selectedSense: null, selectedExample: null,
    }
  })
}
