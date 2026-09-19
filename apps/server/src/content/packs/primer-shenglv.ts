import type { PackBook } from '../types'

/**
 * 《声律启蒙·云对雨》——清代车万育《声律启蒙》「一东」两节，对韵启蒙的千古名篇。
 * 底本：通行本逐字核对（车万育，1632—1705，公版）。
 * 每章：原文注音 + 白话讲解 + 亲子小玩法（对对子游戏）。
 */
export const shenglvDong: PackBook = {
  id: 'shenglv-east',
  title: '声律启蒙·云对雨',
  author: '车万育（清）',
  lang: 'zh',
  category: 'primer',
  ageStage: '6-8',
  intro: '云对雨，雪对风，晚照对晴空。念念对对子，嘴巴甜甜的，耳朵也舒服。',
  coverArt: 'cloud-rain-pair',
  coverArtPrompt: '画面分成两半的可爱小景：一边是白云和太阳，一边是雨点和彩虹，中间一个扎冲天辫的小孩开心地张着手臂，水彩绘本风',
  coverFrom: '#B9835C',
  coverTo: '#EBCFA8',
  source: '《声律启蒙》通行本（车万育，卒 1705），公版',
  chapters: [
    {
      title: '第一节 · 云对雨，雪对风',
      art: 'cloud-rain-pair',
      artPrompt: '天上一朵白云和一场小雨做好朋友，雪花和风车在旁边转圈，小孩仰头看天，节奏明快可爱',
      blocks: [
        {
          kind: 'poem',
          text: '云对雨，雪对风，晚照对晴空。来鸿对去燕，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。两鬓风霜，途次早行之客；一蓑烟雨，溪边晚钓之翁。',
          pinyin: 'yún duì yǔ, xuě duì fēng, wǎn zhào duì qíng kōng. lái hóng duì qù yàn, sù niǎo duì míng chóng. sān chǐ jiàn, liù jūn gōng, lǐng běi duì jiāng dōng. rén jiān qīng shǔ diàn, tiān shàng guǎng hán gōng. liǎng àn xiǎo yān yáng liǔ lǜ, yī yuán chūn yǔ xìng huā hóng. liǎng bìn fēng shuāng, tú cì zǎo xíng zhī kè; yī suō yān yǔ, xī biān wǎn diào zhī wēng.',
          translation: '云和雨相对，雪和风相对，傍晚的霞光对晴朗的天空。飞来的大雁对飞去的燕子，睡觉的鸟对唱歌的虫。三尺长的剑，六钧重的弓，岭北对江东。人间有清凉的殿，天上有广寒的月宫。河两岸清晨的烟霭里杨柳绿油油，一座园子的春雨中杏花粉红红。',
        },
        {
          kind: 'note',
          text: '【怎么读】像唱歌一样，两个字一组、两个字一组地读：云对雨——雪对风——。读快了会咬到舌头，慢慢读最舒服。【找对子】云的好朋友是雨，雪的好朋友是风，每一对都是「长得像、站得齐」的好搭档。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'cloud-rain-pair',
          text: '白云和小雨手拉手，雪花和风车在跳舞。',
        },
      ],
    },
    {
      title: '第二节 · 沿对革，异对同',
      art: 'old-young-pair',
      artPrompt: '白发老爷爷和扎小辫的小孩面对面坐在大树下开心地拍手对对子，旁边一条小河和松树，温暖的午后阳光',
      blocks: [
        {
          kind: 'poem',
          text: '沿对革，异对同，白叟对黄童。江风对海雾，牧子对渔翁。颜巷陋，阮途穷，冀北对辽东。池中濯足水，门外打头风。梁帝讲经同泰寺，汉皇置酒未央宫。尘虑萦心，懒抚七弦绿绮；霜华满鬓，羞看百炼青铜。',
          pinyin: 'yán duì gé, yì duì tóng, bái sǒu duì huáng tóng. jiāng fēng duì hǎi wù, mù zǐ duì yú wēng. yán xiàng lòu, ruǎn tú qióng, jì běi duì liáo dōng. chí zhōng zhuó zú shuǐ, mén wài dǎ tóu fēng. liáng dì jiǎng jīng tóng tài sì, hàn huáng zhì jiǔ wèi yāng gōng. chén lǜ yíng xīn, lǎn fǔ qī xián lǜ qǐ; shuāng huá mǎn bìn, xiū kàn bǎi liàn qīng tóng.',
          translation: '沿和革相对，不同和相同相对，白发老人对黄头发的小孩。江上的风对海上的雾，放牛的孩子对打鱼的爷爷。颜回住在陋巷，阮籍走到路尽头，冀北对辽东。池子里洗脚的水，迎面吹来的顶头风。',
        },
        {
          kind: 'note',
          text: '【白叟对黄童】白头发的老爷爷，对黄头发的小孩——就是「你」呀！【亲子小游戏】你出一个词，爸爸妈妈对一个词：你说「月亮」，他们对「太阳」；你说「小船」，试试你对一个「大」什么？对了，「大楼」「大树」「大鲸鱼」都行。对对子，就是把世界配成对。',
          art: 'lamp-hint',
        },
        {
          kind: 'image',
          art: 'old-young-pair',
          text: '老爷爷和小朋友面对面拍手对对子。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '声律启蒙·一东（两节）',
    author: '车万育（1632—1705）',
    authorDeathYear: 1705,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://zh.wikisource.org/wiki/聲律啟蒙',
    note: '作者卒年 1705，公版；通行本逐字核对，讲解与亲子游戏文案由平台撰写',
  },
}
