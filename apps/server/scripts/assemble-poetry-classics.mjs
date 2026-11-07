/** docs/110-2: assemble round-2 poetry packs. 17 poems from 4 draft sources -> 2 books:
 * poetry-baijuyi (6) and poetry-summer-nature (11 = yangwanli 4 + tianyuan 4 + yongwu 3).
 * Translations/notes/art prompts authored for TaoRead; pinyin from pinyin-pro. */
import { readFileSync, writeFileSync } from 'node:fs'
import { pinyin } from 'pinyin-pro'
const pinyinOf = (text) => pinyin(text)

const DIR = 'apps/server/output/poetry-classics-20261107'
const load = (id) => JSON.parse(readFileSync(`${DIR}/${id}.draft.json`, 'utf8')).picked
const bySource = (drafts, sourceId) => drafts.find((d) => d.sourceId === sourceId)

const baijuyiDraft = load('poetry-baijuyi')
const yangDraft = load('poetry-yangwanli')
const tianyuanDraft = load('poetry-tianyuan')
const yongwuDraft = load('poetry-yongwu')

/** authored layer keyed by sourceId: [translation, note, artPrompt] */
const AUTHORED = {
  // ── 白居易 ──
  354608: ['小娃娃撑着小船，偷偷采了池边的白莲回来。他不懂藏踪迹，小船把浮萍分开，一道长长的水路暴露了他。',
    '池上：白居易写小孩子偷采白莲。解：懂得。浮萍：漂在水面的小植物。和孩子聊聊：小娃哪里露出了马脚？',
    '夏日池塘，一个胖娃娃撑小船采白莲归来，浮萍分开一道水痕，乐呵呵的水彩绘本，无文字。'],
  376817: ['原野上的草多么茂盛，一年枯荣一轮。野火烧不尽它，春风一吹又长出来。远方的芳草蔓延到古道，晴天下一片翠绿连接着荒城。又送走一位朋友，萋萋的草都满含别情。',
    '赋得古原草送别：白居易十六岁写的应考诗。离离：草长得茂盛。萋萋：草丰盛的样子。和孩子背一背：前四句最有名——野火烧不尽，春风吹又生。',
    '辽阔古原野，绿草如茵蔓延到古道尽头，夕阳下两个孩子蹲在路边看草叶上的光，水彩绘本，无文字。'],
  270424: ['一道残阳铺在江面上，半江是碧绿半江是艳红。最可爱的是九月初三的夜晚，露珠像珍珠，月亮像弯弓。',
    '暮江吟：白居易写黄昏到夜晚的江景。瑟瑟：碧绿色。可怜：可爱。和孩子观察：太阳快落山时，江面是不是一半绿一半红？',
    '黄昏江面，残阳把水染成半绿半红，九月初三夜空挂一弯新月，草叶露珠闪光，水彩绘本，无文字。'],
  269643: ['夜里惊讶被子枕头这么冷，又看见窗户格外明亮。夜深了，知道雪下得很大，不时听到竹子被雪压折的声音。',
    '夜雪：白居易全篇写雪却不直接写雪的样子，全靠感觉：冷、亮、声。折竹：雪压断竹枝。和孩子玩一玩：下雪时闭上眼睛，能「听」出雪有多大吗？',
    '冬夜雪屋，窗纸透出雪的明亮，院中竹子被厚雪压弯，安静清冷的水彩绘本，无文字。'],
  271988: ['天平山上白云泉，云自无心水自闲。何必奔冲山下去，更添波浪向人间。',
    '白云泉：白居易在苏州写泉水。无心：没有心机、自由自在。和孩子聊聊：白云和水为什么「闲」？',
    '天平山清泉石上流，白云悠悠山顶飘，一个孩子蹲在泉边看水中云影，恬淡水彩，无文字。'],
  269796: ['住在邯郸客栈正逢冬至，抱着膝盖坐在灯前，只有影子作伴。想来家里人今晚围坐到深夜，还该说起我这个远行的人吧。',
    '邯郸冬至夜思家：白居易冬至夜想家。抱膝：抱着膝盖坐着。远行人：诗人自己。和孩子聊聊：你想念远方的人时，会做什么？',
    '冬至夜驿站小屋，一盏油灯映出诗人抱着膝盖的影子，窗外落雪，思念温暖的水彩，无文字。'],
  // ── 杨万里 ──
  49219: ['下山时不要说下山容易——没有下山的人空喜欢一场。正在山里的人最喜欢平地，到得平地，前面的山峰又挡住了路。',
    '过松源晨炊漆公店：杨万里写翻山的哲理。空喜欢：白白高兴。拦：阻挡。和孩子聊聊：翻过一座山还有山，像不像做作业？',
    '连绵群山间的小路，一个挑担的旅人翻过山冈又见前方山峰，层峦叠嶂水彩，无文字。'],
  45269: ['夜里还是那么热，中午也一样。打开小门立在月光下，深深的竹林里虫声嗡嗡，偶尔有点凉意，但不是风——是夜深的缘故。',
    '夏夜追凉：杨万里写找凉快。追凉：找凉快处。和孩子说说：没有空调的古人，夏天怎么过夜？',
    '夏夜小院，孩子推开小门站在月光下，竹林虫鸣，萤火点点，安静清凉水彩，无文字。'],
  49151: ['雨过天晴，草地开满小花，溪水涨得满满的。一个小孩子躺在柳荫下睡得正香，一头牛悠闲地吃着草，不知不觉吃过了柳荫的西边。',
    '桑茶坑道中：杨万里写夏日路边的闲适。隄：即「堤」，河堤。和孩子画一画：诗里有一个睡着的小孩和一头牛，分别在画面的哪里？',
    '夏日雨后，溪水涨满花草地岸，柳荫下一个孩子睡得香甜，一头牛悠闲吃草走过，田园牧歌水彩，无文字。'],
  47087: ['田里的丈夫把秧苗抛过来，妻子接住，小儿子拔秧，大儿子插秧。斗笠当头盔，蓑衣当铠甲，雨从头上湿到肩膀。喊他吃口饭歇一歇，他低头弯腰只顾干活不答应——秧根还没插牢，活儿还没干完，还要小心看好家里的鹅儿和雏鸭别踩了田。',
    '插秧歌：杨万里写全家冒雨插秧的忙碌。兜鍪：头盔。蓑：蓑衣。莳未匝：插秧还没插完。和孩子数一数：诗里一家人有几个动作？抛、接、拔、插，还要看住鹅和鸭！',
    '春雨水田，一家人分工插秧：父抛秧母接秧兄弟拔插，斗笠蓑衣滴着雨水，田埂上鹅鸭徘徊，劳动欢快水彩，无文字。'],
  // ── 田园（范成大/李绅）──
  44392: ['蝴蝶双双飞进菜花田，白昼变长，田家里半天也没有客人来。鸡飞过篱笆、狗在洞口叫——原来有走村串巷的商人来买茶啦。',
    '晚春田园杂兴：范成大写村居的安静与热闹。犬吠窦：狗在墙洞口叫。行商：走村串巷的买卖人。和孩子玩一玩：鸡飞狗叫的时候，村里发生了什么事？',
    '晚春菜花田，蝴蝶双双飞舞，篱笆内鸡飞狗吠，一位挑担的卖茶商人走近村舍，生活气息水彩，无文字。'],
  44379: ['泥土苏醒，春雨频频来催，千花万草一下子全开了。屋后的荒地还绿茸茸的，邻居家的竹鞭笋已经悄悄钻过墙来啦。',
    '春日田园杂兴：范成大写春意。土膏：肥沃的泥土。一饷：一晌，一会儿。鞭笋：竹鞭上的嫩笋。和孩子找一找：邻居家的笋是怎么「过墙」的？',
    '春日院落，屋后荒畦绿意盎然，邻家嫩笋破土钻过墙根，千花万草竞放，生机勃勃水彩，无文字。'],
  376833: ['锄地正当年头烈的日头，汗水一滴滴落进禾下的土里。有谁知道盘中的每一粒饭，都是这样辛苦得来的。',
    '悯农：李绅写农民的辛苦。皆：都。和孩子背一背：谁知盘中餐，粒粒皆辛苦——吃饭前想一想。',
    '烈日下的稻田，农民弯腰锄草汗滴入土，饭碗里白米饭冒着热气，教育深意的水彩，无文字。'],
  // ── 咏物（风/蜂/蝉）──
  277987: ['能吹落秋天的叶子，能吹开春天的花朵。刮过江面能掀起千尺巨浪，吹进竹林能让万竿斜斜摇曳。',
    '风：李峤全篇都在写风，却没有一个「风」字。三秋：深秋。和孩子猜一猜：这首诗写的是什么？答案藏在每一句里。',
    '风的无形之力：秋叶飘落、春花摇曳、江面巨浪、竹林倾斜，四景联动的动感水彩，无文字。'],
  285103: ['不论平地还是山顶，无限风光都被占尽。采得百花成蜜后，为谁辛苦为谁甜？',
    '蜂：罗隐写蜜蜂的勤劳。占：占据。和孩子聊聊：蜜蜂采蜜为了谁？像不像忙碌的爸爸妈妈？',
    '春日花田，蜜蜂在百花间忙碌采蜜，特写蜂翼上花粉，明亮通透的水彩，无文字。'],
  266827: ['蝉垂下触角吸着清露，声音从疏朗的梧桐间传出。它身居高处，声音自然传得远，并不是借了秋风。',
    '蝉：虞世南写蝉的高洁。緌：蝉触角。藉：凭借。和孩子聊聊：站得高为什么声音传得远？',
    '夏日梧桐枝头一只蝉，翅翼透明，阳光穿过树叶洒下光斑，高远清亮的水彩，无文字。'],
}

