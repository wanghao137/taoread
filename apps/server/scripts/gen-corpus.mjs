/**
 * 语料补全生成器（2026-09-20 全面补全）。
 * 数据源：chinese-poetry 数据集（.tao-tmp/corpus，公版古籍文本）+ 平台自撰白话译文。
 * 产出：
 *  1) 覆写 src/content/packs/*.ts（保留原书元数据，仅替换 chapters）；
 *  2) scripts/corpus-data/units/batch-*.json（缺译文的翻译任务）；
 *  3) 缺口报告 stdout。
 * 译文放在 scripts/corpus-data/translations/*.json（key 匹配即自动合并）。
 * 红线：诗文逐字来自数据集/通行本，不臆造；拼音 pinyin-pro 生成（关闭变调，与课本注音一致）。
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pinyin } from 'pinyin-pro'
import OpenCC from 'opencc-js'

const HERE = dirname(fileURLToPath(import.meta.url))
const SERVER = resolve(HERE, '..')
const PACKS = resolve(SERVER, 'src/content/packs')
const DATA = resolve(HERE, 'corpus-data')
const CORPUS = resolve(SERVER, '../../.tao-tmp/corpus')

const t2s = OpenCC.Converter({ from: 't', to: 'cn' })
const sim = (s) => t2s(String(s ?? '')).trim()

/* ── 拼音：逐字对齐，关闭一/不变调（课本注音口径），标点附着前字 ── */
export function pinyinFor(text) {
  return text
    .split('\n')
    .map((line) => {
      const cps = Array.from(line)
      let arr = pinyin(line, { toneType: 'symbol', type: 'array', toneSandhi: false })
      // pinyin-pro 会丢弃它不认识的扩展区汉字（如 诗经 𣲗），数组与码点错位；
      // 此时回退逐字注音（丢上下文多音字，但这类行极少且生僻字本就无多音问题）
      if (arr.length !== cps.length) {
        arr = cps.map((ch) => {
          const r = pinyin(ch, { toneType: 'symbol', type: 'array', toneSandhi: false })
          return r[0] ?? ch
        })
      }
      const tokens = []
      for (let i = 0; i < cps.length; i++) {
        const ch = cps[i]
        const py = arr[i] ?? ''
        if (/\p{Script=Han}/u.test(ch)) {
          // 无注音的生僻字用原字占位，保持「字-音」1:1（阅读器 ruby 逐字对注依赖）
          tokens.push(py || ch)
        } else if (tokens.length) {
          tokens[tokens.length - 1] += ch
        }
      }
      return tokens.join(' ').replace(/\s+([，。！？；：、」』）】》”’])/g, '$1').replace(/\s+/g, ' ').trim()
    })
    .join('\n')
}

/* ── 场景键：按题意映射到 SceneArt 既有词典 ── */
const ART_RULES = [
  [/鹅|鹤|鸭/, 'goose-pond'],
  [/月|夜|嫦娥|霜|静夜|关山/, 'poetry-moon'],
  [/瀑布|庐山/, 'waterfall-mountain'],
  [/洞|山寺|仙/, 'waterfall-cave'],
  [/楼|塔|鹳雀|岳阳|黄鹤/, 'tower-view'],
  [/江|河|舟|船|渡|泊|溪|湖|海/, 'river-boat'],
  [/春|莺|燕|鸟|桃/, 'spring-bird'],
  [/田|农|禾|锄|蚕|麻/, 'rice-field'],
  [/星|天河|银河|七夕/, 'star-sea'],
  [/山|岭|岳|敬亭|终南|空山/, 'sunrise-hills'],
  [/雪|梅|寒|冬/, 'nursery-window'],
  [/竹|松|柳|林/, 'forest-path'],
  [/风|云|筝/, 'cloud-flight'],
  [/萤|烛|灯/, 'lamp-hint'],
  [/村|家|园|归/, 'primer-scroll'],
]
function artKeyFor(title, firstLine) {
  const s = `${title} ${firstLine}`
  for (const [re, key] of ART_RULES) if (re.test(s)) return key
  return 'poetry-moon'
}
function artPromptFor(title, firstLine) {
  return `古诗《${title}》意境插画：${firstLine}——中国传统水彩绘本风，画面明快温暖，适合儿童`
}

/* ── 译文库：加载既有 + 收集缺口 ── */
const translations = new Map()
const transDir = resolve(DATA, 'translations')
if (existsSync(transDir)) {
  for (const f of readdirSync(transDir)) {
    if (!f.endsWith('.json')) continue
    const map = JSON.parse(readFileSync(resolve(transDir, f), 'utf8'))
    for (const [k, v] of Object.entries(map)) translations.set(k, v)
  }
}
const seedFile = resolve(DATA, 'seed-translations.json')
if (existsSync(seedFile)) {
  for (const [k, v] of Object.entries(JSON.parse(readFileSync(seedFile, 'utf8')))) {
    translations.set(k, v)
  }
}

const pendingUnits = new Map()
/** key = 标题|作者|首行前10字（跨书去重） */
function unitKey(title, author, firstLine) {
  return `${title}|${author || '佚名'}|${firstLine.slice(0, 10)}`
}
function tr(title, author, firstLine) {
  return translations.get(unitKey(title, author, firstLine)) ?? null
}
function need(title, author, firstLine, text, bookId) {
  const key = unitKey(title, author, firstLine)
  if (!translations.has(key)) pendingUnits.set(key, { key, title, author: author || '佚名', text, bookId })
  return key
}

