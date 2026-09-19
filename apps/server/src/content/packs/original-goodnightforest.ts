import type { PackBook } from '../types'

/**
 * 《森林晚安曲》——平台原创绘本（tale，睡前书）。
 * 角色（猫头鹰奶奶、小兔绒绒、松鼠栗子、青蛙合唱队、小熊团团）
 * 与全部情节均为平台自撰，无任何现有作品底本。
 * 面向 3-5 岁：猫头鹰奶奶挨家挨户道晚安的睡前书。
 */
export const goodnightForest: PackBook = {
  id: 'original-goodnightforest',
  title: '森林晚安曲',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '夜深了，猫头鹰奶奶提着一盏小小的月灯，挨家挨户去道晚安。她的晚安曲轻轻的、软软的，谁听了，都会做一个香香甜甜的梦。',
  coverArt: 'gnforest-moon',
  coverArtPrompt: '深夜的大森林里，圆脸猫头鹰奶奶提着一盏发光的小月灯飞在树屋之间，各家窗口透出昏黄小灯，月亮又大又圆挂在天上，萤光点点',
  coverFrom: '#1B2A4A',
  coverTo: '#9FA8DA',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 提灯的猫头鹰奶奶',
      art: 'gnforest-lamp',
      artPrompt: '猫头鹰奶奶戴着小披肩，提着一盏圆月形小灯站在大树枝头，整片森林的树屋窗口透出一点一点的暖光，夜雾像薄纱轻轻浮着',
      blocks: [
        {
          kind: 'text',
          text: '森林困了。',
        },
        {
          kind: 'text',
          text: '窗口的灯，一盏盏小了。',
        },
        {
          kind: 'image',
          art: 'gnforest-lamp',
          text: '猫头鹰奶奶提着小月灯出发。',
        },
        {
          kind: 'text',
          text: '猫头鹰奶奶要去道晚安。',
        },
        {
          kind: 'text',
          text: '她的曲子，软软的。',
        },
        {
          kind: 'note',
          text: '嘘——跟在猫头鹰奶奶身后，脚步放轻一点。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 树洞里的两支小曲',
      art: 'gnforest-burrow',
      artPrompt: '大树洞窗口，小兔子和松鼠各自抱着小毯子坐在小床上，猫头鹰奶奶在窗边轻声哼唱，树洞里挂着小星星串，光很柔和',
      blocks: [
        {
          kind: 'text',
          text: '先到小兔绒绒家。',
        },
        {
          kind: 'text',
          text: '「晚安，耳朵长长的。」',
        },
        {
          kind: 'text',
          text: '绒绒的耳朵，软下来了。',
        },
        {
          kind: 'image',
          art: 'gnforest-burrow',
          text: '松鼠栗子抱着毯子，眼皮打架啦。',
        },
        {
          kind: 'text',
          text: '再到松鼠栗子家。',
        },
        {
          kind: 'note',
          text: '听，晚安曲像羽毛，轻轻落在眼皮上。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 池塘边的摇篮曲',
      art: 'gnforest-pond',
      artPrompt: '月亮照着圆圆的池塘，荷叶间小青蛙们躺在睡莲上打着小哈欠，猫头鹰奶奶停在芦苇上哼曲，水面浮着碎碎的月光，风把芦苇吹得轻轻摇',
      blocks: [
        {
          kind: 'text',
          text: '池塘边的青蛙还醒着。',
        },
        {
          kind: 'text',
          text: '「呱，呱，睡不着。」',
        },
        {
          kind: 'text',
          text: '奶奶哼起摇篮小曲。',
        },
        {
          kind: 'image',
          art: 'gnforest-pond',
          text: '月光铺在水面上，像软软的被子。',
        },
        {
          kind: 'text',
          text: '蛙声越来越小，越来越小。',
        },
        {
          kind: 'note',
          text: '连池塘也盖上月光被子，睡着了。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 最后一声晚安',
      art: 'gnforest-last',
      artPrompt: '森林深处的小熊树床上，小熊团团搂着蜂蜜罐形状的抱枕已闭上眼睛，猫头鹰奶奶在床边轻轻扇动翅膀，窗外月亮温柔，整座森林静悄悄',
      blocks: [
        {
          kind: 'text',
          text: '最后，到小熊团团家。',
        },
        {
          kind: 'text',
          text: '团团抱着软软的枕头。',
        },
        {
          kind: 'text',
          text: '「晚安，做个甜甜的梦。」',
        },
        {
          kind: 'image',
          art: 'gnforest-last',
          text: '整座森林，一起合上了眼睛。',
        },
        {
          kind: 'text',
          text: '奶奶对月亮说：「晚安。」',
        },
        {
          kind: 'note',
          text: '森林睡着了。闭上眼睛，晚安曲也落进你的耳朵里啦。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '森林晚安曲',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
