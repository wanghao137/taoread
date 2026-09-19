import type { PackBook } from '../types'

/**
 * 《年的故事》——中国民间传说（过年习俗的由来）。
 * 版权说明：年兽传说为民间口传故事，无确定原始作者（basis=adapted）；
 * 白话文字为平台自撰改写，不引用任何现代绘本或动画改编文本。
 * 面向 3-5 岁儿童，每句不超过 15 字。
 */
export const nianBeast: PackBook = {
  id: 'folktale-nian',
  title: '年的故事',
  author: '中国民间传说（佚名）· 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '3-5',
  intro: '每到冬天最冷的夜晚，怪兽「年」就会下山。村子里来了一位白胡子爷爷，他带来三样小宝贝：红红的纸、亮亮的火光、响响的爆竹声。',
  coverArt: 'nian-village',
  coverArtPrompt: '雪夜里的山村家家户户贴着红纸挂着红灯笼，火光映红了雪地，远处山影里怪兽悄悄缩回头，天上飘着雪花，温暖喜庆，幼儿绘本风格',
  coverFrom: '#B71C1C',
  coverTo: '#FFD54F',
  source: '中国传统民间传说（年兽与过年习俗）白话改写',
  chapters: [
    {
      title: '第一章 · 冬天来的怪声音',
      art: 'nian-beast-coming',
      artPrompt: '雪夜的山村家家户户门窗紧闭，远处黑黝黝的山影里露出两只圆眼睛的光，雪花轻轻飘落，村子安静又有点紧张',
      blocks: [
        {
          kind: 'text',
          text: '很久以前，每年冬天最冷的时候，大山里会传来怪声音。村里人都说：「年要来啦！」',
        },
        { kind: 'image', art: 'nian-beast-coming', text: '雪夜里，山那边传来咚咚的脚步声。' },
        {
          kind: 'text',
          text: '「年」是一只大怪兽。它平时睡在大山里。天最冷、夜最长的晚上才出来。',
        },
        {
          kind: 'text',
          text: '年的脚步声「咚咚咚」。鸡呀狗呀，都躲了起来。大家赶紧关紧门窗。',
        },
        {
          kind: 'note',
          text: '年真的那么可怕吗？别担心——村子里来了一位白胡子爷爷，他正眯着眼睛，想一个好主意呢。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '白胡子爷爷说：「大家别怕。年呀，最怕三样东西。」',
        },
      ],
    },
    {
      title: '第二章 · 三样小宝贝',
      art: 'nian-red-paper',
      artPrompt: '村口老槐树下，白胡子爷爷举着一张红纸给村民看，桌上摆着红灯笼和一捆竹节，大家围拢过来听他讲话，雪花飘落',
      blocks: [
        {
          kind: 'text',
          text: '「第一样，是红红的纸。第二样，是亮亮的火光。第三样，是响响的爆竹声。」',
        },
        { kind: 'image', art: 'nian-red-paper', text: '白胡子爷爷带来三样小宝贝。' },
        {
          kind: 'text',
          text: '大家一听，马上忙起来。剪红纸，贴红纸。家家的门上都红彤彤的。',
        },
        {
          kind: 'text',
          text: '有人点起一堆堆大火。火光把雪地照得亮亮的。还有人把竹子架在火上。',
        },
        {
          kind: 'note',
          text: '红色、火光、响声，都是热闹又暖和的东西。原来害怕的时候，大家手拉手想办法，勇气就会变多啦。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '天黑了，村子准备好啦。大家躲在门后，等着年的到来。',
        },
      ],
    },
    {
      title: '第三章 · 噼里啪啦',
      art: 'nian-firecracker',
      artPrompt: '雪夜里大怪兽年缩在村口，被满村红纸和火光晃得眯起眼睛，竹节在火堆里炸响火星四溅，村民隔着窗户张望',
      blocks: [
        {
          kind: 'text',
          text: '半夜里，年下山了。它一抬头，看见满村的红纸。吓了一跳：「怎么这么红呀？」',
        },
        { kind: 'image', art: 'nian-firecracker', text: '竹子「噼里啪啦」响，年捂住耳朵。' },
        {
          kind: 'text',
          text: '竹子在火里「噼啪」炸响。声音又脆又亮，传得好远。年捂住耳朵，掉头就跑。',
        },
        {
          kind: 'text',
          text: '它逃回大山，再也不敢来了。村子里一下子欢呼起来：「年跑喽！年跑喽！」',
        },
        {
          kind: 'note',
          text: '「噼里啪啦」的爆竹声，就是这么来的。后来人们做出了鞭炮，过年的时候放一放，可热闹啦。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '天亮了，大家推开门。穿上新衣裳，互相道喜：「过年好！过年好！」',
        },
      ],
    },
    {
      title: '第四章 · 过年啦',
      art: 'nian-newyear-morning',
      artPrompt: '大年初一的清晨，红彤彤的村庄里孩子们穿新衣放小鞭炮，大人们贴春联挂灯笼，屋顶还有积雪，阳光金灿灿',
      blocks: [
        {
          kind: 'text',
          text: '从那以后，冬天最冷的夜晚过去，大家都贴红纸、挂灯笼。这一天，就叫「过年」。',
        },
        { kind: 'image', art: 'nian-newyear-morning', text: '过年啦！村子里红彤彤、亮堂堂。' },
        {
          kind: 'text',
          text: '全家人围在一起，吃热腾腾的年夜饭。长辈还给孩子发红纸包。',
        },
        {
          kind: 'text',
          text: '过了年，天就慢慢暖了。春天就要来啦。小种子在土里伸了个懒腰。',
        },
        {
          kind: 'note',
          text: '过年贴的红纸，后来有了好听的名字，叫「春联」。过年时，和孩子一起念一念门上的春联吧。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '你看，热闹和勇气在一起，最冷的夜晚也会过去。暖暖的春天，总会来到。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '年的故事（过年习俗的由来）',
    author: '中国民间传说（佚名）',
    jurisdiction: 'CN',
    basis: 'adapted',
    note: '年兽传说为解释过年习俗的民间口传故事，无确定原始作者；白话文字为平台自撰改写，不引用任何现代绘本或动画改编文本。',
  },
}
