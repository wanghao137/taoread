import type { PackBook } from '../types'

/**
 * 《一颗魔法种子》——平台原创绘本（tale）。
 * 角色（小土拨鼠阿芽、种子铺的獾爷爷）与全部情节均为平台自撰，
 * 无任何现有作品底本。
 * 面向 3-5 岁：种下去要等很久很久——魔法的名字，叫耐心。
 */
export const magicSeed: PackBook = {
  id: 'original-magicseed',
  title: '一颗魔法种子',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '獾爷爷送给阿芽一颗「魔法种子」。可是种下去以后，一天、两天、一个月……泥土里什么动静都没有。阿芽天天浇一点水，等着等着，魔法就来了。',
  coverArt: 'mseed-sprout',
  coverArtPrompt: '清晨的花园小花盆里，一株嫩绿的小芽顶着露珠刚刚探出泥土，小土拨鼠捧着小水壶惊喜地凑近看，晨光给芽尖镀上金边，背景虚化的木栅栏',
  coverFrom: '#795548',
  coverTo: '#AED581',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 爷爷的小种子',
      art: 'mseed-shop',
      artPrompt: '温暖的种子铺里，木格抽屉装着各种各样的种子，獾爷爷把一颗圆圆发亮的种子放在小土拨鼠掌心，阿芽的眼睛睁得大大的',
      blocks: [
        {
          kind: 'text',
          text: '阿芽去种子铺做客。',
        },
        {
          kind: 'text',
          text: '獾爷爷送他一颗种子。',
        },
        {
          kind: 'text',
          text: '「这是魔法种子哦。」',
        },
        {
          kind: 'image',
          art: 'mseed-shop',
          text: '种子圆圆的，躺在小掌心里。',
        },
        {
          kind: 'text',
          text: '「不过，要等很久很久。」',
        },
        {
          kind: 'note',
          text: '魔法种子会长出什么呢？阿芽猜了一路。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 每天一点点',
      art: 'mseed-water',
      artPrompt: '小土拨鼠踮脚举着小水壶给花盆浇水，水珠亮晶晶地落进泥土，旁边小本子上画着歪歪扭扭的太阳记号，阳光斜斜照进小院子',
      blocks: [
        {
          kind: 'text',
          text: '阿芽把种子种进花盆。',
        },
        {
          kind: 'text',
          text: '浇一点水，说声早安。',
        },
        {
          kind: 'text',
          text: '第一天，泥土没动静。',
        },
        {
          kind: 'image',
          art: 'mseed-water',
          text: '小水壶咕嘟咕嘟，天天来报到。',
        },
        {
          kind: 'text',
          text: '第三天，还是没有动静。',
        },
        {
          kind: 'note',
          text: '阿芽有点想问：泥土下面，到底在忙什么呢？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 等了好久好久',
      art: 'mseed-wait',
      artPrompt: '雨天的小窗台前，小土拨鼠托着腮帮看窗外的花盆，雨丝斜斜落下，窗玻璃上有雨珠划出的弯弯小线，盆土静静的没有变化',
      blocks: [
        {
          kind: 'text',
          text: '一个月过去啦。',
        },
        {
          kind: 'text',
          text: '花盆里，什么都没有。',
        },
        {
          kind: 'text',
          text: '阿芽有点等不及了。',
        },
        {
          kind: 'image',
          art: 'mseed-wait',
          text: '雨天窗前，阿芽托着小腮帮。',
        },
        {
          kind: 'text',
          text: '他决定，继续等一等。',
        },
        {
          kind: 'note',
          text: '看不见的等待，也是一种悄悄的浇灌。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 泥土里的小惊喜',
      art: 'mseed-bloom',
      artPrompt: '春天的花盆里挺出一株挂满小铃铛花朵的绿苗，每朵小花里透出柔柔的光，阿芽围着花盆又蹦又跳，蝴蝶落在芽尖上，满院春光',
      blocks: [
        {
          kind: 'text',
          text: '一个春天的早上。',
        },
        {
          kind: 'text',
          text: '咦！泥土里冒出小芽。',
        },
        {
          kind: 'text',
          text: '芽上还顶着小露珠。',
        },
        {
          kind: 'image',
          art: 'mseed-bloom',
          text: '小铃铛花开了，轻轻发着光。',
        },
        {
          kind: 'text',
          text: '「魔法来啦！」阿芽跳起来。',
        },
        {
          kind: 'note',
          text: '原来魔法一直在忙：生根、攒力气、慢慢长。等的人，只管好好浇水就好。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '一颗魔法种子',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
