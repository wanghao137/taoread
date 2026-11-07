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
  { dynasty: "唐", sourceId: 354608, title: "池上·其二", author: "白居易",
    text: "小娃撑小艇，偷采白莲回。\n不解藏踪迹，浮萍一道开。",
    pinyin: "xiǎo wá chēng xiǎo tǐng ， tōu cǎi bái lián huí 。 \n bù jiě cáng zōng jì ， fú píng yí dào kāi 。",
    translation: "小娃娃撑着小船，偷偷采了池边的白莲回来。他不懂藏踪迹，小船把浮萍分开，一道长长的水路暴露了他。",
    note: "池上：白居易写小孩子偷采白莲。解：懂得。浮萍：漂在水面的小植物。和孩子聊聊：小娃哪里露出了马脚？", artPrompt: "夏日池塘，一个胖娃娃撑小船采白莲归来，浮萍分开一道水痕，乐呵呵的水彩绘本，无文字。" },
  { dynasty: "唐", sourceId: 376817, title: "赋得古原草送别", author: "白居易",
    text: "离离原上草，一岁一枯荣。\n野火烧不尽，春风吹又生。",
    pinyin: "lí lí yuán shàng cǎo ， yí suì yì kū róng 。 \n yě huǒ shāo bú jìn ， chūn fēng chuī yòu shēng 。",
    translation: "原野上的草多么茂盛，一年枯荣一轮。野火烧不尽它，春风一吹又长出来。远方的芳草蔓延到古道，晴天下一片翠绿连接着荒城。又送走一位朋友，萋萋的草都满含别情。",
    note: "赋得古原草送别：白居易十六岁写的应考诗。离离：草长得茂盛。萋萋：草丰盛的样子。和孩子背一背：前四句最有名——野火烧不尽，春风吹又生。", artPrompt: "辽阔古原野，绿草如茵蔓延到古道尽头，夕阳下两个孩子蹲在路边看草叶上的光，水彩绘本，无文字。" },
  { dynasty: "唐", sourceId: 270424, title: "暮江吟", author: "白居易",
    text: "一道残阳铺水中，半江瑟瑟半江红。\n可怜九月初三夜，露似真珠月似弓。",
    pinyin: "yí dào cán yáng pù shuǐ zhōng ， bàn jiāng sè sè bàn jiāng hóng 。 \n kě lián jiǔ yuè chū sān yè ， lù sì zhēn zhū yuè sì gōng 。",
    translation: "一道残阳铺在江面上，半江是碧绿半江是艳红。最可爱的是九月初三的夜晚，露珠像珍珠，月亮像弯弓。",
    note: "暮江吟：白居易写黄昏到夜晚的江景。瑟瑟：碧绿色。可怜：可爱。和孩子观察：太阳快落山时，江面是不是一半绿一半红？", artPrompt: "黄昏江面，残阳把水染成半绿半红，九月初三夜空挂一弯新月，草叶露珠闪光，水彩绘本，无文字。" },
  { dynasty: "唐", sourceId: 269643, title: "夜雪", author: "白居易",
    text: "已讶衾枕冷，复见窗户明。\n夜深知雪重，时闻折竹声。",
    pinyin: "yǐ yà qīn zhěn lěng ， fù jiàn chuāng hù míng 。 \n yè shēn zhī xuě zhòng ， shí wén zhé zhú shēng 。",
    translation: "夜里惊讶被子枕头这么冷，又看见窗户格外明亮。夜深了，知道雪下得很大，不时听到竹子被雪压折的声音。",
    note: "夜雪：白居易全篇写雪却不直接写雪的样子，全靠感觉：冷、亮、声。折竹：雪压断竹枝。和孩子玩一玩：下雪时闭上眼睛，能「听」出雪有多大吗？", artPrompt: "冬夜雪屋，窗纸透出雪的明亮，院中竹子被厚雪压弯，安静清冷的水彩绘本，无文字。" },
  { dynasty: "唐", sourceId: 271988, title: "白云泉", author: "白居易",
    text: "天平山上白云泉，云自无心水自闲。\n何必奔冲山下去，更添波浪向人间。",
    pinyin: "tiān píng shān shàng bái yún quán ， yún zì wú xīn shuǐ zì xián 。 \n hé bì bēn chōng shān xià qù ， gèng tiān bō làng xiàng rén jiān 。",
    translation: "天平山上白云泉，云自无心水自闲。何必奔冲山下去，更添波浪向人间。",
    note: "白云泉：白居易在苏州写泉水。无心：没有心机、自由自在。和孩子聊聊：白云和水为什么「闲」？", artPrompt: "天平山清泉石上流，白云悠悠山顶飘，一个孩子蹲在泉边看水中云影，恬淡水彩，无文字。" },
  { dynasty: "唐", sourceId: 269796, title: "邯郸冬至夜思家", author: "白居易",
    text: "邯郸驿里逢冬至，抱膝灯前影伴身。\n想得家中夜深坐，还应说着远行人。",
    pinyin: "hán dān yì lǐ féng dōng zhì ， bào xī dēng qián yǐng bàn shēn 。 \n xiǎng dé jiā zhōng yè shēn zuò ， hái yìng shuō zhe yuǎn xíng rén 。",
    translation: "住在邯郸客栈正逢冬至，抱着膝盖坐在灯前，只有影子作伴。想来家里人今晚围坐到深夜，还该说起我这个远行的人吧。",
    note: "邯郸冬至夜思家：白居易冬至夜想家。抱膝：抱着膝盖坐着。远行人：诗人自己。和孩子聊聊：你想念远方的人时，会做什么？", artPrompt: "冬至夜驿站小屋，一盏油灯映出诗人抱着膝盖的影子，窗外落雪，思念温暖的水彩，无文字。" },
]

export const baijuyiPack: PackBook = {
  id: 'poetry-baijuyi', title: '白居易诗选·儿童诵读本', ageStage: '6-8', author: '白居易',
  lang: 'zh', category: 'poetry', intro: '偷采白莲的小娃、被野火烧不尽的草、半江碧绿半江红——六首白居易，藏着孩子最懂的小心思。', coverArt: 'scenery-night',
  coverFrom: '#8FAE8B', coverTo: '#F5E9CB',
  coverArtPrompt: '江南夏日，荷塘小船与绿草古原同框，一个孩子撑船微笑，温暖明亮水彩绘本，无文字封面。',
  source: '6 首经典诗，逐首经诗泉候选采集与底本校对，注音与译文由桃阅读整理。',
  chapters: POEMS.map(p => ({ title: `${p.title} · ${p.author}`, art: `chapter:poetry-baijuyi:${p.sourceId}`, artPrompt: p.artPrompt, blocks: [
    { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
    { kind: 'note', text: `${p.dynasty} · ${p.author}。${p.note}` },
  ] })),
  rights: { workTitle: '白居易诗选·儿童诵读本', author: '白居易', translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70',
    sourceUrl: 'https://github.com/palemoky/chinese-poetry-api',
    note: '作者均卒于 700 年前，原文公版（pd-70）；逐首候选证据（rawSha256/采集时间）见 apps/server/output/poetry-classics-20261107 与 scripts/prepare-poetry-classics.mjs。未复制现代译注或 API 服务端代码；译文、共读提示与插画提示由平台自撰。' },
}
