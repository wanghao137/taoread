import type { PackBook } from '../types'

/**
 * 《后羿射日》——中国上古神话（故事）。
 * 底本：《淮南子·本经训》（西汉·刘安等编撰）。公版（成书公元前 139 年前后）。
 * 此处为平台白话改写，面向 3-5 岁儿童。
 */
export const mythHouYi: PackBook = {
  id: 'myth-houyi',
  title: '后羿射日',
  author: '刘安 等（西汉）· 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '3-5',
  intro: '天上一下子出现了十个太阳！地上热得着了火。神箭手后羿拉开大弓，要把太阳射下来。',
  coverArt: 'houyi-shoots-sun',
  coverArtPrompt: '一个威武又帅气的古代英雄（后羿），扎着马步，把大弓拉得像满月，箭头对准天空中的太阳，天上有大小不一的太阳，地上有焦黄的土地和小树苗，画面有动感，幼儿绘本风格',
  coverFrom: '#E65100',
  coverTo: '#FFD54F',
  source: '公版典籍（《淮南子·本经训》）白话改写',
  chapters: [
    {
      title: '第一章 · 十个太阳',
      art: 'ten-suns',
      artPrompt: '湛蓝的天空中挤着十个圆溜溜的太阳，一个挨一个，光芒刺眼，地上的小草都耷拉着脑袋',
      blocks: [
        {
          kind: 'text',
          text: '很久很久以前，天上有十个太阳。它们本来是轮流值班的，每天出来一个，给地上送光和热。',
        },
        {
          kind: 'text',
          text: '有一天，十个太阳觉得一个一个出去太没意思了，就商量：「我们一起出去玩吧！」',
        },
        {
          kind: 'image',
          art: 'ten-suns',
          text: '十个太阳一起跑到天上，地上热得受不了啦。',
        },
        {
          kind: 'note',
          text: '太阳是《淮南子》里说的「三足金乌」，古人觉得太阳里住着一只三只脚的乌鸦呢。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '这一下可糟了！十个太阳挂在天上，就像十个大火炉，把地上的庄稼都烤焦了，小河也快要晒干啦。',
        },
      ],
    },
    {
      title: '第二章 · 大家都渴了',
      art: 'cracked-land',
      artPrompt: '龟裂的黄色土地一直伸到天边，几棵枯树，一条快要干涸的小河，人们躲在树荫下擦汗',
      blocks: [
        {
          kind: 'text',
          text: '地里热得直冒烟，土地裂开了一道道口子，像老爷爷脸上的皱纹。农民伯伯种的稻子，全都枯黄了。',
        },
        {
          kind: 'image',
          art: 'cracked-land',
          text: '土地裂开了口子，庄稼都枯黄了。',
        },
        {
          kind: 'text',
          text: '小河里的水越来越少，鱼儿张着嘴巴喘气。孩子们渴得直哭，大人们急得直叹气。',
        },
        {
          kind: 'text',
          text: '大家都盼着：要是有谁能把太阳管一管，那该多好呀！',
        },
      ],
    },
    {
      title: '第三章 · 神箭手后羿',
      art: 'houyi-bow',
      artPrompt: '后羿背着巨大的弓和箭筒，站在山巅，目光坚毅，红色披风被风吹起，背后是十个太阳的天空',
      blocks: [
        {
          kind: 'text',
          text: '这时候，来了一位英雄，他叫后羿。后羿是个神箭手，他的力气可大啦，能拉开别人都拉不动的大弓。',
        },
        {
          kind: 'image',
          art: 'houyi-bow',
          text: '神箭手后羿，带着他的大弓来了。',
        },
        {
          kind: 'text',
          text: '后羿看看天上的十个太阳，又看看地上渴哭的孩子们，握紧拳头说：「看我的，让它们乖乖回家！」',
        },
        {
          kind: 'note',
          text: '后羿的弓和箭，是天上神仙送给他的宝贝，据说一箭就能射到云彩那么高。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 射下九个太阳',
      art: 'houyi-shoots-sun',
      artPrompt: '后羿把大弓拉成满月，一支箭飞向天空，一个太阳被射中后化作金乌坠下，天上还剩几个太阳',
      blocks: [
        {
          kind: 'text',
          text: '后羿站定脚步，搭上一支箭，「嗖」的一声射了出去。只听「轰」的一响，一个太阳被打中，掉了下去！',
        },
        {
          kind: 'image',
          art: 'houyi-shoots-sun',
          text: '后羿一箭，就射下了一个太阳。',
        },
        {
          kind: 'text',
          text: '他一支接一支地射，一连射下了九个太阳。天上只剩下一个太阳，吓得直发抖，躲进了云缝里。',
        },
        {
          kind: 'text',
          text: '后羿对它说：「你听着，以后每天按时出来，按时回家，不许再捣乱了！」太阳乖乖地点点头。',
        },
        {
          kind: 'note',
          text: '从此，天上就只有一个太阳了。它每天早上升起，傍晚落下，地上又凉快又舒服。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '庄稼又绿了，小河又满了，孩子们又可以出来玩啦。大家都说：谢谢勇敢的后羿！',
        },
      ],
    },
  ],
  rights: {
    workTitle: '淮南子·本经训（后羿射日）',
    author: '刘安 等（西汉）',
    authorDeathYear: -122,
    translator: '桃阅读（白话改写）',
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://zh.wikisource.org/wiki/%E6%B7%AE%E5%8D%97%E5%AD%90',
    note: '据《淮南子》公版原文改写为童趣白话；原著成书于西汉，属公有领域，改写文本由平台创作。',
  },
}
