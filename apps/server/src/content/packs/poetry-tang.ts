import type { PackBook } from '../types'

/**
 * 《唐诗三百首》精选（古诗）。
 * 底本：清代蘅塘退士编《唐诗三百首》通行本，原诗均为唐人作品（作者卒年均逾保护期）。
 * 选诗以短小、画面感强、宜儿童记诵为标准；注音按现代汉语普通话（多音字随语境定音）。
 * 译文为平台自撰白话（译者权利归平台，见 rights.translator）。
 */
export const tangShi: PackBook = {
  id: 'tangshi-300',
  title: '唐诗三百首·星星篇',
  author: '蘅塘退士 编',
  lang: 'zh',
  category: 'poetry',
  ageStage: '3-5',
  intro: '最短的唐诗，最好听的韵脚。每首旁边都有一幅小画，和一句大白话解释。',
  coverArt: 'poetry-moon',
  coverFrom: '#1E2A5A',
  coverTo: '#4A5FBF',
  source: '公版古诗（唐代）精选，自撰注音与白话译文',
  chapters: [
    {
      title: '静夜思 · 李白',
      art: 'moon-window',
      blocks: [
        {
          kind: 'poem',
          text: '床前明月光，疑是地上霜。\n举头望明月，低头思故乡。',
          pinyin: 'chuáng qián míng yuè guāng, yí shì dì shàng shuāng.\njǔ tóu wàng míng yuè, dī tóu sī gù xiāng.',
          translation: '床前洒满明亮的月光，好像地上结了一层白霜。抬起头看月亮，低下头，想起了远方的家。',
        },
        {
          kind: 'note',
          text: '李白被叫做「诗仙」，他特别喜欢写月亮。这首诗是他一个人住在外地时写的。',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '春晓 · 孟浩然',
      art: 'spring-bird',
      blocks: [
        {
          kind: 'poem',
          text: '春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。',
          pinyin: 'chūn mián bù jué xiǎo, chù chù wén tí niǎo.\nyè lái fēng yǔ shēng, huā luò zhī duō shǎo.',
          translation: '春天的早晨睡得正香，不知不觉天就亮了，到处都是小鸟叽叽喳喳的叫声。想起昨夜的风雨声，不知花瓣被吹落了多少。',
        },
      ],
    },
    {
      title: '咏鹅 · 骆宾王',
      art: 'goose-pond',
      blocks: [
        {
          kind: 'poem',
          text: '鹅，鹅，鹅，曲项向天歌。\n白毛浮绿水，红掌拨清波。',
          pinyin: 'é, é, é, qū xiàng xiàng tiān gē.\nbái máo fú lǜ shuǐ, hóng zhǎng bō qīng bō.',
          translation: '鹅啊鹅，弯着脖子朝着天空唱歌。白色的羽毛浮在绿水上，红色的脚掌拨动着清清的水波。',
        },
        {
          kind: 'note',
          text: '骆宾王写这首诗的时候只有七岁，和你一样大！',
          art: 'lamp-hint',
        },
      ],
    },
    {
      title: '登鹳雀楼 · 王之涣',
      art: 'tower-view',
      blocks: [
        {
          kind: 'poem',
          text: '白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。',
          pinyin: 'bái rì yī shān jìn, huáng hé rù hǎi liú.\nyù qióng qiān lǐ mù, gèng shàng yī céng lóu.',
          translation: '太阳挨着山头慢慢落下，黄河水奔流着汇入大海。想要看到更远的地方，就再往上爬一层楼吧。',
        },
      ],
    },
    {
      title: '悯农 · 李绅',
      art: 'rice-field',
      blocks: [
        {
          kind: 'poem',
          text: '锄禾日当午，汗滴禾下土。\n谁知盘中餐，粒粒皆辛苦。',
          pinyin: 'chú hé rì dāng wǔ, hàn dī hé xià tǔ.\nshuí zhī pán zhōng cān, lì lì jiē xīn kǔ.',
          translation: '正午的太阳火辣辣，农民伯伯还在锄地，汗水一滴滴落在泥土里。谁知道碗里的饭，每一粒都是辛苦换来的呢？',
        },
        {
          kind: 'note',
          text: '「悯」是心疼、同情的意思。读完这首诗，吃饭时会更珍惜粮食哦。',
          art: 'rice-bowl',
        },
      ],
    },
    {
      title: '望庐山瀑布 · 李白',
      art: 'waterfall-mountain',
      blocks: [
        {
          kind: 'poem',
          text: '日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。',
          pinyin: 'rì zhào xiāng lú shēng zǐ yān, yáo kàn pù bù guà qián chuān.\nfēi liú zhí xià sān qiān chǐ, yí shì yín hé luò jiǔ tiān.',
          translation: '阳光照在香炉峰上，升起紫色的云烟；远远望去，瀑布像白绢挂在山前。水流从高处直冲下来，让人怀疑是银河从天上落了下来。',
        },
      ],
    },
  ],
  rights: {
    workTitle: '唐诗三百首',
    author: '蘅塘退士（编）',
    authorDeathYear: 1764,
    translator: '桃阅读',
    jurisdiction: 'CN',
    basis: 'pd-70',
    sourceUrl: 'https://ctext.org/dictionary.pl?if=gb&id=35012',
    note: '所收唐诗作者卒年均逾保护期；编者蘅塘退士卒于 1764 年。注音与白话译文为平台自撰。',
  },
}