/* ── 原书元数据保留：从既有 .ts 头部提取 ── */
/* ── 原书元数据：优先用从 git 历史恢复的 original-meta.json（生成不再依赖读自身产物） ── */
const ORIGINAL_META = JSON.parse(readFileSync(resolve(DATA, 'original-meta.json'), 'utf8'))
function readOldMeta(file) {
  if (ORIGINAL_META[file]) return { ...ORIGINAL_META[file] }
  const p = resolve(PACKS, file)
  if (!existsSync(p)) return null
  const s = readFileSync(p, 'utf8')
  // 引号无关：既兼容手写包的单引号，也兼容本生成器产出的双引号
  const grab = (re) => s.match(re)?.[1]
  const qq = (field) => new RegExp(`${field}: ['"]([^'"]+)['"]`)
  return {
    id: grab(qq('id')),
    title: grab(qq('title')),
    author: grab(qq('author')),
    lang: grab(qq('lang')) ?? 'zh',
    category: grab(qq('category')) ?? 'poetry',
    ageStage: grab(qq('ageStage')) ?? '3-5',
    intro: grab(qq('intro')),
    coverArt: grab(qq('coverArt')) ?? 'poetry-moon',
    coverArtPrompt: grab(qq('coverArtPrompt')),
    coverFrom: grab(qq('coverFrom')),
    coverTo: grab(qq('coverTo')),
    source: grab(qq('source')),
  }
}

/* ── TS 产出 ── */
function q(s) {
  return JSON.stringify(s ?? '')
}
function emitPack(file, meta, rights, chapters) {
  const out = `import type { PackBook } from '../types'

/**
 * 《${meta.title}》——由 scripts/gen-corpus.mjs 从公版语料生成（2026-09-20 全面补全）。
 * 底本：${rights.workTitle}（${rights.author ?? '佚名'}）。逐字来自语料数据集，译文为平台自撰白话。
 * ${rights.note ?? ''}
 */
export const ${meta.varName}: PackBook = {
  id: ${q(meta.id)},
  title: ${q(meta.title)},
  author: ${q(meta.author)},
  lang: ${q(meta.lang ?? 'zh')},
  category: ${q(meta.category)},
  ageStage: ${q(meta.ageStage)},
  intro: ${q(meta.intro)},
  coverArt: ${q(meta.coverArt)},
  coverArtPrompt: ${q(meta.coverArtPrompt ?? `《${meta.title}》封面插画：贴纸绘本风，明快温暖`)},
  coverFrom: ${q(meta.coverFrom ?? '#1E2A5A')},
  coverTo: ${q(meta.coverTo ?? '#4A5FBF')},
  source: ${q(meta.source ?? `公版古籍（${rights.author ?? '佚名'}）语料生成`)},
  chapters: [
${chapters.join(',\n')}
  ],
  rights: {
    workTitle: ${q(rights.workTitle)},
    author: ${q(rights.author)},
    authorDeathYear: ${rights.authorDeathYear ?? 'undefined'},
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: ${q(rights.sourceUrl ?? 'https://github.com/chinese-poetry/chinese-poetry')},
    note: ${q(rights.note)},
  },
}
`
  writeFileSync(resolve(PACKS, file), out, 'utf8')
  return chapters.length
}

function poemChapter(title, author, lines, { note, art, artPrompt, translation } = {}) {
  const text = lines.join('\n')
  const py = pinyinFor(text)
  const first = lines[0] ?? ''
  const t = translation ?? tr(title, author, first)
  if (!t) need(title, author, first, text, 'GLOBAL')
  const blocks = [
    `      {
        kind: 'poem',
        text: ${q(text)},
        pinyin: ${q(py)}${t ? `,\n        translation: ${q(t)}` : ''},
      }`,
  ]
  if (note) blocks.push(`      {\n        kind: 'note',\n        text: ${q(note)},\n        art: 'lamp-hint',\n      }`)
  return `    {
      title: ${q(`${title} · ${author || '佚名'}`)},
      art: ${q(art ?? artKeyFor(title, first))},
      artPrompt: ${q(artPrompt ?? artPromptFor(title, first))},
      blocks: [
${blocks.join(',\n')}
      ],
    }`
}

/* ── 组诗展开：数据集里部分条目的 paragraphs 是 {subchapter, paragraphs[]} 对象
 *   （如 千家诗《雪梅》其一/其二、《秋兴八首》一~八）——按小题展开成多首 ── */
function expandGroupEntries(group) {
  const entries = []
  for (const poem of group.content) {
    const title0 = sim(poem.chapter).replace(/\s*[（(].*?[)）]\s*/, '')
    const author = sim((poem.author ?? '').replace(/^[（(].*?[)）]/, '')) || '佚名'
    const paras = Array.isArray(poem.paragraphs) ? poem.paragraphs : []
    const subs = paras.filter((x) => typeof x !== 'string')
    if (subs.length === 0) {
      entries.push({ title: title0, author, lines: paras.map(sim) })
    } else {
      for (const sub of subs) {
        const subName = sim(sub.subchapter ?? '') || '其一'
        entries.push({
          title: `${title0}（${subName}）`,
          author,
          lines: (Array.isArray(sub.paragraphs) ? sub.paragraphs : []).map(sim),
        })
      }
    }
  }
  return entries
}

