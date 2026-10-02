import { ALL_PACKS } from '../src/content/packs'
import { countWords, packContentVersion } from '../src/content/seed'
import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'

const ids = new Set<string>()
const texts = new Map<string, string>()
const issues: Array<{ book: string; chapter?: number; block?: number; severity: 'error' | 'review'; code: string }> = []
for (const book of ALL_PACKS) {
  if (ids.has(book.id)) issues.push({ book: book.id, severity: 'error', code: 'duplicate-id' })
  ids.add(book.id)
  if (!book.chapters.length || !book.source || !book.rights.workTitle) issues.push({ book: book.id, severity: 'error', code: 'missing-structure-or-rights' })
  if (book.rights.basis === 'cc-by' && !book.rights.sourceUrl) issues.push({ book: book.id, severity: 'review', code: 'license-source-needed' })
  book.chapters.forEach((chapter, ci) => {
    if (!chapter.title || !chapter.blocks.length) issues.push({ book: book.id, chapter: ci + 1, severity: 'error', code: 'empty-chapter' })
    chapter.blocks.forEach((block, bi) => {
      const location = { book: book.id, chapter: ci + 1, block: bi + 1 }
      if (!block.text.trim() && block.kind !== 'image') issues.push({ ...location, severity: 'error', code: 'empty-text' })
      if (block.pinyin) {
        const letters = [...block.text].filter((c) => /\p{Script=Han}/u.test(c)).length
        const syllables = block.pinyin.trim().split(/\s+/).length
        if (letters !== syllables) issues.push({ ...location, severity: 'review', code: 'pinyin-alignment' })
      }
      if ((block.kind === 'text' || block.kind === 'poem') && block.text.length > 80) {
        const hash = createHash('sha256').update(block.text.replace(/\s+/g, '')).digest('hex')
        if (texts.has(hash)) issues.push({ ...location, severity: 'review', code: `duplicate-text:${texts.get(hash)}` })
        else texts.set(hash, `${book.id}:${ci + 1}:${bi + 1}`)
      }
    })
  })
}
const report = { schemaVersion: 1, generatedAt: new Date().toISOString(), humanReview: 'pending',
  books: ALL_PACKS.map((b) => ({ id: b.id, chapters: b.chapters.length, words: countWords(b), basis: b.rights.basis, source: b.source,
    version: packContentVersion(b) })), issues }
const output = process.argv[2]
if (output) writeFileSync(output, JSON.stringify(report, null, 2))
console.log(JSON.stringify({ books: report.books.length, chapters: report.books.reduce((n, b) => n + b.chapters, 0), errors: issues.filter((i) => i.severity === 'error').length, reviewCandidates: issues.filter((i) => i.severity === 'review').length, humanReview: 'pending' }))
if (issues.some((i) => i.severity === 'error')) process.exitCode = 1
