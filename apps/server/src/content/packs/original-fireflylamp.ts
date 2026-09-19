import type { PackBook } from '../types'

/**
 * 《萤火虫小灯》——平台原创绘本（tale）。
 * 角色（萤火虫小灯芯、小蚂蚁点点）与全部情节均为平台自撰，
 * 无任何现有作品底本。
 * 面向 3-5 岁：用一盏小小的光，护送迷路的小蚂蚁回家。
 */
export const fireflyLamp: PackBook = {
  id: 'original-fireflylamp',
  title: '萤火虫小灯',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '小灯芯是一盏会飞的萤火虫小灯。夜里，他听见草丛里有小小的哭声——一只小蚂蚁找不着家了。别怕，小灯芯把光借给你。',
  coverArt: 'firefly-night',
  coverArtPrompt: '静谧的夏夜草丛，一只提着柔光小灯笼的萤火虫低低飞着，照亮身下一只举着触角的小蚂蚁，露珠和草叶泛着银光，远处隐约有一小簇蚁巢的轮廓',
  coverFrom: '#0D2137',
  coverTo: '#FFE082',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 提灯笼的小萤火虫',
      art: 'firefly-lamp',
      artPrompt: '夜空下的小灯芯提着自己的光在草叶间穿梭，光晕照见蒲公英的绒毛，天上星星点点，草丛像一片安静的小森林',
      blocks: [
        {
          kind: 'text',
          text: '天黑了，星星出来了。',
        },
        {
          kind: 'text',
          text: '小灯芯点亮小灯笼。',
        },
        {
          kind: 'image',
          art: 'firefly-lamp',
          text: '小灯芯提着光，在夜里散步。',
        },
        {
          kind: 'text',
          text: '他的光，软软的。',
        },
        {
          kind: 'text',
          text: '照到哪里，哪里暖暖。',
        },
        {
          kind: 'note',
          text: '夜里散步，有人陪你，有人给你照路，多安心呀。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 草丛里的小哭声',
      art: 'firefly-ant',
      artPrompt: '一束柔和的光照进深草丛，小蚂蚁点点坐在一片落叶旁揉眼睛，触角耷拉着，萤火虫小灯芯悬停在它头顶，光晕圈住两个小小的身影',
      blocks: [
        {
          kind: 'text',
          text: '咦，谁在小声哭？',
        },
        {
          kind: 'text',
          text: '小灯芯把光探进草丛。',
        },
        {
          kind: 'text',
          text: '原来是小蚂蚁点点。',
        },
        {
          kind: 'image',
          art: 'firefly-ant',
          text: '小蚂蚁迷路啦，触角耷拉着。',
        },
        {
          kind: 'text',
          text: '「我找不着回家的路。」',
        },
        {
          kind: 'note',
          text: '迷路不可怕，先照亮身边一小步，就不慌了。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 一路亮到底',
      art: 'firefly-path',
      artPrompt: '萤火虫提灯在前低飞，小蚂蚁跟在光圈里前进，露珠花园的石子小桥泛着银光，光晕把夜草照成温暖的金绿色，一路蜿蜒向前',
      blocks: [
        {
          kind: 'text',
          text: '「跟着我的光，走吧。」',
        },
        {
          kind: 'text',
          text: '穿过露珠花园。',
        },
        {
          kind: 'text',
          text: '走过石子小桥。',
        },
        {
          kind: 'image',
          art: 'firefly-path',
          text: '小小的光圈，护着小小的脚步。',
        },
        {
          kind: 'text',
          text: '小灯芯说：「别怕，我在。」',
        },
        {
          kind: 'note',
          text: '把光分给别人，自己的灯一点也不会变暗。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 到家啦',
      art: 'firefly-home',
      artPrompt: '小土坡下的蚁巢洞口亮着欢迎的小光，蚂蚁一家探出头来招手，小灯芯在洞口上方轻轻绕圈，点点挥舞触角道谢，夜风温柔',
      blocks: [
        {
          kind: 'text',
          text: '前面就是蚁巢啦。',
        },
        {
          kind: 'text',
          text: '蚂蚁一家都来迎接。',
        },
        {
          kind: 'text',
          text: '「谢谢你，小灯笼！」',
        },
        {
          kind: 'image',
          art: 'firefly-home',
          text: '洞口的小光，一闪一闪像在拍手。',
        },
        {
          kind: 'text',
          text: '小灯芯挥挥光，回家去。',
        },
        {
          kind: 'note',
          text: '今晚睡前想一想：你想把自己小小的光，借给谁呀？',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '萤火虫小灯',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
