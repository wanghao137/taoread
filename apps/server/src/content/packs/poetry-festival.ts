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
  { dynasty: "宋", sourceId: 180781, title: "元日", author: "王安石",
    text: "爆竹声中一岁除，东风送暖入屠苏。\n千门万户曈曈日，总把新桃换旧符。",
    pinyin: "bào zhú shēng zhōng yí suì chú ， dōng fēng sòng nuǎn rù tú sū 。 \n qiān mén wàn hù tóng tóng rì ， zǒng bǎ xīn táo huàn jiù fú 。",
    translation: "爆竹声中旧的一年过去了，春风把暖意送进屠苏酒里。初升的太阳照着千家万户，大家都取下旧桃符，换上新桃符。",
    note: "元日：王安石写春节。屠苏：屠苏酒，春节全家按幼长顺序喝。曈曈：太阳初升的样子。桃符：春联的前身。底本作「争插」，课本作「总把」，从课本。和孩子说说：你们家过年有哪些新桃符一样的老习俗？", artPrompt: "宋代春节清晨，千家万户门前换新桃符，爆竹红纸屑飘落，朝阳照暖屋顶，喜庆温暖水彩，无文字。" },
  { dynasty: "唐", sourceId: 376836, title: "清明", author: "杜牧",
    text: "清明时节雨纷纷，路上行人欲断魂。\n借问酒家何处有，牧童遥指杏花村。",
    pinyin: "qīng míng shí jié yǔ fēn fēn ， lù shàng xíng rén yù duàn hún 。 \n jiè wèn jiǔ jiā hé chù yǒu ， mù tóng yáo zhǐ xìng huā cūn 。",
    translation: "清明时节总是下着细雨，路上行人心情也像被雨打湿。请问哪里有酒家？牧童远远指向杏花深处的村子。",
    note: "清明：杜牧写清明出行的遇雨。欲断魂：心里难过极了。借问：请问。杏花村：杏花深处的村庄。和孩子聊聊：如果你是牧童，会怎么给路人指路？", artPrompt: "清明细雨中的乡间小路，行人撑伞缓行，远处杏花环绕的村庄，骑在牛背上的小牧童遥遥指向前方，水彩绘本，无文字。" },
  { dynasty: "唐", sourceId: 259136, title: "寒食", author: "韩翃",
    text: "春城无处不飞花，寒食东风御柳斜。\n日暮汉宫传蜡烛，轻烟散入五侯家。",
    pinyin: "chūn chéng wú chù bù fēi huā ， hán shí dōng fēng yù liǔ xié 。 \n rì mù hàn gōng chuán là zhú ， qīng yān sàn rù wǔ hóu jiā 。",
    translation: "春天的城里到处飞花，寒食节东风把御柳吹斜。夜幕降临宫里传出赐火，轻烟散进王侯贵戚的家。",
    note: "寒食：韩翃写寒食节（清明前一二日禁火冷食）。御柳：皇宫里的柳树。传蜡烛：寒食禁火，皇帝特赐蜡烛新火。和孩子聊聊：为什么寒食节家家不能生火？", artPrompt: "寒食节春天的长安城，柳絮飞花，皇宫御柳在东风中轻斜，傍晚宫墙内烛光轻烟袅袅，水彩绘本，无文字。" },
  { dynasty: "唐", sourceId: 308006, title: "九月九日忆山东兄弟", author: "王维",
    text: "独在异乡为异客，每逢佳节倍思亲。\n遥知兄弟登高处，遍插茱萸少一人。",
    pinyin: "dú zài yì xiāng wèi yì kè ， měi féng jiā jié bèi sī qīn 。 \n yáo zhī xiōng dì dēng gāo chù ， biàn chā zhū yú shǎo yì rén 。",
    translation: "独自在外做客，每逢佳节就加倍思念亲人。远远知道兄弟们登高时，都插着茱萸，只少了我一个。",
    note: "九月九日忆山东兄弟：王维十七岁重阳节写思念家乡的兄弟。独在异乡：独自在外地。茱萸（zhū yú）：重阳节插戴的香草。和孩子聊聊：你什么时候最想念家人？", artPrompt: "重阳节秋高气爽，山间少年们结伴登高插茱萸，远处一位游子独自凭栏望乡，深秋暖色水彩，无文字。" },
  { dynasty: "唐", sourceId: 272454, title: "乞巧", author: "林杰",
    text: "七夕今宵看碧霄，牵牛织女渡河桥。\n家家乞巧望秋月，穿尽红丝几万条。",
    pinyin: "qī xī jīn xiāo kàn bì xiāo ， qiān niú zhī nǚ dù hé qiáo 。 \n jiā jiā qǐ qiǎo wàng qiū yuè ， chuān jìn hóng sī jǐ wàn tiáo 。",
    translation: "七夕的晚上抬头看碧蓝的天空，牵牛织女渡过鹊桥相会。家家户户望着秋月穿针引线，穿完了红丝几万条。",
    note: "乞巧：林杰写七夕。乞巧：向织女星乞求心灵手巧。碧霄：蓝天。穿尽红丝几万条：对月穿针的习俗。和孩子一起数数：诗里有几位「人物」？牛郎、织女、家家姑娘。", artPrompt: "七夕夜晚，孩子和姑娘们仰望星空银河鹊桥，对月穿针引线，红丝线在月光下闪闪，宁静浪漫水彩，无文字。" },
  { dynasty: "唐", sourceId: 376838, title: "秋夕", author: "杜牧",
    text: "银烛秋光冷画屏，轻罗小扇扑流萤。\n天阶夜色凉如水，坐看牵牛织女星。",
    pinyin: "yín zhú qiū guāng lěng huà píng ， qīng luó xiǎo shàn pū liú yíng 。 \n tiān jiē yè sè liáng rú shuǐ ， zuò kàn qiān niú zhī nǚ xīng 。",
    translation: "银烛秋光冷画屏，轻罗小扇扑流萤。天阶夜色凉如水，坐看牵牛织女星。",
    note: "秋夕：杜牧写宫女秋夜。银烛：白色蜡烛。轻罗小扇：轻薄的丝织小团扇。天阶：宫中石阶。和孩子一起认星星：秋夜天空里找找牵牛星和织女星。", artPrompt: "秋夜庭院，白色烛光映着画屏，少女摇着小团扇轻扑飞舞的萤火虫，石阶清凉，星空璀璨，安静梦幻水彩，无文字。" },
  { dynasty: "唐", sourceId: 294702, title: "端午", author: "文秀",
    text: "节分端午自谁言，万古传闻为屈原。\n堪笑楚江空渺渺，不能洗得直臣冤。",
    pinyin: "jié fēn duān wǔ zì shuí yán ， wàn gǔ chuán wén wèi qū yuán 。 \n kān xiào chǔ jiāng kōng miǎo miǎo ， bù néng xǐ dé zhí chén yuān 。",
    translation: "节分端午自谁言，万古传闻为屈原。堪笑楚江空渺渺，不能洗得直臣冤。",
    note: "端午：文秀写端午节纪念屈原。堪笑：可叹。直臣：正直的大臣。和孩子讲讲：端午节吃粽子、赛龙舟，都是为了纪念谁？", artPrompt: "端午节楚江，江面龙舟竞渡，岸边孩子看粽叶飘香，远处青山渺渺，节日气氛浓烈，明亮水彩，无文字。" },
  { dynasty: "唐", sourceId: 282296, title: "天竺寺八月十五日夜桂子", author: "皮日休",
    text: "玉颗珊珊下月轮，殿前拾得露华新。\n至今不会天中事，应是嫦娥掷与人。",
    pinyin: "yù kē shān shān xià yuè lún ， diàn qián shí dé lù huá xīn 。 \n zhì jīn bú huì tiān zhōng shì ， yìng shì cháng é zhì yǔ rén 。",
    translation: "樱桃花因雨水凋谢了花瓣，明月和凉风让八月十五更清爽。桂花瓣像玉珠散落，走在月下满身都是花香——这花不是人间种的，是从月宫飘来的吧。",
    note: "天竺寺八月十五日夜桂子：皮日休写中秋在天竺寺拾桂花。殿前拾得：在寺前拾到。露华新：桂花带露新鲜。和孩子捡一捡：中秋捡花瓣，说说桂花的香味。", artPrompt: "中秋月夜天竺寺前，桂花瓣如玉珠飘落，孩子蹲下拾花，月光清凉，桂花香仿佛可见，宁静水彩，无文字。" },
  { dynasty: "唐", sourceId: 267027, title: "十五夜观灯", author: "卢照邻",
    text: "锦里开芳宴，兰缸艳早年。\n缛彩遥分地，繁光远缀天。\n接汉疑星落，依楼似月悬。\n别有千金笑，来映九枝前。",
    pinyin: "jǐn lǐ kāi fāng yàn ， lán gāng yàn zǎo nián 。 \n rù cǎi yáo fēn dì ， fán guāng yuǎn zhuì tiān 。 \n jiē hàn yí xīng luò ， yī lóu sì yuè xuán 。 \n bié yǒu qiān jīn xiào ， lái yìng jiǔ zhī qián 。",
    translation: "锦里开芳宴，兰缸艳早年。缛彩遥分地，繁光远缀天。接汉疑星落，依楼似月悬。",
    note: "十五夜观灯：卢照邻写元宵灯会。缛彩：繁多华丽的彩灯。接汉：连到银河。和孩子比一比：灯像星星还是像月亮？", artPrompt: "元宵夜街市，连绵彩灯如星河落地、如明月悬楼，孩子提灯仰头惊叹，璀璨梦幻水彩，无文字。" },
]

