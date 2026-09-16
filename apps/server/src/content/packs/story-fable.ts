import type { PackBook } from '../types'

/**
 * 《刻舟求剑》——中国古代寓言（故事）。
 * 底本：《吕氏春秋·察今》篇（战国·吕不韦门客撰）。公版（成书公元前 239 年）。
 * 此处为平台白话改写，面向 6-8 岁儿童。
 */
export const keZhouQiuJian: PackBook = {
  id: 'kezhou-fable',
  title: '刻舟求剑',
  author: '《吕氏春秋》原典 · 桃阅读 改写',
  lang: 'zh',
  category: 'story',
  ageStage: '6-8',
  intro: '剑掉进河里，却在船帮上刻记号——这样的找法，能找到剑吗？',
  coverArt: 'river-boat',
  coverFrom: '#00838F',
  coverTo: '#4DD0E1',
  source: '公版典籍（《吕氏春秋·察今》）白话改写',
  chapters: [
    {
      title: '刻舟求剑',
      art: 'river-boat',
      blocks: [
        {
          kind: 'text',
          text: '从前，有一个楚国人坐船过河。船走到河中间的时候，他一不小心，腰间的宝剑「扑通」一声，掉进了水里。',
        },
        {
          kind: 'image',
          art: 'river-boat',
          text: '宝剑掉进河里，水花溅得好高。',
        },
        {
          kind: 'text',
          text: '旁边的人着急地说：「快停船，下去捞啊！」可他不慌不忙，掏出小刀，在船帮上刻了一个记号，说：「我的剑就是从这个地方掉下去的，等船靠了岸，我顺着记号下去找，准能找到。」',
        },
        {
          kind: 'text',
          text: '船继续往前走，走了很远才靠岸。他脱了衣服，顺着船上刻的记号跳进水里。可是河底哪有剑的影子？他扑腾了半天，只好湿淋淋地爬上船来。',
        },
        {
          kind: 'note',
          text: '船是会走的，剑掉在水里却不会跟着船走呀。刻在船上的记号，又怎么能标出剑的位置呢？',
          art: 'lamp-hint',
        },
        {
          kind: 'text',
          text: '「刻舟求剑」这个故事，后来就用来笑话那些：情况已经变了，还用老办法去办事的人。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '吕氏春秋·察今（刻舟求剑）',
    author: '吕不韦门客（编）',
    authorDeathYear: -235,
    jurisdiction: 'CN',
    basis: 'adapted',
    sourceUrl: 'https://ctext.org/dictionary.pl?if=gb&id=35012',
    note: '原典成书于公元前 239 年，属公有领域；本包为面向儿童的白话改写，改写文本由平台创作。',
  },
}
