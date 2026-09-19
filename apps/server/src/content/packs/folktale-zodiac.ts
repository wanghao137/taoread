import type { PackBook } from '../types'

/**
 * 《十二生肖》——中国民间传说（生肖选拔赛）。
 * 版权说明：生肖传说口耳相传，无确定原始作者（basis=adapted）；
 * 白话文字为平台自撰改写，不引用任何现代绘本或动画改编文本。
 * 面向 3-5 岁儿童，每句不超过 15 字。
 */
export const zodiac: PackBook = {
  id: 'folktale-zodiac',
  title: '十二生肖',
  author: '中国民间传说（佚名）· 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '3-5',
  intro: '玉帝要办一场跑步比赛，前十二名的小动物，可以用名字来记年份。小老鼠坐在牛角上，一路加油——猜猜谁是第一名？',
  coverArt: 'zodiac-race',
  coverArtPrompt: '金色朝霞下的山间赛道上，十二只可爱的小动物向前奔跑：老鼠骑在牛角上、老虎兔子追赶、龙在云端、马羊猴鸡狗猪各显身手，欢快热闹，幼儿绘本风格',
  coverFrom: '#EF6C00',
  coverTo: '#FFF176',
  source: '中国传统民间传说（十二生肖）白话改写',
  chapters: [
    {
      title: '第一章 · 玉帝的比赛',
      art: 'zodiac-signup',
      artPrompt: '天宫大门前贴着大大的告示，小老鼠、老牛、老虎、小兔等动物排着队报名，个个仰头看告示，天上飘着白云',
      blocks: [
        {
          kind: 'text',
          text: '很久以前，没有人知道年份。玉帝想了个好办法：「办一场跑步比赛吧！」',
        },
        {
          kind: 'text',
          text: '「前十二名到终点的，就用名字记年份。」小动物们一听，都跑来报名啦。',
        },
        { kind: 'image', art: 'zodiac-signup', text: '小动物们排着队，来报名啦。' },
        {
          kind: 'text',
          text: '小老鼠个子最小，心里却有个小主意。它悄悄找老牛：「牛大哥，带我一起去吧？」',
        },
        {
          kind: 'note',
          text: '为什么用小动物记年份呢？古人觉得，每种动物都像我们的好朋友。宝宝属什么小动物呀？可以一起找找看。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '老牛心地善良，点点头：「好呀。明天天一亮，我们一起出发！」',
        },
      ],
    },
    {
      title: '第二章 · 起个大早',
      art: 'zodiac-ox',
      artPrompt: '晨光初露的田埂上，老牛迈着稳稳的步子向前走，小老鼠蹲在牛角上，远处有老虎、兔子等小动物在追赶',
      blocks: [
        {
          kind: 'text',
          text: '比赛那天，天还没亮。老牛驮着小老鼠出发了。它一步一步，走得又稳又快。',
        },
        { kind: 'image', art: 'zodiac-ox', text: '小老鼠坐在牛角上，像坐小船。' },
        {
          kind: 'text',
          text: '小老鼠蹲在牛角上，暖和又舒服。风儿轻轻吹，路边的花开啦。',
        },
        {
          kind: 'text',
          text: '路上有条小河，老牛驮小兔子过河。大家都夸老牛是好心肠。',
        },
        {
          kind: 'note',
          text: '老牛不慌不忙，一直往前走。做事情不用抢第一，慢慢来，也能走到呀。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '太阳升起来了，终点的大门越来越近。老牛加快了脚步。',
        },
      ],
    },
    {
      title: '第三章 · 谁是第一名',
      art: 'zodiac-finish',
      artPrompt: '金光闪闪的天宫大门前，小老鼠从牛角上一跃而起冲过终点线，老牛憨厚地笑着回头看它，彩带飘扬',
      blocks: [
        {
          kind: 'text',
          text: '快到大门啦！小老鼠轻轻一跳。「嗖」地一下，先冲过了门！',
        },
        { kind: 'image', art: 'zodiac-finish', text: '小老鼠跳过终点，得第一名啦！' },
        {
          kind: 'text',
          text: '「第一名——小老鼠！」小老鼠挥挥小爪子，开心极了。老牛得了第二，一点儿也不生气。',
        },
        {
          kind: 'text',
          text: '接着，老虎、小兔、龙、蛇跑来了。马、羊、猴、鸡也跑来了。狗和猪最后赶到。',
        },
        {
          kind: 'note',
          text: '老牛虽然得了第二，可大家都说：牛最勤劳，最靠得住。人人都喜欢老牛，属牛的宝宝也是哦。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '玉帝笑着宣布：「就用这十二位的名字，一年一年记下去吧！」',
        },
      ],
    },
    {
      title: '第四章 · 十二位排排队',
      art: 'zodiac-lineup',
      artPrompt: '十二只小动物排成一排合影，个个笑眯眯，头顶挂着圆圆的红灯笼，背景是祥云和远山，画面喜庆柔和',
      blocks: [
        {
          kind: 'text',
          text: '十二位好朋友排好队：鼠、牛、虎、兔、龙、蛇，马、羊、猴、鸡、狗、猪。',
        },
        { kind: 'image', art: 'zodiac-lineup', text: '十二只小动物，排好队啦。' },
        {
          kind: 'text',
          text: '每一年，都有一位值班。今年轮到谁呀？明年又轮到谁呢？',
        },
        {
          kind: 'text',
          text: '咦，怎么没有小猫？原来那天小猫睡过头了，没赶上比赛，真可惜。',
        },
        {
          kind: 'note',
          text: '小猫有点遗憾，不过没关系——它成了家里最受宠的伙伴。睡饱觉的小猫，也过得很幸福呀。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '后来呀，每逢自己的一年，大家都会说吉祥话：「祝你像小动物们一样，健康又快乐！」',
        },
      ],
    },
  ],
  rights: {
    workTitle: '十二生肖',
    author: '中国民间传说（佚名）',
    jurisdiction: 'CN',
    basis: 'adapted',
    note: '十二生肖纪年源自古代干支与动物崇拜的民间传说，长期口耳相传，无确定原始作者；白话文字为平台自撰改写，不引用任何现代绘本或动画改编文本。',
  },
}
