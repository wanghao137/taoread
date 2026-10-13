/** Same text normalization as the imported reader's offset accounting. */
export function anchorText(text: string): string {
  return text.replace(/\[\[img:[^\]]+\]\]/g, '').split('\n').map(line => line.trim()).filter(Boolean).join('\n')
}

/** Only relocate to a unique text match; ambiguous or deleted text needs reader confirmation. */
export function relocateAnchor(oldText: string, offset: number, chapters: Array<{ text: string }>): { order: number; offset: number } | null {
  const old = anchorText(oldText)
  const start = Math.max(0, Math.min(offset, Math.max(0, old.length - 1)))
  const anchorStart = Math.max(0, start - 30)
  const anchor = old.slice(anchorStart, start + 50)
  if (!anchor) return null
  const matches: Array<{ order: number; offset: number }> = []
  chapters.forEach((chapter, index) => {
    const text = anchorText(chapter.text)
    let at = text.indexOf(anchor)
    while (at >= 0) {
      matches.push({ order: index + 1, offset: at + start - anchorStart })
      at = text.indexOf(anchor, at + 1)
    }
  })
  return matches.length === 1 ? matches[0]! : null
}
