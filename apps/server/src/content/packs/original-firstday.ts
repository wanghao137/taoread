import type { PackBook } from '../types'

/**
 * 《第一天上幼儿园》——平台原创绘本（tale）。
 * 角色（小象嘟嘟、象妈妈、袋鼠老师）与全部情节均为平台自撰，无任何现有作品底本。
 * 面向 3-5 岁：口袋里妈妈画的手心太阳，陪孩子度过入园的第一天。
 */
export const firstDay: PackBook = {
  id: 'original-firstday',
  title: '第一天上幼儿园',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '小象嘟嘟第一天上幼儿园。妈妈在他手心画了一个小太阳：「想妈妈的时候，握一握，太阳就亮啦。」',
  coverArt: 'firstday-gate',
  coverArtPrompt: '彩色涂鸦大门的幼儿园门口，小象背着小书包牵着妈妈的手，长鼻子卷着妈妈的裙角，门内飘出气球与彩色风车，晨光温暖明亮',
  coverFrom: '#FFB74D',
  coverTo: '#81D4FA',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 手心的小太阳',
      art: 'firstday-sun',
      artPrompt: '清晨的玄关，象妈妈用圆头笔在小象摊开的手心画一个笑眯眯的小太阳，小象低头认真看，小书包靠在脚边，门口光线柔和',
      blocks: [
        {
          kind: 'text',
          text: '今天，嘟嘟上幼儿园。',
        },
        {
          kind: 'text',
          text: '他的心，蹦蹦跳。',
        },
        {
          kind: 'image',
          art: 'firstday-sun',
          text: '妈妈在手心画了个小太阳。',
        },
        {
          kind: 'text',
          text: '妈妈在手心画个太阳。',
        },
        {
          kind: 'text',
          text: '「想我时，握一握它。」',
        },
        {
          kind: 'note',
          text: '手心里握着的，是妈妈满满的一天呀。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 大门里面看一看',
      art: 'firstday-class',
      artPrompt: '明亮的教室里摆着积木和滑梯，袋鼠老师蹲下身向小象伸出手，窗外飘着小气球，墙上有孩子们画的大太阳贴画',
      blocks: [
        {
          kind: 'text',
          text: '幼儿园的大门开着。',
        },
        {
          kind: 'text',
          text: '嘟嘟的大耳朵，抖了抖。',
        },
        {
          kind: 'image',
          art: 'firstday-class',
          text: '袋鼠老师笑着朝嘟嘟伸出手。',
        },
        {
          kind: 'text',
          text: '袋鼠老师蹲下来说好。',
        },
        {
          kind: 'text',
          text: '嘟嘟握了握手心。',
        },
        {
          kind: 'note',
          text: '握一握，小太阳就亮了，胆子也大了一点点。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 想妈妈的时候',
      art: 'firstday-miss',
      artPrompt: '午后的教室角落，小象坐在小椅子上望着窗外，长鼻子轻轻碰到另一只手的手心，手心的小太阳隐隐发光，窗外一片小云慢慢飘过',
      blocks: [
        {
          kind: 'text',
          text: '玩了积木，唱了歌。',
        },
        {
          kind: 'text',
          text: '嘟嘟忽然想妈妈了。',
        },
        {
          kind: 'text',
          text: '鼻子酸酸的，像柠檬。',
        },
        {
          kind: 'image',
          art: 'firstday-miss',
          text: '握一握手心，小太阳亮亮的。',
        },
        {
          kind: 'text',
          text: '他握一握，小太阳亮了。',
        },
        {
          kind: 'note',
          text: '想妈妈不丢人，握一握手心，妈妈就在附近。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 放学的大拥抱',
      art: 'firstday-hug',
      artPrompt: '夕阳下幼儿园门口，小象张开长鼻子飞奔扑进妈妈怀里，母子俩抱成暖暖一团，天边晚霞粉橙色，小书包在地上一颠一颠',
      blocks: [
        {
          kind: 'text',
          text: '放学的铃声响啦。',
        },
        {
          kind: 'text',
          text: '妈妈站在大门外。',
        },
        {
          kind: 'text',
          text: '嘟嘟跑得呼呼的。',
        },
        {
          kind: 'image',
          art: 'firstday-hug',
          text: '抱一抱，比太阳还要暖。',
        },
        {
          kind: 'text',
          text: '「妈妈，我玩得很开心！」',
        },
        {
          kind: 'note',
          text: '回家路上，说说幼儿园里最开心的一件事吧。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '第一天上幼儿园',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