export const poetryFestivalPack: PackBook = {
  id: 'poetry-festival', title: '节日诗选·跟着诗过日子', ageStage: '6-8', author: '王安石 / 杜牧 / 苏味道 / 韩翃 / 王维 / 林杰 / 文秀 / 皮日休 / 卢照邻',
  lang: 'zh', category: 'poetry', intro: '春节的爆竹、清明的雨、元宵的灯、七夕的星——十首节日诗，跟着诗过一遍中国的日子。', coverArt: 'scenery-night',
  coverFrom: '#D98E5A', coverTo: '#F7E6C8',
  coverArtPrompt: '中国传统节日集市长卷，春节桃符、元宵花灯、中秋明月同框，孩子提灯奔跑，喜庆温暖水彩绘本，无文字封面。',
  source: '11 首经典诗，逐首经诗泉候选采集与底本校对，注音与译文由桃阅读整理。',
  chapters: POEMS.map(p => ({ title: `${p.title} · ${p.author}`, art: `chapter:poetry-festival:${p.sourceId}`, artPrompt: p.artPrompt, blocks: [
    { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
    { kind: 'note', text: `${p.dynasty ?? ''} · ${p.author}。${p.note}` },
  ] })),
  rights: { workTitle: '节日诗选·跟着诗过日子', author: '王安石 / 杜牧 / 苏味道 / 韩翃 / 王维 / 林杰 / 文秀 / 皮日休 / 卢照邻', translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70',
    sourceUrl: 'https://github.com/palemoky/chinese-poetry-api',
    note: '作者均卒于 700 年前，原文公版（pd-70）；逐首候选证据（rawSha256/采集时间）见 apps/server/output/poetry-classics-20261107 与 scripts/prepare-poetry-classics.mjs。未复制现代译注或 API 服务端代码；译文、共读提示与插画提示由平台自撰。' },
}