/* ══════════ 1. 唐诗三百首（全本） ══════════ */
function buildTangshi() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_tangshisanbaishou.json'), 'utf8'))
  const seen = new Set()
  const lead = []
  const rest = []
  const HAND = {
    // 保留既有手工精修章（含小注），逐字与旧包一致
    '静夜思': {
      art: 'tangshi-moon-window',
      artPrompt: '安静的深夜，一个古代小诗人坐在木床边，月光把窗纸照得亮亮的，地上像铺了一层白霜，他抬头望着窗外的大圆月亮',
      note: '李白被叫做「诗仙」，他特别喜欢写月亮。这首诗是他一个人住在外地时写的。',
    },
    '春晓': {
      art: 'spring-bird',
      artPrompt: '春天的清晨，一个孩子从被窝里探出头，窗外桃花开了满树，两只小鸟站在枝头叽叽喳喳，地上落了一层花瓣',
    },
    '咏鹅': {
      art: 'tangshi-goose-pond',
      artPrompt: '村边的池塘里，一只大白鹅弯着脖子朝天欢叫，雪白羽毛浮在绿水上，红红的脚掌拨出圆圆的波纹，岸边柳条低垂',
      note: '骆宾王写这首诗的时候只有七岁，和你一样大！',
    },
    '登鹳雀楼': {
      art: 'tower-view',
      artPrompt: '高高的鹳雀楼上，一个孩子扶着栏杆远眺，一轮红日正落向群山，黄河水闪闪发亮地流向远方的大海',
    },
    '悯农': {
      art: 'rice-field',
      artPrompt: '正午烈日下的稻田里，一位戴着草帽的农民伯伯弯腰锄地，汗水滴落在泥土里，田埂上放着一壶凉茶',
      note: '「悯」是心疼、同情的意思。读完这首诗，吃饭时会更珍惜粮食哦。',
    },
    '望庐山瀑布': {
      art: 'waterfall-mountain',
      artPrompt: '阳光照在香炉峰上升起淡淡紫烟，一道白色瀑布从高高的山崖直冲而下，水雾弥漫，像银河从九天倾落',
    },
  }
  for (const group of raw.content) {
    for (const poem of expandGroupEntries(group)) {
      const { title, author, lines } = poem
      const dedupe = `${title}|${author}|${lines[0]}`
      if (seen.has(dedupe)) continue
      seen.add(dedupe)
      // 手工精修章（静夜思/春晓等 6 首）置顶：孩子打开书第一首就是最熟悉的
      if (HAND[title]) lead.push({ title, ts: poemChapter(title, author, lines, HAND[title]) })
      else rest.push(poemChapter(title, author, lines))
    }
  }
  // lead 按 HAND 定义顺序排（数据集里登鹳雀楼先于静夜思，不符合开篇习惯）
  const HAND_ORDER = ['静夜思', '春晓', '咏鹅', '登鹳雀楼', '悯农', '望庐山瀑布']
  lead.sort((a, b) => HAND_ORDER.indexOf(a.title) - HAND_ORDER.indexOf(b.title))
  const chapters = [...lead.map((x) => x.ts), ...rest]
  const old = readOldMeta('poetry-tang.ts')
  return emitPack(
    'poetry-tang.ts',
    { ...old, varName: 'tangShi', title: '唐诗三百首', intro: '蘅塘退士编《唐诗三百首》全本：三百多首唐诗，每首都有拼音和小画，读诗像看星星一样轻松。', author: '蘅塘退士 编', source: '公版古诗（唐代）全本，自撰注音与白话译文' },
    { workTitle: '唐诗三百首', author: '蘅塘退士（编）', authorDeathYear: 1764, sourceUrl: 'https://github.com/chinese-poetry/chinese-poetry', note: '所收唐诗作者卒年均逾保护期；编者蘅塘退士卒于 1764 年。注音与白话译文为平台自撰。' },
    chapters,
  )
}

/* ══════════ 2. 千家诗（全本） ══════════ */
function buildQianjia() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_qianjiashi.json'), 'utf8'))
  const seen = new Set()
  const chapters = []
  for (const group of raw.content) {
    for (const poem of expandGroupEntries(group)) {
      const dedupe = `${poem.title}|${poem.author}|${poem.lines[0]}`
      if (seen.has(dedupe)) continue
      seen.add(dedupe)
      chapters.push(poemChapter(poem.title, poem.author, poem.lines))
    }
  }
  const old = readOldMeta('poetry-qianjia.ts')
  return emitPack(
    'poetry-qianjia.ts',
    { ...old, varName: 'qianJiaShi', title: '千家诗', intro: '谢枋得、王相编《千家诗》全本：两百多首绝句律诗，从春晓到秋思，四季都装在这一本里。', author: '谢枋得 / 王相 编', source: '公版古诗选本（南宋/明）全本，自撰注音与白话译文' },
    { workTitle: '千家诗', author: '谢枋得、王相（编）', authorDeathYear: 1687, sourceUrl: 'https://github.com/chinese-poetry/chinese-poetry', note: '所收诗作者卒年均逾保护期；编者王相卒于 1687 年。注音与白话译文为平台自撰。' },
    chapters,
  )
}

/* ══════════ 3. 宋词三百首 ══════════ */
function buildSongci() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '宋词_宋词三百首.json'), 'utf8'))
  const seen = new Set()
  const chapters = []
  for (const ci of raw) {
    const title = sim(ci.rhythmic || ci.title || sim(ci.paragraphs[0]).slice(0, 6))
    const author = sim(ci.author ?? '') || '佚名'
    const lines = ci.paragraphs.map(sim)
    const dedupe = `${title}|${author}|${lines[0]}`
    if (seen.has(dedupe)) continue
    seen.add(dedupe)
    chapters.push(poemChapter(title, author, lines))
  }
  const old = readOldMeta('poetry-songci.ts')
  return emitPack(
    'poetry-songci.ts',
    { ...old, varName: 'songCi', title: '宋词三百首·亲子读本', intro: '朱祖谋编《宋词三百首》通行本：长短句里的月亮、江水和思念，跟着旋律轻轻读。', author: '朱祖谋 编', source: '公版词选（清末编选，词作为宋代作品）全本，自撰注音与白话译文' },
    { workTitle: '宋词三百首', author: '朱祖谋（编）', authorDeathYear: 1931, sourceUrl: 'https://github.com/chinese-poetry/chinese-poetry', note: '所收词作者卒年均逾保护期；编者朱祖谋卒于 1931 年，编选内容无独创性。注音与白话译文为平台自撰。' },
    chapters,
  )
}

/* ══════════ 4. 诗经（全本 305） ══════════ */
function buildShijing() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '诗经_shijing.json'), 'utf8'))
  const seen = new Set()
  const chapters = []
  for (const poem of raw) {
    const title = sim(poem.title)
    const section = `${sim(poem.chapter)}·${sim(poem.section)}`
    const lines = poem.content.map(sim)
    const dedupe = `${title}|${section}`
    if (seen.has(dedupe)) continue
    seen.add(dedupe)
    const showTitle = chapters.some((c) => c.includes(`title: ${JSON.stringify(title)}`)) ? `${title}（${section}）` : title
    chapters.push(poemChapter(showTitle, '佚名', lines))
  }
  const old = readOldMeta('poetry-shijing.ts')
  return emitPack(
    'poetry-shijing.ts',
    { ...old, varName: 'shiJing', title: '诗经·亲子诵读本', intro: '三百篇最古老的歌谣：关关雎鸠、蒹葭苍苍，四字一句，像唱歌一样。', author: '佚名（先秦）', source: '公版古籍（先秦）全本，自撰注音与白话译文' },
    { workTitle: '诗经', author: '佚名（先秦）', sourceUrl: 'https://github.com/chinese-poetry/chinese-poetry', note: '先秦歌谣，远超保护期。注音与白话译文为平台自撰。' },
    chapters,
  )
}

