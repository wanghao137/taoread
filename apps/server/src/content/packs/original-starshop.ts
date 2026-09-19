import type { PackBook } from '../types'

/**
 * 《星星杂货铺》——平台原创绘本（tale）。
 * 角色（刺猬球球、小青蛙呱呱）与全部情节均为平台自撰，
 * 无任何现有作品底本。
 * 面向 3-5 岁：夜里开张的小铺子，说一声晚安，就能换一颗星星糖。
 */
export const starShop: PackBook = {
  id: 'original-starshop',
  title: '星星杂货铺',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '巷子最深处，有一家只在夜里开张的小铺子。刺猬球球的货架上，摆满了装星星的玻璃罐。想拿一颗？只要说一声好听的晚安。',
  coverArt: 'starshop-lane',
  coverArtPrompt: '夜晚安静的小巷，尽头一间亮着暖黄灯的小木屋铺子，窗口摆着一排排发光的玻璃罐，刺猬掌柜踮脚整理罐子，萤火似的光点飘在巷子里',
  coverFrom: '#1A237E',
  coverTo: '#FFE082',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 只在夜里开张',
      art: 'starshop-open',
      artPrompt: '夜色小巷尽头的小木屋铺子亮起灯，木招牌上画着一颗星星，刺猬掌柜系着小围裙打开木窗，把一排玻璃罐摆上货架，罐里星星轻轻眨眼',
      blocks: [
        {
          kind: 'text',
          text: '月亮升起来啦。',
        },
        {
          kind: 'text',
          text: '星星杂货铺，开门喽。',
        },
        {
          kind: 'image',
          art: 'starshop-open',
          text: '玻璃罐里的星星，一颗颗亮起来。',
        },
        {
          kind: 'text',
          text: '掌柜是刺猬球球。',
        },
        {
          kind: 'text',
          text: '他卖星星，不收钱。',
        },
        {
          kind: 'note',
          text: '不收钱？那要拿什么换呢？往下一章看。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 用晚安换星星',
      art: 'starshop-trade',
      artPrompt: '铺子的小窗口前，小刺猬递出一颗金色星星糖，小老鼠踮着脚尖说晚安，窗户里暖黄的灯光洒在青石板路上，满架星星微微闪',
      blocks: [
        {
          kind: 'text',
          text: '小老鼠第一个来。',
        },
        {
          kind: 'text',
          text: '「晚安，星星铺。」',
        },
        {
          kind: 'text',
          text: '「给你一颗星星糖。」',
        },
        {
          kind: 'image',
          art: 'starshop-trade',
          text: '说一声晚安，换一颗小星星。',
        },
        {
          kind: 'text',
          text: '晚安越好听，星星越亮。',
        },
        {
          kind: 'note',
          text: '原来呀，好听的晚安，就是最亮的货币。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 睡不着的小青蛙',
      art: 'starshop-frog',
      artPrompt: '铺子窗台上坐着一只抱着膝盖的小青蛙，刺猬掌柜把一颗发着柔光的星星糖放在它手心，夜风拂过窗边的小风铃，光点轻轻飘落',
      blocks: [
        {
          kind: 'text',
          text: '小青蛙呱呱来啦。',
        },
        {
          kind: 'text',
          text: '它翻来覆去睡不着。',
        },
        {
          kind: 'text',
          text: '「我换不到好听的晚安。」',
        },
        {
          kind: 'image',
          art: 'starshop-frog',
          text: '星星糖在手心，轻轻地发光。',
        },
        {
          kind: 'text',
          text: '球球说：「这颗送你。」',
        },
        {
          kind: 'note',
          text: '睡不着也没关系，有一盏小光陪着你就好。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 天亮了，打烊啦',
      art: 'starshop-close',
      artPrompt: '清晨的巷子泛着淡金色，小木屋铺子收起木窗，玻璃罐里的星星们打着哈欠渐渐睡去，刺猬掌柜挂出小牌子，上面写着：明晚见',
      blocks: [
        {
          kind: 'text',
          text: '天边泛起了白色。',
        },
        {
          kind: 'text',
          text: '星星们要回家睡觉。',
        },
        {
          kind: 'image',
          art: 'starshop-close',
          text: '小牌子轻轻摇：明晚见。',
        },
        {
          kind: 'text',
          text: '球球打了个小哈欠。',
        },
        {
          kind: 'text',
          text: '「晚安，今天辛苦啦。」',
        },
        {
          kind: 'note',
          text: '今晚睡前，也给星星杂货铺说一声好听的晚安吧。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '星星杂货铺',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