const BOOK_META = {
  'poetry-baijuyi': {
    title: '白居易诗选·儿童诵读本', ageStage: '6-8',
    intro: '偷采白莲的小娃、被野火烧不尽的草、半江碧绿半江红——六首白居易，藏着孩子最懂的小心思。',
    coverPrompt: '江南夏日，荷塘小船与绿草古原同框，一个孩子撑船微笑，温暖明亮水彩绘本，无文字封面。',
    from: '#8FAE8B', to: '#F5E9CB',
  },
  'poetry-summer-nature': {
    title: '夏日自然诗选·风蜂蝉与田野', ageStage: '6-8',
    intro: '看不见的风、忙忙碌碌的蜂、树上的蝉、追蝴蝶的孩子、学种瓜的娃娃——十一首诗，把夏天读给你听。',
    coverPrompt: '夏日自然长卷，梧桐蝉鸣、菜花蝴蝶、水田插秧、竹林月光同框，孩子奔跑其间，明快水彩绘本，无文字封面。',
    from: '#6FA85E', to: '#F7E8B5',
  },
}

// canonical-text normalization applied at assembly (edition discipline: 通用字形 + 节选整理)
const TEXT_EDITS = {
  354608: { text: '小娃撑小艇，偷采白莲回。\n不解藏踪迹，浮萍一道开。', title: '池上·其二' },
  376817: { text: '离离原上草，一岁一枯荣。\n野火烧不尽，春风吹又生。' },
  269796: { text: '邯郸驿里逢冬至，抱膝灯前影伴身。\n想得家中夜深坐，还应说着远行人。' },
  277987: { text: '解落三秋叶，能开二月花。\n过江千尺浪，入竹万竿斜。' },
  266827: { text: '垂緌饮清露，流响出疏桐。\n居高声自远，非是藉秋风。' },
  49219: { text: '莫言下岭便无难，赚得行人错喜欢。\n正入万山围子里，一山放出一山拦。' },
  49151: { text: '晴明风日雨干时，草满花堤水满溪。\n童子柳阴眠正着，一牛吃过柳阴西。' },
}
const BOOKS = {
  'poetry-baijuyi': { picks: baijuyiDraft },
  // 44418（秋日其五，租债赋税主题）不宜儿童，剔除
  'poetry-summer-nature': { picks: [...yongwuDraft, ...yangDraft, ...tianyuanDraft.filter((p) => p.sourceId !== 44418)] },
}

