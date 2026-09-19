import type { PackBook } from '../types'

/**
 * 《抱抱小怪兽》——平台原创绘本（tale）。
 * 角色（毛豆、小怪兽咕噜）与全部情节均为平台自撰，无任何现有作品底本。
 * 面向 3-5 岁：怕黑的孩子和怕黑的小怪兽，互相拥抱取暖。
 */
export const hugMonster: PackBook = {
  id: 'original-hugmonster',
  title: '抱抱小怪兽',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '毛豆怕黑，睡觉要开小夜灯。有一天，床底下传来了小小的抽泣声——原来世界上还有一位更怕黑的朋友。',
  coverArt: 'hugmon-shadow',
  coverArtPrompt: '深蓝夜色的儿童房里，小男孩和圆滚滚毛茸茸的紫色小怪兽坐在地毯上紧紧拥抱，两人心口透出暖黄色小光，床头小夜灯亮着一圈柔光',
  coverFrom: '#3949AB',
  coverTo: '#FFB74D',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 床底下的小声音',
      art: 'hugmon-bedroom',
      artPrompt: '夜晚的儿童房开着小夜灯，小男孩毛豆竖起耳朵趴在床边，床底下露出一小撮紫色的毛和两只发抖的小圆耳朵，月光洒在窗帘上',
      blocks: [
        {
          kind: 'text',
          text: '毛豆有点怕黑。',
        },
        {
          kind: 'text',
          text: '每天睡觉，他都要开小夜灯。',
        },
        {
          kind: 'image',
          art: 'hugmon-bedroom',
          text: '床底下，藏着一个小小的秘密。',
        },
        {
          kind: 'text',
          text: '这天夜里，毛豆听见小声音。',
        },
        {
          kind: 'text',
          text: '「呜呜……」声音从床底下传来。',
        },
        {
          kind: 'note',
          text: '宝宝猜一猜，床底下会是谁在哭呢？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 原来它也怕黑',
      art: 'hugmon-monster',
      artPrompt: '床底下钻出一只圆滚滚毛茸茸的紫色小怪兽，抱着自己的尾巴，眼睛湿漉漉的，小男孩蹲下来与它平视，夜灯的光把两个影子投在地上',
      blocks: [
        {
          kind: 'text',
          text: '毛豆轻轻掀开床单。',
        },
        {
          kind: 'text',
          text: '里面坐着一只小怪兽！',
        },
        {
          kind: 'text',
          text: '它毛茸茸，圆滚滚，紫色的。',
        },
        {
          kind: 'image',
          art: 'hugmon-monster',
          text: '小怪兽抱着尾巴，眼睛湿漉漉。',
        },
        {
          kind: 'text',
          text: '「我叫咕噜，我怕黑。」',
        },
        {
          kind: 'note',
          text: '原来小怪兽也会怕黑，和毛豆一模一样。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 抱一抱就亮了',
      art: 'hugmon-glow',
      artPrompt: '小男孩和小怪兽相互拥抱在一起，两个心口的地方透出暖黄色的光圈，黑黑的房间被这团光染得温暖，地板上的玩具车泛着柔光',
      blocks: [
        {
          kind: 'text',
          text: '毛豆想了想，张开手。',
        },
        {
          kind: 'text',
          text: '「咕噜，我们抱一抱吧。」',
        },
        {
          kind: 'image',
          art: 'hugmon-glow',
          text: '抱一抱，胸口亮起了小暖光。',
        },
        {
          kind: 'text',
          text: '抱在一起，暖乎乎的。',
        },
        {
          kind: 'text',
          text: '咦，心口亮起了小光！',
        },
        {
          kind: 'note',
          text: '两个人靠在一起，害怕就变得小小的了。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 会发光的鳞片',
      art: 'hugmon-dawn',
      artPrompt: '清晨阳光洒进儿童房，小怪兽恋恋不舍挥手告别，窗台上留下一片微微发光的银色小鳞片，毛豆抱着枕头笑着挥手，被子叠得软软的',
      blocks: [
        {
          kind: 'text',
          text: '咕噜要回家了。',
        },
        {
          kind: 'text',
          text: '它留下了一片小鳞片。',
        },
        {
          kind: 'image',
          art: 'hugmon-dawn',
          text: '窗台上，有一片亮亮的小鳞片。',
        },
        {
          kind: 'text',
          text: '小鳞片会发光，像小夜灯。',
        },
        {
          kind: 'text',
          text: '毛豆把灯关了，也不怕。',
        },
        {
          kind: 'note',
          text: '今晚关灯睡觉时，想一想那个和你拥抱过的人吧。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '抱抱小怪兽',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
