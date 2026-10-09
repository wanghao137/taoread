import { ALL_PACKS } from '../src/content/packs/index.js'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

// A chapter-count threshold cannot prove completeness. Compare exact source
// pages where available, and disclose the limits of structural validation.
const evidence = JSON.parse(readFileSync(new URL('./corpus-data/chinese-stories-20261009.json', import.meta.url), 'utf8'))
const failures = []
const ids = new Set()
for (const p of ALL_PACKS) {
  if (ids.has(p.id)) failures.push(`${p.id}: duplicate book id`)
  ids.add(p.id)
  if (!p.chapters.length || !p.rights?.basis || !p.source) failures.push(`${p.id}: missing chapters/provenance`)
  for (const [i, ch] of p.chapters.entries()) {
    if (!ch.title || !ch.blocks.some((b) => (b.kind === 'text' || b.kind === 'poem') && b.text.trim())) failures.push(`${p.id}:${i + 1}: empty body`)
  }
  if (p.lang === 'zh') {
    const scenes = new Map()
    for (const ch of p.chapters) {
      if (ch.art && scenes.has(ch.art) && scenes.get(ch.art) !== ch.artPrompt) failures.push(`${p.id}: different episodes share ${ch.art}`)
      if (ch.art) scenes.set(ch.art, ch.artPrompt)
    }
  }
}
for (const e of evidence) {
  const p = ALL_PACKS.find((p) => p.id === e.id)
  if (!p) { failures.push(`${e.id}: absent from catalog`); continue }
  const pages = p.chapters.flatMap((ch) => ch.blocks.filter((b) => b.kind === 'text').map((b) => b.text))
  const hash = createHash('sha256').update(pages.join('\n\n')).digest('hex')
  if (pages.length !== e.pages || hash !== e.textSha256 || p.rights.basis !== 'cc-by') failures.push(`${e.id}: source pages omitted/changed or license mismatch`)
}
console.log(`结构核验 ${ALL_PACKS.length} 本，其中中文 ${ALL_PACKS.filter((p) => p.lang === 'zh').length} 本；完整中文开放故事 ${evidence.length} 本／${evidence.reduce((n, e) => n + e.pages, 0)} 原文页逐页 SHA256 一致。`)
console.log('古籍/长篇的完整性须对照明确底本；本脚本不以最低章数或结构通过宣称全文精审完成。')
for (const f of failures) console.error(f)
if (failures.length) process.exitCode = 1
