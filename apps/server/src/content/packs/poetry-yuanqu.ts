import type { PackBook } from '../types'

/**
 * 《元曲·天净沙与山水》——五首元人散曲，小令里的秋天与山河。
 * 选曲：马致远《天净沙·秋思》、白朴《天净沙·秋》、张养浩《山坡羊·潼关怀古》、
 *       关汉卿《大德歌·冬景》、马致远《寿阳曲·远浦帆归》。
 * 均公版（作者卒年：马致远约 1321、白朴约 1306、张养浩 1329、关汉卿约 1300），
 * 通行本逐字核对；全文拼音与白话译文由平台撰写。
 */
export const yuanQu: PackBook = {
  id: 'poetry-yuanqu',
  title: '元曲·天净沙与山水',
  author: '马致远、白朴、张养浩、关汉卿',
  lang: 'zh',
  category: 'poetry',
  ageStage: '9-12',
  intro: '元曲比唐诗更会「拍电影」：九个镜头排出一个秋天，一场雪盖住四五户人家，一条潼关古道说出千年心事。',
  coverArt: 'yuanqu-cover',
  coverArtPrompt: '一幅元曲意境长卷：枯藤老树昏鸦与小桥流水人家，远处夕阳西下，一个骑瘦马的人走在古道上，白草红叶黄花点缀山间',
  coverFrom: '#5D4037',
  coverTo: '#D7A86E',
  source: '元人散曲选，通行本逐字注音',
  chapters: [
    {
      title: '第一课 · 天净沙·秋思（马致远）',
      art: 'yuanqu-autumn-thought',
      artPrompt: '枯藤缠着老树，乌鸦归巢，小桥下流水绕过茅屋，古道上西风吹过一匹瘦马，夕阳正落下山头',
      blocks: [
        {
          kind: 'poem',
          text: '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。夕阳西下，断肠人在天涯。',
          pinyin: 'kū téng lǎo shù hūn yā, xiǎo qiáo liú shuǐ rén jiā, gǔ dào xī fēng shòu mǎ. xī yáng xī xià, duàn cháng rén zài tiān yá.',
          translation: '枯藤缠着老树，黄昏时乌鸦飞回窝里；小桥下流着水，水边住着人家；古老的大道上，西风吹着一匹瘦马。太阳往西落下去了，那个想家想得心碎的人，还流浪在天边。',
        },
        {
          kind: 'note',
          text: '这是元曲里最有名的一首，号称「秋思之祖」。「天净沙」是曲牌名。前三句像是九个电影镜头：枯藤、老树、昏鸦、小桥、流水、人家、古道、西风、瘦马，全不用动词，却拼出一整部秋天的电影。「断肠」是形容想家想得心都要碎了。「天涯」是天的尽头、离家极远的地方。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'yuanqu-autumn-thought',
          text: '小桥流水人家，古道西风瘦马，夕阳落下来了。',
        },
      ],
    },
    {
      title: '第二课 · 天净沙·秋（白朴）',
      art: 'yuanqu-autumn-colors',
      artPrompt: '孤村、落日与天边残霞，轻烟绕着老树寒鸦，一只飞鸿的影子落在青山绿水间，白草红叶黄花铺满秋野',
      blocks: [
        {
          kind: 'poem',
          text: '孤村落日残霞，轻烟老树寒鸦，一点飞鸿影下。青山绿水，白草红叶黄花。',
          pinyin: 'gū cūn luò rì cán xiá, qīng yān lǎo shù hán yā, yī diǎn fēi hóng yǐng xià. qīng shān lǜ shuǐ, bái cǎo hóng yè huáng huā.',
          translation: '一座孤村，一轮落日，天边是淡淡的晚霞；几缕轻烟，一棵老树，树上歇着寒鸦；一只大雁飞过，影子从空中落下来。看那青山、那绿水，还有满地的白草、红叶和黄花。',
        },
        {
          kind: 'note',
          text: '白朴这首《秋》和马致远的《秋思》是「姐妹篇」。「残霞」是快要消散的晚霞。「飞鸿」是大雁。最后一句像撒了一把颜料：白、红、黄，三种颜色把秋天的原野点亮了。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'yuanqu-autumn-colors',
          text: '落日残霞里，青山绿水间铺满白草红叶黄花。',
        },
      ],
    },
    {
      title: '第三课 · 山坡羊·潼关怀古（张养浩）',
      art: 'yuanqu-tongguan-pass',
      artPrompt: '潼关古道，群峰像聚拢而来，黄河波涛如怒，远处长安宫阙只剩黄土，一个旅人勒马驻足凭栏远望',
      blocks: [
        {
          kind: 'poem',
          text: '峰峦如聚，波涛如怒，山河表里潼关路。望西都，意踌躇。伤心秦汉经行处，宫阙万间都做了土。兴，百姓苦；亡，百姓苦。',
          pinyin: 'fēng luán rú jù, bō tāo rú nù, shān hé biǎo lǐ tóng guān lù. wàng xī dū, yì chóu chú. shāng xīn qín hàn jīng xíng chù, gōng què wàn jiān dōu zuò le tǔ. xīng, bǎi xìng kǔ; wáng, bǎi xìng kǔ.',
          translation: '群峰像是聚拢过来，波涛像是在发怒，外面是山、里面是河，这就是潼关的路。望着西边的长安，心里犹豫又难过。让人伤心的是秦汉皇帝走过的地方——万间宫殿，如今全都成了泥土。朝代兴盛，百姓受苦；朝代灭亡，百姓还是受苦。',
        },
        {
          kind: 'note',
          text: '「山坡羊」是曲牌名，「怀古」是怀念古代、借古说今。「表里」是外面和里面：潼关外面有黄河，里面有华山，是历代兵家必争之地。「踌躇」是心里犹豫、徘徊。最后两句最重：不管谁当皇帝，受苦的总是老百姓。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'yuanqu-tongguan-pass',
          text: '潼关的峰峦黄河之间，万间宫阙都做了土。',
        },
      ],
    },
    {
      title: '第四课 · 大德歌·冬景（关汉卿）',
      art: 'yuanqu-snow-village',
      artPrompt: '大雪纷飞像梨花起舞，远处村庄只露出四五家人家的轮廓，疏林里晚鸦聒噪，江边黄芦丛中斜系一条小渔船',
      blocks: [
        {
          kind: 'poem',
          text: '雪粉华，舞梨花，再不见烟村四五家。密洒堪图画，看疏林噪晚鸦。黄芦掩映清江下，斜缆着钓鱼艖。',
          pinyin: 'xuě fěn huá, wǔ lí huā, zài bù jiàn yān cūn sì wǔ jiā. mì sǎ kān tú huà, kàn shū lín zào wǎn yā. huáng lú yǎn yìng qīng jiāng xià, xié lǎn zhe diào yú chā.',
          translation: '雪粉纷纷扬扬，像梨花在风里跳舞，远处炊烟里的村庄，再也看不见四五户人家。密密的雪洒下来，美得像一幅画；看那稀疏的树林，晚归的乌鸦叫个不停。黄澄澄的芦苇掩映着清清的江水，江边斜斜地系着一条打鱼的小船。',
        },
        {
          kind: 'note',
          text: '「大德歌」是曲牌名，大德是元成宗的年号。「雪粉华」是说雪像粉一样白、一样细。「堪图画」是值得画成画。「噪」是乌鸦乱叫。「艖」就是小船，读 chā。整首曲子像一幅雪景图，最后定格在那条小渔船上。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'yuanqu-snow-village',
          text: '大雪像梨花飞舞，江边芦苇丛里系着小渔船。',
        },
      ],
    },
    {
      title: '第五课 · 寿阳曲·远浦帆归（马致远）',
      art: 'yuanqu-sails-return',
      artPrompt: '夕阳西斜，酒旗闲闲垂着，江面上两三只帆船还没靠岸，落花漂在水上飘着香气，茅舍边断桥头卖鱼人渐渐散去',
      blocks: [
        {
          kind: 'poem',
          text: '夕阳下，酒旆闲，两三航未曾着岸。落花水香茅舍晚，断桥头卖鱼人散。',
          pinyin: 'xī yáng xià, jiǔ pèi xián, liǎng sān háng wèi céng zháo àn. luò huā shuǐ xiāng máo shè wǎn, duàn qiáo tóu mài yú rén sàn.',
          translation: '夕阳落下去了，酒旗闲闲地垂着；江面上两三只船，还没有靠岸。落花漂在水上，连水都带香气；茅屋在暮色里静下来，断桥头那些卖鱼的人，也都散了。',
        },
        {
          kind: 'note',
          text: '「寿阳曲」是曲牌名。「浦」是江边，「远浦帆归」就是远处的江面上帆船归来。「酒旆」是酒旗，「旆」读 pèi。「航」这里指船，「着岸」是靠岸。这首小令全是安静的镜头：夕阳、酒旗、归船、落花、散去的人。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'yuanqu-sails-return',
          text: '夕阳下归帆缓缓，断桥头卖鱼人散了。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '元人散曲五首（马致远、白朴、张养浩、关汉卿）',
    author: '马致远、白朴、张养浩、关汉卿',
    authorDeathYear: 1329,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org',
    note: '诸位曲家卒年：马致远约 1321、白朴约 1306、张养浩 1329、关汉卿约 1300，均远超著作权保护期；通行本逐字核对，拼音与白话译文由平台撰写',
  },
}
