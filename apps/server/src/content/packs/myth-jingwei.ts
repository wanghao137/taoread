import type { PackBook } from '../types'

/**
 * 《精卫填海》——中国上古神话（故事）。
 * 底本：《山海经·北山经》（先秦佚名）。公版（成书先秦时期）。
 * 此处为平台白话改写，面向 3-5 岁儿童。
 */
export const mythJingWei: PackBook = {
  id: 'myth-jingwei',
  title: '精卫填海',
  author: '佚名（古代神话）· 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '3-5',
  intro: '大海夺走了小女孩的生命，她变成了一只小鸟。小鸟每天衔着小石头，飞向大海——她要把大海填平！',
  coverArt: 'jingwei-bird-sea',
  coverArtPrompt: '一只可爱的小鸟（花脑袋、白嘴壳、红爪子）嘴里衔着一颗小石子，飞在蓝色的大海上，海浪翻滚，远处是发鸠山，画面清新明亮，幼儿绘本风格',
  coverFrom: '#00695C',
  coverTo: '#80CBC4',
  source: '公版典籍（《山海经·北山经》）白话改写',
  chapters: [
    {
      title: '第一章 · 炎帝的小女儿',
      art: 'nuxa-girl',
      artPrompt: '一个扎着小辫子的可爱女孩在草地上奔跑，手里举着一只风筝，远处的山发着淡淡的神光',
      blocks: [
        {
          kind: 'text',
          text: '很久很久以前，有一位很厉害的部落首领，叫炎帝。炎帝有个小女儿，名字叫女娃。',
        },
        {
          kind: 'image',
          art: 'nuxa-girl',
          text: '女娃是炎帝最疼爱的小女儿。',
        },
        {
          kind: 'text',
          text: '女娃长得白白胖胖的，最爱笑，也最爱玩。她最喜欢到山上采野花，还喜欢看小鸟做窝。',
        },
        {
          kind: 'note',
          text: '炎帝，就是传说中教大家种五谷、尝百草的「神农氏」，是我们的祖先之一。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 大海发脾气',
      art: 'stormy-sea',
      artPrompt: '蓝色的大海卷起高高的白浪，乌云密布，一只小船在浪里颠簸，女孩惊恐地抓住船舷',
      blocks: [
        {
          kind: 'text',
          text: '有一天，女娃划着一只小船，到东海去玩。海面上起风了，浪花一朵比一朵高。',
        },
        {
          kind: 'text',
          text: '忽然，一个大浪「哗」地扑过来，把小船打翻了。女娃拼命挣扎，可风浪太大了，她再也没有回来。',
        },
        {
          kind: 'image',
          art: 'stormy-sea',
          text: '大海发了脾气，把女娃的小船打翻了。',
        },
        {
          kind: 'text',
          text: '炎帝等呀等，一直等不到女儿回家。他站在海边，眼泪一滴一滴，落进了海水里。',
        },
      ],
    },
    {
      title: '第三章 · 变成精卫鸟',
      art: 'jingwei-birth',
      artPrompt: '海边的浪花中飞起一只美丽的小鸟，花脑袋、白嘴巴、红爪子，眼睛亮亮的，带着倔强的神情',
      blocks: [
        {
          kind: 'text',
          text: '女娃虽然离开了，可她舍不得爸爸妈妈，也舍不得这片大地。她的灵魂，变成了一只美丽的小鸟。',
        },
        {
          kind: 'image',
          art: 'jingwei-birth',
          text: '女娃变成了小鸟，名字叫「精卫」。',
        },
        {
          kind: 'text',
          text: '这只小鸟长着花花的脑袋、白白的嘴巴、红红的爪子，住在发鸠山上。它叫起来「精卫、精卫」，所以大家叫它精卫鸟。',
        },
        {
          kind: 'note',
          text: '发鸠山，在今天的山西省长治市。古人觉得，那里就是精卫鸟住的地方。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 衔石头填海',
      art: 'jingwei-bird-sea',
      artPrompt: '精卫鸟嘴里衔着小石子，翅膀迎着海风，飞在无边无际的大海上，海面波光粼粼',
      blocks: [
        {
          kind: 'text',
          text: '精卫鸟恨透了大海。它决定：把大海填平，不让它再害别人！',
        },
        {
          kind: 'text',
          text: '每天天一亮，精卫就从山上衔起一根小树枝、一颗小石头，飞过很远很远的路，扔进大海里。「扑通、扑通」，海水连个小水花都没打起来。',
        },
        {
          kind: 'image',
          art: 'jingwei-bird-sea',
          text: '精卫每天衔石头，飞向大海。',
        },
        {
          kind: 'text',
          text: '大海哈哈大笑：「小鸟儿，算了吧！你一颗小石头，一百万年也填不平我呀！」',
        },
        {
          kind: 'text',
          text: '精卫一点儿也不怕，它说：「我才不怕呢！只要我不停地飞、不停地衔，总有一天，大海会被我填平的！」',
        },
        {
          kind: 'note',
          text: '后来，「精卫填海」就成了一个成语，夸那些不怕困难、坚持到底的人。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '直到今天，精卫鸟还在飞呀飞。它那么小，心却那么大——多大的困难，也压不倒它。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '山海经·北山经（精卫填海）',
    author: '佚名（古代神话）',
    translator: '桃阅读（白话改写）',
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://zh.wikisource.org/wiki/%E5%B1%B1%E6%B5%B7%E7%BB%8F',
    note: '据《山海经》公版原文改写为童趣白话；原著成书于先秦，属公有领域，改写文本由平台创作。',
  },
}
