import type { PackBook } from '../types'

/**
 * 《三字经》节选（蒙学）。
 * 底本：通行本（王应麟 撰，宋末元初）。全篇千余字，此处选「人之初」至「不知义」一段，
 * 是蒙学开篇最广为传诵的部分。逐字注音，便于孩子跟读。
 * 公版：王应麟卒于 1296 年，远超保护期。
 */
export const sanziJing: PackBook = {
  id: 'sanzi-jing',
  title: '三字经·人之初',
  author: '王应麟',
  lang: 'zh',
  category: 'primer',
  ageStage: '3-5',
  intro: '三字一句，朗朗上口。古时候的小朋友，就是从这本书开始认字的。',
  coverArt: 'primer-scroll',
  coverArtPrompt: '一幅古代学堂场景：木质书桌上摊开一卷三字经竹简，旁边放着毛笔和砚台，窗外是桃花和远山，温暖的自然光洒进来',
  coverFrom: '#FFE0B2',
  coverTo: '#FFB74D',
  source: '公版古籍（南宋·王应麟）节选，逐字注音',
  chapters: [
    {
      title: '第一课 · 人之初',
      art: 'sunrise-hills',
      artPrompt: '清晨的远山前一轮红日刚刚升起，几个扎小髻的孩子坐在学堂门槛上捧着竹简跟读，朝霞洒在山头',
      blocks: [
        {
          kind: 'poem',
          text: '人之初，性本善。性相近，习相远。',
          pinyin: 'rén zhī chū, xìng běn shàn. xìng xiāng jìn, xí xiāng yuǎn.',
          translation: '每个人刚出生的时候，本性都是善良的。大家的本性差不多，只是后来的习惯让人渐渐不同了。',
        },
        {
          kind: 'poem',
          text: '苟不教，性乃迁。教之道，贵以专。',
          pinyin: 'gǒu bù jiào, xìng nǎi qiān. jiào zhī dào, guì yǐ zhuān.',
          translation: '如果不好好教育，善良的本性就会变。教导孩子最重要的，是专心致志、坚持不懈。',
        },
        {
          kind: 'note',
          text: '「苟」是「如果」的意思，「迁」是「变化、改变」的意思。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二课 · 昔孟母',
      art: 'mother-loom',
      artPrompt: '古代屋内，孟母坐在织布机前，手中剪刀正剪断织了一半的布，小孟子站在一旁低头认错，窗外有竹子',
      blocks: [
        {
          kind: 'poem',
          text: '昔孟母，择邻处。子不学，断机杼。',
          pinyin: 'xī mèng mǔ, zé lín chǔ. zǐ bù xué, duàn jī zhù.',
          translation: '从前孟子的母亲，为了孩子选了好邻居。孟子逃学，母亲就剪断了织布机上的线——布织到一半毁了，就像学习半途而废。',
        },
        {
          kind: 'poem',
          text: '窦燕山，有义方。教五子，名俱扬。',
          pinyin: 'dòu yān shān, yǒu yì fāng. jiào wǔ zǐ, míng jù yáng.',
          translation: '窦燕山教育孩子有套好办法，五个儿子都成了有名的人才。',
        },
        {
          kind: 'note',
          text: '孟子名叫孟轲，是中国古代有名的大学问家。「机杼」就是织布机。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三课 · 养不教',
      art: 'teacher-fan',
      artPrompt: '一位老先生拿着戒尺坐在书案前，案上摆着一块未雕琢的璞玉和刻刀，一个孩子恭敬地站着听课',
      blocks: [
        {
          kind: 'poem',
          text: '养不教，父之过。教不严，师之惰。',
          pinyin: 'yǎng bù jiào, fù zhī guò. jiào bù yán, shī zhī duò.',
          translation: '生了孩子却不教育，是父母的过错。教育却不严格，是老师的偷懒。',
        },
        {
          kind: 'poem',
          text: '子不学，非所宜。幼不学，老何为。',
          pinyin: 'zǐ bù xué, fēi suǒ yí. yòu bù xué, lǎo hé wéi.',
          translation: '小孩子不学习，是不应该的。小时候不学，长大了能做什么呢？',
        },
        {
          kind: 'poem',
          text: '玉不琢，不成器。人不学，不知义。',
          pinyin: 'yù bù zhuó, bù chéng qì. rén bù xué, bù zhī yì.',
          translation: '玉石不雕琢，成不了器物。人不学习，就不懂做人的道理。',
        },
        {
          kind: 'note',
          text: '「琢」是雕刻玉石。「义」是做人的道理和规矩。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '三字经',
    author: '王应麟',
    authorDeathYear: 1296,
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://ctext.org/dictionary.pl?if=gb&id=35012',
    note: '南宋蒙学经典，作者卒年远超伯尔尼公约保护期；此处为通行本节选，自校注音与白话翻译。',
  },
}
