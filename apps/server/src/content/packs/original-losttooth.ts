import type { PackBook } from '../types'

/**
 * 《换牙记》——平台原创绘本（tale）。
 * 角色（朵朵、奶奶）与全部情节均为平台自撰，无任何现有作品底本。
 * 面向 3-5 岁：第一颗乳牙摇摇欲坠，奶奶说，牙齿要去天上换成小星星。
 */
export const lostTooth: PackBook = {
  id: 'original-losttooth',
  title: '换牙记',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '朵朵的第一颗小牙摇啊摇。奶奶说，不掉队的小牙会飞到天上去，换一颗小星星回来。朵朵一边等，一边笑。',
  coverArt: 'tooth-smile',
  coverArtPrompt: '扎着两个小揪揪的小女孩咧嘴笑着，指着自己缺了一颗的门牙，奶奶在旁边举着一面小圆镜，暖黄色灯光下窗台挂着一个蓝布小口袋',
  coverFrom: '#FFF176',
  coverTo: '#4DD0E1',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 摇啊摇的小牙',
      art: 'tooth-wobble',
      artPrompt: '餐桌前小女孩咬着苹果突然捂住嘴巴，牙齿后面透出一点惊喜的表情，奶奶递来软软的粥，桌上苹果咬出一个小缺口',
      blocks: [
        {
          kind: 'text',
          text: '朵朵有一颗小牙松了。',
        },
        {
          kind: 'text',
          text: '它摇啊摇，晃啊晃。',
        },
        {
          kind: 'image',
          art: 'tooth-wobble',
          text: '小牙摇摇的，像荡秋千。',
        },
        {
          kind: 'text',
          text: '啃苹果，要小心。',
        },
        {
          kind: 'text',
          text: '说话，也要慢慢说。',
        },
        {
          kind: 'note',
          text: '宝宝的小牙松过吗？摇摇的小牙，一点都不可怕哦。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 奶奶的星星故事',
      art: 'tooth-story',
      artPrompt: '夜晚的床边，奶奶搂着小女孩指着窗外的星空，夜空里一颗特别亮的小星星正在眨眼，窗帘上印着小小的牙形图案',
      blocks: [
        {
          kind: 'text',
          text: '奶奶说了一个小故事。',
        },
        {
          kind: 'text',
          text: '「小牙掉了，不会不见。」',
        },
        {
          kind: 'text',
          text: '「它会飞到天上去。」',
        },
        {
          kind: 'image',
          art: 'tooth-story',
          text: '奶奶指着夜空里眨眼的小星星。',
        },
        {
          kind: 'text',
          text: '「月亮用它换颗小星星。」',
        },
        {
          kind: 'note',
          text: '小牙去天上旅行，还带回一份小礼物，多好呀。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 牙掉下来的那一晚',
      art: 'tooth-night',
      artPrompt: '小女孩双手捧着一颗小小的白牙齿，眼睛亮亮的，身后奶奶拿着蓝布小口袋系在窗台边，月光把小牙照得像一粒小珍珠',
      blocks: [
        {
          kind: 'text',
          text: '「咯噔」一声，小牙掉了！',
        },
        {
          kind: 'text',
          text: '朵朵一点也不疼。',
        },
        {
          kind: 'text',
          text: '她把小牙捧在手心。',
        },
        {
          kind: 'image',
          art: 'tooth-night',
          text: '小牙躺在手心里，像小珍珠。',
        },
        {
          kind: 'text',
          text: '奶奶把它装进蓝布袋。',
        },
        {
          kind: 'note',
          text: '把小牙挂在窗边，月亮夜里来取，轻轻的，不会吵醒朵朵。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 窗台上的回礼',
      art: 'tooth-star',
      artPrompt: '清晨的窗台上放着一颗小小的亮晶晶星星石，小女孩惊喜地捧起它对着阳光看，星星石折射出七彩小光点，缺牙的笑容甜甜的',
      blocks: [
        {
          kind: 'text',
          text: '早上，朵朵去看窗台。',
        },
        {
          kind: 'text',
          text: '蓝布袋空空的。',
        },
        {
          kind: 'text',
          text: '咦，多了一颗小石头！',
        },
        {
          kind: 'image',
          art: 'tooth-star',
          text: '星星石亮晶晶，还会眨眼呢。',
        },
        {
          kind: 'text',
          text: '它亮晶晶，像小星星。',
        },
        {
          kind: 'note',
          text: '小牙住到了天上，小星星住进了朵朵家。这是换牙的小秘密。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '换牙记',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
