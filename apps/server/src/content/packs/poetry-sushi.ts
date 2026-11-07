import type { AgeStage, PackBook } from '../types'

/** docs/110 poetry classics round: acquired from the live poetry API (candidate source only,
 * provenance per poem), editions cross-checked against canonical texts, pinyin via pinyin-pro
 * with polyphone spot checks, translations/notes/art prompts authored for TaoRead. */
interface ClassicPoem {
  dynasty: string
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
  { dynasty: "宋", sourceId: 194584, title: "题西林壁", author: "苏轼",
    text: "横看成岭侧成峰，远近高低总不同。\n不识庐山真面目，只缘身在此山中。",
    pinyin: "héng kàn chéng lǐng cè chéng fēng ， yuǎn jìn gāo dī zǒng bù tóng 。 \n bù shí lú shān zhēn miàn mù ， zhī yuán shēn zài cǐ shān zhōng 。",
    translation: "横看成岭侧成峰：在庐山里看不清庐山的样子，因为自己就在山中。",
    note: "题西林壁：把感受写在西林寺的墙上。横、侧：横着看、斜着看。缘：因为。和孩子聊聊：为什么「不识庐山真面目」？换个角度看事情，答案会不一样。", artPrompt: "庐山云雾缭绕，从不同角度看山峰形态各异，一位宋代成年诗人站在山径上仰望，水彩绘本，无文字。" },
  { dynasty: "宋", sourceId: 193772, title: "饮湖上初晴后雨·其二", author: "苏轼",
    text: "水光潋滟晴方好，山色空蒙雨亦奇。\n若把西湖比西子，淡妆浓抹总相宜。",
    pinyin: "shuǐ guāng liàn yàn qíng fāng hǎo ， shān sè kōng méng yǔ yì qí 。 \n ruò bǎ xī hú bǐ xī zǐ ， dàn zhuāng nóng mǒ zǒng xiāng yí 。",
    translation: "晴天时西湖水光闪动，雨天时山色朦胧，就像淡妆或浓抹的西施，怎样都好看。",
    note: "饮湖上初晴后雨：在西湖的船上喝酒赏景，先晴后雨。潋滟：水波闪动。空蒙：云雾迷茫。西子：西施。和孩子比一比：晴天和雨天的湖，你更喜欢哪个？", artPrompt: "杭州西湖，晴天波光与远处雨雾山色同框，游船画舫点缀，宋代水彩绘本，无文字。" },
  { dynasty: "宋", sourceId: 194757, title: "惠崇春江晚景·其一", author: "苏轼",
    text: "竹外桃花三两枝，春江水暖鸭先知。\n蒌蒿满地芦芽短，正是河豚欲上时。",
    pinyin: "zhú wài táo huā sān liǎng zhī ， chūn jiāng shuǐ nuǎn yā xiān zhī 。 \n lóu hāo mǎn dì lú yá duǎn ， zhèng shì hé tún yù shàng shí 。",
    translation: "竹林外桃花开了三两枝，鸭子最先知道春江水变暖。蒌蒿长满地，芦苇冒短芽，正是河豚要逆流而上的时节。",
    note: "惠崇春江晚景：为僧人惠崇的画题的诗。蒌蒿（lóu hāo）：一种野菜。河豚：一种鱼，春天逆流而上。和孩子找一找：诗里哪些东西告诉我们春天来了？", artPrompt: "早春江边，竹林外桃花初绽，几只鸭子在回暖的江水中游弋，岸边蒌蒿芦芽，水彩绘本，无文字。" },
  { dynasty: "宋", sourceId: 193678, title: "六月二十七日望湖楼醉书·其一", author: "苏轼",
    text: "黑云翻墨未遮山，白雨跳珠乱入船。\n卷地风来忽吹散，望湖楼下水如天。",
    pinyin: "hēi yún fān mò wèi zhē shān ， bái yǔ tiào zhū luàn rù chuán 。 \n juàn dì fēng lái hū chuī sàn ， wàng hú lóu xià shuǐ rú tiān 。",
    translation: "黑云像打翻的墨汁还没遮住山，白亮的雨点像跳动的珍珠蹦进船里。忽然卷地大风把乌云吹散，望湖楼下的湖水安静得像天空。",
    note: "六月二十七日望湖楼醉书：在望湖楼上看到的夏日骤雨。翻墨：打翻的墨汁。跳珠：雨点像珍珠跳动。和孩子数一数：这首诗里天气变了几次？", artPrompt: "夏日西湖骤雨，乌云白雨同框，雨点打在船篷溅起水花，远处望湖楼下湖面如天空般平静，水彩绘本，无文字。" },
  { dynasty: "宋", sourceId: 195049, title: "赠刘景文", author: "苏轼",
    text: "荷尽已无擎雨盖，菊残犹有傲霜枝。\n一年好景君须记，正是橙黄橘绿时。",
    pinyin: "hé jìn yǐ wú qíng yǔ gài ， jú cán yóu yǒu ào shuāng zhī 。 \n yì nián hǎo jǐng jūn xū jì ， zhèng shì chéng huáng jú lǜ shí 。",
    translation: "荷花凋谢了，撑雨的荷叶也不在了；菊花枯萎了，但傲霜的枝条还在。一年最好的景致你要记住——正是橙子金黄、橘子将熟未熟的时节。",
    note: "赠刘景文：写给朋友刘景文的诗。擎雨盖：荷叶像撑雨的伞盖。犹有：还有。君：你。和孩子聊聊：秋天也有秋天的好，你最喜欢的秋天水果是什么？", artPrompt: "初冬荷塘，残荷与傲霜的菊花枝并存，枝头橙子金黄、橘子青黄，明亮温暖的秋末水彩，无文字。" },
  { dynasty: "宋", sourceId: 194120, title: "东栏梨花", author: "苏轼",
    text: "梨花淡白柳深青，柳絮飞时花满城。\n惆怅东栏二株雪，人生看得几清明。",
    pinyin: "lí huā dàn bái liǔ shēn qīng ， liǔ xù fēi shí huā mǎn chéng 。 \n chóu chàng dōng lán èr zhū xuě ， rén shēng kàn dé jǐ qīng míng 。",
    translation: "梨花淡白，柳絮浅青，柳絮飞尽的时候满城都绿了。带着惆怅看一株梨花，像雪一样白，让人想到人生能看几回这样清晰的清明景色呢。",
    note: "东栏梨花：苏轼在密州写的诗。惆怅：有点难过的心情。雪：比喻梨花。和孩子看看：诗里用了什么比喻把梨花写活？", artPrompt: "宋代庭院东栏边一株盛开的白梨花，柳絮飘飞，淡青春色，安静清雅水彩，无文字。" },
  { dynasty: "宋", sourceId: 194559, title: "海棠", author: "苏轼",
    text: "东风袅袅泛崇光，香雾空蒙月转廊。\n只恐夜深花睡去，故烧高烛照红妆。",
    pinyin: "dōng fēng niǎo niǎo fàn chóng guāng ， xiāng wù kōng méng yuè zhuǎn láng 。 \n zhī kǒng yè shēn huā shuì qù ， gù shāo gāo zhú zhào hóng zhuāng 。",
    translation: "袅袅的东风吹动了淡淡的云光，香雾丝丝缕缕挂满了走廊。月亮害怕深海睡去，把光交给海棠，海棠在月光下像睡着的佳人。",
    note: "海棠：苏轼在海棠树下留恋春夜。袅袅：微风轻拂。崇光：春日升腾的光泽。空林：幽静的树林。「恐」与「照」：月亮怕花睡去，所以把光留在海棠上——诗人的想象真温柔。", artPrompt: "春夜月色下的海棠花枝，柔和月光照在粉白花瓣上，香雾轻绕回廊，温柔静谧水彩，无文字。" },
]

