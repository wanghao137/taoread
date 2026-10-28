const normalize = (text: string) => text.normalize('NFKC').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2010-\u2015]/g, '-').replace(/\s/g, ' ')
const same = (a: string, b: string) => normalize(a).toLowerCase() === normalize(b).toLowerCase()

export const typingMatches = (value: string, target: string) => same(value, target)
export const typingLength = (value: string) => Array.from(normalize(value)).length

export function typingDelta(previous: string, next: string, target: string) {
  const before = Array.from(normalize(previous)), after = Array.from(normalize(next)), expected = Array.from(normalize(target))
  let prefix = 0, suffix = 0
  while (prefix < before.length && prefix < after.length && before[prefix] === after[prefix]) prefix++
  while (suffix < before.length - prefix && suffix < after.length - prefix && before[before.length - suffix - 1] === after[after.length - suffix - 1]) suffix++
  const inserted = after.slice(prefix, after.length - suffix)
  return { attempted: inserted.length, correct: inserted.filter((character, index) => same(character, expected[prefix + index] ?? '')).length }
}

export function typingMetrics(correct: number, attempted: number, accepted: number, elapsedMs: number) {
  return { accuracy: attempted ? Math.round(Math.min(correct, attempted) / attempted * 100) : 100, wpm: elapsedMs >= 1000 ? Math.round(accepted / 5 / (elapsedMs / 60000)) : 0 }
}
