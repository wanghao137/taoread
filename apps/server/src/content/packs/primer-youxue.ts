import type { PackBook } from '../types'

/**
 * 《幼学琼林·天文地舆》——明代程登吉《幼学琼林》中「天文」「地舆」两卷的浅白选段。
 * 底本：通行本逐字核对（程登吉，明代，公版）。
 * 每章：原文（poem 块带拼音与白话）+ image + note 讲意思。
 */
export const youxueQionglin: PackBook = {
  id: 'primer-youxue',
  title: '幼学琼林·天文地舆',
  author: '程登吉（明）',
  lang: 'zh',
  category: 'primer',
  ageStage: '6-8',
  intro: '天地是怎么分开的？天上的星星为什么有的总见不着面？大海和桑田为什么会换来换去？跟着《幼学琼林》，认识头顶的天空和脚下的大地。',
  coverArt: 'cosmos-ordered',
  coverArtPrompt: '画面一半是旋转的星云和发光的太阳月亮，一半是青山绿水和田垄，一个古代小孩站在中间仰头看天、低头看地，水墨绘本风',
  coverFrom: '#455A64',
  coverTo: '#ECEFF1',
  source: '《幼学琼林》通行本（程登吉，明代），公版',
  chapters: [
    {
      title: '第一章 · 天文：混沌初开',
      art: 'chaos-opens-sky',
      artPrompt: '天地刚刚分开的景象：上面是清亮的天空和日月，下面是厚重的大地和山川，中间云雾翻涌，一个小孩惊奇地望着这一切',
      blocks: [
        {
          kind: 'poem',
          text: '混沌初开，乾坤始奠。气之轻清上浮者为天，气之重浊下凝者为地。日月五星，谓之七政；天地与人，谓之三才。',
          pinyin: 'hùn dùn chū kāi, qián kūn shǐ diàn. qì zhī qīng qīng shàng fú zhě wéi tiān, qì zhī zhòng zhuó xià níng zhě wéi dì. rì yuè wǔ xīng, wèi zhī qī zhèng; tiān dì yú rén, wèi zhī sān cái.',
          translation: '混沌一团的世界刚刚分开，天地才安定下来。又轻又清的气往上升，就成了天；又重又浊的气往下沉，就成了地。太阳、月亮，加上金、木、水、火、土五颗星，合起来叫「七政」；天、地，还有我们人，合起来叫「三才」。',
        },
        {
          kind: 'note',
          text: '【讲一讲】「混沌」就是混混沌沌、分不清的样子；「乾坤」就是天地。「五星」可不是五角星，是金木水火土五颗行星。古人觉得天、地、人同样了不起，所以把它们放在一块儿，叫「三才」——你在里面也有一份哦。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'chaos-opens-sky',
          text: '清气上升成天，浊气下沉成地。',
        },
      ],
    },
    {
      title: '第二章 · 天文：参商不相见',
      art: 'stars-never-meet',
      artPrompt: '深蓝色夜空，一颗星从东边升起，另一颗星从西边落下，中间隔着银河和明月，两个孩童各站一头指着星星，安静优美',
      blocks: [
        {
          kind: 'poem',
          text: '参商二星，其出没不相见；牛女两宿，惟七夕一相逢。蜀犬吠日，比人所见不广；吴牛喘月，嘲人畏惧过甚。',
          pinyin: 'shēn shāng èr xīng, qí chū mò bù xiāng jiàn; niú nǚ liǎng xiù, wéi xī xī yī xiāng féng. shǔ quǎn fèi rì, bǐ rén suǒ jiàn bù guǎng; wú niú chuǎn yuè, cháo rén wèi jù guò shèn.',
          translation: '参星和商星，一颗升起、一颗落下，永远见不着面；牛郎星和织女星，只有七夕那一天才能相逢。蜀地的小狗对着太阳叫，是笑话人见识太少；吴地的水牛对着月亮直喘气，是笑话人胆子太小、自己吓自己。',
        },
        {
          kind: 'note',
          text: '【讲一讲】「参」和「商」是天上的两颗星，一个出来、另一个就落下，就像总错过的朋友。「宿」在这里读 xiù，是星星的家。蜀犬吠日、吴牛喘月，是古人编的两个小笑话：没见过太阳的狗对着太阳叫，怕热的水牛连月亮都以为是大太阳。你有没有自己也「吓自己」的时候呀？',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'stars-never-meet',
          text: '参星升起，商星落下，两颗星总见不着面。',
        },
      ],
    },
    {
      title: '第三章 · 地舆：始奠山川',
      art: 'five-mountains-rivers',
      artPrompt: '远古的大地上，黄帝指画原野划分地域，远处大禹拿着耒耜指挥治水，山河之间河道纵横，先民在田间劳作，宏大开天辟地感',
      blocks: [
        {
          kind: 'poem',
          text: '黄帝画野，始分都邑；夏禹治水，初奠山川。',
          pinyin: 'huáng dì huà yě, shǐ fēn dū yì; xià yǔ zhì shuǐ, chū diàn shān chuān.',
          translation: '黄帝划分原野，才有了大大小小的城镇；大禹治理洪水，才安定了名山大川。',
        },
        {
          kind: 'note',
          text: '【讲一讲】「画野」就是划分土地，「都邑」是城镇。大禹治水的故事你一定听过：他三过家门而不入，苦干了十三年，终于把洪水引入大海。「地舆」的「舆」是车的车厢，古人用车载着地图，所以用地舆代称地理。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'five-mountains-rivers',
          text: '黄帝划地，大禹治水，山河才安定下来。',
        },
      ],
    },
    {
      title: '第四章 · 地舆：沧海桑田',
      art: 'sea-mulberry-field',
      artPrompt: '画面一半是蔚蓝大海一边退去、一半是新绿的桑田长成，几个农人惊讶地站在田埂上看远方的潮水，海鸥飞过，变幻奇特',
      blocks: [
        {
          kind: 'poem',
          text: '沧海桑田，谓世事之多变；河清海晏，兆天下之升平。',
          pinyin: 'cāng hǎi sāng tián, wèi shì shì zhī duō biàn; hé qīng hǎi yàn, zhào tiān xià zhī shēng píng.',
          translation: '大海变成桑田，说的是世事变化太多太多；黄河变清、大海平静，预兆着天下太平。',
        },
        {
          kind: 'note',
          text: '【讲一讲】传说有个叫麻姑的仙女，说自己看见东海三次变成桑田——大海不见了，变成了能种桑树的地。所以「沧海桑田」就是变化特别大的意思。「晏」是平静。太平日子有多珍贵呢？就像河清海晏一样少见，值得好好珍惜。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'sea-mulberry-field',
          text: '大海退去，桑田长出，世事变化真大呀。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '幼学琼林·天文地舆（选段）',
    author: '程登吉（明）',
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://zh.wikisource.org/wiki/幼學瓊林',
    note: '原文为明代公版蒙学读本《幼学琼林》「天文」「地舆」卷选段，通行本逐字核对；拼音、白话译文与讲解由平台撰写',
  },
}