/* ══════════ 5. 李白 / 杜甫 / 王维 诗选（全唐诗检索） ══════════ */
let _tangCorpus = null
function loadTangCorpus() {
  if (_tangCorpus) return _tangCorpus
  const dir = resolve(CORPUS, 'tang')
  const all = []
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.json')) continue
    all.push(...JSON.parse(readFileSync(resolve(dir, f), 'utf8')))
  }
  _tangCorpus = all
  return all
}
function pickByTitles(corpus, author, titles, exclude) {
  const picked = []
  const used = new Set()
  // 数据集为繁体且标题带类目前缀（如「鼓吹曲辭 關山月」）、组诗编号为「… 一」：打分匹配
  const strip = (t) => sim(t).replace(/^\S+\s+/, '')
  for (const want of titles) {
    const cands = corpus.filter((p) => sim(p.author) === author && !used.has(p) && strip(p.title).includes(want))
    const score = (p) => {
      const t = strip(p.title)
      if (t === want) return 0
      if (t === `${want} 一`) return 1
      if (new RegExp(`^${want}( [一二三四五六七八九十]+)?$`).test(t)) return 2
      if (t.startsWith(want)) return 3
      return 9
    }
    const hit = cands.sort((a, b) => score(a) - score(b))[0]
    if (hit && score(hit) < 9 && !exclude?.has(`${strip(hit.title)}|${author}`)) {
      used.add(hit)
      picked.push(hit)
    } else if (!hit || score(hit) >= 9) {
      console.warn(`  ! 未找到：${author}《${want}》`)
    }
  }
  return picked
}
function buildMaster(file, varName, author, titles, meta, rights) {
  const corpus = loadTangCorpus()
  // 诗选本应收录该诗人的全部名篇（含已入《唐诗三百首》者）；
  // 译文按 全局 key 去重复用，不产生额外翻译量
  const picked = pickByTitles(corpus, author, titles, null)
  const chapters = picked.map((p) => poemChapter(sim(p.title), author, p.paragraphs.map(sim)))
  const old = readOldMeta(file)
  return emitPack(file, { ...old, varName, ...meta }, rights, chapters)
}

