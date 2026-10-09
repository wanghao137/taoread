import type { PackBook } from './types'
import { createHash } from 'node:crypto'

/** Explicit editorial changes, applied before seed/versioning; no invented continuation of a public-domain text. */
export function correctChineseEditions(pack: PackBook): PackBook {
  if (pack.lang !== 'zh') return pack
  const titles: Record<string, string> = {
    'sanguo-journey': '三国故事·八篇儿童选读',
    'shuihu-heroes': '水浒故事·八篇英雄选读',
    'honglou-dream': '红楼梦·大观园故事选读',
    'myth-shanhaijing': '远古神话·五篇选读',
    'essay-zhu': '朱自清散文·节选与儿童改写',
    'essay-lao': '老舍散文·节选与儿童改写',
    'essay-xu': '许地山散文·落花生与儿童改写',
    'essay-fengzikai': '丰子恺儿童散文·节选与改写',
    'songci-rivers': '宋词选·亲子读本（280篇）',
  }
  let corrected = titles[pack.id] ? { ...pack, title: titles[pack.id]! } : pack
  if (pack.id === 'songci-rivers') corrected = { ...corrected,
    intro: '收录中文诗歌开放语料中的 280 篇宋词，保留每篇全文，附注音与白话译文。本版为选编，不代表《宋词三百首》所有通行版本。',
    source: '公版宋词 280 篇选编；自撰注音与白话译文',
    rights: { ...pack.rights, note: `${pack.rights.note ?? ''} 本版来源语料为280篇，已逐篇保留，不作通行本全本承诺。` } }
  if (pack.id === 'essay-fengzikai') corrected = { ...corrected, author: '丰子恺 原著 · 桃阅读 节选与改写',
    source: '丰子恺公版散文节选及桃阅读儿童白话改写，非原作全集',
    rights: { ...pack.rights, basis: 'adapted', translator: '桃阅读（儿童改写）', note: `${pack.rights.note ?? ''} 含平台缩写和儿童白话重述，不能作为逐字原文或原作全集引用。` } }
  if (['essay-zhu', 'essay-lao', 'essay-xu'].includes(pack.id)) corrected = { ...corrected,
    author: `${pack.rights.author ?? pack.author} 原著 · 桃阅读 节选与改写`,
    source: '公版散文原文节选与桃阅读儿童白话改写；各章标题注明改写，不是原作全集',
    rights: { ...pack.rights, basis: 'adapted', translator: '桃阅读（儿童改写）', note: `${pack.rights.note ?? ''} 本包同时含原文节选与儿童白话改写，不能将改写章当作作者逐字原文引用。` } }
  if (pack.id === 'xiyou-wukong') {
    // Previously ended in 五行山, then jumped back to 二郎神/八卦炉/学艺.
    const order = [0, 7, 1, 2, 3, 5, 6, 4]
    corrected = { ...corrected, chapters: order.map((oldIndex, i) => {
      const ch = pack.chapters[oldIndex]!
      const art = oldIndex === 7 ? 'wukong-learning-before-heaven' : ch.art
      return { ...ch, art, title: `第${['一', '二', '三', '四', '五', '六', '七', '八'][i]}章 · ${ch.title.split(' · ')[1]}`, blocks: ch.blocks.map((b) => ({ ...b,
        ...(b.art === ch.art ? { art } : {}),
        text: b.text.replace('这一场大比试，就发生在小猴被压进大山之前。', '')
          .replace('后面那只手掌心的大赌局，你在第五章已经读过啦——五行山还在那里，小猴还在山底下等着呢。', '如来佛祖就要来了，孙悟空能翻出他的手掌心吗？') })) }
    }) }
  }
  if (pack.id === 'xiyou-bonewhite') {
    const original = pack.chapters[2]!
    const secondScene = 'gujing-second-encounter'
    const second = { title: '第三章 · 第二次打', art: secondScene,
      artPrompt: '秋日山路，拄杖的白骨妖精化成老妇人，远处有淡淡的白烟。悟空护在师父前，师父担忧，八戒沙僧牵着白马。温暖的儿童水彩插画，无伤害特写。',
      blocks: [original.blocks[0]!, original.blocks[1]!, { kind: 'image' as const, art: secondScene, text: '第二次，妖精变成老妇人，留下假身又溜走了。' },
        { kind: 'text' as const, text: '师父想把悟空赶走，悟空却不肯离开。他想，师父还没有看清危险，自己就更应该留下来保护他。师徒继续沿着山路往前走，妖精又悄悄跟了上来。' }] }
    corrected = { ...corrected, chapters: [...pack.chapters.slice(0, 2), second,
      { ...original, title: '第四章 · 第三次打', blocks: original.blocks.slice(2) },
      { ...pack.chapters[3]!, title: '第五章 · 误会化开的时候' }] }
  }
  // Expanded collections reused four old keys for later, unrelated episodes.
  // Keep the first illustration; later episodes receive immutable scene keys.
  const used = new Map<string, string | undefined>()
  const chapters = corrected.chapters.map((ch) => {
    if (!ch.art) return ch
    const prior = used.get(ch.art)
    if (!used.has(ch.art)) { used.set(ch.art, ch.artPrompt); return ch }
    if (prior === ch.artPrompt) return ch
    const art = `${pack.id}:edition-${createHash('sha256').update(ch.artPrompt ?? ch.title).digest('hex').slice(0, 12)}`
    return { ...ch, art, blocks: ch.blocks.map((b) => b.art === ch.art ? { ...b, art } : b) }
  })
  return chapters.some((ch, i) => ch !== corrected.chapters[i]) ? { ...corrected, chapters } : corrected
}
