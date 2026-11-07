import type { PackBook } from '../types'

/** docs/110-2 poetry classics round 2: acquired from the live poetry API (candidate source only,
 * provenance per poem), canonical-text cross-checks, pinyin via pinyin-pro with polyphone spot
 * checks, translations/notes/art prompts authored for TaoRead. */
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
  { dynasty: "唐", sourceId: 277987, title: "风", author: "李峤",
    text: "解落三秋叶，能开二月花。\n过江千尺浪，入竹万竿斜。",
    pinyin: "jiě luò sān qiū yè ， néng kāi èr yuè huā 。 \n guò jiāng qiān chǐ làng ， rù zhú wàn gān xié 。",
    translation: "能吹落秋天的叶子，能吹开春天的花朵。刮过江面能掀起千尺巨浪，吹进竹林能让万竿斜斜摇曳。",
    note: "风：李峤全篇都在写风，却没有一个「风」字。三秋：深秋。和孩子猜一猜：这首诗写的是什么？答案藏在每一句里。", artPrompt: "风的无形之力：秋叶飘落、春花摇曳、江面巨浪、竹林倾斜，四景联动的动感水彩，无文字。" },
  { dynasty: "唐", sourceId: 285103, title: "蜂", author: "罗隐",
    text: "不论平地与山尖，无限风光尽被占。\n采得百花成蜜后，为谁辛苦为谁甜。",
    pinyin: "bú lùn píng dì yǔ shān jiān ， wú xiàn fēng guāng jìn bèi zhàn 。 \n cǎi dé bǎi huā chéng mì hòu ， wèi shuí xīn kǔ wèi shuí tián 。",
    translation: "不论平地还是山顶，无限风光都被占尽。采得百花成蜜后，为谁辛苦为谁甜？",
    note: "蜂：罗隐写蜜蜂的勤劳。占：占据。和孩子聊聊：蜜蜂采蜜为了谁？像不像忙碌的爸爸妈妈？", artPrompt: "春日花田，蜜蜂在百花间忙碌采蜜，特写蜂翼上花粉，明亮通透的水彩，无文字。" },
  { dynasty: "唐", sourceId: 266827, title: "蝉", author: "虞世南",
    text: "垂緌饮清露，流响出疏桐。\n居高声自远，非是藉秋风。",
    pinyin: "chuí ruí yǐn qīng lù ， liú xiǎng chū shū tóng 。 \n jū gāo shēng zì yuǎn ， fēi shì jiè qiū fēng 。",
    translation: "蝉垂下触角吸着清露，声音从疏朗的梧桐间传出。它身居高处，声音自然传得远，并不是借了秋风。",
    note: "蝉：虞世南写蝉的高洁。緌：蝉触角。藉：凭借。和孩子聊聊：站得高为什么声音传得远？", artPrompt: "夏日梧桐枝头一只蝉，翅翼透明，阳光穿过树叶洒下光斑，高远清亮的水彩，无文字。" },
  { dynasty: "唐", sourceId: 49219, title: "过松源晨炊漆公店六首  其五", author: "杨万里",
    text: "莫言下岭便无难，赚得行人错喜欢。\n正入万山围子里，一山放出一山拦。",
    pinyin: "mò yán xià lǐng biàn wú nán ， zhuàn dé xíng rén cuò xǐ huan 。 \n zhèng rù wàn shān wéi zǐ lǐ ， yì shān fàng chū yì shān lán 。",
    translation: "下山时不要说下山容易——没有下山的人空喜欢一场。正在山里的人最喜欢平地，到得平地，前面的山峰又挡住了路。",
    note: "过松源晨炊漆公店：杨万里写翻山的哲理。空喜欢：白白高兴。拦：阻挡。和孩子聊聊：翻过一座山还有山，像不像做作业？", artPrompt: "连绵群山间的小路，一个挑担的旅人翻过山冈又见前方山峰，层峦叠嶂水彩，无文字。" },
  { dynasty: "唐", sourceId: 45269, title: "夏夜追凉", author: "杨万里",
    text: "夜热依然午热同，开门小立月明中。\n竹深树密虫鸣处，时有微凉不是风。",
    pinyin: "yè rè yī rán wǔ rè tóng ， kāi mén xiǎo lì yuè míng zhōng 。 \n zhú shēn shù mì chóng míng chù ， shí yǒu wēi liáng bú shì fēng 。",
    translation: "夜里还是那么热，中午也一样。打开小门立在月光下，深深的竹林里虫声嗡嗡，偶尔有点凉意，但不是风——是夜深的缘故。",
    note: "夏夜追凉：杨万里写找凉快。追凉：找凉快处。和孩子说说：没有空调的古人，夏天怎么过夜？", artPrompt: "夏夜小院，孩子推开小门站在月光下，竹林虫鸣，萤火点点，安静清凉水彩，无文字。" },
  { dynasty: "唐", sourceId: 49151, title: "桑茶坑道中八首  其七", author: "杨万里",
    text: "晴明风日雨干时，草满花堤水满溪。\n童子柳阴眠正着，一牛吃过柳阴西。",
    pinyin: "qíng míng fēng rì yǔ gān shí ， cǎo mǎn huā dī shuǐ mǎn xī 。 \n tóng zǐ liǔ yīn mián zhèng zháo ， yì niú chī guò liǔ yīn xī 。",
    translation: "雨过天晴，草地开满小花，溪水涨得满满的。一个小孩子躺在柳荫下睡得正香，一头牛悠闲地吃着草，不知不觉吃过了柳荫的西边。",
    note: "桑茶坑道中：杨万里写夏日路边的闲适。隄：即「堤」，河堤。和孩子画一画：诗里有一个睡着的小孩和一头牛，分别在画面的哪里？", artPrompt: "夏日雨后，溪水涨满花草地岸，柳荫下一个孩子睡得香甜，一头牛悠闲吃草走过，田园牧歌水彩，无文字。" },
  { dynasty: "唐", sourceId: 47087, title: "插秧歌", author: "杨万里",
    text: "田夫抛秧田妇接，小儿拔秧大儿插。\n笠是兜鍪蓑是甲，雨从头上湿到胛。\n唤渠朝餐歇半霎，低头折腰只不答。\n秧根未牢莳未匝，照管鹅儿与雏鸭。",
    pinyin: "tián fū pāo yāng tián fù jiē ， xiǎo ér bá yāng dà ér chā 。 \n lì shì dōu móu suō shì jiǎ ， yǔ cóng tóu shàng shī dào jiǎ 。 \n huàn qú cháo cān xiē bàn shà ， dī tóu zhé yāo zhī bù dá 。 \n yāng gēn wèi láo shì wèi zā ， zhào guǎn é ér yǔ chú yā 。",
    translation: "田里的丈夫把秧苗抛过来，妻子接住，小儿子拔秧，大儿子插秧。斗笠当头盔，蓑衣当铠甲，雨从头上湿到肩膀。喊他吃口饭歇一歇，他低头弯腰只顾干活不答应——秧根还没插牢，活儿还没干完，还要小心看好家里的鹅儿和雏鸭别踩了田。",
    note: "插秧歌：杨万里写全家冒雨插秧的忙碌。兜鍪：头盔。蓑：蓑衣。莳未匝：插秧还没插完。和孩子数一数：诗里一家人有几个动作？抛、接、拔、插，还要看住鹅和鸭！", artPrompt: "春雨水田，一家人分工插秧：父抛秧母接秧兄弟拔插，斗笠蓑衣滴着雨水，田埂上鹅鸭徘徊，劳动欢快水彩，无文字。" },
  { dynasty: "唐", sourceId: 44392, title: "四时田园杂兴六十首 晚春田园杂兴十二绝 其二", author: "范成大",
    text: "蝴蝶双双入菜花，日长无客到田家。\n鸡飞过篱犬吠窦，知有行商来买茶。",
    pinyin: "hú dié shuāng shuāng rù cài huā ， rì cháng wú kè dào tián jiā 。 \n jī fēi guò lí quǎn fèi dòu ， zhī yǒu xíng shāng lái mǎi chá 。",
    translation: "蝴蝶双双飞进菜花田，白昼变长，田家里半天也没有客人来。鸡飞过篱笆、狗在洞口叫——原来有走村串巷的商人来买茶啦。",
    note: "晚春田园杂兴：范成大写村居的安静与热闹。犬吠窦：狗在墙洞口叫。行商：走村串巷的买卖人。和孩子玩一玩：鸡飞狗叫的时候，村里发生了什么事？", artPrompt: "晚春菜花田，蝴蝶双双飞舞，篱笆内鸡飞狗吠，一位挑担的卖茶商人走近村舍，生活气息水彩，无文字。" },
  { dynasty: "唐", sourceId: 44379, title: "四时田园杂兴六十首 春日田园杂兴十二绝 其二", author: "范成大",
    text: "土膏欲动雨频催，万草千花一饷开。\n舍后荒畦犹绿秀，邻家鞭笋过墙来。",
    pinyin: "tǔ gāo yù dòng yǔ pín cuī ， wàn cǎo qiān huā yì xiǎng kāi 。 \n shè hòu huāng qí yóu lǜ xiù ， lín jiā biān sǔn guò qiáng lái 。",
    translation: "泥土苏醒，春雨频频来催，千花万草一下子全开了。屋后的荒地还绿茸茸的，邻居家的竹鞭笋已经悄悄钻过墙来啦。",
    note: "春日田园杂兴：范成大写春意。土膏：肥沃的泥土。一饷：一晌，一会儿。鞭笋：竹鞭上的嫩笋。和孩子找一找：邻居家的笋是怎么「过墙」的？", artPrompt: "春日院落，屋后荒畦绿意盎然，邻家嫩笋破土钻过墙根，千花万草竞放，生机勃勃水彩，无文字。" },
  { dynasty: "唐", sourceId: 376833, title: "悯农（之一）", author: "李绅",
    text: "锄禾日当午，汗滴禾下土。\n谁知盘中餐，粒粒皆辛苦。",
    pinyin: "chú hé rì dāng wǔ ， hàn dī hé xià tǔ 。 \n shuí zhī pán zhōng cān ， lì lì jiē xīn kǔ 。",
    translation: "锄地正当年头烈的日头，汗水一滴滴落进禾下的土里。有谁知道盘中的每一粒饭，都是这样辛苦得来的。",
    note: "悯农：李绅写农民的辛苦。皆：都。和孩子背一背：谁知盘中餐，粒粒皆辛苦——吃饭前想一想。", artPrompt: "烈日下的稻田，农民弯腰锄草汗滴入土，饭碗里白米饭冒着热气，教育深意的水彩，无文字。" },
]