/* ══════════ 6. 手工精选小集（课本级名篇，逐字通行本） ══════════ */
// 每首 = [标题, 作者, 逐行诗文]；均为教材通行本原文
const CURATED = {
  'poetry-yuefu.ts': {
    varName: 'yueFu',
    meta: { title: '汉乐府与古诗选', intro: '江南可采莲、青青园中葵……最古老的歌谣，句句像唱歌。', author: '汉乐府 / 北朝民歌 等' },
    rights: { workTitle: '乐府诗集（选）', author: '汉乐府 等', authorDeathYear: -1, note: '汉魏六朝乐府与古诗，均远超保护期；注音与白话译文为平台自撰。' },
    poems: [
      ['江南', '汉乐府', ['江南可采莲，', '莲叶何田田。', '鱼戏莲叶间。', '鱼戏莲叶东，鱼戏莲叶西，', '鱼戏莲叶南，鱼戏莲叶北。']],
      ['长歌行', '汉乐府', ['青青园中葵，朝露待日晞。', '阳春布德泽，万物生光辉。', '常恐秋节至，焜黄华叶衰。', '百川东到海，何时复西归？', '少壮不努力，老大徒伤悲。']],
      ['敕勒歌', '北朝民歌', ['敕勒川，阴山下。', '天似穹庐，笼盖四野。', '天苍苍，野茫茫，风吹草低见牛羊。']],
      ['七步诗', '曹植', ['煮豆持作羹，漉菽以为汁。', '萁在釜下燃，豆在釜中泣。', '本自同根生，相煎何太急？']],
      ['大风歌', '刘邦', ['大风起兮云飞扬，', '威加海内兮归故乡，', '安得猛士兮守四方！']],
      ['垓下歌', '项羽', ['力拔山兮气盖世，时不利兮骓不逝。', '骓不逝兮可奈何，虞兮虞兮奈若何！']],
      ['易水歌', '荆轲', ['风萧萧兮易水寒，壮士一去兮不复还。']],
      ['古朗月行（节选）', '李白', ['小时不识月，呼作白玉盘。', '又疑瑶台镜，飞在青云端。']],
      ['长干行（节选）', '李白', ['郎骑竹马来，绕床弄青梅。', '同居长干里，两小无嫌猜。']],
      ['十五从军征（节选）', '汉乐府', ['十五从军征，八十始得归。', '道逢乡里人：家中有阿谁？']],
      ['饮马长城窟行（节选）', '汉乐府', ['青青河畔草，绵绵思远道。']],
      ['上邪', '汉乐府', ['上邪！我欲与君相知，长命无绝衰。', '山无陵，江水为竭，冬雷震震，夏雨雪，天地合，乃敢与君绝。']],
    ],
  },
  'poetry-pastoral.ts': {
    varName: 'pastoralPoems',
    meta: { title: '田园诗选', intro: '种豆、采菊、牧牛、插秧……田园里的每一天都值得写进诗里。', author: '陶渊明 / 王维 / 孟浩然 等' },
    rights: { workTitle: '田园诗选', author: '陶渊明 等', authorDeathYear: 427, note: '所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。' },
    poems: [
      ['归园田居（其三）', '陶渊明', ['种豆南山下，草盛豆苗稀。', '晨兴理荒秽，带月荷锄归。', '道狭草木长，夕露沾我衣。', '衣沾不足惜，但使愿无违。']],
      ['饮酒（其五）', '陶渊明', ['结庐在人境，而无车马喧。', '问君何能尔？心远地自偏。', '采菊东篱下，悠然见南山。', '山气日夕佳，飞鸟相与还。', '此中有真意，欲辨已忘言。']],
      ['过故人庄', '孟浩然', ['故人具鸡黍，邀我至田家。', '绿树村边合，青山郭外斜。', '开轩面场圃，把酒话桑麻。', '待到重阳日，还来就菊花。']],
      ['渭川田家', '王维', ['斜阳照墟落，穷巷牛羊归。', '野老念牧童，倚杖候荆扉。', '雉雊麦苗秀，蚕眠桑叶稀。', '田夫荷锄至，相见语依依。', '即此羡闲逸，怅然吟式微。']],
      ['秋浦歌（其十五）', '李白', ['白发三千丈，缘愁似个长。', '不知明镜里，何处得秋霜。']],
      ['乡村四月', '翁卷', ['绿遍山原白满川，子规声里雨如烟。', '乡村四月闲人少，才了蚕桑又插田。']],
      ['四时田园杂兴（其二十五）', '范成大', ['梅子金黄杏子肥，麦花雪白菜花稀。', '日长篱落无人过，惟有蜻蜓蛱蝶飞。']],
      ['四时田园杂兴（其三十一）', '范成大', ['昼出耘田夜绩麻，村庄儿女各当家。', '童孙未解供耕织，也傍桑阴学种瓜。']],
      ['江畔独步寻花（其六）', '杜甫', ['黄四娘家花满蹊，千朵万朵压枝低。', '留连戏蝶时时舞，自在娇莺恰恰啼。']],
      ['水槛遣心二首（其一）', '杜甫', ['去郭轩楹敞，无村眺望赊。', '澄江平少岸，幽树晚多花。', '细雨鱼儿出，微风燕子斜。', '城中十万户，此地两三家。']],
      ['游山西村（节选）', '陆游', ['莫笑农家腊酒浑，丰年留客足鸡豚。', '山重水复疑无路，柳暗花明又一村。']],
      ['社日', '王驾', ['鹅湖山下稻粱肥，豚栅鸡栖半掩扉。', '桑柘影斜春社散，家家扶得醉人归。']],
      ['雨过山村', '王建', ['雨里鸡鸣一两家，竹溪村路板桥斜。', '妇姑相唤浴蚕去，闲着中庭栀子花。']],
      ['辋川闲居赠裴秀才迪', '王维', ['寒山转苍翠，秋水日潺湲。', '倚杖柴门外，临风听暮蝉。', '渡头余落日，墟里上孤烟。', '复值接舆醉，狂歌五柳前。']],
      ['田园乐（其六）', '王维', ['桃红复含宿雨，柳绿更带朝烟。', '花落家童未扫，莺啼山客犹眠。']],
    ],
  },
  'poetry-scenery.ts': {
    varName: 'poetryScenery',
    meta: { title: '四季诗选', intro: '春夏秋冬各有一首主题曲：春风放胆来梳柳，夜雨瞒人去润花。', author: '贺知章 / 苏轼 / 杨万里 等' },
    rights: { workTitle: '四季诗选', author: '历代诗人', authorDeathYear: 1279, note: '所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。' },
    poems: [
      ['咏柳', '贺知章', ['碧玉妆成一树高，万条垂下绿丝绦。', '不知细叶谁裁出，二月春风似剪刀。']],
      ['大林寺桃花', '白居易', ['人间四月芳菲尽，山寺桃花始盛开。', '长恨春归无觅处，不知转入此中来。']],
      ['小池', '杨万里', ['泉眼无声惜细流，树阴照水爱晴柔。', '小荷才露尖尖角，早有蜻蜓立上头。']],
      ['晓出净慈寺送林子方', '杨万里', ['毕竟西湖六月中，风光不与四时同。', '接天莲叶无穷碧，映日荷花别样红。']],
      ['山行', '杜牧', ['远上寒山石径斜，白云生处有人家。', '停车坐爱枫林晚，霜叶红于二月花。']],
      ['赠刘景文', '苏轼', ['荷尽已无擎雨盖，菊残犹有傲霜枝。', '一年好景君须记，最是橙黄橘绿时。']],
      ['梅花', '王安石', ['墙角数枝梅，凌寒独自开。', '遥知不是雪，为有暗香来。']],
      ['别董大', '高适', ['千里黄云白日曛，北风吹雁雪纷纷。', '莫愁前路无知己，天下谁人不识君。']],
      ['春日', '朱熹', ['胜日寻芳泗水滨，无边光景一时新。', '等闲识得东风面，万紫千红总是春。']],
      ['六月二十七日望湖楼醉书', '苏轼', ['黑云翻墨未遮山，白雨跳珠乱入船。', '卷地风来忽吹散，望湖楼下水如天。']],
      ['秋夕', '杜牧', ['银烛秋光冷画屏，轻罗小扇扑流萤。', '天阶夜色凉如水，坐看牵牛织女星。']],
      ['雪梅', '卢梅坡', ['梅雪争春未肯降，骚人阁笔费评章。', '梅须逊雪三分白，雪却输梅一段香。']],
    ],
  },
  'poetry-children.ts': {
    varName: 'tongQu',
    meta: { title: '童趣诗选·小动物', intro: '鹅、蝉、牛、蜻蜓……诗人把这些小家伙写得比画还好玩。', author: '骆宾王 / 袁枚 / 杨万里 等' },
    rights: { workTitle: '童趣诗选', author: '历代诗人', authorDeathYear: 1279, note: '所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。' },
    poems: [
      ['所见', '袁枚', ['牧童骑黄牛，歌声振林樾。', '意欲捕鸣蝉，忽然闭口立。']],
      ['池上', '白居易', ['小娃撑小艇，偷采白莲回。', '不解藏踪迹，浮萍一道开。']],
      ['小儿垂钓', '胡令能', ['蓬头稚子学垂纶，侧坐莓苔草映身。', '路人借问遥招手，怕得鱼惊不应人。']],
      ['舟过安仁', '杨万里', ['一叶渔船两小童，收篙停棹坐船中。', '怪生无雨都张伞，不是遮头是使风。']],
      ['宿新市徐公店', '杨万里', ['篱落疏疏一径深，树头新绿未成阴。', '儿童急走追黄蝶，飞入菜花无处寻。']],
      ['村居', '高鼎', ['草长莺飞二月天，拂堤杨柳醉春烟。', '儿童散学归来早，忙趁东风放纸鸢。']],
      ['夜书所见（节选）', '叶绍翁', ['萧萧梧叶送寒声，江上秋风动客情。', '知有儿童挑促织，夜深篱落一灯明。']],
      ['幼女词', '施肩吾', ['幼女才六岁，未知巧与拙。', '向夜在堂前，学人拜新月。']],
      ['与小女', '韦庄', ['见人初解语呕哑，不肯归眠恋小车。', '一夜娇啼缘底事，为嫌衣少缕金华。']],
      ['夜宿山寺', '李白', ['危楼高百尺，手可摘星辰。', '不敢高声语，恐惊天上人。']],
      ['溪居即事', '崔道融', ['篱外谁家不系船，春风吹入钓鱼湾。', '小童疑是有村客，急向柴门去却关。']],
    ],
  },
  'poetry-children2.ts': {
    varName: 'tongQuPlay',
    meta: { title: '童趣诗选·好玩的事', intro: '放风筝、捉蝴蝶、偷采莲、学种瓜——古代小朋友的游戏都在这里。', author: '范成大 / 杨万里 / 白居易 等' },
    rights: { workTitle: '童趣诗选·好玩的事', author: '历代诗人', authorDeathYear: 1279, note: '所选诗文作者卒年均逾保护期；注音与白话译文为平台自撰。' },
    poems: [
      ['稚子弄冰', '杨万里', ['稚子金盆脱晓冰，彩丝穿取当银钲。', '敲成玉磬穿林响，忽作玻璃碎地声。']],
      ['桑茶坑道中', '杨万里', ['晴明风日雨干时，草满花堤水满溪。', '童子柳阴眠正着，一牛吃过柳阴西。']],
      ['闲居初夏午睡起', '杨万里', ['梅子留酸软齿牙，芭蕉分绿与窗纱。', '日长睡起无情思，闲看儿童捉柳花。']],
      ['清明', '杜牧', ['清明时节雨纷纷，路上行人欲断魂。', '借问酒家何处有？牧童遥指杏花村。']],
      ['回乡偶书', '贺知章', ['少小离家老大回，乡音无改鬓毛衰。', '儿童相见不相识，笑问客从何处来。']],
      ['牧童', '吕岩', ['草铺横野六七里，笛弄晚风三四声。', '归来饱饭黄昏后，不脱蓑衣卧月明。']],
      ['观游鱼', '白居易', ['绕池闲步看鱼游，正值儿童弄钓舟。', '一种爱鱼心各异，我来施食尔垂钩。']],
      ['牧童词（节选）', '李涉', ['朝牧牛，牧牛下江曲。', '夜牧牛，牧牛度村谷。']],
      ['巴女谣', '于鹄', ['巴女骑牛唱竹枝，藕丝菱叶傍江时。', '不愁日暮还家错，记得芭蕉出槿篱。']],
      ['淮上渔者', '郑谷', ['白头波上白头翁，家逐船移江浦风。', '一尺鲈鱼新钓得，儿孙吹火荻花中。']],
    ],
  },
}

