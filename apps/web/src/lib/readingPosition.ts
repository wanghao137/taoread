/** Audio timelines count code points; source and DOM ranges use UTF-16 offsets. */
export function codePointToUtf16Offset(text: string, index: number): number {
  let offset = 0
  let count = 0
  for (const ch of text) {
    if (count++ >= index) break
    offset += ch.length
  }
  return offset
}

/** Locate only the spoken text, excluding ruby annotations and supporting UI. */
export function readingRange(block: HTMLElement, offset: number): Range | null {
  const source = block.querySelector<HTMLElement>('[data-reading-text]') ?? block
  const annotated = source.querySelectorAll<HTMLElement>('[data-reading-offset]')
  let target: Node = source
  let remaining = Math.max(0, offset)
  if (annotated.length) {
    let character = annotated[0]!
    for (const el of annotated) {
      if (Number(el.dataset.readingOffset) > offset) break
      character = el
    }
    target = character
    remaining = 0
  }
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
    acceptNode: node => node.parentElement?.closest('rt, rp, svg, [data-reading-ignore]')
      ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  })
  let node = walker.nextNode()
  while (node) {
    const length = node.textContent?.length ?? 0
    if (remaining < length) {
      const range = document.createRange()
      range.setStart(node, remaining)
      const char = node.textContent?.codePointAt(remaining) ?? 0
      range.setEnd(node, Math.min(length, remaining + (char > 0xffff ? 2 : 1)))
      return range
    }
    remaining -= length
    node = walker.nextNode()
  }
  return null
}
