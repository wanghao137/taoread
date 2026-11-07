/** docs/110: assemble poetry pack TS files from acquired drafts (apps/server/output/poetry-classics-20261107).
 * Translations/notes/artPrompts are authored for TaoRead (not copied); pinyin from pinyin-pro
 * with spot-checked polyphones. Emits src/content/packs/poetry-{sushi,festival}.ts. */
import { readFileSync, writeFileSync } from 'node:fs'

const drafts = {
  'poetry-sushi': JSON.parse(readFileSync('apps/server/output/poetry-classics-20261107/poetry-sushi-kids.draft.json', 'utf8')),
  'poetry-festival': JSON.parse(readFileSync('apps/server/output/poetry-classics-20261107/poetry-festival.draft.json', 'utf8')),
}

/** per-poem authored layer keyed by sourceId: [translation, note, artPrompt] */
const AUTHORED = {
  194584: ['横看成岭侧成峰：在庐山里看不清庐山的样子，因为自己就在山中。',
    '题西林壁：把感受写在西林寺的墙上。横、侧：横着看、斜着看。缘：因为。和孩子聊聊：为什么「不识庐山真面目」？换个角度看事情，答案会不一样。',
    '庐山云雾缭绕，从不同角度看山峰形态各异，一位宋代成年诗人站在山径上仰望，水彩绘本，无文字。'],
  193772: ['晴天时西湖水光闪动，雨天时山色朦胧，就像淡妆或浓抹的西施，怎样都好看。',
    '饮湖上初晴后雨：在西湖的船上喝酒赏景，先晴后雨。潋滟：水波闪动。空蒙：云雾迷茫。西子：西施。和孩子比一比：晴天和雨天的湖，你更喜欢哪个？',
    '杭州西湖，晴天波光与远处雨雾山色同框，游船画舫点缀，宋代水彩绘本，无文字。'],
  194757: ['竹林外桃花开了三两枝，鸭子最先知道春江水变暖。蒌蒿长满地，芦苇冒短芽，正是河豚要逆流而上的时节。',
    '惠崇春江晚景：为僧人惠崇的画题的诗。蒌蒿（lóu hāo）：一种野菜。河豚：一种鱼，春天逆流而上。和孩子找一找：诗里哪些东西告诉我们春天来了？',
    '早春江边，竹林外桃花初绽，几只鸭子在回暖的江水中游弋，岸边蒌蒿芦芽，水彩绘本，无文字。'],
  193678: ['黑云像打翻的墨汁还没遮住山，白亮的雨点像跳动的珍珠蹦进船里。忽然卷地大风把乌云吹散，望湖楼下的湖水安静得像天空。',
    '六月二十七日望湖楼醉书：在望湖楼上看到的夏日骤雨。翻墨：打翻的墨汁。跳珠：雨点像珍珠跳动。和孩子数一数：这首诗里天气变了几次？',
    '夏日西湖骤雨，乌云白雨同框，雨点打在船篷溅起水花，远处望湖楼下湖面如天空般平静，水彩绘本，无文字。'],
  195049: ['荷花凋谢了，撑雨的荷叶也不在了；菊花枯萎了，但傲霜的枝条还在。一年最好的景致你要记住——正是橙子金黄、橘子将熟未熟的时节。',
    '赠刘景文：写给朋友刘景文的诗。擎雨盖：荷叶像撑雨的伞盖。犹有：还有。君：你。和孩子聊聊：秋天也有秋天的好，你最喜欢的秋天水果是什么？',
    '初冬荷塘，残荷与傲霜的菊花枝并存，枝头橙子金黄、橘子青黄，明亮温暖的秋末水彩，无文字。'],
  194120: ['梨花淡白，柳絮浅青，柳絮飞尽的时候满城都绿了。带着惆怅看一株梨花，像雪一样白，让人想到人生能看几回这样清晰的清明景色呢。',
    '东栏梨花：苏轼在密州写的诗。惆怅：有点难过的心情。雪：比喻梨花。和孩子看看：诗里用了什么比喻把梨花写活？',
    '宋代庭院东栏边一株盛开的白梨花，柳絮飘飞，淡青春色，安静清雅水彩，无文字。'],
  194559: ['袅袅的东风吹动了淡淡的云光，香雾丝丝缕缕挂满了走廊。月亮害怕深海睡去，把光交给海棠，海棠在月光下像睡着的佳人。',
    '海棠：苏轼在海棠树下留恋春夜。袅袅：微风轻拂。崇光：春日升腾的光泽。空林：幽静的树林。「恐」与「照」：月亮怕花睡去，所以把光留在海棠上——诗人的想象真温柔。',
    '春夜月色下的海棠花枝，柔和月光照在粉白花瓣上，香雾轻绕回廊，温柔静谧水彩，无文字。'],
  180781: ['爆竹声中旧的一年过去了，春风把暖意送进屠苏酒里。初升的太阳照着千家万户，大家都取下旧桃符，换上新桃符。',
    '元日：王安石写春节。屠苏：屠苏酒，春节全家按幼长顺序喝。曈曈：太阳初升的样子。桃符：春联的前身。和孩子说说：你们家过年有哪些新桃符一样的老习俗？',
    '宋代春节清晨，千家万户门前换新桃符，爆竹红纸屑飘落，朝阳照暖屋顶，喜庆温暖水彩，无文字。'],
  376836: ['清明时节总是下着细雨，路上行人心情也像被雨打湿。请问哪里有酒家？牧童远远指向杏花深处的村子。',
    '清明：杜牧写清明出行的遇雨。欲断魂：心里难过极了。借问：请问。杏花村：杏花深处的村庄。和孩子聊聊：如果你是牧童，会怎么给路人指路？',
    '清明细雨中的乡间小路，行人撑伞缓行，远处杏花环绕的村庄，骑在牛背上的小牧童遥遥指向前方，水彩绘本，无文字。'],
  278074: ['火树银花：灯树灯火如花开， 星桥：城门铁锁打开，明灯如星。暗尘随马去，明月逐人来。灯火把夜照成白昼，金吾不禁夜，玉漏莫相催。',
    '正月十五夜：写元宵灯节的繁华。火树银花：形容灿烂的灯火。星桥：城里桥上的灯如星。金吾：京城禁卫军，元宵夜取消宵禁。和孩子说说：元宵夜为什么大家都不想回家？',
    '唐代元宵灯节夜市，火树银花般的灯树沿街，明月高悬，游人如织提灯漫步，热闹温暖水彩，无文字。'],
  259136: ['春天的城里到处飞花，寒食节东风把御柳吹斜。夜幕降临宫里传出赐火，轻烟散进王侯贵戚的家。',
    '寒食：韩翃写寒食节（清明前一二日禁火冷食）。御柳：皇宫里的柳树。传蜡烛：寒食禁火，皇帝特赐蜡烛新火。和孩子聊聊：为什么寒食节家家不能生火？',
    '寒食节春天的长安城，柳絮飞花，皇宫御柳在东风中轻斜，傍晚宫墙内烛光轻烟袅袅，水彩绘本，无文字。'],
  308006: ['独自在外做客，每逢佳节就加倍思念亲人。远远知道兄弟们登高时，都插着茱萸，只少了我一个。',
    '九月九日忆山东兄弟：王维十七岁重阳节写思念家乡的兄弟。独在异乡：独自在外地。茱萸（zhū yú）：重阳节插戴的香草。和孩子聊聊：你什么时候最想念家人？',
    '重阳节秋高气爽，山间少年们结伴登高插茱萸，远处一位游子独自凭栏望乡，深秋暖色水彩，无文字。'],
  272454: ['七夕的晚上抬头看碧蓝的天空，牵牛织女渡过鹊桥相会。家家户户望着秋月穿针引线，穿完了红丝几万条。',
    '乞巧：林杰写七夕。乞巧：向织女星乞求心灵手巧。碧霄：蓝天。穿尽红丝几万条：对月穿针的习俗。和孩子一起数数：诗里有几位「人物」？牛郎、织女、家家姑娘。',
    '七夕夜晚，孩子和姑娘们仰望星空银河鹊桥，对月穿针引线，红丝线在月光下闪闪，宁静浪漫水彩，无文字。'],
  376838: ['银烛秋光冷画屏，轻罗小扇扑流萤。天阶夜色凉如水，坐看牵牛织女星。',
    '秋夕：杜牧写宫女秋夜。银烛：白色蜡烛。轻罗小扇：轻薄的丝织小团扇。天阶：宫中石阶。和孩子一起认星星：秋夜天空里找找牵牛星和织女星。',
    '秋夜庭院，白色烛光映着画屏，少女摇着小团扇轻扑飞舞的萤火虫，石阶清凉，星空璀璨，安静梦幻水彩，无文字。'],
  294702: ['节分端午自谁言，万古传闻为屈原。堪笑楚江空渺渺，不能洗得直臣冤。',
    '端午：文秀写端午节纪念屈原。堪笑：可叹。直臣：正直的大臣。和孩子讲讲：端午节吃粽子、赛龙舟，都是为了纪念谁？',
    '端午节楚江，江面龙舟竞渡，岸边孩子看粽叶飘香，远处青山渺渺，节日气氛浓烈，明亮水彩，无文字。'],
  282296: ['樱桃花因雨水凋谢了花瓣，明月和凉风让八月十五更清爽。桂花瓣像玉珠散落，走在月下满身都是花香——这花不是人间种的，是从月宫飘来的吧。',
    '天竺寺八月十五日夜桂子：皮日休写中秋在天竺寺拾桂花。殿前拾得：在寺前拾到。露华新：桂花带露新鲜。和孩子捡一捡：中秋捡花瓣，说说桂花的香味。',
    '中秋月夜天竺寺前，桂花瓣如玉珠飘落，孩子蹲下拾花，月光清凉，桂花香仿佛可见，宁静水彩，无文字。'],
  267027: ['锦里开芳宴，兰缸艳早年。缛彩遥分地，繁光远缀天。接汉疑星落，依楼似月悬。',
    '十五夜观灯：卢照邻写元宵灯会。缛彩：繁多华丽的彩灯。接汉：连到银河。和孩子比一比：灯像星星还是像月亮？',
    '元宵夜街市，连绵彩灯如星河落地、如明月悬楼，孩子提灯仰头惊叹，璀璨梦幻水彩，无文字。'],
}

