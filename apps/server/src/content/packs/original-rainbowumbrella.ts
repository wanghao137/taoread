import type { PackBook } from '../types'

/**
 * 《彩虹伞》——平台原创绘本（tale）。
 * 角色（七个撑伞的小动物：红果果、橙皮皮、黄圆圆、绿芽芽、青豆豆、蓝悠悠、紫朵朵）
 * 与全部情节均为平台自撰，无任何现有作品底本。
 * 面向 3-5 岁：七把不同颜色的小伞，拼成一道落在地上的彩虹。
 */
export const rainbowUmbrella: PackBook = {
  id: 'original-rainbowumbrella',
  title: '彩虹伞',
  author: '桃阅读',
  lang: 'zh',
  category: 'tale',
  ageStage: '3-5',
  intro: '哗啦啦，下雨啦。七个好朋友撑开七把小伞：红的、橙的、黄的、绿的……排成弯弯的一排，地上开出一道小小的彩虹。',
  coverArt: 'umbrella-rain',
  coverArtPrompt: '雨中的青石板广场，七只小动物各撑一把彩色小伞排成弯弯的弧线，伞面红橙黄绿青蓝紫依次排开，雨丝亮晶晶，伞下露出一张张笑脸',
  coverFrom: '#7E57C2',
  coverTo: '#4FC3F7',
  source: '桃阅读平台原创虚构作品',
  chapters: [
    {
      title: '第一章 · 哗啦啦，下雨啦',
      art: 'umbrella-rainday',
      artPrompt: '夏天的午后突然下起大雨，雨点打在青石板上溅起小水花，七个背上小书包的小动物在亭子里探头看雨，各自身边放着自己的小伞',
      blocks: [
        {
          kind: 'text',
          text: '哗啦啦，下雨啦。',
        },
        {
          kind: 'text',
          text: '雨点在跳舞。',
        },
        {
          kind: 'text',
          text: '七个好朋友躲进亭子。',
        },
        {
          kind: 'image',
          art: 'umbrella-rainday',
          text: '七把小伞，正等着出发。',
        },
        {
          kind: 'text',
          text: '「各就各位，撑伞喽！」',
        },
        {
          kind: 'note',
          text: '数一数，亭子里有几把小伞呀？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 七把小伞排排队',
      art: 'umbrella-line',
      artPrompt: '雨中的广场上七把彩色小伞依次排开，伞下分别是七只穿着雨衣的小动物，红伞打头紫伞收尾，队伍排成浅浅的弧形，雨珠从伞沿滴落',
      blocks: [
        {
          kind: 'text',
          text: '红伞红果果打头。',
        },
        {
          kind: 'text',
          text: '橙伞、黄伞跟上来。',
        },
        {
          kind: 'text',
          text: '绿伞、青伞手拉手。',
        },
        {
          kind: 'image',
          art: 'umbrella-line',
          text: '小伞排排队，不挤也不散。',
        },
        {
          kind: 'text',
          text: '蓝伞、紫伞收个尾。',
        },
        {
          kind: 'note',
          text: '红橙黄绿青蓝紫——七个颜色都到齐了吗？',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第三章 · 地上开出一道虹',
      art: 'umbrella-rainbow',
      artPrompt: '从高处看，七把彩色小伞排成完整的半圆弧线，像一道落在地上的彩虹，桥洞下几只小蚂蚁探出脑袋望着，雨丝渐渐变得又细又亮',
      blocks: [
        {
          kind: 'text',
          text: '队伍排成弯弯的弧。',
        },
        {
          kind: 'text',
          text: '远远看去，像什么呀？',
        },
        {
          kind: 'text',
          text: '像一道小小的彩虹！',
        },
        {
          kind: 'image',
          art: 'umbrella-rainbow',
          text: '地上的彩虹，正在慢慢走路。',
        },
        {
          kind: 'text',
          text: '桥下的小蚂蚁看呆啦。',
        },
        {
          kind: 'note',
          text: '他们停在桥洞边，为小蚂蚁撑起一片干干的角落。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 天上也挂出一道虹',
      art: 'umbrella-after',
      artPrompt: '雨停了，天空挂出一道大大的彩虹，七个收起伞的小动物仰头看天，地上的小水洼映着七彩倒影，空气清亮，蜗牛慢慢探出触角',
      blocks: [
        {
          kind: 'text',
          text: '雨停了，太阳出来了。',
        },
        {
          kind: 'text',
          text: '天上也挂出一道虹。',
        },
        {
          kind: 'text',
          text: '地上小伞，天上大虹。',
        },
        {
          kind: 'image',
          art: 'umbrella-after',
          text: '两道彩虹，隔着雨丝互相眨眼。',
        },
        {
          kind: 'text',
          text: '「明天再一起撑伞哦。」',
        },
        {
          kind: 'note',
          text: '一个人只有一种颜色，排在一起，就是一整道彩虹。',
          art: 'lamp-hint',
        },
      ],
    },
  ],
  rights: {
    workTitle: '彩虹伞',
    author: '桃阅读',
    jurisdiction: 'CN',
    basis: 'original',
    note: '平台原创虚构作品：角色与全部情节均为平台自撰，无任何现有作品底本。',
  },
}
