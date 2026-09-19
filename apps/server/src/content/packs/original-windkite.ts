import type { PackBook } from '../types'

/**
 * 《风筝和风》——平台原创绘本（tale）。
 * 角色（风筝云朵号、小主人朵朵、风先生）与全部情节均为平台自撰，
 * 无任何现有作品底本。
 * 面向 3-5 岁：风筝想挣脱线，风轻轻告诉它——线是拥抱，不是拉扯。
 */
export const windKite: PackBook = {
  id: 'original-windkite',
  title: '风筝和风',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '风筝云朵号飞得高高的，心里却有个小疙瘩：这根线，老是拽着我。风先生轻轻说：「你回头看一看，线的另一头，牵着一双小手呢。」',
  coverArt: 'kite-sky',
  coverArtPrompt: '碧蓝的大天空上，彩色的燕子形风筝乘着风飞得高高的，细细的线一直延伸到草地上小主人仰起的小手里，白云朵朵，蒲公英随风飘散',
  coverFrom: '#0288D1',
  coverTo: '#FFF176',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 飞得高高的云朵号',
      art: 'kite-fly',
      artPrompt: '春天的草地上空，一只燕子形状的彩绘风筝在蓝天上摇摆着升高，地上小女孩朵朵双手握着线轴跑动，风筝的尾巴在风里飘成波浪',
      blocks: [
        {
          kind: 'text',
          text: '风起了，草儿弯弯。',
        },
        {
          kind: 'text',
          text: '云朵号飞上天啦。',
        },
        {
          kind: 'text',
          text: '它是一只小燕子风筝。',
        },
        {
          kind: 'image',
          art: 'kite-fly',
          text: '云朵号越飞越高，越飞越远。',
        },
        {
          kind: 'text',
          text: '下面的朵朵，笑出了声。',
        },
        {
          kind: 'note',
          text: '风把风筝托得稳稳的，像一只大手。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 线老是拽着我',
      art: 'kite-line',
      artPrompt: '特写画面：风筝的高空视角，细细的风筝线笔直拉向地面小小的线轴和小小的朵朵，风筝皱着眉头回头看那根线，云朵在旁边飘过',
      blocks: [
        {
          kind: 'text',
          text: '云朵号想飞得更高。',
        },
        {
          kind: 'text',
          text: '可线总是轻轻拽着它。',
        },
        {
          kind: 'text',
          text: '「哎呀，真麻烦！」',
        },
        {
          kind: 'image',
          art: 'kite-line',
          text: '风筝回头，看那根细细的线。',
        },
        {
          kind: 'text',
          text: '它悄悄挣了一挣。',
        },
        {
          kind: 'note',
          text: '线一头的朵朵，忽然觉得手心里紧了一下。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 松开的那一天',
      art: 'kite-tree',
      artPrompt: '无力的风筝斜斜挂在小树梢上，翅膀耷拉着沾了两片叶子，朵朵在树下仰着头小跑过来，风先生化作淡蓝色的柔光轻轻环绕',
      blocks: [
        {
          kind: 'text',
          text: '一阵大风吹来。',
        },
        {
          kind: 'text',
          text: '线，真的松开了。',
        },
        {
          kind: 'text',
          text: '云朵号晃晃悠悠……',
        },
        {
          kind: 'image',
          art: 'kite-tree',
          text: '挂在树梢上的云朵号，飞不动啦。',
        },
        {
          kind: 'text',
          text: '落在小树梢，飞不动了。',
        },
        {
          kind: 'note',
          text: '没有了线，云朵号反而不知道往哪儿飞了。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 线是长长的拥抱',
      art: 'kite-hug',
      artPrompt: '朵朵把风筝从树梢轻轻解下来抱在怀里，风筝贴着她的脸颊，细细的线在两人之间绕成一个大大的爱心形状，夕阳把草地染成暖金色',
      blocks: [
        {
          kind: 'text',
          text: '朵朵跑来，轻轻抱住它。',
        },
        {
          kind: 'text',
          text: '风先生在旁边说：「看。」',
        },
        {
          kind: 'text',
          text: '线的另一头，是小手。',
        },
        {
          kind: 'image',
          art: 'kite-hug',
          text: '线绕成一个爱心，连着两颗心。',
        },
        {
          kind: 'text',
          text: '「线呀，是长长的拥抱。」',
        },
        {
          kind: 'note',
          text: '下一次飞上天，云朵号拉着线，飞得又稳又高。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '风筝和风',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
