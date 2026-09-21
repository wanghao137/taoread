import { ALL_PACKS } from '../src/content/packs/index.js'

/**
 * 内容完整性审计（docs/27）：书名的承诺 vs 章数交付。
 * 全本标准：选集/诗集/名著/童话集按类型定线；单篇绘本 3 章即完整。
 */
const STD = (p) => {
  const id = p.id
  // CC-BY 单篇绘本（African Storybook Project）：故事本身就是完整一篇
  if (id.startsWith('cc-')) return 3
  // 声律启蒙：上下卷各 15 韵部，15 章即全本
  if (id === 'primer-shenglv' || id === 'primer-shenglv2') return 15
  // 诗集与蒙学选集：≥16 章
  if (p.category === 'poetry' || p.category === 'primer') return 16
  // 名著长篇（西游/三国/水浒/红楼/绿野仙踪系列/小妇人/多利特等长篇）
  const novels = [
    'xiyou', 'sanguo', 'shuihu', 'honglou', 'fengshen',
    'oz-', 'alcott', 'dolittle', 'littlewomen', 'nesbit-', 'macdonald',
    'kingsley', 'lagerlof', 'montgomery', 'wiggin', 'porter-pollyanna',
    'twain', 'burnett', 'kipling-puck', 'northwind', 'princessgoblin',
    'tangle', 'wonderbook', 'robinhood', 'robinson', 'gulliver', 'secret',
    'littleprincess', 'railway', 'fivechildren', 'tomsawyer', 'treasure',
    'anne', 'heidi', 'blackbeauty', 'jungle', 'windwillows', 'pinocchio',
    'harris-remus', 'nils',
  ]
  if (novels.some((k) => id.includes(k))) return 8
  // 童话/故事集（安徒生/格林/伊索/Lang/日本童话/中国童话/伊索寓言等合集）
  const collections = [
    'andersen', 'grimm', 'aesop', 'lang-', 'ozaki', 'chinfairy', 'jacobs',
    'essay', 'proverbs', 'heroes', 'idiom', 'myth-shanhaijing',
    'festivals', 'liaozhai', 'pooh', 'milne', 'solar',
  ]
  if (collections.some((k) => id.includes(k))) return 8
  // 其余（单篇绘本/原创/CC 单篇故事）：3 章即完整
  return 3
}

const rows = []
for (const p of ALL_PACKS) {
  const std = STD(p)
  const ch = p.chapters.length
  if (ch < std) rows.push({ id: p.id, title: p.title, cat: p.category, ch, std, gap: std - ch })
}
rows.sort((a, b) => b.gap - a.gap)
console.log(`审计：${ALL_PACKS.length} 本中 ${rows.length} 本低于全本标准，共缺 ${rows.reduce((s, r) => s + r.gap, 0)} 章`)
for (const r of rows) console.log(`${r.id}  «${r.title}»  ${r.ch}/${r.std}章  缺${r.gap}`)