/* ══════════ 7. 蒙学全本 ══════════ */
function chunk(arr, n) {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}
function primerChapter(no, title, lines, { note, translation } = {}) {
  return poemChapter(title, '佚名', lines, { note, translation, art: 'primer-scroll', artPrompt: `《三字经》第${no}课插画：古代学堂里孩子捧竹简跟读，晨光温暖，贴纸绘本风` })
}
function buildPrimer(file, varName, meta, rights, chapters) {
  const old = readOldMeta(file)
  return emitPack(file, { ...old, varName, ...meta }, rights, chapters)
}

function buildSanzi() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_sanzijing-new.json'), 'utf8'))
  const lines = raw.paragraphs.map(sim)
  const groups = chunk(lines, 8)
  const chapters = groups.map((g, i) => primerChapter(i + 1, `第${cn(i + 1)}课 · ${firstPhrase(g[0])}`, g))
  return buildPrimer('primer-sanzi.ts', 'sanziJing', { title: '三字经', intro: '三字一句，朗朗上口。全本《三字经》，从「人之初」一直读到「宜勉力」，古时候小朋友的识字课本。', author: '王应麟（宋）' }, { workTitle: '三字经', author: '王应麟', authorDeathYear: 1296, note: '通行本全篇；注音与白话译文为平台自撰。' }, chapters)
}
function buildDizigui() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_dizigui.json'), 'utf8'))
  const chapters = []
  for (const sec of raw.content) {
    const lines = sec.paragraphs.map(sim)
    for (const [i, g] of chunk(lines, 6).entries()) {
      const t = chunk(lines, 6).length > 1 ? `${sim(sec.chapter)}（${cn(i + 1)}）` : sim(sec.chapter)
      chapters.push(poemChapter(t, '李毓秀', g, { art: 'primer-scroll' }))
    }
  }
  return buildPrimer('primer-dizigui.ts', 'diZiGui', { title: '弟子规', intro: '「弟子规，圣人训」——全本《弟子规》，教小朋友在家、出门、待人、读书的好习惯。', author: '李毓秀（清）' }, { workTitle: '弟子规', author: '李毓秀', authorDeathYear: 1729, note: '通行本全篇；注音与白话译文为平台自撰。' }, chapters)
}
function buildQianziwen() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_qianziwen.json'), 'utf8'))
  const phrases = raw.paragraphs.map(sim)
  const lines = chunk(phrases, 4).map((g) => g.join('') .replace(/(.{4})/g, '$1，').replace(/，$/, '。'))
  const groups = chunk(lines, 4)
  const chapters = groups.map((g, i) => primerChapter(i + 1, `第${cn(i + 1)}课 · ${firstPhrase(g[0])}`, g))
  return buildPrimer('primer-qianziwen.ts', 'qianZiWen', { title: '千字文', intro: '一千个不重复的字，写成二百五十句四字韵语，从天地玄黄讲到治家治国。', author: '周兴嗣（南朝梁）' }, { workTitle: '千字文', author: '周兴嗣', authorDeathYear: 521, note: '通行本全篇；注音与白话译文为平台自撰。' }, chapters)
}
function buildBaijiaxing() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_baijiaxing.json'), 'utf8'))
  const lines = raw.paragraphs.map(sim)
  const groups = chunk(lines, 8)
  const chapters = groups.map((g, i) =>
    primerChapter(i + 1, `第${cn(i + 1)}课 · ${firstPhrase(g[0])}`, g, {
      note: '这一句都是姓氏：' + g.map((l) => l.split(/[，。]/)[0]).join('、') + '……你的姓在第几课？',
      translation: g.map((l) => `这一句都是姓氏：${l.replace(/[，。]/g, '、').replace(/、$/, '')}。`).join('\n'),
    }),
  )
  return buildPrimer('primer-baijiaxing.ts', 'baiJiaXing', { title: '百家姓', intro: '赵钱孙李、周吴郑王——全本《百家姓》，看看你的姓排第几？', author: '佚名（北宋）' }, { workTitle: '百家姓', author: '佚名（北宋）', authorDeathYear: -1, note: '北宋蒙学课本，作者佚名；注音与白话译文为平台自撰。' }, chapters)
}
function buildShenglv(file, varName, volumeTitle, intro, volume) {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_shenglvqimeng.json'), 'utf8'))
  const vol = raw.content.find((v) => sim(v.title) === volume)
  const chapters = []
  for (const sec of vol.content) {
    const yun = sim(sec.chapter)
    const stanzas = sec.paragraphs.map(sim)
    const lines = stanzas.map((s) => s)
    chapters.push(poemChapter(yun, '车万育', lines, { art: 'primer-scroll', artPrompt: `《声律启蒙》${yun}韵插画：对联里的山水花鸟，古风贴纸绘本` }))
  }
  return buildPrimer(file, varName, { title: volumeTitle, intro, author: '车万育（清）' }, { workTitle: '声律启蒙', author: '车万育', authorDeathYear: 1715, note: '通行本全篇；注音与白话译文为平台自撰。' }, chapters)
}
function buildZhuzi() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_zhuzijiaxun.json'), 'utf8'))
  const lines = raw.paragraphs.map(sim)
  const groups = chunk(lines, 3)
  const chapters = groups.map((g, i) => primerChapter(i + 1, `第${cn(i + 1)}课 · ${firstPhrase(g[0])}`, g))
  return buildPrimer('primer-zhuzi.ts', 'zhuziJiaxun', { title: '朱子家训', intro: '黎明即起，洒扫庭除——治家格言全本，一粥一饭当思来处不易。', author: '朱柏庐（清）' }, { workTitle: '朱子家训', author: '朱柏庐', authorDeathYear: 1698, note: '通行本全篇；注音与白话译文为平台自撰。' }, chapters)
}
function buildZengguang() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_zengguangxianwen.json'), 'utf8'))
  const chapters = []
  for (const vol of raw.content) {
    const lines = vol.paragraphs.map(sim)
    for (const g of chunk(lines, 20)) {
      chapters.push(poemChapter(`${sim(vol.title)} · ${firstPhrase(g[0])}`, '佚名', g, { art: 'primer-scroll' }))
    }
  }
  return buildPrimer('primer-zengguang.ts', 'zengGuang', { title: '增广贤文', intro: '「一年之计在于春，一日之计在于寅」——古人的人生智慧，全本读来句句在理。', author: '佚名（明清）' }, { workTitle: '增广贤文', author: '佚名（明清）', authorDeathYear: -1, note: '明清通行本；注音与白话译文为平台自撰。' }, chapters)
}
function buildYouxue() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, '蒙学_youxueqionglin.json'), 'utf8'))
  const vol1 = raw.content.find((v) => sim(v.title).includes('卷一')) ?? raw.content[0]
  const chapters = []
  for (const sec of vol1.content) {
    const paras = sec.paragraphs.map(sim)
    for (const g of chunk(paras, 2)) {
      chapters.push(poemChapter(`${sim(sec.chapter)}（${chapters.length + 1}）`, '程登吉', g, { art: 'primer-scroll' }))
    }
  }
  return buildPrimer('primer-youxue.ts', 'youxueQionglin', { title: '幼学琼林·卷一', intro: '「混沌初开，乾坤始奠」——古代小百科，天文地舆岁时朝廷，样样都有。', author: '程登吉（明）' }, { workTitle: '幼学琼林', author: '程登吉', authorDeathYear: -1, note: '明代通行本卷一；注音与白话译文为平台自撰。' }, chapters)
}

