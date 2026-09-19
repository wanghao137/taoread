import type { PackBook } from '../types'

/**
 * 《愚公移山》——中国上古寓言（故事）。
 * 底本：《列子·汤问》（战国·列御寇撰）。公版（成书战国时期）。
 * 此处为平台白话改写，面向 3-5 岁儿童。
 */
export const mythYuGong: PackBook = {
  id: 'myth-yugong',
  title: '愚公移山',
  author: '列御寇（战国）· 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '3-5',
  intro: '家门口横着两座大山，出门真不方便。老爷爷愚公说：「挖掉它！」别人都笑他傻，他能挖完吗？',
  coverArt: 'yugong-dig-mountain',
  coverArtPrompt: '一位白胡子老爷爷（愚公）笑眯眯地挥着锄头，身后是高高的两座大山，旁边有小孩帮忙搬石头，画面温暖明亮，幼儿绘本风格',
  coverFrom: '#4E342E',
  coverTo: '#A5D6A7',
  source: '公版典籍（《列子·汤问》）白话改写',
  chapters: [
    {
      title: '第一章 · 两座大山',
      art: 'two-mountains',
      artPrompt: '两座高高的大山挡在村口，山上石头嶙峋，几棵松树，山脚下有一户小房子，门口站着老爷爷一家',
      blocks: [
        {
          kind: 'text',
          text: '从前，有一位老爷爷，大家都叫他愚公。他家门口，横着两座大山：一座叫太行山，一座叫王屋山。',
        },
        {
          kind: 'image',
          art: 'two-mountains',
          text: '两座大山，把愚公家的门口堵得死死的。',
        },
        {
          kind: 'text',
          text: '这两座山可高啦，山顶都能碰到云彩！愚公一家出门买盐、走亲戚，都得绕好远好远的路，累得直喘气。',
        },
        {
          kind: 'note',
          text: '太行山和王屋山，真的存在哦！就在今天的山西、河南、河北交界的地方。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 愚公的主意',
      art: 'yugong-family-meeting',
      artPrompt: '愚公坐在院子里，一家人围着他，认真地听他说话，地上放着锄头和竹筐',
      blocks: [
        {
          kind: 'text',
          text: '有一天，愚公把全家人叫到一起，说：「咱们把这两座山挖掉，开出一条大路来，好不好？」',
        },
        {
          kind: 'image',
          art: 'yugong-family-meeting',
          text: '愚公说：把山挖掉，开出大路！',
        },
        {
          kind: 'text',
          text: '儿子、孙子们都跳起来：「好！好！我们不怕累！」只有老伴儿担心：「挖出来的石头，往哪儿放呢？」',
        },
        {
          kind: 'text',
          text: '愚公捋捋胡子，说：「把石头搬到渤海边上，倒进海里！」说干就干，第二天一早，全家就上了山。',
        },
      ],
    },
    {
      title: '第三章 · 挖山啦',
      art: 'yugong-dig-mountain',
      artPrompt: '愚公挥锄头，儿子挑竹筐，小孙子用小铲子，石头被一块块运走，汗水在阳光下闪亮',
      blocks: [
        {
          kind: 'text',
          text: '「叮当、叮当」，锄头敲在石头上，冒出小火星。愚公挖石头，儿子挑竹筐，连七八岁的小孙子，也拿着小铲子来帮忙。',
        },
        {
          kind: 'image',
          art: 'yugong-dig-mountain',
          text: '全家人一起挖山，小孙子也来帮忙。',
        },
        {
          kind: 'text',
          text: '他们从春天挖到夏天，从秋天挖到冬天。竹筐磨破了一个又一个，扁担也挑断了好几根。',
        },
        {
          kind: 'text',
          text: '山上的石头，好像一点也没少。可是愚公不着急，每天太阳一出来，就带着大家上山了。',
        },
      ],
    },
    {
      title: '第四章 · 智叟来笑话',
      art: 'zhishou-laugh',
      artPrompt: '一个戴着眼镜模样的聪明老头（智叟）捂着嘴笑，愚公停下来，笑眯眯地看着他，不生气',
      blocks: [
        {
          kind: 'text',
          text: '村里有个聪明人，叫智叟。他看愚公天天挖山，笑得前仰后合：「老糊涂！你都这把年纪了，拔根草都费劲，还想挖山？」',
        },
        {
          kind: 'image',
          art: 'zhishou-laugh',
          text: '智叟笑话愚公：你还能挖动山吗？',
        },
        {
          kind: 'text',
          text: '愚公一点儿也不生气，他笑着说：「我是老了，可我还有儿子呀；儿子又有孙子，孙子又会有儿子。子子孙孙，永远也挖不完！」',
        },
        {
          kind: 'text',
          text: '「山不会再长高了，我们一直挖，总能把它挖平！」智叟听了，张着嘴巴，一句话也说不出来。',
        },
        {
          kind: 'note',
          text: '愚公看起来「笨」，其实是心里有主意、做事能坚持。这叫「大智若愚」呀。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第五章 · 山搬走了',
      art: 'mountains-gone',
      artPrompt: '两座大山变成平地，一条大路直通远方，愚公一家站在路边欢呼，天上神仙驾云远去',
      blocks: [
        {
          kind: 'text',
          text: '智叟把这件事当笑话，讲给了山里的山神听。山神一听，害怕极了：这样挖下去，山真的会没了呀！',
        },
        {
          kind: 'text',
          text: '山神赶紧跑到天上，向天帝报告。天帝一看：哟，这个老头儿，心可真诚、志气可真大！',
        },
        {
          kind: 'image',
          art: 'mountains-gone',
          text: '山神把山背走了，家门口变得平平坦坦。',
        },
        {
          kind: 'text',
          text: '天帝派了两个大力神，下凡来到人间。一个背起太行山，一个背起王屋山，一个放到东边，一个放到南边，再也不搬回来了。',
        },
        {
          kind: 'text',
          text: '从此，愚公家门口平平坦坦，一条大路一直通到远方。大家出门再也不用绕路啦！',
        },
        {
          kind: 'note',
          text: '「愚公移山」告诉我们：不怕慢、就怕站。坚持做一件对的事，再难也能做成。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '列子·汤问（愚公移山）',
    author: '列御寇（战国）',
    translator: '桃阅读（白话改写）',
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://zh.wikisource.org/wiki/%E5%88%97%E5%AD%90',
    note: '据《列子》公版原文改写为童趣白话；原著成书于战国，属公有领域，改写文本由平台创作。',
  },
}
