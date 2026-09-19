import type { PackBook } from '../types'

/**
 * 《女娲补天》——中国上古神话（故事）。
 * 底本：《淮南子·览冥训》（西汉·刘安等编撰）。公版（成书公元前 139 年前后）。
 * 此处为平台白话改写，面向 3-5 岁儿童。
 */
export const mythNuWa: PackBook = {
  id: 'myth-nuwa',
  title: '女娲补天',
  author: '刘安 等（西汉）· 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '3-5',
  intro: '天破了一个大窟窿，大雨哗哗地下，好可怕！女神女娲不害怕，她要炼五彩的石头，把天补好。',
  coverArt: 'nuwa-patches-sky',
  coverArtPrompt: '一位温柔美丽的女神姐姐（女娲）飞在彩云间，双手托起一块发光的五色宝石，头顶蓝色的天空缺了一块，露出温暖的光，画面色彩斑斓柔和，幼儿绘本风格',
  coverFrom: '#1565C0',
  coverTo: '#F48FB1',
  source: '公版典籍（《淮南子·览冥训》）白话改写',
  chapters: [
    {
      title: '第一章 · 天塌了',
      art: 'broken-sky',
      artPrompt: '蓝色的天空破了一个大窟窿，窟窿里漏下倾盆大雨和碎石，大地被水淹没，小动物们惊慌躲避',
      blocks: [
        {
          kind: 'text',
          text: '从前，有一位女神，她叫女娲。女娲长着人的身子、蛇的尾巴，会腾云驾雾，还能变化无穷。',
        },
        {
          kind: 'text',
          text: '有一天，突然「轰隆」一声巨响——天上破了一个大窟窿！大雨哗哗地从窟窿里漏下来，一直下个不停。',
        },
        {
          kind: 'image',
          art: 'broken-sky',
          text: '天破了个大窟窿，大雨漏了下来。',
        },
        {
          kind: 'text',
          text: '地上到处都是水，房子被泡塌了，大树被淹了，小动物们吓得到处跑。大家又冷又怕，哭成一片。',
        },
        {
          kind: 'note',
          text: '天为什么会破呢？古人说，是水神共工和火神祝融打架，共工一头撞断了撑天的柱子「不周山」。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第二章 · 女娲的决定',
      art: 'nuwa-thinking',
      artPrompt: '女娲站在山头，抬头望着破损的天空，眼神坚定，身边围着几只小动物，远处是洪水',
      blocks: [
        {
          kind: 'text',
          text: '女娲看到孩子们在雨里发抖，心疼极了。她抹了抹眼泪，站起来说：「别怕，我来把天补上！」',
        },
        {
          kind: 'image',
          art: 'nuwa-thinking',
          text: '女娲下定决心，要把天上的窟窿补好。',
        },
        {
          kind: 'text',
          text: '可是，天那么高、那么大，拿什么补呢？女娲找呀，找呀，终于想出了一个好办法——用五彩的石头补天！',
        },
        {
          kind: 'text',
          text: '她跑遍了一座座大山，一条条大河，收集来红的、黄的、蓝的、白的、黑的五种颜色的石头，堆成了一座小山。',
        },
      ],
    },
    {
      title: '第三章 · 炼五彩石',
      art: 'five-color-stones',
      artPrompt: '山洞前燃起熊熊神火，五彩石头在火光中融化，发出红黄蓝白黑五种光芒，女娲在火边添柴',
      blocks: [
        {
          kind: 'text',
          text: '五彩石头硬邦邦的，怎么才能补到天上去呢？女娲生起一堆神火，把五彩石头一块一块放进去烧。',
        },
        {
          kind: 'image',
          art: 'five-color-stones',
          text: '神火烧了九天九夜，石头化成了五彩的浆。',
        },
        {
          kind: 'text',
          text: '火烧了九天九夜，石头终于烧化了，变成了黏糊糊、亮晶晶的五彩浆。红的像火，黄的像金，蓝的像海，真好看！',
        },
        {
          kind: 'note',
          text: '古人觉得，五种颜色正好对应金、木、水、火、土「五行」，凑在一起，力量最大。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '第四章 · 把天补好',
      art: 'nuwa-patches-sky',
      artPrompt: '女娲飞到高空，双手把五彩浆抹向天空的窟窿，窟窿一点点合拢，雨停了，阳光照下来',
      blocks: [
        {
          kind: 'text',
          text: '女娲捧起五彩浆，驾起云朵，一直飞到天上。她把五彩浆一点一点，抹在那个大窟窿上。',
        },
        {
          kind: 'image',
          art: 'nuwa-patches-sky',
          text: '五彩浆糊住窟窿，天又变蓝了。',
        },
        {
          kind: 'text',
          text: '慢慢地，窟窿越来越小，最后终于合上了！雨停了，云散了，太阳又出来了，天边还挂起了一道彩虹。',
        },
        {
          kind: 'text',
          text: '为了不让天再塌下来，女娲又抓来一只大乌龟，砍下它的四条腿，立在地的四角，把天稳稳地撑住。',
        },
        {
          kind: 'note',
          text: '天边的彩虹，就是女娲补天留下的五彩石的光彩呀。看到彩虹，可以给孩子们讲讲女娲的故事。',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '从那以后，天再也没破过。地上的孩子们又能开开心心地晒太阳、做游戏了。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '淮南子·览冥训（女娲补天）',
    author: '刘安 等（西汉）',
    authorDeathYear: -122,
    translator: '桃阅读（白话改写）',
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://zh.wikisource.org/wiki/%E6%B7%AE%E5%8D%97%E5%AD%90',
    note: '据《淮南子》公版原文改写为童趣白话；原著成书于西汉，属公有领域，改写文本由平台创作。',
  },
}