export const poetrySushiPack: PackBook = {
  id: 'poetry-sushi', title: '苏轼诗选·儿童诵读本', ageStage: '6-8', author: '苏轼',
  lang: 'zh', category: 'poetry', intro: '跟着苏轼看庐山、游西湖、赏海棠——十首经典藏在山水与四季里，带拼音和白话，一起慢慢读。', coverArt: 'scenery-night',
  coverFrom: '#7A9AC4', coverTo: '#F2E3C2',
  coverArtPrompt: '宋代山水与西湖春色，一位豁达的成年诗人立于山径远眺湖光，桃花柳绿点缀，明亮温暖水彩绘本，无文字封面。',
  source: '10 首经典诗，逐首经诗泉候选采集与底本校对，注音与译文由桃阅读整理。',
  chapters: POEMS.map(p => ({ title: `${p.title} · ${p.author}`, art: `chapter:poetry-sushi:${p.sourceId}`, artPrompt: p.artPrompt, blocks: [
    { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
    { kind: 'note', text: `${p.dynasty ?? ''} · ${p.author}。${p.note}` },
  ] })),
  rights: { workTitle: '苏轼诗选·儿童诵读本', author: '苏轼', translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70',
    sourceUrl: 'https://github.com/palemoky/chinese-poetry-api',
    note: '作者均卒于 700 年前，原文公版（pd-70）；逐首候选证据（rawSha256/采集时间）见 apps/server/output/poetry-classics-20261107 与 scripts/prepare-poetry-classics.mjs。未复制现代译注或 API 服务端代码；译文、共读提示与插画提示由平台自撰。' },
}
