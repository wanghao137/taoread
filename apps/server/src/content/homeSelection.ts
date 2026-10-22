import type { BookSummaryDto } from './service'

/** Same reading suggestions as the today page, computed before transferring the shelf. */
export function homeSelection(books: BookSummaryDto[], stage: string) {
  const ongoing = books.filter(b => b.progress > 0 && !b.finished)
  const resume = ongoing.sort((a, b) => (b.lastReadAt ?? '').localeCompare(a.lastReadAt ?? ''))[0] ?? null
  const started = new Set(books.filter(b => b.progress > 0).map(b => b.category))
  const ranked = books.filter(b => b.id !== resume?.id).map(b => ({ b, score:
    (b.progress === 0 ? 2 : 0) + (b.favorite ? 1 : 0) + (b.lang === 'zh' ? 0.5 : 0) +
    (b.finished ? -2 : 0) + (b.difficulty === 'fit' ? 0.5 : 0) + (b.ageStage === stage ? 2 : 0) +
    (b.readingGuidance?.modes.includes(stage === '3-5' ? 'together' : 'self') ? 0.5 : 0) +
    (stage === '3-5' && b.difficulty === 'easy' ? 1 : 0) + (started.has(b.category) ? 0.5 : 0),
  })).sort((a, b) => b.score - a.score)
  const picks: BookSummaryDto[] = []
  for (const { b } of ranked) {
    if (picks.length === 3) break
    if (ranked.length > 3 && picks.some(p => p.category === b.category)) continue
    picks.push(b)
  }
  for (const { b } of ranked) {
    if (picks.length === 3) break
    if (!picks.some(p => p.id === b.id)) picks.push(b)
  }
  return { continueId: resume?.id ?? null, pickIds: picks.map(b => b.id), books: [...(resume ? [resume] : []), ...picks] }
}