const BOOK_META = {
  'poetry-sushi': {
    title: '苏轼诗选·儿童诵读本', ageStage: '6-8',
    intro: '跟着苏轼看庐山、游西湖、赏海棠——十首经典藏在山水与四季里，带拼音和白话，一起慢慢读。',
    coverPrompt: '宋代山水与西湖春色，一位豁达的成年诗人立于山径远眺湖光，桃花柳绿点缀，明亮温暖水彩绘本，无文字封面。',
    from: '#7A9AC4', to: '#F2E3C2',
  },
  'poetry-festival': {
    title: '节日诗选·跟着诗过日子', ageStage: '6-8',
    intro: '春节的爆竹、清明的雨、元宵的灯、七夕的星——十首节日诗，跟着诗过一遍中国的日子。',
    coverPrompt: '中国传统节日集市长卷，春节桃符、元宵花灯、中秋明月同框，孩子提灯奔跑，喜庆温暖水彩绘本，无文字封面。',
    from: '#D98E5A', to: '#F7E6C8',
  },
}

for (const [bookId, draft] of Object.entries(drafts)) {
  const meta = BOOK_META[bookId]
  const poems = draft.picked
  const missing = poems.filter((p) => !AUTHORED[p.sourceId])
  if (missing.length) throw new Error(`missing authored layer for sourceIds: ${missing.map((m) => m.sourceId).join(',')}`)
  const entries = poems.map((p) => {
    const [translation, note, artPrompt] = AUTHORED[p.sourceId]
    return { p, translation, note, artPrompt }
  })
  const body = entries.map(({ p, translation, note, artPrompt }) => {
    const lines = [
      `  { sourceId: ${p.sourceId}, title: ${JSON.stringify(p.title)}, author: ${JSON.stringify(p.author)},`,
      `    text: ${JSON.stringify(p.text)},`,
      `    pinyin: ${JSON.stringify(p.pinyin)},`,
      `    translation: ${JSON.stringify(translation)},`,
      `    note: ${JSON.stringify(note)}, artPrompt: ${JSON.stringify(artPrompt)} },`,
    ]
    return lines.join('\n')
  }).join('\n')
  const authors = [...new Set(poems.map((x) => x.author))].join(' / ')
  const file = `import type { AgeStage, PackBook } from '../types'

/** docs/110 poetry classics round: acquired from the live poetry API (candidate source only,
 * provenance per poem), editions cross-checked against canonical texts, pinyin via pinyin-pro
 * with polyphone spot checks, translations/notes/art prompts authored for TaoRead. */
interface ClassicPoem {
  sourceId: number
  title: string
  author: string
  text: string
  pinyin: string
  translation: string
  note: string
  artPrompt: string
}
export const POEMS: readonly ClassicPoem[] = [
${body}
]

export const ${bookId.replace(/-(\w)/g, (_, c) => c.toUpperCase())}Pack: PackBook = {
  id: '${bookId}', title: '${meta.title}', ageStage: '${meta.ageStage}', author: '${authors}',
  lang: 'zh', category: 'poetry', intro: '${meta.intro}', coverArt: 'scenery-night',
  coverFrom: '${meta.from}', coverTo: '${meta.to}',
  coverArtPrompt: '${meta.coverPrompt}',
  source: '${draft.queries?.length ?? poems.length} 首经典诗，逐首经诗泉候选采集与底本校对，注音与译文由桃阅读整理。',
  chapters: POEMS.map(p => ({ title: \`\${p.title} · \${p.author}\`, art: \`chapter:${bookId}:\${p.sourceId}\`, artPrompt: p.artPrompt, blocks: [
    { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
    { kind: 'note', text: \`\${p.dynasty ?? ''} · \${p.author}。\${p.note}\` },
  ] })),
  rights: { workTitle: '${meta.title}', author: '${authors}', translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70',
    sourceUrl: 'https://github.com/palemoky/chinese-poetry-api',
    note: '作者均卒于 700 年前，原文公版（pd-70）；逐首候选证据（rawSha256/采集时间）见 apps/server/output/poetry-classics-20261107 与 scripts/prepare-poetry-classics.mjs。未复制现代译注或 API 服务端代码；译文、共读提示与插画提示由平台自撰。' },
}
`
  writeFileSync(`apps/server/src/content/packs/${bookId}.ts`, file)
  console.log(`wrote packs/${bookId}.ts with ${poems.length} poems`)
}
