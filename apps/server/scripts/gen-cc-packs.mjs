/**
 * CC-BY 绘本批量转换（docs/25）：把 global-asp/asp-source 的英文故事 md
 * 转成桃阅读内容包 .ts 文件。
 * 只收 License: [CC-BY]（CC-BY-NC 非商业授权一律排除——App 有商业性质）。
 * 用法：node scripts/gen-cc-packs.mjs <asp-source-en-dir> <out-dir> [limit]
 */
import fs from 'node:fs'
import path from 'node:path'

const SRC = process.argv[2]
const LIMIT = Number(process.argv[3] ?? 22)
const OUT = process.argv[4] ?? path.join(process.cwd(), 'src/content/packs')

if (!SRC) { console.error('usage: node scripts/gen-cc-packs.mjs <asp-en-dir> [out-dir] [limit]'); process.exit(1) }

/* ── 解析 md ── */
function parseStory(md, file) {
  const meta = {}
  const lines = md.split('\n')
  const metaIdx = lines.findIndex((l) => l.includes('License:'))
  if (metaIdx === -1) return null
  for (let i = metaIdx; i < lines.length; i++) {
    const m = lines[i].match(/^\*\s*(License|Text|Illustration|Language|Reviewer|Translator)\s*:\s*(.+?)\s*$/)
    if (m) meta[m[1].toLowerCase()] = m[2].replace(/\[|\]|\(.*?\)/g, '').trim()
  }
  if (!/CC-?BY\s*$/.test(meta.license ?? '')) return null // 排除 -NC / -SA

  const title = lines[0]?.replace(/^#\s*/, '').trim()
  if (!title) return null

  const body = lines.slice(1, metaIdx).join('\n')
  const pages = body.split(/\n##\s*\n/).map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean)
  if (pages.length < 6) return null // 太薄的认知卡不成书
  const words = pages.join(' ').split(/\s+/).length
  if (words < 120 || words > 500) return null
  return { file, title, pages, words, meta }
}

/* ── 柔和封面色板（交替取用） ── */
const PALETTE = [
  ['#4FC3F7', '#F8BBD0'], ['#81C784', '#FFF59D'], ['#BA68C8', '#80DEEA'],
  ['#FFB74D', '#A5D6A7'], ['#7986CB', '#F48FB1'], ['#4DB6AC', '#FFE082'],
  ['#F06292', '#B39DDB'], ['#A1887F', '#C5E1A5'], ['#64B5F6', '#FFCC80'],
  ['#9575CD', '#F8BBD0'],
]

/* ── note 模板池（亲子引导轮换） ── */
const NOTES = [
  'What do you think happens next? Guess before you turn the page!',
  'Talk about it: which part of the story did you like best?',
  'Look at the picture together. What can you see?',
  'Fun idea: act out this page together, just like the story.',
  'Have you ever seen something like this? Tell each other!',
  'Quiet question: how do you think the character feels here?',
  'Say the words on this page out loud, nice and slowly.',
  'Before the next page, make up your own ending together!',
]
const STYLE = 'soft warm children\'s picture-book illustration, friendly characters, gentle pastel colors, clean composition'

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.md')).sort()
const stories = []
for (const f of files) {
  const s = parseStory(fs.readFileSync(path.join(SRC, f), 'utf8'), f)
  if (s) stories.push(s)
}
console.log(`候选 CC-BY 故事：${stories.length} / 总 ${files.length}`)

/* 质量优先排序：中等长度、非高频模板文（有无故事情节大致按词数居中） */
stories.sort((a, b) => Math.abs(a.words - 280) - Math.abs(b.words - 280))
const picked = stories.slice(0, LIMIT)
const slugOf = (s) => s.file.replace(/^\d+_/, '').replace(/\.md$/, '').replace(/[^a-z0-9-]/g, '-')
const idOf = (s) => `cc-${slugOf(s)}`
const esc = (t) => JSON.stringify(t) // JSON 字面量 = 合法 TS 字符串

let written = 0
const manifest = []
picked.forEach((s, idx) => {
  const id = idOf(s)
  const prefix = `asb${String(idx + 1).padStart(3, '0')}`
  const [from, to] = PALETTE[idx % PALETTE.length]

  // 页 → 章：每 3 页一章
  const chapters = []
  for (let c = 0; c * 3 < s.pages.length; c++) {
    const chunk = s.pages.slice(c * 3, c * 3 + 3)
    const art = `${prefix}-ch${c + 1}`
    const blocks = []
    chunk.forEach((pageText) => {
      blocks.push({ kind: 'text', text: pageText })
    })
    blocks.push({ kind: 'image', art, text: chunk[0]?.split(/[.!?]/)[0]?.slice(0, 80) || s.title })
    blocks.push({ kind: 'note', text: NOTES[(c + idx) % NOTES.length], art: 'lamp-hint' })
    const sceneWords = chunk.join(' ').split(/\s+/).slice(0, 22).join(' ')
    chapters.push({
      title: `Pages ${c * 3 + 1}–${c * 3 + chunk.length}`,
      art,
      artPrompt: `${sceneWords}. ${STYLE}`,
      blocks,
    })
  }

  const credit = [s.meta.text, s.meta.illustration].filter(Boolean).join('; illustrator ')
  const ts = `import type { PackBook } from '../types'

/**
 * ${s.title} — African Storybook Project, CC-BY.
 * Source: global-asp/asp-source (en/${s.file}); credits kept in rights ledger.
 * Pages lightly re-flowed for the reader layout; story text unaltered.
 */
export const ${camelOf(s)}: PackBook = {
  id: ${esc(id)},
  title: ${esc(s.title)},
  author: ${esc(s.meta.text || 'African Storybook Project')},
  lang: 'en',
  category: 'tale',
  ageStage: '3-5',
  intro: ${esc(s.pages[0]?.slice(0, 140) ?? s.title)},
  coverArt: ${esc(`${prefix}-cover`)},
  coverArtPrompt: ${esc(`${s.pages[0]?.slice(0, 60) ?? s.title}. ${STYLE}`)},
  coverFrom: ${esc(from)},
  coverTo: ${esc(to)},
  source: ${esc(`African Storybook Project (CC-BY): en/${s.file}, global-asp/asp-source`)},
  chapters: ${JSON.stringify(chapters, null, 2)
    .replace(/"kind": "text"/g, "kind: 'text'")
    .replace(/"kind": "image"/g, "kind: 'image'")
    .replace(/"kind": "note"/g, "kind: 'note'")
    .replace(/"art":/g, 'art:')
    .replace(/"text":/g, 'text:')
    .replace(/"title":/g, 'title:')
    .replace(/"artPrompt":/g, 'artPrompt:')
    .replace(/"blocks":/g, 'blocks:')},
  rights: {
    workTitle: ${esc(s.title)},
    author: ${esc(s.meta.text || 'see note')},
    jurisdiction: 'EU',
    basis: 'cc-by',
    sourceUrl: ${esc(`https://github.com/global-asp/asp-source/blob/main/en/${s.file}`)},
    note: ${esc(`Text licensed CC-BY via the African Storybook Project${credit ? '; ' + credit : ''}. Story text used unaltered; illustration credit retained though our artwork is newly generated.`)},
  },
}
`
  fs.writeFileSync(path.join(OUT, `${id}.ts`), ts)
  written++
  manifest.push({ id, title: s.title, chapters: chapters.length, words: s.words, file: s.file })
})

console.log(`✅ 写出 ${written} 个内容包到 ${OUT}`)
fs.writeFileSync(path.join(process.cwd(), 'cc-manifest.json'), JSON.stringify(manifest, null, 2))

function camelOf(s) {
  const raw = slugOf(s).split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
  return 'ccAsb' + raw.replace(/[^A-Za-z0-9]/g, '')
}
