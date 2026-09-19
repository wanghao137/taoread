import type { PackBook } from '../types'

/**
 * 《小乌龟爬山》——平台原创绘本（tale）。
 * 角色（小乌龟墩墩、小兔灰灰、小鹿跳跳）与全部情节均为平台自撰，
 * 无任何现有作品底本。
 * 面向 3-5 岁：不比快，一步一步也能到山顶看日出。
 */
export const turtleClimb: PackBook = {
  id: 'original-turtlerace',
  title: '小乌龟爬山',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '朋友们都要爬上山顶看日出。小兔跑得快，小鹿跳得高，小乌龟墩墩只会一步一步慢慢爬。可是太阳升起来的时候，山顶上谁都在。',
  coverArt: 'turtle-mountain',
  coverArtPrompt: '黎明前的青色山路上，小乌龟背着小小的壳一步一步向上爬，身后山路蜿蜒到山脚，山顶被一层薄薄的朝霞染成淡粉色，星星还没完全退场',
  coverFrom: '#263238',
  coverTo: '#FFCC80',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 出发去看日出',
      art: 'turtle-start',
      artPrompt: '山脚下的清晨，小兔子和小鹿轻快地跑向山路，小乌龟在后面迈着小短腿跟上，路边野花沾着露珠，远处大山安安静静',
      blocks: [
        {
          kind: 'text',
          text: '明天，山顶有日出。',
        },
        {
          kind: 'text',
          text: '小兔灰灰跑得快。',
        },
        {
          kind: 'text',
          text: '小鹿跳跳蹦得高。',
        },
        {
          kind: 'image',
          art: 'turtle-start',
          text: '墩墩一步一步，跟在后面。',
        },
        {
          kind: 'text',
          text: '墩墩说：「我也去。」',
        },
        {
          kind: 'note',
          text: '慢慢的小乌龟，也有自己的小打算。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 一步一步慢慢爬',
      art: 'turtle-climb',
      artPrompt: '山腰的小路上，小乌龟专注地爬过一块圆石头，小小的脚印一串排开，身旁一丛紫色小花轻轻摇，小兔子小鹿的身影在远处高处',
      blocks: [
        {
          kind: 'text',
          text: '灰灰跳，一下就远了。',
        },
        {
          kind: 'text',
          text: '跳跳蹦，一下就高了。',
        },
        {
          kind: 'text',
          text: '墩墩不急，一步一步爬。',
        },
        {
          kind: 'image',
          art: 'turtle-climb',
          text: '小小脚印，排成了长长的线。',
        },
        {
          kind: 'text',
          text: '累了，歇一歇再爬。',
        },
        {
          kind: 'note',
          text: '数一数吧：一步，两步，三步……每一步都算数。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 黑夜里的伴',
      art: 'turtle-night',
      artPrompt: '夜色山路弯弯，天上的星星密密地亮着，小乌龟抬头看星星，路边一只小蜗牛与他并排慢慢爬，两个小小的壳在星光下轻轻发亮',
      blocks: [
        {
          kind: 'text',
          text: '天黑了，山路静静的。',
        },
        {
          kind: 'text',
          text: '墩墩抬头看星星。',
        },
        {
          kind: 'text',
          text: '星星陪他慢慢爬。',
        },
        {
          kind: 'image',
          art: 'turtle-night',
          text: '小蜗牛也来啦，爬得也慢慢的。',
        },
        {
          kind: 'text',
          text: '「你好呀，」墩墩小声说。',
        },
        {
          kind: 'note',
          text: '慢的路上不孤单，星星、小花，还有新朋友。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 山顶的日出',
      art: 'turtle-sunrise',
      artPrompt: '山顶上红彤彤的太阳正从云海里升起，小兔子小鹿坐在岩石上招手，小乌龟刚好爬上山顶，大家被金色光芒照亮，云海在脚下翻涌',
      blocks: [
        {
          kind: 'text',
          text: '太阳出来啦！',
        },
        {
          kind: 'text',
          text: '云海变成了金色。',
        },
        {
          kind: 'text',
          text: '墩墩刚好爬上山顶。',
        },
        {
          kind: 'image',
          art: 'turtle-sunrise',
          text: '日出正好，谁都没有错过。',
        },
        {
          kind: 'text',
          text: '「你看到啦！」大家欢呼。',
        },
        {
          kind: 'note',
          text: '一步一步走的墩墩，也站在了山顶上。慢慢来，一样能到。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '小乌龟爬山',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