export const summerNaturePack: PackBook = {
  id: 'poetry-summer-nature', title: '夏日自然诗选·风蜂蝉与田野', ageStage: '6-8', author: '李峤 / 罗隐 / 虞世南 / 杨万里 / 范成大 / 李绅',
  lang: 'zh', category: 'poetry', intro: '看不见的风、忙忙碌碌的蜂、树上的蝉、追蝴蝶的孩子、学种瓜的娃娃——十一首诗，把夏天读给你听。', coverArt: 'scenery-night',
  coverFrom: '#6FA85E', coverTo: '#F7E8B5',
  coverArtPrompt: '夏日自然长卷，梧桐蝉鸣、菜花蝴蝶、水田插秧、竹林月光同框，孩子奔跑其间，明快水彩绘本，无文字封面。',
  source: '10 首经典诗，逐首经诗泉候选采集与底本校对，注音与译文由桃阅读整理。',
  chapters: POEMS.map(p => ({ title: `${p.title} · ${p.author}`, art: `chapter:poetry-summer-nature:${p.sourceId}`, artPrompt: p.artPrompt, blocks: [
    { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
    { kind: 'note', text: `${p.dynasty} · ${p.author}。${p.note}` },
  ] })),
  rights: { workTitle: '夏日自然诗选·风蜂蝉与田野', author: '李峤 / 罗隐 / 虞世南 / 杨万里 / 范成大 / 李绅', translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70',
    sourceUrl: 'https://github.com/palemoky/chinese-poetry-api',
    note: '作者均卒于 700 年前，原文公版（pd-70）；逐首候选证据（rawSha256/采集时间）见 apps/server/output/poetry-classics-20261107 与 scripts/prepare-poetry-classics.mjs。未复制现代译注或 API 服务端代码；译文、共读提示与插画提示由平台自撰。' },
}