for (const [bookId, cfg] of Object.entries(BOOKS)) {
  const meta = BOOK_META[bookId]
  const missing = cfg.picks.filter((p) => !AUTHORED[p.sourceId])
  if (missing.length) throw new Error(`missing authored layer: ${missing.map((m) => m.sourceId).join(',')}`)
  const body = cfg.picks.filter((p) => AUTHORED[p.sourceId]).map((raw) => {
    const edit = TEXT_EDITS[raw.sourceId]
    const p = { ...raw, ...(edit ?? {}), pinyin: edit?.text ? pinyinOf(edit.text) : raw.pinyin }
    const [translation, note, artPrompt] = AUTHORED[p.sourceId]
    return [
      `  { dynasty: ${JSON.stringify(p.dynasty ?? '唐')}, sourceId: ${p.sourceId}, title: ${JSON.stringify(p.title)}, author: ${JSON.stringify(p.author)},`,
      `    text: ${JSON.stringify(p.text)},`,
      `    pinyin: ${JSON.stringify(p.pinyin)},`,
      `    translation: ${JSON.stringify(translation)},`,
      `    note: ${JSON.stringify(note)}, artPrompt: ${JSON.stringify(artPrompt)} },`,
    ].join('\n')
  }).join('\n')
  const authors = [...new Set(cfg.picks.map((x) => x.author))].join(' / ')
  const exportName = bookId.replace(/poetry-/, '').replace(/-(\w)/g, (_, c) => c.toUpperCase()) + 'Pack'
  const file = `import type { PackBook } from '../types'

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
${body}
]

export const ${exportName}: PackBook = {
  id: '${bookId}', title: '${meta.title}', ageStage: '${meta.ageStage}', author: '${authors}',
  lang: 'zh', category: 'poetry', intro: '${meta.intro}', coverArt: 'scenery-night',
  coverFrom: '${meta.from}', coverTo: '${meta.to}',
  coverArtPrompt: '${meta.coverPrompt}',
  source: '${cfg.picks.length} 首经典诗，逐首经诗泉候选采集与底本校对，注音与译文由桃阅读整理。',
  chapters: POEMS.map(p => ({ title: \`\${p.title} · \${p.author}\`, art: \`chapter:${bookId}:\${p.sourceId}\`, artPrompt: p.artPrompt, blocks: [
    { kind: 'poem', text: p.text, pinyin: p.pinyin, translation: p.translation },
    { kind: 'note', text: \`\${p.dynasty} · \${p.author}。\${p.note}\` },
  ] })),
  rights: { workTitle: '${meta.title}', author: '${authors}', translator: '桃阅读自撰白话译文', jurisdiction: 'CN', basis: 'pd-70',
    sourceUrl: 'https://github.com/palemoky/chinese-poetry-api',
    note: '作者均卒于 700 年前，原文公版（pd-70）；逐首候选证据（rawSha256/采集时间）见 apps/server/output/poetry-classics-20261107 与 scripts/prepare-poetry-classics.mjs。未复制现代译注或 API 服务端代码；译文、共读提示与插画提示由平台自撰。' },
}
`
  writeFileSync(`apps/server/src/content/packs/${bookId}.ts`, file)
  console.log(`wrote packs/${bookId}.ts with ${cfg.picks.length} poems`)
}