/* ══════════ 8. 元曲（名篇 16） ══════════ */
function buildYuanqu() {
  const raw = JSON.parse(readFileSync(resolve(CORPUS, 'quanqu/yuanqu.json'), 'utf8'))
  const WANTS = ['天净沙·秋思', '山坡羊·潼关怀古', '卖花声·怀古', '折桂令', '沉醉东风', '四块玉·闲适', '寿阳曲', '殿前欢', '蟾宫曲', '鹦鹉曲', '阳春曲', '喜春来', '凭栏人', '干荷叶', '清江引', '普天乐']
  const seen = new Set()
  const chapters = []
  for (const want of WANTS) {
    const hit = raw.filter((p) => (p.title ?? '').includes(want) || (p.rhythmic ?? '').includes(want))
    for (const h of hit.slice(0, want === '天净沙·秋思' ? 1 : 2)) {
      const title = sim((h.title ?? '').split('。')[0].split('（')[0])
      const author = sim(h.author ?? '')
      const key = `${title}|${author}|${sim(h.paragraphs[0])}`
      if (seen.has(key)) continue
      seen.add(key)
      chapters.push(poemChapter(title, author, h.paragraphs.map(sim)))
      if (chapters.length >= 16) break
    }
    if (chapters.length >= 16) break
  }
  const old = readOldMeta('poetry-yuanqu.ts')
  return emitPack('poetry-yuanqu.ts', { ...old, varName: 'yuanQu', ...{ title: '元曲选', intro: '天净沙、山坡羊……元代的「歌词」，句子歪歪扭扭却特别好听。', author: '马致远 / 张养浩 等' } }, { workTitle: '元曲选', author: '元代曲家', authorDeathYear: 1400, note: '所选元曲作者卒年均逾保护期；注音与白话译文为平台自撰。' }, chapters)
}

