import type { PackBook } from '../types'

/**
 * 《田螺姑娘》——中国南方民间故事（田螺姑娘型）。
 * 最早见晋·干宝《搜神记》卷二十一「谢端」条，后世在民间口口相传，无确定作者。
 * 本包为面向 3-5 岁幼儿的白话改写：短句、重复结构、无生僻词。
 * basis 为 adapted（民间传说改写），不引用任何现代改编作品文本。
 */
export const tianLuoGirl: PackBook = {
  id: 'folktale-snailgirl',
  title: '田螺姑娘',
  author: '中国民间传说（佚名）· 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '3-5',
  intro: '田里有个大田螺。大田螺里，住着一个会做饭的小姑娘。她是谁呢？',
  coverArt: 'snail-girl-river',
  coverArtPrompt: '一条清清的小河边，一个大大的田螺壳放在草地上，田螺壳里透出柔柔的光，河边有稻田和小野花，童话绘本风格',
  coverFrom: '#00897B',
  coverTo: '#FFF59D',
  source: '中国民间传说（田螺姑娘）白话改写',
  chapters: [
    {
      title: '第一章 · 拾到田螺',
      art: 'snail-in-water-jar',
      artPrompt: '一个古代小哥哥弯腰在田沟里捧起一只大大的田螺，田螺壳上一圈一圈的花纹，水珠亮晶晶，旁边是绿油油的稻田',
      blocks: [
        {
          kind: 'text',
          text: '从前，有个小哥哥，叫阿牛。阿牛没有爹娘，一个人住在一间小破屋里。',
        },
        {
          kind: 'text',
          text: '阿牛很勤快。天没亮，他就下田干活。天黑了，他才回家。',
        },
        {
          kind: 'image',
          art: 'snail-in-water-jar',
          text: '阿牛在田沟里，捡到一只大田螺。',
        },
        {
          kind: 'text',
          text: '有一天，阿牛在田沟里，看见一只大田螺。好大的田螺呀！比巴掌还大，壳上有一圈一圈的花纹。',
        },
        {
          kind: 'text',
          text: '阿牛舍不得丢下它，就把大田螺捧回家，轻轻放进水缸里。',
        },
        {
          kind: 'note',
          text: '田螺住在水田里，背着自己圆圆的小房子。你见过田螺吗？它的眼睛长在两根小触角上呢。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 螺变姑娘',
      art: 'snail-girl-cooks',
      artPrompt: '一间朴素的小厨房里，灶台生着火，锅里冒着香喷喷的热气，一个扎着两个小髻的姑娘正在炒菜，围裙飘动，木桌上摆着碗筷',
      blocks: [
        {
          kind: 'text',
          text: '第二天，阿牛干活回家。一推门——咦？家里怎么变样了？',
        },
        {
          kind: 'image',
          art: 'snail-girl-cooks',
          text: '不知名的姑娘，在阿牛家做了一桌子菜。',
        },
        {
          kind: 'text',
          text: '地扫得干干净净。桌上摆着热腾腾的饭菜：有鱼，有肉，还有白米饭。',
        },
        {
          kind: 'text',
          text: '阿牛挠挠头：「是谁帮我做的呢？」他左看看，右看看，一个人也没有。',
        },
        {
          kind: 'text',
          text: '阿牛吃了一口，真香呀！第二天，第三天，天天都这样。饭菜总是热的，家里总是干净的。',
        },
        {
          kind: 'note',
          text: '阿牛是个懂得感恩的孩子。他每天回家，都对着空气说一声：「谢谢你呀！」',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 被看见了',
      art: 'snail-secret-discovered',
      artPrompt: '水缸旁，一个美丽的姑娘正从大田螺壳里迈步出来，衣裙像水波一样飘动，阿牛躲在门后捂着嘴巴惊讶地看着',
      blocks: [
        {
          kind: 'text',
          text: '阿牛想了好久，决定偷偷看一眼。这天，他假装出门，又悄悄绕回来，躲在门外。',
        },
        {
          kind: 'image',
          art: 'snail-secret-discovered',
          text: '姑娘从田螺壳里，轻轻地走了出来。',
        },
        {
          kind: 'text',
          text: '只见水缸里的大田螺，慢慢地打开了。从壳里，走出一个漂亮的姑娘！她的裙子像水波，眼睛像星星。',
        },
        {
          kind: 'text',
          text: '姑娘系上围裙，点火做饭。不一会儿，屋里就飘满了饭香。',
        },
        {
          kind: 'text',
          text: '阿牛看呆了。他不小心碰倒了门边的竹篓，「咣当」一声！姑娘吓了一跳，红着脸说：「你……你都看见了？」',
        },
        {
          kind: 'note',
          text: '田螺姑娘是天河里的仙女。她看到阿牛又勤快又善良，才来帮他。秘密被看见了，她会走吗？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 姑娘走了',
      art: 'snail-girl-leaves',
      artPrompt: '夜晚的小河边，姑娘提着一盏小灯向天上飞去，回头望着挥手的阿牛，星光洒满水面，田螺壳静静留在草地上',
      blocks: [
        {
          kind: 'text',
          text: '姑娘低着头说：「我本是天河里的田螺仙子。现在你看见了我，我就不能再留下了。」',
        },
        {
          kind: 'image',
          art: 'snail-girl-leaves',
          text: '田螺姑娘向天上飞去，阿牛在下面挥手。',
        },
        {
          kind: 'text',
          text: '阿牛急得快哭了：「你别走呀！」姑娘摸摸他的头，笑着说：「别难过。这个田螺壳送给你，它会保佑你的。」',
        },
        {
          kind: 'text',
          text: '一阵风吹来，姑娘像一片云，轻轻飞上了天。越飞越高，变成了天上一颗亮亮的星星。',
        },
        {
          kind: 'text',
          text: '阿牛把田螺壳收好，天天好好干活。从那以后，他的日子越过越好。每天晚上，他都对着那颗星星说：「晚安。」',
        },
        {
          kind: 'note',
          text: '故事讲完啦。善良又勤快的人，会遇见好运气。今天睡前，你也可以对喜欢的人说一声「晚安」。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '田螺姑娘',
    author: '中国民间传说（佚名）',
    authorDeathYear: 336,
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://zh.wikisource.org',
    note: '民间传说改写。故事最早见晋代干宝《搜神记》卷二十一「谢端」条（干宝约卒于336年），后世在民间长期流传，无确定作者；本包为面向 3-5 岁幼儿的白话改写，改写文本由平台创作',
  },
}