/* ══════════ helpers ══════════ */
const CN_NUM = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
function cn(n) {
  if (n <= 10) return CN_NUM[n]
  if (n < 20) return `十${CN_NUM[n - 10] ?? ''}`
  return String(n)
    .split('')
    .map((d) => CN_NUM[Number(d)] ?? d)
    .join('')
}
function firstPhrase(line) {
  const m = String(line ?? '').split(/[，。；！？、\s]/)[0] ?? ''
  return m.slice(0, 4)
}

/* ══════════ main ══════════ */
const report = []
function run(name, fn) {
  try {
    const n = fn()
    report.push(`✓ ${name}: ${n} 章`)
  } catch (e) {
    report.push(`✗ ${name}: ${e.message}`)
  }
}

run('唐诗三百首', buildTangshi)
run('千家诗', buildQianjia)
run('宋词三百首', buildSongci)
run('诗经', buildShijing)
run('李白诗选', () =>
  buildMaster('poetry-libai.ts', 'libai', '李白',
    ['早发白帝城', '望天门山', '赠汪伦', '黄鹤楼送孟浩然之广陵', '独坐敬亭山', '古朗月行', '秋浦歌十七首 十五', '客中行', '山中问', '劳劳亭', '怨情', '玉阶怨', '送友人', '渡荆门送别', '关山月', '峨眉山月歌', '春夜洛城闻笛', '闻王昌龄左迁龙标遥有此寄', '把酒问月', '行路难', '将进酒', '蜀道难', '梦游天姥吟留别', '赠孟浩然', '沙丘城下寄杜甫', '清平调', '长门怨', '金陵酒肆留别', '夜泊牛渚怀古'],
    { title: '李白诗选', intro: '「诗仙」李白的名篇选：月亮、美酒、大瀑布，还有一肚子想象力。', author: '李白（唐）' },
    { workTitle: '李白诗选', author: '李白', authorDeathYear: 762, note: '所选诗作者卒年逾保护期；注音与白话译文为平台自撰。' }))
run('杜甫诗选', () =>
  buildMaster('poetry-dufu.ts', 'duFu', '杜甫',
    ['绝句', '春夜喜雨', '江畔独步寻花七绝句 六', '赠花卿', '江南逢李龟年', '八阵图', '春望', '月夜', '望岳', '房兵曹胡马', '前出塞', '旅夜书怀', '登高', '登岳阳楼', '闻官军收河南河北', '秋兴八首 二', '石壕吏', '月夜忆舍弟', '客至', '江村', '春宿左省', '水槛遣心二首 一', '野望', '佳人', '天末忆李白', '别房太尉墓', '新安吏', '潼关吏', '垂老别', '无家别'],
    { title: '杜甫诗选', intro: '「诗圣」杜甫的名篇选：春雨、黄鹂、大山河，也有他牵挂的天下。', author: '杜甫（唐）' },
    { workTitle: '杜甫诗选', author: '杜甫', authorDeathYear: 770, note: '所选诗作者卒年逾保护期；注音与白话译文为平台自撰。' }))
run('王维诗选', () =>
  buildMaster('poetry-wangwei.ts', 'wangWei', '王维',
    ['鹿柴', '竹里馆', '送别', '相思', '杂诗', '鸟鸣涧', '山中', '九月九日忆山东兄弟', '少年行', '使至塞上', '山居秋暝', '终南山', '汉江临泛', '终南别业', '酬张少府', '辋川闲居赠裴秀才迪', '白石滩', '辛夷坞', '栾家濑', '渭城曲', '莲花坞', '书事', '过香积寺', '青溪', '积雨辋川庄作', '秋夜独坐', '归嵩山作', '山居即事', '酬郭给事', '奉和圣制从蓬莱向兴庆阁道中留春雨中春望之作应制'],
    { title: '王维诗选', intro: '「诗中有画」的王维：空山、竹林、明月，读他的诗像走进一幅画。', author: '王维（唐）' },
    { workTitle: '王维诗选', author: '王维', authorDeathYear: 761, note: '所选诗作者卒年逾保护期；注音与白话译文为平台自撰。' }))
for (const [file, cfg] of Object.entries(CURATED)) {
  run(cfg.meta.title, () => {
    const chapters = cfg.poems.map(([t, a, lines]) => poemChapter(t, a, lines))
    const old = readOldMeta(file)
    return emitPack(file, { ...old, varName: cfg.varName, ...cfg.meta }, cfg.rights, chapters)
  })
}
run('元曲选', buildYuanqu)
run('三字经', buildSanzi)
run('弟子规', buildDizigui)
run('千字文', buildQianziwen)
run('百家姓', buildBaijiaxing)
run('声律启蒙·上卷', () => buildShenglv('primer-shenglv.ts', 'shenglvDong', '声律启蒙·上卷', '云对雨，雪对风，晚照对晴空。上卷十五个韵部，读着读着就会对对子了。', '上卷'))
run('声律启蒙·下卷', () => buildShenglv('primer-shenglv2.ts', 'shenglvJiang', '声律启蒙·下卷', '十五个新韵部，从「来对往」到「规对矩」，继续对对子。', '下卷'))
run('朱子家训', buildZhuzi)
run('增广贤文', buildZengguang)
run('幼学琼林·卷一', buildYouxue)

/* ── 译文缺口 → 任务批次 ── */
mkdirSync(resolve(DATA, 'units'), { recursive: true })
const unitsArr = [...pendingUnits.values()]
const BATCH = 50
let batchCount = 0
for (let i = 0; i < unitsArr.length; i += BATCH) {
  batchCount++
  writeFileSync(resolve(DATA, 'units', `batch-${String(batchCount).padStart(2, '0')}.json`), JSON.stringify(unitsArr.slice(i, i + BATCH), null, 1), 'utf8')
}
console.log(report.join('\n'))
console.log(`\n译文缺口：${unitsArr.length} 条 → ${batchCount} 个批次（scripts/corpus-data/units/）`)
console.log(`已载入译文：${translations.size} 条`)
